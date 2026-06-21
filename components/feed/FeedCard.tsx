'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Leaf, Sun, HandHeart } from 'lucide-react'

const REACTION_META = [
  { icon: Heart,     label: 'I hear you'       },
  { icon: Users,     label: 'Sending strength' },
  { icon: Leaf,      label: "You're not alone" },
  { icon: Sun,       label: "There's light"    },
  { icon: HandHeart, label: 'With you'         },
]

interface Reaction {
  icon: string
  label: string
  count: number
  reacted: boolean
}

interface Post {
  id: number
  text: string
  reactions: Reaction[]
}

interface Props {
  post: Post
  delay?: number
}

export default function FeedCard({ post, delay = 0 }: Props) {
  const [reactions, setReactions] = useState(post.reactions)

  const react = (label: string) => {
    setReactions((prev) =>
      prev.map((r) =>
        r.label === label
          ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted }
          : r
      )
    )
  }

  return (
    <motion.article
      className="relative rounded-3xl overflow-hidden mb-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: 'linear-gradient(135deg, rgba(39,52,73,0.72) 0%, rgba(20,30,48,0.82) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Top highlight */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
      />

      <div className="px-5 pt-5 pb-4">
        {/* Byline */}
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.4), rgba(99,60,220,0.15))',
              border: '1px solid rgba(139,92,246,0.25)',
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(139,92,246,0.8)' }} />
          </div>
          <span className="text-ventora-muted/40 text-[11px] font-light tracking-widest uppercase">Someone shared</span>
        </div>

        {/* Post text */}
        <p
          className="text-white/80 text-[15px] font-light leading-[1.8] mb-5"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}
        >
          &ldquo;{post.text}&rdquo;
        </p>

        {/* Divider */}
        <div
          className="h-px w-full mb-4"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.18), transparent)' }}
        />

        {/* Reactions */}
        <div className="flex flex-wrap gap-1.5">
          {REACTION_META.map(({ icon: Icon, label }, idx) => {
            const r = reactions[idx]
            return (
              <motion.button
                key={label}
                onClick={() => react(label)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-light transition-all cursor-pointer"
                style={{
                  background: r?.reacted ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${r?.reacted ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  color: r?.reacted ? 'rgba(167,139,250,1)' : 'rgba(148,163,184,0.45)',
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.88 }}
                title={label}
              >
                <Icon size={11} strokeWidth={r?.reacted ? 2.5 : 1.5} />
                {r?.count > 0 && <span>{r.count}</span>}
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.article>
  )
}
