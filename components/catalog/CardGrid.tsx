'use client'

import FlipCard from './FlipCard'
import type { CatalogItem } from '@/types'

const PAGE_SIZE = 24

interface Props {
  items: CatalogItem[]
  renderFront: (item: CatalogItem) => React.ReactNode
  renderBack: (item: CatalogItem) => React.ReactNode
  onOpen: (item: CatalogItem) => void
  moduleColor: string
  page: number
  onLoadMore: () => void
}

export default function CardGrid({ items, renderFront, renderBack, onOpen, moduleColor, page, onLoadMore }: Props) {
  const visible = items.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < items.length

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="text-4xl">🔍</div>
        <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>Aucun résultat trouvé</p>
        <p className="text-xs" style={{ color: 'var(--c-text-4)' }}>Essayez d'élargir vos filtres</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" style={{ gridAutoRows: '1fr' }}>
        {visible.map(item => (
          <div key={item.id} style={{ minHeight: 200 }}>
            <FlipCard
              item={item}
              renderFront={renderFront}
              renderBack={renderBack}
              onOpen={onOpen}
              moduleColor={moduleColor}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button onClick={onLoadMore}
            className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: `${moduleColor}10`,
              border: `1px solid ${moduleColor}25`,
              color: moduleColor,
            }}>
            Charger plus · {items.length - visible.length} restants
          </button>
        </div>
      )}
    </div>
  )
}
