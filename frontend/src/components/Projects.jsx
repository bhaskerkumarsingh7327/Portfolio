import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: '01',
    title: 'NeuroFolio',
    desc: 'AI-powered futuristic portfolio with built-in chatbot, real-time analytics dashboard, and automated GitHub project sync.',
    tech: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'Socket.io'],
    link: '#',
    github: '#',
    status: 'LIVE',
    color: '#00d4ff',
  },
  {
    id: '02',
    title: 'ShopCore',
    desc: 'Feature-complete e-commerce platform with Stripe payments, Redux cart, admin panel, order tracking and real-time notifications.',
    tech: ['MERN', 'Stripe', 'JWT', 'Redux', 'Cloudinary'],
    link: '#',
    github: '#',
    status: 'LIVE',
    color: '#0066ff',
  },
  {
    id: '03',
    title: 'NexusChat',
    desc: 'Real-time messaging application with group rooms, file sharing, typing indicators, and end-to-end notification system.',
    tech: ['Socket.io', 'React', 'Express', 'MongoDB', 'JWT'],
    link: '#',
    github: '#',
    status: 'BETA',
    color: '#00d4ff',
  },
  {
    id: '04',
    title: 'TaskMatrix',
    desc: 'Advanced project management tool with Kanban boards, team collaboration, deadline tracking and automated reporting.',
    tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    link: '#',
    github: '#',
    status: 'DEV',
    color: '#0099cc',
  },
]

const statusColors = { LIVE: '#00ff88', BETA: '#00d4ff', DEV: '#ffaa00' }

export default function Projects() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} style={{ padding: '7rem 2rem', background: '#020408', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(0,212,255,0.2),transparent)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(#00d4ff 1px,transparent 1px),linear-gradient(90deg,#00d4ff 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <p className="section-tag">// DEPLOYED_SYSTEMS.log</p>
          <h2 className="section-title">My <span>Projects</span></h2>
          <div className="section-bar" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === p.id ? 'rgba(0,212,255,0.04)' : '#0a1520',
                border: `1px solid ${hovered === p.id ? p.color + '60' : 'rgba(0,212,255,0.1)'}`,
                padding: '1.8rem',
                position: 'relative',
                cursor: 'default',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                transform: hovered === p.id ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered === p.id ? `0 12px 40px ${p.color}15, 0 0 1px ${p.color}40 inset` : 'none',
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Top glow line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: hovered === p.id ? `linear-gradient(to right,transparent,${p.color},transparent)` : 'transparent',
                boxShadow: hovered === p.id ? `0 0 12px ${p.color}` : 'none',
                transition: 'all 0.3s',
              }} />

              {/* Corner brackets */}
              <div style={{ position: 'absolute', top: 8, left: 8, width: 10, height: 10, borderTop: `1px solid ${p.color}60`, borderLeft: `1px solid ${p.color}60` }} />
              <div style={{ position: 'absolute', bottom: 8, right: 8, width: 10, height: 10, borderBottom: `1px solid ${p.color}60`, borderRight: `1px solid ${p.color}60` }} />

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: 'rgba(0,212,255,0.4)', letterSpacing: 2 }}>_{p.id}</span>
                <span style={{
                  padding: '0.2rem 0.6rem', fontSize: '0.65rem',
                  fontFamily: "'Share Tech Mono',monospace", letterSpacing: 2,
                  background: `${statusColors[p.status]}15`,
                  color: statusColors[p.status],
                  border: `1px solid ${statusColors[p.status]}40`,
                }}>{p.status}</span>
              </div>

              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: hovered === p.id ? p.color : '#fff', letterSpacing: 2, marginBottom: '0.8rem', transition: 'color 0.3s' }}>{p.title}</h3>

              <p style={{ color: 'rgba(200,232,240,0.55)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.3rem' }}>{p.desc}</p>

              {/* Tech stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    padding: '0.15rem 0.55rem', fontSize: '0.68rem',
                    fontFamily: "'Share Tech Mono',monospace",
                    background: `${p.color}0d`,
                    color: `${p.color}cc`,
                    border: `1px solid ${p.color}25`,
                    letterSpacing: 1,
                  }}>{t}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={p.link} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: p.color, textDecoration: 'none', letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 4, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  ↗ LIVE
                </a>
                <a href={p.github} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: 'rgba(200,232,240,0.4)', textDecoration: 'none', letterSpacing: 2, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,232,240,0.4)'}>
                  ⌥ CODE
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View more */}
        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.6s' }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-neo"><span>View All on GitHub</span></a>
        </div>
      </div>
    </section>
  )
}