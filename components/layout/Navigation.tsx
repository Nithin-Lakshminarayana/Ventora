'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Leaf, PenLine, Mail, TreePine } from 'lucide-react'
import { R } from '@/lib/routes'

const NAV_ITEMS = [
  { href: R.home,    Icon: Home,     label: 'Home'    },
  { href: R.healing, Icon: Leaf,     label: 'Healing' },
  { href: R.write,   Icon: PenLine,  label: 'Write'   },
  { href: R.letters, Icon: Mail,     label: 'Letters' },
  { href: R.journey, Icon: TreePine, label: 'Journey' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 pointer-events-none">
      <motion.nav
        className="pointer-events-auto flex items-center justify-around w-full px-3 py-2.5 sm:py-3 rounded-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: 'rgba(15,18,36,0.88)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {NAV_ITEMS.map(({ href, Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full transition-all"
            >
              {/* Active background */}
              {active && (
                <motion.div
                  layoutId="nav-island-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(139,92,246,0.22)',
                    border: '1px solid rgba(139,92,246,0.35)',
                    boxShadow: '0 0 12px rgba(139,92,246,0.25)',
                  }}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}

              <Icon
                className="relative z-10 transition-all duration-200 w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6"
                strokeWidth={active ? 2.2 : 1.6}
                style={{ color: active ? 'rgba(167,139,250,1)' : 'rgba(148,163,184,0.38)' }}
              />
            </Link>
          )
        })}
      </motion.nav>
      </div>
    </div>
  )
}

