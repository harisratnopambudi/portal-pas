/* =========================================================
   KUNCI JAWABAN & PEDOMAN PENSKORAN (DUMMY)
   Hanya dimuat oleh guru.html.

   pg    : k = huruf jawaban ("A".."E"), alasan = acuan alasan yang benar
   bs    : k = "B" (Benar) / "S" (Salah), alasan = acuan alasan
   pgk   : k = gabungan huruf, mis. "ABD"
   isian : k = daftar jawaban yang diterima (huruf besar/kecil & spasi diabaikan)
   essay : rubrik = pedoman / jawaban acuan
   ========================================================= */
window.KUNCI = {
  /* ===== Bahasa Indonesia & Pendidikan Pancasila ===== */
  "BI-PG1": { k: "B", alasan: "Kalimat utama ada di awal paragraf (deduktif); kalimat lain menjelaskan kegiatan kerja bakti." },
  "BI-PG2": { k: "C", alasan: "Huruf kapital dipakai di awal kalimat, nama tempat (Bandung), dan nama hari (Senin)." },
  "BI-PG3": { k: "C", alasan: "Sila ketiga Persatuan Indonesia: menjaga persatuan dan tidak membedakan suku." },
  "BI-PG4": { k: "D", alasan: "Kualitas adalah bentuk baku; apotik→apotek, nasehat→nasihat, karir→karier." },
  "BI-PG5": { k: "B", alasan: "Norma kesopanan bersumber dari tata krama pergaulan; A norma agama, C dan D norma hukum." },

  "BI-BS1": { k: "B", alasan: "Narasi menceritakan peristiwa secara kronologis/berurutan." },
  "BI-BS2": { k: "S", alasan: "Lambang sila keempat adalah kepala banteng; rantai emas lambang sila kedua." },
  "BI-BS3": { k: "S", alasan: "Kalimat tersebut kalimat berita, diakhiri titik dan memberi informasi." },
  "BI-BS4": { k: "B", alasan: "Sila keempat: Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan." },
  "BI-BS5": { k: "S", alasan: "Bentuk baku adalah “nasihat”." },

  "BI-PGK1": { k: "ABD" },
  "BI-PGK2": { k: "ACD" },
  "BI-PGK3": { k: "ACD" },
  "BI-PGK4": { k: "ABD" },
  "BI-PGK5": { k: "ABD" },

  "BI-IS1": { k: ["bintang", "bintang emas"] },
  "BI-IS2": { k: ["18 agustus 1945", "18-08-1945", "18/08/1945"] },
  "BI-IS3": { k: ["antagonis"] },
  "BI-IS4": { k: ["malas"] },
  "BI-IS5": { k: ["bhinneka tunggal ika", "bhineka tunggal ika"] },
  "BI-IS6": { k: ["seru", "tanda seru", "!", "(!)"] },
  "BI-IS7": { k: ["1 juni", "1 juni 1945", "satu juni"] },
  "BI-IS8": { k: ["latar", "setting"] },
  "BI-IS9": { k: ["apotek"] },
  "BI-IS10": { k: ["hukum"] },

  "BI-ES1": { rubrik: "Contoh: bermain dengan semua teman tanpa membedakan suku/agama, ikut upacara bendera dengan khidmat, kerja kelompok bersama, memakai bahasa Indonesia saat bergaul, ikut lomba antarkelas dengan sportif. Skor 3 = 3 contoh tepat; 2 = 2 contoh tepat; 1 = 1 contoh tepat." },
  "BI-ES2": { rubrik: "Ide pokok: sampah plastik berbahaya bagi lingkungan. Kalimat penjelas: sulit terurai; asap pembakarannya beracun; menyebabkan banjir. Skor 3 = ide pokok + 2 penjelas tepat; 2 = ide pokok + 1 penjelas; 1 = ide pokok saja." },
  "BI-ES3": { rubrik: "Protagonis: tokoh utama/berwatak baik. Antagonis: lawan tokoh utama/berwatak jahat. Masing-masing disertai contoh tokoh yang sesuai." },
  "BI-ES4": { rubrik: "Karena setiap orang punya hak berpendapat, perbedaan dapat menghasilkan keputusan terbaik, menjaga persatuan dan menghindari pertengkaran; sesuai sila keempat." },
  "BI-ES5": { rubrik: "Kalimat ajakan (memakai kata mari/ayo), diawali huruf kapital, diakhiri tanda seru/titik, isi sesuai tema kebersihan sekolah." },

  /* ===== IPAS ===== */
  "IP-PG1": { k: "B", alasan: "Kaca adalah benda bening sehingga cahaya dapat menembusnya." },
  "IP-PG2": { k: "C", alasan: "Cahaya berpindah dari air ke udara (medium berbeda kerapatan) sehingga dibiaskan." },
  "IP-PG3": { k: "D", alasan: "Bunyi memerlukan medium (zat) untuk merambat; ruang hampa tidak memiliki zat perantara." },
  "IP-PG4": { k: "C", alasan: "Ular memakan tikus (konsumen I), maka ular adalah konsumen tingkat II." },
  "IP-PG5": { k: "A", alasan: "Jamur termasuk dekomposer yang menguraikan sisa makhluk hidup." },

  "IP-BS1": { k: "B", alasan: "Sifat bayangan cermin datar: maya, tegak, sama besar, jarak sama." },
  "IP-BS2": { k: "S", alasan: "Bunyi paling cepat merambat melalui zat padat karena partikelnya rapat." },
  "IP-BS3": { k: "B", alasan: "Tumbuhan hijau berfotosintesis membuat makanan sendiri." },
  "IP-BS4": { k: "B", alasan: "Gema adalah bunyi pantul yang terdengar setelah bunyi asli selesai." },
  "IP-BS5": { k: "S", alasan: "Herbivora pemakan tumbuhan; pemakan daging adalah karnivora." },

  "IP-PGK1": { k: "ABC" },
  "IP-PGK2": { k: "ABD" },
  "IP-PGK3": { k: "ACE" },
  "IP-PGK4": { k: "ABE" },
  "IP-PGK5": { k: "ACE" },

  "IP-IS1": { k: ["cahaya"] },
  "IP-IS2": { k: ["penguraian", "dispersi", "pembiasan", "pembiasan dan penguraian"] },
  "IP-IS3": { k: ["hertz", "hz", "hertz (hz)"] },
  "IP-IS4": { k: ["produsen", "autotrof"] },
  "IP-IS5": { k: ["omnivora"] },
  "IP-IS6": { k: ["infrasonik"] },
  "IP-IS7": { k: ["jaring-jaring makanan", "jaring jaring makanan", "jaring makanan"] },
  "IP-IS8": { k: ["retina"] },
  "IP-IS9": { k: ["mutualisme"] },
  "IP-IS10": { k: ["ultrasonik"] },

  "IP-ES1": { rubrik: "Ada cahaya dari sumber cahaya yang mengenai benda, dipantulkan oleh benda, lalu masuk ke mata sehingga benda terlihat." },
  "IP-ES2": { rubrik: "Contoh: padi → tikus → ular → elang. Padi produsen, tikus konsumen I, ular konsumen II, elang konsumen III (pengurai boleh disebut). Skor 3 = urutan & semua peran benar; 2 = urutan benar, sebagian peran salah; 1 = hanya urutan." },
  "IP-ES3": { rubrik: "Populasi tikus meningkat karena tidak ada pemangsa, padi banyak dimakan tikus (gagal panen), elang kekurangan makanan; keseimbangan ekosistem terganggu." },
  "IP-ES4": { rubrik: "Padat: menempelkan telinga di meja/telepon kaleng. Cair: suara terdengar saat menyelam. Gas: mendengar suara orang berbicara/bel lewat udara." },
  "IP-ES5": { rubrik: "Contoh: cermin/spion (pemantulan), kacamata/lup (pembiasan), periskop (pemantulan), lampu senter (merambat lurus). Skor penuh bila 2 contoh dengan sifat cahaya yang tepat." },

  /* ===== PAIBP ===== */
  "PA-PG1": { k: "C", alasan: "Q.S. At-Tin terdiri atas 8 ayat." },
  "PA-PG2": { k: "B", alasan: "Al-‘Alim berarti Maha Mengetahui segala sesuatu." },
  "PA-PG3": { k: "C", alasan: "Zabur diturunkan kepada Nabi Dawud a.s." },
  "PA-PG4": { k: "B", alasan: "Ayat 2 Q.S. Al-Ma‘un: orang yang menghardik anak yatim." },
  "PA-PG5": { k: "D", alasan: "Puasa Ramadan termasuk rukun Islam dan wajib bagi muslim balig berakal (Q.S. Al-Baqarah: 183)." },

  "PA-BS1": { k: "B", alasan: "Taurat diturunkan kepada Nabi Musa a.s." },
  "PA-BS2": { k: "S", alasan: "As-Sami‘ artinya Maha Mendengar; Maha Melihat adalah Al-Bashir." },
  "PA-BS3": { k: "B", alasan: "Sahur dianjurkan Rasulullah saw. karena mengandung berkah." },
  "PA-BS4": { k: "S", alasan: "At-Tin termasuk surah Makkiyah (diturunkan di Makkah)." },
  "PA-BS5": { k: "B", alasan: "Al-Qur’an diturunkan kepada Nabi Muhammad saw., nabi terakhir." },

  "PA-PGK1": { k: "ABDE" },
  "PA-PGK2": { k: "ACE" },
  "PA-PGK3": { k: "ACE" },
  "PA-PGK4": { k: "ABD" },
  "PA-PGK5": { k: "ABD" },

  "PA-IS1": { k: ["isa", "isa a.s.", "isa as", "nabi isa"] },
  "PA-IS2": { k: ["pemberi", "pemberi karunia", "maha pemberi"] },
  "PA-IS3": { k: ["7", "tujuh"] },
  "PA-IS4": { k: ["lailatul qadar", "lailatulqadar", "lailatul qadr", "lailatul qodar"] },
  "PA-IS5": { k: ["kitab-kitab allah", "kitab allah", "kitab", "kitab-kitab"] },
  "PA-IS6": { k: ["fitrah", "fitri"] },
  "PA-IS7": { k: ["muhammad", "muhammad saw", "muhammad saw.", "nabi muhammad"] },
  "PA-IS8": { k: ["baik", "sempurna", "baik-baiknya", "sebaik-baiknya"] },
  "PA-IS9": { k: ["puasa", "saum", "shaum", "shiyam"] },
  "PA-IS10": { k: ["mendengar"] },

  "PA-ES1": { rubrik: "Allah bersumpah dengan buah tin, zaitun, Bukit Sinai, dan kota Makkah; manusia diciptakan dalam bentuk sebaik-baiknya; bisa jatuh ke tempat serendah-rendahnya kecuali yang beriman dan beramal saleh; Allah hakim yang paling adil." },
  "PA-ES2": { rubrik: "Kitab: wahyu yang dibukukan, isinya lengkap, wajib disampaikan kepada umat (Taurat, Zabur, Injil, Al-Qur’an). Suhuf: lembaran-lembaran wahyu, isinya singkat, tidak dibukukan (mis. suhuf Nabi Ibrahim dan Musa)." },
  "PA-ES3": { rubrik: "Contoh: rajin membaca Al-Qur’an, mempelajari dan mengamalkan isinya, menghormati/merawat mushaf, meyakini kebenaran isinya." },
  "PA-ES4": { rubrik: "Menjaga ucapan, tidak berkata kotor/bohong/ghibah, mendengarkan nasihat orang tua dan guru, berdoa dengan yakin didengar Allah." },
  "PA-ES5": { rubrik: "Melatih kesabaran dan pengendalian diri, menumbuhkan empati pada orang miskin, menyehatkan badan, meningkatkan takwa, mempererat silaturahmi." },

  /* ===== Matematika ===== */
  "MT-PG1": { k: "C", alasan: "12 = 2²×3, 18 = 2×3²; KPK = 2²×3² = 36 (atau kelipatan persekutuan terkecil)." },
  "MT-PG2": { k: "C", alasan: "24 = 2³×3, 36 = 2²×3²; FPB = 2²×3 = 12." },
  "MT-PG3": { k: "B", alasan: "3/4 + 2/4 = 5/4 = 1 1/4." },
  "MT-PG4": { k: "C", alasan: "Persegi panjang dibagi 4 bagian sama besar dan 3 bagian diarsir, jadi 3/4." },
  "MT-PG5": { k: "B", alasan: "2,5 − 1,75 = 0,75 = 3/4 kg." },

  "MT-BS1": { k: "B", alasan: "2/3 = 10/15 dan 3/5 = 9/15, sehingga 2/3 lebih besar." },
  "MT-BS2": { k: "S", alasan: "Kelipatan 4: 4, 8, 12; kelipatan 6: 6, 12; KPK = 12." },
  "MT-BS3": { k: "B", alasan: "25% = 25/100 = 1/4." },
  "MT-BS4": { k: "S", alasan: "1/2 × 2/3 = 2/6 = 1/3." },
  "MT-BS5": { k: "B", alasan: "7 hanya memiliki dua faktor, yaitu 1 dan 7." },

  "MT-PGK1": { k: "ABD" },
  "MT-PGK2": { k: "ACD" },
  "MT-PGK3": { k: "ACE" },
  "MT-PGK4": { k: "BCE" },
  "MT-PGK5": { k: "ACE" },

  "MT-IS1": { k: ["3/8"] },
  "MT-IS2": { k: ["50%", "50 persen", "50"] },
  "MT-IS3": { k: ["15"] },
  "MT-IS4": { k: ["4"] },
  "MT-IS5": { k: ["5/2"] },
  "MT-IS6": { k: ["6"] },
  "MT-IS7": { k: ["2", "2,0", "2,00"] },
  "MT-IS8": { k: ["20"] },
  "MT-IS9": { k: ["1/2"] },
  "MT-IS10": { k: ["2x2x3", "2^2x3", "2²x3", "2pangkat2x3"] },

  "MT-ES1": { rubrik: "KPK 6 dan 8 = 24. Menyala bersama lagi 24 detik kemudian, pukul 08.00.24. Skor 3 = cara (KPK) + jawaban benar; 2 = cara benar tetapi jawaban salah; 1 = jawaban tanpa cara." },
  "MT-ES2": { rubrik: "FPB 24 dan 36 = 12. Jadi 12 kantong; tiap kantong 2 apel dan 3 jeruk." },
  "MT-ES3": { rubrik: "3 1/2 − 1 1/4 = 3 2/4 − 1 1/4 = 2 1/4 meter." },
  "MT-ES4": { rubrik: "Ubah ke desimal: 0,45; 0,5; 0,6; 0,4. Urutan: 2/5 ; 0,45 ; 1/2 ; 60%." },
  "MT-ES5": { rubrik: "Diskon = 25% × 20.000 = 5.000. Harga bayar = 20.000 − 5.000 = Rp15.000,00." }
};
