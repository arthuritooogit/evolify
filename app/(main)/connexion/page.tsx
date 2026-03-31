'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/shared/Toast'

export default function ConnexionPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const ok = await login(email, password)
    setLoading(false)
    if (ok) {
      toast('Connexion réussie !', 'success')
      router.push('/outils-ia')
    } else {
      toast('Email ou mot de passe incorrect', 'error')
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)' }}>
              <Sparkles size={16} style={{ color: '#030712' }} />
            </div>
            <span className="text-xl font-black text-white">Evolify</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-1">Content de te revoir 👋</h1>
          <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>Connecte-toi pour accéder à tes modules</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: 'rgba(13,20,36,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                Email ou identifiant
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ton@email.fr"
                required
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--c-text-1)',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--c-text-1)',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--c-text-3)' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* CTA */}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:brightness-110 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}>
              {loading ? 'Connexion…' : (
                <>
                  Se connecter
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-[10px]" style={{ color: 'var(--c-text-4)' }}>MODE DEV</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Dev shortcuts */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Admin', user: 'admin', color: '#f97316' },
              { label: 'Full Access', user: 'full', color: '#00d4ff' },
              { label: 'Gratuit', user: 'free', color: '#94a3b8' },
              { label: 'LLM', user: 'llm', color: '#60a5fa' },
            ].map(({ label, user, color }) => (
              <button key={user}
                onClick={() => { setEmail(user); setPassword(user) }}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-colors hover:opacity-80"
                style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer links */}
        <p className="text-center text-sm mt-5" style={{ color: 'var(--c-text-3)' }}>
          Pas encore de compte ?{' '}
          <Link href="/inscription" className="font-semibold transition-colors"
            style={{ color: '#00d4ff' }}>
            S'inscrire gratuitement
          </Link>
        </p>
      </div>
    </div>
  )
}
