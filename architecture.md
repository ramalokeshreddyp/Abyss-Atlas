# Architecture - Ocean Depths

## Purpose

This document captures the architecture for a scroll-driven storytelling experience built for Frontend Odyssey. The system prioritizes cinematic transitions, composable sections, responsive behavior, and maintainable animation patterns.

## High-Level System

```mermaid
graph TD
    A[App Router] --> B[Index Page Orchestrator]
    B --> C[PageLoader]
    B --> D[Global Experience Layer]
    B --> E[Narrative Sections]

    D --> D1[CustomCursor]
    D --> D2[Bubbles]
    D --> D3[DepthMeter]
    D --> D4[OceanNav]

    E --> E1[Hero]
    E --> E2[Sunlight]
    E --> E3[Twilight]
    E --> E4[Midnight]
    E --> E5[Abyss]
    E --> E6[SectionTransition x4]
```

## Narrative-to-Technical Mapping

| Story Stage | Section Component | Core Mechanics |
|---|---|---|
| Hero | HeroSection | Intro animations, call-to-action, surface ambience |
| Introduction | SunlightZone | Parallax rays, stat reveals, creature cards |
| Exploration | TwilightZone | Bioluminescent particles, expandable insight cards |
| Insight | MidnightZone | Interactive creature explorer, pressure visual bars |
| Conclusion | AbyssSection | Final stats, quote reveal, return-to-surface action |

## Runtime Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as PageLoader
    participant I as Index
    participant S as Section Components
    participant N as Nav and Depth Meter

    U->>P: Visit page
    P-->>I: onComplete()
    I->>S: Mount global and section components
    U->>S: Scroll events and interactions
    S-->>N: Active zone and depth progress updates
    N-->>U: Continuous orientation feedback
```

## Motion Architecture

```mermaid
flowchart LR
    A[Scroll Input] --> B[Framer Motion useScroll]
    B --> C[useTransform]
    C --> D[Parallax Position]
    C --> E[Opacity Curves]
    C --> F[Scale Curves]
    C --> G[Overlay Intensity]

    H[Viewport Entry] --> I[ScrollReveal]
    I --> J[One-time section reveal animations]

    K[Hover or Click] --> L[Spring Motion]
    L --> M[Card lift and glow]
    L --> N[Cursor feedback]
```

## Component Graph

```mermaid
graph LR
    A[Index.tsx] --> B[HeroSection.tsx]
    A --> C[SunlightZone.tsx]
    A --> D[TwilightZone.tsx]
    A --> E[MidnightZone.tsx]
    A --> F[AbyssSection.tsx]
    A --> G[SectionTransition.tsx]
    A --> H[PageLoader.tsx]
    A --> I[CustomCursor.tsx]
    A --> J[Bubbles.tsx]
    A --> K[DepthMeter.tsx]
    A --> L[OceanNav.tsx]

    C --> M[CreatureCard.tsx]
    C --> N[ParallaxLayer.tsx]
    C --> O[ScrollReveal.tsx]
    D --> O
    E --> O
    F --> O
```

## Styling and Design System

```mermaid
graph TD
    A[index.css] --> B[CSS Variables - Theme Tokens]
    B --> C[Ocean color scale]
    B --> D[Glow and shadow tokens]
    B --> E[Typography tokens]
    A --> F[Tailwind utility composition]
```

Key choices:
- HSL tokens to smoothly tune depth color transitions.
- Display and body font split for editorial tone plus readability.
- Reusable utility classes for glow and shadow consistency.

## State and Responsibility Model

| Area | Scope | Owner Component |
|---|---|---|
| Initial loading gate | Page-level | Index + PageLoader |
| Active card states | Section-local | Sunlight/Twilight/Midnight/Abyss |
| Scroll progress visuals | Global overlay | DepthMeter + OceanNav |
| Cursor feedback | Global desktop-only | CustomCursor |

## Performance Characteristics

| Technique | Current Implementation |
|---|---|
| Asset strategy | SVG/CSS effects, minimal heavy media |
| Motion strategy | Transform and opacity-dominant animations |
| Reduced motion | CSS media query fallback and cursor disable path |
| Re-render boundaries | Localized section state keeps updates scoped |
| Build pipeline | Vite optimized production output |

## Accessibility Strategy

| Area | Implementation |
|---|---|
| Keyboard support | Buttons and role=button patterns with key handlers |
| Landmark semantics | Main and section labels for screen readers |
| Motion sensitivity | prefers-reduced-motion support |
| Touch behavior | Custom cursor disabled for coarse pointers |

## Responsiveness

| Breakpoint | Behavior |
|---|---|
| Mobile | Stacked content and touch-first interactions |
| Tablet | Expanded grids and balanced spacing |
| Desktop | Full cursor and richer motion density |

## Scalability and Extension Plan

1. Add optional audio layer per depth zone with mute control.
2. Integrate lightweight CMS or JSON content source for theme variants.
3. Add route-level split for future multi-story editions.
4. Add automated visual regression checks in CI.

## Deployment Architecture

```mermaid
flowchart LR
    A[GitHub Repository] --> B[Vercel or Netlify Build]
    B --> C[npm run build]
    C --> D[dist static output]
    D --> E[Global CDN delivery]
```
