import React from 'react';
import { Flame, Users, User, Timer, Sparkles, LogIn, ChevronDown, Trophy } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenLogin,
  onOpenPomodoro,
  personalStreakTotal = 0,
  teamStreakTotal = 0,
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#090b10]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25 ring-1 ring-white/20">
              <Flame className="w-6 h-6 text-white fill-white animate-flame" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                  STREAK
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                InlitX Style • Rastreador de Rotinas & Hábitos
              </p>
            </div>
          </div>

          {/* MAIN SEPARATED TABS (Versão Exclusiva vs Versão em Conjunto) */}
          <nav className="flex items-center p-1 bg-[#12151e] border border-white/10 rounded-2xl shadow-inner">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'personal'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Versão Exclusiva</span>
              <span className={`text-[10px] hidden md:inline-block px-1.5 py-0.2 rounded-full ${
                activeTab === 'personal' ? 'bg-white/20 text-white' : 'bg-black/30 text-slate-500'
              }`}>
                Pessoal
              </span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'team'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Versão em Conjunto</span>
              <span className={`text-[10px] hidden md:inline-block px-1.5 py-0.2 rounded-full ${
                activeTab === 'team' ? 'bg-white/20 text-white' : 'bg-black/30 text-cyan-400 font-mono'
              }`}>
                3 Pessoas
              </span>
            </button>
          </nav>

          {/* Right utilities: Focus Pomodoro, Live Streaks, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Focus Timer Button */}
            <button
              onClick={onOpenPomodoro}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 text-xs font-semibold transition-all"
              title="Abrir Pomodoro Focus"
            >
              <Timer className="w-4 h-4 text-orange-400" />
              <span className="hidden lg:inline">Foco</span>
            </button>

            {/* Streak Counters Pill */}
            <div className="hidden md:flex items-center gap-3 bg-[#131620] border border-white/10 px-3.5 py-1.5 rounded-xl">
              <div className="flex items-center gap-1.5" title="Seu Maior Streak Pessoal">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="text-xs font-mono font-bold text-white">{personalStreakTotal}d</span>
              </div>
              <div className="w-[1px] h-3.5 bg-white/10" />
              <div className="flex items-center gap-1.5" title="Streak do Trio (3 pessoas juntas!)">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-cyan-300">{teamStreakTotal}d time</span>
              </div>
            </div>

            {/* Current User Profile Switcher */}
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#141722] hover:bg-[#1a1f2e] border border-white/10 text-left transition-all group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-base border border-white/10"
                style={{ backgroundColor: `${currentUser?.color || '#f97316'}22` }}
              >
                <span>{currentUser?.avatar || '👤'}</span>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                    {currentUser?.name || 'Emmanuel'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
                </div>
                <span className="text-[10px] text-slate-400 block -mt-0.5">
                  Trocar Perfil
                </span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
