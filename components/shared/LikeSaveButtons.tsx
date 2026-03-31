'use client'

import { useState } from 'react'
import { Heart, Bookmark } from 'lucide-react'
import { useLikeSave } from '@/context/LikeSaveContext'
import { useAuth } from '@/context/AuthContext'
import { useToast } from './Toast'
import { cn } from '@/lib/utils'

interface Props {
  item: { id: string; type: string; featured?: boolean; score_global?: number }
  showCount?: boolean
}

export default function LikeSaveButtons({ item, showCount = true }: Props) {
  const { toggleLike, toggleSave, isLiked, isSaved, getLikeCount } = useLikeSave()
  const { user } = useAuth()
  const { toast } = useToast()
  const [likeAnim, setLikeAnim] = useState(false)
  const [saveAnim, setSaveAnim] = useState(false)

  const liked = isLiked(item)
  const saved = isSaved(item)
  const count = getLikeCount(item)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) { toast('Connectez-vous pour liker', 'info'); return }
    toggleLike(item)
    setLikeAnim(true)
    setTimeout(() => setLikeAnim(false), 400)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) { toast('Connectez-vous pour sauvegarder', 'info'); return }
    toggleSave(item)
    setSaveAnim(true)
    setTimeout(() => setSaveAnim(false), 400)
    toast(saved ? 'Retiré des sauvegardes' : 'Sauvegardé !', saved ? 'info' : 'success')
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleLike}
        className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all duration-200',
          liked ? 'text-[#f87171]' : 'text-[var(--c-text-3)] hover:text-[#f87171]',
          likeAnim && 'scale-125'
        )}
        style={{ background: liked ? 'rgba(248,113,113,0.1)' : 'transparent' }}
      >
        <Heart size={13} fill={liked ? '#f87171' : 'none'} />
        {showCount && <span>{count}</span>}
      </button>

      <button
        onClick={handleSave}
        className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all duration-200',
          saved ? 'text-[#00d4ff]' : 'text-[var(--c-text-3)] hover:text-[#00d4ff]',
          saveAnim && 'scale-125'
        )}
        style={{ background: saved ? 'rgba(0,212,255,0.1)' : 'transparent' }}
      >
        <Bookmark size={13} fill={saved ? '#00d4ff' : 'none'} />
      </button>
    </div>
  )
}
