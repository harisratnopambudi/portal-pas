/* Lapisan data: Supabase (Postgres + Auth) bila dikonfigurasi, selain itu localStorage (mode demo). */
(function () {
  const C = window.CONFIG;
  const S = C.SUPABASE || {};
  // ?demo di alamat halaman = mode demo dengan data fiktif (tidak menyentuh server)
  const paksaDemo = /(^|[?&#])demo\b/.test((location.search || "") + "&" + (location.hash || "").replace("#", ""));
  const pakaiServer = !paksaDemo && !!(S.url && S.anonKey && window.supabase && window.supabase.createClient);
  // Halaman guru: login tersimpan sampai Keluar. Halaman siswa: tanpa login sama sekali (tidak berebut sesi
  // dengan halaman guru bila dibuka di browser yang sama).
  const halamanGuru = /guru/i.test(location.pathname || "");
  const sb = pakaiServer ? window.supabase.createClient(S.url, S.anonKey, {
    auth: halamanGuru
      ? { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: "pas_guru_sesi" }
      : { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, storageKey: "pas_siswa_anon" }
  }) : null;
  const LKEY = "pas_db_demo";
  const LKEY_SISWA = "pas_siswa_demo";
  const LKEY_DRAFT = "pas_draft_demo";
  const LKEY_TOKEN = "pas_token_demo", LKEY_MASUK = "pas_masuk_demo";
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } }
  function lsSet(k, o) { localStorage.setItem(k, JSON.stringify(o)); }
  function draftLokal() { try { return JSON.parse(localStorage.getItem(LKEY_DRAFT) || "{}"); } catch (e) { return {}; } }
  function draftLokalSet(o) { localStorage.setItem(LKEY_DRAFT, JSON.stringify(o)); }
  function batasWaktu(p, ms) { return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(Object.assign(new Error("TIMEOUT"), { code: "timeout" })), ms))]); }

  function lokalAmbil() { try { return JSON.parse(localStorage.getItem(LKEY) || "[]"); } catch (e) { return []; } }
  function lokalSimpan(arr) { localStorage.setItem(LKEY, JSON.stringify(arr)); }
  function docId(mapel, kelas, absen) { return (mapel + "_" + kelas + "_" + absen).replace(/[^\w-]/g, "-"); }

  /* ---------- pembantu Supabase ---------- */
  // Ubah error Supabase menjadi Error dengan .message (kode aplikasi) dan .code (jenis)
  function salah(e) {
    if (!e) return null;
    const msg = String(e.message || e.error_description || e);
    const kodeApp = ["TOKEN_SALAH", "SUDAH_ADA", "SUDAH_KIRIM", "BELUM_MASUK", "MULAI_BEDA", "TIDAK_ADA", "TERLALU_BESAR"].find(k => msg.includes(k));
    let code = e.code || "";
    if (kodeApp === "BELUM_MASUK" || kodeApp === "SUDAH_KIRIM" || kodeApp === "MULAI_BEDA") code = "permission-denied";
    else if (code === "42501" || code === "PGRST301" || e.status === 401 || e.status === 403 || /JWT|permission|row-level/i.test(msg)) code = "permission-denied";
    else if (!code && /fetch|network|Failed/i.test(msg)) code = "unavailable";
    return Object.assign(new Error(kodeApp || msg), { code: code || "unknown", asli: e });
  }
  async function jalan(p, ms) {
    const r = await batasWaktu(p, ms || 20000);
    if (r && r.error) throw salah(r.error);
    return r ? r.data : null;
  }
  const baris = r => Object.assign({ id: r.id }, r.data || {});

  window.DB = {
    mode: pakaiServer ? "online" : "demo",
    paksaDemo,

    /* ---------- siswa ---------- */
    async kirim(rec) {
      const row = Object.assign({ nilai_manual: {}, status: "belum", dikirim_at: new Date().toISOString() }, rec);
      const id = docId(row.mapel, row.kelas, row.absen);
      if (sb) { await jalan(sb.rpc("pas_kirim", { p_data: row }), 20000); return true; }
      const arr = lokalAmbil();
      if (arr.some(r => r.id === id)) throw new Error("SUDAH_ADA");
      row.id = id; arr.push(row); lokalSimpan(arr);
      const o = draftLokal(); delete o[id]; draftLokalSet(o);
      return true;
    },

    /* ---------- guru ---------- */
    async daftar(mapel, kelas) {
      let rows;
      if (sb) {
        let q = sb.from("pas_jawaban").select("id,data").eq("mapel", mapel);
        if (kelas) q = q.eq("kelas", kelas);
        rows = (await jalan(q.limit(5000))).map(baris);
      } else rows = lokalAmbil().filter(r => r.mapel === mapel && (!kelas || r.kelas === kelas));
      return rows.sort((a, b) => String(a.kelas).localeCompare(String(b.kelas)) || a.absen - b.absen);
    },

    async perbarui(id, patch) {
      if (sb) { await jalan(sb.rpc("pas_patch_jawaban", { p_id: id, p_patch: patch }), 15000); return true; }
      const arr = lokalAmbil();
      const i = arr.findIndex(r => r.id === id);
      if (i >= 0) { arr[i] = Object.assign(arr[i], patch); lokalSimpan(arr); }
      return true;
    },

    async hapus(id) {
      if (sb) {
        await jalan(sb.from("pas_jawaban").delete().eq("id", id));
        await jalan(sb.from("pas_draft").delete().eq("id", id));
        await jalan(sb.from("pas_masuk").delete().eq("id", id));
        return true;
      }
      lokalSimpan(lokalAmbil().filter(r => r.id !== id));
      const o = draftLokal(); delete o[id]; draftLokalSet(o);
      const mm = lsGet(LKEY_MASUK); delete mm[id]; lsSet(LKEY_MASUK, mm);
      return true;
    },

    docId,

    /* ---------- token ujian ---------- */
    // Siswa "masuk" dengan token. Token diperiksa di server (siswa tidak bisa membaca token).
    async masuk(mapel, kelas, absen, nama, token) {
      const id = docId(mapel, kelas, absen);
      token = String(token || "").trim().toUpperCase();
      if (sb) {
        await jalan(sb.rpc("pas_masuk_token", { p_mapel: mapel, p_kelas: kelas, p_absen: absen, p_nama: nama, p_token: token }), 15000);
        return true;
      }
      const t = lsGet(LKEY_TOKEN)[mapel];
      if (!t || !t.aktif || t.token !== token) throw new Error("TOKEN_SALAH");
      const o = lsGet(LKEY_MASUK); o[id] = { mapel, kelas, absen, nama, token, waktu: Date.now() }; lsSet(LKEY_MASUK, o);
      return true;
    },
    async daftarToken() {                       // guru
      if (sb) {
        const rows = await jalan(sb.from("pas_token").select("*"), 12000);
        const o = {}; rows.forEach(r => o[r.mapel] = { token: r.token, aktif: r.aktif, diubah_at: r.diubah_at }); return o;
      }
      return lsGet(LKEY_TOKEN);
    },
    async setToken(mapel, data) {               // guru: { token, aktif }
      data = Object.assign({ diubah_at: Date.now() }, data);
      if (sb) {
        const row = { mapel, diubah_at: data.diubah_at };
        if (data.token != null) row.token = data.token;
        if (data.aktif != null) row.aktif = !!data.aktif;
        await jalan(sb.from("pas_token").upsert(row, { onConflict: "mapel" }), 12000);
        return true;
      }
      const o = lsGet(LKEY_TOKEN); o[mapel] = Object.assign(o[mapel] || {}, data); lsSet(LKEY_TOKEN, o);
      return true;
    },

    /* ---------- status & draft (simpan per soal) ---------- */
    async status(mapel, kelas, absen) {          // { kirim: bool, draft: obj|null }
      const id = docId(mapel, kelas, absen);
      if (sb) {
        const r = await jalan(sb.rpc("pas_status", { p_mapel: mapel, p_kelas: kelas, p_absen: absen }), 12000);
        return { kirim: !!(r && r.kirim), draft: (r && r.draft) || null };
      }
      return { kirim: lokalAmbil().some(r => r.id === id), draft: draftLokal()[id] || null };
    },
    simpanDraft(d) {
      const id = docId(d.mapel, d.kelas, d.absen);
      d = Object.assign({}, d, { diperbarui_at: Date.now() });
      if (sb) return jalan(sb.rpc("pas_simpan_draft", { p_data: d }), 20000);
      if (!lsGet(LKEY_MASUK)[id]) return Promise.reject({ code: "permission-denied" });
      const o = draftLokal(); o[id] = d; draftLokalSet(o);
      return Promise.resolve();
    },
    async hapusDraft(mapel, kelas, absen) {      // draft dihapus server saat kirim; di sini hanya mode demo
      if (sb) return;
      const id = docId(mapel, kelas, absen);
      const o = draftLokal(); delete o[id]; draftLokalSet(o);
    },
    async daftarMasuk(mapel, kelas) {         // guru: siswa yang sudah memasukkan token
      if (sb) {
        let q = sb.from("pas_masuk").select("id,data").eq("mapel", mapel);
        if (kelas) q = q.eq("kelas", kelas);
        return (await jalan(q.limit(5000))).map(baris);
      }
      const o = lsGet(LKEY_MASUK);
      return Object.keys(o).map(id => Object.assign({ id }, o[id])).filter(d => d.mapel === mapel && (!kelas || d.kelas === kelas));
    },
    async daftarDraft(mapel, kelas) {
      if (sb) {
        let q = sb.from("pas_draft").select("id,data").eq("mapel", mapel);
        if (kelas) q = q.eq("kelas", kelas);
        return (await jalan(q.limit(5000))).map(baris);
      }
      return Object.keys(draftLokal()).map(id => Object.assign({ id }, draftLokal()[id])).filter(d => d.mapel === mapel && (!kelas || d.kelas === kelas));
    },
    // Guru: buka kembali jawaban terkirim agar siswa melanjutkan (jawaban lama & sisa waktu dipertahankan)
    async bukaKembali(rec, draft) {
      if (sb) {
        const kunci = { mapel: rec.mapel, kelas: rec.kelas, absen: rec.absen };
        await jalan(sb.from("pas_masuk").upsert(Object.assign({ id: rec.id, data: Object.assign({}, kunci, { nama: rec.nama, token: "(dibuka guru)", waktu: Date.now() }) }, kunci)));
        await jalan(sb.from("pas_draft").upsert(Object.assign({ id: rec.id, data: draft }, kunci)));
        await jalan(sb.from("pas_jawaban").delete().eq("id", rec.id));
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
      if (sb) {
        const r = await jalan(sb.from("pas_siswa").select("data").eq("id", "_semua").maybeSingle(), 15000);
        rows = (r && r.data && r.data.rombel) || [];
      } else {
        try { rows = JSON.parse(localStorage.getItem(LKEY_SISWA) || "[]"); } catch (e) { rows = []; }
      }
      return rows.sort((a, b) => String(a.kelas).localeCompare(String(b.kelas), "id", { numeric: true }));
    },
    async simpanSiswa(rombel) {           // rombel: [{kelas, tingkat, nama:[...]}] — mengganti seluruh data
      if (sb) {
        await jalan(sb.from("pas_siswa").upsert({ id: "_semua", data: { rombel, diubah_at: Date.now() } }), 20000);
        return true;
      }
      localStorage.setItem(LKEY_SISWA, JSON.stringify(rombel));
      return true;
    },

    /* ---------- login guru ---------- */
    async masukGuru(email, sandi) {
      if (sb) {
        const { data, error } = await batasWaktu(sb.auth.signInWithPassword({ email, password: sandi }), 15000);
        if (error) throw Object.assign(new Error(error.message), { code: /fetch|network/i.test(error.message) ? "network" : "auth/invalid" });
        // pastikan akun ini terdaftar (admin atau guru)
        const peran = await jalan(sb.rpc("pas_peran"));
        if (!peran) { await sb.auth.signOut(); throw Object.assign(new Error("BUKAN_GURU"), { code: "auth/bukan-guru" }); }
        return !!data;
      }
      if (sandi === String(C.PIN_GURU)) { localStorage.setItem("pas_guru", "1"); return true; }
      throw new Error("PIN salah.");
    },
    // Peran akun yang login: "admin" (akses penuh) atau "guru" (hanya koreksi & rekap)
    async peran() {
      if (!sb) return "admin";
      const p = await jalan(sb.rpc("pas_peran"), 12000);
      return p || null;
    },
    async emailGuru() {
      if (!sb) return "";
      const { data } = await sb.auth.getSession();
      return (data && data.session && data.session.user && data.session.user.email) || "";
    },
    async keluarGuru() {
      if (sb) await sb.auth.signOut();
      localStorage.removeItem("pas_guru");
    },
    async sudahMasuk() {
      if (sb) { const { data } = await sb.auth.getSession(); return !!(data && data.session); }
      return localStorage.getItem("pas_guru") === "1";
    },
    // Dipanggil bila status login berubah (mis. sesi berakhir di tengah jalan)
    pantauLogin(cb) { if (sb) sb.auth.onAuthStateChange((ev, s) => { if (ev === "SIGNED_OUT" || (ev !== "INITIAL_SESSION" && !s)) cb(false); }); }
  };
})();
