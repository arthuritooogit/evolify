import type { CatalogItem } from '@/types'

interface ScoringItem {
  score_global: number
  featured?: boolean
  usecase_scores?: Record<string, number>
  function_scores?: Record<string, number>
}

/**
 * Calcule le score effectif d'un item selon les filtres actifs.
 * Si un filtre use_case ou function est actif, on utilise le score spécifique.
 * Sinon, on utilise score_global + boost featured.
 */
export function computeEffectiveScore(
  item: ScoringItem,
  activeFilters: Record<string, string[]>
): number {
  let score = item.score_global

  // Boost featured
  if (item.featured) score += 0.5

  // Score use case actif
  const activeUseCases = activeFilters['uses'] || activeFilters['use_cases'] || []
  if (activeUseCases.length > 0 && item.usecase_scores) {
    const ucScores = activeUseCases
      .map(uc => item.usecase_scores![uc] ?? 0)
      .filter(s => s > 0)
    if (ucScores.length > 0) {
      const avg = ucScores.reduce((a, b) => a + b, 0) / ucScores.length
      score = score * 0.3 + avg * 0.7
    }
  }

  // Score function actif
  const activeFunctions = activeFilters['functions'] || []
  if (activeFunctions.length > 0 && item.function_scores) {
    const fnScores = activeFunctions
      .map(fn => item.function_scores![fn] ?? 0)
      .filter(s => s > 0)
    if (fnScores.length > 0) {
      const avg = fnScores.reduce((a, b) => a + b, 0) / fnScores.length
      score = score * 0.3 + avg * 0.7
    }
  }

  // Boost par nombre de filtres matchés
  let matchCount = 0
  for (const [filterKey, filterValues] of Object.entries(activeFilters)) {
    if (!filterValues.length) continue
    const itemVal = (item as unknown as Record<string, unknown>)[filterKey]
    if (Array.isArray(itemVal)) {
      if (filterValues.some(v => itemVal.includes(v))) matchCount++
    } else if (typeof itemVal === 'string') {
      if (filterValues.includes(itemVal)) matchCount++
    }
  }
  score += matchCount * 0.3

  return Math.min(score, 10)
}

/**
 * Filtre et trie une liste d'items selon les filtres actifs et la recherche.
 */
export function filterAndSort<T extends Record<string, unknown>>(
  items: T[],
  search: string,
  activeFilters: Record<string, string[]>,
  searchFields: string[] = ['name', 'desc_short', 'tags']
): T[] {
  let result = items

  // Recherche textuelle
  if (search.trim()) {
    const q = search.toLowerCase().trim()
    result = result.filter(item =>
      searchFields.some(field => {
        const val = item[field]
        if (typeof val === 'string') return val.toLowerCase().includes(q)
        if (Array.isArray(val)) return val.some(v => String(v).toLowerCase().includes(q))
        return false
      })
    )
  }

  // Filtres
  for (const [key, values] of Object.entries(activeFilters)) {
    if (!values.length) continue
    if (key === 'score_min') {
      const min = parseFloat(values[0])
      result = result.filter(item => (item.score_global as number) >= min)
      continue
    }
    result = result.filter(item => {
      const val = item[key]
      if (Array.isArray(val)) return values.some(v => val.includes(v))
      if (typeof val === 'string') return values.includes(val)
      if (typeof val === 'boolean') return values.includes(String(val))
      return true
    })
  }

  // Tri par score effectif décroissant
  result = [...result].sort((a, b) =>
    computeEffectiveScore(b as unknown as ScoringItem, activeFilters) -
    computeEffectiveScore(a as unknown as ScoringItem, activeFilters)
  )

  return result
}
