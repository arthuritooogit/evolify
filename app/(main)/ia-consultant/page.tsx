'use client'

import { useState, useEffect } from 'react'
import { Lock, Sparkles, ArrowRight } from 'lucide-react'

const TYPING_PHRASES = [
  'Je veux automatiser mes emails clients.',
  "J'aimerais créer un agent IA pour mon business.",
  'Génère-moi un prompt pour faire du copywriting.',
  'Je dois analyser mes données financières rapidement.',
  "J'aimerais créer des visuels pro sans designer.",
  'Génère-moi un workflow n8n pour scraper des leads.',
  "J'aimerais un agent qui répond à mes emails tout seul.",
  'Génère-moi une stratégie marketing en 10 minutes.',
  "J'aimerais apprendre à utiliser Claude efficacement.",
  'Je veux scaler mon business sans embaucher.',
  'Génère-moi un plan de contenu pour 3 mois.',
  "J'aimerais un agent IA spécialisé dans mon secteur.",
]

function TypingAnimation() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing')

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx % TYPING_PHRASES.length]
    let timer: ReturnType<typeof setTimeout>
    if (phase === 'typing') {
      if (text.length < phrase.length) {
        timer = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 40)
      } else {
        timer = setTimeout(() => setPhase('pause'), 2800)
      }
    } else if (phase === 'pause') {
      timer = setTimeout(() => setPhase('erasing'), 400)
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(s => s.slice(0, -1)), 16)
      } else {
        setPhraseIdx(i => i + 1)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timer)
  }, [text, phase, phraseIdx])

  return (
    <span style={{ color: 'rgba(130,200,255,0.7)', fontStyle: 'italic', fontWeight: 400 }}>
      {text || '\u00A0'}
      <span className="ai-cursor" style={{
        display: 'inline-block', width: 1.5, height: '0.82em',
        background: 'rgba(0,210,255,0.72)', marginLeft: 2, verticalAlign: 'text-bottom',
      }} />
    </span>
  )
}

const BG_LOGOS = [
  { t: 'GPT',  c: '#10b981', l: '6%',  top: '10%', s: 44, b: 3,   o: 0.085, a: 'ai-float-a', d: '9s',    dl: '0s'   },
  { t: 'CL',   c: '#c8956c', l: '87%', top: '16%', s: 40, b: 4,   o: 0.07,  a: 'ai-float-b', d: '11s',   dl: '1.3s' },
  { t: 'MJ',   c: '#7c3aed', l: '12%', top: '63%', s: 43, b: 3,   o: 0.085, a: 'ai-float-c', d: '9.5s',  dl: '2.2s' },
  { t: 'GEM',  c: '#4285f4', l: '83%', top: '60%', s: 46, b: 2.5, o: 0.08,  a: 'ai-float-a', d: '12s',   dl: '0.7s' },
  { t: 'n8n',  c: '#ef6820', l: '3%',  top: '80%', s: 38, b: 5,   o: 0.065, a: 'ai-float-b', d: '13.5s', dl: '3.1s' },
  { t: 'KL',   c: '#f43f5e', l: '92%', top: '42%', s: 40, b: 3.5, o: 0.075, a: 'ai-float-c', d: '8s',    dl: '1.7s' },
  { t: 'RWY',  c: '#06b6d4', l: '73%', top: '7%',  s: 42, b: 2.5, o: 0.085, a: 'ai-float-a', d: '10s',   dl: '0.9s' },
  { t: 'ZAP',  c: '#f97316', l: '55%', top: '5%',  s: 38, b: 4,   o: 0.07,  a: 'ai-float-b', d: '12.5s', dl: '2.8s' },
  { t: 'MK',   c: '#a855f7', l: '39%', top: '85%', s: 42, b: 3,   o: 0.08,  a: 'ai-float-c', d: '11s',   dl: '4.2s' },
  { t: 'VEO',  c: '#60a5fa', l: '23%', top: '90%', s: 38, b: 5,   o: 0.06,  a: 'ai-float-a', d: '14.5s', dl: '1.1s' },
  { t: 'PPX',  c: '#00b4d8', l: '63%', top: '78%', s: 40, b: 4,   o: 0.065, a: 'ai-float-b', d: '10.5s', dl: '5s'   },
]

