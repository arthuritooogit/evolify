'use client'

import { useState } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import type { FilterDef } from '@/types'

interface Props {
  filterDefs: FilterDef[]
  activeFilters: Record<string, string[]>
  onChange: (key: string, values: string[]) => void
  onReset: () => void
  moduleColor: string
}

function MultiSelectDropdown({
  def, active, color, onToggle,
}: { def: FilterDef; active: string[]; color: string; onToggle: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const hasActive = active.length > 0

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap"
        style={{
          background: hasActive ? `${color}15` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hasActive ? `${color}35` : 'rgba(255,255,255,0.08)'}`,
          color: hasActive ? color : 'var(--c-text-2)',
        }}
      >
        {def.label}
        {hasActive && (
          <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
            style={{ background: color, color: '#030712' }}>
            {active.length}
          </span>
        )}
        <ChevronDown size={11} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1.5 z-50 min-w-[160px] rounded-xl overflow-hidden"
            style={{ background: 'rgba(13,20,36,0.98)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
            {def.options?.map(opt => {
              const checked = active.includes(opt)
              return (
                <button key={opt} onClick={() => onToggle(opt)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-left transition-colors hover:bg-white/[0.04]"
                  style={{ color: checked ? color : 'var(--c-text-2)' }}>
                  <div className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: checked ? `${color}20` : 'rgba(255,255,255,0.06)', border: `1px solid ${checked ? color : 'rgba(255,255,255,0.1)'}` }}>
                    {checked && <div className="w-2 h-2 rounded-sm" style={{ background: color }} />}
                  </div>
                  {opt}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default function FilterBar({ filterDefs, activeFilters, onChange, onReset, moduleColor }: Props) {
  const totalActive = Object.values(activeFilters).flat().length

  const handleToggle = (key: string, value: string) => {
    const current = activeFilters[key] || []
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    onChange(key, next)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--c-text-3)' }}>
        <SlidersHorizontal size={13} />
        Filtres
      </div>

      {filterDefs.map(def => {
        const active = activeFilters[def.key] || []
        if (def.type === 'multiselect' && def.options) {
          return (
            <MultiSelectDropdown
              key={def.key}
              def={def}
              active={active}
              color={moduleColor}
              onToggle={(v) => handleToggle(def.key, v)}
            />
          )
        }
        if (def.type === 'toggle') {
          const isOn = active.includes('true')
          return (
            <button key={def.key}
              onClick={() => onChange(def.key, isOn ? [] : ['true'])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap"
              style={{
                background: isOn ? `${moduleColor}15` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isOn ? `${moduleColor}35` : 'rgba(255,255,255,0.08)'}`,
                color: isOn ? moduleColor : 'var(--c-text-2)',
              }}>
              {def.label}
            </button>
          )
        }
        return null
      })}

      {totalActive > 0 && (
        <button onClick={onReset}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150 hover:bg-white/[0.06]"
          style={{ color: 'var(--c-text-3)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <X size={11} />
          Reset ({totalActive})
        </button>
      )}
    </div>
  )
}
