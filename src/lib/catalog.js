// Catalog data access.
//
// The live shop keeps its ~3,000 products in the EasyFix Supabase project
// (tables `products`, `categories`, `product_categories`). This preview ships
// with the products that are publicly listed on the current homepage, so the
// design can be reviewed without credentials. To go live, replace the bodies of
// these functions with Supabase queries — the components only rely on the shape
// returned here:
//
//   { id, name, brand, price, category, condition: 'new'|'used',
//     grade: null|'used'|'pulled'|'service_pack'|'original', inStock, stock, image }

import rawProducts from '../data/products.json'

// `stock` stays null in the preview: exact quantities come from the live database.
const products = rawProducts.map((p, i) => ({ ...p, stock: p.inStock ? null : 0, featuredRank: i }))

export const MAX_QTY = 10
export const maxQty = (p) => (p.stock == null ? MAX_QTY : Math.min(p.stock, MAX_QTY))

export function getProducts({ category, q, brand, min, max, inStock, sort = 'featured', condition } = {}) {
  let list = products
  if (category) list = list.filter((p) => p.category === category)
  if (condition) list = list.filter((p) => p.condition === condition)
  if (brand) list = list.filter((p) => p.brand === brand)
  if (inStock) list = list.filter((p) => p.inStock)
  if (min != null && min !== '') list = list.filter((p) => p.price >= Number(min))
  if (max != null && max !== '') list = list.filter((p) => p.price <= Number(max))
  if (q) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
    list = list.filter((p) => {
      const hay = `${p.name} ${p.brand ?? ''}`.toLowerCase()
      return terms.every((t) => hay.includes(t))
    })
  }
  const sorted = [...list]
  if (sort === 'priceAsc') sorted.sort((a, b) => a.price - b.price)
  else if (sort === 'priceDesc') sorted.sort((a, b) => b.price - a.price)
  else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
  else sorted.sort((a, b) => Number(b.inStock) - Number(a.inStock) || a.featuredRank - b.featuredRank)
  return sorted
}

export function getProduct(id) {
  return products.find((p) => p.id === id) ?? null
}

export function getSimilar(product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, limit)
}

export function getBrands(list = products) {
  return [...new Set(list.map((p) => p.brand).filter(Boolean))].sort()
}

export function categoryCounts() {
  const counts = {}
  for (const p of products) counts[p.category] = (counts[p.category] ?? 0) + 1
  return counts
}

const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' })
export const formatPrice = (v) => euro.format(v)
