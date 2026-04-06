'use client'

import { useState, useRef, useId } from 'react'
import {
  Brain, Palette, Film, Zap, Cpu, Terminal, Mic, PenTool,
  PenLine, Search, Database, BarChart3, Music, Layers,
  ChevronDown, ChevronUp, ExternalLink, Flame, Star,
  Sparkles, X,
} from 'lucide-react'
import { TOOLS } from '@/data/tools'
import type { AiTool } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────
const COLOR = '#a855f7'

interface CatMeta {
  color: string
  rgb: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  label: string
  tagMatch: string[]
}

const CATEGORIES: CatMeta[] = [
  { label: 'LLM',          color: '#60a5fa', rgb: '96,165,250',   icon: Brain,     tagMatch: ['LLM', 'Chatbot'] },
  { label: 'Image',        color: '#f87171', rgb: '248,113,113',  icon: Palette,   tagMatch: ['Image IA', 'Génération', 'DALL-E', 'Midjourney', 'Flux', 'Idéogram'] },
  { label: 'Vidéo',        color: '#c084fc', rgb: '192,132,252',  icon: Film,      tagMatch: ['Vidéo IA', 'Kling', 'Runway'] },
  { label: 'Automation',   color: '#00d4ff', rgb: '0,212,255',    icon: Zap,       tagMatch: ['Automatisation', 'Workflow', 'No-code'] },
  { label: 'Agentic',      color: '#fb923c', rgb: '251,146,60',   icon: Cpu,       tagMatch: ['Agent', 'Agentic'] },
  { label: 'Dev Tools',    color: '#facc15', rgb: '250,204,21',   icon: Terminal,  tagMatch: ['IDE', 'Code', 'Copilot', 'Cursor'] },
  { label: 'Voice',        color: '#4ade80', rgb: '74,222,128',   icon: Mic,       tagMatch: ['Voix', 'TTS', 'Audio IA', 'Transcription'] },
  { label: 'Design',       color: '#a78bfa', rgb: '167,139,250',  icon: PenTool,   tagMatch: ['Design', 'Branding'] },
  { label: 'Writing',      color: '#f472b6', rgb: '244,114,182',  icon: PenLine,   tagMatch: ['Rédaction', 'Copywriting'] },
  { label: 'Search',       color: '#34d399', rgb: '52,211,153',   icon: Search,    tagMatch: ['Recherche', 'Moteur IA', 'Sources'] },
  { label: 'RAG',          color: '#38bdf8', rgb: '56,189,248',   icon: Database,  tagMatch: ['RAG', 'Vector', 'Embeddings'] },
  { label: 'Analytics',    color: '#a3e635', rgb: '163,230,53',   icon: BarChart3, tagMatch: ['Analytics', 'Data', 'BI'] },
  { label: 'Audio',        color: '#fdba74', rgb: '253,186,116',  icon: Music,     tagMatch: ['Musique IA', 'Suno', 'Audio'] },
  { label: 'Productivity', color: '#67e8f9', rgb: '103,232,249',  icon: Layers,    tagMatch: ['Productivité', 'Notion', 'Organisation'] },
]

function getToolCategory(tool: AiTool): string {
  for (const cat of CATEGORIES) {
    if (cat.tagMatch.some(tag => tool.tags.includes(tag) || tool.functions.includes(tag))) {
      return cat.label
    }
  }
  return 'LLM'
}

function getCatMeta(label: string): CatMeta {
  return CATEGORIES.find(c => c.label === label) ?? CATEGORIES[0]
}

const PRICE_COLORS: Record<string, string> = {
  gratuit: '#4ade80',
  freemium: '#60a5fa',
  payant: '#f97316',
  'open-source': '#a855f7',
}

const PRICE_LABEL: Record<string, string> = {
  gratuit: 'Gratuit',
  freemium: 'Freemium',
  payant: 'Payant',
  'open-source': 'Open-source',
}

// ── Derived data ───────────────────────────────────────────────────────────────
const freeCount = TOOLS.filter(t => t.price === 'gratuit' || t.price === 'freemium').length
const avgScore = (TOOLS.reduce((s, t) => s + t.score_global, 0) / TOOLS.length).toFixed(1)
const trendingTools = [...TOOLS].filter(t => t.featured).sort((a, b) => b.score_global - a.score_global).slice(0, 8)

