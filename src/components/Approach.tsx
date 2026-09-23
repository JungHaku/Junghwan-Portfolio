import type { CSSProperties } from 'react'
import { Words } from './SplitText'

export function Approach() {
  return (
    <section className="light" id="approach">
      <div className="wrap">
        <div className="head">
          <h2 data-split><Words>Intelligence is cheap. Deployment is the hard part.</Words></h2>
          <span className="label">01 — Approach</span>
        </div>
        <div className="cols">
          <div className="col" data-reveal style={{ '--i': 0 } as CSSProperties}>
            <span className="label">The problem</span>
            <h3 data-split><Words>Most AI projects die between the demo and the workflow.</Words></h3>
            <p>
              The model works in a notebook. Then it meets messy data, edge cases nobody wrote down,
              and users who were never asked what they need. The token bill keeps climbing while the
              metrics the business actually tracks stay flat.
            </p>
          </div>
          <div className="col" data-reveal style={{ '--i': 1 } as CSSProperties}>
            <span className="label">How I work</span>
            <h3 data-split><Words>Start from the outcome. Model the domain. Ship inside their stack.</Words></h3>
            <p>
              I begin with the number the customer already cares about, model their world as objects
              and actions, then build the agent, the evals and the infrastructure around it. It runs
              in their environment, gets measured against that number, and keeps improving.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
