import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'
import { useCart } from '../lib/cart.jsx'
import { formatPrice } from '../lib/catalog.js'
import Icon from './Icon.jsx'

export function badgeKey(p) {
  if (!p.inStock) return 'out'
  return p.grade ?? 'new'
}

// Small text label (Apple "New"-style) instead of the old corner ribbons. Same states as the current site.
export function Badge({ product, className = '' }) {
  const { t } = useLang()
  const key = badgeKey(product)
  const tone = key === 'out' ? 'text-destructive' : key === 'new' ? 'text-success' : 'text-primary'
  return <p className={`text-[12px] font-semibold ${tone} ${className}`}>{t.badge[key]}</p>
}

export default function ProductCard({ product, variant = 'grid' }) {
  const { t } = useLang()
  const { add } = useCart()
  const to = `/product/${product.id}`
  const wide = variant === 'rail'

  return (
    <article
      className={`group relative flex h-full flex-col rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] transition duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${wide ? 'w-[72vw] shrink-0 snap-start sm:w-[300px]' : ''}`}
      data-reveal-item
    >
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <Badge product={product} />
      </div>
      <Link to={to} className="relative mx-auto flex aspect-square w-full items-center justify-center px-6 py-2" tabIndex={-1} aria-hidden="true">
        {product.image ? (
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            className={`max-h-full max-w-full rounded-[18px] object-contain mix-blend-multiply transition duration-700 ease-(--ease-out-expo) group-hover:scale-[1.05] ${product.inStock ? '' : 'opacity-50 grayscale'}`}
          />
        ) : (
          <div className="grid size-full place-items-center text-border"><Icon name="phone" size={64} /></div>
        )}
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        <p className="text-[12px] font-medium text-muted-fg">{product.brand ?? ' '}</p>
        <h3 className="mt-0.5 line-clamp-2 text-[15px] leading-snug font-semibold tracking-[-0.015em] sm:text-[16px]">
          <Link to={to} className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-['']">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-[15px] font-semibold tracking-tight sm:text-[16px]">{formatPrice(product.price)}</p>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => add(product.id)}
            aria-label={product.inStock ? `${t.addToCart}: ${product.name}` : t.outOfStock}
            title={product.inStock ? t.addToCart : t.outOfStock}
            className="relative z-10 grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-primary text-primary-fg transition duration-300 hover:scale-110 hover:bg-primary-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-fg disabled:hover:scale-100"
          >
            <Icon name="plus" size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </article>
  )
}
