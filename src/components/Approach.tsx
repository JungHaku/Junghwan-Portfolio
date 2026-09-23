import type { CSSProperties } from 'react'
import { Words } from './SplitText'

export function Approach() {
  return (
    <section className="light" id="approach">
      <div className="wrap">
        <div className="head">
          <h2 data-split><Words>Code is free, <em>taste</em> is rare.</Words></h2>
          <span className="label">01 — Approach</span>
        </div>
        <div className="cols">
          <div className="col" data-reveal style={{ '--i': 0 } as CSSProperties}>
            <span className="label">The problem</span>
            <h3 data-split><Words>Maximizing token usage doesn't create value. It migrates your IP to a third party.</Words></h3>
            <p>
              The spend climbs, the vendor learns your domain, and the numbers your business
              actually tracks stay flat. You end up renting capability you could have owned.
            </p>
          </div>
          <div className="col" data-reveal style={{ '--i': 1 } as CSSProperties}>
            <span className="label">How I solve</span>
            <h3 data-split><Words>Find the gaps. Point the models at your data. Keep the moat.</Words></h3>
            <p>
              LLMs and ML models are a powerful raw resource, but the value is in where they meet
              your business. I find the gaps where they can be applied to your own data, inside
              your own stack. Your data is your moat. Your users are your moat. Not the code, not
              the model.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
