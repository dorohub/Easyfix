import { useRef } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLang } from '../i18n.jsx'
import { categories, contact, heroSlides, stores } from '../data/site.js'
import { getProducts } from '../lib/catalog.js'
import ProductCard from '../components/ProductCard.jsx'
import Rail, { SectionTitle } from '../components/Rail.jsx'
import VantaNet from '../components/VantaNet.jsx'
import Icon, { WhatsAppGlyph } from '../components/Icon.jsx'
import { Reveal, prefersReducedMotion } from '../components/Motion.jsx'

/* ——— Hero: big statement, product line-up that grows as you scroll ——— */
function Hero() {
  const { t } = useLang()
  const h = t.home
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
      intro
        .from('[data-hero-line]', { yPercent: 110, duration: 1.3, stagger: 0.12 })
        .from('[data-hero-fade]', { y: 16, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.45)
        .from('[data-hero-img]', { y: 80, scale: 0.94, autoAlpha: 0, duration: 1.8 }, 0.2)

      gsap.to('[data-hero-copy]', {
        yPercent: -30,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '55% top', scrub: true },
      })
      gsap.fromTo(
        '[data-hero-img] img',
        { scale: 1 },
        { scale: 1.16, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } }
      )
    },
    { scope: root }
  )

  return (
    <section ref={root} className="relative isolate overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute top-[38%] left-1/2 -z-10 size-[min(1100px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(246_128_0/0.22),transparent_62%)]" />
      <div data-hero-copy className="container-x relative z-10 pt-16 text-center sm:pt-24">
        <p data-hero-fade className="eyebrow">{h.heroEyebrow}</p>
        <h1 className="display-xl mt-4">
          <span className="block overflow-hidden pb-[0.06em]"><span data-hero-line className="block">{h.heroTitle[0]}</span></span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-hero-line className="block bg-gradient-to-r from-[#ffb15c] via-primary to-[#ff6a00] bg-clip-text text-transparent">{h.heroTitle[1]}</span>
          </span>
        </h1>
        <p data-hero-fade className="lead mx-auto mt-6 max-w-xl text-white/70">{h.heroText}</p>
        <div data-hero-fade className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <Link to="/shop" className="btn-primary px-7 py-3.5 text-[16px]">{t.shopNow}</Link>
          <Link to="/repairs" className="link-arrow text-[16px] text-primary">
            {h.heroCta2}
            <Icon name="chevronRight" size={16} />
          </Link>
        </div>
      </div>
      <div data-hero-img className="relative mx-auto mt-6 w-full max-w-[1500px] sm:-mt-4">
        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]">
          <img src="/hero/iphone.jpg" alt="iPhone line-up at EasyFix Limassol" className="mx-auto aspect-[16/9] w-full object-cover" fetchPriority="high" />
        </div>
      </div>
    </section>
  )
}

/* ——— Store nav: category icons ——— */
function StoreNav() {
  const { t, pick } = useLang()
  return (
    <section className="pt-16 sm:pt-24">
      <div className="container-x">
        <SectionTitle parts={t.home.storeTitle} />
      </div>
      <Rail label={t.categoriesLabel} className="mt-8">
        {categories.map((c) => (
          <Link key={c.slug} to={`/category/${c.slug}`} className="group flex w-[104px] shrink-0 snap-start flex-col items-center gap-3 text-center sm:w-[118px]" data-reveal-item>
            <span className="grid size-[84px] place-items-center rounded-[26px] bg-muted text-brand transition duration-500 ease-(--ease-out-expo) group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-fg sm:size-[96px]">
              <Icon name={c.icon} size={34} strokeWidth={1.5} />
            </span>
            <span className="text-[13px] leading-tight font-semibold">{pick(c.name)}</span>
          </Link>
        ))}
      </Rail>
    </section>
  )
}

