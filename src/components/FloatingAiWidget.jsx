import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, X, Maximize2, Trash2, ArrowRight, User } from 'lucide-react';
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
        <div className="w-[92vw] sm:w-[400px] h-[520px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border-2 border-primary/25 flex flex-col overflow-hidden mb-3 animate-scaleUp font-instrument text-slate-800 transition-all">
          
          {/* Header Popup Chat */}
          <div className="bg-gradient-to-r from-primary via-primary-800 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-primary-700/60 shadow-sm flex-shrink-0">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative w-9 h-9 rounded-2xl bg-accent text-white flex items-center justify-center font-bold shadow-md flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
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
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
                >
                  {/* Avatar Pesan */}
                  <div
                    className={`relative w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0 overflow-hidden ${
                      isBot ? 'bg-accent text-white' : 'bg-primary text-white'
                    }`}
                  >
                    {isBot ? (
                      <Bot className="w-4 h-4" />
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
                <div className="w-7 h-7 rounded-xl bg-accent text-white flex items-center justify-center text-xs shadow-xs">
                  <Bot className="w-4 h-4" />
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

      {/* FLOATING TRIGGER BUTTON DI POJOK BAWAH */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center space-x-2.5 pl-3.5 pr-4 py-2.5 rounded-full bg-gradient-to-r from-primary via-primary-800 to-slate-900 border-2 border-white/25 shadow-2xl hover:shadow-primary/40 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fadeIn"
          title="Butuh bantuan? Tanya Asisten AI PusingBot"
        >
          {/* Logo AI Bulat dengan Efek Berkedip & Pulse */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-amber-500 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
            <Bot className="w-4 h-4 text-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-primary absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>

          {/* Teks Label Tombol */}
          <div className="text-left flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300 flex items-center leading-none">
              <Sparkles className="w-3 h-3 mr-1 text-amber-300 animate-spin [animation-duration:4s]" />
              Butuh Bantuan?
            </span>
            <span className="text-xs sm:text-sm font-bold font-philosopher text-white group-hover:text-amber-200 transition-colors leading-tight">
              Tanya AI
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
