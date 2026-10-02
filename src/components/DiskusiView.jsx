import React, { useState, useEffect, useRef } from 'react';
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
  CornerUpLeft,
  X
} from 'lucide-react';
import { StorageService, isSupabaseConfigured } from '../lib/supabase';
import { JADWAL_YUDISIUM_WISUDA } from '../data/kalenderAkademik';
import { detectUserRole } from '../data/mahasiswaIf23';

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

  // --- STATE FORUM KOMUNITAS ---
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // { id, sender_name, message }
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

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

  // 1. Muat pesan forum komunitas
  useEffect(() => {
    let unsubscribe = () => {};

    async function loadMessages() {
      setIsLoadingMessages(true);
      try {
        const msgs = await StorageService.getCommunityMessages();
        setMessages(msgs || []);
      } catch (err) {
        console.error('Error load community messages:', err);
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

    loadMessages();

    return () => {
      unsubscribe();
    };
  }, []);

  // Auto scroll forum pesan
  useEffect(() => {
    if (activeSubTab === 'komunitas') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeSubTab]);

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

    setIsSending(true);
    try {
      const sentMsg = await StorageService.sendCommunityMessage({
        sender_name: senderName,
        sender_email: senderEmail,
        sender_avatar: null,
        sender_role: senderRole,
        message: inputText.trim(),
        reply_to: replyingTo ? {
          id: replyingTo.id,
          sender_name: replyingTo.sender_name,
          message: replyingTo.message.slice(0, 120)
        } : null
      });

      setMessages(prev => {
        if (prev.some(m => m.id === sentMsg.id)) return prev;
        return [...prev, sentMsg];
      });
      setInputText('');
      setReplyingTo(null);
    } catch (err) {
      console.error('Send message error:', err);
    } finally {
      setIsSending(false);
    }
  };

  // Balas pesan tertentu
  const handleReplyTo = (msg) => {
    setReplyingTo({
      id: msg.id,
      sender_name: msg.sender_name,
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
          
          {/* Header Bar Ruang Obrolan */}
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-900 font-philosopher text-base">
                    Room Diskusi Umum Informatika 2023
                  </h3>
                  <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse mr-1" />
                    Live
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Terbuka untuk mahasiswa, dosen, maupun umum yang membuka web ini.
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

          {/* Area Obrolan Pesan (Thread) */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {isLoadingMessages ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                <span>Memuat riwayat obrolan...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <MessageSquare className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-sm font-semibold">Belum ada obrolan.</p>
                <p className="text-xs">Jadilah yang pertama mengirim pesan atau menyapa teman-teman!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = (currentUser && msg.sender_email?.includes(currentUser.nim)) || 
                             (!currentUser && guestIdentity.email && msg.sender_email === guestIdentity.email);

                const timeStr = msg.created_at 
                  ? new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                  : '';

                return (
                  <div 
                    key={msg.id} 
                    id={`community-msg-${msg.id}`}
                    className={`flex items-start space-x-3 transition-all duration-300 rounded-2xl p-1 ${isMe ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    {/* Avatar Pengirim */}
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold text-white shadow-xs flex-shrink-0 font-philosopher ${
                      isMe 
                        ? 'bg-accent' 
                        : msg.sender_role?.includes('Dosen')
                        ? 'bg-indigo-600'
                        : 'bg-primary'
                    }`}>
                      {msg.sender_name ? msg.sender_name.charAt(0).toUpperCase() : 'U'}
                    </div>

                    {/* Bubble Pesan */}
                    <div className={`max-w-[85%] sm:max-w-[70%] space-y-1 ${isMe ? 'items-end text-right' : ''}`}>
                      <div className={`flex flex-wrap items-center gap-1.5 sm:gap-2 ${isMe ? 'justify-end' : ''}`}>
                        <span className="font-bold text-xs text-slate-800">
                          {msg.sender_name}
                        </span>
                        {msg.sender_role && (
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${
                            msg.sender_role.includes('Informatika 23') || msg.sender_role.includes('IF23')
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : msg.sender_role.includes('Alma Ata')
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : msg.sender_role.includes('Dosen')
                              ? 'bg-purple-50 text-purple-800 border-purple-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {msg.sender_role}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">
                          {timeStr}
                        </span>

                        {/* Tombol Balas / Tanggapi */}
                        <button
                          type="button"
                          onClick={() => handleReplyTo(msg)}
                          className="inline-flex items-center space-x-1 text-[10px] font-semibold text-slate-400 hover:text-primary hover:bg-slate-200/60 px-1.5 py-0.5 rounded-md transition-colors cursor-pointer"
                          title={`Balas pesan dari ${msg.sender_name}`}
                        >
                          <CornerUpLeft className="w-3 h-3" />
                          <span>Balas</span>
                        </button>
                      </div>

                      {/* Kutipan Pesan yang Dibalas (Jika Ada) */}
                      {msg.reply_to && (
                        <div 
                          onClick={() => scrollToMessage(msg.reply_to.id)}
                          className={`mb-1.5 p-2 rounded-xl border-l-4 cursor-pointer text-left text-xs transition-opacity hover:opacity-90 shadow-2xs ${
                            isMe
                              ? 'bg-sky-950/20 border-amber-300 text-sky-100'
                              : 'bg-slate-100/90 border-primary text-slate-700'
                          }`}
                          title="Klik untuk melihat pesan yang dibalas"
                        >
                          <div className="flex items-center space-x-1 text-[10px] font-bold opacity-80 mb-0.5">
                            <CornerUpLeft className="w-3 h-3" />
                            <span>Membalas {msg.reply_to.sender_name}</span>
                          </div>
                          <p className="text-[11px] truncate italic opacity-95">
                            "{msg.reply_to.message}"
                          </p>
                        </div>
                      )}

                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap text-left ${
                        isMe
                          ? 'bg-primary text-white rounded-tr-xs shadow-md'
                          : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-xs'
                      }`}>
                        {msg.message}
                      </div>

                      {/* Info Email Pengirim */}
                      <span className="text-[9px] text-slate-400 block px-1">
                        {msg.sender_email}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Kirim Pesan dengan Banner Balasan */}
          <div className="border-t border-slate-200 bg-white">
            {/* Banner Preview Membalas Pesan */}
            {replyingTo && (
              <div className="px-4 py-2 bg-sky-50/90 border-b border-sky-100 flex items-center justify-between text-xs animate-fadeIn">
                <div className="flex items-center space-x-2 truncate">
                  <div className="p-1 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <CornerUpLeft className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-slate-500">Membalas </span>
                    <strong className="text-primary">{replyingTo.sender_name}</strong>:
                    <span className="text-slate-500 text-[11px] ml-1.5 italic truncate">
                      "{replyingTo.message.slice(0, 60)}{replyingTo.message.length > 60 ? '...' : ''}"
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCancelReply}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer flex-shrink-0"
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
                    ? `Ketik balasan untuk ${replyingTo.sender_name}...` 
                    : "Tulis pesan atau masukan untuk angkatan 23..."
                }
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner text-slate-900"
              />
              <button
                type="submit"
                disabled={isSending || !inputText.trim()}
                className="flex items-center space-x-1.5 px-5 py-3 rounded-2xl bg-primary hover:bg-primary-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex-shrink-0 active:scale-95"
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

    </div>
  );
}
