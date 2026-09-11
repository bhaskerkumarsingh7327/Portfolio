export default function SocialSidebar() {
  const socials = [
    { label: 'GitHub', icon: '⌥', href: 'https://github.com' },
    { label: 'LinkedIn', icon: '◈', href: 'https://linkedin.com' },
    { label: 'Twitter', icon: '◉', href: 'https://twitter.com' },
    { label: 'Email', icon: '✉', href: 'mailto:bhasker@email.com' },
  ]

  return (
    <div style={{
      position: 'fixed', left: 20, top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 800,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
    }}>
      {/* Top line */}
      <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom,transparent,rgba(0,212,255,0.3))', marginBottom: 12 }} />

      {socials.map((s, i) => (
        <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
          title={s.label}
          style={{
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(0,212,255,0.15)',
            color: 'rgba(0,212,255,0.5)',
            fontSize: '0.9rem',
            textDecoration: 'none',
            marginBottom: 8,
            background: 'rgba(0,212,255,0.02)',
            transition: 'all 0.3s',
            position: 'relative',
            animationDelay: `${i * 0.1}s`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#00d4ff'
            e.currentTarget.style.color = '#00d4ff'
            e.currentTarget.style.background = 'rgba(0,212,255,0.1)'
            e.currentTarget.style.transform = 'translateX(4px)'
            e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.2)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'
            e.currentTarget.style.color = 'rgba(0,212,255,0.5)'
            e.currentTarget.style.background = 'rgba(0,212,255,0.02)'
            e.currentTarget.style.transform = 'translateX(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {s.icon}
          {/* Tooltip */}
          <span style={{
            position: 'absolute', left: 44, top: '50%', transform: 'translateY(-50%)',
            fontFamily: "'Share Tech Mono',monospace", fontSize: '0.6rem', letterSpacing: 2,
            color: '#00d4ff', whiteSpace: 'nowrap', pointerEvents: 'none',
            opacity: 0, transition: 'opacity 0.2s',
          }} className="sidebar-tooltip">{s.label}</span>
        </a>
      ))}

      {/* Bottom line */}
      <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom,rgba(0,212,255,0.3),transparent)', marginTop: 4 }} />

      <style>{`
        a:hover .sidebar-tooltip { opacity: 1 !important; }
      `}</style>
    </div>
  )
}