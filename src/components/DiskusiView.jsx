import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  MessageSquare, 
  Bot, 
  Send, 
  Users, 
  Sparkles, 
  LogIn, 
  User, 
  Check, 
  Clock, 
  AlertCircle, 
  RefreshCw,
  HelpCircle,
  BookOpen,
  Calendar,
  Flame,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CornerUpLeft,
  Heart,
  Plus,
  Hash,
  FolderPlus,
  Briefcase,
  GraduationCap,
  Code2,
  Laptop,
  Lightbulb,
  Rocket,
  Trophy,
  Coffee,
  Megaphone,
  X
} from 'lucide-react';
import { StorageService, isSupabaseConfigured } from '../lib/supabase';
import { JADWAL_YUDISIUM_WISUDA } from '../data/kalenderAkademik';
import { detectUserRole } from '../data/mahasiswaIf23';

// Mapping Ikon SVG Lucide untuk Topik Diskusi
const TOPIC_ICON_MAP = {
  'MessageSquare': MessageSquare,
  'Briefcase': Briefcase,
  'GraduationCap': GraduationCap,
  'BookOpen': BookOpen,
  'Code2': Code2,
  'Laptop': Laptop,
  'Lightbulb': Lightbulb,
  'Rocket': Rocket,
  'Trophy': Trophy,
  'Coffee': Coffee,
  'Megaphone': Megaphone,
  'Users': Users,
  'HelpCircle': HelpCircle,
  'Flame': Flame,
  'Sparkles': Sparkles,
  // Backward compatibility jika ada topik lama dari database berupa emoji
  '💬': MessageSquare,
  '💼': Briefcase,
  '🎓': GraduationCap,
  '📚': BookOpen,
  '💻': Laptop,
  '💡': Lightbulb,
  '🚀': Rocket,
  '🏆': Trophy,
  '☕': Coffee,
  '📢': Megaphone,
  '🔥': Flame
};

