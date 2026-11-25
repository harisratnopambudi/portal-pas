-- =====================================================================
--  Portal Ujian PAS — skema database Supabase
--  Jalankan SEKALI di Supabase: SQL Editor > New query > tempel semua > Run.
--  Aman dijalankan ulang (memperbarui fungsi, tidak menghapus data).
--
--  Keamanan:
--  - Siswa (tanpa login) TIDAK bisa membaca/mengubah tabel langsung. Siswa hanya
--    memanggil fungsi pas_* di bawah, yang memeriksa token di server.
--  - Guru = akun Supabase Auth yang emailnya terdaftar di tabel pas_guru.
-- =====================================================================

-- ---------- Tabel ----------
create table if not exists public.pas_jawaban (
  id text primary key,
  mapel text not null,
  kelas text not null,
  absen int not null,
  data jsonb not null default '{}'::jsonb,
  diubah_at timestamptz not null default now()
);
create table if not exists public.pas_draft (
  id text primary key,
  mapel text not null,
  kelas text not null,
  absen int not null,
  data jsonb not null default '{}'::jsonb,
  diubah_at timestamptz not null default now()
);
create table if not exists public.pas_masuk (
  id text primary key,
  mapel text not null,
  kelas text not null,
  absen int not null,
  data jsonb not null default '{}'::jsonb
);
create table if not exists public.pas_token (
  mapel text primary key,
  token text not null default '',
  aktif boolean not null default false,
  diubah_at bigint
);
create table if not exists public.pas_siswa (
  id text primary key,
  data jsonb not null default '{}'::jsonb
);
create table if not exists public.pas_guru (
  email text primary key
);

create index if not exists pas_jawaban_mk on public.pas_jawaban (mapel, kelas);
create index if not exists pas_draft_mk   on public.pas_draft (mapel, kelas);
create index if not exists pas_masuk_mk   on public.pas_masuk (mapel, kelas);

-- ---------- Siapa guru ----------
create or replace function public.pas_is_guru() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.pas_guru g
                 where lower(g.email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;

-- id dokumen = mapel_kelas_absen, karakter selain huruf/angka/_/- diganti "-"
create or replace function public.pas_docid(p_mapel text, p_kelas text, p_absen int) returns text
language sql immutable as $$
  select regexp_replace(p_mapel || '_' || p_kelas || '_' || p_absen::text, '[^A-Za-z0-9_-]', '-', 'g');
$$;

-- ---------- Row Level Security ----------
alter table public.pas_jawaban enable row level security;
alter table public.pas_draft   enable row level security;
alter table public.pas_masuk   enable row level security;
alter table public.pas_token   enable row level security;
alter table public.pas_siswa   enable row level security;
alter table public.pas_guru    enable row level security;

drop policy if exists guru_semua on public.pas_jawaban;
create policy guru_semua on public.pas_jawaban for all to authenticated using (public.pas_is_guru()) with check (public.pas_is_guru());
drop policy if exists guru_semua on public.pas_draft;
create policy guru_semua on public.pas_draft for all to authenticated using (public.pas_is_guru()) with check (public.pas_is_guru());
drop policy if exists guru_semua on public.pas_masuk;
create policy guru_semua on public.pas_masuk for all to authenticated using (public.pas_is_guru()) with check (public.pas_is_guru());
drop policy if exists guru_semua on public.pas_token;
create policy guru_semua on public.pas_token for all to authenticated using (public.pas_is_guru()) with check (public.pas_is_guru());
drop policy if exists guru_tulis on public.pas_siswa;
create policy guru_tulis on public.pas_siswa for all to authenticated using (public.pas_is_guru()) with check (public.pas_is_guru());
drop policy if exists semua_baca on public.pas_siswa;
create policy semua_baca on public.pas_siswa for select to anon, authenticated using (true);
drop policy if exists guru_lihat on public.pas_guru;
create policy guru_lihat on public.pas_guru for select to authenticated using (public.pas_is_guru());

-- ---------- Fungsi untuk siswa (diperiksa di server) ----------

-- Masuk dengan token. Gagal -> error 'TOKEN_SALAH'.
create or replace function public.pas_masuk_token(p_mapel text, p_kelas text, p_absen int, p_nama text, p_token text)
returns boolean language plpgsql security definer set search_path = public as $$
declare t record; v_id text := public.pas_docid(p_mapel, p_kelas, p_absen);
begin
  select * into t from public.pas_token where mapel = p_mapel;
  if not found or not t.aktif or t.token = '' or t.token <> upper(trim(coalesce(p_token, ''))) then
    raise exception 'TOKEN_SALAH' using errcode = 'P0001';
  end if;
  insert into public.pas_masuk (id, mapel, kelas, absen, data)
  values (v_id, p_mapel, p_kelas, p_absen,
          jsonb_build_object('mapel', p_mapel, 'kelas', p_kelas, 'absen', p_absen, 'nama', left(coalesce(p_nama, ''), 80),
                             'token', upper(trim(p_token)), 'waktu', (extract(epoch from now()) * 1000)::bigint))
  on conflict (id) do update set data = excluded.data;
  return true;
end $$;

-- Status satu siswa untuk satu mapel: sudah kirim? ada simpanan?
create or replace function public.pas_status(p_mapel text, p_kelas text, p_absen int)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'kirim', exists (select 1 from public.pas_jawaban where id = public.pas_docid(p_mapel, p_kelas, p_absen)),
    'draft', (select data from public.pas_draft where id = public.pas_docid(p_mapel, p_kelas, p_absen)));
