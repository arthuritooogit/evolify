interface RecItem {
  name: string
  initials: string
  color: string
  desc: string
  url: string
  badge?: string
}

interface Props {
  items: RecItem[]
  title?: string
}

export default function RecommendationScroller({ items, title }: Props) {
  const doubled = [...items, ...items]

  return (
    <div className="py-6 overflow-hidden">
      {title && (
        <p className="text-center text-xs font-medium mb-4 uppercase tracking-widest" style={{ color: 'var(--c-text-3)' }}>
          {title}
        </p>
      )}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--c-bg), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--c-bg), transparent)' }} />

        <div className="marquee-track gap-3">
          {doubled.map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl flex-shrink-0 transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                style={{ background: `${item.color}20`, color: item.color }}>
                {item.initials.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white/80">{item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold"
                      style={{ background: `${item.color}20`, color: item.color }}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px]" style={{ color: 'var(--c-text-3)' }}>{item.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
