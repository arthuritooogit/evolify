'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import DatabaseShell from '@/components/catalog/DatabaseShell'
import ScoreBadge from '@/components/shared/ScoreBadge'
import Badge from '@/components/shared/Badge'
import LikeSaveButtons from '@/components/shared/LikeSaveButtons'
import { TOOLS as AI_TOOLS } from '@/data/tools'
import type { FilterDef, KanbanAxis, CatalogItem } from '@/types'

const COLOR = '#a855f7'

const FILTERS: FilterDef[] = [
  { key: 'price', label: 'Tarif', type: 'multiselect', options: ['gratuit', 'freemium', 'payant', 'open-source'] },
  { key: 'functions', label: 'Fonctions', type: 'multiselect', options: ['Rédaction', 'Code', 'Analyse', 'Automatisation', 'Image', 'Vidéo', 'Audio', 'Recherche', 'Résumé', 'Brainstorming', 'Traduction', 'Transcription', 'Design'] },
  { key: 'uses', label: 'Usages', type: 'multiselect', options: ['Marketing', 'Développement', 'Éducation', 'Productivité', 'Design', 'Automatisation', 'Création de contenu', 'Recherche', 'Ventes', 'RH', 'Finance', 'Legal'] },
  { key: 'platforms', label: 'Plateformes', type: 'multiselect', options: ['Web', 'API', 'iOS', 'Android', 'Desktop', 'Discord', 'Self-hosted', 'Chrome Extension', 'Slack', 'VS Code'] },
  { key: 'jobs', label: 'Profils', type: 'multiselect', options: ['Entrepreneur', 'Développeur', 'Designer', 'Marketeur', 'Freelance', 'Étudiant', 'Commercial', 'RH', 'Analyste', 'Créatif'] },
  { key: 'featured', label: '⭐ Featured', type: 'toggle' },
]

const KANBAN_AXIS: KanbanAxis = {
  key: 'price',
  label: 'Modèle tarifaire',
  getValue: (item: CatalogItem) => (item as { price: string }).price,
}

const TABLE_COLUMNS = [
  { key: 'name', label: 'Outil', width: '22%' },
  { key: 'functions', label: 'Fonctions', width: '20%', render: (item: CatalogItem) => {
    const fns = (item as unknown as Record<string,unknown>)['functions'] as string[] || []
    return <span className="text-xs" style={{ color: 'var(--c-text-2)' }}>{fns.slice(0,2).join(', ')}</span>
  }},
  { key: 'price', label: 'Tarif', width: '10%' },
  { key: 'platforms', label: 'Plateformes', width: '18%', render: (item: CatalogItem) => {
    const plats = (item as unknown as Record<string,unknown>)['platforms'] as string[] || []
    return <span className="text-xs" style={{ color: 'var(--c-text-2)' }}>{plats.slice(0,3).join(', ')}</span>
  }},
  { key: 'uses', label: 'Usages', width: '18%', render: (item: CatalogItem) => {
    const uses = (item as unknown as Record<string,unknown>)['uses'] as string[] || []
    return <span className="text-xs" style={{ color: 'var(--c-text-2)' }}>{uses.slice(0,2).join(', ')}</span>
  }},
  { key: 'score_global', label: 'Score', width: '12%', render: (item: CatalogItem) => <ScoreBadge score={item.score_global} size="sm" /> },
]

const priceColors: Record<string, string> = {
  gratuit: '#4ade80', freemium: '#60a5fa', payant: '#f97316', 'open-source': '#a855f7'
}

