import { useState, useRef, useEffect } from 'react'

const commands = {
  whoami: `Bhasker Kumar Singh
Full Stack Developer | MERN Stack
Location: India | Status: Open to Work 🟢`,

  skills: `SKILL MATRIX:
► React.js      ████████████ 90%
► Node.js       ███████████  85%
► MongoDB       ██████████   80%
► Express.js    ███████████  85%
► JavaScript    ████████████ 92%
► Tailwind CSS  ███████████  88%`,

  projects: `DEPLOYED SYSTEMS:
[01] FitLife          → fitlife-1-tk4d.onrender.com
[02] RealTime Chat    → realtimechatapp-frontend-7uv3.onrender.com
[03] FoodMeto         → foodmeto-frontend-lbgc.onrender.com
[04] Human Resource   → human-resource-1-5fje.onrender.com`,

  contact: `CONTACT INFO:
► Email    → bhasker@email.com
► GitHub   → github.com/bhaskerkumarsingh7327
► LinkedIn → linkedin.com/in/YOUR_LINKEDIN
► Domain   → bhasker.co.in`,

  education: `ACADEMIC RECORDS:
► B.Tech CSE      → Pursuing
► Intermediate    → Completed
► High School     → Completed`,

  help: `AVAILABLE COMMANDS:
► whoami      — About me
► skills      — Tech stack
► projects    — My projects
► contact     — Contact info
► education   — Qualifications
► clear       — Clear terminal
► help        — Show commands`,

  clear: '__CLEAR__',
}

export default function Terminal() {
  const [open, setOpen] = useState(false)
  const [history, setHistory] = useState([
    { type: 'system', text: 'BHASKER OS v2.0 — Type "help" for commands' }
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [cmdIndex, setCmdIndex] = useState(-1)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    setCmdHistory(prev => [trimmed, ...prev])
    setCmdIndex(-1)

    const newHistory = [...history, { type: 'input', text: `$ ${trimmed}` }]

    if (trimmed === 'clear') {
      setHistory([{ type: 'system', text: 'BHASKER OS v2.0 — Type "help" for commands' }])
    } else if (commands[trimmed]) {
      setHistory([...newHistory, { type: 'output', text: commands[trimmed] }])
    } else {
      setHistory([...newHistory, { type: 'error', text: `Command not found: "${trimmed}". Type "help" for available commands.` }])
    }
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.min(cmdIndex + 1, cmdHistory.length - 1)
      setCmdIndex(newIndex)
      setInput(cmdHistory[newIndex] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = Math.max(cmdIndex - 1, -1)
      setCmdIndex(newIndex)
      setInput(cmdHistory[newIndex] || '')
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Open Terminal"
        style={{
          position: 'fixed', bottom: 90, left: 24, zIndex: 997,
          width: 38, height: 38,
          background: open ? 'rgba(0,212,255,0.15)' : 'rgba(2,4,8,0.9)',
          border: '1px solid rgba(0,212,255,0.3)',
          color: '#00d4ff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontFamily: "'Share Tech Mono',monospace",
          transition: 'all 0.3s',
          boxShadow: open ? '0 0 16px rgba(0,212,255,0.3)' : 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#00d4ff'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,255,0.3)' }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; e.currentTarget.style.boxShadow = 'none' } }}
      >
        {'>_'}
      </button>

      {/* Terminal window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 140, left: 24, zIndex: 996,
          width: 'min(480px, calc(100vw - 48px))',
          height: 'min(320px, calc(100vh - 180px))',
          background: 'rgba(2,4,8,0.97)',
          border: '1px solid rgba(0,212,255,0.3)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 20px rgba(0,212,255,0.1)',
          animation: 'termSlide 0.3s ease',
        }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid rgba(0,212,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,212,255,0.03)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 2 }}>BHASKER — TERMINAL</span>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(0,212,255,0.4)', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
          </div>

          {/* Output */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.8rem 1rem', fontFamily: "'Share Tech Mono',monospace", fontSize: '0.72rem', lineHeight: 1.8 }}>
            {history.map((h, i) => (
              <div key={i} style={{
                color: h.type === 'input' ? '#00d4ff' : h.type === 'error' ? '#ff6b6b' : h.type === 'system' ? 'rgba(0,212,255,0.5)' : '#c8e8f0',
                whiteSpace: 'pre-wrap', marginBottom: '0.2rem',
              }}>{h.text}</div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid rgba(0,212,255,0.1)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.72rem', color: '#00d4ff' }}>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#00d4ff', fontFamily: "'Share Tech Mono',monospace", fontSize: '0.72rem', caretColor: '#00d4ff' }}
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      )}

      <style>{`@keyframes termSlide{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}`}</style>
    </>
  )
}