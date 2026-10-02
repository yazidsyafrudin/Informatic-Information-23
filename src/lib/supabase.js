import { createClient } from '@supabase/supabase-js';
import { findMahasiswaIf23, detectUserRole } from '../data/mahasiswaIf23';

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
      if (!saved) return null;
      const user = JSON.parse(saved);
      // Koreksi otomatis jika akun Google umum sebelumnya terisi mahasiswa IF23
      if (user.nim && String(user.nim).startsWith('G-')) {
        user.peran = 'Umum / Pengunjung';
      } else if (!user.peran) {
        user.peran = detectUserRole({ nim: user.nim, email: user.email });
      }
      return user;
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

  // Daftar akun pengguna baru (Mahasiswa IF23, Mahasiswa Alma Ata, atau Umum)
  async register({ nim, nama_lengkap, peran, pin }) {
    let cleanNim = String(nim || '').trim();
    let cleanNama = String(nama_lengkap || '').trim();
    const cleanPin = String(pin || '123456').trim();
    let selectedPeran = peran || 'Mahasiswa Informatika 23';

    // Cek kecocokan dengan data resmi 40 Mahasiswa IF23
    const if23Match = findMahasiswaIf23(cleanNim) || findMahasiswaIf23(cleanNama);
    if (if23Match) {
      cleanNama = if23Match.nama; // otomatis gunakan nama resmi dari dokumen PDF
      cleanNim = cleanNim || if23Match.nim;
      selectedPeran = 'Mahasiswa Informatika 23';
    } else if (!cleanNim && selectedPeran === 'Umum / Pengunjung') {
      cleanNim = `U-${Date.now().toString().slice(-6)}`;
    }

    const newProfile = {
      nim: cleanNim,
      nama_lengkap: cleanNama,
      peran: selectedPeran,
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

  // Logout akun mahasiswa (Instan tanpa delay)
  async logout() {
    localStorage.removeItem('IF23_ACTIVE_USER');
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.auth.signOut({ scope: 'local' });
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
          let fullName = user.user_metadata?.full_name || user.user_metadata?.name || email.split('@')[0];
          const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
          
          // Cek apakah email atau nama cocok dengan data 40 mahasiswa IF23 dari PDF
          const if23Student = findMahasiswaIf23(email) || findMahasiswaIf23(fullName);

          let nim = '';
          let peran = 'Umum / Pengunjung';

          if (if23Student) {
            nim = if23Student.nim;
            fullName = if23Student.nama; // Gunakan nama resmi dari dokumen PDF
            peran = 'Mahasiswa Informatika 23';
          } else if (email.toLowerCase().includes('almaata.ac.id')) {
            const emailMatch = email.match(/^(\d{8,12})/);
            nim = emailMatch ? emailMatch[1] : `MHS-${user.id.slice(0, 6)}`;
            peran = 'Mahasiswa Alma Ata';
          } else {
            nim = `G-${user.id.slice(0, 8)}`;
            peran = 'Umum / Pengunjung';
          }

          // Cek profil di database
          let profile = await this.getProfile(nim);
          if (!profile || profile.nim !== nim) {
            profile = {
              nim: nim,
              nama_lengkap: fullName,
              peran: peran,
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
            profile.nama_lengkap = fullName || profile.nama_lengkap;
            profile.email = email;
            profile.peran = peran;
            if (avatarUrl) profile.avatar_url = avatarUrl;
            await this.saveProfile(profile);
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
          localStorage.removeItem('IF23_ACTIVE_USER');
          if (callback) callback(null);
        }
      });
      return authListener?.subscription;
    }
    return { unsubscribe: () => {} };
  },

  // Daftar topik bawaan forum diskusi angkatan
  DEFAULT_TOPICS: [
    {
      id: 'umum',
      name: 'Umum & Bebas',
      description: 'Ruang obrolan santai, perkenalan, dan silaturahmi mahasiswa IF23 serta umum',
      icon: '💬',
      creator_name: 'Admin Informatika 23',
      created_at: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'magang',
      name: 'Magang & Karir',
      description: 'Diskusi lowongan magang, Kampus Merdeka / MSIB, CV, dan info loker IT',
      icon: '💼',
      creator_name: 'Admin Informatika 23',
      created_at: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'sempro-skripsi',
      name: 'Sempro & Skripsi',
      description: 'Diskusi pengajuan judul skripsi FKT, dosen pembimbing, Turnitin, dan ujian',
      icon: '🎓',
      creator_name: 'Admin Informatika 23',
      created_at: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'krs-akademik',
      name: 'KRS & Perkuliahan',
      description: 'Tanya jawab seputar mata kuliah, jadwal kuliah, dosen pengampu, dan praktikum',
      icon: '📚',
      creator_name: 'Admin Informatika 23',
      created_at: '2026-01-01T00:00:00.000Z'
    }
  ],

  // Ambil daftar topik diskusi
  async getDiscussionTopics() {
    let topics = [...this.DEFAULT_TOPICS];

    // Coba ambil topik dari Supabase jika ada tabel discussion_topics
    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('discussion_topics')
          .select('*')
          .order('created_at', { ascending: true });

        if (!error && data && data.length > 0) {
          const customIds = new Set(data.map(d => d.id));
          const baseTopics = this.DEFAULT_TOPICS.filter(t => !customIds.has(t.id));
          topics = [...baseTopics, ...data];
          localStorage.setItem('IF23_DISCUSSION_TOPICS', JSON.stringify(topics));
          return topics;
        }
      } catch (err) {
        // Fallback jika tabel belum dibuat
      }
    }

    // Ambil dari cache lokal
    const saved = localStorage.getItem('IF23_DISCUSSION_TOPICS');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const customIds = new Set(parsed.map(d => d.id));
          const baseTopics = this.DEFAULT_TOPICS.filter(t => !customIds.has(t.id));
          return [...baseTopics, ...parsed.filter(p => !baseTopics.some(b => b.id === p.id))];
        }
      } catch (e) {}
    }

    return topics;
  },

  // Buat topik diskusi baru
  async createDiscussionTopic({ name, description, icon, creator_name }) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newTopic = {
      id: `topic-${slug || Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      description: description ? description.trim() : `Ruang diskusi khusus topik ${name.trim()}`,
      icon: icon || '💡',
      creator_name: creator_name || 'Anonim',
      created_at: new Date().toISOString()
    };

    // Simpan ke Supabase jika tabel discussion_topics tersedia
    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('discussion_topics')
          .insert([newTopic])
          .select();

        if (!error && data && data[0]) {
          newTopic.id = data[0].id;
        }
      } catch (err) {
        // Fallback simpan lokal
      }
    }

    // Simpan ke cache lokal
    try {
      const current = await this.getDiscussionTopics();
      if (!current.some(t => t.id === newTopic.id)) {
        const updated = [...current, newTopic];
        localStorage.setItem('IF23_DISCUSSION_TOPICS', JSON.stringify(updated));
      }
    } catch (e) {}

    return newTopic;
  },

  // Ambil daftar pesan forum komunitas
  async getCommunityMessages() {
    // Helper decode pesan jika metadata tersimpan di database
    const decodeMsg = (msg) => {
      if (!msg) return msg;
      let reply_to = msg.reply_to;
      let message = msg.message || '';
      let topic_id = msg.topic_id || 'umum';

      if (typeof reply_to === 'string') {
        try {
          reply_to = JSON.parse(reply_to);
        } catch (e) {}
      }

      if (reply_to && reply_to.topic_id && (!msg.topic_id || msg.topic_id === 'umum')) {
        topic_id = reply_to.topic_id;
      }

      // Jika kolom native belum ada, ambil dari metadata awalan teks [IF23_META:...] atau [IF23_REPLY:...]
      if (message.startsWith('[IF23_META:')) {
        const match = message.match(/^\[IF23_META:(.*?)\]\s([\s\S]*)$/);
        if (match) {
          try {
            const meta = JSON.parse(match[1]);
            if (meta.reply_to) reply_to = meta.reply_to;
            if (meta.topic_id) topic_id = meta.topic_id;
            message = match[2];
          } catch (e) {}
        }
      } else if (!reply_to && message.startsWith('[IF23_REPLY:')) {
        const match = message.match(/^\[IF23_REPLY:(.*?)\]\s([\s\S]*)$/);
        if (match) {
          try {
            reply_to = JSON.parse(match[1]);
            if (reply_to && reply_to.topic_id) topic_id = reply_to.topic_id;
            message = match[2];
          } catch (e) {}
        }
      }

      return {
        ...msg,
        topic_id: topic_id || 'umum',
        reply_to: reply_to || null,
        message
      };
    };

    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('community_messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(300);

        if (!error && data) {
          const decoded = data.map(decodeMsg);
          localStorage.setItem('IF23_COMMUNITY_MESSAGES', JSON.stringify(decoded));
          return decoded;
        }
      } catch (err) {
        console.warn('Fallback community messages ke localStorage:', err);
      }
    }

    // Default pesan komunitas awal jika belum ada data di database
    const saved = localStorage.getItem('IF23_COMMUNITY_MESSAGES');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.map(decodeMsg) : [];
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
        topic_id: 'umum',
        message: 'Selamat datang di Ruang Diskusi Terbuka Mahasiswa Informatika 23! Forum ini bisa digunakan siapa saja (mahasiswa, dosen, maupun umum) untuk saling bertukar info skripsi, magang, dan akademik.',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'msg-demo-2',
        sender_name: 'Dosen Pembimbing FKT',
        sender_email: 'dosen.fkt@almaata.ac.id',
        sender_avatar: null,
        sender_role: 'Dosen / Pengajar',
        topic_id: 'sempro-skripsi',
        message: 'Jangan lupa untuk yang mengajukan judul skripsi perhatikan batas Turnitin maksimal 20% dan wajib ikut sempro minimal 5 kali sebelum mendaftar ujian ya.',
        created_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'msg-demo-3',
        sender_name: 'Koordinator Magang',
        sender_email: 'magang.if@almaata.ac.id',
        sender_avatar: null,
        sender_role: 'Pengurus Angkatan',
        topic_id: 'magang',
        message: 'Bagi teman-teman yang tertarik magang MSIB Kampus Merdeka atau magang industri di Yogyakarta, silakan diskusikan persyaratannya di topik ini!',
        created_at: new Date(Date.now() - 3600000 * 1.5).toISOString()
      }
    ];
  },

  // Kirim pesan baru ke forum komunitas (dengan dukungan topik ruangan & balasan)
  async sendCommunityMessage({ sender_name, sender_email, sender_avatar, sender_role, message, reply_to = null, topic_id = 'umum' }) {
    const resolvedTopicId = topic_id || (reply_to && reply_to.topic_id) || 'umum';
    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sender_name: sender_name || 'Anonim',
      sender_email: sender_email || 'guest@gmail.com',
      sender_avatar: sender_avatar || null,
      sender_role: sender_role || 'Tamu / Umum',
      topic_id: resolvedTopicId,
      message: message.trim(),
      reply_to: reply_to ? { ...reply_to, topic_id: resolvedTopicId } : null,
      created_at: new Date().toISOString()
    };

    // Kirim ke Supabase
    if (supabase && isSupabaseConfigured) {
      try {
        let insertPayload = {
          sender_name: newMsg.sender_name,
          sender_email: newMsg.sender_email,
          sender_avatar: newMsg.sender_avatar,
          sender_role: newMsg.sender_role,
          message: newMsg.message,
          topic_id: newMsg.topic_id,
          reply_to: newMsg.reply_to
        };

        let { data, error } = await supabase
          .from('community_messages')
          .insert([insertPayload])
          .select();

        // Jika kolom reply_to atau topic_id belum ada di tabel database Supabase pengguna:
        // Sematkan metadata balasan & topik langsung ke dalam awalan teks pesan
        if (error && error.message) {
          const errMsg = error.message.toLowerCase();
          if (errMsg.includes('reply_to') || errMsg.includes('topic_id')) {
            delete insertPayload.reply_to;
            delete insertPayload.topic_id;

            const metaPayload = {
              topic_id: newMsg.topic_id,
              reply_to: newMsg.reply_to
            };
            insertPayload.message = `[IF23_META:${JSON.stringify(metaPayload)}] ${newMsg.message}`;

            const retry = await supabase.from('community_messages').insert([insertPayload]).select();
            error = retry.error;
            data = retry.data;
          }
        }

        if (error) {
          console.warn('Supabase message insert error (menggunakan data lokal):', error);
        } else if (data && data[0]) {
          return {
            ...data[0],
            topic_id: newMsg.topic_id,
            reply_to: newMsg.reply_to,
            message: newMsg.message
          };
        }
      } catch (err) {
        console.error('Supabase message error:', err);
      }
    }

    // Simpan lokal sebagai cache
    try {
      const current = await this.getCommunityMessages();
      const updated = [...current, newMsg];
      localStorage.setItem('IF23_COMMUNITY_MESSAGES', JSON.stringify(updated));
    } catch (e) {
      console.error('Save message local error:', e);
    }

    return newMsg;
  },

  // Subscribe ke pesan realtime
  subscribeCommunityMessages(callback) {
    if (supabase && isSupabaseConfigured) {
      const decodeMsg = (msg) => {
        if (!msg) return msg;
        let reply_to = msg.reply_to;
        let message = msg.message || '';
        let topic_id = msg.topic_id || 'umum';

        if (typeof reply_to === 'string') {
          try {
            reply_to = JSON.parse(reply_to);
          } catch (e) {}
        }

        if (reply_to && reply_to.topic_id && (!msg.topic_id || msg.topic_id === 'umum')) {
          topic_id = reply_to.topic_id;
        }

        if (message.startsWith('[IF23_META:')) {
          const match = message.match(/^\[IF23_META:(.*?)\]\s([\s\S]*)$/);
          if (match) {
            try {
              const meta = JSON.parse(match[1]);
              if (meta.reply_to) reply_to = meta.reply_to;
              if (meta.topic_id) topic_id = meta.topic_id;
              message = match[2];
            } catch (e) {}
          }
        } else if (!reply_to && message.startsWith('[IF23_REPLY:')) {
          const match = message.match(/^\[IF23_REPLY:(.*?)\]\s([\s\S]*)$/);
          if (match) {
            try {
              reply_to = JSON.parse(match[1]);
              if (reply_to && reply_to.topic_id) topic_id = reply_to.topic_id;
              message = match[2];
            } catch (e) {}
          }
        }

        return {
          ...msg,
          topic_id: topic_id || 'umum',
          reply_to: reply_to || null,
          message
        };
      };

      const channel = supabase
        .channel('public:community_messages')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'community_messages' },
          (payload) => {
            if (payload && payload.new) {
              callback(decodeMsg(payload.new));
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
