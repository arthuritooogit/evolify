'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { TOOLS } from '@/data/tools'
import ScoreBadge from '@/components/shared/ScoreBadge'
import Badge from '@/components/shared/Badge'
import LikeSaveButtons from '@/components/shared/LikeSaveButtons'
import DatabaseShell from '@/components/catalog/DatabaseShell'
import { ToolCardFront, ToolCardBack, ToolModal } from '@/components/cards/ToolCard'
import type { CatalogItem } from '@/types'

const COLOR = '#a855f7'

export default function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const tool = TOOLS.find(t => t.slug === slug)
  if (!tool) notFound()

  const similar = TOOLS.filter(t => t.slug !== slug && t.functions.some(f => tool.functions.includes(f))).slice(0, 6)
  const freeAlts = TOOLS.filter(t => t.slug !== slug && (tool.alternatives_free || []).includes(t.name))

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Breadcrumb */}
      <Link href="/outils-ia"
        className="inline-flex items-center gap-1.5 text-xs transition-colors hover:text-white"
        style={{ color: 'var(--c-text-3)' }}>
        <ArrowLeft size={12} />
        Outils IA
      </Link>

      {/* Hero tool */}
      <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
              style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}25` }}>
              {tool.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl font-black text-white">{tool.name}</h1>
                {tool.featured && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                    style={{ background: '#facc1515', color: '#facc15', border: '1px solid #facc1525' }}>
                    ⭐ Featured
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <ScoreBadge score={tool.score_global} size="md" />
                <Badge color={COLOR}>{tool.price}</Badge>
                {tool.price_detail && <span className="text-xs" style={{ color: 'var(--c-text-3)' }}>{tool.price_detail}</span>}
              </div>
            </div>
          </div>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--c-text-2)' }}>{tool.desc_long}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tool.tags.map(t => <Badge key={t} color={COLOR}>{t}</Badge>)}
          </div>

          {/* Platforms */}
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--c-text-3)' }}>
            <span>Disponible sur :</span>
            {tool.platforms.map(p => (
              <span key={p} className="px-2 py-0.5 rounded font-medium"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-2)' }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* CTA sidebar */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          <a href={tool.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${COLOR}, #60a5fa)`, color: '#030712' }}>
            <ExternalLink size={14} />
            Visiter {tool.name}
          </a>
          <LikeSaveButtons item={{ id: tool.id, type: 'tool', featured: tool.featured, score_global: tool.score_global }} />
        </div>
      </div>

      {/* Details grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Fonctions */}
        <div className="rounded-2xl p-5 space-y-3"
          style={{ background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 className="text-sm font-black text-white">Fonctions</h2>
          <div className="flex flex-wrap gap-1.5">
            {tool.functions.map(f => {
              const score = tool.function_scores[f]
              return (
                <div key={f} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                  style={{ background: `${COLOR}10`, border: `1px solid ${COLOR}20` }}>
                  <span className="text-xs font-medium" style={{ color: COLOR }}>{f}</span>
                  {score && <span className="text-[9px] font-bold" style={{ color: '#facc15' }}>★ {score}</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Cas d'usage */}
        <div className="rounded-2xl p-5 space-y-3"
          style={{ background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 className="text-sm font-black text-white">Cas d'usage</h2>
          <div className="flex flex-wrap gap-1.5">
            {tool.uses.map(u => {
              const score = tool.usecase_scores[u]
              return (
                <div key={u} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--c-text-2)' }}>{u}</span>
                  {score && <span className="text-[9px] font-bold" style={{ color: '#facc15' }}>★ {score}</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Forces */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.12)' }}>
          <h2 className="text-sm font-black mb-3" style={{ color: '#4ade80' }}>✓ Points forts</h2>
          <ul className="space-y-1.5">
            {tool.strengths.map(s => (
              <li key={s} className="flex items-start gap-2 text-sm" style={{ color: 'var(--c-text-2)' }}>
                <span className="mt-0.5" style={{ color: '#4ade80' }}>·</span> {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Limites */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.12)' }}>
          <h2 className="text-sm font-black mb-3" style={{ color: '#f87171' }}>✗ Limites</h2>
          <ul className="space-y-1.5">
            {tool.limits.map(l => (
              <li key={l} className="flex items-start gap-2 text-sm" style={{ color: 'var(--c-text-2)' }}>
                <span className="mt-0.5" style={{ color: '#f87171' }}>·</span> {l}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* For who */}
      <div className="rounded-2xl p-5"
        style={{ background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h2 className="text-sm font-black text-white mb-3">Pour qui ?</h2>
        <div className="flex flex-wrap gap-2">
          {tool.jobs.map(j => <Badge key={j} color="#64748b">{j}</Badge>)}
        </div>
      </div>

      {/* Free alternatives */}
      {freeAlts.length > 0 && (
        <div>
          <h2 className="text-lg font-black text-white mb-4">
            Alternatives gratuites <span className="text-sm font-normal" style={{ color: 'var(--c-text-3)' }}>({freeAlts.length})</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeAlts.map(alt => (
              <Link key={alt.id} href={`/outils-ia/${alt.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(0,255,135,0.12)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ background: 'rgba(0,255,135,0.1)', color: '#00ff87' }}>
                  {alt.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-white">{alt.name}</div>
                  <div className="text-[10px]" style={{ color: '#00ff87' }}>{alt.price}</div>
                </div>
                <ScoreBadge score={alt.score_global} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Similar tools */}
      {similar.length > 0 && (
        <div>
          <h2 className="text-lg font-black text-white mb-4">
            Outils similaires <span className="text-sm font-normal" style={{ color: 'var(--c-text-3)' }}>({similar.length})</span>
          </h2>
          <DatabaseShell
            items={similar as unknown as CatalogItem[]}
            filterDefs={[]}
            renderCardFront={ToolCardFront}
            renderCardBack={ToolCardBack}
            renderModal={(item, close) => <ToolModal item={item} close={close} hasAccess={true} />}
            moduleColor={COLOR}
            moduleLabel="outils similaires"
            hasAccess={true}
          />
        </div>
      )}
    </div>
  )
}
