'use client'

import Link from 'next/link'
import { ArrowRight, Bot, Zap, Network, Lock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const AGENTS = [
  { name: 'Content Agent', desc: 'Génère et publie du contenu sur tous vos canaux', color: '#a855f7', emoji: '✍️', status: 'soon' },
  { name: 'Research Agent', desc: 'Surveille votre marché et compile les insights', color: '#60a5fa', emoji: '🔍', status: 'soon' },
  { name: 'Code Agent', desc: 'Automatise vos tâches de développement répétitives', color: '#4ade80', emoji: '💻', status: 'soon' },
  { name: 'Sales Agent', desc: 'Enrichit vos leads et rédige les emails de prospection', color: '#f97316', emoji: '📈', status: 'soon' },
  { name: 'Data Agent', desc: 'Analyse vos données et génère des rapports automatiques', color: '#facc15', emoji: '📊', status: 'soon' },
  { name: 'Social Agent', desc: 'Planifie et publie sur tous vos réseaux sociaux', color: '#f87171', emoji: '📱', status: 'soon' },
]

export default function IAManagerPage() {
  const { user } = useAuth()
  const hasAccess = user?.plan === 'full' || user?.role === 'admin'

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', color: '#f97316' }}>
          <Bot size={11} />
          Bientôt disponible — Full Access
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          IA Manager<br />
          <span style={{ background: 'linear-gradient(135deg, #f97316, #facc15)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Vos agents, orchestrés
          </span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--c-text-2)' }}>
          Déployez des agents IA spécialisés qui travaillent en parallèle.
          Connectez-les entre eux. Regardez votre business tourner en automatique.
        </p>
      </div>

      {/* How it works */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: Bot, title: 'Choisissez vos agents', desc: '6 agents spécialisés : contenu, recherche, code, sales, data, social.', color: '#f97316' },
          { icon: Network, title: 'Connectez-les', desc: 'Les agents communiquent entre eux et partagent les données en temps réel.', color: '#facc15' },
          { icon: Zap, title: 'Automatisez', desc: 'Vos workflows tournent 24/7 sans intervention. Recevez les rapports.', color: '#00d4ff' },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="rounded-2xl p-6 text-center"
            style={{ background: 'rgba(13,20,36,0.6)', border: `1px solid ${color}15` }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
              <Icon size={22} style={{ color }} />
            </div>
            <h3 className="font-black text-white mb-2">{title}</h3>
            <p className="text-sm" style={{ color: 'var(--c-text-2)' }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Agents grid */}
      <div>
        <h2 className="text-xl font-black text-white mb-6 text-center">Les 6 agents disponibles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENTS.map(agent => (
            <div key={agent.name} className="relative rounded-2xl p-5 flex flex-col gap-3"
              style={{ background: 'rgba(13,20,36,0.6)', border: `1px solid ${agent.color}15` }}>
              <div className="absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--c-text-3)' }}>
                BIENTÔT
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${agent.color}15` }}>
                {agent.emoji}
              </div>
              <div>
                <div className="font-black text-white text-sm">{agent.name}</div>
                <p className="text-xs mt-1" style={{ color: 'var(--c-text-2)' }}>{agent.desc}</p>
              </div>
              <div className="h-1 rounded-full" style={{ background: `${agent.color}15` }}>
                <div className="h-full rounded-full" style={{ width: '0%', background: agent.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center rounded-2xl p-10"
        style={{ background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.15)' }}>
        {hasAccess ? (
          <>
            <div className="text-2xl font-black text-white mb-2">Vous êtes sur la liste d'attente !</div>
            <p className="text-sm mb-6" style={{ color: 'var(--c-text-2)' }}>
              IA Manager sera disponible pour les utilisateurs Full Access en priorité.
              Vous serez notifié dès l'ouverture.
            </p>
          </>
        ) : (
          <>
            <div className="text-2xl font-black text-white mb-2">Réservez votre accès</div>
            <p className="text-sm mb-6" style={{ color: 'var(--c-text-2)' }}>
              IA Manager sera disponible en priorité pour les abonnés Full Access.
              Passez au Full maintenant pour être parmi les premiers.
            </p>
            <Link href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #f97316, #facc15)', color: '#030712' }}>
              Passer au Full Access
              <ArrowRight size={14} />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
