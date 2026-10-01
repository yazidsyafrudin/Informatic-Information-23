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
  ArrowRight
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
      desc: 'Countdown sempro, timeline angkatan 23 & dokumentasi',
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
        : 'Masuk / daftar untuk menyimpan centang progres kelulusanmu',
      icon: CheckSquare,
      badge: currentUser ? 'Akun Aktif' : 'Login / Daftar'
    },
    {
      id: 'kalender',
      title: 'Kalender Akademik 2026/2027',
      category: 'Jadwal Resmi',
      desc: 'Jadwal perkuliahan, batas pendadaran, yudisium I-V & wisuda UAA',
      icon: Calendar,
      badge: 'Baru • SK 216/2026'
    },
    {
      id: 'panduan',
      title: 'Panduan FKT (PDF)',
      category: 'Dokumen Resmi',
      desc: 'Intisari 50 halaman pedoman skripsi & aturan SPM prodi',
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
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-20 sm:pt-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden font-instrument text-slate-100 flex flex-col max-h-[85vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative flex items-center px-5 py-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari halaman atau aksi..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded-md border border-slate-700">
              ESC
            </kbd>
          )}
          <button
            onClick={onClose}
            className="sm:hidden p-1.5 ml-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Pages */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-1 custom-scrollbar">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-instrument">
            Halaman Navigasi
          </div>

          {filteredPages.length > 0 ? (
            filteredPages.map((page) => {
              const Icon = page.icon;
              const isActive = activeTab === page.id;

              return (
                <button
                  key={page.id}
                  onClick={() => handleSelect(page.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all text-left cursor-pointer group ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'hover:bg-slate-800/80 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-800 text-slate-300 group-hover:bg-primary group-hover:text-white'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold font-philosopher truncate ${
                          isActive ? 'text-white' : 'text-slate-100 group-hover:text-white'
                        }`}>
                          {page.title}
                        </span>
                        {page.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-instrument ${
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-slate-800 text-accent border border-slate-700'
                          }`}>
                            {page.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs truncate mt-0.5 ${
                        isActive ? 'text-white/80' : 'text-slate-400'
                      }`}>
                        {page.desc}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform group-hover:translate-x-1 ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'
                  }`} />
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              Tidak ada halaman yang cocok dengan kata kunci "{searchQuery}"
            </div>
          )}
        </div>

        {/* Modal Footer Tip */}
        <div className="px-5 py-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-instrument">
          <span>Informatika 23 Universitas Alma Ata</span>
          <span>Klik item untuk beralih halaman</span>
        </div>
      </div>
    </div>
  );
}
