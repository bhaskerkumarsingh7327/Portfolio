import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)
  const [hide, setHide] = useState(false)

  const phases = [
    'INITIALIZING SYSTEM...',
    'LOADING MODULES...',
    'CALIBRATING UI...',
    'LAUNCHING PORTFOLIO...',
  ]

  // Progress interval
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1.2
      })
    }, 28)
    return () => clearInterval(interval)
  }, [])

  // Phase update — wrapped in setTimeout to avoid sync setState
  useEffect(() => {
    let t1, t2, t3, t4, t5

    if (progress >= 25 && progress < 26) {
      t1 = setTimeout(() => setPhase(1), 0)
    }
    if (progress >= 55 && progress < 56) {
      t2 = setTimeout(() => setPhase(2), 0)
    }
    if (progress >= 80 && progress < 81) {
      t3 = setTimeout(() => setPhase(3), 0)
    }
    if (progress >= 100) {
      t4 = setTimeout(() => setHide(true), 600)
      t5 = setTimeout(() => onDone(), 1000)
    }

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [progress, onDone])

  if (hide) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#020408',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: progress >= 100 ? 0 : 1,
      transition: 'opacity 0.6s ease',
    }}>
      {/* Grid bg */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(#00d4ff 1px,transparent 1px),linear-gradient(90deg,#00d4ff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,102,255,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Logo */}
      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        <div style={{ width: 80, height: 80, border: '1px solid #00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 0 30px rgba(0,212,255,0.3)', animation: 'loaderPulse 2s infinite' }}>
          <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '2rem', color: '#00d4ff' }}>B</span>
          <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, background: '#00d4ff', borderRadius: '50%', boxShadow: '0 0 10px #00d4ff' }} />
          <div style={{ position: 'absolute', bottom: -3, left: -3, width: 5, height: 5, background: '#0066ff', borderRadius: '50%', boxShadow: '0 0 8px #0066ff' }} />
        </div>
        {/* Rotating rings */}
        <div style={{ position: 'absolute', inset: -12, border: '1px solid rgba(0,212,255,0.2)', borderTop: '1px solid #00d4ff', borderRadius: '50%', animation: 'loaderSpin 1.5s linear infinite' }} />
        <div style={{ position: 'absolute', inset: -20, border: '1px solid rgba(0,102,255,0.1)', borderBottom: '1px solid #0066ff', borderRadius: '50%', animation: 'loaderSpin 2.5s linear infinite reverse' }} />
      </div>

      {/* Name */}
      <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '2rem', letterSpacing: 8, color: '#fff', marginBottom: '0.5rem' }}>BHASKER</h1>
      <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: 'rgba(0,212,255,0.6)', letterSpacing: 4, marginBottom: '3rem' }}>FULL STACK DEVELOPER</p>

      {/* Phase text */}
      <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.72rem', color: '#00d4ff', letterSpacing: 3, marginBottom: '1.5rem', minHeight: '1rem' }}>
        {phases[phase]}
      </p>

      {/* Progress bar */}
      <div style={{ width: 280, height: 2, background: 'rgba(255,255,255,0.05)', position: 'relative', marginBottom: '0.8rem' }}>
        <div style={{ height: '100%', width: `${Math.min(progress, 100)}%`, background: 'linear-gradient(to right,#0066ff,#00d4ff)', boxShadow: '0 0 10px #00d4ff', transition: 'width 0.1s' }} />
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: `${Math.min(progress, 98)}%`, width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 10px #00d4ff', marginLeft: -3 }} />
      </div>

      <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.75rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 2 }}>
        {Math.min(Math.floor(progress), 100)}%
      </p>

      <style>{`
        @keyframes loaderPulse { 0%,100%{box-shadow:0 0 20px rgba(0,212,255,0.3);} 50%{box-shadow:0 0 40px rgba(0,212,255,0.6);} }
        @keyframes loaderSpin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
      `}</style>
    </div>
  )
}