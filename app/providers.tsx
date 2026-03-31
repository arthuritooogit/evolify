'use client'

import { AppProvider } from '@/context/AppContext'
import { AuthProvider } from '@/context/AuthContext'
import { LikeSaveProvider } from '@/context/LikeSaveContext'
import { ToastProvider } from '@/components/shared/Toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>
        <LikeSaveProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </LikeSaveProvider>
      </AuthProvider>
    </AppProvider>
  )
}
