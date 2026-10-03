import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Heart, 
  Sparkles, 
  Code2, 
  Laptop, 
  Rocket, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Map, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  DownloadCloud, 
  ArrowRight,
  Coffee,
  Target,
  Cpu,
  HelpCircle,
  Building2,
  BookCheck,
  Flame,
  Check
} from 'lucide-react';
import { MAHASISWA_IF23_LIST } from '../data/mahasiswaIf23';
import { StorageService } from '../lib/supabase';

// Ikon Media Sosial untuk Kartu Direktori Mahasiswa
function InstagramIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function GithubIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-2.5 h-2.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.27a1.62 1.62 0 0 0-1.62 1.62c0 .89.73 1.62 1.62 1.62a1.62 1.62 0 0 0 1.62-1.62c0-.89-.73-1.62-1.62-1.62z"/>
    </svg>
  );
}

function WebIcon({ className = "w-2.5 h-2.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function XIcon({ className = "w-2.5 h-2.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function YoutubeIcon({ className = "w-2.5 h-2.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

// Komponen Kartu Mahasiswa Sesuai Desain Modern Pusing Coding
function StudentCard({ mhs }) {
  const [imgError, setImgError] = useState(false);

  const statusConfig = {
    Aktif: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dot: 'bg-emerald-500'
    },
    Cuti: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
      dot: 'bg-amber-500'
    },
    Skripsi: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200/80',
      dot: 'bg-blue-500'
    },
    Magang: {
      bg: 'bg-purple-50 text-purple-700 border-purple-200/80',
      dot: 'bg-purple-500'
    }
  };

  const statusStyle = statusConfig[mhs.status] || statusConfig.Aktif;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3 group relative">
      {/* 1. Foto / Avatar Mahasiswa (Kiri) */}
      <div className="relative w-18 h-22 sm:w-20 sm:h-26 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-blue-100 flex-shrink-0 border border-sky-200/60 shadow-inner flex items-center justify-center">
        {/* Jika belum daftar akun: Tampilkan Logo Pusing Coding sesuai permintaan user */}
        {!mhs.isRegistered ? (
          <div className="w-full h-full bg-gradient-to-b from-sky-50 to-blue-50/70 p-2.5 flex flex-col items-center justify-center relative select-none">
            <img 
              src="/logo pusing coding.png" 
              alt="Logo Pusing Coding" 
              onError={(e) => { e.currentTarget.src = '/puscod23.png'; }}
              className="w-full h-full object-contain filter drop-shadow-2xs group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-1 px-1.5 py-0.2 rounded-md bg-slate-900/80 text-white font-mono text-[7.5px] font-semibold tracking-wider">
              BELUM DAFTAR
            </span>
          </div>
        ) : !imgError && mhs.foto ? (
          <img 
            src={mhs.foto}
            alt={mhs.nama}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Fallback Avatar Mahasiswa IF UAA */
          <div className="w-full h-full flex flex-col items-center justify-end relative select-none">
            <div className="absolute top-2 w-10 h-10 rounded-full bg-white/70 blur-xs"></div>
            <div className="relative z-10 w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-700 text-white font-bold text-sm flex items-center justify-center shadow-xs border-2 border-white mb-0.5 font-philosopher">
              {mhs.nama.charAt(0).toUpperCase()}
            </div>
            {/* Siluet Jas Almamater Alma Ata */}
            <div className="relative z-10 w-16 h-7 bg-primary rounded-t-xl border-t border-sky-300/40 flex items-center justify-center">
              <div className="w-4 h-full bg-white/90 flex items-center justify-center">
                <div className="w-1.5 h-full bg-accent"></div>
              </div>
            </div>
            <div className="absolute top-1.5 left-1.5 text-[8px] font-bold font-mono px-1 py-0.2 rounded bg-white/90 text-primary border border-primary/20 shadow-2xs">
              IF'23
            </div>
          </div>
        )}
      </div>

      {/* 2. Informasi Mahasiswa (Kanan) */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
        <div>
          {/* Baris Status & Nomor Urut */}
          <div className="flex items-center justify-between gap-1.5">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold border ${statusStyle.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} ${mhs.status === 'Aktif' ? 'animate-pulse' : ''}`}></span>
              {mhs.status}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 px-1.5 py-0.5 rounded-md border border-slate-200/80 bg-slate-50/70">
              #{mhs.no}
            </span>
          </div>

          {/* Nama Mahasiswa */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <h3 
              className="font-bold text-slate-900 text-xs sm:text-[13.5px] leading-snug truncate group-hover:text-primary transition-colors"
              title={mhs.nama}
            >
              {mhs.nama}
            </h3>
            {mhs.isRegistered && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" title="Mahasiswa terdaftar & aktif"></span>
            )}
          </div>

          {/* NIM & Angkatan */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mt-0.5">
            <span className="font-mono font-semibold">{mhs.nim}</span>
            <span>•</span>
            <span className="text-primary font-semibold">IF '23</span>
          </div>

          {/* Motto / Quote (Max 50 karakter) */}
          <p className="text-[10.5px] sm:text-[11px] text-slate-600 line-clamp-2 mt-1 leading-snug italic font-normal">
            "{mhs.quote}"
          </p>
        </div>

        {/* Baris Ikon Sosial Media */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 pt-1.5 border-t border-slate-100">
          {/* X / Twitter (jika ada) */}
          {mhs.socials?.x && (
            <a 
              href={mhs.socials.x !== '#' ? mhs.socials.x : undefined} 
              target="_blank" 
              rel="noopener noreferrer" 
              title="X (Twitter)"
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white flex items-center justify-center hover:scale-115 hover:shadow-xs transition-transform cursor-pointer"
            >
              <XIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </a>
          )}

          {/* Instagram */}
          <a 
            href={mhs.socials?.instagram && mhs.socials.instagram !== '#' ? mhs.socials.instagram : undefined} 
            target="_blank" 
            rel="noopener noreferrer" 
            title={mhs.socials?.instagram && mhs.socials.instagram !== '#' ? `Buka Instagram ${mhs.nama}` : 'Instagram belum diatur'}
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-transform ${
              mhs.socials?.instagram && mhs.socials.instagram !== '#'
                ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white hover:scale-115 hover:shadow-xs cursor-pointer'
                : 'bg-slate-100 text-slate-300 cursor-default'
            }`}
          >
            <InstagramIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </a>

          {/* GitHub */}
          <a 
            href={mhs.socials?.github && mhs.socials.github !== '#' ? mhs.socials.github : undefined} 
            target="_blank" 
            rel="noopener noreferrer" 
            title={mhs.socials?.github && mhs.socials.github !== '#' ? `Buka GitHub ${mhs.nama}` : 'GitHub belum diatur'}
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-transform ${
              mhs.socials?.github && mhs.socials.github !== '#'
                ? 'bg-slate-900 text-white hover:scale-115 hover:shadow-xs cursor-pointer'
                : 'bg-slate-100 text-slate-300 cursor-default'
            }`}
          >
            <GithubIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </a>

          {/* LinkedIn atau YouTube */}
          {mhs.socials?.youtube ? (
            <a 
              href={mhs.socials.youtube !== '#' ? mhs.socials.youtube : undefined} 
              target="_blank" 
              rel="noopener noreferrer" 
              title={`YouTube ${mhs.nama}`}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-115 hover:shadow-xs transition-transform cursor-pointer"
            >
              <YoutubeIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </a>
          ) : (
            <a 
              href={mhs.socials?.linkedin && mhs.socials.linkedin !== '#' ? mhs.socials.linkedin : undefined} 
              target="_blank" 
              rel="noopener noreferrer" 
              title={mhs.socials?.linkedin && mhs.socials.linkedin !== '#' ? `Buka LinkedIn ${mhs.nama}` : 'LinkedIn belum diatur'}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-transform ${
                mhs.socials?.linkedin && mhs.socials.linkedin !== '#'
                  ? 'bg-[#0a66c2] text-white hover:scale-115 hover:shadow-xs cursor-pointer'
                  : 'bg-slate-100 text-slate-300 cursor-default'
              }`}
            >
              <LinkedinIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            </a>
          )}

          {/* Portfolio / Website */}
          <a 
            href={mhs.socials?.web && mhs.socials.web !== '#' ? mhs.socials.web : undefined} 
            target="_blank" 
            rel="noopener noreferrer" 
            title={mhs.socials?.web && mhs.socials.web !== '#' ? `Buka Portfolio ${mhs.nama}` : 'Website belum diatur'}
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center transition-transform ${
              mhs.socials?.web && mhs.socials.web !== '#'
                ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-primary hover:border-primary/40 hover:scale-115 hover:shadow-xs cursor-pointer'
                : 'bg-slate-50 border-slate-100 text-slate-300 cursor-default'
            }`}
          >
            <WebIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AboutView({ setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [registeredMap, setRegisteredMap] = useState({});

  // Ambil daftar profil dari Supabase (dan dengarkan event update)
  const fetchProfiles = useCallback(async () => {
    try {
      const list = await StorageService.getAllRegisteredProfiles();
      if (Array.isArray(list)) {
        const map = {};
        list.forEach(p => {
          if (p.nim) {
            map[String(p.nim).trim()] = p;
          }
        });
        setRegisteredMap(map);
      }
    } catch (err) {
      console.warn('Gagal memuat profil terdaftar:', err);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();

    const onProfileUpdated = () => {
      fetchProfiles();
    };
    window.addEventListener('if23-profile-updated', onProfileUpdated);
    return () => {
      window.removeEventListener('if23-profile-updated', onProfileUpdated);
    };
  }, [fetchProfiles]);

  // Gabungkan data resmi 33 mahasiswa dengan profil kustom dari database Supabase
  const combinedStudents = useMemo(() => {
    const activeUser = StorageService.getCurrentUser();
    const activeNim = activeUser?.nim ? String(activeUser.nim).trim() : null;

    return MAHASISWA_IF23_LIST.map(mhs => {
      const nimStr = String(mhs.nim).trim();
      const isCurrentActive = activeNim && activeNim === nimStr;
      const reg = isCurrentActive 
        ? { ...(registeredMap[nimStr] || {}), ...activeUser } 
        : registeredMap[nimStr];

      if (reg) {
        // Jika MAHASISWA SUDAH DAFTAR: ambil foto, quote, dan link medsos dari database
        return {
          ...mhs,
          isRegistered: true,
          foto: reg.avatar_url || mhs.foto,
          quote: (reg.quote !== undefined && reg.quote !== null && reg.quote !== '') ? reg.quote : mhs.quote,
          socials: {
            instagram: reg.instagram || mhs.socials?.instagram || '#',
            linkedin: reg.linkedin || mhs.socials?.linkedin || '#',
            github: reg.github || mhs.socials?.github || '#',
            web: reg.website || mhs.socials?.web || '#',
            x: mhs.socials?.x,
            youtube: mhs.socials?.youtube
          }
        };
      }
      // Jika BELUM DAFTAR: gunakan foto Logo Pusing Coding sesuai permintaan
      return {
        ...mhs,
        isRegistered: false,
        foto: '/logo pusing coding.png'
      };
    });
  }, [registeredMap]);

  // Hitung jumlah mahasiswa berdasarkan status
  const statusCounts = useMemo(() => {
    const counts = { Semua: combinedStudents.length, Aktif: 0, Magang: 0, Skripsi: 0, Cuti: 0 };
    combinedStudents.forEach(m => {
      if (counts[m.status] !== undefined) counts[m.status]++;
    });
    return counts;
  }, [combinedStudents]);

  // Filter Mahasiswa berdasarkan pencarian nama atau NIM & status
  const filteredStudents = useMemo(() => {
    return combinedStudents.filter(m => {
      const matchQuery = !searchQuery.trim() || 
        m.nama.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
        m.nim.toLowerCase().includes(searchQuery.toLowerCase().trim());
      
      const matchStatus = statusFilter === 'Semua' || m.status === statusFilter;

      return matchQuery && matchStatus;
    });
  }, [combinedStudents, searchQuery, statusFilter]);

  return (
    <div className="space-y-12 animate-fadeIn pb-12 font-instrument text-slate-800">
      
      {/* 1. HERO SECTION - Solid Blue UAA Style */}
      <section className="relative overflow-hidden rounded-3xl bg-primary text-white p-8 sm:p-12 lg:p-16 text-center shadow-xl border-2 border-primary-700">
        {/* Glow ambient decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Logo dengan Ring Hover */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white/20 shadow-2xl backdrop-blur-md mb-6 transition-transform duration-300 hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <img 
                src="/logo pusing coding.png" 
                alt="Logo Pusing Coding" 
                className="w-full h-full object-contain p-1"
              />
            </div>
          </div>

          {/* Badge Prodi & Akreditasi */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 text-white border border-white/25 text-xs font-bold shadow-xs mb-4 backdrop-blur-xs">
            <Award className="w-4 h-4 text-accent" />
            <span>S1 Informatika • Universitas Alma Ata Yogyakarta</span>
          </div>

          {/* Heading Philosopher */}
          <h1 className="font-philosopher font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4">
            Tentang Kami: <span className="text-accent">Pusing Coding IF23</span>
          </h1>

          <p className="text-white/90 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Portal terpadu, ruang perjuangan, dan wadah solidaritas {MAHASISWA_IF23_LIST.length} mahasiswa aktif 
            <strong className="text-white font-bold"> Informatika Angkatan 2023</strong>. 
            Dari hari pertama masuk kelas, pusing debugging error bareng, hingga melangkah serentak ke panggung wisuda Sarjana Komputer!
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl pt-2">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-xs">
              <span className="block font-philosopher text-2xl sm:text-3xl font-bold text-accent">{MAHASISWA_IF23_LIST.length}</span>
              <span className="text-xs text-white/80 font-medium">Mahasiswa Aktif</span>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-xs">
              <span className="block font-philosopher text-2xl sm:text-3xl font-bold text-white">ASIIN</span>
              <span className="text-xs text-white/80 font-medium">Akreditasi Internasional</span>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-xs">
              <span className="block font-philosopher text-2xl sm:text-3xl font-bold text-accent">100%</span>
              <span className="text-xs text-white/80 font-medium">Target Lulus Bareng</span>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-xs">
              <span className="block font-philosopher text-2xl sm:text-3xl font-bold text-white">S.Kom</span>
              <span className="text-xs text-white/80 font-medium">Gelar Kebanggaan</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CERITA & FILOSOFI "PUSING CODING" */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-primary/20 shadow-md">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <Coffee className="w-3.5 h-3.5 text-accent" />
              <span>Filosofi & Kisah di Balik Nama</span>
            </div>
            <h2 className="font-philosopher font-bold text-2xl sm:text-4xl text-primary">
              Kenapa Dinamakan "Pusing Coding"?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
            <div className="md:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                Setiap mahasiswa teknik informatika tahu persis rasanya ketika kode program yang dibuat berjam-jam tiba-tiba menampilkan <span className="font-mono bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-bold text-xs">Error 500</span>, <span className="font-mono bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-bold text-xs">SyntaxError</span>, atau logika algoritma yang tak kunjung menemukan titik temu.
              </p>
              <p>
                Nama <strong className="text-primary font-bold">"Pusing Coding"</strong> awalnya adalah gurauan akrab di kelas dan laboratorium saat kami mengerjakan tugas praktikum hingga larut. Namun lambat laun, rasa "pusing" itu berevolusi menjadi sebuah <em>identitas kebersamaan</em>.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 py-1 italic text-slate-600 bg-amber-50/50 rounded-r-xl">
                "Kalau pusing sendirian bisa bikin putus asa, tapi kalau pusingnya bareng teman seangkatan, itu jadi tawa, cerita, dan semangat untuk saling bantu sampai kodenya running!"
              </blockquote>
              <p>
                Platform ini didirikan agar tidak ada satupun kawan di Informatika 2023 yang berjuang sendirian. Mulai dari urusan magang industri/MSIB, bimbingan proposal, Turnitin, hingga wisuda, kami menjalaninya sebagai satu kesatuan.
              </p>
            </div>

            <div className="md:col-span-5 space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 space-y-1.5">
                <div className="flex items-center space-x-2 text-primary font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span className="font-philosopher">1. Solidaritas Tanpa Batas</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tidak ada yang ditinggalkan di belakang. Masalah satu mahasiswa adalah perhatian bersama seangkatan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <Code2 className="w-4 h-4 text-accent" />
                  <span className="font-philosopher">2. Kolaborasi Terbuka</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Berbagi referensi jurnal, template dokumen FKT, tips lolos sempro, dan review source code secara transparan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span className="font-philosopher">3. Komitmen Lulus Bersama</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menjaga ritme target dari sempro serentak hingga siap mengenakan toga kelulusan di Gedung Sportorium Alma Ata.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI ANGKATAN */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visi */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <Rocket className="w-3.5 h-3.5 text-accent" />
              <span>Visi Angkatan IF23</span>
            </div>
            <h3 className="font-philosopher font-bold text-2xl text-primary">
              The Globe Inspiring Generation
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Mewujudkan mahasiswa S1 Informatika Angkatan 2023 Universitas Alma Ata yang unggul dalam penguasaan rekayasa perangkat lunak, sains data, dan kecerdasan buatan, berintegritas tinggi, berakhlak mulia, serta berhasil <strong className="text-primary font-bold">lulus 100% tepat waktu</strong> sebagai Sarjana Komputer yang berdaya saing global.
            </p>
          </div>
          <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-primary">
            <span>Satu Visi • Satu Hati • Sarjana Komputer UAA</span>
          </div>
        </div>

        {/* Misi */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-accent/30 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold">
              <Target className="w-3.5 h-3.5 text-accent" />
              <span>Misi Aksi Nyata</span>
            </div>
            <h3 className="font-philosopher font-bold text-2xl text-slate-900">
              Pilar Aksi Menuju Kelulusan
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Pendampingan Proposal & Skripsi:</strong> Menyelenggarakan forum diskusi intensif, peninjauan Turnitin, dan persiapan berkas sempro.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Akses Informasi Terpadu:</strong> Menyediakan kalender akademik, jadwal yudisium, dan pusat berkas resmi FKT dalam satu pintu.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Penguatan Komunitas Digital:</strong> Memanfaatkan portal berbasis AI dan forum terbuka untuk saling bertukar solusi seputar magang dan karir IT.</span>
              </li>
            </ul>
          </div>
          <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-accent">
            <span>Fakultas Sains, Rekayasa dan Teknologi • UAA</span>
          </div>
        </div>
      </section>

      {/* 4. DIREKTORI MAHASISWA AKTIF INFORMATIKA ANGKATAN 2023 */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-primary/20 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5 text-accent" />
              <span>Daftar Resmi Mahasiswa</span>
            </div>
            <h2 className="font-philosopher font-bold text-2xl sm:text-3xl text-primary">
              Keluarga Besar Informatika 2023
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Terdiri dari {MAHASISWA_IF23_LIST.length} mahasiswa aktif yang tercatat resmi menempuh program studi S1 Informatika UAA.
            </p>
          </div>

          {/* Kolom Pencarian */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau NIM..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Status & Counter Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'Semua', label: 'Semua', count: statusCounts.Semua },
              { id: 'Aktif', label: 'Aktif', count: statusCounts.Aktif, dot: 'bg-emerald-500' },
              { id: 'Magang', label: 'Magang', count: statusCounts.Magang, dot: 'bg-purple-500' },
              { id: 'Skripsi', label: 'Skripsi', count: statusCounts.Skripsi, dot: 'bg-blue-500' },
              { id: 'Cuti', label: 'Cuti', count: statusCounts.Cuti, dot: 'bg-amber-500' }
            ].map(tab => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200/90 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {tab.dot && <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : tab.dot}`}></span>}
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500">
            <span>Menampilkan <strong className="text-primary font-bold">{filteredStudents.length}</strong> dari {MAHASISWA_IF23_LIST.length} mahasiswa</span>
            <span className="text-[11px] font-mono hidden md:inline">IF23 UAA</span>
          </div>
        </div>

        {/* Grid Kartu Mahasiswa Sesuai Desain Modern */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <HelpCircle className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">Mahasiswa tidak ditemukan</p>
            <p className="text-xs text-slate-500">Coba ganti filter status atau cari dengan nama / NIM lainnya.</p>
            {(searchQuery || statusFilter !== 'Semua') && (
              <button 
                onClick={() => { setSearchQuery(''); setStatusFilter('Semua'); }}
                className="mt-2 text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Reset Semua Filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredStudents.map((mhs) => (
              <StudentCard key={mhs.nim} mhs={mhs} />
            ))}
          </div>
        )}
      </section>

      {/* 5. SHOWCASE EKOSISTEM PORTAL WEB INFORMATIKA 23 */}
      <section className="bg-gradient-to-br from-primary-900 to-primary text-white rounded-3xl p-6 sm:p-10 border-2 border-primary-700 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Ekosistem Aplikasi Digital</span>
          </div>
          <h2 className="font-philosopher font-bold text-2xl sm:text-4xl text-white">
            Fitur Canggih Portal Pusing Coding
          </h2>
          <p className="text-xs sm:text-sm text-white/80">
            Dibuat khusus untuk mempermudah perjalanan akademik mahasiswa dari magang hingga wisuda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Roadmap */}
          <div 
            onClick={() => setActiveTab('roadmap')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-md">
                <Map className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Roadmap Kelulusan
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Panduan komprehensif 5 fase kelulusan FKT: dari magang industri, sempro, revisi, ujian skripsi, hingga wisuda.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Buka Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Dashboard Mahasiswa */}
          <div 
            onClick={() => setActiveTab('tracker')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Dashboard & Milestone Tracker
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Pantau progres skripsi pribadi, target kalender belajar, skor AAEPT, dan persentase Turnitin secara real-time.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Buka Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Ruang Diskusi & AI */}
          <div 
            onClick={() => setActiveTab('diskusi')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-md">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Forum Diskusi & AI Assistant
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Ruang obrolan bertopik (Umum, Magang, Sempro) dengan gaya komentar TikTok, fitur edit batas 2 menit, dan AI Bot FKT.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Masuk Ruang Diskusi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Kalender Akademik */}
          <div 
            onClick={() => setActiveTab('kalender')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Kalender Akademik Terpadu
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Agenda resmi UAA, batas pendaftaran sempro, jadwal sidang yudisium berkala, serta daftar libur universitas.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Lihat Kalender</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Panduan FKT */}
          <div 
            onClick={() => setActiveTab('panduan')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Buku Panduan Skripsi FKT
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Viewer PDF interaktif pedoman penulisan skripsi SK Rektor No. 182/A/SK/UAA/IX/2021 lengkap dengan daftar bab.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Baca Panduan PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: Pusat Unduhan */}
          <div 
            onClick={() => setActiveTab('downloads')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-md">
                <DownloadCloud className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Pusat Berkas & Template
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Unduh template resmi naskah proposal, lembar pengesahan, form bimbingan dosen, dan dokumen pelengkap FKT.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Buka Berkas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. ALMAMATER & INFORMASI KAMPUS */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-primary/20 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mb-4 bg-white p-2">
              <img 
                src="/logo pusing coding.png" 
                alt="Universitas Alma Ata" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-philosopher font-bold text-lg text-primary">
              Universitas Alma Ata
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Fakultas Sains, Rekayasa dan Teknologi
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-accent text-white text-[11px] font-bold">
              Akreditasi Unggul & ASIIN
            </span>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <Building2 className="w-3.5 h-3.5 text-accent" />
              <span>Kampus & Sekretariat</span>
            </div>
            <h3 className="font-philosopher font-bold text-2xl text-slate-900">
              Rumah Belajar Kami di Yogyakarta
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kampus Terpadu Universitas Alma Ata berlokasi di Jl. Brawijaya No.99, Tamantirto, Kasihan, Bantul, Daerah Istimewa Yogyakarta 55183. Kampus ini menjadi saksi proses pembelajaran kami dalam mendalami teknologi informasi, kecerdasan buatan, dan sains komputasi.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                🌐 almaata.ac.id
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                📍 Tamantirto, Bantul, DIY
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                🎓 Angkatan 2023 • Wisuda 2025/2026
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
