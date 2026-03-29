# Project Documentation — Ocean Depths

## Project Description (200–300 words)

**Ocean Depths** is an immersive, scroll-driven interactive storytelling experience that takes users on a cinematic journey from the sunlit ocean surface down to the crushing depths of the hadal trenches. Built for the Frontend Odyssey hackathon at IIT Patna, this project reimagines educational content as a premium digital experience inspired by Awwwards-level design.

The narrative unfolds across five distinct ocean zones — Surface, Sunlight, Twilight, Midnight, and Abyss — each with its own visual identity, color palette, and interactive elements. As users scroll deeper, the environment transforms: light fades, bioluminescent particles emerge, and the typography becomes more ethereal, creating an emotional connection to the content.

The design philosophy centers on "immersion through subtlety." Rather than overwhelming users with effects, each animation serves the narrative: parallax light rays in the sunlit zone suggest refracted sunshine, floating particles in the twilight zone mimic bioluminescence, and the gradual darkening of backgrounds creates genuine depth perception.

Key technical achievements include a physics-based custom cursor with spring dynamics, scroll-linked navigation with intersection observer active states, expandable knowledge cards with shared layout animations, and seamless zone transitions using SVG wave morphing. The entire experience is built with React 18, Framer Motion 11, and Tailwind CSS, using a comprehensive design token system that ensures visual consistency across all 10+ custom ocean-themed colors.

Accessibility was prioritized throughout: all interactive elements support keyboard navigation, ARIA labels describe each zone, and the custom cursor gracefully degrades on touch devices. The result is a website that feels less like a webpage and more like diving into the ocean itself.

---

## Design Process

### 1. Concept & Research

The ocean depth theme was chosen for its natural narrative arc — a literal journey downward that maps perfectly to scroll-based storytelling. Research into marine biology provided authentic creature data and depth statistics that ground the experience in reality.

### 2. Visual Design Decisions

- **Color Palette**: HSL-based ocean colors from bright cyan (surface) to near-black (abyss), defined as CSS custom properties for consistency
- **Typography**: Playfair Display for headings (editorial, premium feel) paired with Inter for body text (clarity, readability)
- **Bioluminescent Accents**: Cyan/teal glow effects (`text-shadow`, `box-shadow`) that intensify as depth increases
- **Negative Space**: Generous padding and margins create a sense of vastness

### 3. Animation Strategy

Every animation serves one of three purposes:
1. **Environmental** — Establishing atmosphere (bubbles, particles, light rays)
2. **Navigational** — Guiding the user (scroll indicators, depth meter, nav pills)
3. **Interactive** — Rewarding engagement (card hovers, creature reveals, quote interaction)

### 4. Technical Architecture

Components follow a clear hierarchy:
- **Page Orchestrator** (`Index.tsx`) — Controls loading state and section ordering
- **Section Components** — Self-contained narrative units with their own scroll contexts
- **Shared Components** — Reusable animation wrappers (`ScrollReveal`, `ParallaxLayer`)
- **Global Components** — Persistent UI elements (`CustomCursor`, `DepthMeter`, `OceanNav`)

### 5. Responsive Approach

Mobile-first with progressive enhancement:
- Base: Stacked layouts, simplified animations, touch-optimized targets
- Tablet: Depth meter appears, grid layouts expand
- Desktop: Full cursor effects, navigation bar, maximum visual fidelity

---

## Feature Inventory

### Mandatory Requirements Checklist

| Requirement | Implementation | Status |
|------------|---------------|--------|
| 5+ narrative sections | Hero, Sunlight, Twilight, Midnight, Abyss | ✅ |
| 2+ scroll effects | Parallax layers, scroll-triggered reveals, sticky depth meter | ✅ |
| 3+ interactions | Creature cards, expandable twilight cards, quote reveal, nav clicks | ✅ |
| 3+ animations | Page loader, wave SVG morphing, bioluminescent particles, cursor | ✅ |
| Responsive design | Desktop, tablet, mobile fully tested | ✅ |

### Bonus Features

| Feature | Implementation |
|---------|---------------|
| Custom cursor | Physics-based with spring dynamics, hover detection |
| Accessibility | ARIA labels, keyboard nav, role attributes |
| Performance | SVG-based graphics, no heavy images, GPU-composited transforms |
| Section transitions | Wave, particle, and fade variants |
| Real-time depth counter | Scroll-linked depth readout in meters |

---

## Component Documentation

### PageLoader
Cinematic loading animation with depth-themed progress. Shows animated sonar rings, a progress bar, and contextual depth messages. Calls `onComplete` callback to trigger main content render.

### CustomCursor
Replaces default cursor on non-touch devices. Uses `useSpring` for smooth trailing, detects interactive elements via MutationObserver, and shows enlarged ring on hover.

### OceanNav
Fixed top navigation bar that appears after initial scroll. Uses IntersectionObserver to track active section and Framer Motion `layoutId` for the animated pill indicator.

### ScrollReveal
Reusable wrapper that triggers entry animations when elements enter the viewport. Supports four directions: up, left, right, and scale.

### SectionTransition
Decorative transitions between ocean zones. Three variants: wave (SVG morphing), particles (floating dots), and fade (gradient blend).

### CreatureCard
Interactive marine life card with hover-triggered bioluminescent glow, spring-based lift animation, and bottom glow line reveal.

### DepthMeter
Fixed right-side scroll progress indicator with gradient fill, glowing position dot, and zone depth labels.
