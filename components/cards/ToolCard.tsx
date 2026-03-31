'use client'

import { ExternalLink } from 'lucide-react'
import ScoreBadge from '@/components/shared/ScoreBadge'
import Badge from '@/components/shared/Badge'
import LikeSaveButtons from '@/components/shared/LikeSaveButtons'
import type { CatalogItem, AiTool } from '@/types'

const COLOR = '#a855f7'

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export function ToolCardFront(item: CatalogItem) {
  const tool = item as AiTool
  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
            style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}25` }}>
            {getInitials(tool.name)}
          </div>
          <div>
            <div className="font-black text-sm text-white">{tool.name}</div>
            <div className="text-[10px]" style={{ color: 'var(--c-text-3)' }}>{tool.price}</div>
          </div>
        </div>
        <ScoreBadge score={tool.score_global} />
      </div>

      {/* Desc */}
      <p className="text-xs leading-relaxed line-clamp-3 flex-1" style={{ color: 'var(--c-text-2)' }}>
        {tool.desc_short}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tool.tags.slice(0, 3).map(t => (
          <Badge key={t} color={COLOR}>{t}</Badge>
        ))}
      </div>

      {/* Platforms */}
      <div className="flex items-center gap-1.5 text-[9px]" style={{ color: 'var(--c-text-3)' }}>
        {tool.platforms.slice(0, 3).map(p => (
          <span key={p}>{p}</span>
        ))}
      </div>
    </div>
  )
}

export function ToolCardBack(item: CatalogItem) {
  const tool = item as AiTool
  return (
    <div className="p-4 flex flex-col gap-3 h-full cursor-pointer">
      <div className="font-black text-sm text-white">{tool.name}</div>

      {/* Functions */}
      <div>
        <div className="text-[9px] uppercase font-bold mb-1.5" style={{ color: COLOR }}>Fonctions</div>
        <div className="flex flex-wrap gap-1">
          {tool.functions.slice(0, 4).map(f => (
            <span key={f} className="text-[9px] px-1.5 py-0.5 rounded font-medium"
              style={{ background: `${COLOR}12`, color: COLOR }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Uses */}
      <div>
        <div className="text-[9px] uppercase font-bold mb-1.5" style={{ color: 'var(--c-text-3)' }}>Usages</div>
        <div className="flex flex-wrap gap-1">
          {tool.uses.slice(0, 3).map(u => (
            <span key={u} className="text-[9px] px-1.5 py-0.5 rounded font-medium"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-2)' }}>
              {u}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* Action */}
      <div className="flex gap-2">
        <a href={tool.url} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex items-center gap-1.5 flex-1 justify-center py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
          style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}30` }}>
          <ExternalLink size={11} />
          Voir l'outil
        </a>
        <div onClick={e => e.stopPropagation()}>
          <LikeSaveButtons item={{ id: tool.id, type: 'tool' }} showCount={false} />
        </div>
      </div>

      <p className="text-[9px] text-center" style={{ color: 'var(--c-text-3)' }}>Cliquer pour plus de détails</p>
    </div>
  )
}

export function ToolModal({ item, close, hasAccess }: { item: CatalogItem; close: () => void; hasAccess: boolean }) {
  const tool = item as AiTool
  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black"
            style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}30` }}>
            {getInitials(tool.name)}
          </div>
          <div>
            <h2 className="text-xl font-black text-white">{tool.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <ScoreBadge score={tool.score_global} size="md" />
              <Badge color={COLOR}>{tool.price}</Badge>
              {tool.price_detail && <span className="text-xs" style={{ color: 'var(--c-text-3)' }}>{tool.price_detail}</span>}
            </div>
          </div>
        </div>
        <button onClick={close}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.06]"
          style={{ color: 'var(--c-text-3)' }}>
          ✕
        </button>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{tool.desc_long}</p>

      {/* Functions + Uses */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: COLOR }}>Fonctions</div>
          <div className="flex flex-wrap gap-1.5">
            {tool.functions.map(f => <Badge key={f} color={COLOR}>{f}</Badge>)}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--c-text-3)' }}>Usages</div>
          <div className="flex flex-wrap gap-1.5">
            {tool.uses.map(u => <Badge key={u} color="#94a3b8">{u}</Badge>)}
          </div>
        </div>
      </div>

      {/* Strengths + Limits */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-3" style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.1)' }}>
          <div className="text-xs font-bold mb-2" style={{ color: '#4ade80' }}>✓ Points forts</div>
          <ul className="space-y-1">
            {tool.strengths.map(s => (
              <li key={s} className="text-xs" style={{ color: 'var(--c-text-2)' }}>· {s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-3" style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.1)' }}>
          <div className="text-xs font-bold mb-2" style={{ color: '#f87171' }}>✗ Limites</div>
          <ul className="space-y-1">
            {tool.limits.map(l => (
              <li key={l} className="text-xs" style={{ color: 'var(--c-text-2)' }}>· {l}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Jobs */}
      <div>
        <div className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--c-text-3)' }}>Pour qui ?</div>
        <div className="flex flex-wrap gap-1.5">
          {tool.jobs.map(j => <Badge key={j} color="#64748b">{j}</Badge>)}
        </div>
      </div>

      {/* Alternatives */}
      {hasAccess && tool.alternatives_free && (
        <div>
          <div className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#00ff87' }}>Alternatives gratuites</div>
          <div className="flex flex-wrap gap-1.5">
            {tool.alternatives_free.map(a => <Badge key={a} color="#00ff87">{a}</Badge>)}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex gap-3 pt-2">
        <a href={tool.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 flex-1 justify-center py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${COLOR}, #60a5fa)`, color: '#030712' }}>
          <ExternalLink size={14} />
          Visiter {tool.name}
        </a>
        <LikeSaveButtons item={{ id: tool.id, type: 'tool' }} />
      </div>
    </div>
  )
}
