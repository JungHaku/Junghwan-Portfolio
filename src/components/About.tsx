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
              I get my dopamine from solving real problems for real people. I care about outcomes, not
              talk, and I push myself hard to deliver them.{' '}
              <span>
                I've built a track record of writing efficient code, understanding technology at depth,
                and turning it into something that works in the <em>real world.</em>
              </span>
            </Words>
          </p>
        </div>
      </div>
    </section>
  )
}
