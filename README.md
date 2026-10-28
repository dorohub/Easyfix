# EasyFix Cyprus — new website (redesign)

Redesign of [easyfixcy.com](https://easyfixcy.com): same structure, content and brand colours, rebuilt with a
modern UI, smooth scrolling and animations.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve dist/
```

To look at it on your phone in the same Wi-Fi, run `npm run dev -- --host` and open the "Network" address it
prints.

The site is a single-page app. When hosting it, rewrite all paths to `index.html`
(`public/_redirects` for Netlify and `vercel.json` for Vercel are included).

### Offline mode on Vercel (current state)

The site is **local only** right now: `vercel.json` overrides the Vercel build with
`scripts/offline-build.mjs`, so the Vercel URL (easyfix-delta.vercel.app) only shows a small "This page is
offline" placeholder with `noindex`. Local `npm run dev` / `npm run build` are not affected.

To put it back online, delete the `installCommand` and `buildCommand` lines from `vercel.json`
(Vercel's Vite preset then runs `npm install` and `npm run build` again) and push.

### Draft mode

By default the build is a **design draft**: a slim banner (EN/EL/RU) says orders and logins are not active
yet, and `<meta name="robots" content="noindex, nofollow">` keeps search engines from indexing it. For the real
launch, set the environment variable `VITE_PREVIEW=false` (e.g. in Vercel → Project → Settings → Environment
Variables) and redeploy — banner and noindex disappear.

## Kept from the current site

- **Colours**: primary orange `#f68000`, brand black `#0b0b0b`, accent `#ffeede`, muted `#f2f2f2`,
  border `#e1e1e1` (see `@theme` in `src/index.css`) — orange stays the only accent colour
- **Pages**: Home, Shop, Category, Product, Cart, Repairs, About, Contact, Wholesale, Login, Terms, Privacy,
  Cookies, Shipping & Returns, GDPR, Shipping, Payment
- **Content**: hero messages (Samsung, Xiaomi, Repair, iPhone), categories, New / Used / iPad product sections,
  stores (Zinas Kanther 2 Limassol, Georgiou A 14 Germasogeia), phone, email, Wolt venues, product states
  (In stock / Used / Pulled / Service Pack / Original / Out of stock), legal texts, cookie consent, WhatsApp button

## Design — Apple-level redesign

Direction from the `ui-ux-pro-max` skill ("Liquid Glass", Inter type scale, max. one pinned scroll section):

- **One slim glass navigation bar** (replaces top bar + header + black nav + orange category bar):
  "Shop" opens a full-width mega menu with all categories, a search layer with popular searches, cart badge,
  EN/ΕΛ/RU switch; full-screen menu on phones; thin info ribbon (free shipping / same-day repairs) below
- **Hero**: big statement headline, iPhone line-up that zooms as you scroll
- **Home**: category icon rail, swipeable promo cards (the four slides of the current site), swipeable product
  rails, "Why EasyFix" bento grid, one pinned statement whose words light up while scrolling, dark repair
  section, wholesale card with Vanta NET background, store cards
- **Product cards**: large white cards, small text badge instead of corner ribbons, round "+" add button
- **Shop**: big title, category chips, slim filter sidebar (brand, price, in stock, search, sort), mobile sheet
- **Product page**: Apple-style buy layout — sticky image, price, condition/stock box, quantity + add to cart,
  WhatsApp enquiry, delivery & warranty info, share links, similar-products rail
- Light Apple-style footer, glass cookie banner and "added to cart" toast
- Lenis smooth scroll synced with GSAP ScrollTrigger; everything respects `prefers-reduced-motion`
- Full EN / ΕΛ / RU UI translation; nav labels fit on one line in all three languages
- Tested at 390 px, 1024 px, 1280 px and 1440 px — no console errors, no horizontal scrolling

## Data — what is real and what still needs the backend

`src/data/products.json` holds the **30 products that are publicly listed on the current homepage** (names, brands,
displayed prices, ribbons, images). The live shop has ~3,000 products in the EasyFix Supabase project
(tables `products`, `categories`, `product_categories`).

To go live, replace the functions in `src/lib/catalog.js` with Supabase queries using the project URL and anon key
**provided by the client / Cydigitalnet** — the components only depend on the object shape documented there.
Also still to connect: checkout & payments, login / sign-up, wholesale pricing, contact form (currently opens the
mail client), exact stock counts, Greek product names (`name_el`), and Greek/Russian legal texts.

## Files

```
src/main.jsx            routes + providers
src/index.css           Tailwind v4 theme (brand colours) + utilities
src/i18n.jsx            EN / EL / RU dictionary + language switch
src/data/site.js        contact, stores, categories, hero slides
src/data/products.json  products from the current homepage
src/data/legal.js       legal page texts
src/lib/catalog.js      data access (swap for Supabase)
src/lib/cart.jsx        cart state (localStorage)
src/components/         Header (nav, mega menu, search), Footer, ProductCard, Rail, Motion (Lenis/GSAP), VantaNet, Overlays, Icon
src/pages/              Home, Shop, Product, Cart, Info (Repairs/About/Contact/Wholesale/Login), Legal, NotFound
public/                 logo, Wolt logo, hero images, product images (from easyfixcy.com)
.claude/skills/         lenis, gsap, vanta, ui-ux-pro-max
```
