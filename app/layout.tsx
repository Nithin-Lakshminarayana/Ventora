import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ventora — A place where your thoughts are safe',
  description: 'A quiet digital sanctuary. You don\'t have to carry everything alone.',
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-ventora-bg antialiased">{children}</body>
    </html>
  )
}
