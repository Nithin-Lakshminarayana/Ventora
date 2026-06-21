import { TimeBackground } from '@/components/layout/TimeBackground'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <TimeBackground />
      <main className="relative z-10">{children}</main>
    </div>
  )
}
