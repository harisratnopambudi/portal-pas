/* Lapisan data: Firebase (Firestore + Auth) bila dikonfigurasi, selain itu localStorage (mode demo). */
(function () {
  const C = window.CONFIG;
  const F = C.FIREBASE || {};
  // ?demo di alamat halaman = mode demo dengan data fiktif (tidak menyentuh Firebase)
  const paksaDemo = /(^|[?&#])demo\b/.test((location.search || "") + "&" + (location.hash || "").replace("#", ""));
  const pakaiFirebase = !paksaDemo && !!(F.apiKey && F.projectId && window.firebase);
  let fs = null, auth = null;
  if (pakaiFirebase) {
    firebase.initializeApp(F);
    fs = firebase.firestore();
    // Catatan: cache multi-tab Firestore (enablePersistence) sengaja TIDAK dipakai karena membuat penulisan
    // menggantung bila halaman siswa & guru terbuka bersamaan. Simpanan offline ditangani sendiri (localStorage).
    if (firebase.auth) {
      auth = firebase.auth();
      // Login guru disimpan permanen di browser ini sampai menekan Keluar (tidak hilang saat refresh/ditutup)
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
    }
  }
  const KOL = C.KOLEKSI || "pas_jawaban";
  const LKEY = "pas_db_demo";
  const KOL_SISWA = C.KOLEKSI_SISWA || "pas_siswa";
  const LKEY_SISWA = "pas_siswa_demo";
  const KOL_DRAFT = C.KOLEKSI_DRAFT || "pas_draft";
  const LKEY_DRAFT = "pas_draft_demo";
  const KOL_TOKEN = "pas_token", KOL_MASUK = "pas_masuk";
  const LKEY_TOKEN = "pas_token_demo", LKEY_MASUK = "pas_masuk_demo";
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } }
  function lsSet(k, o) { localStorage.setItem(k, JSON.stringify(o)); }
  function draftLokal() { try { return JSON.parse(localStorage.getItem(LKEY_DRAFT) || "{}"); } catch (e) { return {}; } }
  function draftLokalSet(o) { localStorage.setItem(LKEY_DRAFT, JSON.stringify(o)); }
  function batasWaktu(p, ms) { return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("TIMEOUT")), ms))]); }

  function lokalAmbil() { try { return JSON.parse(localStorage.getItem(LKEY) || "[]"); } catch (e) { return []; } }
  function lokalSimpan(arr) { localStorage.setItem(LKEY, JSON.stringify(arr)); }
  function docId(mapel, kelas, absen) { return (mapel + "_" + kelas + "_" + absen).replace(/[^\w-]/g, "-"); }

  window.DB = {
    mode: pakaiFirebase ? "firebase" : "demo",
    paksaDemo,

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
    async daftar(mapel, kelas) {
      let rows;
      if (fs) {
        let q = fs.collection(KOL).where("mapel", "==", mapel);
        if (kelas) q = q.where("kelas", "==", kelas);
        const snap = await q.get();
        rows = snap.docs.map(d => Object.assign({ id: d.id }, d.data()));
      } else rows = lokalAmbil().filter(r => r.mapel === mapel && (!kelas || r.kelas === kelas));
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
        b.delete(fs.collection(KOL).doc(id)); b.delete(fs.collection(KOL_DRAFT).doc(id)); b.delete(fs.collection(KOL_MASUK).doc(id));
        await b.commit(); return true;
      }
      lokalSimpan(lokalAmbil().filter(r => r.id !== id));
      const o = draftLokal(); delete o[id]; draftLokalSet(o);
      const mm = lsGet(LKEY_MASUK); delete mm[id]; lsSet(LKEY_MASUK, mm);
      return true;
    },

    docId,

    /* ---------- token ujian ---------- */
    // Siswa "masuk" dengan token. Token diperiksa oleh Firestore Rules (siswa tidak bisa membaca token).
    async masuk(mapel, kelas, absen, nama, token) {
      const id = docId(mapel, kelas, absen);
      token = String(token || "").trim().toUpperCase();
      if (fs) {
        try {
          await batasWaktu(fs.collection(KOL_MASUK).doc(id).set({ mapel, kelas, absen, nama, token, waktu: Date.now() }), 15000);
        } catch (e) {
          if (e && e.code === "permission-denied") throw new Error("TOKEN_SALAH");
          throw e;
        }
        return true;
      }
      const t = lsGet(LKEY_TOKEN)[mapel];
      if (!t || !t.aktif || t.token !== token) throw new Error("TOKEN_SALAH");
      const o = lsGet(LKEY_MASUK); o[id] = { mapel, kelas, absen, nama, token, waktu: Date.now() }; lsSet(LKEY_MASUK, o);
      return true;
    },
    async daftarToken() {                       // guru
      if (fs) {
        const snap = await fs.collection(KOL_TOKEN).get();
        const o = {}; snap.docs.forEach(d => o[d.id] = d.data()); return o;
      }
      return lsGet(LKEY_TOKEN);
    },
    async setToken(mapel, data) {               // guru: { token, aktif }
      data = Object.assign({ diubah_at: Date.now() }, data);
      if (fs) { await fs.collection(KOL_TOKEN).doc(mapel).set(data, { merge: true }); return true; }
      const o = lsGet(LKEY_TOKEN); o[mapel] = Object.assign(o[mapel] || {}, data); lsSet(LKEY_TOKEN, o);
      return true;
    },

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
      if (!lsGet(LKEY_MASUK)[id]) return Promise.reject({ code: "permission-denied" });
      const o = draftLokal(); o[id] = d; draftLokalSet(o);
      return Promise.resolve();
    },
    async hapusDraft(mapel, kelas, absen) {
      const id = docId(mapel, kelas, absen);
      if (fs) { try { await fs.collection(KOL_DRAFT).doc(id).delete(); } catch (e) {} return; }
      const o = draftLokal(); delete o[id]; draftLokalSet(o);
    },
    async daftarMasuk(mapel, kelas) {         // guru: siswa yang sudah memasukkan token
      if (fs) {
        let q = fs.collection(KOL_MASUK).where("mapel", "==", mapel);
        if (kelas) q = q.where("kelas", "==", kelas);
        const snap = await q.get();
        return snap.docs.map(d => Object.assign({ id: d.id }, d.data()));
      }
      const o = lsGet(LKEY_MASUK);
      return Object.keys(o).map(id => Object.assign({ id }, o[id])).filter(d => d.mapel === mapel && (!kelas || d.kelas === kelas));
    },
    async daftarDraft(mapel, kelas) {
      if (fs) {
        let q = fs.collection(KOL_DRAFT).where("mapel", "==", mapel);
        if (kelas) q = q.where("kelas", "==", kelas);
        const snap = await q.get();
        return snap.docs.map(d => Object.assign({ id: d.id }, d.data()));
      }
      return Object.keys(draftLokal()).map(id => Object.assign({ id }, draftLokal()[id])).filter(d => d.mapel === mapel && (!kelas || d.kelas === kelas));
    },
    // Guru: buka kembali jawaban terkirim agar siswa melanjutkan (jawaban lama & sisa waktu dipertahankan)
    async bukaKembali(rec, draft) {
      if (fs) {
        const b = fs.batch();
        b.delete(fs.collection(KOL).doc(rec.id));
        b.set(fs.collection(KOL_DRAFT).doc(rec.id), draft);
        b.set(fs.collection(KOL_MASUK).doc(rec.id), { mapel: rec.mapel, kelas: rec.kelas, absen: rec.absen, nama: rec.nama, token: "(dibuka guru)", waktu: Date.now() });
        await b.commit();
        return true;
      }
      lokalSimpan(lokalAmbil().filter(r => r.id !== rec.id));
      const o = draftLokal(); o[rec.id] = draft; draftLokalSet(o);
      const mm = lsGet(LKEY_MASUK); mm[rec.id] = { mapel: rec.mapel, kelas: rec.kelas, absen: rec.absen, nama: rec.nama, token: "(dibuka guru)" }; lsSet(LKEY_MASUK, mm);
      return true;
    },

    /* ---------- daftar siswa (per rombel) ---------- */
    async daftarSiswa() {
      let rows;
      if (fs) {
        // Semua rombel disimpan dalam satu dokumen "_semua" (1 baca per buka halaman)
        const satu = await fs.collection(KOL_SISWA).doc("_semua").get();
        if (satu.exists) rows = satu.data().rombel || [];
        else { const snap = await fs.collection(KOL_SISWA).get(); rows = snap.docs.map(d => d.data()).filter(r => r.kelas); }
      } else {
        try { rows = JSON.parse(localStorage.getItem(LKEY_SISWA) || "[]"); } catch (e) { rows = []; }
      }
      return rows.sort((a, b) => String(a.kelas).localeCompare(String(b.kelas), "id", { numeric: true }));
    },
    async simpanSiswa(rombel) {           // rombel: [{kelas, tingkat, nama:[...]}] — mengganti seluruh data
      if (fs) {
        const lama = await fs.collection(KOL_SISWA).get();
        const batch = fs.batch();
        lama.docs.forEach(d => { if (d.id !== "_semua") batch.delete(d.ref); });
        batch.set(fs.collection(KOL_SISWA).doc("_semua"), { rombel, diubah_at: Date.now() });
        await batch.commit();
        return true;
      }
      localStorage.setItem(LKEY_SISWA, JSON.stringify(rombel));
      return true;
    },

    /* ---------- login guru ---------- */
    async masukGuru(email, sandi) {
      if (auth) { await auth.signInWithEmailAndPassword(email, sandi); return true; }
      if (sandi === String(C.PIN_GURU)) { localStorage.setItem("pas_guru", "1"); return true; }
      throw new Error("PIN salah.");
    },
    async keluarGuru() {
      if (auth) await auth.signOut();
      localStorage.removeItem("pas_guru");
    },
    sudahMasuk() {
      if (auth) return new Promise(res => { const off = auth.onAuthStateChanged(u => { off(); res(!!u); }); });
      return Promise.resolve(localStorage.getItem("pas_guru") === "1");
    },
    // Dipanggil bila status login berubah (mis. sesi berakhir di tengah jalan)
    pantauLogin(cb) { if (auth) auth.onAuthStateChanged(u => cb(!!u)); }
  };
})();
