// File định nghĩa tất cả routes trong ứng dụng LUMI

export const ROUTES = {
  // Main Routes (User Layout)
  HOME: '/home',
  PRACTICE: {
    FULL_TEST: '/practice/full-test',
    MINI_TEST: '/practice/mini-test',
    VOCABULARY: '/practice/vocabulary',
  },
  STUDY: {
    REPORTS: '/report',
    HISTORY: '/study/history',
    PROGRESS: '/study/progress',
  },
  PROFILE: '/profile',

  // Auth Routes (Auth Layout)
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },

  // Admin Routes (Admin Layout)
  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    EXAMS: '/admin/exams',
    QUESTIONS: '/admin/questions',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
  },

  // Exam Routes (Exam Layout)
  EXAM: {
    LISTENING: '/exam/listening',
    READING: '/exam/reading',
    WRITING: '/exam/writing',
    SPEAKING: '/exam/speaking',
    FULL_TEST: '/exam/full-test',
    RESULT: '/exam/result',
  },

  // API Routes
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
    },
    EXAMS: {
      LIST: '/api/exams',
      GET: (id: string) => `/api/exams/${id}`,
      SUBMIT: (id: string) => `/api/exams/${id}/submit`,
    },
    USERS: {
      PROFILE: '/api/users/profile',
      UPDATE: '/api/users/update',
    },
  },
} as const

// Helper functions để tạo URLs với parameters
export const createExamUrl = (type: 'listening' | 'reading' | 'writing' | 'speaking' | 'full-test', examId?: string) => {
  const baseUrl = ROUTES.EXAM[type.toUpperCase().replace('-', '_') as keyof typeof ROUTES.EXAM]
  return examId ? `${baseUrl}/${examId}` : baseUrl
}

export const createAdminUrl = (section: keyof typeof ROUTES.ADMIN, id?: string) => {
  const baseUrl = ROUTES.ADMIN[section]
  return id ? `${baseUrl}/${id}` : baseUrl
}

// Navigation items cho các layout khác nhau
export const NAVIGATION_ITEMS = {
  MAIN: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Full Test', href: ROUTES.PRACTICE.FULL_TEST },
    { label: 'Mini Test', href: ROUTES.PRACTICE.MINI_TEST },
    { label: 'Word Note', href: ROUTES.PRACTICE.VOCABULARY },
    { label: 'Study Reports', href: ROUTES.STUDY.REPORTS },
  ],
  ADMIN: [
    { label: 'Dashboard', href: ROUTES.ADMIN.DASHBOARD, icon: 'MdDashboard' },
    { label: 'User Management', href: ROUTES.ADMIN.USERS, icon: 'MdPeople' },
    { label: 'Exam Management', href: ROUTES.ADMIN.EXAMS, icon: 'MdAssignment' },
    { label: 'Question Management', href: ROUTES.ADMIN.QUESTIONS, icon: 'MdQuestionAnswer' },
    { label: 'Reports', href: ROUTES.ADMIN.REPORTS, icon: 'MdBarChart' },
    { label: 'Settings', href: ROUTES.ADMIN.SETTINGS, icon: 'MdSettings' },
  ],
} as const

// Route permissions
export const ROUTE_PERMISSIONS = {
  PUBLIC: [
    '/', // Root page
    ROUTES.HOME,
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.REGISTER,
    ROUTES.AUTH.FORGOT_PASSWORD,
  ],
  USER: [
    ...Object.values(ROUTES.PRACTICE),
    ...Object.values(ROUTES.STUDY),
    ...Object.values(ROUTES.EXAM),
    ROUTES.PROFILE,
  ],
  ADMIN: [
    ...Object.values(ROUTES.ADMIN),
  ],
} as const

export type RouteType = typeof ROUTES
export type NavigationType = typeof NAVIGATION_ITEMS