// Count tools per category
function getCatCount(catLabel: string): number {
  return TOOLS.filter(t => getToolCategory(t) === catLabel).length
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ToolInitial({ name, color, size = 40 }: { name: string; color: string; size?: number }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: 12, flexShrink: 0,
        background: `${color}22`, border: `1px solid ${color}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.35, fontWeight: 900, color,
      }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

function PriceChip({ price }: { price: string }) {
  const c = PRICE_COLORS[price] ?? '#94a3b8'
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 6,
      background: `${c}15`, color: c, border: `1px solid ${c}25`,
    }}>
      {PRICE_LABEL[price] ?? price}
    </span>
  )
}

function ScorePill({ score }: { score: number }) {
  return (
    <span style={{
      fontSize: 11, color: '#facc15', fontWeight: 700,
      display: 'inline-flex', alignItems: 'center', gap: 2,
    }}>
      <Star size={10} fill="#facc15" style={{ color: '#facc15' }} /> {score.toFixed(1)}
    </span>
  )
}

// ── Trending card ─────────────────────────────────────────────────────────────

function TrendingCard({ tool }: { tool: AiTool }) {
  const catLabel = getToolCategory(tool)
  const meta = getCatMeta(catLabel)
  const isLink = tool.url && tool.url !== '#'

  const cardStyle: React.CSSProperties = {
    width: 'clamp(180px, 50vw, 215px)',
    flexShrink: 0,
    background: 'rgba(13,20,36,0.6)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 18,
    padding: '16px 14px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s ease, border-color 0.22s ease',
    textDecoration: 'none',
    cursor: isLink ? 'pointer' : 'default',
  }

  const content = (
    <>
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, rgba(${meta.rgb},0.7), transparent)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <ToolInitial name={tool.name} color={meta.color} size={40} />
        {tool.featured && (
          <span style={{
            fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 10,
            background: 'rgba(250,204,21,0.12)', color: '#facc15',
            border: '1px solid rgba(250,204,21,0.25)',
          }}>★ Featured</span>
        )}
      </div>

      {/* Name */}
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text-1)', marginBottom: 4 }}>{tool.name}</div>

      {/* Desc */}
      <p style={{
        fontSize: 11, color: 'var(--c-text-3)', marginBottom: 12, lineHeight: 1.55, flex: 1,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {tool.desc_short}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{
            fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 6,
            background: `rgba(${meta.rgb},0.10)`, color: meta.color,
            border: `1px solid rgba(${meta.rgb},0.20)`,
            display: 'inline-flex', alignItems: 'center', gap: 3,
          }}>
            <meta.icon size={8} /> {catLabel}
          </span>
          <PriceChip price={tool.price} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <ScorePill score={tool.score_global} />
          {isLink && <ExternalLink size={10} style={{ color: meta.color, opacity: 0.65 }} />}
        </div>
      </div>
    </>
  )

  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget
      el.style.transform = 'translateY(-4px)'
      el.style.boxShadow = `0 16px 40px rgba(${meta.rgb},0.20), 0 4px 12px rgba(0,0,0,0.2)`
      el.style.borderColor = `rgba(${meta.rgb},0.40)`
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget
      el.style.transform = ''
      el.style.boxShadow = 'none'
      el.style.borderColor = 'rgba(255,255,255,0.07)'
    },
  }

  if (isLink) {
    return (
      <a href={tool.url} target="_blank" rel="noopener noreferrer"
        style={cardStyle} {...handlers}>
        {content}
      </a>
    )
  }
  return <div style={cardStyle} {...handlers}>{content}</div>
}

// ── Full tool card ────────────────────────────────────────────────────────────

function ToolCard({ tool, onOpen }: { tool: AiTool; onOpen: (t: AiTool) => void }) {
  const catLabel = getToolCategory(tool)
  const meta = getCatMeta(catLabel)

  return (
    <div
      onClick={() => onOpen(tool)}
      style={{
        background: 'rgba(13,20,36,0.6)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 18,
        padding: '18px 16px',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s ease, border-color 0.22s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(168,85,247,0.20), 0 4px 12px rgba(0,0,0,0.2)`
        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.30)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, rgba(${meta.rgb},0.6), transparent)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <ToolInitial name={tool.name} color={meta.color} size={44} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <ScorePill score={tool.score_global} />
          {tool.featured && (
            <span style={{
              fontSize: 8, fontWeight: 700, padding: '1px 6px', borderRadius: 8,
              background: 'rgba(250,204,21,0.12)', color: '#facc15',
            }}>★ Featured</span>
          )}
        </div>
      </div>

      {/* Name */}
      <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--c-text-1)', marginBottom: 6 }}>{tool.name}</div>

      {/* Desc */}
      <p style={{
        fontSize: 12, color: 'var(--c-text-2)', marginBottom: 12, lineHeight: 1.6,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        flex: 1,
      }}>
        {tool.desc_short}
      </p>

      {/* Functions */}
      {tool.functions.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {tool.functions.slice(0, 3).map(f => (
            <span key={f} style={{
              fontSize: 9, padding: '2px 7px', borderRadius: 5, fontWeight: 600,
              background: `${COLOR}10`, color: COLOR,
            }}>{f}</span>
          ))}
        </div>
      )}

      {/* Tags */}
      {tool.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
          {tool.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: 8, padding: '1px 6px', borderRadius: 4, fontWeight: 500,
              background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-3)',
            }}>{tag}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <PriceChip price={tool.price} />
          <span style={{
            fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 6,
            background: `rgba(${meta.rgb},0.10)`, color: meta.color,
          }}>{catLabel}</span>
        </div>
        {tool.platforms.slice(0, 2).map(p => (
          <span key={p} style={{ fontSize: 8, color: 'var(--c-text-4)' }}>{p}</span>
        ))}
      </div>
    </div>
  )
}

