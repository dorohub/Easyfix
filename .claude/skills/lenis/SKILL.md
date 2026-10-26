---
name: lenis
description: Smooth scrolling with Lenis (lenis.dev, darkroom.engineering). Use whenever adding, configuring or debugging smooth scroll, scroll-linked animations, anchor scrolling, scroll snapping, or GSAP ScrollTrigger sync on a website — in vanilla JS, React/Next.js, Vue or Framer. Triggers on "lenis", "smooth scroll", "smooth scrolling", "inertia scroll", "scrollTo animation", "ScrollTrigger + smooth scroll", "data-lenis-prevent".
---

# Lenis — smooth scroll

Reference: https://lenis.dev · https://github.com/darkroomengineering/lenis (MIT).
Current package: `lenis` (v1.3.x). The old packages `@studio-freight/lenis` and
`@studio-freight/react-lenis` are deprecated — always use `lenis`, `lenis/react`,
`lenis/vue`, `lenis/snap`, `lenis/framer`.

Lenis keeps **native scrolling** (the page still scrolls `window`/a wrapper element) and
only smooths the input. So `position: sticky`, `IntersectionObserver`, `window.scrollY`
and ScrollTrigger keep working — don't build fake transform-based scroll containers.

## Checklist for every integration

1. `npm i lenis`
2. Import the CSS **once** globally: `import 'lenis/dist/lenis.css'`
   (or `<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.27/dist/lenis.css">`).
3. Exactly **one** RAF driver: either `autoRaf: true` **or** a manual `lenis.raf(time)` loop
   (e.g. from the GSAP ticker) — never both.
4. Remove conflicting CSS: no `scroll-behavior: smooth` on `html`, no `overflow: hidden`
   on `html`/`body` that would make the page unscrollable without Lenis.
5. Nested scrollables (modals, dropdowns, code blocks, maps) get `data-lenis-prevent`.
6. Clean up: call `lenis.destroy()` on unmount / page transition.
7. Keep `respectReducedMotion: true` (default) — accessibility.

## Vanilla JS

```js
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const lenis = new Lenis({
  autoRaf: true,   // Lenis runs its own requestAnimationFrame loop
  anchors: true,   // smooth <a href="#id"> links
})

lenis.on('scroll', (e) => {
  // e is the Lenis instance: e.scroll, e.velocity, e.direction, e.progress
})
```

Manual loop (when another library owns the frame loop):

```js
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)          // time in milliseconds
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

No-build / CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.27/dist/lenis.css">
<script src="https://unpkg.com/lenis@1.3.27/dist/lenis.min.js"></script>
<script>
  const lenis = new Lenis({ autoRaf: true, anchors: true })
</script>
```

## GSAP ScrollTrigger

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()                       // NO autoRaf here
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000)) // GSAP: seconds → Lenis: ms
gsap.ticker.lagSmoothing(0)
```

## React / Next.js (`lenis/react`)

```jsx
'use client' // Next.js App Router: put this in a client component, e.g. app/providers.jsx
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

export function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ autoRaf: true, anchors: true }}>
      {children}
    </ReactLenis>
  )
}

// anywhere below (or anywhere at all when `root` is set):
function ScrollToTopButton() {
  const lenis = useLenis(({ scroll }) => { /* runs on every scroll */ })
  return <button onClick={() => lenis?.scrollTo(0)}>Nach oben</button>
}
```

- `root` → uses `<html>` as scroller and makes the instance global for `useLenis`.
- `root="asChild"` → renders wrapper elements for a custom scroll container, still global.
- Without `root` → a scoped instance on its own wrapper/content divs.
- `useLenis(callback, deps, priority)`.

React + GSAP:

```jsx
'use client'
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
```

Next.js route changes: scroll to top yourself on navigation if needed
(`lenis?.scrollTo(0, { immediate: true })` in an effect keyed on `usePathname()`).

## Vue / Nuxt (`lenis/vue`)

```vue
<script setup>
import { VueLenis, useLenis } from 'lenis/vue'
import 'lenis/dist/lenis.css'

const lenis = useLenis(({ scroll }) => { /* ... */ })
</script>

<template>
  <VueLenis root :options="{ autoRaf: true }" />
  <!-- content -->
