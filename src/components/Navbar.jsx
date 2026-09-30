import React from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Map, 
  CheckSquare, 
  BookOpen, 
  DownloadCloud, 
  Database,
  Calendar,
  Sparkles
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
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-alma-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-alma-600/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">INFORMATIKA '23</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-alma-950 text-alma-400 border border-alma-800">
                  UAA
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Universitas Alma Ata • Target Lulus Bersama</p>
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
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-alma-600 text-white shadow-md shadow-alma-600/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
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
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isSupabaseConfigured
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/60'
                  : 'bg-slate-800/80 text-amber-300 border-amber-800/50 hover:bg-slate-800'
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
              className="flex items-center space-x-2 pl-2 border-l border-slate-800 cursor-pointer group"
              title="Buka profil & checklist progres"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-inner group-hover:ring-2 ring-alma-400 transition-all">
                {profile?.nama_lengkap ? profile.nama_lengkap.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-medium text-slate-200 group-hover:text-alma-400 transition-colors truncate max-w-[120px]">
                  {profile?.nama_lengkap || 'Mahasiswa'}
                </p>
                <p className="text-[10px] text-slate-400">{profile?.nim || 'IF23'}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Nav Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive 
                    ? 'bg-alma-600 text-white' 
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
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
