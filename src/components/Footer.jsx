import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'
import { contact, stores, categories } from '../data/site.js'
import { Logo, LanguageSwitch } from './Header.jsx'

const shopLinks = ['new-devices', 'used-devices', 'accessories', 'ipad-tablets', 'display-screens', 'gsm-parts-repair', 'computers-it', 'repair-tools']

export default function Footer() {
  const { t, pick } = useLang()
  const cat = Object.fromEntries(categories.map((c) => [c.slug, c]))
  const link = 'text-[12px] leading-6 text-muted-fg transition hover:text-brand hover:underline underline-offset-2'
  const head = 'mb-2 text-[12px] font-semibold text-brand'

  return (
    <footer className="bg-muted text-[12px]">
      <div className="container-x">
        <div className="flex flex-col gap-5 border-b border-black/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl leading-relaxed text-muted-fg">{t.footer.about}</p>
          <div className="flex items-center gap-2">
            {stores.map((s) => (
              <a key={s.id} href={s.wolt} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-1.5 font-semibold shadow-sm transition hover:shadow-md">
                <img src="/brand/wolt.png" alt="" width="24" height="24" className="size-6 rounded-full" />
                Wolt · {pick(s.name)}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-5">
          <div>
            <h3 className={head}>{t.footer.shop}</h3>
            <ul>
              <li><Link to="/shop" className={link}>{t.allProducts}</Link></li>
              {shopLinks.map((s) => (
                <li key={s}><Link to={`/category/${s}`} className={link}>{pick(cat[s].name)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={head}>{t.nav.repairs}</h3>
            <ul>
              <li><Link to="/repairs" className={link}>{t.repairs.title}</Link></li>
              {t.repairs.services.map(([s]) => (
                <li key={s}><Link to="/repairs" className={link}>{s}</Link></li>
              ))}
            </ul>
            <h3 className={`${head} mt-6`}>{t.wholesale}</h3>
            <ul>
              <li><Link to="/wholesale" className={link}>{t.wholesalePage.title}</Link></li>
              <li><Link to="/login" className={link}>{t.login}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={head}>{t.footer.aboutH}</h3>
            <ul>
              <li><Link to="/about" className={link}>{t.nav.about}</Link></li>
              <li><Link to="/contact" className={link}>{t.nav.contact}</Link></li>
              <li><Link to="/shipping" className={link}>{t.footer.shipping}</Link></li>
              <li><Link to="/payment" className={link}>{t.footer.payment}</Link></li>
              <li><Link to="/returns" className={link}>{t.legal.returns}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={head}>{t.footer.legal}</h3>
            <ul>
              {['terms', 'privacy', 'cookies', 'gdpr'].map((k) => (
                <li key={k}><Link to={`/${k}`} className={link}>{t.legal[k]}</Link></li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className={head}>{t.footer.contact}</h3>
            <ul>
              <li><a href={contact.phoneHref} className={link}>{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className={link}>{contact.email}</a></li>
              <li><a href={contact.whatsapp} target="_blank" rel="noreferrer" className={link}>WhatsApp</a></li>
              {stores.map((s) => (
                <li key={s.id}><a href={s.map} target="_blank" rel="noreferrer" className={link}>{pick(s.address)}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-black/10 py-5 text-muted-fg sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <p>© {new Date().getFullYear()} EasyFix — {t.footer.rights}</p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitch />
            <p>
              {t.footer.createdBy}{' '}
              <a href="https://cydigitalnet.com" target="_blank" rel="noreferrer" className="underline hover:text-brand">Cydigitalnet</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
