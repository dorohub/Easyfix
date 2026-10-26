---
name: gsap
description: Web animation with GSAP (gsap.com, GreenSock) — tweens, timelines, ScrollTrigger, SplitText, Flip, Draggable, MorphSVG/DrawSVG, ScrollSmoother and the other plugins, in vanilla JS, React/Next.js (@gsap/react useGSAP) or Vue. Use whenever adding, refactoring or debugging JavaScript animations, scroll-triggered/pinned/scrubbed sections, text reveals, SVG animation, layout transitions or drag interactions. Triggers on "gsap", "greensock", "ScrollTrigger", "timeline", "tween", "SplitText", "useGSAP", "scroll animation", "pin section", "parallax", "stagger".
---

# GSAP — GreenSock Animation Platform

Reference: https://gsap.com/docs/v3/ · https://github.com/greensock/GSAP · React: https://github.com/greensock/react
Current: **gsap 3.15** (v3 API). Since 3.13 **GSAP is 100% free incl. ALL former
Club/bonus plugins** (SplitText, MorphSVG, DrawSVG, ScrollSmoother, Inertia, …), also for
commercial use, under GreenSock's "standard no-charge license". Everything ships in the
public `gsap` npm package — never use the old private registry (`npm.greensock.com`,
`gsap-trial`, `@gsap/shockingly`, `.npmrc` tokens).

## Setup

```bash
npm install gsap
npm install @gsap/react   # React only
```

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText) // once, before use; required for tree-shaking
```

CDN (no build step):

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
<script>gsap.registerPlugin(ScrollTrigger)</script>
```

Plugin import paths (`gsap/<Name>`, UMD file `dist/<Name>.min.js`):
`ScrollTrigger`, `ScrollSmoother`, `ScrollToPlugin`, `Observer`, `Flip`, `Draggable`,
`InertiaPlugin`, `MotionPathPlugin`, `MorphSVGPlugin`, `DrawSVGPlugin`, `SplitText`,
`ScrambleTextPlugin`, `TextPlugin`, `CustomEase`, `CustomBounce`, `CustomWiggle`,
`EasePack` (RoughEase, SlowMo, ExpoScaleEase), `Physics2DPlugin`, `PhysicsPropsPlugin`,
`GSDevTools`, `PixiPlugin`, `EaselPlugin`.

## Core API

```js
gsap.to('.box',   { x: 200, rotation: 360, duration: 1, ease: 'power2.out' })
gsap.from('.box', { opacity: 0, y: 40, stagger: 0.1 })
gsap.fromTo('.box', { opacity: 0 }, { opacity: 1, duration: 0.6 })
gsap.set('.box',  { xPercent: -50, transformOrigin: '50% 50%' })
```

Common vars: `duration` (default 0.5), `delay`, `ease` (default `'power1.out'`), `repeat`
(-1 = infinite), `yoyo`, `repeatDelay`, `stagger` (number or `{ each, from: 'center'|'end'|'random', grid, amount }`),
`overwrite` (`'auto'` recommended for interactive tweens), `immediateRender`, `paused`,
callbacks `onStart`, `onUpdate`, `onComplete`, `onRepeat`, `onReverseComplete`.

Prefer transform aliases over CSS strings: `x`, `y`, `xPercent`, `yPercent`, `scale`,
`scaleX`, `rotation`, `rotationX/Y`, `skewX`, `opacity`/`autoAlpha` (autoAlpha also toggles
`visibility`). Animate transforms & opacity, not `top/left/width/height`, for performance.
Relative values: `'+=100'`, `'-=50%'`. Function-based values: `x: (i, el) => i * 50`.
Random: `x: 'random(-100, 100, 5)'`.

Eases: `none`, `power1-4`, `sine`, `expo`, `circ`, `back(1.7)`, `elastic(1, 0.3)`,
`bounce`, `steps(5)` — each with `.in`, `.out`, `.inOut`. Custom: `CustomEase.create('name', 'M0,0 C…')`.

Defaults: `gsap.defaults({ ease: 'power2.out', duration: 0.6 })`.

Tween/timeline control: `.play()`, `.pause()`, `.resume()`, `.reverse()`, `.restart()`,
`.seek(t)`, `.progress(0-1)`, `.timeScale(n)`, `.kill()`, `.revert()`, `.then()`.

## Timelines

```js
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power3.out' }, paused: false })

tl.from('.title', { y: 60, autoAlpha: 0 })
  .from('.subtitle', { y: 30, autoAlpha: 0 }, '-=0.3')  // overlap 0.3s
  .from('.cta', { scale: 0.8, autoAlpha: 0 }, '<')        // same start as previous
  .addLabel('end')
  .to('.hero', { backgroundColor: '#111' }, 'end+=0.2')
```

