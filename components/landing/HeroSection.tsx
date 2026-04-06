'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Copy, Download, Star } from 'lucide-react'

// ─── TYPING WORDS ──────────────────────────────────────────────────────────────
const TYPING_WORDS = [
  'un prompt de prospection',
  'un workflow n8n',
  'un outil de montage IA',
  'un skill pour Claude',
  'une formation pour débuter',
]

// ─── TYPING WORD COMPONENT ────────────────────────────────────────────────────
function TypingWord() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = TYPING_WORDS[idx % TYPING_WORDS.length]
    let t: ReturnType<typeof setTimeout> | undefined
    if (phase === 'typing') {
      t = text.length < word.length
        ? setTimeout(() => setText(word.slice(0, text.length + 1)), 50)
        : setTimeout(() => setPhase('pause'), 2000)
    } else if (phase === 'pause') {
      t = setTimeout(() => setPhase('erasing'), 400)
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(s => s.slice(0, -1)), 24)
      } else {
        setIdx(i => i + 1)
        setPhase('typing')
      }
    }
    return () => clearTimeout(t)
  }, [text, phase, idx])

  return (
    <span style={{ color: '#00d4ff', fontWeight: 700 }}>
      {text}
      <span style={{
        display: 'inline-block',
        width: 2,
        height: '1em',
        background: '#00d4ff',
        marginLeft: 2,
        verticalAlign: 'text-bottom',
        animation: 'cursor-blink 1s step-end infinite',
      }} />
    </span>
  )
}

// ─── SPARKLE FIELD ────────────────────────────────────────────────────────────
function SparkleField() {
  const [sparks, setSparks] = useState<{id:string;x:number;y:number;color:string;size:number}[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const spawn = () => setSparks(p => [
      ...p.slice(-8),
      {
        id: Math.random().toString(36).slice(2),
        x: 5 + Math.random() * 90,
        y: 10 + Math.random() * 80,
        color: Math.random() > 0.5 ? '#00d4ff' : '#00ff87',
        size: 7 + Math.random() * 8,
      },
    ])
    spawn()
    const go = () => {
      timer.current = setTimeout(() => { spawn(); go() }, 1000 + Math.random() * 800)
    }
    go()
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {sparks.map(s => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
            color: s.color,
            pointerEvents: 'none',
            animation: 'sparkle-pop 1200ms ease-out forwards',
          }}
        >✦</span>
      ))}
    </div>
  )
}

// ─── SLIDES DATA ──────────────────────────────────────────────────────────────
const SLIDES = [
  { id: 0, label: 'Outils IA',       accent: '#a855f7', rgb: '168,85,247',  content: 'tools'     },
  { id: 1, label: 'Prompts LLM',     accent: '#60a5fa', rgb: '96,165,250',  content: 'prompts'   },
  { id: 2, label: 'Workflows',        accent: '#4ade80', rgb: '74,222,128',  content: 'workflows' },
  { id: 3, label: 'Prompts visuels', accent: '#f87171', rgb: '248,113,113', content: 'visual'    },
  { id: 4, label: 'Skills',           accent: '#facc15', rgb: '250,204,21',  content: 'skills'    },
]

// ─── SLIDE CONTENT COMPONENTS ─────────────────────────────────────────────────
function SlideTools({ accent, rgb }: { accent: string; rgb: string }) {
  const tools = [
    { name: 'ChatGPT',    cat: 'LLM',   stars: 5, badge: 'Top',  free: true  },
    { name: 'Claude',     cat: 'LLM',   stars: 5, badge: 'Top',  free: true  },
    { name: 'Midjourney', cat: 'Image', stars: 5, badge: '★',    free: false },
    { name: 'n8n',        cat: 'Auto',  stars: 4, badge: 'Open', free: true  },
  ]
  return (
    <div style={{ animation: 'slide-fade-in 0.3s ease forwards' }}>
      <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
        {['Tous', 'LLM', 'Image', 'Gratuit'].map((c, i) => (
          <span key={c} style={{
            padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600,
            background: i === 0 ? `rgba(${rgb},0.25)` : 'rgba(255,255,255,0.07)',
            color: i === 0 ? accent : 'rgba(255,255,255,0.5)',
            border: `1px solid ${i === 0 ? `rgba(${rgb},0.4)` : 'rgba(255,255,255,0.1)'}`,
          }}>{c}</span>
        ))}
      </div>
      {tools.map((t, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px',
          borderRadius: 11, marginBottom: 6,
          background: i === 0 ? `rgba(${rgb},0.12)` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${i === 0 ? `rgba(${rgb},0.32)` : 'rgba(255,255,255,0.07)'}`,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `rgba(${rgb},0.22)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 12, color: accent, flexShrink: 0,
          }}>
            {t.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9' }}>{t.name}</span>
              <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: `rgba(${rgb},0.25)`, color: accent }}>{t.badge}</span>
              {t.free && <span style={{ fontSize: 9, color: '#4ade80', fontWeight: 700 }}>Gratuit</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{t.cat}</span>
              <span style={{ display: 'flex', gap: 1 }}>
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={7} style={{ color: j < t.stars ? accent : 'rgba(255,255,255,0.12)', fill: j < t.stars ? accent : 'transparent' }} />
                ))}
              </span>
            </div>
          </div>
        </div>
      ))}
      <p style={{ fontSize: 9, color: `rgba(${rgb},0.7)`, textAlign: 'right', fontWeight: 700, marginTop: 4 }}>4 000+ outils →</p>
    </div>
  )
}

