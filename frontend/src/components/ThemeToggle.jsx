import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.setAttribute('data-theme', 'light')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        position: 'fixed', top: 76, right: 16, zIndex: 850,
        width: 36, height: 36,
        background: dark ? 'rgba(2,4,8,0.9)' : 'rgba(255,255,255,0.9)',
        border: `1px solid ${dark ? 'rgba(0,212,255,0.3)' : 'rgba(0,102,255,0.3)'}`,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem',
        transition: 'all 0.3s',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,255,0.3)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}