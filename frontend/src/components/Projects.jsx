import { useEffect, useRef, useState } from 'react'

const projects = [
  { id:'01', title:'NeuroFolio', desc:'AI-powered futuristic portfolio with chatbot, real-time analytics dashboard, and automated GitHub project sync.', tech:['React','Node.js','MongoDB','OpenAI','Socket.io'], link:'#', github:'#', status:'LIVE', color:'#00d4ff' },
  { id:'02', title:'ShopCore', desc:'Full-featured e-commerce platform with Stripe payments, Redux cart, admin panel, order tracking and real-time notifications.', tech:['MERN','Stripe','JWT','Redux','Cloudinary'], link:'#', github:'#', status:'LIVE', color:'#0066ff' },
  { id:'03', title:'NexusChat', desc:'Real-time messaging app with group rooms, file sharing, typing indicators, and end-to-end notification system.', tech:['Socket.io','React','Express','MongoDB','JWT'], link:'#', github:'#', status:'BETA', color:'#00d4ff' },
  { id:'04', title:'TaskMatrix', desc:'Advanced project management tool with Kanban boards, team collaboration, deadline tracking and automated reporting.', tech:['React','Node.js','MongoDB','Chart.js'], link:'#', github:'#', status:'DEV', color:'#0099cc' },
]

const statusColor = { LIVE:'#00ff88', BETA:'#00d4ff', DEV:'#ffaa00' }

function TiltCard({ children, color }) {
  const cardRef = useRef(null)

  const handleMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -8
    const rotY = ((x - cx) / cx) * 8
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`
    card.style.boxShadow = `0 20px 50px ${color}20, 0 0 1px ${color}40 inset`
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)'
    card.style.boxShadow = 'none'
  }

  return (
    <div ref={cardRef} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.3s ease', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} style={{ padding: '7rem 2rem', background: '#020408', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(0,212,255,0.2),transparent)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(#00d4ff 1px,transparent 1px),linear-gradient(90deg,#00d4ff 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <p className="section-tag">// DEPLOYED_SYSTEMS.log</p>
          <h2 className="section-title">My <span>Projects</span></h2>
          <div className="section-bar" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <div key={p.id} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.12}s` }}>
              <TiltCard color={p.color}>
                <div
                  onMouseEnter={() => setHov(p.id)}
                  onMouseLeave={() => setHov(null)}
                  style={{
                    /* Glassmorphism */
                    background: 'rgba(10,21,32,0.7)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${hov === p.id ? p.color + '60' : 'rgba(0,212,255,0.12)'}`,
                    padding: '1.8rem',
                    position: 'relative', overflow: 'hidden',
                    transition: 'border-color 0.3s',
                  }}
                >
                  {/* Shimmer overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(0,212,255,0.04) 0%,transparent 50%,rgba(0,102,255,0.03) 100%)', pointerEvents: 'none' }} />

                  {/* Top glow line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${p.color},transparent)`, opacity: hov === p.id ? 0.8 : 0.2, transition: 'opacity 0.3s' }} />

                  {/* Corner brackets */}
                  <div style={{ position: 'absolute', top: 8, left: 8, width: 12, height: 12, borderTop: `1px solid ${p.color}60`, borderLeft: `1px solid ${p.color}60` }} />
                  <div style={{ position: 'absolute', bottom: 8, right: 8, width: 12, height: 12, borderBottom: `1px solid ${p.color}60`, borderRight: `1px solid ${p.color}60` }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: 'rgba(0,212,255,0.35)', letterSpacing: 2 }}>_{p.id}</span>
                    <span style={{ padding: '0.2rem 0.6rem', fontSize: '0.62rem', fontFamily: "'Share Tech Mono',monospace", letterSpacing: 2, background: `${statusColor[p.status]}12`, color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}35` }}>{p.status}</span>
                  </div>

                  <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: hov === p.id ? p.color : '#fff', letterSpacing: 2, marginBottom: '0.8rem', transition: 'color 0.3s' }}>{p.title}</h3>
                  <p style={{ color: 'rgba(200,232,240,0.5)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.3rem' }}>{p.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ padding: '0.15rem 0.55rem', fontSize: '0.66rem', fontFamily: "'Share Tech Mono',monospace", background: `${p.color}0d`, color: `${p.color}bb`, border: `1px solid ${p.color}20`, letterSpacing: 1 }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={p.link} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: p.color, textDecoration: 'none', letterSpacing: 2, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.6'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>↗ LIVE</a>
                    <a href={p.github} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: 'rgba(200,232,240,0.35)', textDecoration: 'none', letterSpacing: 2, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,232,240,0.35)'}>⌥ CODE</a>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: vis ? 1 : 0, transition: 'opacity 0.8s ease 0.6s' }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-neo"><span>View All on GitHub</span></a>
        </div>
      </div>
    </section>
  )
}