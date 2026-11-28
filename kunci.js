/* =========================================================
   KUNCI JAWABAN & PEDOMAN PENSKORAN (DUMMY)
   Hanya dimuat oleh guru.html.

   pg    : k = huruf jawaban ("A".."E"), alasan = acuan alasan yang benar
   bs    : k = "B" (Benar) / "S" (Salah), alasan = acuan alasan
   pgk   : k = gabungan huruf, mis. "ABD"
   isian : k = daftar jawaban yang diterima (huruf besar/kecil & spasi diabaikan)
   essay : rubrik = pedoman / jawaban acuan
   ========================================================= */
window.KUNCI = {
  /* ===== Matematika (dasar dummy: awalan MT) ===== */
  "MT-PG1": { k: "C", alasan: "12 = 2²×3, 18 = 2×3²; KPK = 2²×3² = 36 (atau kelipatan persekutuan terkecil)." },
  "MT-PG2": { k: "C", alasan: "24 = 2³×3, 36 = 2²×3²; FPB = 2²×3 = 12." },
  "MT-PG3": { k: "B", alasan: "3/4 + 2/4 = 5/4 = 1 1/4." },
  "MT-PG4": { k: "C", alasan: "Persegi panjang dibagi 4 bagian sama besar dan 3 bagian diarsir, jadi 3/4." },
  "MT-PG5": { k: "B", alasan: "2,5 − 1,75 = 0,75 = 3/4 kg." },

  "MT-BS1": { k: "B", alasan: "2/3 = 10/15 dan 3/5 = 9/15, sehingga 2/3 lebih besar." },
  "MT-BS2": { k: "S", alasan: "Kelipatan 4: 4, 8, 12; kelipatan 6: 6, 12; KPK = 12." },
  "MT-BS3": { k: "B", alasan: "25% = 25/100 = 1/4." },
  "MT-BS4": { k: "S", alasan: "1/2 × 2/3 = 2/6 = 1/3." },
  "MT-BS5": { k: "B", alasan: "7 hanya memiliki dua faktor, yaitu 1 dan 7." },

  "MT-PGK1": { k: "ABD" },
  "MT-PGK2": { k: "ACD" },
  "MT-PGK3": { k: "ACE" },
  "MT-PGK4": { k: "BCE" },
  "MT-PGK5": { k: "ACE" },

  "MT-IS1": { k: ["3/8"] },
  "MT-IS2": { k: ["50%", "50 persen", "50"] },
  "MT-IS3": { k: ["15"] },
  "MT-IS4": { k: ["4"] },
  "MT-IS5": { k: ["5/2"] },
  "MT-IS6": { k: ["6"] },
  "MT-IS7": { k: ["2", "2,0", "2,00"] },
  "MT-IS8": { k: ["20"] },
  "MT-IS9": { k: ["1/2"] },
  "MT-IS10": { k: ["2x2x3", "2^2x3", "2²x3", "2pangkat2x3"] },

  "MT-ES1": { rubrik: "KPK 6 dan 8 = 24. Menyala bersama lagi 24 detik kemudian, pukul 08.00.24. Skor 3 = cara (KPK) + jawaban benar; 2 = cara benar tetapi jawaban salah; 1 = jawaban tanpa cara." },
  "MT-ES2": { rubrik: "FPB 24 dan 36 = 12. Jadi 12 kantong; tiap kantong 2 apel dan 3 jeruk." },
  "MT-ES3": { rubrik: "3 1/2 − 1 1/4 = 3 2/4 − 1 1/4 = 2 1/4 meter." },
  "MT-ES4": { rubrik: "Ubah ke desimal: 0,45; 0,5; 0,6; 0,4. Urutan: 2/5 ; 0,45 ; 1/2 ; 60%." },
  "MT-ES5": { rubrik: "Diskon = 25% × 20.000 = 5.000. Harga bayar = 20.000 − 5.000 = Rp15.000,00." }
};

/* Kunci dummy untuk paket yang belum ada soal aslinya: MT-* ke M6-*.
   Hapus awalan dari peta setelah kunci asli paket itu diisi. */
(function () {
  const peta = {};
  Object.keys(KUNCI).forEach(id => {
    const [awal, sisa] = [id.split("-")[0], id.slice(id.indexOf("-"))];
    if (!peta[awal]) return;
    peta[awal].forEach(p => { if (!KUNCI[p + sisa]) KUNCI[p + sisa] = KUNCI[id]; });
    delete KUNCI[id];
  });
})();

