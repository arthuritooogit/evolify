import { Star } from 'lucide-react'
import { scoreColor, formatScore } from '@/lib/utils'

interface Props {
  score: number
  size?: 'sm' | 'md'
}

export default function ScoreBadge({ score, size = 'sm' }: Props) {
  const color = scoreColor(score)
  return (
    <span className="score-badge" style={{
      background: `${color}15`,
      border: `1px solid ${color}30`,
      color,
      fontSize: size === 'md' ? 12 : 10,
      padding: size === 'md' ? '3px 8px' : '2px 6px',
    }}>
      <Star size={size === 'md' ? 11 : 9} fill={color} />
      {formatScore(score)}
    </span>
  )
}
