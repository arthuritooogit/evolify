'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface LikeItem { id: string; type: string }

interface LikeSaveContextType {
  likes: LikeItem[]
  saves: LikeItem[]
  toggleLike: (item: LikeItem) => void
  toggleSave: (item: LikeItem) => void
  isLiked: (item: LikeItem) => boolean
  isSaved: (item: LikeItem) => boolean
  getLikeCount: (item: { id: string; featured?: boolean; score_global?: number }) => number
}

const LikeSaveContext = createContext<LikeSaveContextType>({
  likes: [],
  saves: [],
  toggleLike: () => {},
  toggleSave: () => {},
  isLiked: () => false,
  isSaved: () => false,
  getLikeCount: () => 0,
})

const key = (item: LikeItem) => `${item.type}:${item.id}`

export function LikeSaveProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [likes, setLikes] = useState<LikeItem[]>([])
  const [saves, setSaves] = useState<LikeItem[]>([])

  useEffect(() => {
    try {
      const l = localStorage.getItem('evolify-likes')
      const s = localStorage.getItem('evolify-saves')
      if (l) setLikes(JSON.parse(l))
      if (s) setSaves(JSON.parse(s))
    } catch {}
  }, [])

  const toggleLike = useCallback((item: LikeItem) => {
    if (!user) return
    setLikes(prev => {
      const next = prev.some(i => key(i) === key(item))
        ? prev.filter(i => key(i) !== key(item))
        : [...prev, item]
      localStorage.setItem('evolify-likes', JSON.stringify(next))
      return next
    })
  }, [user])

  const toggleSave = useCallback((item: LikeItem) => {
    if (!user) return
    setSaves(prev => {
      const next = prev.some(i => key(i) === key(item))
        ? prev.filter(i => key(i) !== key(item))
        : [...prev, item]
      localStorage.setItem('evolify-saves', JSON.stringify(next))
      return next
    })
  }, [user])

  const isLiked = useCallback((item: LikeItem) =>
    likes.some(i => key(i) === key(item)), [likes])

  const isSaved = useCallback((item: LikeItem) =>
    saves.some(i => key(i) === key(item)), [saves])

  // Score déterministe + boost si liké
  const getLikeCount = useCallback((item: { id: string; featured?: boolean; score_global?: number }) => {
    const idNum = parseInt(item.id.replace(/\D/g, '').slice(-4) || '0', 10)
    const base = (item.featured ? 80 : 30) + ((item.score_global ?? 5) * 10 * 3) + (idNum % 23)
    const boost = isLiked({ id: item.id, type: '' }) ? 1 : 0
    return Math.max(0, base + boost)
  }, [isLiked])

  return (
    <LikeSaveContext.Provider value={{ likes, saves, toggleLike, toggleSave, isLiked, isSaved, getLikeCount }}>
      {children}
    </LikeSaveContext.Provider>
  )
}

export const useLikeSave = () => useContext(LikeSaveContext)
