import React, { useState } from 'react';
import { 
  ROADMAP_PHASES 
} from '../data/milestones';
import { 
  Compass, 
  CheckCircle2, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Filter,
  Check,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function RoadmapView({ progress, onToggleMilestone, setActiveTab }) {
  const [expandedPhase, setExpandedPhase] = useState(1);
  const [filterMode, setFilterMode] = useState('all'); // 'all' or 'current'

  const filteredPhases = filterMode === 'current' 
    ? ROADMAP_PHASES.filter(p => p.phaseId <= 2)
    : ROADMAP_PHASES;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-alma-400 mb-1">
            <Compass className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Panduan Langkah Demi Langkah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Roadmap Skripsi Informatika '23
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Peta jalan terstruktur dari magang 3 bulan, penyusunan draf Bab 1-3, 
            <strong> Seminar Proposal Bersama di bulan Januari</strong>, hingga pendadaran dan wisuda.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterMode === 'all'
                ? 'bg-alma-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua Fase (1–4)
          </button>
          <button
            onClick={() => setFilterMode('current')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterMode === 'current'
                ? 'bg-alma-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
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
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-slate-900 border-alma-500 ring-2 ring-alma-500/20 shadow-lg'
                  : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  isPhaseDone
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : isSelected
                    ? 'bg-alma-500/20 text-alma-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  Fase {phase.phaseId}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {completedCount}/{totalInPhase} Selesai
                </span>
              </div>
              <h3 className="text-sm font-bold text-white truncate">{phase.title}</h3>
              <p className="text-[11px] text-slate-400 mt-1">{phase.period}</p>
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
              className={`glass-card rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'border-alma-500/50 shadow-xl shadow-alma-950/20' : 'border-slate-800/80'
              }`}
            >
              {/* Phase Header */}
              <div
                onClick={() => setExpandedPhase(isExpanded ? null : phase.phaseId)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${phase.color} flex items-center justify-center font-extrabold text-white text-base shadow-md flex-shrink-0`}>
                    {phase.phaseId}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-base sm:text-lg font-bold text-white">{phase.title}</h2>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{phase.period} • {phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-mono font-bold text-alma-400">
                      {completedCount} dari {totalInPhase} Selesai
                    </span>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Steps inside Phase */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-800/80 space-y-4 bg-slate-950/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phase.steps.map((step, idx) => {
                      const isDone = Boolean(progress[step.id]);

                      return (
                        <div
                          key={step.id}
                          className={`p-4 rounded-xl border transition-all ${
                            isDone
                              ? 'bg-emerald-950/20 border-emerald-800/40'
                              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-start space-x-3">
                              <button
                                onClick={() => onToggleMilestone(step.id)}
                                className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all ${
                                  isDone
                                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                                    : 'border border-slate-600 hover:border-alma-400 bg-slate-800'
                                }`}
                                title={isDone ? 'Tandai belum selesai' : 'Tandai sudah selesai'}
                              >
                                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </button>
                              <div>
                                <h3 className={`text-sm font-bold ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                                  {step.title}
                                </h3>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">
                              #{idx + 1}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 pl-8 mb-3 leading-relaxed">
                            {step.desc}
                          </p>

                          {step.tips && (
                            <div className="ml-8 p-2.5 rounded-lg bg-amber-950/20 border border-amber-800/30 text-amber-200/90 text-xs flex items-start space-x-2">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                              <span className="text-[11px] leading-relaxed">
                                <strong className="text-amber-300">Tips: </strong>
                                {step.tips}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => setActiveTab('tracker')}
                      className="flex items-center space-x-2 text-xs font-semibold text-alma-400 hover:text-alma-300"
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
