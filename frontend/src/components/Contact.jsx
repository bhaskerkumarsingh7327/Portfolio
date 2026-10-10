import { useEffect, useRef, useState } from 'react'

const contactInfo = [
  { icon: '✉', label: 'Email', val: 'bhaskerkumarsingh8010@gmail.com', href: 'mailto:bhaskerkumarsingh8010@gmail.com' },
  { icon: '📍', label: 'Location', val: 'India', href: null },
  { icon: '🐙', label: 'GitHub', val: 'github.com/bhaskerkumarsingh7327', href: 'https://github.com/bhaskerkumarsingh7327' },
  { icon: '📸', label: 'Instagram', val: 'instagram.com/mrsingh7327', href: 'https://instagram.com/mrsingh7327' },
  { icon: '🐦', label: 'Twitter', val: 'twitter.com/', href: 'https://twitter.com/' },
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

  return (
    <section id="contact" ref={ref} className="lm-section lm-contact">
      <div className="lm-section-line-top" />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <p className="section-tag">// ESTABLISH_CONNECTION.sh</p>
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <div className="section-bar" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '4rem' }}>

          {/* Left */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease 0.2s' }}>
            <p className="lm-text" style={{ lineHeight: 2, fontSize: '1.05rem', marginBottom: '2rem' }}>
              Ready to build something <span style={{ color: '#00d4ff' }}>extraordinary</span>? Whether it's a project, collaboration, or just a conversation — my inbox is always open.
            </p>

            {contactInfo.map(c => (
              <div key={c.label} className="lm-contact-info-item"
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'; e.currentTarget.style.background = 'rgba(0,212,255,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'; e.currentTarget.style.background = 'rgba(0,212,255,0.02)' }}
              >
                <span style={{ fontSize: '1rem', width: 24, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div className="lm-contact-info-label">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" className="lm-contact-info-val lm-contact-link">{c.val}</a>
                  ) : (
                    <div className="lm-contact-info-val">{c.val}</div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { name: 'GitHub', href: 'https://github.com/bhaskerkumarsingh7327', icon: '🐙' },
                { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
                { name: 'Twitter', href: 'https://twitter.com/', icon: '🐦' },
                { name: 'Instagram', href: 'https://instagram.com/mrsingh7327', icon: '📸' },
              ].map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="lm-social-btn"
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#00d4ff'; e.currentTarget.style.color='#00d4ff'; e.currentTarget.style.background='rgba(0,212,255,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,212,255,0.2)'; e.currentTarget.style.color='rgba(0,212,255,0.7)'; e.currentTarget.style.background='transparent' }}
                >{s.icon} {s.name}</a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(30px)', transition: 'all 0.8s ease 0.4s' }}>
            <div className="lm-contact-form-card">
              <div style={{ position: 'absolute', top: 6, left: 6, width: 12, height: 12, borderTop: '1px solid #00d4ff', borderLeft: '1px solid #00d4ff' }} />
              <div style={{ position: 'absolute', bottom: 6, right: 6, width: 12, height: 12, borderBottom: '1px solid #00d4ff', borderRight: '1px solid #00d4ff' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {['name','email'].map(f => (
                  <div key={f}>
                    <label className="lm-form-label">{f.toUpperCase()}</label>
                    <input name={f} value={form[f]} onChange={handleChange}
                      placeholder={f === 'name' ? 'Your Name' : 'your@email.com'}
                      className={`lm-form-input ${focused === f ? 'focused' : ''}`}
                      onFocus={() => setFocused(f)} onBlur={() => setFocused('')} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="lm-form-label">SUBJECT</label>
                <input name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Project Inquiry / Collaboration..."
                  className={`lm-form-input ${focused === 'subject' ? 'focused' : ''}`}
                  onFocus={() => setFocused('subject')} onBlur={() => setFocused('')} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="lm-form-label">MESSAGE</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  rows={5} placeholder="Tell me about your project..."
                  className={`lm-form-input ${focused === 'message' ? 'focused' : ''}`}
                  style={{ resize: 'vertical' }}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
              </div>

              {status === 'success' && <div className="lm-form-success">✓ TRANSMISSION SUCCESSFUL</div>}
              {status === 'error' && <div className="lm-form-error">✗ FILL ALL REQUIRED FIELDS</div>}

              <button onClick={handleSubmit} disabled={status === 'sending'} className="btn-neo lm-submit-btn">
                <span style={{ position: 'relative', zIndex: 1 }}>{status === 'sending' ? '[ TRANSMITTING... ]' : '[ SEND MESSAGE ]'}</span>
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,212,255,0.08)', textAlign: 'center' }}>
          <div className="lm-footer-text">BHASKER © 2025 — BUILT WITH REACT + NODE.JS — ALL SYSTEMS OPERATIONAL</div>
        </div>
      </div>
    </section>
  )
}