/* ===== Bahasa Indonesia Kelas 5 — kunci dari FORMAT_KISI_KUNJAW_SAS_L5 =====
   Skor maksimal 56: PG 5×2, B/S 5×2, PGK 5×1, Isian 10×1, Uraian 5+4+4+4+4.
   PGK: lengkap & tepat = 1, sebagian tepat = 0,5 (kriteria 2/1/0 di file disetarakan ke maksimal 1).
   "alasan" = acuan untuk guru saat menilai alasan siswa. */
Object.assign(window.KUNCI, {
  "B5-PG1": { k: "B", alasan: "Inti cerita: teman-teman sekelompok bersama-sama membantu Raka menyelamatkan tanaman cabainya yang layu." },
  "B5-PG2": { k: "D", alasan: "Raka menyesal karena lupa tugasnya (tanggung jawab), dan masalahnya selesai berkat bantuan teman-teman (bersama-sama)." },
  "B5-PG3": { k: "A", alasan: "Dinda menghampiri Raka sambil membawa ember dan mengajak menyelamatkan tanaman bersama, tanda ia peduli dan suka menolong." },
  "B5-PG4": { k: "C", alasan: "Rajin bersinonim dengan giat (sama arti) dan berantonim dengan malas (lawan arti)." },
  "B5-PG5": { k: "B", alasan: "Ombak (benda mati) digambarkan dapat berkejaran dan memeluk seperti manusia. A simile/hiperbola, C ungkapan, D kalimat biasa." },

  "B5-BS1": { k: "B", alasan: "Gotong royong tidak harus turun langsung; Bu Sari ikut membantu dengan menyiapkan minuman untuk peserta kerja bakti." },
  "B5-BS2": { k: "S", alasan: "Pelanggaran norma kesopanan sanksinya sosial (dicela, dikucilkan, ditegur), bukan penjara. Penjara adalah sanksi norma hukum." },
  "B5-BS3": { k: "S", alasan: "Kata ganti orang harus diubah: “kalian” menjadi “mereka”, sehingga: Pak RT berpesan kepada warga bahwa mereka harus membawa kantong sampah." },
  "B5-BS4": { k: "B", alasan: "membersihkan = me- + bersih + -kan (konfiks me-kan)." },
  "B5-BS5": { k: "S", alasan: "Kalimat itu memakai kata pembanding “seperti”, jadi majas simile (perumpamaan), bukan personifikasi." },

  "B5-PGK1": { k: "AC", maks: 1, sebagian: 0.5 },
  "B5-PGK2": { k: "BD", maks: 1, sebagian: 0.5 },
  "B5-PGK3": { k: "AD", maks: 1, sebagian: 0.5 },
  "B5-PGK4": { k: "BC", maks: 1, sebagian: 0.5 },
  "B5-PGK5": { k: "CD", maks: 1, sebagian: 0.5 },

  "B5-IS1":  { k: ["gotong royong", "gotong-royong", "bergotong royong", "bergotong-royong", "nilai gotong royong"] },
  "B5-IS2":  { k: ["kesopanan", "norma kesopanan"] },
  "B5-IS3":  { k: ["ke-an", "ke-...-an", "ke...an", "ke- -an", "ke-/-an", "ke- dan -an", "kean", "konfiks ke-an", "imbuhan ke-an"] },
  "B5-IS4":  { k: ["kikir", "pelit", "kikir/pelit"] },
  "B5-IS5":  { k: ["simile", "majas simile", "perumpamaan", "majas perumpamaan", "persamaan", "majas persamaan"] },
  "B5-IS6":  { k: ["Ibu berkata bahwa dia akan ikut kerja bakti besok", "Ibu berkata bahwa ia akan ikut kerja bakti besok",
                   "Ibu mengatakan bahwa dia akan ikut kerja bakti besok", "Ibu mengatakan bahwa ia akan ikut kerja bakti besok",
                   "Ibu berkata, bahwa dia akan ikut kerja bakti besok"] },
  "B5-IS7":  { k: ["teras rumah Nenek", "di teras rumah Nenek", "teras rumah", "di teras rumah", "teras", "di teras"] },
  "B5-IS8":  { k: ["2", "dua", "2 (dua)", "(2)", "nomor 2", "nomor dua", "kalimat 2", "kalimat nomor 2", "kalimat (2)"] },
  "B5-IS9":  { k: ["kotor"] },
  "B5-IS10": { k: ["hukum", "norma hukum"] },

  "B5-ES1": { maks: 5,
    rubrik: "Jawaban disesuaikan dengan pemikiran siswa. Memuat 5 elemen: tokoh (Pak Joko, Rani, teman-teman/pedagang), watak Rani (peduli/suka menolong) beserta bukti, latar (pasar; Minggu pagi sampai menjelang siang), amanat (saling menolong/bergotong royong saat ada yang kesusahan), dan contoh gotong royong sehari-hari.",
    skor: { 5: "Sangat tepat dan jelas, memenuhi 5 elemen cerita", 4: "Memenuhi 4 dari 5 elemen", 3: "Memenuhi 3 dari 5 elemen", 2: "Memenuhi 2 dari 5 elemen", 1: "Memenuhi 1 dari 5 elemen", 0: "Tidak menjawab" } },
  "B5-ES2": { maks: 4,
    rubrik: "Jawaban disesuaikan dengan pemikiran siswa. Paragraf memuat 4 konten: isi sesuai fakta, memuat kata sifat, kalimat langsung lengkap, ejaan benar.",
    skor: { 4: "Memuat 4 konten dalam paragraf secara jelas", 3: "Memuat 3 konten", 2: "Memuat 2 konten", 1: "Memuat 1 konten", 0: "Tidak menjawab" } },
  "B5-ES3": { maks: 4,
    rubrik: "a. membersihkan = bersih + me-kan; kebersamaan = bersama + ke-an; berbagi = bagi + ber-; terkumpul = kumpul + ter-. b. Kalimat lengkap, logis, bertema gotong royong, memakai kata “menolong”.",
    skor: { 4: "4 kata dasar dan imbuhan tepat, kalimat lengkap, logis, bertema gotong royong", 3: "3 kata dasar dan imbuhan tepat, kalimat lengkap, logis, bertema gotong royong", 2: "2 kata dasar dan imbuhan tepat, kalimat kurang lengkap", 1: "1 kata dasar dan imbuhan tepat, kalimat tidak lengkap", 0: "Tidak menjawab" } },
  "B5-ES4": { maks: 4,
    rubrik: "a. Dina berkata kepada ayahnya bahwa dia ingin ikut membersihkan sungai agar airnya jernih lagi. b. Personifikasi, karena matahari (benda mati) digambarkan dapat tersenyum seperti manusia.",
    skor: { 4: "Kalimat tidak langsung lengkap, ejaan tepat; personifikasi dengan alasan logis", 3: "Kalimat tidak langsung lengkap, ejaan kurang tepat; alasan kurang logis", 2: "Kalimat tidak langsung kurang lengkap, ejaan kurang tepat; alasan tidak logis", 1: "Kalimat tidak langsung tidak lengkap, ejaan tidak tepat; alasan tidak logis", 0: "Tidak menjawab" } },
  "B5-ES5": { maks: 4,
    rubrik: "Jawaban disesuaikan dengan pemikiran siswa. a. Musyawarah warga, membuat jadwal piket kebersihan, memasang papan larangan membuang sampah. b. Sikap Bu Lina kurang tepat: membayar iuran tidak menggantikan kewajiban ikut gotong royong, dan ia tidak menghargai hasil musyawarah. c. Contoh: “Bu Lina, mari kita ikut piket bersama agar lingkungan kita bersih dan tidak banjir lagi.”",
    skor: { 4: "Menjawab 3 pertanyaan secara jelas dan tepat dengan alasan logis", 3: "Menjawab 3 pertanyaan kurang jelas dan tepat, alasan kurang logis", 2: "Menjawab 2 pertanyaan secara jelas dan tepat", 1: "Menjawab 1 pertanyaan secara jelas dan tepat", 0: "Tidak menjawab" } }
});

