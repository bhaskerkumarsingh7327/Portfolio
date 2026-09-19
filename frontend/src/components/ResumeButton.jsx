import { useState } from 'react'

export default function ResumeButton() {
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  const handleDownload = () => {
    setDownloading(true)

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
      className="btn-neo"
      style={{
        color: done ? '#000' : undefined,
        background: done ? 'rgba(0,212,255,1)' : undefined,
        cursor: downloading ? 'wait' : 'pointer',
      }}
    >
      <span>
        {done ? '✓ DOWNLOADED!' : downloading ? 'DOWNLOADING...' : '↓ DOWNLOAD RESUME'}
      </span>

      {/* Animated scan line while downloading */}
      {downloading && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(to right,transparent,#00d4ff,transparent)',
          animation: 'rbScan 1s linear infinite',
          zIndex: 2,
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