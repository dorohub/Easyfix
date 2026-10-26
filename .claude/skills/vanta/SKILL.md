---
name: vanta
description: Animated 3D/WebGL website backgrounds with Vanta.js (vantajs.com) — BIRDS, FOG, WAVES, CLOUDS, CLOUDS2, GLOBE, NET, CELLS, TRUNK, TOPOLOGY, DOTS, RINGS, HALO, RIPPLE — via three.js or p5.js, in plain HTML, React/Next.js or Vue. Use whenever adding, configuring, theming or debugging an animated hero/section background. Triggers on "vanta", "vantajs", "VANTA.", "animated background", "3D background", "hero background", "WebGL background", "birds/fog/waves/net/globe background".
---

# Vanta.js — animated 3D backgrounds

Reference: https://www.vantajs.com (live configurator — copy options from there) ·
https://github.com/tengbao/vanta · npm `vanta` **0.5.24** (MIT).

Vanta injects a `<canvas>` as the first child of an element; the element's other children
stay in front. Each effect is a separate file. It only renders while the element is on
screen (`isOnScreen()`), unless `forceAnimate: true`.

## Effects and their renderer

| Effect | File | Needs | Effect-specific options (defaults) |
|---|---|---|---|
| `BIRDS` | `vanta.birds.min.js` | three | `backgroundColor 0x07192f`, `color1 0xff0000`, `color2 0x00d1ff`, `colorMode 'varianceGradient'` (`'lerp'`, `'variance'`, `'lerpGradient'`), `birdSize 1`, `wingSpan 30`, `speedLimit 5`, `separation 20`, `alignment 20`, `cohesion 20`, `quantity 5` (2–5) |
| `FOG` | `vanta.fog.min.js` | three | `highlightColor 0xffc300`, `midtoneColor 0xff1f00`, `lowlightColor 0x2d00ff`, `baseColor 0xffebeb`, `blurFactor 0.6`, `speed 1`, `zoom 1`, `scale 2`, `scaleMobile 4` |
| `WAVES` | `vanta.waves.min.js` | three | `color 0x005588`, `shininess 30`, `waveHeight 15`, `waveSpeed 1`, `zoom 1` |
| `CLOUDS` | `vanta.clouds.min.js` | three | `backgroundColor 0xffffff`, `skyColor 0x68b8d7`, `cloudColor 0xadc1de`, `cloudShadowColor 0x183550`, `sunColor 0xff9919`, `sunGlareColor 0xff6633`, `sunlightColor 0xff9933`, `speed 1`, `scale 3`, `scaleMobile 12` |
| `CLOUDS2` | `vanta.clouds2.min.js` | three | `backgroundColor 0x000000`, `skyColor 0x5ca6ca`, `cloudColor 0x334d80`, `lightColor 0xffffff`, `speed 1`, `texturePath './gallery/noise.png'` (**host the noise texture yourself**), `scaleMobile 4` |
| `GLOBE` | `vanta.globe.min.js` | three | `color 0xff3f81`, `color2 0xffffff`, `size 1`, `backgroundColor 0x23153c` |
| `NET` | `vanta.net.min.js` | three | `color 0xff3f81`, `backgroundColor 0x23153c`, `points 10`, `maxDistance 20`, `spacing 15`, `showDots true` |
| `CELLS` | `vanta.cells.min.js` | three | `color1 0x008c8c`, `color2 0xf2e735`, `size 1.5`, `speed 1`, `scaleMobile 3` |
| `RIPPLE` | `vanta.ripple.min.js` | three | `color1 0x060b25`, `color2 0xffffff`, `backgroundColor 0xf6f6f6`, `amplitudeFactor 1`, `ringFactor 4`, `rotationFactor 0.1`, `speed 1`, `scaleMobile 4` |
| `HALO` | `vanta.halo.min.js` | three | `baseColor 0x001a59`, `color2 0xf2e735`, `backgroundColor 0x131a43`, `amplitudeFactor 1`, `ringFactor 1`, `rotationFactor 1`, `xOffset 0`, `yOffset 0`, `size 1`, `speed 1` |
| `DOTS` | `vanta.dots.min.js` | three | `color 0xff8820`, `color2 0xff8820`, `backgroundColor 0x222222`, `size 3`, `spacing 35`, `showLines true` |
| `RINGS` | `vanta.rings.min.js` | three | `backgroundColor 0x202428`, `color 0x88ff00` |
| `TRUNK` | `vanta.trunk.min.js` | **p5** | `color 0x98465f`, `backgroundColor 0x222426`, `spacing 0`, `chaos 1` |
| `TOPOLOGY` | `vanta.topology.min.js` | **p5** | `color 0x89964e`, `backgroundColor 0x002222` |

## Common options (all effects)

| Option | Default | Notes |
|---|---|---|
| `el` | — | Selector or `HTMLElement` (required). Passing a string as the only arg = `el`. |
| `mouseControls` | `true` | React to mouse (effect-dependent) |
| `touchControls` | `true` | React to touch |
| `gyroControls` | `false` | Device tilt mimics mouse |
| `minHeight` | `200` | px |
| `minWidth` | `200` | px |
| `scale` | `1` | Render scale; higher = fewer pixels = faster |
| `scaleMobile` | `1` | Scale on mobile (many effects override this, see table) |
| `backgroundColor` | effect | Hex **number** (`0x1a1a2e`), not a CSS string |
| `backgroundAlpha` | `1` | 0–1, `0` makes the canvas background transparent (three effects) |
| `forceAnimate` | `false` | Keep animating when off screen |
| `THREE` / `p5` | `window.THREE` / `window.p5` | Pass your own library instance (bundlers) |

