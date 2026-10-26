import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { useLenis } from 'lenis/react'
import { useLang } from '../i18n.jsx'
import { categories, categoryBySlug } from '../data/site.js'
import { getBrands, getProducts } from '../lib/catalog.js'
import ProductCard from '../components/ProductCard.jsx'
import Icon from '../components/Icon.jsx'
import { Reveal } from '../components/Motion.jsx'

function Filters({ params, setParam, brands, activeCategory, onReset, showCategories = false }) {
  const { t, pick } = useLang()
  const [q, setQ] = useState(params.get('q') ?? '')
  useEffect(() => setQ(params.get('q') ?? ''), [params])

  return (
    <div className="grid gap-7">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setParam('q', q.trim())
        }}
      >
        <label className="mb-2 block text-[12px] font-semibold text-muted-fg" htmlFor="shop-search">{t.search}</label>
        <div className="relative">
          <Icon name="search" size={17} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-fg" />
          <input id="shop-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} onBlur={() => setParam('q', q.trim())} placeholder={t.search + '…'} className="input pl-9" />
        </div>
      </form>

      {showCategories && <div>
        <p className="mb-2 text-[12px] font-semibold text-muted-fg">{t.categoriesLabel}</p>
        <nav className="grid gap-0.5">
          <Link to={{ pathname: '/shop', search: params.toString() }} className={`rounded-lg px-3 py-2 text-[15px] font-semibold ${!activeCategory ? 'bg-accent text-primary' : 'hover:bg-muted'}`}>
            {t.allProducts}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={{ pathname: `/category/${c.slug}`, search: params.toString() }}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[15px] transition ${activeCategory === c.slug ? 'bg-accent font-semibold text-primary' : 'hover:bg-muted'}`}
            >
              <Icon name={c.icon} size={17} className={activeCategory === c.slug ? 'text-primary' : 'text-muted-fg'} />
              {pick(c.name)}
            </Link>
          ))}
        </nav>
      </div>}

      <div>
        <p className="mb-2 text-[12px] font-semibold text-muted-fg">{t.brand}</p>
        <div className="flex flex-wrap gap-2">
          {[null, ...brands].map((b) => {
            const active = (params.get('brand') ?? null) === b
            return (
              <button
                key={b ?? 'all'}
                type="button"
                onClick={() => setParam('brand', b ?? '')}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[14px] font-medium transition ${active ? 'bg-brand text-white' : 'bg-muted hover:bg-border'}`}
                aria-pressed={active}
              >
                {b ?? t.all}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[12px] font-semibold text-muted-fg">{t.price}</p>
        <div className="flex items-center gap-2">
          <input type="number" min="0" inputMode="numeric" placeholder={t.min} defaultValue={params.get('min') ?? ''} key={'min' + (params.get('min') ?? '')} onBlur={(e) => setParam('min', e.target.value)} className="input" aria-label={t.min} />
          <span className="text-muted-fg">–</span>
          <input type="number" min="0" inputMode="numeric" placeholder={t.max} defaultValue={params.get('max') ?? ''} key={'max' + (params.get('max') ?? '')} onBlur={(e) => setParam('max', e.target.value)} className="input" aria-label={t.max} />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-[15px] font-medium">
        <input type="checkbox" checked={params.get('stock') === '1'} onChange={(e) => setParam('stock', e.target.checked ? '1' : '')} className="size-5 accent-[#f68000]" />
        {t.inStockOnly}
      </label>

      <button type="button" onClick={onReset} className="btn-outline">{t.resetFilters}</button>
    </div>
  )
}

