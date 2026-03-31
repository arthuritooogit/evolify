'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type UserPlan = 'free' | 'module' | 'creator' | 'technical' | 'full' | 'enterprise' | 'admin'
export type ModuleKey = 'llm' | 'visual' | 'automation' | 'skills'

export interface User {
  id: string
  email: string
  username: string
  name: string
  plan: UserPlan
  modules: ModuleKey[]
  role: 'user' | 'admin'
  bio?: string
  job?: string
  role_title?: string
  interest_tags?: string[]
  avatar_url?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasModule: (module: ModuleKey) => boolean
  hasAccess: (module: ModuleKey | null) => boolean
}

// ─── COMPTES TEST (mode dev — bypass freemium) ─────────────────────────────────
// Password = username for all accounts
const MOCK_USERS: Record<string, User> = {
  // ── Admin: full access, all modules ──────────────────────────────────────
  admin: {
    id: 'usr_admin',
    email: 'admin@evolify.fr',
    username: 'admin',
    name: 'Admin Evolify',
    plan: 'admin',
    modules: ['llm', 'visual', 'automation', 'skills'],
    role: 'admin',
    job: 'Fondateur',
  },

  // ── Free: no modules ──────────────────────────────────────────────────────
  free: {
    id: 'usr_free',
    email: 'free@evolify.fr',
    username: 'free',
    name: 'Utilisateur Free',
    plan: 'free',
    modules: [],
    role: 'user',
    job: 'Entrepreneur',
  },

  // ── Full Access: all modules ──────────────────────────────────────────────
  full: {
    id: 'usr_full',
    email: 'full@evolify.fr',
    username: 'full',
    name: 'Utilisateur Full',
    plan: 'full',
    modules: ['llm', 'visual', 'automation', 'skills'],
    role: 'user',
    job: 'Growth Hacker',
  },

  // ── Module-specific users (for testing individual module access) ──────────
  llm: {
    id: 'usr_llm',
    email: 'llm@evolify.fr',
    username: 'llm',
    name: 'Utilisateur LLM',
    plan: 'module',
    modules: ['llm'],
    role: 'user',
    job: 'Copywriter',
  },

  visual: {
    id: 'usr_visual',
    email: 'visual@evolify.fr',
    username: 'visual',
    name: 'Utilisateur Visual',
    plan: 'module',
    modules: ['visual'],
    role: 'user',
    job: 'Designer',
  },

  automation: {
    id: 'usr_auto',
    email: 'automation@evolify.fr',
    username: 'automation',
    name: 'Utilisateur Automation',
    plan: 'module',
    modules: ['automation'],
    role: 'user',
    job: 'Ops Manager',
  },

  skills: {
    id: 'usr_skills',
    email: 'skills@evolify.fr',
    username: 'skills',
    name: 'Utilisateur Skills',
    plan: 'module',
    modules: ['skills'],
    role: 'user',
    job: 'Développeur',
  },
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  hasModule: () => false,
  hasAccess: () => false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('evolify-session')
      if (saved) setUser(JSON.parse(saved))
    } catch {}
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Dev mode: password = username
    const match = Object.values(MOCK_USERS).find(
      u => (u.email === email || u.username === email) && password === u.username
    )
    if (match) {
      setUser(match)
      localStorage.setItem('evolify-session', JSON.stringify(match))
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('evolify-session')
  }, [])

  const hasModule = useCallback(
    (module: ModuleKey): boolean => {
      if (!user) return false
      if (user.role === 'admin' || user.plan === 'full') return true
      return user.modules.includes(module)
    },
    [user]
  )

  // null = auth-only (no module restriction)
  const hasAccess = useCallback(
    (module: ModuleKey | null): boolean => {
      if (!user) return false
      if (module === null) return true
      return hasModule(module)
    },
    [user, hasModule]
  )

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasModule, hasAccess }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
