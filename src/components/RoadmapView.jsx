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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-alma-600 mb-1">
            <Compass className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Panduan Langkah Demi Langkah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Roadmap Skripsi Informatika '23
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Peta jalan terstruktur dari magang 3 bulan, penyusunan draf Bab 1-3, 
            <strong className="text-alma-700"> Seminar Proposal Bersama di bulan Januari</strong>, hingga pendadaran dan wisuda.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-alma-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Fase (1–4)
          </button>
          <button
            onClick={() => setFilterMode('current')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterMode === 'current'
                ? 'bg-alma-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
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
              className={`p-4 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-alma-50/70 border-alma-400 ring-2 ring-alma-200 shadow-sm'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  isPhaseDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : isSelected
                    ? 'bg-alma-100 text-alma-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  Fase {phase.phaseId}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {completedCount}/{totalInPhase}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 truncate">{phase.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{phase.period}</p>
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
                isExpanded ? 'border-alma-300 shadow-md' : 'border-slate-200'
              }`}
            >
              {/* Phase Header */}
              <div
                onClick={() => setExpandedPhase(isExpanded ? null : phase.phaseId)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between bg-white hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${phase.color} flex items-center justify-center font-extrabold text-white text-base shadow-md flex-shrink-0`}>
                    {phase.phaseId}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-base sm:text-lg font-bold text-slate-800">{phase.title}</h2>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{phase.period} • {phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-mono font-bold text-alma-700">
                      {completedCount} dari {totalInPhase} Selesai
                    </span>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-100 text-slate-500">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Steps inside Phase */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-200 space-y-4 bg-slate-50/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phase.steps.map((step, idx) => {
                      const isDone = Boolean(progress[step.id]);

                      return (
                        <div
                          key={step.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            isDone
                              ? 'bg-emerald-50/70 border-emerald-200'
                              : 'bg-white border-slate-200 hover:border-alma-200 shadow-xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-start space-x-3">
                              <button
                                onClick={() => onToggleMilestone(step.id)}
                                className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all ${
                                  isDone
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'border border-slate-300 hover:border-alma-500 bg-white'
                                }`}
                                title={isDone ? 'Tandai belum selesai' : 'Tandai sudah selesai'}
                              >
                                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </button>
                              <div>
                                <h3 className={`text-sm font-bold ${isDone ? 'text-emerald-800 line-through' : 'text-slate-800'}`}>
                                  {step.title}
                                </h3>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                              #{idx + 1}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 pl-8 mb-3 leading-relaxed">
                            {step.desc}
                          </p>

                          {step.tips && (
                            <div className="ml-8 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                              <span className="text-[11px] leading-relaxed">
                                <strong className="text-amber-800">Tips: </strong>
                                {step.tips}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
                    <button
                      onClick={() => setActiveTab('tracker')}
                      className="flex items-center space-x-2 text-xs font-bold text-alma-600 hover:text-alma-700"
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
