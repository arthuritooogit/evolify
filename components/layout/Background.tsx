'use client'

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Orbe principale cyan */}
      <div style={{
        position: 'absolute', top: '-15%', left: '50%',
        transform: 'translateX(-50%)',
        width: 900, height: 500,
        background: 'radial-gradient(ellipse, rgba(0,212,255,0.055) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      {/* Orbe violet gauche */}
      <div style={{
        position: 'absolute', top: '20%', left: '-10%',
        width: 600, height: 600,
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      {/* Orbe vert droite */}
      <div style={{
        position: 'absolute', bottom: '10%', right: '-8%',
        width: 500, height: 500,
        background: 'radial-gradient(ellipse, rgba(0,255,135,0.035) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      {/* Grille subtile */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 100%)',
      }} />
    </div>
  )
}
