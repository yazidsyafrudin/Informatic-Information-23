import React, { useState, useMemo } from 'react';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Heart, 
  Sparkles, 
  Code2, 
  Laptop, 
  Rocket, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Map, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  DownloadCloud, 
  ArrowRight,
  Coffee,
  Target,
  Cpu,
  HelpCircle,
  Building2,
  BookCheck,
  Flame
} from 'lucide-react';
import { MAHASISWA_IF23_LIST } from '../data/mahasiswaIf23';

export default function AboutView({ setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter 40 Mahasiswa berdasarkan pencarian nama atau NIM
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return MAHASISWA_IF23_LIST;
    const query = searchQuery.toLowerCase().trim();
    return MAHASISWA_IF23_LIST.filter(m => 
      m.nama.toLowerCase().includes(query) || 
      m.nim.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Palet warna acak konsisten untuk avatar inisial
  const getAvatarBg = (name) => {
    const colors = [
      'bg-primary',
      'bg-accent',
      'bg-emerald-600',
      'bg-indigo-600',
      'bg-rose-600',
      'bg-amber-600',
      'bg-cyan-600',
      'bg-purple-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-12 font-instrument text-slate-800">
      
      {/* 1. HERO SECTION - Solid Blue UAA Style */}
      <section className="relative overflow-hidden rounded-3xl bg-primary text-white p-8 sm:p-12 lg:p-16 text-center shadow-xl border-2 border-primary-700">
        {/* Glow ambient decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Logo dengan Ring Hover */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white/20 shadow-2xl backdrop-blur-md mb-6 transition-transform duration-300 hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <img 
                src="/logo pusing coding.png" 
                alt="Logo Pusing Coding" 
                className="w-full h-full object-contain p-1"
              />
            </div>
          </div>

          {/* Badge Prodi & Akreditasi */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 text-white border border-white/25 text-xs font-bold shadow-xs mb-4 backdrop-blur-xs">
            <Award className="w-4 h-4 text-accent" />
            <span>S1 Informatika • Universitas Alma Ata Yogyakarta</span>
          </div>

          {/* Heading Philosopher */}
          <h1 className="font-philosopher font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4">
            Tentang Kami: <span className="text-accent">Pusing Coding IF23</span>
          </h1>

          <p className="text-white/90 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Portal terpadu, ruang perjuangan, dan wadah solidaritas 40 mahasiswa 
            <strong className="text-white font-bold"> Informatika Angkatan 2023</strong>. 
            Dari hari pertama masuk kelas, pusing debugging error bareng, hingga melangkah serentak ke panggung wisuda Sarjana Komputer!
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl pt-2">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-xs">
              <span className="block font-philosopher text-2xl sm:text-3xl font-bold text-accent">40</span>
              <span className="text-xs text-white/80 font-medium">Mahasiswa Seangkatan</span>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-xs">
              <span className="block font-philosopher text-2xl sm:text-3xl font-bold text-white">ASIIN</span>
              <span className="text-xs text-white/80 font-medium">Akreditasi Internasional</span>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-xs">
              <span className="block font-philosopher text-2xl sm:text-3xl font-bold text-accent">100%</span>
              <span className="text-xs text-white/80 font-medium">Target Lulus Bareng</span>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-xs">
              <span className="block font-philosopher text-2xl sm:text-3xl font-bold text-white">S.Kom</span>
              <span className="text-xs text-white/80 font-medium">Gelar Kebanggaan</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CERITA & FILOSOFI "PUSING CODING" */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-primary/20 shadow-md">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <Coffee className="w-3.5 h-3.5 text-accent" />
              <span>Filosofi & Kisah di Balik Nama</span>
            </div>
            <h2 className="font-philosopher font-bold text-2xl sm:text-4xl text-primary">
              Kenapa Dinamakan "Pusing Coding"?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
            <div className="md:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                Setiap mahasiswa teknik informatika tahu persis rasanya ketika kode program yang dibuat berjam-jam tiba-tiba menampilkan <span className="font-mono bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-bold text-xs">Error 500</span>, <span className="font-mono bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-bold text-xs">SyntaxError</span>, atau logika algoritma yang tak kunjung menemukan titik temu.
              </p>
              <p>
                Nama <strong className="text-primary font-bold">"Pusing Coding"</strong> awalnya adalah gurauan akrab di kelas dan laboratorium saat kami mengerjakan tugas praktikum hingga larut. Namun lambat laun, rasa "pusing" itu berevolusi menjadi sebuah <em>identitas kebersamaan</em>.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 py-1 italic text-slate-600 bg-amber-50/50 rounded-r-xl">
                "Kalau pusing sendirian bisa bikin putus asa, tapi kalau pusingnya bareng teman seangkatan, itu jadi tawa, cerita, dan semangat untuk saling bantu sampai kodenya running!"
              </blockquote>
              <p>
                Platform ini didirikan agar tidak ada satupun kawan di Informatika 2023 yang berjuang sendirian. Mulai dari urusan magang industri/MSIB, bimbingan proposal, Turnitin, hingga wisuda, kami menjalaninya sebagai satu kesatuan.
              </p>
            </div>

            <div className="md:col-span-5 space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 space-y-1.5">
                <div className="flex items-center space-x-2 text-primary font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span className="font-philosopher">1. Solidaritas Tanpa Batas</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tidak ada yang ditinggalkan di belakang. Masalah satu mahasiswa adalah perhatian bersama seangkatan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <Code2 className="w-4 h-4 text-accent" />
                  <span className="font-philosopher">2. Kolaborasi Terbuka</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Berbagi referensi jurnal, template dokumen FKT, tips lolos sempro, dan review source code secara transparan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span className="font-philosopher">3. Komitmen Lulus Bersama</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menjaga ritme target dari sempro serentak hingga siap mengenakan toga kelulusan di Gedung Sportorium Alma Ata.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI ANGKATAN */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visi */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <Rocket className="w-3.5 h-3.5 text-accent" />
              <span>Visi Angkatan IF23</span>
            </div>
            <h3 className="font-philosopher font-bold text-2xl text-primary">
              The Globe Inspiring Generation
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Mewujudkan mahasiswa S1 Informatika Angkatan 2023 Universitas Alma Ata yang unggul dalam penguasaan rekayasa perangkat lunak, sains data, dan kecerdasan buatan, berintegritas tinggi, berakhlak mulia, serta berhasil <strong className="text-primary font-bold">lulus 100% tepat waktu</strong> sebagai Sarjana Komputer yang berdaya saing global.
            </p>
          </div>
          <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-primary">
            <span>Satu Visi • Satu Hati • Sarjana Komputer UAA</span>
          </div>
        </div>

        {/* Misi */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-accent/30 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold">
              <Target className="w-3.5 h-3.5 text-accent" />
              <span>Misi Aksi Nyata</span>
            </div>
            <h3 className="font-philosopher font-bold text-2xl text-slate-900">
              Pilar Aksi Menuju Kelulusan
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Pendampingan Proposal & Skripsi:</strong> Menyelenggarakan forum diskusi intensif, peninjauan Turnitin, dan persiapan berkas sempro.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Akses Informasi Terpadu:</strong> Menyediakan kalender akademik, jadwal yudisium, dan pusat berkas resmi FKT dalam satu pintu.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Penguatan Komunitas Digital:</strong> Memanfaatkan portal berbasis AI dan forum terbuka untuk saling bertukar solusi seputar magang dan karir IT.</span>
              </li>
            </ul>
          </div>
          <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-accent">
            <span>Fakultas Sains, Rekayasa dan Teknologi • UAA</span>
          </div>
        </div>
      </section>

      {/* 4. DIREKTORI 40 MAHASISWA INFORMATIKA ANGKATAN 2023 */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-primary/20 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5 text-accent" />
              <span>Daftar Resmi Mahasiswa</span>
            </div>
            <h2 className="font-philosopher font-bold text-2xl sm:text-3xl text-primary">
              Keluarga Besar Informatika 2023
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Terdiri dari 40 mahasiswa yang tercatat resmi menempuh program studi S1 Informatika UAA.
            </p>
          </div>

          {/* Kolom Pencarian */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau NIM..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Menampilkan <strong className="text-primary font-bold">{filteredStudents.length}</strong> dari 40 mahasiswa</span>
          <span className="text-[11px] font-mono">Sumber: Dokumen NIM IF23 UAA</span>
        </div>

        {/* Grid 40 Mahasiswa */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <HelpCircle className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-semibold">Mahasiswa tidak ditemukan</p>
            <p className="text-xs">Coba cari dengan kata kunci nama depan atau nomor NIM yang sesuai.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredStudents.map((mhs) => (
              <div 
                key={mhs.nim}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-primary/40 hover:shadow-md transition-all duration-200 flex items-center space-x-3 group"
              >
                {/* Avatar Inisial */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs flex-shrink-0 font-philosopher ${getAvatarBg(mhs.nama)} group-hover:scale-105 transition-transform`}>
                  {mhs.nama.charAt(0).toUpperCase()}
                </div>

                {/* Info Mahasiswa */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                      {mhs.nama}
                    </span>
                    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-500">
                      #{mhs.no}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="font-mono text-[11px] text-slate-500 font-semibold">
                      {mhs.nim}
                    </span>
                    <span className="text-[10px] text-primary/70 font-semibold">
                      • IF '23
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. SHOWCASE EKOSISTEM PORTAL WEB INFORMATIKA 23 */}
      <section className="bg-gradient-to-br from-primary-900 to-primary text-white rounded-3xl p-6 sm:p-10 border-2 border-primary-700 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Ekosistem Aplikasi Digital</span>
          </div>
          <h2 className="font-philosopher font-bold text-2xl sm:text-4xl text-white">
            Fitur Canggih Portal Pusing Coding
          </h2>
          <p className="text-xs sm:text-sm text-white/80">
            Dibuat khusus untuk mempermudah perjalanan akademik mahasiswa dari magang hingga wisuda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Roadmap */}
          <div 
            onClick={() => setActiveTab('roadmap')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-md">
                <Map className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Roadmap Kelulusan
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Panduan komprehensif 5 fase kelulusan FKT: dari magang industri, sempro, revisi, ujian skripsi, hingga wisuda.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Buka Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Dashboard Mahasiswa */}
          <div 
            onClick={() => setActiveTab('tracker')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Dashboard & Milestone Tracker
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Pantau progres skripsi pribadi, target kalender belajar, skor AAEPT, dan persentase Turnitin secara real-time.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Buka Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Ruang Diskusi & AI */}
          <div 
            onClick={() => setActiveTab('diskusi')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-md">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Forum Diskusi & AI Assistant
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Ruang obrolan bertopik (Umum, Magang, Sempro) dengan gaya komentar TikTok, fitur edit batas 2 menit, dan AI Bot FKT.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Masuk Ruang Diskusi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Kalender Akademik */}
          <div 
            onClick={() => setActiveTab('kalender')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Kalender Akademik Terpadu
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Agenda resmi UAA, batas pendaftaran sempro, jadwal sidang yudisium berkala, serta daftar libur universitas.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Lihat Kalender</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Panduan FKT */}
          <div 
            onClick={() => setActiveTab('panduan')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Buku Panduan Skripsi FKT
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Viewer PDF interaktif pedoman penulisan skripsi SK Rektor No. 182/A/SK/UAA/IX/2021 lengkap dengan daftar bab.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Baca Panduan PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: Pusat Unduhan */}
          <div 
            onClick={() => setActiveTab('downloads')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-md">
                <DownloadCloud className="w-5 h-5" />
              </div>
              <h3 className="font-philosopher font-bold text-lg text-white group-hover:text-accent transition-colors">
                Pusat Berkas & Template
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Unduh template resmi naskah proposal, lembar pengesahan, form bimbingan dosen, dan dokumen pelengkap FKT.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Buka Berkas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. ALMAMATER & INFORMASI KAMPUS */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-primary/20 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mb-4 bg-white p-2">
              <img 
                src="/logo pusing coding.png" 
                alt="Universitas Alma Ata" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-philosopher font-bold text-lg text-primary">
              Universitas Alma Ata
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Fakultas Sains, Rekayasa dan Teknologi
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-accent text-white text-[11px] font-bold">
              Akreditasi Unggul & ASIIN
            </span>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <Building2 className="w-3.5 h-3.5 text-accent" />
              <span>Kampus & Sekretariat</span>
            </div>
            <h3 className="font-philosopher font-bold text-2xl text-slate-900">
              Rumah Belajar Kami di Yogyakarta
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kampus Terpadu Universitas Alma Ata berlokasi di Jl. Brawijaya No.99, Tamantirto, Kasihan, Bantul, Daerah Istimewa Yogyakarta 55183. Kampus ini menjadi saksi proses pembelajaran kami dalam mendalami teknologi informasi, kecerdasan buatan, dan sains komputasi.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                🌐 almaata.ac.id
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                📍 Tamantirto, Bantul, DIY
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                🎓 Angkatan 2023 • Wisuda 2025/2026
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
