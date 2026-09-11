import { useState } from 'react'

export default function ResumeButton() {
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  const handleDownload = () => {
    setDownloading(true)

    // Aapka resume PDF public folder mein hona chahiye: /public/resume.pdf
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Bhasker_Kumar_Singh_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      setDownloading(false)
      setDone(true)
      setTimeout(() => setDone(false), 3000)
    }, 1500)
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '0.8rem 1.8rem',
        background: done ? 'rgba(0,255,136,0.08)' : 'transparent',
        border: `1px solid ${done ? '#00ff88' : downloading ? 'rgba(0,212,255,0.4)' : '#00d4ff'}`,
        color: done ? '#00ff88' : '#00d4ff',
        fontFamily: "'Exo 2',sans-serif",
        fontWeight: 700, fontSize: '0.8rem', letterSpacing: 3,
        textTransform: 'uppercase',
        cursor: downloading ? 'wait' : 'pointer',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s',
        boxShadow: done ? '0 0 20px rgba(0,255,136,0.2)' : 'none',
      }}
      onMouseEnter={e => {
        if (!downloading && !done) {
          e.currentTarget.style.background = 'rgba(0,212,255,0.08)'
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.15)'
        }
      }}
      onMouseLeave={e => {
        if (!done) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: '1rem' }}>
        {done ? '✓' : downloading ? '⟳' : '↓'}
      </span>

      {/* Text */}
      <span>
        {done ? 'DOWNLOADED!' : downloading ? 'DOWNLOADING...' : 'Download Resume'}
      </span>

      {/* Animated progress line */}
      {downloading && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(to right,transparent,#00d4ff,transparent)',
          animation: 'rbScan 1s linear infinite',
        }} />
      )}

      <style>{`
        @keyframes rbScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  )
}