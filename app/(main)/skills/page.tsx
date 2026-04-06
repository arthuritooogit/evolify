'use client'

import { useState } from 'react'
import DatabaseShell from '@/components/catalog/DatabaseShell'
import ScoreBadge from '@/components/shared/ScoreBadge'
import Badge from '@/components/shared/Badge'
import LikeSaveButtons from '@/components/shared/LikeSaveButtons'
import { SKILLS } from '@/data/skills'
import type { FilterDef, KanbanAxis, CatalogItem } from '@/types'

const COLOR = '#facc15'

const FILTERS: FilterDef[] = [
  { key: 'skill_type', label: 'Type', type: 'multiselect', options: ['skill', 'plugin', 'extension', 'mcp', 'api', 'template', 'repo', 'prompt-system'] },
  { key: 'compatible_with', label: 'Compatible avec', type: 'multiselect', options: ['Claude', 'Cursor', 'n8n', 'Make', 'ChatGPT', 'Gemini', 'VS Code', 'Obsidian', 'Browser', 'GitHub', 'Slack', 'Notion'] },
  { key: 'category', label: 'Catégorie', type: 'multiselect', options: ['Développement', 'Marketing', 'Productivité', 'Database', 'Automatisation', 'Design', 'Recherche', 'Communication', 'Finance', 'RH'] },
  { key: 'action_type', label: 'Action', type: 'multiselect', options: ['download', 'copy', 'link', 'install'] },
  { key: 'language', label: 'Langage', type: 'multiselect', options: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'Shell', 'SQL', 'Markdown'] },
  { key: 'is_mcp', label: '🔌 MCPs seulement', type: 'toggle' },
  { key: 'requires_api', label: '🔑 Nécessite une API', type: 'toggle' },
  { key: 'featured', label: '⭐ Featured', type: 'toggle' },
]

const KANBAN_AXIS: KanbanAxis = {
  key: 'category',
  label: 'Catégorie',
  getValue: (item: CatalogItem) => (item as { category: string }).category,
}

const TABLE_COLUMNS = [
  { key: 'name', label: 'Skill / Plugin', width: '22%' },
  { key: 'skill_type', label: 'Type', width: '12%' },
  { key: 'category', label: 'Catégorie', width: '14%' },
  { key: 'compatible_with', label: 'Compatible', width: '20%', render: (item: CatalogItem) => {
    const compat = (item as unknown as Record<string,unknown>)['compatible_with'] as string[] || []
    return <span className="text-xs" style={{ color: 'var(--c-text-2)' }}>{compat.slice(0,3).join(', ')}</span>
  }},
  { key: 'action_type', label: 'Action', width: '10%' },
  { key: 'is_mcp', label: 'MCP', width: '10%', render: (item: CatalogItem) => {
    const isMcp = Boolean((item as unknown as Record<string,unknown>)['is_mcp'])
    return <span style={{ color: isMcp ? '#a855f7' : 'var(--c-text-4)' }}>{isMcp ? '🔌 Oui' : '—'}</span>
  }},
  { key: 'score_global', label: 'Score', width: '12%', render: (item: CatalogItem) => <ScoreBadge score={item.score_global} size="sm" /> },
]

const SKILL_TOOLS = [
  { name: 'Claude Code', color: '#d4a27f' }, { name: 'Cursor', color: '#00d4ff' }, { name: 'GitHub Copilot', color: '#4ade80' },
  { name: 'n8n', color: '#ea4b71' }, { name: 'Obsidian', color: '#a855f7' }, { name: 'VS Code', color: '#60a5fa' },
  { name: 'Linear', color: '#5865f2' }, { name: 'Notion', color: '#f1f5f9' },
]

const typeColors: Record<string, string> = {
  skill: '#00d4ff', plugin: '#a855f7', extension: '#60a5fa', mcp: '#facc15',
  api: '#f97316', template: '#4ade80', repo: '#f87171', 'prompt-system': '#d4a27f'
}

function CardFront(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descShort = String(raw['desc_short'] || '')
  const skillType = String(raw['skill_type'] || '')
  const category = String(raw['category'] || '')
  const compatibleWith = Array.isArray(raw['compatible_with']) ? raw['compatible_with'] as string[] : []
  const isMcp = Boolean(raw['is_mcp'])
  const actionType = String(raw['action_type'] || '')
  const stars = raw['stars'] as number | undefined
  const typeColor = typeColors[skillType] || COLOR

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
            style={{ background: `${typeColor}20`, color: typeColor, border: `1px solid ${typeColor}25` }}>
            {isMcp ? '🔌' : skillType === 'template' ? '📄' : '🧩'}
          </div>
          {isMcp && (
            <span className="text-[8px] px-1.5 py-0.5 rounded font-bold"
              style={{ background: 'rgba(250,204,21,0.12)', color: '#facc15' }}>MCP</span>
          )}
        </div>
        <ScoreBadge score={item.score_global} />
      </div>
      <div className="font-black text-sm text-white leading-tight">{name}</div>
      {stars && (
        <div className="text-[9px]" style={{ color: '#facc15' }}>★ {stars.toLocaleString()}</div>
      )}
      <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--c-text-2)' }}>{descShort}</p>
      <div className="flex flex-wrap gap-1">
        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold capitalize"
          style={{ background: `${typeColor}15`, color: typeColor }}>{skillType}</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
          style={{ background: `${COLOR}10`, color: COLOR }}>{category}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {compatibleWith.slice(0, 3).map(c => (
          <span key={c} className="text-[8px] px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-3)' }}>{c}</span>
        ))}
      </div>
    </div>
  )
}

