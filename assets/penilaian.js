/* Mesin penskoran — dipakai halaman guru. Membutuhkan CONFIG, BANK_SOAL, KUNCI. */
(function () {
  const S = window.CONFIG.SKOR;
  const HURUF = "ABCDE";

  function norm(s) {
    let t = String(s == null ? "" : s).toLowerCase().trim();
    t = t.replace(/[×*·]/g, "x").replace(/[“”"']/g, "").replace(/\s+/g, "");
    if (/[a-z]/.test(t)) t = t.replace(/\./g, "");      // titik dibuang hanya bila ada huruf (agar 0.5 aman)
    t = t.replace(/^nabi/, "");
    t = t.replace(/[.,;:]+$/, "");
    return t;
  }

  function mapelById(id) { return window.BANK_SOAL.mapel.find(m => m.id === id); }

  function maksItem(tipe) {
    if (tipe === "pg" || tipe === "bs") return S[tipe].jawaban + S[tipe].alasanMaks;
    return S[tipe].maks;
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
    const r = { id: soal.id, tipe: soal.tipe, maks: maksItem(soal.tipe), auto: 0, manual: 0, pending: false, info: {} };

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
      if (!alasan || r.info.alasanDiabaikan) { r.manual = 0; }
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
      if (S.pgk.mode === "mutlak") {
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
      r.info.manualMaks = S.essay.maks;
      r.info.kosong = !t;
      if (!t) r.manual = 0;
      else if (nm[key] != null) { r.manual = Math.min(Number(nm[key]), S.essay.maks); r.info.dinilai = true; }
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
    window.URUTAN_TIPE.forEach(t => {
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

  window.PENILAIAN = { norm, mapelById, maksItem, kunciIndex, nilaiItem, nilaiRekaman, HURUF };
})();
