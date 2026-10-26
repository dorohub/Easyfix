import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ReactLenis, useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger stays in sync.
export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  useEffect(() => {
    const update = (time) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    const lenis = lenisRef.current?.lenis
    lenis?.on('scroll', ScrollTrigger.update)
    return () => {
      gsap.ticker.remove(update)
      lenis?.off?.('scroll', ScrollTrigger.update)
    }
  }, [])
  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, anchors: { offset: -90 }, stopInertiaOnNavigate: true }}>
      {children}
    </ReactLenis>
  )
}

export function ScrollReset() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname, lenis])
  return null
}

// Fades in [data-reveal] blocks and staggers [data-reveal-item] children as they enter.
export function Reveal({ children, className = '', as: Tag = 'div', deps = [] }) {
  const ref = useRef(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const blocks = gsap.utils.toArray('[data-reveal]', ref.current)
      blocks.forEach((el) => {
        gsap.from(el, { y: 24, autoAlpha: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
      const items = gsap.utils.toArray('[data-reveal-item]', ref.current)
      if (items.length) {
        gsap.set(items, { y: 28, autoAlpha: 0 })
        ScrollTrigger.batch(items, {
          start: 'top 92%',
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.06, overwrite: true }),
        })
      }
    },
    { scope: ref, dependencies: deps, revertOnUpdate: true }
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
