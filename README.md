# Portal Ujian PAS Semester Ganjil

Portal ujian berbasis web untuk Bahasa Indonesia dan Matematika, kelas 5 dan 6.
Setiap mapel berisi 30 soal: 5 PG beralasan, 5 Benar/Salah beralasan, 5 PG kompleks, 10 isian, 5 uraian.
Ada 4 paket soal, masing-masing dengan token sendiri: `bind5`, `mtk5`, `bind6`, `mtk6`. **Isi soal dan kunci saat ini masih dummy** (kelas 5 dan 6 sementara memakai soal yang sama).

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman siswa (login, mengerjakan, kirim) |
| `guru.html` | Halaman guru (pantauan, token, nilai per soal/siswa, rekap, unduh Excel per kelas) |
| `config.js` | Pengaturan: nama sekolah, Supabase, bobot skor, rubrik |
| `soal.js` | Bank soal (tanpa kunci) — dimuat halaman siswa |
| `kunci.js` | Kunci jawaban, acuan alasan, rubrik uraian — hanya dimuat halaman guru |
| `supabase/schema.sql` | Tabel, aturan keamanan, dan fungsi server (jalankan sekali di Supabase SQL Editor) |
| `assets/` | CSS, ikon, lapisan database, mesin penskoran |

## Cara mencoba (mode demo)
1. Buka `index.html`, kerjakan satu mapel, lalu kirim.
2. Buka `guru.html` di **browser yang sama**, PIN demo `123456`.
3. Klik **Isi data contoh** untuk menambah 8 siswa fiktif agar bisa mencoba fitur penilaian.

Mode demo menyimpan data di browser tersebut saja (localStorage), jadi hanya untuk uji coba.

## Memakai untuk ujian sungguhan (Supabase)
1. Buat proyek di supabase.com (region **Southeast Asia (Singapore)**). Simpan password database-nya.
2. **SQL Editor → New query** → tempel seluruh isi `supabase/schema.sql` → **Run**.
3. **Authentication → Sign In / Providers**: matikan **Allow new users to sign up** (agar orang lain tidak bisa membuat akun sendiri). Email provider tetap aktif.
4. **Authentication → Users → Add user → Create new user** untuk tiap guru (email + password, centang *Auto Confirm User*).
5. Daftarkan akun dan perannya di SQL Editor:
   `insert into pas_guru (email, peran) values ('admin@...', 'admin'), ('guru1@...', 'guru') on conflict (email) do update set peran = excluded.peran;`
   - **admin**: akses penuh (Pantauan, Token, Data siswa, Buka kembali, koreksi, rekap).
   - **guru**: hanya Nilai per soal, Nilai per siswa, dan Rekap nilai (termasuk unduh Excel).
6. **Project Settings → API** → salin **Project URL** dan kunci **anon / publishable** ke `config.js` bagian `SUPABASE`, lalu deploy (GitHub Pages). Label pojok kanan atas berubah menjadi **Online**.
7. Masuk `guru.html` → tab **Data siswa** → pilih file `daftar_pd-....xlsx` dari Dapodik → centang kelas 5 dan 6 → **Simpan ke database**.
8. Proyek Supabase gratis **dijeda setelah 7 hari tidak dipakai**. Buka portal (atau dashboard Supabase) minimal seminggu sekali, dan cek dashboard sehari sebelum ujian.

Siswa masuk dengan memilih **kelas** lalu **nama** dari daftar. Nomor siswa = urutan nama (A–Z) di rombelnya, jadi **jangan import ulang saat ujian sedang berjalan**. Daftar nama disimpan di database Supabase, bukan di repo, agar tidak terbuka di GitHub.


## Penskoran (bisa diubah di `config.js` → `SKOR`)

| Bagian | Otomatis | Manual oleh guru | Maks/soal | Jumlah soal | Maks bagian |
|---|---|---|---|---|---|
| A. PG beralasan | Pilihan benar = 1 | Alasan benar = 1 (tetap dinilai walau pilihan salah) | 2 | 5 | 10 |
| B. Benar/Salah beralasan | Pilihan benar = 1 | Alasan benar = 1 (tetap dinilai walau pilihan salah) | 2 | 5 | 10 |
| C. PG kompleks | Maks 1 (parsial: (benar − salah) / jumlah kunci) | – | 1 | 5 | 5 |
| D. Isian | Dicocokkan dengan daftar jawaban di `kunci.js` | Guru bisa mengubah benar/salah | 1 | 10 | 10 |
| E. Uraian | – | 0–3 sesuai rubrik | 3 | 5 | 15 |

Total maksimal 50 → **Nilai = skor ÷ 50 × 100**.

Skor maksimal uraian dan PG kompleks bisa diatur per soal lewat `maks` (dan panduan `skor` untuk uraian) di `kunci.js`. Nilai selalu = skor ÷ skor maksimal paket × 100.

- Bahasa Indonesia Kelas 5: maksimal 56 (PGK 1 per soal; uraian 5, 4, 4, 4, 4)
- Bahasa Indonesia Kelas 6: maksimal 63 (PGK 2 per soal: lengkap 2, sebagian 1; uraian 5, 4, 5, 4, 5)
Alasan atau uraian yang dikosongkan siswa otomatis bernilai 0.
`ALASAN_HANYA_JIKA_JAWABAN_BENAR: false`: alasan tetap dinilai guru walaupun pilihan jawabannya salah (ubah ke `true` agar alasan otomatis 0 bila pilihan salah). PG kompleks bisa dibuat harus tepat semua dengan `mode: "mutlak"`.

Dua cara menilai:
- **Nilai per siswa** — buka satu siswa, nilai semua jawabannya, lalu "Siswa berikutnya".
- **Nilai per soal** — pilih satu soal, nilai alasan/uraian semua siswa sekaligus. Ini cara tercepat dan paling konsisten.

Setiap klik skor langsung tersimpan. Status siswa: *Belum dinilai → Sebagian → Selesai*.

## Mengganti soal
Edit `soal.js` (teks & opsi) dan `kunci.js` (kunci dengan ID yang sama). Format ada di komentar bagian atas kedua file.
Untuk PG, gunakan huruf `"A"`–`"E"`; untuk B/S gunakan `"B"` atau `"S"`; untuk PG kompleks gabungan huruf, mis. `"ACD"`.

## Catatan keamanan
- Siswa tidak membaca/menulis tabel secara langsung; semua lewat fungsi server di `schema.sql` yang memeriksa token, mengunci waktu mulai, dan menolak kiriman kedua. Siswa tidak bisa menyertakan nilai.
- Daftar jawaban, penilaian, token, dan penghapusan hanya untuk akun yang emailnya ada di tabel `pas_guru`.
- Kunci `anon` Supabase memang terbuka di kode web; keamanannya dijaga Row Level Security dan fungsi server.
- `kunci.js` tidak dimuat halaman siswa, tetapi tetap bisa dibuka bila alamatnya diketik. Untuk soal asli, unggah `kunci.js` setelah ujian selesai.
- Satu kombinasi mapel + kelas + absen hanya bisa mengirim sekali. Guru dapat menghapus jawaban agar siswa bisa mengulang.
