'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'
import type { ModuleKey } from '@/types'

interface Props {
  module: ModuleKey
  label?: string
  children: React.ReactNode
}

export default function LockOverlay({ module, label = 'Accéder au module', children }: Props) {
  return (
    <div className="relative">
      <div className="lock-blur select-none">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl gap-3"
        style={{ background: 'rgba(5,9,20,0.65)', backdropFilter: 'blur(2px)' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Lock size={16} style={{ color: 'var(--c-text-2)' }} />
        </div>
        <Link href={`/pricing?module=${module}`}
          className="text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}>
          {label}
        </Link>
      </div>
    </div>
  )
}
