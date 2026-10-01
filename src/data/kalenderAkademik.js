// Data Resmi Kalender Akademik Universitas Alma Ata Tahun Akademik 2026/2027
// Sumber: SK Rektor Nomor 216/A/SK/UAA/VII/2026 tanggal 16 Juli 2026

export const KALENDER_METADATA = {
  nomorSK: "216/A/SK/UAA/VII/2026",
  tanggalSK: "16 Juli 2026",
  tentang: "Kalender Akademik dan Hari Libur Universitas Alma Ata Tahun 2026/2027",
  rektor: "Prof. Dr. H. Hamam Hadi, MS., Sc.D., Sp.GK.",
  pdfUrl: "/kalender-akademik-2026-2027.pdf"
};

export const JADWAL_YUDISIUM_WISUDA = [
  {
    tahap: "Tahap I (Ganjil)",
    batasPendadaran: "28 Agustus 2026",
    yudisium: "11 September 2026 (Jumat)",
    wisuda: "02 Desember 2026 (Rabu)",
    keterangan: "Wisuda Tahap I TA 2026/2027 kuota 250 peserta"
  },
  {
    tahap: "Tahap II (Ganjil)",
    batasPendadaran: "23 Oktober 2026",
    yudisium: "06 November 2026 (Jumat)",
    wisuda: "31 Maret 2027 (Rabu)",
    keterangan: "Wisuda Tahap II TA 2026/2027 kuota 250 peserta"
  },
  {
    tahap: "Tahap III (Ganjil)",
    batasPendadaran: "29 Januari 2027",
    yudisium: "12 Februari 2027 (Jumat)",
    wisuda: "31 Maret 2027 (Rabu)",
    keterangan: "Wisuda Tahap II TA 2026/2027 kuota 250 peserta"
  },
  {
    tahap: "Tahap IV (Genap)",
    batasPendadaran: "09 April 2027",
    yudisium: "23 April 2027 (Jumat)",
    wisuda: "25 Agustus 2027 (Rabu)",
    keterangan: "Wisuda Tahap III TA 2026/2027 kuota 250 peserta"
  },
  {
    tahap: "Tahap V (Genap)",
    batasPendadaran: "16 Juli 2027",
    yudisium: "30 Juli 2027 (Jumat)",
    wisuda: "25 Agustus 2027 (Rabu)",
    keterangan: "Wisuda Tahap III TA 2026/2027 kuota 250 peserta"
  }
];

