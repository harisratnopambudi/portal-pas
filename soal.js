/* =========================================================
   BANK SOAL PAS — (DUMMY, kelas 5)
   File ini dimuat oleh halaman siswa. JANGAN taruh kunci di sini.
   Kunci & rubrik ada di kunci.js (hanya dimuat halaman guru).

   Tipe: pg (pilihan ganda + alasan), bs (benar/salah + alasan),
         pgk (pilihan ganda kompleks), isian, essay
   Teks boleh berisi HTML sederhana, mis. <div class="bacaan">...</div>
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
  const pg = (id, teks, opsi) => ({ id, tipe: "pg", teks, opsi });
  const bs = (id, teks) => ({ id, tipe: "bs", teks });
  const pgk = (id, teks, opsi) => ({ id, tipe: "pgk", teks, opsi });
  const isian = (id, teks) => ({ id, tipe: "isian", teks });
  const essay = (id, teks) => ({ id, tipe: "essay", teks });

  window.BANK_SOAL = {
    kelas: "5",
    mapel: [
      /* ---------------- BAHASA INDONESIA & PENDIDIKAN PANCASILA ---------------- */
      {
        id: "bipp", nama: "Bahasa Indonesia & Pendidikan Pancasila", ikon: "book", durasi: 90,
        soal: [
          pg("BI-PG1", '<div class="bacaan">Setiap Minggu pagi, warga RT 05 melaksanakan kerja bakti. Bapak-bapak membersihkan selokan, ibu-ibu menyapu jalan, dan anak-anak memungut sampah plastik. Setelah selesai, mereka makan bersama di balai warga.</div><p>Ide pokok paragraf tersebut adalah ...</p>',
            ["Bapak-bapak membersihkan selokan", "Warga RT 05 melaksanakan kerja bakti setiap Minggu pagi", "Anak-anak memungut sampah plastik", "Warga makan bersama di balai warga"]),
          pg("BI-PG2", "<p>Kalimat yang penulisan ejaannya tepat adalah ...</p>",
            ["kami berangkat ke bandung hari senin.", "Kami berangkat ke Bandung hari senin.", "Kami berangkat ke Bandung hari Senin.", "kami Berangkat ke bandung Hari Senin."]),
          pg("BI-PG3", "<p>Di kelas Rani terdapat teman dari suku Sunda, Jawa, dan Batak. Sikap Rani yang sesuai dengan sila ketiga Pancasila adalah ...</p>",
            ["Hanya mau bermain dengan teman satu suku", "Mengejek logat bicara teman dari daerah lain", "Bermain dan belajar bersama semua teman tanpa membedakan suku", "Membentuk kelompok belajar khusus satu daerah"]),
          pg("BI-PG4", "<p>Kata berikut yang merupakan kata baku adalah ...</p>",
            ["Apotik", "Nasehat", "Karir", "Kualitas"]),
          pg("BI-PG5", "<p>Berikut yang merupakan contoh norma kesopanan adalah ...</p>",
            ["Berdoa sebelum makan", "Mengucapkan permisi ketika lewat di depan orang tua", "Membayar pajak tepat waktu", "Memakai helm saat mengendarai motor"]),

          bs("BI-BS1", "Teks narasi adalah teks yang menceritakan suatu peristiwa secara berurutan dari awal sampai akhir."),
          bs("BI-BS2", "Lambang sila keempat Pancasila adalah rantai emas."),
          bs("BI-BS3", "Kalimat “Adik sedang membaca buku di perpustakaan.” termasuk kalimat tanya."),
          bs("BI-BS4", "Musyawarah untuk mencapai mufakat merupakan pengamalan sila keempat Pancasila."),
          bs("BI-BS5", "Kata “nasehat” merupakan kata baku menurut KBBI."),

          pgk("BI-PGK1", "<p>Pilihlah ciri-ciri teks narasi berikut ini!</p>",
            ["Menceritakan peristiwa secara runtut", "Memiliki tokoh dan latar", "Berisi langkah-langkah membuat sesuatu", "Memiliki alur cerita", "Berisi data angka dalam bentuk tabel"]),
          pgk("BI-PGK2", "<p>Manakah yang merupakan contoh pengamalan sila kedua Pancasila?</p>",
            ["Menolong teman yang terjatuh", "Memaksakan pendapat saat diskusi", "Menjenguk teman yang sakit", "Tidak membeda-bedakan teman", "Mengejek teman yang berbeda"]),
          pgk("BI-PGK3", "<p>Pilihlah semua kata baku di bawah ini!</p>",
            ["Aktivitas", "Sekedar", "Risiko", "Jadwal", "Hakekat"]),
          pgk("BI-PGK4", "<p>Yang termasuk unsur intrinsik cerita adalah ...</p>",
            ["Tokoh", "Latar", "Nama penerbit", "Amanat", "Harga buku"]),
          pgk("BI-PGK5", "<p>Manfaat menaati tata tertib sekolah adalah ...</p>",
            ["Suasana belajar menjadi tertib", "Siswa terlatih disiplin", "Siswa bebas datang terlambat", "Terhindar dari hukuman", "Guru tidak perlu mengajar"]),

          isian("BI-IS1", "Lambang sila pertama Pancasila adalah ...."),
          isian("BI-IS2", "Pancasila disahkan sebagai dasar negara pada tanggal ...."),
          isian("BI-IS3", "Tokoh dalam cerita yang memiliki watak jahat atau menjadi lawan tokoh utama disebut tokoh ...."),
          isian("BI-IS4", "Lawan kata (antonim) dari kata “rajin” adalah ...."),
          isian("BI-IS5", "Semboyan bangsa Indonesia yang tertulis pada pita lambang Garuda Pancasila adalah ...."),
          isian("BI-IS6", "Kalimat perintah biasanya diakhiri dengan tanda baca ...."),
          isian("BI-IS7", "Hari Lahir Pancasila diperingati setiap tanggal ...."),
          isian("BI-IS8", "Tempat, waktu, dan suasana terjadinya peristiwa dalam cerita disebut ...."),
          isian("BI-IS9", "Bentuk baku dari kata “apotik” adalah ...."),
          isian("BI-IS10", "Aturan yang dibuat oleh negara dan memiliki sanksi tegas disebut norma ...."),

          essay("BI-ES1", "Tuliskan tiga contoh pengamalan sila ketiga Pancasila di lingkungan sekolah!"),
          essay("BI-ES2", '<div class="bacaan">Sampah plastik sangat berbahaya bagi lingkungan. Sampah plastik sulit terurai meskipun sudah bertahun-tahun. Jika dibakar, asapnya mengandung zat beracun. Sampah plastik yang dibuang ke sungai juga dapat menyebabkan banjir.</div><p>Tentukan ide pokok dan dua kalimat penjelas dari paragraf di atas!</p>'),
          essay("BI-ES3", "Jelaskan perbedaan tokoh protagonis dan tokoh antagonis, lalu berikan masing-masing satu contoh dari cerita yang kamu ketahui!"),
          essay("BI-ES4", "Mengapa kita harus menghargai perbedaan pendapat ketika bermusyawarah? Jelaskan pendapatmu!"),
          essay("BI-ES5", "Buatlah satu kalimat ajakan tentang menjaga kebersihan lingkungan sekolah dengan ejaan yang benar!")
        ]
      },

      /* ---------------- IPAS ---------------- */
      {
        id: "ipas", nama: "IPAS", ikon: "flask", durasi: 90,
        soal: [
          pg("IP-PG1", "<p>Cahaya dapat menembus benda bening. Benda berikut yang dapat ditembus cahaya adalah ...</p>",
            ["Papan kayu", "Kaca jendela", "Tembok", "Buku tebal"]),
          pg("IP-PG2", "<p>Pensil yang dimasukkan ke dalam gelas berisi air terlihat patah. Peristiwa ini menunjukkan bahwa cahaya ...</p>",
            ["Merambat lurus", "Dapat dipantulkan", "Dapat dibiaskan", "Dapat menembus benda gelap"]),
          pg("IP-PG3", "<p>Bunyi TIDAK dapat merambat melalui ...</p>",
            ["Air", "Udara", "Kayu", "Ruang hampa"]),
          pg("IP-PG4", "<p>Perhatikan rantai makanan berikut: padi → tikus → ular → elang.<br>Ular berperan sebagai ...</p>",
            ["Produsen", "Konsumen tingkat I", "Konsumen tingkat II", "Pengurai"]),
          pg("IP-PG5", "<p>Makhluk hidup yang berperan menguraikan sisa-sisa makhluk hidup yang sudah mati adalah ...</p>",
            ["Jamur", "Rumput", "Belalang", "Burung"]),

          bs("IP-BS1", "Cermin datar menghasilkan bayangan yang maya, tegak, dan sama besar dengan bendanya."),
          bs("IP-BS2", "Bunyi merambat paling cepat melalui udara dibandingkan melalui benda padat."),
          bs("IP-BS3", "Tumbuhan hijau berperan sebagai produsen dalam ekosistem."),
          bs("IP-BS4", "Gema terjadi karena bunyi dipantulkan oleh dinding yang jauh."),
          bs("IP-BS5", "Hewan herbivora adalah hewan yang memakan daging."),

          pgk("IP-PGK1", "<p>Pilihlah semua sifat cahaya yang benar!</p>",
            ["Merambat lurus", "Dapat dipantulkan", "Dapat dibiaskan", "Tidak dapat menembus benda bening", "Hanya merambat di dalam air"]),
          pgk("IP-PGK2", "<p>Alat-alat berikut yang memanfaatkan sifat pemantulan cahaya adalah ...</p>",
            ["Periskop", "Kaca spion", "Lup (kaca pembesar)", "Cermin rias", "Kacamata minus"]),
          pgk("IP-PGK3", "<p>Yang termasuk komponen biotik adalah ...</p>",
            ["Rumput", "Batu", "Cacing", "Air", "Jamur"]),
          pgk("IP-PGK4", "<p>Upaya yang dapat dilakukan untuk menjaga keseimbangan ekosistem adalah ...</p>",
            ["Tidak berburu hewan sembarangan", "Melakukan penanaman kembali hutan (reboisasi)", "Membuang sampah ke sungai", "Menebang pohon secara liar", "Tidak menggunakan racun saat menangkap ikan"]),
          pgk("IP-PGK5", "<p>Contoh benda yang merupakan sumber cahaya adalah ...</p>",
            ["Matahari", "Bulan", "Lampu senter", "Cermin", "Lilin yang menyala"]),

          isian("IP-IS1", "Benda yang dapat memancarkan cahaya sendiri disebut sumber ...."),
          isian("IP-IS2", "Pelangi terjadi karena peristiwa ... cahaya matahari oleh titik-titik air hujan."),
          isian("IP-IS3", "Satuan frekuensi bunyi adalah ...."),
          isian("IP-IS4", "Makhluk hidup yang dapat membuat makanannya sendiri disebut ...."),
          isian("IP-IS5", "Hewan pemakan tumbuhan dan daging disebut ...."),
          isian("IP-IS6", "Bunyi yang frekuensinya kurang dari 20 Hz disebut ...."),
          isian("IP-IS7", "Kumpulan beberapa rantai makanan yang saling berhubungan disebut ...."),
          isian("IP-IS8", "Bagian mata tempat terbentuknya bayangan benda adalah ...."),
          isian("IP-IS9", "Hubungan antara lebah dan bunga yang saling menguntungkan disebut simbiosis ...."),
          isian("IP-IS10", "Kelelawar menggunakan bunyi ... untuk menentukan arah terbang dan mencari makan."),

          essay("IP-ES1", "Jelaskan mengapa kita dapat melihat benda-benda di sekitar kita!"),
          essay("IP-ES2", "Buatlah sebuah rantai makanan di ekosistem sawah yang terdiri atas minimal 4 makhluk hidup, lalu tentukan peran masing-masing!"),
          essay("IP-ES3", "Apa yang akan terjadi pada ekosistem sawah jika populasi ular habis karena diburu manusia? Jelaskan!"),
          essay("IP-ES4", "Bunyi dapat merambat melalui zat padat, cair, dan gas. Berikan masing-masing satu contoh peristiwanya!"),
          essay("IP-ES5", "Sebutkan dua contoh pemanfaatan sifat cahaya dalam kehidupan sehari-hari dan jelaskan sifat cahaya yang digunakan!")
        ]
      },

      /* ---------------- PAIBP ---------------- */
      {
        id: "paibp", nama: "Pendidikan Agama Islam & Budi Pekerti", ikon: "moon", durasi: 90,
        soal: [
          pg("PA-PG1", "<p>Q.S. At-Tin terdiri atas ... ayat.</p>",
            ["6", "7", "8", "11"]),
          pg("PA-PG2", "<p>Asmaulhusna <i>Al-‘Alim</i> artinya Allah Maha ...</p>",
            ["Mendengar", "Mengetahui", "Melihat", "Pemberi"]),
          pg("PA-PG3", "<p>Kitab Zabur diturunkan Allah Swt. kepada Nabi ...</p>",
            ["Musa a.s.", "Isa a.s.", "Dawud a.s.", "Ibrahim a.s."]),
          pg("PA-PG4", "<p>Menurut Q.S. Al-Ma‘un, salah satu ciri orang yang mendustakan agama adalah ...</p>",
            ["Rajin bersedekah", "Menghardik anak yatim", "Gemar membaca Al-Qur’an", "Menghormati orang tua"]),
          pg("PA-PG5", "<p>Hukum puasa Ramadan bagi setiap muslim yang sudah balig dan berakal adalah ...</p>",
            ["Sunah", "Mubah", "Makruh", "Wajib"]),

          bs("PA-BS1", "Kitab Taurat diturunkan Allah Swt. kepada Nabi Musa a.s."),
          bs("PA-BS2", "As-Sami‘ artinya Allah Maha Melihat."),
          bs("PA-BS3", "Makan sahur termasuk sunah dalam berpuasa."),
          bs("PA-BS4", "Q.S. At-Tin termasuk surah Madaniyah."),
          bs("PA-BS5", "Al-Qur’an adalah kitab terakhir yang diturunkan Allah Swt."),

          pgk("PA-PGK1", "<p>Pilihlah kitab-kitab Allah yang wajib diimani!</p>",
            ["Taurat", "Zabur", "Kitab Fikih", "Injil", "Al-Qur’an"]),
          pgk("PA-PGK2", "<p>Hal-hal berikut yang membatalkan puasa adalah ...</p>",
            ["Makan dan minum dengan sengaja", "Tidur pada siang hari", "Muntah dengan sengaja", "Mandi pada siang hari", "Keluar darah haid"]),
          pgk("PA-PGK3", "<p>Sikap yang mencerminkan meneladani sifat Allah <i>Al-‘Alim</i> adalah ...</p>",
            ["Rajin belajar", "Malas membaca buku", "Membagikan ilmu kepada teman", "Menyombongkan kepintaran", "Bertanya kepada guru jika belum paham"]),
          pgk("PA-PGK4", "<p>Pesan yang terkandung dalam Q.S. Al-Ma‘un adalah ...</p>",
            ["Menyayangi anak yatim", "Memberi makan orang miskin", "Melalaikan salat", "Tidak riya dalam beribadah", "Enggan menolong sesama"]),
          pgk("PA-PGK5", "<p>Yang termasuk sunah-sunah puasa adalah ...</p>",
            ["Menyegerakan berbuka", "Mengakhirkan makan sahur", "Berkata kotor", "Berdoa ketika berbuka", "Tidur sepanjang hari"]),

          isian("PA-IS1", "Kitab Injil diturunkan Allah Swt. kepada Nabi ...."),
          isian("PA-IS2", "<i>Al-Wahhab</i> artinya Allah Maha ...."),
          isian("PA-IS3", "Q.S. Al-Ma‘un terdiri atas ... ayat."),
          isian("PA-IS4", "Malam yang lebih baik daripada seribu bulan disebut malam ...."),
          isian("PA-IS5", "Rukun iman yang ketiga adalah iman kepada ...."),
          isian("PA-IS6", "Zakat yang wajib dikeluarkan pada bulan Ramadan sebelum salat Idulfitri disebut zakat ...."),
          isian("PA-IS7", "Al-Qur’an diturunkan Allah Swt. kepada Nabi ...."),
          isian("PA-IS8", "Menurut Q.S. At-Tin ayat 4, manusia diciptakan dalam bentuk yang paling ...."),
          isian("PA-IS9", "Menahan diri dari makan, minum, dan hal yang membatalkan sejak terbit fajar hingga terbenam matahari disebut ...."),
          isian("PA-IS10", "<i>As-Sami‘</i> artinya Allah Maha ...."),

          essay("PA-ES1", "Tuliskan kandungan Q.S. At-Tin secara singkat!"),
          essay("PA-ES2", "Jelaskan perbedaan kitab dan suhuf!"),
          essay("PA-ES3", "Sebutkan tiga contoh perilaku yang mencerminkan iman kepada kitab-kitab Allah!"),
          essay("PA-ES4", "Bagaimana cara meneladani sifat Allah <i>As-Sami‘</i> dalam kehidupan sehari-hari? Berikan dua contoh!"),
          essay("PA-ES5", "Sebutkan minimal tiga hikmah puasa Ramadan bagi diri sendiri dan orang lain!")
        ]
      },

      /* ---------------- MATEMATIKA ---------------- */
      {
        id: "mtk", nama: "Matematika", ikon: "calc", durasi: 90,
        soal: [
          pg("MT-PG1", "<p>KPK dari 12 dan 18 adalah ...</p>",
            ["6", "24", "36", "72"]),
          pg("MT-PG2", "<p>FPB dari 24 dan 36 adalah ...</p>",
            ["6", "8", "12", "72"]),
          pg("MT-PG3", "<p>Hasil dari 3/4 + 1/2 adalah ...</p>",
            ["4/6", "1 1/4", "1 1/2", "4/8"]),
          pg("MT-PG4", "<p>Bentuk pecahan biasa paling sederhana dari 0,75 adalah ...</p>",
            ["7/5", "75/10", "3/4", "1/4"]),
          pg("MT-PG5", "<p>Ibu membeli 2,5 kg gula. Sebanyak 1 3/4 kg digunakan untuk membuat kue. Sisa gula ibu adalah ...</p>",
            ["1/2 kg", "3/4 kg", "1 kg", "1 1/4 kg"]),

          bs("MT-BS1", "Pecahan 2/3 lebih besar daripada 3/5."),
          bs("MT-BS2", "KPK dari 4 dan 6 adalah 24."),
          bs("MT-BS3", "25% sama nilainya dengan 1/4."),
          bs("MT-BS4", "Hasil dari 1/2 × 2/3 adalah 2/5."),
          bs("MT-BS5", "Bilangan 7 adalah bilangan prima."),

          pgk("MT-PGK1", "<p>Pilihlah semua pecahan yang senilai dengan 1/2!</p>",
            ["2/4", "3/6", "4/10", "5/10", "2/3"]),
          pgk("MT-PGK2", "<p>Bilangan berikut yang merupakan faktor dari 18 adalah ...</p>",
            ["2", "4", "6", "9", "12"]),
          pgk("MT-PGK3", "<p>Pilihlah semua bilangan prima!</p>",
            ["2", "9", "11", "15", "17"]),
          pgk("MT-PGK4", "<p>Pecahan berikut yang nilainya lebih dari 1/2 adalah ...</p>",
            ["2/5", "3/4", "5/8", "1/3", "7/10"]),
          pgk("MT-PGK5", "<p>Bilangan berikut yang merupakan kelipatan persekutuan dari 4 dan 6 adalah ...</p>",
            ["12", "18", "24", "30", "36"]),

          isian("MT-IS1", "1/4 + 2/4 = ...."),
          isian("MT-IS2", "0,5 jika diubah ke bentuk persen menjadi ...."),
          isian("MT-IS3", "KPK dari 3 dan 5 adalah ...."),
          isian("MT-IS4", "FPB dari 16 dan 20 adalah ...."),
          isian("MT-IS5", "Pecahan campuran 2 1/2 jika diubah ke pecahan biasa menjadi ...."),
          isian("MT-IS6", "3/5 × 10 = ...."),
          isian("MT-IS7", "1,25 + 0,75 = ...."),
          isian("MT-IS8", "40% dari 50 adalah ...."),
          isian("MT-IS9", "5/6 − 1/3 = .... (tulis dalam bentuk paling sederhana)"),
          isian("MT-IS10", "Faktorisasi prima dari 12 adalah .... (contoh penulisan: 2 x 2 x 3)"),

          essay("MT-ES1", "Lampu A menyala setiap 6 detik dan lampu B menyala setiap 8 detik. Jika kedua lampu menyala bersamaan pukul 08.00.00, pukul berapa kedua lampu akan menyala bersamaan lagi untuk pertama kalinya? Tuliskan cara pengerjaannya!"),
          essay("MT-ES2", "Ibu memiliki 24 apel dan 36 jeruk yang akan dimasukkan ke dalam kantong dengan jumlah sama banyak pada setiap kantong. Berapa kantong paling banyak yang dibutuhkan dan berapa isi setiap kantong? Tuliskan caranya!"),
          essay("MT-ES3", "Rina memiliki pita sepanjang 3 1/2 meter. Pita tersebut digunakan untuk membuat hiasan sepanjang 1 1/4 meter. Berapa sisa pita Rina? Tuliskan caranya!"),
          essay("MT-ES4", "Urutkan bilangan berikut dari yang terkecil: 0,45 ; 1/2 ; 60% ; 2/5. Tuliskan caranya!"),
          essay("MT-ES5", "Harga sebuah buku Rp20.000,00. Toko memberikan diskon 25%. Berapa harga yang harus dibayar? Tuliskan caranya!")
        ]
      }
    ]
  };
})();
