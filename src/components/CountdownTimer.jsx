import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeftSempro, setTimeLeftSempro] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeLeftMagang, setTimeLeftMagang] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetSempro = new Date('2027-01-15T09:00:00');
    const targetMagang = new Date('2026-11-30T17:00:00');

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Card Countdown 1: Sempro Bersama Januari (Solid Blue BG) */}
      <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-6 sm:p-7 shadow-lg border-2 border-primary-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-2.5 rounded-xl bg-white/15 text-white border border-white/20 shadow-xs">
              <Calendar className="w-5 h-5" />
            </span>
            <h3 className="font-philosopher font-bold text-white text-lg sm:text-xl tracking-wide">
              Seminar Proposal Bersama
            </h3>
          </div>
          <span className="px-3.5 py-1 rounded-full text-xs font-bold font-instrument bg-accent text-white shadow-sm flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-white" />
            Januari 2027
          </span>
        </div>

        <p className="text-xs sm:text-sm font-instrument text-white/85 mb-5 leading-relaxed">
          Waktu persiapan draf Bab 1–3, bimbingan, uji Turnitin (≤ 20%), dan pemenuhan syarat sempro:
        </p>

        {/* Counter digits in high contrast white boxes */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center font-instrument">
          <div className="bg-white rounded-2xl p-3 shadow-md">
            <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {String(timeLeftSempro.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-bold text-primary">Hari</span>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-md">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-mono">
              {String(timeLeftSempro.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-bold text-primary">Jam</span>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-md">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-mono">
              {String(timeLeftSempro.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-bold text-primary">Menit</span>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-md">
            <span className="block text-2xl sm:text-3xl font-extrabold text-accent font-mono">
              {String(timeLeftSempro.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-bold text-accent">Detik</span>
          </div>
        </div>
      </div>

      {/* Card Countdown 2: Selesai Magang 3 Bulan (Solid Blue BG) */}
      <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-6 sm:p-7 shadow-lg border-2 border-primary-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-2.5 rounded-xl bg-white/15 text-white border border-white/20 shadow-xs">
              <Clock className="w-5 h-5" />
            </span>
            <h3 className="font-philosopher font-bold text-white text-lg sm:text-xl tracking-wide">
              Menuju Akhir Periode Magang
            </h3>
          </div>
          <span className="px-3.5 py-1 rounded-full text-xs font-bold font-instrument bg-white/20 text-white border border-white/30">
            Fase Magang 3 Bulan
          </span>
        </div>

        <p className="text-xs sm:text-sm font-instrument text-white/85 mb-5 leading-relaxed">
          Petakan permasalahan studi kasus di tempat magang untuk bahan rumusan masalah skripsi:
        </p>

        {/* Counter digits in high contrast white boxes */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center font-instrument">
          <div className="bg-white rounded-2xl p-3 shadow-md">
            <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {String(timeLeftMagang.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-bold text-primary">Hari</span>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-md">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-mono">
              {String(timeLeftMagang.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-bold text-primary">Jam</span>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-md">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-mono">
              {String(timeLeftMagang.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-bold text-primary">Menit</span>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-md">
            <span className="block text-2xl sm:text-3xl font-extrabold text-accent font-mono">
              {String(timeLeftMagang.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-bold text-accent">Detik</span>
          </div>
        </div>
      </div>
    </div>
  );
}