Position parameter: absolute `1.5`, `'+=0.5'` / `'-=0.5'` (relative to timeline end),
`'<'` (start of previous), `'>'` (end of previous), `'<0.2'`, `'label'`, `'label+=1'`.
Nest timelines with `master.add(childTl, '<')`. Prefer one timeline over chained `delay`s.

## Utilities

- `gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })` → fast setter for mouse followers.
- `gsap.quickSetter(el, 'x', 'px')` → no tween, raw per-frame setting.
- `gsap.utils`: `toArray`, `clamp`, `mapRange`, `interpolate`, `snap`, `wrap`, `random`,
  `distribute`, `selector`, `pipe`, `normalize`, `splitColor`.
- `gsap.ticker.add(fn)` / `.remove(fn)` — GSAP's RAF loop (time in **seconds**).
- `gsap.context(() => {…}, scopeEl)` → collects everything created inside; `ctx.revert()` cleans up.
- `gsap.matchMedia()` → responsive / reduced-motion animations (see below).

## ScrollTrigger

```js
gsap.registerPlugin(ScrollTrigger)

// tween with scroll trigger
gsap.from('.card', {
  y: 80, autoAlpha: 0, stagger: 0.15,
  scrollTrigger: {
    trigger: '.cards',
    start: 'top 80%',            // "<trigger edge> <viewport edge>"
    end: 'bottom 20%',
    toggleActions: 'play none none reverse', // onEnter onLeave onEnterBack onLeaveBack
    // markers: true,            // dev only
  },
})

// pinned, scrubbed timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.panel',
    start: 'top top',
    end: '+=2000',               // scroll distance in px
    pin: true,
    scrub: 1,                    // true or seconds of smoothing
    snap: { snapTo: 'labels', duration: 0.3 },
  },
})
tl.to('.panel img', { scale: 1.3 }).to('.panel h2', { y: -100 }, '<')

// standalone
ScrollTrigger.create({
  trigger: '#section', start: 'top center', end: 'bottom center',
  toggleClass: { targets: 'body', className: 'is-dark' },
  onEnter: (self) => {}, onLeave: () => {}, onUpdate: (self) => self.progress,
})

// batch for many items
ScrollTrigger.batch('.item', { onEnter: (els) => gsap.to(els, { autoAlpha: 1, stagger: 0.1 }) })
```

Key options: `trigger`, `start`, `end`, `scrub`, `pin`, `pinSpacing`, `anticipatePin`,
`markers`, `toggleActions`, `toggleClass`, `snap`, `once`, `scroller` (custom scroll
container), `horizontal`, `invalidateOnRefresh` (with function-based values),
`containerAnimation` (triggers inside a horizontal-scroll tween), `fastScrollEnd`,
`preventOverlaps`, `id`.

Static: `ScrollTrigger.refresh()` (after layout/images/fonts change), `.getAll()`,
`.getById()`, `.killAll()`, `.update()`, `.normalizeScroll(true)` (mobile address-bar issues),
`.config({ ignoreMobileResize: true })`, `.scrollerProxy()` (third-party scrollers).

Horizontal scroll section:

```js
const sections = gsap.utils.toArray('.h-panel')
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.h-wrapper', pin: true, scrub: 1,
    end: () => '+=' + document.querySelector('.h-wrapper').offsetWidth,
    invalidateOnRefresh: true,
  },
})
```

Rules: create ScrollTriggers **top-to-bottom in page order** (or set `refreshPriority`);
use `ease: 'none'` for scrubbed linear motion; never put `scrollTrigger` on tweens nested
inside a timeline — put it on the timeline; don't animate the pinned element itself, animate its children.

### With Lenis smooth scroll (see the `lenis` skill)

```js
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

Use **either** Lenis **or** ScrollSmoother, not both.

### ScrollSmoother

Requires `#smooth-wrapper > #smooth-content` markup; fixed elements must be outside the wrapper.

```js
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.2, effects: true })
// <img data-speed="0.8"> / <div data-lag="0.3"> for parallax with effects: true
```

## SplitText (rewritten in 3.13)

```js
gsap.registerPlugin(SplitText)

document.fonts.ready.then(() => {           // split after fonts load
  SplitText.create('.headline', {
    type: 'lines, words, chars',
    mask: 'lines',                            // overflow-clip wrappers for reveal effects
    autoSplit: true,                          // re-split on resize/font load
    aria: 'auto',                             // keeps text accessible (default)
    onSplit(self) {
      return gsap.from(self.lines, { yPercent: 100, stagger: 0.08, duration: 0.8, ease: 'expo.out' })
    },
  })
})
```

`self.chars`, `self.words`, `self.lines`, `self.revert()`. With `autoSplit`, return the
animation from `onSplit` so it is reverted/recreated correctly.

## Other plugins (quick reference)

