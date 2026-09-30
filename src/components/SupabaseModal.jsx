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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Konfigurasi Database Cloud Supabase</h2>
            <p className="text-xs text-slate-500">
              Sinkronisasi data skripsi angkatan Informatika '23 ke database server online
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className={`p-4 rounded-xl mb-6 border text-xs flex items-center justify-between ${
          isSupabaseConfigured
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span>Status Saat Ini: <strong>{isSupabaseConfigured ? 'Tersambung ke Supabase Cloud' : 'Mode Offline (LocalStorage Browser)'}</strong></span>
          </div>
          {isSupabaseConfigured && (
            <button
              onClick={handleReset}
              className="text-rose-600 hover:underline font-bold"
            >
              Putuskan Koneksi
            </button>
          )}
        </div>

        {/* Step 1: Copy Schema */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Langkah 1: Jalankan Skrip SQL di Dashboard Supabase
            </h3>
            <button
              onClick={handleCopySchema}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-alma-700 transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Tersalin!' : 'Salin Skrip SQL'}</span>
            </button>
          </div>
          
          <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto max-h-36">
            {SUPABASE_SQL_SCHEMA}
          </pre>
          <p className="text-[11px] text-slate-500 mt-1">
            Buka <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-alma-600 hover:underline inline-flex items-center font-semibold">Supabase SQL Editor <ExternalLink className="w-3 h-3 ml-0.5" /></a>, paste kode di atas, lalu klik <strong>Run</strong>.
          </p>
        </div>

        {/* Step 2: Form Credentials */}
        <form onSubmit={handleSaveCredentials} className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Langkah 2: Masukkan Project URL & Anon Key
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Supabase Project URL
            </label>
            <input
              type="url"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-alma-500 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Supabase Anon Public API Key
            </label>
            <input
              type="password"
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-alma-500 font-mono"
              required
            />
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-bold">
              ✓ Berhasil disimpan! Website akan reload untuk mengaktifkan koneksi Supabase...
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-alma-600 hover:bg-alma-700 text-white text-xs font-bold shadow-md shadow-alma-600/20 transition-all"
            >
              Simpan & Hubungkan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
