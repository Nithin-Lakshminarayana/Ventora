'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Leaf } from 'lucide-react'
import Link from 'next/link'
import { R } from '@/lib/routes'

function AuthContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mode, setMode]           = useState<'in' | 'up'>(searchParams.get('m') === 'up' ? 'up' : 'in')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [showConf, setShowConf]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)

  const toggle = () => {
    setMode(m => m === 'in' ? 'up' : 'in')
    setError(null)
    setPassword('')
    setConfirm('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) { setError('Please fill in all fields.'); return }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRe.test(email)) { setError('Please enter a valid email address.'); return }
    if (mode === 'up' && password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }

    setLoading(true)
    // TODO: connect to auth provider
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    // persist for profile display
    const adjs  = ['quiet','gentle','calm','soft','still','tender','serene','warm','kind','bright']
    const nouns = ['maple','river','cloud','willow','moon','forest','breeze','ember','dawn','ventora']
    const existing = localStorage.getItem('ventora_user')
    if (!existing) {
      const username = adjs[Math.floor(Math.random()*adjs.length)] + '.' + nouns[Math.floor(Math.random()*nouns.length)]
      localStorage.setItem('ventora_user', JSON.stringify({ email, username }))
    }
    router.push(R.home)
  }

  const isSignUp = mode === 'up'

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
            style={{ background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.3)' }}>
            <Leaf size={22} strokeWidth={1.4} style={{ color: '#a78bfa' }} />
          </div>
          <h1 className="text-2xl text-white font-light tracking-wide">ventora</h1>
          <p className="text-ventora-muted/50 text-xs font-light mt-1 tracking-wider">a place where your thoughts are safe</p>
        </motion.div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="glass rounded-4xl p-7"
          >
            <h2 className="text-white/80 text-lg font-light mb-1">
              {isSignUp ? 'Create your ventora' : 'Welcome back'}
            </h2>
            <p className="text-ventora-muted/45 text-xs font-light mb-6">
              {isSignUp ? 'Your journey starts here.' : 'Step inside. You are safe here.'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Email */}
              <div>
                <label className="text-ventora-muted/40 text-[10px] tracking-widest uppercase block mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl px-4 py-2.5 text-sm font-light text-white/85 placeholder:text-ventora-muted/25 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.35)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-ventora-muted/40 text-[10px] tracking-widest uppercase block mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    placeholder="••••••••"
                    className="w-full rounded-2xl px-4 py-2.5 pr-10 text-sm font-light text-white/85 placeholder:text-ventora-muted/25 outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.35)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ventora-muted/30 hover:text-ventora-muted/60 transition-colors">
                    {showPass ? <EyeOff size={14} strokeWidth={1.6} /> : <Eye size={14} strokeWidth={1.6} />}
                  </button>
                </div>
              </div>

              {/* Confirm password (signup only) */}
              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <label className="text-ventora-muted/40 text-[10px] tracking-widest uppercase block mb-1.5">Confirm password</label>
                    <div className="relative">
                      <input
                        type={showConf ? 'text' : 'password'}
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full rounded-2xl px-4 py-2.5 pr-10 text-sm font-light text-white/85 placeholder:text-ventora-muted/25 outline-none transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.35)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                      />
                      <button type="button" onClick={() => setShowConf(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ventora-muted/30 hover:text-ventora-muted/60 transition-colors">
                        {showConf ? <EyeOff size={14} strokeWidth={1.6} /> : <Eye size={14} strokeWidth={1.6} />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-red-400/70 text-xs font-light"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="mt-1 flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-sm font-light text-white/90 transition-all disabled:opacity-50"
                style={{ background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.35)' }}
                whileHover={{ background: 'rgba(139,92,246,0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? (
                  <span className="text-ventora-muted/60 text-xs tracking-widest">...</span>
                ) : (
                  <>
                    {isSignUp ? 'Begin' : 'Enter'}
                    <ArrowRight size={14} strokeWidth={1.8} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </AnimatePresence>

        {/* Toggle */}
        <motion.p
          className="text-center text-ventora-muted/35 text-xs font-light mt-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        >
          {isSignUp ? 'Already here?' : "Don't have an account?"}
          {' '}
          <button onClick={toggle} className="text-ventora-primary/60 hover:text-ventora-primary transition-colors underline-offset-2 hover:underline">
            {isSignUp ? 'Sign in' : 'Create one'}
          </button>
        </motion.p>

        {/* Back to landing */}
        <motion.div
          className="text-center mt-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          <Link href="/" className="text-ventora-muted/25 text-[10px] hover:text-ventora-muted/50 transition-colors tracking-wider">
            ← back to ventora
          </Link>
        </motion.div>

      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthContent />
    </Suspense>
  )
}
