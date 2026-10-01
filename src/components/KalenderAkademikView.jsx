import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  Search, 
  Award, 
  Clock, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  FileText,
  CalendarCheck,
  GraduationCap,
  Palmtree,
  Filter
} from 'lucide-react';
import { 
  KALENDER_METADATA, 
  JADWAL_YUDISIUM_WISUDA, 
  KALENDER_EVENTS, 
  HARI_LIBUR_UAA 
} from '../data/kalenderAkademik';

export default function KalenderAkademikView() {
  const [activeFilter, setActiveFilter] = useState('semua'); // 'semua' | 'ganjil' | 'genap' | 'yudisium' | 'libur'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = KALENDER_EVENTS.filter((evt) => {
    // Filter semester / kategori
    if (activeFilter === 'ganjil' && evt.semester !== 'ganjil') return false;
    if (activeFilter === 'genap' && evt.semester !== 'genap') return false;
    if (activeFilter === 'yudisium' && !evt.isCrucial) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        evt.kegiatan.toLowerCase().includes(q) ||
        evt.kategori.toLowerCase().includes(q) ||
        evt.mulai.toLowerCase().includes(q) ||
        evt.selesai.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn font-instrument">
      {/* Header Banner */}
      <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 text-accent mb-2">
            <Calendar className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider font-instrument text-accent">
              Agenda Resmi TA 2026/2027
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-philosopher text-white">
            Kalender Akademik Universitas Alma Ata
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1 leading-relaxed">
            Pedoman jadwal resmi perkuliahan, registrasi, KRS, ujian, batas akhir pendadaran skripsi, 
            yudisium tahap I–V, dan prosesi wisuda sarjana (SK Rektor No: <strong className="text-accent">{KALENDER_METADATA.nomorSK}</strong>).
          </p>
        </div>

        <a
          href={KALENDER_METADATA.pdfUrl}
          download="Kalender_Akademik_UAA_2026_2027.pdf"
          className="relative z-10 flex items-center space-x-2 px-5 py-3 rounded-2xl bg-accent hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all self-start md:self-auto flex-shrink-0 cursor-pointer transform hover:-translate-y-0.5"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF SK Rektor (5 Hal)</span>
        </a>
      </div>

      {/* Highlight Khusus: Batas Akhir Pendadaran, Yudisium & Wisuda (Krusial untuk Skripsi!) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-100 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-sky-100">
          <div>
            <div className="flex items-center space-x-2 text-accent mb-1">
              <GraduationCap className="w-5 h-5 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider">Jadwal Penentu Skripsi</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-philosopher text-primary">
              Agenda Yudisium, Batas Pendadaran & Wisuda
            </h2>
          </div>
          <span className="text-xs font-instrument text-slate-500 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200/80 self-start sm:self-auto">
            5 Tahap Periode Kelulusan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JADWAL_YUDISIUM_WISUDA.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-sky-50/50 via-white to-sky-50/30 hover:border-primary transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary text-white font-philosopher">
                    {item.tahap}
                  </span>
                  <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md font-mono">
                    Periode #{idx + 1}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                    <span className="text-[10px] font-bold text-rose-600 block uppercase">
                      Batas Ujian Pendadaran Terakhir:
                    </span>
                    <strong className="text-rose-900 text-xs sm:text-sm font-bold block mt-0.5">
                      {item.batasPendadaran}
                    </strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] font-bold text-amber-700 block uppercase">
                      Tanggal Yudisium:
                    </span>
                    <strong className="text-amber-950 text-xs sm:text-sm font-bold block mt-0.5">
                      {item.yudisium}
                    </strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-700 block uppercase">
                      Upacara Wisuda Sarjana:
                    </span>
                    <strong className="text-emerald-950 text-xs sm:text-sm font-bold block mt-0.5">
                      {item.wisuda}
                    </strong>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 mt-3 pt-2.5 border-t border-slate-100 italic">
                *{item.keterangan}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'semua', label: 'Semua Agenda' },
            { id: 'ganjil', label: 'Semester Ganjil' },
            { id: 'genap', label: 'Semester Genap' },
            { id: 'yudisium', label: 'Yudisium & Wisuda' },
            { id: 'libur', label: 'Hari Libur Resmi' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/50 hover:bg-sky-50/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari kegiatan / tanggal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-xs"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {activeFilter === 'libur' ? (
        /* Tabel Hari Libur Resmi */
        <div className="bg-white rounded-3xl border-2 border-sky-100 shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-primary to-primary-800 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-accent">
                <Palmtree className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-philosopher">Daftar Hari Libur Universitas Alma Ata 2026/2027</h3>
                <p className="text-xs text-white/80 font-instrument">Lampiran 3 SK Rektor No. 216/A/SK/UAA/VII/2026</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-white/15 px-3 py-1 rounded-full text-white">
              {HARI_LIBUR_UAA.length} Hari Libur
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-sky-50/80 border-b border-sky-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6 w-12 text-center">No</th>
                  <th className="py-3.5 px-6">Peringatan Hari Libur</th>
                  <th className="py-3.5 px-6">Hari</th>
                  <th className="py-3.5 px-6">Tanggal Pelaksanaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-instrument">
                {HARI_LIBUR_UAA.map((item, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-3 px-6 text-center font-mono font-bold text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-6 font-bold text-slate-800">{item.peringatan}</td>
                    <td className="py-3 px-6 text-slate-600">{item.hari}</td>
                    <td className="py-3 px-6 font-semibold text-primary">{item.tanggal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Tabel & List Agenda Akademik */
        <div className="bg-white rounded-3xl border-2 border-sky-100 shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-primary to-primary-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-accent">
                <CalendarCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-philosopher">
                  Tabel Rinci Kalender Akademik 2026/2027
                </h3>
                <p className="text-xs text-white/80 font-instrument">
                  Menampilkan {filteredEvents.length} agenda akademik terpilih
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="text-white/90 text-[11px]">Krusial Skripsi / Kelulusan</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-sky-50/80 border-b border-sky-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5 w-12 text-center">No</th>
                  <th className="py-3.5 px-6">Nama Kegiatan / Agenda</th>
                  <th className="py-3.5 px-4 text-center">Semester</th>
                  <th className="py-3.5 px-6">Tanggal Mulai</th>
                  <th className="py-3.5 px-6">Tanggal Selesai</th>
                  <th className="py-3.5 px-4 text-center">Durasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-instrument">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((evt, idx) => (
                    <tr 
                      key={evt.id} 
                      className={`transition-colors ${
                        evt.isCrucial 
                          ? 'bg-rose-50/50 hover:bg-rose-50 font-bold' 
                          : 'hover:bg-sky-50/40'
                      }`}
                    >
                      <td className="py-3.5 px-5 text-center font-mono font-bold text-slate-400">
                        {idx + 1}
                      </td>

                      <td className="py-3.5 px-6">
                        <div className="flex items-center space-x-2">
                          {evt.isCrucial && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                          )}
                          <span className={`text-xs sm:text-sm ${
                            evt.isCrucial ? 'text-rose-950 font-bold' : 'text-slate-800 font-semibold'
                          }`}>
                            {evt.kegiatan}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          evt.semester === 'ganjil'
                            ? 'bg-blue-100 text-blue-800'
                            : evt.semester === 'genap'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {evt.semester}
                        </span>
                      </td>

                      <td className="py-3.5 px-6 text-slate-700 font-mono">
                        {evt.mulai}
                      </td>

                      <td className="py-3.5 px-6 text-primary font-mono font-bold">
                        {evt.selesai}
                      </td>

                      <td className="py-3.5 px-4 text-center font-instrument text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                          {evt.durasi}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-slate-400 text-xs">
                      Tidak ada agenda yang cocok dengan pencarian "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
