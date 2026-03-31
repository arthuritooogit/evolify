import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  color?: string
  className?: string
}

export default function Badge({ children, color = '#00d4ff', className }: Props) {
  return (
    <span
      className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide', className)}
      style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}
    >
      {children}
    </span>
  )
}
