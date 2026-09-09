import { useEffect, useRef, useState } from 'react'

const edu = [
  { id:'01', degree:'Bachelor of Technology', field:'Computer Science & Engineering', institute:'St. Andrews Institue of Technology', board:'Maharishi Dayanand University', year:'2023 — 2027', grade:'X.X CGPA', status:'PURSUING', icon:'🎓', color:'#00d4ff' },
  { id:'02', degree:'Intermediate (12th)', field:'Science — PCM', institute:'RPM +2 high school', board:'Bihar Board', year:'2021 — 2023', grade:'60%', status:'COMPLETED', icon:'📘', color:'#0099cc' },
  { id:'03', degree:'High School (10th)', field:'General Studies', institute:'RPM +2 high school', board:'Bihar Board', year:'2020 — 2021', grade:'70%', status:'COMPLETED', icon:'📗', color:'#0066ff' },
]

export default function Education() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="education" ref={ref} style={{ padding: '7rem 2rem', background: 'linear-gradient(180deg,#060d14 0%,#020408 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(0,212,255,0.2),transparent)' }} />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <p className="section-tag">// ACADEMIC_RECORDS.edu</p>
          <h2 className="section-title">Education <span>Journey</span></h2>
          <div className="section-bar" />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom,#00d4ff,#0066ff,transparent)', opacity: vis ? 0.3 : 0, transition: 'opacity 0.8s ease 0.5s' }} />

          {edu.map((e, i) => (
            <div key={e.id} onMouseEnter={() => setHov(e.id)} onMouseLeave={() => setHov(null)}
              style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-30px)', transition: `all 0.7s ease ${i * 0.15}s` }}>

              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: hov === e.id ? `${e.color}20` : 'rgba(0,212,255,0.05)', border: `1px solid ${hov === e.id ? e.color : 'rgba(0,212,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', zIndex: 1, boxShadow: hov === e.id ? `0 0 20px ${e.color}40` : 'none', transition: 'all 0.3s' }}>
                  {e.icon}
                </div>
              </div>

              <div style={{ flex: 1, padding: '1.5rem 1.8rem', background: hov === e.id ? 'rgba(0,212,255,0.04)' : '#0a1520', border: `1px solid ${hov === e.id ? e.color + '50' : 'rgba(0,212,255,0.1)'}`, position: 'relative', overflow: 'hidden', transition: 'all 0.35s', transform: hov === e.id ? 'translateX(6px)' : 'translateX(0)', boxShadow: hov === e.id ? `0 8px 32px ${e.color}15` : 'none' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: hov === e.id ? `linear-gradient(to right,${e.color},transparent)` : 'transparent', transition: 'all 0.3s' }} />
                <div style={{ position: 'absolute', top: 6, left: 6, width: 10, height: 10, borderTop: `1px solid ${e.color}50`, borderLeft: `1px solid ${e.color}50` }} />
                <div style={{ position: 'absolute', bottom: 6, right: 6, width: 10, height: 10, borderBottom: `1px solid ${e.color}50`, borderRight: `1px solid ${e.color}50` }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: '1.05rem', color: hov === e.id ? e.color : '#fff', letterSpacing: 1, marginBottom: '0.2rem', transition: 'color 0.3s' }}>{e.degree}</h3>
                    <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.72rem', color: e.color, letterSpacing: 2, opacity: 0.8 }}>{e.field}</p>
                  </div>
                  <span style={{ padding: '0.2rem 0.7rem', fontSize: '0.62rem', fontFamily: "'Share Tech Mono',monospace", letterSpacing: 2, background: e.status === 'PURSUING' ? 'rgba(0,255,136,0.08)' : `${e.color}10`, color: e.status === 'PURSUING' ? '#00ff88' : e.color, border: `1px solid ${e.status === 'PURSUING' ? 'rgba(0,255,136,0.3)' : e.color + '30'}` }}>{e.status}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '0.8rem', marginTop: '1rem' }}>
                  {[['Institute',e.institute],['Board / Univ',e.board],['Year',e.year],['Grade',e.grade]].map(([l,v]) => (
                    <div key={l} style={{ borderLeft: `2px solid ${e.color}40`, paddingLeft: '0.7rem' }}>
                      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.6rem', color: 'rgba(0,212,255,0.4)', letterSpacing: 2, marginBottom: 2 }}>{l}</div>
                      <div style={{ fontSize: '0.88rem', color: '#c8e8f0' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}