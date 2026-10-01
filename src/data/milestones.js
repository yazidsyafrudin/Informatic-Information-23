// Roadmap & Milestones untuk Mahasiswa Informatika 23 Universitas Alma Ata

export const ROADMAP_PHASES = [
  {
    phaseId: 1,
    title: "Fase 1: Magang & Pra-Proposal",
    period: "Agustus – November 2024 (Semester 7)",
    status: "Sedang Berlangsung",
    color: "from-blue-600 to-cyan-500",
    description: "Menyelesaikan program magang industri 3 bulan sekaligus mengobservasi potensi masalah nyata di lapangan untuk dijadikan topik skripsi.",
    steps: [
      {
        id: "m-1",
        title: "Selesaikan Laporan & Sertifikat Magang",
        desc: "Fokus menyelesaikan penugasan magang dan mendapatkan penilaian dari pembimbing lapangan.",
        tips: "Identifikasi apakah ada sistem di tempat magangmu yang lambat/manual yang bisa kamu buatkan solusinya untuk judul skripsi!"
      },
      {
        id: "m-2",
        title: "Tentukan Topik & Peminatan Skripsi",
        desc: "Pilih salah satu domain: Web/Mobile Application, Artificial Intelligence/Machine Learning, IoT, Data Science, atau Cyber Security.",
        tips: "Pilih topik yang alat/metodenya kamu kuasai. Hindari memilih topik yang terlalu abstrak."
      },
      {
        id: "m-3",
        title: "Kumpulkan 5–10 Jurnal Internasional/SINTA",
        desc: "Cari jurnal rujukan 3-5 tahun terakhir sebagai state-of-the-art dan landasan teori.",
        tips: "Gunakan Google Scholar, IEEE, atau ScienceDirect. Catat metode apa yang mereka pakai dan celah/kekurangannya."
      },
      {
        id: "m-4",
        title: "Pengajuan Judul (Form FKT.SPI.01)",
        desc: "Mengisi formulir pengajuan judul dan meminta persetujuan Ketua Program Studi / Koordinator Skripsi.",
        tips: "Siapkan 2 opsi judul alternatif jika opsi pertama ditolak atau diubah."
      }
    ]
  },
  {
    phaseId: 2,
    title: "Fase 2: Penulisan Proposal & Persiapan Sempro",
    period: "Desember 2024 (Semester 7 Akhir)",
    status: "Mendatang",
    color: "from-indigo-600 to-purple-500",
    description: "Menyusun Bab 1 (Pendahuluan), Bab 2 (Tinjauan Pustaka & Teori), dan Bab 3 (Metodologi Penelitian) secara intensif bersama Dosen Pembimbing.",
    steps: [
      {
        id: "m-5",
        title: "Penyusunan Bab 1 (Latar Belakang & Rumusan)",
        desc: "Tuliskan data pendukung masalah dan urgensi mengapa penelitianmu harus dilakukan.",
        tips: "Gunakan piramida terbalik: dari masalah global -> masalah nasional -> masalah lokal di objek penelitianmu."
      },
      {
        id: "m-6",
        title: "Penyusunan Bab 2 & Bab 3",
        desc: "Kajian pustaka, diagram alur penelitian, rancangan arsitektur sistem, dan metode pengembangan (SDLC/Agile/CRISP-DM).",
        tips: "Pastikan diagram alur penelitian jelas dan runut dari identifikasi masalah sampai uji coba."
      },
      {
        id: "m-7",
        title: "Bimbingan Rutin & Kartu Bimbingan (FKT.SPI.04)",
        desc: "Konsultasikan draf proposal dengan Dosen Pembimbing secara berkala dan isi log bimbingan.",
        tips: "Setiap bimbingan, catat revisi dosen dan buat ringkasan apa saja yang telah diperbaiki pada lembar catatan."
      },
      {
        id: "m-8",
        title: "Cek Syarat Administrasi (IPK, AAEPT, SPM Birokrasi 9 Poin)",
        desc: "Pastikan skor AAEPT ≥ 450, lulus LPBA, PERMATA, hadir min. 5x sempro, dan tuntas SPM Birokrasi 9 Poin (Video medsos 4 poin, Artikel 4 poin, Google Maps review bintang 5 1 poin).",
        tips: "Gabung Grup WhatsApp 'Program Pendampingan Konten SPM' (bit.ly/klinik-konten-spm) untuk panduan pembuatan video (4 poin), artikel (4 poin), dan ulasan Google Maps (1 poin)!"
      },
      {
        id: "m-9",
        title: "Uji Bebas Plagiarisme Proposal (Turnitin ≤ 20%)",
        desc: "Lakukan pengecekan similaritas Turnitin melalui perpustakaan atau admin fakultas.",
        tips: "Hindari copy-paste mentah kalimat jurnal; gunakan teknik parafrase kalimat."
      }
    ]
  },
  {
    phaseId: 3,
    title: "Fase 3: Seminar Proposal Bersama (Januari)",
    period: "Januari 2025 (Pekan Penentu)",
    status: "Milestone Utama",
    color: "from-amber-500 to-emerald-500",
    description: "Momen puncak angkatan Informatika 23 maju Seminar Proposal bersama di depan dosen penguji.",
    steps: [
      {
        id: "m-10",
        title: "Pendaftaran Sempro di Akademik (H-3)",
        desc: "Serahkan berkas lengkap: KTM, KRS, Bukti 75% SKS, form persetujuan ACC dospem, dan bukti 5x hadir sempro.",
        tips: "Jangan mendaftar mendadak di H-1 karena berkas harus diverifikasi oleh staf akademik."
      },
      {
        id: "m-11",
        title: "Siapkan Slide Presentasi (Maks 15-20 Menit)",
        desc: "Buat slide yang ringkas, visual, dan to-the-point: Latar Belakang, Rumusan Masalah, Metode, dan Rencana Jadwal.",
        tips: "Hindari teks terlalu panjang di slide. Gunakan poin dan diagram arsitektur sistem."
      },
      {
        id: "m-12",
        title: "Hari H Pelaksanaan Sempro Bersama",
        desc: "Kenakan jas almamater, pakaian formal, ajak minimal 5 teman angkatan sebagai audiens.",
        tips: "Jawab pertanyaan penguji dengan tenang dan catat semua saran revisi di buku catatan."
      },
      {
        id: "m-13",
        title: "Penyelesaian Revisi Sempro & Pengesahan",
        desc: "Selesaikan poin-poin revisi dari penguji dan minta tanda tangan lembar pengesahan proposal.",
        tips: "Targetkan revisi selesai dalam 1-2 pekan setelah sempro agar tidak menunda tahap penelitian."
      }
    ]
  },
  {
    phaseId: 4,
    title: "Fase 4: Penelitian, Skripsi & Sidang Akhir",
    period: "Februari – Juli 2025 (Semester 8)",
    status: "Road to Graduation",
    color: "from-emerald-600 to-teal-500",
    description: "Tahap implementasi coding/pengembangan sistem, pengujian, penulisan Bab 4 & 5, Semhas, hingga Sidang Skripsi (Jilid Hardcover Biru Laut).",
    steps: [
      {
        id: "m-ec-1",
        title: "Pengajuan Ethical Clearance (EC) ke Komisi Etik UAA",
        desc: "Kirim berkas softfile PDF (Bab 1, 3, protokol, informed consent) ke komisietik@almaata.ac.id dan konfirmasi WA 085729484269.",
        tips: "SEGERA ajukan setelah Sempro! Waktu proses min. 2 minggu. Hardfile surat diambil di Mal Layanan Akademik (Bu Ela)."
      },
      {
        id: "m-ec-2",
        title: "Masa Jeda Riset Lapangan (Wajib Min. 3 Bulan Kalender)",
        desc: "Lakukan riset & analisis data lapangan sesuai Surat Edaran Dekan FSET No. 002/A/ED/FSET/UAA/VII/2026.",
        tips: "PERINGATAN SE DEKAN: Tanggal terbit EC harus berjarak minimal 3 bulan sebelum kamu boleh mendaftar Ujian Seminar Hasil!"
      },
      {
        id: "m-14",
        title: "Coding / Pembuatan Sistem & Pengujian",
        desc: "Kembangkan aplikasi/model AI sesuai rancangan Bab 3 dan lakukan pengujian (Blackbox, UAT, Akurasi/Confusion Matrix).",
        tips: "Simpan source code di GitHub secara berkala dan dokumentasikan setiap endpoint/fitur."
      },
      {
        id: "m-15",
        title: "Penulisan Bab 4 (Hasil & Pembahasan) & Bab 5 (Penutup)",
        desc: "Paparkan hasil pengujian dengan grafik/tabel, pembahasan implikasi hasil, kesimpulan, dan saran.",
        tips: "Jelaskan APA makna dari angka pengujian, bukan sekadar menampilkan screenshot sistem."
      },
      {
        id: "m-16",
        title: "Seminar Hasil (Semhas) & Turnitin Akhir (≤ 20%)",
        desc: "Presentasikan hasil produk/penelitian di depan dospem dan penguji, serta lolos verifikasi plagiasi final.",
        tips: "Pastikan seluruh bab sudah rapi sesuai format margin 4-4-3-3 dan Times New Roman 12 spasi 2."
      },
      {
        id: "m-spm-pendadaran",
        title: "Validasi SPM Prodi Minimal 25 Poin (Kour Kemahasiswaan)",
        desc: "Pastikan kegiatan prodi (Magang 10 P, KKN 10 P, HIMA 4–10 P, MGM 8 P) telah mencapai minimal 25 poin untuk syarat pendaftaran ujian pendadaran.",
        tips: "Dapatkan pengesahan Form Validasi Prestasi (2) dari Kour Kemahasiswaan Prodi Informatika lalu unggah ke almaata.ac.id/verifikasi-spm."
      },
      {
        id: "m-17",
        title: "Sidang Skripsi & Yudisium",
        desc: "Ujian pendadaran akhir skripsi, revisi final, jilid hardcover biru laut tinta emas, dan pendaftaran yudisium.",
        tips: "Lulus Tepat Waktu Bareng Informatika 2023 Universitas Alma Ata!"
      }
    ]
  }
];

