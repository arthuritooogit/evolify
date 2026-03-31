'use client'

import ScoreBadge from '@/components/shared/ScoreBadge'
import type { CatalogItem, KanbanAxis } from '@/types'

interface Props {
  items: CatalogItem[]
  axis: KanbanAxis
  onOpen: (item: CatalogItem) => void
  moduleColor: string
  hasAccess: boolean
}

export default function KanbanView({ items, axis, onOpen, moduleColor, hasAccess }: Props) {
  // Build columns from distinct values
  const columnMap = new Map<string, CatalogItem[]>()
  items.forEach(item => {
    const rawVal = axis.getValue(item)
    const vals = Array.isArray(rawVal) ? rawVal : [rawVal]
    const primary = vals[0] || 'Autre'
    if (!columnMap.has(primary)) columnMap.set(primary, [])
    columnMap.get(primary)!.push(item)
  })

  const columns = Array.from(columnMap.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 6)

  if (columns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="text-4xl">🗂️</div>
        <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>Aucune donnée à afficher</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: `${columns.length * 260}px` }}>
        {columns.map(([colName, colItems]) => (
          <div key={colName} className="flex-shrink-0 w-60">
            {/* Column header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold" style={{ color: moduleColor }}>{colName}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
                style={{ background: `${moduleColor}12`, color: moduleColor }}>
                {colItems.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2.5">
              {colItems.slice(0, hasAccess ? 20 : 3).map((item, i) => {
                const locked = !hasAccess && i >= 2
                const raw = item as unknown as Record<string, unknown>
                return (
                  <div key={item.id}
                    className="rounded-xl p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: 'rgba(13,20,36,0.7)',
                      border: `1px solid ${locked ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.07)'}`,
                      filter: locked ? 'blur(2px)' : 'none',
                    }}
                    onClick={() => !locked && onOpen(item)}
                  >
                    {locked ? (
                      <div className="space-y-1.5">
                        <div className="h-2.5 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
                        <div className="h-2 w-full rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-white truncate">{item.name}</span>
                          <ScoreBadge score={item.score_global} />
                        </div>
                        {typeof raw['desc_short'] === 'string' && (
                          <p className="text-[10px] leading-relaxed line-clamp-2" style={{ color: 'var(--c-text-3)' }}>
                            {raw['desc_short'] as string}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
              {!hasAccess && colItems.length > 2 && (
                <div className="text-center py-1">
                  <span className="text-[9px]" style={{ color: 'var(--c-text-4)' }}>
                    +{colItems.length - 2} avec accès
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
