// Data Resmi Ekstraksi dari Buku Panduan Skripsi FKT Universitas Alma Ata (2021-2025)

export const PANDUAN_FKT = {
  universitas: "Universitas Alma Ata Yogyakarta",
  fakultas: "Fakultas Komputer dan Teknik (FKT)",
  prodi: "Informatika (S1)",
  dokumen: "Buku Panduan Penyusunan Penulisan Proposal Penelitian dan Skripsi",
  skRektor: "182/A/SK/UAA/IX/2021",

  persyaratanAkademik: [
    {
      id: "status-aktif",
      title: "Status Mahasiswa Aktif",
      desc: "Terdaftar aktif pada semester berjalan, memprogram Skripsi di KRS, dan melunasi administrasi biaya skripsi.",
      icon: "UserCheck",
      wajib: true
    },
    {
      id: "ipk-min",
      title: "IPK Minimal 3.25",
      desc: "Memiliki Indeks Prestasi Kumulatif (IPK) minimal 3.25 saat mengajukan skripsi.",
      icon: "Award",
      wajib: true
    },
    {
      id: "sks-lulus",
      title: "Lulus Minimal 75% Total SKS",
      desc: "Telah menyelesaikan dan lulus minimal 75% dari total beban SKS kurikulum (wajib maupun pilihan).",
      icon: "CheckCircle2",
      wajib: true
    },
    {
      id: "bebas-nilai-e",
      title: "Bebas Nilai E & Maksimal 1 Nilai D",
      desc: "Tidak boleh ada nilai E pada seluruh mata kuliah. Maksimal hanya 1 nilai D pada mata kuliah prodi/fakultas.",
      icon: "AlertTriangle",
      wajib: true
    },
    {
      id: "matkul-khusus",
      title: "Nilai Khusus Metopen & MKU Minimal C",
      desc: "Mata Kuliah Metodologi Penelitian minimal nilai C, dan seluruh Mata Kuliah Universitas (MKU) minimal nilai C.",
      icon: "BookOpen",
      wajib: true
    },
    {
      id: "lpba",
      title: "Lulus LPBA",
      desc: "Telah lulus Lembaga Pentashih Baca Al-Qur'an dan praktik Sholat (LPBA).",
      icon: "BookmarkCheck",
      wajib: true
    },
    {
      id: "aaept",
      title: "Skor AAEPT Minimal 450",
      desc: "Telah lulus tes kemampuan bahasa Inggris Alma Ata English Proficiency Test (AAEPT) dengan skor minimal 450.",
      icon: "Languages",
      wajib: true
    },
    {
      id: "permata",
      title: "Sertifikat PERMATA",
      desc: "Telah mengikuti Pesona Rangkaian Masa Ta'aruf (PERMATA) yang dibuktikan dengan sertifikat resmi.",
      icon: "FileBadge",
      wajib: true
    },
    {
      id: "audiens-sempro",
      title: "Menghadiri Minimal 5x Sempro Teman",
      desc: "Wajib telah mengikuti/menjadi audiens minimal 5 kali seminar proposal skripsi mahasiswa lain sebelum mendaftar sempro sendiri.",
      icon: "Users",
      wajib: true
    },
    {
      id: "plagiasi",
      title: "Uji Turnitin Maksimal 20%",
      desc: "Tingkat similaritas uji bebas plagiarisme pada proposal dan laporan akhir maksimal ≤ 20%.",
      icon: "ShieldCheck",
      wajib: true
    }
  ],

  formatPenulisan: {
    kertas: "A4 (210 x 297 mm) HVS putih 80 gr/m², dicetak tidak bolak-balik",
    margin: {
      kiri: "4 cm",
      atas: "4 cm",
      kanan: "3 cm",
      bawah: "3 cm"
    },
    font: {
      jenis: "Times New Roman",
      ukuran: "12 pt (teks utama), 10 pt (abstrak), judul disesuaikan",
      spasi: "2.0 (Double Space) untuk teks narasi, spasi 1.0 khusus untuk Abstrak",
      paragraf: "Awal alinea menjorok (first line indent) sejauh 1 cm (10 mm)",
      jarakJudulBab: "Jarak antara judul bab dan awal kalimat teks adalah 3 spasi"
    },
    aturanKhusus: [
      "DILARANG menggunakan bullet points (simbol -, •, bintang) di dalam narasi skripsi. Wajib menggunakan penomoran bertingkat dengan angka arab atau huruf (1, 2 atau a, b).",
      "Tidak diperkenankan menggunakan kata ganti orang pertama (aku, saya, kami, kita). Gunakan kalimat pasif formal.",
      "Istilah asing (bahasa Inggris atau istilah lokal) wajib dicetak miring (italic) secara konsisten.",
      "Kata hubung 'maka', 'sehingga', 'sedangkan' TIDAK BOLEH diletakkan di awal kalimat.",
      "Simbol matematika atau rumus tidak diperkenankan berada di awal kalimat.",
      "Warna hardcover laporan akhir skripsi adalah BIRU LAUT dengan tulisan tinta emas."
    ],
    penomoranHalaman: {
      bagianAwal: "Romawi kecil (i, ii, iii) di tengah bagian bawah halaman (dari cover dalam s/d daftar lampiran).",
      bagianIsi: "Angka Arab (1, 2, 3) di sudut kanan atas. Khusus untuk halaman yang memuat JUDUL BAB baru, nomor diletakkan di tengah bawah."
    }
  },

  sistematikaProposal: [
    {
      bab: "BAB I: PENDAHULUAN",
      subbab: [
        "1.1 Latar Belakang (Fenomena/masalah riil, urgensi, gap penelitian)",
        "1.2 Rumusan Masalah (Pertanyaan penelitian yang jelas dan terukur)",
        "1.3 Batasan Masalah (Scope implementasi software/hardware)",
        "1.4 Maksud dan Tujuan Penelitian",
        "1.5 Manfaat Penelitian (Bagi akademisi, mitra/tempat studi kasus, dan mahasiswa)"
      ]
    },
    {
      bab: "BAB II: TINJAUAN PUSTAKA & DASAR TEORI",
      subbab: [
        "2.1 Tinjauan Pustaka (Review 5-10 penelitian terdahulu yang relevan)",
        "2.2 Landasan Teori (Teori konsep, algoritma, framework, atau teknologi yang dipakai)",
        "2.3 Kerangka Pikir / Hipotesis (jika ada)"
      ]
    },
    {
      bab: "BAB III: METODOLOGI PENELITIAN",
      subbab: [
        "3.1 Objek & Waktu Penelitian",
        "3.2 Bahan dan Alat (Hardware, Software, Dataset)",
        "3.3 Alur / Tahapan Penelitian (Flowchart penelitian)",
        "3.4 Metode Pengumpulan Data (Observasi, Wawancara, Studi Literatur)",
        "3.5 Metode Pengembangan Sistem (SDLC: Waterfall, Agile, Scrum, atau CRISP-DM)",
        "3.6 Jadwal Rencana Penelitian"
      ]
    }
  ],

  alurSempro: [
    {
      step: 1,
      title: "Persetujuan Pembimbing (ACC)",
      desc: "Menyelesaikan draf Proposal Bab 1-3 dan mendapatkan tanda tangan ACC dari Dosen Pembimbing pada lembar persetujuan."
    },
    {
      step: 2,
      title: "Pendaftaran Akademik (H-3)",
      desc: "Mendaftar di bagian akademik fakultas selambat-lambatnya 3 hari sebelum pelaksanaan dengan menyerahkan berkas: FC KTM, FC KRS aktif, Bukti lulus 75% SKS, 1 FC proposal, bukti hadir 5x sempro, dan form persetujuan."
    },
    {
      step: 3,
      title: "Persiapan Ruangan & Audiens",
      desc: "Memastikan dihadiri minimal 5 mahasiswa audiens (minimal semester 4). Berpakaian rapi: jas almamater, kemeja cerah, bawahan bahan gelap (bukan jeans), dan sepatu tertutup."
    },
    {
      step: 4,
      title: "Pelaksanaan Presentasi (20 Menit)",
      desc: "Presentasi materi proposal menggunakan slide PPT fokus pada masalah, metode, dan rencana implementasi, dilanjutkan sesi evaluasi/tanya jawab penguji."
    },
    {
      step: 5,
      title: "Revisi & Pengesahan",
      desc: "Menyelesaikan revisi sesuai masukan dosen, meminta pengesahan dospem, dan menyerahkan berkas perbaikan ke prodi untuk mulai riset skripsi."
    }
  ],

  formulirDanLampiran: [
    { kode: "FKT.SPI.01", nama: "Formulir Pengajuan Judul Skripsi dan Proposal", kegunaan: "Tahap awal saat mengajukan judul ke prodi" },
    { kode: "FKT.SPI.02", nama: "Formulir Penggantian Judul Skripsi", kegunaan: "Jika terjadi perubahan arah riset atas saran dospem" },
    { kode: "FKT.SPI.03", nama: "Formulir Penerimaan Judul Skripsi dan Proposal", kegunaan: "Bukti judul diterima oleh koordinator skripsi/KPS" },
    { kode: "FKT.SPI.04", nama: "Formulir Kartu Bimbingan Proposal", kegunaan: "Log catatan bimbingan dengan dosen pembimbing (min. bimbingan)" },
    { kode: "FKT.SPI.05", nama: "Formulir Kartu Bimbingan Skripsi", kegunaan: "Log bimbingan tahap penelitian Bab 4 dan Bab 5" },
    { kode: "Lampiran 15", nama: "Surat Keterangan Bebas Plagiarisme", kegunaan: "Bukti lolos cek Turnitin ≤ 20% dari perpustakaan/fakultas" },
    { kode: "Lampiran 12", nama: "Surat Pernyataan Keaslian Penelitian", kegunaan: "Bermaterai Rp10.000 menyatakan karya asli bukan joki/plagiat" }
  ]
};
