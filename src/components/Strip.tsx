import type { CSSProperties } from 'react'
import { MARQUEE, STRIP } from '../content'

export function Strip() {
  return (
    <div className="strip">
      <div className="wrap">
        {STRIP.map((s, i) => (
          <div key={s.label} className="cell" data-reveal style={{ '--i': i } as CSSProperties}>
            <span className="label">{s.label}</span>
            <span className="val">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {items.map((m, i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  )
}
