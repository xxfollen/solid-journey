// Storage manager for Streak app

// Generate dates for history
export function getIsoDate(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

export const INITIAL_USERS = [
  {
    id: 'u1',
    name: 'Emmanuel',
    email: 'emmanuel@streak.app',
    avatar: '👨‍💻',
    role: 'Líder / Rotina',
    color: '#f97316', // orange
    colorClass: 'orange',
    isCurrentUser: true,
  },
  {
    id: 'u2',
    name: 'Lucas',
    email: 'lucas@streak.app',
    avatar: '⚡',
    role: 'Design & Foco',
    color: '#06b6d4', // cyan
    colorClass: 'cyan',
    isCurrentUser: false,
  },
  {
    id: 'u3',
    name: 'Beatriz',
    email: 'beatriz@streak.app',
    avatar: '🎯',
    role: 'Estratégia & Saúde',
    color: '#10b981', // emerald
    colorClass: 'emerald',
    isCurrentUser: false,
  },
];

// Generate sample completed dates for a realistic streak
function generateHistory(streakDays, skipChances = 0.08, daysCount = 90) {
  const dates = {};
  const today = new Date();
  
  // Current ongoing streak
  for (let i = 0; i < streakDays; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates[d.toISOString().split('T')[0]] = true;
  }
  
  // Past sporadic completions
  for (let i = streakDays + 1; i < daysCount; i++) {
    if (Math.random() > skipChances) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dates[d.toISOString().split('T')[0]] = true;
    }
  }
  return dates;
}

export const INITIAL_PERSONAL_HABITS = {
  // u1: Emmanuel
  u1: [
    {
      id: 'ph_1',
      title: 'Beber 2.5L de Água',
      description: 'Manter hidratação ao longo do dia em garrafa graduada',
      category: 'Saúde',
      color: '#06b6d4',
      icon: '💧',
      currentStreak: 16,
      bestStreak: 28,
      streakFreeze: 2,
      timeOfDay: 'Dia Todo',
      createdAt: getIsoDate(60),
      history: generateHistory(16, 0.1, 90),
    },
    {
      id: 'ph_2',
      title: 'Estudo Deep Work (2 Horas)',
      description: 'Programação avançada, arquitetura e leitura técnica sem celular',
      category: 'Foco & Carreira',
      color: '#f97316',
      icon: '💻',
      currentStreak: 12,
      bestStreak: 19,
      streakFreeze: 1,
      timeOfDay: 'Manhã',
      createdAt: getIsoDate(45),
      history: generateHistory(12, 0.15, 90),
    },
    {
      id: 'ph_3',
      title: 'Treino de Força / Academia',
      description: 'Treino de musculação ou calistenia com progressão de carga',
      category: 'Fitness',
      color: '#ef4444',
      icon: '🏋️‍♂️',
      currentStreak: 7,
      bestStreak: 21,
      streakFreeze: 1,
      timeOfDay: 'Tarde',
      createdAt: getIsoDate(50),
      history: generateHistory(7, 0.2, 90),
    },
    {
      id: 'ph_4',
      title: 'Leitura de 15 Páginas',
      description: 'Livro físico sobre desenvolvimento pessoal ou negócios',
      category: 'Mente',
      color: '#8b5cf6',
      icon: '📖',
      currentStreak: 22,
      bestStreak: 30,
      streakFreeze: 3,
      timeOfDay: 'Noite',
      createdAt: getIsoDate(75),
      history: generateHistory(22, 0.05, 90),
    },
    {
      id: 'ph_5',
      title: 'Sono Limpo (Dormir até 23h30)',
      description: 'Desconectar telas 30 minutos antes e sono reparador',
      category: 'Saúde',
      color: '#3b82f6',
      icon: '🌙',
      currentStreak: 5,
      bestStreak: 14,
      streakFreeze: 0,
      timeOfDay: 'Noite',
      createdAt: getIsoDate(30),
      history: generateHistory(5, 0.25, 90),
    },
  ],
  // u2: Lucas
  u2: [
    {
      id: 'ph_l1',
      title: 'Design UI Diário',
      description: 'Exploração de 1 componente ou microinteração no Figma',
      category: 'Criatividade',
      color: '#ec4899',
      icon: '🎨',
      currentStreak: 9,
      bestStreak: 15,
      streakFreeze: 1,
      timeOfDay: 'Tarde',
      createdAt: getIsoDate(40),
      history: generateHistory(9, 0.15, 90),
    },
    {
      id: 'ph_l2',
      title: 'Caminhada 6.000 Passos',
      description: 'Pausa ativa e ar livre pós almoço',
      category: 'Saúde',
      color: '#10b981',
      icon: '👟',
      currentStreak: 14,
      bestStreak: 20,
      streakFreeze: 2,
      timeOfDay: 'Manhã',
      createdAt: getIsoDate(60),
      history: generateHistory(14, 0.1, 90),
    },
  ],
  // u3: Beatriz
  u3: [
    {
      id: 'ph_b1',
      title: 'Meditação Mindfulness 15m',
      description: 'Respiração guiada e presença plena ao acordar',
      category: 'Bem-Estar',
      color: '#8b5cf6',
      icon: '🧘‍♀️',
      currentStreak: 19,
      bestStreak: 25,
      streakFreeze: 2,
      timeOfDay: 'Manhã',
      createdAt: getIsoDate(50),
      history: generateHistory(19, 0.08, 90),
    },
    {
      id: 'ph_b2',
      title: 'Revisão Semanal de Metas',
      description: 'Planejamento e alinhamento de prioridades diárias',
      category: 'Produtividade',
      color: '#f59e0b',
      icon: '📊',
      currentStreak: 8,
      bestStreak: 16,
      streakFreeze: 1,
      timeOfDay: 'Noite',
      createdAt: getIsoDate(35),
      history: generateHistory(8, 0.12, 90),
    },
  ],
};

