import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeftSempro, setTimeLeftSempro] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeLeftMagang, setTimeLeftMagang] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-alma-50/50 to-indigo-50/40 border border-alma-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-alma-100 text-alma-700">
              <Calendar className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Seminar Proposal Bersama
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-amber-600" />
            Januari 2025
          </span>
        </div>

        <p className="text-xs text-slate-600 mb-4">
          Waktu persiapan draf Bab 1–3, bimbingan, uji Turnitin (≤ 20%), dan pemenuhan syarat sempro:
        </p>

        {/* Counter digits */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {String(timeLeftSempro.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">Hari</span>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-alma-700 font-mono">
              {String(timeLeftSempro.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">Jam</span>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-alma-700 font-mono">
              {String(timeLeftSempro.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">Menit</span>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
              {String(timeLeftSempro.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">Detik</span>
          </div>
        </div>
      </div>

      {/* Card Countdown 2: Selesai Magang 3 Bulan */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-cyan-50/50 to-alma-50/40 border border-cyan-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-100 text-cyan-700">
              <Clock className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Menuju Akhir Periode Magang
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
            Fase Magang 3 Bulan
          </span>
        </div>

        <p className="text-xs text-slate-600 mb-4">
          Petakan permasalahan studi kasus di tempat magang untuk bahan rumusan masalah skripsi:
        </p>

        {/* Counter digits */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {String(timeLeftMagang.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">Hari</span>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-700 font-mono">
              {String(timeLeftMagang.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">Jam</span>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-700 font-mono">
              {String(timeLeftMagang.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">Menit</span>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-600 font-mono">
              {String(timeLeftMagang.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">Detik</span>
          </div>
        </div>
      </div>
    </div>
  );
}
