'use client'

import { useState } from 'react'
import DatabaseShell from '@/components/catalog/DatabaseShell'
import LikeSaveButtons from '@/components/shared/LikeSaveButtons'
import ScoreBadge from '@/components/shared/ScoreBadge'
import Badge from '@/components/shared/Badge'
import { LLM_PROMPTS } from '@/data/llm-prompts'
import type { FilterDef, KanbanAxis, CatalogItem } from '@/types'

const COLOR = '#60a5fa'

const FILTERS: FilterDef[] = [
  { key: 'prompt_type', label: 'Type', type: 'multiselect', options: ['system', 'user', 'chain', 'agent', 'template', 'mega-prompt'] },
  { key: 'category', label: 'Catégorie', type: 'multiselect', options: ['Copywriting', 'Code', 'Analyse', 'SEO', 'Stratégie', 'Marketing', 'Legal', 'Finance', 'RH', 'Commercial', 'Design', 'Recherche'] },
  { key: 'difficulty', label: 'Difficulté', type: 'multiselect', options: ['Débutant', 'Intermédiaire', 'Avancé'] },
  { key: 'top_models', label: 'Modèle IA', type: 'multiselect', options: ['Claude 3.5 Sonnet', 'Claude 3 Opus', 'GPT-4o', 'GPT-4o mini', 'Gemini 1.5 Pro', 'Mistral Large', 'Llama 3.1 405B', 'Grok-2', 'Perplexity'] },
  { key: 'output_type', label: 'Output', type: 'multiselect', options: ['texte', 'liste', 'tableau', 'code', 'json', 'email', 'script', 'rapport'] },
  { key: 'tone', label: 'Ton', type: 'multiselect', options: ['Professionnel', 'Créatif', 'Technique', 'Commercial', 'Académique', 'Casual'] },
  { key: 'language', label: 'Langue', type: 'multiselect', options: ['fr', 'en', 'multi'] },
  { key: 'framework', label: 'Framework', type: 'multiselect', options: ['AIDA', 'PAS', 'STAR', 'Chain-of-Thought', 'ReAct', 'Few-shot', 'Zero-shot', 'Tree-of-Thought', 'StoryBrand'] },
  { key: 'is_agent_prompt', label: '🤖 Agents seulement', type: 'toggle' },
  { key: 'featured', label: '⭐ Featured', type: 'toggle' },
]

const KANBAN_AXIS: KanbanAxis = {
  key: 'category',
  label: 'Catégorie',
  getValue: (item: CatalogItem) => (item as { category: string }).category,
}

const TABLE_COLUMNS = [
  { key: 'name', label: 'Nom', width: '25%' },
  { key: 'category', label: 'Catégorie', width: '13%' },
  { key: 'prompt_type', label: 'Type', width: '12%' },
  { key: 'difficulty', label: 'Difficulté', width: '12%' },
  { key: 'top_models', label: 'Modèles', width: '18%', render: (item: CatalogItem) => {
    const models = (item as unknown as Record<string,unknown>)['top_models'] as string[] || []
    return <span className="text-xs" style={{ color: 'var(--c-text-2)' }}>{models.slice(0,2).join(', ')}</span>
  }},
  { key: 'output_type', label: 'Output', width: '10%' },
  { key: 'score_global', label: 'Score', width: '10%', render: (item: CatalogItem) => <ScoreBadge score={item.score_global} size="sm" /> },
]

const AGENTS = [
  { label: 'Finance', emoji: '💰' }, { label: 'RH', emoji: '👥' }, { label: 'Sales', emoji: '🎯' },
  { label: 'Marketing', emoji: '📣' }, { label: 'Legal', emoji: '⚖️' }, { label: 'CEO', emoji: '👑' },
  { label: 'Product', emoji: '🚀' }, { label: 'Project', emoji: '📋' }, { label: 'Ops', emoji: '⚙️' },
  { label: 'Data', emoji: '📊' }, { label: 'QA', emoji: '🧪' }, { label: 'Copywriting', emoji: '✍️' },
  { label: 'SEO', emoji: '🔍' }, { label: 'Support', emoji: '💬' }, { label: 'Dev', emoji: '💻' },
  { label: 'Design', emoji: '🎨' }, { label: 'Automation', emoji: '⚡' }, { label: 'Security', emoji: '🔐' },
  { label: 'Research', emoji: '🔬' }, { label: 'Social', emoji: '📱' },
]

