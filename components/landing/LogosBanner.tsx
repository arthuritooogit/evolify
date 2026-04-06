'use client'

// Scrolling logos banner — uses the 'marquee' keyframe defined in globals.css

const BRAND_COLORS = {
  'Product Hunt': '#da552f',
  'Emergent':     '#6366f1',
  'Lovable':      '#f43f5e',
  'Cursor':       '#00d4ff',
  'Claude':       '#d4a27f',
  'Shopify':      '#95bf47',
  'Midjourney':   '#a855f7',
  'Google':       '#4285f4',
  'ChatGPT':      '#00a67e',
  'DeepSeek':     '#4fc3f7',
  'Supabase':     '#3ecf8e',
  'Kling AI':     '#ff6b6b',
  'Meta':         '#0082fb',
  'GitHub':       '#e6edf3',
  'Reddit':       '#ff4500',
  'Hugging Face': '#ffd21e',
  'n8n':          '#ea4b71',
  'Perplexity':   '#20b2aa',
}

const LOGOS_LIST = [
  'Product Hunt', 'Emergent', 'Lovable', 'Cursor', 'Claude', 'Shopify',
  'Midjourney', 'Google', 'ChatGPT', 'DeepSeek', 'Supabase', 'Kling AI',
  'Meta', 'GitHub', 'Reddit', 'Hugging Face', 'n8n', 'Perplexity',
]

// Duplicate for seamless marquee loop
const ITEMS = [...LOGOS_LIST, ...LOGOS_LIST]

export default function LogosBanner() {
  return (
    <section
      style={{
        overflow: 'hidden',
        padding: '22px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.015)',
        position: 'relative',
      }}
    >
      {/* Fade left edge */}
      <div
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 100,
          background: 'linear-gradient(to right, var(--c-bg, #050914), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      {/* Fade right edge */}
      <div
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 100,
          background: 'linear-gradient(to left, var(--c-bg, #050914), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* Scrolling track — uses marquee keyframe from globals.css */}
      <div
        className="marquee-track"
        style={{
          animationDuration: '36s',
          gap: 40,
        }}
      >
        {ITEMS.map((name, i) => {
          const color = BRAND_COLORS[name as keyof typeof BRAND_COLORS] || '#ffffff'
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                opacity: 0.3,
                flexShrink: 0,
                transition: 'opacity 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.75' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.30' }}
            >
              {/* Colored letter avatar */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  background: `${color}22`,
                  border: `1px solid ${color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 900,
                  color: color,
                  flexShrink: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {name[0]}
              </div>
              {/* Brand name */}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.75)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.01em',
                }}
              >
                {name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
