/* =========================================================
   KONFIGURASI PORTAL PAS
   Ubah nilai di file ini saja, tidak perlu menyentuh kode lain.
   ========================================================= */
window.CONFIG = {
  // Identitas
  NAMA_SEKOLAH: "SDS PLUS 2 ALMUHAJIRIN",
  JUDUL_UJIAN: "Penilaian Akhir Semester Ganjil",
  TAHUN_AJARAN: "2026/2027",

  // Supabase — salin dari Supabase Dashboard > Project Settings > API (Project URL dan anon/publishable key).
  // Kunci "anon" memang untuk dipasang di halaman web; keamanan dijaga aturan di supabase/schema.sql.
  // Biarkan url kosong untuk MODE DEMO (data tersimpan di browser ini saja).
  SUPABASE: {
    url: "https://bzmitgxslpbukhulbpfu.supabase.co",
    anonKey: "sb_publishable_hnoF1dfG-jPoL-C24TW2VA_6APCgiTA"
  },

  // PIN guru — HANYA dipakai di mode demo. Di mode online, guru masuk dengan email & password
  // yang dibuat di Supabase > Authentication > Users dan didaftarkan di tabel pas_guru.
  PIN_GURU: "123456",

  // Token ujian diatur guru di guru.html > tab "Token ujian" (tidak disimpan di file ini).

  // Alasan pada soal PG & Benar/Salah wajib diisi, minimal sekian huruf
  ALASAN_MIN_KARAKTER: 10,

  // Untuk file Excel
  NAMA_KOTA: "Purwakarta",      // tempat pada kolom tanda tangan
  BATAS_TUNTAS: 0,              // nilai di bawah angka ini ditandai merah di Excel. 0 = tidak ditandai

  // Jawaban selalu tersimpan seketika di perangkat siswa. Cadangan ke server dikirim tiap sekian detik
  // (dan saat siswa keluar halaman / mulai / kirim). Makin besar makin ringan beban server.
  SIMPAN_SERVER_DETIK: 180,

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
