'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, ArrowRight, Smile, CloudRain, Waves, LogOut } from 'lucide-react'
import { R } from '@/lib/routes'

function getGreeting(): string {
  const h = new Date().getHours()
  if (h >= 5  && h < 12) return 'Good Morning'
  if (h >= 12 && h < 17) return 'Good Afternoon'
  if (h >= 17 && h < 21) return 'Good Evening'
  return 'Good Night'
}

const PREVIEW_THOUGHTS = [
  'I miss talking to my dad. Some days the silence is the loudest thing in the room.',
  'I finally said no to something that was draining me. It felt terrifying. It also felt like breathing again.',
  'Some nights I talk to the moon. She never judges.',
  "I started therapy. It's the bravest thing I've done in years.",
  "I cried in the shower so no one could hear. But you hear me now, and that's enough.",
  "I feel like everyone is moving ahead except me. Like I'm standing in a river watching everyone else swim past.",
]

const FLOAT = [
  { y: -8, rot: -0.8, dur: 5.0 },
  { y: -10, rot: 1.0, dur: 4.5 },
  { y: -7,  rot: -1.2, dur: 5.5 },
  { y: -9,  rot: 0.9, dur: 4.8 },
  { y: -8,  rot: -0.7, dur: 5.2 },
  { y: -11, rot: 1.1, dur: 4.6 },
]

const MOODS = [
  { label: 'Fine',         value: 'fine',         color: 'rgba(74,222,128,',  Icon: Smile,     ringDelay: 0   },
  { label: 'Difficult',    value: 'difficult',    color: 'rgba(125,211,252,', Icon: CloudRain, ringDelay: 0.8 },
  { label: 'Overwhelming', value: 'overwhelming', color: 'rgba(167,139,250,', Icon: Waves,     ringDelay: 1.6 },
]

