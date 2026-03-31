import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Evolify — La plateforme tout-en-un pour exploiter l\'IA',
    template: '%s | Evolify',
  },
  description: 'Trouvez les meilleurs outils IA, prompts, workflows et skills. Tout ce qu\'il faut pour exploiter l\'IA plus vite et à son plein potentiel.',
  keywords: ['intelligence artificielle', 'outils IA', 'prompts', 'workflows', 'automatisation', 'ChatGPT', 'Claude'],
  authors: [{ name: 'Evolify' }],
  creator: 'Evolify',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://evolify.fr',
    siteName: 'Evolify',
    title: 'Evolify — La plateforme tout-en-un pour exploiter l\'IA',
    description: 'Trouvez les meilleurs outils IA, prompts, workflows et skills.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evolify — La plateforme tout-en-un pour exploiter l\'IA',
    description: 'Trouvez les meilleurs outils IA, prompts, workflows et skills.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" style={{ background: 'var(--c-bg)', color: 'var(--c-text-1)' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
