import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ventora: {
          bg: '#0F172A',
          secondary: '#1E293B',
          card: '#273449',
          primary: '#8B5CF6',
          accent: '#7DD3FC',
          success: '#4ADE80',
          text: '#FFFFFF',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        drift: 'drift 70s linear infinite',
        'drift-slow': 'drift 100s linear infinite',
        'drift-slower': 'drift 130s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        sway: 'sway 6s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%': { transform: 'translateX(110vw)' },
          '100%': { transform: 'translateX(-400px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow:
              '0 0 20px rgba(139,92,246,0.25), 0 0 60px rgba(139,92,246,0.08)',
          },
          '50%': {
            boxShadow:
              '0 0 40px rgba(139,92,246,0.5), 0 0 100px rgba(139,92,246,0.18)',
          },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      boxShadow: {
        ventora: '0 8px 32px rgba(0,0,0,0.45)',
        'ventora-lg': '0 16px 48px rgba(0,0,0,0.55)',
        'glow-purple': '0 0 30px rgba(139,92,246,0.3)',
        'glow-accent': '0 0 30px rgba(125,211,252,0.3)',
        'glow-green': '0 0 30px rgba(74,222,128,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
