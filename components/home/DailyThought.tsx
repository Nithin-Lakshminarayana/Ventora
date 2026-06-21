'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const THOUGHTS = [
  "You survived every difficult day before this one.",
  "Rest is not a reward. It is a requirement.",
  "You don't have to have it all figured out today.",
  "Small steps are still steps.",
  "It's okay to not be okay.",
  "You are not your hardest days.",
  "Being gentle with yourself is strength.",
  "Your feelings are valid, even when they're heavy.",
  "One breath at a time is enough.",
  "Growth doesn't always look like moving forward.",
]

export default function DailyThought() {
  const [thought, setThought] = useState('')

  useEffect(() => {
    const day = new Date().getDate()
    setThought(THOUGHTS[day % THOUGHTS.length])
  }, [])

  return (
    <motion.div
      className="glass rounded-4xl p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-ventora-muted/60 text-xs tracking-widest uppercase mb-4 text-center">Today's Thought</p>
      <div
        className="w-8 h-px mx-auto mb-4"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }}
      />
      <p
        className="text-white/80 text-base font-light leading-relaxed text-center"
        style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}
      >
        "{thought}"
      </p>
      <div
        className="w-8 h-px mx-auto mt-4"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }}
      />
    </motion.div>
  )
}
