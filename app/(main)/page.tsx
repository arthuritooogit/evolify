import HeroSection from '@/components/landing/HeroSection'
import LogosBanner from '@/components/landing/LogosBanner'
import ProblemSection from '@/components/landing/ProblemSection'
import ModulesSection from '@/components/landing/ModulesSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import CtaSection from '@/components/landing/CtaSection'

export const metadata = {
  title: 'Evolify — La plateforme IA tout-en-un',
  description: '4 000+ outils IA, 8 000+ workflows, 1 000+ prompts et 500+ skills. Trouvez, filtrez et exploitez les meilleurs outils IA en moins de 30 secondes.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogosBanner />
      <ProblemSection />
      <ModulesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
