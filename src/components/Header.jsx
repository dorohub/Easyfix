import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router'
import { useLenis } from 'lenis/react'
import { useLang, languages } from '../i18n.jsx'
import { useCart } from '../lib/cart.jsx'
import { categories, contact } from '../data/site.js'
import Icon from './Icon.jsx'

export function Logo({ dark = false, compact = false }) {
  const { t } = useLang()
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="EasyFix — home">
      <img src="/brand/logo.png" alt="" width="48" height="48" className={compact ? 'size-10' : 'size-12'} />
      <span className="leading-none">
        <span className={`block text-[22px] font-extrabold tracking-tight ${dark ? 'text-white' : 'text-brand'}`}>
          Easy<span className="text-primary">Fix</span>
        </span>
        {!compact && (
          <span className={`mt-1 block text-[10px] font-semibold tracking-[0.18em] uppercase ${dark ? 'text-white/60' : 'text-muted-fg'}`}>
            {t.tagline}
          </span>
        )}
      </span>
    </Link>
  )
}

export function LanguageSwitch({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`flex items-center gap-1 ${className}`} role="group" aria-label="Language">
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold transition ${
            lang === l.code ? 'bg-white/10 text-primary' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <span aria-hidden="true">{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  )
}

function SearchBar({ className = '', onDone }) {
  const { t } = useLang()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  useEffect(() => setQ(params.get('q') ?? ''), [params])

  return (
    <form
      role="search"
      className={`group relative flex items-center rounded-xl border border-border bg-white shadow-sm transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        navigate(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : '/shop')
        onDone?.()
      }}
    >
      <Icon name="search" size={18} className="ml-3.5 shrink-0 text-muted-fg" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.searchPlaceholder}
        aria-label={t.search}
        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-fg/80"
      />
      <button type="submit" className="m-1.5 grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-fg transition hover:bg-primary-600" aria-label={t.search}>
        <Icon name="search" size={18} strokeWidth={2.2} />
      </button>
    </form>
  )
}

function CartButton() {
  const { t } = useLang()
  const { count, toast } = useCart()
  const badge = useRef(null)
  useEffect(() => {
    if (!toast || !badge.current) return
    badge.current.animate([{ transform: 'scale(1.7)' }, { transform: 'scale(1)' }], { duration: 450, easing: 'cubic-bezier(.3,1.6,.5,1)' })
  }, [toast])
  return (
    <Link to="/cart" className="relative grid size-11 place-items-center rounded-full transition hover:bg-muted" aria-label={`${t.cart} (${count})`}>
      <Icon name="cart" size={22} />
      {count > 0 && (
        <span ref={badge} className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-fg">
          {count}
        </span>
      )}
    </Link>
  )
}

function MobileMenu({ open, onClose }) {
  const { t, pick } = useLang()
  const lenis = useLenis()
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    panel.current?.querySelector('button')?.focus()
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, lenis, onClose])

  return (
    <div className={`fixed inset-0 z-[70] lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open} inert={!open}>
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside
        ref={panel}
        className={`absolute inset-y-0 left-0 flex w-[min(360px,88vw)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label={t.menu}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <Logo compact />
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-full hover:bg-muted" aria-label={t.close}>
            <Icon name="x" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4" data-lenis-prevent>
          <nav className="grid gap-1" aria-label="Main">
            {Object.entries(t.nav).map(([key, label]) => (
              <NavLink
                key={key}
                to={key === 'home' ? '/' : `/${key}`}
                end={key === 'home'}
                onClick={onClose}
                className={({ isActive }) => `rounded-lg px-3 py-2.5 text-[17px] font-semibold ${isActive ? 'bg-accent text-primary' : 'hover:bg-muted'}`}
              >
                {label}
              </NavLink>
            ))}
            <Link to="/wholesale" onClick={onClose} className="rounded-lg px-3 py-2.5 text-[17px] font-semibold text-primary hover:bg-muted">
              {t.wholesale}
            </Link>
          </nav>
          <p className="mt-6 mb-2 px-3 text-xs font-bold tracking-widest text-muted-fg uppercase">{t.categoriesLabel}</p>
          <div className="grid gap-0.5">
            {categories.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`} onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] hover:bg-muted">
                <Icon name={c.icon} size={18} className="text-primary" />
                {pick(c.name)}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-2 border-t border-border p-4 text-sm">
          <a href={contact.phoneHref} className="flex items-center gap-2 font-semibold"><Icon name="call" size={16} className="text-primary" />{contact.phone}</a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-muted-fg"><Icon name="mail" size={16} className="text-primary" />{contact.email}</a>
          <Link to="/login" onClick={onClose} className="btn-outline mt-2">{t.login}</Link>
        </div>
      </aside>
    </div>
  )
}

