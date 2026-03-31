'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Check,
  Sparkles,
  ArrowRight,
  Zap,
  X,
  ChevronDown,
  Building2,
  Bot,
  Workflow,
  Code2,
  GraduationCap,
} from 'lucide-react'

// ─── FEATURES LIST ───────────────────────────────────────────────────────────
const FEATURES = [
  '4 000+ Outils IA',
  '1 000+ Prompts LLM',
  '8 000+ Prompts Visuels',
  '8 000+ Automatisations',
  '500+ Skills & Plugins',
  'Toutes les ressources de formation',
  'Dashboard personnel',
  'IA Consultant (bientôt)',
  'IA Manager (bientôt)',
  'Likes & sauvegardes illimités',
  'Mises à jour hebdomadaires',
  'Support prioritaire',
]

// ─── ENTERPRISE SERVICES ─────────────────────────────────────────────────────
const ENTERPRISE_SERVICES = [
  {
    icon: Bot,
    label: 'Agents IA sur-mesure',
    desc: "Conception et déploiement d'agents IA adaptés à vos processus métier.",
    color: '#00d4ff',
  },
  {
    icon: Workflow,
    label: 'Workflows automatisés',
    desc: 'Automatisez vos flux de travail avec n8n, Make ou des solutions custom.',
    color: '#4ade80',
  },
  {
    icon: Code2,
    label: "Scripts d'automatisation",
    desc: "Scripts Python, JS ou no-code pour connecter vos outils et APIs.",
    color: '#a855f7',
  },
  {
    icon: GraduationCap,
    label: 'Formation & accompagnement',
    desc: 'Workshops, formation équipe et accompagnement stratégique IA.',
    color: '#facc15',
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'Puis-je annuler à tout moment ?',
    a: "Oui, vous pouvez annuler quand vous voulez sans frais. Votre accès reste actif jusqu'à la fin de la période payée.",
  },
  {
    q: "Y a-t-il une période d'essai ?",
    a: 'Oui, satisfait ou remboursé pendant 14 jours. Aucune question posée.',
  },
  {
    q: 'Quelles méthodes de paiement acceptez-vous ?',
    a: 'Carte bancaire via Stripe (Visa, Mastercard, Amex). Paiement 100% sécurisé.',
  },
  {
    q: 'Les données sont-elles mises à jour ?',
    a: 'Oui, nouvelles ressources ajoutées chaque semaine : outils, prompts, workflows et plugins.',
  },
  {
    q: 'Puis-je partager mon accès ?',
    a: "Non, les comptes sont individuels. Pour les équipes, contactez-nous pour une offre sur-mesure.",
  },
]

