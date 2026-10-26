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

The site is a single-page app. When hosting it, rewrite all paths to `index.html`
(`public/_redirects` for Netlify and `vercel.json` for Vercel are included).

### Draft mode

By default the build is a **design draft**: an orange banner (EN/EL/RU) says orders and logins are not active
yet, and `<meta name="robots" content="noindex, nofollow">` keeps search engines from indexing it. For the real
launch, set the environment variable `VITE_PREVIEW=false` (e.g. in Vercel → Project → Settings → Environment
Variables) and redeploy — banner and noindex disappear.

## Kept 1:1 from the current site

- **Colours**: primary orange `#f68000`, brand black `#0b0b0b`, top bar `#030303`, accent `#ffeede`,
  muted `#f2f2f2`, border `#e1e1e1` (see `@theme` in `src/index.css`)
- **Structure**: top bar (phone, email, EN/ΕΛ/RU) → header (logo, search, Wholesale, Login, cart) → black main
  nav → orange category bar → hero slider (Samsung, Xiaomi, Repair, iPhone) → Shop by category → New / Used /
  iPad products → footer with Wolt links
- **Pages**: Home, Shop, Category, Product, Cart, Repairs, About, Contact, Wholesale, Login, Terms, Privacy,
  Cookies, Shipping & Returns, GDPR, Shipping, Payment
- **Content**: texts, stores (Zinas Kanther 2 Limassol, Georgiou A 14 Germasogeia), phone, email, Wolt venues,
  product ribbons (In stock / Used / Pulled / Service Pack / Original / Out of stock), legal texts, cookie consent,
  WhatsApp button

## Improved

- Orange category bar no longer overflows the page — it scrolls with arrows
- Sticky header with search, cart badge and "added to cart" toast
- Animated hero slider (autoplay with progress, swipe on mobile), repair slide with its own graphic
- Category tiles with icons, USP bar, repair band, wholesale band with Vanta NET background, Wolt band
- Shop: sidebar filters (category, brand, price, in stock, search, sort), mobile filter sheet
- Product page: quantity, WhatsApp enquiry, share buttons, similar products
- Cart page with free-shipping progress (€60)
- Full EN / ΕΛ / RU UI translation (Russian was mostly untranslated on the current site)
- Lenis smooth scroll synced with GSAP ScrollTrigger reveals; respects `prefers-reduced-motion`
- Mobile-first, tested at 390 px and 1440 px

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
src/components/         Header, Footer, HeroSlider, ProductCard, Motion (Lenis/GSAP), VantaNet, Overlays, Icon
src/pages/              Home, Shop, Product, Cart, Info (Repairs/About/Contact/Wholesale/Login), Legal, NotFound
public/                 logo, Wolt logo, hero images, product images (from easyfixcy.com)
.claude/skills/         lenis, gsap, vanta, ui-ux-pro-max
```
