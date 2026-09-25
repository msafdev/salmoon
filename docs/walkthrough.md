# Codebase Walkthrough & Directory Reference

This document provides a guided tour of the **Salmoon** (`msafdev`) repository, explaining the purpose of every directory, key entry points, route structure, and utility libraries.

---

## 🗺️ Project Directory Map

```
salmoon/
├── action/              # ⚡ Next.js Server Actions ("use server")
├── app/                 # 🌐 App Router routes, layouts, and API handlers
│   ├── (app)/           # 📱 Public application route group
│   ├── api/             # ⚙️ API routes (RSS feed, dynamic OpenGraph generators)
│   ├── auth/            # 🔐 OAuth callback route
│   └── note/            # 📌 Fullscreen Infinite Canvas Sticky Note board
├── components/          # 🧩 React UI Components
│   ├── form/            # 📝 Forms (Contact, Guestbook, Note, Reply)
│   ├── lab/             # 🧪 Laboratory component primitives & live examples
│   ├── motion/          # 🎬 Framer Motion wrappers & section animations
│   ├── section/         # 📄 Full-width page sections (Profile, Client, Project, CTA)
│   ├── shared/          # 🗂️ Cards, Dock, CMDK Command palette, MDX renderer, Widgets
│   └── ui/              # 🔘 Base Radix UI primitives (Button, Dialog, Tabs, etc.)
├── content/             # ✍️ MDX Content Sources (Posts, Projects, SwiftUI guides)
├── docs/                # 📚 Project Documentation Hub
├── hooks/               # 🪝 Custom React Hooks (Canvas drag, Note positioning, Desktop)
├── lib/                 # 🛠️ Helpers, constants, configs, date math, text highlighter
├── mutation/            # 🔄 TanStack Query mutation hooks with optimistic updates
├── public/              # 🖼️ Static assets (SVGs, icons, cover images, fonts)
├── query/               # 🔍 TanStack Query data fetching hooks
├── schema/              # 📐 Zod validation schemas
├── styles/              # 🎨 Tailwind v4 stylesheet, Shiki & MDX CSS
├── supabase/            # 🗄️ Supabase SSR client factories and middleware
├── types/               # 🏷️ TypeScript type definitions
└── velite/              # 📦 Velite helper functions and content queries
```

---

## 🚀 Key Entry Points

### 1. Root Layout (`app/layout.tsx`)

- Configures global font (**Plus Jakarta Sans** via `next/font/google`).
- Wraps application inside `<ThemeProvider>` (`next-themes`) and `<QueryProvider>` (`@tanstack/react-query`).
- Injects global Sonner toast manager (`<Toaster />`).
- Defines top-level OpenGraph, Twitter, and SEO metadata defaults.

### 2. Application Layout (`app/(app)/layout.tsx`)

- Renders `<NextTopLoader />` for instant visual feedback on client-side route transitions.
- Renders top-edge gradient fade mask.
- Injects the persistent floating navigation bar (`<Dock />`) and global command palette (`<Command />`).
- Dynamically imports the `<Footer />` component.

### 3. Middleware (`middleware.ts` & `supabase/middleware.ts`)

- Intercepts all incoming requests matching routes (excluding static assets and images).
- Calls `updateSession()` via `@supabase/ssr` to refresh expired authentication tokens automatically.

---

## 🌐 Route Structure & Feature Matrix

