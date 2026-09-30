import React from 'react';
import { 
  Download,
  FolderDown,
  ExternalLink
} from 'lucide-react';

export default function DownloadsView() {
  const downloadItems = [
    {
      title: "Buku Panduan Skripsi FKT 2021-2025 (PDF 50 Halaman)",
      code: "SK Rektor 182/2021",
      category: "Pedoman Resmi",
      desc: "Dokumen panduan lengkap dari Fakultas Komputer dan Teknik Universitas Alma Ata berisi aturan bab, margin, dan lampiran.",
      href: "/panduan-skripsi-fkt-almaata.pdf",
      fileName: "Buku_Panduan_Skripsi_FKT_Alma_Ata.pdf",
      isPrimary: true
    },
    {
      title: "Formulir Pengajuan Judul Skripsi & Proposal",
      code: "FKT.SPI.01",
      category: "Formulir Prodi",
      desc: "Formulir wajib saat mahasiswa pertama kali mengajukan rencana judul dan calon dospem ke prodi.",
      href: "#",
      note: "Tersedia di Lampiran 1 Buku Panduan"
    },
    {
      title: "Kartu Bimbingan Proposal Skripsi",
      code: "FKT.SPI.04",
      category: "Bimbingan",
      desc: "Lembar log bimbingan mingguan dengan Dosen Pembimbing untuk mencatat arahan revisi Bab 1–3.",
      href: "#",
      note: "Tersedia di Lampiran 10 Buku Panduan"
    },
    {
      title: "Kartu Bimbingan Skripsi Akhir",
      code: "FKT.SPI.05",
      category: "Bimbingan",
      desc: "Lembar log bimbingan tahap penelitian lanjutan, pembuatan sistem, dan penulisan Bab 4 & 5.",
      href: "#",
      note: "Tersedia di Lampiran 11 Buku Panduan"
    },
    {
      title: "Formulir Persetujuan Seminar Proposal",
      code: "Lampiran 4",
      category: "Pendaftaran Sempro",
      desc: "Tanda tangan ACC persetujuan dari Dosen Pembimbing bahwa draf proposal sudah siap diuji.",
      href: "#",
      note: "Wajib dilampirkan H-3 pendaftaran sempro"
    },
    {
      title: "Surat Keterangan Bebas Plagiarisme (Turnitin ≤ 20%)",
      code: "Lampiran 15",
      category: "Turnitin",
      desc: "Format surat keterangan lolos uji similaritas maksimal 20% dari perpustakaan universitas.",
      href: "#",
      note: "Tersedia di Lampiran 15 Buku Panduan"
    },
    {
      title: "Surat Pernyataan Keaslian Penelitian (Bermaterai)",
      code: "Lampiran 12",
      category: "Etika Riset",
      desc: "Surat pernyataan bermaterai Rp10.000 bahwa penelitian adalah karya orisinal bukan plagiat.",
      href: "#",
      note: "Tersedia di Lampiran 12 Buku Panduan"
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn font-instrument">
      {/* Header - Solid Blue UAA */}
      <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-xl">
        <div className="flex items-center space-x-2 text-accent mb-2">
          <FolderDown className="w-5 h-5 text-accent" />
          <span className="text-xs font-bold uppercase tracking-wider font-instrument text-accent">Repository Berkas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-philosopher text-white">
          Pusat Unduhan & Formulir Skripsi
        </h1>
        <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed font-instrument">
          Unduh dokumen panduan PDF asli serta akses formulir administrasi resmi FKT Alma Ata 
          agar kamu tidak perlu repot mencari berkas saat pendaftaran judul dan sempro.
        </p>
      </div>

      {/* Grid of Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {downloadItems.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between ${
              item.isPrimary
                ? 'bg-primary text-white border-primary-700 shadow-md'
                : 'bg-white border-slate-200 hover:border-primary/50 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  item.isPrimary
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'bg-primary/10 text-primary border border-primary/20'
                }`}>
                  {item.code}
                </span>
                <span className={`text-[11px] font-bold font-instrument ${
                  item.isPrimary ? 'text-accent' : 'text-slate-500'
                }`}>
                  {item.category}
                </span>
              </div>

              <h3 className={`font-bold text-sm sm:text-base mb-1 font-instrument ${
                item.isPrimary ? 'text-white' : 'text-slate-800'
              }`}>
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-4 font-instrument ${
                item.isPrimary ? 'text-white/90' : 'text-slate-600'
              }`}>
                {item.desc}
              </p>
            </div>

            <div className={`pt-3 border-t flex items-center justify-between ${
              item.isPrimary ? 'border-white/20' : 'border-slate-100'
            }`}>
              {item.isPrimary ? (
                <a
                  href={item.href}
                  download={item.fileName}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-md shadow-accent/25 transition-colors font-instrument"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Sekarang (3.6 MB)</span>
                </a>
              ) : (
                <div className="flex items-center justify-between w-full text-xs text-slate-500 font-instrument">
                  <span className="italic text-[11px]">{item.note}</span>
                  <a
                    href="/panduan-skripsi-fkt-almaata.pdf"
                    className="text-primary hover:text-primary/80 font-bold flex items-center space-x-1"
                  >
                    <span>Buka di PDF</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Box Info Kontak & Ruang Akademik */}
      <div className="p-6 rounded-3xl bg-white border-2 border-sky-100 text-xs text-slate-600 shadow-xs font-instrument">
        <h3 className="font-bold text-primary font-philosopher text-base mb-1">
          Alamat Penyerahan Berkas Fisik:
        </h3>
        <p className="leading-relaxed">
          Bagian Administrasi Akademik Fakultas Sains, Rekayasa dan Teknologi (d/h FKT), Gedung Utama Lantai 2, Universitas Alma Ata Yogyakarta.
          Pastikan pengumpulan berkas pendaftaran seminar proposal dilakukan minimal <strong>H-3 hari kerja</strong> sebelum jadwal seminar.
        </p>
      </div>
    </div>
  );
}
