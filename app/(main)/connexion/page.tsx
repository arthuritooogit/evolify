'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/shared/Toast'

const DEV_ACCOUNTS = [
  { label: 'Admin',       user: 'admin',    color: '#f97316', rgb: '249,115,22'  },
  { label: 'Full Access', user: 'full',     color: '#00d4ff', rgb: '0,212,255'   },
  { label: 'Gratuit',     user: 'free',     color: '#94a3b8', rgb: '148,163,184' },
  { label: 'LLM',         user: 'llm',      color: '#60a5fa', rgb: '96,165,250'  },
  { label: 'Visuel',      user: 'visual',   color: '#f87171', rgb: '248,113,113' },
  { label: 'Automation',  user: 'workflow', color: '#4ade80', rgb: '74,222,128'  },
]

function ConnexionInner() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(false)

  const { login, user } = useAuth()
  const { toast }       = useToast()
  const router          = useRouter()
  const params          = useSearchParams()

  useEffect(() => {
    if (user) {
      const redirect = params.get('redirect')
      router.push(redirect ?? (user.role === 'admin' ? '/admin' : '/dashboard'))
    }
  }, [user, router, params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    setLoading(true)
    const ok = await login(email, password)
    setLoading(false)
    if (ok) {
      toast('Connexion réussie !', 'success')
      const redirect = params.get('redirect')
      router.push(redirect ?? (email.trim() === 'admin' ? '/admin' : '/dashboard'))
    } else {
      setError(true)
    }
  }

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-16">
      {/* Background */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '100vh',
        pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.06), transparent)',
      }} />

      <div className="relative w-full max-w-sm">

        {/* Lock icon */}
        <div className="flex justify-center mb-6">
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
            boxShadow: '0 0 32px rgba(0,212,255,0.1)',
          }}>
            <Lock size={22} style={{ color: '#00d4ff' }} />
          </div>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-5">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 100,
            background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
            color: '#00d4ff', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
          }}>
            Connexion
          </div>
        </div>

        <h1 className="text-2xl font-black text-center mb-1.5" style={{ color: 'var(--c-text-1)' }}>
          Bienvenue sur Evolify
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: 'var(--c-text-2)' }}>
          Connectez-vous pour accéder à votre espace.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: 'var(--c-text-2)' }}>Identifiant</label>
            <input
              type="text"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(false) }}
              placeholder="admin ou user"
              required
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ background: 'var(--c-input)', border: '1px solid var(--c-input-border)', color: 'var(--c-text-1)' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--c-input-border)'; e.currentTarget.style.boxShadow = 'none' }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: 'var(--c-text-2)' }}>Mot de passe</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false) }}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 pr-10 rounded-xl text-sm outline-none transition-all"
                style={{ background: 'var(--c-input)', border: '1px solid var(--c-input-border)', color: 'var(--c-text-1)' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--c-input-border)'; e.currentTarget.style.boxShadow = 'none' }}
              />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--c-text-3)' }} aria-label={showPass ? 'Masquer' : 'Afficher'}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl text-center text-xs font-medium"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              Identifiants incorrects.
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-1 transition-all"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712', boxShadow: '0 0 20px rgba(0,212,255,0.25)', opacity: loading ? 0.7 : 1 }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(0,212,255,0.5)' } }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.25)' }}
          >
            {loading ? 'Connexion…' : <> Se connecter <ArrowRight size={15} /> </>}
          </button>
        </form>

        {/* Hint */}
        <p className="mt-4 text-center text-xs" style={{ color: 'var(--c-text-4)' }}>
          Comptes démo : login = mot de passe
        </p>

        {/* Dev shortcuts */}
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-[9px] font-bold tracking-widest" style={{ color: 'var(--c-text-4)' }}>MODE DEV</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {DEV_ACCOUNTS.map(({ label, user, color, rgb }) => (
              <button key={user}
                onClick={() => { setEmail(user); setPassword(user); setError(false) }}
                className="px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all hover:scale-105"
                style={{ background: `rgba(${rgb},0.08)`, color, border: `1px solid rgba(${rgb},0.2)` }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-center text-sm" style={{ color: 'var(--c-text-3)' }}>
          Pas encore de compte ?{' '}
          <Link href="/inscription" className="font-semibold transition-colors" style={{ color: '#00d4ff' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
            S&apos;inscrire gratuitement
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function ConnexionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ConnexionInner />
    </Suspense>
  )
}
