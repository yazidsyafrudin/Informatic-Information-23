import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Layers, 
  Layout, 
  FileCheck2,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { PANDUAN_FKT } from '../data/panduanFKT';

export default function PanduanFktView() {
  const [activeSection, setActiveSection] = useState('syarat');

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-alma-600 mb-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {PANDUAN_FKT.fakultas} • {PANDUAN_FKT.universitas}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Ringkasan Buku Panduan Skripsi FKT
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Intisari dari 50 halaman buku panduan resmi (SK Rektor No: {PANDUAN_FKT.skRektor}) 
            yang dirangkum agar mahasiswa Informatika 23 tidak tersesat dalam aturan administrasi & teknis penulisan.
          </p>
        </div>

        <a
          href="/panduan-skripsi-fkt-almaata.pdf"
          download="Buku_Panduan_Skripsi_FKT_Alma_Ata.pdf"
          className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-alma-600 hover:bg-alma-700 text-white font-bold text-xs shadow-md shadow-alma-600/20 transition-all self-start md:self-auto flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF Asli (50 Hal)</span>
        </a>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'syarat', label: '1. Persyaratan Akademik', icon: FileCheck2 },
          { id: 'format', label: '2. Format Naskah (Margin 4-4-3-3)', icon: Layout },
          { id: 'sistematika', label: '3. Sistematika Bab 1–3', icon: Layers },
          { id: 'sempro', label: '4. Aturan Sempro & Audiens', icon: AlertCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-alma-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: PERSYARATAN AKADEMIK */}
      {activeSection === 'syarat' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PANDUAN_FKT.persyaratanAkademik.map((item, idx) => (
              <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-alma-300 shadow-xs transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-alma-50 text-alma-700 flex items-center justify-center text-xs font-bold font-mono border border-alma-200">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-800 block mb-0.5">Penting Diingat Mengenai Dosen Pembimbing:</strong>
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
          <div className="glass-card rounded-2xl p-6 border border-slate-200">
            <h2 className="text-base font-bold text-slate-800 mb-2">Aturan Tata Letak Halaman (Margin 4-4-3-3)</h2>
            <p className="text-xs text-slate-600 mb-6">
              Kertas A4 HVS 80 gram standar. Pastikan di Microsoft Word atau Google Docs margins diatur tepat:
            </p>

            <div className="max-w-md mx-auto relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center shadow-xs">
              {/* Margin Labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-alma-700 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-xs">
                Atas: 4 cm
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-alma-700 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-xs">
                Bawah: 3 cm
              </div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-alma-700 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-xs -rotate-90">
                Kiri: 4 cm (Jilid)
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-alma-700 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-xs rotate-90">
                Kanan: 3 cm
              </div>

              {/* Mock Page Content */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 my-4 text-left shadow-sm">
                <p className="text-center font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 font-serif">
                  BAB I PENDAHULUAN
                </p>
                <p className="text-[10px] text-slate-600 indent-6 leading-relaxed mb-2 font-serif">
                  1.1 Latar Belakang Masalah. Perkembangan teknologi informasi saat ini bergerak sangat cepat dan menuntut digitalisasi sistem...
                </p>
                <div className="text-[9px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 font-sans">
                  ⚠️ Dilarang memakai bullet points di teks! Wajib penomoran bertingkat 1, 2 atau a, b.
                </div>
              </div>
            </div>
          </div>

          {/* Table of Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Spesifikasi Tipografi & Spasi</h3>
              <ul className="text-xs space-y-2 text-slate-600">
                <li>• <strong>Font:</strong> Times New Roman ukuran 12 pt.</li>
                <li>• <strong>Spasi:</strong> 2.0 (Double), khusus Abstrak menggunakan spasi 1.0 (10 pt).</li>
                <li>• <strong>Alinea:</strong> Menjorok 1 cm (10 mm) pada awal paragraf.</li>
                <li>• <strong>Jarak Judul Bab:</strong> 3 spasi dari judul bab ke teks pertama.</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Aturan Larangan & Bahasa</h3>
              <ul className="text-xs space-y-2 text-slate-600">
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
          <div className="p-4 rounded-xl bg-alma-50 border border-alma-200 text-xs text-alma-800">
            Berikut struktur baku draf <strong>Proposal Skripsi (Bab 1 s/d Bab 3)</strong> yang wajib diselesaikan 
            sebelum maju Seminar Proposal Bersama di bulan Januari:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PANDUAN_FKT.sistematikaProposal.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="px-2.5 py-1 rounded-lg bg-alma-50 text-alma-700 font-mono text-xs font-bold inline-block mb-3 border border-alma-200">
                    {item.bab}
                  </div>
                  <div className="space-y-2">
                    {item.subbab.map((sub, sIdx) => (
                      <div key={sIdx} className="text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
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
          <div className="glass-card rounded-2xl p-6 border border-slate-200">
            <h2 className="text-base font-bold text-slate-800 mb-4">Prosedur Seminar Proposal (Bab 7.2 Panduan FKT)</h2>
            <div className="space-y-4">
              {PANDUAN_FKT.alurSempro.map((step) => (
                <div key={step.step} className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-alma-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{step.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Ketentuan Pakaian & Audiens Saat Sempro</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-alma-700 block mb-1">Dresscode Sempro:</span>
                Jas almamater Universitas Alma Ata, atasan kemeja berwarna cerah, celana kain gelap (putra) / rok panjang kain gelap (putri), tidak boleh memakai jeans, bersepatu pantofel/tertutup gelap.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-emerald-700 block mb-1">Syarat Audiens:</span>
                Wajib dihadiri sekurang-kurangnya 5 mahasiswa (minimal semester 4). Saling hadir dan dukung teman angkatan 23 saat maju sempro!
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
