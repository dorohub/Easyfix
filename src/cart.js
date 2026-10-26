import { gsap } from 'gsap'
import { products } from './data.js'

const STORAGE_KEY = 'easyfix-cart'
const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' })

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return typeof parsed === 'object' && parsed ? parsed : {}
  } catch {
    return {}
  }
}

function save(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // storage unavailable (private mode) — cart still works for this visit
  }
}

export function createCart({ lenis, toast }) {
  let items = load() // { [productId]: qty }

  const drawer = document.querySelector('[data-cart]')
  const backdrop = document.querySelector('[data-cart-backdrop]')
  const list = document.querySelector('[data-cart-list]')
  const empty = document.querySelector('[data-cart-empty]')
  const total = document.querySelector('[data-cart-total]')
  const count = document.querySelector('[data-cart-count]')
  const checkout = document.querySelector('[data-checkout]')
  let lastFocus = null

  const byId = Object.fromEntries(products.map((p) => [p.id, p]))

  function render() {
    const entries = Object.entries(items).filter(([id, qty]) => byId[id] && qty > 0)
    const qtyTotal = entries.reduce((sum, [, qty]) => sum + qty, 0)
    const sum = entries.reduce((s, [id, qty]) => s + byId[id].price * qty, 0)

    count.textContent = qtyTotal
    count.classList.toggle('is-visible', qtyTotal > 0)
    total.textContent = euro.format(sum)
    empty.hidden = entries.length > 0
    checkout.disabled = entries.length === 0

    list.innerHTML = entries
      .map(([id, qty]) => {
        const p = byId[id]
        return `
        <li class="cart-item" data-id="${id}">
          <div class="cart-item__thumb" style="--h:${p.hue}"></div>
          <div class="cart-item__info">
            <p class="cart-item__name">${p.name}</p>
            <p class="cart-item__meta">${euro.format(p.price)}</p>
          </div>
          <div class="qty">
            <button type="button" data-qty="-1" aria-label="Decrease quantity of ${p.name}">−</button>
            <span>${qty}</span>
            <button type="button" data-qty="1" aria-label="Increase quantity of ${p.name}">+</button>
          </div>
        </li>`
      })
      .join('')
  }

  function add(id) {
    items[id] = (items[id] || 0) + 1
    save(items)
    render()
    gsap.fromTo(count, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' })
    toast(`${byId[id].name} added to cart`)
  }

  function change(id, delta) {
    items[id] = Math.max(0, (items[id] || 0) + delta)
    if (items[id] === 0) delete items[id]
    save(items)
    render()
  }

  function open() {
    lastFocus = document.activeElement
    drawer.removeAttribute('inert')
    drawer.setAttribute('aria-hidden', 'false')
    backdrop.hidden = false
    document.documentElement.classList.add('cart-open')
    lenis?.stop()
    gsap.to(drawer, { xPercent: 0, duration: 0.5, ease: 'power3.out' })
    gsap.to(backdrop, { autoAlpha: 1, duration: 0.3 })
    drawer.querySelector('[data-cart-close]').focus()
  }

  function close() {
    drawer.setAttribute('aria-hidden', 'true')
    drawer.setAttribute('inert', '')
    document.documentElement.classList.remove('cart-open')
    lenis?.start()
    gsap.to(drawer, { xPercent: 105, duration: 0.4, ease: 'power3.in' })
    gsap.to(backdrop, { autoAlpha: 0, duration: 0.3, onComplete: () => (backdrop.hidden = true) })
    lastFocus?.focus?.()
  }

  gsap.set(drawer, { xPercent: 105 })
  gsap.set(backdrop, { autoAlpha: 0 })

  document.querySelectorAll('[data-cart-open]').forEach((b) => b.addEventListener('click', open))
  drawer.querySelector('[data-cart-close]').addEventListener('click', close)
  backdrop.addEventListener('click', close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') close()
  })
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-qty]')
    if (!btn) return
    change(btn.closest('[data-id]').dataset.id, Number(btn.dataset.qty))
  })
  checkout.addEventListener('click', () => toast('Checkout will connect to the shop system in the next phase.'))

  render()
  return { add, open, close }
}
