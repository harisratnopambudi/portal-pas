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

  /* Soal DUMMY. Isi tiap paket akan diganti soal asli per kelas.
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

  window.BANK_SOAL = {
    mapel: [
      { id: "bind5", tingkat: ["5"], nama: "Bahasa Indonesia Kelas 5", singkat: "B. Indonesia", ikon: "book", durasi: 90, soal: soalBI("B5") },
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
