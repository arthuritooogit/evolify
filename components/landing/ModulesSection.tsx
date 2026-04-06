'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Wrench, MessageSquare, ImageIcon, Zap, Puzzle, BookOpen } from 'lucide-react'

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })
    const els = Array.from(document.querySelectorAll('.reveal'))
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

interface ModuleDef {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  label: string
  color: string
  rgb: string
  href: string
  free: boolean
  count: string
  promise: string
  desc: string
  features: string[]
}

const MODULES: ModuleDef[] = [
  {
    icon: Wrench,
    label: 'Outils IA',
    color: '#a855f7',
    rgb: '168,85,247',
    href: '/outils-ia',
    free: true,
    count: '4 000+',
    promise: 'Trouvez le bon outil en 30 secondes',
    desc: 'ChatGPT, Claude, Midjourney, n8n et +4000 autres. La base la plus complète, filtrée et notée.',
    features: ['Filtres avancés multi-critères', 'Cartes / Tableau / Kanban', 'Notes et avis détaillés'],
  },
  {
    icon: MessageSquare,
    label: 'Prompts LLM',
    color: '#60a5fa',
    rgb: '96,165,250',
    href: '/prompts-llm',
    free: false,
    count: '1 000+',
    promise: 'Copiez un prompt pro en 1 clic',
    desc: 'Mega-prompts, agents IA et templates pour Claude, GPT-4o et Gemini — prêts à l\'emploi.',
    features: ['20 agents spécialisés', '12 catégories métier', 'Copie vers ChatGPT/Claude'],
  },
  {
    icon: ImageIcon,
    label: 'Prompts Visuels',
    color: '#f87171',
    rgb: '248,113,113',
    href: '/prompts-visuels',
    free: false,
    count: '8 000+',
    promise: 'Des visuels pro dès le 1er essai',
    desc: 'Prompts optimisés pour Midjourney, DALL-E 3, Flux et Kling AI avec paramètres inclus.',
    features: ['T→Image, T→Vidéo, Upscale', '11 filtres avancés', 'Paramètres inclus (--ar, --v)'],
  },
  {
    icon: Zap,
    label: 'Automatisations',
    color: '#4ade80',
    rgb: '74,222,128',
    href: '/automatisations',
    free: false,
    count: '8 000+',
    promise: 'Importez, lancez, automatisez',
    desc: 'Workflows n8n, Make et Zapier prêts à importer. Téléchargez le JSON, importez, lancez.',
    features: ['JSON téléchargeable', 'n8n · Make · Zapier', 'ROI estimé par workflow'],
  },
  {
    icon: Puzzle,
    label: 'Skills & Plugins',
    color: '#facc15',
    rgb: '250,204,21',
    href: '/skills',
    free: false,
    count: '500+',
    promise: 'Boostez vos outils IA existants',
    desc: 'MCPs Claude, extensions Cursor, plugins Obsidian et templates. Augmentez vos outils IA.',
    features: ['MCPs Claude & Cursor', 'Extensions & plugins', 'Téléchargement .md'],
  },
  {
    icon: BookOpen,
    label: 'Ressources',
    color: '#00ff87',
    rgb: '0,255,135',
    href: '/ressources',
    free: true,
    count: '200+',
    promise: 'Montez en compétences vite',
    desc: 'Guides, tutoriels vidéo, newsletters et formations pour maîtriser l\'IA pas à pas.',
    features: ['Tutoriels vidéo', 'Newsletters & guides', 'Classés par niveau'],
  },
]

interface ImpactBlock {
  phase: string
  icon: string
  color: string
  points: string[]
  marker: string
}

const IMPACT_BLOCKS: ImpactBlock[] = [
  {
    phase: 'AVANT',
    icon: '😩',
    color: '#f87171',
    marker: '✗',
    points: ['30+ onglets ouverts', 'Heures perdues à chercher', 'Prompts approximatifs', 'Workflows à créer de zéro'],
  },
  {
    phase: 'EVOLIFY',
    icon: '✦',
    color: '#00d4ff',
    marker: '→',
    points: ['1 seule plateforme centralisée', 'Recherche instantanée', 'Prompts testés et notés', 'Workflows prêts à importer'],
  },
  {
    phase: 'APRÈS',
    icon: '🚀',
    color: '#4ade80',
    marker: '✓',
    points: ['10x plus productif', '-3h de recherche/semaine', 'Meilleurs résultats IA', 'Focus sur la valeur ajoutée'],
  },
]