// Shared team habits for the 3 members!
export const INITIAL_TEAM_HABITS = [
  {
    id: 'th_1',
    title: 'Desafio Fitness Coletivo (30m de Exercício)',
    description: 'Cada membro cumpre 30 minutos de atividade física no dia',
    category: 'Desafio do Trio',
    icon: '⚡',
    color: '#f97316',
    teamStreak: 11,
    bestTeamStreak: 18,
    // Daily checks per user: { '2026-11-01': { u1: true, u2: true, u3: false } }
    dailyCompletions: {
      [getIsoDate(0)]: { u1: true, u2: false, u3: true },
      [getIsoDate(1)]: { u1: true, u2: true, u3: true },
      [getIsoDate(2)]: { u1: true, u2: true, u3: true },
      [getIsoDate(3)]: { u1: true, u2: true, u3: true },
      [getIsoDate(4)]: { u1: true, u2: true, u3: true },
      [getIsoDate(5)]: { u1: true, u2: true, u3: true },
      [getIsoDate(6)]: { u1: true, u2: true, u3: true },
    },
  },
  {
    id: 'th_2',
    title: 'Sprint de Estudos & Projetos (1h Focada)',
    description: '1 hora dedicada ao projeto compartilhado ou estudos intensivos',
    category: 'Trabalho em Equipe',
    icon: '🚀',
    color: '#06b6d4',
    teamStreak: 8,
    bestTeamStreak: 14,
    dailyCompletions: {
      [getIsoDate(0)]: { u1: true, u2: true, u3: false },
      [getIsoDate(1)]: { u1: true, u2: true, u3: true },
      [getIsoDate(2)]: { u1: true, u2: true, u3: true },
      [getIsoDate(3)]: { u1: true, u2: true, u3: true },
      [getIsoDate(4)]: { u1: true, u2: true, u3: true },
    },
  },
  {
    id: 'th_3',
    title: 'Standup Diário / Alinhamento de Foco',
    description: 'Compartilhar no chat o foco principal do dia e bloqueios',
    category: 'Comunicação',
    icon: '💬',
    color: '#8b5cf6',
    teamStreak: 15,
    bestTeamStreak: 25,
    dailyCompletions: {
      [getIsoDate(0)]: { u1: true, u2: true, u3: true },
      [getIsoDate(1)]: { u1: true, u2: true, u3: true },
      [getIsoDate(2)]: { u1: true, u2: true, u3: true },
      [getIsoDate(3)]: { u1: true, u2: true, u3: true },
    },
  },
  {
    id: 'th_4',
    title: 'Detox Digital Noturno (Zero telas após as 23h)',
    description: 'Melhorar a qualidade do sono e recuperação biológica dos 3',
    category: 'Saúde Coletiva',
    icon: '🌙',
    color: '#10b981',
    teamStreak: 6,
    bestTeamStreak: 12,
    dailyCompletions: {
      [getIsoDate(0)]: { u1: false, u2: true, u3: true },
      [getIsoDate(1)]: { u1: true, u2: true, u3: true },
      [getIsoDate(2)]: { u1: true, u2: true, u3: true },
    },
  },
];

