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
        <div className="label">Forward Deployed Engineer — Berkeley, CA</div>
        <h1 data-split>
          <Words>
            From prototype<br />to production.<br />Then <em>own the outcome.</em>
          </Words>
        </h1>
        <p>
          I build agentic AI systems and take them the last mile: into the customer's data, their
          infrastructure and their daily workflow, measured on the numbers they already track.
        </p>
        <div className="cta">
          <a className="btn" href="#work">Selected work</a>
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
    </header>
  )
}
