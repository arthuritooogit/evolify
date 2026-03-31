'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, type ModuleKey } from '@/context/AuthContext'

export function useRequireAccess(module: ModuleKey | null) {
  const { user, hasAccess } = useAuth()
  const router = useRouter()

  const canAccess = hasAccess(module)

  const guard = useCallback((callback: () => void) => {
    if (!user) {
      router.push('/connexion')
      return
    }
    if (module && !hasAccess(module)) {
      router.push(`/pricing?module=${module}`)
      return
    }
    callback()
  }, [user, module, hasAccess, router])

  return { guard, hasAccess: canAccess, isAuth: !!user }
}
