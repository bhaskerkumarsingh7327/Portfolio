import { useEffect, useRef, useState } from 'react'

const roles = ['Full Stack Developer','MERN Stack Engineer','UI/UX Innovator','Problem Architect','Tech Visionary']

export default function Hero() {
  const canvasRef = useRef(null)
  const [displayed, setDisplayed] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = roles[roleIndex]
    let t
    if (typing) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
      } else {
        t = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(prev => prev.slice(0, -1)), 35)
      } else {
        t = setTimeout(() => { setRoleIndex(prev => (prev + 1) % roles.length); setTyping(true) }, 100)
      }
    }
    return () => clearTimeout(t)
  }, [displayed, typing, roleIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const setSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    setSize()
    window.addEventListener('resize', setSize)

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.4,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,212,255,0.45)'
        ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize) }
  }, [])

  return (
    <section id="hero" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#020408' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,102,255,0.12) 0%, rgba(0,212,255,0.04) 40%, transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'linear-gradient(#00d4ff 1px,transparent 1px),linear-gradient(90deg,#00d4ff 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* decorative */}
      <div style={{ position: 'absolute', top: '15%', right: 50, width: 1, height: 100, background: 'linear-gradient(to bottom,transparent,#00d4ff,transparent)', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: '20%', left: 50, width: 1, height: 80, background: 'linear-gradient(to bottom,transparent,#0066ff,transparent)', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: 100, left: 60, width: 40, height: 40, border: '1px solid rgba(0,212,255,0.15)', transform: 'rotate(45deg)', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 120, right: 80, width: 28, height: 28, border: '1px solid rgba(0,102,255,0.2)', transform: 'rotate(45deg)', zIndex: 2, animation: 'hFloat 4s ease-in-out infinite' }} />

      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '2rem', maxWidth: 820 }}>
        {/* badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.4rem 1.2rem', marginBottom: '2rem', border: '1px solid rgba(0,212,255,0.2)', background: 'rgba(0,212,255,0.04)' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d4ff', animation: 'hPulse 2s infinite' }} />
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.68rem', color: '#00d4ff', letterSpacing: 3 }}>SYSTEM ONLINE // BHASKER_OS v2.0</span>
        </div>

        {/* name */}
        <h1 style={{ fontSize: 'clamp(3rem,9vw,7rem)', fontFamily: "'Exo 2',sans-serif", fontWeight: 800, letterSpacing: 6, lineHeight: 1, background: 'linear-gradient(135deg,#ffffff 0%,#00d4ff 50%,#0066ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
          BHASKER
        </h1>

        <div style={{ height: 1, margin: '0.5rem auto 1.5rem', background: 'linear-gradient(to right,transparent,#00d4ff,#0066ff,transparent)', opacity: 0.4 }} />

        {/* typewriter */}
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 'clamp(0.9rem,2.2vw,1.25rem)', color: '#00ffea', letterSpacing: 3, minHeight: '2rem', marginBottom: '1.5rem' }}>
          {'> '}{displayed}<span style={{ animation: 'hBlink 0.8s infinite' }}>_</span>
        </div>

        <p style={{ fontSize: 'clamp(1rem,1.8vw,1.1rem)', color: 'rgba(200,232,240,0.6)', lineHeight: 1.9, maxWidth: 520, margin: '0 auto 2.5rem' }}>
          Building scalable, intelligent systems from ground up.<br />
          Full Stack Engineer obsessed with clean code and futuristic UX.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn-neo"><span>View Projects</span></a>
          <a href="#contact" className="btn-neo btn-solid"><span>Hire Me</span></a>
        </div>

        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '4rem', flexWrap: 'wrap' }}>
          {[['10+','Projects Built'],['2+','Years Exp.'],['15+','Technologies'],['100%','Dedication']].map(([v,l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '1.8rem', color: '#00d4ff', lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.62rem', color: 'rgba(200,232,240,0.35)', letterSpacing: 2, marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.6rem', color: 'rgba(0,212,255,0.35)', letterSpacing: 3 }}>SCROLL</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,#00d4ff,transparent)', animation: 'hFloat 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes hPulse{0%,100%{box-shadow:0 0 6px #00d4ff;}50%{box-shadow:0 0 18px #00d4ff,0 0 32px rgba(0,212,255,0.4);}}
        @keyframes hBlink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes hFloat{0%,100%{transform:translateY(0) rotate(45deg);}50%{transform:translateY(-8px) rotate(45deg);}}
      `}</style>
    </section>
  )
}