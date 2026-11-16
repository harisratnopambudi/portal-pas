/* Lapisan data: Supabase bila dikonfigurasi, selain itu localStorage (mode demo). */
(function () {
  const C = window.CONFIG;
  const pakaiSupabase = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY && window.supabase);
  const sb = pakaiSupabase ? window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY) : null;
  const LKEY = "pas_db_demo";

  function lokalAmbil() {
    try { return JSON.parse(localStorage.getItem(LKEY) || "[]"); } catch (e) { return []; }
  }
  function lokalSimpan(arr) { localStorage.setItem(LKEY, JSON.stringify(arr)); }
  function uid() { return "id-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

  window.DB = {
    mode: pakaiSupabase ? "supabase" : "demo",

    async cari(mapel, kelas, absen) {
      if (sb) {
        const { data, error } = await sb.from(C.TABEL).select("id,nama,dikirim_at")
          .eq("mapel", mapel).eq("kelas", kelas).eq("absen", absen).maybeSingle();
        if (error) throw error;
        return data;
      }
      return lokalAmbil().find(r => r.mapel === mapel && r.kelas === kelas && r.absen === absen) || null;
    },

    async kirim(rec) {
      const row = Object.assign({ nilai_manual: {}, status: "belum", dikirim_at: new Date().toISOString() }, rec);
      if (sb) {
        const { error } = await sb.from(C.TABEL).insert(row);
        if (error) {
          if (error.code === "23505") throw new Error("SUDAH_ADA");
          throw error;
        }
        return true;
      }
      const arr = lokalAmbil();
      if (arr.some(r => r.mapel === row.mapel && r.kelas === row.kelas && r.absen === row.absen)) throw new Error("SUDAH_ADA");
      row.id = uid();
      arr.push(row);
      lokalSimpan(arr);
      return true;
    },

    async daftar(mapel) {
      if (sb) {
        const { data, error } = await sb.from(C.TABEL).select("*").eq("mapel", mapel)
          .order("kelas").order("absen");
        if (error) throw error;
        return data || [];
      }
      return lokalAmbil().filter(r => r.mapel === mapel)
        .sort((a, b) => a.kelas.localeCompare(b.kelas) || a.absen - b.absen);
    },

    async perbarui(id, patch) {
      if (sb) {
        const { error } = await sb.from(C.TABEL).update(patch).eq("id", id);
        if (error) throw error;
        return true;
      }
      const arr = lokalAmbil();
      const i = arr.findIndex(r => r.id === id);
      if (i >= 0) { arr[i] = Object.assign(arr[i], patch); lokalSimpan(arr); }
      return true;
    },

    async hapus(id) {
      if (sb) {
        const { error } = await sb.from(C.TABEL).delete().eq("id", id);
        if (error) throw error;
        return true;
      }
      lokalSimpan(lokalAmbil().filter(r => r.id !== id));
      return true;
    }
  };
})();
