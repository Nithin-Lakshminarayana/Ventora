import Navigation from '@/components/layout/Navigation'
import { TimeBackground } from '@/components/layout/TimeBackground'
import AICompanion from '@/components/ui/AICompanion'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <TimeBackground />
      <main className="relative z-10 pb-nav">{children}</main>
      <Navigation />
      <AICompanion />
    </div>
  )
}
