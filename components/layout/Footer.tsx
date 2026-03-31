import Link from 'next/link'

const LINKS = [
  { label: 'Accueil',       href: '/' },
  { label: 'Tarifs',        href: '/pricing' },
  { label: 'Outils IA',    href: '/outils-ia' },
  { label: 'Ressources',    href: '/ressources' },
  { label: 'IA Consultant', href: '/ia-consultant' },
  { label: 'IA Manager',    href: '/ia-manager' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 py-10 px-6 mt-8" style={{ borderTop: '1px solid var(--c-footer-border)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}>E</div>
          <span className="font-bold text-sm text-white">Evolify</span>
          <span className="text-xs ml-2" style={{ color: 'var(--c-text-3)' }}>Beta</span>
        </div>

        <nav className="flex items-center flex-wrap justify-center gap-x-5 gap-y-2">
          {LINKS.map(({ label, href }) => (
            <Link key={href} href={href}
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: 'var(--c-text-3)' }}>
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs" style={{ color: 'var(--c-text-4)' }}>
          © {new Date().getFullYear()} Evolify. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
