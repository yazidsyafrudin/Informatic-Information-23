import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import RoadmapView from './components/RoadmapView';
import TrackerView from './components/TrackerView';
import AuthView from './components/AuthView';
import PanduanFktView from './components/PanduanFktView';
import DownloadsView from './components/DownloadsView';
import { StorageService } from './lib/supabase';
import { ROADMAP_PHASES } from './data/milestones';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
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
  const progressCount = allMilestoneIds.filter(id => progress[id]).length;

  // Sinkronisasi data saat pertama kali aplikasi dibuka
  useEffect(() => {
    async function loadInitialData() {
      try {
        const loggedInUser = StorageService.getCurrentUser();
        if (loggedInUser) {
          setCurrentUser(loggedInUser);
          setProfile(loggedInUser);
          const loadedProgress = await StorageService.getProgress(loggedInUser.nim);
          if (loadedProgress) {
            setProgress(loadedProgress);
          }
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
  }, []);

  const handleLoginSuccess = async (userProfile) => {
    setCurrentUser(userProfile);
    setProfile(userProfile);
    const loadedProgress = await StorageService.getProgress(userProfile.nim);
    setProgress(loadedProgress || {});
    setActiveTab('tracker');
  };

  const handleLogout = () => {
    StorageService.logout();
    setCurrentUser(null);
    setProgress({});
    setActiveTab('dashboard');
  };

  const handleUpdateProfile = async (newProfile) => {
    setProfile(newProfile);
    if (currentUser) {
      setCurrentUser(newProfile);
    }
    await StorageService.saveProfile(newProfile);
  };

  const handleToggleMilestone = async (milestoneId) => {
    const nim = currentUser?.nim || profile.nim;
    const currentState = Boolean(progress[milestoneId]);
    const newState = !currentState;
    
    const updatedProgress = { ...progress, [milestoneId]: newState };
    setProgress(updatedProgress);

    await StorageService.toggleMilestone(nim, milestoneId, newState);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6EE] text-slate-800 font-instrument selection:bg-primary selection:text-white">
      {/* Navbar Resmi Biru UAA */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
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
            />
          )
        )}

        {activeTab === 'panduan' && (
          <PanduanFktView />
        )}

        {activeTab === 'downloads' && (
          <DownloadsView />
        )}
      </main>

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

          <div className="text-center sm:text-left">
            <span className="text-white/70 block text-xs">Satu Angkatan, Satu Visi:</span>
            <strong className="text-accent font-philosopher text-lg tracking-wide">
              Lulus Bareng 2025!
            </strong>
          </div>

          <div className="text-center sm:text-right text-[11px] text-white/60">
            <span>Pedoman FKT SK Rektor No. 182/A/SK/UAA/IX/2021</span>
            <span className="block mt-0.5 text-white/50">Yogyakarta, Indonesia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
