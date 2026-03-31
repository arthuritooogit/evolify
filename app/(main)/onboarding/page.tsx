'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'

const STEPS = [
  // ── Step 1: Profile ──────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Quel est ton profil ?',
    subtitle: 'On va personnaliser Evolify pour toi',
    type: 'single',
    options: [
      { value: 'entrepreneur', label: 'Entrepreneur / Fondateur', emoji: '🚀' },
      { value: 'freelance', label: 'Freelance / Consultant', emoji: '💼' },
      { value: 'developer', label: 'Développeur / Tech', emoji: '⚙️' },
      { value: 'marketer', label: 'Marketeur / Growth', emoji: '📈' },
      { value: 'creative', label: 'Créatif / Designer', emoji: '🎨' },
      { value: 'student', label: 'Étudiant / Chercheur', emoji: '📚' },
    ],
  },
  // ── Step 2: Goals ────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'Quels sont tes objectifs principaux ?',
    subtitle: "Sélectionne jusqu'à 3 objectifs",
    type: 'multi',
    max: 3,
    options: [
      { value: 'productivity', label: 'Gagner du temps', emoji: '⚡' },
      { value: 'content', label: 'Créer du contenu', emoji: '✍️' },
      { value: 'automate', label: 'Automatiser des tâches', emoji: '🤖' },
      { value: 'code', label: 'Développer plus vite', emoji: '💻' },
      { value: 'design', label: 'Créer des visuels', emoji: '🖼️' },
      { value: 'research', label: 'Analyser et rechercher', emoji: '🔍' },
    ],
  },
  // ── Step 3: Tools ────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'Quels outils utilises-tu déjà ?',
    subtitle: 'Ça nous aide à te recommander les meilleurs compléments',
    type: 'multi',
    max: 5,
    options: [
      { value: 'chatgpt', label: 'ChatGPT', emoji: '🟢' },
      { value: 'claude', label: 'Claude', emoji: '🟠' },
      { value: 'midjourney', label: 'Midjourney', emoji: '🟣' },
      { value: 'n8n', label: 'n8n / Make', emoji: '⚡' },
      { value: 'cursor', label: 'Cursor / Copilot', emoji: '💻' },
      { value: 'notion', label: 'Notion AI', emoji: '📝' },
      { value: 'none', label: 'Aucun encore', emoji: '🆕' },
    ],
  },
  // ── Step 4: AI level ─────────────────────────────────────────────────────
  {
    id: 4,
    title: "Ton niveau avec l'IA ?",
    subtitle: "Sois honnête, on s'adapte à tout niveau",
    type: 'single',
    options: [
      { value: 'beginner', label: 'Débutant — Je découvre', emoji: '🌱' },
      { value: 'intermediate', label: "Intermédiaire — J'utilise régulièrement", emoji: '🌿' },
      { value: 'advanced', label: "Avancé — J'automatise et je code", emoji: '🌳' },
      { value: 'expert', label: "Expert — Je construis des systèmes IA", emoji: '🚀' },
    ],
  },
  // ── Step 5: Module interest ──────────────────────────────────────────────
  {
    id: 5,
    title: "Quel module t'intéresse le plus ?",
    subtitle: 'Tu pourras accéder à tous avec Full Access',
    type: 'single',
    options: [
      { value: 'outils', label: 'Outils IA', emoji: '🛠️', desc: 'Gratuit · 4 000+ outils' },
      { value: 'llm', label: 'Prompts LLM', emoji: '💬', desc: 'Inclus dans Full Access · 1 000+' },
      { value: 'visual', label: 'Prompts Visuels', emoji: '🎨', desc: 'Inclus dans Full Access · 8 000+' },
      { value: 'automation', label: 'Automatisations', emoji: '⚡', desc: 'Inclus dans Full Access · 8 000+' },
      { value: 'skills', label: 'Skills & Plugins', emoji: '🧩', desc: 'Inclus dans Full Access · 500+' },
    ],
  },
  // ── Step 6: Plan selection ───────────────────────────────────────────────
  {
    id: 6,
    title: 'Comment tu veux commencer ?',
    subtitle: "Choisis l'offre qui te correspond",
    type: 'plan',
    options: [
      {
        value: 'free',
        label: 'Gratuit',
        emoji: '🆓',
        desc: 'Outils IA + Ressources de formation\nAccès illimité, sans CB',
        price: '0€',
        color: '#94a3b8',
      },
      {
        value: 'full',
        label: 'Full Access',
        emoji: '🚀',
        desc: 'Tous les modules inclus\nExpérience Evolify complète',
        price: '15€/mois',
        color: '#00d4ff',
        popular: true,
      },
    ],
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const router = useRouter()

  const current = STEPS[step]
  const answer = answers[current.id]
  const isMulti = current.type === 'multi'
  const max = (current as { max?: number }).max

  const isSelected = (val: string) => {
    if (isMulti) return Array.isArray(answer) && answer.includes(val)
    return answer === val
  }

  const toggle = (val: string) => {
    if (isMulti) {
      const curr = (Array.isArray(answer) ? answer : []) as string[]
      if (curr.includes(val)) {
        setAnswers(a => ({ ...a, [current.id]: curr.filter(v => v !== val) }))
      } else if (!max || curr.length < max) {
        setAnswers(a => ({ ...a, [current.id]: [...curr, val] }))
      }
    } else {
      setAnswers(a => ({ ...a, [current.id]: val }))
    }
  }

  const canContinue = isMulti
    ? Array.isArray(answer) && answer.length > 0
    : !!answer

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else {
      router.push('/outils-ia')
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 w-full max-w-lg">

        {/* ── Progress bar ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: 'var(--c-text-3)' }}>
              Étape {step + 1} / {STEPS.length}
            </span>
            <span className="text-xs font-semibold" style={{ color: '#00d4ff' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #00d4ff, #00ff87)' }}
            />
          </div>
        </div>

        {/* ── Card ── */}
        <div
          className="rounded-2xl p-6 space-y-6"
          style={{ background: 'rgba(13,20,36,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Header */}
          <div>
            <h2 className="text-xl font-black text-white mb-1">{current.title}</h2>
            <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>{current.subtitle}</p>
            {isMulti && max && (
              <p className="text-xs mt-0.5" style={{ color: '#00d4ff' }}>
                {Array.isArray(answer) ? answer.length : 0}/{max} sélectionnés
              </p>
            )}
          </div>

          {/* Options */}
          {current.type !== 'plan' ? (
            /* Standard / multi-select grid */
            <div className="grid grid-cols-2 gap-2.5">
              {current.options.map(opt => {
                const sel = isSelected(opt.value)
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggle(opt.value)}
                    className="relative flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-150 hover:scale-[1.02]"
                    style={{
                      background: sel ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${sel ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                    }}
                  >
                    {sel && (
                      <div
                        className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: '#00d4ff', color: '#030712' }}
                      >
                        <Check size={9} />
                      </div>
                    )}
                    <span className="text-xl">{opt.emoji}</span>
                    <div>
                      <div
                        className="text-xs font-semibold"
                        style={{ color: sel ? '#00d4ff' : 'var(--c-text-1)' }}
                      >
                        {opt.label}
                      </div>
                      {(opt as { desc?: string }).desc && (
                        <div className="text-[10px]" style={{ color: 'var(--c-text-3)' }}>
                          {(opt as { desc?: string }).desc}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            /* Plan selection — 2 cards side by side */
            <div className="grid grid-cols-2 gap-3">
              {current.options.map(opt => {
                const sel = answer === opt.value
                const o = opt as {
                  value: string
                  label: string
                  emoji: string
                  desc?: string
                  price?: string
                  color?: string
                  popular?: boolean
                }
                return (
                  <button
                    key={o.value}
                    onClick={() => setAnswers(a => ({ ...a, [current.id]: o.value }))}
                    className="relative flex flex-col gap-2.5 p-5 rounded-xl text-left transition-all duration-150 hover:scale-[1.02]"
                    style={{
                      background: sel ? `${o.color}10` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${sel ? `${o.color}45` : 'rgba(255,255,255,0.07)'}`,
                      boxShadow: sel && o.popular ? `0 0 24px ${o.color}15` : 'none',
                    }}
                  >
                    {o.popular && (
                      <div
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] px-2.5 py-0.5 rounded-full font-black whitespace-nowrap"
                        style={{ background: o.color, color: '#030712' }}
                      >
                        Recommandé
                      </div>
                    )}

                    <div className="text-2xl">{o.emoji}</div>

                    <div>
                      <div
                        className="font-black text-sm"
                        style={{ color: sel ? o.color : 'var(--c-text-1)' }}
                      >
                        {o.label}
                      </div>
                      <div
                        className="text-[10px] mt-1 leading-relaxed whitespace-pre-line"
                        style={{ color: 'var(--c-text-3)' }}
                      >
                        {o.desc}
                      </div>
                    </div>

                    {o.price && (
                      <div className="font-black text-base mt-1" style={{ color: o.color }}>
                        {o.price}
                      </div>
                    )}

                    {sel && (
                      <div
                        className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: o.color, color: '#030712' }}
                      >
                        <Check size={11} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
            style={{ color: 'var(--c-text-3)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <ArrowLeft size={14} />
            Retour
          </button>

          <button
            onClick={handleNext}
            disabled={!canContinue}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}
          >
            {step === STEPS.length - 1 ? 'Commencer !' : 'Continuer'}
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Skip */}
        <p className="text-center text-xs mt-4">
          <button
            onClick={() => router.push('/outils-ia')}
            className="transition-colors hover:text-white"
            style={{ color: 'var(--c-text-4)' }}
          >
            Passer l'onboarding →
          </button>
        </p>
      </div>
    </div>
  )
}
