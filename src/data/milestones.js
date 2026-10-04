// Roadmap & Milestones untuk Mahasiswa Informatika 23 Universitas Alma Ata

export const ROADMAP_PHASES = [
  {
    phaseId: 1,
    title: "Magang Industri (KKL)",
    shortTitle: "Magang",
    period: "Agustus – Desember 2026 (Semester 7)",
    status: "Fase Awal",
    color: "from-blue-600 to-cyan-500",
    description: "Program Kuliah Kerja Lapangan (KKL) / Magang Industri 3 SKS sebagai fondasi pengalaman industri dan studi kasus skripsi.",
    steps: [
      {
        id: "m-magang-1",
        title: "Tahap Mencari Tempat Magang",
        desc: "Riset perusahaan, instansi, atau industri IT yang relevan dengan peminatan (software house, instansi pemerintah, perbankan, startup, dll.).",
        tips: "Pilih instansi yang memiliki tim IT aktif agar kamu bisa berkontribusi pada proyek riil dan menemukan masalah nyata untuk skripsi."
      },
      {
        id: "m-magang-2",
        title: "Tahap Surat Pengajuan & Proposal Magang",
        desc: "Membuat permohonan surat pengantar magang dari fakultas/prodi dan proposal magang resmi ke perusahaan tujuan.",
        tips: "Hubungi tata usaha/admin prodi untuk permohonan surat tugas dan pastikan ada konfirmasi surat balasan penerimaan dari instansi."
      },
      {
        id: "m-magang-3",
        title: "Tahap Pelaksanaan Magang Industri",
        desc: "Melaksanakan aktivitas magang di instansi mitra sesuai jam kerja profesional dan mempelajari alur kerja tim IT industri.",
        tips: "Jaga nama baik almamater, bangun relasi dengan mentor/supervisor, dan dokumentasikan seluruh hasil pekerjaan harian."
      },
      {
        id: "m-magang-4",
        title: "Tahap Penulisan Logbook Magang (Minggu 1–16)",
        desc: "Mencatat aktivitas, penugasan harian, hasil kerja, kendala, dan meminta tanda tangan/paraf supervisor lapangan setiap minggu.",
        tips: "Rutin mengisi logbook setiap pekan (total 16 minggu) disertai lampiran foto kegiatan dan screenshot aplikasi/coding agar tidak menumpuk."
      },
      {
        id: "m-magang-5",
        title: "Tahap Penyusunan & Pengumpulan Laporan Magang",
        desc: "Menyusun draf laporan magang (minimal 25 halaman, format 4-3-3-3, TNR 12 spasi 1.5), meminta ACC dospem & supervisor, lalu mengumpulkan softcopy PDF ke prodi.",
        tips: "Kirim softcopy PDF laporan ke email informatika@almaata.ac.id dengan subjek LaporanKKL_Tahun_Nama (Contoh: LaporanKKL_2026_YazidSyafrudin)."
      }
    ]
  },
  {
    phaseId: 2,
    title: "Seminar Proposal (Sempro)",
    shortTitle: "Sempro",
    period: "Semester 7 Akhir – Januari 2027",
    status: "Milestone Penentu",
    color: "from-indigo-600 to-purple-500",
    description: "Dari penentuan topik & judul, bimbingan Bab 1-3, Turnitin ≤ 20%, SPM Birokrasi (9 Poin), hingga Seminar Proposal bersama.",
    steps: [
      {
        id: "m-sempro-1",
        title: "Tahap Penentuan Topik & Mencari Judul Penelitian",
        desc: "Mengidentifikasi masalah lapangan (dari tempat magang atau studi kasus aktual) dan mengumpulkan 5–10 jurnal rujukan SINTA/Scopus.",
        tips: "Gunakan pendekatan piramida terbalik dan pilih topik yang kamu kuasai (Web/Mobile Apps, AI/ML, Data Science, IoT, atau Cyber Security)."
      },
      {
        id: "m-sempro-2",
        title: "Tahap Pengajuan Judul (Form FKT.SPI.01) & SK Dospem",
        desc: "Mengajukan formulir usulan judul ke Koordinator Skripsi / Kaprodi hingga terbit Surat Keputusan (SK) Dosen Pembimbing Skripsi.",
        tips: "Siapkan 2 opsi alternatif judul cadangan beserta rumusan masalah singkat agar pengajuan cepat disetujui."
      },
      {
        id: "m-sempro-3",
        title: "Tahap Penyusunan Draf Proposal (Bab 1, 2, & 3)",
        desc: "Menulis draf Bab 1 (Pendahuluan & Urgensi Masalah), Bab 2 (Tinjauan Pustaka & Landasan Teori), dan Bab 3 (Metodologi Riset & Desain Sistem).",
        tips: "Pastikan diagram alur penelitian jelas dan diagram arsitektur/use case sistem tergambar secara runut."
      },
      {
        id: "m-sempro-4",
        title: "Tahap Bimbingan Rutin & ACC Dosen Pembimbing",
        desc: "Melakukan bimbingan berkala bersama Dosen Pembimbing dan mengisi Kartu Bimbingan Skripsi (Form FKT.SPI.04) hingga mendapatkan ACC maju Sempro.",
        tips: "Setiap bimbingan, catat revisi dosen dan buat ringkasan apa saja yang telah diperbaiki pada lembar catatan."
      },
      {
        id: "m-sempro-5",
        title: "Tahap Uji Bebas Turnitin Proposal (≤ 20%)",
        desc: "Melakukan pengecekan similaritas Turnitin melalui perpustakaan UAA atau admin fakultas dengan hasil maksimal 20%.",
        tips: "Hindari copy-paste mentah kalimat jurnal; gunakan teknik parafrase kalimat ilmiah."
      },
      {
        id: "m-sempro-6",
        title: "Tahap Tuntas Syarat Administrasi & SPM Birokrasi (9 Poin)",
        desc: "Memastikan skor AAEPT ≥ 450, lulus LPBA, PERMATA, hadir min. 5x sempro teman, dan tuntas SPM Birokrasi 9 Poin (Video 4P, Artikel 4P, Google Maps 1P).",
        tips: "Gabung Grup WhatsApp 'Program Pendampingan Konten SPM' (bit.ly/klinik-konten-spm) untuk panduan pembuatan video, artikel, dan ulasan bintang 5!"
      },
      {
        id: "m-sempro-7",
        title: "Tahap Pendaftaran Sempro di Akademik (H-3)",
        desc: "Menyerahkan berkas pendaftaran Sempro lengkap ke bagian akademik fakultas: KRS, form ACC dospem, bukti Turnitin, dan bukti hadir 5x sempro.",
        tips: "Daftar minimal H-3 sebelum jadwal ujian agar staf akademik memiliki waktu memverifikasi berkas dan memplot jadwal dosen penguji."
      },
      {
        id: "m-sempro-8",
        title: "Tahap Pelaksanaan Seminar Proposal Bersama",
        desc: "Maju presentasi draf proposal (slide 15–20 menit) di hadapan dosen penguji, mengenakan jas almamater dan dihadiri audiens teman angkatan.",
        tips: "Kuasai materi latar belakang dan metodologi, jawab pertanyaan dengan tenang, dan catat semua saran revisi di buku catatan."
      },
      {
        id: "m-sempro-9",
        title: "Tahap Revisi & Pengesahan Proposal Skripsi",
        desc: "Menyelesaikan seluruh poin revisi dari dosen penguji dalam waktu 1–2 pekan dan meminta tanda tangan lembar pengesahan proposal.",
        tips: "Segera tuntaskan revisi agar SK bimbingan penelitian bisa langsung diproses dan tidak menunda jadwal riset ke depan."
      }
    ]
  },
  {
    phaseId: 3,
    title: "Ethical Clearance (EC) & Masa Jeda Riset",
    shortTitle: "Ethical Clearance",
    period: "Februari – April 2027 (Wajib Jeda Min. 3 Bulan)",
    status: "Syarat Kunci Riset",
    color: "from-amber-500 to-orange-500",
    description: "Pengurusan lolos kaji etik di Komisi Etik UAA segera setelah Sempro dan menjalani masa jeda riset lapangan wajib min. 3 bulan (SE Dekan 002/2026).",
    steps: [
      {
        id: "m-ec-1",
        title: "Tahap Penyusunan Berkas Protokol Etik Penelitian",
        desc: "Menyiapkan berkas softfile PDF: Naskah Bab 1 & 3 hasil revisi Sempro, protokol kaji etik 7 butir standar WHO-CIOMS, lembar Informed Consent / instrumen kuesioner.",
        tips: "Pastikan instrumen penelitian, subjek penelitian (responden/data), dan metode pengujian sistem sudah terdefinisi secara jelas."
      },
      {
        id: "m-ec-2",
        title: "Tahap Pengiriman Berkas Softfile ke Komisi Etik UAA",
        desc: "Mengirimkan seluruh dokumen persyaratan via surel ke komisietik@almaata.ac.id dengan format subjek: Pengajuan_EC_Nama_NIM_Prodi.",
        tips: "Kirimkan SEGERA sehari atau beberapa hari setelah Sempro beres revisi agar masa jeda 3 bulan kalender segera berjalan dan tidak menunda Semhas!"
      },
      {
        id: "m-ec-3",
        title: "Tahap Konfirmasi WhatsApp ke Sekretariat Komisi Etik",
        desc: "Melakukan konfirmasi pengiriman berkas ke kontak WhatsApp resmi Komisi Etik UAA (+62 857-2948-4269) dan memantau balasan email.",
        tips: "Sampaikan salam santun, sertakan nama, NIM, prodi Informatika, dan lampirkan tangkapan layar bukti pengiriman email."
      },
      {
        id: "m-ec-4",
        title: "Tahap Proses Telaah Reviewer & Revisi Protokol Etik",
        desc: "Menunggu proses telaah oleh reviewer komisi etik (paling cepat 2 minggu) dan menuntaskan revisi apabila terdapat catatan perbaikan.",
        tips: "Komisi Etik TIDAK menerima percepatan/permintaan lolos etik yang melompati prosedur. Pantau email komisietik@almaata.ac.id secara rutin."
      },
      {
        id: "m-ec-5",
        title: "Tahap Pengambilan Hardcopy Surat Keterangan Lolos Etik",
        desc: "Mengambil Surat Keterangan Lolos Kaji Etik (Ethical Approval) fisik bertanda tangan asli di Mal Layanan Akademik Lantai 1 UAA (Ibu Ela).",
        tips: "Perhatikan TANGGAL TERBIT pada surat lolos etik, karena tanggal ini merupakan patokan awal hitungan masa jeda wajib 3 bulan kalender!"
      },
      {
        id: "m-ec-6",
        title: "Tahap Menjalani Masa Jeda Riset Lapangan (Wajib Min. 3 Bulan)",
        desc: "Melakukan riset, pengumpulan data pengguna/responden, dan pengujian sistem selama minimal 3 bulan kalender penuh dari tanggal terbit surat EC.",
        tips: "PERINGATAN SE DEKAN NO. 002/2026: Mahasiswa dilarang mendaftar Seminar Hasil sebelum jeda 3 bulan kalender genap terpenuhi!"
      }
    ]
  },
  {
    phaseId: 4,
    title: "Fase 4: Seminar Hasil (Semhas) & Riset Skripsi",
    shortTitle: "Semhas",
    period: "Mei – Juni 2027 (Semester 8)",
    status: "Uji Produk & Hasil",
    color: "from-sky-600 to-indigo-600",
    description: "Pengembangan software/AI, pengujian sistem, penulisan Bab 4-5, Turnitin ≤ 20%, bimbingan intensif, hingga ujian Seminar Hasil.",
    steps: [
      {
        id: "m-semhas-1",
        title: "Tahap Coding / Pembuatan Sistem & Deployment Aplikasi",
        desc: "Mengembangkan aplikasi, melatih model AI/Data Science, integrasi API, dan deployment prototipe sistem yang siap diuji.",
        tips: "Simpan source code di GitHub secara berkala dan dokumentasikan setiap endpoint/fitur serta metrik hasil evaluasinya."
      },
      {
        id: "m-semhas-2",
        title: "Tahap Pengujian Sistem (Blackbox, UAT, Akurasi/Confusion Matrix)",
        desc: "Melakukan pengujian fungsionalitas sistem (Blackbox), survei kepuasan pengguna (UAT), dan uji performa/akurasi model.",
        tips: "Catat angka metrik evaluasi secara objektif dan susun tabel pengujian sistematis untuk dipaparkan di Bab 4."
      },
      {
        id: "m-semhas-3",
        title: "Tahap Penulisan Naskah Bab 4 (Hasil) & Bab 5 (Penutup)",
        desc: "Memaparkan hasil pengujian dengan grafik/tabel, pembahasan implikasi temuan, keterbatasan riset, kesimpulan, dan saran.",
        tips: "Jelaskan APA makna dari angka/grafik pengujian, bukan sekadar menampilkan screenshot antarmuka sistem."
      },
      {
        id: "m-semhas-4",
        title: "Tahap Bimbingan Skripsi Lengkap & ACC Semhas",
        desc: "Melakukan bimbingan intensif naskah lengkap Bab 1–5 bersama Dosen Pembimbing hingga disetujui maju Seminar Hasil.",
        tips: "Pastikan format layout rapi sesuai pedoman FKT: Margin 4-4-3-3, font Times New Roman 12 pt, dan spasi 2."
      },
      {
        id: "m-semhas-5",
        title: "Tahap Uji Turnitin Naskah Skripsi Final (≤ 20%)",
        desc: "Melakukan pengecekan similaritas Turnitin Bab 1 sampai Bab 5 secara menyeluruh dengan hasil maksimal 20%.",
        tips: "Lakukan pengecekan jauh-jauh hari sebelum pendaftaran agar ada waktu bila diperlukan parafrase ulang."
      },
      {
        id: "m-semhas-6",
        title: "Tahap Pendaftaran Ujian Semhas di Akademik",
        desc: "Mendaftar ujian Semhas di akademik fakultas: serahkan form ACC dospem, bukti bebas Turnitin, softcopy naskah, dan verifikasi jeda EC 3 bulan.",
        tips: "Staf akademik akan memverifikasi tanggal surat EC untuk memastikan masa jeda 3 bulan sudah sah terpenuhi."
      },
      {
        id: "m-semhas-7",
        title: "Tahap Pelaksanaan Seminar Hasil (Semhas)",
        desc: "Presentasi naskah hasil riset dan live demo produk sistem software/AI di hadapan dosen pembimbing dan penguji.",
        tips: "Siapkan live demo sistem aplikasi yang siap dijalankan dan jelaskan kontribusi risetmu secara percaya diri."
      },
      {
        id: "m-semhas-8",
        title: "Tahap Penyelesaian Revisi Seminar Hasil",
        desc: "Menyelesaikan seluruh catatan revisi dosen penguji Semhas dan meminta persetujuan untuk melangkah ke pendaftaran Ujian Pendadaran.",
        tips: "Selesaikan revisi semhas dalam 1-2 pekan agar pendaftaran ujian pendadaran bisa segera diproses."
      }
    ]
  },
  {
    phaseId: 5,
    title: "Fase 5: Yudisium (Pendadaran & Kelulusan)",
    shortTitle: "Yudisium",
    period: "Juni – Juli 2027",
    status: "Sidang & Kelulusan",
    color: "from-emerald-600 to-teal-500",
    description: "Validasi SPM Prodi (25 Poin), ujian pendadaran di depan Dewan Penguji, revisi, jilid hardcover biru laut, dan penetapan gelar S.Kom.",
    steps: [
      {
        id: "m-yudisium-1",
        title: "Tahap Validasi SPM Prodi Minimal 25 Poin (Kour Kemahasiswaan)",
        desc: "Memastikan kegiatan prodi (Magang 10 P, KKN 10 P, HIMA 4–10 P, MGM 8 P) tervalidasi minimal 25 poin di portal almaata.ac.id/verifikasi-spm.",
        tips: "Dapatkan pengesahan Form Validasi Prestasi (2) dari Kour Kemahasiswaan Prodi Informatika dan pantau status 'MEMENUHI' di surel."
      },
      {
        id: "m-yudisium-2",
        title: "Tahap Pendaftaran Ujian Pendadaran (Sidang Skripsi)",
        desc: "Menyerahkan berkas pendaftaran sidang skripsi: form ACC dospem, bukti bebas Turnitin ≤ 20%, bukti SPM MEMENUHI, dan transkrip nilai.",
        tips: "Pastikan seluruh mata kuliah wajib dan pilihan pada transkrip sudah lulus dan tidak ada nilai D atau E."
      },
      {
        id: "m-yudisium-3",
        title: "Tahap Pelaksanaan Ujian Sidang Pendadaran",
        desc: "Ujian komprehensif skripsi di hadapan Dewan Penguji untuk penentuan kelulusan dan pemberian nilai akhir tugas akhir.",
        tips: "Kuasai landasan teori, metodologi, dan cara kerja source code secara detail hingga baris kode kuncinya."
      },
      {
        id: "m-yudisium-4",
        title: "Tahap Revisi Final & Penjilidan Hardcover Biru Laut",
        desc: "Menyelesaikan revisi dari dewan penguji, meminta lembar pengesahan bertanda tangan lengkap, dan menjilid skripsi hardcover biru laut tinta emas.",
        tips: "Gandakan buku hardcover dan softfile CD skripsi sesuai ketentuan perpustakaan dan fakultas."
      },
      {
        id: "m-yudisium-5",
        title: "Tahap Bebas Tanggungan Perpustakaan, Lab, & Keuangan",
        desc: "Mengurus surat bebas pinjaman buku perpustakaan UAA, bebas laboratorium komputer, dan bebas tanggungan administrasi keuangan.",
        tips: "Unggah mandiri karya ilmiah tugas akhir ke repositori digital perpustakaan UAA sebelum meminta cap surat bebas."
      },
      {
        id: "m-yudisium-6",
        title: "Tahap Pendaftaran Yudisium & Penetapan Gelar S.Kom",
        desc: "Mendaftarkan diri pada periode Yudisium resmi Fakultas FSET hingga diterbitkan Surat Keputusan (SK) Kelulusan Sarjana Komputer (S.Kom).",
        tips: "Selamat! Pada tahap ini kamu secara resmi telah berhak menyandang gelar akademik Sarjana Komputer (S.Kom)!"
      }
    ]
  },
  {
    phaseId: 6,
    title: "Fase 6: Wisuda Sarjana Komputer (S.Kom)",
    shortTitle: "Wisuda",
    period: "Agustus – September 2027",
    status: "Puncak Perayaan",
    color: "from-amber-600 to-yellow-500",
    description: "Momen puncak perayaan kelulusan resmi sarjana Informatika 2023 di Universitas Alma Ata, penyerahan ijazah asli, transkrip, dan SKPI.",
    steps: [
      {
        id: "m-wisuda-1",
        title: "Tahap Pendaftaran Wisuda Universitas Alma Ata",
        desc: "Mengisi formulir pendaftaran wisuda secara online, mengunggah pas foto formal ijazah terbaru, dan menyelesaikan administrasi wisuda.",
        tips: "Foto ijazah wajib berpakaian formal (kemeja putih, jas hitam, berdasi) sesuai ketentuan biro akademik universitas."
      },
      {
        id: "m-wisuda-2",
        title: "Tahap Pengambilan Toga & Undangan Wisuda",
        desc: "Mengambil perlengkapan wisuda (jubah toga, topi toga, samir fakultas FSET) dan undangan wisuda untuk orang tua/keluarga di kampus.",
        tips: "Coba ukuran toga saat pengambilan untuk memastikan kenyamanan saat upacara prosesi."
      },
      {
        id: "m-wisuda-3",
        title: "Tahap Gladi Bersih Prosesi Upacara Wisuda",
        desc: "Mengikuti gladi bersih tata upacara wisuda sarjana di auditorium/gedung wisuda Universitas Alma Ata.",
        tips: "Pahami urutan pemanggilan nama, prosesi pemindahan tali toga, dan etika penerimaan tabung ijazah di panggung."
      },
      {
        id: "m-wisuda-4",
        title: "Tahap Prosesi Hari H Wisuda Bersama",
        desc: "Momen bersejarah prosesi wisuda sarjana bersama keluarga, dosen, dan seluruh sahabat satu angkatan Informatika 2023.",
        tips: "Abadikan momen sakral ini bersama orang tua, dosen pembimbing, dan teman seperjuangan satu angkatan Informatika 23!"
      },
      {
        id: "m-wisuda-5",
        title: "Tahap Pengambilan Ijazah Asli, Transkrip & SKPI",
        desc: "Menerima berkas dokumen legalitas: Ijazah Sarjana Asli, Transkrip Akademik, dan Surat Keterangan Pendamping Ijazah (SKPI).",
        tips: "Segera legalisir fotokopi ijazah dan transkrip untuk keperluan melamar kerja, studi lanjut S2, atau karier profesional IT."
      }
    ]
  }
];