export default function Header() {
  const { t, pick } = useLang()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const catScroller = useRef(null)
  const [catEdges, setCatEdges] = useState({ left: false, right: true })

  useLenis(({ scroll }) => setScrolled(scroll > 120))
  useEffect(() => setMenuOpen(false), [pathname])

  const updateEdges = () => {
    const el = catScroller.current
    if (!el) return
    setCatEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 })
  }
  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [])
  const scrollCats = (dir) => catScroller.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  const activeCat = pathname.startsWith('/category/') ? pathname.split('/')[2] : null

  return (
    <>
      {/* top bar */}
      <div className="bg-topbar text-topbar-fg">
        <div className="container-x flex h-9 items-center justify-between gap-4 text-xs">
          <div className="hidden items-center gap-5 sm:flex">
            <a href={contact.phoneHref} className="flex items-center gap-1.5 hover:text-primary"><Icon name="call" size={14} />{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-primary"><Icon name="mail" size={14} />{contact.email}</a>
          </div>
          <p className="hidden items-center gap-1.5 text-topbar-fg/80 md:flex">
            <Icon name="truck" size={14} className="text-primary" />
            {t.usp.shipping} · {t.uspSub.shipping}
          </p>
          <LanguageSwitch className="ml-auto sm:ml-0" />
        </div>
      </div>

      {/* main header — sticky */}
      <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'border-border shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)]' : 'border-transparent'}`}>
        <div className="container-x flex h-[72px] items-center gap-4 lg:h-20 lg:gap-8">
          <button type="button" onClick={() => setMenuOpen(true)} className="-ml-2 grid size-11 place-items-center rounded-full hover:bg-muted lg:hidden" aria-label={t.menu} aria-expanded={menuOpen}>
            <Icon name="menu" size={24} />
          </button>
          <Logo />
          <SearchBar className="mx-auto hidden max-w-xl flex-1 md:flex" />
          <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-0">
            <Link to="/wholesale" className="hidden rounded-lg border border-primary px-3.5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-fg lg:inline-flex">
              {t.wholesale}
            </Link>
            <Link to="/login" className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-muted sm:flex">
              <Icon name="login" size={20} />
              {t.login}
            </Link>
            <CartButton />
          </div>
        </div>
        <div className="container-x pb-3 md:hidden">
          <SearchBar />
        </div>
      </header>

      {/* main nav */}
      <nav className="hidden bg-brand text-white lg:block" aria-label="Main">
        <div className="container-x flex h-12 items-center justify-between">
          <div className="flex h-full items-center">
            {Object.entries(t.nav).map(([key, label]) => (
              <NavLink
                key={key}
                to={key === 'home' ? '/' : `/${key}`}
                end={key === 'home'}
                className={({ isActive }) =>
                  `relative flex h-full items-center px-4 text-[15px] font-medium transition-colors ${isActive ? 'bg-primary text-primary-fg' : 'text-white/85 hover:text-white'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2"><Icon name="shield" size={16} className="text-primary" />{t.usp.warranty}</span>
            <span className="flex items-center gap-2"><Icon name="wrench" size={16} className="text-primary" />{t.usp.repairs}</span>
          </div>
        </div>
      </nav>

      {/* category bar — scrolls horizontally instead of overflowing the page */}
      <div className="relative hidden bg-primary lg:block">
        <div className="container-x relative">
          {catEdges.left && (
            <button type="button" onClick={() => scrollCats(-1)} className="absolute inset-y-0 left-0 z-10 flex w-14 items-center bg-gradient-to-r from-primary via-primary to-transparent pl-3" aria-label="Scroll categories left">
              <Icon name="chevronLeft" size={20} className="text-primary-fg" />
            </button>
          )}
          <div ref={catScroller} onScroll={updateEdges} className="no-scrollbar flex h-11 items-center gap-1 overflow-x-auto scroll-smooth">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className={`shrink-0 rounded-md px-3 py-1.5 text-[14px] font-semibold whitespace-nowrap text-primary-fg transition ${activeCat === c.slug ? 'bg-brand text-white' : 'hover:bg-black/10'}`}
              >
                {pick(c.name)}
              </Link>
            ))}
          </div>
          {catEdges.right && (
            <button type="button" onClick={() => scrollCats(1)} className="absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-end bg-gradient-to-l from-primary via-primary to-transparent pr-3" aria-label="Scroll categories right">
              <Icon name="chevronRight" size={20} className="text-primary-fg" />
            </button>
          )}
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
