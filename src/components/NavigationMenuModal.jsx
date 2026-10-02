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
  MessageSquare
} from 'lucide-react';

export default function NavigationMenuModal({ isOpen, onClose, activeTab, onSelectTab, currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  // Daftar navigasi bersih & ringkas
  const pages = [
    {
      id: 'dashboard',
      title: 'Beranda',
      icon: LayoutDashboard,
    },
    {
      id: 'roadmap',
      title: 'Roadmap Kelulusan',
      icon: Map,
    },
    {
      id: 'tracker',
      title: currentUser ? 'Dashboard Mahasiswa' : 'Dashboard',
      icon: CheckSquare,
    },
    {
      id: 'diskusi',
      title: 'Ruang Diskusi',
      icon: MessageSquare,
    },
    {
      id: 'kalender',
      title: 'Kalender Akademik',
      icon: Calendar,
    },
    {
      id: 'panduan',
      title: 'Panduan FKT',
      icon: BookOpen,
    },
    {
      id: 'downloads',
      title: 'Pusat Berkas',
      icon: DownloadCloud,
    }
  ];

  // Auto focus input saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle tombol ESC untuk menutup
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
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
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
        className="w-full max-w-lg bg-white border-2 border-primary/20 rounded-3xl shadow-2xl overflow-hidden font-instrument text-slate-800 flex flex-col max-h-[85vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Status Bar Sederhana */}
        <div className="px-5 py-3 bg-gradient-to-r from-primary to-primary-800 text-white flex items-center justify-between text-xs">
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold font-philosopher">
                {currentUser.nama_lengkap?.charAt(0) || 'M'}
              </div>
              <span className="font-semibold truncate max-w-[240px]">
                {currentUser.nama_lengkap} ({currentUser.nim})
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white/90 text-xs">
                Mode Tamu • Informatika 23
              </span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Header */}
        <div className="relative flex items-center px-5 py-3 border-b border-sky-100 bg-sky-50/40">
          <Search className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari halaman navigasi..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-primary transition-colors mr-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-white rounded-md border border-slate-200 shadow-2xs">
              ESC
            </kbd>
          )}
        </div>

        {/* List of Navigation Pages (Super Clean, Single Line, Tanpa Subtitle & Tanpa Badge) */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-1.5 custom-scrollbar">
          <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-instrument">
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
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all text-left cursor-pointer group border ${
                    isActive
                      ? 'bg-primary text-white border-primary-700 shadow-md ring-2 ring-accent/40'
                      : 'bg-white border-transparent hover:border-sky-200 hover:bg-sky-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive 
                        ? 'bg-white/15 text-accent shadow-xs' 
                        : 'bg-sky-50 text-primary group-hover:bg-primary group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-bold font-philosopher truncate ${
                      isActive ? 'text-white' : 'text-slate-800 group-hover:text-primary'
                    }`}>
                      {page.title}
                    </span>
                  </div>

                  <ArrowRight className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform group-hover:translate-x-1 ${
                    isActive ? 'text-accent' : 'text-slate-400 group-hover:text-primary'
                  }`} />
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs font-instrument">
              Tidak ada halaman dengan kata kunci "{searchQuery}"
            </div>
          )}
        </div>

        {/* Modal Footer Sederhana */}
        <div className="px-5 py-2.5 bg-sky-50/70 border-t border-sky-100 flex items-center justify-between text-[11px] text-slate-400 font-instrument">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Target Lulus Bareng 2025</span>
          </div>
          <span>Pilih untuk berpindah</span>
        </div>
      </div>
    </div>
  );
}