function SlidePrompts({ accent, rgb }: { accent: string; rgb: string }) {
  return (
    <div style={{ animation: 'slide-fade-in 0.3s ease forwards' }}>
      {['🚀 Prompt Sales', '📈 Prompt Marketing', '📊 Prompt Finance', '👥 Agent RH'].map((a, i) => (
        <div key={a} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 11px', borderRadius: 9, marginBottom: 5,
          background: i === 0 ? `rgba(${rgb},0.12)` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${i === 0 ? `rgba(${rgb},0.3)` : 'rgba(255,255,255,0.07)'}`,
        }}>
          <span style={{ fontSize: 10, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#f1f5f9' : 'rgba(255,255,255,0.6)' }}>{a}</span>
          <ArrowRight size={9} style={{ color: i === 0 ? accent : 'rgba(255,255,255,0.3)' }} />
        </div>
      ))}
      <p style={{ fontSize: 9, color: `rgba(${rgb},0.7)`, textAlign: 'right', fontWeight: 700, marginTop: 4 }}>1 000+ prompts →</p>
    </div>
  )
}

function SlideWorkflows({ accent, rgb }: { accent: string; rgb: string }) {
  return (
    <div style={{ animation: 'slide-fade-in 0.3s ease forwards' }}>
      {[
        { name: 'Lead scraper',  tool: 'n8n',    level: 'Débutant' },
        { name: 'Auto content',  tool: 'Make',   level: 'Intermédiaire' },
        { name: 'CRM follow-up', tool: 'Zapier', level: 'Débutant' },
        { name: 'Email triage',  tool: 'n8n',    level: 'Avancé' },
      ].map((w, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 11px', borderRadius: 9, marginBottom: 5,
          background: i === 0 ? `rgba(${rgb},0.12)` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${i === 0 ? `rgba(${rgb},0.3)` : 'rgba(255,255,255,0.07)'}`,
        }}>
          <span style={{ fontSize: 10, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#f1f5f9' : 'rgba(255,255,255,0.6)' }}>{w.name}</span>
          <div style={{ display: 'flex', gap: 5 }}>
            <span style={{ fontSize: 9, color: accent, fontWeight: 600 }}>{w.tool}</span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{w.level}</span>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 7, marginTop: 8 }}>
        <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px', borderRadius: 8, fontSize: 10, fontWeight: 600, background: `rgba(${rgb},0.16)`, color: accent, border: `1px solid rgba(${rgb},0.3)`, cursor: 'pointer' }}>
          <Copy size={9} /> JSON
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 10px', borderRadius: 8, fontSize: 10, fontWeight: 600, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
          <Download size={9} />
        </button>
      </div>
      <p style={{ fontSize: 9, color: `rgba(${rgb},0.7)`, textAlign: 'right', fontWeight: 700, marginTop: 6 }}>8 000+ workflows →</p>
    </div>
  )
}

function SlideVisual({ accent, rgb }: { accent: string; rgb: string }) {
  return (
    <div style={{ animation: 'slide-fade-in 0.3s ease forwards' }}>
      <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
        {['🖼️ T2I', '🎬 T2V', '🎞️ I2V', '🔍 Upscale'].map((b, i) => (
          <span key={b} style={{
            padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600,
            background: i === 0 ? `rgba(${rgb},0.22)` : 'rgba(255,255,255,0.06)',
            color: i === 0 ? accent : 'rgba(255,255,255,0.5)',
            border: `1px solid ${i === 0 ? `rgba(${rgb},0.38)` : 'rgba(255,255,255,0.08)'}`,
          }}>{b}</span>
        ))}
      </div>
      <div style={{ padding: '11px 13px', borderRadius: 11, marginBottom: 7, background: `rgba(${rgb},0.09)`, border: `1px solid rgba(${rgb},0.28)` }}>
        <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
          <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `rgba(${rgb},0.3)`, color: accent }}>Midjourney</span>
          <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>Produit</span>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, marginBottom: 9 }}>
          Photo produit luxe parfum, fond noir velours, éclairage latéral dramatique, reflets dorés, 8K…
        </p>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 8, fontSize: 10, fontWeight: 700, background: `rgba(${rgb},0.22)`, color: accent, border: `1px solid rgba(${rgb},0.35)`, cursor: 'pointer' }}>
          <Copy size={9} /> Copier le prompt
        </button>
      </div>
      {['Portrait cinématique urbain', 'UI dark futuriste app'].map((p, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 11px', borderRadius: 9, marginBottom: 5, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>{p}</span>
          <ArrowRight size={9} style={{ color: accent }} />
        </div>
      ))}
      <p style={{ fontSize: 9, color: `rgba(${rgb},0.7)`, textAlign: 'right', fontWeight: 700 }}>8 000+ prompts visuels →</p>
    </div>
  )
}

