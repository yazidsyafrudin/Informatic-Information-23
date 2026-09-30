import React from 'react';
import { 
  Rocket, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  BookMarked,
  ChevronRight,
  GraduationCap,
  Award
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { TIMELINE_EVENTS } from '../data/milestones';

export default function DashboardView({ setActiveTab, profile, progressCount, totalMilestones }) {
  const percentComplete = Math.round((progressCount / totalMilestones) * 100) || 0;

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Hero Section - Official Alma Ata Portal Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-50/80 via-white to-sky-50/40 border border-sky-100 p-8 sm:p-12 text-center shadow-xs">
        
        {/* Subtle Decorative Background Circles */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-sky-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Badge Unggul / Akreditasi ASIIN */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white text-primary border border-sky-200 text-xs font-instrument font-semibold shadow-xs mb-5">
            <Award className="w-4 h-4 text-accent" />
            <span>S1 Informatika UAA • Terakreditasi Internasional ASIIN</span>
          </div>

          {/* Heading - Font Philosopher like home.almaata.ac.id */}
          <h1 className="font-philosopher font-bold text-3xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-tight mb-3">
            <span className="text-accent block text-2xl sm:text-4xl mb-1">
              The Globe Inspiring Generation
            </span>
            Satu Angkatan, Lulus Bareng '23!
          </h1>

          <p className="font-instrument text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Portal komando terpadu mahasiswa Informatika 2023 Universitas Alma Ata. 
            Dari program magang 3 bulan saat ini, penyusunan draf proposal, 
            <strong className="text-primary font-semibold"> Seminar Proposal Bersama (Januari)</strong>, 
            hingga wisuda sarjana komputer (S.Kom) bersama!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="bg-primary hover:bg-primary/90 text-white font-instrument rounded-xl px-6 py-3 font-semibold text-sm shadow-md shadow-primary/20 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5"
            >
              <Rocket className="w-4 h-4" />
              <span>Lihat Roadmap Skripsi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className="bg-accent hover:bg-accent/90 text-white font-instrument rounded-xl px-6 py-3 font-semibold text-sm shadow-md shadow-accent/20 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Update Progress Saya ({percentComplete}%)</span>
            </button>

            <button
              onClick={() => setActiveTab('panduan')}
              className="border border-primary text-primary hover:bg-primary hover:text-white font-instrument rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Panduan FKT (PDF)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Countdown Timers */}
      <section>
        <CountdownTimer />
      </section>

      {/* Mulai Dari Mana Hari Ini? (Styled like home.almaata.ac.id feature cards) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <p className="text-accent font-philosopher text-base font-semibold">Panduan Cepat Semester 7</p>
          <h2 className="text-primary font-philosopher text-2xl sm:text-3xl font-bold">
            Bingung Harus Mulai dari Mana Sekarang?
          </h2>
          <p className="font-instrument text-slate-600 text-xs sm:text-sm mt-1">
            Ikuti 4 langkah terpenting sesuai fase kita saat ini agar siap maju sempro bersama di bulan Januari:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white font-instrument text-xs font-bold shadow-xs">
                1
              </div>
              <span className="font-philosopher font-bold text-primary text-sm">
                Fase Magang
              </span>
            </div>
            <h3 className="font-instrument font-bold text-slate-800 text-sm">
              Ambil Fenomena di Tempat Magang
            </h3>
            <p className="font-instrument text-xs text-slate-600 leading-relaxed">
              Catat proses bisnis apa yang manual, lambat, atau butuh otomasi software/AI untuk dijadikan topik skripsi.
            </p>
          </div>

          <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white font-instrument text-xs font-bold shadow-xs">
                2
              </div>
              <span className="font-philosopher font-bold text-primary text-sm">
                Studi Literatur
              </span>
            </div>
            <h3 className="font-instrument font-bold text-slate-800 text-sm">
              Koleksi 5–10 Jurnal Relevan
            </h3>
            <p className="font-instrument text-xs text-slate-600 leading-relaxed">
              Cari jurnal SINTA / IEEE 3-5 tahun terakhir yang memakai metode yang ingin kamu gunakan (misal: CNN, Scrum).
            </p>
          </div>

          <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center text-white font-instrument text-xs font-bold shadow-xs">
                3
              </div>
              <span className="font-philosopher font-bold text-accent text-sm">
                Syarat Kampus
              </span>
            </div>
            <h3 className="font-instrument font-bold text-slate-800 text-sm">
              Cicil Hadir 5x Sempro Kawan
            </h3>
            <p className="font-instrument text-xs text-slate-600 leading-relaxed">
              Buku panduan FKT mewajibkan bukti hadir 5x sempro. Pantau jadwal sempro kakak tingkat dan kawan sekarang juga!
            </p>
          </div>

          <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white font-instrument text-xs font-bold shadow-xs">
                4
              </div>
              <span className="font-philosopher font-bold text-primary text-sm">
                Administrasi
              </span>
            </div>
            <h3 className="font-instrument font-bold text-slate-800 text-sm">
              Cek Skor AAEPT & LPBA
            </h3>
            <p className="font-instrument text-xs text-slate-600 leading-relaxed">
              Pastikan skor AAEPT sudah minimal 450 dan sertifikat LPBA (Al-Qur'an & Sholat) sudah siap sebelum sempro dibuka.
            </p>
          </div>

        </div>
      </section>

      {/* Grid: Timeline Angkatan & Sorotan Aturan FKT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Timeline Angkatan (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold font-philosopher text-primary">
                Timeline Perjalanan Angkatan '23
              </h2>
              <p className="text-xs font-instrument text-slate-500">
                Peta jalan waktu dari magang hingga wisuda sarjana komputer Universitas Alma Ata
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('roadmap')}
              className="text-xs font-instrument font-bold text-primary hover:text-primary/80 flex items-center space-x-1"
            >
              <span>Detail Tahapan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-sky-100">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="relative group">
                <div className={`absolute -left-[27px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                  event.status === 'current'
                    ? 'bg-primary border-white ring-4 ring-sky-200'
                    : event.status === 'highlight'
                    ? 'bg-accent border-white ring-4 ring-amber-200 animate-pulse'
                    : event.status === 'goal'
                    ? 'bg-emerald-500 border-white ring-4 ring-emerald-200'
                    : 'bg-slate-300 border-white'
                }`} />

                <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 group-hover:border-primary/40 group-hover:bg-white transition-all shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-primary">{event.date}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-instrument ${
                      event.status === 'highlight'
                        ? 'bg-accent text-white shadow-xs'
                        : event.status === 'current'
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {event.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 font-philosopher text-base">{event.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 font-instrument leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sorotan Ketentuan Skripsi FKT Alma Ata (1 Col) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-primary mb-2">
              <BookMarked className="w-5 h-5" />
              <h2 className="font-bold font-philosopher text-primary text-xl">Syarat Kunci FKT UAA</h2>
            </div>
            <p className="text-xs font-instrument text-slate-500 mb-5">
              Aturan resmi berdasarkan SK Rektor No. 182/A/SK/UAA/IX/2021:
            </p>

            <div className="space-y-3 font-instrument">
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-[11px] text-slate-500 block">Indeks Prestasi Kumulatif</span>
                <span className="text-sm font-bold text-primary">Minimal IPK 3.25</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-[11px] text-slate-500 block">SKS Lulus</span>
                <span className="text-sm font-bold text-primary">Minimal 75% Total SKS</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-[11px] text-slate-500 block">Bahasa Inggris & Keagamaan</span>
                <span className="text-sm font-bold text-slate-800">AAEPT ≥ 450 & Lulus LPBA</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-[11px] text-slate-500 block">Maksimal Similaritas Turnitin</span>
                <span className="text-sm font-bold text-accent">Maksimal 20% (≤ 20%)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-[11px] text-slate-500 block">Format Layout Naskah</span>
                <span className="text-sm font-bold text-slate-800">Margin 4-4-3-3 & TNR 12 (Spasi 2)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-100">
            <button
              onClick={() => setActiveTab('panduan')}
              className="w-full py-3 rounded-xl bg-sky-50 hover:bg-primary hover:text-white text-primary text-xs font-instrument font-bold flex items-center justify-center space-x-1.5 transition-all border border-sky-200"
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
