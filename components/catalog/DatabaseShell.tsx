'use client'

import { useState, useMemo, useCallback } from 'react'
import { Search, LayoutGrid, List, Columns3, X } from 'lucide-react'
import FilterBar from './FilterBar'
import CardGrid from './CardGrid'
import TableView from './TableView'
import KanbanView from './KanbanView'
import { filterAndSort } from '@/lib/scoring'
import type { CatalogItem, FilterDef, KanbanAxis } from '@/types'

type ViewMode = 'cards' | 'table' | 'kanban'

interface TableColumn {
  key: string
  label: string
  width?: string
  render?: (item: CatalogItem) => React.ReactNode
}

interface Props {
  items: CatalogItem[]
  filterDefs: FilterDef[]
  renderCardFront: (item: CatalogItem) => React.ReactNode
  renderCardBack: (item: CatalogItem) => React.ReactNode
  renderModal: (item: CatalogItem, close: () => void) => React.ReactNode
  moduleColor: string
  moduleLabel: string
  tableColumns?: TableColumn[]
  kanbanAxis?: KanbanAxis
  searchFields?: string[]
  hasAccess: boolean
  defaultView?: ViewMode
  topPicks?: CatalogItem[]
}

const VIEW_ICONS = {
  cards: LayoutGrid,
  table: List,
  kanban: Columns3,
}

export default function DatabaseShell({
  items,
  filterDefs,
  renderCardFront,
  renderCardBack,
  renderModal,
  moduleColor,
  moduleLabel,
  tableColumns,
  kanbanAxis,
  searchFields = ['name', 'desc_short', 'tags'],
  hasAccess,
  defaultView = 'cards',
  topPicks,
}: Props) {
  const [view, setView] = useState<ViewMode>(defaultView)
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [page, setPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null)

  const filteredItems = useMemo(() => {
    return filterAndSort(
      items as unknown as Record<string, unknown>[],
      search,
      activeFilters,
      searchFields,
    ) as unknown as CatalogItem[]
  }, [items, search, activeFilters, searchFields])

  const handleFilterChange = useCallback((key: string, values: string[]) => {
    setActiveFilters(prev => ({ ...prev, [key]: values }))
    setPage(1)
  }, [])

  const handleReset = useCallback(() => {
    setActiveFilters({})
    setSearch('')
    setPage(1)
  }, [])

  const handleOpen = useCallback((item: CatalogItem) => {
    setSelectedItem(item)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedItem(null)
  }, [])

  const availableViews: ViewMode[] = ['cards', 'table', ...(kanbanAxis ? ['kanban' as ViewMode] : [])]

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--c-text-3)' }} />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder={`Rechercher dans ${moduleLabel}…`}
            className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--c-text-1)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = `${moduleColor}40`)}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
          {search && (
            <button onClick={() => { setSearch(''); setPage(1) }}
              className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--c-text-3)' }}>
              <X size={13} />
            </button>
          )}
        </div>

        {/* Right side: count + view toggle */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs" style={{ color: 'var(--c-text-3)' }}>
            <span className="font-bold" style={{ color: moduleColor }}>{filteredItems.length}</span>
            {' '}/ {items.length}
          </span>

          {/* View switcher */}
          <div className="flex items-center rounded-lg overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            {availableViews.map(v => {
              const Icon = VIEW_ICONS[v]
              return (
                <button key={v} onClick={() => setView(v)}
                  className="p-2 transition-all duration-150"
                  style={{
                    background: view === v ? `${moduleColor}15` : 'transparent',
                    color: view === v ? moduleColor : 'var(--c-text-3)',
                  }}>
                  <Icon size={15} />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      {filterDefs.length > 0 && (
        <FilterBar
          filterDefs={filterDefs}
          activeFilters={activeFilters}
          onChange={handleFilterChange}
          onReset={handleReset}
          moduleColor={moduleColor}
        />
      )}

      {/* Content */}
      <div className="mt-2">
        {view === 'cards' && (
          <CardGrid
            items={filteredItems}
            renderFront={renderCardFront}
            renderBack={renderCardBack}
            onOpen={handleOpen}
            moduleColor={moduleColor}
            page={page}
            onLoadMore={() => setPage(p => p + 1)}
          />
        )}
        {view === 'table' && (
          <TableView
            items={filteredItems}
            columns={tableColumns}
            onOpen={handleOpen}
            moduleColor={moduleColor}
            hasAccess={hasAccess}
          />
        )}
        {view === 'kanban' && kanbanAxis && (
          <KanbanView
            items={filteredItems}
            axis={kanbanAxis}
            onOpen={handleOpen}
            moduleColor={moduleColor}
            hasAccess={hasAccess}
          />
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background: 'rgba(13,20,36,0.98)',
              border: `1px solid ${moduleColor}20`,
              boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${moduleColor}10`,
            }}
            onClick={e => e.stopPropagation()}
          >
            {renderModal(selectedItem, handleClose)}
          </div>
        </div>
      )}
    </div>
  )
}