export default function HomePage() {
  const [mood, setMood] = useState<string | null>(null)
  const [streamIdx, setStreamIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('ventora_user')
    router.push('/')
  }

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setStreamIdx((i) => (i + 1) % PREVIEW_THOUGHTS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [streamIdx])

  const float = FLOAT[streamIdx % FLOAT.length]

  return (
    <div className="flex flex-col px-4 sm:px-8 pt-5 pb-5 max-w-3xl mx-auto gap-4" style={{ height: 'calc(100dvh - 6rem)' }}>

      {/* Header */}
      <motion.div
        className="flex items-center justify-between flex-shrink-0"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-2xl text-white font-light">{getGreeting()}</h1>
          <p className="text-ventora-muted text-sm font-light mt-0.5">How are you feeling right now?</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="glass w-10 h-10 rounded-full flex items-center justify-center hover:border-ventora-primary/30 transition-colors"
          >
            <User size={16} strokeWidth={1.6} style={{ color: 'rgba(167,139,250,0.7)' }} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <motion.div
                  className="absolute right-0 top-11 z-20 flex flex-col overflow-hidden rounded-xl"
                  style={{ background: 'rgba(12,15,30,0.92)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', minWidth: '120px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
                  initial={{ opacity: 0, scale: 0.88, y: -4, transformOrigin: 'top right' }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Link
                    href={R.profile}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 text-ventora-muted/80 text-xs font-light hover:bg-white/5 transition-colors"
                  >
                    <User size={12} strokeWidth={1.6} />
                    Profile
                  </Link>
                  <div className="h-px mx-2.5" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-light hover:bg-white/5 transition-colors text-left w-full"
                    style={{ color: 'rgba(248,113,133,0.65)' }}
                  >
                    <LogOut size={12} strokeWidth={1.6} />
                    Log out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Stream preview */}
      <motion.div
        className="flex-1 min-h-0 rounded-4xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          background: 'linear-gradient(135deg, rgba(39,52,73,0.6) 0%, rgba(20,30,48,0.75) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
          <div>
            <p className="text-white/80 text-sm font-light tracking-wide">The Stream</p>
            <p className="text-ventora-muted/45 text-xs font-light mt-0.5">What others are sharing</p>
          </div>
          <Link href={R.feed} className="flex items-center gap-1 text-ventora-primary/70 text-xs font-light hover:text-ventora-primary transition-colors">
            See all <ArrowRight size={11} strokeWidth={1.8} />
          </Link>
        </div>

        <div className="h-px mx-5 flex-shrink-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)' }} />

        <div className="flex-1 flex flex-col justify-center px-5 py-4 overflow-hidden min-h-0">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={streamIdx}
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d * 48, opacity: 0, filter: 'blur(5px)' }),
                center: { x: 0, opacity: 1, filter: 'blur(0px)' },
                exit:  (d: number) => ({ x: d * -48, opacity: 0, filter: 'blur(5px)' }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
            >
              <motion.div
                animate={{ y: [0, float.y, 0], rotate: [0, float.rot, 0] }}
                transition={{ duration: float.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.35), rgba(99,60,220,0.12))', border: '1px solid rgba(139,92,246,0.2)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(139,92,246,0.7)' }} />
                  </div>
                  <span className="text-ventora-muted/60 text-[11px] font-light tracking-widest uppercase">Someone shared</span>
                </div>
                <p className="text-white/95 text-base font-normal leading-relaxed"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  &ldquo;{PREVIEW_THOUGHTS[streamIdx]}&rdquo;
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Today feels — MCQ */}
      <motion.div
        className="flex-1 min-h-0 glass rounded-4xl flex flex-col px-5 pt-5 pb-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <AnimatePresence mode="wait">
          {!mood ? (
            <motion.div key="picker" exit={{ opacity: 0, scale: 0.96 }} className="flex flex-col flex-1 min-h-0 items-center justify-center gap-6">
              {/* Label */}
              <div className="text-center">
                <p className="text-ventora-muted/30 text-[10px] tracking-[0.3em] uppercase mb-1">emotional resonance</p>
                <h2 className="text-white/75 text-2xl font-light">Today feels</h2>
              </div>

              {/* Thin divider */}
              <div className="w-20 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)' }} />

              {/* Orbs */}
              <div className="flex gap-10 justify-center">
                {MOODS.map(({ label, value, color, Icon, ringDelay }) => (
                  <motion.button
                    key={value}
                    onClick={() => setMood(value)}
                    className="flex flex-col items-center gap-3"
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Orb + rings */}
                    <div className="relative flex items-center justify-center w-16 h-16">
                      {/* Outer pulse ring */}
                      <motion.div
                        className="absolute w-16 h-16 rounded-full"
                        style={{ border: `1px solid ${color}0.4)` }}
                        animate={{ scale: [1, 2.2], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: ringDelay }}
                      />
                      {/* Inner pulse ring */}
                      <motion.div
                        className="absolute w-16 h-16 rounded-full"
                        style={{ border: `1px solid ${color}0.25)` }}
                        animate={{ scale: [1, 1.6], opacity: [0, 0.4, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: ringDelay + 0.5 }}
                      />
                      {/* Glow layer — animates opacity only (GPU-safe) */}
                      <motion.div
                        className="absolute w-16 h-16 rounded-full"
                        style={{ background: `${color}0.18)`, filter: 'blur(10px)' }}
                        animate={{ opacity: [0.4, 0.9, 0.4] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: ringDelay }}
                      />
                      {/* Orb core */}
                      <motion.div
                        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle at 38% 32%, ${color}0.3), ${color}0.06))`,
                          border: `1px solid ${color}0.3)`,
                          boxShadow: `0 0 18px ${color}0.1)`,
                        }}
                        whileHover={{ scale: 1.08 }}
                      >
                        <Icon size={22} strokeWidth={1.4} style={{ color: `${color}0.9)` }} />
                      </motion.div>
                    </div>
                    <span className="text-ventora-muted/55 text-[11px] font-light tracking-wide">{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="response" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-3"
            >
              <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }} />
              <p className="text-white/80 text-base font-light leading-relaxed px-4">
                {mood === 'fine' && "You're allowed to be okay."}
                {mood === 'difficult' && "Difficult days are still days you're moving through."}
                {mood === 'overwhelming' && "You don't have to carry this alone."}
              </p>
              <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }} />
              <button onClick={() => setMood(null)} className="text-ventora-muted/25 text-[11px] hover:text-ventora-muted/55 mt-2 tracking-widest uppercase">
                reset
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  )
}
