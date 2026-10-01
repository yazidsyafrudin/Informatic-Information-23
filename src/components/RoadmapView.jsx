import React, { useState } from 'react';
import { 
  ROADMAP_PHASES 
} from '../data/milestones';
import { 
  Compass, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Check,
  CheckSquare,
  Sparkles
} from 'lucide-react';

export default function RoadmapView({ progress, onToggleMilestone, setActiveTab }) {
  const [expandedPhase, setExpandedPhase] = useState(1);

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

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
            <strong className="text-accent font-bold"> Ethical Clearance (EC)</strong>, 
            <strong className="text-accent font-bold"> Seminar Hasil</strong>, 
            <strong className="text-accent font-bold"> Yudisium</strong>, hingga 
            <strong className="text-accent font-bold"> Wisuda Bersama</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/20 self-start md:self-auto font-instrument shadow-xs text-xs font-bold text-white">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>6 Fase Menuju Sarjana Komputer (S.Kom)</span>
        </div>
      </div>

      {/* Interactive 6 Phase Stepper Tabs */}
      <div>
        <div className="flex items-center justify-between mb-3 font-instrument">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Navigasi Cepat Fase (Klik untuk Buka/Tutup):
          </span>
          <span className="text-xs font-bold text-primary font-mono">
            {ROADMAP_PHASES.reduce((acc, p) => acc + p.steps.filter(s => progress[s.id]).length, 0)} / {ROADMAP_PHASES.reduce((acc, p) => acc + p.steps.length, 0)} Tahap Keseluruhan
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ROADMAP_PHASES.map((phase) => {
            const isSelected = expandedPhase === phase.phaseId;
            const completedCount = phase.steps.filter(s => progress[s.id]).length;
            const totalInPhase = phase.steps.length;
            const isPhaseDone = completedCount === totalInPhase && totalInPhase > 0;

            return (
              <button
                key={phase.phaseId}
                onClick={() => togglePhase(phase.phaseId)}
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

      {/* Detailed Phase Accordion / Dropdown List */}
      <div className="space-y-6">
        {ROADMAP_PHASES.map((phase) => {
          const isExpanded = expandedPhase === phase.phaseId;
          const completedCount = phase.steps.filter(s => progress[s.id]).length;
          const totalInPhase = phase.steps.length;
          const isPhaseDone = completedCount === totalInPhase && totalInPhase > 0;

          return (
            <div
              key={phase.phaseId}
              id={`fase-${phase.phaseId}`}
              className={`bg-gradient-to-br from-sky-50/50 via-white to-sky-50/60 rounded-3xl border-2 transition-all overflow-hidden ${
                isExpanded ? 'border-primary/50 shadow-md ring-2 ring-primary/10' : 'border-sky-200/90 shadow-xs'
              }`}
            >
              {/* Phase Header - Clickable Dropdown Trigger */}
              <div
                onClick={() => togglePhase(phase.phaseId)}
                className="p-6 cursor-pointer flex items-center justify-between bg-white hover:bg-sky-50/60 transition-colors select-none"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-sm flex-shrink-0 font-philosopher border-2 ${
                    isPhaseDone 
                      ? 'bg-emerald-600 border-emerald-700' 
                      : isExpanded 
                      ? 'bg-primary border-primary-700 ring-2 ring-accent/30' 
                      : 'bg-primary border-primary-700'
                  }`}>
                    {isPhaseDone ? '✓' : phase.phaseId}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-base sm:text-lg font-bold text-primary font-philosopher">{phase.title}</h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-instrument border ${
                        isPhaseDone 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                          : 'bg-sky-100 text-primary border-sky-200'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-xs font-instrument text-slate-500">
                      <strong className="text-slate-700">{phase.period}</strong> • {phase.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0 ml-4 font-instrument">
                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-mono font-bold text-primary">
                      {completedCount} dari {totalInPhase} Selesai
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {Math.round((completedCount / totalInPhase) * 100)}%
                    </span>
                  </div>
                  <div className={`p-2 rounded-xl transition-all ${
                    isExpanded 
                      ? 'bg-primary text-white shadow-xs' 
                      : 'bg-sky-50 text-primary border border-sky-200'
                  }`}>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Steps inside Phase (Dropdown Content) */}
              {isExpanded && (
                <div className="p-6 border-t-2 border-sky-100 space-y-4 bg-sky-50/40 animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 text-primary font-philosopher font-bold text-sm">
                      <CheckSquare className="w-4 h-4 text-accent" />
                      <span>Tahap Checklist {phase.shortTitle}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-instrument">
                      Klik kotak atau kartu tahap untuk mencentang progres
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phase.steps.map((step, idx) => {
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
                              <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md flex-shrink-0">
                                #{idx + 1}
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

                  {/* Phase Bottom Actions */}
                  <div className="mt-4 pt-4 border-t border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3 font-instrument">
                    <span className="text-xs text-slate-500">
                      Progres: <strong className="text-primary font-mono">{completedCount}</strong> dari <strong className="text-primary font-mono">{totalInPhase}</strong> tahap selesai
                    </span>
                    <button
                      onClick={() => setActiveTab('tracker')}
                      className="flex items-center space-x-2 text-xs font-bold text-primary hover:text-accent transition-colors"
                    >
                      <span>Lihat & Validasi di Progress Tracker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
