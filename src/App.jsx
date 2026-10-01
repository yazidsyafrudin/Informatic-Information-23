import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import RoadmapView from './components/RoadmapView';
import TrackerView from './components/TrackerView';
import PanduanFktView from './components/PanduanFktView';
import DownloadsView from './components/DownloadsView';
import SupabaseModal from './components/SupabaseModal';
import { StorageService } from './lib/supabase';
import { ROADMAP_PHASES } from './data/milestones';
import { GraduationCap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
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
  const [progress, setProgress] = useState({
    'm-1': true,
    'm-2': true
  });
  const [isLoading, setIsLoading] = useState(true);

  const allMilestoneIds = ROADMAP_PHASES.flatMap(phase => phase.steps.map(s => s.id));
  const totalMilestones = allMilestoneIds.length;
  const progressCount = Object.keys(progress).filter(id => progress[id]).length;

  useEffect(() => {
    async function loadInitialData() {
      try {
        const loadedProfile = await StorageService.getProfile();
        if (loadedProfile) {
          setProfile(loadedProfile);
          const loadedProgress = await StorageService.getProgress(loadedProfile.nim);
          if (loadedProgress) {
            setProgress(loadedProgress);
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const handleUpdateProfile = async (newProfile) => {
    setProfile(newProfile);
    await StorageService.saveProfile(newProfile);
  };

  const handleToggleMilestone = async (milestoneId) => {
    const currentState = Boolean(progress[milestoneId]);
    const newState = !currentState;
    
    const updatedProgress = { ...progress, [milestoneId]: newState };
    setProgress(updatedProgress);

    await StorageService.toggleMilestone(profile.nim, milestoneId, newState);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6EE] text-slate-800 font-instrument selection:bg-primary selection:text-white">
      {/* Navbar Biru Resmi UAA */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(false || true)}
        profile={profile}
      />

      {/* Main Container dengan background Putih Tulang */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'dashboard' && (
          <DashboardView
            setActiveTab={setActiveTab}
            profile={profile}
            progressCount={progressCount}
            totalMilestones={totalMilestones}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            progress={progress}
            onToggleMilestone={handleToggleMilestone}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'tracker' && (
          <TrackerView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            progress={progress}
            onToggleMilestone={handleToggleMilestone}
            progressCount={progressCount}
            totalMilestones={totalMilestones}
          />
        )}

        {activeTab === 'panduan' && (
          <PanduanFktView />
        )}

        {activeTab === 'downloads' && (
          <DownloadsView />
        )}
      </main>

      {/* Supabase Config Modal */}
      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />

      {/* Footer dengan warna biru primary UAA yang serasi dengan navbar */}
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
