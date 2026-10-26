import 'lenis/dist/lenis.css'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'

import { catalog, issues, services, categories, products, reviews, faqs } from './data.js'
import { icons } from './icons.js'
import { createCart } from './cart.js'

gsap.registerPlugin(ScrollTrigger, SplitText, Flip)

const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' })
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)]

/* ---------------------------------------------------------------- smooth scroll */

const lenis = new Lenis({ anchors: { offset: -80 }, stopInertiaOnNavigate: true })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

/* ---------------------------------------------------------------- toast */

const toastEl = $('[data-toast]')
let toastTimer
function toast(message) {
  toastEl.textContent = message
  toastEl.classList.add('is-visible')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2600)
}

const cart = createCart({ lenis, toast })

/* ---------------------------------------------------------------- render content */

$('[data-services]').innerHTML = services
  .map(
    (s) => `
    <article class="service">
      <div class="service__icon">${icons[s.icon]}</div>
      <h3 class="service__title">${s.title}</h3>
      <p class="service__text">${s.text}</p>
      <p class="service__price">${s.from ? `from <strong>${euro.format(s.from)}</strong>` : 'Free diagnosis'}</p>
    </article>`
  )
  .join('')

$('[data-filters]').innerHTML = categories
  .map(
    (c, i) =>
      `<button type="button" role="tab" class="filter${i === 0 ? ' is-active' : ''}" aria-selected="${i === 0}" data-filter="${c.id}">${c.label}</button>`
  )
  .join('')

$('[data-products]').innerHTML = products
  .map(
    (p) => `
    <article class="product" data-cat="${p.cat}" data-flip-id="${p.id}">
      <div class="product__media" style="--h:${p.hue}">
        <span class="product__glyph">${icons[p.cat]}</span>
        ${p.tag ? `<span class="product__tag">${p.tag}</span>` : ''}
      </div>
      <div class="product__body">
        <h3 class="product__name">${p.name}</h3>
        <p class="product__meta">${p.meta}</p>
        <div class="product__foot">
          <span class="product__price">${euro.format(p.price)}</span>
          <button type="button" class="btn btn--dark btn--sm" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add</button>
        </div>
      </div>
    </article>`
  )
  .join('')

$('[data-reviews]').innerHTML = reviews
  .map(
    (r) => `
    <figure class="review">
      <div class="review__stars" aria-label="5 out of 5 stars">${icons.star.repeat(5)}</div>
      <blockquote>${r.text}</blockquote>
      <figcaption>
        <span class="review__avatar" aria-hidden="true">${r.initials}</span>
        <span><strong>${r.name}</strong><small>${r.device}</small></span>
      </figcaption>
    </figure>`
  )
  .join('')

$('[data-faq]').innerHTML = faqs
  .map(
    (f, i) => `
    <div class="faq-item">
      <h3>
        <button type="button" class="faq-item__q" aria-expanded="false" aria-controls="faq-${i}" id="faq-q-${i}">
          ${f.q}<span class="faq-item__icon" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="faq-item__a" id="faq-${i}" role="region" aria-labelledby="faq-q-${i}" hidden>
        <p>${f.a}</p>
      </div>
    </div>`
  )
  .join('')

$('[data-year]').textContent = new Date().getFullYear()

/* ---------------------------------------------------------------- quote widget */

