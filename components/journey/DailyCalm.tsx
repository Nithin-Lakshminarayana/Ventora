'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Moon, Leaf, Sparkles, Sprout, ChevronLeft, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const CALM_CARDS: { title: string; sub: string; Icon: LucideIcon; iconColor: string }[] = [
  { title: 'Take one slow breath.',    sub: 'Today only asks for today.',              Icon: Wind,     iconColor: '#7DD3FC' },
  { title: 'You arrived.',             sub: "That's enough. That's everything.",       Icon: Moon,     iconColor: '#A78BFA' },
  { title: 'Let your shoulders drop.', sub: "You've been carrying so much.",           Icon: Leaf,     iconColor: '#4ADE80' },
  { title: 'This moment is yours.',    sub: 'Not the past. Not tomorrow. Now.',        Icon: Sparkles, iconColor: '#FACC15' },
  { title: 'You are not behind.',      sub: 'You are exactly where you need to be.',  Icon: Sprout,   iconColor: '#34D399' },
]

interface Props { className?: string }

export default function DailyCalm({ className = '' }: Props) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const next = () => { setDir(1);  setIndex((i) => (i + 1) % CALM_CARDS.length) }
  const prev = () => { setDir(-1); setIndex((i) => (i - 1 + CALM_CARDS.length) % CALM_CARDS.length) }

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setIndex((i) => (i + 1) % CALM_CARDS.length) }, 5000)
    return () => clearInterval(t)
  }, [index])

  const card = CALM_CARDS[index]

  return (
    <div className={`glass rounded-4xl overflow-hidden flex flex-col ${className}`}>
      <div className="flex-1 flex flex-col p-4 min-h-0">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <p className="text-ventora-muted/50 text-[10px] tracking-widest uppercase">Daily Calm</p>
          <div className="flex gap-1">
            {CALM_CARDS.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === index ? '#8B5CF6' : 'rgba(255,255,255,0.12)' }} />
            ))}
          </div>
        </div>

        {/* Card content */}
        <div className="flex-1 flex items-center overflow-hidden min-h-0">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={{
                enter:  (d: number) => ({ x: d * 40, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit:   (d: number) => ({ x: d * -40, opacity: 0 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full text-center"
            >
              <motion.div
                className="mb-2 flex justify-center"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <card.Icon size={26} strokeWidth={1.4} style={{ color: card.iconColor }} />
              </motion.div>
              <p className="text-white/90 text-sm font-light leading-snug mb-1">{card.title}</p>
              <p className="text-ventora-muted/60 text-xs font-light leading-relaxed">{card.sub}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav arrows */}
        <div className="flex justify-between flex-shrink-0 mt-2">
          <button onClick={prev} className="text-ventora-muted/30 hover:text-ventora-muted/70 transition-colors p-1 rounded-lg">
            <ChevronLeft size={14} strokeWidth={1.8} />
          </button>
          <button onClick={next} className="text-ventora-muted/30 hover:text-ventora-muted/70 transition-colors p-1 rounded-lg">
            <ChevronRight size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  )
}
