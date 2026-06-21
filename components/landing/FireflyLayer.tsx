'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Fly {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  px: number[]
  py: number[]
  repeatDelay: number
}

export default function FireflyLayer() {
  const [flies, setFlies] = useState<Fly[]>([])

  useEffect(() => {
    setFlies(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        y: 15 + Math.random() * 70,
        size: Math.random() * 3.5 + 2,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 7,
        px: [0, (Math.random() - 0.5) * 140, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 120, 0],
        py: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 60, 0],
        repeatDelay: Math.random() * 4,
      }))
    )
  }, [])

  if (!flies.length) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {flies.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            background: '#a7f3d0',
            boxShadow: `0 0 ${f.size * 3}px 1px #86efac, 0 0 ${f.size * 7}px ${f.size * 2}px rgba(134,239,172,0.25)`,
          }}
          animate={{
            x: f.px,
            y: f.py,
            opacity: [0, 0.9, 0.5, 0.85, 0.3, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: f.repeatDelay,
          }}
        />
      ))}
    </div>
  )
}
