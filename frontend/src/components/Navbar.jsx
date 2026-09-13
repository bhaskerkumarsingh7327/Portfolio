import { useState, useEffect } from 'react'

const links = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Education', id: 'education' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const pos = window.scrollY + 120
      links.forEach(l => {
        const el = document.getElementById(l.id)
        if (el && el.offsetTop <= pos && el.offsetTop + el.offsetHeight > pos) setActive(l.id)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
        height: 64, padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled || menuOpen ? 'rgba(2,4,8,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,212,255,0.1)' : 'none',
        transition: 'all 0.4s',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, border: '1px solid #00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,212,255,0.05)', boxShadow: '0 0 12px rgba(0,212,255,0.3)', position: 'relative' }}>
            <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, color: '#00d4ff', fontSize: '1rem' }}>B</span>
            <div style={{ position: 'absolute', top: -2, right: -2, width: 5, height: 5, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
          </div>
          <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '1rem', letterSpacing: 4, color: '#fff' }}>BHASKER</span>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '0.15rem' }}>
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.45rem 0.8rem',
                fontFamily: "'Exo 2',sans-serif",
                fontSize: '0.78rem', letterSpacing: 2,
                fontWeight: active === l.id ? 700 : 400,
                color: active === l.id ? '#00d4ff' : 'rgba(200,232,240,0.5)',
                position: 'relative', transition: 'color 0.2s',
              }}
                onMouseEnter={e => { if (active !== l.id) e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { if (active !== l.id) e.currentTarget.style.color = 'rgba(200,232,240,0.5)' }}
              >
                {l.label}
                <div style={{ position: 'absolute', bottom: 0, left: '50%', width: '80%', height: 1, transform: active === l.id ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)', background: 'linear-gradient(to right,transparent,#00d4ff,transparent)', transition: 'transform 0.3s' }} />
              </button>
            ))}
          </div>
        )}

        {/* Desktop active pill */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.3rem 0.9rem', border: '1px solid rgba(0,212,255,0.2)', background: 'rgba(0,212,255,0.04)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', animation: 'navPulse 2s infinite' }} />
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: '#00d4ff', letterSpacing: 2 }}>
              {links.find(l => l.id === active)?.label?.toUpperCase()}
            </span>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: '1px solid rgba(0,212,255,0.3)', padding: '0.4rem 0.6rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 20, height: 1.5, background: '#00d4ff', transition: 'all 0.3s',
                transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px,4px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 899,
          background: 'rgba(2,4,8,0.98)',
          borderBottom: '1px solid rgba(0,212,255,0.15)',
          padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '0.25rem',
          animation: 'menuSlide 0.3s ease',
        }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: active === l.id ? 'rgba(0,212,255,0.08)' : 'transparent',
              border: 'none', borderLeft: `2px solid ${active === l.id ? '#00d4ff' : 'transparent'}`,
              color: active === l.id ? '#00d4ff' : 'rgba(200,232,240,0.6)',
              padding: '0.8rem 1rem', textAlign: 'left',
              fontFamily: "'Exo 2',sans-serif", fontSize: '0.9rem', letterSpacing: 3,
              cursor: 'pointer', transition: 'all 0.2s', width: '100%',
            }}>{l.label}</button>
          ))}
        </div>
      )}

      {/* Side dots — desktop only */}
      {!isMobile && (
        <div style={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 800, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} title={l.label} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: active === l.id ? 18 : 5, height: active === l.id ? 2 : 5, borderRadius: active === l.id ? 1 : '50%', background: active === l.id ? '#00d4ff' : 'rgba(0,212,255,0.2)', boxShadow: active === l.id ? '0 0 8px #00d4ff' : 'none', transition: 'all 0.3s' }} />
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes navPulse{0%,100%{box-shadow:0 0 6px #00d4ff;}50%{box-shadow:0 0 16px #00d4ff;}}
        @keyframes menuSlide{from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);}}
      `}</style>
    </>
  )
}