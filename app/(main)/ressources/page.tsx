'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  Search, X, ExternalLink, Clock, BookOpen,
  FileText, Play, FlaskConical, Users, GraduationCap,
  Layers, ArrowRight,
} from 'lucide-react'
import { RESOURCES } from '@/data/resources'
import type { Resource } from '@/types'

// ─── META ────────────────────────────────────────────────────────────────────

const MODULE_META: Record<string, { label: string; color: string; rgb: string }> = {
  llm:            { label: 'LLM',            color: '#60a5fa', rgb: '96,165,250'  },
  visuel:         { label: 'Visuel',          color: '#f87171', rgb: '248,113,113' },
  automatisation: { label: 'Automation',      color: '#4ade80', rgb: '74,222,128'  },
  skills:         { label: 'Skills',          color: '#facc15', rgb: '250,204,21'  },
  outils:         { label: 'Outils IA',       color: '#a855f7', rgb: '168,85,247'  },
  resources:      { label: 'Ressources',      color: '#00ff87', rgb: '0,255,135'   },
  global:         { label: 'Global',          color: '#00d4ff', rgb: '0,212,255'   },
}

const TYPE_META: Record<string, { label: string; Icon: React.ElementType; color: string }> = {
  vidéo:         { label: 'Vidéo',       Icon: Play,          color: '#f87171' },
  formation:     { label: 'Formation',   Icon: GraduationCap, color: '#00d4ff' },
  documentation: { label: 'Docs',        Icon: FileText,      color: '#60a5fa' },
  tuto:          { label: 'Tutoriel',    Icon: Play,          color: '#a78bfa' },
  research:      { label: 'Research',    Icon: FlaskConical,  color: '#fbbf24' },
  article:       { label: 'Article',     Icon: BookOpen,      color: '#34d399' },
  news:          { label: 'News',        Icon: Layers,        color: '#fb923c' },
  podcast:       { label: 'Podcast',     Icon: Users,         color: '#818cf8' },
  newsletter:    { label: 'Newsletter',  Icon: FileText,      color: '#22d3ee' },
  classement:    { label: 'Classement',  Icon: Layers,        color: '#f59e0b' },
  guide:         { label: 'Guide',       Icon: BookOpen,      color: '#00d4ff' },
}

function levelColor(level: string) {
  if (level === 'débutant')      return { color: '#4ade80', rgb: '74,222,128' }
  if (level === 'intermédiaire') return { color: '#fbbf24', rgb: '251,191,36' }
  return                                { color: '#f87171', rgb: '248,113,113' }
}

const ALL_TYPES  = Object.keys(TYPE_META)
const ALL_MODS   = Object.keys(MODULE_META)
const ALL_LEVELS = ['débutant', 'intermédiaire', 'avancé']

// ─── FILTER CHIP ─────────────────────────────────────────────────────────────

function Chip({ active, color, rgb, onClick, children, small = false }: {
  active: boolean; color?: string; rgb?: string; onClick: () => void; children: React.ReactNode; small?: boolean
}) {
  return (
    <button onClick={onClick} style={{
      padding: small ? '3px 10px' : '5px 13px', borderRadius: 20,
      fontSize: small ? 10 : 11, fontWeight: active ? 700 : 500,
      color: active ? (color || '#f1f5f9') : '#64748b',
      background: active ? `rgba(${rgb || '255,255,255'},0.12)` : 'rgba(255,255,255,0.03)',
      border: `1px solid ${active ? `rgba(${rgb || '255,255,255'},0.30)` : 'rgba(255,255,255,0.07)'}`,
      cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap' as const,
      boxShadow: active ? `0 0 10px rgba(${rgb || '255,255,255'},0.08)` : 'none',
    }}>
      {children}
    </button>
  )
}

// ─── RESOURCE CARD ───────────────────────────────────────────────────────────

