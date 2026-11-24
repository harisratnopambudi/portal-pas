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

(function () {
  const pg = (id, teks, opsi, gambar) => ({ id, tipe: "pg", teks, opsi, gambar });
  const bs = (id, teks, gambar) => ({ id, tipe: "bs", teks, gambar });
  const pgk = (id, teks, opsi, gambar) => ({ id, tipe: "pgk", teks, opsi, gambar });
  const isian = (id, teks, gambar) => ({ id, tipe: "isian", teks, gambar });
  const essay = (id, teks, gambar) => ({ id, tipe: "essay", teks, gambar });

  /* Soal DUMMY (dipakai paket yang belum ada soal aslinya).
     p = awalan id soal, mis. "B5" menghasilkan B5-PG1, B5-PG2, ... */
  const soalBI = p => [
          pg(p + "-PG1", '<div class="bacaan">Setiap Minggu pagi, warga RT 05 melaksanakan kerja bakti. Bapak-bapak membersihkan selokan, ibu-ibu menyapu jalan, dan anak-anak memungut sampah plastik. Setelah selesai, mereka makan bersama di balai warga.</div><p>Ide pokok paragraf tersebut adalah ...</p>',
            ["Bapak-bapak membersihkan selokan", "Warga RT 05 melaksanakan kerja bakti setiap Minggu pagi", "Anak-anak memungut sampah plastik", "Warga makan bersama di balai warga"]),
          pg(p + "-PG2", "<p>Kalimat yang penulisan ejaannya tepat adalah ...</p>",
            ["kami berangkat ke bandung hari senin.", "Kami berangkat ke Bandung hari senin.", "Kami berangkat ke Bandung hari Senin.", "kami Berangkat ke bandung Hari Senin."]),
          pg(p + "-PG3", "<p>Di kelas Rani terdapat teman dari suku Sunda, Jawa, dan Batak. Sikap Rani yang sesuai dengan sila ketiga Pancasila adalah ...</p>",
            ["Hanya mau bermain dengan teman satu suku", "Mengejek logat bicara teman dari daerah lain", "Bermain dan belajar bersama semua teman tanpa membedakan suku", "Membentuk kelompok belajar khusus satu daerah"]),
          pg(p + "-PG4", "<p>Kata berikut yang merupakan kata baku adalah ...</p>",
            ["Apotik", "Nasehat", "Karir", "Kualitas"]),
          pg(p + "-PG5", "<p>Berikut yang merupakan contoh norma kesopanan adalah ...</p>",
            ["Berdoa sebelum makan", "Mengucapkan permisi ketika lewat di depan orang tua", "Membayar pajak tepat waktu", "Memakai helm saat mengendarai motor"]),

          bs(p + "-BS1", "Teks narasi adalah teks yang menceritakan suatu peristiwa secara berurutan dari awal sampai akhir."),
          bs(p + "-BS2", "Lambang sila keempat Pancasila adalah rantai emas."),
          bs(p + "-BS3", "Kalimat “Adik sedang membaca buku di perpustakaan.” termasuk kalimat tanya."),
          bs(p + "-BS4", "Musyawarah untuk mencapai mufakat merupakan pengamalan sila keempat Pancasila."),
          bs(p + "-BS5", "Kata “nasehat” merupakan kata baku menurut KBBI."),

          pgk(p + "-PGK1", "<p>Pilihlah ciri-ciri teks narasi berikut ini!</p>",
            ["Menceritakan peristiwa secara runtut", "Memiliki tokoh dan latar", "Berisi langkah-langkah membuat sesuatu", "Memiliki alur cerita", "Berisi data angka dalam bentuk tabel"]),
          pgk(p + "-PGK2", "<p>Manakah yang merupakan contoh pengamalan sila kedua Pancasila?</p>",
            ["Menolong teman yang terjatuh", "Memaksakan pendapat saat diskusi", "Menjenguk teman yang sakit", "Tidak membeda-bedakan teman", "Mengejek teman yang berbeda"]),
          pgk(p + "-PGK3", "<p>Pilihlah semua kata baku di bawah ini!</p>",
            ["Aktivitas", "Sekedar", "Risiko", "Jadwal", "Hakekat"]),
          pgk(p + "-PGK4", "<p>Yang termasuk unsur intrinsik cerita adalah ...</p>",
            ["Tokoh", "Latar", "Nama penerbit", "Amanat", "Harga buku"]),
          pgk(p + "-PGK5", "<p>Manfaat menaati tata tertib sekolah adalah ...</p>",
            ["Suasana belajar menjadi tertib", "Siswa terlatih disiplin", "Siswa bebas datang terlambat", "Terhindar dari hukuman", "Guru tidak perlu mengajar"]),

          isian(p + "-IS1", "Lambang sila pertama Pancasila adalah ...."),
          isian(p + "-IS2", "Pancasila disahkan sebagai dasar negara pada tanggal ...."),
          isian(p + "-IS3", "Tokoh dalam cerita yang memiliki watak jahat atau menjadi lawan tokoh utama disebut tokoh ...."),
          isian(p + "-IS4", "Lawan kata (antonim) dari kata “rajin” adalah ...."),
          isian(p + "-IS5", "Semboyan bangsa Indonesia yang tertulis pada pita lambang Garuda Pancasila adalah ...."),
          isian(p + "-IS6", "Kalimat perintah biasanya diakhiri dengan tanda baca ...."),
          isian(p + "-IS7", "Hari Lahir Pancasila diperingati setiap tanggal ...."),
          isian(p + "-IS8", "Tempat, waktu, dan suasana terjadinya peristiwa dalam cerita disebut ...."),
          isian(p + "-IS9", "Bentuk baku dari kata “apotik” adalah ...."),
          isian(p + "-IS10", "Aturan yang dibuat oleh negara dan memiliki sanksi tegas disebut norma ...."),

          essay(p + "-ES1", "Tuliskan tiga contoh pengamalan sila ketiga Pancasila di lingkungan sekolah!"),
          essay(p + "-ES2", '<div class="bacaan">Sampah plastik sangat berbahaya bagi lingkungan. Sampah plastik sulit terurai meskipun sudah bertahun-tahun. Jika dibakar, asapnya mengandung zat beracun. Sampah plastik yang dibuang ke sungai juga dapat menyebabkan banjir.</div><p>Tentukan ide pokok dan dua kalimat penjelas dari paragraf di atas!</p>'),
          essay(p + "-ES3", "Jelaskan perbedaan tokoh protagonis dan tokoh antagonis, lalu berikan masing-masing satu contoh dari cerita yang kamu ketahui!"),
          essay(p + "-ES4", "Mengapa kita harus menghargai perbedaan pendapat ketika bermusyawarah? Jelaskan pendapatmu!"),
          essay(p + "-ES5", "Buatlah satu kalimat ajakan tentang menjaga kebersihan lingkungan sekolah dengan ejaan yang benar!")
  ];
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

  window.BANK_SOAL = {
    mapel: [
      { id: "bind5", tingkat: ["5"], nama: "Bahasa Indonesia Kelas 5", singkat: "B. Indonesia", ikon: "book", durasi: 90, soal: soalBI5 },
      { id: "mtk5",  tingkat: ["5"], nama: "Matematika Kelas 5",       singkat: "Matematika",   ikon: "calc", durasi: 90, soal: soalMTK("M5") },
      { id: "bind6", tingkat: ["6"], nama: "Bahasa Indonesia Kelas 6", singkat: "B. Indonesia", ikon: "book", durasi: 90, soal: soalBI("B6") },
      { id: "mtk6",  tingkat: ["6"], nama: "Matematika Kelas 6",       singkat: "Matematika",   ikon: "calc", durasi: 90, soal: soalMTK("M6") }
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
