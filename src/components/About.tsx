import { FACTS } from '../content'
import { Words } from './SplitText'

export function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="head">
          <h2 data-split><Words>About</Words></h2>
          <span className="label">05</span>
        </div>
        <div className="about">
          <p className="big" data-fill>
            <Words>
              Cognitive science student at UC Berkeley. Before engineering, I sold: cold calls, cold
              email, consulting.{' '}
              <span>
                That taught me the hardest part of software is the last mile to the customer. It's the
                part I want to own.
              </span>
            </Words>
          </p>
          <div className="facts" data-reveal>
            {FACTS.map((f) => (
              <div key={f.label}>
                <span className="label">{f.label}</span>
                <span>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
