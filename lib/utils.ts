import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

export function truncatePrompt(text: string, hasAccess: boolean): string {
  if (hasAccess) return text
  const limit = Math.floor(text.length * 0.28)
  return text.slice(0, limit) + '...'
}

export function formatScore(score: number): string {
  return score.toFixed(1)
}

export function scoreColor(score: number): string {
  if (score >= 8.5) return '#00ff87'
  if (score >= 7)   return '#00d4ff'
  if (score >= 5)   return '#facc15'
  return '#f87171'
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}
