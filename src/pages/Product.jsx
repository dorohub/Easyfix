import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useLang } from '../i18n.jsx'
import { useCart } from '../lib/cart.jsx'
import { categoryBySlug, contact } from '../data/site.js'
import { formatPrice, getProduct, getSimilar, maxQty } from '../lib/catalog.js'
import ProductCard, { Ribbon } from '../components/ProductCard.jsx'
import Icon, { WhatsAppGlyph } from '../components/Icon.jsx'
import { Reveal } from '../components/Motion.jsx'
import NotFound from './NotFound.jsx'

function ShareButtons({ product }) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const text = `${product.name} — ${formatPrice(product.price)}`
  const enc = encodeURIComponent
  const links = [
    ['WhatsApp', `https://wa.me/?text=${enc(`${text} ${url}`)}`, 'bg-[#25d366] text-white'],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, 'bg-[#1877f2] text-white'],
    ['X', `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`, 'bg-black text-white'],
    ['Messenger', `fb-messenger://share/?link=${enc(url)}`, 'bg-[#0084ff] text-white'],
    ['Email', `mailto:?subject=${enc(product.name)}&body=${enc(`${text}\n${url}`)}`, 'bg-muted text-brand'],
  ]
  return (
    <div>
      <p className="mb-3 text-xs font-bold tracking-widest text-muted-fg uppercase">{t.share}</p>
      <div className="flex flex-wrap gap-2">
        {links.map(([label, href, cls]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition hover:opacity-85 ${cls}`}>
            {label}
          </a>
        ))}
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            } catch {}
          }}
          className="flex items-center gap-1.5 rounded-lg bg-muted px-3.5 py-2 text-sm font-semibold hover:bg-border"
        >
          <Icon name={copied ? 'check' : 'link'} size={16} />
          {copied ? t.linkCopied : t.copyLink}
        </button>
      </div>
    </div>
  )
}

export default function Product() {
  const { id } = useParams()
  const { t, pick } = useLang()
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const product = getProduct(id)
  if (!product) return <NotFound />

  const category = categoryBySlug[product.category]
  const similar = getSimilar(product)
  const limit = maxQty(product)
  const ask = `${contact.whatsapp}?text=${encodeURIComponent(`Hi EasyFix, I'm interested in: ${product.name}`)}`

  return (
    <>
      <div className="container-x py-6 sm:py-10">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-fg" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary">{t.nav.home}</Link>
          <Icon name="chevronRight" size={14} />
          <Link to="/shop" className="hover:text-primary">{t.nav.shop}</Link>
          {category && (
            <>
              <Icon name="chevronRight" size={14} />
              <Link to={`/category/${category.slug}`} className="hover:text-primary">{pick(category.name)}</Link>
            </>
          )}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-[#f8f8f8] to-muted">
            <Ribbon product={product} size="lg" />
            <div className="aspect-square">
              {product.image && <img src={product.image} alt={product.name} className="size-full object-contain p-8 mix-blend-multiply sm:p-12" />}
            </div>
          </div>

          <div className="lg:py-4">
            <p className="text-xs font-bold tracking-widest text-muted-fg uppercase">{product.brand}</p>
            <h1 className="mt-2 text-[26px] leading-tight font-extrabold sm:text-4xl">{product.name}</h1>
            <p className="mt-5 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">{formatPrice(product.price)}</p>
            <p className="mt-1 text-xs text-muted-fg">{t.vatIncluded}</p>

            <p className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${product.inStock ? 'bg-emerald-50 text-success' : 'bg-rose-50 text-destructive'}`}>
              <span className={`size-2 rounded-full ${product.inStock ? 'bg-success' : 'bg-destructive'}`} />
              {product.inStock ? (product.stock ? t.inStockCount(product.stock) : t.inStock) : t.outOfStock}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-muted px-4 py-3">
                <dt className="text-xs text-muted-fg">{t.condition}</dt>
                <dd className="font-semibold">{product.condition === 'used' ? t.conditionUsed : t.conditionNew}{product.grade && product.grade !== 'used' ? ` · ${t.badge[product.grade]}` : ''}</dd>
              </div>
              {category && (
                <div className="rounded-xl bg-muted px-4 py-3">
                  <dt className="text-xs text-muted-fg">{t.category}</dt>
                  <dd className="font-semibold">{pick(category.name)}</dd>
                </div>
              )}
            </dl>

            <div className="mt-7 flex flex-wrap items-stretch gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-12 place-items-center hover:text-primary" aria-label="−" disabled={!product.inStock}><Icon name="minus" size={18} /></button>
                <span className="w-10 text-center text-lg font-semibold" aria-label={t.quantity}>{qty}</span>
                <button type="button" onClick={() => setQty((q) => Math.min(limit, q + 1))} className="grid size-12 place-items-center hover:text-primary" aria-label="+" disabled={!product.inStock}><Icon name="plus" size={18} /></button>
              </div>
              <button type="button" disabled={!product.inStock} onClick={() => add(product.id, qty)} className="btn-primary min-w-48 flex-1 px-8 py-3.5 text-base">
                <Icon name="cart" size={20} />
                {product.inStock ? t.addToCart : t.outOfStock}
              </button>
            </div>
            <a href={ask} target="_blank" rel="noreferrer" className="btn mt-3 w-full border border-[#25d366] py-3 text-[#128c4b] hover:bg-[#25d366] hover:text-white">
              <WhatsAppGlyph size={20} />
              {t.askWhatsApp}
            </a>

            <ul className="mt-7 grid gap-3 border-y border-border py-5 text-sm">
              <li className="flex items-center gap-3"><Icon name="truck" size={19} className="text-primary" />{t.pickup}</li>
              <li className="flex items-center gap-3"><Icon name="shield" size={19} className="text-primary" />{t.usp.warranty} · {t.usp.returns}</li>
            </ul>

            <div className="mt-6">
              <ShareButtons product={product} />
            </div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <Reveal className="container-x border-t border-border py-14" deps={[id]}>
          <h2 className="mb-7 text-2xl font-extrabold sm:text-3xl" data-reveal>{t.similar}</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Reveal>
      )}
    </>
  )
}
