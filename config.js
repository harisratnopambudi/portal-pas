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

  // Supabase — kosongkan keduanya untuk MODE DEMO (data tersimpan di browser ini saja)
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",
  TABEL: "pas_jawaban",

  // PIN masuk portal guru
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