const LLM_TOOLS = [
  { name: 'Claude 3.5', color: '#d4a27f' }, { name: 'ChatGPT', color: '#00a67e' },
  { name: 'Perplexity', color: '#20b2aa' }, { name: 'Gemini', color: '#4285f4' },
  { name: 'Mistral', color: '#f97316' }, { name: 'Llama 3.1', color: '#a855f7' },
  { name: 'Grok-2', color: '#1da1f2' }, { name: 'Copilot', color: '#00bcf2' },
]

function CardFront(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descShort = String(raw['desc_short'] || '')
  const tags = Array.isArray(raw['tags']) ? raw['tags'] as string[] : []
  const category = String(raw['category'] || '')
  const difficulty = String(raw['difficulty'] || '')
  const topModels = Array.isArray(raw['top_models']) ? raw['top_models'] as string[] : []
  const isAgent = Boolean(raw['is_agent_prompt'])
  const diffColor = difficulty === 'Débutant' ? '#4ade80' : difficulty === 'Intermédiaire' ? '#facc15' : '#f87171'

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-black flex-shrink-0"
            style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}25` }}>
            {isAgent ? '🤖' : '💬'}
          </div>
          {isAgent && (
            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold"
              style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.25)' }}>
              Agent
            </span>
          )}
        </div>
        <ScoreBadge score={item.score_global} />
      </div>
      <div className="font-black text-sm text-white leading-tight">{name}</div>
      <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--c-text-2)' }}>{descShort}</p>
      <div className="flex flex-wrap gap-1 items-center">
        <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
          style={{ background: `${COLOR}12`, color: COLOR }}>{category}</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
          style={{ background: `${diffColor}12`, color: diffColor }}>{difficulty}</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {topModels.slice(0, 2).map(m => (
          <span key={m} className="text-[8px] px-1.5 py-0.5 rounded font-medium"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--c-text-3)' }}>
            {m.split(' ')[0]}
          </span>
        ))}
        {tags.slice(0, 2).map(t => <Badge key={t} color={COLOR}>{t}</Badge>)}
      </div>
    </div>
  )
}

function CardBack(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const promptText = String(raw['prompt_text'] || '').slice(0, 180)
  const variables = Array.isArray(raw['variables']) ? raw['variables'] as string[] : []
  const outputType = String(raw['output_type'] || '')
  const framework = String(raw['framework'] || '')

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="font-black text-xs text-white">{name}</div>
      <div className="flex-1 rounded-lg p-2.5 overflow-hidden relative"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-[10px] leading-relaxed" style={{ color: 'var(--c-text-3)', filter: 'blur(2px)', userSelect: 'none' }}>
          {promptText}…
        </p>
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,20,36,0.92))' }}>
          <span className="text-[10px] font-bold" style={{ color: COLOR }}>👁 Voir le prompt complet</span>
        </div>
      </div>
      {variables.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {variables.slice(0, 4).map(v => (
            <span key={v} className="text-[8px] px-1.5 py-0.5 rounded font-mono"
              style={{ background: `${COLOR}10`, color: COLOR }}>
              [{v}]
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-[9px]" style={{ color: 'var(--c-text-3)' }}>
          {outputType && <span>📄 {outputType}</span>}
          {framework && <span>🧩 {framework}</span>}
        </div>
        <LikeSaveButtons item={{ id: item.id, type: 'llm' }} showCount={false} />
      </div>
    </div>
  )
}

function ModalContent({ item, close }: { item: CatalogItem; close: () => void }) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descLong = String(raw['desc_long'] || raw['desc_short'] || '')
  const promptText = String(raw['prompt_text'] || '')
  const tags = Array.isArray(raw['tags']) ? raw['tags'] as string[] : []
  const variables = Array.isArray(raw['variables']) ? raw['variables'] as string[] : []
  const topModels = Array.isArray(raw['top_models']) ? raw['top_models'] as string[] : []
  const outputType = String(raw['output_type'] || '')
  const framework = String(raw['framework'] || '')
  const category = String(raw['category'] || '')
  const tone = String(raw['tone'] || '')
  const [copied, setCopied] = useState(false)

  const copyPrompt = () => {
    if (promptText) {
      navigator.clipboard.writeText(promptText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openChatGPT = () => {
    window.open(`https://chatgpt.com/?q=${encodeURIComponent(promptText.slice(0, 400))}`, '_blank')
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black"
            style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}30` }}>
            💬
          </div>
          <div>
            <h2 className="text-lg font-black text-white">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: `${COLOR}15`, color: COLOR }}>{category}</span>
              <ScoreBadge score={item.score_global} size="sm" />
            </div>
          </div>
        </div>
        <button onClick={close} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.06]"
          style={{ color: 'var(--c-text-3)' }}>✕</button>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{descLong}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: 'Output', value: outputType },
          { label: 'Framework', value: framework },
          { label: 'Ton', value: tone },
          { label: 'Variables', value: variables.length > 0 ? `${variables.length} var.` : '' },
        ].filter(x => x.value).map(({ label, value }) => (
          <div key={label} className="rounded-lg p-2.5 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[9px] uppercase font-bold mb-1" style={{ color: 'var(--c-text-3)' }}>{label}</div>
            <div className="text-xs font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>

      {topModels.length > 0 && (
        <div>
          <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Modèles recommandés</div>
          <div className="flex flex-wrap gap-1.5">
            {topModels.map(m => (
              <span key={m} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-2)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}20` }}>
        <div className="flex items-center justify-between px-4 py-2.5"
          style={{ background: `${COLOR}08`, borderBottom: `1px solid ${COLOR}15` }}>
          <span className="text-xs font-bold" style={{ color: COLOR }}>Prompt complet</span>
        </div>
        <pre className="text-[11px] leading-relaxed whitespace-pre-wrap p-4"
          style={{
            color: 'var(--c-text-1)',
            maxHeight: 240, overflow: 'auto',
            background: 'rgba(0,0,0,0.2)',
          }}>
          {promptText}
        </pre>
      </div>

      {variables.length > 0 && (
        <div>
          <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Variables à personnaliser</div>
          <div className="flex flex-wrap gap-1.5">
            {variables.map(v => (
              <span key={v} className="text-xs px-2.5 py-1 rounded-lg font-mono font-medium"
                style={{ background: `${COLOR}10`, color: COLOR, border: `1px solid ${COLOR}20` }}>
                [{v}]
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => <Badge key={t} color={COLOR}>{t}</Badge>)}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={copyPrompt}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 min-w-[120px]"
          style={{ background: `linear-gradient(135deg, ${COLOR}, ${COLOR}aa)`, color: '#030712' }}>
          {copied ? '✓ Copié !' : '📋 Copier le prompt'}
        </button>
        <button onClick={openChatGPT}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{ background: 'rgba(0,166,126,0.15)', color: '#00a67e', border: '1px solid rgba(0,166,126,0.25)' }}>
          🤖 ChatGPT
        </button>
        <LikeSaveButtons item={{ id: item.id, type: 'llm' }} />
      </div>
    </div>
  )
}

