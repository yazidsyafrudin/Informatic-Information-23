import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  CheckSquare, 
  BookOpen, 
  DownloadCloud, 
  Database
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
    <header className="sticky top-0 z-50 glass-panel shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand - Authentic UAA Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <img 
              src="/uaa-logo-full.png" 
              alt="Universitas Alma Ata Logo" 
              className="h-10 sm:h-11 object-contain" 
            />
            <div className="border-l border-slate-200 pl-3 hidden sm:block">
              <div className="flex items-center space-x-1.5">
                <span className="font-philosopher font-bold text-base text-primary tracking-wide">
                  INFORMATIKA '23
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-sky-100 text-sky-800">
                  ASIIN
                </span>
              </div>
              <p className="text-[11px] font-instrument text-slate-500">
                Fakultas Sains, Rekayasa & Teknologi
              </p>
            </div>
          </div>

          {/* Navigation Links - Font Philosopher like home.almaata.ac.id */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-philosopher font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'text-slate-700 hover:text-primary hover:bg-sky-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action / Cloud Status */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenSupabaseModal}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-instrument font-semibold border transition-colors ${
                isSupabaseConfigured
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
              title="Konfigurasi Database Cloud Supabase"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isSupabaseConfigured ? 'Cloud Sync Aktif' : 'Supabase (Offline)'}
              </span>
            </button>

            {/* Profile Avatar Chip */}
            <div 
              onClick={() => setActiveTab('tracker')}
              className="flex items-center space-x-2.5 pl-2.5 border-l border-slate-200 cursor-pointer group"
              title="Buka profil & checklist progres"
            >
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white shadow-sm group-hover:ring-2 ring-accent transition-all">
                {profile?.nama_lengkap ? profile.nama_lengkap.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-800 font-instrument group-hover:text-primary transition-colors truncate max-w-[120px]">
                  {profile?.nama_lengkap || 'Mahasiswa'}
                </p>
                <p className="text-[10px] text-slate-500 font-mono">{profile?.nim || 'IF23'}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Nav Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-200 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-philosopher font-semibold whitespace-nowrap ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-slate-600 hover:text-primary bg-slate-50'
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
