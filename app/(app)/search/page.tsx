'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Frown, AlertCircle, Sunrise, HeartCrack, Smile, Sparkles, Compass, Moon, Flame, Leaf, HelpCircle, Zap, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const EMOTIONS: { Icon: LucideIcon; iconColor: string; label: string; color: string; border: string }[] = [
  { Icon: Frown,       iconColor: '#7DD3FC', label: 'Lonely',   color: 'rgba(125,211,252,0.12)', border: 'rgba(125,211,252,0.25)' },
  { Icon: AlertCircle, iconColor: '#A78BFA', label: 'Scared',   color: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.25)' },
  { Icon: Sunrise,     iconColor: '#FBB324', label: 'Hopeful',  color: 'rgba(251,191,36,0.10)',  border: 'rgba(251,191,36,0.25)'  },
  { Icon: HeartCrack,  iconColor: '#F87171', label: 'Broken',   color: 'rgba(251,113,133,0.12)', border: 'rgba(251,113,133,0.25)' },
  { Icon: Smile,       iconColor: '#4ADE80', label: 'Happy',    color: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.25)'  },
  { Icon: Sparkles,    iconColor: '#FACC15', label: 'Excited',  color: 'rgba(250,204,21,0.10)',  border: 'rgba(250,204,21,0.25)'  },
  { Icon: Compass,     iconColor: '#60A5FA', label: 'Lost',     color: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.25)'  },
  { Icon: Moon,        iconColor: '#818CF8', label: 'Tired',    color: 'rgba(99,102,241,0.14)',  border: 'rgba(99,102,241,0.3)'   },
  { Icon: Flame,       iconColor: '#EF4444', label: 'Angry',    color: 'rgba(239,68,68,0.10)',   border: 'rgba(239,68,68,0.25)'   },
  { Icon: Leaf,        iconColor: '#34D399', label: 'Peaceful', color: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.25)'  },
  { Icon: HelpCircle,  iconColor: '#8B5CF6', label: 'Confused', color: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.3)'   },
  { Icon: Zap,         iconColor: '#22C55E', label: 'Strong',   color: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.25)'   },
]

const RELATED_POSTS: Record<string, string[]> = {
  Lonely:   ['I miss feeling known by someone.', 'Surrounded by people, still invisible.', 'The silence between us got too loud.'],
  Scared:   ['I don\'t know what comes next and that terrifies me.', 'Fear has been living rent-free in my chest.'],
  Hopeful:  ['Something small happened today that made me believe again.', 'Maybe it\'s not over.'],
  Broken:   ['Some days I just collect the pieces and carry them.', 'I broke but I didn\'t disappear.'],
  Happy:    ['I laughed today. Genuinely.', 'Something small made today worth it.'],
  Tired:    ['My body is tired. My soul is more tired.', 'Rest without guilt. You\'ve earned it.'],
  Lost:     ['I keep looking for the version of me that had direction.', 'It\'s okay to not know the way.'],
  Peaceful: ['For one moment everything was quiet inside.', 'Peace found me in the smallest thing.'],
}

export default function SearchPage() {
  const [selected, setSelected] = useState<string | null>(null)

  const posts = selected ? (RELATED_POSTS[selected] ?? ['This space holds stories for this feeling. Be the first.']) : []

  return (
    <div className="flex flex-col px-4 sm:px-8 pt-5 pb-2 max-w-3xl mx-auto" style={{ height: 'calc(100dvh - 6rem)' }}>
      <motion.div className="mb-4 flex-shrink-0" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl text-white font-light">Explore Feelings</h1>
        <p className="text-ventora-muted text-sm font-light mt-0.5">Search by emotion, not by name.</p>
      </motion.div>

      {/* Emotion grid */}
      <div className="grid grid-cols-3 gap-3 mb-4 flex-shrink-0">
        {EMOTIONS.map(({ Icon, iconColor, label, color, border }, i) => (
          <motion.button
            key={label}
            onClick={() => setSelected(selected === label ? null : label)}
            className="flex flex-col items-center gap-2 py-4 px-2 rounded-3xl text-center cursor-pointer transition-all"
            style={{
              background: selected === label ? color : 'rgba(255,255,255,0.03)',
              border: `1px solid ${selected === label ? border : 'rgba(255,255,255,0.06)'}`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Icon size={20} strokeWidth={1.6} style={{ color: selected === label ? iconColor : 'rgba(148,163,184,0.5)' }} />
            <span className={`text-xs font-light ${selected === label ? 'text-white' : 'text-ventora-muted/60'}`}>
              {label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Related posts — scrollable within its area */}
      <div className="flex-1 overflow-y-auto min-h-0">
      {selected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-ventora-muted/50 text-xs tracking-widest uppercase mb-4 text-center">
            Voices in {selected}
          </p>
          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.div
                key={i}
                className="glass rounded-3xl px-5 py-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full" style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.25)' }} />
                  <span className="text-ventora-muted/40 text-xs font-light">Someone wrote</span>
                </div>
                <p className="text-white/80 text-sm font-light leading-relaxed italic" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  "{post}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {!selected && (
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Search size={32} strokeWidth={1.2} className="mx-auto mb-3" style={{ color: 'rgba(148,163,184,0.25)' }} />
          <p className="text-ventora-muted/40 text-sm font-light">
            Tap a feeling to find voices<br />that understand.
          </p>
        </motion.div>
      )}
      </div>
    </div>
  )
}
