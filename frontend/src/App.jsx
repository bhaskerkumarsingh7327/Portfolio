import { useState } from 'react'
import Loader from './components/Loader'
import MouseTrail from './components/MouseTrail'
import SocialSidebar from './components/SocialSidebar'
import Chatbot from './components/Chatbot'
import Terminal from './components/Terminal'
import EasterEgg from './components/EasterEgg'
import ThemeToggle from './components/ThemeToggle'
import VisitorCounter from './components/VisitorCounter'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Counter from './components/Counter'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Projects'
import GitHubStats from './components/GitHubStats'
import Contact from './components/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      {loaded && (
        <>
          <MouseTrail />
          <SocialSidebar />
          <Chatbot />
          <Terminal />
          <EasterEgg />
          <ThemeToggle />
          <VisitorCounter />
          <Navbar />
          <Hero />
          <Counter />
          <About />
          <Education />
          <Projects />
          <GitHubStats username="bhaskerkumarsingh7327" />
          <Contact />
        </>
      )}
    </>
  )
}