function CardBack(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const content = String(raw['content'] || '').slice(0, 200)
  const actionType = String(raw['action_type'] || '')
  const actionUrl = String(raw['action_url'] || raw['repo_url'] || '')
  const requiresApi = Boolean(raw['requires_api'])

  const handleAction = () => {
    if (actionType === 'copy' && raw['content']) {
      navigator.clipboard.writeText(String(raw['content']))
    } else if (actionType === 'download' && raw['file_url']) {
      window.open(String(raw['file_url']), '_blank')
    } else if (actionUrl) {
      window.open(actionUrl, '_blank')
    }
  }

  const actionLabels: Record<string, string> = {
    download: '⬇ Télécharger', copy: '📋 Copier', link: '🔗 Voir', install: '🔌 Installer'
  }

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="font-black text-xs text-white">{name}</div>
      {content ? (
        <div className="flex-1 rounded-lg p-2.5 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'monospace' }}>
          <pre className="text-[8px] leading-relaxed" style={{ color: 'var(--c-text-3)', filter: 'blur(1.5px)', userSelect: 'none' }}>
            {content}
          </pre>
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,20,36,0.95))' }}>
            <span className="text-[10px] font-bold" style={{ color: COLOR }}>👁 Voir le contenu</span>
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}
      {requiresApi && (
        <div className="text-[9px]" style={{ color: '#f97316' }}>🔑 Nécessite une clé API</div>
      )}
      <div className="flex items-center gap-2">
        <button onClick={handleAction}
          className="flex-1 flex items-center justify-center py-2 rounded-lg text-[10px] font-bold transition-all hover:scale-105"
          style={{ background: `${COLOR}15`, color: COLOR, border: `1px solid ${COLOR}25` }}>
          {actionLabels[actionType] || '🔗 Voir'}
        </button>
        <LikeSaveButtons item={{ id: item.id, type: 'skill' }} showCount={false} />
      </div>
    </div>
  )
}

