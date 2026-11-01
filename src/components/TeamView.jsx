import React, { useState } from 'react';
import {
  Users,
  Flame,
  Trophy,
  Check,
  Plus,
  Send,
  Sparkles,
  Zap,
  MessageSquare,
  Bell,
  Heart,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessSound, playStreakCelebrationSound } from '../utils/audio';

export default function TeamView({
  users = [],
  currentUserId,
  teamHabits = [],
  feed = [],
  onToggleTeamMemberCheck,
  onAddTeamHabit,
  onAddFeedReaction,
  onNudgeMember,
  personalHabitsMap = {},
}) {
  const [newTeamHabitTitle, setNewTeamHabitTitle] = useState('');
  const [newTeamHabitCategory, setNewTeamHabitCategory] = useState('Desafio do Trio');
  const [isAddingHabit, setIsAddingHabit] = useState(false);

  const todayIso = new Date().toISOString().split('T')[0];

  // Calculate team collective streak (max of team streaks)
  const maxTeamStreak = teamHabits.reduce((acc, h) => Math.max(acc, h.teamStreak || 0), 0);

  // Calculate today's completion per user across shared habits
  const memberCompletionStats = users.map((user) => {
    let completedCount = 0;
    let totalCount = teamHabits.length;

    teamHabits.forEach((habit) => {
      const todayChecks = habit.dailyCompletions?.[todayIso] || {};
      if (todayChecks[user.id]) {
        completedCount++;
      }
    });

    // Also get their personal habit count if available
    const personalList = personalHabitsMap[user.id] || [];
    let personalDone = 0;
    personalList.forEach((p) => {
      if (p.history && p.history[todayIso]) personalDone++;
    });

    const isAllDone = totalCount > 0 && completedCount === totalCount;

    return {
      user,
      completedCount,
      totalCount,
      percent: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
      isAllDone,
      personalDone,
      personalTotal: personalList.length,
    };
  });

  const handleCreateTeamHabit = (e) => {
    e.preventDefault();
    if (!newTeamHabitTitle.trim()) return;

    onAddTeamHabit({
      title: newTeamHabitTitle.trim(),
      category: newTeamHabitCategory,
      icon: '⚡',
      color: '#06b6d4',
      description: 'Meta conjunta obrigatória para os 3 membros',
    });

    setNewTeamHabitTitle('');
    setIsAddingHabit(false);
  };

  const handleToggleCheck = (habitId, userId) => {
    // Only allow currentUser to toggle their own checkmark
    if (userId !== currentUserId) {
      alert('Você só pode marcar o seu próprio check-in para manter o desafio justo!');
      return;
    }

    onToggleTeamMemberCheck(habitId, userId);
    playSuccessSound();

    // Trigger confetti if this marks full trio completion
    const habit = teamHabits.find((h) => h.id === habitId);
    if (habit) {
      const currentChecks = habit.dailyCompletions?.[todayIso] || {};
      const alreadyCheckedCount = Object.values(currentChecks).filter(Boolean).length;
      if (!currentChecks[userId] && alreadyCheckedCount === users.length - 1) {
        playStreakCelebrationSound();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#10b981', '#f97316'],
        });
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Team Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1726] via-[#101422] to-[#0c0e15] border border-cyan-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                Versão em Conjunto • 3 Integrantes
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-medium">Sincronizado em Tempo Real</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Desafio do Trio</span>
              <span className="text-base font-normal text-slate-400">
                (Emmanuel, Lucas e Beatriz)
              </span>
            </h2>
            
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Aqui a regra é clara: <strong>o streak do time só avança se os 3 cumprirem as metas diárias</strong>.
              Incentive seus parceiros, mande lembretes e não deixe a chama apagar!
            </p>
          </div>

          {/* Collective Streak Hero Counter */}
          <div className="flex items-center gap-4 bg-black/40 border border-cyan-500/30 p-4 rounded-2xl shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-cyan-400" />
                Sequência do Time
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-white font-mono">
                  {maxTeamStreak}
                </span>
                <span className="text-xs font-semibold text-slate-400">dias seguidos</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">
                Sinergia do mês: 94% 🔥
              </span>
            </div>
          </div>
        </div>

        {/* 3 Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
          {memberCompletionStats.map(({ user, completedCount, totalCount, percent, isAllDone }) => {
            const isMe = user.id === currentUserId;
            return (
              <div
                key={user.id}
                className={`relative rounded-2xl p-4 border transition-all ${
                  isMe
                    ? 'bg-[#151c2e] border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                    : 'bg-[#11141e] border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-white/10 shadow-inner"
                      style={{ backgroundColor: `${user.color || '#06b6d4'}22` }}
                    >
                      <span>{user.avatar || '👤'}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white">{user.name}</h4>
                        {isMe && (
                          <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.2 rounded border border-cyan-500/30">
                            Você
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{user.role}</p>
                    </div>
                  </div>

                  {!isMe && (
                    <button
                      onClick={() => onNudgeMember(user)}
                      className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 text-[11px] font-semibold transition-all flex items-center gap-1"
                      title="Mandar incentivo / cobrança amigável"
                    >
                      <Bell className="w-3 h-3" />
                      <span>Cobrar</span>
                    </button>
                  )}
                </div>

                {/* Status Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Tarefas Conjuntas:</span>
                    <span className={`font-mono font-bold ${isAllDone ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {completedCount}/{totalCount} ({percent}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isAllDone
                          ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                          : 'bg-cyan-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Status de Hoje:</span>
                  {isAllDone ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Concluído
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium">Pendente ({totalCount - completedCount})</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Main Grid: Left = Shared Habits, Right = Activity Feed & Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Shared Habits (2 cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span>Metas & Hábitos do Trio</span>
              </h3>
              <p className="text-xs text-slate-400">
                Cada integrante marca o seu próprio check-in para bater o objetivo diário.
              </p>
            </div>

            <button
              onClick={() => setIsAddingHabit(!isAddingHabit)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Meta Coletiva</span>
            </button>
          </div>

          {/* Inline Add Shared Habit Form */}
          {isAddingHabit && (
            <form
              onSubmit={handleCreateTeamHabit}
              className="bg-[#131620] border border-cyan-500/30 rounded-2xl p-4 space-y-3 animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Criar Nova Meta para os 3</span>
                <button
                  type="button"
                  onClick={() => setIsAddingHabit(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Ex: Treino em conjunto, Leitura do grupo..."
                  value={newTeamHabitTitle}
                  onChange={(e) => setNewTeamHabitTitle(e.target.value)}
                  className="sm:col-span-2 bg-[#090b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <select
                  value={newTeamHabitCategory}
                  onChange={(e) => setNewTeamHabitCategory(e.target.value)}
                  className="bg-[#090b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Desafio do Trio">Desafio do Trio</option>
                  <option value="Trabalho em Equipe">Trabalho em Equipe</option>
                  <option value="Saúde Coletiva">Saúde Coletiva</option>
                  <option value="Comunicação">Comunicação</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  Adicionar ao Painel Coletivo
                </button>
              </div>
            </form>
          )}

          {/* List of Shared Team Habits */}
          <div className="space-y-3.5">
            {teamHabits.map((habit) => {
              const todayChecks = habit.dailyCompletions?.[todayIso] || {};
              const checkedCount = users.filter((u) => todayChecks[u.id]).length;
              const isTrioComplete = checkedCount === users.length;

              return (
                <div
                  key={habit.id}
                  className={`bg-[#12151e] border rounded-2xl p-4 sm:p-5 transition-all shadow-md ${
                    isTrioComplete
                      ? 'border-emerald-500/40 bg-gradient-to-br from-[#12151e] to-[#0f1d1e]'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border border-white/10"
                        style={{ backgroundColor: `${habit.color}22` }}
                      >
                        <span>{habit.icon}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border"
                            style={{
                              color: habit.color,
                              borderColor: `${habit.color}44`,
                              backgroundColor: `${habit.color}15`,
                            }}
                          >
                            {habit.category}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Meta para os 3
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5">
                          {habit.title}
                        </h4>
                      </div>
                    </div>

                    {/* Team Streak badge */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                        <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                        <span className="text-xs font-mono font-bold text-white">
                          {habit.teamStreak || 0}d
                        </span>
                        <span className="text-[10px] text-slate-400">streak conjunto</span>
                      </div>
                      {isTrioComplete && (
                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded-xl flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Trio Feito!
                        </span>
                      )}
                    </div>
                  </div>

                  {habit.description && (
                    <p className="text-xs text-slate-400 mb-4">{habit.description}</p>
                  )}

                  {/* 3 User Check-in Buttons Container */}
                  <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                    <div className="text-[11px] font-medium text-slate-400 mb-2 flex items-center justify-between">
                      <span>Status de conclusão individual hoje:</span>
                      <span className="text-cyan-400 font-mono font-bold">
                        {checkedCount} de {users.length} membros
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {users.map((user) => {
                        const isDone = Boolean(todayChecks[user.id]);
                        const isMe = user.id === currentUserId;

                        return (
                          <button
                            key={user.id}
                            onClick={() => handleToggleCheck(habit.id, user.id)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                              isDone
                                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-sm'
                                : isMe
                                ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20'
                                : 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{user.avatar}</span>
                              <span className="truncate">
                                {user.name} {isMe && '(Você)'}
                              </span>
                            </div>

                            <div
                              className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs ${
                                isDone
                                  ? 'bg-emerald-500 text-white font-bold'
                                  : 'border border-slate-600 text-transparent'
                              }`}
                            >
                              {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '•'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Activity Feed & Podio */}
        <div className="space-y-6">
          
          {/* Trio Leaderboard / Podium */}
          <div className="bg-[#12151e] border border-white/10 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Ranking de Consistência</span>
            </h3>

            <div className="space-y-2.5">
              {users.map((u, idx) => {
                const medals = ['🥇', '🥈', '🥉'];
                const stats = memberCompletionStats.find((s) => s.user.id === u.id);

                return (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-2.5 bg-black/25 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{medals[idx] || '⭐'}</span>
                      <div className="flex items-center gap-2">
                        <span>{u.avatar}</span>
                        <div>
                          <h5 className="text-xs font-bold text-white">{u.name}</h5>
                          <span className="text-[10px] text-slate-400">
                            {idx === 0 ? 'Líder da Semana' : 'Foco Constante'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-orange-400">
                        {stats?.percent || 0}%
                      </span>
                      <span className="block text-[10px] text-slate-500">taxa hoje</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Feed & Celebrations */}
          <div className="bg-[#12151e] border border-white/10 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Mural de Atividades do Trio</span>
            </h3>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {feed.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-black/30 rounded-xl border border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.avatar}</span>
                      <span className="text-xs font-bold text-white">{item.userName}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{item.timeAgo}</span>
                  </div>

                  <p className="text-xs text-slate-300">
                    <span className="text-slate-400">{item.action} </span>
                    <strong className="text-orange-400">{item.target}</strong>
                  </p>

                  {/* Reaction Buttons */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {['🔥', '👏', '⚡', '💪'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => onAddFeedReaction(item.id, emoji)}
                        className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs transition-transform active:scale-125"
                      >
                        {emoji}
                      </button>
                    ))}
                    {item.likes > 0 && (
                      <span className="text-[10px] text-slate-400 ml-1">
                        +{item.likes} reações
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
