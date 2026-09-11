import { useEffect, useRef } from 'react'

export default function MouseTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)

    const trail = []
    const maxTrail = 22

    const onMove = (e) => {
      trail.push({ x: e.clientX, y: e.clientY, age: 0 })
      if (trail.length > maxTrail) trail.shift()
    }
    window.addEventListener('mousemove', onMove)

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      trail.forEach((p, i) => {
        p.age++
        const alpha = (1 - p.age / 60) * (i / trail.length) * 0.6
        if (alpha <= 0) return
        const size = (i / trail.length) * 5 + 1
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3)
        grad.addColorStop(0, `rgba(0,212,255,${alpha})`)
        grad.addColorStop(1, `rgba(0,102,255,0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none' }} />
  )
}