import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

// Horizontal, snap-scrolling row (Apple Store style) with prev/next buttons.
// The first item lines up with the page container; the row bleeds to the viewport edge.
export default function Rail({ children, label, className = '' }) {
  const ref = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = () => {
    const el = ref.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }
  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const scroll = (dir) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        onScroll={update}
        data-lenis-prevent-horizontal
        aria-label={label}
        role="region"
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-[max(20px,calc((100vw-1200px)/2+32px))] gap-4 overflow-x-auto px-[max(20px,calc((100vw-1200px)/2+32px))] pt-2 pb-10 sm:gap-5"
      >
        {children}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>
      <div className="container-x -mt-4 flex justify-end gap-2.5">
        <button type="button" onClick={() => scroll(-1)} disabled={edges.start} className="grid size-9 cursor-pointer place-items-center rounded-full bg-black/[0.06] text-brand transition hover:bg-black/10 disabled:cursor-default disabled:opacity-35" aria-label="Previous">
          <Icon name="chevronLeft" size={18} />
        </button>
        <button type="button" onClick={() => scroll(1)} disabled={edges.end} className="grid size-9 cursor-pointer place-items-center rounded-full bg-black/[0.06] text-brand transition hover:bg-black/10 disabled:cursor-default disabled:opacity-35" aria-label="Next">
          <Icon name="chevronRight" size={18} />
        </button>
      </div>
    </div>
  )
}

export function SectionTitle({ parts, className = '', dark = false }) {
  const [strong, soft] = parts
  return (
    <h2 className={`display-md max-w-4xl ${className}`} data-reveal>
      <span className={dark ? 'text-white' : 'text-brand'}>{strong}</span>{' '}
      <span className={dark ? 'text-white/55' : 'text-muted-fg'}>{soft}</span>
    </h2>
  )
}
