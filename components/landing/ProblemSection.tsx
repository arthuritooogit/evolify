'use client'

import { useReveal } from '@/hooks/useReveal'

const PERSONAS = [
  {
    emoji: '🚀',
    role: 'Entrepreneur',
    pain: 'Tu jonglais entre 12 onglets, 5 abonnements, et 0 workflow cohérent.',
    solution: 'Maintenant tout est centralisé. Les meilleurs outils, classés, filtrés, prêts à l\'emploi.',
    color: '#a855f7',
    tags: ['ChatGPT', 'Zapier', 'Notion AI'],
  },
  {
    emoji: '✍️',
    role: 'Freelance / Créatif',
    pain: 'Tu passais des heures à chercher le bon prompt pour le bon outil.',
    solution: 'Des bibliothèques de prompts par cas d\'usage. Copiés en 1 clic. Adaptés à ton style.',
    color: '#60a5fa',
    tags: ['Midjourney', 'Claude', 'Runway'],
  },
  {
    emoji: '⚙️',
    role: 'Tech / Développeur',
    pain: 'Tu réinventais la roue à chaque projet IA. Les workflows disparaissaient dans un Google Doc.',
    solution: '8 000+ automations n8n/Make prêtes. Skills Claude Code organisés. Tout exportable.',
    color: '#4ade80',
    tags: ['n8n', 'Make', 'Claude Code'],
  },
]

export default function ProblemSection() {
  useReveal()

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: '#a855f7' }}>
            Le problème → La solution
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            L'IA évolue vite.<br />
            <span className="gradient-text">Toi aussi, tu mérites un outil à la hauteur.</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: 'var(--c-text-2)' }}>
            Que tu sois entrepreneur, créatif ou tech — Evolify est conçu pour toi.
          </p>
        </div>

        {/* Personas grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {PERSONAS.map((p, i) => (
            <div key={p.role}
              className="reveal rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(13,20,36,0.6)',
                border: `1px solid ${p.color}20`,
                boxShadow: `0 0 30px ${p.color}08`,
                animationDelay: `${i * 120}ms`,
              }}>
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}25` }}>
                  {p.emoji}
                </div>
                <div>
                  <div className="font-black text-white text-lg">{p.role}</div>
                  <div className="flex gap-1.5 mt-1">
                    {p.tags.map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                        style={{ background: `${p.color}15`, color: p.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pain */}
              <div className="rounded-xl p-3.5" style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.1)' }}>
                <div className="text-xs font-bold mb-1" style={{ color: '#f87171' }}>AVANT ✗</div>
                <p className="text-sm" style={{ color: 'var(--c-text-2)' }}>{p.pain}</p>
              </div>

              {/* Solution */}
              <div className="rounded-xl p-3.5" style={{ background: `${p.color}08`, border: `1px solid ${p.color}18` }}>
                <div className="text-xs font-bold mb-1" style={{ color: p.color }}>AVEC EVOLIFY ✓</div>
                <p className="text-sm" style={{ color: 'var(--c-text-1)' }}>{p.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
