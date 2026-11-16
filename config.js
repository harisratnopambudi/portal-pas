/* =========================================================
   KONFIGURASI PORTAL PAS
   Ubah nilai di file ini saja, tidak perlu menyentuh kode lain.
   ========================================================= */
window.CONFIG = {
  // Identitas
  NAMA_SEKOLAH: "SDS PLUS 2 AL-MUHAJIRIN",
  JUDUL_UJIAN: "Penilaian Akhir Semester 1",
  TAHUN_AJARAN: "2026/2027",
  KELAS: ["5A", "5B", "5C"],

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

  // PIN guru — HANYA dipakai di mode demo. Di mode Firebase, guru masuk dengan
  // email & password yang dibuat di Firebase Console > Authentication.
  PIN_GURU: "123456",

  // Token per mapel (kosongkan "" bila tidak memakai token). Guru membacakan token saat ujian dimulai.
  TOKEN: {
    bipp: "",
    ipas: "",
    paibp: "",
    mtk: ""
  },

  // Acak urutan soal di dalam tiap bagian (true/false)
  ACAK_URUTAN_SOAL: false,

  // Skor per tipe soal
  SKOR: {
    pg:    { jawaban: 1, alasanMaks: 2 },   // Pilihan Ganda + Alasan
    bs:    { jawaban: 1, alasanMaks: 2 },   // Benar/Salah + Alasan
    pgk:   { maks: 2, mode: "parsial" },     // PG Kompleks: "parsial" atau "mutlak"
    isian: { maks: 1 },
    essay: { maks: 4 }
  },

  // Rubrik singkat yang tampil di tombol skor alasan
  RUBRIK_ALASAN: {
    2: "Alasan tepat dan lengkap",
    1: "Alasan sebagian benar / kurang lengkap",
    0: "Alasan salah / tidak relevan / kosong"
  },

  RUBRIK_ESSAY: {
    4: "Jawaban lengkap, tepat, runtut",
    3: "Sebagian besar tepat, ada kekurangan kecil",
    2: "Separuh tepat",
    1: "Sedikit yang tepat",
    0: "Salah / kosong"
  }
};
