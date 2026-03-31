'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Bookmark, Heart, Star, Settings, LogOut, Crown, ArrowRight, TrendingUp } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useLikeSave } from '@/context/LikeSaveContext'
import Badge from '@/components/shared/Badge'

type Tab = 'overview' | 'saves' | 'likes' | 'activity'

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
  { key: 'saves', label: 'Sauvegardes', icon: Bookmark },
  { key: 'likes', label: 'Likes', icon: Heart },
  { key: 'activity', label: 'Paramètres', icon: Settings },
]

const MODULE_INFOS = [
  { key: 'llm', label: 'Prompts LLM', color: '#60a5fa', href: '/prompts-llm', emoji: '💬' },
  { key: 'visual', label: 'Prompts Visuels', color: '#f87171', href: '/prompts-visuels', emoji: '🎨' },
  { key: 'automation', label: 'Automatisations', color: '#4ade80', href: '/automatisations', emoji: '⚡' },
  { key: 'skills', label: 'Skills & Plugins', color: '#facc15', href: '/skills', emoji: '🧩' },
] as const

export default function DashboardPage() {
  const { user, logout, hasModule } = useAuth()
  const { saves, likes } = useLikeSave()
  const [tab, setTab] = useState<Tab>('overview')
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/connexion')
  }, [user, router])

  if (!user) return null

  const planColor = {
    free: '#94a3b8', module: '#60a5fa', creator: '#a855f7',
    technical: '#4ade80', full: '#00d4ff', enterprise: '#f97316', admin: '#f97316',
  }[user.plan] || '#94a3b8'

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header user */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black"
          style={{ background: `${planColor}20`, color: planColor, border: `1px solid ${planColor}30` }}>
          {user.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-white">{user.name}</h1>
            <Badge color={planColor}>{user.plan.toUpperCase()}</Badge>
          </div>
          <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>{user.email}</p>
        </div>
        <button onClick={() => { logout(); router.push('/') }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/[0.06]"
          style={{ color: 'var(--c-text-3)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <LogOut size={13} />
          Déconnexion
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
              style={{
                background: tab === t.key ? 'rgba(255,255,255,0.07)' : 'transparent',
                color: tab === t.key ? 'var(--c-text-1)' : 'var(--c-text-3)',
              }}>
              <Icon size={13} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      {tab === 'overview' && (
        <div className="space-y-6">
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Sauvegardes', value: saves.length, color: '#00d4ff', icon: Bookmark },
              { label: 'Likes', value: likes.length, color: '#f87171', icon: Heart },
              { label: 'Modules actifs', value: user.modules.length, color: '#a855f7', icon: Crown },
              { label: 'Outils accédés', value: 42, color: '#4ade80', icon: Star },
            ].map(({ label, value, color, icon: Icon }) => (
              <div key={label} className="rounded-xl p-4"
                style={{ background: 'rgba(13,20,36,0.6)', border: `1px solid ${color}15` }}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} style={{ color }} />
                  <span className="text-xs" style={{ color: 'var(--c-text-3)' }}>{label}</span>
                </div>
                <div className="text-2xl font-black" style={{ color }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Modules access */}
          <div>
            <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--c-text-2)' }}>Mes modules</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {MODULE_INFOS.map(mod => {
                const access = hasModule(mod.key as 'llm' | 'visual' | 'automation' | 'skills')
                return (
                  <div key={mod.key}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{
                      background: 'rgba(13,20,36,0.6)',
                      border: `1px solid ${access ? mod.color + '20' : 'rgba(255,255,255,0.06)'}`,
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${mod.color}15`, fontSize: 16 }}>
                        {mod.emoji}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{mod.label}</div>
                        <div className="text-[10px]" style={{ color: access ? mod.color : 'var(--c-text-4)' }}>
                          {access ? '✓ Accès actif' : '🔒 Non activé'}
                        </div>
                      </div>
                    </div>
                    {access ? (
                      <Link href={mod.href}
                        className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg font-semibold transition-all hover:scale-105"
                        style={{ background: `${mod.color}12`, color: mod.color, border: `1px solid ${mod.color}20` }}>
                        Explorer <ArrowRight size={10} />
                      </Link>
                    ) : (
                      <Link href="/pricing"
                        className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg font-semibold transition-all hover:scale-105"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-3)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        Activer
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Upgrade CTA if not full */}
          {user.plan !== 'full' && user.plan !== 'admin' && (
            <div className="rounded-2xl p-6 text-center"
              style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <div className="text-lg font-black text-white mb-1">Passe au Full Access</div>
              <p className="text-sm mb-4" style={{ color: 'var(--c-text-2)' }}>
                Débloque tous les modules pour 15€/mois (-20% en annuel)
              </p>
              <Link href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}>
                <Crown size={14} />
                Voir les offres
              </Link>
            </div>
          )}
        </div>
      )}

      {tab === 'saves' && (
        <div>
          <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--c-text-2)' }}>
            {saves.length} sauvegarde{saves.length !== 1 ? 's' : ''}
          </h2>
          {saves.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔖</div>
              <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>Aucune sauvegarde pour l'instant</p>
              <Link href="/outils-ia" className="text-xs mt-2 inline-block" style={{ color: '#00d4ff' }}>
                Explorer les outils →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {saves.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3.5 rounded-xl"
                  style={{ background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <div className="text-sm font-semibold text-white">{s.id}</div>
                    <div className="text-[10px]" style={{ color: 'var(--c-text-3)' }}>{s.type}</div>
                  </div>
                  <Bookmark size={13} style={{ color: '#00d4ff' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'likes' && (
        <div>
          <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--c-text-2)' }}>
            {likes.length} like{likes.length !== 1 ? 's' : ''}
          </h2>
          {likes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">❤️</div>
              <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>Aucun like pour l'instant</p>
            </div>
          ) : (
            <div className="space-y-2">
              {likes.map(l => (
                <div key={l.id} className="flex items-center justify-between p-3.5 rounded-xl"
                  style={{ background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <div className="text-sm font-semibold text-white">{l.id}</div>
                    <div className="text-[10px]" style={{ color: 'var(--c-text-3)' }}>{l.type}</div>
                  </div>
                  <Heart size={13} style={{ color: '#f87171' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'activity' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold" style={{ color: 'var(--c-text-2)' }}>Paramètres du compte</h2>
          <div className="rounded-2xl p-6 space-y-4"
            style={{ background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {[
              { label: 'Nom', value: user.name },
              { label: 'Email', value: user.email },
              { label: 'Plan', value: user.plan },
              { label: 'Rôle', value: user.role },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-xs" style={{ color: 'var(--c-text-3)' }}>{label}</span>
                <span className="text-sm font-medium text-white">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'var(--c-text-4)' }}>
            Les modifications de compte seront disponibles avec l'intégration Supabase (Phase 10).
          </p>
        </div>
      )}
    </div>
  )
}
