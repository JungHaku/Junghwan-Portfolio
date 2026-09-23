import type { CSSProperties } from 'react'
import { WORK } from '../content'
import { Words } from './SplitText'

export function Work() {
  return (
    <section className="light" id="work" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head">
          <h2 data-split><Words>Projects</Words></h2>
          <span className="label">03 — Deployed and in use</span>
        </div>
        <div className="work">
          {WORK.map((w, i) => (
            <a key={w.n} className="item" href={w.href} target={w.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" data-reveal style={{ '--i': i } as CSSProperties}>
              <span className="n">{w.n}</span>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
              <span className="meta">
                {w.meta.map((m, k) => (
                  <span key={m}>{k > 0 && <br />}{m}</span>
                ))}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
