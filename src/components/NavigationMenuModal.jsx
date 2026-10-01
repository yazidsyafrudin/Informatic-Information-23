import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  LayoutDashboard, 
  Map, 
  CheckSquare, 
  BookOpen, 
  DownloadCloud, 
  Calendar,
  Sparkles,
  ArrowRight,
  User,
  ShieldCheck,
  LogIn
} from 'lucide-react';

export default function NavigationMenuModal({ isOpen, onClose, activeTab, onSelectTab, currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  // Daftar semua halaman navigasi aplikasi
  const pages = [
    {
      id: 'dashboard',
      title: 'Beranda & Timeline',
      category: 'Halaman Utama',
      desc: 'Countdown sempro, timeline angkatan 23 & dokumentasi kegiatan',
      icon: LayoutDashboard,
      badge: 'Utama'
    },
    {
      id: 'roadmap',
      title: 'Roadmap Kelulusan',
      category: 'Panduan Skripsi',
      desc: '6 Fase terstruktur dari Magang, Sempro, EC hingga Wisuda',
      icon: Map,
      badge: '6 Fase'
    },
    {
      id: 'tracker',
      title: currentUser ? 'Dashboard Mahasiswa' : 'Dashboard Pribadi (Login)',
      category: 'Ruang Kendali',
      desc: currentUser 
        ? `Profil ${currentUser.nama_lengkap} & checklist kelulusan tersimpan` 
        : 'Masuk / daftar akun untuk menyimpan centang progres kelulusanmu',
      icon: CheckSquare,
      badge: currentUser ? 'Akun Aktif' : 'Login / Daftar'
    },
    {
      id: 'kalender',
      title: 'Kalender Akademik 2026/2027',
      category: 'Jadwal Resmi UAA',
      desc: 'Jadwal kuliah, batas pendadaran, yudisium I–V & wisuda UAA',
      icon: Calendar,
      badge: 'SK 216/2026'
    },
    {
      id: 'panduan',
      title: 'Panduan FKT (PDF)',
      category: 'Pedoman Resmi',
      desc: 'Intisari 50 halaman pedoman skripsi FKT & aturan SPM prodi',
      icon: BookOpen,
      badge: 'Pedoman'
    },
    {
      id: 'downloads',
      title: 'Pusat Berkas & Template',
      category: 'Unduhan',
      desc: 'Formulir pendaftaran, SK dospem, logbook magang & dokumen Word',
      icon: DownloadCloud,
      badge: 'Template'
    }
  ];

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPages = pages.filter((page) => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (pageId) => {
    onSelectTab(pageId);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-16 sm:pt-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-white border-2 border-primary/20 rounded-3xl shadow-2xl overflow-hidden font-instrument text-slate-800 flex flex-col max-h-[88vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Status Bar - Selaras dengan Desain Web UAA */}
        <div className="px-5 py-3 bg-gradient-to-r from-primary to-primary-800 text-white flex items-center justify-between text-xs">
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold font-philosopher">
                {currentUser.nama_lengkap?.charAt(0) || 'M'}
              </div>
              <span className="font-semibold truncate max-w-[220px]">
                {currentUser.nama_lengkap} ({currentUser.nim})
              </span>
              <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white/90 text-xs">
                Mode Tamu • Akses Informasi Terbuka
              </span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-white/70 hidden sm:inline">Pusing Coding IF23</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Header */}
        <div className="relative flex items-center px-5 py-3.5 border-b border-sky-100 bg-sky-50/50">
          <Search className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari halaman, panduan, atau jadwal..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-primary transition-colors mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-white rounded-md border border-slate-200 shadow-2xs">
              ESC
            </kbd>
          )}
        </div>

        {/* List of Navigation Pages */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-1.5 custom-scrollbar">
          <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-instrument">
            <span>Halaman Navigasi</span>
            <span className="text-slate-400 font-normal">6 Menu Tersedia</span>
          </div>

          {filteredPages.length > 0 ? (
            filteredPages.map((page) => {
              const Icon = page.icon;
              const isActive = activeTab === page.id;

              return (
                <button
                  key={page.id}
                  onClick={() => handleSelect(page.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all text-left cursor-pointer group border ${
                    isActive
                      ? 'bg-primary text-white border-primary-700 shadow-md ring-2 ring-accent/40'
                      : 'bg-white border-transparent hover:border-sky-200 hover:bg-sky-50/80 text-slate-800 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive 
                        ? 'bg-white/15 text-accent shadow-xs' 
                        : 'bg-sky-50 text-primary group-hover:bg-primary group-hover:text-white'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold font-philosopher truncate ${
                          isActive ? 'text-white' : 'text-slate-800 group-hover:text-primary'
                        }`}>
                          {page.title}
                        </span>
                        {page.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-instrument ${
                            isActive 
                              ? 'bg-accent text-white shadow-xs' 
                              : 'bg-sky-100 text-primary border border-sky-200'
                          }`}>
                            {page.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs truncate mt-0.5 font-instrument ${
                        isActive ? 'text-white/85' : 'text-slate-500'
                      }`}>
                        {page.desc}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform group-hover:translate-x-1 ${
                    isActive ? 'text-accent' : 'text-slate-400 group-hover:text-primary'
                  }`} />
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs font-instrument">
              Tidak ada halaman yang cocok dengan kata kunci "{searchQuery}"
            </div>
          )}
        </div>

        {/* Modal Footer - Selaras dengan Warna Web */}
        <div className="px-5 py-3 bg-sky-50/80 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 font-instrument">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Target Lulus Bareng Angkatan '23</span>
          </div>
          <span>Klik menu mana saja untuk langsung berpindah</span>
        </div>
      </div>
    </div>
  );
}
