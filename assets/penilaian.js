/* Mesin penskoran — dipakai halaman guru. Membutuhkan CONFIG, BANK_SOAL, KUNCI. */
(function () {
  const S = window.CONFIG.SKOR;
  const HURUF = "ABCDE";

  function norm(s) {
    let t = String(s == null ? "" : s).toLowerCase().trim();
    t = t.replace(/[×*·]/g, "x").replace(/[“”"']/g, "").replace(/\s+/g, "");
    t = t.replace(/^rp\.?/, "").replace(/[,.]-$/, "");            // "Rp9.000,-" -> "9.000"
    t = t.replace(/(\d)\.(?=\d{3}(?!\d))/g, "$1");               // pemisah ribuan: 9.000 -> 9000
    t = t.replace(/(\d),(?=\d{3}(?!\d))/g, "$1");                // gaya Inggris: 9,000 -> 9000
    if (/[a-z]/.test(t)) t = t.replace(/\./g, "");      // titik dibuang hanya bila ada huruf (agar 0.5 aman)
    t = t.replace(/^nabi/, "");
    t = t.replace(/[.,;:]+$/, "");
    return t;
  }

  function mapelById(id) { return window.BANK_SOAL.mapel.find(m => m.id === id); }

  // Aturan skor per paket: CONFIG.SKOR ditimpa oleh mapel.skor (mis. PG tanpa skor alasan)
  let idxSoal = null;
  function mapelSoal(soal) {
    if (!idxSoal) { idxSoal = {}; window.BANK_SOAL.mapel.forEach(m => m.soal.forEach(q => idxSoal[q.id] = m)); }
    return idxSoal[soal.id];
  }
  function skorSoal(soal) {
    const m = soal && mapelSoal(soal);
    if (!m || !m.skor) return S;
    const o = {};
    Object.keys(S).forEach(k => o[k] = Object.assign({}, S[k], m.skor[k] || {}));
    return o;
  }

  function maksItem(tipe, soal) {
    const Sx = skorSoal(soal);
    if (tipe === "pg" || tipe === "bs") return Sx[tipe].jawaban + Sx[tipe].alasanMaks;
    return Sx[tipe].maks;
  }

  // Skor maksimal satu soal: uraian dan PG kompleks boleh punya "maks" sendiri di KUNCI
  function maksSoal(soal) {
    const k = (window.KUNCI || {})[soal.id] || {};
    if ((soal.tipe === "essay" || soal.tipe === "pgk") && k.maks != null) return Number(k.maks);
    return maksItem(soal.tipe, soal);
  }
  // Panduan skor uraian per soal (KUNCI.skor), atau rubrik umum di config
  function rubrikEssay(soal) {
    const k = (window.KUNCI || {})[soal.id] || {};
    return k.skor || window.CONFIG.RUBRIK_ESSAY;
  }

  function kunciIndex(soal) {
    const k = (window.KUNCI[soal.id] || {}).k;
    if (soal.tipe === "bs") return k === "B" ? 0 : k === "S" ? 1 : null;
    if (soal.tipe === "pg") return k ? HURUF.indexOf(k) : null;
    if (soal.tipe === "pgk") return k ? k.split("").map(h => HURUF.indexOf(h)) : [];
    return null;
  }

  function nilaiItem(soal, jwb, nm) {
    jwb = jwb || {};
    nm = nm || {};
    const r = { id: soal.id, tipe: soal.tipe, maks: maksSoal(soal), auto: 0, manual: 0, pending: false, info: {} };
    const S = skorSoal(soal);

    if (soal.tipe === "pg" || soal.tipe === "bs") {
      const ki = kunciIndex(soal);
      const benar = jwb.p != null && jwb.p === ki;
      r.auto = benar ? S[soal.tipe].jawaban : 0;
      r.info.benar = benar;
      r.info.terjawab = jwb.p != null;
      const alasan = (jwb.a || "").trim();
      r.info.alasanKosong = !alasan;
      const key = soal.id + "|alasan";
      r.info.alasanDiabaikan = !!window.CONFIG.ALASAN_HANYA_JIKA_JAWABAN_BENAR && !benar;
      r.info.alasanTanpaSkor = !S[soal.tipe].alasanMaks;      // paket yang skornya hanya dari pilihan
      if (!alasan || r.info.alasanDiabaikan || r.info.alasanTanpaSkor) { r.manual = 0; }
      else if (nm[key] != null) { r.manual = Math.min(Number(nm[key]), S[soal.tipe].alasanMaks); r.info.dinilai = true; }
      else { r.pending = true; }
      r.info.manualKey = key;
      r.info.manualMaks = S[soal.tipe].alasanMaks;
    }

    else if (soal.tipe === "pgk") {
      const kunci = kunciIndex(soal);
      const pilih = Array.isArray(jwb.p) ? jwb.p : [];
      const benar = pilih.filter(i => kunci.includes(i)).length;
      const salah = pilih.filter(i => !kunci.includes(i)).length;
      const Kp = window.KUNCI[soal.id] || {};
      if (Kp.aturan === "tanpa_salah") {
        // Ada pilihan salah = 0; semua kunci = maks; sebagian (tanpa salah) = jumlah benar + 1 (maks - 1)
        const n = kunci.length;
        r.auto = salah > 0 || benar === 0 ? 0 : benar === n ? Number(Kp.maks) : Math.min(Number(Kp.maks) - 1, benar + 1);
      } else if (Kp.maks != null) {
        // Kriteria per soal: lengkap & tanpa pilihan salah = maks; sebagian tepat = 1; selain itu 0
        const sebagian = Kp.sebagian != null ? Number(Kp.sebagian) : 1;
        r.auto = (benar === kunci.length && salah === 0) ? Number(Kp.maks) : (benar - salah >= 1 ? sebagian : 0);
      } else if (S.pgk.mode === "mutlak") {
        r.auto = (benar === kunci.length && salah === 0) ? S.pgk.maks : 0;
      } else {
        r.auto = Math.max(0, (benar - salah) / kunci.length) * S.pgk.maks;
        r.auto = Math.round(r.auto * 100) / 100;
      }
      r.info.benar = benar; r.info.salah = salah; r.info.jmlKunci = kunci.length;
    }

    else if (soal.tipe === "isian") {
      const daftar = ((window.KUNCI[soal.id] || {}).k || []).map(norm);
      const t = norm(jwb.t);
      const cocok = !!t && daftar.includes(t);
      r.info.cocok = cocok;
      r.info.terjawab = !!t;
      const key = soal.id + "|isian";
      r.info.manualKey = key;
      r.info.manualMaks = S.isian.maks;
      if (nm[key] != null) { r.auto = 0; r.manual = Math.min(Number(nm[key]), S.isian.maks); r.info.override = true; }
      else r.auto = cocok ? S.isian.maks : 0;
    }

    else if (soal.tipe === "essay") {
      const t = (jwb.t || "").trim();
      const key = soal.id + "|essay";
      r.info.manualKey = key;
      r.info.manualMaks = r.maks;
      r.info.kosong = !t;
      if (!t) r.manual = 0;
      else if (nm[key] != null) { r.manual = Math.min(Number(nm[key]), r.maks); r.info.dinilai = true; }
      else r.pending = true;
    }
    return r;
  }

  function nilaiRekaman(rec) {
    const m = mapelById(rec.mapel);
    const nm = rec.nilai_manual || {};
    const rincian = m.soal.map(s => nilaiItem(s, (rec.jawaban || {})[s.id], nm));
    const otomatis = rincian.reduce((a, r) => a + r.auto, 0);
    const manual = rincian.reduce((a, r) => a + r.manual, 0);
    const maks = rincian.reduce((a, r) => a + r.maks, 0);
    const pending = rincian.filter(r => r.pending).length;
    const adaManual = Object.keys(nm).length > 0;
    const total = otomatis + manual;
    const perTipe = {};
    window.URUTAN_MAPEL(m).forEach(t => {
      const xs = rincian.filter(r => r.tipe === t);
      perTipe[t] = { skor: xs.reduce((a, r) => a + r.auto + r.manual, 0), maks: xs.reduce((a, r) => a + r.maks, 0) };
    });
    return {
      rincian, perTipe,
      otomatis: bulat(otomatis), manual: bulat(manual), total: bulat(total), maks,
      nilai: maks ? Math.round(total / maks * 100) : 0,
      pending,
      status: pending === 0 ? "selesai" : (adaManual ? "sebagian" : "belum")
    };
  }

  function bulat(x) { return Math.round(x * 100) / 100; }

  window.PENILAIAN = { norm, mapelById, skorSoal, maksItem, maksSoal, rubrikEssay, kunciIndex, nilaiItem, nilaiRekaman, HURUF };
})();
