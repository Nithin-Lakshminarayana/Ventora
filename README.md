<div align="center">
  <br />
  <h1>🌿 Ventora</h1>
  <p><em>A place where your thoughts are safe.</em></p>
  <br />

  ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
  ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

  <br />
</div>

---

Ventora is a calm, anonymous space for emotional expression. Write freely, track your mood, explore healing content, and connect through shared feelings — with no names, no judgment, no tracking.

## Features

- **Anonymous writing** — Pour your thoughts out without any identity attached
- **Mood journey** — Visualise your emotional growth over time with a mood tree
- **Community feed** — Read and resonate with what others have shared
- **Healing space** — Guided content for difficult moments
- **Daily calm** — A new reflection or breathing exercise every day
- **Letters** — Unsent letters to people, places, or feelings
- **Emergency support** — Discreet access to crisis resources, always one tap away

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
ventora/
├── app/
│   ├── (app)/          # Authenticated app routes
│   │   ├── feed/       # Community feed
│   │   ├── healing/    # Healing content
│   │   ├── home/       # Dashboard
│   │   ├── journey/    # Mood journey & daily calm
│   │   ├── letters/    # Unsent letters
│   │   ├── profile/    # User profile
│   │   ├── search/     # Emotion-based search
│   │   └── write/      # Anonymous writing
│   └── (auth)/         # Auth routes
├── components/
│   ├── feed/
│   ├── home/
│   ├── journey/
│   ├── landing/        # Star, cloud & firefly animations
│   ├── layout/         # Navigation & time-aware background
│   └── ui/             # AI companion & emergency modal
└── lib/
    └── routes.ts       # Obfuscated route aliases
```

## Design

Ventora uses a deep navy palette (`#0F172A`) with soft purple accents (`#8B5CF6`) to create a calm, night-sky aesthetic. The landing page features animated stars, drifting clouds, and fireflies to set a peaceful tone before users step inside.

---

<div align="center">
  <sub>Built with care · No names · No judgment</sub>
</div>
