'use client'

import { useState } from 'react'
import { Lock, Network, Bot, BarChart2, Cpu } from 'lucide-react'

const BG_AGENTS = [
  { t: 'MKT', c: '#f43f5e', l: '5%',  top: '12%', s: 44, b: 3,   o: 0.08,  a: 'lm-float-a', d: '10s',   dl: '0s'   },
  { t: 'SLS', c: '#f97316', l: '88%', top: '18%', s: 40, b: 4,   o: 0.07,  a: 'lm-float-b', d: '12s',   dl: '1.4s' },
  { t: 'DEV', c: '#06b6d4', l: '14%', top: '62%', s: 43, b: 3,   o: 0.08,  a: 'lm-float-c', d: '9.5s',  dl: '2.3s' },
  { t: 'FIN', c: '#10b981', l: '82%', top: '58%', s: 46, b: 2.5, o: 0.075, a: 'lm-float-a', d: '13s',   dl: '0.8s' },
  { t: 'OPS', c: '#7c3aed', l: '4%',  top: '80%', s: 38, b: 5,   o: 0.065, a: 'lm-float-b', d: '14s',   dl: '3.2s' },
  { t: 'RH',  c: '#a855f7', l: '91%', top: '44%', s: 40, b: 3.5, o: 0.07,  a: 'lm-float-c', d: '8.5s',  dl: '1.8s' },
  { t: 'LGL', c: '#4285f4', l: '72%', top: '8%',  s: 42, b: 2.5, o: 0.08,  a: 'lm-float-a', d: '11s',   dl: '1s'   },
  { t: 'SUP', c: '#00b4d8', l: '54%', top: '4%',  s: 38, b: 4,   o: 0.065, a: 'lm-float-b', d: '13s',   dl: '2.9s' },
  { t: 'PM',  c: '#eab308', l: '37%', top: '87%', s: 42, b: 3,   o: 0.07,  a: 'lm-float-c', d: '11.5s', dl: '4.3s' },
  { t: 'CRE', c: '#ec4899', l: '22%', top: '91%', s: 38, b: 5,   o: 0.055, a: 'lm-float-a', d: '15s',   dl: '1.2s' },
  { t: 'ANA', c: '#60a5fa', l: '62%', top: '76%', s: 40, b: 4,   o: 0.06,  a: 'lm-float-b', d: '10.5s', dl: '5.1s' },
]

const CAPABILITIES = [
  { icon: Network, color: '#f97316', rgb: '249,115,22', title: 'Orchestration agents', desc: 'LIAM analyse votre contexte et délègue les tâches aux agents spécialisés les mieux adaptés.' },
  { icon: Bot, color: '#a855f7', rgb: '168,85,247', title: "Composition d'équipes", desc: "Construisez des équipes d'agents IA sur mesure pour chaque projet ou objectif business." },
  { icon: BarChart2, color: '#10b981', rgb: '16,185,129', title: 'Monitoring en temps réel', desc: 'Visualisez les performances, tâches actives et résultats de chaque agent depuis un tableau de bord unifié.' },
  { icon: Cpu, color: '#06b6d4', rgb: '6,182,212', title: 'Optimisation continue', desc: "LIAM apprend de vos retours et affine sa stratégie de délégation pour maximiser les résultats." },
]

const AGENT_ROLES = [
  { abbr: 'MKT', label: 'Marketing',   color: '#f43f5e', rgb: '244,63,94',   desc: 'Contenu, SEO, growth' },
  { abbr: 'SLS', label: 'Commercial',  color: '#f97316', rgb: '249,115,22',  desc: 'Leads, outreach, CRM' },
  { abbr: 'LGL', label: 'Juridique',   color: '#4285f4', rgb: '66,133,244',  desc: 'Contrats, conformité' },
  { abbr: 'FIN', label: 'Finance',     color: '#10b981', rgb: '16,185,129',  desc: 'Analyse, reporting' },
  { abbr: 'SUP', label: 'Support',     color: '#00b4d8', rgb: '0,180,216',   desc: 'Client, tickets, FAQ' },
  { abbr: 'OPS', label: 'Opérations',  color: '#7c3aed', rgb: '124,58,237',  desc: 'Process, logistique' },
  { abbr: 'RH',  label: 'RH',         color: '#a855f7', rgb: '168,85,247',  desc: 'Recrutement, onboarding' },
]

const PILLS = ['🤖 Agents spécialisés', '⚡ Délégation automatique', '📊 Monitoring unifié', '🔗 Intégrations natives', '🧠 Mémoire longue']

