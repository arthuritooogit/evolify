'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import DatabaseShell from '@/components/catalog/DatabaseShell'
import LockOverlay from '@/components/shared/LockOverlay'
import ScoreBadge from '@/components/shared/ScoreBadge'
import Badge from '@/components/shared/Badge'
import LikeSaveButtons from '@/components/shared/LikeSaveButtons'
import { WORKFLOWS } from '@/data/workflows'
import type { FilterDef, KanbanAxis, CatalogItem } from '@/types'

const COLOR = '#4ade80'

const FILTERS: FilterDef[] = [
  { key: 'platform', label: 'Plateforme', type: 'multiselect', options: ['n8n', 'Make', 'Zapier', 'Actioner', 'LangChain', 'Flowise', 'Autres'] },
  { key: 'type', label: 'Type', type: 'multiselect', options: ['automatisation', 'scraping', 'notification', 'sync', 'agent', 'pipeline', 'autre'] },
  { key: 'complexity', label: 'Complexité', type: 'multiselect', options: ['débutant', 'intermédiaire', 'avancé'] },
  { key: 'trigger', label: 'Déclencheur', type: 'multiselect', options: ['Webhook', 'Schedule', 'Email', 'API', 'Manual', 'Event', 'Form'] },
  { key: 'apps', label: 'Apps connectées', type: 'multiselect', options: ['Slack', 'Gmail', 'Notion', 'Airtable', 'Google Sheets', 'GitHub', 'Twitter', 'LinkedIn', 'HubSpot', 'Stripe', 'Telegram', 'Discord'] },
  { key: 'price_required', label: 'Accès', type: 'multiselect', options: ['gratuit', 'freemium', 'payant'] },
  { key: 'uses_ai', label: '🤖 Avec IA', type: 'toggle' },
  { key: 'uses_mcp', label: '🔌 Avec MCP', type: 'toggle' },
  { key: 'featured', label: '⭐ Featured', type: 'toggle' },
]

const KANBAN_AXIS: KanbanAxis = {
  key: 'platform',
  label: 'Plateforme',
  getValue: (item: CatalogItem) => (item as { platform: string }).platform,
}

const TABLE_COLUMNS = [
  { key: 'name', label: 'Workflow', width: '22%' },
  { key: 'platform', label: 'Plateforme', width: '10%' },
  { key: 'type', label: 'Type', width: '12%' },
  { key: 'complexity', label: 'Complexité', width: '12%' },
  { key: 'apps', label: 'Apps', width: '20%', render: (item: CatalogItem) => {
    const apps = (item as unknown as Record<string,unknown>)['apps'] as string[] || []
    return <span className="text-xs" style={{ color: 'var(--c-text-2)' }}>{apps.slice(0,3).join(', ')}</span>
  }},
  { key: 'estimated_roi', label: 'ROI', width: '12%' },
  { key: 'score_global', label: 'Score', width: '12%', render: (item: CatalogItem) => <ScoreBadge score={item.score_global} size="sm" /> },
]

const PLATFORM_TOOLS = [
  { name: 'n8n', color: '#ea4b71' }, { name: 'Make', color: '#a855f7' }, { name: 'Zapier', color: '#f97316' },
  { name: 'Actioner', color: '#60a5fa' }, { name: 'LangChain', color: '#4ade80' }, { name: 'OpenAI', color: '#00a67e' },
  { name: 'Anthropic', color: '#d4a27f' }, { name: 'Flowise', color: '#facc15' },
]

const platformColors: Record<string, string> = {
  'n8n': '#ea4b71', 'Make': '#a855f7', 'Zapier': '#f97316', 'Actioner': '#60a5fa',
  'LangChain': '#4ade80', 'Flowise': '#facc15', 'Autres': '#94a3b8'
}
const complexityColors: Record<string, string> = {
  'débutant': '#4ade80', 'intermédiaire': '#facc15', 'avancé': '#f87171'
}

function CardFront(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descShort = String(raw['desc_short'] || '')
  const platform = String(raw['platform'] || '')
  const type = String(raw['type'] || '')
  const complexity = String(raw['complexity'] || '')
  const apps = Array.isArray(raw['apps']) ? raw['apps'] as string[] : []
  const usesAI = Boolean(raw['uses_ai'])
  const platformColor = platformColors[platform] || COLOR
  const complexityColor = complexityColors[complexity] || '#94a3b8'

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
            style={{ background: `${platformColor}20`, color: platformColor, border: `1px solid ${platformColor}25` }}>
            {platform.slice(0, 2).toUpperCase()}
          </div>
          {usesAI && (
            <span className="text-[8px] px-1.5 py-0.5 rounded font-bold"
              style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}>AI</span>
          )}
        </div>
        <ScoreBadge score={item.score_global} />
      </div>
      <div className="font-black text-sm text-white leading-tight">{name}</div>
      <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--c-text-2)' }}>{descShort}</p>
      <div className="flex flex-wrap gap-1">
        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold"
          style={{ background: `${platformColor}15`, color: platformColor }}>{platform}</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold capitalize"
          style={{ background: `${complexityColor}12`, color: complexityColor }}>{complexity}</span>
        <span className="text-[9px] px-2 py-0.5 rounded font-medium"
          style={{ background: `${COLOR}10`, color: COLOR }}>{type}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {apps.slice(0, 3).map(a => (
          <span key={a} className="text-[8px] px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-3)' }}>{a}</span>
        ))}
      </div>
    </div>
  )
}

