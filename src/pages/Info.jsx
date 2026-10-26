import { useState } from 'react'
import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'
import { contact, stores } from '../data/site.js'
import Icon, { WhatsAppGlyph } from '../components/Icon.jsx'
import { Reveal } from '../components/Motion.jsx'
import VantaNet from '../components/VantaNet.jsx'

function PageHero({ eyebrow, title, lead, children, vanta = false }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      {vanta && <VantaNet />}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand via-brand/90 to-brand/40" />
      <div className="absolute -top-40 -right-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(246_128_0/0.28),transparent_65%)]" />
      <div className="container-x relative py-14 sm:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-[34px] leading-[1.05] font-extrabold sm:text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{lead}</p>}
        {children}
      </div>
    </section>
  )
}

function StoreCards() {
  const { t, pick } = useLang()
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stores.map((s) => (
        <div key={s.id} className="rounded-2xl border border-border p-5 sm:p-6" data-reveal-item>
          <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary"><Icon name="store" size={22} /></span>
          <p className="mt-4 text-lg font-bold">EasyFix {pick(s.name)}</p>
          <p className="mt-1 text-muted-fg">{pick(s.address)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={s.map} target="_blank" rel="noreferrer" className="btn-outline py-2"><Icon name="pin" size={16} />{t.contactPage.directions}</a>
            <a href={s.wolt} target="_blank" rel="noreferrer" className="btn border border-[#009de0] py-2 text-[#0077aa] hover:bg-[#009de0] hover:text-white">Wolt</a>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Repairs() {
  const { t } = useLang()
  const r = t.repairs
  const icons = ['screen', 'battery', 'port', 'water']
  return (
    <>
      <PageHero eyebrow={r.eyebrow} title={r.title} lead={r.lead}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={contact.phoneHref} className="btn-primary px-6 py-3.5"><Icon name="call" size={18} />{contact.phone}</a>
          <a href={`${contact.whatsapp}?text=${encodeURIComponent('Hi EasyFix, I need a repair quote for my phone.')}`} target="_blank" rel="noreferrer" className="btn-ghost-light px-6 py-3.5"><WhatsAppGlyph size={18} />{r.cta}</a>
        </div>
      </PageHero>
      <Reveal>
        <section className="container-x py-16">
          <h2 className="text-2xl font-extrabold sm:text-3xl" data-reveal>{r.servicesTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {r.services.map(([title, text], i) => (
              <div key={title} className="group rounded-2xl border border-border p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-lift)]" data-reveal-item>
                <span className="grid size-12 place-items-center rounded-xl bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-fg"><Icon name={icons[i]} size={24} /></span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-muted py-16">
          <div className="container-x">
            <h2 className="text-2xl font-extrabold sm:text-3xl" data-reveal>{r.stepsTitle}</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {r.steps.map(([title, text], i) => (
                <li key={title} className="relative rounded-2xl bg-white p-6 shadow-[var(--shadow-card)]" data-reveal-item>
                  <span className="text-5xl font-extrabold text-primary/20">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="container-x py-16">
          <h2 className="text-2xl font-extrabold sm:text-3xl" data-reveal>{r.brandsTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {r.brands.map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-brand p-6 text-white" data-reveal-item>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="container-x pb-16">
          <h2 className="mb-6 text-2xl font-extrabold sm:text-3xl" data-reveal>{r.visit}</h2>
          <StoreCards />
        </section>
      </Reveal>
    </>
  )
}

export function About() {
  const { t } = useLang()
  const icons = ['store', 'users', 'wrench']
  return (
    <>
      <PageHero eyebrow="EasyFix Cyprus" title={t.about.title} lead={t.about.lead} />
      <Reveal>
        <section className="container-x py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {t.about.points.map(([title, text], i) => (
              <div key={title} className="rounded-2xl border border-border p-6" data-reveal-item>
                <span className="grid size-12 place-items-center rounded-xl bg-accent text-primary"><Icon name={icons[i]} size={24} /></span>
                <h2 className="mt-5 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="container-x pb-16">
          <StoreCards />
        </section>
      </Reveal>
    </>
  )
}

export function Contact() {
  const { t } = useLang()
  const c = t.contactPage
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`Website enquiry — ${form.name}`)}&body=${encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)}`

  return (
    <>
      <PageHero title={c.title} lead={c.lead} />
      <Reveal>
        <section className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid content-start gap-4">
            <a href={contact.phoneHref} className="flex items-center gap-4 rounded-2xl border border-border p-5 transition hover:border-primary" data-reveal-item>
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-fg"><Icon name="call" size={22} /></span>
              <span><span className="block text-xs text-muted-fg">{c.phone}</span><span className="text-lg font-bold">{contact.phone}</span></span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-4 rounded-2xl border border-border p-5 transition hover:border-primary" data-reveal-item>
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-fg"><Icon name="mail" size={22} /></span>
              <span><span className="block text-xs text-muted-fg">{c.email}</span><span className="text-lg font-bold">{contact.email}</span></span>
            </a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border p-5 transition hover:border-[#25d366]" data-reveal-item>
              <span className="grid size-12 place-items-center rounded-xl bg-[#25d366] text-white"><WhatsAppGlyph size={24} /></span>
              <span><span className="block text-xs text-muted-fg">WhatsApp</span><span className="text-lg font-bold">{t.whatsapp}</span></span>
            </a>
            <div className="mt-2"><StoreCards /></div>
          </div>

          <form
            className="h-fit rounded-3xl bg-muted p-6 sm:p-8"
            data-reveal
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = mailto
            }}
          >
            <h2 className="text-2xl font-extrabold">{c.formTitle}</h2>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-1.5 text-sm font-semibold">{c.name}<input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" /></label>
              <label className="grid gap-1.5 text-sm font-semibold">{c.email}<input required type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" /></label>
              <label className="grid gap-1.5 text-sm font-semibold">{c.message}<textarea required rows={5} className="input resize-y" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
              <button type="submit" className="btn-primary py-3.5 text-base">{c.send}<Icon name="arrowRight" size={18} /></button>
            </div>
          </form>
        </section>
      </Reveal>
    </>
  )
}

export function Wholesale() {
  const { t } = useLang()
  const w = t.wholesalePage
  const icons = ['bolt', 'chip', 'truck']
  return (
    <>
      <PageHero eyebrow={t.wholesaleBand.eyebrow} title={w.title} lead={w.lead} vanta>
        <p className="mt-3 text-white/60">{w.note}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/login" className="btn-primary px-7 py-3.5">{w.signIn}</Link>
          <Link to="/login?mode=signup" className="btn-ghost-light px-7 py-3.5">{w.signUp}</Link>
        </div>
      </PageHero>
      <Reveal>
        <section className="container-x grid gap-4 py-16 md:grid-cols-3">
          {w.perks.map(([title, text], i) => (
            <div key={title} className="rounded-2xl border border-border p-6" data-reveal-item>
              <span className="grid size-12 place-items-center rounded-xl bg-accent text-primary"><Icon name={icons[i]} size={24} /></span>
              <h2 className="mt-5 text-lg font-bold">{title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">{text}</p>
            </div>
          ))}
        </section>
      </Reveal>
    </>
  )
}

export function Login() {
  const { t } = useLang()
  const l = t.loginPage
  const [sent, setSent] = useState(false)
  return (
    <div className="container-x grid place-items-center py-16 sm:py-24">
      <form
        className="w-full max-w-md rounded-3xl border border-border p-6 shadow-[var(--shadow-card)] sm:p-8"
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
        }}
      >
        <h1 className="text-3xl font-extrabold">{l.title}</h1>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-1.5 text-sm font-semibold">{l.email}<input required type="email" className="input" autoComplete="email" /></label>
          <label className="grid gap-1.5 text-sm font-semibold">{l.password}<input required type="password" className="input" autoComplete="current-password" /></label>
          <button type="submit" className="btn-primary py-3.5 text-base">{l.submit}</button>
          {sent && <p className="rounded-lg bg-accent px-3 py-2 text-center text-sm">{l.note}</p>}
        </div>
        <p className="mt-6 text-center text-sm text-muted-fg">
          {l.noAccount} <Link to="/login?mode=signup" className="font-semibold text-primary hover:underline">{l.signUp}</Link>
        </p>
      </form>
    </div>
  )
}
