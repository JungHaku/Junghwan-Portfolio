import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { WORK } from '../content'
import { Words } from './SplitText'

export function Work() {
  const rail = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = rail.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  const nudge = useCallback((dir: number) => {
    const el = rail.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.pcard')
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }, [])

  return (
    <section className="light" id="projects" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head">
          <h2 data-split><Words>Projects</Words></h2>
          <div className="head-side">
            <span className="label">03 — Deployed and in use</span>
            <div className="rail-nav">
              <button type="button" onClick={() => nudge(-1)} disabled={atStart} aria-label="Scroll projects left">←</button>
              <button type="button" onClick={() => nudge(1)} disabled={atEnd} aria-label="Scroll projects right">→</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`rail${atEnd ? ' at-end' : ''}`} ref={rail} onScroll={sync}>
        {WORK.map((w, i) => {
          const external = w.href.startsWith('http')
          return (
            <a
              key={w.n}
              className="pcard"
              href={w.href}
              target={external ? '_blank' : undefined}
              rel="noreferrer"
              data-reveal
              style={{ '--i': i } as CSSProperties}
            >
              <span className="pcard-img">
                <img src={w.image} alt="" loading="lazy" />
                <span className="pcard-n">{w.n}</span>
              </span>
              <span className="pcard-body">
                <span className="label">{w.meta.join(' · ')}</span>
                <span className="pcard-title">
                  {w.title}
                  {external && <span className="arw" aria-hidden="true">↗</span>}
                </span>
                <span className="pcard-desc">{w.desc}</span>
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
