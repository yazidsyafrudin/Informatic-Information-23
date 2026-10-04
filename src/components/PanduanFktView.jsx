import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Layers, 
  Layout, 
  FileCheck2,
  AlertCircle,
  ShieldAlert,
  Clock,
  Send,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  FileText,
  Briefcase,
  CheckCircle2,
  CalendarCheck,
  Award,
  Star,
  Video,
  Share2,
  MessageCircle
} from 'lucide-react';
import { PANDUAN_FKT } from '../data/panduanFKT';

export default function PanduanFktView() {
  const [activeSection, setActiveSection] = useState('syarat');

  return (
    <div className="space-y-8 animate-fadeIn font-instrument">
      
      {/* Header Banner Card - Solid Blue UAA */}
      <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-accent mb-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider font-instrument text-accent">
              {PANDUAN_FKT.fakultas} • {PANDUAN_FKT.universitas}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-philosopher text-white">
            Ringkasan Buku Panduan Skripsi FKT
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
            Intisari dari 50 halaman buku panduan resmi (SK Rektor No: {PANDUAN_FKT.skRektor}) 
            serta Surat Edaran Dekan FSET No. 002/2026 tentang Ethical Clearance (EC) agar mahasiswa Informatika 23 siap tuntas skripsi.
          </p>
        </div>

        <a
          href="/panduan-skripsi-fkt-almaata.pdf"
          download="Buku_Panduan_Skripsi_FKT_Alma_Ata.pdf"
          className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-md shadow-accent/25 transition-all self-start md:self-auto flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF Asli (50 Hal)</span>
        </a>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-primary-200 pb-3">
        {[
          { id: 'syarat', label: '1. Persyaratan Akademik', icon: FileCheck2 },
          { id: 'format', label: '2. Format Naskah (Margin 4-4-3-3)', icon: Layout },
          { id: 'sistematika', label: '3. Sistematika Bab 1–3', icon: Layers },
          { id: 'sempro', label: '4. Aturan Sempro & Audiens', icon: AlertCircle },
          { id: 'ec', label: '5. Ethical Clearance (EC) & SE Dekan', icon: ShieldAlert },
          { id: 'magang', label: '6. Panduan Magang (KKL) Sem 7', icon: Briefcase },
          { id: 'spm', label: '7. Skor Prestasi Mahasiswa (SPM)', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:text-primary hover:bg-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="font-philosopher text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: PERSYARATAN AKADEMIK */}
      {activeSection === 'syarat' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PANDUAN_FKT.persyaratanAkademik.map((item, idx) => (
              <div key={item.id} className="bg-primary text-white p-5 rounded-2xl border-2 border-primary-700 hover:border-accent shadow-md transition-all">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-white text-primary flex items-center justify-center text-xs font-bold font-mono shadow-xs">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-white text-sm font-instrument">{item.title}</h3>
                </div>
                <p className="text-xs text-white/90 leading-relaxed pl-10 font-instrument">
                  {item.desc}
                </p>
                {item.downloadUrl && (
                  <div className="pl-10 mt-3">
                    <a
                      href={item.downloadUrl}
                      download="Formulir-Mahasiswa-Mengikuti-Seminar-Proposal-en.docx"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-accent hover:bg-amber-600 text-white font-bold text-[11px] shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{item.downloadLabel || 'Download Form'}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-200 text-xs text-amber-950 flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-accent font-bold block mb-0.5">Penting Diingat Mengenai Dosen Pembimbing:</strong>
              Sesuai panduan FKT Bab II Bagian b, 1 dosen pembimbing prodi hanya membimbing maksimal 6 mahasiswa per periode. 
              Segera ajukan draf judul dan komunikasi dengan calon dospem agar kuota bimbingan tidak penuh!
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: FORMAT PENULISAN & MARGIN */}
      {activeSection === 'format' && (
        <div className="space-y-6">
          
          {/* Visual Margin Simulation Card */}
          <div className="bg-gradient-to-br from-sky-50/60 via-white to-sky-50/80 rounded-3xl p-6 sm:p-8 border-2 border-sky-200/90 shadow-sm">
            <h2 className="text-xl font-bold font-philosopher text-primary mb-2">
              Aturan Tata Letak Halaman (Margin 4-4-3-3)
            </h2>
            <p className="text-xs text-slate-600 mb-6">
              Kertas A4 HVS 80 gram standar. Pastikan di Microsoft Word atau Google Docs margins diatur tepat:
            </p>

            <div className="max-w-md mx-auto relative bg-white border-2 border-dashed border-sky-300 rounded-3xl p-8 text-center shadow-xs">
              {/* Margin Labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-white bg-primary px-3 py-0.5 rounded-full shadow-2xs">
                Atas: 4 cm
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-white bg-primary px-3 py-0.5 rounded-full shadow-2xs">
                Bawah: 3 cm
              </div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-white bg-primary px-3 py-0.5 rounded-full shadow-2xs -rotate-90">
                Kiri: 4 cm (Jilid)
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-white bg-primary px-3 py-0.5 rounded-full shadow-2xs rotate-90">
                Kanan: 3 cm
              </div>

              {/* Mock Page Content */}
              <div className="bg-sky-50/50 border-2 border-sky-100 rounded-2xl p-6 my-4 text-left shadow-2xs">
                <p className="text-center font-bold text-xs text-primary uppercase tracking-wider mb-2 font-serif">
                  BAB I PENDAHULUAN
                </p>
                <p className="text-[10px] text-slate-600 indent-6 leading-relaxed mb-2 font-serif">
                  1.1 Latar Belakang Masalah. Perkembangan teknologi informasi saat ini bergerak sangat cepat dan menuntut digitalisasi sistem...
                </p>
                <div className="text-[10px] text-amber-950 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-instrument">
                  ⚠️ Dilarang memakai bullet points di teks! Wajib penomoran bertingkat 1, 2 atau a, b.
                </div>
              </div>
            </div>
          </div>

          {/* Table of Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border-2 border-sky-100 shadow-xs space-y-3">
              <h3 className="font-bold text-primary font-philosopher text-base">Spesifikasi Tipografi & Spasi</h3>
              <ul className="text-xs space-y-2 text-slate-600 font-instrument">
                <li>• <strong>Font:</strong> Times New Roman ukuran 12 pt.</li>
                <li>• <strong>Spasi:</strong> 2.0 (Double), khusus Abstrak menggunakan spasi 1.0 (10 pt).</li>
                <li>• <strong>Alinea:</strong> Menjorok 1 cm (10 mm) pada awal paragraf.</li>
                <li>• <strong>Jarak Judul Bab:</strong> 3 spasi dari judul bab ke teks pertama.</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-sky-100 shadow-xs space-y-3">
              <h3 className="font-bold text-primary font-philosopher text-base">Aturan Larangan & Bahasa</h3>
              <ul className="text-xs space-y-2 text-slate-600 font-instrument">
                <li>• <strong>Anti Bullet:</strong> Jangan gunakan tanda `-` atau bullet di dalam narasi.</li>
                <li>• <strong>Kata Ganti:</strong> Hindari 'saya', 'kami', gunakan kalimat pasif.</li>
                <li>• <strong>Istilah Asing:</strong> Wajib dicetak miring (<em>italic</em>).</li>
                <li>• <strong>Sampul Akhir:</strong> Hardcover warna <strong>Biru Laut</strong> tulisan emas.</li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 3: SISTEMATIKA PROPOSAL */}
      {activeSection === 'sistematika' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 text-xs text-primary font-instrument">
            Berikut struktur baku draf <strong>Proposal Skripsi (Bab 1 s/d Bab 3)</strong> yang wajib diselesaikan 
            sebelum maju Seminar Proposal Bersama di bulan Januari:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PANDUAN_FKT.sistematikaProposal.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-sky-50/50 via-white to-sky-50/70 p-6 rounded-3xl border-2 border-sky-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="px-3 py-1 rounded-xl bg-primary text-white font-philosopher text-sm font-bold inline-block mb-3 shadow-2xs">
                    {item.bab}
                  </div>
                  <div className="space-y-2">
                    {item.subbab.map((sub, sIdx) => (
                      <div key={sIdx} className="text-xs text-slate-700 p-2.5 rounded-xl bg-white border border-sky-100 font-instrument shadow-2xs">
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: ATURAN SEMPRO & AUDIENS */}
      {activeSection === 'sempro' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-sky-50/60 via-white to-sky-50/80 rounded-3xl p-6 sm:p-8 border-2 border-sky-200/90 shadow-sm">
            <h2 className="text-xl font-bold font-philosopher text-primary mb-4">
              Prosedur Seminar Proposal (Bab 7.2 Panduan FKT)
            </h2>
            <div className="space-y-4">
              {PANDUAN_FKT.alurSempro.map((step) => (
                <div key={step.step} className="flex items-start space-x-4 p-4 rounded-2xl bg-white border-2 border-sky-100 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs font-philosopher">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm font-instrument">{step.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-instrument">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-sky-100 shadow-xs">
            <h3 className="font-bold text-primary font-philosopher text-base mb-3">Ketentuan Pakaian & Audiens Saat Sempro</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 font-instrument">
              <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-100">
                <span className="font-bold text-primary block mb-1">Dresscode Sempro:</span>
                Jas almamater Universitas Alma Ata, atasan kemeja berwarna cerah, celana kain gelap (putra) / rok panjang kain gelap (putri), tidak boleh memakai jeans, bersepatu pantofel/tertutup gelap.
              </div>
              <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-100">
                <span className="font-bold text-accent block mb-1">Syarat Audiens:</span>
                Wajib dihadiri sekurang-kurangnya 5 mahasiswa (minimal semester 4). Saling hadir dan dukung teman angkatan 23 saat maju sempro!
              </div>
            </div>
          </div>

          {/* Card Download Template Formulir TTD Kehadiran Sempro (FKOM.SPI.05) */}
          <div className="bg-gradient-to-r from-primary via-primary-800 to-slate-900 text-white p-6 sm:p-7 rounded-3xl border-2 border-primary-700 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-[11px] font-bold uppercase tracking-wider font-instrument">
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Kode Formulir: FKOM.SPI.05</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-philosopher text-white">
                  Formulir Presensi / Bukti TTD Kehadiran Sempro
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-instrument">
                  Format dokumen resmi Microsoft Word (<strong>Student Attendance at the Proposal Seminar</strong>) dari Fakultas Komputer & Teknik. Digunakan untuk mencatat kehadiran sebagai audiens sempro. Kumpulkan minimal <strong>5 tanda tangan Ketua Dewan Penguji</strong> sebelum kamu mendaftar sempro skripsimu sendiri.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-white/80 font-instrument">
                  <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Nama Mahasiswa yang Diuji</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Judul Proposal Skripsi/KTI</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>TTD Ketua Dewan Penguji</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <a
                  href="/Formulir-Mahasiswa-Mengikuti-Seminar-Proposal-en.docx"
                  download="Formulir-Mahasiswa-Mengikuti-Seminar-Proposal-en.docx"
                  className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-accent hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-accent/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap font-instrument cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Form Word (.docx)</span>
                </a>
                <span className="text-[10px] text-center text-white/70 font-instrument">
                  Format Word Siap Cetak • 38 KB
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: ETHICAL CLEARANCE (EC) & SURAT EDARAN DEKAN */}
      {activeSection === 'ec' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Box Surat Edaran Dekan - Wajib Jeda 3 Bulan */}
          <div className="bg-gradient-to-r from-red-600 via-rose-700 to-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-red-500 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                  <ShieldAlert className="w-4 h-4 text-amber-300" />
                  <span>Surat Edaran Dekan FSET No. {PANDUAN_FKT.ethicalClearance.suratEdaran.nomor}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-philosopher text-white leading-tight">
                  Wajib Jeda Waktu Minimal 3 Bulan Kalender!
                </h2>
                <p className="text-xs sm:text-sm text-white/95 leading-relaxed max-w-3xl">
                  {PANDUAN_FKT.ethicalClearance.suratEdaran.aturanKunci}
                </p>
                
                <div className="bg-black/30 border border-white/20 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Sanksi Keras:</span>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed font-instrument">
                    {PANDUAN_FKT.ethicalClearance.suratEdaran.sanksi}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0 self-start md:self-auto">
                <a
                  href="/surat-edaran-dekan-ec.pdf"
                  download="Surat_Edaran_Dekan_Perihal_EC.pdf"
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white text-red-700 hover:bg-red-50 font-bold text-xs shadow-md transition-all whitespace-nowrap"
                >
                  <Download className="w-4 h-4 text-red-600" />
                  <span>Download Surat Edaran (PDF)</span>
                </a>
                <a
                  href="/alur-pengajuan-ec.pdf"
                  download="Alur_Pengajuan_Ethical_Clearance_UAA.pdf"
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Alur Pengajuan (PDF)</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 text-[11px] text-white/80 flex flex-wrap items-center justify-between gap-2">
              <span>Ditetapkan: {PANDUAN_FKT.ethicalClearance.suratEdaran.tanggal} oleh {PANDUAN_FKT.ethicalClearance.suratEdaran.pejabat}</span>
              <span>{PANDUAN_FKT.ethicalClearance.suratEdaran.jabatan}</span>
            </div>
          </div>

          {/* 6 Alur Langkah Pengajuan EC */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md">
            <div className="mb-6">
              <span className="text-accent font-philosopher font-semibold text-sm">Standar Operasional Prosedur</span>
              <h2 className="text-primary font-philosopher text-2xl sm:text-3xl font-bold">
                6 Tahap Alur Pengajuan Ethical Clearance
              </h2>
              <p className="font-instrument text-slate-600 text-xs sm:text-sm mt-1">
                Komisi Etik Penelitian Universitas Alma Ata (Keluarkan softfile, verifikasi, hingga penerbitan):
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PANDUAN_FKT.ethicalClearance.alurPengajuan.map((step) => (
                <div 
                  key={step.step}
                  className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 shadow-md flex flex-col justify-between hover:border-accent hover:-translate-y-1 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center font-philosopher shadow-xs">
                        {step.step}
                      </span>
                      <span className="text-[10px] text-white/70 font-mono">Tahap {step.step}/6</span>
                    </div>
                    <h3 className="font-bold font-instrument text-white text-sm mb-2">{step.title}</h3>
                    <p className="text-xs text-white/90 leading-relaxed font-instrument">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid: Berkas Persyaratan & Kontak Layanan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Berkas Wajib */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md">
              <div className="flex items-center space-x-2 text-primary mb-4">
                <FileText className="w-5 h-5 text-accent" />
                <h3 className="font-philosopher font-bold text-xl text-primary">Berkas yang Wajib Disiapkan</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4 font-instrument">
                Format softfile PDF lengkap sebelum dikirim ke email komisi etik:
              </p>

              <div className="space-y-3">
                {PANDUAN_FKT.ethicalClearance.persyaratanBerkas.map((berkas, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-instrument">{berkas}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Unduh Template Raising:</span>
                  <span>Formulir Informed Consent, Telaah Awal, & Checklist berkas EC</span>
                </div>
                <a
                  href={PANDUAN_FKT.ethicalClearance.kontak.web}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-accent text-white font-bold text-[11px] flex items-center space-x-1 hover:bg-accent/90"
                >
                  <span>Portal LPPM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Kontak & Lokasi Komisi Etik */}
            <div className="lg:col-span-5 bg-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="font-philosopher font-bold text-xl text-white">Kontak & Lokasi Layanan</h3>
                </div>

                <div className="space-y-3 font-instrument">
                  <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-xs">
                    <div className="flex items-center space-x-2 text-primary text-xs font-bold mb-1">
                      <Mail className="w-4 h-4 text-accent" />
                      <span>Email Pengiriman Berkas:</span>
                    </div>
                    <a href="mailto:komisietik@almaata.ac.id" className="text-sm font-bold text-primary hover:underline block break-all font-mono">
                      komisietik@almaata.ac.id
                    </a>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-xs">
                    <div className="flex items-center space-x-2 text-primary text-xs font-bold mb-1">
                      <Phone className="w-4 h-4 text-accent" />
                      <span>WhatsApp Konfirmasi Admin:</span>
                    </div>
                    <a href="https://wa.me/6285729484269" target="_blank" rel="noreferrer" className="text-sm font-bold text-emerald-700 hover:underline block font-mono">
                      0857-2948-4269
                    </a>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-xs">
                    <div className="flex items-center space-x-2 text-primary text-xs font-bold mb-1">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>Pengambilan Hardfile Surat:</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">
                      Mal Layanan Akademik UAA (bertemu dengan <strong className="text-primary font-bold">Bu Ela</strong>)
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-xs">
                    <div className="flex items-center space-x-2 text-primary text-xs font-bold mb-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>Waktu & Jam Kerja:</span>
                    </div>
                    <p className="text-xs text-slate-700">
                      Senin – Jumat, Jam 08.00 – 16.00 WIB. Proses min. 2 minggu setelah berkas lengkap.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <a
                  href={PANDUAN_FKT.ethicalClearance.kontak.web}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-accent hover:bg-accent/90 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md shadow-accent/20"
                >
                  <span>Buka Web Dokumen Komisi Etik LPPM</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 6: PANDUAN LAPORAN MAGANG (KKL) */}
      {activeSection === 'magang' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header Banner Magang */}
          <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 text-accent text-xs font-bold uppercase tracking-wider mb-2">
                <Briefcase className="w-4 h-4 text-accent" />
                <span>Mata Kuliah Wajib Semester 7 • 3 SKS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-philosopher text-white">
                Panduan Laporan Kuliah Kerja Lapangan (KKL / Magang)
              </h2>
              <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
                Pedoman resmi penyusunan laporan magang mahasiswa S1 Informatika Universitas Alma Ata, 
                format penulisan standar, logbook 16 minggu, serta pengumpulan softcopy ke email prodi.
              </p>
            </div>

            <a
              href="/panduan-laporan-magang-kkl.pdf"
              download="Panduan_Laporan_Magang_KKL_Informatika_UAA.pdf"
              className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-md shadow-accent/25 transition-all self-start md:self-auto flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Panduan Magang</span>
            </a>
          </div>

          {/* Aturan Format Penulisan Laporan */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md">
            <h3 className="font-philosopher font-bold text-xl text-primary mb-4 flex items-center space-x-2">
              <FileCheck2 className="w-5 h-5 text-accent" />
              <span>Format & Ketentuan Penulisan Laporan</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-xs text-slate-500 block font-semibold">Margin Halaman</span>
                <span className="text-base font-bold text-primary font-philosopher">4 - 3 - 3 - 3 cm</span>
                <p className="text-[11px] text-slate-600 mt-1">Kiri 4 cm, Atas 3 cm, Kanan 3 cm, Bawah 3 cm</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-xs text-slate-500 block font-semibold">Tipografi & Spasi</span>
                <span className="text-base font-bold text-primary font-philosopher">TNR 12 (Spasi 1.5)</span>
                <p className="text-[11px] text-slate-600 mt-1">Times New Roman 12 pt, Judul Bab 14 pt Bold</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-xs text-slate-500 block font-semibold">Ketebalan Minimal</span>
                <span className="text-base font-bold text-accent font-philosopher">Minimal 25 Halaman</span>
                <p className="text-[11px] text-slate-600 mt-1">Tidak termasuk cover, pengesahan, & lampiran</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-xs text-slate-500 block font-semibold">Waktu Bimbingan</span>
                <span className="text-base font-bold text-primary font-philosopher">Maksimal 1 Bulan</span>
                <p className="text-[11px] text-slate-600 mt-1">Bimbingan bersama Dosen & Supervisor</p>
              </div>
            </div>

            {/* Email Pengumpulan */}
            <div className="mt-5 p-4 rounded-2xl bg-primary text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider block">Pengumpulan Laporan Softcopy</span>
                <p className="text-xs text-white/90 mt-0.5">
                  Kirimkan softfile PDF laporan magang ke email prodi: <strong className="text-white font-mono">informatika@almaata.ac.id</strong>
                </p>
              </div>
              <div className="bg-white/15 px-3.5 py-2 rounded-xl border border-white/20 text-xs font-mono text-white flex-shrink-0">
                Subject: LaporanKKL_Tahun_Nama
              </div>
            </div>
          </div>

          {/* Sistematika 4 Bab Laporan Magang */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md">
            <h3 className="font-philosopher font-bold text-xl text-primary mb-1">
              Sistematika 4 Bab Isi Laporan Magang
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-instrument">
              Susunan isi naskah laporan KKL dari Bab I sampai Bab IV sesuai buku panduan resmi:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PANDUAN_FKT.panduanMagang.sistematikaBab.map((item, idx) => (
                <div key={idx} className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold font-philosopher">
                        {item.bab}
                      </span>
                      <span className="text-xs text-white/70 font-mono">KKL Informatika</span>
                    </div>
                    <h4 className="font-bold text-white font-philosopher text-base mb-3">{item.judul}</h4>
                    
                    <ul className="space-y-1.5 text-xs text-white/90 font-instrument">
                      {item.subBab.map((sub, sIdx) => (
                        <li key={sIdx} className="flex items-start space-x-2">
                          <span className="text-accent font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ketentuan Logbook Mingguan (1-16) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md">
            <div className="flex items-center space-x-2 text-primary mb-3">
              <CalendarCheck className="w-5 h-5 text-accent" />
              <h3 className="font-philosopher font-bold text-xl text-primary">Ketentuan Logbook Mingguan (Minggu 1 s.d. 16)</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-instrument">
              Format lampiran catatan harian/mingguan yang wajib dilengkapi dan dimintakan persetujuan tempat magang:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-instrument">
              {PANDUAN_FKT.panduanMagang.logbookKetentuan.map((rule, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SECTION 7: SKOR PRESTASI MAHASISWA (SPM) */}
      {activeSection === 'spm' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header Banner SPM */}
          <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 text-accent text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-accent" />
                <span>Direktorat Kemahasiswaan & Prodi Informatika</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-philosopher text-white">
                2 Syarat Wajib Skor Prestasi Mahasiswa (SPM)
              </h2>
              <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
                Ketetapan resmi bagi mahasiswa S1 Informatika: Wajib memenuhi 
                <strong className="text-accent font-bold"> SPM Akademik/Birokrasi (9 Poin) </strong> dan 
                <strong className="text-accent font-bold"> SPM Prodi Informatika (Min. 25 Poin) </strong> 
                sebagai prasyarat Sempro dan Ujian Pendadaran.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 flex-shrink-0">
              <a
                href="/panduan-skor-prestasi-mahasiswa-spm.pdf"
                download="Panduan_Skor_Prestasi_Mahasiswa_SPM_UAA.pdf"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-md shadow-accent/25 transition-all whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Panduan SPM</span>
              </a>
              <a
                href={PANDUAN_FKT.skorPrestasiMahasiswa.kontak.portal}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition-all whitespace-nowrap"
              >
                <span>Buka Web Kemahasiswaan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Rincian 2 Kategori Wajib SPM */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Kategori 1: SPM Akademik / Birokrasi (9 Poin) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
                    Syarat 1 • Wajib Sempro
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs">
                    Total: 9 Poin Wajib
                  </span>
                </div>

                <h3 className="font-philosopher font-bold text-xl text-slate-900 mb-1">
                  1. SPM Akademik / Birokrasi
                </h3>
                <p className="text-xs text-slate-600 mb-4 font-instrument">
                  Dikelola bersama Biro Admisi & Humas universitas. Terdiri dari 3 tugas wajib: Video Medsos (4 Poin), Artikel (4 Poin), dan Google Maps Review Bintang 5 (1 Poin):
                </p>

                <div className="space-y-3">
                  {PANDUAN_FKT.skorPrestasiMahasiswa.duaSyaratWajib.birokrasi.komponen.map((komp, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-slate-900 text-xs font-instrument">{komp.nama}</h4>
                        </div>
                        <span className="text-xs font-bold text-amber-700 bg-amber-200/70 px-2 py-0.5 rounded-md font-mono flex-shrink-0">
                          {komp.poin} Poin
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-instrument pl-7">
                        {komp.deskripsi}
                      </p>
                      <div className="mt-2 pt-2 border-t border-amber-200/60 pl-7 text-[10px] text-slate-500">
                        <strong className="text-slate-700">Bukti: </strong>{komp.bukti}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-instrument">
                <span className="text-slate-600">Output Validasi:</span>
                <span className="font-bold text-slate-900 bg-amber-100 px-3 py-1 rounded-xl">
                  Form Validasi Syarat Perlu (1)
                </span>
              </div>
            </div>

            {/* Kategori 2: SPM Prodi Informatika (Min. 25 Poin) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-primary/20 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-primary text-[11px] font-bold uppercase tracking-wider">
                    Syarat 2 • Wajib Pendadaran
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary text-white font-bold text-xs">
                    Target: Min. 25 Poin
                  </span>
                </div>

                <h3 className="font-philosopher font-bold text-xl text-primary mb-1">
                  2. SPM Prodi Informatika
                </h3>
                <p className="text-xs text-slate-600 mb-4 font-instrument">
                  Divalidasi oleh Kour Kemahasiswaan Prodi Informatika dari aktivitas akademik, organisasi, dan prestasi:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PANDUAN_FKT.skorPrestasiMahasiswa.duaSyaratWajib.prodi.contohKegiatan.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-primary font-instrument block mb-1">
                          {item.kategori}
                        </span>
                        <span className="text-xs font-bold text-accent font-philosopher block mb-1">
                          {item.estimasi}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-instrument border-t border-sky-200/50 pt-1.5 mt-1">
                        <strong className="text-slate-700">Bukti: </strong>{item.bukti}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-instrument">
                <span className="text-slate-600">Output Validasi:</span>
                <span className="font-bold text-primary bg-sky-100 px-3 py-1 rounded-xl">
                  Form Validasi Prestasi (2)
                </span>
              </div>
            </div>

          </div>

          {/* 6 Alur Langkah Pelaporan & Validasi SPM */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md">
            <div className="mb-6">
              <span className="text-accent font-philosopher font-semibold text-sm">Alur Resmi Kemahasiswaan</span>
              <h2 className="text-primary font-philosopher text-2xl sm:text-3xl font-bold">
                6 Langkah Pengajuan & Validasi SPM
              </h2>
              <p className="font-instrument text-slate-600 text-xs sm:text-sm mt-1">
                Alur sistematis untuk memvalidasi SPM Birokrasi (9 Poin) dan SPM Prodi (25 Poin):
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PANDUAN_FKT.skorPrestasiMahasiswa.alurValidasi.map((item) => (
                <div 
                  key={item.step} 
                  className={`bg-primary text-white rounded-2xl p-5 border-2 shadow-md flex flex-col justify-between hover:-translate-y-1 transition-all ${
                    item.step === 2 
                      ? 'border-emerald-400 ring-2 ring-emerald-400/20' 
                      : 'border-primary-700 hover:border-accent'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center font-philosopher shadow-xs ${
                        item.step === 2 ? 'bg-emerald-500 text-white' : 'bg-accent text-white'
                      }`}>
                        {item.step}
                      </span>
                      <div className="flex items-center space-x-1.5">
                        {item.highlight && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                            {item.highlight}
                          </span>
                        )}
                        <span className="text-[10px] text-white/70 font-mono">Tahap {item.step}/6</span>
                      </div>
                    </div>
                    <h3 className="font-bold font-instrument text-white text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-white/90 leading-relaxed font-instrument mb-3">{item.desc}</p>
                    {item.catatan && (
                      <p className="text-[11px] text-accent/90 italic font-instrument mb-3 border-l-2 border-accent pl-2">
                        {item.catatan}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 mt-2">
                    {item.downloadLink && (
                      <a
                        href={item.downloadLink}
                        download="Panduan_Skor_Prestasi_Mahasiswa_SPM_UAA.pdf"
                        className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh Panduan SPM</span>
                      </a>
                    )}

                    {item.waGroup && (
                      <a
                        href={item.waGroup}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-md shadow-emerald-950/20"
                      >
                        <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                        <span>Join Grup WA Pendampingan Konten</span>
                      </a>
                    )}

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-white text-primary font-bold text-xs hover:bg-sky-50 transition-all shadow-xs"
                      >
                        <span>{item.step === 2 ? 'Alternatif: Tautan bit.ly/klinik-konten-spm' : 'Buka Form / Web Resmi'}</span>
                        <ExternalLink className="w-3 h-3 text-accent" />
                      </a>
                    )}

                    {item.kontak && (
                      <a
                        href={`https://wa.me/${item.kontak.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-all shadow-xs"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Chat Admin Kemahasiswaan ({item.kontak})</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
