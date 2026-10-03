import { useEffect, useState } from 'react'

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function EasterEgg() {
  const [show, setShow] = useState(false)
  const [, setKeys] = useState([])
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      setKeys(prev => {
        const next = [...prev, e.key].slice(-10)
        if (next.join(',') === KONAMI.join(',')) {
          setShow(true)
          setGlitch(true)
          setTimeout(() => setGlitch(false), 1000)
        }
        return next
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!show) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(2,4,8,0.97)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      animation: glitch ? 'eggGlitch 0.1s infinite' : 'none',
    }}>
      {/* Close */}
      <button onClick={() => setShow(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff', padding: '0.4rem 0.8rem', cursor: 'pointer', fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', letterSpacing: 2 }}>
        ESC / CLOSE
      </button>

      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(#00d4ff 1px,transparent 1px),linear-gradient(90deg,#00d4ff 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      {/* Glow */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '2rem' }}>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.3rem 1rem', border: '1px solid rgba(0,212,255,0.3)', marginBottom: '2rem', background: 'rgba(0,212,255,0.05)' }}>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: '#00d4ff', letterSpacing: 3 }}>🔒 SECRET UNLOCKED</span>
        </div>

        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎮</div>

        <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,6vw,4rem)', letterSpacing: 4, marginBottom: '1rem', background: 'linear-gradient(135deg,#fff,#00d4ff,#0066ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YOU FOUND IT!
        </h1>

        <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.85rem', color: '#00d4ff', letterSpacing: 3, marginBottom: '0.5rem' }}>
          KONAMI CODE ACTIVATED ↑↑↓↓←→←→BA
        </p>

        <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: '1.1rem', color: 'rgba(200,232,240,0.6)', lineHeight: 1.8, maxWidth: 500, margin: '1.5rem auto' }}>
          Hey! You're curious — I like that. 🔥<br />
          Not many people find this hidden page.<br />
          You're clearly someone who pays attention to detail!
        </p>

        <div style={{ padding: '1.5rem', border: '1px solid rgba(0,212,255,0.15)', background: 'rgba(0,212,255,0.03)', maxWidth: 400, margin: '0 auto 2rem' }}>
          <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 3, marginBottom: '0.5rem' }}>FUN FACT</p>
          <p style={{ fontFamily: "'Rajdhani',sans-serif", color: '#c8e8f0', fontSize: '1rem', lineHeight: 1.7 }}>
            Bhasker built this entire portfolio from scratch — every animation, every effect, every line of code. 💪
          </p>
        </div>

        <button onClick={() => setShow(false)} className="btn-neo" style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: 3, padding: '0.8rem 2rem', cursor: 'pointer', border: '1px solid #00d4ff', color: '#00d4ff', background: 'transparent', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}>
          <span style={{ position: 'relative', zIndex: 1 }}>BACK TO PORTFOLIO</span>
        </button>
      </div>

      <style>{`
        @keyframes eggGlitch {
          0% { transform: translate(2px,0) skew(2deg); }
          25% { transform: translate(-2px,0) skew(-2deg); }
          50% { transform: translate(0,2px) skew(0deg); }
          75% { transform: translate(0,-2px) skew(1deg); }
          100% { transform: translate(0,0) skew(0deg); }
        }
      `}</style>
    </div>
  )
}