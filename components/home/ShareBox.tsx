'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EmergencyModal from '@/components/ui/EmergencyModal'
import { Check } from 'lucide-react'

const CRISIS_PHRASES = [
  "don't want to live",
  "want to die",
  "end my life",
  "kill myself",
  "no reason to live",
  "better off dead",
]

function detectCrisis(text: string): boolean {
  const lower = text.toLowerCase()
  return CRISIS_PHRASES.some((phrase) => lower.includes(phrase))
}

export default function ShareBox() {
  const [text, setText] = useState('')
  const [shared, setShared] = useState(false)
  const [showEmergency, setShowEmergency] = useState(false)

  const handleShare = () => {
    if (!text.trim()) return
    if (detectCrisis(text)) {
      setShowEmergency(true)
      return
    }
    setShared(true)
    setTimeout(() => { setShared(false); setText('') }, 2500)
  }

  return (
    <>
      <div className="glass rounded-4xl p-6 mb-4">
        <p className="text-ventora-muted text-sm font-light tracking-wide mb-4 text-center">
          What's on your mind?
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="You don't have to hold this alone..."
          className="w-full h-28 text-sm text-white/80 bg-white/4 rounded-2xl p-4 border border-white/5 focus:border-ventora-primary/25 transition-colors placeholder:text-ventora-muted/30"
          maxLength={500}
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-ventora-muted/30 text-xs">{text.length}/500</span>
          <motion.button
            onClick={handleShare}
            disabled={!text.trim()}
            className="px-6 py-2.5 rounded-2xl text-sm font-light tracking-wide disabled:opacity-30 transition-all cursor-pointer"
            style={{ background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.3)' }}
            whileHover={{ scale: 1.03, background: 'rgba(139,92,246,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            Share Anonymously
          </motion.button>
        </div>

        <AnimatePresence>
          {shared && (
            <motion.div
              className="mt-3 text-center text-ventora-success text-sm font-light flex items-center justify-center gap-1.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Check size={13} strokeWidth={2.5} /> Your words are safely out there.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <EmergencyModal open={showEmergency} onClose={() => setShowEmergency(false)} />
    </>
  )
}
