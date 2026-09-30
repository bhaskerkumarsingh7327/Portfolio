// import { useState } from 'react'
// import Loader from './components/Loader'
// import MouseTrail from './components/MouseTrail'
// import SocialSidebar from './components/SocialSidebar'
// import Chatbot from './components/Chatbot'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import Counter from './components/Counter'
// import About from './components/About'
// import Education from './components/Education'
// import Projects from './components/Projects'
// import GitHubStats from './components/GitHubStats'
// import Contact from './components/Contact'
// import VisitorCounter from './components/VisitorCounter'

// export default function App() {
//   const [loaded, setLoaded] = useState(false)

//   return (
//     <>
//       {!loaded && <Loader onDone={() => setLoaded(true)} />}
//       {loaded && (
//         <>
//           <MouseTrail />
//           <SocialSidebar />
//           <Chatbot />
//           <VisitorCounter />
//           <Navbar />
//           <Hero />
//           <Counter />
//           <About />
//           <Education />
//           <Projects />
//           <GitHubStats username="YOUR_GITHUB_USERNAME" />
//           <Contact />
//         </>
//       )}
//     </>
//   )
// }

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

// export default function App() {
//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         background: '#020408',
//         color: '#00d4ff',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: '40px',
//         fontFamily: 'Arial',
//       }}
//     >
//       PORTFOLIO TEST
//     </div>
//   )
// }