/* ===== Bahasa Indonesia Kelas 6 — kunci dari FORMAT_KISI_KUNJAW_SAS_L6x =====
   Skor maksimal 63: PG 5×2, B/S 5×2, PGK 5×2, Isian 10×1, Uraian 5+4+5+4+5.
   PGK: lengkap & tepat = 2, sebagian tepat = 1, salah = 0. */
Object.assign(window.KUNCI, {
  "B6-PG1": { k: "A", alasan: "Lengang berarti sunyi/sepi (sinonim); lawannya ramai (antonim), sesuai kalimat “kini ramai dilalui anak-anak”." },
  "B6-PG2": { k: "B", alasan: "Ide pokok mewakili seluruh isi laporan; pilihan lain hanya rincian (detail) hari tertentu atau syarat tumbuh." },
  "B6-PG3": { k: "C", alasan: "Buku dibandingkan langsung dengan jendela dunia tanpa kata pembanding. A dan D simile (laksana, secepat), B kalimat biasa." },
  "B6-PG4": { k: "D", alasan: "Sesuai teks: sampah menyumbat selokan, akibatnya air meluap ke jalan dan permukiman. Pilihan lain membalik atau mengarang hubungan sebab-akibat." },
  "B6-PG5": { k: "B", alasan: "Sila ketiga menjaga persatuan dalam keberagaman: semua daerah diberi kesempatan dan saling menghargai." },

  "B6-BS1": { k: "B", alasan: "Lengang bersinonim dengan sepi, jadi makna kedua kalimat sama." },
  "B6-BS2": { k: "S", alasan: "Teks eksplanasi bertujuan menjelaskan proses terjadinya suatu peristiwa, bukan mengajak pembaca." },
  "B6-BS3": { k: "B", alasan: "Kalimat pertama berisi pendapat (tesis), kalimat berikutnya alasan yang mendukung (argumen)." },
  "B6-BS4": { k: "S", alasan: "Surat undangan kepala sekolah kepada orang tua adalah surat resmi/dinas, sehingga harus memakai bahasa baku dan santun." },
  "B6-BS5": { k: "S", alasan: "Menganggap daerah sendiri paling unggul dan menolak produk daerah lain bertentangan dengan persatuan (sila ketiga); cinta tanah air berarti menghargai semua daerah." },

  "B6-PGK1": { k: "AB",  maks: 2 },
  "B6-PGK2": { k: "ABC", maks: 2 },
  "B6-PGK3": { k: "AC",  maks: 2 },
  "B6-PGK4": { k: "AC",  maks: 2 },
  "B6-PGK5": { k: "ABD", maks: 2 },

  "B6-IS1":  { k: ["memperhatikan", "meneliti", "memantau", "menyimak", "mencermati"] },
  "B6-IS2":  { k: ["miskin", "melarat", "sengsara", "papa"] },
  "B6-IS3":  { k: ["kumis", "kumisnya", "kumis kucing"] },
  "B6-IS4":  { k: ["simile", "simile (perumpamaan)", "majas simile", "perumpamaan", "majas perumpamaan", "persamaan"] },
  "B6-IS5":  { k: ["prestasi", "penghargaan", "bagian prestasi", "prestasi/penghargaan"] },
  "B6-IS6":  { k: ["urutan", "kerunutan", "tidak berurutan", "urutan langkah", "susunan", "urutannya"] },
  "B6-IS7":  { k: ["penegasan ulang", "penegasan ulang tesis", "kesimpulan", "penegasan"] },
  "B6-IS8":  { k: ["ajakan", "kalimat ajakan", "seruan"] },
  "B6-IS9":  { k: ["salam penutup", "penutup"] },
  "B6-IS10": { k: ["3", "ketiga", "tiga", "ke-3", "3 (ketiga)", "3 (tiga)", "3 persatuan indonesia", "3 (ketiga) – persatuan indonesia", "3 - persatuan indonesia", "ketiga persatuan indonesia", "persatuan indonesia"] },

  "B6-ES1": { maks: 5,
    rubrik: "Jawaban disesuaikan dengan pemikiran siswa. a. Contoh: Banyak orang tua berhenti di depan gerbang sehingga jalan menyempit. Karena jalan menyempit, kendaraan lain berjalan pelan sehingga antrean memanjang. Akibatnya bus sekolah dan angkot terjebak. b. Usul terkait penyebab utama (kendaraan berhenti di depan gerbang), mis. tempat penjemputan khusus/parkir di halaman, beserta alasannya.",
    skor: { 5: "3 tahap runtut, memakai kata sebab-akibat, usul terkait penyebab utama disertai alasan", 4: "3 tahap runtut, kata sebab-akibat, usul terkait penyebab utama tanpa alasan", 3: "2 tahap runtut, kata sebab-akibat, usul terkait penyebab utama disertai alasan", 2: "2 tahap runtut, kata sebab-akibat, tanpa usul terkait penyebab utama", 1: "1 tahap runtut, kata sebab-akibat, tanpa usul terkait penyebab utama", 0: "Tidak menjawab" } },
  "B6-ES2": { maks: 4,
    rubrik: "Jawaban disesuaikan dengan pemikiran siswa. a. Kalimat (4), karena berisi pendapat/berlebihan, bukan fakta hasil pengamatan. b. Contoh: Taman ini ditumbuhi bunga melati dan mawar yang terawat. c. Ide pokok: keadaan taman sekolah hasil pengamatan.",
    skor: { 4: "3 jawaban sesuai dan tepat", 3: "3 jawaban kurang sesuai dan tepat", 2: "2 jawaban sesuai dan tepat", 1: "1 jawaban sesuai dan tepat", 0: "Tidak menjawab" } },
  "B6-ES3": { maks: 5,
    rubrik: "Jawaban disesuaikan dengan pemikiran siswa. 5 kriteria: isi sesuai tema Hari Pahlawan dan cinta tanah air, menyebut tindakan nyata di sekolah, memuat satu kalimat ajakan, bahasa baku, kalimat efektif dan ejaan benar.",
    skor: { 5: "Isi pidato lengkap dengan memperhatikan 5 kriteria", 4: "Isi pidato 4 dari 5 kalimat, memperhatikan 5 kriteria", 3: "Isi pidato lengkap, memperhatikan 4 dari 5 kriteria", 2: "Kurang dari 4 kalimat, tanpa memperhatikan 5 kriteria", 1: "Kurang lengkap dan kurang memperhatikan 5 kriteria", 0: "Tidak menjawab" } },
  "B6-ES4": { maks: 4,
    rubrik: "Jawaban disesuaikan dengan pemikiran siswa. a. Bagian yang belum ada, mis.: tempat dan tanggal surat, salam pembuka, salam penutup, tanda tangan/nama terang (dan nama orang tua). b. Surat izin ditulis ulang dengan bahasa baku, sopan, dan bagian surat lengkap.",
    skor: { 4: "Menyebut 2 bagian yang belum ada dan menulis ulang dengan bahasa baku dan sopan secara tepat", 3: "Menyebut 2 bagian dan menulis ulang, kurang baku/sopan", 2: "Menyebut 2 bagian dan menulis ulang", 1: "Menyebut 2 bagian, tidak menulis ulang", 0: "Tidak menjawab" } },
  "B6-ES5": { maks: 5,
    rubrik: "Jawaban disesuaikan dengan pemikiran siswa. a. Sikap bertentangan: mengejek logat teman, membeda-bedakan/tidak mau bermain bersama, membentuk kelompok-kelompok kecil (beserta alasannya). b. Contoh tindakan: berkenalan dan bermain bersama tanpa membedakan daerah, membuat kelompok belajar campuran, menampilkan budaya tiap daerah.",
    skor: { 5: "3 sikap dan 2 tindakan tepat dan jelas", 4: "3 sikap dan 2 tindakan, kurang tepat dan jelas", 3: "2 sikap dan 2 tindakan tepat dan jelas", 2: "2 sikap dan 2 tindakan kurang tepat dan jelas", 1: "1 sikap dan 1 tindakan tidak tepat dan jelas", 0: "Tidak menjawab" } }
});

