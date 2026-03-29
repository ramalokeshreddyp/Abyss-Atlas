# Architecture — Ocean Depths

## System Architecture

This document outlines the technical architecture of the Ocean Depths interactive storytelling experience.

## Component Architecture

```mermaid
graph TD
    A[App.tsx] --> B[Index.tsx - Page Orchestrator]
    B --> C[PageLoader]
    B --> D[CustomCursor]
    B --> E[Bubbles]
    B --> F[DepthMeter]
    B --> G[OceanNav]
    B --> H[HeroSection]
    B --> I[SunlightZone]
    B --> J[TwilightZone]
    B --> K[MidnightZone]
    B --> L[AbyssSection]
    B --> M[SectionTransition x4]
    
    I --> N[CreatureCard x4]
    I --> O[ParallaxLayer]
    I --> P[ScrollReveal]
    
    J --> P
    K --> P
    L --> P
    H --> Q[Framer Motion useScroll]
```

## Animation Pipeline

```mermaid
flowchart LR
    A[User Scrolls] --> B[scrollYProgress]
    B --> C[useTransform]
    C --> D[Parallax Offset]
    C --> E[Opacity Fade]
    C --> F[Scale Transform]
    C --> G[Background Shift]
    
    A --> H[IntersectionObserver]
    H --> I[ScrollReveal - Entry Animations]
    H --> J[OceanNav - Active Section]
    
    K[User Hover/Click] --> L[Spring Animations]
    L --> M[Cursor Resize]
    L --> N[Card Lift]
    L --> O[Glow Effect]
```

## Data Flow

```mermaid
flowchart TD
    subgraph "State Management"
        A[Loading State] -->|onComplete| B[Main Content]
        C[Selected Creature] -->|onClick| D[Fact Display]
        E[Active Section] -->|IntersectionObserver| F[Nav Pill]
        G[Scroll Progress] -->|useScroll| H[Depth Meter]
        G --> I[Depth Counter]
    end
    
    subgraph "Animation System"
        J[Framer Motion] --> K[useScroll - Scroll-linked]
        J --> L[useTransform - Value mapping]
        J --> M[useSpring - Physics-based]
        J --> N[AnimatePresence - Mount/Unmount]
        J --> O[layoutId - Shared layout]
    end
```

## Design System Architecture

```mermaid
graph TD
    A[index.css - CSS Custom Properties] --> B[tailwind.config.ts]
    B --> C[Semantic Tokens]
    
    C --> D[--background / --foreground]
    C --> E[--primary / --accent]
    C --> F[--ocean-surface to --ocean-abyss]
    C --> G[--gradient-depth / --gradient-glow]
    C --> H[--shadow-glow / --shadow-deep]
    
    I[Typography] --> J[Playfair Display - Display]
    I --> K[Inter - Body]
    
    L[Utility Classes] --> M[.text-glow]
    L --> N[.bg-ocean-gradient]
    L --> O[.shadow-glow]
```

## File Dependency Graph

```mermaid
graph LR
    subgraph Pages
        A[Index.tsx]
    end
    
    subgraph Sections
        B[HeroSection]
        C[SunlightZone]
        D[TwilightZone]
        E[MidnightZone]
        F[AbyssSection]
    end
    
    subgraph Shared Components
        G[ScrollReveal]
        H[ParallaxLayer]
        I[CreatureCard]
        J[SectionTransition]
    end
    
    subgraph Global Components
        K[CustomCursor]
        L[PageLoader]
        M[Bubbles]
        N[DepthMeter]
        O[OceanNav]
    end
    
    A --> B & C & D & E & F
    A --> J & K & L & M & N & O
    C --> G & H & I
    D --> G
    E --> G
    F --> G
```

## Performance Strategy

| Technique | Implementation |
|-----------|---------------|
| Code splitting | React.lazy for route-level splitting |
| Animation optimization | `will-change`, GPU-composited transforms |
| Reduced motion | Respects `prefers-reduced-motion` |
| Asset optimization | SVG-based graphics, no heavy images |
| Scroll optimization | `useScroll` with passive listeners |
| Component memoization | `useCallback` for stable references |

## Responsive Breakpoints

| Breakpoint | Screen | Adaptations |
|------------|--------|-------------|
| `sm` (640px) | Mobile landscape | Stack layouts, larger touch targets |
| `md` (768px) | Tablet | Show depth meter, navigation |
| `lg` (1024px) | Desktop | Full animations, custom cursor |
| `xl` (1280px) | Large desktop | Maximum visual fidelity |
