import type { CSSProperties } from 'react'
import { EXPERIENCE } from '../content'
import { Words } from './SplitText'

export function Experience() {
  return (
    <section className="light" id="experience" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head">
          <h2 data-split><Words>Experience</Words></h2>
          <span className="label">02 — Where I've shipped</span>
        </div>
        <div className="work">
          {EXPERIENCE.map((e, i) => {
            const logo = e.logo && <img className="orglogo" src={e.logo} alt="" style={{ height: e.logoH ?? 20 }} />
            return (
            <div key={e.n} className="item" data-reveal style={{ '--i': i } as CSSProperties}>
              <span className="n">{e.n}</span>
              <h4>
                {e.href ? (
                  <a className="orglink" href={e.href} target="_blank" rel="noopener noreferrer">
                    {logo}
                    {e.org}
                  </a>
                ) : (
                  <>
                    {logo}
                    {e.org}
                  </>
                )}
                <span className="role">{e.role}</span>
              </h4>
              <p>{e.desc}</p>
              <span className="meta">{e.dates[0]}<br />{e.dates[1]}</span>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
