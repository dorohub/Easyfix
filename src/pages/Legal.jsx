import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'
import { legal } from '../data/legal.js'
import NotFound from './NotFound.jsx'

const order = ['terms', 'privacy', 'cookies', 'returns', 'gdpr', 'shipping', 'payment']

export default function Legal({ page }) {
  const { t } = useLang()
  const doc = legal[page]
  if (!doc) return <NotFound />

  return (
    <div className="container-x grid gap-10 py-12 sm:py-16 lg:grid-cols-[240px_1fr]">
      <nav className="hidden lg:block" aria-label={t.footer.legal}>
        <ul className="sticky top-28 grid gap-1">
          {order.map((k) => (
            <li key={k}>
              <Link to={`/${k}`} className={`block rounded-lg px-3 py-2 text-[15px] ${k === page ? 'bg-accent font-semibold text-primary' : 'text-muted-fg hover:bg-muted hover:text-brand'}`}>
                {t.legal[k]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <article className="prose-legal max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-5xl">{t.legal[page]}</h1>
        <p className="mt-5 !text-lg">{doc.intro}</p>
        {doc.sections.map(([heading, blocks]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            {blocks.map((b, i) =>
              typeof b === 'string' ? (
                <p key={i}>{b}</p>
              ) : (
                <ul key={i}>
                  {b.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )
            )}
          </section>
        ))}
      </article>
    </div>
  )
}
