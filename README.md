# Portal Ujian PAS Semester 1

Portal ujian berbasis web untuk 4 mapel: Bahasa Indonesia & Pendidikan Pancasila, IPAS, PAIBP, dan Matematika.
Setiap mapel berisi 30 soal: 5 PG beralasan, 5 Benar/Salah beralasan, 5 PG kompleks, 10 isian, 5 uraian.
**Soal dan kunci saat ini masih dummy (kelas 5).**

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman siswa (login, mengerjakan, kirim) |
| `guru.html` | Halaman guru (rekap, nilai per siswa, nilai per soal, export CSV) |
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
5. Isi `KELAS` dan bila perlu `TOKEN` per mapel, lalu deploy (GitHub Pages). Label pojok kanan atas berubah menjadi **Online**.

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
- Aturan Firestore: siswa hanya bisa mengirim sekali dan tidak bisa menyertakan nilai; daftar jawaban, penilaian, dan penghapusan hanya untuk guru yang login.
- `apiKey` Firebase memang terbuka di kode web; keamanannya dijaga oleh rules.
- `kunci.js` tidak dimuat halaman siswa, tetapi tetap bisa dibuka bila alamatnya diketik. Untuk soal asli, unggah `kunci.js` setelah ujian selesai.
- Satu kombinasi mapel + kelas + absen hanya bisa mengirim sekali. Guru dapat menghapus jawaban agar siswa bisa mengulang.
