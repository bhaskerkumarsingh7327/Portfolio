import { useEffect, useState } from 'react'

export default function VisitorCounter() {
  const [count, setCount] = useState(null)
  const [today, setToday] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Track visit + get count from backend
        const res = await fetch('http://localhost:5000/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
        if (res.ok) {
          const data = await res.json()
          setCount(data.total)
          setToday(data.today)
        }
      } catch {
        // Fallback: localStorage count
        const local = parseInt(localStorage.getItem('visitorCount') || '0') + 1
        localStorage.setItem('visitorCount', local)
        setCount(local)
        setToday(1)
      } finally {
        setLoading(false)
      }
    }
    trackVisit()
  }, [])

  if (loading) return null

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 700,
      padding: '0.6rem 1rem',
      background: 'rgba(2,4,8,0.9)',
      border: '1px solid rgba(0,212,255,0.2)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'vcSlideIn 0.5s ease',
    }}>
      {/* Pulse dot */}
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', animation: 'vcPulse 2s infinite', flexShrink: 0 }} />

      <div>
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.6rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 2, marginBottom: 2 }}>
          TOTAL VISITORS
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#00d4ff', textShadow: '0 0 12px rgba(0,212,255,0.5)' }}>
            {count?.toLocaleString() || '—'}
          </span>
          {today !== null && (
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.58rem', color: '#00ff88', letterSpacing: 1 }}>
              +{today} today
            </span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes vcSlideIn { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        @keyframes vcPulse { 0%,100%{box-shadow:0 0 6px #00ff88;} 50%{box-shadow:0 0 16px #00ff88,0 0 30px rgba(0,255,136,0.3);} }
      `}</style>
    </div>
  )
}