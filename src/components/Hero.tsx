import { useRef } from 'react'
import { EMAIL } from '../content'
import { useContourField } from '../hooks/useContourField'
import { Words } from './SplitText'

export function Hero() {
  const canvas = useRef<HTMLCanvasElement>(null)
  useContourField(canvas)
  return (
    <header className="hero">
      <canvas ref={canvas} id="field" aria-hidden="true" />
      <div className="wrap">
        <h1 data-split>
          <Words>
            From prototype<br />to production.<br />Then <em>own the outcome.</em>
          </Words>
        </h1>
        <div className="cta">
          <a className="btn ghost" href="#experience">Experience</a>
          <a className="btn" href="#work">Projects</a>
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
    </header>
  )
}