// ─── FAQ ITEM (accordion) ────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'rgba(13,20,36,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <ChevronDown
          size={16}
          style={{
            color: 'var(--c-text-3)',
            flexShrink: 0,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

// ─── QUOTE MODAL ─────────────────────────────────────────────────────────────
function QuoteModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    sector: '',
    needs: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    color: 'var(--c-text-1)',
  } as React.CSSProperties

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 overflow-y-auto"
        style={{
          background: 'rgba(13,20,36,0.98)',
          border: '1px solid rgba(255,255,255,0.1)',
          maxHeight: '90vh',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ color: 'var(--c-text-3)' }}
        >
          <X size={16} />
        </button>

        {submitted ? (
          /* ── Thank you state ── */
          <div className="text-center py-10 space-y-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
              style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}
            >
              <Check size={28} style={{ color: '#00d4ff' }} />
            </div>
            <h3 className="text-xl font-black text-white">Demande envoyée !</h3>
            <p className="text-sm max-w-xs mx-auto" style={{ color: 'var(--c-text-2)' }}>
              Merci pour votre intérêt. Notre équipe vous recontacte sous 24h ouvrées.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}
            >
              Fermer
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <div className="mb-6">
              <h3 className="text-xl font-black text-white mb-1">Obtenir un devis</h3>
              <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>
                Décrivez votre projet, on revient vers vous sous 24h.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                    Prénom *
                  </label>
                  <input
                    required
                    value={form.firstName}
                    onChange={set('firstName')}
                    placeholder="Jean"
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                    Nom *
                  </label>
                  <input
                    required
                    value={form.lastName}
                    onChange={set('lastName')}
                    placeholder="Dupont"
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                  Email *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="jean@entreprise.com"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="+33 6 00 00 00 00"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={inputStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                    Entreprise *
                  </label>
                  <input
                    required
                    value={form.company}
                    onChange={set('company')}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                    Secteur
                  </label>
                  <select
                    value={form.sector}
                    onChange={set('sector')}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: 'rgba(13,20,36,0.95)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      color: form.sector ? 'var(--c-text-1)' : 'var(--c-text-3)',
                    }}
                  >
                    <option value="">Choisir...</option>
                    <option value="tech">Tech / SaaS</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="marketing">Marketing / Agence</option>
                    <option value="finance">Finance / Banque</option>
                    <option value="sante">Santé</option>
                    <option value="education">Éducation</option>
                    <option value="industrie">Industrie</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                  Vos besoins *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.needs}
                  onChange={set('needs')}
                  placeholder="Décrivez votre projet, vos objectifs, le nombre d'utilisateurs..."
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}
              >
                Envoyer ma demande
                <ArrowRight size={14} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)

  const price = annual ? 12 : 15

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-24">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="text-center space-y-5">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.2)',
            color: '#00d4ff',
          }}
        >
          <Sparkles size={11} />
          Simple et transparent
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
          Tarifs simples et transparents
        </h1>

        <p className="text-lg max-w-md mx-auto" style={{ color: 'var(--c-text-2)' }}>
          Un accès complet à toutes les ressources IA. Pas de surprise.
        </p>

        {/* Billing toggle */}
        <div
          className="inline-flex items-center gap-1 p-1 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <button
            onClick={() => setAnnual(false)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: !annual ? 'rgba(255,255,255,0.09)' : 'transparent',
              color: !annual ? 'var(--c-text-1)' : 'var(--c-text-3)',
            }}
          >
            Mensuel
          </button>
          <button
            onClick={() => setAnnual(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: annual ? 'rgba(0,212,255,0.1)' : 'transparent',
              color: annual ? '#00d4ff' : 'var(--c-text-3)',
            }}
          >
            Annuel
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-black"
              style={{ background: 'rgba(0,255,135,0.15)', color: '#00ff87' }}
            >
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* ── MAIN PLAN CARD ─────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-5">
        {/* Glow backdrop */}
        <div
          className="pointer-events-none absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div
          className="relative w-full max-w-md rounded-2xl p-8"
          style={{
            background: 'rgba(13,20,36,0.9)',
            border: '1px solid rgba(0,212,255,0.4)',
            boxShadow:
              '0 0 0 1px rgba(0,212,255,0.1), 0 0 60px rgba(0,212,255,0.12), 0 32px 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Badge */}
          <div
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-black whitespace-nowrap"
            style={{ background: '#00d4ff', color: '#030712' }}
          >
            <Zap size={11} />
            Tout inclus
          </div>

          {/* Plan name & price */}
          <div className="text-center mb-7">
            <div className="text-base font-black mb-3 tracking-wide" style={{ color: '#00d4ff' }}>
              Full Access
            </div>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-6xl font-black text-white">{price}€</span>
              <span className="text-base" style={{ color: 'var(--c-text-3)' }}>
                /mois
              </span>
            </div>
            {annual ? (
              <p className="text-sm mt-2" style={{ color: 'var(--c-text-3)' }}>
                Facturé{' '}
                <span className="font-semibold" style={{ color: '#00ff87' }}>
                  144€/an
                </span>{' '}
                · Économisez 36€
              </p>
            ) : (
              <p className="text-xs mt-2" style={{ color: 'var(--c-text-3)' }}>
                ou{' '}
                <button
                  onClick={() => setAnnual(true)}
                  className="transition-colors hover:underline"
                  style={{ color: '#00d4ff' }}
                >
                  12€/mois en annuel
                </button>
              </p>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {FEATURES.map(f => (
              <li key={f} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(0,212,255,0.12)',
                    border: '1px solid rgba(0,212,255,0.3)',
                  }}
                >
                  <Check size={11} style={{ color: '#00d4ff' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--c-text-2)' }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/inscription"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-black transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ff87)',
              color: '#030712',
            }}
          >
            Commencer maintenant →
          </Link>

          <p className="text-center text-xs mt-3" style={{ color: 'var(--c-text-3)' }}>
            Satisfait ou remboursé 14 jours
          </p>
        </div>

        {/* Free tier note */}
        <p className="text-sm text-center" style={{ color: 'var(--c-text-3)' }}>
          Toujours gratuit :{' '}
          <span style={{ color: 'var(--c-text-2)' }}>
            Outils IA + Ressources de formation
          </span>
        </p>
      </div>

      {/* ── ENTERPRISE SECTION ─────────────────────────────────── */}
      <div className="space-y-8">
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.2)',
              color: '#f97316',
            }}
          >
            <Building2 size={11} />
            Entreprise
          </div>
          <h2 className="text-3xl font-black text-white mb-2">
            Pour les équipes et entreprises
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--c-text-2)' }}>
            Solutions sur-mesure pour booster la productivité IA de vos équipes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ENTERPRISE_SERVICES.map(svc => {
            const Icon = svc.icon
            return (
              <div
                key={svc.label}
                className="rounded-2xl p-5 space-y-3 transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: 'rgba(13,20,36,0.7)',
                  border: `1px solid ${svc.color}1a`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${svc.color}14`,
                    border: `1px solid ${svc.color}28`,
                  }}
                >
                  <Icon size={18} style={{ color: svc.color }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{svc.label}</div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--c-text-3)' }}>
                    {svc.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => setQuoteOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.3)',
              color: '#f97316',
            }}
          >
            Obtenir un devis
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── FAQ SECTION ────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white mb-2">Questions fréquentes</h2>
          <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>
            Tout ce que vous voulez savoir sur Full Access.
          </p>
        </div>
        <div className="space-y-2">
          {FAQ_ITEMS.map(item => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>

      {/* Quote modal */}
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
    </div>
  )
}
