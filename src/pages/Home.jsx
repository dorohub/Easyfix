import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'
import { categories, stores } from '../data/site.js'
import { getProducts } from '../lib/catalog.js'
import HeroSlider from '../components/HeroSlider.jsx'
import ProductCard from '../components/ProductCard.jsx'
import VantaNet from '../components/VantaNet.jsx'
import Icon from '../components/Icon.jsx'
import { Reveal } from '../components/Motion.jsx'

function UspBar() {
  const { t } = useLang()
  const items = [
    ['shield', t.usp.warranty, t.uspSub.warranty],
    ['truck', t.usp.shipping, t.uspSub.shipping],
    ['rotate', t.usp.returns, t.uspSub.returns],
    ['wrench', t.usp.repairs, t.uspSub.repairs],
  ]
  return (
    <div className="border-b border-border bg-white">
      <div className="container-x grid grid-cols-2 gap-y-5 py-6 lg:grid-cols-4">
        {items.map(([icon, title, sub]) => (
          <div key={title} className="flex items-center gap-3.5 lg:justify-center">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon name={icon} size={22} /></span>
            <span>
              <span className="block text-sm font-bold sm:text-[15px]">{title}</span>
              <span className="block text-xs text-muted-fg sm:text-[13px]">{sub}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHead({ title, to, linkLabel }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4" data-reveal>
      <h2 className="text-2xl font-extrabold sm:text-[32px]">{title}</h2>
      {to && (
        <Link to={to} className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary">
          {linkLabel}
          <Icon name="arrowRight" size={16} className="transition group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}

function ProductRow({ products }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

function CategoryGrid() {
  const { t, pick } = useLang()
  return (
    <section className="container-x py-14 sm:py-20">
      <SectionHead title={t.shopByCategory} to="/shop" linkLabel={t.viewAll} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            to={`/category/${c.slug}`}
            data-reveal-item
            className={`group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-border bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-lift)] sm:p-5 ${
              i < 2 ? 'lg:col-span-3 lg:min-h-44 lg:flex-row lg:items-end lg:bg-gradient-to-br lg:from-white lg:to-accent' : 'lg:col-span-1'
            }`}
          >
            <span className={`grid place-items-center rounded-xl bg-accent text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-fg ${i < 2 ? 'size-12 lg:order-2 lg:size-20' : 'size-12'}`}>
              <Icon name={c.icon} size={i < 2 ? 30 : 24} />
            </span>
            <span className={`mt-6 block ${i < 2 ? 'lg:mt-0' : ''}`}>
              <span className={`block font-bold leading-tight ${i < 2 ? 'text-[15px] lg:text-2xl' : 'text-[15px]'}`}>{pick(c.name)}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function RepairBand() {
  const { t } = useLang()
  const services = [
    ['screen', t.repairs.services[0][0]],
    ['battery', t.repairs.services[1][0]],
    ['port', t.repairs.services[2][0]],
    ['water', t.repairs.services[3][0]],
  ]
  return (
    <section className="container-x py-6">
      <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-10 sm:px-12 sm:py-14" data-reveal>
        <div className="absolute -right-24 -bottom-24 size-80 rounded-full bg-primary/15 blur-2xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">{t.repairs.eyebrow}</p>
            <h2 className="mt-3 text-[28px] leading-tight font-extrabold sm:text-4xl">{t.repairBand.title}</h2>
            <p className="mt-3 max-w-lg text-muted-fg">{t.repairBand.text}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/repairs" className="btn-primary px-6 py-3">{t.repairBand.cta}<Icon name="arrowRight" size={18} /></Link>
              <a href="tel:+35796633328" className="btn-outline px-6 py-3"><Icon name="call" size={17} />+357 96 633328</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {services.map(([icon, label]) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-fg"><Icon name={icon} size={20} /></span>
                <span className="text-sm font-semibold leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WholesaleBand() {
  const { t } = useLang()
  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      <VantaNet />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand via-brand/85 to-brand/30" />
      <div className="container-x relative py-20 sm:py-24" data-reveal>
        <p className="eyebrow">{t.wholesaleBand.eyebrow}</p>
        <h2 className="mt-4 max-w-2xl text-[30px] leading-tight font-extrabold sm:text-5xl">{t.wholesaleBand.title}</h2>
        <p className="mt-4 max-w-lg text-white/70">{t.wholesaleBand.text}</p>
        <Link to="/wholesale" className="btn-primary mt-8 px-7 py-3.5">{t.wholesaleBand.cta}<Icon name="arrowRight" size={18} /></Link>
      </div>
    </section>
  )
}

function WoltBand() {
  const { t, pick } = useLang()
  return (
    <section className="container-x py-14">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border p-6 sm:p-8 md:flex-row md:items-center" data-reveal>
        <div className="flex items-center gap-4">
          <img src="/brand/wolt.png" alt="Wolt" width="56" height="56" className="size-14 rounded-2xl" />
          <div>
            <h2 className="text-xl font-extrabold">{t.woltBand.title} Wolt</h2>
            <p className="text-sm text-muted-fg">{t.woltBand.text}</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {stores.map((s) => (
            <a key={s.id} href={s.wolt} target="_blank" rel="noreferrer" className="btn border border-[#009de0] text-[#0077aa] hover:bg-[#009de0] hover:text-white">
              Wolt — {pick(s.name)}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { t } = useLang()
  const newest = getProducts({ condition: 'new', sort: 'priceDesc' }).filter((p) => p.category !== 'ipad-tablets').slice(0, 10)
  const used = getProducts({ condition: 'used', sort: 'priceDesc' }).slice(0, 10)
  const tablets = getProducts({ category: 'ipad-tablets', sort: 'priceDesc' }).slice(0, 10)

  return (
    <>
      <h1 className="sr-only">EasyFix Cyprus — Mobile Shop &amp; Phone Repair in Limassol</h1>
      <HeroSlider />
      <UspBar />
      <Reveal>
        <CategoryGrid />
        <section className="container-x pb-16">
          <SectionHead title={t.newProducts} to="/category/new-devices" linkLabel={t.seeMore} />
          <ProductRow products={newest} />
        </section>
        <RepairBand />
        <section className="container-x py-16">
          <SectionHead title={t.usedProducts} to="/category/used-devices" linkLabel={t.seeMore} />
          <ProductRow products={used} />
        </section>
      </Reveal>
      <WholesaleBand />
      <Reveal>
        <section className="container-x py-16">
          <SectionHead title={t.ipadTablets} to="/category/ipad-tablets" linkLabel={t.seeMore} />
          <ProductRow products={tablets} />
        </section>
        <WoltBand />
      </Reveal>
    </>
  )
}
