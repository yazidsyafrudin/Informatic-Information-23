import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckSquare, 
  Award, 
  ShieldCheck, 
  Edit3, 
  Save, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  Trophy, 
  Flame, 
  ChevronDown, 
  ChevronUp,
  Camera,
  Clock,
  Info
} from 'lucide-react';
import { ROADMAP_PHASES } from '../data/milestones';
import StudentCalendarTracker from './StudentCalendarTracker';

export default function TrackerView({ 
  profile, 
  onUpdateProfile, 
  progress, 
  onToggleMilestone,
  progressCount,
  totalMilestones 
}) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formProfile, setFormProfile] = useState(profile || {});
  const [expandedPhase, setExpandedPhase] = useState(1);
  const [expandedStepDetails, setExpandedStepDetails] = useState({});

  const toggleStepDetail = (stepId, e) => {
    if (e) e.stopPropagation();
    setExpandedStepDetails(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  useEffect(() => {
    if (profile) {
      setFormProfile(profile);
    }
  }, [profile]);

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const percent = Math.round((progressCount / totalMilestones) * 100) || 0;

  const getBadgeLevel = (p) => {
    if (p >= 90) return { label: 'Calon Sarjana Komputer (S.Kom)', color: 'text-accent', icon: Trophy };
    if (p >= 65) return { label: 'Peneliti Skripsi Tangguh', color: 'text-primary', icon: Flame };
    if (p >= 40) return { label: 'Kandidat Sempro Januari', color: 'text-primary', icon: Sparkles };
    return { label: 'Pejuang Magang & Proposal', color: 'text-slate-500', icon: Award };
  };

  const badge = getBadgeLevel(percent);
  const BadgeIcon = badge.icon;

  // Kompres dan baca foto profil ke Base64 (maks 400x400)
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran foto terlalu besar. Silakan pilih foto dengan ukuran di bawah 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 400; // Optimal untuk kartu profil
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setFormProfile(prev => ({ ...prev, avatar_url: compressedDataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onUpdateProfile(formProfile);
      setSaveToast(true);
      setTimeout(() => {
        setSaveToast(false);
        setIsEditingProfile(false);
      }, 700);
    } catch (err) {
      console.error('Save profile error:', err);
      setIsEditingProfile(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetStatus = (id, targetStatus) => {
    const current = progress[id];
    let nextStatus;
    // Jika tombol status yang sama diklik ulang, batalkan status (uncheck/belum)
    if (current === targetStatus || (targetStatus === 'selesai' && current === true)) {
      nextStatus = false;
    } else {
      nextStatus = targetStatus;
    }
    onToggleMilestone(id, nextStatus);

    if (nextStatus === 'selesai') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0b5e91', '#d98804', '#38bdf8', '#34d399']
      });
    }
  };

  const handleCheckboxClick = (id) => {
    handleSetStatus(id, 'selesai');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header & Profil Card - Solid Blue UAA */}
      <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* User Info */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-primary overflow-hidden flex items-center justify-center font-extrabold text-2xl shadow-md flex-shrink-0 font-philosopher border-2 border-white/40">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.nama_lengkap} 
                  className="w-full h-full object-cover object-top" 
                />
              ) : (
                profile?.nama_lengkap?.charAt(0) || 'M'
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold font-philosopher text-white">
                  {profile?.nama_lengkap || 'Mahasiswa Informatika 23'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/15 text-white border border-white/20 shadow-xs">
                  {profile?.nim || 'NIM Belum Diatur'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-instrument bg-accent text-white shadow-xs">
                  {profile?.peminatan || 'Software Engineering'}
                </span>
              </div>
              
              <p className="text-xs font-instrument text-white/80">
                Dosen Pembimbing: <strong className="text-white">{profile?.dosen_pembimbing || 'Belum Ditentukan / Sedang Pengajuan'}</strong>
              </p>
              {profile?.quote && (
                <p className="text-xs font-instrument text-accent mt-1 italic font-medium">
                  "{profile.quote}"
                </p>
              )}
            </div>
          </div>

          {/* Badge & Progres Ringkas */}
          <div className="flex items-center space-x-4 bg-white/15 backdrop-blur-xs p-4 rounded-2xl border border-white/20 self-stretch sm:self-auto justify-between sm:justify-start shadow-xs">
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-instrument text-white/80 mb-1">
                <BadgeIcon className="w-4 h-4 text-accent" />
                <span className="font-bold text-white">{badge.label}</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {percent}% <span className="text-xs font-normal text-white/80">({progressCount}/{totalMilestones} Selesai)</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/20 shadow-2xs transition-colors cursor-pointer"
              title="Edit Data & Profil Publik Mahasiswa"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Edit Profile Form */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t-2 border-white/20 space-y-6 animate-fadeIn font-instrument">
            {/* Bagian 1: Data Akademik */}
            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>1. Data Akademik & Skripsi</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/90 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={formProfile.nama_lengkap || ''}
                    onChange={(e) => setFormProfile({ ...formProfile, nama_lengkap: e.target.value })}
                    className="w-full bg-white border border-white/30 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                    placeholder="Contoh: Yazid Syafrudin"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/90 mb-1">NIM Mahasiswa</label>
                  <input
                    type="text"
                    value={formProfile.nim || ''}
                    onChange={(e) => setFormProfile({ ...formProfile, nim: e.target.value })}
                    className="w-full bg-white border border-white/30 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                    placeholder="Contoh: 233200299"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/90 mb-1">Peminatan</label>
                  <select
                    value={formProfile.peminatan || 'Software Engineering'}
                    onChange={(e) => setFormProfile({ ...formProfile, peminatan: e.target.value })}
                    className="w-full bg-white border border-white/30 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                  >
                    <option value="Software Engineering">Software Engineering / Web / Mobile</option>
                    <option value="Artificial Intelligence">Artificial Intelligence / Data Science</option>
                    <option value="Networking & Security">Networking & Cyber Security</option>
                    <option value="Internet of Things">Internet of Things (IoT) & Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/90 mb-1">Dosen Pembimbing</label>
                  <input
                    type="text"
                    value={formProfile.dosen_pembimbing || ''}
                    onChange={(e) => setFormProfile({ ...formProfile, dosen_pembimbing: e.target.value })}
                    className="w-full bg-white border border-white/30 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                    placeholder="Nama Dosen Pembimbing"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="block text-xs font-bold text-white/90 mb-1">Rencana / Draf Judul Skripsi</label>
                  <input
                    type="text"
                    value={formProfile.judul_skripsi || ''}
                    onChange={(e) => setFormProfile({ ...formProfile, judul_skripsi: e.target.value })}
                    className="w-full bg-white border border-white/30 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                    placeholder="Rencana judul skripsi kamu"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 2: Profil Publik Direktori Angkatan IF23 */}
            <div className="pt-4 border-t border-white/15 bg-white/10 p-4 sm:p-5 rounded-2xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>2. Profil Publik Direktori IF23 (Halaman Tentang Kami)</span>
                </div>
                <span className="text-[11px] text-accent font-semibold bg-accent/20 px-2.5 py-0.5 rounded-full border border-accent/30">
                  Tampil di Kartu Angkatan
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Upload Foto Profil */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-white/10 rounded-2xl border border-white/20 text-center">
                  <div className="relative w-24 h-32 rounded-2xl overflow-hidden bg-sky-100 border-2 border-white/60 shadow-md mb-3 flex items-center justify-center">
                    {formProfile.avatar_url ? (
                      <img 
                        src={formProfile.avatar_url} 
                        alt="Preview Foto" 
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <img src="/logo pusing coding.png" alt="Logo Pusing Coding" className="w-12 h-12 mx-auto object-contain mb-1 opacity-80" />
                        <span className="text-[10px] text-primary font-bold block">Logo Pusing Coding</span>
                      </div>
                    )}
                  </div>

                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-primary text-xs font-bold hover:bg-sky-50 shadow-xs transition-transform hover:scale-102">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{formProfile.avatar_url ? 'Ganti Foto' : 'Upload Foto Profil'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoChange}
                      className="hidden" 
                    />
                  </label>
                  
                  {formProfile.avatar_url && (
                    <button
                      type="button"
                      onClick={() => setFormProfile(prev => ({ ...prev, avatar_url: '' }))}
                      className="mt-1.5 text-[11px] text-rose-200 hover:text-white underline cursor-pointer"
                    >
                      Hapus foto (kembali ke logo)
                    </button>
                  )}
                  <span className="text-[10px] text-white/70 mt-1 block">Otomatis di-resize & hemat data</span>
                </div>

                {/* Input Quote & Medsos */}
                <div className="lg:col-span-8 space-y-3.5">
                  {/* Kata-kata / Motto (Max 50 karakter) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-white/90">
                        Kata-kata / Motto Singkat <span className="text-accent">*</span>
                      </label>
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        (formProfile.quote || '').length >= 50
                          ? 'bg-rose-500/80 text-white'
                          : (formProfile.quote || '').length >= 40
                          ? 'bg-amber-500/80 text-white'
                          : 'bg-white/20 text-white'
                      }`}>
                        {(formProfile.quote || '').length} / 50 huruf
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={50}
                      value={formProfile.quote || ''}
                      onChange={(e) => setFormProfile({ ...formProfile, quote: e.target.value })}
                      className="w-full bg-white border border-white/30 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                      placeholder="Contoh: Coding hari ini, solusi esok nanti. (Maksimal 50 huruf)"
                    />
                    <p className="text-[11px] text-white/70 mt-1">
                      Maksimal 50 karakter agar pas dan rapi saat ditampilkan di kartu direktori angkatan.
                    </p>
                  </div>

                  {/* 4 Link Medsos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-white/90 mb-1">Link Instagram</label>
                      <input
                        type="text"
                        value={formProfile.instagram || ''}
                        onChange={(e) => setFormProfile({ ...formProfile, instagram: e.target.value })}
                        className="w-full bg-white border border-white/30 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                        placeholder="https://instagram.com/username"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/90 mb-1">Link LinkedIn</label>
                      <input
                        type="text"
                        value={formProfile.linkedin || ''}
                        onChange={(e) => setFormProfile({ ...formProfile, linkedin: e.target.value })}
                        className="w-full bg-white border border-white/30 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/90 mb-1">Link GitHub</label>
                      <input
                        type="text"
                        value={formProfile.github || ''}
                        onChange={(e) => setFormProfile({ ...formProfile, github: e.target.value })}
                        className="w-full bg-white border border-white/30 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                        placeholder="https://github.com/username"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/90 mb-1">Link Website / Portfolio</label>
                      <input
                        type="text"
                        value={formProfile.website || ''}
                        onChange={(e) => setFormProfile({ ...formProfile, website: e.target.value })}
                        className="w-full bg-white border border-white/30 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
                        placeholder="https://porto-kamu.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Simpan & Batal */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2.5 rounded-xl bg-white/15 text-white hover:bg-white/25 text-xs font-semibold cursor-pointer transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-accent hover:bg-accent/90 disabled:opacity-60 text-white text-xs font-bold shadow-md shadow-accent/25 transition-all cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Menyimpan...</span>
                  </>
                ) : saveToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Perubahan Berhasil Disimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Profil</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Progress Bar Visual Card - Solid Blue UAA */}
      <div className="bg-primary text-white rounded-3xl p-6 border-2 border-primary-700 shadow-md">
        <div className="flex items-center justify-between mb-2 font-instrument">
          <span className="text-xs font-bold uppercase tracking-wider text-white/90">
            Kemajuan Menuju Kelulusan Angkatan '23
          </span>
          <span className="text-sm font-bold text-accent font-mono">{percent}% Lolos</span>
        </div>
        <div className="w-full h-3.5 bg-primary-950 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-accent via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Interactive Syarat Validator Cards (Turnitin, IPK, AAEPT, Hadir Sempro) */}
      <div>
        <h2 className="text-xl font-bold font-philosopher text-primary mb-3 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span>Validasi Kelayakan Syarat Wajib FKT Alma Ata</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-instrument">
          
          {/* IPK Validator */}
          <div className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 shadow-md hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white/90">IPK Mahasiswa</span>
              {profile.ipk >= 3.25 ? (
                <span className="text-[10px] font-bold text-emerald-300 flex items-center bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <Check className="w-3 h-3 mr-0.5" /> Lolos
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-300 flex items-center bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                  <AlertTriangle className="w-3 h-3 mr-0.5" /> Belum Min
                </span>
              )}
            </div>
            <div className="flex items-baseline space-x-2">
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={profile.ipk || 3.25}
                onChange={(e) => onUpdateProfile({ ...profile, ipk: parseFloat(e.target.value) || 0 })}
                className="w-20 bg-white border-2 border-primary-400 rounded-xl px-2 py-1 text-lg font-mono font-bold text-slate-900 text-center focus:border-accent focus:outline-none shadow-xs"
              />
              <span className="text-xs text-white/80 font-semibold">Syarat: ≥ 3.25</span>
            </div>
          </div>

          {/* Turnitin Validator */}
          <div className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 shadow-md hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white/90">Hasil Cek Turnitin</span>
              {profile.turnitin_persen <= 20 ? (
                <span className="text-[10px] font-bold text-emerald-300 flex items-center bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <Check className="w-3 h-3 mr-0.5" /> Lolos
                </span>
              ) : (
                <span className="text-[10px] font-bold text-rose-300 flex items-center bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/40">
                  <AlertTriangle className="w-3 h-3 mr-0.5" /> Lebih 20%
                </span>
              )}
            </div>
            <div className="flex items-baseline space-x-2">
              <input
                type="number"
                min="0"
                max="100"
                value={profile.turnitin_persen ?? 15}
                onChange={(e) => onUpdateProfile({ ...profile, turnitin_persen: parseInt(e.target.value, 10) || 0 })}
                className="w-20 bg-white border-2 border-primary-400 rounded-xl px-2 py-1 text-lg font-mono font-bold text-slate-900 text-center focus:border-accent focus:outline-none shadow-xs"
              />
              <span className="text-xs text-white/80 font-semibold">% (Maks 20%)</span>
            </div>
          </div>

          {/* Skor AAEPT */}
          <div className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 shadow-md hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white/90">Skor AAEPT</span>
              {profile.skor_aaept >= 450 ? (
                <span className="text-[10px] font-bold text-emerald-300 flex items-center bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <Check className="w-3 h-3 mr-0.5" /> Lolos
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-300 flex items-center bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                  <AlertTriangle className="w-3 h-3 mr-0.5" /> &lt; 450
                </span>
              )}
            </div>
            <div className="flex items-baseline space-x-2">
              <input
                type="number"
                min="0"
                max="677"
                value={profile.skor_aaept || 450}
                onChange={(e) => onUpdateProfile({ ...profile, skor_aaept: parseInt(e.target.value, 10) || 0 })}
                className="w-20 bg-white border-2 border-primary-400 rounded-xl px-2 py-1 text-lg font-mono font-bold text-slate-900 text-center focus:border-accent focus:outline-none shadow-xs"
              />
              <span className="text-xs text-white/80 font-semibold">Min: 450</span>
            </div>
          </div>

          {/* Audiens Sempro Teman (5x) */}
          <div className="bg-primary text-white rounded-2xl p-5 border-2 border-primary-700 shadow-md hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white/90">Audiens Sempro Teman</span>
              {profile.hadir_sempro_count >= 5 ? (
                <span className="text-[10px] font-bold text-emerald-300 flex items-center bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <Check className="w-3 h-3 mr-0.5" /> Lengkap
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-300 flex items-center bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                  Kurang {5 - (profile.hadir_sempro_count || 0)}x
                </span>
              )}
            </div>
            <div className="flex items-baseline space-x-2">
              <input
                type="number"
                min="0"
                max="20"
                value={profile.hadir_sempro_count ?? 5}
                onChange={(e) => onUpdateProfile({ ...profile, hadir_sempro_count: parseInt(e.target.value, 10) || 0 })}
                className="w-20 bg-white border-2 border-primary-400 rounded-xl px-2 py-1 text-lg font-mono font-bold text-slate-900 text-center focus:border-accent focus:outline-none shadow-xs"
              />
              <span className="text-xs text-white/80 font-semibold">Wajib: 5x</span>
            </div>
          </div>

        </div>
      </div>

      {/* Kalender Interaktif Akademik & Tracker Progres Mahasiswa */}
      <StudentCalendarTracker profile={profile} />

      {/* Checklist Keseluruhan Milestone dengan Dropdown / Accordion per Fase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold font-philosopher text-primary flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-accent" />
            <span>Checklist Mandiri Per Fase (Klik Fase untuk Buka/Tutup Tahap)</span>
          </h2>
          <span className="text-xs font-mono font-bold text-slate-500 font-instrument">
            {progressCount} / {totalMilestones} Tahap Selesai
          </span>
        </div>

        {ROADMAP_PHASES.map((phase) => {
          const isExpanded = expandedPhase === phase.phaseId;
          const completedInPhase = phase.steps.filter(s => progress[s.id] === true || progress[s.id] === 'selesai').length;
          const inProgressInPhase = phase.steps.filter(s => progress[s.id] === 'progres').length;
          const totalInPhase = phase.steps.length;
          const isPhaseComplete = completedInPhase === totalInPhase && totalInPhase > 0;

          return (
            <div 
              key={phase.phaseId} 
              className={`rounded-3xl border-2 transition-all overflow-hidden ${
                isPhaseComplete
                  ? 'border-emerald-300 shadow-xs bg-white hover:border-emerald-400'
                  : isExpanded 
                  ? 'border-primary/50 shadow-md ring-2 ring-primary/10 bg-white' 
                  : 'border-sky-200/80 shadow-xs bg-white hover:border-primary/40'
              }`}
            >
              {/* Header Fase - Clickable Dropdown Trigger */}
              <div 
                onClick={() => togglePhase(phase.phaseId)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between hover:bg-slate-50/70 transition-colors select-none"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-xs flex-shrink-0 font-philosopher ${
                    isPhaseComplete
                      ? 'bg-emerald-600'
                      : isExpanded
                      ? 'bg-primary'
                      : 'bg-primary/90'
                  }`}>
                    {isPhaseComplete ? '✓' : phase.phaseId}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-primary font-philosopher text-base sm:text-lg">
                        {phase.title}
                      </h3>
                      {isPhaseComplete && (
                        <span className="text-[10px] font-bold font-instrument bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                          Tuntas
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-instrument text-slate-500">
                      {phase.period} • <span className="hidden sm:inline">{phase.status}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                  {inProgressInPhase > 0 && (
                    <span className="text-[11px] font-mono font-bold font-instrument px-2.5 py-1 rounded-full border bg-amber-50 text-amber-800 border-amber-200 shadow-2xs flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{inProgressInPhase} Progres</span>
                    </span>
                  )}
                  <span className={`text-xs font-mono font-bold font-instrument px-3 py-1 rounded-full border shadow-2xs ${
                    isPhaseComplete
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-white text-accent border-sky-100'
                  }`}>
                    {completedInPhase} / {totalInPhase} Selesai
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-primary transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Tahap di dalam Fase (Hanya Muncul Jika Dropdown Terbuka) */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t-2 border-sky-100/80 space-y-2.5 font-instrument bg-sky-50/40 animate-fadeIn">
                  <div className="flex items-center justify-between gap-2 mb-1 px-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-instrument">
                      Checklist Tahap ({completedInPhase}/{totalInPhase} Selesai)
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Pilih Progres atau Selesai
                    </span>
                  </div>

                  {phase.steps.map((step) => {
                    const status = progress[step.id];
                    const isDone = status === true || status === 'selesai';
                    const isInProgress = status === 'progres';
                    const isDetailOpen = !!expandedStepDetails[step.id];

                    return (
                      <div
                        key={step.id}
                        className={`rounded-2xl border-2 transition-all overflow-hidden ${
                          isDone
                            ? 'bg-emerald-50/90 border-emerald-300 shadow-2xs'
                            : isInProgress
                            ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-300/30 shadow-2xs'
                            : 'bg-white border-slate-200/90 hover:border-primary/40 shadow-xs'
                        }`}
                      >
                        {/* Baris Utama Ramping (Compact Row) */}
                        <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          {/* Kiri: Checkbox & Judul Tahap */}
                          <div 
                            onClick={() => handleCheckboxClick(step.id)}
                            className="flex items-center space-x-3 flex-1 cursor-pointer min-w-0"
                          >
                            <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                              isDone
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : isInProgress
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'border-2 border-slate-300 bg-white hover:border-primary'
                            }`}>
                              {isDone ? (
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              ) : isInProgress ? (
                                <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                              ) : null}
                            </div>

                            <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
                              <h4 className={`text-xs sm:text-sm font-semibold truncate ${
                                isDone 
                                  ? 'text-emerald-800 line-through opacity-80' 
                                  : isInProgress 
                                  ? 'text-amber-950 font-bold' 
                                  : 'text-slate-800'
                              }`}>
                                {step.title}
                              </h4>

                              {isInProgress && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-200/80 text-amber-900 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                                  Sedang Dikerjakan
                                </span>
                              )}
                              {isDone && (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-900 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                                  Tuntas
                                </span>
                              )}

                              {/* Tombol Toggle Detail */}
                              <button
                                type="button"
                                onClick={(e) => toggleStepDetail(step.id, e)}
                                className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ml-auto sm:ml-1 ${
                                  isDetailOpen 
                                    ? 'bg-primary text-white shadow-2xs' 
                                    : 'text-slate-400 hover:text-primary hover:bg-sky-100/70'
                                }`}
                                title="Lihat detail penjelasan & tips"
                              >
                                <Info className="w-3 h-3" />
                                <span>{isDetailOpen ? 'Tutup' : 'Detail'}</span>
                                {isDetailOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>

                          {/* Kanan: Pilihan 'Progres' dan 'Selesai' */}
                          <div className="flex items-center gap-1.5 flex-shrink-0 justify-end pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetStatus(step.id, 'progres');
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                                isInProgress
                                  ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300'
                                  : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/60'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>Progres</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetStatus(step.id, 'selesai');
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                                  : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/60'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Selesai</span>
                            </button>
                          </div>
                        </div>

                        {/* Panel Detail (Hanya Muncul Jika Diklik) */}
                        {isDetailOpen && (
                          <div className="px-4 pb-3.5 pt-2 text-xs border-t border-slate-200/70 bg-white/80 space-y-2 animate-fadeIn">
                            <p className="text-slate-600 leading-relaxed font-instrument">
                              {step.desc}
                            </p>
                            {step.tips && (
                              <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200/70 text-sky-950 flex items-start gap-2 text-[11px] leading-relaxed font-instrument">
                                <Sparkles className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-primary font-bold">Tips Mahasiswa: </strong>
                                  <span>{step.tips}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
