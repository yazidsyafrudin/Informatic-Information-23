import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import RoadmapView from './components/RoadmapView';
import TrackerView from './components/TrackerView';
import AuthView from './components/AuthView';
import PanduanFktView from './components/PanduanFktView';
import DownloadsView from './components/DownloadsView';
import KalenderAkademikView from './components/KalenderAkademikView';
import DiskusiView from './components/DiskusiView';
import AboutView from './components/AboutView';
import NavigationMenuModal from './components/NavigationMenuModal';
import FloatingAiWidget from './components/FloatingAiWidget';
import { StorageService } from './lib/supabase';
import { ROADMAP_PHASES } from './data/milestones';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => StorageService.getCurrentUser());
  const [profile, setProfile] = useState({
    nim: "230101001",
    nama_lengkap: "Mahasiswa Informatika 23",
    peminatan: "Software Engineering",
    judul_skripsi: "",
    dosen_pembimbing: "",
    ipk: 3.50,
    skor_aaept: 475,
    turnitin_persen: 16,
    hadir_sempro_count: 5
  });
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const allMilestoneIds = ROADMAP_PHASES.flatMap(phase => phase.steps.map(s => s.id));
  const totalMilestones = allMilestoneIds.length;
  const progressCount = allMilestoneIds.filter(id => progress[id] === true || progress[id] === 'selesai').length;

  // Sinkronisasi data saat pertama kali aplikasi dibuka
  useEffect(() => {
    async function loadInitialData() {
      try {
        // Cek apakah ada sesi Google OAuth dari redirect
        const isOAuthRedirect = typeof window !== 'undefined' && 
          (window.location.hash.includes('access_token') || window.location.search.includes('code='));
        const oAuthUser = isOAuthRedirect ? await StorageService.handleOAuthCallback() : null;
        const loggedInUser = oAuthUser || StorageService.getCurrentUser();

        if (loggedInUser && loggedInUser.nim) {
          // Ambil profil paling fresh dari database / storage
          const freshProfile = await StorageService.getProfile(loggedInUser.nim);
          const merged = { ...loggedInUser, ...(freshProfile || {}) };
          setCurrentUser(merged);
          setProfile(merged);
          const loadedProgress = await StorageService.getProgress(loggedInUser.nim);
          if (loadedProgress) {
            setProgress(loadedProgress);
          }
        } else if (loggedInUser) {
          setCurrentUser(loggedInUser);
          setProfile(loggedInUser);
        } else {
          setCurrentUser(null);
          setProgress({});
        }
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();

    // Berlangganan listener perubahan login Google / logout
    const subscription = StorageService.onAuthStateChange(async (userProfile) => {
      if (userProfile) {
        setCurrentUser(userProfile);
        setProfile(userProfile);
        const loadedProgress = await StorageService.getProgress(userProfile.nim);
        setProgress(loadedProgress || {});
      } else {
        setCurrentUser(null);
        setProgress({});
      }
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleLoginSuccess = async (userProfile) => {
    setCurrentUser(userProfile);
    setProfile(userProfile);
    const loadedProgress = await StorageService.getProgress(userProfile.nim);
    setProgress(loadedProgress || {});
    setActiveTab('tracker');
  };

  const handleLogout = () => {
    // 1. Langsung hapus sesi dari state aplikasi (0 milidetik / instan)
    setCurrentUser(null);
    setProgress({});
    setActiveTab('dashboard');

    // 2. Bersihkan hash OAuth dari URL jika masih ada (#access_token=...)
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // 3. Jalankan logout storage di background tanpa memblokir browser
    StorageService.logout().catch(console.warn);
  };

  const handleUpdateProfile = async (newProfile) => {
    setProfile(newProfile);
    if (currentUser) {
      setCurrentUser(newProfile);
    }
    await StorageService.saveProfile(newProfile);
  };

  const handleToggleMilestone = async (milestoneId, forcedState) => {
    const nim = currentUser?.nim || profile.nim;
    let newState;
    if (forcedState !== undefined) {
      newState = forcedState;
    } else {
      const current = progress[milestoneId];
      if (current === true || current === 'selesai') {
        newState = false;
      } else {
        newState = 'selesai';
      }
    }
    
    const updatedProgress = { ...progress, [milestoneId]: newState };
    setProgress(updatedProgress);

    await StorageService.toggleMilestone(nim, milestoneId, newState);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6EE] text-slate-800 font-instrument selection:bg-primary selection:text-white overflow-x-clip w-full max-w-full">
      {/* Navbar Resmi Biru UAA */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenMenuModal={() => setIsMenuModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'dashboard' && (
          <DashboardView
            setActiveTab={setActiveTab}
            profile={profile}
            progressCount={progressCount}
            totalMilestones={totalMilestones}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            progress={progress}
            onToggleMilestone={handleToggleMilestone}
            setActiveTab={setActiveTab}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'tracker' && (
          currentUser ? (
            /* Jika SUDAH Login: Tampilkan Dashboard Pribadi Mahasiswa */
            <TrackerView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              progress={progress}
              onToggleMilestone={handleToggleMilestone}
              progressCount={progressCount}
              totalMilestones={totalMilestones}
            />
          ) : (
            /* Jika BELUM Login: Tampilkan Halaman Masuk / Daftar Akun */
            <AuthView
              onLoginSuccess={handleLoginSuccess}
              onContinueAsGuest={() => setActiveTab('dashboard')}
              noticeMessage="Silakan masuk atau daftar akun untuk mengakses Dashboard Mahasiswa & menyimpan progres skripsi."
            />
          )
        )}

        {activeTab === 'diskusi' && (
          currentUser ? (
            <DiskusiView currentUser={currentUser} profile={profile} />
          ) : (
            <AuthView
              onLoginSuccess={(user) => {
                handleLoginSuccess(user);
                setActiveTab('diskusi');
              }}
              onContinueAsGuest={() => setActiveTab('dashboard')}
              noticeMessage="Silakan masuk atau daftar akun terlebih dahulu untuk bergabung ke Ruang Diskusi & Forum Komunitas."
            />
          )
        )}

        {activeTab === 'kalender' && (
          <KalenderAkademikView />
        )}

        {activeTab === 'panduan' && (
          <PanduanFktView />
        )}

        {activeTab === 'downloads' && (
          <DownloadsView />
        )}

        {activeTab === 'about' && (
          <AboutView setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Navigation Command Palette Modal (Persis Referensi Raycast / Cmd+K) */}
      <NavigationMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
        currentUser={currentUser}
      />

      {/* Floating AI Assistant Widget di Pojok Layar Bawah */}
      {activeTab !== 'diskusi' && (
        <FloatingAiWidget
          currentUser={currentUser}
          onOpenFullAi={() => setActiveTab('diskusi')}
        />
      )}

      {/* Footer UAA */}
      <footer className="border-t border-primary-700/60 bg-primary py-10 px-4 sm:px-6 lg:px-8 text-xs text-white/80 font-instrument shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex-shrink-0 bg-white/10 p-0.5">
              <img 
                src="/logo pusing coding.png" 
                alt="Logo Pusing Coding" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold font-philosopher text-white text-base block tracking-wide">
                  Pusing Coding • Informatika 2023
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-accent text-white shadow-xs">
                  UAA
                </span>
              </div>
              <span className="text-[11px] text-white/75 block">
                Fakultas Sains, Rekayasa dan Teknologi
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-3 text-xs">
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-accent font-semibold transition-colors cursor-pointer text-white underline underline-offset-4 decoration-accent"
              >
                Tentang Kami
              </button>
              <span className="text-white/40">•</span>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="hover:text-accent transition-colors cursor-pointer"
              >
                Roadmap
              </button>
              <span className="text-white/40">•</span>
              <button
                onClick={() => setActiveTab('diskusi')}
                className="hover:text-accent transition-colors cursor-pointer"
              >
                Ruang Diskusi
              </button>
              <span className="text-white/40">•</span>
              <button
                onClick={() => setActiveTab('panduan')}
                className="hover:text-accent transition-colors cursor-pointer"
              >
                Panduan PDF
              </button>
            </div>
            <strong className="text-accent font-philosopher text-base tracking-wide block">
              Satu Angkatan, Lulus Bareng 2025!
            </strong>
          </div>

          <div className="text-center sm:text-right text-[11px] text-white/60">
            <span>Pedoman FKT SK Rektor No. 182/A/SK/UAA/IX/2021 & SK No. 216/A/SK/UAA/VII/2026</span>
            <span className="block mt-0.5 text-white/50">Yogyakarta, Indonesia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
