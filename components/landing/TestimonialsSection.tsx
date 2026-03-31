'use client'

import { useReveal } from '@/hooks/useReveal'

const TESTIMONIALS = [
  { name: 'Sophie M.', role: 'Growth Marketer', company: 'SaaS B2B', avatar: 'SM', color: '#60a5fa', text: 'Evolify a complètement changé ma façon de travailler. Je trouve des prompts parfaits pour mes campagnes en 2 minutes au lieu de 2 heures.', stars: 5 },
  { name: 'Thomas K.', role: 'Développeur Full-Stack', company: 'Startup IA', avatar: 'TK', color: '#4ade80', text: 'Les workflows n8n prêts à importer m\'ont économisé des semaines de travail. La qualité est exceptionnelle.', stars: 5 },
  { name: 'Camille D.', role: 'Directrice Marketing', company: 'E-commerce', avatar: 'CD', color: '#f87171', text: 'Je recommande Evolify à toute mon équipe. C\'est devenu notre référence pour tout ce qui concerne l\'IA.', stars: 5 },
  { name: 'Lucas B.', role: 'Freelance Designer', company: 'Indépendant', avatar: 'LB', color: '#a855f7', text: 'Les prompts Midjourney sont incroyables. Les paramètres sont déjà optimisés, mes clients sont impressionnés.', stars: 5 },
  { name: 'Marie-Claire F.', role: 'CEO', company: 'Agence digitale', avatar: 'MC', color: '#facc15', text: 'Investissement rentabilisé en 1 semaine. L\'équipe utilise Evolify quotidiennement pour automatiser nos processus.', stars: 5 },
  { name: 'Antoine R.', role: 'Product Manager', company: 'Scale-up', avatar: 'AR', color: '#00d4ff', text: 'La qualité de curation est top. Chaque outil, prompt et workflow est vraiment utile. Pas de déchets.', stars: 5 },
  { name: 'Julia V.', role: 'Consultante RH', company: 'Cabinet conseil', avatar: 'JV', color: '#f97316', text: 'Les agents IA spécialisés RH ont transformé mon quotidien. Je génère des offres d\'emploi et CV en secondes.', stars: 5 },
  { name: 'Pierre L.', role: 'Ops Manager', company: 'Logistique', avatar: 'PL', color: '#00ff87', text: 'Les automatisations Make ont éliminé 80% de mes tâches répétitives. ROI immédiat et mesurable.', stars: 5 },
]

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-72 rounded-2xl p-5 mx-2.5"
      style={{ background: 'rgba(13,20,36,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center gap-1 mb-3">
        {[...Array(t.stars)].map((_, i) => (
          <span key={i} style={{ color: '#facc15', fontSize: 12 }}>★</span>
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--c-text-2)' }}>"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ background: `${t.color}20`, color: t.color }}>{t.avatar}</div>
        <div>
          <div className="text-sm font-bold text-white">{t.name}</div>
          <div className="text-[10px]" style={{ color: 'var(--c-text-3)' }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  useReveal()

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-10 text-center reveal">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4"
          style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.2)', color: '#facc15' }}>
          ★ Avis clients
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Ils utilisent Evolify au quotidien</h2>
        <p style={{ color: 'var(--c-text-2)' }}>Des professionnels de tous secteurs qui ont adopté l'IA grâce à Evolify</p>
      </div>

      {/* Row 1 — forward */}
      <div className="relative mb-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
        <div className="flex" style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div className="relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
        <div className="flex" style={{ animation: 'marquee-reverse 45s linear infinite', width: 'max-content' }}>
          {[...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()].map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  )
}
