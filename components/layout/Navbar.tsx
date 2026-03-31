'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Bot,
  User,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  Image,
  Zap,
  Puzzle,
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

// ─── MODULE DROPDOWN ITEMS ───────────────────────────────────────────────────
const MODULES = [
  {
    label: 'Prompts LLM',
    href: '/prompts-llm',
    color: '#60a5fa',
    desc: '1 000+ prompts experts',
    icon: MessageSquare,
  },
  {
    label: 'Prompts Visuels',
    href: '/prompts-visuels',
    color: '#f87171',
    desc: '8 000+ prompts visuels',
    icon: Image,
  },
  {
    label: 'Automatisations',
    href: '/automatisations',
    color: '#4ade80',
    desc: '8 000+ workflows prêts',
    icon: Zap,
  },
  {
    label: 'Skills & Plugins',
    href: '/skills',
    color: '#facc15',
    desc: '500+ extensions IA',
    icon: Puzzle,
  },
]

// ─── IA ASSISTANTS DROPDOWN ──────────────────────────────────────────────────
const IA_ASSISTANTS = [
  {
    label: 'IA Consultant',
    href: '/ia-consultant',
    color: '#00d4ff',
    desc: 'Recherche universelle IA',
    icon: Sparkles,
  },
  {
    label: 'IA Manager — LIAM',
    href: '/ia-manager',
    color: '#f97316',
    desc: "Orchestrateur d'agents",
    icon: Bot,
  },
]

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface DropdownItem {
  label: string
  href: string
  color: string
  desc: string
  icon?: React.ElementType
}