$$;

-- Simpan progres (draft). Wajib sudah masuk dengan token; ditolak bila sudah dikirim.
create or replace function public.pas_simpan_draft(p_data jsonb)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  v_mapel text := p_data ->> 'mapel';
  v_kelas text := p_data ->> 'kelas';
  v_absen int  := (p_data ->> 'absen')::int;
  v_id text    := public.pas_docid(v_mapel, v_kelas, v_absen);
  lama jsonb;
begin
  if not exists (select 1 from public.pas_masuk where id = v_id) then
    raise exception 'BELUM_MASUK' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.pas_jawaban where id = v_id) then
    raise exception 'SUDAH_KIRIM' using errcode = 'P0001';
  end if;
  if octet_length(p_data::text) > 400000 then
    raise exception 'TERLALU_BESAR' using errcode = 'P0001';
  end if;
  select data into lama from public.pas_draft where id = v_id;
  -- waktu mulai tidak boleh diganti (agar sisa waktu tidak bisa direset)
  if lama is not null and lama ? 'mulai' and lama -> 'mulai' <> 'null'::jsonb
     and (lama -> 'mulai') is distinct from (p_data -> 'mulai') then
    raise exception 'MULAI_BEDA' using errcode = 'P0001';
  end if;
  insert into public.pas_draft (id, mapel, kelas, absen, data, diubah_at)
  values (v_id, v_mapel, v_kelas, v_absen,
          p_data || jsonb_build_object('diperbarui_at', (extract(epoch from now()) * 1000)::bigint), now())
  on conflict (id) do update set data = excluded.data, diubah_at = now();
  return true;
end $$;

-- Kirim jawaban akhir. Sekali saja; kedua kali -> 'SUDAH_ADA'.
create or replace function public.pas_kirim(p_data jsonb)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  v_mapel text := p_data ->> 'mapel';
  v_kelas text := p_data ->> 'kelas';
  v_absen int  := (p_data ->> 'absen')::int;
  v_id text    := public.pas_docid(v_mapel, v_kelas, v_absen);
begin
  if not exists (select 1 from public.pas_masuk where id = v_id) then
    raise exception 'BELUM_MASUK' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.pas_jawaban where id = v_id) then
    raise exception 'SUDAH_ADA' using errcode = 'P0001';
  end if;
  if octet_length(p_data::text) > 400000 then
    raise exception 'TERLALU_BESAR' using errcode = 'P0001';
  end if;
  insert into public.pas_jawaban (id, mapel, kelas, absen, data)
  values (v_id, v_mapel, v_kelas, v_absen,
          jsonb_build_object(
            'mapel', v_mapel, 'kelas', v_kelas, 'absen', v_absen,
            'nama', left(coalesce(p_data ->> 'nama', ''), 80),
            'jawaban', coalesce(p_data -> 'jawaban', '{}'::jsonb),
            'pelanggaran', coalesce((p_data ->> 'pelanggaran')::int, 0),
            'mulai_at', p_data -> 'mulai_at',
            'dikirim_at', to_jsonb(now()),
            'nilai_manual', '{}'::jsonb,
            'status', 'belum'));
  delete from public.pas_draft where id = v_id;
  return true;
end $$;

-- Guru: gabungkan perubahan nilai ke data jawaban (RLS tetap berlaku)
create or replace function public.pas_patch_jawaban(p_id text, p_patch jsonb)
returns boolean language plpgsql security invoker set search_path = public as $$
begin
  update public.pas_jawaban set data = data || p_patch, diubah_at = now() where id = p_id;
  if not found then raise exception 'TIDAK_ADA' using errcode = 'P0001'; end if;
  return true;
end $$;

-- Hak panggil fungsi
revoke all on function public.pas_masuk_token(text, text, int, text, text) from public;
revoke all on function public.pas_status(text, text, int) from public;
revoke all on function public.pas_simpan_draft(jsonb) from public;
revoke all on function public.pas_kirim(jsonb) from public;
revoke all on function public.pas_patch_jawaban(text, jsonb) from public;
grant execute on function public.pas_masuk_token(text, text, int, text, text) to anon, authenticated;
grant execute on function public.pas_status(text, text, int) to anon, authenticated;
grant execute on function public.pas_simpan_draft(jsonb) to anon, authenticated;
grant execute on function public.pas_kirim(jsonb) to anon, authenticated;
grant execute on function public.pas_patch_jawaban(text, jsonb) to authenticated;
grant execute on function public.pas_is_guru() to anon, authenticated;
grant execute on function public.pas_docid(text, text, int) to anon, authenticated;

-- Tabel: akses lewat RLS di atas
grant select, insert, update, delete on public.pas_jawaban, public.pas_draft, public.pas_masuk, public.pas_token, public.pas_siswa to authenticated;
grant select on public.pas_guru to authenticated;
grant select on public.pas_siswa to anon;
revoke insert, update, delete on public.pas_jawaban, public.pas_draft, public.pas_masuk, public.pas_token, public.pas_siswa, public.pas_guru from anon;
revoke select on public.pas_jawaban, public.pas_draft, public.pas_masuk, public.pas_token, public.pas_guru from anon;

-- =====================================================================
--  DAFTARKAN EMAIL GURU (ganti dengan email akun guru yang sudah dibuat
--  di Authentication > Users). Satu baris per guru.
-- =====================================================================
-- insert into public.pas_guru (email) values ('guru1@contoh.com'), ('guru2@contoh.com') on conflict do nothing;
