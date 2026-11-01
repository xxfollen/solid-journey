// Storage manager for Streak app - Zeroed real data version

export function getIsoDate(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

// 3 Equal Members - No Leader - Initial passwords: 123456
export const INITIAL_USERS = [
  {
    id: 'u1',
    name: 'Emmanuel Leocadio',
    email: 'leocadio.cmc@gmail.com',
    password: '123456',
    avatar: '👨‍💻',
    role: 'Membro do Trio',
    color: '#f97316',
  },
  {
    id: 'u2',
    name: 'Enzo Pacificco',
    email: 'epacificco.cmc@gmail.com',
    password: '123456',
    avatar: '⚡',
    role: 'Membro do Trio',
    color: '#06b6d4',
  },
  {
    id: 'u3',
    name: 'Henrique Trindade',
    email: 'htrindade.cmc@gmail.com',
    password: '123456',
    avatar: '🎯',
    role: 'Membro do Trio',
    color: '#10b981',
  },
];

// Clean personal habits with ZERO initial streaks and EMPTY histories
export const INITIAL_PERSONAL_HABITS = {
  u1: [
    {
      id: 'ph_1',
      title: 'Beber 2.5L de Água',
      description: 'Manter hidratação ao longo do dia em garrafa graduada',
      category: 'Saúde',
      color: '#06b6d4',
      icon: '💧',
      currentStreak: 0,
      bestStreak: 0,
      streakFreeze: 2,
      timeOfDay: 'Dia Todo',
      createdAt: getIsoDate(0),
      history: {},
    },
    {
      id: 'ph_2',
      title: 'Estudo / Programação Focada',
      description: 'Deep work sem distrações ou celular',
      category: 'Foco & Carreira',
      color: '#f97316',
      icon: '💻',
      currentStreak: 0,
      bestStreak: 0,
      streakFreeze: 1,
      timeOfDay: 'Manhã',
      createdAt: getIsoDate(0),
      history: {},
    },
    {
      id: 'ph_3',
      title: 'Treino de Força / Exercício',
      description: 'Musculação, calistenia ou cardio',
      category: 'Fitness',
      color: '#ef4444',
      icon: '🏋️‍♂️',
      currentStreak: 0,
      bestStreak: 0,
      streakFreeze: 1,
      timeOfDay: 'Tarde',
      createdAt: getIsoDate(0),
      history: {},
    },
    {
      id: 'ph_4',
      title: 'Leitura de 15 Páginas',
      description: 'Livro de desenvolvimento, finanças ou técnico',
      category: 'Mente',
      color: '#8b5cf6',
      icon: '📖',
      currentStreak: 0,
      bestStreak: 0,
      streakFreeze: 2,
      timeOfDay: 'Noite',
      createdAt: getIsoDate(0),
      history: {},
    },
  ],
  u2: [
    {
      id: 'ph_u2_1',
      title: 'Estudos e Projetos Diários',
      description: 'Foco em tarefas práticas e metas pessoais',
      category: 'Produtividade',
      color: '#06b6d4',
      icon: '⚡',
      currentStreak: 0,
      bestStreak: 0,
      streakFreeze: 2,
      timeOfDay: 'Manhã',
      createdAt: getIsoDate(0),
      history: {},
    },
    {
      id: 'ph_u2_2',
      title: 'Atividade Física Diária',
      description: 'Caminhada, treino ou corrida',
      category: 'Saúde',
      color: '#10b981',
      icon: '🏃‍♂️',
      currentStreak: 0,
      bestStreak: 0,
      streakFreeze: 2,
      timeOfDay: 'Tarde',
      createdAt: getIsoDate(0),
      history: {},
    },
  ],
  u3: [
    {
      id: 'ph_u3_1',
      title: 'Rotina de Estudos & Leitura',
      description: 'Aprimoramento contínuo e concentração',
      category: 'Estudos',
      color: '#8b5cf6',
      icon: '🎯',
      currentStreak: 0,
      bestStreak: 0,
      streakFreeze: 2,
      timeOfDay: 'Manhã',
      createdAt: getIsoDate(0),
      history: {},
    },
    {
      id: 'ph_u3_2',
      title: 'Saúde & Hidratação',
      description: 'Manter a constância diária de água e bem-estar',
      category: 'Saúde',
      color: '#06b6d4',
      icon: '💧',
      currentStreak: 0,
      bestStreak: 0,
      streakFreeze: 2,
      timeOfDay: 'Dia Todo',
      createdAt: getIsoDate(0),
      history: {},
    },
  ],
};

// Clean team habits with ZERO initial streaks and EMPTY completions
export const INITIAL_TEAM_HABITS = [
  {
    id: 'th_1',
    title: 'Desafio Fitness Coletivo (30m de Exercício)',
    description: 'Os 3 membros cumprem ao menos 30 minutos de atividade física no dia',
    category: 'Desafio do Trio',
    icon: '⚡',
    color: '#f97316',
    teamStreak: 0,
    bestTeamStreak: 0,
    dailyCompletions: {},
  },
  {
    id: 'th_2',
    title: 'Sprint de Estudos & Projetos (1h Focada)',
    description: '1 hora dedicada a estudo aprofundado ou desenvolvimento de projetos',
    category: 'Trabalho em Equipe',
    icon: '🚀',
    color: '#06b6d4',
    teamStreak: 0,
    bestTeamStreak: 0,
    dailyCompletions: {},
  },
  {
    id: 'th_3',
    title: 'Standup Diário / Alinhamento de Metas',
    description: 'Compartilhar foco do dia e progressos',
    category: 'Comunicação',
    icon: '💬',
    color: '#8b5cf6',
    teamStreak: 0,
    bestTeamStreak: 0,
    dailyCompletions: {},
  },
  {
    id: 'th_4',
    title: 'Detox Noturno & Sono Limpo',
    description: 'Desconectar telas antes de dormir para recuperação e foco no dia seguinte',
    category: 'Saúde Coletiva',
    icon: '🌙',
    color: '#10b981',
    teamStreak: 0,
    bestTeamStreak: 0,
    dailyCompletions: {},
  },
];

export const INITIAL_ACTIVITY_FEED = [];

// LocalStorage keys with version 3 to guarantee zeroed cache for all users
const KEY_VERSION = 'streak_v3_version';
const KEY_CURRENT_USER = 'streak_v3_current_user_id';
const KEY_USERS = 'streak_v3_users';
const KEY_PERSONAL = 'streak_v3_personal_habits';
const KEY_TEAM = 'streak_v3_team_habits';
const KEY_FEED = 'streak_v3_feed';

export function loadAppData() {
  try {
    const version = localStorage.getItem(KEY_VERSION);
    // If not version 3, wipe legacy mock data
    if (version !== '3.0') {
      localStorage.clear();
      localStorage.setItem(KEY_VERSION, '3.0');
      localStorage.setItem(KEY_USERS, JSON.stringify(INITIAL_USERS));
      localStorage.setItem(KEY_PERSONAL, JSON.stringify(INITIAL_PERSONAL_HABITS));
      localStorage.setItem(KEY_TEAM, JSON.stringify(INITIAL_TEAM_HABITS));
      localStorage.setItem(KEY_FEED, JSON.stringify(INITIAL_ACTIVITY_FEED));
      return {
        users: INITIAL_USERS,
        currentUserId: null, // Require login!
        personalHabits: INITIAL_PERSONAL_HABITS,
        teamHabits: INITIAL_TEAM_HABITS,
        feed: INITIAL_ACTIVITY_FEED,
      };
    }

    const rawUsers = localStorage.getItem(KEY_USERS);
    const users = rawUsers ? JSON.parse(rawUsers) : INITIAL_USERS;

    const currentUserId = localStorage.getItem(KEY_CURRENT_USER) || null;

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
      currentUserId: null,
      personalHabits: INITIAL_PERSONAL_HABITS,
      teamHabits: INITIAL_TEAM_HABITS,
      feed: INITIAL_ACTIVITY_FEED,
    };
  }
}

export function saveAppData({ users, currentUserId, personalHabits, teamHabits, feed }) {
  try {
    localStorage.setItem(KEY_VERSION, '3.0');
    if (users) localStorage.setItem(KEY_USERS, JSON.stringify(users));
    if (currentUserId !== undefined) {
      if (currentUserId === null) {
        localStorage.removeItem(KEY_CURRENT_USER);
      } else {
        localStorage.setItem(KEY_CURRENT_USER, currentUserId);
      }
    }
    if (personalHabits) localStorage.setItem(KEY_PERSONAL, JSON.stringify(personalHabits));
    if (teamHabits) localStorage.setItem(KEY_TEAM, JSON.stringify(teamHabits));
    if (feed) localStorage.setItem(KEY_FEED, JSON.stringify(feed));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
}