// ── Tool detail modal ─────────────────────────────────────────────────────────

function ToolModal({ tool, onClose }: { tool: AiTool; onClose: () => void }) {
  const catLabel = getToolCategory(tool)
  const meta = getCatMeta(catLabel)
  const priceColor = PRICE_COLORS[tool.price] ?? '#94a3b8'

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: 'rgba(13,20,36,0.98)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 24, maxWidth: 580, width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* Top gradient line */}
        <div style={{
          height: 3, borderRadius: '24px 24px 0 0',
          background: `linear-gradient(90deg, transparent 0%, rgba(${meta.rgb},0.8) 30%, ${meta.color} 50%, rgba(${meta.rgb},0.8) 70%, transparent 100%)`,
        }} />

        <div style={{ padding: '24px 24px 28px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <ToolInitial name={tool.name} color={meta.color} size={52} />
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--c-text-1)', margin: '0 0 6px' }}>{tool.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PriceChip price={tool.price} />
                  <ScorePill score={tool.score_global} />
                  {tool.verified && (
                    <span style={{ fontSize: 9, color: '#4ade80', fontWeight: 700 }}>✓ Vérifié</span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: 8, border: 'none',
                background: 'rgba(255,255,255,0.06)', color: 'var(--c-text-3)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
              <X size={14} />
            </button>
          </div>

          {/* Desc */}
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--c-text-2)', marginBottom: 20 }}>{tool.desc_long}</p>

          {tool.price_detail && (
            <p style={{ fontSize: 12, color: 'var(--c-text-3)', marginBottom: 16 }}>
              💰 {tool.price_detail}
            </p>
          )}

          {/* Grid: functions + platforms */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {tool.functions.length > 0 && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--c-text-3)', marginBottom: 8, textTransform: 'uppercase' }}>Fonctions</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {tool.functions.map(f => (
                    <span key={f} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, fontWeight: 600, background: `${COLOR}15`, color: COLOR }}>{f}</span>
                  ))}
                </div>
              </div>
            )}
            {tool.platforms.length > 0 && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--c-text-3)', marginBottom: 8, textTransform: 'uppercase' }}>Plateformes</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {tool.platforms.map(p => (
                    <span key={p} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: 'var(--c-text-2)' }}>{p}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Strengths / Limits */}
          {(tool.strengths.length > 0 || tool.limits.length > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {tool.strengths.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#4ade80', marginBottom: 8, textTransform: 'uppercase' }}>Points forts</div>
                  {tool.strengths.map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: 'var(--c-text-2)', marginBottom: 5 }}>
                      <span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>{s}
                    </div>
                  ))}
                </div>
              )}
              {tool.limits.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#f87171', marginBottom: 8, textTransform: 'uppercase' }}>Limites</div>
                  {tool.limits.map(l => (
                    <div key={l} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: 'var(--c-text-2)', marginBottom: 5 }}>
                      <span style={{ color: '#f87171', flexShrink: 0 }}>✗</span>{l}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Uses */}
          {tool.uses.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--c-text-3)', marginBottom: 8, textTransform: 'uppercase' }}>Usages</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {tool.uses.map(u => (
                  <span key={u} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, fontWeight: 600, background: `${COLOR}10`, color: COLOR }}>{u}</span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tool.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 24 }}>
              {tool.tags.map(t => (
                <span key={t} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 5, background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-3)' }}>{t}</span>
              ))}
            </div>
          )}

          {/* CTA */}
          {tool.url && tool.url !== '#' && (
            <a href={tool.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '14px 24px', borderRadius: 14,
                background: `linear-gradient(135deg, ${COLOR}, #7c3aed)`,
                color: '#fff', fontSize: 14, fontWeight: 700,
                textDecoration: 'none', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Visiter {tool.name} <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function OutilsIAPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [priceFilters, setPriceFilters] = useState<string[]>([])
  const [funcFilter, setFuncFilter] = useState<string | null>(null)
  const [modalTool, setModalTool] = useState<AiTool | null>(null)
  const dbRef = useRef<HTMLDivElement>(null)
  const searchId = useId()

  // Handle category click
  function handleCategoryClick(cat: string) {
    setActiveCategory(prev => (prev === cat ? null : cat))
    setTimeout(() => {
      dbRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  // Filter logic
  const filtered = TOOLS.filter(tool => {
    if (activeCategory && getToolCategory(tool) !== activeCategory) return false
    if (priceFilters.length > 0 && !priceFilters.includes(tool.price)) return false
    if (funcFilter && !tool.functions.includes(funcFilter)) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.desc_short.toLowerCase().includes(q) ||
        tool.tags.some(t => t.toLowerCase().includes(q)) ||
        tool.functions.some(f => f.toLowerCase().includes(q))
      )
    }
    return true
  })

  // All unique functions for filter chips
  const allFunctions = Array.from(new Set(TOOLS.flatMap(t => t.functions))).sort()

  function togglePrice(p: string) {
    setPriceFilters(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  return (
    <>
      <style>{`
        @keyframes heroIn {
          from { opacity:0; transform:translateY(18px) }
          to   { opacity:1; transform:translateY(0) }
        }
        .tools-scrollbar::-webkit-scrollbar { display:none; }
        .tools-scrollbar { scrollbar-width:none; -ms-overflow-style:none; }
      `}</style>

      {/* Background radial glow */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '100vh',
        pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.08), transparent)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, paddingTop: 80, paddingBottom: 96, paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* ── Section 1: HERO ──────────────────────────────────────────────── */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            {/* Badge */}
            <div style={{
              animation: 'heroIn 0.55s cubic-bezier(0.22,1,0.36,1) both',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 18px', borderRadius: 20, marginBottom: 24,
              fontSize: 12, fontWeight: 600,
              background: 'rgba(168,85,247,0.09)', border: '1px solid rgba(168,85,247,0.26)',
              color: '#a855f7',
            }}>
              <Brain size={13} />
              {TOOLS.length}+ Outils IA · 15 catégories · Mis à jour chaque semaine
            </div>

            {/* H1 */}
            <h1 style={{
              animation: 'heroIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.08s both',
              fontSize: 'clamp(36px,6vw,64px)',
              fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.02em',
              margin: '0 0 20px',
            }}>
              <span style={{ color: '#a855f7' }}>Trouvez l&apos;outil IA</span>
              <br />
              <span style={{ color: 'var(--c-text-1)' }}>qu&apos;il vous faut.</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              animation: 'heroIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.16s both',
              fontSize: 16, maxWidth: 540, margin: '0 auto 36px',
              lineHeight: 1.65, color: 'var(--c-text-3)',
            }}>
              La base de données d&apos;outils IA la plus complète — filtrée par usage, prix et niveau.
            </p>

            {/* Stats row */}
            <div style={{
              animation: 'heroIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.24s both',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, flexWrap: 'wrap',
            }}>
              {[
                { icon: <Zap size={13} />, val: String(TOOLS.length), lbl: 'outils référencés', c: '#a855f7' },
                { icon: <BarChart3 size={13} />, val: '15', lbl: 'catégories', c: '#60a5fa' },
                { icon: <Sparkles size={13} />, val: String(freeCount), lbl: 'outils gratuits/freemium', c: '#4ade80' },
                { icon: <Star size={13} fill="currentColor" />, val: String(avgScore), lbl: 'score moyen', c: '#facc15' },
              ].map(s => (
                <div key={s.lbl}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '9px 16px', borderRadius: 14,
                    background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                  <span style={{ color: s.c }}>{s.icon}</span>
                  <span style={{ fontWeight: 900, fontSize: 15, color: 'var(--c-text-1)' }}>{s.val}</span>
                  <span style={{ fontSize: 12, color: 'var(--c-text-3)' }}>{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 2: CATEGORY BROWSER ──────────────────────────────────── */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>🗂️</span>
                <h2 style={{ fontSize: 16, fontWeight: 900, color: 'var(--c-text-1)', margin: 0 }}>Parcourir par catégorie</h2>
                <span style={{ fontSize: 12, color: 'var(--c-text-3)' }} className="hidden sm:inline">— Cliquez pour filtrer</span>
              </div>
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 20,
                    background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.28)',
                    color: '#a855f7', cursor: 'pointer',
                  }}>
                  ✕ Tout afficher
                </button>
              )}
            </div>

            {/* Category grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 10,
            }}
              className="sm:grid-cols-4 lg:grid-cols-7"
            >
              {CATEGORIES.map(cat => {
                const isAct = activeCategory === cat.label
                const count = getCatCount(cat.label)
                return (
                  <button
                    key={cat.label}
                    onClick={() => handleCategoryClick(cat.label)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      padding: '14px 10px 12px', borderRadius: 16, cursor: 'pointer',
                      border: isAct ? `2px solid rgba(${cat.rgb},0.55)` : '1px solid rgba(255,255,255,0.07)',
                      background: isAct ? `rgba(${cat.rgb},0.13)` : 'rgba(13,20,36,0.6)',
                      boxShadow: isAct ? `0 0 20px rgba(${cat.rgb},0.16), 0 4px 12px rgba(${cat.rgb},0.10)` : 'none',
                      transform: isAct ? 'translateY(-3px)' : 'none',
                      transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                      position: 'relative', overflow: 'hidden',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (isAct) return
                      e.currentTarget.style.background = `rgba(${cat.rgb},0.07)`
                      e.currentTarget.style.borderColor = `rgba(${cat.rgb},0.35)`
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.boxShadow = `0 8px 24px rgba(${cat.rgb},0.14)`
                    }}
                    onMouseLeave={e => {
                      if (isAct) return
                      e.currentTarget.style.background = 'rgba(13,20,36,0.6)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {/* Active top gradient line */}
                    {isAct && (
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                        background: `linear-gradient(90deg, transparent, rgba(${cat.rgb},0.8), transparent)`,
                      }} />
                    )}

                    {/* Icon box */}
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: isAct ? `rgba(${cat.rgb},0.20)` : `rgba(${cat.rgb},0.10)`,
                      border: `1px solid rgba(${cat.rgb},${isAct ? '0.35' : '0.18'})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.22s ease',
                    }}>
                      <cat.icon size={18} style={{ color: cat.color }} />
                    </div>

                    {/* Name */}
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: isAct ? cat.color : 'var(--c-text-2)',
                      textAlign: 'center', lineHeight: 1.3, transition: 'color 0.2s',
                    }}>
                      {cat.label}
                    </span>

                    {/* Count + filter hint */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 6,
                        background: isAct ? `rgba(${cat.rgb},0.18)` : 'rgba(255,255,255,0.05)',
                        color: isAct ? cat.color : 'var(--c-text-3)',
                        border: `1px solid ${isAct ? `rgba(${cat.rgb},0.30)` : 'rgba(255,255,255,0.07)'}`,
                      }}>
                        {count} outils
                      </span>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 3,
                        fontSize: 9, color: isAct ? cat.color : 'var(--c-text-3)',
                        opacity: 0.75,
                      }}>
                        {isAct
                          ? <><ChevronUp size={9} /> Filtré</>
                          : <><ChevronDown size={9} /> Filtrer</>
                        }
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Section 3: TRENDING NOW ───────────────────────────────────────── */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Flame size={15} style={{ color: '#fb923c' }} />
              <h2 style={{ fontSize: 16, fontWeight: 900, color: 'var(--c-text-1)', margin: 0 }}>Tendances du moment</h2>
              <span style={{ fontSize: 12, color: 'var(--c-text-3)' }} className="hidden sm:inline">— Les mieux notés cette semaine</span>
            </div>

            <div className="tools-scrollbar" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12 }}>
              {trendingTools.map(tool => (
                <TrendingCard key={tool.id} tool={tool} />
              ))}
              <div style={{ flexShrink: 0, width: 8 }} />
            </div>
          </div>

          {/* ── Section 4: SEARCH + FILTERS + GRID ───────────────────────────── */}
          <div ref={dbRef} style={{ scrollMarginTop: 88 }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--c-text-1)', margin: 0 }}>Base complète</h2>
                {activeCategory && (() => {
                  const m = getCatMeta(activeCategory)
                  return (
                    <>
                      <span style={{ color: 'var(--c-text-3)', fontSize: 14 }}>—</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: m.color, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <m.icon size={14} /> {activeCategory}
                      </span>
                      <button
                        onClick={() => setActiveCategory(null)}
                        style={{
                          fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 10,
                          background: `rgba(${m.rgb},0.10)`, color: m.color,
                          border: `1px solid rgba(${m.rgb},0.26)`, cursor: 'pointer',
                        }}>
                        ✕ Effacer
                      </button>
                    </>
                  )
                })()}
              </div>
              <span style={{
                fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20,
                background: 'rgba(124,58,237,0.10)', color: '#a855f7',
                border: '1px solid rgba(124,58,237,0.22)',
              }}>
                {filtered.length} outils
              </span>
            </div>

            {/* Search input */}
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <label htmlFor={searchId} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-text-3)', pointerEvents: 'none' }}>
                <Search size={16} />
              </label>
              <input
                id={searchId}
                type="text"
                placeholder="Rechercher un outil, une fonction, un tag…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '12px 16px 12px 44px',
                  borderRadius: 14, fontSize: 14,
                  background: 'rgba(13,20,36,0.7)', border: '1px solid rgba(255,255,255,0.09)',
                  color: 'var(--c-text-1)', outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.45)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)' }}
              />
            </div>

            {/* Filter chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {/* Price filters */}
              {(['gratuit', 'freemium', 'payant', 'open-source'] as const).map(p => {
                const active = priceFilters.includes(p)
                const c = PRICE_COLORS[p]
                return (
                  <button
                    key={p}
                    onClick={() => togglePrice(p)}
                    style={{
                      fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
                      background: active ? `${c}20` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${active ? c : 'rgba(255,255,255,0.09)'}`,
                      color: active ? c : 'var(--c-text-3)',
                      transition: 'all 0.18s',
                    }}>
                    {PRICE_LABEL[p]}
                  </button>
                )
              })}

              {/* Separator */}
              <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.07)', alignSelf: 'center' }} />

              {/* Function filter (top 6) */}
              {allFunctions.slice(0, 6).map(f => {
                const active = funcFilter === f
                return (
                  <button
                    key={f}
                    onClick={() => setFuncFilter(active ? null : f)}
                    style={{
                      fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
                      background: active ? `${COLOR}20` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${active ? COLOR : 'rgba(255,255,255,0.09)'}`,
                      color: active ? COLOR : 'var(--c-text-3)',
                      transition: 'all 0.18s',
                    }}>
                    {f}
                  </button>
                )
              })}

              {/* Clear filters */}
              {(priceFilters.length > 0 || funcFilter || search) && (
                <button
                  onClick={() => { setPriceFilters([]); setFuncFilter(null); setSearch('') }}
                  style={{
                    fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
                    background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.25)',
                    color: '#f87171', display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                  <X size={10} /> Réinitialiser
                </button>
              )}
            </div>

            {/* Tool grid */}
            {filtered.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '64px 16px',
                background: 'rgba(13,20,36,0.5)', borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--c-text-1)', marginBottom: 8 }}>Aucun outil trouvé</h3>
                <p style={{ fontSize: 14, color: 'var(--c-text-3)', marginBottom: 20 }}>Essayez d&apos;ajuster vos filtres ou votre recherche.</p>
                <button
                  onClick={() => { setActiveCategory(null); setPriceFilters([]); setFuncFilter(null); setSearch('') }}
                  style={{
                    padding: '10px 24px', borderRadius: 12, cursor: 'pointer',
                    background: `${COLOR}15`, border: `1px solid ${COLOR}30`, color: COLOR,
                    fontSize: 13, fontWeight: 600,
                  }}>
                  Tout afficher
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: 14,
              }}
                className="sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map(tool => (
                  <ToolCard key={tool.id} tool={tool} onOpen={setModalTool} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalTool && <ToolModal tool={modalTool} onClose={() => setModalTool(null)} />}
    </>
  )
}
