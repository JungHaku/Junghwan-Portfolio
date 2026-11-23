import { useEffect, type RefObject } from 'react'

// A row of rounded bars that breathes like a voice. The pointer pulls a swell
// through it; under reduced motion it renders one still frame.
export function useWaveform(ref: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, t = 0
    let mx = 0.5, tx = 0.5
    let raf = 0

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.clientWidth
      h = c.clientHeight
      c.width = w * dpr
      c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const onPointer = (e: PointerEvent) => { tx = Math.max(0, Math.min(1, (e.clientX - (w > 900 ? w * 0.55 : 0)) / (w > 900 ? w * 0.45 : w))) }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      mx += (tx - mx) * 0.06
      // wide screens: the waveform fills the empty right half beside the headline;
      // narrow screens: it runs full width along the lower part of the hero
      const wide = w > 900
      const x0 = wide ? w * 0.55 : 0
      const span = w - x0
      const gap = w < 700 ? 9 : 12
      const bars = Math.floor(span / gap)
      const mid = wide ? h * 0.45 : h * 0.72
      const max = wide ? h * 0.24 : h * 0.14
      ctx.lineCap = 'round'
      ctx.lineWidth = 3
      for (let i = 0; i < bars; i++) {
        const u = i / (bars - 1)
        const envelope = 0.25 + 0.75 * Math.pow(Math.sin(u * Math.PI), 1.2)
        const swell = Math.exp(-Math.pow((u - mx) * 5, 2)) * 0.55
        const v =
          0.5 + 0.5 * Math.sin(u * 9 + t * 1.3) * Math.sin(u * 3.1 - t * 0.7) +
          0.25 * Math.sin(u * 23 + t * 2.1)
        const amp = Math.max(0.04, Math.min(1, (v * 0.6 + swell) * envelope))
        const half = Math.max(2, amp * max)
        const x = x0 + (i + 0.5) * gap + (span - bars * gap) / 2
        ctx.strokeStyle = `rgba(11,11,12,${0.1 + 0.34 * amp})`
        ctx.beginPath()
        ctx.moveTo(x, mid - half)
        ctx.lineTo(x, mid + half)
        ctx.stroke()
      }
      if (!reduce) {
        t += 0.012
        raf = requestAnimationFrame(draw)
      }
    }

    size()
    const onResize = () => { size(); if (reduce) draw() }
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointer)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [ref])
}
