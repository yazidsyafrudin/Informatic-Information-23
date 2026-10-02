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

  const handleRegNimChange = (val) => {
    setRegNim(val);
    if (regPeran === 'Mahasiswa Informatika 23') {
      const match = findMahasiswaIf23(val);
      if (match) {
        setDetectedIf23(match);
        setRegNama(match.nama); // Otomatis isi nama dari dokumen PDF
      } else {
        setDetectedIf23(null);
      }
    }
  };

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

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { error } = await StorageService.signInWithGoogle();
      if (error) {
        setErrorMessage(
          'Login Google via Supabase: ' + (error.message || 'Harap pastikan Google Provider telah diaktifkan di dashboard Supabase') + 
          '. Kamu juga bisa langsung masuk/daftar dengan NIM di bawah!'
        );
      }
    } catch (err) {
      setErrorMessage('Terjadi kendala saat menghubungkan ke akun Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-10 animate-fadeIn">
      {/* Notice Message if directed from Ruang Diskusi or Tracker */}
      {noticeMessage && (
        <div className="mb-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 flex items-start space-x-3 text-xs sm:text-sm font-instrument shadow-md animate-fadeIn">
          <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Akses Memerlukan Akun</p>
            <p className="text-xs text-amber-800 mt-0.5">{noticeMessage}</p>
          </div>
        </div>
      )}

      {/* Guest Mode Friendly Notice */}
      <div className="mb-4 p-4 rounded-2xl bg-sky-50 border border-sky-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-instrument text-slate-700 shadow-2xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs sm:text-sm">Kamu Membuka Web dalam Mode Tamu (Publik)</p>
            <p className="text-[11px] text-slate-500">Semua info timeline, panduan FKT, roadmap 6 fase, dan kalender akademik bebas diakses.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onContinueAsGuest}
          className="text-primary hover:text-accent font-bold text-xs underline flex-shrink-0 self-start sm:self-auto cursor-pointer"
        >
          Kembali Lihat Info Saja →
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-primary text-white p-6 sm:p-8 rounded-3xl border-2 border-primary-700 shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-2 text-accent mb-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-xs font-bold uppercase tracking-wider font-instrument text-accent">
            Akses Masuk & Pendaftaran Akun
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold font-philosopher text-white">
          Ruang Kendali & Partisipasi Pengguna
        </h1>
        
        <div className="mt-3 space-y-2 text-xs sm:text-sm font-instrument text-white/90 leading-relaxed">
          <p>
            🎓 <strong>Khusus Mahasiswa Informatika 2023</strong>: Lebih disarankan masuk menggunakan <strong>email kampus (@almaata.ac.id)</strong> atau NIM resmi agar nama lengkap dan progres kelulusanmu otomatis tervalidasi.
          </p>
          <p className="text-sky-100/80 text-[11px] sm:text-xs">
            🌐 <strong>Pengunjung Umum & Mahasiswa Lain</strong>: Siapa pun di luar Informatika 23 sangat dipersilakan mendaftar atau login cepat via Google untuk melihat, berdiskusi, dan mencoba seluruh fitur interaktif di web kami!
          </p>
        </div>
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
          {/* Tombol Login Google Satu-Klik */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base flex items-center justify-center space-x-3 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Lanjut dengan Google / Gmail</span>
            </button>

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

          {/* Error / Success Feedback Alerts */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start space-x-3 animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
              <div>
                <p className="font-bold">Informasi!</p>
                <p className="text-xs mt-0.5 leading-relaxed">{errorMessage}</p>
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
                  Daftar Sebagai / Status Kategori
                </label>
                <select
                  value={regPeran}
                  onChange={(e) => handleRegPeranChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-instrument font-medium text-slate-800"
                >
                  <option value="Mahasiswa Informatika 23">Mahasiswa Informatika 23</option>
                  <option value="Mahasiswa Alma Ata">Mahasiswa Alma Ata (Luar IF23)</option>
                  <option value="Umum / Pengunjung">Umum / Pengunjung</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-instrument">
                  {regPeran === 'Mahasiswa Informatika 23' 
                    ? 'NIM Mahasiswa IF23' 
                    : regPeran === 'Mahasiswa Alma Ata' 
                    ? 'NIM Mahasiswa Alma Ata' 
                    : 'Nomor ID / Identitas (Opsional)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required={regPeran !== 'Umum / Pengunjung'}
                    placeholder={
                      regPeran === 'Mahasiswa Informatika 23'
                        ? 'Ketik NIM (contoh: 233200299) nama otomatis muncul'
                        : regPeran === 'Mahasiswa Alma Ata'
                        ? 'Contoh: 230101...'
                        : 'Boleh dikosongkan (otomatis diisi ID Tamu)'
                    }
                    value={regNim}
                    onChange={(e) => handleRegNimChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>

                {/* Badge Verifikasi Mahasiswa IF23 Resmi dari PDF */}
                {detectedIf23 && (
                  <div className="mt-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2 animate-fadeIn">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      Data Terverifikasi Resmi: <strong>{detectedIf23.nama}</strong> (Informatika 2023)
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-instrument">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Kamu"
                  value={regNama}
                  onChange={(e) => setRegNama(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-instrument font-medium"
                />
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
