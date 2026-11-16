-- Jalankan di Supabase > SQL Editor
create table if not exists public.pas_jawaban (
  id            uuid primary key default gen_random_uuid(),
  mapel         text not null,
  kelas         text not null,
  absen         int  not null,
  nama          text not null,
  jawaban       jsonb not null default '{}'::jsonb,
  nilai_manual  jsonb not null default '{}'::jsonb,
  skor_otomatis numeric,
  skor_manual   numeric,
  nilai_akhir   numeric,
  status        text not null default 'belum',   -- belum | sebagian | selesai
  mulai_at      timestamptz,
  dikirim_at    timestamptz not null default now(),
  dinilai_at    timestamptz,
  unique (mapel, kelas, absen)
);

alter table public.pas_jawaban enable row level security;

-- Kebijakan sederhana untuk pemakaian sekolah (anon key).
-- Catatan: siapa pun yang memegang anon key dapat membaca tabel ini.
create policy "anon select" on public.pas_jawaban for select to anon using (true);
create policy "anon insert" on public.pas_jawaban for insert to anon with check (true);
create policy "anon update" on public.pas_jawaban for update to anon using (true) with check (true);
create policy "anon delete" on public.pas_jawaban for delete to anon using (true);
