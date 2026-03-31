'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

const TYPING_WORDS = ['prompts LLM experts', 'workflows n8n', 'outils IA', 'skills Claude', 'visuels Midjourney', 'automatisations']

function TypingWord() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing')
  useEffect(() => {
    const word = TYPING_WORDS[idx % TYPING_WORDS.length]
    let t: ReturnType<typeof setTimeout>
    if (phase === 'typing') {
      t = text.length < word.length
        ? setTimeout(() => setText(word.slice(0, text.length + 1)), 50)
        : setTimeout(() => setPhase('pause'), 2200)
    } else if (phase === 'pause') {
      t = setTimeout(() => setPhase('erasing'), 400)
    } else {
      t = text.length > 0
        ? setTimeout(() => setText(s => s.slice(0, -1)), 24)
        : setTimeout(() => { setIdx(i => i + 1); setPhase('typing') }, 100)
    }
    return () => clearTimeout(t)
  }, [text, phase, idx])
  return (
    <span style={{ color: '#00d4ff', fontWeight: 900 }}>
      {text}
      <span style={{ display: 'inline-block', width: 2, height: '0.9em', background: '#00d4ff', marginLeft: 2, verticalAlign: 'text-bottom', animation: 'cursor-blink 1s step-end infinite' }} />
    </span>
  )
}

function SparkleField() {
  const [sparks, setSparks] = useState<{ id: string; x: number; y: number; color: string; size: number }[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const spawn = () => setSparks(p => [...p.slice(-12), { id: Math.random().toString(36).slice(2), x: 5 + Math.random() * 90, y: 5 + Math.random() * 90, color: Math.random() > 0.5 ? '#00d4ff' : '#00ff87', size: 8 + Math.random() * 8 }])
    const go = () => { timer.current = setTimeout(() => { spawn(); go() }, 700 + Math.random() * 900) }
    spawn(); go()
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparks.map(s => (
        <span key={s.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size, color: s.color, animation: 'sparkle-pop 1200ms ease-out forwards' }}>✦</span>
      ))}
    </div>
  )
}

const TAGS_LEFT = [
  { label: 'ChatGPT', color: '#00a67e' }, { label: 'n8n', color: '#ea4b71' }, { label: 'Midjourney', color: '#a855f7' },
  { label: 'Claude', color: '#d4a27f' }, { label: 'Zapier', color: '#f97316' }, { label: 'Runway', color: '#00d4ff' },
]
const TAGS_RIGHT = [
  { label: 'Marketing', color: '#60a5fa' }, { label: 'Automatisation', color: '#4ade80' }, { label: 'Copywriting', color: '#f87171' },
  { label: 'Prompt', color: '#facc15' }, { label: 'Workflow', color: '#00ff87' }, { label: 'Design IA', color: '#f97316' },
]

function FloatingTags({ tags, side }: { tags: typeof TAGS_LEFT; side: 'left' | 'right' }) {
  return (
    <div className={`hidden lg:flex flex-col gap-2.5 absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'right-full mr-8' : 'left-full ml-8'}`}>
      {tags.map((tag, i) => (
        <div key={tag.label} className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{ background: `${tag.color}15`, border: `1px solid ${tag.color}30`, color: tag.color, animation: `lm-float-${['a', 'b', 'c'][i % 3]} ${8 + i * 1.3}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>
          {tag.label}
        </div>
      ))}
    </div>
  )
}

const hi = (d: number) => ({ animation: `heroIn 0.65s cubic-bezier(0.22,1,0.36,1) ${d}ms both` })

const STATS = [
  { value: '4 000+', label: 'Outils IA', color: '#a855f7' },
  { value: '1 000+', label: 'Prompts LLM', color: '#60a5fa' },
  { value: '8 000+', label: 'Workflows', color: '#4ade80' },
  { value: '8 000+', label: 'Prompts visuels', color: '#f87171' },
  { value: '500+', label: 'Skills & Plugins', color: '#facc15' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-20 overflow-hidden">
      <SparkleField />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff', ...hi(0) }}>
          <Sparkles size={12} />
          La plateforme IA tout-en-un — Full Access 15€/mois
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6" style={hi(80)}>
          <span className="text-white">Trouvez vos </span>
          <TypingWord />
          <br />
          <span className="gradient-text">en moins de 30s</span>
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--c-text-2)', ...hi(160) }}>
          4 000+ outils, 8 000+ workflows, 1 000+ prompts et 500+ skills.
          Tout ce qu'il faut pour exploiter l'IA à son plein potentiel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16" style={hi(240)}>
          <Link href="/inscription"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}>
            Démarrer pour 15€/mois
            <ArrowRight size={16} />
          </Link>
          <Link href="/outils-ia"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-white/[0.08]"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'var(--c-text-1)' }}>
            Explorer gratuitement
          </Link>
        </div>

        <div className="relative inline-block w-full max-w-2xl" style={hi(320)}>
          <FloatingTags tags={TAGS_LEFT} side="left" />
          <FloatingTags tags={TAGS_RIGHT} side="right" />
          <div className="rounded-2xl border overflow-hidden"
            style={{ background: 'rgba(13,20,36,0.8)', borderColor: 'rgba(255,255,255,0.08)', boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.05)' }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#f87171] opacity-60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] opacity-60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80] opacity-60" />
              <div className="flex-1 mx-4 h-5 rounded-md flex items-center px-3 text-[10px]"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--c-text-3)' }}>evolify.fr/outils-ia</div>
              <div className="flex gap-1">
                {['Cards', 'Table', 'Kanban'].map(v => (
                  <div key={v} className="text-[7px] px-1.5 py-0.5 rounded"
                    style={{ background: v === 'Cards' ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)', color: v === 'Cards' ? '#00d4ff' : 'rgba(255,255,255,0.3)' }}>{v}</div>
                ))}
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="h-9 rounded-xl flex items-center px-3 gap-2"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-3.5 h-3.5 rounded-sm" style={{ background: 'rgba(0,212,255,0.3)' }} />
                <div className="h-2 w-40 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {['Gratuit', 'Marketing', 'Code', 'Analyse', 'Image'].map((tag, i) => (
                  <span key={tag} className="text-[8px] px-2 py-0.5 rounded-full"
                    style={{ background: i === 0 ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.05)', color: i === 0 ? '#4ade80' : 'rgba(255,255,255,0.35)' }}>{tag}</span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { name: 'ChatGPT', color: '#00a67e', score: 9.2 }, { name: 'Claude 3.5', color: '#d4a27f', score: 9.5 }, { name: 'Midjourney', color: '#a855f7', score: 9.1 },
                ].map(card => (
                  <div key={card.name} className="rounded-xl p-3 space-y-2"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-7 h-7 rounded-lg" style={{ background: `${card.color}25` }} />
                    <div className="h-2 w-16 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
                    <div className="h-1.5 w-24 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-bold" style={{ color: card.color }}>{card.name}</div>
                      <div className="text-[9px] font-bold" style={{ color: '#00ff87' }}>★ {card.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.15) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        </div>

        <div className="mt-16 flex items-center justify-center flex-wrap gap-8" style={hi(400)}>
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--c-text-3)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
