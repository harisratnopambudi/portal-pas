/* =========================================================
   BANK SOAL PAS — (DUMMY)
   Mapel yang diujikan: Bahasa Indonesia dan Matematika, untuk kelas 5 dan 6.
   Tiap kelas punya paket soal sendiri (id bind5, mtk5, bind6, mtk6) dan token sendiri.
   tingkat: kelas yang boleh mengerjakan paket ini.
   File ini dimuat oleh halaman siswa. JANGAN taruh kunci di sini.
   Kunci & rubrik ada di kunci.js (hanya dimuat halaman guru).

   Tipe: pg (pilihan ganda + alasan), bs (benar/salah + alasan),
         pgk (pilihan ganda kompleks), isian, essay
   Teks boleh berisi HTML sederhana, mis. <div class="bacaan">...</div>

   SOAL BERGAMBAR
   - Gambar pada soal : tambahkan argumen terakhir { src: "assets/soal/nama.png", alt: "keterangan" }
       pg("ID", "<p>Teks soal</p>", ["A", "B", "C", "D"], { src: "assets/soal/x.png", alt: "..." })
   - Pilihan berupa gambar: tulis opsi sebagai objek { gambar: "assets/soal/a.png", teks: "(opsional)" }
   Simpan file gambar di folder assets/soal/ (PNG, JPG, atau SVG).
   ========================================================= */
window.TIPE_INFO = {
  pg:    { kode: "A", nama: "Pilihan Ganda Beralasan", petunjuk: "Pilih satu jawaban yang paling tepat, lalu tuliskan alasanmu." },
  bs:    { kode: "B", nama: "Benar atau Salah Beralasan", petunjuk: "Tentukan pernyataan berikut benar atau salah, lalu tuliskan alasanmu." },
  pgk:   { kode: "C", nama: "Pilihan Ganda Kompleks", petunjuk: "Pilih SEMUA jawaban yang benar. Jawaban benar bisa lebih dari satu." },
  isian: { kode: "D", nama: "Isian Singkat", petunjuk: "Isilah titik-titik dengan jawaban singkat yang tepat." },
  essay: { kode: "E", nama: "Uraian", petunjuk: "Jawablah pertanyaan berikut dengan jelas dan lengkap." }
};
window.URUTAN_TIPE = ["pg", "bs", "pgk", "isian", "essay"];
/* Nama bagian & petunjuk dalam bahasa Inggris untuk paket kelas bahasa (mapel.bahasa = "en") */
window.TIPE_INFO_EN = {
  pg:    { nama: "Multiple Choice with Reasons", petunjuk: "Choose the one best answer, then write your reason." },
  bs:    { nama: "True or False with Reasons", petunjuk: "Decide whether each statement is true or false, then write your reason." },
  pgk:   { nama: "Complex Multiple Choice", petunjuk: "Choose ALL the correct answers. There may be more than one." },
  isian: { nama: "Short Answer", petunjuk: "Fill in the blank with a short, correct answer." },
  essay: { nama: "Essay", petunjuk: "Answer the question clearly and completely." }
};
window.INFO_TIPE = (m, t) => (m && m.bahasa === "en" ? window.TIPE_INFO_EN : window.TIPE_INFO)[t];
/* Urutan bagian bisa berbeda per paket (m.urutan). Huruf bagian (A, B, C, ...) mengikuti urutan itu. */
/* Paket boleh dibatasi per rombel: kelas: ["5 Cordoba"] (hanya rombel itu) atau kecualiKelas: ["5 Cordoba"].
   Dipakai untuk paket berbahasa Inggris di kelas bahasa. */
window.MAPEL_COCOK = (m, rb) => {
  if (!rb) return true;
  const kls = String(rb.kelas || ""), tk = String(rb.tingkat || "");
  if (m.tingkat && !m.tingkat.map(String).includes(tk)) return false;
  if (m.kelas && !m.kelas.includes(kls)) return false;
  if (m.kecualiKelas && m.kecualiKelas.includes(kls)) return false;
  return true;
};
/* Varian bahasa Inggris untuk kelas bahasa: id soal, kunci, skor, dan token sama dengan paket aslinya. */
window.VARIAN_MAPEL = (m, kelas) =>
  m && m.inggris && m.inggris.kelas.includes(String(kelas || "")) ? Object.assign({}, m, m.inggris.ubah, { bahasa: "en" }) : m;
window.URUTAN_MAPEL = m => (m && m.urutan) || window.URUTAN_TIPE;
window.KODE_TIPE = (m, t) => {
  const ada = window.URUTAN_MAPEL(m).filter(x => !m || m.soal.some(s => s.tipe === x));
  const i = ada.indexOf(t);
  return i < 0 ? window.TIPE_INFO[t].kode : "ABCDEFG"[i];
};

