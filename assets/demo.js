/* =========================================================
   MODE DEMO (buka halaman dengan ?demo)
   Mengisi data FIKTIF ke penyimpanan browser ini saja.
   Tidak menyentuh server / data asli sekolah.
   ========================================================= */
(function () {
  if (!window.DB || DB.mode !== "demo" || !DB.paksaDemo) return;

  const TOKEN_DEMO = "DEMO01";
  const NAMA_A = ["Adinda Putri Lestari", "Ahmad Fauzan Hakim", "Alya Nur Rahmawati", "Arkan Maulana Yusuf", "Aulia Zahra Ramadhani", "Bagas Prasetyo",
    "Bilqis Azzahra", "Cahya Ramadhan", "Daffa Alfarizi", "Dinda Ayu Kirana", "Fadhil Akbar", "Farah Nabila", "Ghaisan Rafif", "Hana Salsabila",
    "Ilham Nur Fikri", "Jihan Khairunnisa", "Kenzo Pratama", "Keysha Amelia", "Luthfi Hakim", "Marwah Az-Zahra", "Naufal Rizky", "Nayla Putri Syifa",
    "Rafa Aditya", "Raisa Anindya", "Satria Wibowo", "Syifa Nurul Huda", "Tsabita Aulia", "Zidan Maulana"];
  const NAMA_B = ["Abiyyu Rasyid", "Aisyah Humaira", "Alif Ramadhan", "Annisa Rahma", "Azka Fadillah", "Bunga Citra", "Danish Alfath", "Elvina Putri",
    "Fathan Mubarak", "Ghina Safira", "Hafidz Kurniawan", "Intan Permata", "Kayla Nurfadila", "Mikail Hasan", "Nadhira Zahra", "Qirani Aulia",
    "Rayhan Saputra", "Salma Khairani", "Shaquille Arya", "Tiara Anggraini", "Umar Faruq", "Zahra Kamila", "Zaki Ramdani", "Zalfa Nadhifa", "Yusuf Akbar", "Wafa Azizah"];
  const ROMBEL = [
    { kelas: "5 Contoh A", tingkat: "5", nama: NAMA_A },
    { kelas: "5 Contoh B", tingkat: "5", nama: NAMA_B }
  ];

  const alasanBagus = ["Karena sesuai dengan materi yang sudah dipelajari, {k}", "Menurut saya {k}", "Sebab {k}"];
  const alasanSedang = ["Karena jawabannya paling masuk akal menurut saya.", "Sebab itu yang dijelaskan bu guru di kelas.", "Karena saya pernah membacanya di buku."];
  const alasanLemah = ["karena itu jawabannya", "tidak tahu", "pokoknya itu", "karena benar"];
  const essayBagus = ["{r}", "Menurut saya, {r}"];
  const essaySedang = ["Jawabannya karena hal itu penting dan harus dilakukan setiap hari agar baik.", "Caranya dihitung dulu lalu dibandingkan hasilnya.", "Contohnya saling membantu dan bekerja sama."];

  let seed = 7;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function pilih(a) { return a[Math.floor(rnd() * a.length)]; }
  function ringkas(s) { s = String(s || "").replace(/<[^>]+>/g, ""); s = s.charAt(0).toLowerCase() + s.slice(1); return s.length > 140 ? s.slice(0, 137) + "..." : s; }
  function lsSet(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

  // Daftar siswa & token — dipakai halaman siswa maupun guru
  function isiDasar(paksa) {
    if (paksa || !localStorage.getItem("pas_siswa_demo")) lsSet("pas_siswa_demo", ROMBEL);
    if (paksa || !localStorage.getItem("pas_token_demo")) {
      const t = {}; BANK_SOAL.mapel.forEach(m => t[m.id] = { token: TOKEN_DEMO, aktif: true, diubah_at: Date.now() });
      lsSet("pas_token_demo", t);
    }
  }

  // Jawaban fiktif (butuh kunci, jadi hanya di halaman guru)
  function buatJawaban(m, kemampuan, sampai) {
    const H = "ABCDE", jw = {};
    m.soal.forEach((s, i) => {
      if (sampai != null && i >= sampai) return;
      const K = (window.KUNCI || {})[s.id] || {};
      const pandai = rnd() < kemampuan;
      if (s.tipe === "pg" || s.tipe === "bs") {
        const ki = s.tipe === "pg" ? H.indexOf(K.k) : (K.k === "B" ? 0 : 1);
        const n = s.tipe === "pg" ? s.opsi.length : 2;
        const p = pandai ? ki : (ki + 1 + Math.floor(rnd() * (n - 1))) % n;
        const r = rnd();
        const a = pandai && r < 0.6 ? pilih(alasanBagus).replace("{k}", ringkas(K.alasan)) : r < 0.85 ? pilih(alasanSedang) : pilih(alasanLemah) + " ya bu guru";
        jw[s.id] = { p, a };
      } else if (s.tipe === "pgk") {
        const kunci = K.k.split("").map(h => H.indexOf(h));
        let p = pandai ? kunci.slice() : kunci.slice(0, Math.max(1, kunci.length - 1));
        if (!pandai && rnd() < 0.6) { const salah = [0, 1, 2, 3, 4].find(x => !kunci.includes(x)); if (salah != null) p.push(salah); }
        jw[s.id] = { p: p.sort() };
      } else if (s.tipe === "isian") {
        const t = pandai ? K.k[0] : (rnd() < 0.3 ? K.k[0] + "an" : pilih(["tidak tahu", "lupa", "-", "cahaya matahari", "12"]));
        jw[s.id] = { t };
      } else if (s.tipe === "essay") {
        if (rnd() < 0.08) return;
        jw[s.id] = { t: pandai ? pilih(essayBagus).replace("{r}", ringkas(K.rubrik)) : pilih(essaySedang) };
      }
    });
    return jw;
  }
  function nilaiManualAcak(m, jw, porsi) {
    const nm = {};
    m.soal.forEach(s => {
      const j = jw[s.id]; if (!j) return;
      if ((s.tipe === "pg" || s.tipe === "bs") && j.a && rnd() < porsi) {
        nm[s.id + "|alasan"] = j.a.startsWith("Karena sesuai") || j.a.startsWith("Menurut") || j.a.startsWith("Sebab ") ? 1 : (alasanSedang.includes(j.a) && rnd() < 0.4 ? 1 : 0);
      }
      if (s.tipe === "essay" && j.t && rnd() < porsi) nm[s.id + "|essay"] = Math.min(PENILAIAN.maksSoal(s), j.t.length > 90 ? 2 + Math.round(rnd()) : Math.round(rnd()));
    });
    return nm;
  }

  function isiSemua() {
    seed = 7;
    isiDasar(true);
    const db = [], draft = {}, masuk = {};
    const now = Date.now();
    BANK_SOAL.mapel.forEach((m, mi) => {
      ROMBEL.forEach((rb, ri) => {
        if (m.tingkat && !m.tingkat.map(String).includes(String(rb.tingkat))) return;
        // Kelas A ujian sedang berlangsung; kelas B sudah selesai semua
        rb.nama.forEach((nama, i) => {
          const absen = i + 1, id = DB.docId(m.id, rb.kelas, absen);
          const kemampuan = 0.45 + rnd() * 0.5;
          let status;
          if (ri === 1) status = i < rb.nama.length - 1 ? "kirim" : "belum";
          else status = i < 13 ? "kirim" : i < 21 ? "kerja" : i < 23 ? "kunci" : i < 25 ? "masuk" : "belum";
          if (m.id === "mtk5" && ri === 0) status = i < rb.nama.length - 2 ? "kirim" : "belum";   // Matematika: kelas A juga sudah selesai

          if (status !== "belum") masuk[id] = { mapel: m.id, kelas: rb.kelas, absen, nama, token: TOKEN_DEMO, waktu: now - (60 + i) * 60000 };
          if (status === "kirim") {
            const jw = buatJawaban(m, kemampuan);
            const mulai = now - (95 + i * 3) * 60000, kirim = mulai + (40 + Math.floor(rnd() * 45)) * 60000;
            const porsi = ri === 1 || m.id === "mtk5" ? 1 : (i < 5 ? 1 : i < 9 ? 0.5 : 0);   // sebagian sudah dinilai guru
            const pel = rnd() < 0.15 ? 1 + Math.floor(rnd() * 2) : 0;
            db.push({ id, mapel: m.id, kelas: rb.kelas, absen, nama, jawaban: jw, nilai_manual: nilaiManualAcak(m, jw, porsi),
              status: "belum", mulai_at: new Date(mulai).toISOString(), dikirim_at: new Date(kirim).toISOString(), pelanggaran: pel });
          } else if (status === "kerja" || status === "kunci") {
            const sampai = 3 + Math.floor(rnd() * 24);
            const jw = buatJawaban(m, kemampuan, sampai);
            const urutan = []; window.URUTAN_TIPE.forEach(t => m.soal.filter(s => s.tipe === t).forEach(s => urutan.push(s.id)));
            const lama = status === "kerja" && i === 19 ? 9 : Math.floor(rnd() * 3);
            draft[id] = { mapel: m.id, kelas: rb.kelas, absen, nama, mulai: now - (25 + Math.floor(rnd() * 40)) * 60000,
              jawaban: jw, ragu: {}, idx: Math.min(sampai, urutan.length - 1), urutan, terjawab: Object.keys(jw).length, total: urutan.length,
              diperbarui_at: now - lama * 60000, pelanggaran: status === "kunci" ? 3 : (rnd() < 0.3 ? 1 : 0), terkunci: status === "kunci", kunciPada: 0 };
          }
        });
      });
    });
    lsSet("pas_db_demo", db); lsSet("pas_draft_demo", draft); lsSet("pas_masuk_demo", masuk);
  }

  window.DEMO = { TOKEN: TOKEN_DEMO, isiDasar, isiSemua, adaJawaban: () => !!localStorage.getItem("pas_db_demo") };
  isiDasar(false);
  const VERSI = "mapel-56";   // naikkan bila aturan skor berubah agar data contoh dibuat ulang
  if (window.KUNCI && (!localStorage.getItem("pas_db_demo") || localStorage.getItem("pas_demo_versi") !== VERSI)) {
    isiSemua(); localStorage.setItem("pas_demo_versi", VERSI);
  }
})();
