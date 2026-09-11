import { useState } from 'react'
import Loader from './components/Loader'
import MouseTrail from './components/MouseTrail'
import SocialSidebar from './components/SocialSidebar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Counter from './components/Counter'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Projects'
import GitHubStats from './components/GitHubStats'
import Contact from './components/Contact'
import VisitorCounter from './components/VisitorCounter'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      {loaded && (
        <>
          <MouseTrail />
          <SocialSidebar />
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