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
  /* ===== Bahasa Indonesia (dasar dummy: awalan BI) ===== */
  "BI-PG1": { k: "B", alasan: "Kalimat utama ada di awal paragraf (deduktif); kalimat lain menjelaskan kegiatan kerja bakti." },
  "BI-PG2": { k: "C", alasan: "Huruf kapital dipakai di awal kalimat, nama tempat (Bandung), dan nama hari (Senin)." },
  "BI-PG3": { k: "C", alasan: "Sila ketiga Persatuan Indonesia: menjaga persatuan dan tidak membedakan suku." },
  "BI-PG4": { k: "D", alasan: "Kualitas adalah bentuk baku; apotik→apotek, nasehat→nasihat, karir→karier." },
  "BI-PG5": { k: "B", alasan: "Norma kesopanan bersumber dari tata krama pergaulan; A norma agama, C dan D norma hukum." },

  "BI-BS1": { k: "B", alasan: "Narasi menceritakan peristiwa secara kronologis/berurutan." },
  "BI-BS2": { k: "S", alasan: "Lambang sila keempat adalah kepala banteng; rantai emas lambang sila kedua." },
  "BI-BS3": { k: "S", alasan: "Kalimat tersebut kalimat berita, diakhiri titik dan memberi informasi." },
  "BI-BS4": { k: "B", alasan: "Sila keempat: Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan." },
  "BI-BS5": { k: "S", alasan: "Bentuk baku adalah “nasihat”." },

  "BI-PGK1": { k: "ABD" },
  "BI-PGK2": { k: "ACD" },
  "BI-PGK3": { k: "ACD" },
  "BI-PGK4": { k: "ABD" },
  "BI-PGK5": { k: "ABD" },

  "BI-IS1": { k: ["bintang", "bintang emas"] },
  "BI-IS2": { k: ["18 agustus 1945", "18-08-1945", "18/08/1945"] },
  "BI-IS3": { k: ["antagonis"] },
  "BI-IS4": { k: ["malas"] },
  "BI-IS5": { k: ["bhinneka tunggal ika", "bhineka tunggal ika"] },
  "BI-IS6": { k: ["seru", "tanda seru", "!", "(!)"] },
  "BI-IS7": { k: ["1 juni", "1 juni 1945", "satu juni"] },
  "BI-IS8": { k: ["latar", "setting"] },
  "BI-IS9": { k: ["apotek"] },
  "BI-IS10": { k: ["hukum"] },

  "BI-ES1": { rubrik: "Contoh: bermain dengan semua teman tanpa membedakan suku/agama, ikut upacara bendera dengan khidmat, kerja kelompok bersama, memakai bahasa Indonesia saat bergaul, ikut lomba antarkelas dengan sportif. Skor 3 = 3 contoh tepat; 2 = 2 contoh tepat; 1 = 1 contoh tepat." },
  "BI-ES2": { rubrik: "Ide pokok: sampah plastik berbahaya bagi lingkungan. Kalimat penjelas: sulit terurai; asap pembakarannya beracun; menyebabkan banjir. Skor 3 = ide pokok + 2 penjelas tepat; 2 = ide pokok + 1 penjelas; 1 = ide pokok saja." },
  "BI-ES3": { rubrik: "Protagonis: tokoh utama/berwatak baik. Antagonis: lawan tokoh utama/berwatak jahat. Masing-masing disertai contoh tokoh yang sesuai." },
  "BI-ES4": { rubrik: "Karena setiap orang punya hak berpendapat, perbedaan dapat menghasilkan keputusan terbaik, menjaga persatuan dan menghindari pertengkaran; sesuai sila keempat." },
  "BI-ES5": { rubrik: "Kalimat ajakan (memakai kata mari/ayo), diawali huruf kapital, diakhiri tanda seru/titik, isi sesuai tema kebersihan sekolah." },

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

/* Kunci dummy untuk paket yang belum ada soal aslinya: BI-* ke B6-*, MT-* ke M5-* dan M6-*.
   Hapus awalan dari peta setelah kunci asli paket itu diisi. */
(function () {
  const peta = { BI: ["B6"], MT: ["M5", "M6"] };
  Object.keys(KUNCI).forEach(id => {
    const [awal, sisa] = [id.split("-")[0], id.slice(id.indexOf("-"))];
    if (!peta[awal]) return;
    peta[awal].forEach(p => { if (!KUNCI[p + sisa]) KUNCI[p + sisa] = KUNCI[id]; });
    delete KUNCI[id];
  });
})();

/* ===== Bahasa Indonesia Kelas 5 — kunci dari FORMAT_KISI_KUNJAW_SAS_L5 =====
   Skor maksimal 56: PG 5×2, B/S 5×2, PGK 5×1, Isian 10×1, Uraian 5+4+4+4+4.
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

  "B5-PGK1": { k: "AC" },
  "B5-PGK2": { k: "BD" },
  "B5-PGK3": { k: "AD" },
  "B5-PGK4": { k: "BC" },
  "B5-PGK5": { k: "CD" },

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
