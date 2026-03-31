'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import DatabaseShell from '@/components/catalog/DatabaseShell'
import LockOverlay from '@/components/shared/LockOverlay'
import LikeSaveButtons from '@/components/shared/LikeSaveButtons'
import ScoreBadge from '@/components/shared/ScoreBadge'
import Badge from '@/components/shared/Badge'
import { VISUAL_PROMPTS } from '@/data/visual-prompts'
import type { FilterDef, KanbanAxis, CatalogItem } from '@/types'

const COLOR = '#f87171'

const FILTERS: FilterDef[] = [
  { key: 'tool', label: 'Outil principal', type: 'multiselect', options: ['Midjourney', 'DALL-E 3', 'Flux', 'Stable Diffusion', 'Ideogram', 'Leonardo AI', 'Firefly', 'Krea AI', 'Kling AI', 'Runway'] },
  { key: 'generation_type', label: 'Type de génération', type: 'multiselect', options: ['txt→img', 'txt→vid', 'txt+img→img', 'txt+img→vid', 'img→img', 'upscale'] },
  { key: 'style', label: 'Style', type: 'multiselect', options: ['Photoréaliste', 'Cinématique', 'Minimaliste', 'Illustration', 'Anime', '3D', 'Futuriste', 'Vintage', 'Sketch', 'Watercolor', 'Oil Painting', 'Comic'] },
  { key: 'realism', label: 'Réalisme', type: 'multiselect', options: ['hyperréaliste', 'réaliste', 'semi-réaliste', 'stylisé', 'abstrait'] },
  { key: 'format', label: 'Format', type: 'multiselect', options: ['paysage', 'portrait', 'carré', 'cinémascope', 'vertical'] },
  { key: 'ratio', label: 'Ratio', type: 'multiselect', options: ['16:9', '2:3', '1:1', '21:9', '9:16', '4:5', '3:2'] },
  { key: 'lighting', label: 'Éclairage', type: 'multiselect', options: ['Studio', 'Golden Hour', 'Dramatic', 'Neon', 'Natural', 'Backlit', 'Cinematic', 'Soft Box', 'Rembrandt'] },
  { key: 'mood', label: 'Ambiance', type: 'multiselect', options: ['Épique', 'Serein', 'Mystérieux', 'Joyeux', 'Sombre', 'Luxueux', 'Minimaliste', 'Nostalgique', 'Futuriste'] },
  { key: 'subject', label: 'Sujet', type: 'multiselect', options: ['Portrait', 'Architecture', 'Produit', 'Nature', 'Abstrait', 'Personnage', 'Logo', 'UI', 'Animal', 'Véhicule', 'Nourriture'] },
  { key: 'destination', label: 'Destination', type: 'multiselect', options: ['LinkedIn', 'Instagram', 'YouTube Thumb', 'Publicité', 'Livre', 'Web', 'Print', 'TikTok', 'NFT'] },
  { key: 'featured', label: '⭐ Featured', type: 'toggle' },
]

const KANBAN_AXIS: KanbanAxis = {
  key: 'realism',
  label: 'Niveau de réalisme',
  getValue: (item: CatalogItem) => (item as { realism: string }).realism,
}

const TABLE_COLUMNS = [
  { key: 'name', label: 'Nom', width: '22%' },
  { key: 'tool', label: 'Outil', width: '12%' },
  { key: 'generation_type', label: 'Type', width: '14%' },
  { key: 'style', label: 'Style', width: '15%', render: (item: CatalogItem) => {
    const styles = (item as unknown as Record<string,unknown>)['style'] as string[] || []
    return <span className="text-xs" style={{ color: 'var(--c-text-2)' }}>{styles.slice(0,2).join(', ')}</span>
  }},
  { key: 'format', label: 'Format', width: '10%' },
  { key: 'realism', label: 'Réalisme', width: '13%' },
  { key: 'score_global', label: 'Score', width: '14%', render: (item: CatalogItem) => <ScoreBadge score={item.score_global} size="sm" /> },
]

const VISUAL_TOOLS = [
  { name: 'Midjourney', color: '#a855f7' }, { name: 'DALL-E 3', color: '#00a67e' }, { name: 'Kling AI', color: '#f97316' },
  { name: 'Runway', color: '#00d4ff' }, { name: 'Leonardo AI', color: '#facc15' }, { name: 'Stable Diffusion', color: '#4ade80' },
  { name: 'Ideogram', color: '#f87171' }, { name: 'Adobe Firefly', color: '#ff6b6b' }, { name: 'Krea AI', color: '#60a5fa' }, { name: 'Magnific', color: '#a855f7' },
]

const TYPE_FILTERS = [
  { key: '', label: 'Tous' }, { key: 'txt→img', label: 'T→Image' }, { key: 'txt→vid', label: 'T→Vidéo' },
  { key: 'txt+img→img', label: 'I→Image' }, { key: 'txt+img→vid', label: 'I→Vidéo' }, { key: 'upscale', label: 'Upscale' },
]