function AmbientLogos() {
  return (
    <div className="ai-ambient" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {BG_LOGOS.map((logo, i) => (
        <div key={i} style={{
          position: 'absolute', left: logo.l, top: logo.top,
          opacity: logo.o, filter: `blur(${logo.b}px)`,
          animation: `${logo.a} ${logo.d} ease-in-out infinite ${logo.dl}`,
        }}>
          <div style={{
            width: logo.s, height: logo.s,
            borderRadius: Math.round(logo.s * 0.26),
            background: `${logo.c}16`, border: `1px solid ${logo.c}26`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: logo.t.length > 2 ? 8 : 10, fontWeight: 700, color: logo.c,
          }}>{logo.t}</div>
        </div>
      ))}
    </div>
  )
}

function AtmosphericOrb() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 1400, height: 700, bottom: -380, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 60%, rgba(80,40,200,0.038) 0%, rgba(40,20,140,0.015) 45%, transparent 68%)', filter: 'blur(120px)' }} />
      <div style={{ position: 'absolute', width: 1200, height: 900, bottom: -340, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 56%, rgba(0,155,210,0.068) 0%, rgba(0,120,185,0.028) 42%, transparent 68%)', filter: 'blur(100px)', animation: 'ai-orb-breathe 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 760, height: 560, bottom: -200, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 55%, rgba(0,200,242,0.105) 0%, rgba(0,168,218,0.046) 44%, transparent 68%)', filter: 'blur(52px)', animation: 'ai-orb-breathe 9s ease-in-out infinite 1.2s' }} />
      <div style={{ position: 'absolute', width: 440, height: 330, bottom: -90, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 53%, rgba(0,218,255,0.20) 0%, rgba(0,190,240,0.09) 34%, rgba(0,148,208,0.022) 62%, transparent)', filter: 'blur(24px)', animation: 'ai-orb-breathe 9s ease-in-out infinite 2.1s' }} />
      <div style={{ position: 'absolute', width: 220, height: 170, bottom: -30, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at 44% 40%, rgba(195,246,255,0.33) 0%, rgba(0,220,255,0.22) 26%, rgba(0,188,240,0.08) 54%, transparent)', filter: 'blur(13px)' }} />
      <div style={{ position: 'absolute', width: 380, height: 22, bottom: 108, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(110,228,255,0.30) 0%, transparent 68%)', filter: 'blur(7px)', animation: 'ai-orb-breathe 9s ease-in-out infinite 3s' }} />
      <div style={{ position: 'absolute', width: 1000, height: 55, bottom: 0, left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse at center, rgba(0,175,230,0.075) 0%, transparent 70%)', filter: 'blur(18px)' }} />
    </div>
  )
}

function MagicBar() {
  const [focused, setFocused] = useState(false)
  const [hoverBtn, setHoverBtn] = useState(false)

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 660, margin: '0 auto' }}>
      <div style={{
        position: 'absolute', inset: -20, borderRadius: 40,
        background: focused
          ? 'radial-gradient(ellipse at 50% 60%, rgba(0,195,240,0.10) 0%, transparent 68%)'
          : 'radial-gradient(ellipse at 50% 60%, rgba(0,170,215,0.045) 0%, transparent 68%)',
        filter: 'blur(24px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)', zIndex: 0, pointerEvents: 'none',
      }} />
      <div className="ai-magic-glass" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{
        position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 12,
        padding: '15px 16px 15px 20px', borderRadius: 22,
        background: focused
          ? 'linear-gradient(160deg, rgba(7,18,42,0.90) 0%, rgba(4,12,28,0.95) 100%)'
          : 'linear-gradient(160deg, rgba(5,14,35,0.82) 0%, rgba(3,10,24,0.89) 100%)',
        border: focused ? '1px solid rgba(0,200,240,0.24)' : '1px solid rgba(255,255,255,0.074)',
        backdropFilter: 'blur(48px) saturate(170%)',
        boxShadow: focused
          ? 'inset 0 1px 0 rgba(255,255,255,0.095), 0 30px 72px rgba(0,0,0,0.58)'
          : 'inset 0 1px 0 rgba(255,255,255,0.068), 0 24px 58px rgba(0,0,0,0.50)',
        transition: 'all 0.38s cubic-bezier(0.16,1,0.3,1)', overflow: 'hidden',
      }}>
        <Sparkles size={17} style={{ color: focused ? '#00d4ff' : 'rgba(0,198,238,0.46)', flexShrink: 0, transition: 'color 0.32s ease', filter: focused ? 'drop-shadow(0 0 5px rgba(0,212,255,0.5))' : 'none' }} />
        <input type="text" placeholder="Décrivez votre besoin…" style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: 15.5, fontWeight: 400, color: 'rgba(220,235,252,0.94)', caretColor: '#00d4ff',
        }} />
        <kbd className="ai-kbd-hint" style={{
          display: 'inline-flex', alignItems: 'center', padding: '3px 7px', borderRadius: 6,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
          fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.22)', flexShrink: 0, fontFamily: 'inherit',
        }}>⌘K</kbd>
        <div style={{ width: 1, height: 22, flexShrink: 0, background: 'rgba(255,255,255,0.08)' }} />
        <button
          onMouseEnter={() => setHoverBtn(true)} onMouseLeave={() => setHoverBtn(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 14,
            background: hoverBtn
              ? 'linear-gradient(135deg, rgba(0,205,248,0.22) 0%, rgba(0,175,218,0.15) 100%)'
              : 'linear-gradient(135deg, rgba(0,198,242,0.13) 0%, rgba(0,168,212,0.08) 100%)',
            border: `1px solid ${hoverBtn ? 'rgba(0,205,248,0.32)' : 'rgba(0,195,238,0.18)'}`,
            cursor: 'not-allowed', flexShrink: 0, transition: 'all 0.22s ease',
            color: hoverBtn ? 'rgba(0,218,255,0.88)' : 'rgba(0,200,240,0.56)',
            fontSize: 13, fontWeight: 600,
            boxShadow: hoverBtn ? '0 0 20px rgba(0,200,240,0.12)' : 'none',
          }}>
          Analyser <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}

