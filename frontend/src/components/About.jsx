import { useEffect, useRef, useState } from 'react'

const skills = [
  { name: 'React.js', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'MongoDB', level: 80 },
  { name: 'Express.js', level: 85 },
  { name: 'JavaScript', level: 92 },
  { name: 'Tailwind CSS', level: 88 },
  { name: 'Git / GitHub', level: 82 },
  { name: 'REST APIs', level: 87 },
]

const badges = ['React','Node.js','Express','MongoDB','JavaScript','Tailwind','JWT','Git','Vite','REST API','Socket.io','Postman']

export default function About() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const [anim, setAnim] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); setTimeout(() => setAnim(true), 400) }
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} style={{ padding: '7rem 2rem', background: 'linear-gradient(180deg,#020408 0%,#060d14 50%,#020408 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(0,212,255,0.2),transparent)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <p className="section-tag">// WHO_AM_I.exe</p>
          <h2 className="section-title">About <span>Me</span></h2>
          <div className="section-bar" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem' }}>
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ width: 70, height: 70, border: '1px solid rgba(0,212,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,212,255,0.05)', boxShadow: '0 0 20px rgba(0,212,255,0.1)', position: 'relative' }}>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '1.8rem', color: '#00d4ff' }}>B</span>
                <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: '#00d4ff', borderRadius: '50%', boxShadow: '0 0 8px #00d4ff' }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '1.3rem', color: '#fff' }}>Bhasker</div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.72rem', color: '#00d4ff', letterSpacing: 2 }}>Full Stack Developer</div>
              </div>
            </div>

            <p style={{ color: 'rgba(200,232,240,0.7)', lineHeight: 2, fontSize: '1.05rem', marginBottom: '1.2rem' }}>
              Hey! I'm <span style={{ color: '#00d4ff', fontWeight: 600 }}>Bhasker</span>, a passionate Full Stack Developer specializing in high-performance MERN stack applications. I turn complex problems into elegant digital experiences.
            </p>
            <p style={{ color: 'rgba(200,232,240,0.7)', lineHeight: 2, fontSize: '1.05rem', marginBottom: '2rem' }}>
              From pixel-perfect frontends to robust backends — I engineer end-to-end solutions that are fast, scalable and visually stunning.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              {[['Location','India'],['Stack','MERN'],['Role','Full Stack Dev'],['Status','🟢 Open to Work']].map(([l,v]) => (
                <div key={l} style={{ padding: '0.8rem', background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.1)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: '100%', background: 'linear-gradient(to bottom,#00d4ff,#0066ff)' }} />
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.6)', letterSpacing: 2, marginBottom: 2, paddingLeft: 8 }}>{l}</div>
                  <div style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600, paddingLeft: 8 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {badges.map(t => (
                <span key={t} style={{ padding: '0.25rem 0.7rem', fontSize: '0.72rem', fontFamily: "'Share Tech Mono',monospace", letterSpacing: 1, border: '1px solid rgba(0,102,255,0.3)', color: 'rgba(0,212,255,0.8)', background: 'rgba(0,102,255,0.05)', cursor: 'default', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.target.style.borderColor = '#00d4ff'; e.target.style.background = 'rgba(0,212,255,0.1)' }}
                  onMouseLeave={e => { e.target.style.borderColor = 'rgba(0,102,255,0.3)'; e.target.style.background = 'rgba(0,102,255,0.05)' }}
                >{t}</span>
              ))}
            </div>
          </div>

          <div id="skills" style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(30px)', transition: 'all 0.8s ease 0.4s' }}>
            <p className="section-tag">// SKILL_MATRIX.dat</p>
            <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: '1.2rem', color: '#fff', letterSpacing: 2, marginBottom: '1.8rem' }}>Tech <span style={{ color: '#00d4ff' }}>Arsenal</span></h3>

            {skills.map((s, i) => (
              <div key={s.name} style={{ marginBottom: '1.4rem', opacity: anim ? 1 : 0, transform: anim ? 'translateX(0)' : 'translateX(20px)', transition: `all 0.5s ease ${i * 0.08}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#c8e8f0', letterSpacing: 1 }}>{s.name}</span>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.75rem', color: '#00d4ff' }}>{s.level}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: anim ? `${s.level}%` : '0%', background: 'linear-gradient(to right,#0066ff,#00d4ff)', boxShadow: '0 0 8px #00d4ff', transition: `width 1.2s ease ${i * 0.1 + 0.5}s` }} />
                  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: anim ? `calc(${s.level}% - 4px)` : '0%', width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff', transition: `left 1.2s ease ${i * 0.1 + 0.5}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}