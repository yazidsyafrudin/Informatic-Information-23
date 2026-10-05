import React, { useState } from 'react';
import {
  Rocket,
  ArrowRight,
  CheckCircle2,
  FileText,
  BookMarked,
  ChevronRight,
  ChevronDown,
  Award,
  Users,
  Maximize2,
  X,
  ShieldAlert,
  Briefcase,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Check,
  AlertTriangle,
  GraduationCap,
  Clock,
  Languages
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { TIMELINE_EVENTS } from '../data/milestones';

export default function DashboardView({ setActiveTab, profile, progressCount, totalMilestones, currentUser }) {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState({ 0: true }); // Default kartu 1 (sedang berjalan) terbuka
  const percentComplete = Math.round((progressCount / totalMilestones) * 100) || 0;

  const toggleTimelineEvent = (idx) => {
    setExpandedTimeline(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="space-y-10 animate-fadeIn">

      {/* Hero Section - Solid Blue Card UAA (Tidak Transparan) */}
      <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-6 sm:p-10 lg:p-12 text-center shadow-xl border-2 border-primary-700">

        {/* Subtle Decorative Elements */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

          {/* Badge Unggul / Akreditasi ASIIN */}
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/15 text-white border border-white/25 text-[11px] sm:text-xs font-instrument font-bold shadow-xs mb-4 sm:mb-5 backdrop-blur-xs">
            <Award className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="truncate">S1 Informatika UAA • Akreditasi Internasional ASIIN</span>
          </div>

          {/* Heading - Font Philosopher */}
          <h1 className="font-philosopher font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-3 sm:mb-4">
            <span className="text-accent block text-xl sm:text-3xl mb-1 sm:mb-1.5 font-bold">
              The Globe Inspiring Generation
            </span>
            Satu Angkatan, Lulus Bareng '23!
          </h1>

          <p className="font-instrument text-white/90 text-xs sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-normal">
            Portal komando terpadu mahasiswa Informatika 2023 Universitas Alma Ata.
            Dari program magang saat ini, penyusunan draf proposal,
            <strong className="text-accent font-bold"> Seminar Proposal Bersama (Januari)</strong>,
            hingga wisuda sarjana komputer (S.Kom) bersama!
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="w-full sm:w-auto bg-white hover:bg-sky-50 text-primary font-instrument rounded-xl px-5 sm:px-6 py-3 sm:py-3.5 font-bold text-xs sm:text-sm shadow-md transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-primary" />
              <span>Lihat Roadmap Skripsi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-instrument rounded-xl px-5 sm:px-6 py-3 sm:py-3.5 font-bold text-xs sm:text-sm shadow-md shadow-accent/25 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{currentUser ? `Dashboard Saya (${percentComplete}%)` : 'Masuk Dashboard Mahasiswa'}</span>
            </button>

            <button
              onClick={() => setActiveTab('panduan')}
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/15 font-instrument rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
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
                Satu Visi, Satu Frekuensi, Lulus Bareng Anjay!
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
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent font-philosopher text-xs font-bold mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Panduan Terarah • Langkah Awal Skripsi & Kelulusan</span>
          </div>
          <h2 className="text-primary font-philosopher text-2xl sm:text-3xl font-bold">
            Bingung Harus Mulai dari Mana Sekarang?
          </h2>
          <p className="font-instrument text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Berdasarkan Buku Panduan Skripsi FKT, Laporan Magang KKL, SPM 9 Poin, dan Surat Edaran EC, inilah 5 langkah paling krusial untuk dicicil dan dipersiapkan:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">

          {/* Langkah 1 */}
          <div className="bg-gradient-to-b from-[#0b5e91] to-[#074265] text-white rounded-2xl p-4 sm:p-5 border-2 border-primary-600/60 hover:border-amber-400 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 shadow-md group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 text-white flex items-center justify-center font-instrument text-xs font-bold shadow-xs group-hover:bg-accent group-hover:border-accent transition-colors">
                  01
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-300 bg-black/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  <Briefcase className="w-3 h-3" />
                  Magang & Kasus
                </span>
              </div>
              <h3 className="font-philosopher font-bold text-white text-sm sm:text-base leading-snug group-hover:text-amber-200 transition-colors min-h-[2.5rem] flex items-center">
                Selesaikan Magang & Ambil Masalah Nyata
              </h3>
              <p className="font-instrument text-[11px] sm:text-xs text-white/90 leading-relaxed">
                Tuntaskan logbook 16 minggu & laporan KKL. Ambil kendala sistem atau proses bisnis manual di tempat magang sebagai studi kasus skripsi kamu.
              </p>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 space-y-1.5 text-[10px] text-sky-100 font-instrument">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Logbook 16 Mgg & Laporan KKL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Temukan Gap Masalah Nyata</span>
              </div>
            </div>
          </div>

          {/* Langkah 2 */}
          <div className="bg-gradient-to-b from-[#0b5e91] to-[#074265] text-white rounded-2xl p-4 sm:p-5 border-2 border-primary-600/60 hover:border-amber-400 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 shadow-md group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 text-white flex items-center justify-center font-instrument text-xs font-bold shadow-xs group-hover:bg-accent group-hover:border-accent transition-colors">
                  02
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-300 bg-black/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  <BookOpen className="w-3 h-3" />
                  Literatur & Metode
                </span>
              </div>
              <h3 className="font-philosopher font-bold text-white text-sm sm:text-base leading-snug group-hover:text-amber-200 transition-colors min-h-[2.5rem] flex items-center">
                Kumpulkan 5–10 Jurnal SINTA / Scopus
              </h3>
              <p className="font-instrument text-[11px] sm:text-xs text-white/90 leading-relaxed">
                Kunci peminatan (SE / AI / Jaringan). Cari 5–10 jurnal terakreditasi 3–5 tahun terakhir untuk rujukan metode penyelesaian (misal: CNN, Scrum, IoT).
              </p>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 space-y-1.5 text-[10px] text-sky-100 font-instrument">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Minimal 5 Jurnal SINTA/IEEE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Pilih Metode yang Dikuasai</span>
              </div>
            </div>
          </div>

          {/* Langkah 3 */}
          <div className="bg-gradient-to-b from-[#0b5e91] to-[#074265] text-white rounded-2xl p-4 sm:p-5 border-2 border-primary-600/60 hover:border-amber-400 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 shadow-md group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 text-white flex items-center justify-center font-instrument text-xs font-bold shadow-xs group-hover:bg-accent group-hover:border-accent transition-colors">
                  03
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-300 bg-black/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  <FileText className="w-3 h-3" />
                  Draf & Bimbingan
                </span>
              </div>
              <h3 className="font-philosopher font-bold text-white text-sm sm:text-base leading-snug group-hover:text-amber-200 transition-colors min-h-[2.5rem] flex items-center">
                Susun Bab 1–3 & Bimbingan Dospem
              </h3>
              <p className="font-instrument text-[11px] sm:text-xs text-white/90 leading-relaxed">
                Tulis proposal format 4-4-3-3 (TNR 12, spasi 1.5). Bimbingan rutin ke Pembimbing I & II (min. 4x sebelum sempro) dan pastikan Turnitin proposal ≤ 20%.
              </p>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 space-y-1.5 text-[10px] text-sky-100 font-instrument">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Format 4-4-3-3 & Turnitin ≤ 20%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Bimbingan Rutin Dospem 1 & 2</span>
              </div>
            </div>
          </div>

          {/* Langkah 4 */}
          <div className="bg-gradient-to-b from-[#0b5e91] to-[#074265] text-white rounded-2xl p-4 sm:p-5 border-2 border-primary-600/60 hover:border-amber-400 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 shadow-md group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 text-white flex items-center justify-center font-instrument text-xs font-bold shadow-xs group-hover:bg-accent group-hover:border-accent transition-colors">
                  04
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-300 bg-black/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  <ShieldCheck className="w-3 h-3" />
                  Syarat & Kaji Etik
                </span>
              </div>
              <h3 className="font-philosopher font-bold text-white text-sm sm:text-base leading-snug group-hover:text-amber-200 transition-colors min-h-[2.5rem] flex items-center">
                Cicil 5x Sempro & AAEPT
              </h3>
              <p className="font-instrument text-[11px] sm:text-xs text-white/90 leading-relaxed">
                Cicil bukti hadir 5x sempro kawan di kartu kendali, pastikan tes AAEPT (min. 450) & LPBA siap, serta siapkan protokol Kaji Etik KEPK jika riset ada responden.
              </p>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 space-y-1.5 text-[10px] text-sky-100 font-instrument">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Kartu Hadir 5x Sempro Kawan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Skor AAEPT ≥ 450 & Surat EC</span>
              </div>
            </div>
          </div>

          {/* Langkah 5: Poin SPM Akademik & Prodi */}
          <div className="bg-gradient-to-b from-[#0b5e91] to-[#074265] text-white rounded-2xl p-4 sm:p-5 border-2 border-primary-600/60 hover:border-amber-400 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 shadow-md group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 text-white flex items-center justify-center font-instrument text-xs font-bold shadow-xs group-hover:bg-accent group-hover:border-accent transition-colors">
                  05
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-300 bg-black/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  <Award className="w-3 h-3" />
                  Krusial • SPM
                </span>
              </div>
              <h3 className="font-philosopher font-bold text-white text-sm sm:text-base leading-snug group-hover:text-amber-200 transition-colors min-h-[2.5rem] flex items-center">
                Lengkapi Poin SPM Akademik & Prodi
              </h3>
              <p className="font-instrument text-[11px] sm:text-xs text-white/90 leading-relaxed">
                Penuhi 9 poin SPM Akademik & Prodi. Wajib dicicil dari sekarang, terutama tugas membuat konten edukasi yang butuh waktu review & konfirmasi kesesuaian dari kampus.
              </p>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 space-y-1.5 text-[10px] text-sky-100 font-instrument">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>9 Poin Krusial SPM Akademik</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Cicil & Konfirmasi Konten Kampus</span>
              </div>
            </div>
          </div>

        </div>

        {/* Rekomendasi Urutan Terbaik Memulai */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-sky-50/50 to-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center space-x-3 text-left w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 font-philosopher">
                Cuy urutan Paling Direkomendasikan untuk Memulai:
              </p>
              <p className="text-[11px] sm:text-xs text-slate-600 font-instrument leading-snug mt-0.5">
                Mulai dari <strong>Langkah 1 (masalah nyata di tempat magang)</strong> agar objek riset jelas. Sembari menyusun Bab 1–3, <strong>cicil segera 9 poin SPM (terutama pembuatan konten kampus)</strong> dan kehadiran 5x sempro kawan agar berkas kelulusan aman tanpa kendala di akhir!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-700 text-white font-philosopher font-bold text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Buka Roadmap Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('panduan')}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-primary border border-primary/20 font-philosopher font-bold text-xs transition-colors shadow-2xs flex items-center justify-center cursor-pointer"
            >
              <span>Format FKT (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid: Timeline Angkatan & Sorotan Aturan FKT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Timeline Angkatan (7 Cols di Laptop lg, 8 Cols di xl) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-primary/20 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2 border-b border-primary/10">
            <div>
              <h2 className="text-xl font-bold font-philosopher text-primary">
                Timeline Perjalanan Angkatan '23
              </h2>
              <p className="text-xs font-instrument text-slate-500">
                Peta jalan waktu dari magang hingga wisuda sarjana komputer (Klik kartu untuk buka/tutup detail)
              </p>
            </div>
            <div className="flex items-center space-x-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  const allOpen = Object.keys(expandedTimeline).length === TIMELINE_EVENTS.length && Object.values(expandedTimeline).every(Boolean);
                  if (allOpen) {
                    setExpandedTimeline({});
                  } else {
                    const next = {};
                    TIMELINE_EVENTS.forEach((_, i) => { next[i] = true; });
                    setExpandedTimeline(next);
                  }
                }}
                className="text-xs font-instrument font-bold text-amber-700 hover:text-amber-800 transition-colors px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200"
              >
                {Object.keys(expandedTimeline).length === TIMELINE_EVENTS.length && Object.values(expandedTimeline).every(Boolean)
                  ? 'Tutup Semua'
                  : 'Buka Semua'}
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-xs font-instrument font-bold text-primary hover:text-primary/80 flex items-center space-x-1"
              >
                <span>Detail Tahapan</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative pl-5 sm:pl-7 space-y-3.5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isOpen = !!expandedTimeline[idx];
              return (
                <div key={idx} className="relative group">
                  <div className={`absolute -left-[24px] sm:-left-[27px] top-4 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all ${
                    event.status === 'current'
                      ? 'bg-primary border-white ring-4 ring-sky-100'
                      : event.status === 'highlight'
                      ? 'bg-amber-500 border-white ring-4 ring-amber-100 animate-pulse'
                      : event.status === 'goal'
                      ? 'bg-emerald-500 border-white ring-4 ring-emerald-100'
                      : 'bg-slate-300 border-white ring-2 ring-slate-100'
                  }`} />

                  <div
                    onClick={() => toggleTimelineEvent(idx)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                      isOpen 
                        ? 'bg-white border-primary shadow-md ring-2 ring-primary/10' 
                        : event.status === 'current'
                        ? 'bg-sky-50/60 border-primary/40 hover:border-primary shadow-xs'
                        : event.status === 'highlight'
                        ? 'bg-amber-50/40 border-amber-300 hover:border-amber-400 shadow-xs'
                        : 'bg-white border-slate-200/90 hover:border-primary/50 shadow-xs'
                    }`}
                  >
                    {/* Header: Tanggal & Badge Kategori + Tombol Dropdown */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-600 tracking-wide truncate">
                        {event.date}
                      </span>
                      <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-instrument ${
                          event.status === 'highlight'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                            : event.status === 'current'
                            ? 'bg-primary text-white shadow-2xs'
                            : event.status === 'goal'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {event.category}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isOpen ? 'rotate-180 bg-primary text-white shadow-xs' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                          title={isOpen ? 'Tutup detail' : 'Buka detail'}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Judul Kegiatan (Selalu Terlihat) */}
                    <div>
                      <h3 className="font-bold text-slate-900 font-philosopher text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                    </div>

                    {/* Konten Dropdown (Keterangan Paragraf & Checklist) */}
                    {isOpen && (
                      <div className="mt-3.5 pt-3.5 border-t border-slate-100 animate-fadeIn space-y-3">
                        <p className="text-xs text-slate-600 font-instrument leading-relaxed">
                          {event.desc}
                        </p>

                        {event.highlights && event.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {event.highlights.map((tag, hIdx) => (
                              <span key={hIdx} className="inline-flex items-center text-[10.5px] bg-slate-50 text-slate-700 border border-slate-200/80 px-2.5 py-1 rounded-lg font-instrument font-medium">
                                <Check className="w-3 h-3 text-emerald-600 mr-1.5 stroke-[2.5]" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sorotan Ketentuan Skripsi FKT Alma Ata (5 Cols di Laptop lg, 4 Cols di xl) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-primary text-white rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-primary-700 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2 text-white">
                <BookMarked className="w-5 h-5 text-accent" />
                <h2 className="font-bold font-philosopher text-white text-lg sm:text-xl">Syarat Kunci FKT UAA</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-accent/20 text-accent border border-accent/40 font-instrument whitespace-nowrap">
                11 Poin Lengkap
              </span>
            </div>
            <p className="text-xs font-instrument text-white/80 mb-4">
              Aturan resmi berdasarkan SK Rektor No. 182/A/SK/UAA/IX/2021 & SE Dekan No. 002/2026:
            </p>

            <div className="space-y-2.5 font-instrument max-h-[580px] overflow-y-auto pr-1.5 custom-scrollbar">
              {/* 1. IPK */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-slate-100 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Indeks Prestasi Kumulatif</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">Akademik</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-primary">Minimal IPK 3.25</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Wajib dipertahankan sejak pengajuan judul hingga yudisium kelulusan.</p>
              </div>

              {/* 2. SKS */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-slate-100 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Beban SKS Lulus</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">Akademik</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-primary">Minimal 75% Total SKS</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Telah menyelesaikan dan lulus minimal 75% beban SKS kurikulum prodi.</p>
              </div>

              {/* 3. Ketentuan Nilai Matkul */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-amber-200/60 hover:border-amber-400 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Standar Nilai Mata Kuliah</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Penting</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Bebas Nilai E & Maks. 1 Nilai D</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Nilai Matkul Metodologi Penelitian & seluruh MKU wajib minimal C.</p>
              </div>

              {/* 4. Bahasa Inggris (AAEPT) */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-slate-100 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Kemampuan Bahasa Asing</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">Pusat Bahasa</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Skor AAEPT Minimal 450</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Alma Ata English Proficiency Test resmi dari Pusat Bahasa UAA.</p>
              </div>

              {/* 5. Keagamaan & Karakter */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-slate-100 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Keagamaan & Kemahasiswaan</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Wajib UAA</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Lulus LPBA & Sertifikat PERMATA</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Tashih baca Al-Qur'an, praktik Sholat & Masa Ta'aruf UAA.</p>
              </div>

              {/* 6. Audiens Sempro */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-slate-100 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Presensi Seminar Proposal</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-bold">Prasyarat</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Wajib Hadir Min. 5x Sempro Teman</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Dibuktikan dengan Kartu Kendali ber-ACC Dosen Pembimbing/Penguji.</p>
              </div>

              {/* 7. Frekuensi Bimbingan */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-slate-100 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Frekuensi Bimbingan Dospem</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-violet-100 text-violet-800 px-1.5 py-0.5 rounded font-bold">Logbook</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Minimal 8x Bimbingan per Dospem</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Min. 4x sebelum Sempro & 4x sebelum Ujian Sidang Pendadaran.</p>
              </div>

              {/* 8. Turnitin */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-slate-100 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Uji Bebas Plagiarisme</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-amber-100 text-accent px-1.5 py-0.5 rounded font-bold">Turnitin</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-accent">Maksimal 20% (≤ 20%) Similaritas</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Berlaku untuk draf naskah Proposal maupun Naskah Akhir Skripsi.</p>
              </div>

              {/* 9. Format Penulisan */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-slate-100 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Format Layout Naskah</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">Standar FKT</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Margin 4-4-3-3 & TNR 12 (Spasi 2)</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Dilarang bullet points (wajib penomoran bertingkat 1, 2 / a, b). Cover Biru Laut.</p>
              </div>

              {/* 10. SPM (2 Jalur) */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white text-slate-900 shadow-sm border border-primary/25 hover:border-primary transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 font-semibold mb-0.5">
                  <span>Skor Prestasi Mahasiswa (SPM)</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">2 Jalur</span>
                </div>
                <div className="text-xs font-bold text-primary">Birokrasi 9 Poin & Prodi 25 Poin</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 leading-tight">Konten video/artikel medsos terverifikasi kampus + kegiatan prodi.</p>
              </div>

              {/* 11. Ethical Clearance (SE Dekan) */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-400 text-slate-900 shadow-sm border border-amber-300 hover:bg-amber-300 transition-colors">
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-900 font-bold mb-0.5">
                  <span>Kebijakan Baru Dekan (SE 002/2026)</span>
                  <span className="text-[9.5px] sm:text-[10px] bg-amber-500/30 text-slate-950 px-1.5 py-0.5 rounded font-extrabold">KEPK UAA</span>
                </div>
                <div className="text-xs font-extrabold text-slate-950">Ethical Clearance Wajib Jeda Min. 3 Bulan</div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-900/90 mt-0.5 leading-tight font-medium">Jeda minimal 3 bulan kalender antara terbit EC dan pendaftaran Ujian Semhas.</p>
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
