/* =========================================================
   KONFIGURASI PORTAL PAS
   Ubah nilai di file ini saja, tidak perlu menyentuh kode lain.
   ========================================================= */
window.CONFIG = {
  // Identitas
  NAMA_SEKOLAH: "SDS PLUS 2 ALMUHAJIRIN",
  JUDUL_UJIAN: "Penilaian Akhir Semester Ganjil",
  TAHUN_AJARAN: "2026/2027",

  // Firebase — salin dari Firebase Console > Project settings > Your apps (Web app).
  // Biarkan apiKey kosong untuk MODE DEMO (data tersimpan di browser ini saja).
  FIREBASE: {
    apiKey: "AIzaSyAXwFSN6synzrgOFrUtVnY7u9HTqEl6C50",
    authDomain: "portal-pas-c0016.firebaseapp.com",
    projectId: "portal-pas-c0016",
    storageBucket: "portal-pas-c0016.firebasestorage.app",
    messagingSenderId: "129169412765",
    appId: "1:129169412765:web:4acce3a073a40aca11fa74"
  },
  KOLEKSI: "pas_jawaban",
  KOLEKSI_SISWA: "pas_siswa",   // daftar siswa per rombel (diimport guru dari file Dapodik)

  // PIN guru — HANYA dipakai di mode demo. Di mode Firebase, guru masuk dengan
  // email & password yang dibuat di Firebase Console > Authentication.
  PIN_GURU: "123456",

  // Token ujian diatur guru di guru.html > tab "Token ujian" (tidak disimpan di file ini).

  // Alasan pada soal PG & Benar/Salah wajib diisi, minimal sekian huruf
  ALASAN_MIN_KARAKTER: 10,

  // Untuk file Excel
  NAMA_KOTA: "Purwakarta",      // tempat pada kolom tanda tangan
  BATAS_TUNTAS: 0,              // nilai di bawah angka ini ditandai merah di Excel. 0 = tidak ditandai

  // Jawaban selalu tersimpan seketika di perangkat siswa. Cadangan ke server dikirim tiap sekian detik
  // (dan saat siswa keluar halaman / mulai / kirim). Makin besar makin hemat kuota Firebase gratis.
  SIMPAN_SERVER_DETIK: 120,

  // Pengamanan ujian (halaman siswa)
  ANTI_CURANG: {
    blokirSalinTempel: true,   // blok copy, paste, cut, klik kanan, seleksi teks soal, shortcut keyboard
    wajibLayarPenuh: true,     // ujian berjalan dalam mode layar penuh (fullscreen)
    maksPelanggaran: 3         // keluar tab/jendela/layar penuh sebanyak ini -> ujian dikunci, dibuka pengawas dengan token. 0 = hanya dicatat
  },

  // Acak urutan soal di dalam tiap bagian (true/false)
  ACAK_URUTAN_SOAL: false,

  // Skor per tipe soal
  SKOR: {
    pg:    { jawaban: 1, alasanMaks: 1 },   // Pilihan Ganda: jawaban benar 1 + alasan benar 1
    bs:    { jawaban: 1, alasanMaks: 1 },   // Benar/Salah: jawaban benar 1 + alasan benar 1
    pgk:   { maks: 1, mode: "parsial" },     // PG Kompleks maks 1. "parsial" (nilai sebagian) atau "mutlak" (harus tepat semua)
    isian: { maks: 1 },
    essay: { maks: 3 }
  },
  // true  = alasan hanya dinilai bila pilihan jawabannya benar (pilihan salah -> alasan otomatis 0)
  // false = alasan dinilai guru apa pun pilihannya
  ALASAN_HANYA_JIKA_JAWABAN_BENAR: false,

  // Rubrik singkat yang tampil di tombol skor
  RUBRIK_ALASAN: {
    1: "Alasan benar dan sesuai",
    0: "Alasan salah / tidak relevan / kosong"
  },

  RUBRIK_ESSAY: {
    3: "Jawaban lengkap dan tepat",
    2: "Sebagian besar tepat",
    1: "Sedikit yang tepat",
    0: "Salah / kosong"
  }
};