| Route              | Page File                            | Purpose & Components                                                                                                      |
| :----------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `/`                | `app/(app)/page.tsx`                 | **Landing Page**: Profile summary, client logos, work process breakdown, featured projects, and call-to-action section.   |
| `/archive`         | `app/(app)/archive/page.tsx`         | **Archive**: Overview of featured posts, chronological career timeline (`WorkCard`), and template side-projects.          |
| `/lab`             | `app/(app)/lab/page.tsx`             | **UI Laboratory**: Catalog grid of interactive UI components and experiments (`LabCard`).                                 |
| `/lab/[slug]`      | `app/(app)/lab/[slug]/page.tsx`      | **Lab Detail**: Interactive component sandbox, live previews, syntax-highlighted code tabs, and Tailwind config displays. |
| `/post`            | `app/(app)/post/page.tsx`            | **Blog Index**: List of all published articles with tag filters and search.                                               |
| `/post/[...slug]`  | `app/(app)/post/[...slug]/page.tsx`  | **Article Detail**: Editorial MDX reader with interactive text highlighter, reading progress, and Table of Contents.      |
| `/project/[slug]`  | `app/(app)/project/[slug]/page.tsx`  | **Project Case Study**: Detailed breakdown of client and personal software projects.                                      |
| `/swift`           | `app/(app)/swift/page.tsx`           | **SwiftUI Showcase**: Library of reusable iOS / macOS SwiftUI components.                                                 |
| `/swift/[...slug]` | `app/(app)/swift/[...slug]/page.tsx` | **SwiftUI Detail**: Component code snippets, implementation breakdown, and video/image previews.                          |
| `/guestbook`       | `app/(app)/guestbook/page.tsx`       | **Guestbook**: Community message board supporting OAuth sign-in and threaded replies.                                     |
| `/note`            | `app/note/page.tsx`                  | **Infinite Note Board**: Fullscreen draggable Cartesian canvas with radial note arrangement and pastel sticky notes.      |
| `/contact`         | `app/(app)/contact/page.tsx`         | **Contact & Booking**: Multi-step inquiry form integrated with Google Calendar availability.                              |
| `/contact/success` | `app/(app)/contact/success/page.tsx` | **Booking Confirmation**: Success screen displayed after scheduling a consultation.                                       |
| `/mentorship`      | `app/(app)/mentorship/page.tsx`      | **Mentorship**: Tailored 1-on-1 guidance booking page.                                                                    |
| `/material`        | `app/(app)/material/page.tsx`        | **Material & Stack**: Curated workstation gear, tech stack badges, designer/engineer credits, and bookmarks.              |
| `/personal`        | `app/(app)/personal/page.tsx`        | **Personal Hub**: Favorite quotes, Spotify top tracks, and top movies.                                                    |
| `/bucket-list`     | `app/(app)/bucket-list/page.tsx`     | **Bucket List**: Interactive checklist of personal life goals and milestones.                                             |
| `/api/feed`        | `app/api/feed/route.ts`              | **RSS Atom Feed**: Generates valid XML feed for RSS subscribers.                                                          |
| `/api/og/*`        | `app/api/og/route.tsx`               | **Dynamic OG**: Generates dynamic OpenGraph cards for social sharing.                                                     |
| `/auth/callback`   | `app/auth/callback/route.ts`         | **OAuth Callback**: Exchanges Supabase authorization codes for persistent session cookies.                                |

---

## 📦 Core Library & Utility Modules (`lib/`)

- [`lib/config.ts`](file:///Users/msafdev/Code/salmoon/lib/config.ts): Site metadata, author information, social links, and navigation items.
- [`lib/constants.ts`](file:///Users/msafdev/Code/salmoon/lib/constants.ts): Static data arrays (tech stack, workstation tools, quotes, bucket list items, bookmarks, credits).
- [`lib/data.ts`](file:///Users/msafdev/Code/salmoon/lib/data.ts): Component registry for `/lab` experiments.
- [`lib/calendar.ts`](file:///Users/msafdev/Code/salmoon/lib/calendar.ts): Slot construction and timezone offsets (`Asia/Jakarta`).
- [`lib/read-file.ts`](file:///Users/msafdev/Code/salmoon/lib/read-file.ts): Reads component source code directly from disk for accurate lab documentation.
- [`lib/highlight.ts`](file:///Users/msafdev/Code/salmoon/lib/highlight.ts): Custom DOM tree walker engine for text highlighting on article pages.
- [`lib/functions.ts`](file:///Users/msafdev/Code/salmoon/lib/functions.ts): General utilities (currency formatting, date formatting, relative timestamps, AST slugification).
- [`lib/utils.ts`](file:///Users/msafdev/Code/salmoon/lib/utils.ts): Standard Tailwind `cn()` helper (combining `clsx` and `tailwind-merge`).
