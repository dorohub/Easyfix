import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'
import { contact, stores, categories } from '../data/site.js'
import { Logo } from './Header.jsx'
import Icon from './Icon.jsx'

const shopLinks = ['new-devices', 'accessories', 'ipad-tablets', 'display-screens', 'computers-it', 'repair-tools']

export default function Footer() {
  const { t, pick } = useLang()
  const cat = Object.fromEntries(categories.map((c) => [c.slug, c]))
  const linkCls = 'text-[15px] text-white/70 transition hover:text-primary'

  return (
    <footer className="bg-brand text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/65">{t.footer.about}</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider uppercase">{t.footer.shop}</h3>
          <ul className="grid gap-2.5">
            <li><Link to="/shop" className={linkCls}>{t.nav.shop}</Link></li>
            {shopLinks.map((s) => (
              <li key={s}><Link to={`/category/${s}`} className={linkCls}>{pick(cat[s].name)}</Link></li>
            ))}
            <li><Link to="/wholesale" className={linkCls}>{t.wholesale}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider uppercase">{t.footer.aboutH}</h3>
          <ul className="grid gap-2.5">
            <li><Link to="/about" className={linkCls}>{t.nav.about}</Link></li>
            <li><Link to="/repairs" className={linkCls}>{t.nav.repairs}</Link></li>
            <li><Link to="/contact" className={linkCls}>{t.nav.contact}</Link></li>
            <li><Link to="/shipping" className={linkCls}>{t.footer.shipping}</Link></li>
            <li><Link to="/payment" className={linkCls}>{t.footer.payment}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider uppercase">{t.footer.legal}</h3>
          <ul className="grid gap-2.5">
            {['terms', 'privacy', 'cookies', 'returns', 'gdpr'].map((k) => (
              <li key={k}><Link to={`/${k}`} className={linkCls}>{t.legal[k]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider uppercase">{t.footer.contact}</h3>
          <ul className="grid gap-3 text-[15px] text-white/70">
            <li><a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 hover:text-primary"><Icon name="mail" size={17} className="text-primary" />{contact.email}</a></li>
            <li><a href={contact.phoneHref} className="flex items-center gap-2.5 hover:text-primary"><Icon name="call" size={17} className="text-primary" />{contact.phone}</a></li>
            {stores.map((s) => (
              <li key={s.id}>
                <a href={s.map} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 hover:text-primary">
                  <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-primary" />
                  {pick(s.address)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-center gap-4 py-6 sm:flex-row sm:gap-6">
          <p className="text-[15px] font-medium text-white/85">{t.woltBand.title}</p>
          <div className="flex gap-3">
            {stores.map((s) => (
              <a key={s.id} href={s.wolt} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-xl bg-white/5 py-2 pr-4 pl-2 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-[#009de0]">
                <img src="/brand/wolt.png" alt="Wolt" width="32" height="32" className="size-8 rounded-md" />
                <span className="text-sm font-semibold">{pick(s.name)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} EasyFix — {t.footer.rights}</p>
          <p>
            {t.footer.createdBy}{' '}
            <a href="https://cydigitalnet.com" target="_blank" rel="noreferrer" className="underline hover:text-primary">Cydigitalnet</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