// Timeline Angkatan Informatika 2023 (Tahun Akademik 2026/2027)
export const TIMELINE_EVENTS = [
  {
    date: "Agustus – Desember 2026",
    title: "Pelaksanaan Magang Industri & Studi Kasus (KKL)",
    category: "Magang",
    status: "current",
    desc: "Mahasiswa angkatan 2023 melaksanakan magang industri (3 SKS), rutin mengisi logbook 16 minggu, dan memetakan fenomena masalah nyata sebagai objek penelitian proposal skripsi.",
    highlights: ["Magang Industri 3 SKS", "Logbook 16 Minggu Terparaf", "Laporan Min. 25 Hal (Format 4-3-3-3)", "Temukan Masalah Skripsi"]
  },
  {
    date: "Desember 2026 – Januari 2027",
    title: "Pengajuan Judul, SK Dospem & Penulisan Bab 1–3",
    category: "Proposal",
    status: "upcoming",
    desc: "Pengajuan judul penelitian (Form FKT.SPI.01), penerbitan SK Dosen Pembimbing I & II, bimbingan intensif Bab 1–3 (min. 4x), uji Turnitin proposal ≤ 20%, skor AAEPT ≥ 450, lulus LPBA, dan hadir 5x sempro kawan.",
    highlights: ["SK Dospem I & II", "Bimbingan Min. 4x", "Turnitin Proposal ≤ 20%", "Hadir Min. 5x Sempro", "AAEPT ≥ 450 & LPBA"]
  },
  {
    date: "Januari 2027",
    title: "SEMINAR PROPOSAL (SEMPRO) BERSAMA INFORMATIKA '23",
    category: "Sempro",
    status: "highlight",
    desc: "Momen bersejarah ujian seminar proposal serentak satu angkatan di hadapan dewan penguji. Presentasi kelayakan metodologi riset, penyelesaian revisi sempro, dan penandatanganan lembar pengesahan.",
    highlights: ["Presentasi Ujian 15 Menit", "ACC Revisi Dewan Penguji", "Serentak Angkatan 2023", "Pengesahan Naskah"]
  },
  {
    date: "Februari – April 2027",
    title: "Pengajuan Ethical Clearance (EC) & Wajib Jeda Min. 3 Bulan",
    category: "Kaji Etik",
    status: "future",
    desc: "Pengurusan berkas kaji etik ke Komisi Etik (KEPK) UAA segera setelah revisi Sempro dan wajib menjalani masa jeda riset lapangan minimal 3 bulan kalender penuh sebelum mendaftar Semhas (SE Dekan 002/2026).",
    highlights: ["Surat EC KEPK UAA", "Wajib Jeda Min. 3 Bulan Penuh", "Regulasi SE Dekan No. 002/2026", "Subjek Responden/Kesehatan"]
  },
  {
    date: "Februari – Mei 2027",
    title: "Riset Lapangan, Coding Sistem & Cicil 9 Poin SPM",
    category: "Riset & SPM",
    status: "future",
    desc: "Pengembangan software/AI, deployment sistem, pengujian Blackbox & UAT, penulisan Bab 4–5, serta penuntasan 9 poin SPM birokrasi (konten video/artikel medsos terverifikasi kampus) dan 25 poin SPM prodi.",
    highlights: ["Coding & Model AI", "Pengujian UAT & Blackbox", "Naskah Bab 4-5", "9 Poin Wajib SPM Akademik", "25 Poin SPM Prodi"]
  },
  {
    date: "Juni 2027",
    title: "Seminar Hasil (Semhas) & Live Demo Produk Sistem",
    category: "Semhas",
    status: "future",
    desc: "Presentasi naskah hasil riset dan live demo produk sistem/aplikasi di hadapan penguji, verifikasi jeda 3 bulan surat EC oleh akademik, Turnitin naskah lengkap ≤ 20%, dan penyelesaian revisi semhas.",
    highlights: ["Live Demo Software/AI", "Verifikasi Jeda EC 3 Bulan", "Turnitin Bab 1-5 ≤ 20%", "ACC Penguji Semhas"]
  },
  {
    date: "Juli 2027",
    title: "Ujian Sidang Pendadaran Akhir & Penjilidan Hardcover",
    category: "Pendadaran",
    status: "future",
    desc: "Ujian komprehensif penentu kelulusan sarjana di depan dewan penguji, validasi SPM prodi 25 poin, pengurusan surat bebas perpus/lab/keuangan, dan penjilidan hardcover naskah skripsi Biru Laut tinta emas.",
    highlights: ["Ujian Sidang Komprehensif", "Validasi SPM 25 Poin", "Bebas Perpus, Lab & SPP", "Hardcover Biru Laut Tinta Emas"]
  },
  {
    date: "Agustus – September 2027",
    title: "Yudisium & Wisuda Akbar Sarjana Komputer (S.Kom) Bersama!",
    category: "Wisuda",
    status: "goal",
    desc: "Momen puncak perayaan kelulusan resmi: Penetapan SK Yudisium Sarjana Komputer (S.Kom), pemindahan tali toga bersama keluarga & sahabat Informatika '23, serta penyerahan ijazah asli, transkrip, & SKPI!",
    highlights: ["Gelar Resmi Sarjana Komputer (S.Kom)", "Wisuda Periode TA 2026/2027", "Ijazah Asli, Transkrip & SKPI", "Lulus Tepat Waktu 4 Tahun!"]
  }
];