function CardFront(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descShort = String(raw['desc_short'] || '')
  const price = String(raw['price'] || '')
  const functions = Array.isArray(raw['functions']) ? raw['functions'] as string[] : []
  const platforms = Array.isArray(raw['platforms']) ? raw['platforms'] as string[] : []
  const tags = Array.isArray(raw['tags']) ? raw['tags'] as string[] : []
  const featured = Boolean(raw['featured'])
  const verified = Boolean(raw['verified'])
  const priceColor = priceColors[price] || '#94a3b8'

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
            style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}25` }}>
            {name.slice(0, 2).toUpperCase()}
          </div>
          {verified && <span title="Vérifié" className="text-[9px]">✓</span>}
          {featured && <span className="text-[8px] px-1.5 py-0.5 rounded font-bold" style={{ background: '#facc1520', color: '#facc15' }}>★</span>}
        </div>
        <ScoreBadge score={item.score_global} />
      </div>
      <div className="font-black text-sm text-white">{name}</div>
      <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--c-text-2)' }}>{descShort}</p>
      <div className="flex flex-wrap gap-1 items-center">
        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold capitalize"
          style={{ background: `${priceColor}15`, color: priceColor, border: `1px solid ${priceColor}25` }}>
          {price}
        </span>
        {functions.slice(0, 2).map(f => (
          <span key={f} className="text-[8px] px-1.5 py-0.5 rounded font-medium"
            style={{ background: `${COLOR}10`, color: COLOR }}>{f}</span>
        ))}
      </div>
      <div className="flex flex-wrap gap-1">
        {platforms.slice(0, 3).map(p => (
          <span key={p} className="text-[8px] px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-3)' }}>{p}</span>
        ))}
      </div>
    </div>
  )
}

function CardBack(item: CatalogItem) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descLong = String(raw['desc_long'] || raw['desc_short'] || '')
  const strengths = Array.isArray(raw['strengths']) ? raw['strengths'] as string[] : []
  const limits = Array.isArray(raw['limits']) ? raw['limits'] as string[] : []
  const url = String(raw['url'] || '')
  const similar = Array.isArray(raw['similar_tools']) ? raw['similar_tools'] as string[] : []

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="font-black text-xs text-white">{name}</div>
      <p className="text-[10px] leading-relaxed flex-1 line-clamp-3" style={{ color: 'var(--c-text-2)' }}>{descLong}</p>
      {strengths.length > 0 && (
        <div>
          {strengths.slice(0, 2).map(s => (
            <div key={s} className="flex items-center gap-1 text-[9px]" style={{ color: '#4ade80' }}>
              <span>✓</span><span className="line-clamp-1">{s}</span>
            </div>
          ))}
          {limits.slice(0, 1).map(l => (
            <div key={l} className="flex items-center gap-1 text-[9px]" style={{ color: '#f87171' }}>
              <span>✗</span><span className="line-clamp-1">{l}</span>
            </div>
          ))}
        </div>
      )}
      {similar.length > 0 && (
        <div className="text-[8px]" style={{ color: 'var(--c-text-4)' }}>
          Similaires: {similar.slice(0, 3).join(', ')}
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        {url && url !== '#' && (
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center py-2 rounded-lg text-[10px] font-bold transition-all hover:scale-105"
            style={{ background: `${COLOR}15`, color: COLOR, border: `1px solid ${COLOR}25` }}>
            Visiter →
          </a>
        )}
        <LikeSaveButtons item={{ id: item.id, type: 'tool' }} showCount={false} />
      </div>
    </div>
  )
}

function ModalContent({ item, close }: { item: CatalogItem; close: () => void }) {
  const raw = item as unknown as Record<string, unknown>
  const name = String(raw['name'] || '')
  const descLong = String(raw['desc_long'] || raw['desc_short'] || '')
  const url = String(raw['url'] || '')
  const price = String(raw['price'] || '')
  const priceDetail = String(raw['price_detail'] || '')
  const functions = Array.isArray(raw['functions']) ? raw['functions'] as string[] : []
  const uses = Array.isArray(raw['uses']) ? raw['uses'] as string[] : []
  const platforms = Array.isArray(raw['platforms']) ? raw['platforms'] as string[] : []
  const strengths = Array.isArray(raw['strengths']) ? raw['strengths'] as string[] : []
  const limits = Array.isArray(raw['limits']) ? raw['limits'] as string[] : []
  const tags = Array.isArray(raw['tags']) ? raw['tags'] as string[] : []
  const priceColor = priceColors[price] || '#94a3b8'

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-black"
            style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}30` }}>
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-black text-white">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold capitalize"
                style={{ background: `${priceColor}15`, color: priceColor }}>{price}</span>
              <ScoreBadge score={item.score_global} size="sm" />
            </div>
          </div>
        </div>
        <button onClick={close} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.06]"
          style={{ color: 'var(--c-text-3)' }}>✕</button>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{descLong}</p>
      {priceDetail && <p className="text-xs" style={{ color: 'var(--c-text-3)' }}>💰 {priceDetail}</p>}
      <div className="grid grid-cols-2 gap-4">
        {functions.length > 0 && (
          <div>
            <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Fonctions</div>
            <div className="flex flex-wrap gap-1">
              {functions.map(f => <Badge key={f} color={COLOR}>{f}</Badge>)}
            </div>
          </div>
        )}
        {platforms.length > 0 && (
          <div>
            <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Plateformes</div>
            <div className="flex flex-wrap gap-1">
              {platforms.map(p => (
                <span key={p} className="text-xs px-2 py-0.5 rounded"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--c-text-2)' }}>{p}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      {(strengths.length > 0 || limits.length > 0) && (
        <div className="grid grid-cols-2 gap-4">
          {strengths.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold mb-2" style={{ color: '#4ade80' }}>Points forts</div>
              {strengths.map(s => (
                <div key={s} className="flex items-start gap-1.5 text-xs mb-1" style={{ color: 'var(--c-text-2)' }}>
                  <span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>{s}
                </div>
              ))}
            </div>
          )}
          {limits.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold mb-2" style={{ color: '#f87171' }}>Limites</div>
              {limits.map(l => (
                <div key={l} className="flex items-start gap-1.5 text-xs mb-1" style={{ color: 'var(--c-text-2)' }}>
                  <span style={{ color: '#f87171', flexShrink: 0 }}>✗</span>{l}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {uses.length > 0 && (
        <div>
          <div className="text-[10px] uppercase font-bold mb-2" style={{ color: 'var(--c-text-3)' }}>Usages</div>
          <div className="flex flex-wrap gap-1">
            {uses.map(u => <Badge key={u} color={COLOR}>{u}</Badge>)}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">{tags.map(t => <Badge key={t} color={COLOR}>{t}</Badge>)}</div>
      <div className="flex gap-2">
        {url && url !== '#' && (
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${COLOR}, ${COLOR}aa)`, color: '#030712' }}>
            Visiter le site →
          </a>
        )}
        <LikeSaveButtons item={{ id: item.id, type: 'tool' }} />
      </div>
    </div>
  )
}

export default function OutilsIAPage() {
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: `${COLOR}10`, border: `1px solid ${COLOR}20`, color: COLOR }}>
          🛠️ Accès gratuit
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
          Outils{' '}
          <span style={{ background: `linear-gradient(135deg, ${COLOR}, #60a5fa)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            IA
          </span>
        </h1>
        <p className="text-lg max-w-2xl mb-2" style={{ color: 'var(--c-text-2)' }}>
          {AI_TOOLS.length}+ outils IA référencés, catégorisés et notés. Trouvez le bon outil en 30 secondes.
        </p>
        <div className="flex gap-4 text-sm flex-wrap">
          {[
            { label: 'Gratuits',    count: AI_TOOLS.filter((t: {price:string}) => t.price === 'gratuit').length,     color: '#4ade80' },
            { label: 'Freemium',    count: AI_TOOLS.filter((t: {price:string}) => t.price === 'freemium').length,    color: '#60a5fa' },
            { label: 'Open-source', count: AI_TOOLS.filter((t: {price:string}) => t.price === 'open-source').length, color: '#a855f7' },
          ].map(({ label, count, color }) => (
            <span key={label} className="text-xs" style={{ color: 'var(--c-text-3)' }}>
              <span style={{ color }} className="font-bold">{count}</span> {label}
            </span>
          ))}
        </div>
      </div>

      <DatabaseShell
        items={AI_TOOLS as unknown as CatalogItem[]}
        filterDefs={FILTERS}
        renderCardFront={CardFront}
        renderCardBack={CardBack}
        renderModal={(item, close) => <ModalContent item={item} close={close} />}
        moduleColor={COLOR}
        moduleLabel="Outils IA"
        tableColumns={TABLE_COLUMNS}
        kanbanAxis={KANBAN_AXIS}
        hasAccess={true}
        searchFields={['name', 'desc_short', 'tags', 'functions', 'uses']}
      />
    </div>
  )
}
