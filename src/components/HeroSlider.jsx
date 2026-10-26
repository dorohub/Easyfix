import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLang } from '../i18n.jsx'
import { heroSlides } from '../data/site.js'
import Icon from './Icon.jsx'
import { prefersReducedMotion } from './Motion.jsx'

const AUTOPLAY_MS = 6500

function RepairGraphic() {
  const { t } = useLang()
  const icons = ['screen', 'battery', 'port', 'water']
  const chips = t.repairs.services.map(([label], i) => [icons[i], label])
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070707]">
      <div className="absolute -top-1/3 right-[-10%] size-[80vmax] rounded-full bg-[radial-gradient(circle,rgb(246_128_0/0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_50%,#000_20%,transparent_70%)]" />
      <div className="absolute top-1/2 right-[6%] hidden -translate-y-1/2 lg:block" data-hero-art>
        <div className="relative grid size-[380px] place-items-center rounded-full border border-primary/30">
          <div className="absolute inset-8 rounded-full border border-dashed border-white/15" />
          <Icon name="wrench" size={150} strokeWidth={1} className="text-primary drop-shadow-[0_0_40px_rgb(246_128_0/0.6)]" />
          {chips.map(([icon, label], i) => {
            const angle = (i / chips.length) * Math.PI * 2 - Math.PI / 4
            return (
              <span
                key={label}
                className="absolute flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                style={{ left: `${50 + Math.cos(angle) * 52}%`, top: `${50 + Math.sin(angle) * 52}%`, transform: 'translate(-50%,-50%)' }}
              >
                <Icon name={icon} size={16} className="text-primary" />
                {label}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function HeroSlider() {
  const { t, pick } = useLang()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const root = useRef(null)
  const touch = useRef(null)
  const count = heroSlides.length

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const id = setTimeout(() => go(index + 1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [index, paused, go])

  useGSAP(
    () => {
      const slides = gsap.utils.toArray('[data-slide]')
      const reduce = prefersReducedMotion()
      slides.forEach((el, i) => {
        const active = i === index
        gsap.to(el, { autoAlpha: active ? 1 : 0, duration: reduce ? 0 : 0.9, ease: 'power2.inOut', zIndex: active ? 2 : 1 })
        if (!active) return
        const img = el.querySelector('[data-hero-img]')
        if (img && !reduce) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: AUTOPLAY_MS / 1000 + 1.5, ease: 'none' })
        const art = el.querySelector('[data-hero-art]')
        if (art && !reduce) gsap.fromTo(art, { rotate: -12, scale: 0.9, autoAlpha: 0 }, { rotate: 0, scale: 1, autoAlpha: 1, duration: 1.2, ease: 'expo.out' })
        const parts = el.querySelectorAll('[data-hero-part]')
        if (!reduce) gsap.fromTo(parts, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.15 })
      })
      if (!reduce) {
        gsap.fromTo('[data-progress-active]', { scaleX: 0 }, { scaleX: 1, duration: AUTOPLAY_MS / 1000, ease: 'none', transformOrigin: 'left center' })
      }
    },
    { scope: root, dependencies: [index] }
  )

  return (
    <section
      ref={root}
      className="relative isolate h-[min(86svh,720px)] min-h-[560px] overflow-hidden bg-black text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
        touch.current = null
      }}
      aria-roledescription="carousel"
      aria-label="Highlights"
    >
      {heroSlides.map((s, i) => (
        <div key={s.id} data-slide className="absolute inset-0 invisible opacity-0" aria-hidden={i !== index} inert={i !== index} role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${count}`}>
          {s.image ? (
            <>
              <img data-hero-img src={s.image} alt="" className="absolute inset-0 size-full object-cover object-[70%_center]" fetchPriority={i === 0 ? 'high' : 'auto'} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
            </>
          ) : (
            <RepairGraphic />
          )}
          <div className="container-x relative flex h-full flex-col justify-center pb-16">
            <div className="max-w-2xl">
              <p data-hero-part className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-primary">
                <span className="h-px w-8 bg-primary" />
                {s.eyebrow}
              </p>
              <h2 className="mt-5 text-[clamp(32px,8.2vw,68px)] leading-[1.04] font-extrabold">
                <span data-hero-part className="block">{pick(s.title)}</span>
                <span data-hero-part className="block text-primary">{pick(s.accent)}</span>
              </h2>
              <p data-hero-part className="mt-6 text-lg font-semibold sm:text-xl">{pick(s.lead)}</p>
              <p data-hero-part className="mt-2 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-base">{pick(s.text)}</p>
              <div data-hero-part className="mt-8 flex flex-wrap gap-3">
                <Link to={s.to} className="btn-primary px-7 py-3.5 text-[15px]">
                  {s.id === 'repair' ? t.repairBand.cta : t.shopNow}
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link to="/wholesale" className="btn-ghost-light px-7 py-3.5 text-[15px]">{t.wholesale}</Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* controls */}
      <div className="container-x pointer-events-none absolute inset-x-0 bottom-7 z-10 flex items-center justify-between">
        <div className="pointer-events-auto flex gap-2">
          {heroSlides.map((s, i) => (
            <button key={s.id} type="button" onClick={() => go(i)} className="group py-3" aria-label={`Slide ${i + 1}`} aria-current={i === index}>
              <span className={`relative block h-1 overflow-hidden rounded-full bg-white/25 transition-all duration-500 ${i === index ? 'w-12' : 'w-6 group-hover:bg-white/50'}`}>
                {i === index && <span data-progress-active className="absolute inset-0 origin-left bg-primary" />}
              </span>
            </button>
          ))}
        </div>
        <div className="pointer-events-auto hidden gap-2 sm:flex">
          <button type="button" onClick={() => go(index - 1)} className="grid size-11 place-items-center rounded-full border border-white/25 bg-black/20 backdrop-blur transition hover:border-primary hover:bg-primary hover:text-primary-fg" aria-label="Previous slide">
            <Icon name="chevronLeft" />
          </button>
          <button type="button" onClick={() => go(index + 1)} className="grid size-11 place-items-center rounded-full border border-white/25 bg-black/20 backdrop-blur transition hover:border-primary hover:bg-primary hover:text-primary-fg" aria-label="Next slide">
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>
    </section>
  )
}
