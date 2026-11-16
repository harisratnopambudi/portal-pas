/* Lapisan data: Firebase (Firestore + Auth) bila dikonfigurasi, selain itu localStorage (mode demo). */
(function () {
  const C = window.CONFIG;
  const F = C.FIREBASE || {};
  const pakaiFirebase = !!(F.apiKey && F.projectId && window.firebase);
  let fs = null, auth = null;
  if (pakaiFirebase) {
    firebase.initializeApp(F);
    fs = firebase.firestore();
    // Cache offline: tulisan tetap tersimpan di perangkat saat internet putus, lalu tersinkron otomatis.
    try { fs.enablePersistence({ synchronizeTabs: true }).catch(() => {}); } catch (e) {}
    if (firebase.auth) auth = firebase.auth();
  }
  const KOL = C.KOLEKSI || "pas_jawaban";
  const LKEY = "pas_db_demo";
  const KOL_SISWA = C.KOLEKSI_SISWA || "pas_siswa";
  const LKEY_SISWA = "pas_siswa_demo";
  const KOL_DRAFT = C.KOLEKSI_DRAFT || "pas_draft";
  const LKEY_DRAFT = "pas_draft_demo";
  function draftLokal() { try { return JSON.parse(localStorage.getItem(LKEY_DRAFT) || "{}"); } catch (e) { return {}; } }
  function draftLokalSet(o) { localStorage.setItem(LKEY_DRAFT, JSON.stringify(o)); }
  function batasWaktu(p, ms) { return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("TIMEOUT")), ms))]); }

  function lokalAmbil() { try { return JSON.parse(localStorage.getItem(LKEY) || "[]"); } catch (e) { return []; } }
  function lokalSimpan(arr) { localStorage.setItem(LKEY, JSON.stringify(arr)); }
  function docId(mapel, kelas, absen) { return (mapel + "_" + kelas + "_" + absen).replace(/[^\w-]/g, "-"); }

  window.DB = {
    mode: pakaiFirebase ? "firebase" : "demo",

    /* ---------- siswa ---------- */
    async cari(mapel, kelas, absen) {
      if (fs) {
        const snap = await fs.collection(KOL).doc(docId(mapel, kelas, absen)).get();
        return snap.exists ? { id: snap.id, nama: snap.data().nama } : null;
      }
      return lokalAmbil().find(r => r.mapel === mapel && r.kelas === kelas && r.absen === absen) || null;
    },

    async kirim(rec) {
      const row = Object.assign({ nilai_manual: {}, status: "belum", dikirim_at: new Date().toISOString() }, rec);
      const id = docId(row.mapel, row.kelas, row.absen);
      if (fs) {
        const ref = fs.collection(KOL).doc(id);
        const ada = await batasWaktu(ref.get({ source: "server" }), 15000);
        if (ada.exists) throw new Error("SUDAH_ADA");
        try { await batasWaktu(ref.set(row), 20000); }
        catch (e) { if (e && e.code === "permission-denied") throw new Error("SUDAH_ADA"); throw e; }
        fs.collection(KOL_DRAFT).doc(id).delete().catch(() => {});
        return true;
      }
      const arr = lokalAmbil();
      if (arr.some(r => r.id === id)) throw new Error("SUDAH_ADA");
      row.id = id; arr.push(row); lokalSimpan(arr);
      const o = draftLokal(); delete o[id]; draftLokalSet(o);
      return true;
    },

    /* ---------- guru ---------- */
    async daftar(mapel) {
      let rows;
      if (fs) {
        const snap = await fs.collection(KOL).where("mapel", "==", mapel).get();
        rows = snap.docs.map(d => Object.assign({ id: d.id }, d.data()));
      } else rows = lokalAmbil().filter(r => r.mapel === mapel);
      return rows.sort((a, b) => String(a.kelas).localeCompare(String(b.kelas)) || a.absen - b.absen);
    },

    async perbarui(id, patch) {
      if (fs) { await fs.collection(KOL).doc(id).update(patch); return true; }
      const arr = lokalAmbil();
      const i = arr.findIndex(r => r.id === id);
      if (i >= 0) { arr[i] = Object.assign(arr[i], patch); lokalSimpan(arr); }
      return true;
    },

    async hapus(id) {
      if (fs) {
        const b = fs.batch();
        b.delete(fs.collection(KOL).doc(id)); b.delete(fs.collection(KOL_DRAFT).doc(id));
        await b.commit(); return true;
      }
      lokalSimpan(lokalAmbil().filter(r => r.id !== id));
      const o = draftLokal(); delete o[id]; draftLokalSet(o);
      return true;
    },

    docId,

    /* ---------- status & draft (simpan per soal) ---------- */
    async status(mapel, kelas, absen) {          // { kirim: bool, draft: obj|null }
      const id = docId(mapel, kelas, absen);
      if (fs) {
        const [j, d] = await batasWaktu(Promise.all([
          fs.collection(KOL).doc(id).get({ source: "server" }),
          fs.collection(KOL_DRAFT).doc(id).get({ source: "server" })
        ]), 12000);
        return { kirim: j.exists, draft: d.exists ? d.data() : null };
      }
      return { kirim: lokalAmbil().some(r => r.id === id), draft: draftLokal()[id] || null };
    },
    // Tidak di-await oleh pemanggil: saat offline, Firestore mengantre lalu mengirim saat online.
    simpanDraft(d) {
      const id = docId(d.mapel, d.kelas, d.absen);
      d = Object.assign({}, d, { diperbarui_at: Date.now() });
      if (fs) return fs.collection(KOL_DRAFT).doc(id).set(d);
      const o = draftLokal(); o[id] = d; draftLokalSet(o);
      return Promise.resolve();
    },
    async hapusDraft(mapel, kelas, absen) {
      const id = docId(mapel, kelas, absen);
      if (fs) { try { await fs.collection(KOL_DRAFT).doc(id).delete(); } catch (e) {} return; }
      const o = draftLokal(); delete o[id]; draftLokalSet(o);
    },
    async daftarDraft(mapel) {
      if (fs) {
        const snap = await fs.collection(KOL_DRAFT).where("mapel", "==", mapel).get();
        return snap.docs.map(d => Object.assign({ id: d.id }, d.data()));
      }
      return Object.keys(draftLokal()).map(id => Object.assign({ id }, draftLokal()[id])).filter(d => d.mapel === mapel);
    },
    // Guru: buka kembali jawaban terkirim agar siswa melanjutkan (jawaban lama & sisa waktu dipertahankan)
    async bukaKembali(rec, draft) {
      if (fs) {
        const b = fs.batch();
        b.delete(fs.collection(KOL).doc(rec.id));
        b.set(fs.collection(KOL_DRAFT).doc(rec.id), draft);
        await b.commit();
        return true;
      }
      lokalSimpan(lokalAmbil().filter(r => r.id !== rec.id));
      const o = draftLokal(); o[rec.id] = draft; draftLokalSet(o);
      return true;
    },

    /* ---------- daftar siswa (per rombel) ---------- */
    async daftarSiswa() {
      let rows;
      if (fs) {
        const snap = await fs.collection(KOL_SISWA).get();
        rows = snap.docs.map(d => d.data());
      } else {
        try { rows = JSON.parse(localStorage.getItem(LKEY_SISWA) || "[]"); } catch (e) { rows = []; }
      }
      return rows.sort((a, b) => String(a.kelas).localeCompare(String(b.kelas), "id", { numeric: true }));
    },
    async simpanSiswa(rombel) {           // rombel: [{kelas, tingkat, nama:[...]}] — mengganti seluruh data
      if (fs) {
        const lama = await fs.collection(KOL_SISWA).get();
        const batch = fs.batch();
        lama.docs.forEach(d => batch.delete(d.ref));
        rombel.forEach(r => batch.set(fs.collection(KOL_SISWA).doc(r.kelas.replace(/[^\w-]/g, "-")), r));
        await batch.commit();
        return true;
      }
      localStorage.setItem(LKEY_SISWA, JSON.stringify(rombel));
      return true;
    },

    /* ---------- login guru ---------- */
    async masukGuru(email, sandi) {
      if (auth) { await auth.signInWithEmailAndPassword(email, sandi); return true; }
      if (sandi === String(C.PIN_GURU)) { sessionStorage.setItem("pas_guru", "1"); return true; }
      throw new Error("PIN salah.");
    },
    async keluarGuru() {
      if (auth) await auth.signOut();
      sessionStorage.removeItem("pas_guru");
    },
    sudahMasuk() {
      if (auth) return new Promise(res => { const off = auth.onAuthStateChanged(u => { off(); res(!!u); }); });
      return Promise.resolve(sessionStorage.getItem("pas_guru") === "1");
    }
  };
})();
