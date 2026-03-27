import { useEffect, useRef, useState } from 'react'

// ✅ ICONS ADD
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { IoLocationSharp } from 'react-icons/io5'

export default function Contact() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [focused, setFocused] = useState('')

  useEffect(() => {  
    const observer = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) setVisible(true) 
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }

    } catch {
      setStatus('error')
    }
  }

  const inputBase = (name) => ({
    width: '100%',
    background: focused === name ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${focused === name ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.1)'}`,
    borderLeft: `2px solid ${focused === name ? '#00d4ff' : '#0066ff'}`,
    color: '#fff',
    padding: '0.9rem 1rem',
    fontSize: '1rem',
    fontFamily: "'Rajdhani',sans-serif",
    outline: 'none',
    transition: 'all 0.3s',
    boxShadow: focused === name ? '0 0 20px rgba(0,212,255,0.06)' : 'none',
  })

  const contacts = [
    { icon: <MdEmail />, label: 'Email', val: 'mailto:bhaskersingh8010@gmail.com' },
    { icon: <IoLocationSharp />, label: 'Location', val: 'India' },
    { icon: <FaGithub />, label: 'GitHub', val: 'https://github.com/bhaskerkumarsingh7327' },
    { icon: <FaInstagram />, label: 'Instagram', val: 'https://instagram.com/mrsingh7327' },
    { icon: <FaTwitter />, label: 'Twitter', val: 'https://twitter.com/' },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: '7rem 2rem',
        background: 'linear-gradient(180deg,#020408 0%,#060d14 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(to right,transparent,rgba(0,212,255,0.2),transparent)'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '-5%',
        width: 250,
        height: 250,
        borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(0,102,255,0.07) 0%,transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease'
        }}>
          <p className="section-tag">// ESTABLISH_CONNECTION.sh</p>
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <div className="section-bar" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
          gap: '4rem'
        }}>

          {/* LEFT */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s ease 0.2s'
          }}>

            <p style={{
              color: 'rgba(200,232,240,0.65)',
              lineHeight: 2,
              fontSize: '1.05rem',
              marginBottom: '2.5rem'
            }}>
              Ready to build something <span style={{ color: '#00d4ff' }}>extraordinary</span>? Whether it's a project, collaboration, or just a conversation — my inbox is always open.
            </p>

            {contacts.map(c => (
              <a key={c.label} href={c.val} target="_blank" style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  marginBottom: '0.8rem',
                  border: '1px solid rgba(0,212,255,0.1)',
                  background: 'rgba(0,212,255,0.02)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'
                  e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'
                  e.currentTarget.style.background = 'rgba(0,212,255,0.02)'
                }}>
                  <span style={{ color: '#00d4ff', fontSize: '1.2rem', width: 24 }}>
                    {c.icon}
                  </span>
                  <div>
                    <div style={{
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: '0.65rem',
                      color: 'rgba(0,212,255,0.5)',
                      letterSpacing: 2,
                      marginBottom: 2
                    }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#c8e8f0' }}>
                      {c.val.replace('mailto:', '')}
                    </div>
                  </div>
                </div>
              </a>
            ))}

            {/* ✅ BUTTON FIX ONLY */}
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem' }}>
              {[
                { name: 'GitHub', icon: <FaGithub />, link: 'https://github.com/bhaskerkumarsingh7327' },
                { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/bhasker-kumar-singh-84b778294/' },
                { name: 'Twitter', icon: <FaTwitter />, link: 'https://twitter.com/' },
                { name: 'Instagram', icon: <FaInstagram />, link: 'https://instagram.com/mrsingh7327' },
              ].map(s => (
                <a key={s.name} href={s.link} target="_blank" className="btn-neo">
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '1rem', display: 'flex' }}>{s.icon}</span>
                    {s.name}
                  </span>
                </a>
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.4s'
          }}>

            <div style={{
              padding: '2rem',
              border: '1px solid rgba(0,212,255,0.1)',
              background: 'rgba(0,21,32,0.8)',
              position: 'relative'
            }}>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                {['name', 'email'].map(field => (
                  <div key={field}>
                    <label style={{
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: '0.65rem',
                      color: 'rgba(0,212,255,0.5)',
                      letterSpacing: 2,
                      display: 'block',
                      marginBottom: '0.4rem'
                    }}>
                      {field.toUpperCase()}
                    </label>

                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={field === 'name' ? 'Your Name' : 'your@email.com'}
                      style={inputBase(field)}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused('')}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: '0.65rem',
                  color: 'rgba(0,212,255,0.5)',
                  letterSpacing: 2,
                  display: 'block',
                  marginBottom: '0.4rem'
                }}>
                  SUBJECT
                </label>

                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Collaboration..."
                  style={inputBase('subject')}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused('')}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: '0.65rem',
                  color: 'rgba(0,212,255,0.5)',
                  letterSpacing: 2,
                  display: 'block',
                  marginBottom: '0.4rem'
                }}>
                  MESSAGE
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project..."
                  style={{ ...inputBase('message'), resize: 'vertical' }}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                />
              </div>

              {status === 'success' && (
                <div style={{
                  marginBottom: '1rem',
                  padding: '0.7rem 1rem',
                  background: 'rgba(0,255,136,0.06)',
                  border: '1px solid rgba(0,255,136,0.3)',
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: '0.72rem',
                  color: '#00ff88',
                  letterSpacing: 2
                }}>
                  ✓ TRANSMISSION SUCCESSFUL — I'll respond shortly.
                </div>
              )}

              {status === 'error' && (
                <div style={{
                  marginBottom: '1rem',
                  padding: '0.7rem 1rem',
                  background: 'rgba(0,212,255,0.04)',
                  border: '1px solid rgba(226,75,74,0.3)',
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: '0.72rem',
                  color: '#ff6b6b',
                  letterSpacing: 2
                }}>
                  ✗ TRANSMISSION FAILED — Fill all required fields.
                </div>
              )}

              <button onClick={handleSubmit} disabled={status === 'sending'} className="btn-neo">
                <span>
                  {status === 'sending' ? '[ TRANSMITTING... ]' : '[ SEND MESSAGE ]'}
                </span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}