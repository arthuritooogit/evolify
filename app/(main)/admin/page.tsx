'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { TOOLS } from '@/data/tools'
import { LLM_PROMPTS } from '@/data/llm-prompts'
import { VISUAL_PROMPTS } from '@/data/visual-prompts'
import { WORKFLOWS } from '@/data/workflows'
import { SKILLS } from '@/data/skills'
import { RESOURCES } from '@/data/resources'

const MODULES = [
  { label: 'Outils IA', count: TOOLS.length, color: '#a855f7', emoji: '🛠️' },
  { label: 'Prompts LLM', count: LLM_PROMPTS.length, color: '#60a5fa', emoji: '💬' },
  { label: 'Prompts Visuels', count: VISUAL_PROMPTS.length, color: '#f87171', emoji: '🎨' },
  { label: 'Automatisations', count: WORKFLOWS.length, color: '#4ade80', emoji: '⚡' },
  { label: 'Skills', count: SKILLS.length, color: '#facc15', emoji: '🧩' },
  { label: 'Ressources', count: RESOURCES.length, color: '#00ff87', emoji: '📚' },
]

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== 'admin') router.push('/')
    if (!user) router.push('/connexion')
  }, [user, router])

  if (!user || user.role !== 'admin') return null

  const totalItems = MODULES.reduce((s, m) => s + m.count, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#f97316' }}>
            Admin Panel
          </div>
          <h1 className="text-2xl font-black text-white">Tableau de bord admin</h1>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg font-bold"
          style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}>
          {user.name}
        </div>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Items total', value: totalItems, color: '#00d4ff' },
          { label: 'Modules', value: 6, color: '#a855f7' },
          { label: 'Utilisateurs', value: '2 400+', color: '#4ade80' },
          { label: 'Version', value: 'v0.7', color: '#facc15' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl p-4"
            style={{ background: 'rgba(13,20,36,0.7)', border: `1px solid ${color}15` }}>
            <div className="text-xs mb-1" style={{ color: 'var(--c-text-3)' }}>{label}</div>
            <div className="text-2xl font-black" style={{ color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Modules overview */}
      <div>
        <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--c-text-2)' }}>État des bases de données</h2>
        <div className="space-y-2">
          {MODULES.map(mod => (
            <div key={mod.label} className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: 'rgba(13,20,36,0.6)', border: `1px solid ${mod.color}10` }}>
              <div className="text-xl">{mod.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">{mod.label}</span>
                  <span className="text-xs font-bold" style={{ color: mod.color }}>{mod.count} items</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (mod.count / 100) * 100)}%`, background: mod.color }} />
                </div>
                <div className="text-[9px] mt-1" style={{ color: 'var(--c-text-4)' }}>
                  Phase 8: scraping en attente — objectif : 1 000+ items
                </div>
              </div>
              <div className="text-[10px] px-2 py-1 rounded font-bold"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-3)' }}>
                MOCK DATA
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap rapide */}
      <div className="rounded-2xl p-6"
        style={{ background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--c-text-2)' }}>Roadmap des phases</h2>
        <div className="space-y-2">
          {[
            { phase: 1, label: 'Composants UI', done: true },
            { phase: 2, label: 'Landing Page', done: true },
            { phase: 3, label: 'DatabaseShell', done: true },
            { phase: 4, label: 'Pages Modules', done: true },
            { phase: 5, label: 'Auth + Onboarding', done: true },
            { phase: 6, label: 'Pages secondaires', done: true },
            { phase: 7, label: 'Mock data complètes', done: false },
            { phase: 8, label: 'Scraping CSV', done: false },
            { phase: 9, label: 'Intégration données', done: false },
            { phase: 10, label: 'Supabase Auth + BDD', done: false },
            { phase: 11, label: 'Stripe paiements', done: false },
            { phase: 12, label: 'SEO + Deploy Vercel', done: false },
          ].map(({ phase, label, done }) => (
            <div key={phase} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0"
                style={{ background: done ? 'rgba(0,255,135,0.15)' : 'rgba(255,255,255,0.05)', color: done ? '#00ff87' : 'var(--c-text-4)' }}>
                {done ? '✓' : phase}
              </div>
              <span className="text-xs" style={{ color: done ? 'var(--c-text-1)' : 'var(--c-text-4)' }}>
                Phase {phase} — {label}
              </span>
              {!done && (
                <span className="text-[9px] ml-auto" style={{ color: 'var(--c-text-4)' }}>En attente</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
