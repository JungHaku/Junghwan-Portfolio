import { useEffect } from 'react'

export function useScrollAnimations() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    document
      .querySelectorAll('[data-split], [data-reveal], [data-chars], .head, .blue-bg')
      .forEach((el) => io.observe(el))

    const heroRaf = requestAnimationFrame(() => {
      document.querySelectorAll('.hero [data-split]').forEach((el) => el.classList.add('in'))
    })

    const hero = document.querySelector<HTMLElement>('.hero')
    const bar = document.getElementById('progress')
    const fills = [...document.querySelectorAll<HTMLElement>('[data-fill]')].map((el) => ({
      el,
      words: [...el.querySelectorAll<HTMLElement>('.w')],
    }))

    let ticking = false
    let frame = 0
    const onScroll = () => {
      if (ticking) return
      ticking = true
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        const vh = window.innerHeight
        const doc = document.documentElement.scrollHeight - vh
        if (bar) bar.style.transform = `scaleX(${doc > 0 ? y / doc : 0})`
        if (hero) hero.style.setProperty('--p', Math.min(1, y / hero.offsetHeight).toFixed(3))
        fills.forEach(({ el, words }) => {
          const r = el.getBoundingClientRect()
          const prog = (vh * 0.85 - r.top) / (r.height + vh * 0.3)
          const lit = Math.floor(Math.max(0, Math.min(1, prog)) * words.length)
          words.forEach((w, i) => w.classList.toggle('lit', i < lit))
        })
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      io.disconnect()
      cancelAnimationFrame(heroRaf)
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
