import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Clock, 
  Sparkles, 
  GraduationCap, 
  Award, 
  AlertCircle, 
  X, 
  Bookmark,
  CalendarCheck,
  Tag
} from 'lucide-react';
import { 
  JADWAL_YUDISIUM_WISUDA, 
  KALENDER_EVENTS, 
  HARI_LIBUR_UAA 
} from '../data/kalenderAkademik';

// Mapping nama bulan Indonesia
const INDO_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const MONTH_MAP = {
  'januari': '01', 'februari': '02', 'maret': '03', 'april': '04',
  'mei': '05', 'juni': '06', 'juli': '07', 'agustus': '08',
  'september': '09', 'oktober': '10', 'november': '11', 'desember': '12'
};

// Parser tanggal teks Indonesia ke 'YYYY-MM-DD'
function parseIndoDate(str) {
  if (!str || str === '-') return null;
  const match = str.match(/(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})/);
  if (!match) return null;
  const day = match[1].padStart(2, '0');
  const month = MONTH_MAP[match[2].toLowerCase()];
  const year = match[3];
  if (!month) return null;
  return `${year}-${month}-${day}`;
}

// Format 'YYYY-MM-DD' ke teks Indonesia
function formatIndoDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const monthIdx = parseInt(month, 10) - 1;
  return `${parseInt(day, 10)} ${INDO_MONTHS[monthIdx]} ${year}`;
}