/* ——— Promo cards (the four slides of the current site) ——— */
function PromoCard({ slide }) {
  const { t, pick } = useLang()
  const repair = !slide.image
  return (
    <Link
      to={slide.to}
      className="group relative flex h-[480px] w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-card)] bg-brand text-white shadow-[var(--shadow-card)] sm:h-[520px] sm:w-[400px]"
      data-reveal-item
    >
      {slide.image ? (
        <img src={slide.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover object-center transition duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-[1.06]" />
      ) : (
        <div className="absolute inset-0">
          <div className="absolute -right-24 -bottom-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(246_128_0/0.45),transparent_62%)] transition duration-700 group-hover:scale-110" />
          <Icon name="wrench" size={220} strokeWidth={0.8} className="absolute right-[-30px] bottom-6 text-primary/80 transition duration-700 ease-(--ease-out-expo) group-hover:-rotate-12" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />
      <div className="relative p-7 sm:p-8">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-primary">{slide.eyebrow}</p>
        <h3 className="mt-2 text-[28px] leading-[1.08] font-bold tracking-[-0.03em]">
          {pick(slide.title)} <span className="text-primary">{pick(slide.accent)}</span>
        </h3>
        <p className="mt-2 text-[15px] text-white/75">{pick(slide.lead)}</p>
      </div>
      <span className="relative mt-auto mr-6 mb-6 ml-auto grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-primary group-hover:text-primary-fg" aria-hidden="true">
        <Icon name={repair ? 'wrench' : 'plus'} size={18} />
      </span>
    </Link>
  )
}

/* ——— Bento: reasons to shop ——— */
function Bento() {
  const { t } = useLang()
  const icons = ['shield', 'truck', 'rotate', 'wrench', 'store', 'bolt']
  const span = ['col-span-2', '', '', '', '', 'col-span-2']
  return (
    <section className="bg-muted py-16 sm:py-24">
      <div className="container-x">
        <SectionTitle parts={t.home.whyTitle} />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {t.home.bento.map(([big, title, text], i) => (
            <div
              key={title}
              data-reveal-item
              className={`relative flex min-h-[180px] flex-col justify-between gap-8 overflow-hidden rounded-[var(--radius-card)] p-5 sm:min-h-[240px] sm:gap-10 sm:p-8 ${span[i]} ${
                i === 0 ? 'bg-brand text-white' : i === 5 ? 'bg-primary text-primary-fg' : 'bg-white'
              }`}
            >
              <Icon name={icons[i]} size={26} className={i === 0 ? 'text-primary' : i === 5 ? 'text-primary-fg' : 'text-primary'} />
              <div>
                <p className={`font-bold tracking-[-0.045em] ${i === 0 || i === 5 ? 'text-[56px] leading-none sm:text-[88px]' : 'text-[30px] leading-none sm:text-[44px]'}`}>{big}</p>
                <p className="mt-3 text-[15px] font-semibold sm:text-[17px]">{title}</p>
                <p className={`mt-1 text-[13px] leading-snug sm:text-[15px] ${i === 0 ? 'text-white/65' : i === 5 ? 'text-primary-fg/75' : 'text-muted-fg'}`}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ——— Pinned statement: words light up while scrolling ——— */
function Statement() {
  const { t } = useLang()
  const root = useRef(null)
  const words = t.home.statement.split(' ')
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=120%', scrub: 0.6, pin: true, anticipatePin: 1 },
        }
      )
    },
    { scope: root, dependencies: [t.home.statement], revertOnUpdate: true }
  )
  return (
    <section ref={root} className="flex min-h-[100svh] items-center bg-white">
      <p className="container-x display-lg max-w-5xl">
        {words.map((w, i) => (
          <span key={i} data-word className={/stores|καταστήματα|магазина|Limassol|Λεμεσό|Лимасоле/i.test(w) ? 'text-primary' : ''}>
            {w}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}

/* ——— Repair ——— */
function RepairSection() {
  const { t } = useLang()
  const icons = ['screen', 'battery', 'port', 'water']
  return (
    <section className="relative overflow-hidden bg-brand py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-[700px] rounded-full bg-[radial-gradient(circle,rgb(246_128_0/0.25),transparent_62%)]" />
      <div className="container-x relative">
        <SectionTitle parts={t.home.repairTitle} dark />
        <p className="lead mt-5 max-w-2xl text-white/65" data-reveal>{t.repairs.lead}</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.repairs.services.map(([title, text], i) => (
            <div key={title} className="rounded-[var(--radius-card)] bg-white/[0.06] p-7 ring-1 ring-white/10 transition duration-500 hover:bg-white/[0.1]" data-reveal-item>
              <Icon name={icons[i]} size={30} strokeWidth={1.5} className="text-primary" />
              <h3 className="mt-8 text-[19px] font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal>
          <Link to="/repairs" className="btn-primary px-7 py-3.5 text-[16px]">{t.repairBand.cta}</Link>
          <a href={`${contact.whatsapp}?text=${encodeURIComponent('Hi EasyFix, I need a repair quote.')}`} target="_blank" rel="noreferrer" className="link-arrow text-[16px]">
            <WhatsAppGlyph size={18} />
            {t.repairs.cta}
            <Icon name="chevronRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ——— Wholesale card ——— */
function WholesaleCard() {
  const { t } = useLang()
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="relative isolate overflow-hidden rounded-[36px] bg-brand px-7 py-16 text-white sm:px-14 sm:py-24" data-reveal>
        <VantaNet />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand via-brand/80 to-brand/10" />
        <div className="relative max-w-xl">
          <p className="eyebrow">{t.wholesaleBand.eyebrow}</p>
          <h2 className="display-md mt-3">{t.wholesaleBand.title}</h2>
          <p className="lead mt-4 text-white/65">{t.wholesaleBand.text}</p>
          <Link to="/wholesale" className="btn-primary mt-8 px-7 py-3.5 text-[16px]">{t.wholesaleBand.cta}</Link>
        </div>
      </div>
    </section>
  )
}

/* ——— Visit us ——— */
function Visit() {
  const { t, pick } = useLang()
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionTitle parts={t.home.visitTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {stores.map((s, i) => (
            <div key={s.id} className="group relative overflow-hidden rounded-[var(--radius-card)] bg-muted p-7 sm:p-9" data-reveal-item>
              <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-white transition duration-700 group-hover:scale-125" />
              <div className="relative">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand text-primary"><Icon name="pin" size={22} /></span>
                <p className="mt-6 text-[13px] font-semibold text-primary">EasyFix 0{i + 1}</p>
                <h3 className="headline mt-1">{pick(s.name)}</h3>
                <p className="mt-1 text-muted-fg">{pick(s.address)}</p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  <a href={s.map} target="_blank" rel="noreferrer" className="link-arrow">{t.home.openMaps}<Icon name="chevronRight" size={15} /></a>
                  <a href={s.wolt} target="_blank" rel="noreferrer" className="link-arrow text-[#009de0]">Wolt<Icon name="chevronRight" size={15} /></a>
                  <a href={contact.phoneHref} className="link-arrow text-brand">{contact.phone}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductSection({ title, products, to, bg = '' }) {
  const { t } = useLang()
  return (
    <section className={`pt-16 sm:pt-24 ${bg}`}>
      <div className="container-x flex flex-wrap items-end justify-between gap-4">
        <SectionTitle parts={title} />
        <Link to={to} className="link-arrow text-[15px]" data-reveal>{t.viewAll}<Icon name="chevronRight" size={15} /></Link>
      </div>
      <Rail label={title[0]} className="mt-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} variant="rail" />
        ))}
      </Rail>
    </section>
  )
}

export default function Home() {
  const { t } = useLang()
  const latest = getProducts({ condition: 'new', sort: 'priceDesc' }).filter((p) => p.category !== 'ipad-tablets').slice(0, 10)
  const used = getProducts({ condition: 'used', sort: 'priceDesc' }).slice(0, 10)
  const tablets = getProducts({ category: 'ipad-tablets', sort: 'priceDesc' }).slice(0, 10)

  return (
    <>
      <Hero />
      <Reveal>
        <StoreNav />
        <section className="pt-10 sm:pt-16">
          <div className="container-x">
            <SectionTitle parts={t.home.promosTitle} />
          </div>
          <Rail label={t.home.promosTitle[0]} className="mt-8">
            {heroSlides.map((s) => (
              <PromoCard key={s.id} slide={s} />
            ))}
          </Rail>
        </section>
        <ProductSection title={t.home.latestTitle} products={latest} to="/category/new-devices" />
      </Reveal>
      <div className="h-16 sm:h-24" />
      <Reveal>
        <Bento />
      </Reveal>
      <Statement />
      <Reveal>
        <RepairSection />
        <ProductSection title={t.home.usedTitle} products={used} to="/category/used-devices" />
        <WholesaleCard />
        <ProductSection title={t.home.tabletsTitle} products={tablets} to="/category/ipad-tablets" bg="-mt-16 sm:-mt-24" />
        <div className="h-16 sm:h-24" />
        <Visit />
      </Reveal>
    </>
  )
}