(function () {
  const pg = (id, teks, opsi, gambar) => ({ id, tipe: "pg", teks, opsi, gambar });
  const bs = (id, teks, gambar) => ({ id, tipe: "bs", teks, gambar });
  const pgk = (id, teks, opsi, gambar) => ({ id, tipe: "pgk", teks, opsi, gambar });
  const isian = (id, teks, gambar) => ({ id, tipe: "isian", teks, gambar });
  const essay = (id, teks, gambar) => ({ id, tipe: "essay", teks, gambar });

  /* Soal DUMMY Matematika (dipakai sampai soal asli dikirim).
     p = awalan id soal, mis. "B5" menghasilkan B5-PG1, B5-PG2, ... */
  const soalMTK = p => [
          pg(p + "-PG1", "<p>KPK dari 12 dan 18 adalah ...</p>",
            ["6", "24", "36", "72"]),
          pg(p + "-PG2", "<p>FPB dari 24 dan 36 adalah ...</p>",
            ["6", "8", "12", "72"]),
          pg(p + "-PG3", "<p>Hasil dari 3/4 + 1/2 adalah ...</p>",
            ["4/6", "1 1/4", "1 1/2", "4/8"]),
          pg(p + "-PG4", "<p>Gambar yang daerah arsirannya menunjukkan pecahan <b>3/4</b> adalah ...</p>",
            [{ gambar: "assets/soal/mtk-arsir-1-4.svg" }, { gambar: "assets/soal/mtk-arsir-2-4.svg" },
             { gambar: "assets/soal/mtk-arsir-3-4.svg" }, { gambar: "assets/soal/mtk-arsir-2-3.svg" }]),
          pg(p + "-PG5", "<p>Ibu membeli 2,5 kg gula. Sebanyak 1 3/4 kg digunakan untuk membuat kue. Sisa gula ibu adalah ...</p>",
            ["1/2 kg", "3/4 kg", "1 kg", "1 1/4 kg"]),

          bs(p + "-BS1", "Pecahan 2/3 lebih besar daripada 3/5."),
          bs(p + "-BS2", "KPK dari 4 dan 6 adalah 24."),
          bs(p + "-BS3", "25% sama nilainya dengan 1/4."),
          bs(p + "-BS4", "Hasil dari 1/2 × 2/3 adalah 2/5."),
          bs(p + "-BS5", "Bilangan 7 adalah bilangan prima."),

          pgk(p + "-PGK1", "<p>Pilihlah semua pecahan yang senilai dengan 1/2!</p>",
            ["2/4", "3/6", "4/10", "5/10", "2/3"]),
          pgk(p + "-PGK2", "<p>Bilangan berikut yang merupakan faktor dari 18 adalah ...</p>",
            ["2", "4", "6", "9", "12"]),
          pgk(p + "-PGK3", "<p>Pilihlah semua bilangan prima!</p>",
            ["2", "9", "11", "15", "17"]),
          pgk(p + "-PGK4", "<p>Pecahan berikut yang nilainya lebih dari 1/2 adalah ...</p>",
            ["2/5", "3/4", "5/8", "1/3", "7/10"]),
          pgk(p + "-PGK5", "<p>Bilangan berikut yang merupakan kelipatan persekutuan dari 4 dan 6 adalah ...</p>",
            ["12", "18", "24", "30", "36"]),

          isian(p + "-IS1", "Pecahan yang ditunjukkan oleh daerah berwarna pada gambar adalah ....",
            { src: "assets/soal/mtk-lingkaran-3-8.svg", alt: "Lingkaran dibagi 8 bagian sama besar, 3 bagian berwarna" }),
          isian(p + "-IS2", "0,5 jika diubah ke bentuk persen menjadi ...."),
          isian(p + "-IS3", "KPK dari 3 dan 5 adalah ...."),
          isian(p + "-IS4", "FPB dari 16 dan 20 adalah ...."),
          isian(p + "-IS5", "Pecahan campuran 2 1/2 jika diubah ke pecahan biasa menjadi ...."),
          isian(p + "-IS6", "3/5 × 10 = ...."),
          isian(p + "-IS7", "1,25 + 0,75 = ...."),
          isian(p + "-IS8", "40% dari 50 adalah ...."),
          isian(p + "-IS9", "5/6 − 1/3 = .... (tulis dalam bentuk paling sederhana)"),
          isian(p + "-IS10", "Faktorisasi prima dari 12 adalah .... (contoh penulisan: 2 x 2 x 3)"),

          essay(p + "-ES1", "Lampu A menyala setiap 6 detik dan lampu B menyala setiap 8 detik. Jika kedua lampu menyala bersamaan pukul 08.00.00, pukul berapa kedua lampu akan menyala bersamaan lagi untuk pertama kalinya? Tuliskan cara pengerjaannya!"),
          essay(p + "-ES2", "Ibu memiliki 24 apel dan 36 jeruk yang akan dimasukkan ke dalam kantong dengan jumlah sama banyak pada setiap kantong. Berapa kantong paling banyak yang dibutuhkan dan berapa isi setiap kantong? Tuliskan caranya!"),
          essay(p + "-ES3", "Rina memiliki pita sepanjang 3 1/2 meter. Pita tersebut digunakan untuk membuat hiasan sepanjang 1 1/4 meter. Berapa sisa pita Rina? Tuliskan caranya!"),
          essay(p + "-ES4", "Urutkan bilangan berikut dari yang terkecil: 0,45 ; 1/2 ; 60% ; 2/5. Tuliskan caranya!"),
          essay(p + "-ES5", "Harga sebuah buku Rp20.000,00. Toko memberikan diskon 25%. Berapa harga yang harus dibayar? Tuliskan caranya!")
  ];

  /* ================= BAHASA INDONESIA KELAS 5 (naskah asli SAS 1 2026/2027) ================= */
  const CERITA_RAKA = '<div class="bacaan"><p>Pagi itu, Raka datang ke sekolah dengan mata sembab. Kemarin sore, tanaman cabai miliknya di kebun sekolah layu karena ia lupa menyiramnya. Ia malu kepada teman-teman sekelompoknya. Namun, Dinda menghampirinya sambil membawa ember. “Ayo, kita selamatkan bersama,” ajak Dinda. Satu per satu teman sekelompok ikut membantu. Ada yang mencabuti rumput, ada yang menggemburkan tanah, ada pula yang mengambil air. Menjelang bel istirahat, tanaman cabai itu kembali tegak. Raka tersenyum lega. “Terima kasih. Aku tidak akan menunda tugas lagi,” katanya.</p></div>';
  const PENGUMUMAN_RT = '<div class="bacaan"><p style="text-align:center"><b>PENGUMUMAN</b></p><p>Warga RT 05 akan kerja bakti membersihkan saluran air pada hari Minggu pukul 07.00. Warga diminta membawa cangkul. Pak RT berpesan kepada warga, “Kalian harus membawa kantong sampah.” Bu Sari tidak dapat ikut turun ke saluran air karena harus menjaga anaknya yang demam, sehingga ia menyiapkan minuman untuk para peserta kerja bakti.</p></div>';
  const bsPengumuman = t => PENGUMUMAN_RT + "<p>" + t + "</p>";

  const soalBI5 = [
    pg("B5-PG1", '<p class="muted small">Bacalah cerita berikut untuk menjawab soal nomor 1 sampai 3!</p>' + CERITA_RAKA + "<p>Tema yang paling tepat untuk cerita tersebut adalah ....</p>",
      ["Persaingan antarkelompok dalam merawat tanaman", "Kerja sama teman untuk membantu menyelesaikan masalah", "Cara menanam cabai agar tumbuh subur", "Kesedihan anak yang tidak memiliki kebun"]),
    pg("B5-PG2", CERITA_RAKA + "<p>Amanat yang paling sesuai dengan cerita tersebut adalah ....</p>",
      ["Orang yang lupa menyiram tanaman pantas dihukum oleh teman-temannya.", "Sebaiknya kita menyembunyikan kesalahan agar tidak merasa malu.", "Setiap masalah harus diselesaikan sendiri agar tidak merepotkan orang lain.", "Tanggung jawab perlu dijaga, dan masalah terasa lebih ringan jika diselesaikan bersama."]),
    pg("B5-PG3", CERITA_RAKA + "<p>Berdasarkan tindakannya, watak tokoh Dinda pada cerita tersebut adalah ....</p>",
      ["peduli dan mau menolong teman", "pemalu dan penakut", "ceroboh dan pelupa", "pemarah dan mementingkan diri sendiri"]),
    pg("B5-PG4", '<div class="bacaan"><p><i>Pak Darto dikenal sebagai warga yang sangat <b>rajin</b>. Setiap Minggu pagi ia menyapu jalan lingkungan tanpa diminta. Warga lain kemudian ikut menyapu sehingga jalan menjadi bersih.</i></p></div><p>Pasangan sinonim dan antonim yang tepat untuk kata bercetak tebal pada paragraf tersebut adalah ....</p>',
      ["pintar – bodoh", "malas – giat", "giat – malas", "tekun – cepat"]),
    pg("B5-PG5", "<p>Naya menulis beberapa kalimat dalam buku hariannya setelah berlibur bersama keluarga.</p><p>Kalimat dalam buku harian Naya yang mengandung majas personifikasi adalah ....</p>",
      ["Adikku berlari secepat kilat menuju gerbang pantai.", "Ombak berkejaran di tepi pantai dan memeluk kaki kami.", "Ayah bekerja membanting tulang demi keluarga.", "Pantai itu sangat luas dan indah."]),

    bs("B5-BS1", '<p class="muted small">Bacalah pengumuman berikut untuk menjawab soal nomor 6 sampai 10!</p>' + bsPengumuman("Bu Sari tetap menerapkan gotong royong walaupun tidak ikut turun ke saluran air, karena ia menyumbangkan tenaga dengan menyiapkan minuman.")),
    bs("B5-BS2", bsPengumuman("Warga yang tidak ikut kerja bakti tanpa alasan akan dipenjara karena melanggar norma kesopanan.")),
    bs("B5-BS3", bsPengumuman("Kalimat langsung “Pak RT berpesan kepada warga, ‘Kalian harus membawa kantong sampah.’” dapat diubah menjadi kalimat tidak langsung: <i>Pak RT berpesan kepada warga bahwa kalian harus membawa kantong sampah.</i>")),
    bs("B5-BS4", bsPengumuman("Kata <i>membersihkan</i> terbentuk dari kata dasar <i>bersih</i> yang mendapat imbuhan me-kan.")),
    bs("B5-BS5", bsPengumuman("Kalimat “Warga membersihkan saluran air seperti semut mengangkut makanan” mengandung majas personifikasi.")),

    pgk("B5-PGK1", '<div class="bacaan"><p>Sore itu hujan deras mengguyur kampung. Di balai warga, Bu Wati membagikan jas hujan kepada anak-anak yang hendak pulang mengaji. “Pakailah, supaya kalian tidak sakit,” katanya sambil tersenyum.</p></div><p>Pernyataan yang tepat tentang unsur intrinsik cerita tersebut adalah .... <i>(jawaban lebih dari satu)</i></p>',
      ["Latar tempat cerita adalah balai warga.", "Latar waktu cerita adalah pagi hari.", "Bu Wati berwatak perhatian dan peduli kepada anak-anak.", "Tema cerita adalah persaingan antaranak."]),
    pgk("B5-PGK2", '<div class="bacaan"><p>Warga menanami tepi jalan dengan pohon agar lingkungan menjadi teduh dan terawat.</p></div><p>Pernyataan yang tepat tentang kata pada kalimat tersebut adalah .... <i>(jawaban lebih dari satu)</i></p>',
      ["Kata <i>teduh</i> berasal dari kata dasar <i>duh</i> yang mendapat awalan te-.", "Kata <i>menanami</i> terbentuk dari kata dasar <i>tanam</i> yang mendapat imbuhan me-i.", "Kata <i>menjadi</i> tidak berimbuhan karena sudah merupakan kata dasar.", "Kata <i>terawat</i> terbentuk dari kata dasar <i>rawat</i> yang mendapat awalan ter-."]),
    pgk("B5-PGK3", '<div class="bacaan"><p>Rumah Pak Yusuf sederhana, tetapi halamannya asri dan rapi. Anak-anaknya ramah kepada siapa saja.</p></div><p>Pernyataan yang tepat tentang kata sifat pada paragraf tersebut adalah .... <i>(jawaban lebih dari satu)</i></p>',
      ["Kata <i>sederhana</i> bersinonim dengan <i>bersahaja</i>.", "Kata <i>asri</i> berantonim dengan <i>indah</i>.", "Kata <i>ramah</i> bersinonim dengan <i>galak</i>.", "Kata <i>rapi</i> berantonim dengan <i>berantakan</i>."]),
    pgk("B5-PGK4", '<div class="bacaan"><p>Di sebuah kampung, Pak Anto meminjam cangkul milik tetangga. Ia mengembalikannya dalam keadaan patah tanpa meminta maaf. Tetangga kecewa dan warga membicarakannya.</p></div><p>Pernyataan yang tepat berdasarkan situasi tersebut adalah .... <i>(jawaban lebih dari satu)</i></p>',
      ["Pembicaraan warga tentang Pak Anto merupakan sanksi hukum dari pengadilan.", "Sikap Pak Anto melanggar norma kesopanan karena tidak meminta maaf dan tidak bertanggung jawab.", "Agar hubungan kembali baik, Pak Anto sebaiknya meminta maaf dan mengganti cangkul yang patah.", "Aturan meminjam barang tidak perlu ditaati karena tidak tertulis."]),
    pgk("B5-PGK5", '<div class="bacaan"><p>Bu Guru berkata kepada Dini, “Kamu boleh membantu Fikri membawa buku ke perpustakaan.”</p></div><p>Pernyataan yang tepat tentang kalimat tersebut adalah .... <i>(jawaban lebih dari satu)</i></p>',
      ["Kalimat tersebut adalah kalimat tidak langsung karena memuat kata <i>berkata</i>.", "Jika diubah menjadi kalimat tidak langsung, tanda petik tetap dipertahankan.", "Perubahannya menjadi: Bu Guru berkata kepada Dini bahwa dia boleh membantu Fikri membawa buku ke perpustakaan.", "Pada perubahan itu, tanda petik dihilangkan dan dapat ditambahkan kata penghubung <i>bahwa</i> sebelum isi ucapan."]),

    isian("B5-IS1", '<div class="bacaan"><p><i>Pada hari Sabtu, siswa kelas 5 membawa sapu, pengki, dan kantong sampah. Mereka membersihkan taman sekolah bersama-sama tanpa disuruh sehingga taman menjadi bersih dan rapi.</i></p></div><p>Sikap yang dilakukan siswa kelas 5 tersebut merupakan penerapan nilai ....</p>'),
    isian("B5-IS2", '<div class="bacaan"><p><i>Ayu berhenti mengobrol ketika Pak Guru menjelaskan, lalu mengangkat tangan sebelum bertanya.</i></p></div><p>Sikap Ayu menunjukkan ia menaati norma yang mengatur sopan santun dalam pergaulan, yaitu norma ....</p>'),
    isian("B5-IS3", "<p>Pak Dimas membantu tetangga yang rumahnya kebanjiran.</p><p>Kata <i>kebanjiran</i> pada kalimat tersebut mendapat imbuhan (konfiks) ....</p>"),
    isian("B5-IS4", "<p>Kakek dikenal dermawan karena sering membantu warga yang kesulitan.</p><p>Antonim kata <i>dermawan</i> pada kalimat tersebut adalah ....</p>"),
    isian("B5-IS5", "<p>Gotong royong itu seperti perekat yang menyatukan warga.</p><p>Majas yang digunakan pada kalimat tersebut adalah ....</p>"),
    isian("B5-IS6", "<p>Ibu berkata, “Aku akan ikut kerja bakti besok.”</p><p>Ubahlah kalimat tersebut menjadi kalimat tidak langsung!</p>"),
    isian("B5-IS7", "<p>Setelah pulang dari pasar, Mira langsung ke rumah Nenek di ujung gang. Di teras rumah itu, ia menemukan sebuah dompet.</p><p>Latar tempat Mira menemukan dompet adalah ....</p>"),
    isian("B5-IS8", "<p>(1) Pada hari Minggu, 15 November 2026, empat puluh warga RW 03 membersihkan selokan.<br>(2) Kunang-kunang berbicara kepada bulan agar menerangi jalan pulang.</p><p>Kalimat yang berasal dari teks fiksi (imajinasi) adalah kalimat nomor ....</p>"),
    isian("B5-IS9", "<p>Selokan kotor itu dibersihkan warga pada hari Minggu.</p><p>Kata sifat pada kalimat tersebut adalah ....</p>"),
    isian("B5-IS10", "<p>Seorang pengendara motor tidak memakai helm. Petugas menilangnya dan ia harus membayar denda.</p><p>Norma yang dilanggar pengendara tersebut adalah norma ....</p>"),

    essay("B5-ES1", '<div class="bacaan"><p>Hari Minggu pagi, lapak sayur milik Pak Joko roboh diterpa angin kencang di pasar. Ia hanya duduk termenung. Melihat hal itu, Rani mengajak teman-temannya dan para pedagang lain untuk membantu mendirikan lapak kembali. Menjelang siang, lapak Pak Joko berdiri lagi. Pak Joko menitikkan air mata dan berkata, “Terima kasih, Nak. Tanpa kalian, saya tidak tahu harus bagaimana.”</p></div>' +
      "<p>a. Sebutkan dua tokoh dalam cerita dan watak Rani beserta buktinya!<br>b. Tentukan latar tempat dan latar waktu cerita!<br>c. Tuliskan amanat cerita dan hubungkan dengan contoh gotong royong dalam kehidupan sehari-hari!</p>"),
    essay("B5-ES2", "<p>Setiap hari Jumat, sekolahmu mengadakan kegiatan Jumat Bersih. Setiap kelas bertugas membersihkan area tertentu di sekolah.</p>" +
      "<p>Tulislah satu paragraf nonfiksi (5 kalimat) tentang kegiatan gotong royong yang pernah kamu lakukan di sekolah atau lingkungan rumahmu! Paragraf harus memuat minimal satu kata sifat dan satu kalimat langsung dengan tanda baca yang benar.</p>"),
    essay("B5-ES3", '<div class="bacaan"><p>Sebelum kerja bakti dimulai, warga membersihkan selokan. Kebersamaan mereka terlihat saat berbagi tugas sehingga sampah terkumpul dengan cepat.</p></div>' +
      "<p>a. Tulislah kata dasar dan imbuhan dari kata <i>membersihkan</i>, <i>kebersamaan</i>, <i>berbagi</i>, dan <i>terkumpul</i>!<br>b. Susunlah satu kalimat tentang gotong royong dengan menggunakan kata <i>menolong</i>!</p>"),
    essay("B5-ES4", '<div class="bacaan"><p>Dina berkata kepada ayahnya, “Aku ingin ikut membersihkan sungai agar airnya jernih lagi.” Setelah itu, mereka bekerja bersama. Sinar matahari tersenyum hangat melihat warga yang bahu-membahu.</p></div>' +
      "<p>a. Ubahlah kalimat langsung pada paragraf tersebut menjadi kalimat tidak langsung!<br>b. Sebutkan jenis majas pada kalimat “Sinar matahari tersenyum hangat melihat warga yang bahu-membahu” dan jelaskan alasannya!</p>"),
    essay("B5-ES5", '<div class="bacaan"><p>Di Perumahan Mawar Indah, beberapa warga membuang sampah sembarangan ke selokan. Akibatnya, saat hujan deras air meluap dan menggenangi jalan. Pak RT mengajak warga bermusyawarah. Mereka sepakat membuat jadwal piket kebersihan dan memasang papan larangan membuang sampah. Bu Lina menolak ikut piket karena merasa sudah membayar iuran kebersihan.</p></div>' +
      "<p>a. Tuliskan dua bentuk penerapan gotong royong yang dilakukan warga untuk mengatasi masalah tersebut!<br>b. Menurutmu, tepatkah sikap Bu Lina? Berikan pendapat dan alasanmu berdasarkan nilai gotong royong dan norma yang berlaku di masyarakat!<br>c. Tuliskan satu kalimat ajakan yang santun dari Pak RT kepada Bu Lina agar mau ikut piket!</p>")
  ];

  /* ================= BAHASA INDONESIA KELAS 6 (naskah asli SAS 1 2026/2027) ================= */
  const bacaan = t => '<div class="bacaan">' + t + "</div>";
  const soalBI6 = [
    pg("B6-PG1", bacaan("<p>Pak Lurah mengumumkan hasil kerja bakti. “Setelah warga bergotong royong, jalan desa yang tadinya <b>lengang</b> kini ramai dilalui anak-anak yang berangkat sekolah,” kata beliau.</p>") +
      "<p>Pasangan sinonim dan antonim kata <i>lengang</i> yang tepat adalah ....</p>",
      ["sunyi – ramai", "senyap – tenang", "sepi – gelap", "riuh – sepi"]),
    pg("B6-PG2", bacaan("<p>Kelompok Dina mengamati tanaman kacang hijau selama lima hari. Pada hari pertama, biji direndam lalu diletakkan di atas kapas basah. Pada hari ketiga, muncul akar putih kecil. Pada hari kelima, batang tumbuh setinggi 3 cm dan daun pertama mulai membuka. Selama pengamatan, kapas dijaga agar tetap lembap dan wadah diletakkan di dekat jendela.</p>") +
      "<p>Ide pokok yang paling tepat mewakili seluruh isi laporan pengamatan tersebut adalah ....</p>",
      ["Kacang hijau dapat tumbuh baik jika kapasnya selalu lembap.", "Kelompok Dina mengamati pertumbuhan kacang hijau dari biji hingga daun pertama membuka selama lima hari.", "Pada hari ketiga muncul akar putih kecil dari biji kacang hijau.", "Batang kacang hijau tumbuh setinggi 3 cm pada hari kelima."]),
    pg("B6-PG3", "<p>Kelompok Sinta membuat kalimat untuk majalah dinding sekolah. Sinta ingin memasang kalimat yang memakai majas metafora, yaitu perbandingan langsung tanpa kata pembanding <i>seperti</i>, <i>bagaikan</i>, atau <i>laksana</i>.</p><p>Kalimat yang memakai majas metafora adalah ....</p>",
      ["Senyum ibu guru laksana bunga yang baru mekar.", "Pak Anwar adalah penjaga perpustakaan sekolah kami.", "Buku adalah jendela dunia bagi para pembaca.", "Anak-anak berlari secepat kijang di lapangan."]),
    pg("B6-PG4", bacaan("<p>Banjir sering terjadi di kota pada musim hujan. Sampah yang dibuang sembarangan menumpuk di selokan dan sungai sehingga aliran air tersumbat. Akibatnya, air meluap ke jalan dan permukiman. Banjir juga semakin parah jika tanah tertutup beton karena air hujan tidak dapat meresap ke dalam tanah.</p>") +
      "<p>Hubungan sebab-akibat yang sesuai dengan teks eksplanasi tersebut adalah ....</p>",
      ["Hujan deras menyebabkan sampah menumpuk di selokan.", "Tanah yang tertutup beton menyebabkan selokan tersumbat sampah.", "Air meluap ke jalan menyebabkan orang membuang sampah sembarangan.", "Selokan yang tersumbat sampah menyebabkan air meluap ke jalan dan permukiman."]),
    pg("B6-PG5", bacaan("<p>Sekolah mengadakan lomba menyanyikan lagu daerah. Rafi berasal dari Jawa, Sari dari Sumatra, dan Toni dari Papua. Saat memilih peserta, Rafi mengusulkan agar hanya anak dari daerahnya yang tampil karena menurutnya lagu daerahnya paling bagus. Sari dan Toni merasa sedih mendengar usul itu.</p>") +
      "<p>Tindakan wali kelas yang paling sesuai dengan sila ketiga, Persatuan Indonesia, adalah ....</p>",
      ["Meminta hanya anak dari satu daerah yang tampil agar lomba cepat selesai.", "Mempersilakan setiap anak membawakan lagu daerahnya dan mengajak semua teman menghargai setiap penampilan.", "Memilih lagu daerah yang paling terkenal agar penonton lebih senang.", "Membatalkan lomba agar tidak terjadi perbedaan pendapat."]),

    bs("B6-BS1", "Kalimat “Perpustakaan sekolah terasa lengang pada hari Minggu” memiliki makna yang sama dengan “Perpustakaan sekolah terasa sepi pada hari Minggu”."),
    bs("B6-BS2", "Teks eksplanasi berjudul “Proses Terjadinya Pelangi” bertujuan mengajak pembaca pergi melihat pelangi."),
    bs("B6-BS3", "<p>Perhatikan paragraf ini:</p>" + bacaan("<p>“Siswa sebaiknya membaca buku setiap hari. Dengan membaca, kosakata bertambah. Siswa yang rajin membaca juga lebih mudah memahami soal.”</p>") +
      "<p>Kalimat pertama berisi tesis, sedangkan kalimat berikutnya berisi argumen yang mendukung tesis.</p>"),
    bs("B6-BS4", "Surat undangan dari kepala sekolah kepada orang tua siswa termasuk surat pribadi sehingga boleh memakai bahasa gaul."),
    bs("B6-BS5", "Sinta menolak jajanan dari daerah lain dan hanya mau membeli jajanan dari daerahnya agar daerahnya terlihat paling unggul. Sikap Sinta mencerminkan cinta tanah air sebagai penerapan sila ketiga."),

    pgk("B6-PGK1", "<p>Dika akan mengikuti lomba pidato dan harus mengisi formulir pendaftaran berikut.</p>" +
      bacaan('<p style="text-align:center"><b>FORMULIR PENDAFTARAN LOMBA PIDATO HARI PAHLAWAN</b></p><p>Nama lengkap : ......................<br>Tempat, tanggal lahir : ......................<br>Kelas : ......................<br>Alamat rumah : ......................<br>Tanda tangan orang tua/wali : ......................</p>') +
      "<p>Pilihlah semua pernyataan yang tepat tentang cara mengisi formulir tersebut!</p>",
      ["Kolom nama lengkap diisi dengan nama sesuai akta kelahiran, bukan nama panggilan.", "Kolom tempat, tanggal lahir diisi dengan kota kelahiran lalu tanggal lahir, misalnya Purwakarta, 9 Agustus 2014.", "Kolom alamat rumah cukup diisi nama kota karena formulir hanya untuk lomba.", "Kolom tanda tangan orang tua/wali boleh ditandatangani sendiri oleh Dika."]),
    pgk("B6-PGK2", "<p>Perhatikan daftar riwayat hidup berikut!</p>" +
      bacaan('<p style="text-align:center"><b>DAFTAR RIWAYAT HIDUP</b></p><p>Nama : Alya Putri Rahmawati<br>Tempat, tanggal lahir : Purwakarta, 4 April 2014<br>Pendidikan : TK Tunas Bangsa (2019–2021); SD Plus 2 Almuhajirin (2021–sekarang)<br>Prestasi : Juara 2 lomba pidato tingkat kecamatan (2026)<br>Hobi : Membaca dan menggambar<br>Cita-cita : Dokter</p>') +
      "<p>Pilihlah semua pernyataan yang sesuai dengan daftar riwayat hidup tersebut!</p>",
      ["Alya sudah menempuh pendidikan di dua lembaga.", "Prestasi Alya berkaitan dengan kemampuan berbicara di depan umum.", "Riwayat pendidikan ditulis dari yang paling lama ke yang paling baru.", "Bagian hobi memuat penghargaan lomba yang pernah diraih Alya."]),
    pgk("B6-PGK3", "<p>Perhatikan teks prosedur berikut!</p>" +
      bacaan('<p style="text-align:center"><b>Cara Membuat Telur Dadar Sayur</b></p><p>Bahan: 2 butir telur, irisan wortel, daun bawang, garam, minyak goreng.</p><p>Langkah:<br>(1) Kocok telur hingga rata.<br>(2) Masukkan irisan wortel, daun bawang, dan garam, lalu aduk.<br>(3) Panaskan sedikit minyak di wajan.<br>(4) Tuang adonan dan masak hingga kecokelatan.<br>(5) Angkat dan sajikan selagi hangat.</p>') +
      "<p>Pilihlah semua pernyataan yang tepat tentang teks tersebut!</p>",
      ["Teks berisi bahan dan langkah-langkah yang disusun berurutan.", "Langkah (4) boleh dikerjakan sebelum langkah (3) tanpa memengaruhi hasil.", "Kata <i>kocok</i>, <i>masukkan</i>, dan <i>panaskan</i> adalah kata perintah.", "Tujuan teks adalah menceritakan pengalaman penulis memasak."]),
    pgk("B6-PGK4", "<p>Perhatikan kutipan pidato berikut!</p>" +
      bacaan("<p>“Assalamu’alaikum warahmatullahi wabarakatuh. Yang terhormat Bapak dan Ibu guru serta teman-teman yang saya cintai. Hari ini kita memperingati Hari Pahlawan. Para pahlawan telah berjuang demi kemerdekaan. Sebagai pelajar, kita dapat meneladani mereka dengan belajar sungguh-sungguh dan menjaga persatuan. Mari kita rawat sekolah kita dan hormati perbedaan. Demikian pidato saya. Terima kasih. Wassalamu’alaikum warahmatullahi wabarakatuh.”</p>") +
      "<p>Pilihlah semua pernyataan yang tepat tentang kutipan pidato tersebut!</p>",
      ["Kalimat “Mari kita rawat sekolah kita dan hormati perbedaan.” adalah kalimat ajakan.", "Kalimat “Demikian pidato saya.” termasuk bagian pembuka pidato.", "Isi pidato mengajak pendengar meneladani pahlawan melalui tindakan sederhana.", "Pidato tersebut tidak memiliki salam pembuka."]),
    pgk("B6-PGK5", "<p>Kelas 6 mengadakan kerja bakti membersihkan taman sekolah. Wali kelas meminta siswa menunjukkan sikap yang mencerminkan nilai-nilai Pancasila selama kegiatan.</p><p>Pilihlah semua tindakan yang mencerminkan penerapan nilai Pancasila!</p>",
      ["Fani menghentikan kerja sejenak agar temannya dapat melaksanakan ibadah salat tepat waktu.", "Kelompok membagi tugas melalui musyawarah dan menerima keputusan bersama.", "Raka memaksa timnya mengikuti rencananya karena merasa paling pintar.", "Seluruh siswa bergotong royong membawa sapu dan kantong sampah secara bergiliran."]),

    isian("B6-IS1", "<p>Dalam laporan pengamatan, Tika menulis, “Kami <b>mengamati</b> pertumbuhan tanaman selama seminggu.”</p><p>Sinonim kata bercetak tebal pada kalimat tersebut adalah ....</p>"),
    isian("B6-IS2", "<p>Sejak desa itu membangun bendungan, hasil panen warga meningkat dan hidup mereka <b>makmur</b>.</p><p>Antonim kata bercetak tebal pada kalimat tersebut adalah ....</p>"),
    isian("B6-IS3", "<p>Pengamatan terhadap kucing:</p>" + bacaan("<p>Kucing memiliki ciri tubuh yang membantunya berburu. Kumisnya peka terhadap getaran sehingga ia mengetahui ada benda di dekatnya. Cakarnya tajam dan dapat disembunyikan. Matanya mampu melihat dalam cahaya redup.</p>") +
      "<p>Bagian tubuh kucing yang peka terhadap getaran, ide pendukung teks tersebut, adalah ....</p>"),
    isian("B6-IS4", "<p>Dimas menerima piala juara lomba menggambar.</p><p>Kalimat “Wajah Dimas berseri seperti bulan purnama” termasuk majas ....</p>"),
    isian("B6-IS5", "<p>Rani menyusun daftar riwayat hidup untuk mendaftar kegiatan sekolah. Ia ingin menuliskan “Juara 1 lomba mewarnai tingkat kota”.</p><p>Tulisan tersebut paling tepat ditempatkan pada bagian ....</p>"),
    isian("B6-IS6", "<p>Rina menulis langkah menanam bunga: (1) siram tanah, (2) masukkan bibit, (3) siapkan pot dan tanah.</p><p>Kesalahan Rina terletak pada .... langkah-langkahnya.</p>"),
    isian("B6-IS7", "<p>Perhatikan teks eksposisi berikut:</p>" + bacaan("<p>“Taman sekolah harus dirawat bersama. Taman membuat udara sejuk. Taman juga menjadi tempat belajar di luar kelas. Oleh karena itu, marilah kita merawat taman sekolah.”</p>") +
      "<p>Kalimat terakhir pada teks tersebut termasuk bagian .... (tesis/argumen/penegasan ulang)</p>"),
    isian("B6-IS8", "<p>Dalam isi pidato, Reza berkata, “Mari kita jaga kebersihan sungai di desa kita!”</p><p>Kalimat yang diucapkan Reza adalah kalimat ....</p>"),
    isian("B6-IS9", "<p>Perhatikan bagian akhir surat undangan berikut.</p>" +
      bacaan('<p style="text-align:right">Purwakarta, 12 November 2026</p><p>Kepada Yth. Orang Tua/Wali Murid Kelas 6<br>Dengan hormat,<br>... (isi surat) ...</p><p style="text-align:right">Hormat kami,<br>Kepala Sekolah</p>') +
      "<p>Bagian surat yang bertuliskan “Hormat kami,” disebut ....</p>"),
    isian("B6-IS10", "<p>Pada upacara bendera, Gita berdiri tegak, menyanyikan lagu Indonesia Raya dengan khidmat, dan bangga memakai produk dalam negeri.</p><p>Sikap Gita merupakan wujud cinta tanah air sebagai penerapan Pancasila sila ke-....</p>"),

    essay("B6-ES1", bacaan('<p style="text-align:center"><b>Kemacetan di Depan Sekolah</b></p><p>Setiap pukul 12.00, banyak orang tua menjemput anak dengan kendaraan dan berhenti di depan gerbang sekolah. Kendaraan yang berhenti membuat jalan menyempit. Kendaraan lain terpaksa berjalan pelan sehingga antrean memanjang. Akibatnya, bus sekolah dan angkot terjebak di antrean.</p>') +
      "<p>a. Tuliskan rangkaian sebab-akibat yang menyebabkan antrean kendaraan memanjang, minimal tiga tahap, memakai kata <i>karena</i>, <i>sehingga</i>, atau <i>akibatnya</i>!<br>b. Tuliskan satu usul untuk mengurangi kemacetan yang berhubungan dengan penyebab utamanya, beserta alasannya!</p>"),
    essay("B6-ES2", bacaan('<p style="text-align:center"><b>Pengamatan Taman Sekolah</b></p><p>(1) Taman berada di samping lapangan upacara.<br>(2) Terdapat 12 pot melati dan 8 pot mawar.<br>(3) Tanah di taman terasa lembap saat disentuh.<br>(4) Taman ini adalah taman paling indah di dunia.<br>(5) Beberapa kupu-kupu hinggap di bunga mawar.</p>') +
      "<p>a. Tuliskan nomor kalimat yang tidak sesuai dengan laporan pengamatan beserta alasannya!<br>b. Ubahlah kalimat tersebut menjadi kalimat yang sesuai dengan laporan pengamatan!<br>c. Tuliskan ide pokok teks tersebut!</p>"),
    essay("B6-ES3", "<p>Sekolahmu akan memperingati Hari Pahlawan. Kamu terpilih menjadi petugas pidato di depan teman-teman satu sekolah.</p>" +
      "<p>Tuliskan bagian isi pidatomu sebanyak 5 kalimat yang mengajak teman-teman menumbuhkan cinta tanah air melalui tindakan nyata di sekolah! Sertakan satu kalimat ajakan dan gunakan bahasa baku!</p>"),
    essay("B6-ES4", "<p>Dani tidak dapat masuk sekolah besok karena sakit. Ia menulis surat izin kepada wali kelasnya, Bu Rina, seperti berikut.</p>" +
      bacaan("<p>“Hai Bu Rina, aku besok nggak masuk ya. Lagi sakit nih. Makasih. Dani”</p>") +
      "<p>a. Sebutkan dua bagian surat yang belum ada pada surat Dani (selain isi surat)!<br>b. Tulis ulang surat izin tersebut dengan bahasa baku, sopan, dan bagian surat yang lengkap!</p>"),
    essay("B6-ES5", bacaan("<p>Di kelas 6 ada siswa dari berbagai daerah. Akhir-akhir ini, sebagian siswa sering mengejek logat bicara teman yang berasal dari Papua dan Sunda. Teman-teman yang diejek menjadi malas bermain bersama dan kelas sering terbagi menjadi kelompok-kelompok kecil.</p>") +
      "<p>a. Tuliskan 3 sikap yang bertentangan dengan sila ketiga dari cerita tersebut beserta alasannya!<br>b. Tuliskan dua tindakan nyata yang dapat dilakukan kelasmu untuk menumbuhkan persatuan!</p>")
  ];

  /* ================= MATEMATIKA KELAS 5 (naskah asli SAS 1 2026/2027) ================= */
  // pecahan bertumpuk: fr(3, 4) -> 3/4, fr(1, 2, 1) -> 1 1/2
  const fr = (a, b, w) => (w ? w : "") + '<span class="fr"><sup>' + a + "</sup><sub>" + b + "</sub></span>";
  const G = (f, alt) => ({ src: "assets/soal/" + f + ".jpg", alt });
  const gHarga = G("mtk5-harga-alat-tulis", "Daftar harga alat tulis di koperasi sekolah: buku tulis Rp4.500, pensil Rp2.750, penghapus Rp1.500, penggaris Rp3.250");
  const gPanen = G("mtk5-panen-sayur", "Tabel hasil panen sayur kebun sekolah (gram): bayam 24.350, kangkung 42.350, sawi 24.530, wortel 42.053, tomat 24.305, kentang 42.305");
  const gMenu = G("mtk5-menu-warung", "Daftar menu Warung Nusantara: Nasi Goreng Spesial Rp18.000, Mie Ayam Bakso Rp15.000, Ayam Bakar Rp22.000, Sate Ayam Rp25.000, Es Teh Manis Rp5.000, Jus Alpukat Rp12.000, Es Jeruk Rp8.000, Kentang Goreng Rp10.000, Tahu Bakso Rp7.000");
  const PITA = '<div class="bacaan"><p style="text-align:center"><b>Proyek Kerajinan Kelas 5</b></p><p>Pada pembelajaran Seni Budaya dan Prakarya (SBdP), siswa kelas 5 SD Nusantara mendapat tugas kelompok untuk membuat hiasan dinding dari pita warna-warni. Bu Guru menyiapkan beberapa gulungan pita dengan panjang yang berbeda-beda untuk setiap kelompok.</p>' +
    '<table class="tbl-soal"><tr><th>Warna Pita</th><th>Panjang Pita</th></tr><tr><td>Merah</td><td>' + fr(1, 4, 2) + ' meter</td></tr><tr><td>Biru</td><td>' + fr(3, 4) + ' meter</td></tr><tr><td>Hijau</td><td>' + fr(1, 2, 1) + ' meter</td></tr><tr><td>Kuning</td><td>' + fr(5, 8) + ' meter</td></tr></table>' +
    "<p>Setiap kelompok diminta menghitung, memotong, dan menggabungkan pita tersebut sesuai kebutuhan proyek mereka.</p></div>";
  const bsPita = t => PITA + "<p>" + t + "</p>";
  const LOMBA = '<div class="bacaan"><p style="text-align:center"><b>Persiapan Lomba di SD Cendekia</b></p><p>SD Cendekia akan mengadakan pekan lomba dalam rangka memperingati Hari Pendidikan Nasional. Panitia sedang mempersiapkan dua hal penting, yaitu jadwal latihan rutin dan pembagian hadiah.</p>' +
    "<p><b>Data 1: Jadwal Latihan</b><br>Kelompok paduan suara berlatih setiap 4 hari sekali. Kelompok tari berlatih setiap 6 hari sekali. Latihan pertama untuk kedua kelompok dimulai pada tanggal 1 Mei.</p>" +
    "<p><b>Data 2: Hadiah Lomba</b><br>Panitia memiliki 24 buku tulis dan 36 pensil untuk dijadikan hadiah. Hadiah tersebut akan dimasukkan ke dalam kantong plastik dengan jumlah yang sama banyak untuk setiap jenisnya tanpa ada yang tersisa.</p></div>";
  const WARUNG = "<p>Pada hari Minggu, Dika dan keluarganya pergi makan siang di Warung Nusantara. Sebelum memesan, mereka melihat brosur menu yang terpampang di meja makan. Perhatikan daftar harga menu pada gambar.</p>";

  const soalMTK5 = [
    pg("M5-PG1", "<p>Saat jam istirahat, Rina berkunjung ke Koperasi Sekolah untuk membeli perlengkapan belajar karena beberapa alat tulisnya sudah habis. Ia membeli 1 buku tulis, 2 pensil, dan 1 penghapus. Sesampainya di kasir, Rina menyerahkan uang Rp20.000 kepada petugas koperasi.</p><p>Berdasarkan daftar harga di koperasi sekolah, berapa uang kembalian yang harus diterima Rina?</p>",
      ["Rp7.500", "Rp8.500", "Rp9.500", "Rp10.500"], gHarga),
    pg("M5-PG2", "<p>Pihak Perpustakaan Daerah ingin memberikan penghargaan kepada petugas jaga di hari yang paling ramai dikunjungi. Berdasarkan infografis, pernyataan manakah yang benar mengenai data pengunjung tersebut?</p>",
      ["Pengunjung Senin lebih banyak dari Rabu", "Pengunjung Kamis paling sedikit", "Pengunjung Rabu paling banyak dari hari Senin, Selasa, dan Kamis", "Pengunjung Selasa lebih banyak dari Senin"],
      G("mtk5-pengunjung-perpus", "Data jumlah pengunjung Perpustakaan Daerah: Senin 12.450, Selasa 9.870, Rabu 15.300, Kamis 11.025")),
    pg("M5-PG3", "<p>Sebuah taman berbentuk segitiga dengan ukuran seperti pada gambar. Di sekeliling taman tersebut akan dipasang lampu hias. Jika jarak antarlampu 3 m, berapa banyak lampu yang dibutuhkan?</p>",
      ["10 lampu", "12 lampu", "14 lampu", "16 lampu"], G("mtk5-taman-segitiga", "Taman berbentuk segitiga dengan sisi 12 m, 15 m, dan 9 m")),
    pg("M5-PG4", "<p>Ibu memiliki 24 kue bolu dan 36 kue lapis. Kue tersebut akan dimasukkan ke dalam kotak dengan jumlah sama banyak untuk setiap jenis. Berapa kotak terbanyak yang dapat dibuat?</p>",
      ["6 kotak", "8 kotak", "12 kotak", "18 kotak"]),
    pg("M5-PG5", "<p>Sekolah Dita memiliki lapangan sepak bola di halaman belakang seperti pada gambar. Pada jam olahraga, Pak Guru meminta seluruh siswa berlari mengelilingi lapangan tersebut tepat satu putaran. Berapa meter jarak yang ditempuh Dita untuk satu kali putaran?</p>",
      ["32 m", "44 m", "64 m", "240 m"], G("mtk5-lapangan", "Lapangan sepak bola berbentuk persegi panjang dengan panjang 20 m dan lebar 12 m")),

    pgk("M5-PGK1", '<p class="muted small">Perhatikan data pada gambar untuk mengerjakan soal nomor 6 dan 7.</p><p>Berdasarkan gambar hasil panen sayur kebun sekolah, pilihlah semua pernyataan yang benar tentang urutan hasil panen!</p>',
      ["Urutan dari terkecil: tomat → bayam → sawi.", "Urutan dari terbesar: kangkung → kentang → wortel.", "Hasil panen sawi menempati urutan kedua terkecil di antara semua sayur.", "Hasil panen wortel lebih kecil daripada kentang."], gPanen),
    pgk("M5-PGK2", "<p>Pak Rudi memanen sayur di kebun sekolah. Hasil panennya ditimbang dan dicatat seperti pada gambar. Pak Rudi hanya mau membawa sayur yang beratnya lebih dari 24.400 gram dan kurang dari 42.100 gram ke pasar. Pilihlah semua sayur yang boleh dibawa Pak Rudi ke pasar!</p>",
      ["Bayam", "Sawi", "Wortel", "Tomat"], gPanen),
    pgk("M5-PGK3", "<p>Pak Budi beternak ayam. Setiap hari ia mengumpulkan telur dan memasukkannya ke dalam keranjang. Setiap keranjang berisi 23 telur. Pak Budi ingin menghitung banyak telur jika keranjangnya lebih dari satu. Pilihlah semua jumlah telur yang merupakan kelipatan 23!</p>",
      ["46 telur", "69 telur", "92 telur", "100 telur"]),
    pgk("M5-PGK4", "<p>Pada peringatan Hari Kemerdekaan di SD Nusantara, panitia menyiapkan hadiah untuk lomba. Panitia memiliki 24 buku tulis dan 36 pensil. Kedua jenis hadiah tersebut akan dimasukkan ke dalam beberapa kantong plastik dengan jumlah yang sama banyak. Jumlah kantong plastik yang dapat dibuat harus merupakan faktor persekutuan dari 24 dan 36.</p><p>Pilihlah semua angka yang merupakan faktor persekutuan tersebut!</p>",
      ["6", "12", "18", "2"]),
    pgk("M5-PGK5", "<p>Saat pelajaran Matematika, Bu Rina menuliskan empat bilangan pecahan di papan tulis, yaitu: " + fr(3, 4) + ", " + fr(1, 2, 1) + ", " + fr(5, 8) + ", dan " + fr(1, 4, 1) + ".</p><p>Bu Rina meminta siswa untuk menganalisis urutan bilangan-bilangan tersebut dari yang terkecil ke yang terbesar. Pilihlah pernyataan yang benar berdasarkan bilangan pecahan di atas!</p>",
      [fr(5, 8) + " merupakan bilangan pecahan terkecil di antara keempat bilangan tersebut.",
       "Urutan pecahan dari yang terkecil ke terbesar adalah " + fr(5, 8) + ", " + fr(3, 4) + ", " + fr(1, 4, 1) + ", " + fr(1, 2, 1) + ".",
       "Bilangan " + fr(1, 2, 1) + " lebih kecil nilainya dibandingkan dengan " + fr(1, 4, 1) + ".",
       "Bilangan " + fr(1, 4, 1) + " nilainya lebih besar daripada " + fr(3, 4) + ", tetapi lebih kecil daripada " + fr(1, 2, 1) + "."]),

    bs("M5-BS1", '<p class="muted small">Bacalah teks berikut untuk menjawab soal nomor 11 sampai 15!</p>' + bsPita("Panjang pita merah (" + fr(1, 4, 2) + " meter) memiliki nilai yang sama dengan " + fr(9, 4) + " meter.")),
    bs("M5-BS2", bsPita("Jika kelompok 1 menggabungkan pita biru dan pita kuning, maka total panjang pita yang mereka miliki adalah " + fr(3, 8, 1) + " meter.")),
    bs("M5-BS3", bsPita("Selisih panjang antara pita merah dan pita hijau adalah " + fr(5, 4) + " meter.")),
    bs("M5-BS4", bsPita("Urutan panjang pita dari yang paling pendek ke yang paling panjang adalah pita biru, pita kuning, pita hijau, lalu pita merah.")),
    bs("M5-BS5", bsPita("Pita hijau (" + fr(1, 2, 1) + " meter) lebih panjang dibandingkan dengan pita merah (" + fr(1, 4, 2) + " meter).")),

    isian("M5-IS1", '<p class="muted small">Bacalah teks berikut untuk menjawab soal nomor 16 sampai 19!</p>' + LOMBA + "<p>Berdasarkan jadwal latihan tersebut, sebutkan 2 angka pertama yang merupakan kelipatan persekutuan dari 4 dan 6!</p>"),
    isian("M5-IS2", LOMBA + "<p>Jika latihan pertama dilaksanakan tanggal 1 Mei, pada tanggal berapa kelompok paduan suara dan kelompok tari akan berlatih bersama untuk yang kedua kalinya?</p>"),
    isian("M5-IS3", LOMBA + "<p>Berdasarkan hadiah lomba tersebut, sebutkan 3 angka pertama yang merupakan faktor persekutuan dari 24 dan 36 sehingga buku dan pensil habis terbagi rata!</p>"),
    isian("M5-IS4", LOMBA + "<p>Berapa jumlah kantong plastik terbanyak yang dapat dibuat oleh panitia agar setiap kantong berisi buku dan pensil dengan jumlah yang sama banyak?</p>"),
    isian("M5-IS5", "<p>Diketahui keliling sebuah segitiga adalah 96 cm. Berapakah panjang sisi yang belum diketahui (sisi BC) pada gambar segitiga?</p>",
      G("mtk5-segitiga-keliling", "Segitiga ABC dengan sisi AB 24 cm, sisi AC 32 cm, dan sisi BC belum diketahui")),
    isian("M5-IS6", '<p class="muted small">Perhatikan gambar menu untuk menjawab soal nomor 21 sampai 25!</p>' + WARUNG + "<p>Dika memesan 2 porsi Nasi Goreng Spesial dan 3 gelas Es Teh Manis. Jika ia membayar dengan uang Rp60.000, berapakah uang kembalian yang diterima Dika?</p>", gMenu),
    isian("M5-IS7", WARUNG + "<p>Ayah memesan 1 porsi Ayam Bakar dan 1 porsi Sate Ayam. Jika Ayah membayar dengan uang Rp50.000, berapakah uang kembalian yang diterima Ayah?</p>", gMenu),
    isian("M5-IS8", WARUNG + "<p>Ibu memesan 2 porsi Mie Ayam Bakso dan 1 gelas Jus Alpukat. Berapakah total belanjaan Ibu?</p>", gMenu),
    isian("M5-IS9", WARUNG + "<p>Kakak ingin membeli 1 porsi Kentang Goreng dan 1 porsi Tahu Bakso. Ia membayar dengan uang Rp20.000. Berapakah sisa uang Kakak setelah membayar pesanannya?</p>", gMenu),
    isian("M5-IS10", WARUNG + "<p>Keluarga Dika memesan 1 porsi Nasi Goreng Spesial, 1 porsi Mie Ayam Bakso, dan 3 gelas Es Jeruk. Jika mereka membayar dengan uang Rp100.000, berapakah uang kembalian yang mereka terima?</p>", gMenu),

    essay("M5-ES1", "<p>Di SD Harapan Bangsa, tim piket kelas 5A bertugas membersihkan kelas setiap <b>6 hari</b> sekali, sedangkan tim piket kelas 5B bertugas setiap <b>8 hari</b> sekali. Pada tanggal 2 Oktober 2026, kedua tim piket bertugas bersama untuk pertama kalinya.</p><p>Pada tanggal berapa mereka akan bertugas bersama untuk yang kedua kalinya? Jelaskan langkah-langkah yang kamu gunakan untuk menemukan jawabannya!</p>"),
    essay("M5-ES2", "<p>Panitia kegiatan bakti sosial memiliki 18 bungkus mi instan dan 24 botol air mineral. Keduanya akan dimasukkan ke dalam kantong bantuan dengan jumlah yang sama banyak untuk setiap jenisnya tanpa ada yang tersisa.</p><p>Berapa jumlah kantong bantuan terbanyak yang dapat dibuat oleh panitia? Tuliskan cara penyelesaiannya!</p>"),
    essay("M5-ES3", "<p>Ibu memiliki persediaan gula pasir sebanyak " + fr(1, 4, 2) + " kg. Untuk membuat kue, Ibu menggunakan " + fr(3, 4) + " kg gula pasir. Karena adonan kue masih kurang manis, Ibu menambahkan lagi " + fr(1, 2) + " kg gula pasir ke dalam adonan.</p><p>Berapa kg sisa gula pasir yang dimiliki Ibu sekarang? Tuliskan proses perhitungannya secara lengkap dan jelaskan alasanmu!</p>"),
    essay("M5-ES4", "<p>Andi membuat sebuah hiasan dinding berbentuk segitiga dari kain flanel. Keliling hiasan segitiga tersebut adalah <b>54 cm</b>. Dua sisi hiasan tersebut masing-masing panjangnya 16 cm dan 20 cm.</p><p>Berapakah panjang sisi ketiga dari hiasan segitiga yang dibuat Andi? Jelaskan alasanmu!</p>"),
    essay("M5-ES5", "<p>Ibu sedang membaca resep kue baru. Resep tersebut menyebutkan bahwa untuk membuat 1 loyang kue, dibutuhkan " + fr(2, 5, 1) + " kg mentega, " + fr(3, 10, 1) + " kg cokelat bubuk, dan " + fr(4, 5) + " kg gula pasir.</p><p>Berapakah jumlah seluruh berat bahan-bahan untuk membuat kue? Uraikan cara menghitungnya!</p>")
  ];

  /* ================= MATHEMATICS GRADE 5 — kelas bahasa (5 Cordoba), terjemahan Matematika Kelas 5 ================= */
  const gHargaEN = G("mtk5-harga-alat-tulis", "School cooperative price list: notebook Rp4,500, pencil Rp2,750, eraser Rp1,500, ruler Rp3,250");
  const gPanenEN = G("mtk5-panen-sayur", "School garden harvest (grams): spinach 24,350, water spinach 42,350, mustard greens 24,530, carrot 42,053, tomato 24,305, potato 42,305");
  const gMenuEN = G("mtk5-menu-warung", "Warung Nusantara menu: Special Fried Rice Rp18,000, Chicken Noodles with Meatballs Rp15,000, Grilled Chicken Rp22,000, Chicken Satay Rp25,000, Sweet Iced Tea Rp5,000, Avocado Juice Rp12,000, Iced Orange Rp8,000, French Fries Rp10,000, Tofu Meatballs Rp7,000");
  const RIBBON = '<div class="bacaan"><p style="text-align:center"><b>Grade 5 Craft Project</b></p><p>In the Arts and Crafts lesson (SBdP), grade 5 students at SD Nusantara were given a group task to make wall decorations from colourful ribbons. The teacher prepared several rolls of ribbon of different lengths for each group.</p>' +
    '<table class="tbl-soal"><tr><th>Ribbon Colour</th><th>Ribbon Length</th></tr><tr><td>Red</td><td>' + fr(1, 4, 2) + ' metres</td></tr><tr><td>Blue</td><td>' + fr(3, 4) + ' metre</td></tr><tr><td>Green</td><td>' + fr(1, 2, 1) + ' metres</td></tr><tr><td>Yellow</td><td>' + fr(5, 8) + ' metre</td></tr></table>' +
    "<p>Each group was asked to calculate, cut, and join the ribbons according to the needs of their project.</p></div>";
  const tfRibbon = t => RIBBON + "<p>" + t + "</p>";
  const COMPETITION = '<div class="bacaan"><p style="text-align:center"><b>Competition Preparation at SD Cendekia</b></p><p>SD Cendekia will hold a competition week to celebrate National Education Day. The committee is preparing two important things: the regular practice schedule and the prizes.</p>' +
    "<p><b>Data 1: Practice Schedule</b><br>The choir group practises every 4 days. The dance group practises every 6 days. The first practice for both groups starts on 1 May.</p>" +
    "<p><b>Data 2: Competition Prizes</b><br>The committee has 24 notebooks and 36 pencils to be used as prizes. The prizes will be put into plastic bags with the same number of each item in every bag, with nothing left over.</p></div>";
  const RESTAURANT = "<p>On Sunday, Dika and his family went to Warung Nusantara for lunch. Before ordering, they looked at the menu on the table. Look at the menu prices in the picture.</p>";

  const soalMTK5EN = [
    pg("M5-PG1", "<p>During break time, Rina went to the School Cooperative to buy school supplies because some of her stationery had run out. She bought 1 notebook, 2 pencils, and 1 eraser. At the cashier, Rina gave Rp20,000 to the cooperative staff.</p><p>Based on the price list at the school cooperative, how much change should Rina receive?</p>",
      ["Rp7,500", "Rp8,500", "Rp9,500", "Rp10,500"], gHargaEN),
    pg("M5-PG2", "<p>The Regional Library wants to give an award to the staff on duty on the busiest day. Based on the infographic, which statement about the number of visitors is correct?</p>",
      ["There were more visitors on Monday than on Wednesday", "Thursday had the fewest visitors", "Wednesday had more visitors than Monday, Tuesday, and Thursday", "There were more visitors on Tuesday than on Monday"],
      G("mtk5-pengunjung-perpus", "Regional Library visitors: Monday 12,450, Tuesday 9,870, Wednesday 15,300, Thursday 11,025")),
    pg("M5-PG3", "<p>A park is shaped like a triangle with the measurements shown in the picture. Decorative lamps will be placed around the park. If the distance between lamps is 3 m, how many lamps are needed?</p>",
      ["10 lamps", "12 lamps", "14 lamps", "16 lamps"], G("mtk5-taman-segitiga", "Triangular park with sides 12 m, 15 m, and 9 m")),
    pg("M5-PG4", "<p>Mother has 24 sponge cakes and 36 layer cakes. The cakes will be put into boxes so that every box has the same number of each kind of cake. What is the greatest number of boxes that can be made?</p>",
      ["6 boxes", "8 boxes", "12 boxes", "18 boxes"]),
    pg("M5-PG5", "<p>Dita's school has a football field in the backyard, as shown in the picture. During PE, the teacher asks all students to run around the field exactly once. How many metres does Dita run in one lap?</p>",
      ["32 m", "44 m", "64 m", "240 m"], G("mtk5-lapangan", "Rectangular football field 20 m long and 12 m wide")),

    pgk("M5-PGK1", '<p class="muted small">Look at the data in the picture to answer questions 6 and 7.</p><p>Based on the school garden harvest picture, choose all the correct statements about the order of the harvest!</p>',
      ["From smallest: tomato → spinach → mustard greens.", "From largest: water spinach → potato → carrot.", "The mustard greens harvest is the second smallest of all the vegetables.", "The carrot harvest is smaller than the potato harvest."], gPanenEN),
    pgk("M5-PGK2", "<p>Mr. Rudi harvested vegetables from the school garden. The harvest was weighed and recorded as shown in the picture. Mr. Rudi only wants to take vegetables that weigh more than 24,400 grams and less than 42,100 grams to the market. Choose all the vegetables that Mr. Rudi can take to the market!</p>",
      ["Spinach", "Mustard greens", "Carrot", "Tomato"], gPanenEN),
    pgk("M5-PGK3", "<p>Mr. Budi raises chickens. Every day he collects eggs and puts them into baskets. Each basket holds 23 eggs. Mr. Budi wants to count the eggs when there is more than one basket. Choose all the numbers of eggs that are multiples of 23!</p>",
      ["46 eggs", "69 eggs", "92 eggs", "100 eggs"]),
    pgk("M5-PGK4", "<p>For Independence Day at SD Nusantara, the committee prepared prizes for the competitions. The committee has 24 notebooks and 36 pencils. Both kinds of prizes will be put into several plastic bags with the same number in each bag. The number of bags must be a common factor of 24 and 36.</p><p>Choose all the numbers that are common factors of 24 and 36!</p>",
      ["6", "12", "18", "2"]),
    pgk("M5-PGK5", "<p>In a Mathematics lesson, Mrs. Rina wrote four fractions on the board: " + fr(3, 4) + ", " + fr(1, 2, 1) + ", " + fr(5, 8) + ", and " + fr(1, 4, 1) + ".</p><p>Mrs. Rina asked the students to analyse the order of these numbers from the smallest to the largest. Choose the correct statements about the fractions above!</p>",
      [fr(5, 8) + " is the smallest of the four fractions.",
       "The order from smallest to largest is " + fr(5, 8) + ", " + fr(3, 4) + ", " + fr(1, 4, 1) + ", " + fr(1, 2, 1) + ".",
       fr(1, 2, 1) + " is smaller than " + fr(1, 4, 1) + ".",
       fr(1, 4, 1) + " is greater than " + fr(3, 4) + " but smaller than " + fr(1, 2, 1) + "."]),

    bs("M5-BS1", '<p class="muted small">Read the text below to answer questions 11 to 15!</p>' + tfRibbon("The length of the red ribbon (" + fr(1, 4, 2) + " metres) is equal to " + fr(9, 4) + " metres.")),
    bs("M5-BS2", tfRibbon("If group 1 joins the blue ribbon and the yellow ribbon, the total length of their ribbon is " + fr(3, 8, 1) + " metres.")),
    bs("M5-BS3", tfRibbon("The difference in length between the red ribbon and the green ribbon is " + fr(5, 4) + " metres.")),
    bs("M5-BS4", tfRibbon("The order of the ribbons from shortest to longest is blue, yellow, green, then red.")),
    bs("M5-BS5", tfRibbon("The green ribbon (" + fr(1, 2, 1) + " metres) is longer than the red ribbon (" + fr(1, 4, 2) + " metres).")),

    isian("M5-IS1", '<p class="muted small">Read the text below to answer questions 16 to 19!</p>' + COMPETITION + "<p>Based on the practice schedule, write the first 2 common multiples of 4 and 6!</p>"),
    isian("M5-IS2", COMPETITION + "<p>If the first practice is on 1 May, on what date will the choir group and the dance group practise together for the second time?</p>"),
    isian("M5-IS3", COMPETITION + "<p>Based on the prizes, write the first 3 common factors of 24 and 36 so that the notebooks and pencils can be shared equally!</p>"),
    isian("M5-IS4", COMPETITION + "<p>What is the greatest number of plastic bags the committee can make so that every bag has the same number of notebooks and pencils?</p>"),
    isian("M5-IS5", "<p>The perimeter of a triangle is 96 cm. What is the length of the unknown side (side BC) in the triangle picture?</p>",
      G("mtk5-segitiga-keliling", "Triangle ABC with side AB 24 cm, side AC 32 cm, and side BC unknown")),
    isian("M5-IS6", '<p class="muted small">Look at the menu picture to answer questions 21 to 25!</p>' + RESTAURANT + "<p>Dika orders 2 portions of Special Fried Rice and 3 glasses of Sweet Iced Tea. If he pays with Rp60,000, how much change does Dika receive?</p>", gMenuEN),
    isian("M5-IS7", RESTAURANT + "<p>Father orders 1 portion of Grilled Chicken and 1 portion of Chicken Satay. If Father pays with Rp50,000, how much change does Father receive?</p>", gMenuEN),
    isian("M5-IS8", RESTAURANT + "<p>Mother orders 2 portions of Chicken Noodles with Meatballs and 1 glass of Avocado Juice. What is the total cost of Mother's order?</p>", gMenuEN),
    isian("M5-IS9", RESTAURANT + "<p>Dika's sister wants to buy 1 portion of French Fries and 1 portion of Tofu Meatballs. She pays with Rp20,000. How much money does she have left after paying?</p>", gMenuEN),
    isian("M5-IS10", RESTAURANT + "<p>Dika's family orders 1 portion of Special Fried Rice, 1 portion of Chicken Noodles with Meatballs, and 3 glasses of Iced Orange. If they pay with Rp100,000, how much change do they receive?</p>", gMenuEN),

    essay("M5-ES1", "<p>At SD Harapan Bangsa, the class 5A cleaning team cleans the classroom every <b>6 days</b>, while the class 5B cleaning team cleans every <b>8 days</b>. On 2 October 2026, both teams were on duty together for the first time.</p><p>On what date will they be on duty together for the second time? Explain the steps you used to find the answer!</p>"),
    essay("M5-ES2", "<p>The committee of a charity event has 18 packs of instant noodles and 24 bottles of mineral water. They will be put into aid bags with the same number of each item in every bag, with nothing left over.</p><p>What is the greatest number of aid bags the committee can make? Write how you solved it!</p>"),
    essay("M5-ES3", "<p>Mother has " + fr(1, 4, 2) + " kg of sugar. To make a cake, Mother uses " + fr(3, 4) + " kg of sugar. Because the cake batter is not sweet enough, Mother adds another " + fr(1, 2) + " kg of sugar to the batter.</p><p>How many kilograms of sugar does Mother have left now? Write the complete calculation and explain your reasoning!</p>"),
    essay("M5-ES4", "<p>Andi made a triangle-shaped wall decoration from felt. The perimeter of the triangle is <b>54 cm</b>. Two of its sides are 16 cm and 20 cm long.</p><p>How long is the third side of Andi's triangle decoration? Explain your answer!</p>"),
    essay("M5-ES5", "<p>Mother is reading a new cake recipe. The recipe says that to make 1 cake tin you need " + fr(2, 5, 1) + " kg of butter, " + fr(3, 10, 1) + " kg of cocoa powder, and " + fr(4, 5) + " kg of sugar.</p><p>What is the total weight of all the ingredients? Show how you calculated it!</p>")
  ];

  /* ================= MATEMATIKA KELAS 6 (naskah asli SAS 1 2026/2027) ================= */
  const gToko = G("mtk6-toko-cerdas-mandiri", "Toko Cerdas Mandiri, promo tahun ajaran baru diskon 20% semua item: tas sekolah Rp150.000, buku tulis Rp40.000, sepatu olahraga Rp200.000, alat tulis Rp50.000, pensil warna Rp60.000, penghapus Rp5.000, penggaris Rp10.000, jam tangan Rp120.000");
  const gPita6 = G("mtk6-pita-hiasan", "Hiasan kelas: pita merah 3,5 meter dan pita biru 18/10 meter");
  const gBandara = G("mtk6-bandara", "Bandara dengan penumpang terbanyak sepanjang 2025: 1. Soekarno-Hatta (Jakarta) 3,5 juta, 2. I Gusti Ngurah Rai (Bali) 1,4 juta, 3. Juanda (Surabaya) 0,863 juta, 4. Sultan Hasanuddin (Makassar) 0,603 juta, 5. Kualanamu (Medan) 0,486 juta penumpang");
  const gDataSiswa = G("mtk6-data-siswa", "Tabel data siswa kelas VI SD Harapan Bangsa, rasio laki-laki : perempuan dan jumlah siswa: VI A 2:3, 30; VI B 3:4, 35; VI C 2:3, 40; VI D 3:4, 49");
  const gPanenBuah = G("mtk6-panen-buah", "Panen buah di Koperasi Tani Desa Makmur. Tabel hasil panen bulan ini: mangga : jeruk = 5 : 3, selisih 24 kg; rambutan : mangga = 2 : 5, selisih 18 kg; jeruk : duku = 3 : 4, selisih 15 kg. Infografis: mangga dan jeruk dipanen paling banyak, duku dipanen paling sedikit, seluruh hasil panen dikemas dalam keranjang untuk dijual ke pasar");
  const gBiskuit = G("mtk6-biskuit-gandum", "Informasi nilai gizi biskuit gandum per kemasan (takaran saji 4 keping 30 g, berat bersih 120 g): energi total 1 1/3 takaran saji, lemak total 1/5 gram, protein 12,5 gram, karbohidrat 0,6 gram, natrium 3/20 gram, serat pangan 25 gram");
  const MAKMUR = '<div class="bacaan"><p style="text-align:center"><b>Peningkatan Penjualan Perlengkapan Kantor di Toko "Makmur"</b></p><p>Menjelang pergantian tahun, Toko Perlengkapan "Makmur" mencatat adanya peningkatan pembelian barang kebutuhan kantor dibandingkan bulan sebelumnya. Berikut daftar harga beberapa jenis barang yang paling banyak dipesan:</p>' +
    '<table class="tbl-soal"><tr><th>Jenis Barang</th><th>Banyak Barang per Karton</th><th>Harga per Karton</th></tr><tr><td>Kertas HVS A4</td><td>5 rim</td><td>Rp325.000,00</td></tr><tr><td>Map Plastik</td><td>10 buah</td><td>Rp150.000,00</td></tr><tr><td>Tinta Printer</td><td>4 botol</td><td>Rp450.000,00</td></tr><tr><td>Karton Box Besar</td><td>20 buah</td><td>Rp250.000,00</td></tr></table>' +
    "<p>Selain barang-barang di atas, terdapat beberapa perlengkapan lain yang juga mengalami peningkatan permintaan. Di antaranya, papan tulis <i>whiteboard</i> dengan harga Rp350.000,00/buah, kursi kantor dengan harga Rp750.000,00/buah, dan lemari arsip besi dengan harga Rp1.850.000,00/buah.</p></div>";
  const bsMakmur = t => MAKMUR + "<p>" + t + "</p>";

  const soalMTK6 = [
    pg("M6-PG1", "<p>Pak Rudi adalah seorang pedagang beras. Ia memiliki persediaan 78.500 kg beras di gudang. Pada hari Senin, ia menjual 34.250 kg beras, lalu pada hari Selasa ia membeli lagi 12.750 kg beras dari petani. Persediaan beras Pak Rudi sekarang adalah ....</p>",
      ["44.250 kg", "57.000 kg", "67.000 kg", "125.500 kg"]),
    pg("M6-PG2", "<p>Ibu akan membuat dua jenis kue untuk acara syukuran di rumah. Resep kue bolu membutuhkan " + fr(3, 4) + " kg tepung terigu, sedangkan resep kue lapis membutuhkan " + fr(2, 5) + " kg tepung terigu. Ibu ingin membeli tepung terigu dalam satu kemasan besar yang cukup untuk kedua kue tersebut. Total tepung terigu yang harus dibeli Ibu adalah ....</p>",
      [fr(5, 9) + " kg", fr(5, 20) + " kg", fr(23, 20) + " kg", fr(15, 20) + " kg"]),
    pg("M6-PG3", "<p>Pada perayaan Hari Ulang Tahun sekolah, diadakan lomba lari estafet keliling kompleks sekolah. Rina mendapat giliran sebagai pelari pertama. Ia berhasil menyelesaikan " + fr(7, 20) + " dari total jarak lintasan yang harus ditempuh oleh timnya. Sisa jarak lintasan akan dilanjutkan oleh anggota tim lainnya.</p><p>Berdasarkan ilustrasi tersebut, bentuk desimal dari jarak yang berhasil ditempuh Rina adalah ....</p>",
      ["0,25", "0,35", "0,45", "0,70"]),
    pg("M6-PG4", "<p>Menjelang tahun ajaran baru, Toko \"Cerdas Mandiri\" mengadakan promo besar-besaran. Semua perlengkapan sekolah diberikan diskon 20%. Daftar harga perlengkapan sekolah di toko tersebut disajikan pada gambar.</p><p>Sinta ingin membeli tas sekolah karena tas lamanya sudah rusak. Ia mendatangi Toko \"Cerdas Mandiri\" dan mengambil tas sekolah yang harganya tertera pada gambar. Berdasarkan informasi dan gambar tersebut, harga tas sekolah yang harus dibayar Sinta setelah mendapat diskon 20% adalah ....</p>",
      ["Rp30.000", "Rp120.000", "Rp130.000", "Rp180.000"], gToko),
    pg("M6-PG5", "<p>Doni mendapat tugas dari gurunya untuk membuat hiasan kelas. Ia memiliki dua potong pita dengan warna dan ukuran yang berbeda seperti pada gambar. Doni menyambung kedua pita tersebut tanpa memotongnya sedikit pun. Setelah selesai, Doni memotong 0,5 meter dari sambungan pita tersebut karena bagian ujungnya rusak. Sisa pita yang digunakan Doni untuk hiasan pintu kelas adalah ....</p>",
      ["4,3 meter", "4,8 meter", "5,3 meter", "5,8 meter"], gPita6),

    pgk("M6-PGK1", "<p>Di kelas VI sedang diadakan pemilihan ketua kelas. Panitia mencatat bahwa perbandingan banyak siswa laki-laki dan siswa perempuan di kelas itu adalah 2 : 3. Diketahui banyak siswa perempuan 21 orang.</p><p>Berdasarkan data yang dicatat panitia, pernyataan yang benar adalah ....</p>",
      ["Banyak siswa laki-laki adalah 14 orang.", "Jumlah seluruh siswa di kelas tersebut ada 35 orang.", "Selisih banyaknya siswa perempuan dan siswa laki-laki adalah 7 orang.", "Banyak siswa laki-laki adalah 21 orang."]),
    pgk("M6-PGK2", "<p>Bu Rina adalah penjahit yang menerima pesanan seragam sekolah. Ia menyiapkan kain sepanjang " + fr(5, 25) + " meter untuk membuat satu kerah seragam. Agar mudah dicatat, Bu Rina ingin menuliskan panjang kain itu dalam bentuk lain.</p><p>Pernyataan yang menyatakan panjang kain setara dengan " + fr(5, 25) + " meter adalah ....</p>",
      ["0,2 meter", fr(1, 5) + " meter", "0,25 meter", "20% meter"]),
    pgk("M6-PGK3", "<p>Perhatikan gambar berikut!</p><p>Pernyataan yang benar pada informasi di atas adalah ....</p>",
      ["Selisih banyak penumpang di Bandara Soekarno-Hatta dan Bandara I Gusti Ngurah Rai adalah 2,1 juta orang.", "Urutan banyak penumpang dari yang paling banyak hingga paling sedikit adalah 1,4 ; 3,5 ; 0,486 ; 0,603 ; 0,863", "Banyak penumpang di Bandara Kualanamu kurang dari 0,5 juta.", "Selisih penumpang Bandara Juanda dan Kualanamu adalah 0,377 juta."], gBandara),
    pgk("M6-PGK4", "<p>Di perpustakaan sekolah terdapat beberapa kelompok buku dengan rasio:</p><ul><li>Rasio banyak buku cerita terhadap buku pelajaran 5 : 7,</li><li>Rasio banyak buku majalah terhadap buku komik 12 : 18,</li><li>Rasio banyak buku ensiklopedia terhadap buku atlas 8 : 15,</li><li>Rasio banyak buku novel terhadap buku puisi 20 : 25.</li></ul><p>Manakah rasio berikut yang sudah dalam bentuk paling sederhana?</p>",
      ["Bentuk sederhana rasio banyak buku cerita terhadap buku pelajaran 5 : 7", "Bentuk sederhana rasio banyak buku majalah terhadap buku komik 2 : 3", "Bentuk sederhana rasio banyak buku ensiklopedia terhadap buku atlas 8 : 15", "Bentuk sederhana rasio banyak buku novel terhadap buku puisi 20 : 25"]),
    pgk("M6-PGK5", "<p>SD Harapan Bangsa sedang merencanakan kegiatan bakti sosial. Panitia perlu mengetahui perbandingan dan jumlah siswa laki-laki serta perempuan di setiap kelas VI. Data tersebut disajikan pada tabel dalam gambar.</p><p>Berdasarkan data pada tabel tersebut, pernyataan manakah yang benar?</p>",
      ["Banyak siswa perempuan di kelas VI B adalah 16 siswa.", "Banyak siswa laki-laki di kelas VI C adalah 12 siswa.", "Banyak siswa laki-laki di kelas VI D adalah 21 siswa.", "Banyak siswa perempuan di kelas VI D adalah 28 siswa."], gDataSiswa),

    bs("M6-BS1", '<p class="muted small">Bacalah teks berikut dengan saksama untuk menjawab soal nomor 11 sampai 15!</p>' + bsMakmur("Jika Pak Budi membeli 1 karton Map Plastik, maka harga satu buah map tersebut adalah Rp15.000,00.")),
    bs("M6-BS2", bsMakmur("Selisih harga 1 rim Kertas HVS A4 dengan 1 buah Karton Box Besar adalah Rp52.500,00.")),
    bs("M6-BS3", bsMakmur("Harga 4 botol Tinta Printer lebih murah dibandingkan dengan harga 1 buah papan tulis <i>whiteboard</i>.")),
    bs("M6-BS4", bsMakmur("Dengan membawa uang Rp1.000.000,00, Toko Makmur dapat membeli 1 buah kursi kantor dan 1 karton Map Plastik.")),
    bs("M6-BS5", bsMakmur("Harga 1 buah lemari arsip besi setara dengan membeli 2 buah kursi kantor dan 1 buah papan tulis <i>whiteboard</i>.")),

    isian("M6-IS1", "<p>Ibu memiliki persediaan gula pasir sebanyak " + fr(3, 4) + " kg. Untuk membuat kue, Ibu membeli lagi gula pasir sebanyak " + fr(1, 2) + " kg. Berapakah total persediaan gula pasir yang dimiliki Ibu sekarang?</p>"),
    isian("M6-IS2", "<p>Sebuah botol berisi air minum sebanyak " + fr(2, 3) + " liter. Jika Doni meminum " + fr(1, 4) + " bagian dari isi botol tersebut, berapa liter air minum yang diminum oleh Doni?</p>"),
    isian("M6-IS3", "<p>Bu Siti memiliki kain sepanjang " + fr(3, 4) + " meter. Kain tersebut akan dipotong menjadi beberapa bagian sama panjang, di mana setiap potongannya berukuran " + fr(1, 8) + " meter. Berapa banyak potongan kain yang akan didapatkan oleh Bu Siti?</p>"),
    isian("M6-IS4", "<p>Di perpustakaan sekolah terdapat 120 buku cerita. Sebanyak 45 buku dipinjam oleh siswa. Kemudian, pihak sekolah menyumbang 30 buku cerita baru. Berapakah jumlah buku cerita di perpustakaan sekarang?</p>"),
    isian("M6-IS5", "<p>Bu Siti membeli 8 kotak kue. Setiap kotak berisi 12 kue. Seluruh kue tersebut akan dibagikan sama banyak kepada 6 anak. Berapakah banyak kue yang diterima setiap anak?</p>"),
    isian("M6-IS6", '<p class="muted small">Perhatikan data pada gambar untuk menjawab soal nomor 21 sampai 23!</p><p>Berdasarkan data panen mangga dan jeruk, berapa kg mangga yang berhasil dipanen anggota koperasi bulan ini?</p>', gPanenBuah),
    isian("M6-IS7", "<p>Berdasarkan data panen mangga dan jeruk, berapa kg jeruk yang berhasil dipanen anggota koperasi?</p>", gPanenBuah),
    isian("M6-IS8", "<p>Berdasarkan data perbandingan jeruk dan duku pada tabel, berapa kg duku yang dipanen anggota koperasi?</p>", gPanenBuah),
    isian("M6-IS9", '<p class="muted small">Perhatikan data pada gambar untuk menjawab soal nomor 24 dan 25!</p><p>Rina membaca label pada kemasan biskuit gandum di kantin sekolah. Pada kemasan tertulis kandungan gizi seperti pada gambar.</p><p>Pada gambar, kandungan energi total tertulis ' + fr(1, 3, 1) + ". Nyatakan nilai tersebut dalam bentuk pecahan biasa!</p>", gBiskuit),
    isian("M6-IS10", "<p>Rina ingin tahu mana yang lebih besar antara kandungan protein (tertulis 12,5 gram) dan karbohidrat (tertulis 0,6 gram). Manakah yang lebih besar? Tunjukkan perbandinganmu dengan menggunakan lambang perbandingan (&gt;, &lt;, atau =)!</p>", gBiskuit),

    essay("M6-ES1", "<p>Dalam seminggu, jumlah pengunjung perempuan di suatu pameran sebanyak 12.226 orang. Pengunjung laki-laki sebanyak 1.525 orang lebih banyak dari pengunjung perempuan. Berapakah jumlah pengunjung pameran tersebut dalam seminggu?</p>"),
    essay("M6-ES2", "<p>Pak Rudi baru saja mendata hewan ternaknya. Ia mencatat bahwa perbandingan banyak ayam dan bebek di peternakannya adalah 7 : 4. Jika jumlah seluruh ternak Pak Rudi ada 88 ekor, berapakah banyak ayam yang ia pelihara?</p>"),
    essay("M6-ES3", "<p>Rina ingin membeli sebuah tas. Harga tas tersebut sama di dua toko, yaitu Rp200.000,00.</p><ul><li><b>Toko A</b> memberikan diskon 20%.</li><li><b>Toko B</b> memberikan diskon 30%.</li></ul><p>Di toko mana Rina sebaiknya membeli tas agar lebih murah? Berapa harga tas yang harus dibayar Rina di toko tersebut?</p>"),
    essay("M6-ES4", "<p>Pak Budi memiliki 8 kandang ayam. Setiap kandang berisi 25 ekor ayam. Pada hari pertama, Pak Budi menjual 60 ekor ayam. Berapa ekor ayam yang masih dimiliki Pak Budi sekarang?</p>"),
    essay("M6-ES5", "<p>Perbandingan umur Ayah dan Paman adalah 7 : 5. Saat ini, umur Paman adalah 35 tahun.</p><p>a. Berapakah umur Ayah saat ini?<br>b. Berapakah selisih umur Ayah dan Paman?</p>")
  ];

  /* ================= MATHEMATICS GRADE 6 — kelas bahasa (6 Almeria), terjemahan Matematika Kelas 6 ================= */
  const gTokoEN = G("mtk6-toko-cerdas-mandiri", "Cerdas Mandiri store, new school year promo 20% off all items: school bag Rp150,000, notebooks Rp40,000, sports shoes Rp200,000, stationery Rp50,000, coloured pencils Rp60,000, eraser Rp5,000, ruler Rp10,000, watch Rp120,000");
  const gPita6EN = G("mtk6-pita-hiasan", "Class decoration: red ribbon 3.5 metres and blue ribbon 18/10 metres");
  const gBandaraEN = G("mtk6-bandara", "Airports with the most passengers in 2025: 1. Soekarno-Hatta (Jakarta) 3.5 million, 2. I Gusti Ngurah Rai (Bali) 1.4 million, 3. Juanda (Surabaya) 0.863 million, 4. Sultan Hasanuddin (Makassar) 0.603 million, 5. Kualanamu (Medan) 0.486 million passengers");
  const gDataSiswaEN = G("mtk6-data-siswa", "Grade VI student data at SD Harapan Bangsa, ratio of boys : girls and number of students: VI A 2:3, 30; VI B 3:4, 35; VI C 2:3, 40; VI D 3:4, 49");
  const gPanenBuahEN = G("mtk6-panen-buah", "Fruit harvest at Desa Makmur Farmers' Cooperative this month: mango : orange = 5 : 3, difference 24 kg; rambutan : mango = 2 : 5, difference 18 kg; orange : duku = 3 : 4, difference 15 kg. Infographic: mangoes and oranges were harvested the most, duku the least, all the harvest is packed in baskets to be sold at the market");
  const gBiskuitEN = G("mtk6-biskuit-gandum", "Nutrition facts of wheat biscuits per pack (serving size 4 pieces 30 g, net weight 120 g): total energy 1 1/3 servings, total fat 1/5 gram, protein 12.5 grams, carbohydrate 0.6 gram, sodium 3/20 gram, dietary fibre 25 grams");
  const MAKMUR_EN = '<div class="bacaan"><p style="text-align:center"><b>Increasing Sales of Office Supplies at "Makmur" Store</b></p><p>Near the end of the year, "Makmur" Supplies Store recorded more purchases of office supplies than in the previous month. Here is the price list of some of the most ordered items:</p>' +
    '<table class="tbl-soal"><tr><th>Item</th><th>Number of Items per Carton</th><th>Price per Carton</th></tr><tr><td>A4 HVS Paper</td><td>5 reams</td><td>Rp325,000.00</td></tr><tr><td>Plastic Folder</td><td>10 pieces</td><td>Rp150,000.00</td></tr><tr><td>Printer Ink</td><td>4 bottles</td><td>Rp450,000.00</td></tr><tr><td>Large Cardboard Box</td><td>20 pieces</td><td>Rp250,000.00</td></tr></table>' +
    "<p>Besides the items above, several other supplies are also in higher demand. Among them are a whiteboard for Rp350,000.00 each, an office chair for Rp750,000.00 each, and a steel filing cabinet for Rp1,850,000.00 each.</p></div>";
  const bsMakmurEN = t => MAKMUR_EN + "<p>" + t + "</p>";

  const soalMTK6EN = [
    pg("M6-PG1", "<p>Mr. Rudi is a rice seller. He has 78,500 kg of rice in his warehouse. On Monday, he sold 34,250 kg of rice, and on Tuesday he bought another 12,750 kg of rice from farmers. Mr. Rudi's rice stock now is ....</p>",
      ["44,250 kg", "57,000 kg", "67,000 kg", "125,500 kg"]),
    pg("M6-PG2", "<p>Mother is going to make two kinds of cake for a thanksgiving event at home. The sponge cake recipe needs " + fr(3, 4) + " kg of wheat flour, while the layer cake recipe needs " + fr(2, 5) + " kg of wheat flour. Mother wants to buy one large pack of flour that is enough for both cakes. The total amount of flour Mother must buy is ....</p>",
      [fr(5, 9) + " kg", fr(5, 20) + " kg", fr(23, 20) + " kg", fr(15, 20) + " kg"]),
    pg("M6-PG3", "<p>To celebrate the school's anniversary, there is a relay race around the school area. Rina is the first runner. She completes " + fr(7, 20) + " of the total distance her team must run. The rest of the distance will be run by the other team members.</p><p>Based on this situation, the distance Rina ran written as a decimal is ....</p>",
      ["0.25", "0.35", "0.45", "0.70"]),
    pg("M6-PG4", "<p>Before the new school year, \"Cerdas Mandiri\" store holds a big promotion. All school supplies get a 20% discount. The price list of school supplies at the store is shown in the picture.</p><p>Sinta wants to buy a school bag because her old bag is broken. She goes to \"Cerdas Mandiri\" store and takes the school bag whose price is shown in the picture. Based on the information and the picture, the price Sinta must pay for the school bag after the 20% discount is ....</p>",
      ["Rp30,000", "Rp120,000", "Rp130,000", "Rp180,000"], gTokoEN),
    pg("M6-PG5", "<p>Doni's teacher asks him to make a class decoration. He has two pieces of ribbon of different colours and lengths, as shown in the picture. Doni joins the two ribbons without cutting them at all. After that, Doni cuts 0.5 metre from the joined ribbon because the end is damaged. The length of ribbon Doni uses to decorate the classroom door is ....</p>",
      ["4.3 metres", "4.8 metres", "5.3 metres", "5.8 metres"], gPita6EN),

    pgk("M6-PGK1", "<p>Grade VI is holding a class leader election. The committee records that the ratio of the number of boys to girls in the class is 2 : 3. It is known that there are 21 girls.</p><p>Based on the committee's data, the correct statements are ....</p>",
      ["There are 14 boys.", "There are 35 students in the class altogether.", "The difference between the number of girls and boys is 7.", "There are 21 boys."]),
    pgk("M6-PGK2", "<p>Mrs. Rina is a tailor who takes orders for school uniforms. She prepares a piece of cloth " + fr(5, 25) + " metre long to make one uniform collar. To make it easier to record, Mrs. Rina wants to write the length of the cloth in another form.</p><p>The statements that show a length equal to " + fr(5, 25) + " metre are ....</p>",
      ["0.2 metre", fr(1, 5) + " metre", "0.25 metre", "20% metre"]),
    pgk("M6-PGK3", "<p>Look at the picture below!</p><p>The correct statements based on the information above are ....</p>",
      ["The difference in the number of passengers at Soekarno-Hatta Airport and I Gusti Ngurah Rai Airport is 2.1 million people.", "The order of the number of passengers from the most to the fewest is 1.4 ; 3.5 ; 0.486 ; 0.603 ; 0.863", "The number of passengers at Kualanamu Airport is less than 0.5 million.", "The difference in passengers between Juanda Airport and Kualanamu Airport is 0.377 million."], gBandaraEN),
    pgk("M6-PGK4", "<p>The school library has several groups of books with these ratios:</p><ul><li>The ratio of storybooks to textbooks is 5 : 7,</li><li>The ratio of magazines to comics is 12 : 18,</li><li>The ratio of encyclopedias to atlases is 8 : 15,</li><li>The ratio of novels to poetry books is 20 : 25.</li></ul><p>Which of the following ratios are already in their simplest form?</p>",
      ["The simplest form of the ratio of storybooks to textbooks is 5 : 7", "The simplest form of the ratio of magazines to comics is 2 : 3", "The simplest form of the ratio of encyclopedias to atlases is 8 : 15", "The simplest form of the ratio of novels to poetry books is 20 : 25"]),
    pgk("M6-PGK5", "<p>SD Harapan Bangsa is planning a social service activity. The committee needs to know the ratio and number of boys and girls in each grade VI class. The data is shown in the table in the picture.</p><p>Based on the data in the table, which statements are correct?</p>",
      ["There are 16 girls in class VI B.", "There are 12 boys in class VI C.", "There are 21 boys in class VI D.", "There are 28 girls in class VI D."], gDataSiswaEN),

    bs("M6-BS1", '<p class="muted small">Read the text below carefully to answer questions 11 to 15!</p>' + bsMakmurEN("If Mr. Budi buys 1 carton of Plastic Folders, the price of one folder is Rp15,000.00.")),
    bs("M6-BS2", bsMakmurEN("The difference in price between 1 ream of A4 HVS Paper and 1 Large Cardboard Box is Rp52,500.00.")),
    bs("M6-BS3", bsMakmurEN("The price of 4 bottles of Printer Ink is cheaper than the price of 1 whiteboard.")),
    bs("M6-BS4", bsMakmurEN("With Rp1,000,000.00, someone can buy 1 office chair and 1 carton of Plastic Folders at Makmur Store.")),
    bs("M6-BS5", bsMakmurEN("The price of 1 steel filing cabinet is equal to the price of 2 office chairs and 1 whiteboard.")),

    isian("M6-IS1", "<p>Mother has " + fr(3, 4) + " kg of sugar. To make a cake, Mother buys another " + fr(1, 2) + " kg of sugar. How much sugar does Mother have now in total?</p>"),
    isian("M6-IS2", "<p>A bottle contains " + fr(2, 3) + " litre of drinking water. If Doni drinks " + fr(1, 4) + " of the water in the bottle, how many litres of water does Doni drink?</p>"),
    isian("M6-IS3", "<p>Mrs. Siti has a piece of cloth " + fr(3, 4) + " metre long. The cloth will be cut into pieces of the same length, each " + fr(1, 8) + " metre long. How many pieces of cloth will Mrs. Siti get?</p>"),
    isian("M6-IS4", "<p>The school library has 120 storybooks. Students borrow 45 of them. Then, the school donates 30 new storybooks. How many storybooks are in the library now?</p>"),
    isian("M6-IS5", "<p>Mrs. Siti buys 8 boxes of cakes. Each box contains 12 cakes. All the cakes will be shared equally among 6 children. How many cakes does each child get?</p>"),
    isian("M6-IS6", '<p class="muted small">Look at the data in the picture to answer questions 21 to 23!</p><p>Based on the mango and orange harvest data, how many kilograms of mangoes did the cooperative members harvest this month?</p>', gPanenBuahEN),
    isian("M6-IS7", "<p>Based on the mango and orange harvest data, how many kilograms of oranges did the cooperative members harvest?</p>", gPanenBuahEN),
    isian("M6-IS8", "<p>Based on the ratio of oranges to duku in the table, how many kilograms of duku did the cooperative members harvest?</p>", gPanenBuahEN),
    isian("M6-IS9", '<p class="muted small">Look at the data in the picture to answer questions 24 and 25!</p><p>Rina reads the label on a pack of wheat biscuits in the school canteen. The nutrition facts on the pack are shown in the picture.</p><p>In the picture, the total energy is written as ' + fr(1, 3, 1) + ". Write this value as an improper fraction!</p>", gBiskuitEN),
    isian("M6-IS10", "<p>Rina wants to know which is greater: the protein content (written as 12.5 grams) or the carbohydrate content (written as 0.6 gram). Which one is greater? Show your comparison using a comparison symbol (&gt;, &lt;, or =)!</p>", gBiskuitEN),

    essay("M6-ES1", "<p>In one week, there were 12,226 female visitors at an exhibition. There were 1,525 more male visitors than female visitors. How many visitors came to the exhibition in that week?</p>"),
    essay("M6-ES2", "<p>Mr. Rudi has just counted his farm animals. He notes that the ratio of chickens to ducks on his farm is 7 : 4. If Mr. Rudi has 88 animals altogether, how many chickens does he have?</p>"),
    essay("M6-ES3", "<p>Rina wants to buy a bag. The bag has the same price in two shops, Rp200,000.00.</p><ul><li><b>Shop A</b> gives a 20% discount.</li><li><b>Shop B</b> gives a 30% discount.</li></ul><p>In which shop should Rina buy the bag so that it is cheaper? How much must Rina pay for the bag in that shop?</p>"),
    essay("M6-ES4", "<p>Mr. Budi has 8 chicken coops. Each coop has 25 chickens. On the first day, Mr. Budi sells 60 chickens. How many chickens does Mr. Budi have now?</p>"),
    essay("M6-ES5", "<p>The ratio of Father's age to Uncle's age is 7 : 5. Uncle is now 35 years old.</p><p>a. How old is Father now?<br>b. What is the difference between Father's age and Uncle's age?</p>")
  ];

  window.BANK_SOAL = {
    mapel: [
      { id: "bind5", tingkat: ["5"], nama: "Bahasa Indonesia Kelas 5", singkat: "B. Indonesia", ikon: "book", durasi: 90, soal: soalBI5 },
      { id: "mtk5",  tingkat: ["5"], nama: "Matematika Kelas 5",       singkat: "Matematika",   ikon: "calc", durasi: 90, soal: soalMTK5,
        // urutan bagian sesuai naskah: PG, PG kompleks, Benar/Salah, Isian, Uraian
        urutan: ["pg", "pgk", "bs", "isian", "essay"],
        // sesuai kunci: PG dan B/S bernilai 1 (pilihan), alasan tetap ditulis tetapi tidak diberi skor terpisah
        skor: { pg: { jawaban: 1, alasanMaks: 0 }, bs: { jawaban: 1, alasanMaks: 0 } },
        // kelas bahasa: paket & token sama, hanya teks soal berbahasa Inggris
        inggris: { kelas: ["5 Cordoba"], ubah: { nama: "Mathematics Kelas 5", soal: soalMTK5EN } } },
      { id: "bind6", tingkat: ["6"], nama: "Bahasa Indonesia Kelas 6", singkat: "B. Indonesia", ikon: "book", durasi: 90, soal: soalBI6 },
      { id: "mtk6",  tingkat: ["6"], nama: "Matematika Kelas 6",       singkat: "Matematika",   ikon: "calc", durasi: 90, soal: soalMTK6,
        urutan: ["pg", "pgk", "bs", "isian", "essay"],
        skor: { pg: { jawaban: 1, alasanMaks: 0 }, bs: { jawaban: 1, alasanMaks: 0 } },
        // kelas bahasa: paket & token sama, hanya teks soal berbahasa Inggris
        inggris: { kelas: ["6 Almeria"], ubah: { nama: "Mathematics Kelas 6", soal: soalMTK6EN } } }
    ]
  };
})();

