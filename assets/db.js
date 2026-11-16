/* Lapisan data: Firebase (Firestore + Auth) bila dikonfigurasi, selain itu localStorage (mode demo). */
(function () {
  const C = window.CONFIG;
  const F = C.FIREBASE || {};
  const pakaiFirebase = !!(F.apiKey && F.projectId && window.firebase);
  let fs = null, auth = null;
  if (pakaiFirebase) {
    firebase.initializeApp(F);
    fs = firebase.firestore();
    if (firebase.auth) auth = firebase.auth();
  }
  const KOL = C.KOLEKSI || "pas_jawaban";
  const LKEY = "pas_db_demo";

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
        const ada = await ref.get();
        if (ada.exists) throw new Error("SUDAH_ADA");
        try { await ref.set(row); }
        catch (e) { if (e && e.code === "permission-denied") throw new Error("SUDAH_ADA"); throw e; }
        return true;
      }
      const arr = lokalAmbil();
      if (arr.some(r => r.id === id)) throw new Error("SUDAH_ADA");
      row.id = id; arr.push(row); lokalSimpan(arr);
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
      if (fs) { await fs.collection(KOL).doc(id).delete(); return true; }
      lokalSimpan(lokalAmbil().filter(r => r.id !== id));
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
