import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import PersonalView from './components/PersonalView';
import TeamView from './components/TeamView';
import HabitModal from './components/HabitModal';
import LoginPage from './components/LoginPage';
import AccountSettingsModal from './components/AccountSettingsModal';
import PomodoroModal from './components/PomodoroModal';
import {
  loadAppData,
  saveAppData,
  INITIAL_USERS,
  INITIAL_PERSONAL_HABITS,
  INITIAL_TEAM_HABITS,
  INITIAL_ACTIVITY_FEED,
  getIsoDate,
} from './utils/storage';
import { Flame, RefreshCw } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(() => loadAppData());
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'team'

  // Modal states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [pomodoroTargetHabit, setPomodoroTargetHabit] = useState(null);

  // Active current user
  const currentUser = useMemo(() => {
    if (!data.currentUserId) return null;
    return data.users.find((u) => u.id === data.currentUserId) || null;
  }, [data.users, data.currentUserId]);

  // Personal habits for the current active user
  const currentPersonalHabits = useMemo(() => {
    if (!data.currentUserId) return [];
    return data.personalHabits[data.currentUserId] || [];
  }, [data.personalHabits, data.currentUserId]);

  // Calculate highest streaks
  const personalMaxStreak = useMemo(() => {
    return currentPersonalHabits.reduce((acc, h) => Math.max(acc, h.currentStreak || 0), 0);
  }, [currentPersonalHabits]);

  const teamMaxStreak = useMemo(() => {
    return data.teamHabits.reduce((acc, h) => Math.max(acc, h.teamStreak || 0), 0);
  }, [data.teamHabits]);

  // Persist data on change
  useEffect(() => {
    saveAppData(data);
  }, [data]);

  // Login handler
  const handleLoginSuccess = (userId) => {
    setData((prev) => ({
      ...prev,
      currentUserId: userId,
    }));
  };

  // Logout handler
  const handleLogout = () => {
    setIsSettingsOpen(false);
    setData((prev) => ({
      ...prev,
      currentUserId: null,
    }));
  };

  // Update User Account (password, name, avatar)
  const handleUpdateUser = (updatedUser) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    }));
  };

  // Toggle personal habit check-in for today
  const handleTogglePersonalToday = (habitId) => {
    const today = getIsoDate(0);
    setData((prev) => {
      const userList = prev.personalHabits[prev.currentUserId] || [];
      let completedHabitTitle = '';
      let isDoneNow = false;

      const updatedUserList = userList.map((h) => {
        if (h.id !== habitId) return h;

        const wasDone = Boolean(h.history && h.history[today]);
        const newHistory = { ...(h.history || {}) };
        let newStreak = h.currentStreak || 0;
        let newBest = h.bestStreak || 0;

        if (wasDone) {
          delete newHistory[today];
          newStreak = Math.max(0, newStreak - 1);
          isDoneNow = false;
        } else {
          newHistory[today] = true;
          newStreak += 1;
          if (newStreak > newBest) newBest = newStreak;
          isDoneNow = true;
          completedHabitTitle = h.title;
        }

        return {
          ...h,
          history: newHistory,
          currentStreak: newStreak,
          bestStreak: newBest,
        };
      });

      // Add to feed if completed
      let newFeed = prev.feed;
      if (isDoneNow && completedHabitTitle && currentUser) {
        newFeed = [
          {
            id: `feed_${Date.now()}`,
            userId: currentUser.id,
            userName: currentUser.name,
            avatar: currentUser.avatar,
            action: 'completou o hábito pessoal',
            target: completedHabitTitle,
            timeAgo: 'agora mesmo',
            likes: 1,
            reactions: ['🔥'],
          },
          ...prev.feed,
        ].slice(0, 20);
      }

      return {
        ...prev,
        personalHabits: {
          ...prev.personalHabits,
          [prev.currentUserId]: updatedUserList,
        },
        feed: newFeed,
      };
    });
  };

  // Add/Edit personal habit
  const handleSavePersonalHabit = (habitData) => {
    setData((prev) => {
      const userList = prev.personalHabits[prev.currentUserId] || [];
      let updatedList;

      if (habitData.id) {
        updatedList = userList.map((h) => (h.id === habitData.id ? { ...h, ...habitData } : h));
      } else {
        const newHabit = {
          ...habitData,
          id: `ph_${Date.now()}`,
          currentStreak: 0,
          bestStreak: 0,
          history: {},
        };
        updatedList = [newHabit, ...userList];
      }

      return {
        ...prev,
        personalHabits: {
          ...prev.personalHabits,
          [prev.currentUserId]: updatedList,
        },
      };
    });
  };

  // Delete personal habit
  const handleDeletePersonalHabit = (habitId) => {
    if (!confirm('Deseja realmente remover este hábito?')) return;
    setData((prev) => {
      const userList = prev.personalHabits[prev.currentUserId] || [];
      return {
        ...prev,
        personalHabits: {
          ...prev.personalHabits,
          [prev.currentUserId]: userList.filter((h) => h.id !== habitId),
        },
      };
    });
  };

  // Freeze personal habit
  const handleFreezePersonalHabit = (habitId) => {
    setData((prev) => {
      const userList = prev.personalHabits[prev.currentUserId] || [];
      const updatedList = userList.map((h) => {
        if (h.id === habitId && h.streakFreeze > 0) {
          alert(`❄️ Sequência congelada com sucesso para "${h.title}"! Restam ${h.streakFreeze - 1} proteções.`);
          return { ...h, streakFreeze: h.streakFreeze - 1 };
        }
        return h;
      });
      return {
        ...prev,
        personalHabits: {
          ...prev.personalHabits,
          [prev.currentUserId]: updatedList,
        },
      };
    });
  };

  // Toggle check in Team Habit
  const handleToggleTeamMemberCheck = (habitId, userId) => {
    const today = getIsoDate(0);
    setData((prev) => {
      let completedHabitTitle = '';
      let isDoneNow = false;

      const updatedTeamHabits = prev.teamHabits.map((habit) => {
        if (habit.id !== habitId) return habit;

        const currentDayCompletions = { ...(habit.dailyCompletions?.[today] || {}) };
        const wasDone = Boolean(currentDayCompletions[userId]);

        if (wasDone) {
          delete currentDayCompletions[userId];
          isDoneNow = false;
        } else {
          currentDayCompletions[userId] = true;
          isDoneNow = true;
          completedHabitTitle = habit.title;
        }

        // Check if all 3 members completed today
        const allCompleted = prev.users.every((u) => currentDayCompletions[u.id]);
        let newTeamStreak = habit.teamStreak || 0;
        let newBestTeamStreak = habit.bestTeamStreak || 0;

        if (allCompleted && !wasDone) {
          newTeamStreak += 1;
          if (newTeamStreak > newBestTeamStreak) newBestTeamStreak = newTeamStreak;
        }

        return {
          ...habit,
          teamStreak: newTeamStreak,
          bestTeamStreak: newBestTeamStreak,
          dailyCompletions: {
            ...(habit.dailyCompletions || {}),
            [today]: currentDayCompletions,
          },
        };
      });

      // Add to feed
      let newFeed = prev.feed;
      if (isDoneNow && completedHabitTitle && currentUser) {
        newFeed = [
          {
            id: `feed_${Date.now()}`,
            userId: currentUser.id,
            userName: currentUser.name,
            avatar: currentUser.avatar,
            action: 'completou a tarefa coletiva',
            target: completedHabitTitle,
            timeAgo: 'agora mesmo',
            likes: 1,
            reactions: ['⚡'],
          },
          ...prev.feed,
        ].slice(0, 20);
      }

      return {
        ...prev,
        teamHabits: updatedTeamHabits,
        feed: newFeed,
      };
    });
  };

  // Add new team habit
  const handleAddTeamHabit = (newHabit) => {
    setData((prev) => ({
      ...prev,
      teamHabits: [
        {
          ...newHabit,
          id: `th_${Date.now()}`,
          teamStreak: 0,
          bestTeamStreak: 0,
          dailyCompletions: {
            [getIsoDate(0)]: { [prev.currentUserId]: true },
          },
        },
        ...prev.teamHabits,
      ],
    }));
  };

  // Feed reactions
  const handleAddFeedReaction = (feedId, emoji) => {
    setData((prev) => ({
      ...prev,
      feed: prev.feed.map((f) => {
        if (f.id === feedId) {
          return {
            ...f,
            likes: f.likes + 1,
            reactions: [...(f.reactions || []), emoji],
          };
        }
        return f;
      }),
    }));
  };

  // Friendly nudge
  const handleNudgeMember = (targetUser) => {
    setData((prev) => ({
      ...prev,
      feed: [
        {
          id: `feed_${Date.now()}`,
          userId: currentUser.id,
          userName: currentUser.name,
          avatar: currentUser.avatar,
          action: 'mandou um incentivo de foco para',
          target: `${targetUser.name}! 🔔 Bora bater as metas do trio!`,
          timeAgo: 'agora mesmo',
          likes: 1,
          reactions: ['🔥', '💪'],
        },
        ...prev.feed,
      ],
    }));
    alert(`Incentivo enviado para ${targetUser.name} no mural! 🔥`);
  };

  // Reset to clean 0-streak data
  const handleResetData = () => {
    if (confirm('Deseja resetar todos os dados para o estado inicial limpo (streaks zerados)?')) {
      localStorage.clear();
      setData({
        users: INITIAL_USERS,
        currentUserId: null,
        personalHabits: INITIAL_PERSONAL_HABITS,
        teamHabits: INITIAL_TEAM_HABITS,
        feed: INITIAL_ACTIVITY_FEED,
      });
    }
  };

  // If user is not logged in, render the clean Login Page
  if (!currentUser) {
    return <LoginPage users={data.users} onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLogout={handleLogout}
        onOpenPomodoro={() => {
          setPomodoroTargetHabit(currentPersonalHabits[0]?.title || null);
          setIsPomodoroOpen(true);
        }}
        personalStreakTotal={personalMaxStreak}
        teamStreakTotal={teamMaxStreak}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'personal' ? (
          <PersonalView
            currentUser={currentUser}
            habits={currentPersonalHabits}
            onToggleToday={handleTogglePersonalToday}
            onAddHabit={() => {
              setEditingHabit(null);
              setIsHabitModalOpen(true);
            }}
            onEditHabit={(h) => {
              setEditingHabit(h);
              setIsHabitModalOpen(true);
            }}
            onDeleteHabit={handleDeletePersonalHabit}
            onFreezeHabit={handleFreezePersonalHabit}
          />
        ) : (
          <TeamView
            users={data.users}
            currentUserId={data.currentUserId}
            teamHabits={data.teamHabits}
            feed={data.feed}
            onToggleTeamMemberCheck={handleToggleTeamMemberCheck}
            onAddTeamHabit={handleAddTeamHabit}
            onAddFeedReaction={handleAddFeedReaction}
            onNudgeMember={handleNudgeMember}
            personalHabitsMap={data.personalHabits}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 bg-[#08090d] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>
              Inspirado no visual e filosofia de{' '}
              <a
                href="https://github.com/InlitX/streak"
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 hover:underline font-semibold"
              >
                InlitX/streak
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              title="Restaurar dados limpos (zerar tudo)"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Zerar Dados</span>
            </button>
            <span>•</span>
            <span className="text-slate-400 font-mono">Streak Web v3.0</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <HabitModal
        isOpen={isHabitModalOpen}
        onClose={() => {
          setIsHabitModalOpen(false);
          setEditingHabit(null);
        }}
        onSave={handleSavePersonalHabit}
        initialData={editingHabit}
      />

      <AccountSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
      />

      <PomodoroModal
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
        activeHabitTitle={pomodoroTargetHabit}
      />
    </div>
  );
}
