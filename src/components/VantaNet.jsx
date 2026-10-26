import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './Motion.jsx'

// Vanta NET background, loaded only when the element scrolls near the viewport.
// three.js is pinned to r134 (see .claude/skills/vanta).
export default function VantaNet({ className = '', color = 0xf68000, backgroundColor = 0x0b0b0b }) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let effect
    let cancelled = false
    const el = ref.current
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || effect) return
        io.disconnect()
        try {
          const [THREE, { default: NET }] = await Promise.all([import('three'), import('vanta/dist/vanta.net.min')])
          if (cancelled) return
          effect = NET({
            el,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1,
            scaleMobile: 1,
            color,
            backgroundColor,
            points: 10,
            maxDistance: 22,
            spacing: 18,
            showDots: true,
          })
        } catch (err) {
          console.warn('Vanta disabled:', err)
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
      effect?.destroy()
    }
  }, [color, backgroundColor])

  return <div ref={ref} className={`absolute inset-0 ${className}`} aria-hidden="true" />
}