function initQuote() {
  const form = $('[data-quote]')
  const brandSel = $('[data-quote-brand]', form)
  const modelSel = $('[data-quote-model]', form)
  const issueWrap = $('[data-quote-issues]', form)
  const priceEl = $('[data-quote-price]', form)
  const timeEl = $('[data-quote-time]', form)
  const note = $('[data-quote-note]', form)
  let issue = 'screen'

  brandSel.innerHTML = Object.keys(catalog).map((b) => `<option>${b}</option>`).join('')
  issueWrap.innerHTML = issues
    .map(
      (it) =>
        `<label class="chip"><input type="radio" name="issue" value="${it.id}"${it.id === issue ? ' checked' : ''}><span>${it.label}</span></label>`
    )
    .join('')

  function fillModels() {
    modelSel.innerHTML = Object.keys(catalog[brandSel.value]).map((m) => `<option>${m}</option>`).join('')
  }

  let shown = 0
  function update() {
    const price = catalog[brandSel.value]?.[modelSel.value]?.[issue]
    const info = issues.find((i) => i.id === issue)
    note.hidden = true
    if (price == null) {
      priceEl.textContent = 'Free diagnosis'
      timeEl.textContent = 'Exact quote after a quick check'
      shown = 0
      return
    }
    timeEl.textContent = `Ready in ~${info.time}`
    const counter = { v: shown }
    gsap.to(counter, {
      v: price,
      duration: reduceMotion ? 0 : 0.6,
      ease: 'power2.out',
      onUpdate: () => (priceEl.textContent = euro.format(Math.round(counter.v))),
    })
    shown = price
  }

  brandSel.addEventListener('change', () => {
    fillModels()
    update()
  })
  modelSel.addEventListener('change', update)
  issueWrap.addEventListener('change', (e) => {
    issue = e.target.value
    update()
  })
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    note.hidden = false
    note.textContent = `Booking for ${modelSel.value} · ${issues.find((i) => i.id === issue).label} — online booking connects in the next phase.`
  })

  fillModels()
  update()
}

/* ---------------------------------------------------------------- header + menu + banner */

function initChrome() {
  const header = $('[data-header]')
  const menuBtn = $('[data-menu-toggle]')
  const nav = $('[data-nav]')

  lenis.on('scroll', ({ scroll, direction }) => {
    header.classList.toggle('is-solid', scroll > 40)
    header.classList.toggle('is-hidden', direction === 1 && scroll > 400 && !nav.classList.contains('is-open'))
  })

  function setMenu(open) {
    nav.classList.toggle('is-open', open)
    menuBtn.setAttribute('aria-expanded', String(open))
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    document.documentElement.classList.toggle('menu-open', open)
    open ? lenis.stop() : lenis.start()
  }
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')))
  nav.addEventListener('click', (e) => e.target.closest('a') && setMenu(false))

  const banner = $('.preview-banner')
  try {
    if (sessionStorage.getItem('easyfix-banner') === 'hidden') banner.remove()
  } catch {}
  banner?.querySelector('button').addEventListener('click', () => {
    banner.remove()
    try {
      sessionStorage.setItem('easyfix-banner', 'hidden')
    } catch {}
  })
}

/* ---------------------------------------------------------------- shop filter */

function initShop() {
  const grid = $('[data-products]')
  const cards = $$('.product', grid)

  $('[data-filters]').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]')
    if (!btn || btn.classList.contains('is-active')) return
    $$('[data-filter]').forEach((b) => {
      const active = b === btn
      b.classList.toggle('is-active', active)
      b.setAttribute('aria-selected', String(active))
    })

    const state = Flip.getState(cards)
    const cat = btn.dataset.filter
    cards.forEach((c) => (c.hidden = cat !== 'all' && c.dataset.cat !== cat))
    Flip.from(state, {
      duration: reduceMotion ? 0 : 0.6,
      ease: 'power3.inOut',
      stagger: 0.03,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    })
  })

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]')
    if (btn) cart.add(btn.dataset.add)
  })
}

/* ---------------------------------------------------------------- faq */

function initFaq() {
  $('[data-faq]').addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-item__q')
    if (!btn) return
    const panel = document.getElementById(btn.getAttribute('aria-controls'))
    const open = btn.getAttribute('aria-expanded') === 'true'
    btn.setAttribute('aria-expanded', String(!open))
    if (open) {
      gsap.to(panel, {
        height: 0,
        duration: reduceMotion ? 0 : 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          panel.hidden = true
          ScrollTrigger.refresh()
        },
      })
    } else {
      panel.hidden = false
      gsap.fromTo(
        panel,
        { height: 0 },
        { height: 'auto', duration: reduceMotion ? 0 : 0.45, ease: 'power2.out', onComplete: () => ScrollTrigger.refresh() }
      )
    }
  })
}

