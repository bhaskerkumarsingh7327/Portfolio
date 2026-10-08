import { useEffect, useRef, useState } from 'react'

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(target)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 10, suffix: '+', label: 'Projects Built', icon: '◈' },
  { value: 2, suffix: '+', label: 'Years Exp.', icon: '◉' },
  { value: 15, suffix: '+', label: 'Technologies', icon: '◎' },
  { value: 100, suffix: '%', label: 'Dedication', icon: '▣' },
]

export default function Counter() {
  return (
    <section style={{ padding: '5rem 2rem', background: 'linear-gradient(180deg,#060d14 0%,#020408 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(0,212,255,0.15),transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(0,212,255,0.15),transparent)' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1.5rem' }}>
        {stats.map((s, i) => (
          <div key={s.label} className="counter-card" style={{
            textAlign: 'center', padding: '2rem 1rem',
            border: '1px solid rgba(0,212,255,0.1)',
            background: 'rgba(0,212,255,0.02)',
            position: 'relative', overflow: 'hidden',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'; e.currentTarget.style.background = 'rgba(0,212,255,0.06)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'; e.currentTarget.style.background = 'rgba(0,212,255,0.02)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,#00d4ff,transparent)', opacity: 0.3 }} />
            <div className="counter-icon" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '1.1rem', color: 'rgba(0,212,255,0.4)', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div className="counter-value" style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '2.8rem', color: '#00d4ff', lineHeight: 1, marginBottom: '0.5rem', textShadow: '0 0 20px rgba(0,212,255,0.4)' }}>
              <CountUp target={s.value} suffix={s.suffix} duration={1800 + i * 200} />
            </div>
            <div className="counter-label" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(200,232,240,0.4)', letterSpacing: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}