'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CloudRain, Briefcase, Heart, Home, Brain, Sprout, Trophy, MessageCircle, BookOpen, Moon, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { R } from '@/lib/routes'

const SPACES: { Icon: LucideIcon; label: string; slug: string; color: string; border: string; glow: string; iconColor: string }[] = [
  { Icon: CloudRain,      label: 'Loneliness',         slug: 'loneliness',          color: 'rgba(125,211,252,0.12)', border: 'rgba(125,211,252,0.25)', glow: '#7DD3FC', iconColor: '#7DD3FC' },
  { Icon: Briefcase,      label: 'Work Stress',         slug: 'work-stress',         color: 'rgba(251,191,36,0.10)',  border: 'rgba(251,191,36,0.25)',  glow: '#FBB324', iconColor: '#FBB324' },
  { Icon: Heart,          label: 'Relationships',       slug: 'relationships',       color: 'rgba(251,113,133,0.12)', border: 'rgba(251,113,133,0.25)', glow: '#F87171', iconColor: '#F87171' },
  { Icon: Home,           label: 'Family',              slug: 'family',              color: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.25)', glow: '#A78BFA', iconColor: '#A78BFA' },
  { Icon: Brain,          label: 'Anxiety',             slug: 'anxiety',             color: 'rgba(139,92,246,0.14)',  border: 'rgba(139,92,246,0.3)',   glow: '#8B5CF6', iconColor: '#8B5CF6' },
  { Icon: Sprout,         label: 'Recovery',            slug: 'recovery',            color: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.25)',  glow: '#4ADE80', iconColor: '#4ADE80' },
  { Icon: Trophy,         label: 'Small Wins',          slug: 'small-wins',          color: 'rgba(250,204,21,0.10)',  border: 'rgba(250,204,21,0.25)',  glow: '#FACC15', iconColor: '#FACC15' },
  { Icon: MessageCircle,  label: 'Overthinking',        slug: 'overthinking',        color: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.25)',  glow: '#60A5FA', iconColor: '#60A5FA' },
  { Icon: BookOpen,       label: 'Students',            slug: 'students',            color: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.25)',  glow: '#34D399', iconColor: '#34D399' },
  { Icon: Moon,           label: 'Late Night Thoughts', slug: 'late-night-thoughts', color: 'rgba(99,102,241,0.14)',  border: 'rgba(99,102,241,0.3)',   glow: '#6366F1', iconColor: '#6366F1' },
]

interface Props {
  space: typeof SPACES[0]
  index: number
}

function SpaceCard({ space, index }: Props) {
  const { Icon } = space
  return (
    <Link href={`${R.healing}/${space.slug}`}>
      <motion.div
        className="flex flex-col items-center justify-center gap-2.5 p-5 rounded-3xl text-center w-full cursor-pointer"
        style={{ background: space.color, border: `1px solid ${space.border}` }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${space.glow}30` }}
        whileTap={{ scale: 0.97 }}
      >
        <Icon size={22} strokeWidth={1.6} style={{ color: space.iconColor }} />
        <span className="text-ventora-muted text-xs font-light leading-tight">{space.label}</span>
      </motion.div>
    </Link>
  )
}

export default function HealingPage() {
  return (
    <div className="flex flex-col px-4 sm:px-8 pt-5 pb-2 max-w-3xl mx-auto" style={{ height: 'calc(100dvh - 6rem)' }}>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl text-white font-light">Healing Spaces</h1>
        <p className="text-ventora-muted text-sm font-light mt-0.5">Find your people. Everyone is anonymous.</p>
      </motion.div>

      {/* Grid — scrollable if needed */}
      <div className="flex-1 overflow-y-auto min-h-0">
      <motion.div
        className="glass rounded-3xl px-5 py-4 mb-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Leaf size={18} strokeWidth={1.6} className="text-ventora-success flex-shrink-0" />
        <p className="text-ventora-muted text-sm font-light leading-relaxed">
          Safe spaces to share, listen, and feel less alone in what you're carrying.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {SPACES.map((space, i) => (
          <SpaceCard key={space.label} space={space} index={i} />
        ))}
      </div>

      </div>
    </div>
  )
}