// Pilihan Ikon SVG Profesional untuk Form Pembuatan Topik Baru
const AVAILABLE_TOPIC_ICONS = [
  { key: 'MessageSquare', label: 'Umum & Chat', icon: MessageSquare, color: 'text-sky-600 bg-sky-50' },
  { key: 'Briefcase', label: 'Magang & Karir', icon: Briefcase, color: 'text-amber-600 bg-amber-50' },
  { key: 'GraduationCap', label: 'Sempro & Skripsi', icon: GraduationCap, color: 'text-purple-600 bg-purple-50' },
  { key: 'BookOpen', label: 'Kuliah & Tugas', icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
  { key: 'Code2', label: 'Koding & App', icon: Code2, color: 'text-emerald-600 bg-emerald-50' },
  { key: 'Laptop', label: 'IT & Hardware', icon: Laptop, color: 'text-indigo-600 bg-indigo-50' },
  { key: 'Lightbulb', label: 'Ide & Proyek', icon: Lightbulb, color: 'text-yellow-600 bg-yellow-50' },
  { key: 'Rocket', label: 'Inovasi & Riset', icon: Rocket, color: 'text-rose-600 bg-rose-50' },
  { key: 'Trophy', label: 'Lomba & Prestasi', icon: Trophy, color: 'text-amber-700 bg-amber-100' },
  { key: 'Megaphone', label: 'Pengumuman', icon: Megaphone, color: 'text-red-600 bg-red-50' },
  { key: 'Users', label: 'Hima & Angkatan', icon: Users, color: 'text-teal-600 bg-teal-50' },
  { key: 'Coffee', label: 'Santai & Ngopi', icon: Coffee, color: 'text-orange-600 bg-orange-50' }
];

function TopicIcon({ iconKey, className = "w-4 h-4" }) {
  const IconComp = TOPIC_ICON_MAP[iconKey] || MessageSquare;
  return <IconComp className={className} />;
}

// Knowledge base lokal untuk Asisten AI PusingBot
const AI_KNOWLEDGE_BASE = [
  {
    keywords: ['turnitin', 'plagiasi', 'plagiarism', 'kemiripan'],
    answer: `Berdasarkan Buku Panduan Skripsi FKT Universitas Alma Ata:
• **Batas Maksimal Turnitin**: Maksimal **20%** kemiripan (similarity index).
• Pengecekan dilakukan per bab atau naskah lengkap melalui petugas cek Turnitin fakultas/prodi.
• Jika hasil Turnitin melebihi 20%, naskah wajib direvisi (parafrase) sebelum diajukan ke sidang sempro atau pendadaran.`
  },
  {
    keywords: ['margin', 'font', 'huruf', 'spasi', 'format', 'kertas', 'penulisan'],
    answer: `Standar format penulisan naskah skripsi FKT Alma Ata:
• **Kertas**: Ukuran A4 (80 gram).
• **Margin**: Kiri = **4 cm**, Atas = **4 cm**, Kanan = **3 cm**, Bawah = **3 cm** (Aturan 4-4-3-3 atau 4-3-3-3).
• **Jenis Font**: **Times New Roman**, ukuran **12 pt** untuk teks utama (Judul bab 14 pt bold).
• **Spasi**: **1.5 spasi** (kecuali abstrak, kutipan langsung panjang, dan daftar pustaka 1 spasi).
• **Bahasa Abstrak**: Bahasa Indonesia dan Bahasa Inggris (dilengkapi 3–5 kata kunci).`
  },
  {
    keywords: ['aaept', 'toefl', 'bahasa inggris', 'skor'],
    answer: `Ketentuan Kemampuan Bahasa Inggris (AAEPT) FKT UAA:
• **Skor Minimal AAEPT**: Minimal **450 poin**.
• Tes diselenggarakan oleh Pusat Bahasa Universitas Alma Ata.
• Sertifikat AAEPT menjadi syarat wajib kelayakan sebelum mahasiswa mendaftar ujian pendadaran.`
  },
  {
    keywords: ['audiens', 'hadir sempro', 'kehadiran sempro', 'penonton sempro'],
    answer: `Syarat Audiens Seminar Proposal (Sempro):
• Mahasiswa wajib menghadiri seminar proposal teman minimal **5 kali (5x)** sebagai audiens/penonton.
• Bukti kehadiran dicatat pada lembar kartu kendali kehadiran sempro dan ditandatangani oleh moderator/dosen penguji sempro.`
  },
  {
    keywords: ['yudisium', 'wisuda', 'jadwal', 'gelombang', 'periode'],
    answer: `Jadwal Yudisium & Wisuda TA 2026/2027 (SK Rektor No. 216/A/SK/UAA/VII/2026):
1. **Periode I**: Batas Pendadaran 28 Ags 2026 | **Yudisium 11 Sep 2026** | Wisuda 02 Des 2026
2. **Periode II**: Batas Pendadaran 23 Okt 2026 | **Yudisium 06 Nov 2026** | Wisuda 31 Mar 2027
3. **Periode III**: Batas Pendadaran 29 Jan 2027 | **Yudisium 12 Feb 2027** | Wisuda 31 Mar 2027
4. **Periode IV**: Batas Pendadaran 09 Apr 2027 | **Yudisium 23 Apr 2027** | Wisuda 25 Ags 2027
5. **Periode V**: Batas Pendadaran 16 Jul 2027 | **Yudisium 30 Jul 2027** | Wisuda 25 Ags 2027`
  },
  {
    keywords: ['syarat pendadaran', 'daftar pendadaran', 'ujian skripsi', 'berkas pendadaran'],
    answer: `Syarat pendaftaran Ujian Pendadaran (Skripsi) FKT Alma Ata:
1. Bebas tanggungan administrasi & keuangan dari DAA / Bagian Keuangan.
2. IPK minimal 3.25 tanpa nilai D/E untuk mata kuliah wajib.
3. Lolos Turnitin maksimal 20% yang disahkan prodi.
4. Lolos skor AAEPT minimal 450 poin.
5. Telah menghadiri sempro teman minimal 5 kali.
6. Naskah skripsi Bab 1–5 telah di-ACC lengkap oleh Dosen Pembimbing I dan II.
7. Persetujuan Kaji Etik KEPK UAA (jika riset melibatkan data subjek manusia/kesehatan).`
  },
  {
    keywords: ['kaji etik', 'etik', 'kepk', 'ethical clearance'],
    answer: `Prosedur Kaji Etik (Ethical Clearance) KEPK UAA:
• Wajib bagi penelitian yang mengambil data primer dari manusia, instansi kesehatan/klinis, atau data sensitif pengguna.
• Mahasiswa mengajukan protokol kaji etik melalui Komisi Etik Penelitian Kesehatan (KEPK) Universitas Alma Ata.
• Surat Keterangan Lolos Kaji Etik wajib dilampirkan dalam naskah skripsi final.`
  }
];

export default function DiskusiView({ currentUser, profile }) {
  const [activeSubTab, setActiveSubTab] = useState('komunitas'); // 'komunitas' | 'ai'

  // --- STATE FORUM KOMUNITAS & TOPIK RUANGAN (TIKTOK STYLE) ---
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // { id, sender_name, root_id, message }
  const [expandedThreads, setExpandedThreads] = useState({}); // { [rootId]: boolean }
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // State Topik Diskusi
  const [topics, setTopics] = useState(StorageService.DEFAULT_TOPICS || []);
  const [selectedTopicId, setSelectedTopicId] = useState('umum');
  const [isCreateTopicModalOpen, setIsCreateTopicModalOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');
  const [newTopicIcon, setNewTopicIcon] = useState('Briefcase');
  const [isSubmittingTopic, setIsSubmittingTopic] = useState(false);

  // Status Like Komentar (Disimpan di LocalStorage)
  const [likedComments, setLikedComments] = useState(() => {
    try {
      const saved = localStorage.getItem('IF23_LIKED_COMMENTS');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const handleToggleLike = (msgId) => {
    setLikedComments(prev => {
      const updated = { ...prev, [msgId]: !prev[msgId] };
      try {
        localStorage.setItem('IF23_LIKED_COMMENTS', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Toggle buka/tutup balasan ala TikTok
  const toggleThread = (rootId) => {
    setExpandedThreads(prev => ({
      ...prev,
      [rootId]: !prev[rootId]
    }));
  };

  // Topik yang sedang aktif dipilih
  const selectedTopic = useMemo(() => {
    return topics.find(t => t.id === selectedTopicId) || topics[0] || {
      id: 'umum',
      name: 'Umum & Bebas',
      description: 'Ruang obrolan santai mahasiswa IF23',
      icon: 'MessageSquare'
    };
  }, [topics, selectedTopicId]);

  // Hitung jumlah pesan per topik
  const topicMessageCounts = useMemo(() => {
    const counts = {};
    messages.forEach(m => {
      const tId = m.topic_id || 'umum';
      counts[tId] = (counts[tId] || 0) + 1;
    });
    return counts;
  }, [messages]);

  // Guest Identity (Nama & Gmail)
  const [guestIdentity, setGuestIdentity] = useState(() => {
    try {
      const saved = localStorage.getItem('IF23_GUEST_IDENTITY');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return { name: '', email: '' };
  });
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');

  // --- ORGANISASI PESAN BERJENJANG PER TOPIK (TIKTOK-STYLE THREADING) ---
  const { rootComments, repliesByRoot, totalCommentsCount } = useMemo(() => {
    // Filter hanya pesan yang masuk ke kategori/topik yang sedang dibuka
    const topicMessages = messages.filter(m => (m.topic_id || 'umum') === selectedTopicId);
    const messageMap = new Map();
    topicMessages.forEach(m => messageMap.set(m.id, m));

    // Mencari ID komentar utama paling atas (Root Parent)
    function findRootId(msg) {
      let current = msg;
      let depth = 0;
      while (current && current.reply_to && current.reply_to.id && depth < 10) {
        if (current.reply_to.root_id) {
          return current.reply_to.root_id;
        }
        const parent = messageMap.get(current.reply_to.id);
        if (!parent) return current.reply_to.id;
        if (!parent.reply_to || !parent.reply_to.id) {
          return parent.id;
        }
        current = parent;
        depth++;
      }
      return current ? current.id : null;
    }

    const roots = [];
    const replies = new Map();

    topicMessages.forEach(msg => {
      if (!msg.reply_to || !msg.reply_to.id) {
        roots.push(msg);
      } else {
        const rootId = msg.reply_to.root_id || findRootId(msg);
        if (messageMap.has(rootId)) {
          if (!replies.has(rootId)) {
            replies.set(rootId, []);
          }
          replies.get(rootId).push(msg);
        } else {
          // Jika parent tidak ditemukan di memori, jadikan komentar utama
          roots.push(msg);
        }
      }
    });

    return {
      rootComments: roots,
      repliesByRoot: replies,
      totalCommentsCount: topicMessages.length
    };
  }, [messages, selectedTopicId]);

  // --- STATE ASISTEN AI ---
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      id: 'ai-welcome',
      sender: 'bot',
      text: 'Halo! Saya PusingBot, Asisten AI resmi Mahasiswa Informatika 23 Universitas Alma Ata. Ada yang bisa saya bantu seputar aturan Buku Panduan Skripsi FKT, jadwal yudisium, format penulisan, atau konsultasi topik riset?',
      time: 'Baru saja'
    }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const aiChatEndRef = useRef(null);

  // 1. Muat topik dan pesan forum komunitas
  useEffect(() => {
    let unsubscribe = () => {};

    async function loadData() {
      setIsLoadingMessages(true);
      try {
        const [loadedTopics, msgs] = await Promise.all([
          StorageService.getDiscussionTopics(),
          StorageService.getCommunityMessages()
        ]);
        if (loadedTopics && loadedTopics.length > 0) {
          setTopics(loadedTopics);
        }
        setMessages(msgs || []);
      } catch (err) {
        console.error('Error load community data:', err);
      } finally {
        setIsLoadingMessages(false);
      }

      // Berlangganan realtime Supabase jika aktif
      unsubscribe = StorageService.subscribeCommunityMessages((newMsg) => {
        setMessages(prev => {
          if (prev.some(m => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
      });
    }

    loadData();

    return () => {
      unsubscribe();
    };
  }, []);

  // Auto scroll forum pesan hanya saat pertama atau jika tidak sedang membaca
  useEffect(() => {
    if (activeSubTab === 'komunitas' && messages.length > 0) {
      // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, activeSubTab]);

  // Buat topik diskusi baru
  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    let creatorName = 'Anonim';
    if (currentUser) {
      creatorName = currentUser.nama_lengkap;
    } else if (guestIdentity.name) {
      creatorName = guestIdentity.name;
    }

    setIsSubmittingTopic(true);
    try {
      const created = await StorageService.createDiscussionTopic({
        name: newTopicName.trim(),
        description: newTopicDesc.trim(),
        icon: newTopicIcon || 'Briefcase',
        creator_name: creatorName
      });

      setTopics(prev => {
        if (prev.some(t => t.id === created.id)) return prev;
        return [...prev, created];
      });
      setSelectedTopicId(created.id);
      setIsCreateTopicModalOpen(false);
      setNewTopicName('');
      setNewTopicDesc('');
      setNewTopicIcon('Briefcase');
    } catch (err) {
      console.error('Create topic error:', err);
    } finally {
      setIsSubmittingTopic(false);
    }
  };

  // Hapus topik diskusi
  const handleDeleteTopic = async (e, topicId) => {
    e.stopPropagation();
    if (topicId === 'umum') return;
    if (!window.confirm('Hapus topik diskusi ini?')) return;

    try {
      const updated = await StorageService.deleteDiscussionTopic(topicId);
      setTopics(updated);
      if (selectedTopicId === topicId) {
        setSelectedTopicId('umum');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Auto scroll AI chat
  useEffect(() => {
    if (activeSubTab === 'ai') {
      aiChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiChatMessages, activeSubTab]);

  // Kirim Pesan Forum Komunitas
  const handleSendCommunityMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Tentukan pengirim
    let senderName = 'Tamu Umum';
    let senderEmail = 'guest@gmail.com';
    let senderRole = 'Tamu / Umum';

    if (currentUser) {
      senderName = currentUser.nama_lengkap;
      senderEmail = currentUser.email || `${currentUser.nim}@almaata.ac.id`;
      senderRole = currentUser.peran || detectUserRole({ nim: currentUser.nim, email: currentUser.email });
    } else if (guestIdentity.name && guestIdentity.email) {
      senderName = guestIdentity.name;
      senderEmail = guestIdentity.email;
      senderRole = detectUserRole({ email: guestIdentity.email });
    } else {
      // Jika belum login dan belum set identitas, minta isi dulu
      setTempName(guestIdentity.name || '');
      setTempEmail(guestIdentity.email || '');
      setIsIdentityModalOpen(true);
      return;
    }

    const replyPayload = replyingTo ? {
      id: replyingTo.id,
      sender_name: replyingTo.sender_name,
      root_id: replyingTo.root_id || replyingTo.id,
      message: replyingTo.message ? replyingTo.message.slice(0, 100) : ''
    } : null;

    setIsSending(true);
    try {
      const sentMsg = await StorageService.sendCommunityMessage({
        sender_name: senderName,
        sender_email: senderEmail,
        sender_avatar: null,
        sender_role: senderRole,
        topic_id: selectedTopicId,
        message: inputText.trim(),
        reply_to: replyPayload
      });

      setMessages(prev => {
        if (prev.some(m => m.id === sentMsg.id)) return prev;
        return [...prev, sentMsg];
      });

      // Jika membalas pesan, otomatis buka cabang thread tersebut agar balasan langsung terlihat
      if (replyPayload && replyPayload.root_id) {
        setExpandedThreads(prev => ({
          ...prev,
          [replyPayload.root_id]: true
        }));
      }

      setInputText('');
      setReplyingTo(null);
    } catch (err) {
      console.error('Send message error:', err);
    } finally {
      setIsSending(false);
    }
  };

  // Balas pesan tertentu (bisa komentar utama maupun balasan sub-komentar)
  const handleReplyTo = (msg, rootId = null) => {
    const targetRootId = rootId || msg.reply_to?.root_id || msg.id;
    setReplyingTo({
      id: msg.id,
      sender_name: msg.sender_name,
      root_id: targetRootId,
      message: msg.message
    });
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 60);
  };

  // Batalkan balasan
  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  // Scroll dan sorot pesan yang dibalas
  const scrollToMessage = (msgId) => {
    if (!msgId) return;
    const el = document.getElementById(`community-msg-${msgId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
      }, 2000);
    }
  };

  // Simpan Identitas Tamu (Nama & Gmail)
  const handleSaveIdentity = (e) => {
    e.preventDefault();
    if (!tempName.trim() || !tempEmail.trim()) return;

    const newIdentity = {
      name: tempName.trim(),
      email: tempEmail.trim()
    };

    setGuestIdentity(newIdentity);
    localStorage.setItem('IF23_GUEST_IDENTITY', JSON.stringify(newIdentity));
    setIsIdentityModalOpen(false);
  };

  // Login cepat dengan Google OAuth
  const handleGoogleLogin = async () => {
    try {
      const { error } = await StorageService.signInWithGoogle();
      if (error) {
        alert('Fitur Google OAuth memerlukan pengaktifan Google Provider di dashboard Supabase Anda. Anda tetap bisa langsung mengisi Nama & Alamat Gmail di form bawah!');
        setIsIdentityModalOpen(true);
      }
    } catch (e) {
      console.error(e);
      setIsIdentityModalOpen(true);
    }
  };

  // Kirim Pertanyaan ke Asisten AI
  const handleSendAiMessage = (customText) => {
    const query = (typeof customText === 'string' ? customText : aiInputText).trim();
    if (!query) return;

    const userMsg = {
      id: `ai-user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setAiChatMessages(prev => [...prev, userMsg]);
    setAiInputText('');
    setIsAiTyping(true);

    // Cari kecocokan di basis pengetahuan lokal
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedAnswer = null;

      for (const item of AI_KNOWLEDGE_BASE) {
        if (item.keywords.some(k => lower.includes(k))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      if (!matchedAnswer) {
        matchedAnswer = `Terima kasih atas pertanyaannya seputar "${query}". 
Berdasarkan panduan FKT Informatika Universitas Alma Ata:
• Pastikan Anda mengikuti tahapan Roadmap 5 Fase (Magang, Pra-Proposal, Sempro, Riset Naskah, Pendadaran).
• Konsultasikan selalu perkembangan skripsi dengan Dosen Pembimbing I dan II minimal 8 kali bimbingan.
• Untuk panduan lengkap resmi, silakan buka menu **Panduan FKT (PDF)** di navbar atau tanyakan topik spesifik seperti: Turnitin, format margin, AAEPT, atau jadwal yudisium!`;
      }

      const botMsg = {
        id: `ai-bot-${Date.now()}`,
        sender: 'bot',
        text: matchedAnswer,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setAiChatMessages(prev => [...prev, botMsg]);
      setIsAiTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6 font-instrument animate-fadeIn pb-12">
      
      {/* Banner Utama Ruang Diskusi */}
      <div className="bg-gradient-to-br from-[#0b5e91] via-[#084d77] to-[#06334f] text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-amber-300 mb-2">
              <MessageSquare className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider">Komunikasi Terpadu Angkatan 2023</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-philosopher tracking-wide">
              Ruang Diskusi & Konsultasi Terpadu
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/90 mt-1.5 max-w-2xl leading-relaxed">
              Forum terbuka untuk saling bertukar informasi seputar tempat magang, bimbingan dosen, serta asisten AI cerdas untuk konsultasi aturan skripsi FKT Universitas Alma Ata.
            </p>
          </div>

          {/* Tab Switcher Ganda */}
          <div className="flex items-center bg-black/30 p-1.5 rounded-2xl border border-white/20 self-start md:self-auto backdrop-blur-xs">
            <button
              onClick={() => setActiveSubTab('komunitas')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeSubTab === 'komunitas'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Forum Komunitas</span>
            </button>

            <button
              onClick={() => setActiveSubTab('ai')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeSubTab === 'ai'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Tanya Asisten AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: FORUM KOMUNITAS IF23 (ROOM TERBUKA REAL-TIME) */}
      {/* ========================================================= */}
      {activeSubTab === 'komunitas' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden flex flex-col h-[650px]">
          
          {/* Header Bar Ruang Obrolan & Topik */}
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                <TopicIcon iconKey={selectedTopic.icon} className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-900 font-philosopher text-base">
                    Room: {selectedTopic.name}
                  </h3>
                  <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse mr-1" />
                    Live
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate max-w-md">
                  {selectedTopic.description}
                </p>
              </div>
            </div>

            {/* Identitas Aktif Pengirim */}
            <div className="flex items-center space-x-2 self-start sm:self-auto">
              {currentUser ? (
                <div className="flex items-center space-x-2 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.nama_lengkap.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-primary block text-[11px] leading-tight truncate max-w-[120px]">
                      {currentUser.nama_lengkap}
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium">
                      {currentUser.peran || currentUser.nim}
                    </span>
                  </div>
                </div>
              ) : guestIdentity.name ? (
                <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-700 font-bold text-[11px] truncate max-w-[130px]">
                    {guestIdentity.name}
                  </span>
                  <button
                    onClick={() => {
                      setTempName(guestIdentity.name);
                      setTempEmail(guestIdentity.email);
                      setIsIdentityModalOpen(true);
                    }}
                    className="text-[10px] text-primary hover:underline font-semibold cursor-pointer"
                  >
                    Ubah
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                    title="Masuk menggunakan akun Google / Gmail"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Lanjut dengan Google</span>
                  </button>
                  <button
                    onClick={() => {
                      setTempName(guestIdentity.name || '');
                      setTempEmail(guestIdentity.email || '');
                      setIsIdentityModalOpen(true);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Isi Nama & Gmail
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bar Pilihan Topik Diskusi & Tombol Buat Topik */}
          <div className="bg-slate-100/90 px-3 sm:px-4 py-2 border-b border-slate-200 flex items-center justify-between gap-2 overflow-hidden">
            {/* List Topik Scrollable */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto py-0.5 flex-1 min-w-0 no-scrollbar">
              {topics.map((topic) => {
                const isSelected = topic.id === selectedTopicId;
                const count = topicMessageCounts[topic.id] || 0;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      setReplyingTo(null);
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex-shrink-0 select-none ${
                      isSelected
                        ? 'bg-primary text-white shadow-xs ring-2 ring-primary/20 scale-[1.02]'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                    title={topic.description}
                  >
                    <TopicIcon iconKey={topic.icon} className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-primary'}`} />
                    <span>{topic.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {count}
                    </span>
                    {topic.id !== 'umum' && (
                      <span
                        role="button"
                        onClick={(e) => handleDeleteTopic(e, topic.id)}
                        className={`ml-0.5 p-0.5 rounded-full transition-colors cursor-pointer ${
                          isSelected ? 'hover:bg-white/20 text-white/80 hover:text-white' : 'hover:bg-slate-200 text-slate-400 hover:text-rose-500'
                        }`}
                        title={`Hapus topik ${topic.name}`}
                      >
                        <X className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tombol Buat Topik Baru */}
            <button
              type="button"
              onClick={() => setIsCreateTopicModalOpen(true)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 border border-dashed border-amber-300 font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer flex-shrink-0"
              title="Buat topik diskusi baru"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Topik</span>
            </button>
          </div>

          {/* Area Komentar & Balasan Bersarang ala TikTok */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-white divide-y divide-slate-100">
            {isLoadingMessages ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                <span>Memuat komentar forum...</span>
              </div>
            ) : rootComments.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                  <TopicIcon iconKey={selectedTopic.icon} className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-semibold">Belum ada obrolan di topik {selectedTopic.name}.</p>
                <p className="text-xs">Jadilah yang pertama memulai diskusi atau bertanya di topik ini!</p>
              </div>
            ) : (
              rootComments.map((root) => {
                const isRootMe = (currentUser && root.sender_email?.includes(currentUser.nim)) || 
                                 (!currentUser && guestIdentity.email && root.sender_email === guestIdentity.email);
                const isRootLiked = !!likedComments[root.id];
                const replies = repliesByRoot.get(root.id) || [];
                const isExpanded = !!expandedThreads[root.id];
                const timeStr = root.created_at 
                  ? new Date(root.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                  : '';

                return (
                  <div 
                    key={root.id} 
                    id={`community-msg-${root.id}`}
                    className="pt-3 pb-2 transition-all duration-300 rounded-2xl"
                  >
                    {/* Komentar Utama (Level 1) */}
                    <div className="flex items-start justify-between space-x-3">
                      {/* Avatar & Konten Komentar */}
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        {/* Avatar Bulat ala TikTok */}
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-2xs flex-shrink-0 font-philosopher ${
                          isRootMe 
                            ? 'bg-amber-600' 
                            : root.sender_role?.includes('Dosen')
                            ? 'bg-indigo-600'
                            : root.sender_role?.includes('Alma Ata')
                            ? 'bg-emerald-600'
                            : 'bg-primary'
                        }`}>
                          {root.sender_name ? root.sender_name.charAt(0).toUpperCase() : 'U'}
                        </div>

                        {/* Kolom Informasi & Teks Komentar */}
                        <div className="flex-1 min-w-0">
                          {/* Header Komentar: Nama & Badge */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                              {root.sender_name}
                            </span>
                            {root.sender_role && (
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${
                                root.sender_role.includes('Informatika 23') || root.sender_role.includes('IF23')
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : root.sender_role.includes('Alma Ata')
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : root.sender_role.includes('Dosen')
                                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                                  : 'bg-blue-50 text-blue-800 border-blue-200'
                              }`}>
                                {root.sender_role}
                              </span>
                            )}
                            {isRootMe && (
                              <span className="text-[9px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                                Anda
                              </span>
                            )}
                          </div>

                          {/* Isi Teks Komentar */}
                          <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed break-words whitespace-pre-wrap">
                            {root.message}
                          </p>

                          {/* Bar Aksi (Waktu & Tombol Balas) */}
                          <div className="flex items-center space-x-3 mt-1.5 text-xs text-slate-400">
                            <span className="text-[11px] font-mono">{timeStr}</span>
                            <button
                              type="button"
                              onClick={() => handleReplyTo(root)}
                              className="font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer text-xs"
                            >
                              Balas
                            </button>
                          </div>

                          {/* Cabang Balasan Bersarang ala TikTok (Nested Thread) */}
                          {replies.length > 0 && (
                            <div className="mt-2.5">
                              {!isExpanded ? (
                                /* Tombol Buka Balasan ("Lihat X balasan ⌵") */
                                <button
                                  type="button"
                                  onClick={() => toggleThread(root.id)}
                                  className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer group select-none"
                                >
                                  <div className="w-6 h-[1.5px] bg-slate-300 group-hover:bg-primary transition-colors" />
                                  <span>Lihat {replies.length} balasan</span>
                                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                                </button>
                              ) : (
                                /* Daftar Balasan yang Terbuka */
                                <div className="space-y-3.5 pl-3 sm:pl-4 border-l-2 border-slate-200 mt-2">
                                  {replies.map((reply) => {
                                    const isReplyMe = (currentUser && reply.sender_email?.includes(currentUser.nim)) || 
                                                      (!currentUser && guestIdentity.email && reply.sender_email === guestIdentity.email);
                                    const isReplyLiked = !!likedComments[reply.id];
                                    const replyTime = reply.created_at 
                                      ? new Date(reply.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                                      : '';

                                    return (
                                      <div 
                                        key={reply.id} 
                                        id={`community-msg-${reply.id}`}
                                        className="flex items-start justify-between space-x-2.5 group pt-1"
                                      >
                                        <div className="flex items-start space-x-2.5 flex-1 min-w-0">
                                          {/* Avatar Sub-Komentar */}
                                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-2xs flex-shrink-0 font-philosopher ${
                                            isReplyMe 
                                              ? 'bg-amber-600' 
                                              : reply.sender_role?.includes('Dosen')
                                              ? 'bg-indigo-600'
                                              : 'bg-primary'
                                          }`}>
                                            {reply.sender_name ? reply.sender_name.charAt(0).toUpperCase() : 'U'}
                                          </div>

                                          {/* Isi Balasan */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                              <span className="font-bold text-xs text-slate-900 truncate">
                                                {reply.sender_name}
                                              </span>
                                              {reply.sender_role && (
                                                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                                  {reply.sender_role}
                                                </span>
                                              )}
                                              {isReplyMe && (
                                                <span className="text-[9px] font-semibold text-amber-700 bg-amber-50 px-1 rounded">
                                                  Anda
                                                </span>
                                              )}
                                            </div>

                                            {/* Teks dengan mention ala TikTok (@NamaTarget) */}
                                            <p className="text-xs text-slate-800 mt-0.5 leading-relaxed break-words">
                                              {reply.reply_to?.sender_name && (
                                                <span className="text-primary font-bold mr-1.5 inline-flex items-center">
                                                  @{reply.reply_to.sender_name}
                                                </span>
                                              )}
                                              {reply.message}
                                            </p>

                                            {/* Tombol aksi waktu & Balas */}
                                            <div className="flex items-center space-x-3 mt-1 text-[11px] text-slate-400">
                                              <span>{replyTime}</span>
                                              <button
                                                type="button"
                                                onClick={() => handleReplyTo(reply, root.id)}
                                                className="font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer"
                                              >
                                                Balas
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Tombol Like Balasan */}
                                        <button
                                          type="button"
                                          onClick={() => handleToggleLike(reply.id)}
                                          className="flex flex-col items-center p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer flex-shrink-0"
                                          title="Sukai balasan ini"
                                        >
                                          <Heart className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                                            isReplyLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-300 hover:text-rose-400'
                                          }`} />
                                          {isReplyLiked && <span className="text-[9px] font-bold text-rose-500 mt-0.5">1</span>}
                                        </button>
                                      </div>
                                    );
                                  })}

                                  {/* Tombol Sembunyikan Balasan ("Sembunyikan balasan ⌃") */}
                                  <button
                                    type="button"
                                    onClick={() => toggleThread(root.id)}
                                    className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer pt-2 group select-none"
                                  >
                                    <div className="w-6 h-[1.5px] bg-slate-300 group-hover:bg-primary transition-colors" />
                                    <span>Sembunyikan balasan</span>
                                    <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tombol Like Komentar Utama ala TikTok (Di Sebelah Kanan) */}
                      <button
                        type="button"
                        onClick={() => handleToggleLike(root.id)}
                        className="flex flex-col items-center p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer flex-shrink-0 ml-1"
                        title="Sukai komentar ini"
                      >
                        <Heart className={`w-4 h-4 transition-transform active:scale-125 ${
                          isRootLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-300 hover:text-rose-400'
                        }`} />
                        {isRootLiked && <span className="text-[10px] font-bold text-rose-500 mt-0.5">1</span>}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Komentar ala TikTok dengan Banner Balasan */}
          <div className="border-t border-slate-200 bg-white">
            {/* Banner Preview Membalas Komentar */}
            {replyingTo && (
              <div className="px-4 py-2 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between text-xs animate-fadeIn">
                <div className="flex items-center space-x-2 text-slate-600 truncate">
                  <CornerUpLeft className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-slate-500 text-xs">Membalas</span>
                  <strong className="text-primary font-bold">@{replyingTo.sender_name}</strong>
                  <span className="text-slate-400 text-[11px] truncate italic hidden sm:inline">
                    "{replyingTo.message.slice(0, 50)}..."
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCancelReply}
                  className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-200 rounded-md transition-colors cursor-pointer flex-shrink-0"
                  title="Batalkan Balasan"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form 
              onSubmit={handleSendCommunityMessage} 
              className="p-3 sm:p-4 flex items-center space-x-2"
            >
              <input
                ref={chatInputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  replyingTo 
                    ? `Balas @${replyingTo.sender_name} di topik ${selectedTopic.name}...` 
                    : `Tulis komentar di topik ${selectedTopic.name}...`
                }
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-primary rounded-full text-xs sm:text-sm focus:outline-none transition-all text-slate-800 shadow-inner"
              />
              <button
                type="submit"
                disabled={isSending || !inputText.trim()}
                className="flex items-center space-x-1.5 px-5 py-3 rounded-full bg-primary hover:bg-primary-700 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex-shrink-0 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Kirim</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: TANYA ASISTEN AI (PUSINGBOT SPESIALIS SKRIPSI FKT) */}
      {/* ========================================================= */}
      {activeSubTab === 'ai' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden flex flex-col h-[650px]">
          
          {/* Header Asisten AI */}
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-sky-50 via-white to-amber-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-accent text-white flex items-center justify-center font-bold shadow-md flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-900 font-philosopher text-base">
                    PusingBot (Asisten Cerdas Skripsi FKT UAA)
                  </h3>
                  <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" /> AI 24/7
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Konsultasi privat seputar syarat sempro, turnitin, format margin, dan jadwal yudisium.
                </p>
              </div>
            </div>

            <button
              onClick={() => setAiChatMessages([
                {
                  id: 'ai-welcome',
                  sender: 'bot',
                  text: 'Obrolan telah dibersihkan. Silakan tanyakan hal apa pun seputar tugas akhir dan skripsi FKT!',
                  time: 'Baru saja'
                }
              ])}
              className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer hidden sm:block"
            >
              Bersihkan Chat
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Pertanyaan Populer:
            </span>
            {[
              'Berapa batas maksimal cek Turnitin?',
              'Format margin & font naskah skripsi?',
              'Syarat pendaftaran ujian pendadaran?',
              'Kapan jadwal batas akhir Yudisium I s/d V?',
              'Berapa skor minimal tes AAEPT?'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendAiMessage(chip)}
                className="px-3 py-1 rounded-full bg-white hover:bg-sky-50 border border-slate-200 text-slate-700 hover:text-primary text-[11px] font-semibold whitespace-nowrap shadow-2xs transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Area Obrolan AI */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
            {aiChatMessages.map((msg) => {
              const isBot = msg.sender === 'bot';

              return (
                <div 
                  key={msg.id} 
                  className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0 ${
                    isBot ? 'bg-accent text-white' : 'bg-primary text-white'
                  }`}>
                    {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[85%] sm:max-w-[75%] space-y-1 ${isBot ? '' : 'text-right'}`}>
                    <div className="flex items-center space-x-2 px-1">
                      <span className="font-bold text-[11px] text-slate-700">
                        {isBot ? 'PusingBot FKT' : 'Kamu'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {msg.time}
                      </span>
                    </div>

                    <div className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      isBot
                        ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-xs text-left'
                        : 'bg-primary text-white rounded-tr-xs shadow-md'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {isAiTyping && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 flex items-center space-x-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                  <span className="pl-1 text-[11px]">PusingBot sedang menyusun jawaban...</span>
                </div>
              </div>
            )}

            <div ref={aiChatEndRef} />
          </div>

          {/* Form Input Chat AI */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendAiMessage(aiInputText);
            }} 
            className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center space-x-2"
          >
            <input
              type="text"
              value={aiInputText}
              onChange={(e) => setAiInputText(e.target.value)}
              placeholder="Tanyakan seputar skripsi FKT, kaji etik, atau jadwal yudisium..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-accent focus:bg-white transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!aiInputText.trim() || isAiTyping}
              className="flex items-center space-x-1.5 px-5 py-3 rounded-2xl bg-accent hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex-shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Tanya</span>
            </button>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL SET IDENTITAS TAMU (NAMA & GMAIL) */}
      {/* ========================================================= */}
      {isIdentityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border-2 border-primary/20 shadow-2xl p-6 sm:p-8 max-w-md w-full relative">
            <div className="flex items-center space-x-3 mb-2 text-primary">
              <div className="p-2.5 rounded-2xl bg-sky-50 text-primary border border-sky-200">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-philosopher">
                Identitas Pengirim Pesan
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Masukkan nama panggilan dan alamat Gmail Anda agar teman-teman mahasiswa atau dosen mengenali siapa yang mengirim pesan.
            </p>

            {/* Tombol Cepat Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 hover:border-primary/50 text-slate-700 font-bold text-xs shadow-xs transition-all mb-4 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Otomatis Ambil Akun Google / Gmail</span>
            </button>

            <div className="flex items-center my-3 text-slate-300">
              <hr className="flex-1 border-slate-200" />
              <span className="px-3 text-[10px] font-bold text-slate-400 uppercase">Atau Isi Manual</span>
              <hr className="flex-1 border-slate-200" />
            </div>

            <form onSubmit={handleSaveIdentity} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Nama Anda / Inisial
                </label>
                <input
                  type="text"
                  required
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Contoh: Pak Budi / Rahma / Alumni 22"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary transition-all font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Alamat Gmail / Email
                </label>
                <input
                  type="email"
                  required
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  placeholder="Contoh: namaanda@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsIdentityModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Simpan & Lanjutkan Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL BUAT TOPIK DISKUSI BARU */}
      {/* ========================================================= */}
      {isCreateTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border-2 border-primary/20 shadow-2xl p-6 sm:p-7 max-w-md w-full relative animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-philosopher">
                    Buat Topik Diskusi Baru
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Ruang ini akan terbuka untuk semua mahasiswa & pengunjung
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateTopicModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="space-y-4 text-xs">
              {/* Pilihan Ikon SVG Profesional */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Pilih Ikon Topik
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1.5 border border-slate-200/80 rounded-2xl bg-slate-50/70 no-scrollbar">
                  {AVAILABLE_TOPIC_ICONS.map((item) => {
                    const isSelected = newTopicIcon === item.key;
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setNewTopicIcon(item.key)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20 scale-[1.02]'
                            : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg mb-1 ${isSelected ? 'bg-white/20 text-white' : item.color}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold leading-tight line-clamp-1">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nama Topik */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Nama Topik <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="Contoh: Info Lowongan Magang MSIB"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary focus:bg-white transition-all text-slate-900"
                />
              </div>

              {/* Deskripsi Topik */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Deskripsi Singkat (Opsional)
                </label>
                <textarea
                  rows="2"
                  value={newTopicDesc}
                  onChange={(e) => setNewTopicDesc(e.target.value)}
                  placeholder="Contoh: Wadah diskusi lowongan, sharing CV, dan tips lolos interview"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary focus:bg-white transition-all text-slate-900"
                />
              </div>

              {/* Tombol Aksi */}
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateTopicModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-600 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTopic || !newTopicName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isSubmittingTopic ? 'Membuat...' : 'Buat Topik Sekarang'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
