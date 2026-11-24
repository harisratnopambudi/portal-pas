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

/* Kunci dummy untuk paket yang belum ada soal aslinya: MT-* ke M5-* dan M6-*.
   Hapus awalan dari peta setelah kunci asli paket itu diisi. */
(function () {
  const peta = { MT: ["M5", "M6"] };
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