function CardFront(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descShort = String(raw['desc_short'] || '')
  const tool = String(raw['tool'] || '')
  const genType = String(raw['generation_type'] || '')
  const realism = String(raw['realism'] || '')
  const styles = Array.isArray(raw['style']) ? raw['style'] as string[] : []
  const previewUrl = String(raw['preview_url'] || '')
  const ratio = String(raw['ratio'] || '')
  const realismColors: Record<string, string> = {
    'hyperréaliste': '#00d4ff', 'réaliste': '#4ade80', 'semi-réaliste': '#facc15', 'stylisé': '#a855f7', 'abstrait': '#f87171'
  }
  const realismColor = realismColors[realism] || COLOR

  return (
    <div className="flex flex-col h-full">
      {previewUrl ? (
        <div className="relative overflow-hidden rounded-t-xl" style={{ height: 120 }}>
          <img src={previewUrl} alt={name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(13,20,36,0.9))' }} />
          <div className="absolute bottom-2 left-2 flex gap-1">
            <span className="text-[8px] px-1.5 py-0.5 rounded font-bold backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>{tool}</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded font-bold backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.6)', color: '#00d4ff' }}>{ratio || genType}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-t-xl" style={{ height: 90, background: `${COLOR}10` }}>
          <span className="text-3xl">🎨</span>
        </div>
      )}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-1">
          <div className="font-black text-xs text-white leading-tight">{name}</div>
          <ScoreBadge score={item.score_global} />
        </div>
        <p className="text-[10px] leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--c-text-2)' }}>{descShort}</p>
        <div className="flex flex-wrap gap-1">
          <span className="text-[8px] px-1.5 py-0.5 rounded-full font-semibold"
            style={{ background: `${realismColor}15`, color: realismColor }}>{realism}</span>
          {styles.slice(0, 2).map(s => <Badge key={s} color={COLOR}>{s}</Badge>)}
        </div>
      </div>
    </div>
  )
}

function CardBack(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const promptText = String(raw['prompt_text'] || '').slice(0, 150)
  const promptParams = String(raw['prompt_params'] || '')
  const toolsCompatible = Array.isArray(raw['tools_compatible']) ? raw['tools_compatible'] as string[] : []

  return (
    <div className="p-3 flex flex-col gap-2.5 h-full">
      <div className="font-black text-xs text-white">{name}</div>
      <div className="flex-1 rounded-lg p-2.5 overflow-hidden relative"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'monospace' }}>
        <p className="text-[9px] leading-relaxed" style={{ color: 'var(--c-text-3)', filter: 'blur(2px)', userSelect: 'none' }}>
          {promptText}…
        </p>
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,20,36,0.95))' }}>
          <span className="text-[10px] font-bold" style={{ color: COLOR }}>📋 Voir le prompt complet</span>
        </div>
      </div>
      {promptParams && (
        <div className="text-[8px] px-2 py-1 rounded font-mono"
          style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--c-text-3)' }}>{promptParams}</div>
      )}
      {toolsCompatible.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {toolsCompatible.slice(0, 3).map(t => (
            <span key={t} className="text-[8px] px-1.5 py-0.5 rounded"
              style={{ background: `${COLOR}10`, color: COLOR }}>{t}</span>
          ))}
        </div>
      )}
      <div className="flex justify-end">
        <LikeSaveButtons item={{ id: item.id, type: 'visual' }} showCount={false} />
      </div>
    </div>
  )
}

