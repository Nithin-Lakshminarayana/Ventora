'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Phone, MessageSquare } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

export default function EmergencyModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(12px)' }}
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-sm rounded-4xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(39,52,73,0.98) 100%)',
              border: '1px solid rgba(139,92,246,0.2)',
            }}
            initial={{ y: 60, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 60, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          >
            {/* Top glow */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #8B5CF6, #7DD3FC)' }} />

            <div className="p-8 text-center">
              <motion.div
                className="mb-5 flex justify-center"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Leaf size={40} strokeWidth={1.3} style={{ color: '#4ADE80' }} />
              </motion.div>

              <h2 className="text-white text-xl font-light leading-relaxed mb-3">
                I'm really glad you shared this.
              </h2>
              <p className="text-ventora-muted text-base font-light leading-relaxed mb-6">
                You're not alone.<br />Stay here for a minute.
              </p>

              <div className="glass rounded-3xl p-5 mb-6 text-left">
                <p className="text-ventora-muted/80 text-sm font-light leading-relaxed mb-3">
                  Talking to someone trained to help can make a real difference.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={15} strokeWidth={1.8} style={{ color: '#7DD3FC' }} />
                    <div>
                      <p className="text-white/80 font-light">988 Suicide & Crisis Lifeline</p>
                      <p className="text-ventora-muted/60 text-xs">Call or text 988 (US)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MessageSquare size={15} strokeWidth={1.8} style={{ color: '#7DD3FC' }} />
                    <div>
                      <p className="text-white/80 font-light">Crisis Text Line</p>
                      <p className="text-ventora-muted/60 text-xs">Text HOME to 741741 (US)</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl text-ventora-primary/80 text-sm font-light tracking-wide border border-ventora-primary/20 hover:border-ventora-primary/40 transition-colors"
              >
                I'll stay for a moment
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