const PILLS = ['🤖 5 meilleures IA', '✍️ Prompt sur mesure', '⚡ Automatisation', '📚 Formation adaptée', '🔗 Ressources clés']

export default function IAConsultantPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#030b18' }}>
      <style>{`
        @keyframes ai-cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .ai-cursor { animation: ai-cursor-blink 1.1s step-end infinite; }
        @keyframes ai-float-a { 0%,100%{transform:translate(0,0)} 30%{transform:translate(5px,-13px)} 65%{transform:translate(-4px,-7px)} }
        @keyframes ai-float-b { 0%,100%{transform:translate(0,0)} 35%{transform:translate(-7px,-11px)} 70%{transform:translate(4px,-19px)} }
        @keyframes ai-float-c { 0%,100%{transform:translate(0,0)} 28%{transform:translate(3px,-17px)} 62%{transform:translate(-5px,-8px)} }
        @keyframes ai-orb-breathe { 0%,100%{opacity:0.68} 50%{opacity:1} }
        @keyframes ai-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ai-dot-pulse { 0%{box-shadow:0 0 0 0 rgba(0,212,255,0.55)} 70%{box-shadow:0 0 0 7px rgba(0,212,255,0)} 100%{box-shadow:0 0 0 0 rgba(0,212,255,0)} }
        .ai-live-dot { width:7px;height:7px;border-radius:50%;background:#00d4ff;box-shadow:0 0 5px rgba(0,212,255,0.7);animation:ai-dot-pulse 2.4s ease-out infinite;flex-shrink:0; }
        @keyframes ai-glass-shine { 0%{transform:translateX(-130%) skewX(-16deg)} 55%,100%{transform:translateX(300%) skewX(-16deg)} }
        .ai-magic-glass::before { content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.026) 48%,transparent 100%);animation:ai-glass-shine 9s ease-in-out infinite 2s;pointer-events:none;z-index:10; }
        .ai-pill { transition:background 0.22s ease,border-color 0.22s ease,transform 0.22s ease;cursor:default; }
        .ai-pill:hover { background:rgba(255,255,255,0.06)!important;border-color:rgba(255,255,255,0.13)!important;transform:translateY(-1px); }
        @media(max-width:640px){ .ai-ambient{display:none!important;} .ai-kbd-hint{display:none!important;} }
      `}</style>

      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', padding: '80px 24px 100px',
      }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: [
            'radial-gradient(ellipse 65% 45% at 12% 18%, rgba(22,55,115,0.14) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 38% at 90% 22%, rgba(0,75,130,0.09) 0%, transparent 58%)',
            'radial-gradient(ellipse 100% 55% at 50% 105%, rgba(0,95,155,0.12) 0%, transparent 52%)',
          ].join(', '),
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.026) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 50% 40%, rgba(0,0,0,0.6) 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 40%, rgba(0,0,0,0.6) 0%, transparent 75%)',
        }} />
        <AmbientLogos />
        <AtmosphericOrb />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: [
            'radial-gradient(ellipse 88% 72% at 50% 42%, transparent 26%, rgba(3,11,24,0.84) 80%)',
            'linear-gradient(to top, rgba(3,11,24,0.65) 0%, transparent 32%)',
          ].join(', '),
        }} />

        <div style={{
          position: 'relative', zIndex: 4, maxWidth: 700, width: '100%', margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center',
        }}>
          {/* Badge */}
          <div style={{
            animation: 'ai-fade-up 0.55s cubic-bezier(0.16,1,0.3,1) both',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px 5px 10px', borderRadius: 100,
            background: 'rgba(0,195,238,0.07)', border: '1px solid rgba(0,195,238,0.15)',
            color: 'rgba(0,210,248,0.82)', fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' as const,
          }}>
            <span className="ai-live-dot" />
            Agent IA Evolify
          </div>

          <h1 style={{ animation: 'ai-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.08s both', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.038em', margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(36px, 6vw, 70px)', color: 'rgba(235,245,255,0.93)' }}>
              Votre IA
            </span>
            <span style={{
              display: 'block', fontSize: 'clamp(38px, 6.5vw, 74px)',
              background: 'linear-gradient(130deg, #00d4ff 0%, #00e8c0 55%, rgba(0,200,240,0.82) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 32px rgba(0,200,240,0.22))',
            }}>
              consultant.
            </span>
          </h1>

          <p style={{
            animation: 'ai-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.16s both',
            fontSize: 'clamp(15px, 2.2vw, 18px)', fontWeight: 400, lineHeight: 1.7,
            color: 'rgba(155,192,230,0.68)', maxWidth: 500, margin: 0,
          }}>
            Exprimez votre besoin. L&apos;agent analyse et génère une solution IA sur mesure, instantanément.
          </p>

          {/* Typing preview */}
          <div style={{
            animation: 'ai-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.23s both',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 16px', borderRadius: 10,
            background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.055)',
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(0,195,238,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, flexShrink: 0 }}>ex.</span>
            <span style={{ fontSize: 14, minWidth: 0 }}><TypingAnimation /></span>
          </div>

          {/* Magic bar */}
          <div style={{ animation: 'ai-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.32s both', width: '100%', marginTop: 8 }}>
            <MagicBar />
          </div>

          {/* Coming soon */}
          <div style={{ animation: 'ai-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.44s both', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100,
              background: 'rgba(250,204,21,0.065)', border: '1px solid rgba(250,204,21,0.13)',
              fontSize: 12, fontWeight: 600, color: 'rgba(250,210,80,0.70)',
            }}>
              <Lock size={11} style={{ color: 'rgba(250,204,21,0.62)' }} />
              Bientôt disponible
            </div>
            <span style={{ fontSize: 12, color: 'rgba(108,150,192,0.4)', fontWeight: 400 }}>· Réservé Full Access</span>
          </div>

          {/* Pills */}
          <div style={{ animation: 'ai-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.54s both', display: 'flex', flexWrap: 'wrap' as const, gap: 8, justifyContent: 'center', marginTop: 2 }}>
            {PILLS.map(pill => (
              <span key={pill} className="ai-pill" style={{
                padding: '6px 13px', borderRadius: 100, background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.068)', fontSize: 12, fontWeight: 500,
                color: 'rgba(148,185,225,0.55)',
              }}>{pill}</span>
            ))}
          </div>

          <p style={{ animation: 'ai-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.62s both', fontSize: 11, color: 'rgba(100,140,180,0.30)', letterSpacing: '0.04em', margin: 0 }}>
            Claude · Gemini · GPT-4o · DeepSeek · Perplexity
          </p>
        </div>
      </section>
    </div>
  )
}