export const INITIAL_ACTIVITY_FEED = [
  {
    id: 'feed_1',
    userId: 'u3',
    userName: 'Beatriz',
    avatar: '🎯',
    action: 'concluiu o hábito',
    target: 'Meditação Mindfulness 15m',
    timeAgo: 'há 15 min',
    likes: 2,
    reactions: ['🔥', '👏'],
  },
  {
    id: 'feed_2',
    userId: 'u1',
    userName: 'Emmanuel',
    avatar: '👨‍💻',
    action: 'bateu o recorde de streak com',
    target: '16 dias em Beber 2.5L de Água! 🔥',
    timeAgo: 'há 42 min',
    likes: 3,
    reactions: ['🔥', '⚡', '🏆'],
  },
  {
    id: 'feed_3',
    userId: 'u2',
    userName: 'Lucas',
    avatar: '⚡',
    action: 'completou a tarefa conjunta',
    target: 'Standup Diário / Alinhamento de Foco',
    timeAgo: 'há 1h',
    likes: 1,
    reactions: ['💪'],
  },
];

// LocalStorage helpers
const KEY_CURRENT_USER = 'streak_current_user_id';
const KEY_USERS = 'streak_users';
const KEY_PERSONAL = 'streak_personal_habits';
const KEY_TEAM = 'streak_team_habits';
const KEY_FEED = 'streak_activity_feed';

export function loadAppData() {
  try {
    const rawUsers = localStorage.getItem(KEY_USERS);
    const users = rawUsers ? JSON.parse(rawUsers) : INITIAL_USERS;

    const currentUserId = localStorage.getItem(KEY_CURRENT_USER) || 'u1';

    const rawPersonal = localStorage.getItem(KEY_PERSONAL);
    const personalHabits = rawPersonal ? JSON.parse(rawPersonal) : INITIAL_PERSONAL_HABITS;

    const rawTeam = localStorage.getItem(KEY_TEAM);
    const teamHabits = rawTeam ? JSON.parse(rawTeam) : INITIAL_TEAM_HABITS;

    const rawFeed = localStorage.getItem(KEY_FEED);
    const feed = rawFeed ? JSON.parse(rawFeed) : INITIAL_ACTIVITY_FEED;

    return { users, currentUserId, personalHabits, teamHabits, feed };
  } catch (e) {
    console.error('Failed to load from storage, using defaults:', e);
    return {
      users: INITIAL_USERS,
      currentUserId: 'u1',
      personalHabits: INITIAL_PERSONAL_HABITS,
      teamHabits: INITIAL_TEAM_HABITS,
      feed: INITIAL_ACTIVITY_FEED,
    };
  }
}

export function saveAppData({ users, currentUserId, personalHabits, teamHabits, feed }) {
  try {
    if (users) localStorage.setItem(KEY_USERS, JSON.stringify(users));
    if (currentUserId) localStorage.setItem(KEY_CURRENT_USER, currentUserId);
    if (personalHabits) localStorage.setItem(KEY_PERSONAL, JSON.stringify(personalHabits));
    if (teamHabits) localStorage.setItem(KEY_TEAM, JSON.stringify(teamHabits));
    if (feed) localStorage.setItem(KEY_FEED, JSON.stringify(feed));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
}
