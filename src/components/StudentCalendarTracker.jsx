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

const INDO_DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// Format 'YYYY-MM-DD' ke teks Indonesia beserta Hari
function formatIndoDateWithDay(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  const dayName = INDO_DAYS[d.getDay()];
  const monthIdx = parseInt(month, 10) - 1;
  return `${dayName}, ${parseInt(day, 10)} ${INDO_MONTHS[monthIdx]} ${year}`;
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
    <div className="bg-gradient-to-br from-[#0b5e91] via-[#084d77] to-[#06334f] text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-2xl space-y-6 font-instrument">
      
      {/* Header Bagian Kalender */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/15">
        <div>
          <div className="flex items-center space-x-2 text-amber-300 mb-1">
            <CalendarCheck className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider">Jadwal Kelulusan & Target Pribadi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-philosopher text-white">
            Kalender Progres Mahasiswa & Jadwal Akademik
          </h2>
          <p className="text-xs text-sky-100/90 mt-1 max-w-2xl leading-relaxed">
            Pantau tanggal penting kelulusan (Yudisium, Batas Pendadaran, Wisuda) dan <strong className="text-white">tandai rentang tanggal</strong> untuk progres harianmu (seperti penulisan logbook, bimbingan, atau riset lapangan).
          </p>
        </div>

        <button
          onClick={() => openAddModal(selectedDate)}
          className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-accent hover:bg-amber-600 text-white font-bold text-xs shadow-lg transition-all self-start md:self-auto flex-shrink-0 cursor-pointer transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tandai Progres Baru</span>
        </button>
      </div>

      {/* Kontrol Navigasi Bulan & Dropdown Cepat */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/20 p-4 rounded-2xl border border-white/15 backdrop-blur-xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer shadow-2xs"
            title="Bulan Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <h3 className="text-base sm:text-lg font-bold font-philosopher text-white min-w-[170px] text-center tracking-wide">
            {INDO_MONTHS[displayMonth]} {displayYear}
          </h3>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer shadow-2xs"
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
            className="bg-[#073b5c] border border-white/25 text-white text-xs rounded-xl px-2.5 py-2 font-medium focus:outline-none focus:border-accent shadow-2xs cursor-pointer"
          >
            {INDO_MONTHS.map((m, idx) => (
              <option key={idx} value={idx} className="bg-slate-900 text-white">{m}</option>
            ))}
          </select>

          <select
            value={displayYear}
            onChange={(e) => setDisplayYear(parseInt(e.target.value, 10))}
            className="bg-[#073b5c] border border-white/25 text-white text-xs rounded-xl px-2.5 py-2 font-mono font-bold focus:outline-none focus:border-accent shadow-2xs cursor-pointer"
          >
            {[2024, 2025, 2026, 2027].map((yr) => (
              <option key={yr} value={yr} className="bg-slate-900 text-white">{yr}</option>
            ))}
          </select>

          <button
            onClick={handleResetToday}
            className="px-3 py-2 rounded-xl bg-accent text-white text-xs font-bold hover:bg-amber-600 transition-colors shadow-sm cursor-pointer"
          >
            Hari Ini
          </button>
        </div>
      </div>

      {/* Keterangan Warna / Legenda Blok Warna Modern */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs bg-black/20 p-3.5 rounded-2xl border border-white/15 backdrop-blur-xs">
        <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">Warna Kotak:</span>
        <div className="flex items-center space-x-1.5 bg-blue-950/70 px-2.5 py-1 rounded-xl border border-blue-400/60 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
          <span className="text-blue-100 font-bold text-[11px]">Magang / KKL</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-purple-950/70 px-2.5 py-1 rounded-xl border border-purple-400/60 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
          <span className="text-purple-100 font-bold text-[11px]">Skripsi / Riset</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-emerald-950/70 px-2.5 py-1 rounded-xl border border-emerald-400/60 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          <span className="text-emerald-100 font-bold text-[11px]">Target Pribadi</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-amber-950/70 px-2.5 py-1 rounded-xl border border-amber-400/60 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
          <span className="text-amber-100 font-bold text-[11px]">Bimbingan / Yudisium</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-rose-950/70 px-2.5 py-1 rounded-xl border border-rose-400/60 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
          <span className="text-rose-100 font-bold text-[11px]">Ujian / Pendadaran</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-yellow-950/70 px-2.5 py-1 rounded-xl border border-yellow-400/60 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
          <span className="text-yellow-100 font-bold text-[11px]">Wisuda 🎓</span>
        </div>
      </div>

      {/* Grid Kalender Bulanan Modern (Card Tiles di atas Background Biru) */}
      <div className="bg-black/25 p-3 sm:p-5 rounded-3xl border border-white/15 shadow-inner space-y-3 backdrop-blur-xs">
        {/* Nama-nama Hari (Senin - Minggu) */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-3 text-center">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum'].map((d) => (
            <div key={d} className="py-2 rounded-xl bg-white/15 border border-white/15 text-white font-bold text-xs font-philosopher shadow-2xs">
              {d}
            </div>
          ))}
          <div className="py-2 rounded-xl bg-amber-500/25 border border-amber-400/40 text-amber-300 font-bold text-xs font-philosopher shadow-2xs">
            Sab
          </div>
          <div className="py-2 rounded-xl bg-rose-500/25 border border-rose-400/40 text-rose-300 font-bold text-xs font-philosopher shadow-2xs">
            Min
          </div>
        </div>

        {/* Grid Kartu-Kartu Tanggal */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
          {/* Kotak kosong offset awal bulan */}
          {Array.from({ length: startOffset }).map((_, idx) => (
            <div 
              key={`offset-${idx}`} 
              className="min-h-[74px] sm:min-h-[88px] rounded-2xl bg-white/5 border border-dashed border-white/15" 
            />
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

            // Penentuan Warna Blok Kartu Tanggal
            let tileClass = 'bg-white/95 border-white/40 text-slate-800 shadow-md hover:bg-white hover:border-accent';
            let badgeLabel = null;
            let badgeStyle = '';

            if (dayUserEvents.length > 0) {
              const primaryCat = dayUserEvents[0].category;
              if (primaryCat === 'magang') {
                tileClass = 'bg-gradient-to-br from-sky-50 via-blue-100 to-blue-200 border-2 border-blue-500 text-blue-950 shadow-md';
                badgeLabel = 'Magang';
                badgeStyle = 'bg-blue-600 text-white';
              } else if (primaryCat === 'skripsi') {
                tileClass = 'bg-gradient-to-br from-purple-50 via-fuchsia-100 to-purple-200 border-2 border-purple-500 text-purple-950 shadow-md';
                badgeLabel = 'Skripsi';
                badgeStyle = 'bg-purple-600 text-white';
              } else if (primaryCat === 'pribadi') {
                tileClass = 'bg-gradient-to-br from-emerald-50 via-teal-100 to-emerald-200 border-2 border-emerald-500 text-emerald-950 shadow-md';
                badgeLabel = 'Target';
                badgeStyle = 'bg-emerald-600 text-white';
              } else if (primaryCat === 'bimbingan') {
                tileClass = 'bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 border-2 border-amber-500 text-amber-950 shadow-md';
                badgeLabel = 'Bimbingan';
                badgeStyle = 'bg-amber-600 text-white';
              } else if (primaryCat === 'ujian') {
                tileClass = 'bg-gradient-to-br from-rose-50 via-red-100 to-rose-200 border-2 border-rose-500 text-rose-950 shadow-md';
                badgeLabel = 'Ujian';
                badgeStyle = 'bg-rose-600 text-white';
              }
            } else if (hasPendadaran) {
              tileClass = 'bg-gradient-to-br from-rose-100 to-red-200 border-2 border-rose-500 text-rose-950 shadow-md';
              badgeLabel = 'Pendadaran';
              badgeStyle = 'bg-rose-600 text-white';
            } else if (hasYudisium) {
              tileClass = 'bg-gradient-to-br from-amber-100 to-orange-200 border-2 border-amber-500 text-amber-950 shadow-md';
              badgeLabel = 'Yudisium';
              badgeStyle = 'bg-amber-600 text-white';
            } else if (hasWisuda) {
              tileClass = 'bg-gradient-to-br from-yellow-100 to-amber-200 border-2 border-yellow-500 text-yellow-950 shadow-md';
              badgeLabel = 'Wisuda 🎓';
              badgeStyle = 'bg-yellow-600 text-white';
            } else if (hasUjian) {
              tileClass = 'bg-gradient-to-br from-indigo-100 to-blue-200 border-2 border-indigo-400 text-indigo-950 shadow-md';
              badgeLabel = 'Ujian';
              badgeStyle = 'bg-indigo-600 text-white';
            } else if (hasLibur) {
              tileClass = 'bg-red-100/90 border border-red-300 text-red-950 shadow-xs';
              badgeLabel = 'Libur';
              badgeStyle = 'bg-red-600 text-white';
            }

            return (
              <div
                key={`day-${dayNum}`}
                onClick={() => setSelectedDate(dateStr)}
                className={`min-h-[74px] sm:min-h-[88px] p-2 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative group hover:scale-[1.03] hover:shadow-lg ${tileClass} ${
                  isSelected
                    ? 'ring-4 ring-accent ring-offset-2 ring-offset-[#073b5c] z-10 shadow-2xl scale-[1.04]'
                    : ''
                }`}
              >
                {/* Header Angka Hari */}
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs sm:text-sm font-mono font-bold w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center transition-all ${
                    isToday
                      ? 'bg-accent text-white shadow-md font-black ring-2 ring-amber-300'
                      : isSelected
                      ? 'bg-primary text-white font-black'
                      : ''
                  }`}>
                    {dayNum}
                  </span>

                  {dayUserEvents.length > 1 && (
                    <span className="text-[9px] font-mono font-bold bg-white/90 border border-slate-300 text-slate-800 px-1 py-0.2 rounded-md shadow-2xs">
                      +{dayUserEvents.length}
                    </span>
                  )}
                </div>

                {/* Badge Label Rapi di Bagian Bawah Kotak Tanggal */}
                {badgeLabel ? (
                  <div className="w-full mt-auto pt-1">
                    <span className={`block w-full text-center px-1 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold shadow-2xs truncate ${badgeStyle}`}>
                      {badgeLabel}
                    </span>
                  </div>
                ) : (
                  <div className="h-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rincian Agenda & Progres pada Tanggal yang Dipilih (Card Putih Bersih di dalam Tema Biru) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white text-slate-900 border-2 border-white/20 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-sky-50 text-primary border border-sky-200">
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Agenda & Progres Terpilih:
              </span>
              <h4 className="text-base sm:text-lg font-bold font-philosopher text-primary">
                {formatIndoDateWithDay(selectedDate)}
              </h4>
            </div>
          </div>

          <button
            onClick={() => openAddModal(selectedDate)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
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
          <div className="bg-white text-slate-800 rounded-3xl border-2 border-primary/20 shadow-2xl p-6 sm:p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
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
