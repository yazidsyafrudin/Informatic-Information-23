import React from 'react';
import { 
  GraduationCap, 
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
    { id: 'panduan', label: 'Panduan Kampus (PDF)', icon: BookOpen },
    { id: 'downloads', label: 'Pusat Berkas', icon: DownloadCloud },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-alma-600 to-cyan-500 flex items-center justify-center shadow-md shadow-alma-600/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">INFORMATIKA '23</span>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-alma-50 text-alma-700 border border-alma-200">
                  UAA
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Universitas Alma Ata • Portal Lulus Bersama</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-alma-600 text-white shadow-md shadow-alma-600/25' 
                      : 'text-slate-600 hover:text-alma-600 hover:bg-alma-50/80'
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
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                isSupabaseConfigured
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
              title="Konfigurasi Database Cloud Supabase"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isSupabaseConfigured ? 'Cloud Sync Aktif' : 'Supabase (Offline Local)'}
              </span>
            </button>

            {/* Profile Avatar Chip */}
            <div 
              onClick={() => setActiveTab('tracker')}
              className="flex items-center space-x-2 pl-2 border-l border-slate-200 cursor-pointer group"
              title="Buka profil & checklist progres"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-alma-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm group-hover:ring-2 ring-alma-400 transition-all">
                {profile?.nama_lengkap ? profile.nama_lengkap.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-slate-800 group-hover:text-alma-600 transition-colors truncate max-w-[120px]">
                  {profile?.nama_lengkap || 'Mahasiswa'}
                </p>
                <p className="text-[10px] text-slate-500">{profile?.nim || 'IF23'}</p>
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
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  isActive 
                    ? 'bg-alma-600 text-white' 
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100'
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