function CardBack(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const result = String(raw['result'] || '')
  const estimatedRoi = String(raw['estimated_roi'] || '')
  const setupTime = String(raw['setup_time'] || '')
  const nodesCount = raw['nodes_count']
  const hasJson = Boolean(raw['workflow_json'])

  const handleDownload = () => {
    const json = String(raw['workflow_json'] || '{}')
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.json`
    a.click()
  }

  const handleCopy = () => {
    const json = String(raw['workflow_json'] || '{}')
    navigator.clipboard.writeText(json)
  }

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="font-black text-xs text-white">{name}</div>
      {result && <p className="text-[10px] leading-relaxed flex-1" style={{ color: 'var(--c-text-2)' }}>{result}</p>}
      <div className="grid grid-cols-2 gap-2">
        {estimatedRoi && (
          <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(74,222,128,0.08)' }}>
            <div className="text-[8px] uppercase font-bold mb-0.5" style={{ color: '#4ade80' }}>ROI estimé</div>
            <div className="text-xs font-bold text-white">{estimatedRoi}</div>
          </div>
        )}
        {setupTime && (
          <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="text-[8px] uppercase font-bold mb-0.5" style={{ color: 'var(--c-text-3)' }}>Setup</div>
            <div className="text-xs font-bold text-white">{setupTime}</div>
          </div>
        )}
      </div>
      {nodesCount && (
        <div className="text-[9px]" style={{ color: 'var(--c-text-3)' }}>{nodesCount} nœuds</div>
      )}
      <div className="flex gap-2">
        {hasJson && (
          <>
            <button onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-bold transition-all hover:scale-105"
              style={{ background: `${COLOR}15`, color: COLOR, border: `1px solid ${COLOR}25` }}>
              📋 Copier
            </button>
            <button onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-bold transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-2)', border: '1px solid rgba(255,255,255,0.08)' }}>
              ⬇ JSON
            </button>
          </>
        )}
        <LikeSaveButtons item={{ id: item.id, type: 'workflow' }} showCount={false} />
      </div>
    </div>
  )
}

function ModalContent({ item, close, hasAccess }: { item: CatalogItem; close: () => void; hasAccess: boolean }) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descLong = String(raw['desc_long'] || raw['desc_short'] || '')
  const platform = String(raw['platform'] || '')
  const type = String(raw['type'] || '')
  const complexity = String(raw['complexity'] || '')
  const trigger = Array.isArray(raw['trigger']) ? raw['trigger'] as string[] : []
  const apps = Array.isArray(raw['apps']) ? raw['apps'] as string[] : []
  const tags = Array.isArray(raw['tags']) ? raw['tags'] as string[] : []
  const estimatedRoi = String(raw['estimated_roi'] || '')
  const setupTime = String(raw['setup_time'] || '')
  const nodesCount = raw['nodes_count']
  const usesAI = Boolean(raw['uses_ai'])
  const usesMCP = Boolean(raw['uses_mcp'])
  const result = String(raw['result'] || '')
  const workflowJson = String(raw['workflow_json'] || '')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (hasAccess && workflowJson) {
      navigator.clipboard.writeText(workflowJson)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (hasAccess && workflowJson) {
      const blob = new Blob([workflowJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.json`
      a.click()
    }
  }

  const platformColor = platformColors[platform] || COLOR

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black"
            style={{ background: `${platformColor}20`, color: platformColor, border: `1px solid ${platformColor}30` }}>
            {platform.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-black text-white">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                style={{ background: `${platformColor}15`, color: platformColor }}>{platform}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize"
                style={{ background: `${complexityColors[complexity] || '#94a3b8'}12`, color: complexityColors[complexity] || '#94a3b8' }}>{complexity}</span>
              <ScoreBadge score={item.score_global} size="sm" />
            </div>
          </div>
        </div>
        <button onClick={close} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.06]"
          style={{ color: 'var(--c-text-3)' }}>✕</button>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{descLong}</p>
      {result && (
        <div className="rounded-xl p-3" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)' }}>
          <div className="text-[9px] uppercase font-bold mb-1" style={{ color: '#4ade80' }}>Résultat</div>
          <p className="text-xs" style={{ color: 'var(--c-text-2)' }}>{result}</p>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: 'Type', value: type },
          { label: 'ROI', value: estimatedRoi },
          { label: 'Setup', value: setupTime },
          { label: 'Nœuds', value: nodesCount ? String(nodesCount) : '' },
        ].filter(x => x.value).map(({ label, value }) => (
          <div key={label} className="rounded-lg p-2.5 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[9px] uppercase font-bold mb-1" style={{ color: 'var(--c-text-3)' }}>{label}</div>
            <div className="text-xs font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {usesAI && <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}>🤖 Utilise l'IA</span>}
        {usesMCP && <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7' }}>🔌 MCP</span>}
      </div>
      {trigger.length > 0 && (
        <div>
          <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Déclencheurs</div>
          <div className="flex flex-wrap gap-1.5">{trigger.map(t => <Badge key={t} color={COLOR}>{t}</Badge>)}</div>
        </div>
      )}
      {apps.length > 0 && (
        <div>
          <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Apps connectées</div>
          <div className="flex flex-wrap gap-1.5">
            {apps.map(a => (
              <span key={a} className="text-xs px-2.5 py-1 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-2)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">{tags.map(t => <Badge key={t} color={COLOR}>{t}</Badge>)}</div>
      <div className="flex gap-2 flex-wrap">
        <button onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 min-w-[100px]"
          style={{ background: hasAccess ? `linear-gradient(135deg, ${COLOR}, ${COLOR}aa)` : 'rgba(255,255,255,0.05)', color: hasAccess ? '#030712' : 'var(--c-text-3)' }}>
          {copied ? '✓ Copié !' : (hasAccess ? '📋 Copier JSON' : '🔒 Copier JSON')}
        </button>
        <button onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{ background: hasAccess ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.04)', color: hasAccess ? COLOR : 'var(--c-text-3)', border: `1px solid ${hasAccess ? COLOR + '30' : 'rgba(255,255,255,0.08)'}` }}>
          ⬇ {hasAccess ? 'Télécharger .json' : '🔒 Télécharger'}
        </button>
        <LikeSaveButtons item={{ id: item.id, type: 'workflow' }} />
      </div>
    </div>
  )
}

export default function AutomatisationsPage() {
  const { hasModule } = useAuth()
  const hasAccess = hasModule('automation')
  const [platformFilter, setPlatformFilter] = useState('')

  const filteredItems = platformFilter
    ? (WORKFLOWS as unknown as Record<string, unknown>[]).filter(w => w['platform'] === platformFilter) as unknown as CatalogItem[]
    : WORKFLOWS as unknown as CatalogItem[]

  const content = (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: `${COLOR}10`, border: `1px solid ${COLOR}20`, color: COLOR }}>
          ⚡ Automatisations Premium
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
          Auto
          <span style={{ background: `linear-gradient(135deg, ${COLOR}, #00d4ff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            matisations
          </span>
        </h1>
        <p className="text-lg max-w-2xl mb-6" style={{ color: 'var(--c-text-2)' }}>
          {WORKFLOWS.length}+ workflows n8n, Make, Zapier et LangChain prêts à l'emploi. Téléchargez le JSON, importez, lancez.
        </p>
        <div className="flex gap-2 flex-wrap mb-6">
          {['', 'n8n', 'Make', 'Zapier', 'Actioner', 'LangChain'].map(p => (
            <button key={p} onClick={() => setPlatformFilter(p)}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{ background: platformFilter === p ? (platformColors[p] || COLOR) : `${COLOR}10`, color: platformFilter === p ? '#030712' : (platformColors[p] || COLOR), border: `1px solid ${(platformColors[p] || COLOR)}25` }}>
              {p || 'Tous'}
            </button>
          ))}
        </div>
        <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <div className="flex gap-3" style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}>
            {[...PLATFORM_TOOLS, ...PLATFORM_TOOLS].map((tool, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0"
                style={{ background: `${tool.color}12`, border: `1px solid ${tool.color}25`, color: tool.color }}>
                <span className="font-bold text-xs">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DatabaseShell
        items={filteredItems}
        filterDefs={FILTERS}
        renderCardFront={CardFront}
        renderCardBack={CardBack}
        renderModal={(item, close) => <ModalContent item={item} close={close} hasAccess={hasAccess} />}
        moduleColor={COLOR}
        moduleLabel="Automatisations"
        tableColumns={TABLE_COLUMNS}
        kanbanAxis={KANBAN_AXIS}
        hasAccess={hasAccess}
        searchFields={['name', 'desc_short', 'tags', 'platform', 'apps', 'type']}
      />
    </div>
  )

  if (!hasAccess) {
    return <LockOverlay module="automation" label="Débloquer les Automatisations">{content}</LockOverlay>
  }

  return content
}
