'use client'

import { useAuth } from '@/context/AuthContext'
import DatabaseShell from '@/components/catalog/DatabaseShell'
import { makeCardFront, makeCardBack, makeModal } from '@/components/cards/GenericCard'
import { RESOURCES } from '@/data/resources'
import type { FilterDef, KanbanAxis, CatalogItem, Resource } from '@/types'

const COLOR = '#00ff87'

const FILTERS: FilterDef[] = [
  { key: 'content_type', label: 'Type', type: 'multiselect', options: ['vidéo', 'article', 'documentation', 'formation', 'tuto', 'news', 'podcast', 'newsletter', 'classement'] },
  { key: 'complexity', label: 'Niveau', type: 'multiselect', options: ['débutant', 'intermédiaire', 'avancé'] },
  { key: 'language', label: 'Langue', type: 'multiselect', options: ['fr', 'en', 'multi'] },
  { key: 'is_free', label: '🆓 Gratuit', type: 'toggle' },
  { key: 'is_internal', label: '✍️ Evolify', type: 'toggle' },
]

const KANBAN_AXIS: KanbanAxis = {
  key: 'content_type',
  label: 'Type de contenu',
  getValue: (item: CatalogItem) => (item as Resource).content_type,
}

const cardFront = makeCardFront(COLOR, 'resource')
const cardBack = makeCardBack(COLOR, 'resource')
const Modal = makeModal(COLOR, 'resource', '🔗 Voir la ressource', (item) => {
  const r = item as Resource
  return r.url
})

export default function RessourcesPage() {
  const { user } = useAuth()
  const hasAccess = true // Resources module est gratuit

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3"
          style={{ background: `${COLOR}10`, border: `1px solid ${COLOR}20`, color: COLOR }}>
          📚 Module gratuit
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Ressources</h1>
        <p className="text-lg max-w-2xl" style={{ color: 'var(--c-text-2)' }}>
          {RESOURCES.length}+ guides, tutoriels, newsletters et formations pour maîtriser l'IA.
        </p>
      </div>
      <DatabaseShell
        items={RESOURCES as unknown as CatalogItem[]}
        filterDefs={FILTERS}
        renderCardFront={cardFront}
        renderCardBack={cardBack}
        renderModal={(item, close) => <Modal item={item} close={close} hasAccess={hasAccess} />}
        moduleColor={COLOR}
        moduleLabel="Ressources"
        kanbanAxis={KANBAN_AXIS}
        hasAccess={hasAccess}
        searchFields={['name', 'desc_short', 'tags', 'category', 'use_cases']}
      />
    </div>
  )
}
