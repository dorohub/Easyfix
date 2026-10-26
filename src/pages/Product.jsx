import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useLang } from '../i18n.jsx'
import { useCart } from '../lib/cart.jsx'
import { categoryBySlug, contact } from '../data/site.js'
import { formatPrice, getProduct, getSimilar, maxQty } from '../lib/catalog.js'
import ProductCard, { Badge } from '../components/ProductCard.jsx'
import Rail from '../components/Rail.jsx'
import Icon, { WhatsAppGlyph } from '../components/Icon.jsx'
import { Reveal } from '../components/Motion.jsx'
import NotFound from './NotFound.jsx'

function ShareRow({ product }) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const text = `${product.name} — ${formatPrice(product.price)}`
  const enc = encodeURIComponent
  const links = [
    ['WhatsApp', `https://wa.me/?text=${enc(`${text} ${url}`)}`],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`],
    ['X', `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`],
    ['Messenger', `fb-messenger://share/?link=${enc(url)}`],
    ['Email', `mailto:?subject=${enc(product.name)}&body=${enc(`${text}\n${url}`)}`],
  ]
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
      <span className="font-semibold">{t.share}</span>
      {links.map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" className="text-muted-fg transition hover:text-primary">{label}</a>
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
        className="flex cursor-pointer items-center gap-1 text-muted-fg transition hover:text-primary"
      >
        <Icon name={copied ? 'check' : 'link'} size={14} />
        {copied ? t.linkCopied : t.copyLink}
      </button>
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
  const similar = getSimilar(product, 8)
  const limit = maxQty(product)
  const ask = `${contact.whatsapp}?text=${encodeURIComponent(`Hi EasyFix, I'm interested in: ${product.name}`)}`

  return (
    <>
      <div className="container-x pt-6 pb-16 sm:pt-10 sm:pb-24">
        <nav className="mb-8 flex flex-wrap items-center gap-1 text-[12px] text-muted-fg" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand">{t.nav.home}</Link>
          <Icon name="chevronRight" size={12} />
          <Link to="/shop" className="hover:text-brand">{t.nav.shop}</Link>
          {category && (
            <>
              <Icon name="chevronRight" size={12} />
              <Link to={`/category/${category.slug}`} className="hover:text-brand">{pick(category.name)}</Link>
            </>
          )}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="relative overflow-hidden rounded-[36px] bg-muted">
              <div className="aspect-square">
                {product.image && <img src={product.image} alt={product.name} className="size-full object-contain p-10 mix-blend-multiply sm:p-16" />}
              </div>
            </div>
          </div>

          <div className="lg:pt-6">
            <Badge product={product} className="text-[14px]" />
            <h1 className="mt-2 text-[28px] leading-[1.12] font-bold tracking-[-0.03em] sm:text-[36px]">{product.name}</h1>
            <p className="mt-2 text-muted-fg">{product.brand}{category ? ` · ${pick(category.name)}` : ''}</p>
            <p className="mt-8 text-[32px] font-semibold tracking-[-0.03em]">{formatPrice(product.price)}</p>
            <p className="text-[12px] text-muted-fg">{t.vatIncluded}</p>

            <div className="mt-8 grid gap-3 rounded-[24px] border border-border p-5">
              <div className="flex items-center justify-between text-[15px]">
                <span className="text-muted-fg">{t.condition}</span>
                <span className="font-semibold">{product.condition === 'used' ? t.conditionUsed : t.conditionNew}{product.grade && product.grade !== 'used' ? ` · ${t.badge[product.grade]}` : ''}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between text-[15px]">
                <span className="text-muted-fg">{t.inStock}</span>
                <span className={`flex items-center gap-2 font-semibold ${product.inStock ? 'text-success' : 'text-destructive'}`}>
                  <span className={`size-2 rounded-full ${product.inStock ? 'bg-success' : 'bg-destructive'}`} />
                  {product.inStock ? (product.stock ? t.inStockCount(product.stock) : t.inStock) : t.outOfStock}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="flex items-center rounded-full bg-muted">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-12 cursor-pointer place-items-center rounded-full hover:text-primary disabled:opacity-40" aria-label="−" disabled={!product.inStock || qty <= 1}><Icon name="minus" size={17} /></button>
                <span className="w-8 text-center text-[17px] font-semibold" aria-label={t.quantity}>{qty}</span>
                <button type="button" onClick={() => setQty((q) => Math.min(limit, q + 1))} className="grid size-12 cursor-pointer place-items-center rounded-full hover:text-primary disabled:opacity-40" aria-label="+" disabled={!product.inStock || qty >= limit}><Icon name="plus" size={17} /></button>
              </div>
              <button type="button" disabled={!product.inStock} onClick={() => add(product.id, qty)} className="btn-primary flex-1 py-3.5 text-[17px]">
                {product.inStock ? t.addToCart : t.outOfStock}
              </button>
            </div>
            <a href={ask} target="_blank" rel="noreferrer" className="link-arrow mt-5 text-[15px] text-[#128c4b]">
              <WhatsAppGlyph size={18} />
              {t.askWhatsApp}
              <Icon name="chevronRight" size={15} />
            </a>

            <ul className="mt-10 grid gap-5 border-t border-border pt-8 text-[15px]">
              <li className="flex gap-4"><Icon name="truck" size={22} className="shrink-0 text-primary" /><span>{t.pickup}</span></li>
              <li className="flex gap-4"><Icon name="shield" size={22} className="shrink-0 text-primary" /><span>{t.usp.warranty} · {t.usp.returns}</span></li>
              <li className="flex gap-4"><Icon name="store" size={22} className="shrink-0 text-primary" /><span>Zinas Kanther 2 · Georgiou A 14, Limassol</span></li>
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <ShareRow product={product} />
            </div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <Reveal className="bg-muted pt-16 sm:pt-20" deps={[id]}>
          <div className="container-x">
            <h2 className="display-md" data-reveal>{t.similar}</h2>
          </div>
          <Rail label={t.similar} className="mt-8 pb-6">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} variant="rail" />
            ))}
          </Rail>
        </Reveal>
      )}
    </>
  )
}