/* ---------- Tampilan gambar (dipakai halaman siswa & guru) ---------- */
(function () {
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Gambar pada soal
  window.GAMBAR_SOAL = function (g) {
    if (!g) return "";
    if (typeof g === "string") g = { src: g };
    return '<figure class="q-fig"><button type="button" class="fig-zoom" data-zoom="' + esc(g.src) + '" data-alt="' + esc(g.alt || "") + '" aria-label="Perbesar gambar">' +
      '<img src="' + esc(g.src) + '" alt="' + esc(g.alt || "Gambar soal") + '" draggable="false"></button>' +
      '<figcaption>Klik gambar untuk memperbesar</figcaption></figure>';
  };
  // Isi satu pilihan jawaban: teks biasa, atau objek { gambar, teks }
  window.OPSI_HTML = function (o) {
    if (o && typeof o === "object") {
      return (o.gambar ? '<img class="opt-img" src="' + esc(o.gambar) + '" alt="' + esc(o.alt || o.teks || "Pilihan bergambar") + '" draggable="false">' : "") +
        (o.teks ? '<span class="opt-cap">' + o.teks + "</span>" : "");
    }
    return String(o);
  };
  window.OPSI_BERGAMBAR = o => !!(o && typeof o === "object" && o.gambar);
  window.OPSI_TEKS = o => (o && typeof o === "object") ? (o.teks || "[gambar]") : String(o).replace(/<[^>]+>/g, "");
})();
