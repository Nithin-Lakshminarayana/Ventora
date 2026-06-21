'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function AICompanion() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [rewritten, setRewritten] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRewrite = () => {
    if (!msg.trim()) return
    setLoading(true)
    // Simulated AI rewriting (frontend-only demo)
    setTimeout(() => {
      const rewrites: Record<string, string> = {}
      const fallback = `I'm holding something heavy right now, and I'm letting myself feel it fully. What I'm experiencing is real, and that's okay.`
      setRewritten(rewrites[msg] ?? fallback)
      setLoading(false)
    }, 1200)
  }

  return (
    <>
      {/* Floating orb */}
      <motion.button
        className="fixed bottom-24 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: 'radial-gradient(circle at 40% 35%, rgba(139,92,246,0.9), rgba(99,60,220,0.7))',
          boxShadow: '0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.15)',
        }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.15)',
            '0 0 30px rgba(139,92,246,0.6), 0 0 80px rgba(139,92,246,0.25)',
            '0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.15)',
          ],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => setOpen(true)}
        aria-label="Open companion"
      >
        <Sparkles size={16} strokeWidth={1.8} style={{ color: 'rgba(255,255,255,0.9)' }} />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setOpen(false); setRewritten(''); setMsg('') }}
            />
            <motion.div
              className="fixed bottom-24 right-4 z-50 w-80 rounded-3xl overflow-hidden shadow-ventora-lg"
              style={{ background: 'rgba(27,21,58,0.97)', border: '1px solid rgba(139,92,246,0.2)' }}
              initial={{ opacity: 0, scale: 0.85, y: 20, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ background: 'rgba(139,92,246,0.3)' }}
                  >
                    ✦
                  </div>
                  <div>
                    <p className="text-white text-sm font-light">Companion</p>
                    <p className="text-ventora-muted text-xs">Need help putting feelings into words?</p>
                  </div>
                </div>

                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Tell me what happened..."
                  className="w-full h-24 text-sm text-ventora-muted/90 placeholder:text-ventora-muted/30 bg-white/5 rounded-2xl p-3 mb-3 resize-none border border-white/5 focus:border-ventora-primary/30 transition-colors"
                  style={{ lineHeight: '1.6' }}
                />

                {rewritten && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 p-3 rounded-2xl"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)' }}
                  >
                    <p className="text-xs text-ventora-muted/60 mb-1 tracking-wide">Gently reframed</p>
                    <p className="text-sm text-white/80 font-light leading-relaxed italic">
                      "{rewritten}"
                    </p>
                  </motion.div>
                )}

                <button
                  onClick={handleRewrite}
                  disabled={loading || !msg.trim()}
                  className="w-full py-2.5 rounded-xl text-sm font-light tracking-wide text-white transition-all disabled:opacity-40"
                  style={{ background: 'rgba(139,92,246,0.4)' }}
                >
                  {loading ? '...' : 'Help me express this'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
