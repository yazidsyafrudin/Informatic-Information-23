// Data Resmi 33 Mahasiswa Aktif Informatika Angkatan 2023 Universitas Alma Ata
// Sumber: Dokumen Resmi Angkatan IF23 UAA (Diperbarui setelah konfirmasi mahasiswa yang tidak melanjutkan studi)

export const MAHASISWA_IF23_LIST = [
  { no: 1, nim: "233200262", nama: "Fajar Maulana" },
  { no: 2, nim: "233200263", nama: "Jehan Tri Khoerota" },
  { no: 3, nim: "233200264", nama: "Harlin Aprilianto" },
  { no: 4, nim: "233200265", nama: "Adinda Lestari" },
  { no: 5, nim: "233200266", nama: "Afif Sahli Buton" },
  { no: 6, nim: "233200267", nama: "Afrizal Balya" },
  { no: 7, nim: "233200269", nama: "Ahmad Safiq Masrur" },
  { no: 8, nim: "233200270", nama: "Alim Cipta Primantara" },
  { no: 9, nim: "233200271", nama: "Andre" },
  { no: 10, nim: "233200272", nama: "Ani Roihatul Janah" },
  { no: 11, nim: "233200273", nama: "Azriel Hardiyan" },
  { no: 12, nim: "233200274", nama: "Deanova Bagas Prasetya" },
  { no: 13, nim: "233200275", nama: "Dimas Angga Andreanto" },
  { no: 14, nim: "233200276", nama: "Eksanda Naufal Fikri" },
  { no: 15, nim: "233200277", nama: "Fahrul Ikhsan Fudhori" },
  { no: 16, nim: "233200278", nama: "Faiz Faturrahman" },
  { no: 17, nim: "233200279", nama: "Fajar Arrohman" },
  { no: 18, nim: "233200281", nama: "Haris Nur Ridlo" },
  { no: 19, nim: "233200283", nama: "Jaka Bangkit Sembada" },
  { no: 20, nim: "233200284", nama: "Kholil Mustofa" },
  { no: 21, nim: "233200285", nama: "Malik Ragil Syaputra" },
  { no: 22, nim: "233200287", nama: "Muhamad Alifian Noval Ramadan" },
  { no: 23, nim: "233200288", nama: "Muhamad Rifki Inisaputra" },
  { no: 24, nim: "233200290", nama: "Muhammad Khoerul Habibi" },
  { no: 25, nim: "233200291", nama: "Nada Aprilia" },
  { no: 26, nim: "233200292", nama: "Nur Fauziatun Nazla" },
  { no: 27, nim: "233200293", nama: "Raihandika Abiyyu Tsabit Halim" },
  { no: 28, nim: "233200294", nama: "Ripal Pratama" },
  { no: 29, nim: "233200295", nama: "Salma Laila Khoirunnisa" },
  { no: 30, nim: "233200296", nama: "Syahrul Gunawan" },
  { no: 31, nim: "233200297", nama: "Ujang Muamar" },
  { no: 32, nim: "233200298", nama: "Vina Salsabila" },
  { no: 33, nim: "233200299", nama: "Yazid Syafrudin" }
];

// Cari data mahasiswa IF23 berdasarkan NIM atau kecocokan Email/Nama
export function findMahasiswaIf23(query) {
  if (!query) return null;
  const cleaned = String(query).trim().toLowerCase();
  
  // Cek kecocokan NIM persis
  const byNim = MAHASISWA_IF23_LIST.find(m => m.nim === cleaned);
  if (byNim) return byNim;

  // Cek jika query mengandung NIM (misal dari email 233200299@almaata.ac.id)
  const nimMatch = cleaned.match(/233200\d{3}/);
  if (nimMatch) {
    const found = MAHASISWA_IF23_LIST.find(m => m.nim === nimMatch[0]);
    if (found) return found;
  }

  // Cek kecocokan Nama Lengkap
  const byName = MAHASISWA_IF23_LIST.find(m => m.nama.toLowerCase() === cleaned);
  if (byName) return byName;

  return null;
}

// Deteksi otomatis peran pengguna
export function detectUserRole({ nim = '', email = '', selectedRole = null }) {
  // Jika secara eksplisit dipilih di form daftar
  if (selectedRole) {
    return selectedRole;
  }

  // 1. Cek apakah NIM terdaftar di Mahasiswa Informatika 23
  if (nim && findMahasiswaIf23(nim)) {
    return "Mahasiswa Informatika 23";
  }

  // 2. Cek apakah Email mengandung NIM mahasiswa IF23
  if (email && findMahasiswaIf23(email)) {
    return "Mahasiswa Informatika 23";
  }

  // 3. Cek apakah domain email dari Alma Ata
  if (email && email.toLowerCase().includes('almaata.ac.id')) {
    return "Mahasiswa Alma Ata";
  }

  // 4. Default: Tamu / Umum
  return "Umum / Pengunjung";
}
