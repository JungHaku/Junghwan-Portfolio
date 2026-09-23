import { NAV_LINKS } from '../content'

export function Nav() {
  return (
    <nav>
      <div className="wrap">
        <a className="brand" href="#">
          <img className="logo" src="/intmaxx-logo.png" alt="" width="28" height="28" />
          <span className="name">Junghwan Baik</span>
        </a>
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
