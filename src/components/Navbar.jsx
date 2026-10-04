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
    { id: 'dashboard', label: 'Beranda', shortLabel: 'Beranda', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap Kelulusan', shortLabel: 'Roadmap', icon: Map },
    { id: 'tracker', label: currentUser ? 'Dashboard Mahasiswa' : 'Dashboard', shortLabel: 'Dashboard', icon: CheckSquare },
    { id: 'panduan', label: 'Panduan FKT (PDF)', shortLabel: 'Panduan', icon: BookOpen },
    { id: 'about', label: 'Tentang Kami', shortLabel: 'Tentang', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md shadow-md w-full">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* Pojok Kiri: Logo Pusing Coding & Branding */}
          <div 
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group flex-shrink-0" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-all flex-shrink-0">
              <img 
                src="/logo pusing coding.png" 
                alt="Logo Pusing Coding" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-philosopher font-bold text-lg sm:text-xl text-white tracking-wide whitespace-nowrap">
                  Pusing Coding
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-full bg-accent text-white shadow-xs">
                  UAA
                </span>
              </div>
              <p className="hidden 2xl:block text-[11px] font-instrument text-white/80 whitespace-nowrap">
                Informatika angkatan 23 • Target Lulus Bareng
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop & Laptop (lg ke atas) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 xl:space-x-2 px-2.5 py-2 xl:px-3 xl:py-2.5 rounded-xl text-xs xl:text-sm font-philosopher font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-primary font-bold shadow-md' 
                      : 'text-white hover:text-accent hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4 flex-shrink-0" />
                  <span className="lg:inline 2xl:hidden">{item.shortLabel}</span>
                  <span className="hidden 2xl:inline">{item.label}</span>
                </button>
              );
            })}

            {/* Tombol Menu - Membuka Command Palette / Modal Navigasi Lengkap */}
            <button
              onClick={onOpenMenuModal}
              className={`flex items-center space-x-1.5 xl:space-x-2 px-2.5 py-2 xl:px-3 xl:py-2.5 rounded-xl text-xs xl:text-sm font-philosopher font-medium whitespace-nowrap transition-all duration-300 ${
                ['kalender', 'downloads', 'diskusi'].includes(activeTab)
                  ? 'bg-accent text-white font-bold shadow-md'
                  : 'text-white hover:text-accent hover:bg-white/10'
              }`}
              title="Buka Menu & Navigasi Lengkap (Ruang Diskusi, Kalender Akademik, Pusat Berkas, dll.)"
            >
              <LayoutGrid className="w-3.5 h-3.5 xl:w-4 xl:h-4 flex-shrink-0" />
              <span className="lg:inline 2xl:hidden">Menu</span>
              <span className="hidden 2xl:inline">
                {activeTab === 'diskusi' ? 'Ruang Diskusi' : activeTab === 'kalender' ? 'Kalender Akademik' : activeTab === 'downloads' ? 'Pusat Berkas' : 'Menu'}
              </span>
            </button>
          </nav>

          {/* Pojok Kanan: Status Autentikasi User */}
          <div className="flex items-center flex-shrink-0">
            {currentUser ? (
              /* User SUDAH Login: Tampilkan Avatar, Nama, NIM & Tombol Logout */
              <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
                <div 
                  onClick={() => setActiveTab('tracker')}
                  className="flex items-center space-x-2 sm:space-x-2.5 px-2 sm:px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer group transition-all flex-shrink-0"
                  title="Buka Dashboard Pribadi"
                >
                  <div className="relative w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shadow-xs group-hover:ring-2 ring-white transition-all font-philosopher flex-shrink-0 overflow-hidden">
                    <span>{currentUser.nama_lengkap ? currentUser.nama_lengkap.charAt(0).toUpperCase() : 'M'}</span>
                    {(currentUser.avatar_url || currentUser.foto || currentUser.picture) && (
                      <img
                        src={currentUser.avatar_url || currentUser.foto || currentUser.picture}
                        alt={currentUser.nama_lengkap || 'Foto Profil'}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <div className="text-left flex-shrink-0">
                    <p className="text-xs font-bold text-white font-instrument group-hover:text-accent transition-colors truncate max-w-[85px] sm:max-w-[100px] xl:max-w-[130px]">
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
                className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 rounded-2xl bg-accent hover:bg-amber-600 text-white font-philosopher font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                title="Masuk atau Daftar Akun Mahasiswa"
              >
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Masuk / Daftar</span>
              </button>
            )}
          </div>

        </div>

        {/* Mobile & Tablet Nav Bar (di bawah lg / < 1024px) */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 space-x-2 border-t border-white/10 no-scrollbar">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-philosopher font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
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
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-philosopher font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
              ['kalender', 'downloads', 'diskusi'].includes(activeTab)
                ? 'bg-accent text-white font-bold'
                : 'text-white/90 hover:text-accent bg-white/10'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{activeTab === 'diskusi' ? 'Ruang Diskusi' : activeTab === 'kalender' ? 'Kalender Akademik' : activeTab === 'downloads' ? 'Pusat Berkas' : 'Menu'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
