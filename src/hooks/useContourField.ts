import { useEffect, type RefObject } from 'react'

export function useContourField(ref: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, t = 0
    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5
    let raf = 0

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.clientWidth
      h = c.clientHeight
      c.width = w * dpr
      c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const onPointer = (e: PointerEvent) => {
      tx = e.clientX / w
      ty = e.clientY / h
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      mx += (tx - mx) * 0.04
      my += (ty - my) * 0.04
      const rows = 38, step = 6
      for (let i = 0; i < rows; i++) {
        const f = i / (rows - 1)
        const base = h * (0.18 + f * 0.78)
        const amp = 34 + 110 * Math.sin(f * Math.PI)
        ctx.beginPath()
        for (let x = 0; x <= w; x += step) {
          const u = x / w, dx = u - mx, dy = f - my
          const bulge = Math.exp(-(dx * dx * 9 + dy * dy * 6)) * 60
          const y =
            base +
            Math.sin(u * 5.2 + t * 0.55 + i * 0.22) * amp * 0.5 +
            Math.sin(u * 11.7 - t * 0.35 + i * 0.5) * amp * 0.22 +
            Math.sin(u * 2.1 + t * 0.2) * amp * 0.35 -
            bulge
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const a = 0.07 + 0.3 * Math.pow(Math.sin(f * Math.PI), 1.5)
        ctx.strokeStyle = i % 5 === 0 ? `rgba(157,184,240,${a * 0.9})` : `rgba(255,255,255,${a})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      if (!reduce) {
        t += 0.008
        raf = requestAnimationFrame(draw)
      }
    }

    size()
    window.addEventListener('resize', size)
    window.addEventListener('pointermove', onPointer)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [ref])
}