function ModalContent({ item, close }: { item: CatalogItem; close: () => void }) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descLong = String(raw['desc_long'] || raw['desc_short'] || '')
  const content = String(raw['content'] || '')
  const skillType = String(raw['skill_type'] || '')
  const category = String(raw['category'] || '')
  const compatibleWith = Array.isArray(raw['compatible_with']) ? raw['compatible_with'] as string[] : []
  const useCases = Array.isArray(raw['use_cases']) ? raw['use_cases'] as string[] : []
  const tags = Array.isArray(raw['tags']) ? raw['tags'] as string[] : []
  const isMcp = Boolean(raw['is_mcp'])
  const requiresApi = Boolean(raw['requires_api'])
  const actionType = String(raw['action_type'] || '')
  const actionUrl = String(raw['action_url'] || raw['repo_url'] || raw['source_url'] || '')
  const language = String(raw['language'] || '')
  const stars = raw['stars'] as number | undefined
  const author = String(raw['author'] || '')
  const [copied, setCopied] = useState(false)
  const typeColor = typeColors[skillType] || COLOR

  const handleAction = () => {
    if (actionType === 'copy' && content) {
      navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else if (actionUrl) {
      window.open(actionUrl, '_blank')
    }
  }

  const downloadMd = () => {
    const mdContent = `# ${name}\n\n${descLong}\n\n## Contenu\n\n${content || 'Voir le lien source.'}\n\n## Compatibilité\n${compatibleWith.join(', ')}\n\n## Cas d'usage\n${useCases.map(u => `- ${u}`).join('\n')}`
    const blob = new Blob([mdContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.md`
    a.click()
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black"
            style={{ background: `${typeColor}20`, color: typeColor, border: `1px solid ${typeColor}30` }}>
            {isMcp ? '🔌' : '🧩'}
          </div>
          <div>
            <h2 className="text-lg font-black text-white">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold capitalize"
                style={{ background: `${typeColor}15`, color: typeColor }}>{skillType}</span>
              {isMcp && <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(250,204,21,0.1)', color: '#facc15' }}>MCP</span>}
              <ScoreBadge score={item.score_global} size="sm" />
            </div>
          </div>
        </div>
        <button onClick={close} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.06]"
          style={{ color: 'var(--c-text-3)' }}>✕</button>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{descLong}</p>
      <div className="flex flex-wrap gap-3 text-xs" style={{ color: 'var(--c-text-3)' }}>
        {category && <span>📂 {category}</span>}
        {language && <span>💻 {language}</span>}
        {stars && <span>⭐ {stars.toLocaleString()}</span>}
        {author && <span>👤 {author}</span>}
        {requiresApi && <span style={{ color: '#f97316' }}>🔑 API requise</span>}
      </div>
      {compatibleWith.length > 0 && (
        <div>
          <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Compatible avec</div>
          <div className="flex flex-wrap gap-1.5">
            {compatibleWith.map(c => (
              <span key={c} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-2)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
      {content && (
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}20` }}>
          <div className="flex items-center justify-between px-4 py-2.5"
            style={{ background: `${COLOR}08`, borderBottom: `1px solid ${COLOR}15` }}>
            <span className="text-xs font-bold" style={{ color: COLOR }}>Contenu</span>
          </div>
          <pre className="text-[10px] leading-relaxed whitespace-pre-wrap p-4 font-mono"
            style={{ color: 'var(--c-text-1)', maxHeight: 200, overflow: 'auto', background: 'rgba(0,0,0,0.2)' }}>
            {content}
          </pre>
        </div>
      )}
      {useCases.length > 0 && (
        <div>
          <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Cas d'usage</div>
          <div className="flex flex-wrap gap-1.5">{useCases.map(u => <Badge key={u} color={COLOR}>{u}</Badge>)}</div>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">{tags.map(t => <Badge key={t} color={COLOR}>{t}</Badge>)}</div>
      <div className="flex gap-2 flex-wrap">
        <button onClick={handleAction}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 min-w-[100px]"
          style={{ background: `linear-gradient(135deg, ${COLOR}, ${COLOR}bb)`, color: '#030712' }}>
          {copied ? '✓ Copié !' : (actionType === 'copy' ? '📋 Copier le contenu' : '🔗 Accéder')}
        </button>
        <button onClick={downloadMd}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{ background: 'rgba(250,204,21,0.12)', color: COLOR, border: `1px solid ${COLOR}25` }}>
          ⬇ .md
        </button>
        {actionUrl && (
          <a href={actionUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-2)', border: '1px solid rgba(255,255,255,0.08)' }}>
            GitHub ↗
          </a>
        )}
        <LikeSaveButtons item={{ id: item.id, type: 'skill' }} />
      </div>
    </div>
  )
}

const MODE_FILTERS = ['Tous', 'Skills', 'Plugins', 'MCPs', 'Extensions', 'Templates']

export default function SkillsPage() {
  const [modeFilter, setModeFilter] = useState('Tous')

  const modeMap: Record<string, string> = {
    Skills: 'skill', Plugins: 'plugin', MCPs: 'mcp', Extensions: 'extension', Templates: 'template'
  }

  const filteredItems = modeFilter !== 'Tous'
    ? modeFilter === 'MCPs'
      ? (SKILLS as unknown as Record<string, unknown>[]).filter(s => s['is_mcp']) as unknown as CatalogItem[]
      : (SKILLS as unknown as Record<string, unknown>[]).filter(s => s['skill_type'] === modeMap[modeFilter]) as unknown as CatalogItem[]
    : SKILLS as unknown as CatalogItem[]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: `${COLOR}10`, border: `1px solid ${COLOR}20`, color: COLOR }}>
          🧩 Skills & Plugins Premium
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
          Skills{' '}
          <span style={{ background: `linear-gradient(135deg, ${COLOR}, #f97316)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            & Plugins
          </span>
        </h1>
        <p className="text-lg max-w-2xl mb-6" style={{ color: 'var(--c-text-2)' }}>
          {SKILLS.length}+ MCPs, extensions, templates et skills pour Claude, Cursor, n8n et plus. Téléchargez en 1 clic.
        </p>
        <div className="flex gap-2 flex-wrap mb-6">
          {MODE_FILTERS.map(m => (
            <button key={m} onClick={() => setModeFilter(m)}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{ background: modeFilter === m ? COLOR : `${COLOR}10`, color: modeFilter === m ? '#030712' : COLOR, border: `1px solid ${COLOR}25` }}>
              {m}
            </button>
          ))}
        </div>
        <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <div className="flex gap-3" style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}>
            {[...SKILL_TOOLS, ...SKILL_TOOLS].map((tool, i) => (
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
        renderModal={(item, close) => <ModalContent item={item} close={close} />}
        moduleColor={COLOR}
        moduleLabel="Skills & Plugins"
        tableColumns={TABLE_COLUMNS}
        kanbanAxis={KANBAN_AXIS}
        hasAccess={true}
        searchFields={['name', 'desc_short', 'tags', 'category', 'compatible_with', 'use_cases']}
      />
    </div>
  )
}
