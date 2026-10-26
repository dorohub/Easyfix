import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'
import { useCart } from '../lib/cart.jsx'
import { contact } from '../data/site.js'
import Icon, { WhatsAppGlyph } from './Icon.jsx'

const CONSENT_KEY = 'easyfix-cookie-consent'
const PREVIEW_KEY = 'easyfix-preview-banner'

export const IS_PREVIEW = import.meta.env.VITE_PREVIEW !== 'false'

export function PreviewBanner() {
  const { t } = useLang()
  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem(PREVIEW_KEY) === 'hidden'
    } catch {
      return false
    }
  })
  if (!IS_PREVIEW || hidden) return null
  return (
    <div className="relative bg-brand text-white" role="note">
      <p className="container-x py-2 pr-12 text-center text-[12px] leading-snug font-medium sm:text-[13px]">
        <Icon name="bolt" size={14} className="mr-1.5 inline -translate-y-px text-primary" />
        {t.preview.text}
      </p>
      <button
        type="button"
        onClick={() => {
          setHidden(true)
          try {
            sessionStorage.setItem(PREVIEW_KEY, 'hidden')
          } catch {}
        }}
        className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full hover:bg-white/10"
        aria-label={t.close}
      >
        <Icon name="x" size={18} />
      </button>
    </div>
  )
}

export function CookieBanner() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(CONSENT_KEY))
    } catch {
      setVisible(true)
    }
  }, [])

  const decide = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {}
    setVisible(false)
  }

  if (!visible) return null
  return (
    <div className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-[24px] border border-black/5 p-4 shadow-[var(--shadow-lift)] glass sm:inset-x-6 sm:bottom-6 sm:flex sm:items-center sm:gap-6 sm:p-5" role="dialog" aria-live="polite" aria-label="Cookies">
      <p className="text-[13px] leading-relaxed text-muted-fg">
        {t.cookie.text}{' '}
        <Link to="/cookies" className="font-semibold text-primary underline-offset-2 hover:underline">{t.cookie.policy}</Link>
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <button type="button" className="btn-outline flex-1 sm:flex-none" onClick={() => decide('rejected')}>{t.cookie.reject}</button>
        <button type="button" className="btn-primary flex-1 sm:flex-none" onClick={() => decide('accepted')}>{t.cookie.accept}</button>
      </div>
    </div>
  )
}

export function WhatsAppButton() {
  const { t } = useLang()
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp}
      className="group fixed right-4 bottom-4 z-[60] flex items-center gap-2 rounded-full bg-[#25d366] p-3 text-white shadow-[0_12px_30px_-10px_rgb(37_211_102/0.8)] transition duration-300 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppGlyph size={26} />
      <span className="hidden max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-hover:pr-1 sm:inline">{t.whatsapp}</span>
    </a>
  )
}

export function CartToast() {
  const { t } = useLang()
  const { toast, lines } = useCart()
  const line = toast && lines.find((l) => l.product.id === toast.id)
  return (
    <div className={`pointer-events-none fixed top-24 left-1/2 z-[90] -translate-x-1/2 transition-all duration-300 ${line ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`} role="status" aria-live="polite">
      {line && (
        <div key={toast.key} className="pointer-events-auto flex items-center gap-3 rounded-full py-2 pr-2 pl-2 text-white shadow-[var(--shadow-lift)] glass-dark">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-fg"><Icon name="check" size={18} strokeWidth={2.5} /></span>
          <span className="max-w-[48vw] truncate text-sm font-medium sm:max-w-xs">{t.added}</span>
          <Link to="/cart" className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-fg hover:bg-primary-600">{t.cart}</Link>
        </div>
      )}
    </div>
  )
}
