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
  pin VARCHAR(100) DEFAULT '123456',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tambah kolom PIN jika tabel profiles sudah dibuat sebelumnya
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pin VARCHAR(100) DEFAULT '123456';

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

-- 4. Tabel Chat Forum Komunitas IF23
CREATE TABLE IF NOT EXISTS public.community_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name VARCHAR(150) NOT NULL,
  sender_email VARCHAR(200) NOT NULL,
  sender_avatar TEXT,
  sender_role VARCHAR(50) DEFAULT 'Mahasiswa IF23',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.community_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Messages Access" ON public.community_messages FOR ALL USING (true) WITH CHECK (true);

-- Aktifkan Realtime Replication untuk community_messages (Opsional jika ingin realtime instant)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.community_messages;
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
  // Cek sesi user yang sedang aktif
  getCurrentUser() {
    try {
      const saved = localStorage.getItem('IF23_ACTIVE_USER');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  // Login mahasiswa berdasarkan NIM & PIN
  async login(nim, pin) {
    const cleanNim = String(nim).trim();
    const cleanPin = String(pin).trim();

    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('nim', cleanNim)
          .maybeSingle();

        if (error) {
          console.error('Login query error:', error);
          return { success: false, message: 'Gagal menghubungi server database: ' + error.message };
        }

        if (!data) {
          return { 
            success: false, 
            message: `NIM "${cleanNim}" belum terdaftar di sistem. Silakan klik tab "Daftar Akun Baru" di samping!` 
          };
        }

        // Jika kolom PIN ada di database dan terisi, periksa kecocokan
        if (data.pin && data.pin !== cleanPin) {
          return { success: false, message: 'PIN / Kata sandi tidak cocok. Silakan periksa kembali!' };
        }

        // Berhasil login
        localStorage.setItem('IF23_ACTIVE_USER', JSON.stringify(data));
        localStorage.setItem('IF23_ACTIVE_PROFILE', JSON.stringify(data));
        return { success: true, profile: data };
      } catch (err) {
        console.error('Login error:', err);
      }
    }

    // Fallback Local Storage
    const saved = localStorage.getItem('IF23_ACTIVE_PROFILE');
    const localProfile = saved ? JSON.parse(saved) : DEFAULT_LOCAL_PROFILE;
    if (localProfile.nim === cleanNim) {
      localStorage.setItem('IF23_ACTIVE_USER', JSON.stringify(localProfile));
      return { success: true, profile: localProfile };
    }
    return { success: false, message: `NIM "${cleanNim}" belum terdaftar. Silakan buat akun baru terlebih dahulu.` };
  },

  // Daftar akun mahasiswa baru
  async register({ nim, nama_lengkap, peminatan, pin }) {
    const cleanNim = String(nim).trim();
    const cleanNama = String(nama_lengkap).trim();
    const cleanPeminatan = peminatan || 'Software Engineering';
    const cleanPin = String(pin || '123456').trim();

    const newProfile = {
      nim: cleanNim,
      nama_lengkap: cleanNama,
      peminatan: cleanPeminatan,
      pin: cleanPin,
      judul_skripsi: '',
      dosen_pembimbing: '',
      ipk: 3.50,
      skor_aaept: 450,
      turnitin_persen: 15,
      hadir_sempro_count: 5
    };

    if (supabase && isSupabaseConfigured) {
      try {
        // Cek apakah NIM sudah terdaftar
        const { data: existing } = await supabase
          .from('profiles')
          .select('nim')
          .eq('nim', cleanNim)
          .maybeSingle();

        if (existing) {
          return { 
            success: false, 
            message: `NIM ${cleanNim} sudah pernah didaftarkan sebelumnya. Silakan beralih ke tab "Masuk Akun".` 
          };
        }

        // Coba insert data baru
        let insertPayload = { ...newProfile };
        let { error } = await supabase.from('profiles').insert([insertPayload]);

        // Jika error karena kolom pin belum ada di schema database Supabase, hilangkan field pin dan coba lagi
        if (error && error.message && error.message.toLowerCase().includes('pin')) {
          delete insertPayload.pin;
          const retry = await supabase.from('profiles').insert([insertPayload]);
          error = retry.error;
        }

        if (error) {
          console.error('Supabase register error:', error);
          return { success: false, message: 'Gagal menyimpan ke database: ' + error.message };
        }

        localStorage.setItem('IF23_ACTIVE_USER', JSON.stringify(newProfile));
        localStorage.setItem('IF23_ACTIVE_PROFILE', JSON.stringify(newProfile));
        return { success: true, profile: newProfile };
      } catch (err) {
        console.error('Register error:', err);
        return { success: false, message: 'Terjadi gangguan jaringan saat mendaftar.' };
      }
    }

    // Fallback local storage
    localStorage.setItem('IF23_ACTIVE_USER', JSON.stringify(newProfile));
    localStorage.setItem('IF23_ACTIVE_PROFILE', JSON.stringify(newProfile));
    return { success: true, profile: newProfile };
  },

  // Logout akun mahasiswa
  async logout() {
    localStorage.removeItem('IF23_ACTIVE_USER');
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out error:', e);
      }
    }
  },

  // Ambil profil
  async getProfile(nim = null) {
    if (supabase && isSupabaseConfigured && nim) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('nim', nim)
          .maybeSingle();
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
    
    // Perbarui active user juga jika yang diedit adalah user yang sedang login
    const activeUser = this.getCurrentUser();
    if (activeUser && activeUser.nim === profileData.nim) {
      localStorage.setItem('IF23_ACTIVE_USER', JSON.stringify(profileData));
    }

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
    return saved ? JSON.parse(saved) : {};
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
  },

  // Login menggunakan Google OAuth via Supabase
  async signInWithGoogle() {
    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        return { data, error };
      } catch (err) {
        console.error('Google Sign-in error:', err);
        return { error: err };
      }
    }
    return { error: new Error('Supabase belum terkonfigurasi di file .env') };
  },

  // Tangani callback user yang login dengan Google
  async handleOAuthCallback() {
    if (supabase && isSupabaseConfigured) {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session?.user) {
          const user = session.user;
          const email = user.email || '';
          const fullName = user.user_metadata?.full_name || user.user_metadata?.name || email.split('@')[0];
          const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
          
          // Deteksi NIM dari email jika format nim@almaata.ac.id
          const emailMatch = email.match(/^(\d{8,12})/);
          const nim = emailMatch ? emailMatch[1] : (user.user_metadata?.nim || `G-${user.id.slice(0, 8)}`);

          // Cek profil di database
          let profile = await this.getProfile(nim);
          if (!profile || profile.nim !== nim) {
            profile = {
              nim: nim,
              nama_lengkap: fullName,
              peminatan: 'Software Engineering',
              judul_skripsi: '',
              dosen_pembimbing: '',
              ipk: 3.50,
              skor_aaept: 0,
              turnitin_persen: 0,
              hadir_sempro_count: 0,
              avatar_url: avatarUrl,
              email: email
            };
            await this.saveProfile(profile);
          } else {
            profile.nama_lengkap = profile.nama_lengkap || fullName;
            profile.email = email;
            if (avatarUrl) profile.avatar_url = avatarUrl;
          }

          localStorage.setItem('IF23_ACTIVE_USER', JSON.stringify(profile));
          localStorage.setItem('IF23_ACTIVE_PROFILE', JSON.stringify(profile));
          return profile;
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
      }
    }
    return null;
  },

  // Listener perubahan auth state (misal saat login Google selesai)
  onAuthStateChange(callback) {
    if (supabase && isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await this.handleOAuthCallback();
          if (profile && callback) callback(profile);
        } else if (event === 'SIGNED_OUT') {
          await this.logout();
          if (callback) callback(null);
        }
      });
      return authListener?.subscription;
    }
    return { unsubscribe: () => {} };
  },

  // Ambil daftar pesan forum komunitas
  async getCommunityMessages() {
    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('community_messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(100);

        if (!error && data) {
          localStorage.setItem('IF23_COMMUNITY_MESSAGES', JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn('Fallback community messages ke localStorage:', err);
      }
    }

    // Default pesan komunitas awal jika belum ada data di database
    const saved = localStorage.getItem('IF23_COMMUNITY_MESSAGES');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    return [
      {
        id: 'msg-demo-1',
        sender_name: 'Admin Informatika 23',
        sender_email: 'informatika23@almaata.ac.id',
        sender_avatar: null,
        sender_role: 'Admin / Pengurus',
        message: 'Selamat datang di Ruang Diskusi Terbuka Mahasiswa Informatika 23! Forum ini bisa digunakan siapa saja (mahasiswa, dosen, maupun umum) untuk saling bertukar info skripsi, magang, dan akademik.',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'msg-demo-2',
        sender_name: 'Dosen Pembimbing FKT',
        sender_email: 'dosen.fkt@almaata.ac.id',
        sender_avatar: null,
        sender_role: 'Dosen / Pengajar',
        message: 'Jangan lupa untuk yang mengajukan judul skripsi perhatikan batas Turnitin maksimal 20% dan wajib ikut sempro minimal 5 kali sebelum mendaftar ujian ya.',
        created_at: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  },

  // Kirim pesan baru ke forum komunitas
  async sendCommunityMessage({ sender_name, sender_email, sender_avatar, sender_role, message }) {
    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sender_name: sender_name || 'Anonim',
      sender_email: sender_email || 'guest@gmail.com',
      sender_avatar: sender_avatar || null,
      sender_role: sender_role || 'Tamu / Umum',
      message: message.trim(),
      created_at: new Date().toISOString()
    };

    // Simpan lokal terlebih dahulu
    try {
      const current = await this.getCommunityMessages();
      const updated = [...current, newMsg];
      localStorage.setItem('IF23_COMMUNITY_MESSAGES', JSON.stringify(updated));
    } catch (e) {
      console.error('Save message local error:', e);
    }

    // Kirim ke Supabase
    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('community_messages')
          .insert([{
            sender_name: newMsg.sender_name,
            sender_email: newMsg.sender_email,
            sender_avatar: newMsg.sender_avatar,
            sender_role: newMsg.sender_role,
            message: newMsg.message
          }])
          .select();

        if (error) {
          console.warn('Supabase message insert error (menggunakan data lokal):', error);
        } else if (data && data[0]) {
          return data[0];
        }
      } catch (err) {
        console.error('Supabase message error:', err);
      }
    }

    return newMsg;
  },

  // Subscribe ke pesan realtime
  subscribeCommunityMessages(callback) {
    if (supabase && isSupabaseConfigured) {
      const channel = supabase
        .channel('public:community_messages')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'community_messages' },
          (payload) => {
            if (payload && payload.new) {
              callback(payload.new);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
    return () => {};
  }
};
