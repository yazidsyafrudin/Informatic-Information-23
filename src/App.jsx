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
import { GraduationCap, Heart, Sparkles } from 'lucide-react';

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

  // Hitung total milestones
  const allMilestoneIds = ROADMAP_PHASES.flatMap(phase => phase.steps.map(s => s.id));
  const totalMilestones = allMilestoneIds.length;
  const progressCount = Object.keys(progress).filter(id => progress[id]).length;

  // Load data awal dari StorageService (Supabase atau LocalStorage)
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

  // Update profil
  const handleUpdateProfile = async (newProfile) => {
    setProfile(newProfile);
    await StorageService.saveProfile(newProfile);
  };

  // Toggle milestone
  const handleToggleMilestone = async (milestoneId) => {
    const currentState = Boolean(progress[milestoneId]);
    const newState = !currentState;
    
    // Optimistic update
    const updatedProgress = { ...progress, [milestoneId]: newState };
    setProgress(updatedProgress);

    await StorageService.toggleMilestone(profile.nim, milestoneId, newState);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-alma-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        profile={profile}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-alma-600 flex items-center justify-center text-white">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-300">
              Informatika 2023 • Universitas Alma Ata
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <span>Didedikasikan untuk perjuangan angkatan:</span>
            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-alma-400 to-cyan-300">
              Lulus Bareng 2025!
            </strong>
          </div>

          <div>
            <span>Pedoman FKT SK Rektor 182/A/SK/UAA/IX/2021</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