function ResourceCard({ res }: { res: Resource }) {
  const [hovered, setHovered] = useState(false)
  const modKey = Array.isArray(res.module) ? res.module[0] : res.module
  const mod  = MODULE_META[modKey] || MODULE_META.global
  const typ  = TYPE_META[res.content_type]
  const Icon = typ?.Icon ?? FileText
  const lv   = levelColor(res.complexity)

  const isInternal = res.is_internal
  const href = isInternal ? res.url : res.url

  return (
    <a
      href={href}
      target={isInternal ? '_self' : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        background: hovered ? `rgba(${mod.rgb},0.07)` : 'rgba(255,255,255,0.022)',
        border: `1px solid ${hovered ? `rgba(${mod.rgb},0.25)` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16, padding: '16px 16px 14px',
        textDecoration: 'none', transition: 'all 0.22s ease',
        position: 'relative', overflow: 'hidden',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 8px 28px rgba(${mod.rgb},0.12), 0 4px 12px rgba(0,0,0,0.3)` : 'none',
      }}
    >
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, rgba(${mod.rgb},0.8) 0%, transparent 100%)`, borderRadius: '16px 16px 0 0' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: `rgba(${mod.rgb},0.1)`, border: `1px solid rgba(${mod.rgb},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={12} color={mod.color} />
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, color: typ?.color || mod.color, padding: '2px 7px', borderRadius: 9, background: `rgba(${mod.rgb},0.1)`, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
            {typ?.label || res.content_type}
          </span>
          {res.is_internal && (
            <span style={{ fontSize: 9, fontWeight: 700, color: '#00ff87', padding: '2px 7px', borderRadius: 9, background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.18)', textTransform: 'uppercase' as const }}>
              Evolify
            </span>
          )}
        </div>
        <ExternalLink size={10} style={{ color: '#334155', flexShrink: 0 }} />
      </div>

      {/* Name */}
      <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 4, lineHeight: 1.3 }}>
        {res.name}
      </div>

      {/* Source */}
      <div style={{ fontSize: 10, fontWeight: 600, color: mod.color, marginBottom: 8, opacity: 0.85 }}>
        {res.source || 'Evolify'}
        {res.reading_time && <span style={{ color: '#475569', marginLeft: 6 }}>· {res.reading_time} min</span>}
      </div>

      {/* Desc */}
      <p style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.6, flex: 1, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
        {res.desc_short}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' as const }}>
        <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 9, color: lv.color, background: `rgba(${lv.rgb},0.1)`, border: `1px solid rgba(${lv.rgb},0.22)` }}>
          {res.complexity}
        </span>
        {res.tags.slice(0, 2).map(tag => (
          <span key={tag} style={{ fontSize: 9, color: '#475569', padding: '2px 7px', borderRadius: 9, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}

// ─── FEATURED CARD ───────────────────────────────────────────────────────────

function FeaturedCard({ res }: { res: Resource }) {
  const [hovered, setHovered] = useState(false)
  const modKey = Array.isArray(res.module) ? res.module[0] : res.module
  const mod  = MODULE_META[modKey] || MODULE_META.global
  const typ  = TYPE_META[res.content_type]
  const Icon = typ?.Icon ?? FileText

  return (
    <a
      href={res.url}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', position: 'relative', borderRadius: 20, textDecoration: 'none',
        background: `linear-gradient(145deg, rgba(${mod.rgb},0.10) 0%, rgba(8,12,22,0.92) 60%)`,
        border: `1px solid rgba(${mod.rgb},${hovered ? '0.4' : '0.24'})`,
        padding: '32px 32px 28px',
        boxShadow: hovered
          ? `0 0 80px rgba(${mod.rgb},0.14), 0 28px 72px rgba(0,0,0,0.5)`
          : `0 0 60px rgba(${mod.rgb},0.08), 0 20px 56px rgba(0,0,0,0.4)`,
        transition: 'all 0.28s ease', overflow: 'hidden',
        transform: hovered ? 'translateY(-3px)' : 'none',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${mod.color}, transparent)` }} />

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: '4px 12px', borderRadius: 20, background: `rgba(${mod.rgb},0.12)`, border: `1px solid rgba(${mod.rgb},0.28)`, fontSize: 9, fontWeight: 700, color: mod.color, textTransform: 'uppercase' as const, letterSpacing: '0.12em' }}>
        <Icon size={10} />
        {typ?.label || res.content_type} · À la une
      </div>

      <h2 style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.025em', lineHeight: 1.25, marginBottom: 12 }}>
        {res.name}
      </h2>
      <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.7, marginBottom: 20, maxWidth: 600 }}>
        {res.desc_short}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {res.reading_time && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#475569' }}>
              <Clock size={10} /> {res.reading_time} min
            </span>
          )}
          {res.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{ fontSize: 10, color: '#334155', padding: '2px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 11, background: `rgba(${mod.rgb},0.12)`, border: `1px solid rgba(${mod.rgb},0.25)`, color: mod.color, fontSize: 12, fontWeight: 700 }}>
          Lire la ressource <ArrowRight size={11} />
        </div>
      </div>
    </a>
  )
}

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────

function SectionDivider({ icon, label, count, accentRgb }: {
  icon: React.ReactNode; label: string; count: number; accentRgb: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 12, background: `rgba(${accentRgb},0.08)`, border: `1px solid rgba(${accentRgb},0.18)` }}>
        <span style={{ color: `rgb(${accentRgb})`, display: 'flex' }}>{icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: `rgb(${accentRgb})` }}>{label}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#475569' }}>{count}</span>
      </div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, rgba(${accentRgb},0.15), transparent)` }} />
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function RessourcesPage() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })
    const els = Array.from(document.querySelectorAll('.reveal'))
    els.forEach(el => obs.observe(el))
    const fb = setTimeout(() => { els.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight + 100) el.classList.add('visible') }) }, 150)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [])

  const [search,    setSearch]    = useState('')
  const [modFilter, setModFilter] = useState('all')
  const [typeFilter,setTypeFilter]= useState('all')
  const [lvlFilter, setLvlFilter] = useState('all')
  const [freeOnly,  setFreeOnly]  = useState(false)
  const [internalOnly, setInternalOnly] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return (RESOURCES as Resource[]).filter(r => {
      const modArr = Array.isArray(r.module) ? r.module : [r.module]
      if (modFilter !== 'all' && !modArr.includes(modFilter)) return false
      if (typeFilter !== 'all' && r.content_type !== typeFilter) return false
      if (lvlFilter  !== 'all' && r.complexity   !== lvlFilter)  return false
      if (freeOnly     && !r.is_free)     return false
      if (internalOnly && !r.is_internal) return false
      if (q) {
        const hay = `${r.name} ${r.desc_short} ${r.source} ${(r.tags || []).join(' ')} ${(r.use_cases || []).join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [search, modFilter, typeFilter, lvlFilter, freeOnly, internalOnly])

  const hasFilters = search || modFilter !== 'all' || typeFilter !== 'all' || lvlFilter !== 'all' || freeOnly || internalOnly
  const featured   = !hasFilters ? (RESOURCES as Resource[]).find(r => r.featured) : null

  const TOTAL = RESOURCES.length

  return (
    <div className="relative z-10 pt-10 pb-20 px-6">
      <style>{`
        @keyframes heroIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .reveal { opacity:0; transform:translateY(18px); transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1); }
        .reveal.visible { opacity:1; transform:none; }
      `}</style>

      {/* Background gradient */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '100vh', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(96,165,250,0.05) 0%, rgba(0,212,255,0.02) 40%, transparent 70%)' }} />

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            animation: 'heroIn 0.65s cubic-bezier(0.22,1,0.36,1) both',
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 14px', borderRadius: 20, marginBottom: 18,
            fontSize: 11, fontWeight: 600,
            background: 'rgba(96,165,250,0.10)', border: '1px solid rgba(96,165,250,0.25)', color: '#60a5fa',
          }}>
            <Layers size={11} />
            {TOTAL}+ ressources IA sélectionnées
          </div>

          <h1 style={{
            animation: 'heroIn 0.65s cubic-bezier(0.22,1,0.36,1) 80ms both',
            fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 900,
            color: '#f1f5f9', letterSpacing: '-0.035em', marginBottom: 12, lineHeight: 1.1,
          }}>
            Tout pour maîtriser{' '}
            <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              l&apos;IA
            </span>
          </h1>

          <p style={{
            animation: 'heroIn 0.65s cubic-bezier(0.22,1,0.36,1) 160ms both',
            fontSize: 'clamp(14px, 2vw, 17px)', color: '#64748b', maxWidth: 520, margin: '0 auto 24px',
          }}>
            Articles, formations, documentation, tutoriels — filtrés par module, niveau et type.
          </p>

          {/* Search bar */}
          <div style={{
            animation: 'heroIn 0.65s cubic-bezier(0.22,1,0.36,1) 220ms both',
            position: 'relative', maxWidth: 540, margin: '0 auto',
          }}>
            <Search size={15} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher une ressource…"
              style={{
                width: '100%', padding: '11px 40px 11px 42px', borderRadius: 14,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                color: '#e2e8f0', fontSize: 14, outline: 'none',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(96,165,250,0.4)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 4 }}>
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ── FILTERS ──────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Module filter */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, alignItems: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginRight: 4 }}>Module</span>
            <Chip active={modFilter === 'all'} onClick={() => setModFilter('all')}>Tous</Chip>
            {ALL_MODS.map(m => (
              <Chip key={m} active={modFilter === m} color={MODULE_META[m].color} rgb={MODULE_META[m].rgb} onClick={() => setModFilter(modFilter === m ? 'all' : m)}>
                {MODULE_META[m].label}
              </Chip>
            ))}
          </div>

          {/* Type filter */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, alignItems: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginRight: 4 }}>Type</span>
            <Chip active={typeFilter === 'all'} onClick={() => setTypeFilter('all')}>Tous</Chip>
            {ALL_TYPES.map(t => (
              <Chip key={t} active={typeFilter === t} color={TYPE_META[t].color} rgb={TYPE_META[t].color.replace('#', '')} onClick={() => setTypeFilter(typeFilter === t ? 'all' : t)} small>
                {TYPE_META[t].label}
              </Chip>
            ))}
          </div>

          {/* Level + toggles */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, alignItems: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginRight: 4 }}>Niveau</span>
            <Chip active={lvlFilter === 'all'} onClick={() => setLvlFilter('all')}>Tous</Chip>
            {ALL_LEVELS.map(l => {
              const lv = levelColor(l)
              return <Chip key={l} active={lvlFilter === l} color={lv.color} rgb={lv.rgb} onClick={() => setLvlFilter(lvlFilter === l ? 'all' : l)} small>{l.charAt(0).toUpperCase() + l.slice(1)}</Chip>
            })}
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)', margin: '0 4px' }} />
            <Chip active={freeOnly} color="#4ade80" rgb="74,222,128" onClick={() => setFreeOnly(f => !f)} small>🆓 Gratuit</Chip>
            <Chip active={internalOnly} color="#00ff87" rgb="0,255,135" onClick={() => setInternalOnly(f => !f)} small>✍️ Evolify</Chip>
            {hasFilters && (
              <button onClick={() => { setSearch(''); setModFilter('all'); setTypeFilter('all'); setLvlFilter('all'); setFreeOnly(false); setInternalOnly(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 20, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
                <X size={9} /> Effacer
              </button>
            )}
          </div>
        </div>

        {/* ── RESULTS COUNT ────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 12, color: '#475569' }}>
            {filtered.length} ressource{filtered.length !== 1 ? 's' : ''}
            {hasFilters && <span style={{ color: '#60a5fa' }}> · filtrées</span>}
          </p>
        </div>

        {/* ── FEATURED ─────────────────────────────────────────────────────── */}
        {featured && (
          <div className="reveal" style={{ marginBottom: 36 }}>
            <FeaturedCard res={featured} />
          </div>
        )}

        {/* ── EVOLIFY ORIGINALS SECTION ────────────────────────────────────── */}
        {!hasFilters && (() => {
          const originals = (RESOURCES as Resource[]).filter(r => r.is_internal && !r.featured)
          if (!originals.length) return null
          return (
            <div className="reveal" style={{ marginBottom: 40 }}>
              <SectionDivider icon={<BookOpen size={13} />} label="Contenus Evolify" count={originals.length} accentRgb="0,255,135" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                {originals.map(r => <ResourceCard key={r.id} res={r} />)}
              </div>
            </div>
          )
        })()}

        {/* ── ALL RESULTS ──────────────────────────────────────────────────── */}
        {hasFilters ? (
          filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#475569' }}>
              <Search size={32} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ fontSize: 15, marginBottom: 8 }}>Aucune ressource trouvée</p>
              <p style={{ fontSize: 12 }}>Essayez de modifier vos filtres</p>
            </div>
          ) : (
            <div className="reveal">
              <SectionDivider icon={<Search size={13} />} label="Résultats" count={filtered.length} accentRgb="96,165,250" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                {filtered.map(r => <ResourceCard key={r.id} res={r} />)}
              </div>
            </div>
          )
        ) : (() => {
          // Group by type
          const byType: Record<string, Resource[]> = {}
          ;(RESOURCES as Resource[]).filter(r => !r.featured && !r.is_internal).forEach(r => {
            const t = r.content_type
            if (!byType[t]) byType[t] = []
            byType[t].push(r)
          })
          return Object.entries(byType).map(([type, items]) => {
            const meta = TYPE_META[type]
            if (!meta || !items.length) return null
            const Icon = meta.Icon
            return (
              <div key={type} className="reveal" style={{ marginBottom: 40 }}>
                <SectionDivider icon={<Icon size={13} />} label={meta.label} count={items.length} accentRgb={meta.color.replace('#', '')} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                  {items.map(r => <ResourceCard key={r.id} res={r} />)}
                </div>
              </div>
            )
          })
        })()}

      </div>
    </div>
  )
}