</template>
```

Nuxt: register `lenis/nuxt` in `modules` (client-only usage).

## Options (defaults)

| Option | Default | Notes |
|---|---|---|
| `wrapper` | `window` | Scroll container |
| `content` | `document.documentElement` | Scrolled content element |
| `eventsTarget` | `wrapper` | Element listening to wheel/touch |
| `autoRaf` | `false` | Run internal RAF loop |
| `autoResize` | `true` | ResizeObserver; else call `resize()` yourself |
| `autoToggle` | `false` | Start/stop by wrapper overflow (needs CSS) |
| `lerp` | `0.1` | 0–1, smaller = smoother/slower; overrides duration/easing |
| `duration` | `1.2` | Seconds, only used when `lerp` is not set |
| `easing` | exp. ease-out | `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` |
| `orientation` | `'vertical'` | `'vertical' \| 'horizontal'` |
| `gestureOrientation` | `'vertical'` | `'vertical' \| 'horizontal' \| 'both'` |
| `smoothWheel` | `true` | Smooth wheel input |
| `syncTouch` | `false` | Smooth touch (can be unstable on iOS < 16) |
| `syncTouchLerp` | `0.075` | Lerp during touch inertia |
| `touchInertiaExponent` | `1.7` | Touch inertia strength |
| `wheelMultiplier` | `1` | |
| `touchMultiplier` | `1` | |
| `infinite` | `false` | Infinite scroll (needs `syncTouch` on touch) |
| `overscroll` | `true` | Like CSS `overscroll-behavior` |
| `anchors` | `false` | `true` or `ScrollToOptions` (e.g. `{ offset: -80 }`) |
| `allowNestedScroll` | `false` | Auto-detect nested scrollers (costly) |
| `naiveDimensions` | `false` | Simpler size calc |
| `stopInertiaOnNavigate` | `false` | Stop inertia on internal link clicks |
| `prevent` | — | `(node) => boolean`, true = don't smooth |
| `virtualScroll` | — | `(e) => boolean`, modify/skip events |
| `respectReducedMotion` | `true` | Reduced motion → lerp 1, instant scrollTo |

## API

Methods:
- `raf(time)` — advance one frame (ms)
- `scrollTo(target, options)` — target: number, selector, `HTMLElement`, or
  `'top' | 'bottom' | 'start' | 'end' | 'left' | 'right'`.
  Options: `offset`, `lerp`, `duration`, `easing`, `immediate`, `lock`, `force`,
  `onComplete`, `userData`.
- `start()` / `stop()` — resume / block user scrolling (e.g. while a modal is open)
- `resize()` — recompute dimensions (needed when `autoResize: false` or after dynamic content without size change)
- `on('scroll' | 'virtual-scroll', fn)` — returns an unsubscribe function
- `destroy()`

Properties: `scroll`, `animatedScroll`, `targetScroll`, `actualScroll`, `velocity`,
`lastVelocity`, `direction` (1 / -1), `progress` (0–1), `limit`, `isScrolling`
(`'smooth' | 'native' | false`), `isStopped`, `isHorizontal`, `rootElement`,
`options`, `dimensions`, `time`, `prefersReducedMotion`.

## Nested scroll areas

```html
<div data-lenis-prevent>…scrollable modal / dropdown…</div>
<div data-lenis-prevent-wheel>…</div>
<div data-lenis-prevent-touch>…</div>
<div data-lenis-prevent-vertical>…</div>
<div data-lenis-prevent-horizontal>…</div>
```

or `new Lenis({ prevent: (node) => node.id === 'modal' })`, or
`allowNestedScroll: true` (convenient, but slower).

## Modals / scroll lock

```js
openModal  = () => { lenis.stop();  modal.showModal() }
closeModal = () => { modal.close(); lenis.start() }
```
Mark the modal's scrollable body with `data-lenis-prevent`.

## Snap (`lenis/snap`)

CSS `scroll-snap` does **not** work with Lenis — use the Snap add-on:

```js
import Lenis from 'lenis'
import Snap from 'lenis/snap'

const lenis = new Lenis({ autoRaf: true })
const snap = new Snap(lenis, {
  type: 'proximity',        // 'proximity' | 'mandatory' | 'lock'
  distanceThreshold: '50%', // % of viewport or px number
  debounce: 500,
  // lerp / easing / duration default to Lenis' values
  // onSnapStart, onSnapComplete
})
snap.addElements(document.querySelectorAll('section'), { align: ['start'] })
// snap.add(px), snap.addElement(el), snap.next(), snap.previous(), snap.goTo(i),
// snap.start(), snap.stop(), snap.resize()
```

## Troubleshooting

- **Nothing smooth / page frozen** → no RAF driver (`autoRaf` missing or no `raf()` loop), or
  CSS not imported, or page isn't scrollable natively (check `overflow`/`height` on html/body).
- **Double speed / jitter** → two RAF drivers or two Lenis instances (React StrictMode,
  HMR, multiple providers). Ensure one instance and `destroy()` on cleanup.
- **ScrollTrigger out of sync** → missing `lenis.on('scroll', ScrollTrigger.update)` or
  ticker time not multiplied by 1000; call `ScrollTrigger.refresh()` after layout changes.
- **Inner element won't scroll** → add `data-lenis-prevent` to it.
- **Anchor links jump** → `anchors: true` (with `offset` for fixed headers); remove
  `scroll-behavior: smooth`.
- **Wheel dead over iframes** → known limitation; iframes don't forward wheel events.
- **Safari** is capped at 60fps (30fps in low power mode); `position: fixed` can lag on
  pre-M1 Macs.
- Always check the installed version first (`npm ls lenis`) and upgrade if outdated.
