'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Frown, Annoyed, Meh, Smile, Laugh, Sprout, TreePine, Wind } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import MoodTree from '@/components/journey/MoodTree'
import DailyCalm from '@/components/journey/DailyCalm'

type MoodLevel = 0 | 1 | 2 | 3 | 4

const MOOD_OPTIONS: { level: MoodLevel; Icon: LucideIcon; iconColor: string; label: string }[] = [
  { level: 0, Icon: Frown,  iconColor: '#F87171', label: 'Very heavy' },
  { level: 1, Icon: Annoyed, iconColor: '#7DD3FC', label: 'Difficult'  },
  { level: 2, Icon: Meh,     iconColor: '#94A3B8', label: 'Okay'       },
  { level: 3, Icon: Smile,  iconColor: '#4ADE80', label: 'Good'       },
  { level: 4, Icon: Laugh,  iconColor: '#FACC15', label: 'Peaceful'   },
]

interface WeekEntry { week: number; avg: MoodLevel }

function clampLevel(n: number): MoodLevel {
  return Math.max(0, Math.min(4, Math.round(n))) as MoodLevel
}

export default function JourneyPage() {
  const [weeks, setWeeks] = useState<WeekEntry[]>([
    { week: 1, avg: 1 },
    { week: 2, avg: 2 },
    { week: 3, avg: 3 },
    { week: 4, avg: 3 },
  ])
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ventora-weeks')
      if (stored) setWeeks(JSON.parse(stored))
    } catch {}
  }, [])

  const logMood = (level: MoodLevel) => {
    const updated = [...weeks]
    const last = updated[updated.length - 1]
    updated[updated.length - 1] = { ...last, avg: clampLevel((last.avg + level) / 2) }
    setWeeks(updated)
    localStorage.setItem('ventora-weeks', JSON.stringify(updated))
    setLogged(true)
  }

  const overallAvg = clampLevel(weeks.reduce((sum, w) => sum + w.avg, 0) / weeks.length)

  return (
    <div className="flex flex-col px-4 sm:px-8 pt-5 pb-5 max-w-3xl mx-auto gap-4" style={{ height: 'calc(100dvh - 6rem)' }}>

      {/* Header */}
      <motion.div className="flex-shrink-0" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl text-white font-light">Journey</h1>
        <p className="text-ventora-muted text-sm font-light mt-0.5">Your healing story, growing slowly.</p>
      </motion.div>

      {/* How are you today? */}
      <motion.div
        className="glass rounded-4xl px-5 py-4 flex-shrink-0"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        <p className="text-ventora-muted/50 text-[10px] tracking-widest uppercase mb-3 text-center">How are you today?</p>
        <AnimatePresence mode="wait">
          {!logged ? (
            <motion.div key="picker" exit={{ opacity: 0 }} className="flex justify-around">
              {MOOD_OPTIONS.map(({ level, Icon, iconColor, label }) => (
                <motion.button key={level} onClick={() => logMood(level)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} title={label}
                >
                  <Icon size={22} strokeWidth={1.6} style={{ color: iconColor }} />
                  <span className="text-ventora-muted/40 text-[10px]">{label}</span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 py-1"
            >
              <Sprout size={18} strokeWidth={1.5} style={{ color: '#4ADE80' }} />
              <p className="text-ventora-muted text-sm font-light">Logged. Your forest grows.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Your Journey stats */}
      <motion.div
        className="glass rounded-4xl px-5 py-4 flex-shrink-0"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      >
        <p className="text-ventora-muted/50 text-[10px] tracking-widest uppercase mb-3 text-center">Your Journey</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Healing Days', value: '128',                  Icon: Sprout,   iconColor: '#4ADE80' },
            { label: 'Forest Trees', value: `${weeks.length * 21}`, Icon: TreePine, iconColor: '#22C55E' },
            { label: 'Calm Moments', value: '84',                   Icon: Wind,     iconColor: '#7DD3FC' },
          ].map(({ label, value, Icon, iconColor }) => (
            <div key={label} className="rounded-2xl py-3 px-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <Icon size={20} strokeWidth={1.4} className="mx-auto mb-1" style={{ color: iconColor }} />
              <p className="text-white font-light text-lg">{value}</p>
              <p className="text-ventora-muted/50 text-xs font-light mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Your Forest + Daily Calm side by side */}
      <motion.div
        className="flex-1 min-h-0 flex gap-4"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      >
        <MoodTree weekAvg={overallAvg} weeks={weeks} className="flex-1 h-full" />
        <DailyCalm className="flex-1 h-full" />
      </motion.div>

    </div>
  )
}
