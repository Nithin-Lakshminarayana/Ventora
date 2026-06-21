'use client'

import { motion } from 'framer-motion'

interface Cloud {
  id: number
  y: number
  scale: number
  opacity: number
  duration: number
  delay: number
  blur: number
}

const CLOUDS: Cloud[] = [
  { id: 0, y: 8,  scale: 1.4, opacity: 0.07, duration: 80,  delay: 0,   blur: 2 },
  { id: 1, y: 18, scale: 1.0, opacity: 0.05, duration: 110, delay: -30, blur: 3 },
  { id: 2, y: 28, scale: 0.8, opacity: 0.06, duration: 95,  delay: -55, blur: 2 },
  { id: 3, y: 12, scale: 1.2, opacity: 0.04, duration: 130, delay: -20, blur: 4 },
]

function CloudShape({ scale, opacity, blur }: { scale: number; opacity: number; blur: number }) {
  return (
    <svg
      width="500"
      height="160"
      viewBox="0 0 500 160"
      fill="white"
      style={{ opacity, filter: `blur(${blur}px)`, transform: `scale(${scale})`, transformOrigin: 'left center' }}
    >
      <ellipse cx="200" cy="100" rx="180" ry="55" />
      <ellipse cx="140" cy="90" rx="100" ry="65" />
      <ellipse cx="310" cy="95" rx="110" ry="50" />
      <ellipse cx="380" cy="105" rx="80" ry="42" />
    </svg>
  )
}

export default function CloudLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {CLOUDS.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{ top: `${c.y}%`, left: 0 }}
          initial={{ x: '110vw' }}
          animate={{ x: '-500px' }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <CloudShape scale={c.scale} opacity={c.opacity} blur={c.blur} />
        </motion.div>
      ))}
    </div>
  )
}
