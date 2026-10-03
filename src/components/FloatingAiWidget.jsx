import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Maximize2, Trash2, ArrowRight } from 'lucide-react';
import { getAiAnswer } from '../data/aiKnowledgeBase';

export default function FloatingAiWidget({ currentUser, onOpenFullAi }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Halo! Saya **PusingBot**, Asisten AI resmi Mahasiswa Informatika 23 Universitas Alma Ata. Ada yang bisa saya bantu seputar aturan skripsi FKT, format margin naskah, cek Turnitin, atau jadwal yudisium?',
      time: 'Online'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll ke bawah saat pesan baru muncul
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input otomatis saat widget dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleSendMessage = (customText) => {
    const query = (typeof customText === 'string' ? customText : inputText).trim();
    if (!query) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Dapatkan respons cerdas dari knowledge base lokal
    setTimeout(() => {
      const answer = getAiAnswer(query);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: answer,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 650);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'reset',
        sender: 'bot',
        text: 'Obrolan telah dibersihkan. Silakan tanyakan hal apa pun seputar tugas akhir atau perkuliahan Informatika 23!',
        time: 'Baru saja'
      }
    ]);
  };

  const quickPrompts = [
    'Turnitin maksimal berapa?',
    'Format margin & font skripsi?',
    'Syarat seminar proposal?',
    'Syarat ujian pendadaran?',
    'Jadwal batas yudisium?',
    'Berapa skor tes AAEPT?'
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* POPUP CHATBOX KETIKA TERBUKA */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[540px] max-h-[84vh] bg-white rounded-3xl shadow-2xl border-2 border-primary/25 flex flex-col overflow-hidden mb-3 animate-scaleUp font-instrument text-slate-800 transition-all">
          
          {/* Header Popup Chat */}
          <div className="bg-gradient-to-r from-primary via-primary-800 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-primary-700/60 shadow-sm flex-shrink-0">
            <div className="flex items-center space-x-3 min-w-0">
              {/* Avatar Bot 3D */}
              <div className="relative w-10 h-10 rounded-2xl bg-white/15 p-1 border border-white/20 flex items-center justify-center shadow-md flex-shrink-0">
                <img
                  src="/bot-ai-avatar.png"
                  alt="PusingBot AI"
                  className="w-full h-full object-contain drop-shadow-xs"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-primary absolute -top-0.5 -right-0.5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white font-philosopher text-sm sm:text-base leading-tight truncate">
                    PusingBot AI
                  </h3>
                  <span className="text-[9px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30 flex items-center">
                    <Sparkles className="w-2.5 h-2.5 mr-1" /> 24/7
                  </span>
                </div>
                <p className="text-[11px] text-white/75 truncate">
                  Asisten Skripsi & Akademik IF23
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 flex-shrink-0">
              {onOpenFullAi && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFullAi();
                  }}
                  className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Buka Ruang Diskusi Penuh"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Bersihkan Percakapan"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Tutup Widget AI"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
              Topik:
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-sky-50 border border-slate-200 text-slate-700 hover:text-primary text-[10px] sm:text-[11px] font-medium whitespace-nowrap shadow-2xs transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-[#fcfbfa]/80">
            {/* Banner Karakter Bot Sambutan */}
            {messages.length === 1 && (
              <div className="p-3 bg-gradient-to-r from-sky-50 via-blue-50/50 to-indigo-50/40 border border-sky-200/80 rounded-2xl flex items-center space-x-3 mb-2 animate-fadeIn shadow-2xs">
                <img
                  src="/bot-ai.png"
                  alt="PusingBot Robot Mascot"
                  className="w-14 h-20 object-contain flex-shrink-0 drop-shadow-md animate-bounce [animation-duration:3s]"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-800 font-philosopher text-sm">
                    Halo! Ada yang bisa saya bantu?
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Tanyakan apa saja seputar panduan skripsi FKT, cek Turnitin, bimbingan dosen, atau syarat yudisium.
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
                >
                  {/* Avatar Pesan */}
                  <div
                    className={`relative w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0 overflow-hidden ${
                      isBot ? 'bg-sky-50 border border-sky-200 p-0.5' : 'bg-primary text-white'
                    }`}
                  >
                    {isBot ? (
                      <img
                        src="/bot-ai-avatar.png"
                        alt="PusingBot"
                        className="w-full h-full object-contain"
                      />
                    ) : currentUser?.avatar_url || currentUser?.foto ? (
                      <img
                        src={currentUser.avatar_url || currentUser.foto}
                        alt="User"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span>{currentUser?.nama_lengkap ? currentUser.nama_lengkap.charAt(0).toUpperCase() : 'M'}</span>
                    )}
                  </div>

                  {/* Isi Balon Pesan */}
                  <div className={`max-w-[85%] space-y-1 ${isBot ? '' : 'text-right'}`}>
                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs text-left ${
                        isBot
                          ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs whitespace-pre-line'
                          : 'bg-primary text-white rounded-tr-xs font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 px-1 font-mono">
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Indikator Mengetik */}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 p-0.5 flex items-center justify-center text-xs shadow-xs flex-shrink-0">
                  <img
                    src="/bot-ai-avatar.png"
                    alt="PusingBot"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-2xl rounded-tl-xs shadow-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-400 font-medium ml-1">PusingBot sedang mengetik...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Area */}
          <div className="p-3 bg-white border-t border-slate-200 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya seputar skripsi FKT, syarat, Turnitin..."
                className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 rounded-2xl bg-accent hover:bg-amber-600 disabled:opacity-50 text-white shadow-md hover:shadow-lg transition-all cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
                title="Kirim Pertanyaan"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Sesuai Buku Panduan Skripsi FKT UAA</span>
              {onOpenFullAi && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFullAi();
                  }}
                  className="text-primary hover:text-accent font-semibold flex items-center transition-colors cursor-pointer"
                >
                  Forum Lengkap <ArrowRight className="w-2.5 h-2.5 ml-0.5" />
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* FLOATING TRIGGER: KARTU PERSEGI PANJANG ELEGAN DENGAN ROBOT 3D */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="group relative cursor-pointer animate-fadeIn transition-all duration-300 transform hover:-translate-y-1 select-none"
          title="Klik untuk membuka obrolan dengan PusingBot AI"
        >
          {/* Efek Ambient Glow Halus */}
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/25 via-primary/35 to-amber-400/25 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />

          {/* Kartu Persegi Panjang */}
          <div className="relative flex items-center gap-3 sm:gap-3.5 pl-2 pr-4 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-br from-[#0c4a6e]/95 via-[#0b5e91]/95 to-[#073656]/95 backdrop-blur-xl border-2 border-white/30 hover:border-amber-400/60 shadow-[0_12px_36px_-8px_rgba(11,94,145,0.45)] group-hover:shadow-[0_18px_45px_-6px_rgba(11,94,145,0.6)] transition-all max-w-[330px] sm:max-w-[360px]">
            
            {/* Karakter Robot 3D Full-Body */}
            <div className="relative flex-shrink-0 -my-2">
              <img
                src="/bot-ai.png"
                alt="PusingBot Mascot"
                className="w-16 h-20 sm:w-18 sm:h-22 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] group-hover:scale-108 transition-transform duration-300"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white absolute bottom-1 right-1 shadow-xs animate-pulse" />
            </div>

            {/* Konten Teks Kartu */}
            <div className="flex-1 min-w-0 text-left">
              {/* Badges Bar */}
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-ping" />
                  Online
                </span>
              </div>

              {/* Judul Kartu */}
              <h4 className="text-white font-philosopher font-bold text-xs sm:text-sm leading-tight group-hover:text-amber-200 transition-colors truncate">
                Halo! Butuh bantuan?
              </h4>
              <p className="text-[10px] sm:text-[11px] text-sky-100/90 leading-snug mt-0.5">
                Tanya yg berkaitan dg kelulusan kita
              </p>

              {/* Tombol Aksi Kecil */}
              <div className="mt-1.5 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-300 group-hover:text-amber-100 transition-colors">
                <span>Tanya AI Sekarang</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
