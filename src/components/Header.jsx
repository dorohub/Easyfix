import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { useLenis } from 'lenis/react'
import { useLang, languages } from '../i18n.jsx'
import { useCart } from '../lib/cart.jsx'
import { categories, contact } from '../data/site.js'
import Icon from './Icon.jsx'

export function Logo({ dark = false, size = 'md' }) {
  const big = size === 'lg'
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="EasyFix — home">
      <img src="/brand/logo.png" alt="" width="40" height="40" className={big ? 'size-12' : 'size-9'} />
      <span className={`font-bold tracking-[-0.03em] ${big ? 'text-[24px]' : 'text-[19px]'} ${dark ? 'text-white' : 'text-brand'}`}>
        Easy<span className="text-primary">Fix</span>
      </span>
    </Link>
  )
}

export function LanguageSwitch({ className = '', dark = false }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`flex items-center gap-0.5 rounded-full p-0.5 ${dark ? 'bg-white/10' : 'bg-black/[0.05]'} ${className}`} role="group" aria-label="Language">
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-semibold transition ${
            lang === l.code ? (dark ? 'bg-white text-brand' : 'bg-white text-brand shadow-sm') : dark ? 'text-white/70 hover:text-white' : 'text-muted-fg hover:text-brand'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

const megaGroups = [
  ['phone', ['new-devices', 'used-devices', 'ipad-tablets', 'computers-it']],
  ['chip', ['gsm-parts-repair', 'display-screens', 'repair-tools', 'accessories']],
  ['home', ['smart-home', 'vision', 'appliances', 'health-beauty', 'others-root']],
]

function MegaMenu({ open, onClose }) {
  const { t, pick } = useLang()
  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
  return (
    <div
      className={`absolute inset-x-0 top-full origin-top overflow-hidden border-b border-black/5 bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.25)] transition-all duration-500 ease-(--ease-out-expo) ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}
      onMouseLeave={onClose}
    >
      <div className="container-x grid gap-10 py-10 md:grid-cols-[1.3fr_1fr_1fr_0.9fr]">
        {megaGroups.map(([, slugs], gi) => (
          <ul key={gi} className="grid content-start gap-1.5">
            {gi === 0 && <li className="mb-2 text-[12px] font-medium text-muted-fg">{t.mega.explore}</li>}
            {gi !== 0 && <li className="mb-2 text-[12px] font-medium text-transparent select-none" aria-hidden="true">·</li>}
            {slugs.map((slug) => (
              <li key={slug}>
                <Link to={`/category/${slug}`} onClick={onClose} className={`block font-semibold tracking-tight transition hover:text-primary ${gi === 0 ? 'text-[24px] leading-snug' : 'text-[15px] leading-7'}`}>
                  {pick(bySlug[slug].name)}
                </Link>
              </li>
            ))}
          </ul>
        ))}
        <ul className="grid content-start gap-1.5 text-[13px]">
          <li className="mb-2 text-[12px] font-medium text-muted-fg">{t.mega.quick}</li>
          <li><Link to="/shop" onClick={onClose} className="font-medium hover:text-primary">{t.allProducts}</Link></li>
          <li><Link to="/category/used-devices" onClick={onClose} className="font-medium hover:text-primary">{t.mega.preOwned}</Link></li>
          <li><Link to="/wholesale" onClick={onClose} className="font-medium hover:text-primary">{t.wholesale}</Link></li>
          <li><Link to="/repairs" onClick={onClose} className="font-medium hover:text-primary">{t.nav.repairs}</Link></li>
          <li><Link to="/shipping" onClick={onClose} className="font-medium hover:text-primary">{t.footer.shipping}</Link></li>
          <li><Link to="/contact" onClick={onClose} className="font-medium hover:text-primary">{t.nav.contact}</Link></li>
        </ul>
      </div>
    </div>
  )
}

function SearchPanel({ open, onClose }) {
  const { t } = useLang()
  const navigate = useNavigate()
  const input = useRef(null)
  const [q, setQ] = useState('')
  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 120)
    else setQ('')
  }, [open])
  const go = (term) => {
    navigate(term.trim() ? `/shop?q=${encodeURIComponent(term.trim())}` : '/shop')
    onClose()
  }
  return (
    <div className={`absolute inset-x-0 top-full border-b border-black/5 bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.25)] transition-all duration-500 ease-(--ease-out-expo) ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
      <div className="container-x max-w-3xl py-8 sm:py-10">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            go(q)
          }}
          className="flex items-center gap-3 border-b border-black/10 pb-3"
        >
          <Icon name="search" size={26} className="shrink-0 text-muted-fg" />
          <input
            ref={input}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.search}
            className="min-w-0 flex-1 appearance-none bg-transparent text-[22px] font-semibold tracking-tight outline-none placeholder:text-muted-fg/60 sm:text-[28px] [&::-webkit-search-cancel-button]:hidden"
          />
        </form>
        <p className="mt-6 text-[12px] font-medium text-muted-fg">{t.searchHint}</p>
        <ul className="mt-2 grid gap-1">
          {t.popular.map((term) => (
            <li key={term}>
              <button type="button" onClick={() => go(term)} className="group flex cursor-pointer items-center gap-2 py-1 text-[15px] font-medium hover:text-primary">
                <Icon name="arrowRight" size={15} className="text-muted-fg transition group-hover:translate-x-0.5 group-hover:text-primary" />
                {term}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MobileMenu({ open, onClose }) {
  const { t, pick } = useLang()
  return (
    <div
      className={`absolute inset-x-0 top-full h-[100dvh] overflow-y-auto overscroll-contain bg-white transition-all duration-500 ease-(--ease-out-expo) lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      aria-hidden={!open}
      inert={!open}
      data-lenis-prevent
    >
      <div className="container-x pt-6 pb-40">
        <nav className="grid" aria-label="Main">
          {[
            ['/shop', t.nav.shop],
            ['/repairs', t.nav.repairs],
            ['/wholesale', t.wholesale],
            ['/about', t.nav.about],
            ['/contact', t.nav.contact],
          ].map(([to, label], i) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`py-1.5 text-[28px] font-bold tracking-[-0.03em] transition-all duration-500 ease-(--ease-out-expo) ${open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
              style={{ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-8 mb-2 text-[12px] font-medium text-muted-fg">{t.categoriesLabel}</p>
        <div className="grid grid-cols-2 gap-x-4">
          {categories.map((c) => (
            <Link key={c.slug} to={`/category/${c.slug}`} onClick={onClose} className="py-2 text-[15px] font-medium">
              {pick(c.name)}
            </Link>
          ))}
        </div>
        <div className="mt-8 grid gap-3 border-t border-border pt-6 text-[15px]">
          <a href={contact.phoneHref} className="flex items-center gap-3 font-semibold"><Icon name="call" size={18} className="text-primary" />{contact.phone}</a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-muted-fg"><Icon name="mail" size={18} className="text-primary" />{contact.email}</a>
          <Link to="/login" onClick={onClose} className="flex items-center gap-3 text-muted-fg"><Icon name="login" size={18} className="text-primary" />{t.login}</Link>
          <LanguageSwitch className="mt-2 w-fit" />
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const { t } = useLang()
  const { pathname, search } = useLocation()
  const { count, toast } = useCart()
  const lenis = useLenis()
  const [panel, setPanel] = useState(null) // 'shop' | 'search' | 'menu' | null
  const badge = useRef(null)

  useEffect(() => setPanel(null), [pathname, search])
  useEffect(() => {
    if (panel === 'menu') {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
    if (!panel) return
    const onKey = (e) => e.key === 'Escape' && setPanel(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panel, lenis])
  useEffect(() => {
    if (!toast || !badge.current) return
    badge.current.animate([{ transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 500, easing: 'cubic-bezier(.3,1.6,.5,1)' })
  }, [toast])

  const toggle = (name) => setPanel((p) => (p === name ? null : name))
  const linkCls = ({ isActive }) => `px-2.5 py-1 text-[13px] font-medium whitespace-nowrap transition ${isActive ? 'text-brand' : 'text-brand/70 hover:text-brand'}`
  const shortcutCls = (state) => `hidden xl:block ${linkCls(state)}`

  return (
    <>
      <header className="sticky top-0 z-50">
        <div
          className={`relative border-b transition-colors duration-300 ${panel ? 'border-transparent bg-white' : 'border-black/[0.06] glass'}`}
          onMouseLeave={() => panel === 'shop' && setPanel(null)}
        >
          <div className="container-x flex h-[52px] items-center gap-2">
            <Logo />
            <nav className="mx-auto hidden items-center lg:flex" aria-label="Main" onMouseOver={(e) => panel === 'shop' && e.target.closest('a') && setPanel(null)}>
              <button
                type="button"
                onClick={() => setPanel('shop')}
                onMouseEnter={() => setPanel('shop')}
                aria-expanded={panel === 'shop'}
                className={`flex cursor-pointer items-center gap-1 px-2.5 py-1 text-[13px] font-medium whitespace-nowrap transition ${pathname.startsWith('/shop') || pathname.startsWith('/category') || panel === 'shop' ? 'text-brand' : 'text-brand/70 hover:text-brand'}`}
              >
                {t.nav.shop}
                <Icon name="chevronDown" size={13} className={`transition ${panel === 'shop' ? 'rotate-180' : ''}`} />
              </button>
              <NavLink to="/category/new-devices" className={shortcutCls}>{t.navShort.new}</NavLink>
              <NavLink to="/category/used-devices" className={shortcutCls}>{t.navShort.used}</NavLink>
              <NavLink to="/category/gsm-parts-repair" className={shortcutCls}>{t.navShort.parts}</NavLink>
              <NavLink to="/repairs" className={linkCls}>{t.nav.repairs}</NavLink>
              <NavLink to="/wholesale" className={linkCls}>{t.wholesale}</NavLink>
              <NavLink to="/about" className={linkCls}>{t.nav.about}</NavLink>
              <NavLink to="/contact" className={linkCls}>{t.nav.contact}</NavLink>
            </nav>
            <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
              <LanguageSwitch className="mr-1 hidden sm:flex" />
              <button type="button" onClick={() => toggle('search')} className="grid size-10 cursor-pointer place-items-center rounded-full text-brand/80 transition hover:text-brand" aria-label={t.search} aria-expanded={panel === 'search'}>
                <Icon name={panel === 'search' ? 'x' : 'search'} size={19} />
              </button>
              <Link to="/login" className="hidden size-10 place-items-center rounded-full text-brand/80 transition hover:text-brand sm:grid" aria-label={t.login}>
                <Icon name="login" size={19} />
              </Link>
              <Link to="/cart" className="relative grid size-10 place-items-center rounded-full text-brand/80 transition hover:text-brand" aria-label={`${t.cart} (${count})`}>
                <Icon name="cart" size={20} />
                {count > 0 && (
                  <span ref={badge} className="absolute top-1 right-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-fg">
                    {count}
                  </span>
                )}
              </Link>
              <button type="button" onClick={() => toggle('menu')} className="relative grid size-10 cursor-pointer place-items-center lg:hidden" aria-label={t.menu} aria-expanded={panel === 'menu'}>
                <span className={`absolute h-[1.5px] w-[18px] rounded bg-brand transition duration-300 ${panel === 'menu' ? 'rotate-45' : '-translate-y-[4px]'}`} />
                <span className={`absolute h-[1.5px] w-[18px] rounded bg-brand transition duration-300 ${panel === 'menu' ? '-rotate-45' : 'translate-y-[4px]'}`} />
              </button>
            </div>
          </div>
          <MegaMenu open={panel === 'shop'} onClose={() => setPanel(null)} />
          <SearchPanel open={panel === 'search'} onClose={() => setPanel(null)} />
          <MobileMenu open={panel === 'menu'} onClose={() => setPanel(null)} />
        </div>
      </header>
      {/* dim the page behind open panels */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-500 ${panel === 'shop' || panel === 'search' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setPanel(null)}
        aria-hidden="true"
      />
      <div className="bg-muted">
        <p className="container-x py-2.5 text-center text-[12px] leading-snug text-muted-fg sm:text-[13px]">
          {t.ribbon}{' '}
          <Link to="/shop" className="link-arrow whitespace-nowrap">{t.shopNow}<Icon name="chevronRight" size={12} /></Link>
        </p>
      </div>
    </>
  )
}