/* ---------------------------------------------------------------- hero background */

async function initVanta() {
  const hero = $('[data-vanta]')
  if (reduceMotion) return
  try {
    // loaded on demand so three.js doesn't block the first paint
    const [THREE, { default: NET }] = await Promise.all([import('three'), import('vanta/dist/vanta.net.min')])
    const effect = NET({
      el: hero,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: 0x22e3a5,
      backgroundColor: 0x070b14,
      points: 11,
      maxDistance: 21,
      spacing: 17,
      showDots: true,
    })
    window.addEventListener('pagehide', () => effect.destroy(), { once: true })
  } catch (err) {
    // WebGL unavailable — the CSS background stays as fallback
    console.warn('Vanta disabled:', err)
  }
}

/* ---------------------------------------------------------------- motion */

function initMotion() {
  const mm = gsap.matchMedia()

  // marquee runs in every mode except reduced motion
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const track = $('.marquee__track')
    track.innerHTML += track.innerHTML // duplicate for seamless loop
    gsap.to(track, { xPercent: -50, ease: 'none', duration: 30, repeat: -1 })

    // hero intro
    document.fonts.ready.then(() => {
      SplitText.create('[data-split]', {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.1 })
        },
      })
    })
    gsap
      .timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
      .from('.hero__eyebrow', { y: 20, autoAlpha: 0 }, 0.1)
      .from('.hero__lead, .hero__ctas, .hero__trust li', { y: 24, autoAlpha: 0, stagger: 0.08 }, 0.45)
      .from('.quote', { y: 40, autoAlpha: 0, duration: 1 }, 0.35)

    // section heads
    $$('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 50,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })

    // grids
    ScrollTrigger.batch('.service, .review', {
      start: 'top 90%',
      onEnter: (els) => gsap.from(els, { y: 40, autoAlpha: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }),
      once: true,
    })
    ScrollTrigger.batch('.product', {
      start: 'top 92%',
      onEnter: (els) => gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'power3.out' }),
      once: true,
    })

    // counters
    $$('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count)
      const decimals = Number(el.dataset.decimals || 0)
      const suffix = el.dataset.suffix || ''
      const obj = { v: 0 }
      const fmt = (v) => (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')) + suffix
      el.textContent = fmt(0)
      gsap.to(obj, {
        v: end,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => (el.textContent = fmt(obj.v)),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })

    // hero parallax out
    gsap.to('.hero__inner', {
      yPercent: 12,
      autoAlpha: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    })
  })

  // pinned horizontal steps on wide screens only
  mm.add('(min-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
    const track = $('[data-how-track]')
    const distance = () => track.scrollWidth - window.innerWidth + 64
    const scrollTween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '[data-how]',
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })
    gsap.utils.toArray('.step').forEach((step) => {
      gsap.from(step.querySelector('.step__num'), {
        yPercent: 60,
        opacity: 0,
        scrollTrigger: { trigger: step, containerAnimation: scrollTween, start: 'left 85%', toggleActions: 'play none none reverse' },
      })
    })
  })

  // reduced motion: show the counters' final values
  mm.add('(prefers-reduced-motion: reduce)', () => {
    $$('[data-count]').forEach((el) => {
      const d = Number(el.dataset.decimals || 0)
      el.textContent = (d ? Number(el.dataset.count).toFixed(d) : Number(el.dataset.count).toLocaleString('en-US')) + (el.dataset.suffix || '')
    })
  })
}

initChrome()
initQuote()
initShop()
initFaq()
initVanta()
initMotion()
window.addEventListener('load', () => ScrollTrigger.refresh())
