import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  CheckSquare, 
  BookOpen, 
  LayoutGrid, 
  LogIn,
  LogOut,
  MessageSquare,
  Info
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, onLogout, onOpenMenuModal }) {
  const primaryNavItems = [
    { id: 'dashboard', label: 'Beranda & Timeline', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap Kelulusan', icon: Map },
    { id: 'tracker', label: currentUser ? 'Dashboard Mahasiswa' : 'Dashboard', icon: CheckSquare },
    { id: 'diskusi', label: 'Ruang Diskusi', icon: MessageSquare },
    { id: 'panduan', label: 'Panduan FKT (PDF)', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-primary shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Pojok Kiri: Logo Pusing Coding & Branding */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-11 h-11 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-all flex-shrink-0">
              <img 
                src="/logo pusing coding.png" 
                alt="Logo Pusing Coding" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <span className="font-philosopher font-bold text-xl text-white tracking-wide whitespace-nowrap">
                  Pusing Coding
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent text-white shadow-xs">
                  UAA
                </span>
              </div>
              <p className="text-[11px] font-instrument text-white/80 whitespace-nowrap">
                Informatika angkatan 23 • Target Lulus Bareng
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {primaryNavItems.map((item) => {
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

            {/* Tombol Menu - Membuka Command Palette / Modal Navigasi Lengkap */}
            <button
              onClick={onOpenMenuModal}
              className={`flex items-center space-x-2 px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-xl text-sm font-philosopher font-medium whitespace-nowrap transition-all duration-300 ${
                ['kalender', 'downloads', 'about'].includes(activeTab)
                  ? 'bg-accent text-white font-bold shadow-md'
                  : 'text-white hover:text-accent hover:bg-white/10'
              }`}
              title="Buka Menu & Navigasi Lengkap (Tentang Kami, Kalender Akademik, Pusat Berkas, dll.)"
            >
              <LayoutGrid className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">
                {activeTab === 'about' ? 'Tentang Kami' : activeTab === 'kalender' ? 'Kalender Akademik' : activeTab === 'downloads' ? 'Pusat Berkas' : 'Menu'}
              </span>
            </button>
          </nav>

          {/* Pojok Kanan: Status Autentikasi User */}
          <div className="flex items-center flex-shrink-0">
            {currentUser ? (
              /* User SUDAH Login: Tampilkan Avatar, Nama, NIM & Tombol Logout */
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div 
                  onClick={() => setActiveTab('tracker')}
                  className="flex items-center space-x-2.5 px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer group transition-all flex-shrink-0"
                  title="Buka Dashboard Pribadi"
                >
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shadow-xs group-hover:ring-2 ring-white transition-all font-philosopher flex-shrink-0">
                    {currentUser.nama_lengkap ? currentUser.nama_lengkap.charAt(0).toUpperCase() : 'M'}
                  </div>
                  <div className="text-left flex-shrink-0">
                    <p className="text-xs font-bold text-white font-instrument group-hover:text-accent transition-colors truncate max-w-[130px]">
                      {currentUser.nama_lengkap}
                    </p>
                    <p className="text-[10px] text-white/70 font-mono">{currentUser.nim}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onLogout();
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 text-white/80 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                  title="Keluar / Logout Akun"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* User BELUM Login: Tampilkan Tombol Masuk / Buat Akun */
              <button
                onClick={() => setActiveTab('tracker')}
                className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-accent hover:bg-amber-600 text-white font-philosopher font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                title="Masuk atau Daftar Akun Mahasiswa"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk / Daftar</span>
              </button>
            )}
          </div>

        </div>

        {/* Mobile Nav Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-2 border-t border-white/10 no-scrollbar">
          {primaryNavItems.map((item) => {
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

          <button
            onClick={onOpenMenuModal}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-philosopher font-semibold whitespace-nowrap transition-colors ${
              ['kalender', 'downloads', 'about'].includes(activeTab)
                ? 'bg-accent text-white font-bold'
                : 'text-white/90 hover:text-accent bg-white/10'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{activeTab === 'about' ? 'Tentang Kami' : 'Menu'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
