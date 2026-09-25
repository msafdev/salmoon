# Design System & Motion

This document outlines the visual philosophy, design tokens, typography, component library, and animation principles used in **Salmoon** (`msafdev`).

---

## 🎨 Design Philosophy

The design identity reflects a **minimalist, tactile, and craft-first aesthetic**:

1. **Content-First Typography**: Clean, legible editorial layout with generous breathing room and distinct hierarchy.
2. **Subtle Tactility**: Micro-borders, dashed outlines, dashed code containers, and frosted glass elements.
3. **Intentional Motion**: Physics-based spring animations for interactive items (Dock, Sticky Notes, Modal transitions) and orchestrated staggers for page elements.
4. **Adaptive Theming**: Seamless dark and light themes powered by CSS variables with instant, flicker-free hydration.

---

## 🌈 Theme Tokens & Colors (Tailwind CSS v4)

The project leverages **Tailwind CSS v4** with CSS theme variables defined in `styles/globals.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme {
  --breakpoint-xs: 440px;
  --breakpoint-2xl: 1440px;
  --font-jakarta-plus: var(--font-jakarta-plus);

  /* Semantic Theme Color Tokens */
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
}
```

### Light & Dark Color Mapping

| Token                | Light Mode (HSL)    | Dark Mode (HSL)             | Usage                                    |
| :------------------- | :------------------ | :-------------------------- | :--------------------------------------- |
| `--background`       | `0 0% 100%` (White) | `240 10% 3.9%` (Near Black) | Canvas / viewport background             |
| `--foreground`       | `240 10% 3.9%`      | `0 0% 98%`                  | Primary text and headings                |
| `--muted`            | `240 4.8% 95.9%`    | `240 3.7% 15.9%`            | Inactive backgrounds, badge fills        |
| `--muted-foreground` | `240 3.8% 46.1%`    | `240 5% 64.9%`              | Secondary text, captions, dates          |
| `--border`           | `240 5.9% 90%`      | `240 3.7% 15.9%`            | Dividers, card boundaries, dashed boxes  |
| `--primary`          | `240 5.9% 10%`      | `0 0% 98%`                  | High-emphasis buttons, active tabs       |
| `--popover`          | `0 0% 100%`         | `240 10% 3.9%`              | Floating Dock, Command palette, tooltips |

---

## 🔤 Typography & Hierarchy

The application combines a modern sans-serif font for readability with custom serif accents:

1. **Primary Sans-Serif**: **Plus Jakarta Sans** (Google Fonts)
   - Loaded via `next/font/google` in `app/layout.tsx`.
   - Weights: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold).
   - Applied globally to body and UI elements via `font-jakarta-plus`.

2. **Accents & Serif**: **Instrument Serif** (`/public/fonts/InstrumentSerif.ttf`)
   - Used selectively for titles, decorative quotes, and brand accents.

### Standard Type Scale

| Level              | Size / Weight                                  | Usage                              | Example                               |
| :----------------- | :--------------------------------------------- | :--------------------------------- | :------------------------------------ |
| **Hero Title**     | `text-2xl font-bold`                           | Page titles, major section headers | `<h1>My grand archive</h1>`           |
| **Section Header** | `text-base font-semibold`                      | Sub-sections, component titles     | `<h2>Featured posts</h2>`             |
| **Body Text**      | `text-sm leading-normal text-muted-foreground` | Paragraphs, descriptions           | `<p>I am a sentimental person...</p>` |
| **Micro Text**     | `text-xs font-medium`                          | Timestamps, badge labels, metadata | `<span>3 days ago</span>`             |
| **Code / Mono**    | `font-mono text-sm`                            | Code blocks, inline `<code>`, keys | `<kbd>Cmd + K</kbd>`                  |

---

## 🎬 Animation Principles & Motion

Animations are built with **Motion** (`motion/react` v12) to ensure consistent, physics-based UI feedback.

### 1. Spring Physics Configuration

Interactive floating components (such as the Dock tab active indicator) use spring physics for snappy, natural motion:

```tsx
transition={{
  type: "spring",
  bounce: 0.2,
  duration: 0.6,
  opacity: { delay: 0.6 }
}}
```

### 2. Page & Section Transitions

Pages in `app/(app)` are wrapped with `SectionWrapper` (`components/motion/section-wrapper.tsx`) and `template.tsx` to ensure smooth route entry:

- Initial state: `opacity: 0, y: 12`
- Animate state: `opacity: 1, y: 0`
- Exit state: `opacity: 0, y: -12`
- Transition: `ease: [0.22, 1, 0.36, 1], duration: 0.4`

### 3. Custom CSS Keyframes

Declared in Tailwind v4 theme:

- `shimmer`: Linear shimmer effect across skeleton placeholders (`1.6s infinite`)
- `wave`: Subtle pulsing translation for live activity badges (`1.2s ease-in-out infinite`)
- `hourglass`: Infinite 360-degree flip animation for waiting states (`2s ease-in-out infinite`)
- `text-shimmer`: Gradient sheen moving across text headers (`6.4s infinite`)

---

## 🧩 Reusable Component Architecture

```
components/
├── ui/              # Radix UI primitives (Button, Dialog, Popover, Select, Tabs, Toaster)
├── shared/          # Application-level building blocks
│   ├── cards/       # PostCard, TemplateCard, WorkCard, LabCard, NoteCard, QuoteCard
│   ├── groups/      # BookmarkGroup, TrackGroup, MovieGroup, SwiftGroup
│   ├── widgets/     # ActivityWidget, RepoWidget, NoteWidget
│   ├── dock.tsx     # Floating navigation dock with mix-blend active indicator
│   ├── command.tsx  # Global CMDK search modal
│   └── mdx.tsx      # MDX renderer with custom components & syntax highlighting
├── motion/          # Framer Motion layout wrappers
└── lab/             # UI laboratory primitives & live interactive examples
```

### Dock Component Design Pattern

The Floating Dock (`components/shared/dock.tsx`):

- Positioned fixed at `bottom-8` with dynamic auto-centering.
- Includes a sliding background highlight with `mix-blend-difference` that follows the active navigation route.
- Renders lightweight hover tooltips on desktop viewports.
- Integrates theme toggle with instant Sun/Moon icon swap.
