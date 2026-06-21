'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MessageCircle, X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { CloudRain, Briefcase, Heart, Home, Brain, Sprout, Trophy, MessageCircle as MCIcon, BookOpen, Moon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import FeedCard from '@/components/feed/FeedCard'
import EmergencyModal from '@/components/ui/EmergencyModal'

const SPACE_META: Record<string, { label: string; Icon: LucideIcon; iconColor: string; accent: string; seeds: string[] }> = {
  'loneliness': {
    label: 'Loneliness', Icon: CloudRain, iconColor: '#7DD3FC', accent: 'rgba(125,211,252,',
    seeds: [
      'I eat lunch alone every day. I smile like it doesn\'t bother me. It does.',
      'I have hundreds of followers and no one to call when I\'m falling apart.',
      'Sometimes I send a message and delete it before anyone can read it. The loneliness is in the unsent ones.',
    ],
  },
  'work-stress': {
    label: 'Work Stress', Icon: Briefcase, iconColor: '#FBB324', accent: 'rgba(251,191,36,',
    seeds: [
      'I said "I\'m fine" in three meetings today. I am not fine.',
      'My manager asked if I was okay. I said yes. I cried in the bathroom five minutes later.',
      'I keep waking up at 3am going over things I said at work. It never stops.',
    ],
  },
  'relationships': {
    label: 'Relationships', Icon: Heart, iconColor: '#F87171', accent: 'rgba(251,113,133,',
    seeds: [
      'I love them. I just don\'t know if they love who I really am.',
      'We don\'t fight anymore. I don\'t know if that\'s peace or the end.',
      'I keep replaying the last argument. Wondering which words I can never take back.',
    ],
  },
  'family': {
    label: 'Family', Icon: Home, iconColor: '#A78BFA', accent: 'rgba(167,139,250,',
    seeds: [
      'My home was never a safe place. I\'m still learning what safe feels like.',
      'I love my family. I also need distance from them to survive. Both are true.',
      'I wish I could explain to them what they did. But I don\'t think they\'d understand.',
    ],
  },
  'anxiety': {
    label: 'Anxiety', Icon: Brain, iconColor: '#8B5CF6', accent: 'rgba(139,92,246,',
    seeds: [
      'My brain won\'t stop. Even when nothing is wrong, it finds something to worry about.',
      'I cancelled plans I actually wanted to go to. Anxiety won again.',
      'The anticipation is always worse than the thing itself. I know this. It doesn\'t help.',
    ],
  },
  'recovery': {
    label: 'Recovery', Icon: Sprout, iconColor: '#4ADE80', accent: 'rgba(74,222,128,',
    seeds: [
      'Three months clean. Some days feel like the first day. I keep going anyway.',
      'Recovery isn\'t a straight line. I had to learn that the hard way.',
      'I\'m not who I was. I\'m not yet who I\'m becoming. I\'m learning to live in between.',
    ],
  },
  'small-wins': {
    label: 'Small Wins', Icon: Trophy, iconColor: '#FACC15', accent: 'rgba(250,204,21,',
    seeds: [
      'I got out of bed before noon today. That was everything.',
      'I replied to that message I\'d been avoiding for two weeks. It felt huge.',
      'Made food for myself instead of just not eating. Counting it as a victory.',
    ],
  },
  'overthinking': {
    label: 'Overthinking', Icon: MCIcon, iconColor: '#60A5FA', accent: 'rgba(96,165,250,',
    seeds: [
      'I have a whole argument in my head with someone who has no idea I\'m upset.',
      'I said one thing wrong three years ago and I still hear it at 2am.',
      'By the time I\'ve thought through everything, the moment has passed.',
    ],
  },
  'students': {
    label: 'Students', Icon: BookOpen, iconColor: '#34D399', accent: 'rgba(52,211,153,',
    seeds: [
      'Everyone looks like they have it together. I\'m drowning in things I don\'t understand.',
      'The pressure to have a whole life figured out at 20 is breaking me slowly.',
      'I chose this path for everyone else. Now I don\'t know who I\'m doing it for.',
    ],
  },
  'late-night-thoughts': {
    label: 'Late Night Thoughts', Icon: Moon, iconColor: '#6366F1', accent: 'rgba(99,102,241,',
    seeds: [
      'It\'s 2am and I\'m fine during the day. Nights are when everything comes back.',
      'The quiet is too loud. My thoughts are too loud. I can\'t find the middle.',
      'I wish I could sleep without dreaming about things I can\'t fix.',
    ],
  },
}

