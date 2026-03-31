'use client'

import ScoreBadge from '@/components/shared/ScoreBadge'
import Badge from '@/components/shared/Badge'
import type { CatalogItem } from '@/types'

interface TableColumn {
  key: string
  label: string
  width?: string
  render?: (item: CatalogItem) => React.ReactNode
}

interface Props {
  items: CatalogItem[]
  columns?: TableColumn[]
  onOpen: (item: CatalogItem) => void
  moduleColor: string
  hasAccess: boolean
  freeRows?: number
}

const DEFAULT_COLS: TableColumn[] = [
  { key: 'name', label: 'Nom', width: '25%' },
  { key: 'desc_short', label: 'Description', width: '35%' },
  { key: 'tags', label: 'Tags', width: '20%' },
  { key: 'score_global', label: 'Score', width: '10%' },
]

export default function TableView({ items, columns = DEFAULT_COLS, onOpen, moduleColor, hasAccess, freeRows = 5 }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="text-4xl">🔍</div>
        <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>Aucun résultat trouvé</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            {columns.map(col => (
              <th key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--c-text-3)', width: col.width }}>
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 w-16" />
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const locked = !hasAccess && i >= freeRows
            const raw = item as unknown as Record<string, unknown>
            return (
              <tr key={item.id}
                className="transition-colors hover:bg-white/[0.02] cursor-pointer"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onClick={() => !locked && onOpen(item)}
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3">
                    {locked ? (
                      <div className="h-3 rounded blur-sm select-none" style={{ background: 'rgba(255,255,255,0.08)', width: '80%' }} />
                    ) : col.render ? col.render(item) : (
                      (() => {
                        const val = raw[col.key]
                        if (col.key === 'score_global' && typeof val === 'number') {
                          return <ScoreBadge score={val} />
                        }
                        if (col.key === 'tags' && Array.isArray(val)) {
                          return (
                            <div className="flex gap-1 flex-wrap">
                              {(val as string[]).slice(0, 3).map(t => (
                                <Badge key={t} color={moduleColor}>{t}</Badge>
                              ))}
                            </div>
                          )
                        }
                        if (typeof val === 'string') {
                          return <span className="text-xs" style={{ color: 'var(--c-text-2)' }}>{val}</span>
                        }
                        return null
                      })()
                    )}
                  </td>
                ))}
                <td className="px-4 py-3">
                  {!locked && (
                    <button
                      onClick={e => { e.stopPropagation(); onOpen(item) }}
                      className="text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all hover:scale-105"
                      style={{ background: `${moduleColor}12`, color: moduleColor, border: `1px solid ${moduleColor}20` }}>
                      Voir
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
