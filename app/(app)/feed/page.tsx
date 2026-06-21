'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'
import FeedCard from '@/components/feed/FeedCard'
import EmergencyModal from '@/components/ui/EmergencyModal'

const SEED_POSTS = [
  { id: 1, text: 'I miss talking to my dad. Some days the silence is the loudest thing in the room.' },
  { id: 2, text: "I feel like everyone is moving ahead except me. Like I'm standing in a river and watching everyone else swim past." },
  { id: 3, text: 'I finally said no to something that was draining me. It felt terrifying. It also felt like breathing again.' },
  { id: 4, text: 'Some nights I talk to the moon. She never judges.' },
  { id: 5, text: "I started therapy. It's the bravest thing I've done in years." },
  { id: 6, text: "I cried in the shower so no one could hear. But you hear me now, and that's enough." },
]

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
  { floatY: -9,  dur: 4.8, rot: 0.9  },
  { floatY: -8,  dur: 5.2, rot: -0.7 },
  { floatY: -11, dur: 4.6, rot: 1.1  },
]

const CRISIS_PHRASES = ["don't want to live", "want to die", "end my life", "kill myself"]
function detectCrisis(text: string) {
  return CRISIS_PHRASES.some((p) => text.toLowerCase().includes(p))
}

let nextId = SEED_POSTS.length + 1

export default function FeedPage() {
  const [posts, setPosts] = useState(
    SEED_POSTS.map((p) => ({ ...p, reactions: REACTIONS_SEED.map((r) => ({ ...r })) }))
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
    const newPost = { id: nextId++, text: compose.trim(), reactions: REACTIONS_SEED.map((r) => ({ ...r })) }
    setPosts((prev) => [newPost, ...prev])
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

  const post = posts[index]
  const float = CARD_FLOAT[index % CARD_FLOAT.length]

  return (
    <div className="flex flex-col max-w-3xl mx-auto" style={{ height: 'calc(100dvh - 6rem)' }}>

      {/* Header */}
      <motion.div
        className="px-4 sm:px-8 pt-6 pb-2 flex-shrink-0 flex items-end justify-between"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl text-white font-light tracking-tight">The Stream</h1>
          <p className="text-ventora-muted/60 text-xs font-light mt-0.5 tracking-widest uppercase">Anonymous · Real · Safe</p>
        </div>
        <span className="text-ventora-muted/30 text-xs font-light tabular-nums pb-0.5">
          {index + 1} / {posts.length}
        </span>
      </motion.div>

      {/* Single card area */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 overflow-hidden">

        {/* Card */}
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
            className="flex items-center gap-1.5 text-ventora-muted/35 text-xs font-light hover:text-ventora-muted/70 transition-colors"
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
                border: '1px solid rgba(139,92,246,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="p-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write something kind..."
                  className="w-full h-16 text-sm text-white/75 bg-transparent placeholder:text-ventora-muted/30 mb-3 resize-none outline-none"
                  maxLength={300}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => { setShowReply(false); setReplyText('') }}
                    className="flex items-center gap-1 text-ventora-muted/40 text-xs px-3 py-1.5 rounded-lg hover:text-ventora-muted/70 transition-colors"
                  >
                    <X size={10} /> cancel
                  </button>
                  <motion.button
                    onClick={sendReply}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-light text-white"
                    style={{ background: 'rgba(139,92,246,0.3)', border: '1px solid rgba(139,92,246,0.3)' }}
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
            whileHover={{ scale: 1.08, color: 'rgba(167,139,250,0.9)' }}
            whileTap={{ scale: 0.93 }}
          >
            <ChevronLeft size={16} strokeWidth={1.8} />
          </motion.button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); setShowReply(false) }}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === index ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.12)', transform: i === index ? 'scale(1.3)' : 'scale(1)' }}
              />
            ))}
          </div>

          <motion.button
            onClick={() => go(1)}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(148,163,184,0.45)' }}
            whileHover={{ scale: 1.08, color: 'rgba(167,139,250,0.9)' }}
            whileTap={{ scale: 0.93 }}
          >
            <ChevronRight size={16} strokeWidth={1.8} />
          </motion.button>
        </div>
      </div>

      {/* Compose — pinned */}
      <motion.div
        className="flex-shrink-0 mx-4 sm:mx-8 mb-4 mt-1 rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(30,41,59,0.8) 100%)',
          border: '1px solid rgba(139,92,246,0.25)',
          boxShadow: '0 0 40px rgba(139,92,246,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }} />
        <div className="px-5 pt-4 pb-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.3)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-ventora-primary/80" />
            </div>
            <span className="text-ventora-muted/50 text-xs font-light tracking-wide">Share anonymously</span>
          </div>
          <textarea
            value={compose}
            onChange={(e) => setCompose(e.target.value)}
            placeholder="What's on your heart right now?"
            className="w-full min-h-[72px] text-sm text-white/80 placeholder:text-ventora-muted/30 bg-transparent resize-none outline-none leading-relaxed"
            maxLength={500}
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: compose ? 'italic' : 'normal' }}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-ventora-muted/25 text-[11px]">{compose.length}/500</span>
            <motion.button
              onClick={handlePost}
              disabled={!compose.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light text-white disabled:opacity-30 transition-all"
              style={{ background: 'rgba(139,92,246,0.35)', border: '1px solid rgba(139,92,246,0.4)' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Send size={12} />
              {posted ? 'Sent into the stream' : 'Release'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <EmergencyModal open={showEmergency} onClose={() => setShowEmergency(false)} />
    </div>
  )
}
