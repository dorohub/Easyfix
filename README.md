# Easyfix — website & shop (design preview)

Clickable one-page design preview for **Easyfix Cyprus** (phone, tablet & laptop repair + accessories shop).
English only for now. All prices, products, reviews and contact details are **placeholders** (see the banner
at the top of the page).

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve dist/
```

## What's in it

| Section | Tech |
|---|---|
| Hero with animated network background | Vanta.js NET (three.js r134, lazy-loaded) |
| Headline reveal, section reveals, counters | GSAP + SplitText + ScrollTrigger |
| Instant repair quote (brand → model → issue → price) | `src/data.js` → `catalog` |
| Brand marquee | GSAP |
| "How it works" — pinned horizontal scroll on desktop | ScrollTrigger `pin` + `containerAnimation` |
| Shop grid with category filter | GSAP Flip |
| Cart drawer (localStorage) | `src/cart.js` |
| FAQ accordion, contact, footer | — |
| Smooth scrolling + anchor links | Lenis, synced to the GSAP ticker |

Respects `prefers-reduced-motion` (no Vanta, no scroll effects, instant counters). Mobile-first, tested at
390 px and 1440 px.

## Files

```
index.html          page structure
src/main.js         Lenis/GSAP setup, rendering, quote widget, shop filter, FAQ, motion
src/cart.js         cart state + drawer
src/data.js         ALL placeholder content — prices, services, products, reviews, FAQ
src/icons.js        inline SVG icons
src/styles.css      design tokens + styles
.claude/skills/     lenis, gsap, vanta skills for Claude Code
```

## Before launch — needed from the client

- Logo, brand colours, real photos (shop, team, repairs)
- Real repair price list per model, opening hours, address, phone, WhatsApp, email
- Product catalogue (names, photos, prices, stock)
- Real Google reviews (with permission) — the review cards are layout samples only
- Legal: Privacy policy, Terms, cookie consent (GDPR), company details

## Next phase

1. Client feedback on this preview
2. Pick the shop backend (e.g. Shopify headless, Medusa or WooCommerce) — the cart and quote widget are
   built so their data source can be swapped
3. Real booking flow (calendar / WhatsApp / email), checkout, payments (cards, Apple Pay, Google Pay)
4. Greek / Russian translations if wanted, SEO (local business schema), analytics with consent
