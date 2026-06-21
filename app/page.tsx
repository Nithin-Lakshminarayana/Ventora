'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Leaf, ArrowRight, LogIn } from 'lucide-react'
import { R } from '@/lib/routes'
import CloudLayer from '@/components/landing/CloudLayer'
import FireflyLayer from '@/components/landing/FireflyLayer'

const StarCanvas = dynamic(() => import('@/components/landing/StarCanvas'), { ssr: false })

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-ventora-bg select-none">
      <StarCanvas />
      <CloudLayer />
      <FireflyLayer />

      {/* Ambient glow */}
      <div className="absolute inset-0 aurora-glow pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-ventora-bg/80 to-transparent pointer-events-none" />

      {/* Breathing orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Icon */}
        <motion.div
          className="flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
          style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Leaf size={26} strokeWidth={1.3} style={{ color: '#a78bfa' }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-6xl md:text-7xl font-light tracking-[0.18em] text-white mb-3"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          ventora
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="w-10 h-px mb-5"
          style={{ background: 'rgba(139,92,246,0.45)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        {/* Tagline */}
        <motion.p
          className="text-ventora-muted text-base md:text-lg font-light leading-relaxed mb-10 max-w-xs"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          A place where your thoughts<br />are safe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
        >
          {/* Sign in */}
          <motion.button
            onClick={() => router.push(R.auth)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-ventora-muted/70 text-sm font-light tracking-wide transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
            whileHover={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)' }}
            whileTap={{ scale: 0.97 }}
          >
            <LogIn size={14} strokeWidth={1.6} />
            Sign in
          </motion.button>

          {/* Begin */}
          <motion.button
            onClick={() => router.push(R.auth + '?m=up')}
            className="flex items-center gap-2 px-7 py-2.5 rounded-full text-white/85 text-sm font-light tracking-wide transition-all"
            style={{
              background: 'rgba(139,92,246,0.22)',
              border: '1px solid rgba(139,92,246,0.38)',
              boxShadow: '0 0 24px rgba(139,92,246,0.15)',
            }}
            whileHover={{ background: 'rgba(139,92,246,0.35)', boxShadow: '0 0 36px rgba(139,92,246,0.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            Begin your journey
            <ArrowRight size={14} strokeWidth={1.8} />
          </motion.button>
        </motion.div>

        {/* Breath text */}
        <motion.p
          className="absolute bottom-8 text-ventora-muted/30 text-xs tracking-[0.25em] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          breathe in · breathe out
        </motion.p>
      </motion.div>
    </div>
  )
}
