import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct, maxQty } from './catalog.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'easyfix-cart'

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load) // { [productId]: qty }
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(id)
  }, [toast])

  const add = useCallback((id, qty = 1) => {
    const product = getProduct(id)
    if (!product?.inStock) return
    setItems((prev) => ({ ...prev, [id]: Math.min((prev[id] || 0) + qty, maxQty(product)) }))
    setToast({ id, key: Date.now() })
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((prev) => {
      const next = { ...prev }
      const product = getProduct(id)
      if (qty <= 0 || !product) delete next[id]
      else next[id] = Math.min(qty, maxQty(product))
      return next
    })
  }, [])

  const value = useMemo(() => {
    const lines = Object.entries(items)
      .map(([id, qty]) => ({ product: getProduct(id), qty }))
      .filter((l) => l.product)
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0)
    return { lines, count, subtotal, add, setQty, toast }
  }, [items, add, setQty, toast])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