/* ===== Matematika Kelas 5 — kunci dari KISI_KUNJAW_matematika_kelas_5 =====
   Skor maksimal 60: PG 5×1, PGK 5×4, B/S 5×1, Isian 10×1, Uraian 5×4.
   PGK: ada pilihan salah = 0; semua kunci = 4; sebagian tanpa salah = jumlah benar + 1. */
Object.assign(window.KUNCI, {
  "M5-PG1": { k: "B", alasan: "Belanja: 4.500 + 2 × 2.750 + 1.500 = 11.500. Kembalian: 20.000 − 11.500 = Rp8.500." },
  "M5-PG2": { k: "C", alasan: "Rabu 15.300 lebih banyak dari Senin 12.450, Selasa 9.870, dan Kamis 11.025." },
  "M5-PG3": { k: "B", alasan: "Keliling = 12 + 15 + 9 = 36 m; 36 ÷ 3 = 12 lampu." },
  "M5-PG4": { k: "C", alasan: "FPB dari 24 dan 36 adalah 12." },
  "M5-PG5": { k: "C", alasan: "Keliling persegi panjang = 2 × (20 + 12) = 64 m." },

  "M5-PGK1": { k: "ABD", maks: 4, aturan: "tanpa_salah" },
  "M5-PGK2": { k: "BC",  maks: 4, aturan: "tanpa_salah" },
  "M5-PGK3": { k: "ABC", maks: 4, aturan: "tanpa_salah" },
  "M5-PGK4": { k: "ABD", maks: 4, aturan: "tanpa_salah" },
  "M5-PGK5": { k: "ABD", maks: 4, aturan: "tanpa_salah" },

  "M5-BS1": { k: "B", alasan: "2 1/4 = (2 × 4 + 1)/4 = 9/4." },
  "M5-BS2": { k: "B", alasan: "3/4 + 5/8 = 6/8 + 5/8 = 11/8 = 1 3/8 meter." },
  "M5-BS3": { k: "S", alasan: "9/4 − 6/4 = 3/4 meter, bukan 5/4 meter." },
  "M5-BS4": { k: "S", alasan: "Urutan yang benar dari terpendek: kuning (5/8), biru (3/4), hijau (1 1/2), merah (2 1/4)." },
  "M5-BS5": { k: "S", alasan: "1 1/2 < 2 1/4, jadi pita hijau lebih pendek." },

  "M5-IS1":  { k: ["12 dan 24", "12, 24", "12,24", "12 24", "12 & 24", "12 dan 24 hari", "12;24"] },
  "M5-IS2":  { k: ["13 Mei", "tanggal 13 Mei", "13 mei", "13-5", "13/5", "13 Mei 2027", "13 Mei 2026"] },
  "M5-IS3":  { k: ["1, 2, 3", "1,2,3", "1, 2, dan 3", "1,2 dan 3", "1 2 3", "1, 2 dan 3", "1;2;3"] },
  "M5-IS4":  { k: ["12", "12 kantong", "12 kantong plastik"] },
  "M5-IS5":  { k: ["40", "40 cm", "40cm", "BC = 40 cm", "BC=40", "BC = 40"] },
  "M5-IS6":  { k: ["9.000", "Rp9.000", "9000", "Rp 9.000", "Rp9.000,00"] },
  "M5-IS7":  { k: ["3.000", "Rp3.000", "3000", "Rp 3.000", "Rp3.000,00"] },
  "M5-IS8":  { k: ["42.000", "Rp42.000", "42000", "Rp 42.000", "Rp42.000,00"] },
  "M5-IS9":  { k: ["3.000", "Rp3.000", "3000", "Rp 3.000", "Rp3.000,00"] },
  "M5-IS10": { k: ["43.000", "Rp43.000", "43000", "Rp 43.000", "Rp43.000,00"] },

  "M5-ES1": { maks: 4,
    rubrik: "KPK dari 6 dan 8 adalah 24 (misalnya dengan faktorisasi prima: 6 = 2 × 3, 8 = 2³, KPK = 2³ × 3 = 24). 2 Oktober 2026 + 24 hari = 26 Oktober 2026.",
    skor: { 4: "KPK benar (24), tanggal benar (26 Oktober 2026), dan langkah pengerjaan ditulis runtut", 3: "KPK dan tanggal benar, tetapi langkah pengerjaan kurang lengkap/kurang runtut", 2: "KPK benar (24), tetapi tanggal akhir salah (misal lupa menambahkan tanggal awal)", 1: "Hanya menuliskan jawaban akhir tanpa proses, atau KPK dan tanggal salah", 0: "Tidak menjawab atau jawaban tidak berkaitan" } },
  "M5-ES2": { maks: 4,
    rubrik: "FPB dari 18 dan 24 adalah 6 (faktorisasi prima: 18 = 2 × 3², 24 = 2³ × 3, FPB = 2 × 3 = 6). Jadi 6 kantong.",
    skor: { 4: "Menjawab 6 kantong dengan benar dan menuliskan cara penyelesaian secara runtut", 3: "Menjawab 6 kantong dengan benar, tetapi cara penyelesaian kurang lengkap/kurang runtut", 2: "Cara penyelesaian (FPB) benar, tetapi hasil akhir salah (misal salah hitung)", 1: "Hanya menuliskan jawaban akhir tanpa cara, atau cara dan jawaban salah", 0: "Tidak menjawab atau jawaban tidak berkaitan" } },
  "M5-ES3": { maks: 4,
    rubrik: "Gula yang dipakai: 3/4 + 1/2 = 5/4 kg. Sisa: 9/4 − 5/4 = 4/4 = 1 kg.",
    skor: { 4: "Menjawab 1 kg dengan benar dan menuliskan proses perhitungan secara lengkap", 3: "Menjawab 1 kg dan proses lengkap, tetapi alasan kurang jelas/kurang tepat", 2: "Proses perhitungan benar (menjumlahkan lalu mengurangkan), tetapi hasil akhir salah hitung", 1: "Hanya menuliskan jawaban akhir tanpa proses, atau proses dan jawaban salah", 0: "Tidak menjawab atau jawaban tidak berkaitan" } },
  "M5-ES4": { maks: 4,
    rubrik: "16 cm + 20 cm = 36 cm. Sisi ketiga = 54 cm − 36 cm = 18 cm.",
    skor: { 4: "Menjawab 18 cm dengan benar dan menuliskan proses perhitungan lengkap", 3: "Menjawab 18 cm dan proses lengkap, tetapi alasan kurang tepat/kurang jelas", 2: "Proses benar (keliling dikurangi jumlah dua sisi), tetapi hasil akhir salah hitung", 1: "Hanya menuliskan jawaban akhir tanpa proses dan alasan, atau proses dan jawaban salah", 0: "Tidak menjawab atau jawaban tidak berkaitan" } },
  "M5-ES5": { maks: 4,
    rubrik: "7/5 + 13/10 + 4/5 = 14/10 + 13/10 + 8/10 = 35/10 = 7/2 = 3 1/2 kg.",
    skor: { 4: "Jawaban benar dan lengkap", 3: "Jawaban benar, langkah kurang lengkap", 2: "Sebagian langkah benar", 1: "Langkah awal benar", 0: "Tidak ada jawaban benar" } }
});

