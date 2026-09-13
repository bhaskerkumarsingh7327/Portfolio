import { useState, useRef, useEffect } from 'react'

const quickReplies = [
  'Who is Bhasker?',
  'What are your skills?',
  'Show me projects',
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hey! 👋 I'm Bhasker's AI assistant. Ask me anything about his portfolio, skills, or projects!",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(1)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setUnread(0)
  }, [open])

  const sendMessage = async (text) => {
    const userText = text || input.trim()

    if (!userText) return

    setInput('')

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: userText,
      },
    ])

    setLoading(true)

    try {
      const reply = getSmartReply(userText)

      await new Promise((resolve) => setTimeout(resolve, 800))

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: reply,
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Something went wrong. Please try again!',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getSmartReply = (q) => {
    const lower = q.toLowerCase()

    if (
      lower.includes('skill') ||
      lower.includes('tech') ||
      lower.includes('stack')
    ) {
      return "Bhasker is skilled in React.js, Node.js, Express.js, MongoDB, JavaScript, Tailwind CSS, JWT, Socket.io, and Git. He specializes in the MERN stack! 💪"
    }

    if (lower.includes('project')) {
      return "Bhasker has built: NeuroFolio (AI portfolio), ShopCore (e-commerce with Stripe), NexusChat (real-time chat), and TaskMatrix (project management tool). Check the Projects section! 🚀"
    }

    if (
      lower.includes('contact') ||
      lower.includes('hire') ||
      lower.includes('reach')
    ) {
      return "You can contact Bhasker via the Contact section below, or directly email him. He's open to work and collaboration! 📩"
    }

    if (
      lower.includes('who') ||
      lower.includes('bhasker') ||
      lower.includes('about')
    ) {
      return "Bhasker is a Full Stack Developer from India, specializing in MERN stack applications. He builds scalable, modern web apps with clean code and futuristic UI! 🔥"
    }

    if (
      lower.includes('education') ||
      lower.includes('study') ||
      lower.includes('degree')
    ) {
      return "Bhasker is pursuing B.Tech in Computer Science. He has completed his 12th and 10th from UP Board/CBSE. 🎓"
    }

    if (
      lower.includes('open') ||
      lower.includes('work') ||
      lower.includes('job') ||
      lower.includes('available')
    ) {
      return "Yes! Bhasker is currently open to work — full-time roles, freelance projects, and collaborations. Contact him via the form below! 🟢"
    }

    if (
      lower.includes('hello') ||
      lower.includes('hi') ||
      lower.includes('hey')
    ) {
      return "Hey there! 👋 I'm here to tell you all about Bhasker. Ask me about his skills, projects, or how to contact him!"
    }

    if (
      lower.includes('experience') ||
      lower.includes('years')
    ) {
      return "Bhasker has 2+ years of experience in full stack development, having built 10+ projects using the MERN stack and modern technologies! ⚡"
    }

    return "Great question! Feel free to explore the portfolio sections or use the Contact form to reach Bhasker directly. I'm here to help! 😊"
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 999,
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: open
            ? '#020408'
            : 'linear-gradient(135deg,#0066ff,#00d4ff)',
          border: `1px solid ${open ? '#00d4ff' : 'transparent'}`,
          color: '#fff',
          fontSize: '1.3rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,212,255,0.3)',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {open ? '✕' : '🤖'}

        {!open && unread > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#00ff88',
              border: '2px solid #020408',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.55rem',
              fontWeight: 700,
              color: '#000',
            }}
          >
            {unread}
          </div>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            left: 24,
            zIndex: 998,
            width: 'min(320px, calc(100vw - 48px))',
            height: 'min(440px, calc(100vh - 120px))',
            background: 'rgba(6,13,20,0.97)',
            border: '1px solid rgba(0,212,255,0.2)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            animation: 'chatSlideUp 0.3s ease',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '0.8rem 1rem',
              borderBottom: '1px solid rgba(0,212,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(0,212,255,0.03)',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#0066ff,#00d4ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0,
              }}
            >
              🤖
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Exo 2',sans-serif",
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#fff',
                  letterSpacing: 1,
                }}
              >
                Bhasker's AI
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#00ff88',
                    boxShadow: '0 0 6px #00ff88',
                  }}
                />

                <span
                  style={{
                    fontFamily: "'Share Tech Mono',monospace",
                    fontSize: '0.58rem',
                    color: 'rgba(0,212,255,0.5)',
                    letterSpacing: 2,
                  }}
                >
                  ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent:
                    m.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '0.55rem 0.8rem',
                    background:
                      m.role === 'user'
                        ? 'linear-gradient(135deg,#0066ff,#00d4ff)'
                        : 'rgba(0,212,255,0.06)',
                    border:
                      m.role === 'user'
                        ? 'none'
                        : '1px solid rgba(0,212,255,0.15)',
                    color: '#fff',
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                    fontFamily: "'Rajdhani',sans-serif",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <div
                  style={{
                    padding: '0.55rem 0.8rem',
                    background: 'rgba(0,212,255,0.06)',
                    border: '1px solid rgba(0,212,255,0.15)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 4,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: '#00d4ff',
                          animation: `chatDot 1s infinite ${
                            i * 0.2
                          }s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div
            style={{
              padding: '0.4rem 0.6rem',
              borderTop: '1px solid rgba(0,212,255,0.08)',
              display: 'flex',
              gap: '0.35rem',
              flexWrap: 'wrap',
              flexShrink: 0,
            }}
          >
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.6rem',
                  fontFamily: "'Share Tech Mono',monospace",
                  background: 'transparent',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: 'rgba(0,212,255,0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: 1,
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#00d4ff'
                  e.target.style.color = '#00d4ff'
                  e.target.style.background = 'rgba(0,212,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor =
                    'rgba(0,212,255,0.2)'
                  e.target.style.color = 'rgba(0,212,255,0.7)'
                  e.target.style.background = 'transparent'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: '0.6rem',
              borderTop: '1px solid rgba(0,212,255,0.1)',
              display: 'flex',
              gap: '0.5rem',
              flexShrink: 0,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage()
              }}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                background: 'rgba(0,212,255,0.04)',
                border: '1px solid rgba(0,212,255,0.15)',
                color: '#fff',
                padding: '0.5rem 0.7rem',
                fontSize: '0.82rem',
                fontFamily: "'Rajdhani',sans-serif",
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00d4ff'
              }}
              onBlur={(e) => {
                e.target.style.borderColor =
                  'rgba(0,212,255,0.15)'
              }}
            />

            <button
              onClick={() => sendMessage()}
              disabled={loading}
              style={{
                padding: '0.5rem 0.8rem',
                background:
                  'linear-gradient(135deg,#0066ff,#00d4ff)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes chatDot {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }

          50% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}