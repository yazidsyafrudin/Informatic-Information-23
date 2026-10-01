import React, { useState } from 'react';
import { 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  BookMarked, 
  ChevronRight,
  Award,
  Users,
  Maximize2,
  X,
  ShieldAlert
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { TIMELINE_EVENTS } from '../data/milestones';

export default function DashboardView({ setActiveTab, profile, progressCount, totalMilestones }) {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const percentComplete = Math.round((progressCount / totalMilestones) * 100) || 0;

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Hero Section - Solid Blue Card UAA (Tidak Transparan) */}
      <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-8 sm:p-12 text-center shadow-xl border-2 border-primary-700">
        
        {/* Subtle Decorative Elements */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Badge Unggul / Akreditasi ASIIN */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 text-white border border-white/25 text-xs font-instrument font-bold shadow-xs mb-5 backdrop-blur-xs">
            <Award className="w-4 h-4 text-accent" />
            <span>S1 Informatika UAA • Akreditasi Internasional ASIIN</span>
          </div>

          {/* Heading - Font Philosopher */}
          <h1 className="font-philosopher font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4">
            <span className="text-accent block text-2xl sm:text-4xl mb-1.5 font-bold">
              The Globe Inspiring Generation
            </span>
            Satu Angkatan, Lulus Bareng '23!
          </h1>

          <p className="font-instrument text-white/90 text-sm sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Portal komando terpadu mahasiswa Informatika 2023 Universitas Alma Ata. 
            Dari program magang 3 bulan saat ini, penyusunan draf proposal, 
            <strong className="text-accent font-bold"> Seminar Proposal Bersama (Januari)</strong>, 
            hingga wisuda sarjana komputer (S.Kom) bersama!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="bg-white hover:bg-sky-50 text-primary font-instrument rounded-xl px-6 py-3.5 font-bold text-sm shadow-md transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5"
            >
              <Rocket className="w-4 h-4 text-primary" />
              <span>Lihat Roadmap Skripsi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className="bg-accent hover:bg-accent/90 text-white font-instrument rounded-xl px-6 py-3.5 font-bold text-sm shadow-md shadow-accent/25 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Update Progress Saya ({percentComplete}%)</span>
            </button>

            <button
              onClick={() => setActiveTab('panduan')}
              className="border-2 border-white text-white hover:bg-white/15 font-instrument rounded-xl px-5 py-3.5 text-sm font-bold transition-all duration-300 flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Panduan FKT (PDF)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Showcase Solidaritas & Foto Angkatan '23 */}
      <section className="bg-white rounded-3xl overflow-hidden border-2 border-primary/20 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Kolom Foto Angkatan */}
          <div 
            onClick={() => setShowPhotoModal(true)}
            className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[320px] overflow-hidden group cursor-pointer bg-slate-900"
            title="Klik untuk memperbesar foto angkatan"
          >
            <img 
              src="/puscod23.png" 
              alt="Keluarga Besar Informatika Angkatan 2023 Universitas Alma Ata"
              className="w-full h-full object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
              <span className="text-white text-xs font-instrument font-semibold flex items-center space-x-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-xs">
                <Maximize2 className="w-3.5 h-3.5 text-accent" />
                <span>Klik untuk perbesar foto</span>
              </span>
              <span className="text-[11px] text-white/80 font-mono">Informatika '23 UAA</span>
            </div>
          </div>

          {/* Kolom Konten & Spirit Angkatan */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white to-[#F9F6EE]">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-instrument font-bold mb-4">
                <Users className="w-3.5 h-3.5 text-accent" />
                <span>Informatika Angkatan 2023</span>
              </div>
              
              <h2 className="font-philosopher font-bold text-2xl sm:text-3xl text-primary leading-tight mb-3">
                Satu Visi, Satu Frekuensi, Lulus Bareng!
              </h2>

              <p className="font-instrument text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                "Di ruang kelas kita belajar logika, di depan laptop kita pusing coding bareng, dan di panggung wisuda nanti kita akan melangkah bersama sebagai Sarjana Komputer."
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-instrument text-slate-600 bg-white p-3 rounded-xl border border-primary/10 shadow-xs">
                <span className="font-medium">Komunitas Belajar:</span>
                <span className="font-bold text-primary font-philosopher">Pusing Coding IF23</span>
              </div>
              <div className="flex items-center justify-between text-xs font-instrument text-slate-600 bg-white p-3 rounded-xl border border-primary/10 shadow-xs">
                <span className="font-medium">Almamater:</span>
                <span className="font-bold text-accent font-philosopher">Universitas Alma Ata Yogyakarta</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Modal Foto Angkatan Full-Screen */}
      {showPhotoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowPhotoModal(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-accent" />
                <span className="font-philosopher font-bold text-sm sm:text-base">
                  Keluarga Besar Informatika '23 • Universitas Alma Ata
                </span>
              </div>
              <button 
                onClick={() => setShowPhotoModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-2 flex items-center justify-center bg-black/60">
              <img 
                src="/puscod23.png" 
                alt="Foto Angkatan Informatika 2023 UAA" 
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>
            <div className="p-3 bg-slate-900 text-center text-white/70 text-xs font-instrument border-t border-white/10">
              Pemberangkatan Mahasiswa KKN & Angkatan 2023 • Universitas Alma Ata Yogyakarta
            </div>
          </div>
        </div>
      )}

      {/* Banner Peringatan Akademik: Surat Edaran Dekan Perihal EC */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-primary text-white rounded-3xl p-5 sm:p-6 border-2 border-red-400 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex items-start sm:items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0 shadow-inner">
            <ShieldAlert className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 font-bold text-[10px] uppercase tracking-wider font-instrument shadow-xs">
                Kebijakan Baru Dekan
              </span>
              <span className="text-xs text-white/80 font-mono">SE No. 002/A/ED/FSET/UAA/VII/2026</span>
            </div>
            <h3 className="font-philosopher font-bold text-base sm:text-lg text-white leading-snug">
              Wajib Jeda Minimal 3 Bulan Kalender Antara Terbitnya EC & Ujian Seminar Hasil!
            </h3>
            <p className="text-xs text-white/90 font-instrument mt-1 max-w-2xl leading-relaxed">
              Segera ajukan berkas Ethical Clearance setelah Sempro. Mahasiswa yang tidak memenuhi jeda waktu 3 bulan 
              <strong className="text-amber-300 font-bold"> TIDAK DIPERKENANKAN </strong> mendaftar Ujian Seminar Hasil.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('panduan')}
          className="px-5 py-3 rounded-xl bg-white hover:bg-red-50 text-red-700 font-bold text-xs shadow-md transition-all whitespace-nowrap self-stretch md:self-auto flex items-center justify-center space-x-2 flex-shrink-0 group"
        >
          <span>Pelajari Alur & Syarat EC</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Countdown Timers (Solid Blue Cards) */}
      <section>
        <CountdownTimer />
      </section>

      {/* Mulai Dari Mana Hari Ini? (Cards berlatar biru solid yang nyaman) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md">
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
          
          <div className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-lg hover:border-accent hover:-translate-y-1 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-white text-primary rounded-lg flex items-center justify-center font-instrument text-xs font-bold shadow-xs">
                1
              </div>
              <span className="font-philosopher font-bold text-accent text-sm">
                Fase Magang
              </span>
            </div>
            <h3 className="font-instrument font-bold text-white text-sm">
              Ambil Masalah di Tempat Magang
            </h3>
            <p className="font-instrument text-xs text-white/90 leading-relaxed">
              Catat proses bisnis apa yang manual, lambat, atau butuh otomasi software/AI untuk dijadikan topik skripsi.
            </p>
          </div>

          <div className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-lg hover:border-accent hover:-translate-y-1 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-white text-primary rounded-lg flex items-center justify-center font-instrument text-xs font-bold shadow-xs">
                2
              </div>
              <span className="font-philosopher font-bold text-accent text-sm">
                Studi Literatur
              </span>
            </div>
            <h3 className="font-instrument font-bold text-white text-sm">
              Koleksi 5–10 Jurnal Relevan
            </h3>
            <p className="font-instrument text-xs text-white/90 leading-relaxed">
              Cari jurnal SINTA / IEEE 3-5 tahun terakhir yang memakai metode yang ingin kamu gunakan (misal: CNN, Scrum).
            </p>
          </div>

          <div className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-lg hover:border-accent hover:-translate-y-1 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-accent text-white rounded-lg flex items-center justify-center font-instrument text-xs font-bold shadow-xs">
                3
              </div>
              <span className="font-philosopher font-bold text-accent text-sm">
                Syarat Kampus
              </span>
            </div>
            <h3 className="font-instrument font-bold text-white text-sm">
              Cicil Hadir 5x Sempro Kawan
            </h3>
            <p className="font-instrument text-xs text-white/90 leading-relaxed">
              Buku panduan FKT mewajibkan bukti hadir 5x sempro. Pantau jadwal sempro kakak tingkat dan kawan sekarang juga!
            </p>
          </div>

          <div className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-lg hover:border-accent hover:-translate-y-1 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-white text-primary rounded-lg flex items-center justify-center font-instrument text-xs font-bold shadow-xs">
                4
              </div>
              <span className="font-philosopher font-bold text-accent text-sm">
                Administrasi
              </span>
            </div>
            <h3 className="font-instrument font-bold text-white text-sm">
              Cek Skor AAEPT & LPBA
            </h3>
            <p className="font-instrument text-xs text-white/90 leading-relaxed">
              Pastikan skor AAEPT sudah minimal 450 dan sertifikat LPBA (Al-Qur'an & Sholat) sudah siap sebelum sempro dibuka.
            </p>
          </div>

        </div>
      </section>

      {/* Grid: Timeline Angkatan & Sorotan Aturan FKT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Timeline Angkatan (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md">
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

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/30">
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

                <div className="bg-primary text-white p-4 sm:p-5 rounded-2xl border-2 border-primary-700 group-hover:border-accent transition-all shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-accent">{event.date}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-instrument ${
                      event.status === 'highlight'
                        ? 'bg-accent text-white shadow-xs'
                        : event.status === 'current'
                        ? 'bg-white text-primary shadow-xs'
                        : 'bg-white/20 text-white'
                    }`}>
                      {event.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-white font-philosopher text-base">{event.title}</h3>
                  <p className="text-xs text-white/90 mt-1 font-instrument leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sorotan Ketentuan Skripsi FKT Alma Ata (1 Col) - Solid Blue Card */}
        <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-white mb-2">
              <BookMarked className="w-5 h-5 text-accent" />
              <h2 className="font-bold font-philosopher text-white text-xl">Syarat Kunci FKT UAA</h2>
            </div>
            <p className="text-xs font-instrument text-white/80 mb-5">
              Aturan resmi berdasarkan SK Rektor No. 182/A/SK/UAA/IX/2021:
            </p>

            <div className="space-y-3 font-instrument">
              <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-sm">
                <span className="text-[11px] text-slate-500 block font-semibold">Indeks Prestasi Kumulatif</span>
                <span className="text-sm font-bold text-primary">Minimal IPK 3.25</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-sm">
                <span className="text-[11px] text-slate-500 block font-semibold">SKS Lulus</span>
                <span className="text-sm font-bold text-primary">Minimal 75% Total SKS</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-sm">
                <span className="text-[11px] text-slate-500 block font-semibold">Bahasa Inggris & Keagamaan</span>
                <span className="text-sm font-bold text-slate-900">AAEPT ≥ 450 & Lulus LPBA</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-sm">
                <span className="text-[11px] text-slate-500 block font-semibold">Maksimal Similaritas Turnitin</span>
                <span className="text-sm font-bold text-accent">Maksimal 20% (≤ 20%)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-sm">
                <span className="text-[11px] text-slate-500 block font-semibold">Format Layout Naskah</span>
                <span className="text-sm font-bold text-slate-900">Margin 4-4-3-3 & TNR 12 (Spasi 2)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-sm border border-primary/20">
                <span className="text-[11px] text-slate-500 block font-semibold">2 Syarat Wajib Skor Prestasi (SPM)</span>
                <span className="text-xs font-bold text-primary block">Birokrasi 9 Poin & Prodi 25 Poin</span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Video, Artikel, Review Bintang 5 + Kegiatan Prodi</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-900 shadow-sm border border-amber-300">
                <span className="text-[11px] text-slate-900 font-bold block">Kebijakan Baru Dekan (SE 002/2026)</span>
                <span className="text-xs font-bold text-slate-950">Ethical Clearance Wajib Jeda Min. 3 Bulan</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <button
              onClick={() => setActiveTab('panduan')}
              className="w-full py-3 rounded-xl bg-accent hover:bg-accent/90 text-white text-xs font-instrument font-bold flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-accent/20"
            >
              <span>Pelajari Panduan FKT, EC, Magang & SPM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
