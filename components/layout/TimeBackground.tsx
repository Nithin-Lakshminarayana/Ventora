'use client'

import { useMemo } from 'react'

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

interface TimeConfig {
  label: string
  gradient: string
  hills: string
  accent: string
  showMoon: boolean
  showSun: boolean
  showStars: boolean
  showFireflies: boolean
}

const TIME_CONFIGS: Record<TimeOfDay, TimeConfig> = {
  morning: {
    label: 'morning',
    gradient: 'from-[#0F172A] via-[#1e3a5f] to-[#2d5a8e]',
    hills: '#0d2137',
    accent: '#93c5fd',
    showMoon: false,
    showSun: true,
    showStars: false,
    showFireflies: false,
  },
  afternoon: {
    label: 'afternoon',
    gradient: 'from-[#0F172A] via-[#1a2f4e] to-[#243b55]',
    hills: '#0a1628',
    accent: '#fde68a',
    showMoon: false,
    showSun: true,
    showStars: false,
    showFireflies: false,
  },
  evening: {
    label: 'evening',
    gradient: 'from-[#0F172A] via-[#1a1040] to-[#2d1b69]',
    hills: '#0a0a1a',
    accent: '#fb923c',
    showMoon: true,
    showSun: false,
    showStars: true,
    showFireflies: true,
  },
  night: {
    label: 'night',
    gradient: 'from-[#0F172A] via-[#0d1117] to-[#0F172A]',
    hills: '#060912',
    accent: '#c4b5fd',
    showMoon: true,
    showSun: false,
    showStars: true,
    showFireflies: true,
  },
}

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'morning'
  if (h >= 12 && h < 17) return 'afternoon'
  if (h >= 17 && h < 21) return 'evening'
  return 'night'
}

function Hills({ color }: { color: string }) {
  return (
    <svg
      className="absolute bottom-16 left-0 right-0 w-full"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Far hills */}
      <path
        d="M0 160 Q180 60 360 120 Q540 180 720 100 Q900 20 1080 110 Q1260 200 1440 130 L1440 200 L0 200 Z"
        fill={color}
        opacity="0.6"
      />
      {/* Near hills */}
      <path
        d="M0 190 Q200 120 400 160 Q600 200 800 140 Q1000 80 1200 160 Q1320 200 1440 170 L1440 200 L0 200 Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  )
}

export function useTimeConfig() {
  return useMemo(() => TIME_CONFIGS[getTimeOfDay()], [])
}

export function TimeBackground() {
  const config = useTimeConfig()

  return (
    <div className={`fixed inset-0 pointer-events-none bg-gradient-to-b ${config.gradient}`} aria-hidden>
      {/* Sun or Moon */}
      {config.showSun && (
        <div
          className="absolute top-16 right-1/4 w-20 h-20 rounded-full"
          style={{
            background: config.label === 'morning'
              ? 'radial-gradient(circle, #fde68a 40%, rgba(253,230,138,0.2) 100%)'
              : 'radial-gradient(circle, #fef3c7 40%, rgba(254,243,199,0.15) 100%)',
            boxShadow: '0 0 60px 20px rgba(253,230,138,0.15)',
          }}
        />
      )}
      {config.showMoon && (
        <div
          className="absolute top-12 right-1/3 w-14 h-14 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(226,232,240,0.55), rgba(196,181,253,0.25))',
            boxShadow: '0 0 24px 6px rgba(196,181,253,0.07)',
            opacity: 0.45,
          }}
        />
      )}

      {/* Hills silhouette */}
      <Hills color={config.hills} />

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: config.hills }} />

      {/* Subtle top aurora */}
      <div className="absolute top-0 left-0 right-0 h-64 aurora-glow" />
    </div>
  )
}
