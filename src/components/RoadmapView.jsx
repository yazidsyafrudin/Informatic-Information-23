import React, { useState } from 'react';
import { 
  ROADMAP_PHASES 
} from '../data/milestones';
import { 
  Compass, 
  Lightbulb, 
  ArrowRight,
  Check,
  CheckSquare,
  Sparkles
} from 'lucide-react';

export default function RoadmapView({ progress, onToggleMilestone, setActiveTab }) {
  const [activePhaseId, setActivePhaseId] = useState(1);

  const activePhase = ROADMAP_PHASES.find(p => p.phaseId === activePhaseId) || ROADMAP_PHASES[0];
  const activePhaseCompleted = activePhase.steps.filter(s => progress[s.id]).length;
  const activePhaseTotal = activePhase.steps.length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Card - Solid Blue UAA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary text-white p-6 sm:p-8 rounded-3xl border-2 border-primary-700 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-accent mb-1">
            <Compass className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider font-instrument text-accent">Panduan Langkah Demi Langkah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-philosopher text-white">
            Roadmap Kelulusan Informatika '23
          </h1>
          <p className="text-xs sm:text-sm font-instrument text-white/90 mt-1 max-w-2xl leading-relaxed">
            Peta jalan terstruktur kelulusan mahasiswa Informatika '23: dari 
            <strong className="text-accent font-bold"> Magang Industri</strong>, 
            <strong className="text-accent font-bold"> Seminar Proposal</strong>, 
            <strong className="text-accent font-bold"> Seminar Hasil</strong>, 
            <strong className="text-accent font-bold"> Yudisium</strong>, hingga 
            <strong className="text-accent font-bold"> Wisuda Bersama</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/20 self-start md:self-auto font-instrument shadow-xs text-xs font-bold text-white">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>5 Fase Menuju Sarjana Komputer (S.Kom)</span>
        </div>
      </div>

      {/* Interactive 5 Phase Switcher */}
      <div>
        <div className="flex items-center justify-between mb-3 font-instrument">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Pilih Fase untuk Melihat Tahap Checklist:
          </span>
          <span className="text-xs font-bold text-primary font-mono">
            {ROADMAP_PHASES.reduce((acc, p) => acc + p.steps.filter(s => progress[s.id]).length, 0)} / {ROADMAP_PHASES.reduce((acc, p) => acc + p.steps.length, 0)} Tahap Keseluruhan
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ROADMAP_PHASES.map((phase) => {
            const isSelected = activePhaseId === phase.phaseId;
            const completedCount = phase.steps.filter(s => progress[s.id]).length;
            const totalInPhase = phase.steps.length;
            const isPhaseDone = completedCount === totalInPhase && totalInPhase > 0;

            return (
              <button
                key={phase.phaseId}
                onClick={() => setActivePhaseId(phase.phaseId)}
                className={`p-4 sm:p-5 rounded-2xl text-left border-2 transition-all relative ${
                  isSelected
                    ? 'bg-primary text-white border-primary-700 shadow-md ring-2 ring-accent/40 -translate-y-0.5'
                    : 'bg-white border-slate-200 hover:border-primary/60 hover:bg-sky-50/40 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-instrument ${
                    isPhaseDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : isSelected
                      ? 'bg-accent text-white'
                      : 'bg-primary text-white'
                  }`}>
                    Fase {phase.phaseId}
                  </span>
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-accent' : 'text-slate-500'}`}>
                    {completedCount}/{totalInPhase}
                  </span>
                </div>
                <h3 className={`text-sm font-bold font-philosopher truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                  {phase.shortTitle || phase.title}
                </h3>
                <p className={`text-[11px] font-instrument mt-0.5 truncate ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                  {phase.status}
                </p>
                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Card & Checklist of Tahap */}
      {activePhase && (
        <div className="bg-gradient-to-br from-sky-50/50 via-white to-sky-50/60 rounded-3xl border-2 border-primary/40 shadow-md p-6 sm:p-8 space-y-6">
          {/* Phase Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-sky-100">
            <div className="flex items-start sm:items-center space-x-4">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-primary flex items-center justify-center font-bold text-white text-xl shadow-md flex-shrink-0 font-philosopher border-2 border-primary-700">
                {activePhase.phaseId}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-instrument bg-accent text-white shadow-xs">
                    Fase {activePhase.phaseId} dari 5
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-instrument bg-sky-100 text-primary border border-sky-200">
                    {activePhase.status}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary font-philosopher">{activePhase.title}</h2>
                <p className="text-xs sm:text-sm font-instrument text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  <strong className="text-slate-800">{activePhase.period}</strong> • {activePhase.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end flex-shrink-0 bg-white p-3.5 rounded-2xl border border-sky-200 shadow-xs self-start sm:self-auto">
              <span className="text-[11px] font-instrument text-slate-500">Progres Fase Ini</span>
              <span className="text-sm font-mono font-bold text-primary">
                {activePhaseCompleted} / {activePhaseTotal} Tahap Selesai
              </span>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden mt-1.5 border border-slate-200">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${(activePhaseCompleted / activePhaseTotal) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Subheading Checklist */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-philosopher font-bold text-lg text-primary flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-accent" />
                <span>Tahap-Tahap dalam {activePhase.title}</span>
              </h3>
              <p className="text-xs text-slate-500 font-instrument">
                Klik kartu atau kotak checklist untuk menandai tahap yang sudah kamu selesaikan:
              </p>
            </div>
            <span className="text-xs font-bold text-accent bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/80 self-start sm:self-auto">
              {activePhase.steps.length} Tahap Terjadwal
            </span>
          </div>

          {/* Steps / Tahap Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePhase.steps.map((step, idx) => {
              const isDone = Boolean(progress[step.id]);

              return (
                <div
                  key={step.id}
                  onClick={() => onToggleMilestone(step.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isDone
                      ? 'bg-emerald-50/90 border-emerald-300 shadow-xs'
                      : 'bg-white border-sky-100 hover:border-primary/60 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0 ${
                            isDone
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'border-2 border-sky-300 bg-white hover:border-primary'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold font-instrument leading-snug ${isDone ? 'text-emerald-800 line-through' : 'text-slate-800'}`}>
                            {step.title}
                          </h4>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md flex-shrink-0">
                        Tahap #{idx + 1}
                      </span>
                    </div>

                    <p className="text-xs font-instrument text-slate-600 pl-8 mb-3 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {step.tips && (
                    <div className="ml-8 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs flex items-start space-x-2 font-instrument mt-auto">
                      <Lightbulb className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[11px] leading-relaxed">
                        <strong className="text-accent font-bold">Tips Dospem: </strong>
                        {step.tips}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Phase Bottom Navigation */}
          <div className="pt-6 border-t-2 border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 font-instrument">
            {activePhaseId > 1 ? (
              <button
                onClick={() => setActivePhaseId(activePhaseId - 1)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-sky-200 bg-white hover:bg-sky-50 text-xs font-bold text-slate-700 transition-all flex items-center justify-center space-x-2 shadow-2xs"
              >
                <span>⬅️ Fase {activePhaseId - 1}: {ROADMAP_PHASES[activePhaseId - 2]?.shortTitle}</span>
              </button>
            ) : <div className="hidden sm:block" />}

            <button
              onClick={() => setActiveTab('tracker')}
              className="text-xs font-bold text-primary hover:text-accent transition-colors flex items-center space-x-1"
            >
              <span>Lihat Rekapitulasi di Progress Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {activePhaseId < 5 ? (
              <button
                onClick={() => setActivePhaseId(activePhaseId + 1)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-md shadow-primary/20 transition-all flex items-center justify-center space-x-2"
              >
                <span>Fase {activePhaseId + 1}: {ROADMAP_PHASES[activePhaseId]?.shortTitle} ➡️</span>
              </button>
            ) : (
              <span className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                🎉 Fase Terakhir: Menuju Wisuda S.Kom!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
