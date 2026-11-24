# Portal Ujian PAS Semester Ganjil

Portal ujian berbasis web untuk Bahasa Indonesia dan Matematika, kelas 5 dan 6.
Setiap mapel berisi 30 soal: 5 PG beralasan, 5 Benar/Salah beralasan, 5 PG kompleks, 10 isian, 5 uraian.
Ada 4 paket soal, masing-masing dengan token sendiri: `bind5`, `mtk5`, `bind6`, `mtk6`. **Isi soal dan kunci saat ini masih dummy** (kelas 5 dan 6 sementara memakai soal yang sama).

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman siswa (login, mengerjakan, kirim) |
| `guru.html` | Halaman guru (pantauan, token, nilai per soal/siswa, rekap, unduh Excel per kelas) |
| `config.js` | Pengaturan: nama sekolah, kelas, token, Firebase, bobot skor, rubrik |
| `soal.js` | Bank soal (tanpa kunci) — dimuat halaman siswa |
| `kunci.js` | Kunci jawaban, acuan alasan, rubrik uraian — hanya dimuat halaman guru |
| `firestore.rules` | Aturan keamanan Firestore (tempel di Firebase Console) |
| `assets/` | CSS, ikon, lapisan database, mesin penskoran |

## Cara mencoba (mode demo)
1. Buka `index.html`, kerjakan satu mapel, lalu kirim.
2. Buka `guru.html` di **browser yang sama**, PIN demo `123456`.
3. Klik **Isi data contoh** untuk menambah 8 siswa fiktif agar bisa mencoba fitur penilaian.

Mode demo menyimpan data di browser tersebut saja (localStorage), jadi hanya untuk uji coba.

## Memakai untuk ujian sungguhan (Firebase)
1. Firebase Console → **Firestore Database** → Create database (lokasi `asia-southeast2`, Production mode).
2. Tab **Rules** → tempel isi `firestore.rules` → **Publish**.
3. **Authentication** → aktifkan Email/Password → **Users → Add user** untuk tiap guru penilai.
4. **Project settings → Your apps → Web** → salin `firebaseConfig` ke `config.js` bagian `FIREBASE`.
5. Bila perlu isi `TOKEN` per mapel, lalu deploy (GitHub Pages). Label pojok kanan atas berubah menjadi **Online**.
6. Masuk `guru.html` → tab **Data siswa** → pilih file `daftar_pd-....xlsx` dari Dapodik → centang tingkat (default kelas 5 dan 6) → **Simpan ke database**.

Siswa masuk dengan memilih **kelas** lalu **nama** dari daftar. Nomor siswa = urutan nama (A–Z) di rombelnya, jadi **jangan import ulang saat ujian sedang berjalan**. Daftar nama disimpan di Firestore, bukan di repo, agar tidak terbuka di GitHub.


## Penskoran (bisa diubah di `config.js` → `SKOR`)

| Bagian | Otomatis | Manual oleh guru | Maks/soal | Jumlah soal | Maks bagian |
|---|---|---|---|---|---|
| A. PG beralasan | Pilihan benar = 1 | Alasan benar = 1 | 2 | 5 | 10 |
| B. Benar/Salah beralasan | Pilihan benar = 1 | Alasan benar = 1 | 2 | 5 | 10 |
| C. PG kompleks | Maks 1 (parsial: (benar − salah) / jumlah kunci) | – | 1 | 5 | 5 |
| D. Isian | Dicocokkan dengan daftar jawaban di `kunci.js` | Guru bisa mengubah benar/salah | 1 | 10 | 10 |
| E. Uraian | – | 0–3 sesuai rubrik | 3 | 5 | 15 |

Total maksimal 50 → **Nilai = skor ÷ 50 × 100**.

Skor maksimal uraian bisa diatur per soal lewat `maks` dan panduan `skor` di `kunci.js`. Contohnya Bahasa Indonesia Kelas 5 memakai uraian 5, 4, 4, 4, 4, sehingga total maksimalnya 56 dan nilai = skor ÷ 56 × 100.
Alasan atau uraian yang dikosongkan siswa otomatis bernilai 0.
`ALASAN_HANYA_JIKA_JAWABAN_BENAR: true` membuat alasan otomatis 0 bila pilihan jawabannya salah. PG kompleks bisa dibuat harus tepat semua dengan `mode: "mutlak"`.

Dua cara menilai:
- **Nilai per siswa** — buka satu siswa, nilai semua jawabannya, lalu "Siswa berikutnya".
- **Nilai per soal** — pilih satu soal, nilai alasan/uraian semua siswa sekaligus. Ini cara tercepat dan paling konsisten.

Setiap klik skor langsung tersimpan. Status siswa: *Belum dinilai → Sebagian → Selesai*.

## Mengganti soal
Edit `soal.js` (teks & opsi) dan `kunci.js` (kunci dengan ID yang sama). Format ada di komentar bagian atas kedua file.
Untuk PG, gunakan huruf `"A"`–`"E"`; untuk B/S gunakan `"B"` atau `"S"`; untuk PG kompleks gabungan huruf, mis. `"ACD"`.

## Catatan keamanan
- Aturan Firestore: siswa hanya bisa mengirim sekali dan tidak bisa menyertakan nilai; daftar jawaban, penilaian, dan penghapusan hanya untuk guru yang login.
- `apiKey` Firebase memang terbuka di kode web; keamanannya dijaga oleh rules.
- `kunci.js` tidak dimuat halaman siswa, tetapi tetap bisa dibuka bila alamatnya diketik. Untuk soal asli, unggah `kunci.js` setelah ujian selesai.
- Satu kombinasi mapel + kelas + absen hanya bisa mengirim sekali. Guru dapat menghapus jawaban agar siswa bisa mengulang.