// Timeline Angkatan Informatika 2023
export const TIMELINE_EVENTS = [
  {
    date: "Agustus – November 2024",
    title: "Pelaksanaan Magang Industri 3 Bulan",
    category: "Magang",
    status: "current",
    desc: "Mahasiswa angkatan 2023 menyelesaikan tugas magang dan mencari fenomena studi kasus untuk proposal skripsi."
  },
  {
    date: "November – Desember 2024",
    title: "Penulisan Intensif Proposal Bab 1–3",
    category: "Proposal",
    status: "upcoming",
    desc: "Bimbingan aktif bersama dospem, penyelesaian draf proposal, pengurusan syarat LPBA, AAEPT, dan hadir sempro 5x."
  },
  {
    date: "Januari 2025",
    title: "SEMINAR PROPOSAL BERSAMA INFORMATIKA 23",
    category: "Sempro",
    status: "highlight",
    desc: "Momen bersejarah seminar proposal bersama satu angkatan untuk menguji kelayakan riset skripsi."
  },
  {
    date: "Februari – Mei 2025",
    title: "Penelitian, Coding & Analisis Bab 4-5",
    category: "Riset",
    status: "future",
    desc: "Pengembangan software, deployment, pengambilan data lapangan, dan pengujian sistem."
  },
  {
    date: "Juni – Juli 2025",
    title: "Seminar Hasil & Sidang Pendadaran Akhir",
    category: "Sidang",
    status: "future",
    desc: "Sidang tugas akhir, pengesahan dekan & jilid hardcover biru laut tinta emas."
  },
  {
    date: "Agustus / September 2025",
    title: "Wisuda Sarjana Komputer (S.Kom) Bareng!",
    category: "Wisuda",
    status: "goal",
    desc: "Target bersama: Seluruh mahasiswa Informatika 23 memakai toga dan lulus tepat waktu 4 tahun!"
  }
];
