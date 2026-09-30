import React from 'react';
import { 
  DownloadCloud, 
  FileText, 
  FileCheck, 
  FileSpreadsheet, 
  ExternalLink, 
  Check, 
  Download,
  FolderDown
} from 'lucide-react';
import { PANDUAN_FKT } from '../data/panduanFKT';

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
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center space-x-2 text-alma-400 mb-2">
          <FolderDown className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Repository Berkas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Pusat Unduhan & Formulir Skripsi
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Unduh dokumen panduan PDF asli serta akses formulir administrasi resmi FKT Alma Ata 
          agar kamu tidak perlu repot mencari berkas saat pendaftaran judul dan sempro.
        </p>
      </div>

      {/* Grid of Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {downloadItems.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              item.isPrimary
                ? 'bg-gradient-to-br from-alma-950/70 via-slate-900 to-indigo-950/70 border-alma-500/50 shadow-xl shadow-alma-950/30'
                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-alma-300 border border-slate-700">
                  {item.code}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {item.category}
                </span>
              </div>

              <h3 className="font-bold text-white text-sm sm:text-base mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {item.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              {item.isPrimary ? (
                <a
                  href={item.href}
                  download={item.fileName}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-alma-600 hover:bg-alma-500 text-white font-bold text-xs shadow-md shadow-alma-600/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Sekarang (3.6 MB)</span>
                </a>
              ) : (
                <div className="flex items-center justify-between w-full text-xs text-slate-400">
                  <span className="italic text-[11px]">{item.note}</span>
                  <a
                    href="/panduan-skripsi-fkt-almaata.pdf"
                    className="text-alma-400 hover:text-alma-300 font-semibold flex items-center space-x-1"
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
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <h3 className="font-bold text-white text-sm mb-1">Alamat Penyerahan Berkas Fisik:</h3>
        <p>
          Bagian Administrasi Akademik Fakultas Komputer dan Teknik (FKT), Gedung Utama Lantai 2, Universitas Alma Ata Yogyakarta.
          Pastikan pengumpulan berkas pendaftaran seminar proposal dilakukan minimal <strong>H-3 hari kerja</strong> sebelum jadwal seminar.
        </p>
      </div>
    </div>
  );
}
