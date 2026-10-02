import React, { useState } from 'react';
import { 
  LogIn, 
  UserPlus, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  GraduationCap,
  Globe,
  Building2,
  CheckCircle2,
  HelpCircle,
  KeyRound
} from 'lucide-react';
import { StorageService } from '../lib/supabase';
import { findMahasiswaIf23 } from '../data/mahasiswaIf23';

export default function AuthView({ onLoginSuccess, onContinueAsGuest, noticeMessage }) {
  const [activeMode, setActiveMode] = useState('login'); // 'login' | 'register'
  
  // Login State
  const [loginNim, setLoginNim] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [showLoginPin, setShowLoginPin] = useState(false);
  
  // Register State
  const [regNim, setRegNim] = useState('');
  const [regNama, setRegNama] = useState('');
  const [regPeran, setRegPeran] = useState('Mahasiswa Informatika 23');
  const [regPin, setRegPin] = useState('');
  const [showRegPin, setShowRegPin] = useState(false);
  const [detectedIf23, setDetectedIf23] = useState(null);
  
  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Penanganan ketik NIM pada form register
  const handleRegNimChange = (val) => {
    setRegNim(val);
    if (regPeran === 'Mahasiswa Informatika 23') {
      const match = findMahasiswaIf23(val);
      if (match) {
        setDetectedIf23(match);
        setRegNama(match.nama); // Otomatis isi nama resmi dari dokumen PDF
      } else {
        setDetectedIf23(null);
      }
    }
  };

  // Penanganan perubahan kategori peran
  const handleRegPeranChange = (val) => {
    setRegPeran(val);
    if (val === 'Mahasiswa Informatika 23' && regNim) {
      const match = findMahasiswaIf23(regNim);
      if (match) {
        setDetectedIf23(match);
        setRegNama(match.nama);
      }
    } else {
      setDetectedIf23(null);
    }
  };

  // Submit Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginNim.trim()) {
      setErrorMessage('Silakan masukkan NIM atau ID kamu!');
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
        setErrorMessage(res.message || 'Login gagal. Periksa kembali NIM/ID dan PIN kamu.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Register
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (regPeran === 'Mahasiswa Informatika 23' && !regNim.trim()) {
      setErrorMessage('NIM wajib diisi untuk Mahasiswa Informatika 23!');
      return;
    }

    if (!regNama.trim()) {
      setErrorMessage('Nama Lengkap wajib diisi!');
      return;
    }

    setIsLoading(true);
    try {
      const res = await StorageService.register({
        nim: regNim.trim() || `U-${Date.now().toString().slice(-6)}`,
        nama_lengkap: regNama.trim(),
        peran: regPeran,
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

  // Login Satu-Klik dengan Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { error } = await StorageService.signInWithGoogle();
      if (error) {
        setErrorMessage(
          'Login Google: ' + (error.message || 'Harap pastikan Google Provider aktif di Supabase') + 
          '. Kamu juga bisa langsung masuk dengan NIM & PIN di bawah!'
        );
      }
    } catch (err) {
      setErrorMessage('Terjadi kendala saat menghubungkan ke akun Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 font-instrument animate-fadeIn">
      
      {/* Alert Pengalihan (Bila diarahkan dari Ruang Diskusi atau Dashboard) */}
      {noticeMessage && (
        <div className="mb-5 p-4 rounded-3xl bg-amber-50/90 border-2 border-amber-300 text-amber-900 flex items-start space-x-3 text-xs sm:text-sm shadow-md animate-fadeIn backdrop-blur-xs">
          <div className="p-2 rounded-2xl bg-amber-200/70 text-amber-800 flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-amber-950 font-philosopher text-sm sm:text-base">Akses Memerlukan Akun</p>
            <p className="text-xs text-amber-900/90 mt-0.5 leading-relaxed">{noticeMessage}</p>
          </div>
        </div>
      )}

      {/* Guest Mode Notice Bar */}
      <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-sky-50/80 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700 shadow-2xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-xs font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs sm:text-sm">Kamu Membuka Web dalam Mode Tamu (Publik)</p>
            <p className="text-[11px] text-slate-500">Timeline kelulusan, panduan PDF, dan kalender akademik bebas diakses tanpa login.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onContinueAsGuest}
          className="text-primary hover:text-accent font-bold text-xs underline flex-shrink-0 self-start sm:self-auto cursor-pointer transition-colors"
        >
          Lihat Info Saja →
        </button>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-br from-[#0b5e91] via-[#084d77] to-[#06334f] text-white p-6 sm:p-8 rounded-3xl border-2 border-primary-700 shadow-2xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-amber-300 mb-3 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="uppercase tracking-wider">Akses Terpadu Informatika 23</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold font-philosopher tracking-wide text-white">
            Ruang Kendali & Partisipasi Pengguna
          </h1>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15 backdrop-blur-xs">
              <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Mahasiswa Informatika 2023</span>
              </div>
              <p className="text-[11px] text-sky-100/90 leading-relaxed">
                Disarankan masuk pakai <strong>email kampus</strong> atau NIM resmi agar nama & progres skripsimu tervalidasi otomatis.
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl border border-white/15 backdrop-blur-xs">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold text-xs mb-1">
                <Globe className="w-4 h-4" />
                <span>Umum & Mahasiswa Lain</span>
              </div>
              <p className="text-[11px] text-sky-100/90 leading-relaxed">
                Dipersilakan mendaftar atau login cepat via Google untuk bergabung di forum diskusi & konsultasi asisten AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl overflow-hidden transition-all">
        
        {/* Modern Segmented Tab Buttons */}
        <div className="p-2 sm:p-2.5 bg-slate-100/80 border-b border-slate-200">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/60 rounded-2xl">
            <button
              type="button"
              onClick={() => { setActiveMode('login'); setErrorMessage(''); }}
              className={`flex items-center justify-center space-x-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeMode === 'login'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Akun</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveMode('register'); setErrorMessage(''); }}
              className={`flex items-center justify-center space-x-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeMode === 'register'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar Akun Baru</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          
          {/* Tombol Login Google Satu-Klik */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base flex items-center justify-center space-x-3 shadow-xs hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]"
            >
              <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Lanjut dengan Google / Gmail</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                1-Klik
              </span>
            </button>

            {/* Separator */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-400 font-medium">
                  atau {activeMode === 'login' ? 'masuk' : 'daftar'} manual dengan NIM & PIN
                </span>
              </div>
            </div>
          </div>

          {/* Feedback Alert: Error */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start space-x-3 animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
              <div>
                <p className="font-bold">Informasi Akun</p>
                <p className="text-xs mt-0.5 leading-relaxed text-rose-700">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Feedback Alert: Success */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-bold">Berhasil!</p>
                <p className="text-xs mt-0.5 text-emerald-800">{successMessage}</p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: FORM LOGIN */}
          {/* ========================================================= */}
          {activeMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  NIM atau ID Pengenal
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 233200299 atau ID Tamu"
                    value={loginNim}
                    onChange={(e) => setLoginNim(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  PIN / Kata Sandi Keamanan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPin ? 'text' : 'password'}
                    placeholder="Masukkan 6 digit PIN akunmu"
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPin(!showLoginPin)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showLoginPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-accent" />
                  <span>PIN default akun baru jika belum diubah adalah: <strong>123456</strong></span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-700 text-white font-bold font-philosopher text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-70 transform active:scale-[0.99]"
              >
                <span>{isLoading ? 'Memeriksa Data...' : 'Masuk ke Dashboard'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* ========================================================= */}
          {/* TAB 2: FORM REGISTER */}
          {/* ========================================================= */}
          {activeMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              
              {/* Pilihan Visual Kategori Pengguna (Interactive Cards) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Status / Kategori Kamu
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  
                  {/* Opsi 1: Mahasiswa IF23 */}
                  <div
                    onClick={() => handleRegPeranChange('Mahasiswa Informatika 23')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      regPeran === 'Mahasiswa Informatika 23'
                        ? 'border-primary bg-sky-50/80 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <GraduationCap className={`w-5 h-5 ${regPeran === 'Mahasiswa Informatika 23' ? 'text-primary' : 'text-slate-400'}`} />
                      {regPeran === 'Mahasiswa Informatika 23' && (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-tight">Mahasiswa IF 2023</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Validasi resmi data PDF</p>
                    </div>
                  </div>

                  {/* Opsi 2: Mahasiswa Alma Ata */}
                  <div
                    onClick={() => handleRegPeranChange('Mahasiswa Alma Ata')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      regPeran === 'Mahasiswa Alma Ata'
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <Building2 className={`w-5 h-5 ${regPeran === 'Mahasiswa Alma Ata' ? 'text-emerald-700' : 'text-slate-400'}`} />
                      {regPeran === 'Mahasiswa Alma Ata' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-tight">Mahasiswa Alma Ata</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Fakultas / Prodi Lain</p>
                    </div>
                  </div>

                  {/* Opsi 3: Umum / Pengunjung */}
                  <div
                    onClick={() => handleRegPeranChange('Umum / Pengunjung')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      regPeran === 'Umum / Pengunjung'
                        ? 'border-amber-600 bg-amber-50/80 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <Globe className={`w-5 h-5 ${regPeran === 'Umum / Pengunjung' ? 'text-amber-700' : 'text-slate-400'}`} />
                      {regPeran === 'Umum / Pengunjung' && (
                        <CheckCircle2 className="w-4 h-4 text-amber-700" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-tight">Umum / Tamu</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Dosen / Publik Umum</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Input NIM / ID */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {regPeran === 'Mahasiswa Informatika 23' 
                      ? 'NIM Mahasiswa IF23' 
                      : regPeran === 'Mahasiswa Alma Ata' 
                      ? 'NIM Mahasiswa Alma Ata' 
                      : 'Nomor Identitas (Opsional)'}
                  </label>
                  {regPeran === 'Mahasiswa Informatika 23' && (
                    <span className="text-[10px] text-primary font-semibold">233200262 - 233200301</span>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required={regPeran !== 'Umum / Pengunjung'}
                    placeholder={
                      regPeran === 'Mahasiswa Informatika 23'
                        ? 'Ketik NIM kamu (contoh: 233200299)'
                        : regPeran === 'Mahasiswa Alma Ata'
                        ? 'Contoh: 230101001'
                        : 'Boleh dikosongkan (otomatis diisi ID Tamu)'
                    }
                    value={regNim}
                    onChange={(e) => handleRegNimChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-slate-900"
                  />
                </div>

                {/* Badge Verifikasi Mahasiswa IF23 Resmi dari Dokumen PDF */}
                {detectedIf23 && (
                  <div className="mt-2.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center space-x-2.5 shadow-xs animate-fadeIn">
                    <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 font-bold font-philosopher">
                      {detectedIf23.nama.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <span className="font-bold block text-emerald-950">{detectedIf23.nama}</span>
                      <span className="text-[10px] text-emerald-700">✓ Terverifikasi Resmi di Dokumen Angkatan IF 2023</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Kamu"
                  value={regNama}
                  onChange={(e) => setRegNama(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium text-slate-900"
                />
              </div>

              {/* Input Buat PIN */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Buat PIN Keamanan Akun
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
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPin(!showRegPin)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showRegPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  PIN ini akan kamu gunakan untuk melindungi progres checklist kelulusanmu.
                </p>
              </div>

              {/* Tombol Buat Akun */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-accent hover:bg-amber-600 text-white font-bold font-philosopher text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-70 transform active:scale-[0.99]"
              >
                <span>{isLoading ? 'Mendaftarkan Akun...' : 'Daftarkan Akun & Mulai Sekarang'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* Guest Mode Back Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
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
