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
  Check
} from 'lucide-react';

export default function RoadmapView({ progress, onToggleMilestone, setActiveTab }) {
  const [expandedPhase, setExpandedPhase] = useState(1);
  const [filterMode, setFilterMode] = useState('all');

  const filteredPhases = filterMode === 'current' 
    ? ROADMAP_PHASES.filter(p => p.phaseId <= 2)
    : ROADMAP_PHASES;

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
            Peta jalan terstruktur kelulusan mahasiswa Informatika '23 dari magang industri, pemenuhan syarat SPM, skripsi & seminar proposal, hingga pendadaran dan wisuda bersama.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-xs p-1.5 rounded-2xl border border-white/20 self-start md:self-auto font-instrument shadow-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-white text-primary shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Semua Fase (1–4)
          </button>
          <button
            onClick={() => setFilterMode('current')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'current'
                ? 'bg-white text-primary shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Fokus Semester 7 Sekarang
          </button>
        </div>
      </div>

      {/* Interactive Phase Stepper */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {ROADMAP_PHASES.map((phase) => {
          const isSelected = expandedPhase === phase.phaseId;
          const completedCount = phase.steps.filter(s => progress[s.id]).length;
          const totalInPhase = phase.steps.length;
          const isPhaseDone = completedCount === totalInPhase;

          return (
            <button
              key={phase.phaseId}
              onClick={() => setExpandedPhase(phase.phaseId)}
              className={`p-5 rounded-2xl text-left border-2 transition-all ${
                isSelected
                  ? 'bg-primary text-white border-primary-700 shadow-md ring-2 ring-accent/30'
                  : 'bg-white border-slate-200 hover:border-primary shadow-xs'
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
                <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
                  {completedCount}/{totalInPhase}
                </span>
              </div>
              <h3 className={`text-sm font-bold font-philosopher truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>{phase.title}</h3>
              <p className={`text-[11px] font-instrument mt-1 ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>{phase.period}</p>
            </button>
          );
        })}
      </div>

      {/* Detailed Phase Accordion List */}
      <div className="space-y-6">
        {filteredPhases.map((phase) => {
          const isExpanded = expandedPhase === phase.phaseId;
          const completedCount = phase.steps.filter(s => progress[s.id]).length;
          const totalInPhase = phase.steps.length;

          return (
            <div
              key={phase.phaseId}
              className={`bg-gradient-to-br from-sky-50/50 via-white to-sky-50/60 rounded-3xl border-2 transition-all overflow-hidden ${
                isExpanded ? 'border-primary/50 shadow-md' : 'border-sky-200/90 shadow-xs'
              }`}
            >
              {/* Phase Header */}
              <div
                onClick={() => setExpandedPhase(isExpanded ? null : phase.phaseId)}
                className="p-6 cursor-pointer flex items-center justify-between bg-white hover:bg-sky-50/60 transition-colors"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center font-bold text-white text-base shadow-sm flex-shrink-0 font-philosopher">
                    {phase.phaseId}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-base sm:text-lg font-bold text-primary font-philosopher">{phase.title}</h2>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-instrument bg-sky-100 text-primary border border-sky-200">
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-xs font-instrument text-slate-500">{phase.period} • {phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0 ml-4 font-instrument">
                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-mono font-bold text-primary">
                      {completedCount} dari {totalInPhase} Selesai
                    </span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-sky-50 text-primary border border-sky-200">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Steps inside Phase */}
              {isExpanded && (
                <div className="p-6 border-t-2 border-sky-100 space-y-4 bg-sky-50/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phase.steps.map((step, idx) => {
                      const isDone = Boolean(progress[step.id]);

                      return (
                        <div
                          key={step.id}
                          className={`p-5 rounded-2xl border-2 transition-all ${
                            isDone
                              ? 'bg-emerald-50/80 border-emerald-200 shadow-xs'
                              : 'bg-white border-sky-100 hover:border-primary/50 shadow-xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-start space-x-3">
                              <button
                                onClick={() => onToggleMilestone(step.id)}
                                className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all ${
                                  isDone
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'border-2 border-sky-300 hover:border-primary bg-white'
                                }`}
                                title={isDone ? 'Tandai belum selesai' : 'Tandai sudah selesai'}
                              >
                                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </button>
                              <div>
                                <h3 className={`text-sm font-bold font-instrument ${isDone ? 'text-emerald-800 line-through' : 'text-slate-800'}`}>
                                  {step.title}
                                </h3>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-primary flex-shrink-0">
                              #{idx + 1}
                            </span>
                          </div>

                          <p className="text-xs font-instrument text-slate-600 pl-8 mb-3 leading-relaxed">
                            {step.desc}
                          </p>

                          {step.tips && (
                            <div className="ml-8 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs flex items-start space-x-2 font-instrument">
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

                  <div className="mt-4 pt-4 border-t border-sky-200 flex justify-end">
                    <button
                      onClick={() => setActiveTab('tracker')}
                      className="flex items-center space-x-2 text-xs font-bold font-instrument text-primary hover:text-primary/80"
                    >
                      <span>Lihat & Validasi di Tracker Progres Mahasiswa</span>
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
