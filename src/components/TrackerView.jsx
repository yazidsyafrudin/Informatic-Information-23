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
  Flame
} from 'lucide-react';
import { ROADMAP_PHASES } from '../data/milestones';

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

  const percent = Math.round((progressCount / totalMilestones) * 100) || 0;

  const getBadgeLevel = (p) => {
    if (p >= 90) return { label: 'Calon Sarjana Komputer (S.Kom)', color: 'from-amber-400 to-yellow-500', icon: Trophy };
    if (p >= 65) return { label: 'Peneliti Skripsi Tangguh', color: 'from-emerald-500 to-teal-500', icon: Flame };
    if (p >= 40) return { label: 'Kandidat Sempro Januari', color: 'from-blue-500 to-indigo-500', icon: Sparkles };
    return { label: 'Pejuang Magang & Proposal', color: 'from-slate-600 to-slate-500', icon: Award };
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
        colors: ['#0c8de7', '#38bdf8', '#fbbf24', '#34d399']
      });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header & Profil Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* User Info */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-alma-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-alma-600/20 flex-shrink-0">
              {profile?.nama_lengkap?.charAt(0) || 'M'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {profile?.nama_lengkap || 'Mahasiswa Informatika 23'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-alma-700 border border-slate-200">
                  {profile?.nim || 'NIM Belum Diatur'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-alma-50 text-alma-700 border border-alma-200">
                  {profile?.peminatan || 'Software Engineering'}
                </span>
              </div>
              
              <p className="text-xs text-slate-500">
                Dosen Pembimbing: <strong className="text-slate-800">{profile?.dosen_pembimbing || 'Belum Ditentukan / Sedang Pengajuan'}</strong>
              </p>
              {profile?.judul_skripsi && (
                <p className="text-xs text-slate-600 mt-1 italic">
                  "{profile.judul_skripsi}"
                </p>
              )}
            </div>
          </div>

          {/* Badge & Progres Ringkas */}
          <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-200 self-stretch sm:self-auto justify-between sm:justify-start">
            <div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                <BadgeIcon className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-bold text-slate-700">{badge.label}</span>
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {percent}% <span className="text-xs font-normal text-slate-500">({progressCount}/{totalMilestones} Selesai)</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition-colors"
              title="Edit Data Mahasiswa"
            >
              <Edit3 className="w-4 h-4 text-alma-600" />
            </button>
          </div>

        </div>

        {/* Edit Profile Form */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={formProfile.nama_lengkap || ''}
                onChange={(e) => setFormProfile({ ...formProfile, nama_lengkap: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-alma-500 shadow-xs"
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
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-alma-500 shadow-xs"
                placeholder="Contoh: 230101001"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Peminatan</label>
              <select
                value={formProfile.peminatan || 'Software Engineering'}
                onChange={(e) => setFormProfile({ ...formProfile, peminatan: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-alma-500 shadow-xs"
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
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-alma-500 shadow-xs"
                placeholder="Nama Dosen Pembimbing"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">Rencana / Draf Judul Skripsi</label>
              <input
                type="text"
                value={formProfile.judul_skripsi || ''}
                onChange={(e) => setFormProfile({ ...formProfile, judul_skripsi: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-alma-500 shadow-xs"
                placeholder="Rencana judul skripsi kamu"
              />
            </div>

            <div className="flex items-end space-x-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-alma-600 hover:bg-alma-700 text-white text-xs font-bold shadow-md shadow-alma-600/20 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Profil</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold"
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Progress Bar Visual */}
      <div className="glass-card rounded-2xl p-5 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Kemajuan Menuju Kelulusan Angkatan '23
          </span>
          <span className="text-sm font-bold text-alma-700 font-mono">{percent}% Lolos</span>
        </div>
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-alma-500 via-cyan-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Interactive Syarat Validator Cards (Turnitin, IPK, AAEPT, Hadir Sempro) */}
      <div>
        <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Validasi Kelayakan Syarat Wajib FKT Alma Ata</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* IPK Validator */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-600">IPK Mahasiswa</span>
              {profile.ipk >= 3.25 ? (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center">
                  <Check className="w-3 h-3 mr-0.5" /> Lolos Syarat
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-700 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-0.5" /> Belum Min 3.25
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
                className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-lg font-mono font-bold text-slate-900 text-center focus:border-alma-500 focus:outline-none"
              />
              <span className="text-xs text-slate-500">Syarat: ≥ 3.25</span>
            </div>
          </div>

          {/* Turnitin Validator */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-600">Hasil Cek Turnitin</span>
              {profile.turnitin_persen <= 20 ? (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center">
                  <Check className="w-3 h-3 mr-0.5" /> Lolos (≤ 20%)
                </span>
              ) : (
                <span className="text-[10px] font-bold text-rose-700 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-0.5" /> Lebih dari 20%
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
                className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-lg font-mono font-bold text-slate-900 text-center focus:border-alma-500 focus:outline-none"
              />
              <span className="text-xs text-slate-500">% (Maks 20%)</span>
            </div>
          </div>

          {/* Skor AAEPT */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-600">Skor AAEPT</span>
              {profile.skor_aaept >= 450 ? (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center">
                  <Check className="w-3 h-3 mr-0.5" /> Lolos (≥ 450)
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-700 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-0.5" /> Di bawah 450
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
                className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-lg font-mono font-bold text-slate-900 text-center focus:border-alma-500 focus:outline-none"
              />
              <span className="text-xs text-slate-500">Skor min: 450</span>
            </div>
          </div>

          {/* Audiens Sempro Teman (5x) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-600">Audiens Sempro Teman</span>
              {profile.hadir_sempro_count >= 5 ? (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center">
                  <Check className="w-3 h-3 mr-0.5" /> Syarat Terpenuhi
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-700 flex items-center">
                  Kurang {5 - (profile.hadir_sempro_count || 0)}x lagi
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
                className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-lg font-mono font-bold text-slate-900 text-center focus:border-alma-500 focus:outline-none"
              />
              <span className="text-xs text-slate-500">Wajib min: 5x</span>
            </div>
          </div>

        </div>
      </div>

      {/* Checklist Keseluruhan Milestone */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-slate-800 flex items-center space-x-2">
          <CheckSquare className="w-4 h-4 text-alma-600" />
          <span>Daftar Checklist Mandiri Per Fase</span>
        </h2>

        {ROADMAP_PHASES.map((phase) => (
          <div key={phase.phaseId} className="glass-card rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">{phase.title}</h3>
                <p className="text-xs text-slate-500">{phase.period}</p>
              </div>
              <span className="text-xs font-mono font-bold text-alma-700">
                {phase.steps.filter(s => progress[s.id]).length} / {phase.steps.length} Selesai
              </span>
            </div>

            <div className="space-y-3">
              {phase.steps.map((step) => {
                const isChecked = Boolean(progress[step.id]);

                return (
                  <div
                    key={step.id}
                    onClick={() => handleCheckboxClick(step.id)}
                    className={`p-3.5 rounded-xl border flex items-start space-x-3 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0 ${
                      isChecked
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'border border-slate-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <h4 className={`text-xs sm:text-sm font-bold ${
                        isChecked ? 'text-emerald-800 line-through' : 'text-slate-800'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
