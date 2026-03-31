'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

const FEATURES = [
  '4 000+ Outils IA référencés', '1 000+ Prompts LLM experts', '8 000+ Workflows prêts à importer',
  '8 000+ Prompts visuels', '500+ Skills & MCPs', 'Dashboard personnel', 'Mises à jour hebdomadaires', 'Support prioritaire',
]

export default function CtaSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none -translate-y-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
            ✦ Full Access — Tout inclus
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Maîtrisez l'IA{' '}
            <span className="gradient-text">dès aujourd'hui</span>
          </h2>

          <p className="text-lg mb-8" style={{ color: 'var(--c-text-2)' }}>
            Un accès complet à toute la plateforme pour <strong className="text-white">15€/mois</strong>.
            Annulable à tout moment. Satisfait ou remboursé 14 jours.
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-10 text-left max-w-lg mx-auto">
            {FEATURES.map(f => (
              <div key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--c-text-2)' }}>
                <Check size={14} style={{ color: '#00d4ff', flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>

          {/* Price display */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-black text-white">15€</div>
              <div className="text-xs" style={{ color: 'var(--c-text-3)' }}>par mois</div>
            </div>
            <div className="text-2xl" style={{ color: 'var(--c-text-4)' }}>ou</div>
            <div className="text-center">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black" style={{ color: '#00d4ff' }}>12€</span>
                <span className="text-sm font-bold" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', borderRadius: 6, padding: '2px 6px' }}>-20%</span>
              </div>
              <div className="text-xs" style={{ color: 'var(--c-text-3)' }}>par mois (annuel)</div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/inscription"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}>
              Commencer maintenant
              <ArrowRight size={18} />
            </Link>
            <Link href="/pricing"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-white/[0.08]"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'var(--c-text-1)' }}>
              Voir les tarifs
            </Link>
          </div>

          <p className="text-xs mt-5" style={{ color: 'var(--c-text-4)' }}>
            Satisfait ou remboursé pendant 14 jours · Annulable à tout moment · Paiement sécurisé Stripe
          </p>

          {/* Free note */}
          <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>
              Toujours gratuit : <Link href="/outils-ia" className="hover:text-white transition-colors" style={{ color: '#a855f7' }}>Outils IA</Link>
              {' '}et <Link href="/ressources" className="hover:text-white transition-colors" style={{ color: '#00ff87' }}>Ressources de formation</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
