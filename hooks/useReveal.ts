'use client'

import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })

    const els = Array.from(document.querySelectorAll('.reveal, .reveal-left, .reveal-right'))
    els.forEach(el => obs.observe(el))

    const fallback = setTimeout(() => {
      els.forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight + 100) el.classList.add('visible')
      })
    }, 150)

    return () => { obs.disconnect(); clearTimeout(fallback) }
  }, [])
}