export default function ModulesSection() {
  useReveal()

  return (
    <>
      {/* ── Modules grid ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 reveal">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}
            >
              ✦ 6 modules spécialisés
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">Tout l&apos;IA en un seul endroit</h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--c-text-2)' }}>
              De la découverte d&apos;outils à l&apos;automatisation complète — tout ce qu&apos;il faut pour travailler avec l&apos;IA.
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((mod, i) => (
              <Link
                href={mod.href}
                key={mod.label}
                className="reveal group block"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  style={{
                    background: 'rgba(13,20,36,0.65)',
                    border: `1px solid rgba(${mod.rgb},0.14)`,
                    borderRadius: 22,
                    padding: '28px 24px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease, border-color 0.28s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = `0 20px 48px rgba(${mod.rgb},0.20), 0 4px 16px rgba(0,0,0,0.3)`
                    e.currentTarget.style.borderColor = `rgba(${mod.rgb},0.40)`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = ''
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = `rgba(${mod.rgb},0.14)`
                  }}
                >
                  {/* Top gradient line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: '22px 22px 0 0',
                    background: `linear-gradient(90deg, transparent, rgba(${mod.rgb},0.7), transparent)`,
                    opacity: 0.6,
                  }} />

                  {/* Radial hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                    style={{ background: `radial-gradient(ellipse at top left, rgba(${mod.rgb},0.09) 0%, transparent 65%)`, borderRadius: 22 }}
                  />

                  {/* Icon + count row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                      background: `rgba(${mod.rgb},0.14)`, border: `1px solid rgba(${mod.rgb},0.22)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s ease',
                    }}
                      className="group-hover:scale-110"
                    >
                      <mod.icon size={24} style={{ color: mod.color }} />
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      {/* Big count */}
                      <div style={{ fontSize: 26, fontWeight: 900, color: mod.color, lineHeight: 1 }}>{mod.count}</div>
                      {/* Free / Full badge */}
                      {mod.free ? (
                        <span style={{
                          display: 'inline-block', marginTop: 4,
                          fontSize: 9, padding: '2px 8px', borderRadius: 10, fontWeight: 700,
                          background: 'rgba(74,222,128,0.12)', color: '#4ade80',
                          border: '1px solid rgba(74,222,128,0.22)',
                        }}>Gratuit</span>
                      ) : (
                        <span style={{
                          display: 'inline-block', marginTop: 4,
                          fontSize: 9, padding: '2px 8px', borderRadius: 10, fontWeight: 700,
                          background: 'rgba(0,212,255,0.08)', color: '#00d4ff',
                          border: '1px solid rgba(0,212,255,0.18)',
                        }}>Full Access</span>
                      )}
                    </div>
                  </div>

                  {/* Label */}
                  <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--c-text-1)', marginBottom: 4 }}>{mod.label}</div>

                  {/* Promise */}
                  <div style={{ fontSize: 12, fontWeight: 600, color: mod.color, marginBottom: 10 }}>{mod.promise}</div>

                  {/* Desc */}
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--c-text-2)', marginBottom: 16, flex: 1 }}>{mod.desc}</p>

                  {/* Feature bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
                    {mod.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--c-text-3)' }}>
                        <span style={{
                          width: 16, height: 16, borderRadius: 5, flexShrink: 0,
                          background: `rgba(${mod.rgb},0.15)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 8, fontWeight: 900, color: mod.color,
                        }}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: 13, fontWeight: 700, color: mod.color,
                    paddingTop: 14, borderTop: `1px solid rgba(${mod.rgb},0.12)`,
                  }}>
                    Explorer {mod.label}
                    <ArrowRight size={13} style={{ transition: 'transform 0.2s' }} className="group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Avant → Evolify → Après ──────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: '#a855f7' }}
            >
              ✦ L&apos;impact réel
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Avant{' '}
              <span style={{ color: 'var(--c-text-3)' }}>→</span>{' '}
              <span style={{ color: '#00d4ff' }}>Evolify</span>{' '}
              <span style={{ color: 'var(--c-text-3)' }}>→</span>{' '}
              Après
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--c-text-2)' }}>
              La transformation réelle de nos utilisateurs en quelques semaines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {IMPACT_BLOCKS.map((block, i) => (
              <div
                key={block.phase}
                className="reveal rounded-2xl p-7"
                style={{
                  background: 'rgba(13,20,36,0.65)',
                  border: `1px solid rgba(${block.color === '#f87171' ? '248,113,113' : block.color === '#00d4ff' ? '0,212,255' : '74,222,128'},0.18)`,
                  animationDelay: `${i * 100}ms`,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${block.color}99, transparent)`,
                }} />

                {/* Phase header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                    background: `${block.color}15`, border: `1px solid ${block.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, lineHeight: 1,
                  }}>
                    {block.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: block.color, textTransform: 'uppercase' }}>
                      {block.phase}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--c-text-3)', marginTop: 2 }}>
                      {i === 0 ? 'La réalité sans Evolify' : i === 1 ? 'Ce que vous obtenez' : 'Ce que vous ressentez'}
                    </div>
                  </div>
                </div>

                {/* Points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {block.points.map(p => (
                    <div key={p}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13,
                        color: i === 0 ? 'var(--c-text-3)' : 'var(--c-text-2)',
                      }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 6, flexShrink: 0, marginTop: 1,
                        background: `${block.color}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, fontWeight: 900, color: block.color,
                      }}>
                        {block.marker}
                      </span>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
