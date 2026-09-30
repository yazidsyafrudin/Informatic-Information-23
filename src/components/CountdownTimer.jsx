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
      {/* Card Countdown 1: Sempro Bersama Januari (Nuansa Biru Segar) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-sky-100/70 border-2 border-sky-200/90 p-6 shadow-sm hover:shadow-md hover:border-primary transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-2.5 rounded-xl bg-primary text-white shadow-xs">
              <Calendar className="w-5 h-5" />
            </span>
            <h3 className="font-philosopher font-bold text-primary text-base sm:text-lg">
              Seminar Proposal Bersama
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold font-instrument bg-primary text-white shadow-xs flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-accent" />
            Januari 2025
          </span>
        </div>

        <p className="text-xs font-instrument text-slate-600 mb-5 leading-relaxed">
          Waktu persiapan draf Bab 1–3, bimbingan, uji Turnitin (≤ 20%), dan pemenuhan syarat sempro:
        </p>

        {/* Counter digits */}
        <div className="grid grid-cols-4 gap-2.5 text-center font-instrument">
          <div className="bg-white rounded-2xl p-3 border-2 border-sky-100 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-slate-800 font-mono">
              {String(timeLeftSempro.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-primary">Hari</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-sky-100 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-mono">
              {String(timeLeftSempro.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-primary">Jam</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-sky-100 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-mono">
              {String(timeLeftSempro.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-primary">Menit</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-sky-100 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-accent font-mono">
              {String(timeLeftSempro.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-accent">Detik</span>
          </div>
        </div>
      </div>

      {/* Card Countdown 2: Selesai Magang 3 Bulan (Nuansa Biru Segar) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-sky-100/70 border-2 border-sky-200/90 p-6 shadow-sm hover:shadow-md hover:border-primary transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-2.5 rounded-xl bg-primary text-white shadow-xs">
              <Clock className="w-5 h-5" />
            </span>
            <h3 className="font-philosopher font-bold text-primary text-base sm:text-lg">
              Menuju Akhir Periode Magang
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold font-instrument bg-sky-100 text-primary border border-sky-200">
            Fase Magang 3 Bulan
          </span>
        </div>

        <p className="text-xs font-instrument text-slate-600 mb-5 leading-relaxed">
          Petakan permasalahan studi kasus di tempat magang untuk bahan rumusan masalah skripsi:
        </p>

        {/* Counter digits */}
        <div className="grid grid-cols-4 gap-2.5 text-center font-instrument">
          <div className="bg-white rounded-2xl p-3 border-2 border-sky-100 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-slate-800 font-mono">
              {String(timeLeftMagang.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-primary">Hari</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-sky-100 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-mono">
              {String(timeLeftMagang.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-primary">Jam</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-sky-100 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-mono">
              {String(timeLeftMagang.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-primary">Menit</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-sky-100 shadow-xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-accent font-mono">
              {String(timeLeftMagang.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-accent">Detik</span>
          </div>
        </div>
      </div>
    </div>
  );
}
