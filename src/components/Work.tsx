import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { FEATURE, WORK } from '../content'
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

  // Step to the next/previous card's snap point rather than by a fixed width,
  // since the feature card is much wider than the rest.
  const nudge = useCallback((dir: number) => {
    const el = rail.current
    if (!el) return
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0
    const left = el.getBoundingClientRect().left
    const starts = Array.from(el.children)
      .filter((c): c is HTMLElement => c instanceof HTMLElement && c.matches('.pcard, .feature'))
      .map((c) => c.getBoundingClientRect().left - left + el.scrollLeft - pad)
    const here = el.scrollLeft
    const target = dir > 0
      ? starts.find((x) => x > here + 8)
      : [...starts].reverse().find((x) => x < here - 8)
    el.scrollTo({ left: target ?? (dir > 0 ? el.scrollWidth : 0), behavior: 'smooth' })
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
        <Feature />
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

function Feature() {
  const f = FEATURE
  return (
    <article className="feature" data-reveal aria-labelledby="feature-title">
      <div className="feature-media">
        <FeatureVideo />
        <ul className="feature-list">
          {f.features.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </div>
      <div className="feature-body">
        <span className="label">{f.n} · {f.meta.join(' · ')}</span>
        <h3 className="feature-title" id="feature-title">
          {f.title} <span>{f.subtitle}</span>
        </h3>
        <p className="feature-tagline">{f.tagline}</p>
        <p className="feature-lead">{f.lead}</p>
        {f.body.map((p, i) => <p key={i}>{p}</p>)}
        <div className="feature-links">
          <a className="btn" href={f.youtube} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
        </div>
      </div>
    </article>
  )
}

// Muted preview loop until you press play, then the full demo from YouTube.
function FeatureVideo() {
  const [playing, setPlaying] = useState(false)
  const f = FEATURE
  if (playing) {
    return (
      <div className="feature-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${f.youtubeId}?autoplay=1&rel=0`}
          title={`${f.title} — ${f.subtitle} demo`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <div className="feature-video">
      <video src={f.preview} poster={f.poster} muted autoPlay loop playsInline preload="metadata" aria-hidden="true" />
      <button type="button" className="feature-play" onClick={() => setPlaying(true)} aria-label={`Play the ${f.title} demo, ${f.duration}`}>
        <span className="feature-play-icon" aria-hidden="true">▶</span>
        <span>Watch the demo</span>
        <span className="feature-play-dur">{f.duration}</span>
      </button>
    </div>
  )
}
