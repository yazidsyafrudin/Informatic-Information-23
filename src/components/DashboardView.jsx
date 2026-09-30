import React from 'react';
import { 
  Rocket, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  FileText, 
  ShieldCheck, 
  BookMarked,
  Award,
  ChevronRight
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { TIMELINE_EVENTS } from '../data/milestones';
import { PANDUAN_FKT } from '../data/panduanFKT';

export default function DashboardView({ setActiveTab, profile, progressCount, totalMilestones }) {
  const percentComplete = Math.round((progressCount / totalMilestones) * 100) || 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-alma-950 to-indigo-950 border border-slate-700/60 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-alma-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-alma-500/20 text-alma-300 border border-alma-500/30 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portal Resmi Angkatan Informatika 2023 Universitas Alma Ata</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Satu Angkatan, Satu Visi:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-alma-400 via-cyan-300 to-indigo-300">
              Lulus Bareng Informatika 2023!
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            Tidak ada yang boleh tertinggal atau bingung mulai dari mana. Dari program magang 3 bulan saat ini, 
            penulisan draf proposal, <strong className="text-white">Seminar Proposal Bersama (Januari)</strong>, 
            hingga sidang skripsi dan toga wisuda bersama!
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-alma-600 to-cyan-600 hover:from-alma-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-alma-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <Rocket className="w-4 h-4" />
              <span>Lihat Roadmap Skripsi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Update Progress Saya ({percentComplete}%)</span>
            </button>

            <button
              onClick={() => setActiveTab('panduan')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm transition-all"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Ringkasan Panduan PDF (50 Halaman)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Countdown Timers */}
      <section>
        <CountdownTimer />
      </section>

      {/* Mulai Dari Mana Hari Ini? (Quick Decision Box for Confused Students) */}
      <section className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Bingung Harus Mulai dari Mana Sekarang?</h2>
              <p className="text-xs text-slate-400">Ikuti panduan 4 langkah praktis sesuai fase semester 7 kita saat ini:</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 hover:border-alma-500/40 transition-colors">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 mb-2">
              Langkah 1: Magang
            </span>
            <h3 className="font-semibold text-white text-sm mb-1">Cari Masalah di Tempat Magang</h3>
            <p className="text-xs text-slate-400">
              Jangan cuma kerja magang, catat proses bisnis apa yang manual, lambat, atau butuh otomasi/AI untuk dijadikan topik skripsi.
            </p>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 hover:border-alma-500/40 transition-colors">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 mb-2">
              Langkah 2: Literatur
            </span>
            <h3 className="font-semibold text-white text-sm mb-1">Koleksi 5-10 Jurnal Relevan</h3>
            <p className="text-xs text-slate-400">
              Cari jurnal SINTA / IEEE 3-5 tahun terakhir yang memakai metode yang ingin kamu pakai (misal: CNN, Random Forest, Scrum, IoT).
            </p>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 hover:border-alma-500/40 transition-colors">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 mb-2">
              Langkah 3: Syarat Kampus
            </span>
            <h3 className="font-semibold text-white text-sm mb-1">Cicil Hadir 5x Sempro Kawan</h3>
            <p className="text-xs text-slate-400">
              Buku panduan FKT mewajibkan bukti hadir 5x seminar proposal. Pantau jadwal sempro kakak tingkat dan kawan sekarang juga!
            </p>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 hover:border-alma-500/40 transition-colors">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 mb-2">
              Langkah 4: Administrasi
            </span>
            <h3 className="font-semibold text-white text-sm mb-1">Cek AAEPT & LPBA</h3>
            <p className="text-xs text-slate-400">
              Pastikan skor AAEPT sudah minimal 450 dan sertifikat LPBA (Al-Qur'an & Sholat) sudah beres sebelum pendaftaran sempro dibuka.
            </p>
          </div>
        </div>
      </section>

      {/* Grid: Timeline Angkatan & Sorotan Aturan FKT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Timeline Angkatan (2 Cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>Timeline Perjalanan Angkatan '23</span>
              </h2>
              <p className="text-xs text-slate-400">Peta jalan waktu dari magang hingga wisuda sarjana komputer</p>
            </div>
            <button 
              onClick={() => setActiveTab('roadmap')}
              className="text-xs text-alma-400 hover:text-alma-300 font-semibold flex items-center space-x-1"
            >
              <span>Detail Tahapan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Node dot */}
                <div className={`absolute -left-[27px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                  event.status === 'current'
                    ? 'bg-cyan-500 border-white ring-4 ring-cyan-500/20'
                    : event.status === 'highlight'
                    ? 'bg-amber-400 border-slate-900 ring-4 ring-amber-400/30 animate-pulse'
                    : event.status === 'goal'
                    ? 'bg-emerald-400 border-white ring-4 ring-emerald-400/20'
                    : 'bg-slate-800 border-slate-600'
                }`} />

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-semibold text-alma-400">{event.date}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      event.status === 'highlight'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : event.status === 'current'
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {event.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">{event.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sorotan Ketentuan Skripsi FKT Alma Ata (1 Col) */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-alma-400 mb-2">
              <BookMarked className="w-5 h-5" />
              <h2 className="font-bold text-white text-base">Syarat Kunci FKT UAA</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Aturan resmi berdasarkan SK Rektor No. 182/A/SK/UAA/IX/2021:
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 block">Indeks Prestasi Kumulatif</span>
                <span className="text-sm font-bold text-emerald-400">Minimal IPK 3.25</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 block">SKS Lulus</span>
                <span className="text-sm font-bold text-cyan-400">Minimal 75% Total SKS</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 block">Tes Bahasa Inggris & Keagamaan</span>
                <span className="text-sm font-bold text-indigo-300">AAEPT ≥ 450 & Lulus LPBA</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 block">Maksimal Similaritas Turnitin</span>
                <span className="text-sm font-bold text-amber-400">Maksimal 20% (≤ 20%)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 block">Format Layout Naskah</span>
                <span className="text-sm font-bold text-purple-300">Margin 4-4-3-3 & TNR 12 (Spasi 2)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('panduan')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
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