/* ===== Mathematics Grade 5 (kelas bahasa) — soal sama (id M5-*), jawaban isian bahasa Inggris ikut diterima ===== */
(function () {
  const tambahan = {
    "IS1": ["12 and 24", "12 & 24"],
    "IS2": ["May 13", "13 May", "13th May", "May 13th", "the 13th of May", "13 of May"],
    "IS3": ["1, 2, and 3", "1, 2 and 3", "1,2 and 3"],
    "IS4": ["12 bags", "12 plastic bags"],
    "IS6": ["Rp9,000", "9,000"], "IS7": ["Rp3,000", "3,000"], "IS8": ["Rp42,000", "42,000"],
    "IS9": ["Rp3,000", "3,000"], "IS10": ["Rp43,000", "43,000"]
  };
  Object.keys(tambahan).forEach(suf => {
    const k = window.KUNCI["M5-" + suf];
    k.k = k.k.concat(tambahan[suf]);
  });
})();

/* ===== Matematika Kelas 6 (naskah asli SAS 1 2026/2027) — kunci dihitung dari soal, skor mengikuti pola Matematika Kelas 5 ===== */
Object.assign(window.KUNCI, {
  "M6-PG1": { k: "B", alasan: "78.500 − 34.250 = 44.250; 44.250 + 12.750 = 57.000 kg." },
  "M6-PG2": { k: "C", alasan: "3/4 + 2/5 = 15/20 + 8/20 = 23/20 kg." },
  "M6-PG3": { k: "B", alasan: "7/20 = 35/100 = 0,35." },
  "M6-PG4": { k: "B", alasan: "Harga tas Rp150.000; diskon 20% = Rp30.000; dibayar 150.000 − 30.000 = Rp120.000." },
  "M6-PG5": { k: "B", alasan: "3,5 + 18/10 = 3,5 + 1,8 = 5,3 m; 5,3 − 0,5 = 4,8 m." },

  "M6-PGK1": { k: "ABC", maks: 4, aturan: "tanpa_salah" },
  "M6-PGK2": { k: "ABD", maks: 4, aturan: "tanpa_salah" },
  "M6-PGK3": { k: "ACD", maks: 4, aturan: "tanpa_salah" },
  "M6-PGK4": { k: "ABC", maks: 4, aturan: "tanpa_salah" },
  "M6-PGK5": { k: "CD",  maks: 4, aturan: "tanpa_salah" },

  "M6-BS1": { k: "B", alasan: "Rp150.000 ÷ 10 = Rp15.000 per map." },
  "M6-BS2": { k: "B", alasan: "1 rim HVS = 325.000 ÷ 5 = Rp65.000; 1 karton box = 250.000 ÷ 20 = Rp12.500; selisih Rp52.500." },
  "M6-BS3": { k: "S", alasan: "4 botol tinta = Rp450.000, lebih mahal dari whiteboard Rp350.000." },
  "M6-BS4": { k: "B", alasan: "Kursi Rp750.000 + 1 karton map Rp150.000 = Rp900.000, kurang dari Rp1.000.000." },
  "M6-BS5": { k: "B", alasan: "2 × 750.000 + 350.000 = Rp1.850.000, sama dengan harga lemari arsip." },

  "M6-IS1":  { k: ["1 1/4", "1 1/4 kg", "5/4", "5/4 kg", "1,25", "1,25 kg", "1.25", "1.25 kg"] },
  "M6-IS2":  { k: ["1/6", "1/6 liter", "1/6 l", "2/12", "2/12 liter"] },
  "M6-IS3":  { k: ["6", "6 potong", "6 potongan", "6 bagian", "6 pieces"] },
  "M6-IS4":  { k: ["105", "105 buku", "105 buku cerita", "105 books", "105 storybooks"] },
  "M6-IS5":  { k: ["16", "16 kue", "16 cakes"] },
  "M6-IS6":  { k: ["60", "60 kg", "60kg"] },
  "M6-IS7":  { k: ["36", "36 kg", "36kg"] },
  "M6-IS8":  { k: ["60", "60 kg", "60kg"] },
  "M6-IS9":  { k: ["4/3", "4/3 takaran saji", "4/3 gram"] },
  "M6-IS10": { k: ["12,5 > 0,6", "12,5 gram > 0,6 gram", "0,6 < 12,5", "0,6 gram < 12,5 gram", "protein > karbohidrat", "karbohidrat < protein",
                   "protein lebih besar", "protein", "12,5>0,6", "0,6<12,5", "12.5 > 0.6", "0.6 < 12.5", "12.5>0.6", "protein > carbohydrate", "protein is greater"] },

  "M6-ES1": { maks: 4,
    rubrik: "Pengunjung laki-laki = 12.226 + 1.525 = 13.751 orang. Jumlah pengunjung = 12.226 + 13.751 = 25.977 orang.",
    skor: { 4: "Menjawab 25.977 orang dengan benar dan menuliskan langkah (menghitung laki-laki lalu menjumlahkan) secara runtut", 3: "Jawaban benar, tetapi langkah kurang lengkap/kurang runtut", 2: "Langkah benar, tetapi salah hitung; atau hanya menemukan banyak pengunjung laki-laki (13.751)", 1: "Hanya menuliskan jawaban akhir tanpa proses, atau proses dan jawaban salah", 0: "Tidak menjawab atau jawaban tidak berkaitan" } },
  "M6-ES2": { maks: 4,
    rubrik: "Jumlah perbandingan 7 + 4 = 11. Banyak ayam = 7/11 × 88 = 56 ekor.",
    skor: { 4: "Menjawab 56 ekor dengan benar dan menuliskan langkah secara runtut", 3: "Jawaban benar, tetapi langkah kurang lengkap/kurang runtut", 2: "Langkah benar (7/11 × 88), tetapi salah hitung", 1: "Hanya menuliskan jawaban akhir tanpa proses, atau proses dan jawaban salah", 0: "Tidak menjawab atau jawaban tidak berkaitan" } },
  "M6-ES3": { maks: 4,
    rubrik: "Toko A: 20% × 200.000 = 40.000, bayar Rp160.000. Toko B: 30% × 200.000 = 60.000, bayar Rp140.000. Jadi lebih murah di Toko B dengan harga Rp140.000,00.",
    skor: { 4: "Memilih Toko B, harga Rp140.000 benar, dan menunjukkan perhitungan kedua toko", 3: "Memilih Toko B dan harga benar, tetapi perhitungan kurang lengkap", 2: "Memilih Toko B tetapi harga salah hitung, atau perhitungan benar tanpa kesimpulan", 1: "Hanya menuliskan Toko B tanpa perhitungan, atau proses dan jawaban salah", 0: "Tidak menjawab atau jawaban tidak berkaitan" } },
  "M6-ES4": { maks: 4,
    rubrik: "Jumlah ayam = 8 × 25 = 200 ekor. Sisa = 200 − 60 = 140 ekor.",
    skor: { 4: "Menjawab 140 ekor dengan benar dan menuliskan langkah secara runtut", 3: "Jawaban benar, tetapi langkah kurang lengkap/kurang runtut", 2: "Langkah benar (mengalikan lalu mengurangi), tetapi salah hitung", 1: "Hanya menuliskan jawaban akhir tanpa proses, atau proses dan jawaban salah", 0: "Tidak menjawab atau jawaban tidak berkaitan" } },
  "M6-ES5": { maks: 4,
    rubrik: "a. Satu bagian = 35 ÷ 5 = 7, umur Ayah = 7 × 7 = 49 tahun. b. Selisih = 49 − 35 = 14 tahun.",
    skor: { 4: "Bagian a (49 tahun) dan b (14 tahun) benar dengan langkah yang runtut", 3: "Bagian a dan b benar, tetapi langkah kurang lengkap", 2: "Hanya satu bagian yang benar, atau langkah benar tetapi salah hitung", 1: "Hanya menuliskan jawaban akhir tanpa proses, atau proses dan jawaban salah", 0: "Tidak menjawab atau jawaban tidak berkaitan" } }
});
