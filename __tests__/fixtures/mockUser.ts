// __tests__/fixtures/mockUser.ts

export const mockUser = {
  id: 'test-user-123',
  email: 'test@example.com',
  name: 'Test User',
  isPremium: false,
  createdAt: new Date('2026-02-01'),
  progress: [
    {
      moduleId: 'mes-01',
      completed: true,
      lessonsCompleted: ['lesson-1', 'lesson-2'],
      startedAt: new Date('2026-02-01'),
      completedAt: new Date('2026-02-05'),
      score: 95,
    },
    {
      moduleId: 'mes-02',
      completed: false,
      lessonsCompleted: ['lesson-1'],
      startedAt: new Date('2026-02-10'),
    },
  ],
};

export const mockPremiumUser = {
  ...mockUser,
  id: 'premium-user-456',
  isPremium: true,
  email: 'premium@example.com',
  name: 'Premium User',
};

export const mockSession = {
  user: mockUser,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export const mockPremiumSession = {
  user: mockPremiumUser,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

// Mock progress data
export const mockProgressData = {
  'mes-01': {
    userId: mockUser.id,
    moduleId: 'mes-01',
    progressPercentage: 100,
    finalScore: 95,
    completedAt: new Date('2026-02-05'),
    completedLessons: ['lesson-1', 'lesson-2', 'lesson-3'],
  },
  'mes-02': {
    userId: mockUser.id,
    moduleId: 'mes-02',
    progressPercentage: 30,
    finalScore: null,
    completedAt: null,
    completedLessons: ['lesson-1'],
  },
};

// Mock chat messages
export const mockChatMessages = [
  {
    id: '1',
    role: 'assistant' as const,
    content: 'Hola! Soy tu asistente IA especializado en Lua',
    timestamp: new Date(),
  },
  {
    id: '2',
    role: 'user' as const,
    content: '¿Cómo uso variables en Lua?',
    timestamp: new Date(),
  },
  {
    id: '3',
    role: 'assistant' as const,
    content: 'Las variables en Lua se declaran con local...',
    timestamp: new Date(),
  },
];

// Mock exam results
export const mockExamResults = {
  fundamentals: {
    completed: true,
    passed: true,
    score: 87,
    completedAt: new Date('2026-02-15'),
  },
  integration: {
    completed: false,
    passed: false,
    score: null,
    completedAt: null,
  },
};