Colors are **hex numbers**: `0xff3f81`. Convert CSS hex with `parseInt('#ff3f81'.slice(1), 16)`.

## API

```js
const effect = VANTA.NET({ el: '#hero', color: 0x3fa9ff })
effect.setOptions({ color: 0xff3f81, points: 12 }) // live update (e.g. theme switch)
effect.resize()                                     // after container size changes without window resize
effect.destroy()                                    // remove canvas, listeners, RAF — always on cleanup
```

## three.js version — important

Vanta 0.5.24 is built and tested against **three.js r134** (the version its docs use).
Newer three releases removed APIs Vanta relies on (e.g. `THREE.RGBFormat`, used by HALO,
was removed in r137) and changed color management, so effects can break or look different.
**Pin three to r134** for Vanta: CDN `three.js/r134` or `npm i three@0.134.0`. If the
project already uses a newer three elsewhere, load r134 only for Vanta (script tag →
`window.THREE`, or an npm alias `"three-vanta": "npm:three@0.134.0"` passed via `THREE:`).
p5 effects: use p5 1.x.

## Plain HTML (CDN)

```html
<section id="hero" style="min-height:100vh">
  <h1>Easyfix</h1>  <!-- stays above the canvas -->
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"></script>
<script>
  VANTA.NET({
    el: '#hero',
    mouseControls: true, touchControls: true, gyroControls: false,
    minHeight: 200, minWidth: 200, scale: 1, scaleMobile: 1,
    color: 0x3fa9ff, backgroundColor: 0x0b1020, points: 10, maxDistance: 22, spacing: 16,
  })
</script>
```

p5 effects:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.topology.min.js"></script>
<script>VANTA.TOPOLOGY({ el: '#hero', color: 0x89964e, backgroundColor: 0x002222 })</script>
```

Always pin the Vanta version in CDN URLs (`vanta@0.5.24`).

## npm / bundler

```bash
npm i vanta three@0.134.0     # or p5 for TRUNK / TOPOLOGY
```

```js
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'

const effect = NET({ el: document.querySelector('#hero'), THREE, color: 0x3fa9ff })
```

## React / Next.js

Vanta touches `window`, so it must run client-side only.

```jsx
'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'

export function VantaHero({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return // keep the static CSS background instead
    const effect = NET({
      el: ref.current,
      THREE,
      color: 0x3fa9ff,
      backgroundColor: 0x0b1020,
      scaleMobile: 1,
    })
    return () => effect.destroy() // StrictMode-safe: destroy on every unmount
  }, [])

  return (
    <section ref={ref} style={{ minHeight: '100vh', backgroundColor: '#0b1020' }}>
      {children}
    </section>
  )
}
```

- Use the effect-in-`useEffect` + `destroy()` pattern above; the README's
  `useState(vantaEffect)` variant leaks a second instance under React StrictMode.
- Next.js: if the vanta import itself fails on the server, load the component with
  `dynamic(() => import('./VantaHero'), { ssr: false })`.
- Theme switch: keep the instance in a ref and call `effect.setOptions({...})` instead of recreating.

## Vue 3

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import WAVES from 'vanta/dist/vanta.waves.min'

const el = ref(null)
let effect
onMounted(() => { effect = WAVES({ el: el.value, THREE, color: 0x005588 }) })
onBeforeUnmount(() => effect?.destroy())
</script>

<template><section ref="el" class="hero"><slot /></section></template>
```

Nuxt: wrap in `<ClientOnly>` or use a `.client.vue` component.

## Best practices

- **One** Vanta instance per page where possible; WebGL contexts are limited (~8–16 per page)
  and each effect costs GPU/battery. Destroy on route change.
- Give the container an explicit height (`min-height: 100vh`) and a **static CSS background
  color matching `backgroundColor`** as fallback (no WebGL, reduced motion, loading).
- Respect `prefers-reduced-motion`: skip init or use a static image.
- Performance on mobile: raise `scale`/`scaleMobile` (e.g. 2–4) for shader effects
  (FOG, CLOUDS, CELLS, RIPPLE, HALO), lower `points`/`quantity` for NET/BIRDS, or disable on small screens.
- Keep text readable: add a semi-transparent overlay or text-shadow over busy effects.
- With GSAP/Lenis (see `gsap` and `lenis` skills): Vanta runs its own RAF loop — no sync
  needed. To fade it on scroll, animate the container's `opacity`, not the canvas internals.
  Call `effect.resize()` if a ScrollTrigger pin/scale changes the container size.

## Troubleshooting

- **`THREE is not defined` / `p5 is not defined`** → load three/p5 *before* the effect
  script, or pass `THREE` / `p5` in options.
- **Blank or black canvas, console errors about missing three members** → three.js too
  new; pin r134.
- **Canvas covers content** → content must be inside the Vanta element (children render
  above); don't give children `position: static` + negative z-index; check your own z-index.
- **Wrong size / gap at bottom** → container has no height, or it changed size without a
  window resize → `effect.resize()`.
- **CLOUDS2 shows nothing** → `texturePath` points at a missing noise image; host it and set the path.
- **Duplicate canvases in React** → missing `destroy()` cleanup or StrictMode double mount.
- **Animation stops when scrolled away** → expected (off-screen pause); `forceAnimate: true` to override.
- **Colors ignored** → pass hex numbers (`0xff0000`), not `'#ff0000'`.
