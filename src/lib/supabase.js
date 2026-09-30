import { createClient } from '@supabase/supabase-js';

// Baca dari env atau localStorage
const getSavedConfig = () => {
  const localUrl = localStorage.getItem('IF23_SUPABASE_URL');
  const localKey = localStorage.getItem('IF23_SUPABASE_KEY');
  return {
    url: import.meta.env.VITE_SUPABASE_URL || localUrl || '',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || localKey || ''
  };
};

const config = getSavedConfig();
export const isSupabaseConfigured = Boolean(config.url && config.key);

export const supabase = isSupabaseConfigured
  ? createClient(config.url, config.key)
  : null;

// Template SQL untuk dieksekusi di Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- Skrip SQL Database Informatika 23 Universitas Alma Ata
-- Jalankan di SQL Editor Supabase:

-- 1. Tabel Profil Mahasiswa
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nim VARCHAR(20) UNIQUE NOT NULL,
  nama_lengkap VARCHAR(150) NOT NULL,
  peminatan VARCHAR(100) DEFAULT 'Software Engineering',
  judul_skripsi TEXT,
  dosen_pembimbing VARCHAR(150),
  ipk NUMERIC(3, 2) DEFAULT 3.25,
  skor_aaept INTEGER DEFAULT 450,
  turnitin_persen INTEGER DEFAULT 15,
  hadir_sempro_count INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Checklist Progress Milestone
CREATE TABLE IF NOT EXISTS public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nim VARCHAR(20) REFERENCES public.profiles(nim) ON DELETE CASCADE,
  milestone_id VARCHAR(50) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  UNIQUE(nim, milestone_id)
);

-- 3. Aktifkan Row Level Security (RLS) & Policy Public Read/Write
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Profiles Access" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Progress Access" ON public.student_progress FOR ALL USING (true) WITH CHECK (true);
`;

// Default profile lokal
const DEFAULT_LOCAL_PROFILE = {
  nim: "230101001",
  nama_lengkap: "Mahasiswa Informatika 23",
  peminatan: "Software Engineering",
  judul_skripsi: "",
  dosen_pembimbing: "",
  ipk: 3.50,
  skor_aaept: 475,
  turnitin_persen: 16,
  hadir_sempro_count: 5
};

// Storage Service (otomatis switch antara Supabase dan LocalStorage)
export const StorageService = {
  // Ambil profil
  async getProfile(nim = null) {
    if (supabase && isSupabaseConfigured && nim) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('nim', nim)
          .single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Gagal fetch dari Supabase, fallback ke local storage:', err);
      }
    }
    const saved = localStorage.getItem('IF23_ACTIVE_PROFILE');
    return saved ? JSON.parse(saved) : DEFAULT_LOCAL_PROFILE;
  },

  // Simpan profil
  async saveProfile(profileData) {
    localStorage.setItem('IF23_ACTIVE_PROFILE', JSON.stringify(profileData));
    
    if (supabase && isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('profiles')
          .upsert(profileData, { onConflict: 'nim' });
        if (error) console.error('Supabase profile upsert error:', error);
      } catch (err) {
        console.error('Supabase error:', err);
      }
    }
    return profileData;
  },

  // Ambil progres milestone
  async getProgress(nim) {
    if (supabase && isSupabaseConfigured && nim) {
      try {
        const { data, error } = await supabase
          .from('student_progress')
          .select('*')
          .eq('nim', nim);
        if (!error && data) {
          const map = {};
          data.forEach(item => {
            map[item.milestone_id] = item.is_completed;
          });
          return map;
        }
      } catch (err) {
        console.warn('Fallback progress ke local storage:', err);
      }
    }
    const saved = localStorage.getItem(`IF23_PROGRESS_${nim || 'DEFAULT'}`);
    return saved ? JSON.parse(saved) : {
      'm-1': true, // Laporan magang (sedang berlangsung)
      'm-2': true  // Tentukan topik
    };
  },

  // Simpan toggle milestone
  async toggleMilestone(nim, milestoneId, newState) {
    const current = await this.getProgress(nim);
    current[milestoneId] = newState;
    localStorage.setItem(`IF23_PROGRESS_${nim || 'DEFAULT'}`, JSON.stringify(current));

    if (supabase && isSupabaseConfigured && nim) {
      try {
        await supabase
          .from('student_progress')
          .upsert({
            nim: nim,
            milestone_id: milestoneId,
            is_completed: newState,
            completed_at: newState ? new Date().toISOString() : null
          }, { onConflict: 'nim, milestone_id' });
      } catch (err) {
        console.error('Supabase progress upsert error:', err);
      }
    }
    return current;
  }
};
