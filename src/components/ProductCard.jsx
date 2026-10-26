import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'
import { useCart } from '../lib/cart.jsx'
import { formatPrice } from '../lib/catalog.js'
import Icon from './Icon.jsx'

// Corner ribbons in the same colour scheme as the current site.
const ribbonStyle = {
  new: 'from-emerald-500 to-emerald-700',
  used: 'from-emerald-400 to-emerald-600',
  pulled: 'from-amber-500 to-yellow-600',
  service_pack: 'from-orange-400 to-orange-600',
  original: 'from-yellow-400 to-amber-600',
  out: 'from-rose-500 to-rose-700',
}

export function ribbonKey(p) {
  if (!p.inStock) return 'out'
  return p.grade ?? 'new'
}

export function Ribbon({ product, size = 'md' }) {
  const { t } = useLang()
  const key = ribbonKey(product)
  const big = size === 'lg'
  return (
    <div className={`pointer-events-none absolute top-0 left-0 z-10 overflow-hidden ${big ? 'size-32' : 'size-24'}`}>
      <span
        className={`absolute -rotate-45 bg-gradient-to-br text-center font-bold tracking-wider text-white uppercase shadow-md ${ribbonStyle[key]} ${
          big ? 'top-[24px] -left-[42px] w-[180px] py-1.5 text-xs' : 'top-[18px] -left-[34px] w-[140px] py-1 text-[10.5px]'
        }`}
      >
        {t.badge[key]}
      </span>
    </div>
  )
}

export default function ProductCard({ product }) {
  const { t } = useLang()
  const { add } = useCart()
  const to = `/product/${product.id}`

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)]" data-reveal-item>
      <Link to={to} className="relative block aspect-square overflow-hidden bg-gradient-to-b from-[#f7f7f7] to-muted" tabIndex={-1} aria-hidden="true">
        <Ribbon product={product} />
        {product.image ? (
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            className={`size-full object-contain p-4 mix-blend-multiply transition duration-500 group-hover:scale-[1.06] sm:p-5 ${product.inStock ? '' : 'opacity-60 grayscale-[40%]'}`}
          />
        ) : (
          <div className="grid size-full place-items-center text-border"><Icon name="phone" size={64} /></div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[10.5px] font-semibold tracking-wider text-muted-fg uppercase">{product.brand ?? '—'}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.6em] text-[13.5px] leading-snug font-medium sm:text-sm">
          <Link to={to} className="transition after:absolute after:inset-0 after:content-[''] hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="text-lg font-extrabold tracking-tight text-primary sm:text-xl">{formatPrice(product.price)}</p>
        </div>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => add(product.id)}
          className="btn-primary relative z-10 mt-3 w-full py-2 text-[13px] sm:text-sm"
        >
          {product.inStock ? (
            <>
              <Icon name="cart" size={17} />
              {t.addToCart}
            </>
          ) : (
            t.outOfStock
          )}
        </button>
      </div>
    </article>
  )
}
