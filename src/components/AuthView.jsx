import React, { useState } from 'react';
import { 
  LogIn, 
  UserPlus, 
  Lock, 
  User, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { StorageService } from '../lib/supabase';

export default function AuthView({ onLoginSuccess, onContinueAsGuest }) {
  const [activeMode, setActiveMode] = useState('login'); // 'login' | 'register'
  
  // Login State
  const [loginNim, setLoginNim] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [showLoginPin, setShowLoginPin] = useState(false);
  
  // Register State
  const [regNim, setRegNim] = useState('');
  const [regNama, setRegNama] = useState('');
  const [regPeminatan, setRegPeminatan] = useState('Software Engineering');
  const [regPin, setRegPin] = useState('');
  const [showRegPin, setShowRegPin] = useState(false);
  
  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginNim.trim()) {
      setErrorMessage('Silakan masukkan NIM kamu!');
      return;
    }

    setIsLoading(true);
    try {
      const res = await StorageService.login(loginNim, loginPin);
      if (res.success) {
        setSuccessMessage(`Selamat datang kembali, ${res.profile.nama_lengkap}!`);
        setTimeout(() => {
          onLoginSuccess(res.profile);
        }, 600);
      } else {
        setErrorMessage(res.message || 'Login gagal. Periksa kembali NIM dan PIN kamu.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regNim.trim() || !regNama.trim()) {
      setErrorMessage('NIM dan Nama Lengkap wajib diisi!');
      return;
    }

    setIsLoading(true);
    try {
      const res = await StorageService.register({
        nim: regNim,
        nama_lengkap: regNama,
        peminatan: regPeminatan,
        pin: regPin || '123456'
      });

      if (res.success) {
        setSuccessMessage(`Pendaftaran berhasil! Selamat datang, ${res.profile.nama_lengkap}.`);
        setTimeout(() => {
          onLoginSuccess(res.profile);
        }, 700);
      } else {
        setErrorMessage(res.message || 'Pendaftaran gagal. Silakan coba lagi.');
      }
    } catch (err) {
      setErrorMessage('Terjadi gangguan jaringan saat mendaftar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-10 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-primary text-white p-6 sm:p-8 rounded-3xl border-2 border-primary-700 shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-2 text-accent mb-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-xs font-bold uppercase tracking-wider font-instrument text-accent">
            Akses Dashboard Mahasiswa
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold font-philosopher text-white">
          Ruang Kendali Pribadi Mahasiswa
        </h1>
        <p className="text-xs sm:text-sm font-instrument text-white/90 mt-2 leading-relaxed">
          Silakan masuk atau daftarkan akunmu agar progres checklist kelulusan, judul skripsi, IPK, dan data bimbingan tersimpan aman di database cloud Supabase.
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 shadow-lg overflow-hidden">
        {/* Tab Buttons */}
        <div className="grid grid-cols-2 p-2 bg-sky-50/70 border-b border-sky-100 gap-2 font-instrument">
          <button
            type="button"
            onClick={() => { setActiveMode('login'); setErrorMessage(''); }}
            className={`flex items-center justify-center space-x-2 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'login'
                ? 'bg-primary text-white shadow-md'
                : 'text-slate-600 hover:text-primary hover:bg-white/80'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Akun</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveMode('register'); setErrorMessage(''); }}
            className={`flex items-center justify-center space-x-2 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'register'
                ? 'bg-primary text-white shadow-md'
                : 'text-slate-600 hover:text-primary hover:bg-white/80'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Akun Baru</span>
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Error / Success Feedback Alerts */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start space-x-3 animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
              <div>
                <p className="font-bold">Gagal!</p>
                <p className="text-xs mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-bold">Sukses!</p>
                <p className="text-xs mt-0.5">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Form: LOGIN */}
          {activeMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-instrument">
                  Nomor Induk Mahasiswa (NIM)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 230101001"
                    value={loginNim}
                    onChange={(e) => setLoginNim(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-instrument">
                  PIN / Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPin ? 'text' : 'password'}
                    placeholder="Masukkan PIN / kata sandi"
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPin(!showLoginPin)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showLoginPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-instrument">
                  *Default PIN akun baru jika belum diubah adalah <strong>123456</strong>.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-700 text-white font-bold font-philosopher text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-70"
              >
                <span>{isLoading ? 'Memeriksa Data...' : 'Masuk ke Dashboard'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* Form: REGISTER */}
          {activeMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-instrument">
                  NIM Mahasiswa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 230101001"
                    value={regNim}
                    onChange={(e) => setRegNim(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-instrument">
                  Nama Lengkap Mahasiswa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama sesuai SIAKAD / KTP"
                  value={regNama}
                  onChange={(e) => setRegNama(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-instrument"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-instrument">
                  Peminatan / Bidang Studi
                </label>
                <select
                  value={regPeminatan}
                  onChange={(e) => setRegPeminatan(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-instrument"
                >
                  <option value="Software Engineering">Software Engineering (Web / Mobile)</option>
                  <option value="Artificial Intelligence">Artificial Intelligence & Data Science</option>
                  <option value="Network & Cyber Security">Network & Cyber Security</option>
                  <option value="Internet of Things">Internet of Things (IoT)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-instrument">
                  Buat PIN / Kata Sandi Keamanan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showRegPin ? 'text' : 'password'}
                    placeholder="Contoh: 6 digit angka/huruf rahasia"
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPin(!showRegPin)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showRegPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-instrument">
                  PIN ini akan digunakan setiap kali kamu masuk untuk melindungi centang progres skripsimu.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-accent hover:bg-amber-600 text-white font-bold font-philosopher text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-70"
              >
                <span>{isLoading ? 'Mendaftarkan Akun...' : 'Buat Akun & Masuk Sekarang'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* Guest Mode Back Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-instrument">
            <span>Bukan mahasiswa Informatika 23?</span>
            <button
              type="button"
              onClick={onContinueAsGuest}
              className="text-primary hover:text-accent font-bold underline transition-colors cursor-pointer"
            >
              Lanjutkan Melihat Info Sebagai Tamu →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