function ModalContent({ item, close, hasAccess }: { item: CatalogItem; close: () => void; hasAccess: boolean }) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descShort = String(raw['desc_short'] || '')
  const promptText = String(raw['prompt_text'] || '')
  const promptParams = String(raw['prompt_params'] || '')
  const tool = String(raw['tool'] || '')
  const toolsCompatible = Array.isArray(raw['tools_compatible']) ? raw['tools_compatible'] as string[] : []
  const genType = String(raw['generation_type'] || '')
  const styles = Array.isArray(raw['style']) ? raw['style'] as string[] : []
  const realism = String(raw['realism'] || '')
  const format = String(raw['format'] || '')
  const ratio = String(raw['ratio'] || '')
  const lighting = String(raw['lighting'] || '')
  const moods = Array.isArray(raw['mood']) ? raw['mood'] as string[] : []
  const tags = Array.isArray(raw['tags']) ? raw['tags'] as string[] : []
  const previewUrl = String(raw['preview_url'] || '')
  const [copied, setCopied] = useState(false)
  const fullPrompt = promptParams ? `${promptText} ${promptParams}` : promptText

  const copyPrompt = () => {
    if (hasAccess && fullPrompt) {
      navigator.clipboard.writeText(fullPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {previewUrl && (
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <img src={previewUrl} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h2 className="text-lg font-black text-white">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: `${COLOR}15`, color: COLOR }}>{tool}</span>
              <ScoreBadge score={item.score_global} size="sm" />
            </div>
          </div>
        </div>
        <button onClick={close} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.06]"
          style={{ color: 'var(--c-text-3)' }}>✕</button>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{descShort}</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {[
          { label: 'Type', value: genType }, { label: 'Format', value: format },
          { label: 'Ratio', value: ratio }, { label: 'Réalisme', value: realism },
          { label: 'Éclairage', value: lighting }, { label: 'Ambiance', value: moods[0] || '' },
        ].filter(x => x.value).map(({ label, value }) => (
          <div key={label} className="rounded-lg p-2 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[8px] uppercase font-bold mb-0.5" style={{ color: 'var(--c-text-4)' }}>{label}</div>
            <div className="text-[10px] font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>
      {styles.length > 0 && (
        <div>
          <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Styles</div>
          <div className="flex flex-wrap gap-1.5">{styles.map(s => <Badge key={s} color={COLOR}>{s}</Badge>)}</div>
        </div>
      )}
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}20` }}>
        <div className="flex items-center justify-between px-4 py-2.5"
          style={{ background: `${COLOR}08`, borderBottom: `1px solid ${COLOR}15` }}>
          <span className="text-xs font-bold" style={{ color: COLOR }}>Prompt complet</span>
          {!hasAccess && (
            <span className="text-[9px] px-2 py-0.5 rounded font-bold"
              style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}>
              🔒 Full Access requis
            </span>
          )}
        </div>
        <div className="p-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <pre className="text-[11px] leading-relaxed whitespace-pre-wrap font-mono"
            style={{ color: hasAccess ? 'var(--c-text-1)' : 'var(--c-text-4)', filter: hasAccess ? 'none' : 'blur(5px)', userSelect: hasAccess ? 'auto' : 'none', maxHeight: 180, overflow: 'auto' }}>
            {promptText}
          </pre>
          {promptParams && (
            <div className="mt-2 text-[10px] font-mono px-2 py-1 rounded"
              style={{ background: 'rgba(255,255,255,0.05)', color: hasAccess ? COLOR : 'var(--c-text-4)', filter: hasAccess ? 'none' : 'blur(4px)' }}>
              {promptParams}
            </div>
          )}
        </div>
      </div>
      {toolsCompatible.length > 0 && (
        <div>
          <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Compatible avec</div>
          <div className="flex flex-wrap gap-1.5">
            {toolsCompatible.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-2)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">{tags.map(t => <Badge key={t} color={COLOR}>{t}</Badge>)}</div>
      <div className="flex gap-2">
        <button onClick={copyPrompt}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{ background: hasAccess ? `linear-gradient(135deg, ${COLOR}, ${COLOR}aa)` : 'rgba(255,255,255,0.05)', color: hasAccess ? '#030712' : 'var(--c-text-3)' }}>
          {copied ? '✓ Copié !' : (hasAccess ? '📋 Copier le prompt complet' : '🔒 Copier le prompt')}
        </button>
        <LikeSaveButtons item={{ id: item.id, type: 'visual' }} />
      </div>
    </div>
  )
}

export default function PromptsVisuelsPage() {
  const { hasModule } = useAuth()
  const hasAccess = hasModule('visual')
  const [typeFilter, setTypeFilter] = useState('')

  const filteredItems = typeFilter
    ? (VISUAL_PROMPTS as unknown as Record<string, unknown>[]).filter(p => p['generation_type'] === typeFilter) as unknown as CatalogItem[]
    : VISUAL_PROMPTS as unknown as CatalogItem[]

  const content = (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: `${COLOR}10`, border: `1px solid ${COLOR}20`, color: COLOR }}>
          🎨 Prompts Visuels Premium
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
          Prompts{' '}
          <span style={{ background: `linear-gradient(135deg, ${COLOR}, #f97316)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Visuels
          </span>
        </h1>
        <p className="text-lg max-w-2xl mb-6" style={{ color: 'var(--c-text-2)' }}>
          {VISUAL_PROMPTS.length}+ prompts Midjourney, DALL-E, Flux, Stable Diffusion et Kling avec paramètres optimisés.
        </p>
        <div className="flex gap-2 flex-wrap mb-6">
          {TYPE_FILTERS.map(f => (
            <button key={f.key} onClick={() => setTypeFilter(f.key)}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{ background: typeFilter === f.key ? COLOR : `${COLOR}10`, color: typeFilter === f.key ? '#030712' : COLOR, border: `1px solid ${COLOR}25` }}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <div className="flex gap-3" style={{ animation: 'marquee 30s linear infinite', width: 'max-content' }}>
            {[...VISUAL_TOOLS, ...VISUAL_TOOLS].map((tool, i) => (
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
        moduleLabel="Prompts Visuels"
        tableColumns={TABLE_COLUMNS}
        kanbanAxis={KANBAN_AXIS}
        hasAccess={hasAccess}
        searchFields={['name', 'desc_short', 'tags', 'style', 'destination', 'mood', 'subject']}
      />
    </div>
  )

  if (!hasAccess) {
    return <LockOverlay module="visual" label="Débloquer les Prompts Visuels">{content}</LockOverlay>
  }

  return content
}
