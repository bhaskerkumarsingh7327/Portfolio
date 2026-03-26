import { motion } from "framer-motion";

import { useEffect, useRef, useState } from 'react'

const roles = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'UI/UX Innovator',
  'Problem Architect',
  'Tech Visionary',
]

export default function Hero() {
  const canvasRef = useRef(null)
  const [displayed, setDisplayed] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [typing, setTyping] = useState(true)
  const [loaded, setLoaded] = useState(false)

  // Typewriter
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const current = roles[roleIndex]
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setRoleIndex(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIndex])

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.6 ? '#00d4ff' : '#0066ff',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()
      })
      // Lines between close particles
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="hero" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Animated canvas bg */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,102,255,0.12) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)', zIndex: 0 }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(#00d4ff 1px,transparent 1px),linear-gradient(90deg,#00d4ff 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Hex corner decorations */}
      <div style={{ position: 'absolute', top: 80, left: 40, width: 60, height: 60, border: '1px solid rgba(0,212,255,0.2)', transform: 'rotate(45deg)' }} />
      <div style={{ position: 'absolute', top: 100, left: 60, width: 30, height: 30, border: '1px solid rgba(0,212,255,0.1)', transform: 'rotate(45deg)' }} />
      <div style={{ position: 'absolute', bottom: 100, right: 60, width: 50, height: 50, border: '1px solid rgba(0,102,255,0.2)', transform: 'rotate(45deg)', animation: 'float 4s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '40%', right: 40, width: 2, height: 80, background: 'linear-gradient(to bottom,transparent,#00d4ff,transparent)' }} />
      <div style={{ position: 'absolute', top: '30%', left: 30, width: 1, height: 120, background: 'linear-gradient(to bottom,transparent,#0066ff,transparent)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', maxWidth: 800 }}>

        {/* Status bar */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '0.4rem 1.2rem', marginBottom: '2rem',
          border: '1px solid rgba(0,212,255,0.25)', background: 'rgba(0,212,255,0.05)',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.2s',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d4ff', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: '#00d4ff', letterSpacing: 3 }}>
            SYSTEM ONLINE // BHASKER_OS v2.0
          </span>
        </div>

        {/* Name */}
        <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
          <h1 style={{
            fontSize: 'clamp(3rem,9vw,7rem)', fontWeight: 800,
            letterSpacing: 6, lineHeight: 1,
            background: 'linear-gradient(135deg,#ffffff 0%,#00d4ff 50%,#0066ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease 0.4s',
          }}>
            BHASKER
          </h1>
        </div>

        {/* Glitch line */}
        <div style={{ height: 1, background: 'linear-gradient(to right,transparent,#00d4ff,#0066ff,transparent)', marginBottom: '1.5rem', opacity: 0.5 }} />

        {/* Typewriter role */}
        <div style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: 'clamp(0.9rem,2.2vw,1.3rem)',
          color: '#00ffea', letterSpacing: 3, minHeight: '2rem',
          marginBottom: '1.5rem',
          opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 0.8s',
        }}>
          &gt; {displayed}<span style={{ animation: 'blink 0.8s infinite' }}>_</span>
        </div>

        {/* Bio */}
        <p style={{
          fontSize: 'clamp(1rem,1.8vw,1.15rem)', color: 'rgba(200,232,240,0.65)',
          lineHeight: 1.9, maxWidth: 540, margin: '0 auto 2.5rem',
          opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 1s',
        }}>
          Building scalable, intelligent systems from ground up. <br />
          Full Stack Engineer obsessed with clean code & futuristic UX.
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 1.2s',
        }}>
          <a href="#projects" className="btn-neo"><span>View Projects</span></a>
          <a href="#contact" className="btn-neo btn-blue"><span>Hire Me</span></a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '4rem', flexWrap: 'wrap',
          opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 1.4s',
        }}>
          {[['10+', 'Projects Built'], ['2+', 'Years Exp.'], ['15+', 'Technologies'], ['100%', 'Dedication']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '1.6rem', color: '#00d4ff', lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(200,232,240,0.4)', letterSpacing: 2, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.62rem', color: 'rgba(0,212,255,0.4)', letterSpacing: 3 }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom,#00d4ff,transparent)', animation: 'float 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes pulse{0%,100%{box-shadow:0 0 6px #00d4ff;}50%{box-shadow:0 0 20px #00d4ff,0 0 40px rgba(0,212,255,0.4);}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
      `}</style>
    </section>
  )
}