# 🌊 Ocean Depths — An Interactive Storytelling Experience

<div align="center">

**Dive beneath the waves and explore the mysterious layers of the ocean through an immersive, scroll-driven digital experience.**

[![Built with React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-ff69b4?logo=framer)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)](https://www.typescriptlang.org)

[Live Demo →](#) · [Architecture →](./architecture.md) · [Documentation →](./projectdocumentation.md)

</div>

---

## 🎯 Project Overview

**Ocean Depths** is an Awwwards-level interactive storytelling website built for the *Frontend Odyssey: The Interactive Web Experience Challenge* at IIT Patna. Users embark on a cinematic scroll-driven journey from the sunlit ocean surface down to the crushing depths of the abyss — encountering marine creatures, scientific data, and poetic narratives along the way.

This is not a static website. It's a **premium digital experience** featuring custom cursors, parallax effects, bioluminescent particle systems, interactive creature cards, scroll-linked navigation, and seamless section transitions.

## ✨ Key Features

| Feature | Implementation |
|---------|---------------|
| 🎬 **Cinematic Page Loader** | Animated depth-based loading sequence with sonar pings |
| 🖱️ **Custom Cursor** | Spring-physics cursor with interactive hover states |
| 📜 **Scroll-Driven Narrative** | 5 ocean zones with parallax, sticky, and reveal effects |
| 🐠 **Interactive Creature Cards** | Hover-triggered bioluminescent glow with spring animations |
| 🌊 **Animated SVG Waves** | Multi-layer wave animations with morphing paths |
| ✨ **Bioluminescent Particles** | Dynamic particle systems that react to scroll depth |
| 📊 **Depth Meter** | Fixed scroll-progress indicator with real-time depth counter |
| 🧭 **Smart Navigation** | Pill-based nav with intersection observer for active state |
| 🌊 **Section Transitions** | Wave, particle, and fade transitions between zones |
| ♿ **Accessibility** | ARIA labels, keyboard navigation, reduced-motion support |

## 🏗️ Story Structure

```
Hero (Surface)      → Introduction to the ocean journey
  ↓ Wave Transition
Sunlight Zone       → Vibrant marine life, coral reefs
  ↓ Particle Transition
Twilight Zone       → Bioluminescence, expandable cards
  ↓ Fade Transition
Midnight Zone       → Interactive creature explorer
  ↓ Particle Transition
Abyss               → Statistics, quote reveal, conclusion
```

## 🛠️ Tech Stack

- **React 18** — Component-based UI architecture
- **TypeScript** — Type-safe development
- **Framer Motion 11** — Scroll-linked animations, springs, layout animations
- **Tailwind CSS 3.4** — Utility-first styling with custom design tokens
- **Vite 5** — Lightning-fast build tooling

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/           # 5 narrative sections
│   │   ├── HeroSection.tsx
│   │   ├── SunlightZone.tsx
│   │   ├── TwilightZone.tsx
│   │   ├── MidnightZone.tsx
│   │   └── AbyssSection.tsx
│   ├── Bubbles.tsx         # Ambient bubble particle system
│   ├── CustomCursor.tsx    # Physics-based custom cursor
│   ├── CreatureCard.tsx    # Interactive marine life cards
│   ├── DepthMeter.tsx      # Fixed depth progress indicator
│   ├── OceanNav.tsx        # Pill-based zone navigation
│   ├── PageLoader.tsx      # Cinematic loading animation
│   ├── ParallaxLayer.tsx   # Scroll-linked parallax wrapper
│   ├── ScrollReveal.tsx    # Scroll-triggered reveal animations
│   └── SectionTransition.tsx # Zone transition effects
├── pages/
│   └── Index.tsx           # Main page orchestrator
└── index.css               # Design tokens & custom properties
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Responsive Design

Fully responsive across all devices:
- **Desktop** (1440px+) — Full experience with cursor, depth meter, navigation
- **Tablet** (768px–1024px) — Adapted layouts, touch-optimized
- **Mobile** (320px–767px) — Simplified animations, stacked grids

## 🏆 Hackathon Scoring Alignment

| Criteria | Weight | How We Excel |
|----------|--------|-------------|
| Creativity & Storytelling | 30% | Cohesive ocean narrative with interactive exploration |
| Visual Design | 25% | Bioluminescent theme, custom typography, ocean palette |
| Animation & Interactivity | 20% | 10+ distinct animations, custom cursor, particles |
| Responsiveness | 15% | Flawless across desktop, tablet, mobile |
| Code Quality | 10% | Clean TypeScript, reusable components, semantic tokens |

## 📄 License

Built for Frontend Odyssey: The Interactive Web Experience Challenge — IIT Patna, 2026.
