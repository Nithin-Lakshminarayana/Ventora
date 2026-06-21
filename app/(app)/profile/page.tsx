'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PenLine, Heart, Sprout, TreePine, Mail, ChevronRight, User, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { R } from '@/lib/routes'

const STATS: { Icon: LucideIcon; iconColor: string; label: string; value: number }[] = [
  { Icon: PenLine, iconColor: '#A78BFA', label: 'Letters Written',   value: 84  },
  { Icon: Heart,   iconColor: '#F87171', label: 'People Comforted', value: 61  },
  { Icon: Sprout,  iconColor: '#4ADE80', label: 'Healing Days',      value: 128 },
  { Icon: TreePine,iconColor: '#34D399', label: 'Forest Trees',      value: 84  },
]

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<{ email: string; username: string } | null>(null)

  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem('ventora_user')
      if (raw) setUser(JSON.parse(raw))
    } catch {}
  }, [])

  return (
    <div className="flex flex-col px-4 sm:px-8 pt-5 pb-5 max-w-3xl mx-auto gap-3" style={{ height: 'calc(100dvh - 6rem)' }}>
      {/* Header */}
      <motion.div className="text-center flex-shrink-0" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <motion.div
          className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.4), rgba(99,60,220,0.2))',
            border: '1px solid rgba(139,92,246,0.25)',
          }}
          animate={{ boxShadow: ['0 0 20px rgba(139,92,246,0.1)', '0 0 35px rgba(139,92,246,0.25)', '0 0 20px rgba(139,92,246,0.1)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <User size={22} strokeWidth={1.4} style={{ color: 'rgba(167,139,250,0.8)' }} />
        </motion.div>
        <h2 className="text-white text-base font-light mb-0.5">
          {mounted && user ? user.username : 'ventora soul'}
        </h2>
        <p className="text-ventora-muted/50 text-xs font-light">
          {mounted && user ? user.email : '—'}
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-4 gap-2 flex-shrink-0"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {STATS.map(({ Icon, iconColor, label, value }, i) => (
          <motion.div
            key={label}
            className="glass rounded-2xl p-3 text-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
          >
            <Icon size={16} strokeWidth={1.6} className="mx-auto mb-1.5" style={{ color: iconColor }} />
            <p className="text-white text-lg font-light mb-0.5">{mounted ? value : '-'}</p>
            <p className="text-ventora-muted/50 text-[10px] font-light leading-tight">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Latest */}
      <motion.div
        className="glass rounded-3xl p-4 flex-1 min-h-0 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-ventora-muted/50 text-xs tracking-widest uppercase mb-3 flex-shrink-0">Latest</p>
        <div className="space-y-3 flex-1 min-h-0">
          {[
            'Someone wanted you to know — "You helped me today."',
            'Your words in Loneliness reached 3 souls.',
          ].map((msg, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-white/4 last:border-0">
              <Leaf size={13} strokeWidth={1.6} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(139,92,246,0.6)' }} />
              <p className="text-ventora-muted text-sm font-light leading-relaxed">{msg}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Links */}
      <motion.div
        className="flex flex-col gap-2 flex-shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[
          { href: R.letters, Icon: Mail,     label: 'My Letters'      },
          { href: R.journey, Icon: TreePine, label: 'My Journey'      },
          { href: R.healing, Icon: Leaf,     label: 'Healing Spaces'  },
        ].map(({ href, Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 glass rounded-2xl px-4 py-3 hover:border-ventora-primary/20 transition-colors"
          >
            <Icon size={15} strokeWidth={1.6} style={{ color: 'rgba(148,163,184,0.6)' }} />
            <span className="text-ventora-muted text-sm font-light">{label}</span>
            <ChevronRight size={13} strokeWidth={1.5} className="ml-auto" style={{ color: 'rgba(148,163,184,0.3)' }} />
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
