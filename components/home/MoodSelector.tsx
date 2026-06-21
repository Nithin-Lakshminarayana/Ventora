'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smile, Meh, Frown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const MOODS: { Icon: LucideIcon; iconColor: string; label: string; value: string; color: string; border: string }[] = [
  { Icon: Smile, iconColor: '#4ADE80', label: 'Fine',         value: 'fine',         color: 'rgba(74,222,128,0.15)',  border: 'rgba(74,222,128,0.3)'  },
  { Icon: Meh,   iconColor: '#7DD3FC', label: 'Difficult',    value: 'difficult',    color: 'rgba(125,211,252,0.12)', border: 'rgba(125,211,252,0.3)' },
  { Icon: Frown, iconColor: '#A78BFA', label: 'Overwhelming', value: 'overwhelming', color: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.3)'  },
]

interface Props {
  onSelect: (mood: string) => void
}

export default function MoodSelector({ onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const choose = (value: string) => {
    setSelected(value)
    onSelect(value)
  }

  return (
    <div className="glass rounded-4xl p-6 mb-4">
      <p className="text-ventora-muted text-sm font-light tracking-wide mb-5 text-center">
        How heavy does today feel?
      </p>
      <div className="flex flex-col gap-3">
        {MOODS.map((m, i) => (
          <motion.button
            key={m.value}
            onClick={() => choose(m.value)}
            className="flex items-center gap-4 px-5 py-3.5 rounded-2xl text-left transition-all duration-300 cursor-pointer"
            style={{
              background: selected === m.value ? m.color : 'rgba(255,255,255,0.03)',
              border: `1px solid ${selected === m.value ? m.border : 'rgba(255,255,255,0.06)'}`,
            }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <m.Icon
              size={22}
              strokeWidth={selected === m.value ? 2.2 : 1.6}
              style={{ color: selected === m.value ? m.iconColor : 'rgba(148,163,184,0.5)' }}
            />
            <span className={`text-sm font-light ${selected === m.value ? 'text-white' : 'text-ventora-muted'}`}>
              {m.label}
            </span>
            {selected === m.value && (
              <motion.div
                layoutId="mood-check"
                className="ml-auto w-2 h-2 rounded-full"
                style={{ background: m.border }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
