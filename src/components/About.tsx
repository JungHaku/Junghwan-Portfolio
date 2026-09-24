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
              I get my dopamine from solving real problems for real people. I like being close to the
              people I build for, and I care most about whether the thing actually works for them.{' '}
              <span>
                I'm always learning how to write cleaner code and how to turn what I learn into
                something that holds up in the <em>real world.</em>
              </span>
            </Words>
          </p>
        </div>
      </div>
    </section>
  )
}
