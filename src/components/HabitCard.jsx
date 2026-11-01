import React from 'react';
import { Flame, Trophy, Snowflake, Check, MoreVertical, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessSound, playStreakCelebrationSound } from '../utils/audio';

export default function HabitCard({
  habit,
  onToggleToday,
  onEdit,
  onDelete,
  onFreeze,
}) {
  const todayIso = new Date().toISOString().split('T')[0];
  const isDoneToday = Boolean(habit.history && habit.history[todayIso]);

  // Handle click with sound and celebration
  const handleCheckIn = (e) => {
    e.stopPropagation();
    onToggleToday(habit.id);

    if (!isDoneToday) {
      playSuccessSound();
      // Check if this achieves a round streak milestone (e.g., 7, 10, 15, 30)
      const newStreak = (habit.currentStreak || 0) + 1;
      if (newStreak % 5 === 0 || newStreak === 7) {
        playStreakCelebrationSound();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#f97316', '#fbbf24', '#10b981', '#3b82f6'],
        });
      }
    }
  };

  // Past 7 days mini strip
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const iso = d.toISOString().split('T')[0];
    const isDone = Boolean(habit.history && habit.history[iso]);
    const dayName = d.toLocaleDateString('pt-BR', { weekday: 'narrow' }).toUpperCase();
    const isToday = i === 6;
    return { iso, isDone, dayName, isToday };
  });

  return (
    <div
      className={`relative group bg-[#131620] hover:bg-[#161a27] border transition-all duration-300 rounded-2xl p-5 shadow-lg ${
        isDoneToday
          ? 'border-orange-500/30 bg-gradient-to-br from-[#131620] to-[#1a151b]'
          : 'border-white/5 hover:border-white/15'
      }`}
    >
      {/* Top row: Category, icon, and options */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-inner border border-white/10"
            style={{ backgroundColor: `${habit.color}22` }}
          >
            <span>{habit.icon || '🔥'}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border"
                style={{
                  color: habit.color,
                  borderColor: `${habit.color}44`,
                  backgroundColor: `${habit.color}15`,
                }}
              >
                {habit.category || 'Geral'}
              </span>

              {habit.timeOfDay && (
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {habit.timeOfDay}
                </span>
              )}
            </div>

            <h4 className="text-base font-bold text-slate-100 mt-1 line-clamp-1 group-hover:text-white transition-colors">
              {habit.title}
            </h4>
          </div>
        </div>

        {/* Action dropdown or quick delete/edit */}
        <div className="flex items-center gap-1 text-slate-500">
          {habit.streakFreeze > 0 && (
            <button
              onClick={() => onFreeze && onFreeze(habit.id)}
              title={`${habit.streakFreeze} congelamentos disponíveis`}
              className="p-1.5 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
            >
              <Snowflake className="w-4 h-4 text-cyan-400/80" />
            </button>
          )}

          <button
            onClick={() => onEdit(habit)}
            className="p-1.5 hover:text-slate-200 transition-colors rounded-lg hover:bg-white/5 text-xs text-slate-400"
            title="Editar hábito"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-1.5 hover:text-rose-400 transition-colors rounded-lg hover:bg-white/5 text-xs text-slate-500 hover:text-slate-300"
            title="Remover"
          >
            ×
          </button>
        </div>
      </div>

      {habit.description && (
        <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {habit.description}
        </p>
      )}

      {/* Mini 7-day sparkline dots */}
      <div className="flex items-center justify-between bg-black/30 rounded-xl px-3 py-2 border border-white/5 mb-4">
        <span className="text-[11px] text-slate-500 font-medium">Últimos 7 dias:</span>
        <div className="flex items-center gap-2">
          {past7Days.map((d) => (
            <div key={d.iso} className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-slate-500 font-bold">{d.dayName}</span>
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition-all ${
                  d.isDone
                    ? 'bg-orange-500 text-white font-bold shadow-sm shadow-orange-500/50'
                    : d.isToday
                    ? 'border-2 border-dashed border-orange-500/60 bg-transparent'
                    : 'bg-[#1e2330] text-slate-600'
                }`}
              >
                {d.isDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stats and check-in button */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <div className="flex items-center gap-3">
          {/* Streak pill */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              habit.currentStreak > 0
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <Flame
              className={`w-4 h-4 ${
                habit.currentStreak > 0 ? 'text-orange-500 fill-orange-500 animate-flame' : 'text-slate-500'
              }`}
            />
            <span className="text-sm font-bold">{habit.currentStreak || 0}</span>
            <span className="text-[11px] font-medium text-slate-400">dias</span>
          </div>

          {/* Record pill */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Recorde:</span>
            <span className="font-semibold text-slate-200">{habit.bestStreak || 0}d</span>
          </div>
        </div>

        {/* 1-Click Check-in Toggle Button */}
        <button
          onClick={handleCheckIn}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shadow-md ${
            isDoneToday
              ? 'bg-emerald-500 text-white shadow-emerald-500/30 hover:bg-emerald-600'
              : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 hover:shadow-orange-500/40'
          }`}
        >
          {isDoneToday ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Concluído!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Fazer Check-in</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
