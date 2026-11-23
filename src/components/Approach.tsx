import type { CSSProperties } from 'react'
import { PROOF } from '../content'
import { Words } from './SplitText'

export function Approach() {
  return (
    <section className="light" id="approach">
      <div className="wrap">
        <div className="head">
          <h2 data-split><Words>I've already built on <em>your stack.</em></Words></h2>
          <span className="label">01 — Why me</span>
        </div>
        <div className="proof">
          {PROOF.map((p, i) => (
            <article key={p.n} className="proof-card" data-reveal style={{ '--i': i } as CSSProperties}>
              <span className="label">{p.label}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <ul>
                {p.stack.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
