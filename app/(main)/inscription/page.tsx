'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Sparkles, ArrowRight, Check } from 'lucide-react'
import { useToast } from '@/components/shared/Toast'

const FEATURES = [
  '4 000+ outils IA accessibles gratuitement',
  'Ressources et guides gratuits',
  'Filtres et recherche avancée',
  'Sauvegarde de vos favoris',
]

export default function InscriptionPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 8) {
      toast('Le mot de passe doit contenir 8 caractères minimum', 'error')
      return
    }
    setLoading(true)
    // Simulate registration delay
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    toast('Compte créé ! Bienvenue sur Evolify 🎉', 'success')
    router.push('/onboarding')
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-16">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Value prop */}
        <div className="hidden md:block">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)' }}>
              <Sparkles size={16} style={{ color: '#030712' }} />
            </div>
            <span className="text-xl font-black text-white">Evolify</span>
          </div>
          <h1 className="text-3xl font-black text-white leading-tight mb-4">
            La plateforme IA<br />
            <span className="gradient-text">tout-en-un</span>
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--c-text-2)' }}>
            Rejoignez 2 400+ professionnels qui exploitent l'IA intelligemment.
          </p>
          <div className="space-y-3">
            {FEATURES.map(f => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,255,135,0.15)', color: '#00ff87' }}>
                  <Check size={11} />
                </div>
                <span className="text-sm" style={{ color: 'var(--c-text-2)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div>
          <div className="text-center md:text-left mb-6">
            <h2 className="text-2xl font-black text-white mb-1">Créer mon compte</h2>
            <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>Gratuit · Sans carte bancaire</p>
          </div>

          <div className="rounded-2xl p-6 space-y-4"
            style={{ background: 'rgba(13,20,36,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'Nom complet', type: 'text', placeholder: 'Jean Dupont' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'ton@email.fr' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                    {label}
                  </label>
                  <input type={type} value={form[key as keyof typeof form]}
                    onChange={set(key)} placeholder={placeholder} required
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--c-text-1)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                  Mot de passe
                </label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={form.password}
                    onChange={set('password')} placeholder="8 caractères minimum" required
                    className="w-full px-3.5 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--c-text-1)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--c-text-3)' }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:brightness-110 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}>
                {loading ? 'Création du compte…' : (
                  <>
                    Créer mon compte gratuit
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center" style={{ color: 'var(--c-text-4)' }}>
                En vous inscrivant, vous acceptez nos CGU et Politique de confidentialité.
              </p>
            </form>
          </div>

          <p className="text-center text-sm mt-4" style={{ color: 'var(--c-text-3)' }}>
            Déjà un compte ?{' '}
            <Link href="/connexion" style={{ color: '#00d4ff' }} className="font-semibold">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
