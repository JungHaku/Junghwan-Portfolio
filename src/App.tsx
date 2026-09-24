import { About } from './components/About'
import { Approach } from './components/Approach'
import { ChatWidget } from './components/ChatWidget'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Principles } from './components/Principles'
import { Work } from './components/Work'
import { useScrollAnimations } from './hooks/useScrollAnimations'

export default function App() {
  useScrollAnimations()
  return (
    <>
      <div id="progress" />
      <Nav />
      <Hero />
      <Approach />
      <Experience />
      <Work />
      <Principles />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  )
}
