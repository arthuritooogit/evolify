'use client'

import { useState, useRef, useEffect } from 'react'

export function useCountUp(target: number, duration = 2000) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const run = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target))
          if (p < 1) requestAnimationFrame(run)
          else setVal(target)
        }
        requestAnimationFrame(run)
      }
    }, { threshold: 0.4 })

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])

  return [ref, val] as const
}