const REACTIONS_SEED = [
  { icon: 'heart',  label: 'I hear you',      count: 0, reacted: false },
  { icon: 'hug',    label: 'Sending strength', count: 0, reacted: false },
  { icon: 'leaf',   label: "You're not alone", count: 0, reacted: false },
  { icon: 'sun',    label: "There's light",    count: 0, reacted: false },
  { icon: 'hands',  label: 'With you',         count: 0, reacted: false },
]

const CARD_FLOAT = [
  { floatY: -8,  dur: 5.0, rot: -0.8 },
  { floatY: -10, dur: 4.5, rot: 1.0  },
  { floatY: -7,  dur: 5.5, rot: -1.2 },
]

const CRISIS_PHRASES = ["don't want to live", "want to die", "end my life", "kill myself"]
function detectCrisis(text: string) {
  return CRISIS_PHRASES.some((p) => text.toLowerCase().includes(p))
}

let nextId = 100

export default function SpacePage() {
  const params = useParams()
  const router = useRouter()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const meta = SPACE_META[slug]

  const [posts, setPosts] = useState(() =>
    (meta?.seeds ?? []).map((text, i) => ({
      id: i + 1,
      text,
      reactions: REACTIONS_SEED.map((r) => ({ ...r })),
    }))
  )
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [compose, setCompose] = useState('')
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [showEmergency, setShowEmergency] = useState(false)
  const [sent, setSent] = useState(false)
  const [posted, setPosted] = useState(false)

  const go = (d: 1 | -1) => {
    setDir(d)
    setShowReply(false)
    setReplyText('')
    setIndex((i) => (i + d + posts.length) % posts.length)
  }

  // Auto-advance every 5 seconds, reset on any navigation
  useEffect(() => {
    const timer = setInterval(() => {
      setDir(1)
      setShowReply(false)
      setIndex((i) => (i + 1 + posts.length) % posts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [index, posts.length])

  const handlePost = () => {
    if (!compose.trim()) return
    if (detectCrisis(compose)) { setShowEmergency(true); return }
    setPosts((prev) => [
      { id: nextId++, text: compose.trim(), reactions: REACTIONS_SEED.map((r) => ({ ...r })) },
      ...prev,
    ])
    setIndex(0)
    setCompose('')
    setPosted(true)
    setTimeout(() => setPosted(false), 2000)
  }

  const sendReply = () => {
    if (!replyText.trim()) return
    if (detectCrisis(replyText)) { setShowEmergency(true); return }
    setSent(true)
    setTimeout(() => { setSent(false); setShowReply(false); setReplyText('') }, 1800)
  }

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-haven-muted">Space not found.</p>
      </div>
    )
  }

  const { label, Icon, iconColor, accent } = meta
  const post = posts[index]
  const float = CARD_FLOAT[index % CARD_FLOAT.length]

  return (
    <div className="flex flex-col max-w-3xl mx-auto" style={{ height: 'calc(100dvh - 6rem)' }}>

      {/* Header */}
      <motion.div
        className="px-4 sm:px-8 pt-6 pb-2 flex-shrink-0 flex items-center justify-between"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/5"
            style={{ color: 'rgba(148,163,184,0.5)' }}
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
          </button>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}0.15)`, border: `1px solid ${accent}0.3)` }}
          >
            <Icon size={15} strokeWidth={1.6} style={{ color: iconColor }} />
          </div>
          <div>
            <h1 className="text-xl text-white font-light tracking-tight">{label}</h1>
            <p className="text-haven-muted/50 text-xs font-light tracking-widest uppercase">Anonymous · Safe space</p>
          </div>
        </div>
        <span className="text-haven-muted/30 text-xs font-light tabular-nums">
          {index + 1} / {posts.length}
        </span>
      </motion.div>

      {/* Single card area */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 overflow-hidden">

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={post.id}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d * 56, opacity: 0, scale: 0.97, filter: 'blur(6px)' }),
              center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
              exit:  (d: number) => ({ x: d * -56, opacity: 0, scale: 0.97, filter: 'blur(6px)' }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
            style={{ willChange: 'transform' }}
          >
            <motion.div
              animate={{ y: [0, float.floatY, 0], rotate: [0, float.rot, 0] }}
              transition={{ duration: float.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
            >
              <FeedCard post={post} />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Reply toggle */}
        <div className="flex justify-end mt-1 mb-2 pr-1">
          <button
            onClick={() => { setShowReply((v) => !v); setReplyText('') }}
            className="flex items-center gap-1.5 text-haven-muted/35 text-xs font-light hover:text-haven-muted/70 transition-colors"
          >
            <MessageCircle size={11} />
            reply anonymously
          </button>
        </div>

        {/* Reply panel */}
        <AnimatePresence>
          {showReply && (
            <motion.div
              className="rounded-2xl overflow-hidden mb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'rgba(30,41,59,0.7)',
                border: `1px solid ${accent}0.2)`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="p-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write something kind..."
                  className="w-full h-16 text-sm text-white/75 bg-transparent placeholder:text-haven-muted/30 mb-3 resize-none outline-none"
                  maxLength={300}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => { setShowReply(false); setReplyText('') }}
                    className="flex items-center gap-1 text-haven-muted/40 text-xs px-3 py-1.5 rounded-lg hover:text-haven-muted/70 transition-colors"
                  >
                    <X size={10} /> cancel
                  </button>
                  <motion.button
                    onClick={sendReply}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-light text-white"
                    style={{ background: `${accent}0.3)`, border: `1px solid ${accent}0.35)` }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Send size={10} />
                    {sent ? 'Sent' : 'Send'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prev / Next */}
        <div className="flex items-center justify-center gap-6 mt-1 mb-2">
          <motion.button
            onClick={() => go(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(148,163,184,0.45)' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
          >
            <ChevronLeft size={16} strokeWidth={1.8} />
          </motion.button>

          <div className="flex gap-1.5">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); setShowReply(false) }}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === index ? `${accent}0.9)` : 'rgba(255,255,255,0.12)', transform: i === index ? 'scale(1.3)' : 'scale(1)' }}
              />
            ))}
          </div>

          <motion.button
            onClick={() => go(1)}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(148,163,184,0.45)' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
          >
            <ChevronRight size={16} strokeWidth={1.8} />
          </motion.button>
        </div>
      </div>

      {/* Pinned compose */}
      <motion.div
        className="flex-shrink-0 mx-4 sm:mx-8 mb-4 mt-1 rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${accent}0.1) 0%, rgba(30,41,59,0.8) 100%)`,
          border: `1px solid ${accent}0.25)`,
          boxShadow: `0 0 40px ${accent}0.06), inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}0.5), transparent)` }} />
        <div className="px-5 pt-4 pb-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${accent}0.2)`, border: `1px solid ${accent}0.3)` }}>
              <Icon size={11} strokeWidth={1.8} style={{ color: iconColor }} />
            </div>
            <span className="text-haven-muted/50 text-xs font-light tracking-wide">Share in {label}</span>
          </div>
          <textarea
            value={compose}
            onChange={(e) => setCompose(e.target.value)}
            placeholder="What's on your heart right now?"
            className="w-full min-h-[72px] text-sm text-white/80 placeholder:text-haven-muted/30 bg-transparent resize-none outline-none leading-relaxed"
            maxLength={500}
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: compose ? 'italic' : 'normal' }}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-haven-muted/25 text-[11px]">{compose.length}/500</span>
            <motion.button
              onClick={handlePost}
              disabled={!compose.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light text-white disabled:opacity-30 transition-all"
              style={{ background: `${accent}0.35)`, border: `1px solid ${accent}0.4)` }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Send size={12} />
              {posted ? 'Shared' : 'Release'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <EmergencyModal open={showEmergency} onClose={() => setShowEmergency(false)} />
    </div>
  )
}