export const KALENDER_EVENTS = [
  // SEMESTER GANJIL 2026/2027
  {
    id: 1,
    semester: "ganjil",
    kategori: "Registrasi",
    kegiatan: "Her-Registrasi Mahasiswa",
    mulai: "01 Agustus 2026",
    selesai: "14 Agustus 2026",
    durasi: "2 Minggu",
    highlight: false
  },
  {
    id: 2,
    semester: "ganjil",
    kategori: "KKN",
    kegiatan: "KKN Tematik Periode II Tahun 2026*",
    mulai: "06 Agustus 2026",
    selesai: "02 Oktober 2026",
    durasi: "8 Minggu",
    highlight: false
  },
  {
    id: 3,
    semester: "ganjil",
    kategori: "Akademik",
    kegiatan: "Matrikulasi Mahasiswa Baru",
    mulai: "01 September 2026",
    selesai: "05 September 2026",
    durasi: "5 Hari",
    highlight: false
  },
  {
    id: 4,
    semester: "ganjil",
    kategori: "Akademik",
    kegiatan: "PERMATA (Pengenalan Mahasiswa Baru)",
    mulai: "05 September 2026",
    selesai: "10 September 2026",
    durasi: "5 Hari",
    highlight: false
  },
  {
    id: 5,
    semester: "ganjil",
    kategori: "KRS",
    kegiatan: "KRS Mahasiswa Baru",
    mulai: "01 September 2026",
    selesai: "11 September 2026",
    durasi: "2 Minggu",
    highlight: false
  },
  {
    id: 6,
    semester: "ganjil",
    kategori: "Skripsi",
    kegiatan: "Batas Ujian Pendadaran Terakhir (Yudisium Tahap I)",
    mulai: "-",
    selesai: "28 Agustus 2026",
    durasi: "Deadline",
    highlight: true,
    isCrucial: true
  },
  {
    id: 7,
    semester: "ganjil",
    kategori: "Kelulusan",
    kegiatan: "Yudisium Tahap I TA 2026/2027",
    mulai: "11 September 2026",
    selesai: "11 September 2026",
    durasi: "1 Hari (Jumat)",
    highlight: true,
    isCrucial: true
  },
  {
    id: 8,
    semester: "ganjil",
    kategori: "Perkuliahan",
    kegiatan: "Kuliah Tahap I Mahasiswa Lama",
    mulai: "14 September 2026",
    selesai: "31 Oktober 2026",
    durasi: "7 Minggu",
    highlight: false
  },
  {
    id: 9,
    semester: "ganjil",
    kategori: "Perkuliahan",
    kegiatan: "Kuliah Tahap I Mahasiswa Baru",
    mulai: "16 September 2026",
    selesai: "31 Oktober 2026",
    durasi: "7 Minggu",
    highlight: false
  },
  {
    id: 10,
    semester: "ganjil",
    kategori: "Pelaporan",
    kegiatan: "Cekpoint 1 PDDikti",
    mulai: "-",
    selesai: "16 Oktober 2026",
    durasi: "Deadline",
    highlight: false
  },
  {
    id: 11,
    semester: "ganjil",
    kategori: "Skripsi",
    kegiatan: "Batas Ujian Pendadaran Terakhir (Yudisium Tahap II)",
    mulai: "-",
    selesai: "23 Oktober 2026",
    durasi: "Deadline",
    highlight: true,
    isCrucial: true
  },
  {
    id: 12,
    semester: "ganjil",
    kategori: "Ujian",
    kegiatan: "Ujian Tengah Semester (UTS)",
    mulai: "02 November 2026",
    selesai: "21 November 2026",
    durasi: "3 Minggu",
    highlight: false
  },
  {
    id: 13,
    semester: "ganjil",
    kategori: "Kelulusan",
    kegiatan: "Yudisium Tahap II TA 2026/2027",
    mulai: "06 November 2026",
    selesai: "06 November 2026",
    durasi: "1 Hari (Jumat)",
    highlight: true,
    isCrucial: true
  },
  {
    id: 14,
    semester: "ganjil",
    kategori: "Perkuliahan",
    kegiatan: "Kuliah Tahap II Mahasiswa",
    mulai: "23 November 2026",
    selesai: "09 Januari 2027",
    durasi: "7 Minggu",
    highlight: false
  },
  {
    id: 15,
    semester: "ganjil",
    kategori: "Wisuda",
    kegiatan: "Wisuda Tahap I TA 2026/2027*",
    mulai: "02 Desember 2026",
    selesai: "02 Desember 2026",
    durasi: "1 Hari (Rabu)",
    highlight: true,
    isCrucial: true
  },
  {
    id: 16,
    semester: "ganjil",
    kategori: "KKN",
    kegiatan: "KKN Tematik Periode I Tahun 2027*",
    mulai: "06 Januari 2027",
    selesai: "25 Februari 2027",
    durasi: "8 Minggu",
    highlight: false
  },
  {
    id: 17,
    semester: "ganjil",
    kategori: "Ujian",
    kegiatan: "Ujian Akhir Semester (UAS) Ganjil",
    mulai: "11 Januari 2027",
    selesai: "30 Januari 2027",
    durasi: "3 Minggu",
    highlight: false
  },
  {
    id: 18,
    semester: "ganjil",
    kategori: "Skripsi",
    kegiatan: "Batas Ujian Pendadaran Terakhir (Yudisium Tahap III)",
    mulai: "-",
    selesai: "29 Januari 2027",
    durasi: "Deadline",
    highlight: true,
    isCrucial: true
  },
  {
    id: 19,
    semester: "ganjil",
    kategori: "Nilai",
    kegiatan: "Batas Akhir Pengumpulan Nilai",
    mulai: "-",
    selesai: "05 Februari 2027",
    durasi: "Deadline",
    highlight: false
  },
  {
    id: 20,
    semester: "ganjil",
    kategori: "Remidial",
    kegiatan: "Pelaksanaan Ujian Remidial Ganjil",
    mulai: "08 Februari 2027",
    selesai: "09 Februari 2027",
    durasi: "2 Hari",
    highlight: false
  },
  {
    id: 21,
    semester: "ganjil",
    kategori: "Kelulusan",
    kegiatan: "Yudisium Tahap III TA 2026/2027",
    mulai: "12 Februari 2027",
    selesai: "12 Februari 2027",
    durasi: "1 Hari (Jumat)",
    highlight: true,
    isCrucial: true
  },

  // SEMESTER GENAP 2026/2027
  {
    id: 22,
    semester: "genap",
    kategori: "Registrasi",
    kegiatan: "Her-Registrasi Mahasiswa Genap",
    mulai: "01 Februari 2027",
    selesai: "14 Februari 2027",
    durasi: "2 Minggu",
    highlight: false
  },
  {
    id: 23,
    semester: "genap",
    kategori: "Perkuliahan",
    kegiatan: "Kuliah Tahap I Semester Genap",
    mulai: "15 Februari 2027",
    selesai: "16 April 2027",
    durasi: "7 Minggu",
    highlight: false
  },
  {
    id: 24,
    semester: "genap",
    kategori: "Libur",
    kegiatan: "Libur Idul Fitri 1446 H",
    mulai: "27 Februari 2027",
    selesai: "20 Maret 2027",
    durasi: "3 Minggu",
    highlight: false
  },
  {
    id: 25,
    semester: "genap",
    kategori: "Wisuda",
    kegiatan: "Wisuda Tahap II TA 2026/2027*",
    mulai: "31 Maret 2027",
    selesai: "31 Maret 2027",
    durasi: "1 Hari (Rabu)",
    highlight: true,
    isCrucial: true
  },
  {
    id: 26,
    semester: "genap",
    kategori: "Skripsi",
    kegiatan: "Batas Ujian Pendadaran Terakhir (Yudisium Tahap IV)",
    mulai: "-",
    selesai: "09 April 2027",
    durasi: "Deadline",
    highlight: true,
    isCrucial: true
  },
  {
    id: 27,
    semester: "genap",
    kategori: "Kelulusan",
    kegiatan: "Yudisium Tahap IV TA 2026/2027",
    mulai: "23 April 2027",
    selesai: "23 April 2027",
    durasi: "1 Hari (Jumat)",
    highlight: true,
    isCrucial: true
  },
  {
    id: 28,
    semester: "genap",
    kategori: "Ujian",
    kegiatan: "Ujian Tengah Semester (UTS) Genap",
    mulai: "19 April 2027",
    selesai: "30 April 2027",
    durasi: "2 Minggu",
    highlight: false
  },
  {
    id: 29,
    semester: "genap",
    kategori: "Perkuliahan",
    kegiatan: "Kuliah Tahap II Semester Genap",
    mulai: "03 Mei 2027",
    selesai: "19 Juni 2027",
    durasi: "7 Minggu",
    highlight: false
  },
  {
    id: 30,
    semester: "genap",
    kategori: "Ujian",
    kegiatan: "Ujian Akhir Semester (UAS) Genap",
    mulai: "21 Juni 2027",
    selesai: "03 Juli 2027",
    durasi: "2 Minggu",
    highlight: false
  },
  {
    id: 31,
    semester: "genap",
    kategori: "Nilai",
    kegiatan: "Batas Akhir Pengumpulan Nilai Genap",
    mulai: "-",
    selesai: "09 Juli 2027",
    durasi: "Deadline",
    highlight: false
  },
  {
    id: 32,
    semester: "genap",
    kategori: "Remidial",
    kegiatan: "Pelaksanaan Ujian Remidial Genap",
    mulai: "14 Juli 2027",
    selesai: "16 Juli 2027",
    durasi: "3 Hari",
    highlight: false
  },
  {
    id: 33,
    semester: "genap",
    kategori: "Skripsi",
    kegiatan: "Batas Ujian Pendadaran Terakhir (Yudisium Tahap V)",
    mulai: "-",
    selesai: "16 Juli 2027",
    durasi: "Deadline",
    highlight: true,
    isCrucial: true
  },
  {
    id: 34,
    semester: "genap",
    kategori: "Kelulusan",
    kegiatan: "Yudisium Tahap V TA 2026/2027",
    mulai: "30 Juli 2027",
    selesai: "30 Juli 2027",
    durasi: "1 Hari (Jumat)",
    highlight: true,
    isCrucial: true
  },
  {
    id: 35,
    semester: "genap",
    kategori: "Wisuda",
    kegiatan: "Wisuda Tahap III TA 2026/2027*",
    mulai: "25 Agustus 2027",
    selesai: "25 Agustus 2027",
    durasi: "1 Hari (Rabu)",
    highlight: true,
    isCrucial: true
  },

  // SEMESTER PENDEK 2026/2027
  {
    id: 36,
    semester: "sp",
    kategori: "SP",
    kegiatan: "Pengumuman Semester Pendek (SP)",
    mulai: "-",
    selesai: "26 Juli 2027",
    durasi: "1 Hari",
    highlight: false
  },
  {
    id: 37,
    semester: "sp",
    kategori: "SP",
    kegiatan: "Input KRS Semester Pendek",
    mulai: "-",
    selesai: "28 Juli 2027",
    durasi: "1 Hari",
    highlight: false
  },
  {
    id: 38,
    semester: "sp",
    kategori: "SP",
    kegiatan: "Pelaksanaan Kuliah Semester Pendek",
    mulai: "02 Agustus 2027",
    selesai: "20 Agustus 2027",
    durasi: "3 Minggu",
    highlight: false
  },
  {
    id: 39,
    semester: "sp",
    kategori: "SP",
    kegiatan: "Ujian Semester Pendek",
    mulai: "23 Agustus 2027",
    selesai: "24 Agustus 2027",
    durasi: "2 Hari",
    highlight: false
  }
];

