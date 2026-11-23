import { Suspense, lazy, useRef } from 'react'
import { EMAIL } from '../content'
import { useWaveform } from '../hooks/useWaveform'
import { Words } from './SplitText'
import { Marquee, Strip } from './Strip'
import { VoiceShell } from './VoiceShell'

// The ElevenLabs SDK is heavy; keep it out of the main bundle.
const VoiceOrb = lazy(() => import('./VoiceOrb'))

export function Hero() {
  const canvas = useRef<HTMLCanvasElement>(null)
  useWaveform(canvas)
  return (
    <header className="hero">
      <canvas ref={canvas} id="field" aria-hidden="true" />
      <div className="wrap">
        <h1 data-split>
          <Words>
            Voice agents that hold up on a <em>real phone call.</em>
          </Words>
        </h1>
        <p className="lede">
          I'm Junghwan. I ship ElevenLabs agents on live customer lines, then stay with the
          customer until they work. I'd like to do that full time as a Forward Deployed Engineer.
        </p>
        <div className="cta">
          <a className="btn" href="#projects">See the work</a>
          <a className="btn ghost" href="#experience">Experience</a>
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <Suspense fallback={<VoiceShell state="idle" label="Talk to Gumi" />}>
          <VoiceOrb />
        </Suspense>
      </div>
      <div className="hero-foot">
        <Strip />
        <Marquee />
      </div>
    </header>
  )
}
