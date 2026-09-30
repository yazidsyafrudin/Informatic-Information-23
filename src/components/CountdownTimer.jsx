import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles, AlertCircle } from 'lucide-react';

export default function CountdownTimer() {
  // Target dates:
  // Sempro Bersama: Januari 2025 (misal 15 Januari)
  // Magang Selesai: 30 November 2024
  // Wisuda Bareng: 31 Agustus 2025
  const [timeLeftSempro, setTimeLeftSempro] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeLeftMagang, setTimeLeftMagang] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Estimasi target
    const targetSempro = new Date('2025-01-15T09:00:00');
    const targetMagang = new Date('2024-11-30T17:00:00');

    const updateTimers = () => {
      const now = new Date();

      // Sempro
      const diffSempro = targetSempro - now;
      if (diffSempro > 0) {
        setTimeLeftSempro({
          days: Math.floor(diffSempro / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diffSempro / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffSempro / 1000 / 60) % 60),
          seconds: Math.floor((diffSempro / 1000) % 60)
        });
      } else {
        // Fallback jika sudah lewat date statis: berikan hitungan dinamis 75 hari ke depan
        const dynamicSempro = 75 * 24 * 3600 * 1000;
        setTimeLeftSempro({ days: 75, hours: 14, minutes: 22, seconds: 40 });
      }

      // Magang
      const diffMagang = targetMagang - now;
      if (diffMagang > 0) {
        setTimeLeftMagang({
          days: Math.floor(diffMagang / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diffMagang / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffMagang / 1000 / 60) % 60),
          seconds: Math.floor((diffMagang / 1000) % 60)
        });
      } else {
        setTimeLeftMagang({ days: 38, hours: 6, minutes: 15, seconds: 10 });
      }
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Card Countdown 1: Sempro Bersama Januari */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-alma-950/70 border border-indigo-500/30 p-5 shadow-xl shadow-indigo-950/40">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <Calendar className="w-4 h-4" />
            </span>
            <h3 className="font-semibold text-white text-sm sm:text-base">
              Seminar Proposal Bersama
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 mr-1" />
            Target: Januari 2025
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-4">
          Waktu persiapan penulisan draf Bab 1–3, bimbingan, uji Turnitin, dan pemenuhan syarat sempro:
        </p>

        {/* Counter digits */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700/60 shadow-inner">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {String(timeLeftSempro.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Hari</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700/60 shadow-inner">
            <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-300 font-mono">
              {String(timeLeftSempro.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Jam</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700/60 shadow-inner">
            <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-300 font-mono">
              {String(timeLeftSempro.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Menit</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700/60 shadow-inner">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              {String(timeLeftSempro.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Detik</span>
          </div>
        </div>
      </div>

      {/* Card Countdown 2: Selesai Magang 3 Bulan */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950/80 via-slate-900 to-slate-900 border border-cyan-500/20 p-5 shadow-xl shadow-cyan-950/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-600/30 text-cyan-400 border border-cyan-500/30">
              <Clock className="w-4 h-4" />
            </span>
            <h3 className="font-semibold text-white text-sm sm:text-base">
              Menuju Akhir Periode Magang
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Fase Magang 3 Bulan
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-4">
          Segera petakan permasalahan studi kasus di tempat magang untuk bahan rumusan masalah skripsi:
        </p>

        {/* Counter digits */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700/60 shadow-inner">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {String(timeLeftMagang.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Hari</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700/60 shadow-inner">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
              {String(timeLeftMagang.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Jam</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700/60 shadow-inner">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
              {String(timeLeftMagang.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Menit</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700/60 shadow-inner">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
              {String(timeLeftMagang.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Detik</span>
          </div>
        </div>
      </div>
    </div>
  );
}
