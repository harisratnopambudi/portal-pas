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

  window.BANK_SOAL = {
    mapel: [
      { id: "bind5", tingkat: ["5"], nama: "Bahasa Indonesia Kelas 5", singkat: "B. Indonesia", ikon: "book", durasi: 90, soal: soalBI5 },
      { id: "mtk5",  tingkat: ["5"], nama: "Matematika Kelas 5",       singkat: "Matematika",   ikon: "calc", durasi: 90, soal: soalMTK("M5") },
      { id: "bind6", tingkat: ["6"], nama: "Bahasa Indonesia Kelas 6", singkat: "B. Indonesia", ikon: "book", durasi: 90, soal: soalBI6 },
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