export default function IAManagerPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null)

  return (
    <div style={{ minHeight: '100vh', background: '#030b18' }}>
      <style>{`
        @keyframes lm-float-a { 0%,100%{transform:translate(0,0)} 30%{transform:translate(5px,-13px)} 65%{transform:translate(-4px,-7px)} }
        @keyframes lm-float-b { 0%,100%{transform:translate(0,0)} 35%{transform:translate(-7px,-11px)} 70%{transform:translate(4px,-19px)} }
        @keyframes lm-float-c { 0%,100%{transform:translate(0,0)} 28%{transform:translate(3px,-17px)} 62%{transform:translate(-5px,-8px)} }
        @keyframes lm-orb-breathe { 0%,100%{opacity:0.68} 50%{opacity:1} }
        @keyframes lm-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lm-dot-pulse { 0%{box-shadow:0 0 0 0 rgba(250,160,0,0.55)} 70%{box-shadow:0 0 0 7px rgba(250,160,0,0)} 100%{box-shadow:0 0 0 0 rgba(250,160,0,0)} }
        .lm-amber-dot { width:7px;height:7px;border-radius:50%;background:#f59e0b;box-shadow:0 0 5px rgba(245,158,11,0.7);animation:lm-dot-pulse 2.4s ease-out infinite;flex-shrink:0; }
        .lm-pill { transition:background 0.22s ease,border-color 0.22s ease,transform 0.22s ease; }
        .lm-pill:hover { background:rgba(255,255,255,0.06)!important;border-color:rgba(255,255,255,0.13)!important;transform:translateY(-1px); }
        @media(max-width:640px){ .lm-ambient{display:none!important;} .lm-grid-3{grid-template-columns:1fr 1fr!important;} }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '80px 24px 100px' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: ['radial-gradient(ellipse 65% 45% at 12% 18%, rgba(100,50,5,0.12) 0%, transparent 60%)', 'radial-gradient(ellipse 50% 38% at 90% 22%, rgba(80,40,0,0.08) 0%, transparent 58%)', 'radial-gradient(ellipse 100% 55% at 50% 105%, rgba(120,60,0,0.1) 0%, transparent 52%)'].join(', ') }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(rgba(255,255,255,0.024) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 75% 75% at 50% 40%, rgba(0,0,0,0.6) 0%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 40%, rgba(0,0,0,0.6) 0%, transparent 75%)' }} />

        {/* Ambient agents */}
        <div className="lm-ambient" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
          {BG_AGENTS.map((ag, i) => (
            <div key={i} style={{ position: 'absolute', left: ag.l, top: ag.top, opacity: ag.o, filter: `blur(${ag.b}px)`, animation: `${ag.a} ${ag.d} ease-in-out infinite ${ag.dl}` }}>
              <div style={{ width: ag.s, height: ag.s, borderRadius: Math.round(ag.s * 0.26), background: `${ag.c}16`, border: `1px solid ${ag.c}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: ag.t.length > 2 ? 8 : 10, fontWeight: 700, color: ag.c }}>{ag.t}</div>
            </div>
          ))}
        </div>

        {/* Orb — amber */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: 1200, height: 900, bottom: -340, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 56%, rgba(210,120,0,0.06) 0%, rgba(180,90,0,0.025) 42%, transparent 68%)', filter: 'blur(100px)', animation: 'lm-orb-breathe 9s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 760, height: 560, bottom: -200, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 55%, rgba(240,160,0,0.09) 0%, rgba(210,130,0,0.04) 44%, transparent 68%)', filter: 'blur(52px)', animation: 'lm-orb-breathe 9s ease-in-out infinite 1.2s' }} />
          <div style={{ position: 'absolute', width: 440, height: 330, bottom: -90, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 53%, rgba(255,180,0,0.16) 0%, rgba(230,150,0,0.07) 34%, rgba(200,120,0,0.02) 62%, transparent)', filter: 'blur(24px)', animation: 'lm-orb-breathe 9s ease-in-out infinite 2.1s' }} />
          <div style={{ position: 'absolute', width: 380, height: 22, bottom: 108, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(255,200,80,0.22) 0%, transparent 68%)', filter: 'blur(7px)', animation: 'lm-orb-breathe 9s ease-in-out infinite 3s' }} />
        </div>

        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: ['radial-gradient(ellipse 88% 72% at 50% 42%, transparent 26%, rgba(3,11,24,0.84) 80%)', 'linear-gradient(to top, rgba(3,11,24,0.65) 0%, transparent 32%)'].join(', ') }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 4, maxWidth: 720, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}>

          {/* Badge */}
          <div style={{ animation: 'lm-fade-up 0.55s cubic-bezier(0.16,1,0.3,1) both', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px 5px 10px', borderRadius: 100, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)', color: 'rgba(250,180,60,0.88)', fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>
            <span className="lm-amber-dot" />
            Manager d&apos;agents IA
          </div>

          {/* LIAM Avatar */}
          <div style={{ animation: 'lm-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.06s both', position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)', filter: 'blur(14px)' }} />
            <div style={{ position: 'absolute', width: 92, height: 92, borderRadius: '50%', border: '1px solid rgba(245,158,11,0.22)', boxShadow: '0 0 24px rgba(245,158,11,0.10)' }} />
            <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(234,115,0,0.10) 100%)', border: '1px solid rgba(245,158,11,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 900, color: 'rgba(250,180,60,0.90)', backdropFilter: 'blur(8px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.4)' }}>
              L
            </div>
          </div>

          {/* H1 */}
          <h1 style={{ animation: 'lm-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.10s both', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.038em', margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 500, color: 'rgba(250,180,60,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 8 }}>LIAM</span>
            <span style={{ display: 'block', fontSize: 'clamp(36px, 6vw, 68px)', color: 'rgba(235,245,255,0.93)' }}>Pilotez vos</span>
            <span style={{ display: 'block', fontSize: 'clamp(38px, 6.5vw, 72px)', background: 'linear-gradient(130deg, #f59e0b 0%, #fb923c 50%, rgba(250,160,40,0.85) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 28px rgba(245,158,11,0.22))' }}>
              agents IA.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{ animation: 'lm-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.18s both', fontSize: 'clamp(15px, 2.2vw, 18px)', fontWeight: 400, lineHeight: 1.7, color: 'rgba(155,192,230,0.62)', maxWidth: 520, margin: 0 }}>
            Un seul manager. Toute une équipe d&apos;agents spécialisés. LIAM orchestre, délègue et monitore pour vous.
          </p>

          {/* Locked CTAs */}
          <div style={{ animation: 'lm-fade-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.28s both', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' as const, justifyContent: 'center', marginTop: 4 }}>
            <button disabled style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '12px 28px', borderRadius: 14, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.16)', color: 'rgba(250,180,60,0.45)', fontSize: 14, fontWeight: 600, cursor: 'not-allowed' }}>
              <Lock size={13} /> Accéder à LIAM
            </button>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100, background: 'rgba(250,204,21,0.065)', border: '1px solid rgba(250,204,21,0.13)', fontSize: 12, fontWeight: 600, color: 'rgba(250,210,80,0.70)' }}>
              <Lock size={11} style={{ color: 'rgba(250,204,21,0.62)' }} /> Bientôt disponible
            </div>
          </div>

          {/* Pills */}
          <div style={{ animation: 'lm-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.40s both', display: 'flex', flexWrap: 'wrap' as const, gap: 8, justifyContent: 'center', marginTop: 2 }}>
            {PILLS.map(pill => (
              <span key={pill} className="lm-pill" style={{ padding: '6px 13px', borderRadius: 100, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.068)', fontSize: 12, fontWeight: 500, color: 'rgba(148,185,225,0.50)' }}>{pill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(245,158,11,0.55)', marginBottom: 10 }}>Ce que LIAM fait pour vous</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', color: 'rgba(225,238,255,0.90)', margin: 0, lineHeight: 1.15 }}>Un manager. Des résultats.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon
            const isHovered = hoveredCard === i
            return (
              <div key={i} onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)} style={{
                padding: '28px 24px', borderRadius: 18,
                background: isHovered ? `linear-gradient(145deg, rgba(${cap.rgb},0.07) 0%, rgba(3,11,24,0.92) 100%)` : 'linear-gradient(145deg, rgba(255,255,255,0.026) 0%, rgba(3,11,24,0.72) 100%)',
                border: `1px solid ${isHovered ? `rgba(${cap.rgb},0.22)` : 'rgba(255,255,255,0.058)'}`,
                backdropFilter: 'blur(20px)', transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)',
                transform: isHovered ? 'translateY(-3px)' : 'none',
                boxShadow: isHovered ? `0 20px 48px rgba(${cap.rgb},0.08)` : 'none', cursor: 'default',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${cap.rgb},0.10)`, border: `1px solid rgba(${cap.rgb},0.18)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, transition: 'all 0.28s ease', boxShadow: isHovered ? `0 0 20px rgba(${cap.rgb},0.12)` : 'none' }}>
                  <Icon size={20} color={cap.color} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(215,230,250,0.88)', marginBottom: 10, letterSpacing: '-0.015em' }}>{cap.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'rgba(100,130,165,0.72)', margin: 0 }}>{cap.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* AGENT ROLES */}
      <section style={{ padding: '0 24px 100px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(245,158,11,0.55)', marginBottom: 10 }}>Agents disponibles</p>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'rgba(215,230,250,0.88)', margin: 0 }}>Une équipe complète à votre service</h2>
        </div>
        <div className="lm-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {AGENT_ROLES.map((ag, i) => {
            const isHovered = hoveredAgent === i
            return (
              <div key={i} onMouseEnter={() => setHoveredAgent(i)} onMouseLeave={() => setHoveredAgent(null)} style={{
                padding: '20px 18px', borderRadius: 14,
                background: isHovered ? `rgba(${ag.rgb},0.06)` : 'rgba(255,255,255,0.022)',
                border: `1px solid ${isHovered ? `rgba(${ag.rgb},0.22)` : 'rgba(255,255,255,0.06)'}`,
                transition: 'all 0.22s ease', cursor: 'default',
                transform: isHovered ? 'translateY(-2px)' : 'none',
                boxShadow: isHovered ? `0 8px 24px rgba(${ag.rgb},0.10)` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${ag.rgb},0.12)`, border: `1px solid rgba(${ag.rgb},0.22)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: ag.color, flexShrink: 0 }}>{ag.abbr}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(215,230,250,0.85)', letterSpacing: '-0.01em' }}>{ag.label}</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(100,130,165,0.55)' }}>{ag.desc}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