export default function Shop() {
  const { t, pick } = useLang()
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const [drawer, setDrawer] = useState(false)
  const lenis = useLenis()
  const category = slug ? categoryBySlug[slug] : null

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }
  const reset = () => setParams(new URLSearchParams(), { replace: true })

  const filters = {
    category: slug,
    q: params.get('q') ?? '',
    brand: params.get('brand') ?? '',
    min: params.get('min'),
    max: params.get('max'),
    inStock: params.get('stock') === '1',
    sort: params.get('sort') ?? 'featured',
  }
  const products = useMemo(() => getProducts(filters), [slug, params]) // eslint-disable-line react-hooks/exhaustive-deps
  const brands = useMemo(() => getBrands(getProducts({ category: slug })), [slug])

  useEffect(() => setDrawer(false), [slug])
  useEffect(() => {
    if (!drawer) return
    lenis?.stop()
    return () => lenis?.start()
  }, [drawer, lenis])

  const title = category ? pick(category.name) : t.nav.shop

  return (
    <>
      <div className="container-x pt-10 sm:pt-16">
        <nav className="mb-4 flex items-center gap-1 text-[12px] text-muted-fg" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand">{t.nav.home}</Link>
          <Icon name="chevronRight" size={12} />
          {category ? (
            <>
              <Link to="/shop" className="hover:text-brand">{t.nav.shop}</Link>
              <Icon name="chevronRight" size={12} />
              <span className="text-brand">{title}</span>
            </>
          ) : (
            <span className="text-brand">{t.nav.shop}</span>
          )}
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="display-lg">
            {title}
            {filters.q && <span className="text-muted-fg"> “{filters.q}”</span>}
          </h1>
          <p className="pb-2 text-[15px] text-muted-fg">{t.products(products.length)}</p>
        </div>
      </div>

      {/* category chips */}
      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto px-[max(20px,calc((100vw-1200px)/2+32px))] pb-2" data-lenis-prevent-horizontal>
        <Link to={{ pathname: '/shop', search: params.toString() }} className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold transition ${!slug ? 'bg-brand text-white' : 'bg-muted hover:bg-border'}`}>
          {t.allProducts}
        </Link>
        {categories.map((c) => (
          <Link key={c.slug} to={{ pathname: `/category/${c.slug}`, search: params.toString() }} className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold whitespace-nowrap transition ${slug === c.slug ? 'bg-brand text-white' : 'bg-muted hover:bg-border'}`}>
            {pick(c.name)}
          </Link>
        ))}
      </div>

      <div className="container-x grid gap-10 pt-8 pb-20 lg:grid-cols-[240px_1fr] lg:pt-10">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <Filters params={params} setParam={setParam} brands={brands} activeCategory={slug} onReset={reset} />
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <button type="button" onClick={() => setDrawer(true)} className="btn-outline py-2 text-[14px] lg:hidden">
              <Icon name="filter" size={17} />
              {t.filters}
            </button>
            <span className="hidden lg:block" />
            <label className="flex items-center gap-2 text-sm">
              <span className="hidden text-muted-fg sm:inline">{t.sort}</span>
              <select value={filters.sort} onChange={(e) => setParam('sort', e.target.value === 'featured' ? '' : e.target.value)} className="input w-auto cursor-pointer rounded-full py-2 pr-8 text-[14px]">
                {Object.entries(t.sortOptions).map(([k, label]) => (
                  <option key={k} value={k}>{label}</option>
                ))}
              </select>
            </label>
          </div>

          {products.length ? (
            <Reveal className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3" deps={[slug, params.toString()]}>
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Reveal>
          ) : (
            <div className="grid place-items-center rounded-2xl border border-dashed border-border px-6 py-20 text-center">
              <Icon name="search" size={40} className="text-border" />
              <p className="mt-4 font-semibold">{t.noResults}</p>
              <button type="button" onClick={reset} className="btn-primary mt-5">{t.resetFilters}</button>
            </div>
          )}
        </div>
      </div>

      {/* mobile filter drawer */}
      <div className={`fixed inset-0 z-[70] lg:hidden ${drawer ? '' : 'pointer-events-none'}`} aria-hidden={!drawer} inert={!drawer}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity ${drawer ? 'opacity-100' : 'opacity-0'}`} onClick={() => setDrawer(false)} />
        <div className={`absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col rounded-t-3xl bg-white transition-transform duration-300 ${drawer ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <p className="text-lg font-bold">{t.filters}</p>
            <button type="button" onClick={() => setDrawer(false)} className="grid size-10 place-items-center rounded-full hover:bg-muted" aria-label={t.close}><Icon name="x" /></button>
          </div>
          <div className="overflow-y-auto overscroll-contain px-5 py-5" data-lenis-prevent>
            <Filters params={params} setParam={setParam} brands={brands} activeCategory={slug} onReset={reset} showCategories />
          </div>
          <div className="border-t border-border p-4">
            <button type="button" onClick={() => setDrawer(false)} className="btn-primary w-full py-3">{t.showResults(products.length)}</button>
          </div>
        </div>
      </div>
    </>
  )
}
