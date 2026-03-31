'use client'

import ScoreBadge from '@/components/shared/ScoreBadge'
import Badge from '@/components/shared/Badge'
import LikeSaveButtons from '@/components/shared/LikeSaveButtons'
import type { CatalogItem } from '@/types'

// Generic card renderer that works for any module
// Module pages can use this directly or create custom ones

export function makeCardFront(color: string, itemType: string) {
  return function CardFront(item: CatalogItem) {
    const raw = item as unknown as Record<string, unknown>
    const tags = Array.isArray(raw['tags']) ? raw['tags'] as string[] : []
    const name = String(raw['name'] || '')
    const descShort = String(raw['desc_short'] || '')

    return (
      <div className="p-4 flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between gap-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
            style={{ background: `${color}20`, color, border: `1px solid ${color}25` }}>
            {name.slice(0, 2).toUpperCase()}
          </div>
          <ScoreBadge score={item.score_global} />
        </div>
        <div className="font-black text-sm text-white">{name}</div>
        <p className="text-xs leading-relaxed line-clamp-3 flex-1" style={{ color: 'var(--c-text-2)' }}>
          {descShort}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map(t => <Badge key={t} color={color}>{t}</Badge>)}
        </div>
      </div>
    )
  }
}

export function makeCardBack(color: string, itemType: string) {
  return function CardBack(item: CatalogItem) {
    const raw = item as unknown as Record<string, unknown>
    const name = String(raw['name'] || '')

    // Determine secondary field by type
    const fieldMap: Record<string, { label: string; key: string }> = {
      llm: { label: 'Modèles', key: 'top_models' },
      visual: { label: 'Style', key: 'style' },
      workflow: { label: 'Apps', key: 'apps' },
      skill: { label: 'Compatible', key: 'compatible_with' },
      resource: { label: 'Module', key: 'module' },
    }
    const field = fieldMap[itemType] || { label: 'Tags', key: 'tags' }
    const vals = Array.isArray(raw[field.key]) ? raw[field.key] as string[] : []

    return (
      <div className="p-4 flex flex-col gap-3 h-full cursor-pointer">
        <div className="font-black text-sm text-white">{name}</div>
        <div>
          <div className="text-[9px] uppercase font-bold mb-1.5" style={{ color }}>
            {field.label}
          </div>
          <div className="flex flex-wrap gap-1">
            {vals.slice(0, 5).map(v => (
              <span key={v} className="text-[9px] px-1.5 py-0.5 rounded font-medium"
                style={{ background: `${color}12`, color }}>
                {v}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex gap-2 items-center justify-between">
          <span className="text-[9px]" style={{ color: 'var(--c-text-3)' }}>Cliquer pour plus</span>
          <LikeSaveButtons item={{ id: item.id, type: itemType }} showCount={false} />
        </div>
      </div>
    )
  }
}

export function makeModal(color: string, itemType: string, actionLabel: string, getActionUrl?: (item: CatalogItem) => string | undefined) {
  return function GenericModal({ item, close, hasAccess }: { item: CatalogItem; close: () => void; hasAccess: boolean }) {
    const raw = item as unknown as Record<string, unknown>
    const name = String(raw['name'] || '')
    const descShort = String(raw['desc_short'] || '')
    const descLong = String(raw['desc_long'] || descShort)
    const tags = Array.isArray(raw['tags']) ? raw['tags'] as string[] : []
    const actionUrl = getActionUrl ? getActionUrl(item) : undefined

    return (
      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-black"
              style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
              {name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{name}</h2>
              <ScoreBadge score={item.score_global} size="md" />
            </div>
          </div>
          <button onClick={close}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.06]"
            style={{ color: 'var(--c-text-3)' }}>
            ✕
          </button>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{descLong}</p>

        {/* Prompt text if available */}
        {!!raw['prompt_text'] && (
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase" style={{ color }}>Prompt</span>
              {!hasAccess && (
                <span className="text-[9px] px-2 py-0.5 rounded font-bold"
                  style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}>
                  Premium
                </span>
              )}
            </div>
            <pre className="text-xs leading-relaxed whitespace-pre-wrap select-none"
              style={{
                color: 'var(--c-text-2)',
                filter: hasAccess ? 'none' : 'blur(4px)',
                userSelect: hasAccess ? 'auto' : 'none',
                maxHeight: 200,
                overflow: 'auto',
              }}>
              {String(raw['prompt_text'])}
            </pre>
          </div>
        )}

        {/* Content if available */}
        {!!raw['content'] && itemType === 'skill' && (
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase" style={{ color }}>Contenu</span>
            </div>
            <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--c-text-2)', maxHeight: 200, overflow: 'auto' }}>
              {String(raw['content'])}
            </pre>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {tags.map(t => <Badge key={t} color={color}>{t}</Badge>)}
        </div>

        <div className="flex gap-3">
          {actionUrl ? (
            <a href={actionUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)`, color: '#030712' }}>
              {actionLabel}
            </a>
          ) : (
            <button
              onClick={() => {
                const content = String(raw['content'] || raw['prompt_text'] || '')
                if (hasAccess && content) {
                  navigator.clipboard.writeText(content)
                }
              }}
              className="flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)`, color: '#030712' }}>
              {hasAccess ? actionLabel : '🔒 ' + actionLabel}
            </button>
          )}
          <LikeSaveButtons item={{ id: item.id, type: itemType }} />
        </div>
      </div>
    )
  }
}
