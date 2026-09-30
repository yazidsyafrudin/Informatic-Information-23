import React from 'react';
import { 
  GraduationCap,
  LayoutDashboard, 
  Map, 
  CheckSquare, 
  BookOpen, 
  DownloadCloud, 
  Database,
  Sparkles
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function Navbar({ activeTab, setActiveTab, onOpenSupabaseModal, profile }) {
  const navItems = [
    { id: 'dashboard', label: 'Beranda & Timeline', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap Skripsi', icon: Map },
    { id: 'tracker', label: 'Progress Tracker', icon: CheckSquare },
    { id: 'panduan', label: 'Panduan FKT (PDF)', icon: BookOpen },
    { id: 'downloads', label: 'Pusat Berkas', icon: DownloadCloud },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Pojok Kiri: Teks Branding Bersih Tanpa Logo Alma Ata */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-sm group-hover:bg-white/20 transition-all flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <span className="font-philosopher font-bold text-xl text-white tracking-wide whitespace-nowrap">
                  INFORMATIKA '23
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent text-white shadow-xs">
                  UAA
                </span>
              </div>
              <p className="text-[11px] font-instrument text-white/80 whitespace-nowrap">
                Universitas Alma Ata • Target Lulus Bareng
              </p>
            </div>
          </div>

          {/* Navigation Links - Font Philosopher & Hover Accent Gold like home.almaata.ac.id */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-xl text-sm font-philosopher font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-primary font-bold shadow-md' 
                      : 'text-white hover:text-accent hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action / Cloud Status */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={onOpenSupabaseModal}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-instrument font-semibold border transition-all whitespace-nowrap ${
                isSupabaseConfigured
                  ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40 hover:bg-emerald-500/30'
                  : 'bg-white/10 text-amber-200 border-white/20 hover:bg-white/20'
              }`}
              title="Konfigurasi Database Cloud Supabase"
            >
              <Database className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">
                {isSupabaseConfigured ? 'Cloud Sync Aktif' : 'Supabase (Offline)'}
              </span>
            </button>

            {/* Profile Avatar Chip */}
            <div 
              onClick={() => setActiveTab('tracker')}
              className="flex items-center space-x-2.5 pl-3 border-l border-white/20 cursor-pointer group flex-shrink-0"
              title="Buka profil & checklist progres"
            >
              <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shadow-sm group-hover:ring-2 ring-white transition-all font-philosopher flex-shrink-0">
                {profile?.nama_lengkap ? profile.nama_lengkap.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-white font-instrument group-hover:text-accent transition-colors truncate max-w-[140px]">
                  {profile?.nama_lengkap || 'Mahasiswa'}
                </p>
                <p className="text-[10px] text-white/70 font-mono">{profile?.nim || 'IF23'}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Nav Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-2 border-t border-white/10 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-philosopher font-semibold whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-white text-primary font-bold' 
                    : 'text-white/90 hover:text-accent bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