export default function StudentCalendarTracker({ profile }) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed

  // State tampilan bulan & tahun kalender (default ke bulan & tahun sekarang)
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [displayMonth, setDisplayMonth] = useState(currentMonth);

  // Tanggal yang sedang diklik/dipilih user (format YYYY-MM-DD)
  const initialDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [selectedDate, setSelectedDate] = useState(initialDateStr);

  // Progres custom yang ditandai oleh user
  const storageKey = `IF23_USER_SCHEDULE_${profile?.nim || 'GUEST'}`;
  const [userEvents, setUserEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default contoh progres untuk membantu mahasiswa memahami fitur
    return [
      {
        id: 'init-1',
        title: 'Penulisan Logbook Magang Minggu 1–4',
        startDate: '2026-10-01',
        endDate: '2026-10-06',
        category: 'magang',
        desc: 'Merekap kegiatan magang dan meminta tanda tangan supervisor'
      },
      {
        id: 'init-2',
        title: 'Bimbingan Bab 1 & Bab 3 dengan Dospem',
        startDate: '2026-10-15',
        endDate: '2026-10-18',
        category: 'bimbingan',
        desc: 'Konsultasi metodologi riset dan instrumen kaji etik'
      }
    ];
  });

  // Simpan ke localStorage saat userEvents berubah
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(userEvents));
    } catch (e) {
      console.error('Failed to save user schedule:', e);
    }
  }, [userEvents, storageKey]);

  // Modal State untuk Tambah / Edit Progres
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formStartDate, setFormStartDate] = useState(initialDateStr);
  const [formEndDate, setFormEndDate] = useState(initialDateStr);
  const [formCategory, setFormCategory] = useState('magang');
  const [formDesc, setFormDesc] = useState('');

  // 1. Ekstrak Semua Event Akademik Resmi menjadi format terstruktur
  const academicEvents = useMemo(() => {
    const events = [];

    // Dari Jadwal Yudisium & Wisuda
    JADWAL_YUDISIUM_WISUDA.forEach((item, idx) => {
      const pendadaranDate = parseIndoDate(item.batasPendadaran);
      if (pendadaranDate) {
        events.push({
          id: `yud-pend-${idx}`,
          title: `Batas Ujian Pendadaran (${item.tahap})`,
          date: pendadaranDate,
          endDate: pendadaranDate,
          type: 'pendadaran',
          label: 'Batas Pendadaran',
          badgeColor: 'bg-rose-500 text-white',
          desc: `Batas akhir ujian pendadaran untuk pendaftaran ${item.tahap}.`
        });
      }

      const yudisiumDate = parseIndoDate(item.yudisium);
      if (yudisiumDate) {
        events.push({
          id: `yud-${idx}`,
          title: `Yudisium Kelulusan ${item.tahap}`,
          date: yudisiumDate,
          endDate: yudisiumDate,
          type: 'yudisium',
          label: 'Yudisium',
          badgeColor: 'bg-amber-600 text-white',
          desc: `Upacara penetapan kelulusan sarjana & yudisium resmi.`
        });
      }

      const wisudaDate = parseIndoDate(item.wisuda);
      if (wisudaDate) {
        events.push({
          id: `wis-${idx}`,
          title: `Wisuda Sarjana (${item.tahap})`,
          date: wisudaDate,
          endDate: wisudaDate,
          type: 'wisuda',
          label: 'Wisuda',
          badgeColor: 'bg-accent text-white',
          desc: `Upacara prosesi wisuda sarjana Universitas Alma Ata.`
        });
      }
    });

    // Dari Kalender Akademik Umum (UTS, UAS, KKN, Registrasi)
    KALENDER_EVENTS.forEach((evt) => {
      const start = parseIndoDate(evt.mulai) || parseIndoDate(evt.selesai);
      const end = parseIndoDate(evt.selesai) || start;
      if (start) {
        events.push({
          id: `acad-${evt.id}`,
          title: evt.kegiatan,
          date: start,
          endDate: end,
          type: evt.kategori.toLowerCase(),
          label: evt.kategori,
          badgeColor: evt.isCrucial 
            ? 'bg-rose-600 text-white' 
            : evt.kategori === 'Ujian'
            ? 'bg-indigo-600 text-white'
            : 'bg-primary text-white',
          desc: `${evt.durasi} • Semester ${evt.semester.toUpperCase()}`
        });
      }
    });

    // Dari Hari Libur Resmi
    HARI_LIBUR_UAA.forEach((libur, idx) => {
      const d = parseIndoDate(libur.tanggal);
      if (d) {
        events.push({
          id: `libur-${idx}`,
          title: `Libur: ${libur.peringatan}`,
          date: d,
          endDate: d,
          type: 'libur',
          label: 'Libur',
          badgeColor: 'bg-teal-600 text-white',
          desc: `${libur.hari} • ${libur.tanggal}`
        });
      }
    });

    return events;
  }, []);

  // Navigasi Bulan Kalender
  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const handleResetToday = () => {
    setDisplayYear(currentYear);
    setDisplayMonth(currentMonth);
    setSelectedDate(initialDateStr);
  };

  // Kalkulasi hari dalam bulan yang aktif
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstDayIndex = new Date(displayYear, displayMonth, 1).getDay();
  // Sesuaikan agar Senin = 0, Minggu = 6
  const startOffset = (firstDayIndex + 6) % 7;

  // Cek apakah tanggal berada dalam rentang
  const isDateInRange = (dateStr, startStr, endStr) => {
    return dateStr >= startStr && dateStr <= endStr;
  };

  // Helper untuk membuka modal tambah progres
  const openAddModal = (dateStr = selectedDate) => {
    setEditingEventId(null);
    setFormTitle('');
    setFormStartDate(dateStr);
    setFormEndDate(dateStr);
    setFormCategory('magang');
    setFormDesc('');
    setIsModalOpen(true);
  };

  // Helper untuk edit progres
  const openEditModal = (item) => {
    setEditingEventId(item.id);
    setFormTitle(item.title);
    setFormStartDate(item.startDate);
    setFormEndDate(item.endDate);
    setFormCategory(item.category || 'magang');
    setFormDesc(item.desc || '');
    setIsModalOpen(true);
  };

  // Simpan formulir progres user
  const handleSaveUserEvent = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const start = formStartDate <= formEndDate ? formStartDate : formEndDate;
    const end = formStartDate <= formEndDate ? formEndDate : formStartDate;

    if (editingEventId) {
      // Update
      setUserEvents(userEvents.map(evt => evt.id === editingEventId ? {
        ...evt,
        title: formTitle.trim(),
        startDate: start,
        endDate: end,
        category: formCategory,
        desc: formDesc.trim()
      } : evt));
    } else {
      // Tambah baru
      const newEvent = {
        id: `user-${Date.now()}`,
        title: formTitle.trim(),
        startDate: start,
        endDate: end,
        category: formCategory,
        desc: formDesc.trim()
      };
      setUserEvents([newEvent, ...userEvents]);
    }

    setIsModalOpen(false);
  };

  // Hapus progres user
  const handleDeleteUserEvent = (id) => {
    setUserEvents(userEvents.filter(evt => evt.id !== id));
  };

  // Dapatkan semua event pada tanggal yang sedang dipilih
  const eventsOnSelectedDate = useMemo(() => {
    const result = {
      academic: [],
      user: []
    };

    academicEvents.forEach(evt => {
      if (isDateInRange(selectedDate, evt.date, evt.endDate)) {
        result.academic.push(evt);
      }
    });

    userEvents.forEach(evt => {
      if (isDateInRange(selectedDate, evt.startDate, evt.endDate)) {
        result.user.push(evt);
      }
    });

    return result;
  }, [selectedDate, academicEvents, userEvents]);

  // Kategori styling & warna blok kotak untuk progres user
  const categoryStyles = {
    magang: { 
      label: 'Magang / KKL', 
      name: 'Blok Biru (Magang / KKL / Logbook)',
      color: 'bg-blue-600 text-white', 
      border: 'border-blue-300', 
      bgSoft: 'bg-blue-50',
      cellBg: 'bg-blue-100 hover:bg-blue-200/90 border-blue-300 text-blue-950 font-bold',
      dot: 'bg-blue-600'
    },
    skripsi: { 
      label: 'Riset & Skripsi', 
      name: 'Blok Ungu (Riset & Skripsi)',
      color: 'bg-purple-600 text-white', 
      border: 'border-purple-300', 
      bgSoft: 'bg-purple-50',
      cellBg: 'bg-purple-100 hover:bg-purple-200/90 border-purple-300 text-purple-950 font-bold',
      dot: 'bg-purple-600'
    },
    pribadi: { 
      label: 'Target Pribadi', 
      name: 'Blok Hijau (Target Pribadi / Tugas)',
      color: 'bg-emerald-600 text-white', 
      border: 'border-emerald-300', 
      bgSoft: 'bg-emerald-50',
      cellBg: 'bg-emerald-100 hover:bg-emerald-200/90 border-emerald-300 text-emerald-950 font-bold',
      dot: 'bg-emerald-600'
    },
    bimbingan: { 
      label: 'Bimbingan Dospem', 
      name: 'Blok Kuning / Oranye (Bimbingan)',
      color: 'bg-amber-600 text-white', 
      border: 'border-amber-300', 
      bgSoft: 'bg-amber-50',
      cellBg: 'bg-amber-100 hover:bg-amber-200/90 border-amber-300 text-amber-950 font-bold',
      dot: 'bg-amber-600'
    },
    ujian: { 
      label: 'Ujian / Revisi', 
      name: 'Blok Merah (Ujian / Sempro / Pendadaran)',
      color: 'bg-rose-600 text-white', 
      border: 'border-rose-300', 
      bgSoft: 'bg-rose-50',
      cellBg: 'bg-rose-100 hover:bg-rose-200/90 border-rose-300 text-rose-950 font-bold',
      dot: 'bg-rose-600'
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-100 shadow-xl space-y-6 font-instrument">
      
      {/* Header Bagian Kalender */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-sky-100">
        <div>
          <div className="flex items-center space-x-2 text-accent mb-1">
            <CalendarCheck className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider">Jadwal Kelulusan & Target Pribadi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-philosopher text-primary">
            Kalender Progres Mahasiswa & Jadwal Akademik
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Pantau tanggal penting kelulusan (Yudisium, Batas Pendadaran, Wisuda) dan <strong>tandai rentang tanggal</strong> untuk progres harianmu (seperti penulisan logbook, bimbingan, atau riset lapangan).
          </p>
        </div>

        <button
          onClick={() => openAddModal(selectedDate)}
          className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-accent hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all self-start md:self-auto flex-shrink-0 cursor-pointer transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tandai Progres Baru</span>
        </button>
      </div>

      {/* Kontrol Navigasi Bulan & Dropdown Cepat */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-sky-50/60 p-4 rounded-2xl border border-sky-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-colors cursor-pointer shadow-2xs"
            title="Bulan Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <h3 className="text-base sm:text-lg font-bold font-philosopher text-primary min-w-[170px] text-center">
            {INDO_MONTHS[displayMonth]} {displayYear}
          </h3>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-colors cursor-pointer shadow-2xs"
            title="Bulan Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dropdown Loncat Cepat & Tombol Reset "Hari Ini" */}
        <div className="flex items-center space-x-2">
          <select
            value={displayMonth}
            onChange={(e) => setDisplayMonth(parseInt(e.target.value, 10))}
            className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-2.5 py-2 font-medium focus:outline-none focus:border-primary shadow-2xs cursor-pointer"
          >
            {INDO_MONTHS.map((m, idx) => (
              <option key={idx} value={idx}>{m}</option>
            ))}
          </select>

          <select
            value={displayYear}
            onChange={(e) => setDisplayYear(parseInt(e.target.value, 10))}
            className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-2.5 py-2 font-mono font-bold focus:outline-none focus:border-primary shadow-2xs cursor-pointer"
          >
            {[2024, 2025, 2026, 2027].map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>

          <button
            onClick={handleResetToday}
            className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-700 transition-colors shadow-2xs cursor-pointer"
          >
            Hari Ini
          </button>
        </div>
      </div>

      {/* Keterangan Warna / Legenda Blok Warna */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] pt-1 pb-1 bg-slate-50/90 p-3 rounded-2xl border border-slate-200">
        <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">Warna Kotak Tanggal:</span>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-blue-100 border border-blue-400 inline-block shadow-2xs" />
          <span className="text-slate-800 font-semibold">Biru (Magang / KKL)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-purple-100 border border-purple-400 inline-block shadow-2xs" />
          <span className="text-slate-800 font-semibold">Ungu (Riset & Skripsi)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-emerald-100 border border-emerald-400 inline-block shadow-2xs" />
          <span className="text-slate-800 font-semibold">Hijau (Logbook / Target Pribadi)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-amber-100 border border-amber-400 inline-block shadow-2xs" />
          <span className="text-slate-800 font-semibold">Kuning/Oranye (Bimbingan / Yudisium)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-rose-100 border border-rose-400 inline-block shadow-2xs" />
          <span className="text-slate-800 font-semibold">Merah (Ujian / Batas Akhir)</span>
        </div>
        <div className="flex items-center space-x-1.5 ml-auto hidden md:flex">
          <span className="text-slate-400 text-[10px] italic">Klik tanggal untuk melihat keterangan lengkap di bawah</span>
        </div>
      </div>

      {/* Grid Kalender Bulanan */}
      <div className="border border-sky-100 rounded-3xl overflow-hidden shadow-xs">
        {/* Nama-nama Hari (Senin - Minggu) */}
        <div className="grid grid-cols-7 bg-primary text-white text-center font-bold text-xs py-3 font-philosopher">
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span className="text-amber-300">Sab</span>
          <span className="text-rose-300">Min</span>
        </div>

        {/* Sel-sel Tanggal */}
        <div className="grid grid-cols-7 divide-x divide-y divide-sky-100 bg-white">
          {/* Kotak kosong offset awal bulan */}
          {Array.from({ length: startOffset }).map((_, idx) => (
            <div key={`offset-${idx}`} className="h-14 sm:h-18 bg-slate-50/40" />
          ))}

          {/* Tanggal 1 s.d. hari terakhir */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateStr = `${displayYear}-${String(displayMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;
            const isToday = initialDateStr === dateStr;

            // Cari event akademik pada tanggal ini
            const dayAcadEvents = academicEvents.filter(evt => isDateInRange(dateStr, evt.date, evt.endDate));
            // Cari event progres user pada tanggal ini
            const dayUserEvents = userEvents.filter(evt => isDateInRange(dateStr, evt.startDate, evt.endDate));

            // Cek kategori event kelulusan penting (milestone)
            const hasPendadaran = dayAcadEvents.some(evt => evt.type === 'pendadaran');
            const hasYudisium = dayAcadEvents.some(evt => evt.type === 'yudisium');
            const hasWisuda = dayAcadEvents.some(evt => evt.type === 'wisuda');
            const hasLibur = dayAcadEvents.some(evt => evt.type === 'libur');
            const hasUjian = dayAcadEvents.some(evt => evt.type === 'ujian');

            // Penentuan Warna Blok Kotak Tanggal
            // Prioritas: Target User (Biru/Ungu/Hijau/Oranye/Merah) -> Batas Pendadaran -> Yudisium -> Wisuda -> Ujian -> Libur -> Netral
            let cellBlockClass = 'bg-white hover:bg-sky-50/50 text-slate-800';

            if (dayUserEvents.length > 0) {
              const primaryCat = dayUserEvents[0].category;
              const cStyle = categoryStyles[primaryCat] || categoryStyles.magang;
              cellBlockClass = cStyle.cellBg;
            } else if (hasPendadaran) {
              cellBlockClass = 'bg-rose-100/90 hover:bg-rose-200/90 border-rose-300 text-rose-950 font-bold';
            } else if (hasYudisium) {
              cellBlockClass = 'bg-amber-100/90 hover:bg-amber-200/90 border-amber-300 text-amber-950 font-bold';
            } else if (hasWisuda) {
              cellBlockClass = 'bg-yellow-100/90 hover:bg-yellow-200/90 border-yellow-300 text-yellow-950 font-bold';
            } else if (hasUjian) {
              cellBlockClass = 'bg-indigo-50/80 hover:bg-indigo-100/70 border-indigo-200 text-indigo-950';
            } else if (hasLibur) {
              cellBlockClass = 'bg-red-50/70 hover:bg-red-100/70 border-red-200 text-red-900';
            }

            return (
              <div
                key={`day-${dayNum}`}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-14 sm:h-18 p-1 sm:p-2 transition-all cursor-pointer flex flex-col justify-between relative group ${cellBlockClass} ${
                  isSelected
                    ? 'ring-2 ring-primary ring-inset z-10 shadow-xs'
                    : ''
                }`}
              >
                {/* Header Angka Hari & Pin jika user menandai */}
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs sm:text-sm font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isToday
                      ? 'bg-accent text-white shadow-xs font-black'
                      : isSelected
                      ? 'bg-primary text-white font-black'
                      : ''
                  }`}>
                    {dayNum}
                  </span>

                  {dayUserEvents.length > 0 && (
                    <span className="text-[10px] leading-none" title={`${dayUserEvents.length} target progres kamu`}>
                      📌
                    </span>
                  )}
                </div>

                {/* Titik-titik Indikator Rapi di Bagian Bawah Kotak Tanggal (Tanpa Teks Keterangan) */}
                <div className="flex items-center justify-center space-x-1 pb-0.5">
                  {dayUserEvents.slice(0, 2).map((ue, i) => {
                    const cStyle = categoryStyles[ue.category] || categoryStyles.magang;
                    return (
                      <span key={`udot-${i}`} className={`w-1.5 h-1.5 rounded-full ${cStyle.dot}`} title={ue.title} />
                    );
                  })}
                  {hasPendadaran && <span className="w-1.5 h-1.5 rounded-full bg-rose-600" title="Batas Ujian Pendadaran" />}
                  {hasYudisium && <span className="w-1.5 h-1.5 rounded-full bg-amber-600" title="Jadwal Yudisium" />}
                  {hasWisuda && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" title="Jadwal Wisuda" />}
                  {hasUjian && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" title="Jadwal Ujian" />}
                  {hasLibur && <span className="w-1.5 h-1.5 rounded-full bg-red-500" title="Hari Libur" />}
                  {dayAcadEvents.length > 0 && !hasPendadaran && !hasYudisium && !hasWisuda && !hasUjian && !hasLibur && (
                    <span className="w-1 h-1 rounded-full bg-slate-400" title="Ada agenda akademik" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rincian Agenda & Progres pada Tanggal yang Dipilih */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-sky-50/70 via-white to-sky-50/50 border-2 border-sky-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sky-200/80">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Agenda pada Tanggal:
            </span>
            <h4 className="text-base sm:text-lg font-bold font-philosopher text-primary">
              {formatIndoDate(selectedDate)}
            </h4>
          </div>

          <button
            onClick={() => openAddModal(selectedDate)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-700 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tandai Progres di Tanggal Ini</span>
          </button>
        </div>

        {/* Daftar Agenda Akademik pada Tanggal Tersebut */}
        {eventsOnSelectedDate.academic.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">Jadwal Resmi Akademik:</span>
            {eventsOnSelectedDate.academic.map((evt) => (
              <div 
                key={evt.id} 
                className="p-3 rounded-xl bg-white border border-sky-200 flex items-start space-x-3 shadow-2xs"
              >
                <div className={`p-1.5 rounded-lg text-xs font-bold ${evt.badgeColor} flex-shrink-0 mt-0.5`}>
                  {evt.label}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-800">{evt.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Daftar Progres Mandiri Mahasiswa pada Tanggal Tersebut */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 block">Progres / Target Kamu:</span>
          {eventsOnSelectedDate.user.length > 0 ? (
            eventsOnSelectedDate.user.map((ue) => {
              const cStyle = categoryStyles[ue.category] || categoryStyles.magang;
              return (
                <div 
                  key={ue.id} 
                  className={`p-3.5 rounded-2xl border ${cStyle.border} ${cStyle.bgSoft} flex items-start justify-between gap-3 shadow-2xs`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-base">📌</span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${cStyle.color}`}>
                          {cStyle.label}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-600">
                          {formatIndoDate(ue.startDate)} s.d. {formatIndoDate(ue.endDate)}
                        </span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">{ue.title}</h5>
                      {ue.desc && (
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{ue.desc}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(ue)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-white transition-colors"
                      title="Edit Progres"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUserEvent(ue.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-white transition-colors"
                      title="Hapus Progres"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 rounded-2xl bg-white border border-dashed border-sky-200 text-center text-xs text-slate-500">
              Belum ada target atau progres yang kamu tandai pada tanggal ini. Klik tombol <strong>"Tandai Progres di Tanggal Ini"</strong> untuk mencatat!
            </div>
          )}
        </div>
      </div>

      {/* Modal Form Tambah / Edit Progres */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border-2 border-primary/20 shadow-2xl p-6 sm:p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 text-primary mb-1">
              <div className="p-2 rounded-xl bg-sky-50 text-accent">
                <Bookmark className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-philosopher">
                {editingEventId ? 'Edit Progres Mahasiswa' : 'Tandai Progres / Target Baru'}
              </h3>
            </div>
            
            <p className="text-xs text-slate-500 mb-5 font-instrument">
              Tentukan tanggal mulai, tanggal selesai, dan keterangan progres tugas/skripsimu.
            </p>

            <form onSubmit={handleSaveUserEvent} className="space-y-4 font-instrument text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Nama / Keterangan Progres
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Penulisan Logbook Magang 1–6 / Revisi Bab 1"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Rentang Tanggal (Mulai & Selesai) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    required
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Pilih Warna Kotak & Kategori Progres
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(categoryStyles).map(([catKey, catVal]) => {
                    const isSelectedCat = formCategory === catKey;
                    return (
                      <button
                        key={catKey}
                        type="button"
                        onClick={() => setFormCategory(catKey)}
                        className={`flex items-center space-x-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelectedCat
                            ? `${catVal.cellBg} ring-2 ring-primary border-primary`
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${catVal.dot} flex-shrink-0`} />
                        <span className="text-[11px] font-bold">{catVal.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows="2"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Tambahkan detail penugasan atau berkas yang perlu disiapkan..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Simpan Progres ke Kalender
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