```js
// Flip — animate layout changes
const state = Flip.getState('.item')
container.classList.toggle('grid')           // change DOM/layout
Flip.from(state, { duration: 0.6, ease: 'power2.inOut', absolute: true, stagger: 0.05 })

// Draggable (+ InertiaPlugin for throw)
Draggable.create('.knob', { type: 'rotation', inertia: true, bounds: '.area' })

// ScrollToPlugin
gsap.to(window, { scrollTo: { y: '#contact', offsetY: 80 }, duration: 1 })

// MotionPathPlugin
gsap.to('.dot', { motionPath: { path: '#path', align: '#path', autoRotate: true, alignOrigin: [0.5, 0.5] }, duration: 3 })

// DrawSVGPlugin
gsap.from('path', { drawSVG: 0, duration: 2 })     // '0% 100%' etc.

// MorphSVGPlugin
gsap.to('#circle', { morphSVG: '#star', duration: 1 })

// Observer — unified wheel/touch/pointer events (fullpage-style sections)
Observer.create({ target: window, type: 'wheel,touch', onDown: next, onUp: prev, tolerance: 10, preventDefault: true })

// ScrambleText / Text
gsap.to('.label', { scrambleText: { text: 'Hello', chars: 'upperCase' }, duration: 1 })
```

## React / Next.js (`@gsap/react`)

```jsx
'use client' // Next.js App Router
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Hero() {
  const container = useRef(null)

  // runs once (like useEffect(fn, [])), auto-reverts on unmount, StrictMode-safe
  useGSAP(() => {
    gsap.from('.title', { y: 60, autoAlpha: 0 })         // selector scoped to container
    gsap.to('.bg', { yPercent: 30, ease: 'none', scrollTrigger: { trigger: container.current, scrub: true } })
  }, { scope: container })

  // event handlers / timeouts created later must be wrapped in contextSafe
  const { contextSafe } = useGSAP({ scope: container })
  const onClick = contextSafe(() => gsap.to('.title', { rotation: '+=360' }))

  return (
    <section ref={container}>
      <h1 className="title" onClick={onClick}>Hallo</h1>
      <div className="bg" />
    </section>
  )
}
```

- `useGSAP(fn, { scope, dependencies: [x], revertOnUpdate: true })`; callback signature
  `(context, contextSafe) => cleanup?`.
- Use `useGSAP` instead of `useEffect`/`useLayoutEffect` — it wraps `gsap.context()` and
  uses `useLayoutEffect` client-side, `useEffect` on the server (SSR-safe).
- Remove manually added event listeners in the returned cleanup function.
- Use refs or scoped selectors; never global selectors that hit other components.
- Next.js: GSAP code only in client components; call `ScrollTrigger.refresh()` after
  route changes / content loads if positions are off.

Vue / Nuxt: create animations in `onMounted` inside `gsap.context(() => {…}, rootRef.value)`
and call `ctx.revert()` in `onUnmounted`.

## Responsive & accessibility — `gsap.matchMedia()`

```js
const mm = gsap.matchMedia()
mm.add(
  {
    isDesktop: '(min-width: 800px)',
    isMobile: '(max-width: 799px)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  },
  (ctx) => {
    const { isDesktop, reduceMotion } = ctx.conditions
    gsap.to('.box', {
      x: isDesktop ? 400 : 100,
      duration: reduceMotion ? 0 : 1,
      scrollTrigger: isDesktop ? { trigger: '.box', scrub: true } : undefined,
    })
    return () => {}  // optional cleanup; animations auto-revert when the query stops matching
  }
)
```

Always respect `prefers-reduced-motion` for large movement, parallax and auto-playing loops.

## Avoiding FOUC

Hide elements that animate in from invisible until JS runs:

```css
.reveal { visibility: hidden; }
```
```js
gsap.fromTo('.reveal', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 })
```

## Troubleshooting

- **Plugin does nothing / "not registered" warning** → missing `gsap.registerPlugin(...)`.
- **`from()` animations jump or end at wrong values in React** → StrictMode double-invoke;
  use `useGSAP` (or `gsap.context` + `revert()`), not raw `useEffect`.
- **ScrollTrigger start/end wrong** → layout changed after creation (images, fonts, lazy
  content): call `ScrollTrigger.refresh()`; create triggers in page order; check with `markers: true`.
- **Pin jumps / content overlaps** → keep `pinSpacing` (default true), add `anticipatePin: 1`,
  don't pin elements inside flex/transformed parents without `pinReparent`.
- **Mobile jitter / address-bar resize** → `ScrollTrigger.config({ ignoreMobileResize: true })`
  or `ScrollTrigger.normalizeScroll(true)`.
- **Conflicting tweens on same property** → `overwrite: 'auto'` or kill the previous tween.
- **CSS transitions fight GSAP** → remove `transition` on properties GSAP animates.
- **Animation invisible on SVG** → use `transformOrigin` / `svgOrigin`, and check `drawSVG` needs a stroke.
- Debug: `markers: true`, `GSDevTools.create()`, `gsap.globalTimeline.timeScale(0.2)`.
