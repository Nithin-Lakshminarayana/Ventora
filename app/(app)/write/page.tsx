'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EmergencyModal from '@/components/ui/EmergencyModal'

const PROMPTS = [
  "What's weighing on you most right now?",
  'Describe this moment in three words.',
  'What do you wish someone would say to you?',
  'What small thing made you smile today?',
  'What are you learning about yourself?',
]

const CRISIS_PHRASES = ["don't want to live", "want to die", "end my life", "kill myself", "no reason to live"]

function detectCrisis(text: string) {
  const lower = text.toLowerCase()
  return CRISIS_PHRASES.some((p) => lower.includes(p))
}

export default function WritePage() {
  const [text, setText] = useState('')
  const [shared, setShared] = useState(false)
  const [showEmergency, setShowEmergency] = useState(false)
  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)])

  const handleShare = () => {
    if (!text.trim()) return
    if (detectCrisis(text)) { setShowEmergency(true); return }
    setShared(true)
    setTimeout(() => { setShared(false); setText('') }, 2000)
  }

  return (
    <div className="flex flex-col px-4 sm:px-8 pt-5 pb-2 max-w-3xl mx-auto" style={{ height: 'calc(100dvh - 6rem)' }}>
      {/* Header */}
      <motion.div className="mb-4 flex-shrink-0" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl text-white font-light">Share Anonymously</h1>
        <p className="text-ventora-muted text-sm font-light mt-0.5">Your words, your truth. No names. No judgment.</p>
      </motion.div>

      {/* Prompt */}
      <motion.div className="glass rounded-3xl px-5 py-3 mb-4 flex items-center gap-3 flex-shrink-0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <span className="text-lg">💭</span>
        <p className="text-ventora-muted text-sm font-light italic">{prompt}</p>
      </motion.div>

      {/* Writing area — flex-1 so it fills remaining space */}
      <motion.div className="glass rounded-4xl p-5 flex flex-col flex-1 min-h-0"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start anywhere..."
          className="flex-1 w-full text-base text-white/80 bg-transparent placeholder:text-ventora-muted/25 resize-none outline-none"
          maxLength={1000}
          style={{ lineHeight: '2', fontFamily: '"Playfair Display", Georgia, serif', fontStyle: text ? 'italic' : 'normal' }}
        />
        <div className="flex items-center justify-between pt-4 border-t border-white/5 flex-shrink-0">
          <span className="text-ventora-muted/30 text-xs">{text.length}/1000</span>
          <div className="flex gap-3 items-center">
            <AnimatePresence>
              {shared && (
                <motion.span className="text-ventora-success text-xs font-light"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  🌿 Out there, gently.
                </motion.span>
              )}
            </AnimatePresence>
            <button onClick={() => setText('')} className="text-ventora-muted/40 text-xs hover:text-ventora-muted/70 transition-colors">clear</button>
            <motion.button onClick={handleShare} disabled={!text.trim()}
              className="px-6 py-2 rounded-2xl text-sm font-light text-white disabled:opacity-30"
              style={{ background: 'rgba(139,92,246,0.3)', border: '1px solid rgba(139,92,246,0.3)' }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Share Anonymously
            </motion.button>
          </div>
        </div>
      </motion.div>

      <p className="text-ventora-muted/25 text-xs text-center mt-3 flex-shrink-0">Anonymous · No profile · No tracking</p>

      <EmergencyModal open={showEmergency} onClose={() => setShowEmergency(false)} />
    </div>
  )
}
