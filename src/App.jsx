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
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-slate-800 font-instrument selection:bg-primary selection:text-white">
      {/* Navbar Biru Resmi UAA */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(false || true)}
        profile={profile}
      />

      {/* Main Container dengan background Putih Susu */}
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

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 font-instrument">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4 text-accent" />
            </div>
            <div>
              <span className="font-bold font-philosopher text-primary text-sm block">
                Informatika 2023 • Universitas Alma Ata
              </span>
              <span className="text-[11px] text-slate-500">
                Fakultas Sains, Rekayasa dan Teknologi
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-slate-600 block">Satu Angkatan, Satu Visi:</span>
            <strong className="text-primary font-philosopher text-base">
              Lulus Bareng 2025!
            </strong>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            <span>Pedoman FKT SK Rektor No. 182/A/SK/UAA/IX/2021</span>
            <span className="block mt-0.5">Yogyakarta, Indonesia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
