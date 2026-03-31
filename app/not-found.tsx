import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--c-bg)' }}>
      <div className="text-center">
        {/* Glowing 404 */}
        <div className="relative inline-block mb-8">
          <div className="text-[120px] sm:text-[160px] font-black leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ff87)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.3))',
            }}>
            404
          </div>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }} />
        </div>

        <h1 className="text-2xl font-black text-white mb-3">Page introuvable</h1>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--c-text-2)' }}>
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer à explorer l'IA.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}>
            <Home size={14} />
            Retour à l'accueil
          </Link>
          <Link href="/outils-ia"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all hover:bg-white/[0.06]"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--c-text-1)' }}>
            Explorer les outils
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