interface DropdownProps {
  label: string
  items: DropdownItem[]
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

// ─── DROPDOWN COMPONENT ──────────────────────────────────────────────────────
function Dropdown({ label, items, isOpen, onToggle, onClose }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    if (isOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, onClose])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center gap-1 text-sm font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg',
          isOpen
            ? 'text-white bg-white/[0.07]'
            : 'text-[var(--c-text-2)] hover:text-white hover:bg-white/[0.04]'
        )}
      >
        {label}
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 min-w-[260px] rounded-2xl border overflow-hidden z-50"
          style={{
            background: 'rgba(13,20,36,0.97)',
            borderColor: 'rgba(255,255,255,0.08)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {items.map(item => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-start gap-3 px-4 py-3 transition-colors duration-150 hover:bg-white/[0.04]"
              >
                <div
                  className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {Icon ? (
                    <Icon size={14} style={{ color: item.color }} />
                  ) : (
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">{item.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--c-text-3)' }}>
                    {item.desc}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname()
  const { isDark, toggleTheme } = useApp()
  const { user, logout } = useAuth()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const userMenuRef = useRef<HTMLDivElement>(null)

  // Track scroll for enhanced glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleDropdown = (key: string) => setOpenDropdown(p => (p === key ? null : key))
  const closeDropdown = () => setOpenDropdown(null)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'blur(20px)',
        background: scrolled ? 'rgba(5,9,20,0.92)' : 'rgba(5,9,20,0.85)',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-transform duration-200 group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}
          >
            E
          </div>
          <span
            className="font-black text-sm tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ff87)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Evolify
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-0.5">
          {[
            { label: 'Accueil', href: '/' },
            { label: 'Outils IA', href: '/outils-ia' },
            { label: 'Ressources', href: '/ressources' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200',
                isActive(item.href)
                  ? 'text-white bg-white/[0.07]'
                  : 'text-[var(--c-text-2)] hover:text-white hover:bg-white/[0.04]'
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Modules dropdown */}
          <Dropdown
            label="Modules"
            items={MODULES}
            isOpen={openDropdown === 'modules'}
            onToggle={() => toggleDropdown('modules')}
            onClose={closeDropdown}
          />

          {/* IA Assistants dropdown */}
          <Dropdown
            label="IA Assistants"
            items={IA_ASSISTANTS}
            isOpen={openDropdown === 'ia'}
            onToggle={() => toggleDropdown('ia')}
            onClose={closeDropdown}
          />

          <Link
            href="/pricing"
            className={cn(
              'text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200',
              isActive('/pricing')
                ? 'text-white bg-white/[0.07]'
                : 'text-[var(--c-text-2)] hover:text-white hover:bg-white/[0.04]'
            )}
          >
            Pricing
          </Link>
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-1.5">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 text-[var(--c-text-3)] hover:text-white hover:bg-white/[0.06]"
            title={isDark ? 'Mode clair' : 'Mode sombre'}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Auth section */}
          {user ? (
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen(p => !p)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg transition-colors duration-200 hover:bg-white/[0.06]"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)', color: '#030712' }}
                >
                  {user.name[0].toUpperCase()}
                </div>
                <span className="text-sm text-white/80 hidden sm:block max-w-[100px] truncate">
                  {user.username}
                </span>
                <ChevronDown
                  size={12}
                  style={{
                    color: 'var(--c-text-3)',
                    transition: 'transform 0.2s',
                    transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 rounded-xl border overflow-hidden z-50"
                  style={{
                    background: 'rgba(13,20,36,0.97)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* User info header */}
                  <div
                    className="px-4 py-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="text-xs font-semibold text-white truncate">{user.name}</div>
                    <div className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--c-text-3)' }}>
                      {user.email}
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard?tab=profil"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <User size={14} />
                    Mon profil
                  </Link>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

                  <button
                    onClick={() => {
                      logout()
                      setUserMenuOpen(false)
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#f87171] hover:bg-white/[0.05] transition-colors"
                  >
                    <LogOut size={14} />
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/connexion"
                className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 text-[var(--c-text-2)] hover:text-white hover:bg-white/[0.04]"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="text-sm font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}
              >
                Démarrer
              </Link>
            </div>
          )}

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(p => !p)}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[var(--c-text-2)] hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-1"
          style={{
            borderColor: 'rgba(255,255,255,0.06)',
            background: 'rgba(5,9,20,0.98)',
          }}
        >
          {[
            { label: 'Accueil', href: '/' },
            { label: 'Outils IA', href: '/outils-ia' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Pricing', href: '/pricing' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium px-3 py-2.5 rounded-lg transition-colors',
                isActive(item.href)
                  ? 'text-white bg-white/[0.07]'
                  : 'text-[var(--c-text-2)] hover:text-white hover:bg-white/[0.06]'
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Modules section */}
          <div
            className="text-[10px] font-black uppercase tracking-widest px-3 pt-4 pb-1.5"
            style={{ color: 'var(--c-text-4)' }}
          >
            Modules
          </div>
          {MODULES.map(item => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--c-text-2)] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}18` }}
                >
                  <Icon size={11} style={{ color: item.color }} />
                </div>
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}

          {/* IA Assistants section */}
          <div
            className="text-[10px] font-black uppercase tracking-widest px-3 pt-4 pb-1.5"
            style={{ color: 'var(--c-text-4)' }}
          >
            IA Assistants
          </div>
          {IA_ASSISTANTS.map(item => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--c-text-2)] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}18` }}
                >
                  <Icon size={11} style={{ color: item.color }} />
                </div>
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}

          {/* Mobile auth */}
          {!user && (
            <div className="flex flex-col gap-2 pt-4 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link
                href="/connexion"
                className="text-center py-2.5 rounded-xl text-sm font-medium text-[var(--c-text-2)] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="text-center py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #00ff87)', color: '#030712' }}
              >
                Démarrer gratuitement
              </Link>
            </div>
          )}

          {user && (
            <div className="pt-4 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <LayoutDashboard size={14} />
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); setMobileOpen(false) }}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-[#f87171] hover:bg-white/[0.06] transition-colors"
              >
                <LogOut size={14} />
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
