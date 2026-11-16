# Portal Ujian PAS Semester 1

Portal ujian berbasis web untuk 4 mapel: Bahasa Indonesia & Pendidikan Pancasila, IPAS, PAIBP, dan Matematika.
Setiap mapel berisi 30 soal: 5 PG beralasan, 5 Benar/Salah beralasan, 5 PG kompleks, 10 isian, 5 uraian.
**Soal dan kunci saat ini masih dummy (kelas 5).**

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman siswa (login, mengerjakan, kirim) |
| `guru.html` | Halaman guru (rekap, nilai per siswa, nilai per soal, export CSV) |
| `config.js` | Pengaturan: nama sekolah, kelas, PIN guru, token, Supabase, bobot skor, rubrik |
| `soal.js` | Bank soal (tanpa kunci) — dimuat halaman siswa |
| `kunci.js` | Kunci jawaban, acuan alasan, rubrik uraian — hanya dimuat halaman guru |
| `supabase.sql` | Skrip pembuatan tabel di Supabase |
| `assets/` | CSS, ikon, lapisan database, mesin penskoran |

## Cara mencoba (mode demo)
1. Buka `index.html`, kerjakan satu mapel, lalu kirim.
2. Buka `guru.html` di **browser yang sama**, PIN default `123456`.
3. Klik **Isi data contoh** untuk menambah 8 siswa fiktif agar bisa mencoba fitur penilaian.

Mode demo menyimpan data di browser tersebut saja (localStorage), jadi hanya untuk uji coba.

## Memakai untuk ujian sungguhan (Supabase)
1. Buat project di supabase.com, buka **SQL Editor**, jalankan isi `supabase.sql`.
2. Salin **Project URL** dan **anon public key** ke `config.js` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
3. Ganti `PIN_GURU`, isi `KELAS`, dan bila perlu `TOKEN` per mapel.
4. Unggah folder ke hosting (GitHub Pages, Netlify, atau hosting harisdevlab). Label di pojok kanan atas berubah menjadi **Online**.

## Penskoran (bisa diubah di `config.js` → `SKOR`)

| Bagian | Otomatis | Manual oleh guru | Maks/soal |
|---|---|---|---|
| A. PG beralasan | Pilihan benar = 1 | Alasan 0–2 | 3 |
| B. Benar/Salah beralasan | Pilihan benar = 1 | Alasan 0–2 | 3 |
| C. PG kompleks | Parsial: (benar − salah) / jumlah kunci × 2 | – | 2 |
| D. Isian | Dicocokkan dengan daftar jawaban di `kunci.js` | Guru bisa mengubah benar/salah | 1 |
| E. Uraian | – | 0–4 sesuai rubrik | 4 |

Total maksimal 70 → **Nilai = skor ÷ 70 × 100**.
Alasan atau uraian yang dikosongkan siswa otomatis bernilai 0, jadi guru hanya menilai yang benar-benar diisi.

Dua cara menilai:
- **Nilai per siswa** — buka satu siswa, nilai semua jawabannya, lalu "Siswa berikutnya".
- **Nilai per soal** — pilih satu soal, nilai alasan/uraian semua siswa sekaligus. Ini cara tercepat dan paling konsisten.

Setiap klik skor langsung tersimpan. Status siswa: *Belum dinilai → Sebagian → Selesai*.

## Mengganti soal
Edit `soal.js` (teks & opsi) dan `kunci.js` (kunci dengan ID yang sama). Format ada di komentar bagian atas kedua file.
Untuk PG, gunakan huruf `"A"`–`"E"`; untuk B/S gunakan `"B"` atau `"S"`; untuk PG kompleks gabungan huruf, mis. `"ACD"`.

## Catatan keamanan
- `kunci.js` tidak dimuat oleh halaman siswa, tetapi tetap bisa dibuka jika seseorang mengetik alamat filenya. Untuk ujian sungguhan, unggah `kunci.js` dan `guru.html` hanya saat penilaian, atau taruh di folder terpisah.
- PIN guru dan anon key ada di `config.js` sehingga terbaca oleh siapa pun yang membuka sumber halaman. Cukup untuk lingkungan sekolah, bukan untuk data yang sangat rahasia.
- Satu kombinasi mapel + kelas + absen hanya bisa mengirim sekali. Guru bisa menghapus jawaban (ikon tempat sampah di rekap) agar siswa dapat mengulang.