export const HARI_LIBUR_UAA = [
  { peringatan: "HUT RI ke-81", hari: "Senin", tanggal: "17 Agustus 2026" },
  { peringatan: "Maulid Nabi Muhammad SAW & Harlah Alma Ata", hari: "Selasa, Kamis, dan Jumat", tanggal: "25, 27, dan 28 Agustus 2026" },
  { peringatan: "Tahun Baru Masehi 2027", hari: "Jumat", tanggal: "01 Januari 2027" },
  { peringatan: "Isra Mi'raj Nabi Muhammad SAW", hari: "Senin, Selasa", tanggal: "04, 05 Januari 2027" },
  { peringatan: "Awal Ramadhan 1446 H", hari: "-", tanggal: "Mengikuti Ketetapan Pemerintah" },
  { peringatan: "Hari Raya Idul Fitri 1446 H", hari: "3 Pekan", tanggal: "27 Februari – 20 Maret 2027" },
  { peringatan: "Hari Buruh Internasional", hari: "Sabtu", tanggal: "01 Mei 2027" },
  { peringatan: "Hari Raya Idul Adha 1446 H", hari: "Senin, Selasa", tanggal: "17–18 Mei 2027" },
  { peringatan: "Hari Lahir Pancasila", hari: "Selasa", tanggal: "01 Juni 2027" },
  { peringatan: "HUT RI ke-82", hari: "Selasa", tanggal: "17 Agustus 2027" },
  { peringatan: "Maulid Nabi Muhammad SAW & Harlah Alma Ata", hari: "Minggu, Senin, Selasa", tanggal: "15, 16 dan 17 Agustus 2027" }
];
