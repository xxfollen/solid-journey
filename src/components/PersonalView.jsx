import React, { useState, useMemo } from 'react';
import { Plus, Flame, CheckCircle2, Clock, Filter, Sparkles, Trophy, Calendar, Award } from 'lucide-react';
import HabitCard from './HabitCard';
import Heatmap from './Heatmap';

export default function PersonalView({
  currentUser,
  habits = [],
  onToggleToday,
  onAddHabit,
  onEditHabit,
  onDeleteHabit,
  onFreezeHabit,
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // all, pending, done, category
  const [selectedCategory, setSelectedCategory] = useState('all');

  const todayIso = new Date().toISOString().split('T')[0];

  // Calculate statistics
  const stats = useMemo(() => {
    const total = habits.length;
    let doneTodayCount = 0;
    let maxCurrentStreak = 0;
    let maxBestStreak = 0;

    habits.forEach((h) => {
      if (h.history && h.history[todayIso]) doneTodayCount++;
      if (h.currentStreak > maxCurrentStreak) maxCurrentStreak = h.currentStreak;
      if (h.bestStreak > maxBestStreak) maxBestStreak = h.bestStreak;
    });

    const completionRate = total > 0 ? Math.round((doneTodayCount / total) * 100) : 0;

    return {
      total,
      doneTodayCount,
      completionRate,
      maxCurrentStreak,
      maxBestStreak,
    };
  }, [habits, todayIso]);

  // Unique categories
  const categories = useMemo(() => {
    const cats = new Set();
    habits.forEach((h) => {
      if (h.category) cats.add(h.category);
    });
    return Array.from(cats);
  }, [habits]);

  // Filtered habits
  const filteredHabits = useMemo(() => {
    return habits.filter((h) => {
      const isDone = Boolean(h.history && h.history[todayIso]);
      if (activeFilter === 'pending' && isDone) return false;
      if (activeFilter === 'done' && !isDone) return false;
      if (selectedCategory !== 'all' && h.category !== selectedCategory) return false;
      return true;
    });
  }, [habits, activeFilter, selectedCategory, todayIso]);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Hero Banner for Personal View */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#151926] via-[#12151f] to-[#0d0f17] border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl ring-2 ring-white/10"
              style={{ backgroundColor: `${currentUser?.color || '#f97316'}22` }}
            >
              <span>{currentUser?.avatar || '👨‍💻'}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                  Espaço Exclusivo & Privado
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-medium">Apenas você tem acesso</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Olá, {currentUser?.name}! 🔥
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {stats.doneTodayCount === stats.total && stats.total > 0
                  ? 'Incrível! Todas as suas tarefas e hábitos de hoje foram concluídos! 🏆'
                  : `Você já completou ${stats.doneTodayCount} de ${stats.total} hábitos hoje (${stats.completionRate}%). Continue o ritmo!`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddHabit}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl shadow-orange-500/25 transition-all duration-200 active:scale-95"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Novo Hábito Pessoal</span>
            </button>
          </div>
        </div>

        {/* 4 Key Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/5">
          <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Progresso Hoje</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white font-mono">
                {stats.doneTodayCount}/{stats.total}
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                {stats.completionRate}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>

          <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Maior Sequência Atual</span>
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-orange-400 font-mono">
                {stats.maxCurrentStreak}
              </span>
              <span className="text-xs text-slate-400">dias seguidos</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Constância ininterrupta 🔥</p>
          </div>

          <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Recorde Histórico</span>
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-amber-300 font-mono">
                {stats.maxBestStreak}
              </span>
              <span className="text-xs text-slate-400">dias</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Sua melhor marca pessoal 🏆</p>
          </div>

          <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Hábitos Registrados</span>
              <Award className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                {stats.total}
              </span>
              <span className="text-xs text-slate-400">rotinas ativas</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">100% sob seu controle</p>
          </div>
        </div>

      </div>

      {/* Visual Activity Heatmap */}
      <Heatmap habits={habits} title={`Mapa de Sequência de ${currentUser?.name}`} />

      {/* Filter and Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-white/15 text-white shadow-sm'
                : 'bg-[#12151e] text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos ({habits.length})
          </button>

          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'pending'
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                : 'bg-[#12151e] text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pendentes ({habits.length - stats.doneTodayCount})</span>
          </button>

          <button
            onClick={() => setActiveFilter('done')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'done'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-[#12151e] text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Concluídos ({stats.doneTodayCount})</span>
          </button>
        </div>

        {/* Category filter dropdown */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filtrar:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#12151e] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="all">Todas as Categorias</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Habit Cards Grid */}
      {filteredHabits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleToday={onToggleToday}
              onEdit={onEditHabit}
              onDelete={onDeleteHabit}
              onFreeze={onFreezeHabit}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#12151e] border border-white/10 rounded-3xl p-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 mx-auto flex items-center justify-center text-3xl mb-4">
            🔥
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            Nenhum hábito encontrado neste filtro
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Adicione uma nova rotina para começar a construir sequências consistentes.
          </p>
          <button
            onClick={onAddHabit}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
          >
            + Criar Primeiro Hábito
          </button>
        </div>
      )}

    </div>
  );
}
