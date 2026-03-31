'use client'

import { useState, useRef, useCallback } from 'react'
import type { CatalogItem } from '@/types'

interface Props {
  item: CatalogItem
  renderFront: (item: CatalogItem) => React.ReactNode
  renderBack: (item: CatalogItem) => React.ReactNode
  onOpen: (item: CatalogItem) => void
  moduleColor: string
}

export default function FlipCard({ item, renderFront, renderBack, onOpen, moduleColor }: Props) {
  const [flipped, setFlipped] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => setFlipped(true), 2800)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setFlipped(false)
  }, [])

  return (
    <div
      className={`card-flip-container ${flipped ? 'flipped' : ''}`}
      style={{ height: '100%' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-flip-inner" style={{ height: '100%' }}>
        {/* Front */}
        <div className="card-flip-front rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(13,20,36,0.7)',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = `${moduleColor}30`)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
        >
          {renderFront(item)}
        </div>

        {/* Back */}
        <div className="card-flip-back rounded-2xl overflow-hidden"
          style={{
            background: `rgba(13,20,36,0.95)`,
            border: `1px solid ${moduleColor}25`,
            boxShadow: `0 0 30px ${moduleColor}10`,
          }}
          onClick={() => onOpen(item)}
        >
          {renderBack(item)}
        </div>
      </div>
    </div>
  )
}
