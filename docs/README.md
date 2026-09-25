# Salmoon (`msafdev`) Documentation Hub

Welcome to the technical documentation for **Salmoon** (`msafdev`) — a modern, high-performance portfolio, interactive UI component laboratory, SwiftUI showcase, and fullstack interactive platform built for **Muhammad Salman Alfarisi** (Product Engineer / Fullstack Developer).

---

## 📚 Documentation Index

Explore the documentation sections below for architecture deep dives, setup instructions, development standards, and feature references:

```
docs/
├── README.md               # 📍 You are here — Documentation index & overview
├── architecture.md         # 🏗️ System architecture, data flow & integration stack
├── getting-started.md      # 🚀 Setup guide, environment configuration & database schema
├── design-system.md        # 🎨 Tailwind v4 tokens, typography, motion & Radix UI
├── rules.md                # 📏 Coding rules, RSC guidelines, mutations & best practices
├── content-management.md   # 📝 Velite MDX collections, frontmatter schema & widgets
├── features.md             # ⚡ Deep dives into Lab, Infinite Canvas Notes, Guestbook & Calendar
└── walkthrough.md          # 🗺️ Codebase tour, directory map & module reference
```

---

## 🧭 Quick Navigation

| Document                                         | Description                                        | Key Topics                                                                             |
| :----------------------------------------------- | :------------------------------------------------- | :------------------------------------------------------------------------------------- |
| **[Architecture & Tech Stack](architecture.md)** | High-level system design & data pipeline           | Next.js 14 App Router, TanStack Query v5, Supabase SSR, Velite, Google Calendar API    |
| **[Getting Started](getting-started.md)**        | Local installation & environment configuration     | Bun setup, `.env.local` guide, Supabase SQL migrations, Google Service Account         |
| **[Design System & Motion](design-system.md)**   | Visual design, theme system & animation principles | Tailwind CSS v4 `@theme`, dark/light palette, Motion springs, micro-interactions       |
| **[Development Rules](rules.md)**                | Architectural rules & code style conventions       | Server vs. Client boundaries, Server Action pattern, optimistic updates, linting       |
| **[Content Management](content-management.md)**  | Writing & publishing content with Velite           | MDX posts, projects, SwiftUI components, Rehype syntax highlighting, widgets           |
| **[Feature Deep-Dives](features.md)**            | Technical breakdown of complex features            | Interactive UI Lab, Infinite Canvas Sticky Notes, Threaded Guestbook, Calendar Booking |
| **[Codebase Walkthrough](walkthrough.md)**       | Annotated directory & file structure tour          | Folder organization, key entry points, component hierarchy, utility libraries          |

---

## ⚡ Key Technologies

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions, Server Components, Route Handlers, Dynamic OpenGraph Image Generation)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
- **Animation**: [Motion](https://motion.dev/) (Framer Motion v12)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) Primitives, [Sonner](https://sonner.emilkowal.ski/) Toasts, [CMDK](https://cmdk.paco.me/)
- **Data & Auth**: [Supabase](https://supabase.com/) (`@supabase/ssr`, PostgreSQL, Row-Level Security, OAuth)
- **State & Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest) (`@tanstack/react-query`)
- **Content Engine**: [Velite](https://velite.js.org/) with [Shiki](https://shiki.style/) and Rehype plugins
- **Integrations**: [Google Calendar API](https://developers.google.com/calendar), [GitHub REST API](https://docs.github.com/en/rest)

---

## 🚀 Quick Start Summary

```bash
# 1. Install dependencies
bun install

# 2. Configure environment
cp .env.example .env.local

# 3. Start development server (Velite build + Next.js dev concurrently)
bun run dev
```

For comprehensive installation instructions, database schemas, and API key setups, visit **[Getting Started](getting-started.md)**.