export default function PromptsLLMPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Hero */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: `${COLOR}10`, border: `1px solid ${COLOR}20`, color: COLOR }}>
          💬 Bibliothèque Premium
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
          Prompts{' '}
          <span style={{ background: `linear-gradient(135deg, ${COLOR}, #a855f7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            LLM
          </span>
        </h1>
        <p className="text-lg max-w-2xl mb-6" style={{ color: 'var(--c-text-2)' }}>
          {LLM_PROMPTS.length}+ prompts experts : copywriting, code, analyse, stratégie, legal, finance. Copiez en 1 clic vers n'importe quel LLM.
        </p>

        {/* Agents */}
        <div className="mb-6">
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--c-text-3)' }}>20 AGENTS SPÉCIALISÉS</p>
          <div className="flex gap-2 flex-wrap">
            {AGENTS.map(a => (
              <button key={a.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                style={{ background: `${COLOR}10`, border: `1px solid ${COLOR}20`, color: COLOR }}>
                <span>{a.emoji}</span>{a.label}
              </button>
            ))}
          </div>
        </div>

        {/* LLM tools scroller */}
        <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <div className="flex gap-3" style={{ animation: 'marquee 25s linear infinite', width: 'max-content' }}>
            {[...LLM_TOOLS, ...LLM_TOOLS].map((tool, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0"
                style={{ background: `${tool.color}12`, border: `1px solid ${tool.color}25`, color: tool.color }}>
                <span className="font-bold text-xs">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DatabaseShell
        items={LLM_PROMPTS as unknown as CatalogItem[]}
        filterDefs={FILTERS}
        renderCardFront={CardFront}
        renderCardBack={CardBack}
        renderModal={(item, close) => <ModalContent item={item} close={close} />}
        moduleColor={COLOR}
        moduleLabel="Prompts LLM"
        tableColumns={TABLE_COLUMNS}
        kanbanAxis={KANBAN_AXIS}
        hasAccess={true}
        searchFields={['name', 'desc_short', 'tags', 'category', 'use_cases', 'top_models']}
      />
    </div>
  )
}
