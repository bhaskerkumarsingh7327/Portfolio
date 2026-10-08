import { useEffect, useRef, useState } from 'react'

const contactInfo = [
  { icon: '✉', label: 'Email', val: 'bhaskerkumarsingh8010@gmail.com', href: 'mailto:bhaskerkumarsingh8010@gmail.com' },
  { icon: '📍', label: 'Location', val: 'India', href: null },
  { icon: '🐙', label: 'GitHub', val: 'https://github.com/bhaskerkumarsingh7327', href: 'https://github.com/bhaskerkumarsingh7327' },
  { icon: '📸', label: 'Instagram', val: 'https://instagram.com/mrsingh7327', href: 'https://instagram.com/mrsingh7327' },
  { icon: '🐦', label: 'Twitter', val: 'https://twitter.com/', href: 'https://twitter.com/' },
]

export default function Contact() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [focused, setFocused] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus('error'); return }
    setStatus('sending')
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const inp = (name) => ({
    width: '100%',
    background: focused === name ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${focused === name ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.1)'}`,
    borderLeft: `2px solid ${focused === name ? '#00d4ff' : '#0066ff'}`,
    color: '#fff', padding: '0.9rem 1rem',
    fontSize: '1rem', fontFamily: "'Rajdhani',sans-serif",
    outline: 'none', transition: 'all 0.3s',
  })

  return (
    <section id="contact" ref={ref} style={{ padding: '7rem 2rem', background: 'linear-gradient(180deg,#020408 0%,#060d14 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(0,212,255,0.2),transparent)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <p className="section-tag">// ESTABLISH_CONNECTION.sh</p>
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <div className="section-bar" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '4rem' }}>

          {/* Left — Contact Info */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease 0.2s' }}>
            <p style={{ color: 'rgba(200,232,240,0.65)', lineHeight: 2, fontSize: '1.05rem', marginBottom: '2rem' }}>
              Ready to build something <span style={{ color: '#00d4ff' }}>extraordinary</span>? Whether it's a project, collaboration, or just a conversation — my inbox is always open.
            </p>

            {contactInfo.map(c => (
              <div key={c.label} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: '0.9rem 1rem', marginBottom: '0.6rem',
                border: '1px solid rgba(0,212,255,0.1)',
                background: 'rgba(0,212,255,0.02)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'; e.currentTarget.style.background = 'rgba(0,212,255,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'; e.currentTarget.style.background = 'rgba(0,212,255,0.02)' }}
              >
                <span style={{ fontSize: '1rem', width: 24, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 2, marginBottom: 3 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: '#c8e8f0', textDecoration: 'none', wordBreak: 'break-all', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#00d4ff'}
                      onMouseLeave={e => e.target.style.color = '#c8e8f0'}
                    >{c.val}</a>
                  ) : (
                    <div style={{ fontSize: '0.9rem', color: '#c8e8f0' }}>{c.val}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Social buttons */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { name: 'GitHub', href: 'https://github.com/bhaskerkumarsingh7327', icon: '🐙' },
                { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
                { name: 'Twitter', href: 'https://twitter.com/', icon: '🐦' },
                { name: 'Instagram', href: 'https://instagram.com/mrsingh7327', icon: '📸' },
              ].map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" style={{
                  padding: '0.45rem 0.8rem', fontFamily: "'Share Tech Mono',monospace",
                  fontSize: '0.65rem', letterSpacing: 2,
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: 'rgba(0,212,255,0.7)',
                  textDecoration: 'none', background: 'transparent',
                  transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: 5,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#00d4ff'; e.currentTarget.style.color = '#00d4ff'; e.currentTarget.style.background = 'rgba(0,212,255,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'; e.currentTarget.style.color = 'rgba(0,212,255,0.7)'; e.currentTarget.style.background = 'transparent' }}
                >
                  {s.icon} {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(30px)', transition: 'all 0.8s ease 0.4s' }}>
            <div className="contact-form-card" style={{ padding: '2rem', border: '1px solid rgba(0,212,255,0.1)', background: 'rgba(0,21,32,0.8)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 6, left: 6, width: 12, height: 12, borderTop: '1px solid #00d4ff', borderLeft: '1px solid #00d4ff' }} />
              <div style={{ position: 'absolute', bottom: 6, right: 6, width: 12, height: 12, borderBottom: '1px solid #00d4ff', borderRight: '1px solid #00d4ff' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {['name', 'email'].map(f => (
                  <div key={f}>
                    <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 2, display: 'block', marginBottom: '0.4rem' }}>{f.toUpperCase()}</label>
                    <input name={f} value={form[f]} onChange={handleChange}
                      placeholder={f === 'name' ? 'Your Name' : 'your@email.com'}
                      style={inp(f)}
                      onFocus={() => setFocused(f)} onBlur={() => setFocused('')} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 2, display: 'block', marginBottom: '0.4rem' }}>SUBJECT</label>
                <input name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Project Inquiry / Collaboration..."
                  style={inp('subject')}
                  onFocus={() => setFocused('subject')} onBlur={() => setFocused('')} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 2, display: 'block', marginBottom: '0.4rem' }}>MESSAGE</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  rows={5} placeholder="Tell me about your project..."
                  style={{ ...inp('message'), resize: 'vertical' }}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
              </div>

              {status === 'success' && <div style={{ marginBottom: '1rem', padding: '0.7rem 1rem', background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.3)', fontFamily: "'Share Tech Mono',monospace", fontSize: '0.72rem', color: '#00ff88', letterSpacing: 2 }}>✓ TRANSMISSION SUCCESSFUL</div>}
              {status === 'error' && <div style={{ marginBottom: '1rem', padding: '0.7rem 1rem', background: 'rgba(255,80,80,0.05)', border: '1px solid rgba(255,80,80,0.3)', fontFamily: "'Share Tech Mono',monospace", fontSize: '0.72rem', color: '#ff6b6b', letterSpacing: 2 }}>✗ FILL ALL REQUIRED FIELDS</div>}

              <button onClick={handleSubmit} disabled={status === 'sending'} className="btn-neo"
                style={{ width: '100%', textAlign: 'center', padding: '0.9rem', cursor: 'pointer', border: '1px solid #00d4ff', color: '#00d4ff', background: 'transparent', fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: 4, textTransform: 'uppercase', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}>
                <span style={{ position: 'relative', zIndex: 1 }}>{status === 'sending' ? '[ TRANSMITTING... ]' : '[ SEND MESSAGE ]'}</span>
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,212,255,0.08)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.7rem', color: 'rgba(0,212,255,0.2)', letterSpacing: 4 }}>
            BHASKER © 2025 — BUILT WITH REACT + NODE.JS — ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
    </section>
  )
}