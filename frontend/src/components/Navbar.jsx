import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = navLinks.map(n => document.getElementById(n.id))
      const scrollPos = window.scrollY + 120
      sections.forEach(sec => {
        if (sec && sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
          setActive(sec.id)
        }
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
        padding: '0 3rem',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(2,4,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,212,255,0.12)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, border: '1px solid #00d4ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 0 12px rgba(0,212,255,0.4)',
          }}>
            <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '0.9rem', color: '#00d4ff' }}>B</span>
            <div style={{ position: 'absolute', top: -2, right: -2, width: 4, height: 4, background: '#00d4ff', borderRadius: '50%', boxShadow: '0 0 6px #00d4ff' }} />
          </div>
          <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '1rem', letterSpacing: 4, color: '#fff' }}>
            BHASKER
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.5rem 1rem',
                fontFamily: "'Exo 2',sans-serif",
                fontWeight: active === link.id ? 700 : 400,
                fontSize: '0.82rem', letterSpacing: 2,
                color: active === link.id ? '#00d4ff' : 'rgba(200,232,240,0.6)',
                position: 'relative',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { if (active !== link.id) e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { if (active !== link.id) e.currentTarget.style.color = 'rgba(200,232,240,0.6)' }}
            >
              {link.label}
              {/* Active underline */}
              <div style={{
                position: 'absolute', bottom: 0, left: '50%',
                transform: active === link.id ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                transformOrigin: 'center',
                width: '80%', height: 1,
                background: 'linear-gradient(to right,transparent,#00d4ff,transparent)',
                boxShadow: '0 0 6px #00d4ff',
                transition: 'transform 0.3s ease',
              }} />
            </button>
          ))}
        </div>

        {/* Current section indicator pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '0.35rem 0.9rem',
          border: '1px solid rgba(0,212,255,0.25)',
          background: 'rgba(0,212,255,0.05)',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: '#00d4ff', letterSpacing: 2 }}>
            {navLinks.find(n => n.id === active)?.label?.toUpperCase() || 'HOME'}
          </span>
        </div>
      </nav>

      {/* Side progress bar */}
      <div style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 800, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            title={link.label}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div style={{
              width: active === link.id ? 20 : 6,
              height: active === link.id ? 2 : 6,
              borderRadius: active === link.id ? 1 : '50%',
              background: active === link.id ? '#00d4ff' : 'rgba(0,212,255,0.3)',
              boxShadow: active === link.id ? '0 0 8px #00d4ff' : 'none',
              transition: 'all 0.3s ease',
            }} />
          </button>
        ))}
      </div>

      <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 6px #00d4ff;}50%{box-shadow:0 0 16px #00d4ff,0 0 30px #00d4ff;}}`}</style>
    </>
  )
}