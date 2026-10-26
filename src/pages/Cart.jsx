import { useState } from 'react'
import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'
import { useCart } from '../lib/cart.jsx'
import { formatPrice, maxQty } from '../lib/catalog.js'
import { FREE_SHIPPING_FROM } from '../data/site.js'
import Icon from '../components/Icon.jsx'

export default function Cart() {
  const { t } = useLang()
  const { lines, subtotal, setQty } = useCart()
  const [note, setNote] = useState(false)
  const left = Math.max(0, FREE_SHIPPING_FROM - subtotal)
  const progress = Math.min(1, subtotal / FREE_SHIPPING_FROM)

  if (!lines.length) {
    return (
      <div className="container-x grid place-items-center py-24 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-accent text-primary"><Icon name="cart" size={36} /></span>
        <h1 className="mt-6 text-3xl font-extrabold">{t.cartEmpty}</h1>
        <Link to="/shop" className="btn-primary mt-7 px-7 py-3">{t.continueShopping}<Icon name="arrowRight" size={18} /></Link>
      </div>
    )
  }

  return (
    <div className="container-x py-10 sm:py-14">
      <h1 className="text-3xl font-extrabold sm:text-4xl">{t.yourCart}</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border rounded-2xl border border-border">
          {lines.map(({ product: p, qty }) => (
            <li key={p.id} className="flex gap-4 p-4 sm:p-5">
              <Link to={`/product/${p.id}`} className="size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-24">
                {p.image && <img src={p.image} alt="" className="size-full object-contain p-2 mix-blend-multiply" />}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[11px] font-semibold tracking-wider text-muted-fg uppercase">{p.brand}</p>
                <Link to={`/product/${p.id}`} className="line-clamp-2 text-sm font-semibold hover:text-primary sm:text-[15px]">{p.name}</Link>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <div className="flex items-center rounded-lg border border-border">
                    <button type="button" onClick={() => setQty(p.id, qty - 1)} className="grid size-9 place-items-center hover:text-primary" aria-label="−"><Icon name="minus" size={16} /></button>
                    <span className="w-8 text-center font-semibold">{qty}</span>
                    <button type="button" onClick={() => setQty(p.id, qty + 1)} disabled={qty >= maxQty(p)} className="grid size-9 place-items-center hover:text-primary disabled:opacity-40" aria-label="+"><Icon name="plus" size={16} /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-extrabold">{formatPrice(p.price * qty)}</p>
                    <button type="button" onClick={() => setQty(p.id, 0)} className="grid size-9 place-items-center rounded-full text-muted-fg hover:bg-rose-50 hover:text-destructive" aria-label={t.remove}><Icon name="trash" size={17} /></button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border p-5 sm:p-6 lg:sticky lg:top-28">
          <div className="rounded-xl bg-accent p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Icon name="truck" size={18} className="text-primary" />
              {left > 0 ? t.freeShippingLeft(formatPrice(left)) : t.freeShippingReached}
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
          <dl className="mt-5 grid gap-3 text-[15px]">
            <div className="flex justify-between"><dt className="text-muted-fg">{t.subtotal}</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-fg">{t.shippingLabel}</dt><dd className="font-semibold">{left > 0 ? t.calculatedAtCheckout : t.free}</dd></div>
            <div className="flex justify-between border-t border-border pt-3 text-lg"><dt className="font-bold">{t.total}</dt><dd className="font-extrabold text-primary">{formatPrice(subtotal)}</dd></div>
          </dl>
          <p className="mt-1 text-xs text-muted-fg">{t.vatIncluded}</p>
          <button type="button" onClick={() => setNote(true)} className="btn-primary mt-5 w-full py-3.5 text-base">{t.checkout}</button>
          {note && <p className="mt-3 text-center text-xs text-muted-fg">{t.checkoutNote}</p>}
          <Link to="/shop" className="mt-3 block text-center text-sm font-semibold text-primary hover:underline">{t.continueShopping}</Link>
        </aside>
      </div>
    </div>
  )
}
