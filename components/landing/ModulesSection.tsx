'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })
    const els = Array.from(document.querySelectorAll('.reveal'))
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const MODULES = [
  {
    emoji: '🛠️', label: 'Outils IA', color: '#a855f7', href: '/outils-ia', free: true,
    count: '4 000+', desc: 'ChatGPT, Claude, Midjourney, n8n et +4000 autres. Trouvez le bon outil pour chaque tâche.',
    features: ['Filtres avancés multi-critères', 'Cartes / Tableau / Kanban', 'Notes et avis détaillés'],
  },
  {
    emoji: '💬', label: 'Prompts LLM', color: '#60a5fa', href: '/prompts-llm', free: false,
    count: '1 000+', desc: 'Mega-prompts, agents IA et templates pour Claude, GPT-4o et Gemini. Copiez en 1 clic.',
    features: ['20 agents spécialisés', '12 catégories métier', 'Copie vers ChatGPT/Claude'],
  },
  {
    emoji: '🎨', label: 'Prompts Visuels', color: '#f87171', href: '/prompts-visuels', free: false,
    count: '8 000+', desc: 'Prompts optimisés pour Midjourney, DALL-E 3, Flux et Kling AI avec paramètres inclus.',
    features: ['T→Image, T→Vidéo, Upscale', '11 filtres avancés', 'Paramètres inclus (--ar, --v)'],
  },
  {
    emoji: '⚡', label: 'Automatisations', color: '#4ade80', href: '/automatisations', free: false,
    count: '8 000+', desc: 'Workflows n8n, Make et Zapier prêts à importer. Téléchargez le JSON, importez, lancez.',
    features: ['JSON téléchargeable', 'n8n · Make · Zapier', 'ROI estimé par workflow'],
  },
  {
    emoji: '🧩', label: 'Skills & Plugins', color: '#facc15', href: '/skills', free: false,
    count: '500+', desc: 'MCPs Claude, extensions Cursor, plugins Obsidian et templates. Augmentez vos outils IA.',
    features: ['MCPs Claude & Cursor', 'Extensions & plugins', 'Téléchargement .md'],
  },
  {
    emoji: '📚', label: 'Ressources', color: '#00ff87', href: '/ressources', free: true,
    count: '200+', desc: 'Guides, tutoriels YouTube, newsletters et formations pour maîtriser l'IA pas à pas.',
    features: ['Tutoriels vidéo', 'Newsletters & guides', 'Classés par niveau'],
  },
]

export default function ModulesSection() {
  useReveal()

  return (
    <>
      {/* Modules grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
              ✦ 6 modules spécialisés
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Tout l'IA en un seul endroit</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--c-text-2)' }}>
              De la découverte d'outils à l'automatisation complète — tout ce qu'il faut pour travailler avec l'IA.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((mod, i) => (
              <Link href={mod.href} key={mod.label}
                className="reveal group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 block"
                style={{ background: 'rgba(13,20,36,0.6)', border: `1px solid ${mod.color}15`, animationDelay: `${i * 80}ms` }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${mod.color}08 0%, transparent 70%)` }} />
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}25` }}>{mod.emoji}</div>
                    <div>
                      <div className="font-black text-white">{mod.label}</div>
                      <div className="text-xs font-bold" style={{ color: mod.color }}>{mod.count}</div>
                    </div>
                  </div>
                  {mod.free ? (
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80' }}>Gratuit</span>
                  ) : (
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}>Full Access</span>
                  )}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--c-text-2)' }}>{mod.desc}</p>
                <div className="space-y-1.5 mb-5">
                  {mod.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--c-text-3)' }}>
                      <span style={{ color: mod.color }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: mod.color }}>
                  Explorer {mod.label} <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Avant → Evolify → Après</h2>
            <p className="text-base" style={{ color: 'var(--c-text-2)' }}>La transformation réelle de nos utilisateurs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { phase: 'AVANT', icon: '😩', color: '#f87171', points: ['30+ onglets ouverts', 'Heures perdues à chercher', 'Prompts approximatifs', 'Workflows à créer de zéro'] },
              { phase: 'EVOLIFY', icon: '✦', color: '#00d4ff', points: ['1 seule plateforme centralisée', 'Recherche instantanée', 'Prompts testés et notés', 'Workflows prêts à importer'] },
              { phase: 'APRÈS', icon: '🚀', color: '#4ade80', points: ['10x plus productif', '-3h de recherche/semaine', 'Meilleurs résultats IA', 'Focus sur la valeur ajoutée'] },
            ].map((block, i) => (
              <div key={block.phase} className="reveal rounded-2xl p-6"
                style={{ background: 'rgba(13,20,36,0.6)', border: `1px solid ${block.color}20`, animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${block.color}15` }}>{block.icon}</div>
                  <div className="font-black text-xs tracking-widest" style={{ color: block.color }}>{block.phase}</div>
                </div>
                <div className="space-y-2.5">
                  {block.points.map(p => (
                    <div key={p} className="flex items-start gap-2 text-sm" style={{ color: i === 0 ? 'var(--c-text-3)' : 'var(--c-text-2)' }}>
                      <span style={{ color: block.color, flexShrink: 0 }}>{i === 0 ? '✗' : i === 1 ? '→' : '✓'}</span>
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
