import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.style.setProperty('--bg-main', '#020408')
      root.style.setProperty('--bg-dark', '#060d14')
      root.style.setProperty('--bg-card', '#0a1520')
      root.style.setProperty('--text-main', '#c8e8f0')
      root.style.setProperty('--text-muted', 'rgba(200,232,240,0.6)')
      root.style.setProperty('--border-color', 'rgba(0,212,255,0.15)')
      document.body.style.background = '#020408'
      document.body.style.color = '#c8e8f0'
    } else {
      root.style.setProperty('--bg-main', '#f0f4f8')
      root.style.setProperty('--bg-dark', '#e2e8f0')
      root.style.setProperty('--bg-card', '#ffffff')
      root.style.setProperty('--text-main', '#1a202c')
      root.style.setProperty('--text-muted', 'rgba(26,32,44,0.7)')
      root.style.setProperty('--border-color', 'rgba(0,102,255,0.2)')
      document.body.style.background = '#f0f4f8'
      document.body.style.color = '#1a202c'
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        position: 'fixed', top: 76, right: 16, zIndex: 850,
        width: 36, height: 36,
        background: dark ? 'rgba(2,4,8,0.9)' : 'rgba(240,244,248,0.9)',
        border: `1px solid ${dark ? 'rgba(0,212,255,0.3)' : 'rgba(0,102,255,0.3)'}`,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem',
        transition: 'all 0.3s',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 12px ${dark ? 'rgba(0,212,255,0.3)' : 'rgba(0,102,255,0.3)'}` }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}