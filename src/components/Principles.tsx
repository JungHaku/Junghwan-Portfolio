import type { CSSProperties } from 'react'
import { PRINCIPLES } from '../content'
import { Words } from './SplitText'

export function Principles() {
  return (
    <section className="blue-bg">
      <div className="wrap">
        <div className="head">
          <h2 data-split><Words>Three rules I build by.</Words></h2>
          <span className="label">04 — Principles</span>
        </div>
        <div className="principles">
          {PRINCIPLES.map((p, i) => (
            <div key={p.n} className="pr" data-reveal style={{ '--i': i } as CSSProperties}>
              <span className="n">{p.n}</span>
              <h3 data-split><Words>{p.title}</Words></h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
