import React, { useState } from 'react';
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
  ChevronUp
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
  const [formProfile, setFormProfile] = useState(profile);
  const [expandedPhase, setExpandedPhase] = useState(1);

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

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile(formProfile);
    setIsEditingProfile(false);
  };

  const handleCheckboxClick = (id) => {
    const isCurrentlyChecked = Boolean(progress[id]);
    onToggleMilestone(id);

    if (!isCurrentlyChecked) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0b5e91', '#d98804', '#38bdf8', '#34d399']
      });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header & Profil Card - Solid Blue UAA */}
      <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-700 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* User Info */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-primary flex items-center justify-center font-extrabold text-2xl shadow-md flex-shrink-0 font-philosopher">
              {profile?.nama_lengkap?.charAt(0) || 'M'}
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
              {profile?.judul_skripsi && (
                <p className="text-xs font-instrument text-accent mt-1 italic font-medium">
                  "{profile.judul_skripsi}"
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
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/20 shadow-2xs transition-colors"
              title="Edit Data Mahasiswa"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Edit Profile Form */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t-2 border-sky-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn font-instrument">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={formProfile.nama_lengkap || ''}
                onChange={(e) => setFormProfile({ ...formProfile, nama_lengkap: e.target.value })}
                className="w-full bg-white border-2 border-sky-100 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary shadow-2xs"
                placeholder="Contoh: Yazid Syafrudin"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">NIM Mahasiswa</label>
              <input
                type="text"
                value={formProfile.nim || ''}
                onChange={(e) => setFormProfile({ ...formProfile, nim: e.target.value })}
                className="w-full bg-white border-2 border-sky-100 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary shadow-2xs"
                placeholder="Contoh: 230101001"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Peminatan</label>
              <select
                value={formProfile.peminatan || 'Software Engineering'}
                onChange={(e) => setFormProfile({ ...formProfile, peminatan: e.target.value })}
                className="w-full bg-white border-2 border-sky-100 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary shadow-2xs"
              >
                <option value="Software Engineering">Software Engineering / Web / Mobile</option>
                <option value="Artificial Intelligence">Artificial Intelligence / Data Science</option>
                <option value="Networking & Security">Networking & Cyber Security</option>
                <option value="Internet of Things">Internet of Things (IoT) & Hardware</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dosen Pembimbing</label>
              <input
                type="text"
                value={formProfile.dosen_pembimbing || ''}
                onChange={(e) => setFormProfile({ ...formProfile, dosen_pembimbing: e.target.value })}
                className="w-full bg-white border-2 border-sky-100 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary shadow-2xs"
                placeholder="Nama Dosen Pembimbing"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">Rencana / Draf Judul Skripsi</label>
              <input
                type="text"
                value={formProfile.judul_skripsi || ''}
                onChange={(e) => setFormProfile({ ...formProfile, judul_skripsi: e.target.value })}
                className="w-full bg-white border-2 border-sky-100 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary shadow-2xs"
                placeholder="Rencana judul skripsi kamu"
              />
            </div>

            <div className="flex items-end space-x-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-md shadow-primary/20 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Profil</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-3 py-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold"
              >
                Batal
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
          const completedInPhase = phase.steps.filter(s => progress[s.id]).length;
          const totalInPhase = phase.steps.length;
          const isPhaseComplete = completedInPhase === totalInPhase && totalInPhase > 0;

          return (
            <div 
              key={phase.phaseId} 
              className={`rounded-3xl border-2 transition-all overflow-hidden ${
                isExpanded 
                  ? 'border-primary/50 shadow-md ring-2 ring-primary/10 bg-white' 
                  : 'border-sky-200/90 shadow-xs bg-gradient-to-br from-sky-50/40 via-white to-sky-50/60'
              }`}
            >
              {/* Header Fase - Clickable Dropdown Trigger */}
              <div 
                onClick={() => togglePhase(phase.phaseId)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between hover:bg-sky-50/60 transition-colors select-none"
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

                <div className="flex items-center space-x-3 flex-shrink-0 ml-3">
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
                <div className="p-5 sm:p-6 border-t-2 border-sky-100 space-y-3 font-instrument bg-sky-50/30 animate-fadeIn">
                  <p className="text-[11px] text-slate-500 mb-2">
                    Centang setiap tahap yang telah kamu selesaikan untuk memperbarui status kelulusanmu:
                  </p>
                  {phase.steps.map((step) => {
                    const isChecked = Boolean(progress[step.id]);

                    return (
                      <div
                        key={step.id}
                        onClick={() => handleCheckboxClick(step.id)}
                        className={`p-4 rounded-2xl border-2 flex items-start space-x-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-50/90 border-emerald-300 shadow-2xs'
                            : 'bg-bone border-bone-300 hover:border-primary/50 hover:bg-bone-50 shadow-xs'
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0 ${
                          isChecked
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'border-2 border-bone-300 bg-white hover:border-primary'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="flex-1">
                          <h4 className={`text-xs sm:text-sm font-bold leading-snug ${
                            isChecked ? 'text-emerald-800 line-through' : 'text-slate-800'
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
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
