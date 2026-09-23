import { About } from './components/About'
import { Approach } from './components/Approach'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Principles } from './components/Principles'
import { Marquee, Strip } from './components/Strip'
import { Work } from './components/Work'
import { useScrollAnimations } from './hooks/useScrollAnimations'

export default function App() {
  useScrollAnimations()
  return (
    <>
      <div id="progress" />
      <Nav />
      <Hero />
      <Strip />
      <Marquee />
      <Approach />
      <Work />
      <Experience />
      <Principles />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