function SlideSkills({ accent, rgb }: { accent: string; rgb: string }) {
  return (
    <div style={{ animation: 'slide-fade-in 0.3s ease forwards' }}>
      {[
        { name: 'Claude Skill',  compat: 'Claude', badge: 'Natif'  },
        { name: 'GPT Plugin',    compat: 'GPT-4',  badge: 'Plugin' },
        { name: 'Cursor Skill',  compat: 'Cursor', badge: 'IDE'    },
        { name: 'Notion Plugin', compat: 'Notion', badge: 'App'    },
      ].map((s, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '9px 11px', borderRadius: 10, marginBottom: 6,
          background: i === 0 ? `rgba(${rgb},0.14)` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${i === 0 ? `rgba(${rgb},0.32)` : 'rgba(255,255,255,0.07)'}`,
        }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: i === 0 ? '#f1f5f9' : 'rgba(255,255,255,0.65)', marginBottom: 2 }}>{s.name}</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{s.compat}</p>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: `rgba(${rgb},0.2)`, color: accent }}>{s.badge}</span>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px', borderRadius: 8, fontSize: 10, fontWeight: 600, background: `rgba(${rgb},0.16)`, color: accent, border: `1px solid rgba(${rgb},0.3)`, cursor: 'pointer' }}>
          <Download size={9} /> skill.md
        </button>
      </div>
      <p style={{ fontSize: 9, color: `rgba(${rgb},0.7)`, textAlign: 'right', fontWeight: 700, marginTop: 6 }}>500+ skills →</p>
    </div>
  )
}

// ─── PRODUCT PREVIEW ──────────────────────────────────────────────────────────
const PREVIEW_DURATION = 5000

function ProductPreview({ active, onActive }: { active: number; onActive: (n: number) => void }) {
  const [slideKey, setSlideKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const raf = useRef<number | null>(null)
  const startTime = useRef<number | null>(null)

  const go = useCallback((n: number) => {
    onActive(n)
    setSlideKey(k => k + 1)
    setProgress(0)
    startTime.current = performance.now()
  }, [onActive])

  useEffect(() => {
    startTime.current = performance.now()
    const tick = (now: number) => {
      const elapsed = now - (startTime.current || now)
      const p = Math.min((elapsed / PREVIEW_DURATION) * 100, 100)
      setProgress(p)
      if (p >= 100) {
        go((active + 1) % SLIDES.length)
      } else {
        raf.current = requestAnimationFrame(tick)
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [active, go])

  const slide = SLIDES[active]
  const slideProps = { accent: slide.accent, rgb: slide.rgb, key: slideKey }

  const contentMap: Record<string, React.ReactNode> = {
    tools:     <SlideTools     {...slideProps} />,
    prompts:   <SlidePrompts   {...slideProps} />,
    workflows: <SlideWorkflows {...slideProps} />,
    visual:    <SlideVisual    {...slideProps} />,
    skills:    <SlideSkills    {...slideProps} />,
  }
  const content = contentMap[slide.content]

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 390, animation: 'previewIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}>
      {/* Ambient glow behind card */}
      <div style={{
        position: 'absolute', inset: -32, borderRadius: 40,
        pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse 75% 65% at 50% 50%, rgba(${slide.rgb},0.14), transparent)`,
        transition: 'background 0.7s ease',
      }} />
      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderRadius: 16, overflow: 'hidden',
        background: 'rgba(5,9,20,0.98)',
        border: `1px solid rgba(${slide.rgb},0.3)`,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 32px 72px rgba(0,0,0,0.75), 0 0 52px rgba(${slide.rgb},0.1)`,
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        animation: 'float-y 6s ease-in-out infinite',
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '9px 13px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginLeft: 4 }}>evolify.app</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: slide.accent, boxShadow: `0 0 6px ${slide.accent}` }} />
            <span style={{ fontSize: 10, color: slide.accent, fontWeight: 700 }}>{slide.label}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${slide.accent}, rgba(${slide.rgb},0.6))`,
            transition: 'none',
          }} />
        </div>
        {/* Slide content */}
        <div style={{ padding: 13, minHeight: 246 }}>{content}</div>
      </div>
      {/* Dots navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === active ? 18 : 6,
              height: 6,
              borderRadius: 3,
              border: 'none',
              cursor: 'pointer',
              background: i === active ? slide.accent : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: 10, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
        Cherchez · Filtrez · Comprenez · Utilisez
      </p>
    </div>
  )
}

// ─── MODULE PILLS ─────────────────────────────────────────────────────────────
const PILL_ITEMS = [
  { label: 'Outils IA',       color: '#a855f7', rgb: '168,85,247'  },
  { label: 'Prompts LLM',     color: '#60a5fa', rgb: '96,165,250'  },
  { label: 'Workflows',       color: '#4ade80', rgb: '74,222,128'  },
  { label: 'Prompts Visuels', color: '#f87171', rgb: '248,113,113' },
  { label: 'Skills',          color: '#facc15', rgb: '250,204,21'  },
  { label: 'Ressources',      color: '#00d4ff', rgb: '0,212,255'   },
]

function ModulePills({ active }: { active: number }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {PILL_ITEMS.map((item, i) => (
        <span
          key={i}
          style={{
            padding: '5px 13px', borderRadius: 20, fontSize: 12, fontWeight: 600,
            transition: 'all 0.5s ease',
            background: i === active ? `rgba(${item.rgb},0.15)` : 'transparent',
            border: `1px solid ${i === active ? `rgba(${item.rgb},0.4)` : 'rgba(255,255,255,0.07)'}`,
            color: i === active ? item.color : 'rgba(255,255,255,0.2)',
            transform: i === active ? 'scale(1.05)' : 'scale(1)',
            boxShadow: i === active ? `0 0 14px rgba(${item.rgb},0.18)` : 'none',
          }}
        >
          {item.label}
        </span>
      ))}
    </div>
  )
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
const hi = (d: number) => ({ animation: `heroIn 0.65s cubic-bezier(0.22,1,0.36,1) ${d}ms both` })

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <section className="relative min-h-[calc(100vh-56px)] flex items-center px-4 py-20 overflow-hidden">
      <SparkleField />

      {/* Ambient glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', left: '-5%',
          width: 600, height: 600,
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', right: '-5%',
          width: 500, height: 500,
          background: 'radial-gradient(ellipse, rgba(0,255,135,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      {/* 2-column layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

        {/* LEFT COLUMN */}
        <div className="flex-1 min-w-0 flex flex-col items-start gap-6 lg:max-w-[56%]">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              color: '#00d4ff',
              ...hi(0),
            }}
          >
            <Sparkles size={12} />
            La plateforme IA tout-en-un — Full Access 15€/mois
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight"
            style={hi(80)}
          >
            <span style={{ color: 'var(--c-text-1)' }}>Trouvez </span>
            <TypingWord />
            <br />
            <span className="gradient-text">en moins de 30s</span>
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: 'var(--c-text-2)', ...hi(160) }}
          >
            4 000+ outils, 8 000+ workflows, 1 000+ prompts et 500+ skills.
            Tout ce qu'il faut pour exploiter l'IA à son plein potentiel.
          </p>

          {/* Module Pills */}
          <div style={hi(200)}>
            <ModulePills active={activeSlide} />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3" style={hi(240)}>
            <Link
              href="/outils-ia"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}
            >
              Commencer gratuitement
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-white/[0.08]"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'var(--c-text-1)' }}
            >
              Découvrir la plateforme
            </Link>
          </div>

          {/* Fine print */}
          <p
            className="text-xs"
            style={{ color: 'var(--c-text-3)', ...hi(280) }}
          >
            Sans carte bancaire · Accès instantané · Annulable à tout moment
          </p>
        </div>

        {/* RIGHT COLUMN — hidden on mobile */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <ProductPreview active={activeSlide} onActive={setActiveSlide} />
        </div>

      </div>
    </section>
  )
}
