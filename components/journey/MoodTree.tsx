'use client'

import { Circle, Sprout, Leaf, TreePine } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type MoodLevel = 0 | 1 | 2 | 3 | 4

const TREE_STAGES: Record<MoodLevel, { Icon: LucideIcon; label: string; desc: string; color: string }> = {
  0: { Icon: Circle,   label: 'Seed',        desc: 'Every forest starts here.',       color: '#a78bfa' },
  1: { Icon: Sprout,   label: 'Sprouting',   desc: 'Something small is growing.',     color: '#4ade80' },
  2: { Icon: Leaf,     label: 'Growing',     desc: 'Your roots are deepening.',       color: '#34d399' },
  3: { Icon: TreePine, label: 'Flourishing', desc: 'Standing tall. Well rooted.',     color: '#22c55e' },
  4: { Icon: TreePine, label: 'Radiant',     desc: 'Peace has made its home in you.', color: '#86efac' },
}

interface Props {
  weekAvg: MoodLevel
  weeks: { week: number; avg: MoodLevel }[]
  className?: string
}

const VW = 200
const VH = 120
const PAD = { t: 8, r: 10, b: 22, l: 10 }

function toX(i: number, total: number) {
  return PAD.l + (i / Math.max(total - 1, 1)) * (VW - PAD.l - PAD.r)
}
function toY(avg: number) {
  return VH - PAD.b - (avg / 4) * (VH - PAD.t - PAD.b)
}

export default function MoodTree({ weekAvg, weeks, className = '' }: Props) {
  const stage = TREE_STAGES[weekAvg]
  const pts = weeks.map((w, i) => ({ x: toX(i, weeks.length), y: toY(w.avg), avg: w.avg, week: w.week }))

  const linePath = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = pts[i - 1]
    const cx = (prev.x + p.x) / 2
    return `C ${cx} ${prev.y} ${cx} ${p.y} ${p.x} ${p.y}`
  }).join(' ')

  const areaPath = linePath
    + ` L ${pts[pts.length - 1].x} ${VH - PAD.b}`
    + ` L ${pts[0].x} ${VH - PAD.b} Z`

  return (
    <div className={`glass rounded-4xl flex flex-col p-4 ${className}`}>
      {/* Header */}
      <p className="text-ventora-muted/50 text-[10px] tracking-widest uppercase mb-3 text-center flex-shrink-0">
        Your Forest
      </p>

      {/* Stage */}
      <div className="text-center flex-shrink-0">
        <stage.Icon size={30} strokeWidth={1.3} className="mx-auto mb-1.5" style={{ color: stage.color }} />
        <p className="text-white/90 font-light text-sm">{stage.label}</p>
        <p className="text-ventora-muted/50 text-[11px] font-light">{stage.desc}</p>
      </div>

      {/* Divider */}
      <div className="h-px my-3 flex-shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${stage.color}40, transparent)` }} />

      {/* Graph — fills remaining space */}
      <div className="flex-1 min-h-0 w-full">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          width="100%" height="100%"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stage.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={stage.color} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(level => (
            <line
              key={level}
              x1={PAD.l} y1={toY(level)} x2={VW - PAD.r} y2={toY(level)}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1"
            />
          ))}

          {/* Area */}
          <path d={areaPath} fill="url(#moodGrad)" />

          {/* Line */}
          <path d={linePath} fill="none" stroke={stage.color} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />

          {/* Dots + week labels */}
          {pts.map((p) => (
            <g key={p.week}>
              <circle cx={p.x} cy={p.y} r="4" fill={stage.color} opacity="0.15" />
              <circle cx={p.x} cy={p.y} r="2.5" fill={stage.color} opacity="0.95" />
              <text x={p.x} y={VH - 6} textAnchor="middle" fontSize="8"
                fill="rgba(148,163,184,0.4)">
                W{p.week}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
