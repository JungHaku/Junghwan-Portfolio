# Junghwan Baik — Portfolio

Single-page portfolio built with Vite, React 19 and TypeScript. Deployed on Vercel.

## Scripts

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
```

## Layout

- `src/content.ts` — all copy (nav, strip, marquee, work items, principles, facts, links)
- `src/components/` — one file per section
- `src/components/SplitText.tsx` — `<Words>` (word-by-word mask reveal) and `<Chars>` (letter drop-in)
- `src/hooks/useScrollAnimations.ts` — IntersectionObserver reveals, progress bar, hero parallax, scroll-driven text fill
- `src/hooks/useContourField.ts` — the animated hero canvas
- `src/index.css` — global styles and every animation rule
- `reference/portfolio-v4.html` — the original static mock this was ported from

## Deploy

Vercel auto-detects Vite: build command `npm run build`, output directory `dist`. No extra config needed.
