import { Link } from 'react-router'
import { useLang } from '../i18n.jsx'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="container-x grid place-items-center py-24 text-center">
      <p className="text-8xl font-extrabold text-primary">404</p>
      <h1 className="display-md mt-4">{t.notFound.title}</h1>
      <p className="mt-2 text-muted-fg">{t.notFound.text}</p>
      <Link to="/" className="btn-primary mt-7 px-7 py-3">{t.notFound.back}</Link>
    </div>
  )
}
