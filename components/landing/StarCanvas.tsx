'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  opacity: number
  speed: number
  phase: number
  color: string
}

const STAR_COLORS = [
  'rgba(255,255,255,',
  'rgba(200,220,255,',
  'rgba(180,200,255,',
  'rgba(125,211,252,',
]

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let stars: Star[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.85,
        r: Math.random() * 1.4 + 0.2,
        opacity: Math.random() * 0.6 + 0.3,
        speed: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }))
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008

      // Subtle aurora at top
      const aurora = ctx.createLinearGradient(0, 0, canvas.width, 0)
      aurora.addColorStop(0, 'rgba(139,92,246,0.04)')
      aurora.addColorStop(0.4, 'rgba(125,211,252,0.06)')
      aurora.addColorStop(0.7, 'rgba(74,222,128,0.04)')
      aurora.addColorStop(1, 'rgba(139,92,246,0.03)')
      ctx.fillStyle = aurora
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.35)

      // Stars
      stars.forEach((s) => {
        const twinkle = s.opacity * (0.65 + 0.35 * Math.sin(t * s.speed + s.phase))
        // Glow for larger stars
        if (s.r > 1.0) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2)
          ctx.fillStyle = `${s.color}${(twinkle * 0.15).toFixed(3)})`
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `${s.color}${twinkle.toFixed(3)})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  )
}
