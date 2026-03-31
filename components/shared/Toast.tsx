'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} })

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }, [])

  const ICONS = { success: CheckCircle, error: XCircle, info: Info }
  const COLORS = { success: '#00ff87', error: '#f87171', info: '#00d4ff' }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => {
          const Icon = ICONS[t.type]
          return (
            <div key={t.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border pointer-events-auto"
              style={{
                background: 'rgba(13,20,36,0.97)',
                borderColor: `${COLORS[t.type]}30`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${COLORS[t.type]}20`,
                animation: 'heroIn 0.3s ease both',
                minWidth: 260,
              }}>
              <Icon size={16} style={{ color: COLORS[t.type], flexShrink: 0 }} />
              <span className="text-sm flex-1" style={{ color: 'var(--c-text-1)' }}>{t.message}</span>
              <button onClick={() => setToasts(p => p.filter(i => i.id !== t.id))}
                className="text-[var(--c-text-3)] hover:text-white transition-colors">
                <X size={13} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
