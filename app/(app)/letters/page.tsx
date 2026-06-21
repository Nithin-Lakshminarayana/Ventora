'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PenLine, Mail, Lock, Calendar, Flame, Check, Unlock } from 'lucide-react'

interface Letter {
  id: string
  text: string
  date: string
  sealed: boolean
  burned: boolean
  openAfter?: string
}

function daysBetween(date1: string, date2: string) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
}

export default function LettersPage() {
  const [letters, setLetters] = useState<Letter[]>([])
  const [text, setText] = useState('')
  const [view, setView] = useState<'write' | 'vault'>('write')
  const [openedLetter, setOpenedLetter] = useState<Letter | null>(null)
  const [action, setAction] = useState<'idle' | 'sealed' | 'burned'>('idle')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ventora-letters')
      if (stored) setLetters(JSON.parse(stored))
    } catch {}
  }, [])

  const save = (updated: Letter[]) => {
    setLetters(updated)
    localStorage.setItem('ventora-letters', JSON.stringify(updated))
  }

  const handleSeal = () => {
    if (!text.trim()) return
    const letter: Letter = {
      id: Date.now().toString(),
      text,
      date: new Date().toISOString(),
      sealed: true,
      burned: false,
    }
    save([letter, ...letters])
    setText('')
    setAction('sealed')
    setTimeout(() => setAction('idle'), 2000)
  }

  const handleBurn = () => {
    if (!text.trim()) return
    setText('')
    setAction('burned')
    setTimeout(() => setAction('idle'), 2000)
  }

  const handleOpenLater = () => {
    if (!text.trim()) return
    const openDate = new Date()
    openDate.setDate(openDate.getDate() + 30)
    const letter: Letter = {
      id: Date.now().toString(),
      text,
      date: new Date().toISOString(),
      sealed: false,
      burned: false,
      openAfter: openDate.toISOString(),
    }
    save([letter, ...letters])
    setText('')
    setAction('sealed')
    setTimeout(() => setAction('idle'), 2000)
  }

  const openLetter = (letter: Letter) => {
    const days = daysBetween(letter.date, new Date().toISOString())
    if (letter.openAfter && new Date() < new Date(letter.openAfter)) return
    setOpenedLetter({ ...letter, id: days.toString() })
  }

  return (
    <div className="flex flex-col px-4 sm:px-8 pt-5 pb-2 max-w-3xl mx-auto" style={{ height: 'calc(100dvh - 6rem)' }}>
      {/* Header */}
      <motion.div className="mb-4 flex-shrink-0" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl text-white font-light">Letters</h1>
        <p className="text-ventora-muted text-sm font-light mt-0.5">Words meant for your future self.</p>
      </motion.div>

      {/* Tab toggle */}
      <div className="flex gap-2 mb-4 flex-shrink-0">
        {(['write', 'vault'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className="flex-1 py-2.5 rounded-2xl text-sm font-light capitalize transition-all"
            style={{
              background: view === tab ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${view === tab ? 'rgba(139,92,246,0.35)' : 'rgba(255,255,255,0.06)'}`,
              color: view === tab ? 'white' : 'rgba(148,163,184,0.7)',
            }}
          >
            {tab === 'write' ? (
              <span className="flex items-center justify-center gap-1.5"><PenLine size={13} strokeWidth={1.8} /> Write</span>
            ) : (
              <span className="flex items-center justify-center gap-1.5"><Mail size={13} strokeWidth={1.8} /> Vault</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
      <AnimatePresence mode="wait">
        {view === 'write' ? (
          <motion.div
            key="write"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            {/* Paper */}
            <div className="paper rounded-4xl overflow-hidden mb-5 shadow-ventora-lg" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="px-6 pt-6 pb-2">
                <p
                  className="text-ventora-muted/60 text-sm font-light mb-5"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}
                >
                  Dear Future Me,
                </p>
              </div>
              <div className="relative px-6 pb-6">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start writing your letter..."
                  className="relative z-10 w-full min-h-52 text-sm text-white/80 bg-transparent placeholder:text-ventora-muted/25"
                  maxLength={2000}
                  style={{ lineHeight: '2', fontFamily: '"Playfair Display", Georgia, serif' }}
                />
              </div>
              <div
                className="h-px mx-6 mb-4"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)' }}
              />
              <p className="text-right text-ventora-muted/30 text-xs px-6 pb-5">
                With love,<br />
                <span className="italic">Me</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <motion.button
                onClick={handleSeal}
                disabled={!text.trim()}
                className="py-3.5 rounded-3xl text-sm font-light tracking-wide text-white disabled:opacity-30 flex items-center justify-center gap-2"
                style={{ background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.3)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Lock size={14} strokeWidth={1.8} /> Seal Letter
              </motion.button>
              <motion.button
                onClick={handleOpenLater}
                disabled={!text.trim()}
                className="py-3.5 rounded-3xl text-sm font-light tracking-wide text-ventora-muted disabled:opacity-30 flex items-center justify-center gap-2"
                style={{ background: 'rgba(125,211,252,0.08)', border: '1px solid rgba(125,211,252,0.15)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Calendar size={14} strokeWidth={1.8} /> Open Later (30 days)
              </motion.button>
              <motion.button
                onClick={handleBurn}
                disabled={!text.trim()}
                className="py-3.5 rounded-3xl text-sm font-light tracking-wide text-ventora-muted/50 disabled:opacity-30 flex items-center justify-center gap-2"
                style={{ background: 'rgba(251,113,133,0.06)', border: '1px solid rgba(251,113,133,0.12)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Flame size={14} strokeWidth={1.8} style={{ color: 'rgba(251,113,133,0.7)' }} /> Burn Letter
              </motion.button>
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {action === 'sealed' && (
                <motion.p
                  className="text-center text-ventora-muted text-sm mt-5 font-light flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Check size={14} strokeWidth={2} style={{ color: '#4ADE80' }} /> Letter sealed. It will wait for you.
                </motion.p>
              )}
              {action === 'burned' && (
                <motion.p
                  className="text-center text-ventora-muted text-sm mt-5 font-light flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Flame size={14} strokeWidth={1.8} style={{ color: 'rgba(251,113,133,0.7)' }} /> Released into the sky.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="vault"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            {letters.length === 0 ? (
              <div className="text-center py-16">
                <Mail size={36} strokeWidth={1.2} className="mx-auto mb-4" style={{ color: 'rgba(148,163,184,0.25)' }} />
                <p className="text-ventora-muted text-sm font-light">Your sealed letters will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {letters.map((letter) => {
                  const days = daysBetween(letter.date, new Date().toISOString())
                  const locked = letter.openAfter && new Date() < new Date(letter.openAfter)
                  return (
                    <motion.button
                      key={letter.id}
                      onClick={() => !locked && openLetter(letter)}
                      className="w-full text-left glass rounded-3xl p-5"
                      whileHover={{ scale: locked ? 1 : 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-ventora-muted/50 text-xs">
                          {days === 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} ago`}
                        </span>
                        <span className="text-lg">{locked ? <Lock size={16} strokeWidth={1.8} style={{ color: 'rgba(148,163,184,0.4)' }} /> : <Unlock size={16} strokeWidth={1.8} style={{ color: 'rgba(167,139,250,0.6)' }} />}</span>
                      </div>
                      <p className="text-ventora-muted text-sm font-light italic line-clamp-2">
                        {locked ? 'Opens in ' + Math.ceil(daysBetween(new Date().toISOString(), letter.openAfter!)) + ' days...' : '"' + letter.text.slice(0, 80) + (letter.text.length > 80 ? '...' : '') + '"'}
                      </p>
                    </motion.button>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opened letter modal */}
      <AnimatePresence>
        {openedLetter && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(15,23,42,0.88)', backdropFilter: 'blur(8px)' }}
              onClick={() => setOpenedLetter(null)}
            />
            <motion.div
              className="relative w-full max-w-sm paper rounded-4xl overflow-hidden shadow-ventora-lg"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ y: 40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.95 }}
            >
              <div className="p-7">
                <p className="text-ventora-muted/50 text-xs mb-4 text-center">
                  You wrote this {openedLetter.id} day{Number(openedLetter.id) === 1 ? '' : 's'} ago.
                </p>
                <p
                  className="text-ventora-muted/60 text-sm mb-4"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}
                >
                  Dear Future Me,
                </p>
                <p className="text-white/80 text-sm font-light leading-relaxed mb-6" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  {openedLetter.text}
                </p>
                <button
                  onClick={() => setOpenedLetter(null)}
                  className="w-full py-3 rounded-2xl text-ventora-muted text-sm font-light border border-white/6 hover:border-white/12 transition-colors"
                >
                  Close gently
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}
