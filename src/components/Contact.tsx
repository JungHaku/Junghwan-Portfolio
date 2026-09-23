import { EMAIL, SOCIAL } from '../content'
import { Chars } from './SplitText'

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <span className="label">06 — Contact</span>
        <a className="mail" href={`mailto:${EMAIL}`} data-chars aria-label={EMAIL}>
          <Chars text={EMAIL} />
        </a>
        <div className="sub">
          {SOCIAL.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span className="label">© {new Date().getFullYear()} Junghwan Baik</span>
        <span className="label">Berkeley, CA</span>
      </div>
    </footer>
  )
}
