import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Copy, 
  Check, 
  ExternalLink
} from 'lucide-react';
import { SUPABASE_SQL_SCHEMA, isSupabaseConfigured } from '../lib/supabase';

export default function SupabaseModal({ isOpen, onClose }) {
  const [supabaseUrl, setSupabaseUrl] = useState(localStorage.getItem('IF23_SUPABASE_URL') || '');
  const [supabaseKey, setSupabaseKey] = useState(localStorage.getItem('IF23_SUPABASE_KEY') || '');
  const [isCopied, setIsCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    if (supabaseUrl && supabaseKey) {
      localStorage.setItem('IF23_SUPABASE_URL', supabaseUrl.trim());
      localStorage.setItem('IF23_SUPABASE_KEY', supabaseKey.trim());
      setSaveSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('IF23_SUPABASE_URL');
    localStorage.removeItem('IF23_SUPABASE_KEY');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn font-instrument">
      <div className="relative w-full max-w-2xl bg-primary text-white border-2 border-primary-700 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/15 text-white hover:bg-white/25 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-2xl bg-white/15 text-white border border-white/20">
            <Database className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-philosopher text-white">Konfigurasi Database Cloud Supabase</h2>
            <p className="text-xs text-white/80 font-instrument">
              Sinkronisasi data skripsi angkatan Informatika '23 ke database server online
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className={`p-4 rounded-2xl mb-6 border text-xs flex items-center justify-between font-instrument ${
          isSupabaseConfigured
            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
            : 'bg-white/10 border-white/20 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-accent'}`}></span>
            <span>Status Saat Ini: <strong>{isSupabaseConfigured ? 'Tersambung ke Supabase Cloud' : 'Mode Offline (LocalStorage Browser)'}</strong></span>
          </div>
          {isSupabaseConfigured && (
            <button
              onClick={handleReset}
              className="text-rose-300 hover:text-rose-100 underline font-bold"
            >
              Putuskan Koneksi
            </button>
          )}
        </div>

        {/* Step 1: Copy Schema */}
        <div className="mb-6 font-instrument">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
              Langkah 1: Jalankan Skrip SQL di Dashboard Supabase
            </h3>
            <button
              onClick={handleCopySchema}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold text-white transition-colors border border-white/20"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Tersalin!' : 'Salin Skrip SQL'}</span>
            </button>
          </div>
          
          <pre className="p-4 bg-primary-950 rounded-2xl border border-white/20 text-[11px] font-mono text-slate-200 overflow-x-auto max-h-36">
            {SUPABASE_SQL_SCHEMA}
          </pre>
          <p className="text-[11px] text-white/80 mt-1">
            Buka <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-accent hover:underline inline-flex items-center font-bold">Supabase SQL Editor <ExternalLink className="w-3 h-3 ml-0.5" /></a>, paste kode di atas, lalu klik <strong>Run</strong>.
          </p>
        </div>

        {/* Step 2: Form Credentials */}
        <form onSubmit={handleSaveCredentials} className="space-y-4 font-instrument">
          <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
            Langkah 2: Masukkan Project URL & Anon Key
          </h3>

          <div>
            <label className="block text-xs font-bold text-white/90 mb-1">
              Supabase Project URL
            </label>
            <input
              type="url"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full bg-white border-2 border-primary-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-accent font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/90 mb-1">
              Supabase Anon Public API Key
            </label>
            <input
              type="password"
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full bg-white border-2 border-primary-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-accent font-mono"
              required
            />
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-400/60 text-emerald-200 text-xs text-center font-bold">
              ✓ Berhasil disimpan! Website akan reload untuk mengaktifkan koneksi Supabase...
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/15 text-white hover:bg-white/25 text-xs font-semibold"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white text-xs font-bold shadow-md shadow-accent/25 transition-all"
            >
              Simpan & Hubungkan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
