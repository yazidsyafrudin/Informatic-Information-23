import React from 'react';
import { 
  Rocket, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  BookMarked,
  ChevronRight
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { TIMELINE_EVENTS } from '../data/milestones';

export default function DashboardView({ setActiveTab, profile, progressCount, totalMilestones }) {
  const percentComplete = Math.round((progressCount / totalMilestones) * 100) || 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Section - Royal Blue & White Prestige Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-alma-800 via-alma-700 to-indigo-800 text-white p-6 sm:p-10 shadow-xl shadow-alma-900/10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Portal Resmi Angkatan Informatika 2023 Universitas Alma Ata</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Satu Angkatan, Satu Visi:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">
              Lulus Bareng Informatika 2023!
            </span>
          </h1>

          <p className="text-sm sm:text-base text-alma-100 mb-6 leading-relaxed">
            Tidak ada yang boleh tertinggal atau bingung mulai dari mana. Dari program magang 3 bulan saat ini, 
            penulisan draf proposal, <strong className="text-white underline decoration-amber-400 decoration-2">Seminar Proposal Bersama (Januari)</strong>, 
            hingga sidang skripsi dan toga wisuda bersama!
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-alma-800 hover:bg-alma-50 font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Rocket className="w-4 h-4 text-alma-600" />
              <span>Lihat Roadmap Skripsi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-alma-900/60 hover:bg-alma-900/80 text-white border border-white/20 font-semibold text-sm backdrop-blur-sm transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Update Progress Saya ({percentComplete}%)</span>
            </button>

            <button
              onClick={() => setActiveTab('panduan')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-alma-950/40 hover:bg-alma-950/60 text-white/90 border border-white/10 text-sm backdrop-blur-sm transition-all"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Panduan PDF (50 Hal)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Countdown Timers */}
      <section>
        <CountdownTimer />
      </section>

      {/* Mulai Dari Mana Hari Ini? (Clean White Box) */}
      <section className="glass-card rounded-2xl p-6 border border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Bingung Harus Mulai dari Mana Sekarang?</h2>
            <p className="text-xs text-slate-500">Ikuti panduan 4 langkah praktis sesuai fase semester 7 kita saat ini:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-alma-300 hover:bg-white transition-all shadow-xs">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 mb-2">
              Langkah 1: Magang
            </span>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Cari Masalah di Tempat Magang</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Catat proses bisnis apa yang manual, lambat, atau butuh otomasi/AI untuk dijadikan topik skripsi.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-alma-300 hover:bg-white transition-all shadow-xs">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 mb-2">
              Langkah 2: Literatur
            </span>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Koleksi 5-10 Jurnal Relevan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cari jurnal SINTA / IEEE 3-5 tahun terakhir yang memakai metode yang ingin kamu gunakan.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-alma-300 hover:bg-white transition-all shadow-xs">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 mb-2">
              Langkah 3: Syarat Kampus
            </span>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Cicil Hadir 5x Sempro Kawan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Buku panduan FKT mewajibkan bukti hadir 5x sempro. Pantau jadwal sempro kakak tingkat dan kawan sekarang juga!
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-alma-300 hover:bg-white transition-all shadow-xs">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 mb-2">
              Langkah 4: Administrasi
            </span>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Cek AAEPT & LPBA</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pastikan skor AAEPT sudah minimal 450 dan sertifikat LPBA (Al-Qur'an & Sholat) sudah siap sebelum sempro dibuka.
            </p>
          </div>
        </div>
      </section>

      {/* Grid: Timeline Angkatan & Sorotan Aturan FKT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Timeline Angkatan (2 Cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Timeline Perjalanan Angkatan '23</h2>
              <p className="text-xs text-slate-500">Peta jalan waktu dari magang hingga wisuda sarjana komputer</p>
            </div>
            <button 
              onClick={() => setActiveTab('roadmap')}
              className="text-xs text-alma-600 hover:text-alma-700 font-bold flex items-center space-x-1"
            >
              <span>Detail Tahapan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Node dot */}
                <div className={`absolute -left-[27px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                  event.status === 'current'
                    ? 'bg-cyan-500 border-white ring-4 ring-cyan-100'
                    : event.status === 'highlight'
                    ? 'bg-amber-400 border-white ring-4 ring-amber-100'
                    : event.status === 'goal'
                    ? 'bg-emerald-500 border-white ring-4 ring-emerald-100'
                    : 'bg-slate-300 border-white'
                }`} />

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 group-hover:border-alma-200 group-hover:bg-white transition-all shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-alma-700">{event.date}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      event.status === 'highlight'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : event.status === 'current'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {event.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base">{event.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sorotan Ketentuan Skripsi FKT Alma Ata (1 Col) */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-alma-600 mb-2">
              <BookMarked className="w-5 h-5" />
              <h2 className="font-bold text-slate-800 text-base">Syarat Kunci FKT UAA</h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Aturan resmi berdasarkan SK Rektor No. 182/A/SK/UAA/IX/2021:
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block">Indeks Prestasi Kumulatif</span>
                <span className="text-sm font-bold text-emerald-700">Minimal IPK 3.25</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block">SKS Lulus</span>
                <span className="text-sm font-bold text-cyan-700">Minimal 75% Total SKS</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block">Bahasa Inggris & Keagamaan</span>
                <span className="text-sm font-bold text-indigo-700">AAEPT ≥ 450 & Lulus LPBA</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block">Maksimal Similaritas Turnitin</span>
                <span className="text-sm font-bold text-amber-700">Maksimal 20% (≤ 20%)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block">Format Layout Naskah</span>
                <span className="text-sm font-bold text-slate-800">Margin 4-4-3-3 & TNR 12 (Spasi 2)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={() => setActiveTab('panduan')}
              className="w-full py-2.5 rounded-xl bg-alma-50 hover:bg-alma-100 text-alma-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors border border-alma-200"
            >
              <span>Pelajari Semua 50 Halaman Panduan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
