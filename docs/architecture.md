# Architecture & System Design

This document details the system architecture, component relationships, data flow models, and integration mechanisms powering **Salmoon** (`msafdev`).

---

## 🏗️ High-Level System Architecture

```mermaid
flowchart TD
    subgraph Client["Client Browser"]
        UI["React 18 / Motion UI"]
        Cmdk["CMDK Command Palette"]
        Canvas["Infinite Note Canvas"]
        TQ["TanStack Query Cache"]
        Highlighter["Text Highlighter Engine"]
    end

    subgraph NextServer["Next.js 14 App Server"]
        RSC["React Server Components"]
        SA["Server Actions (/action)"]
        Routes["API Route Handlers (/api)"]
        OG["Dynamic OG Generator (/api/og)"]
        AuthRoute["OAuth Callback (/auth/callback)"]
        MW["Supabase Auth Middleware"]
    end

    subgraph ContentLayer["Velite Content Engine"]
        MDXFiles["MDX Sources (/content)"]
        VeliteConfig["velite.config.ts"]
        RehypePlugins["Rehype / Shiki AST Pipeline"]
        VeliteData[".velite Static JSON & Output"]
    end

    subgraph ExternalServices["Third-Party Services & APIs"]
        SupabaseDB[("Supabase PostgreSQL & Auth")]
        GoogleCal["Google Calendar API (v3)"]
        GitHubAPI["GitHub REST API"]
    end

    %% Client to Server
    UI -->|Render & Navigation| RSC
    UI -->|Mutations & Server Calls| SA
    Cmdk -->|Navigate| UI
    Canvas -->|Drag & Zoom Events| UI
    TQ -->|Optimistic UI Updates| UI

    %% Server to Third-Party
    SA -->|Read/Write Tables| SupabaseDB
    SA -->|Check Slots / Create Event| GoogleCal
    Routes -->|Fetch Repo Data| GitHubAPI
    AuthRoute -->|Exchange OAuth Code| SupabaseDB
    MW -->|Refresh Session Cookie| SupabaseDB

    %% Velite pipeline
    MDXFiles --> VeliteConfig
    VeliteConfig --> RehypePlugins
    RehypePlugins --> VeliteData
    VeliteData --> RSC
```

---

## 🧩 Architectural Layers

### 1. Presentation & Interaction Layer

- **React Server Components (RSC)**: Used by default for all page components (`app/(app)/**/page.tsx`), static layouts, and SEO metadata generation (`generateMetadata`).
- **Interactive Islands (`use client`)**: Used for components requiring DOM access, pointer interactions, client-side state, or animation hooks:
  - Sticky Note Canvas (`useCanvasDrag`, `useStickyNotes`)
  - Command Palette (`cmdk`, `useDebouncedValue`)
  - Floating Dock navigation (`motion/react`, `useTheme`)
  - Form interactions (`formik`, `zod-formik-adapter`)
  - Text selection highlighter (`window.getSelection`, `document.createTreeWalker`)

### 2. State & Mutation Architecture

The application decouples client mutations from server mutations:

- **Server Actions (`/action`)**: Pure server-side logic executed via Next.js Server Actions (`use server`). They handle authentication checks, validation, database operations via `@supabase/ssr`, and Google API requests.
- **Query Hooks (`/query`)**: Client-side data fetching encapsulated in TanStack Query hooks (`useNote`, `useGuestbook`, `useGithubRepo`).
- **Mutation Hooks (`/mutation`)**: TanStack `useMutation` hooks wrapping server actions or direct Supabase client calls. These provide:
  - **Optimistic UI updates** (`onMutate`)
  - **Automatic cache invalidation** (`onSuccess`)
  - **Context rollbacks** (`onError`)
  - **Standardized user feedback** via `sonner` toasts

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Component as UI Component (Form/Note)
    participant Mutation as TanStack Mutation (/mutation)
    participant TQCache as TanStack Query Cache
    participant ServerAction as Server Action (/action)
    participant Supabase as Supabase DB

    User->>Component: Submit note / guestbook entry
    Component->>Mutation: Trigger mutate()
    Mutation->>TQCache: onMutate: Apply optimistic update
    TQCache-->>Component: Re-render UI immediately
    Mutation->>ServerAction: Invoke server action
    ServerAction->>Supabase: Execute DB insert/update with RLS
    alt Success
        Supabase-->>ServerAction: Return record
        ServerAction-->>Mutation: Return success
        Mutation->>TQCache: Invalidate & refetch query
        Mutation->>User: Display success toast (Sonner)
    else Failure
        Supabase-->>ServerAction: Error (e.g. Unauthorized)
        ServerAction-->>Mutation: Return error
        Mutation->>TQCache: Rollback to previous snapshot
        Mutation->>User: Display error toast (Sonner)
    end
```

---

## 🗄️ Content Pipeline (Velite & MDX)

Content is managed using [Velite](https://velite.js.org/), an ahead-of-time content compiler that validates frontmatter with Zod schemas and processes MDX files into type-safe JavaScript modules:

```mermaid
flowchart LR
    MDX["MDX File\n(content/post/*.mdx)"] --> Schema["Zod Schema\n(velite.config.ts)"]
    Schema --> Rehype["Rehype Plugins\n- rehype-slug\n- rehype-pretty-code\n- rehype-autolink\n- rehype-extract-toc"]
    Rehype --> Output[".velite/index.js\nTyped Content & TOC"]
    Output --> RSC["Next.js RSC Page\n(app/(app)/post/[...slug]/page.tsx)"]
    Output --> Feed["RSS Feed\n(app/api/feed/route.ts)"]
```

### Content Collections

1. **`Post` (`content/post/**/\*.mdx`)\*\*: Blog posts, technical articles, and musings. Includes tags, featured flags, reading estimates, and automatic table-of-contents extraction.
2. **`Project` (`content/project/**/\*.mdx`)\*\*: Portfolio case studies with technology stack badges, project links, and screenshots.
3. **`Swift` (`content/swift/**/\*.mdx`)\*\*: SwiftUI component catalog entries with source code, preview tabs, and implementation notes.

---

## 🔐 Authentication & Session Management

Authentication is powered by **Supabase Auth** with OAuth providers (GitHub & Google):

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Browser as Browser Client
    participant Middleware as Next.js Middleware (middleware.ts)
    participant Callback as Auth Route (/auth/callback)
    participant SupabaseAuth as Supabase Auth Server

    User->>Browser: Click "Sign in with GitHub"
    Browser->>SupabaseAuth: Redirect to OAuth provider with redirectTo=/auth/callback
    User->>SupabaseAuth: Authorize application
    SupabaseAuth->>Callback: Redirect with authorization code (?code=...)
    Callback->>SupabaseAuth: exchangeCodeForSession(code)
    SupabaseAuth-->>Callback: Set session cookies (access_token, refresh_token)
    Callback->>Browser: Redirect user back to target page (next param)

    loop Every Navigation Request
        Browser->>Middleware: Send request with Supabase cookies
        Middleware->>SupabaseAuth: updateSession() / getUser()
        SupabaseAuth-->>Middleware: Validate & refresh expired tokens
        Middleware-->>Browser: Proceed with refreshed cookies attached
    end
```

---

## 📅 Google Calendar Availability Engine

The `/contact` and `/mentorship` booking flows integrate with the **Google Calendar API v3** using a service account:

1. **Slot Generation**: Given a target date, `buildDateSlots()` constructs predefined 20-minute consultation windows between `09:00` and `20:00` in the `Asia/Jakarta` timezone.
2. **Conflict Resolution**: `calendar.events.list()` queries all scheduled events in the target date range. Slots intersecting existing calendar events are removed.
3. **Event Booking**: `createMeeting()` constructs an event payload including client contact details, selected services, budget, and custom message, scheduling the event with email notifications.

---

## 🖼️ OpenGraph & Feed Generation

- **Dynamic OpenGraph Images**: Built using Next.js `ImageResponse` (backed by `@vercel/og` / Satori). Endpoints at `/api/og`, `/api/og/post`, and `/api/og/lab` dynamically render PNG cards matching the dark/light aesthetic.
- **RSS / Atom Feed**: Built with `rss` in `app/api/feed/route.ts`, publishing all published blog posts as standard XML for RSS readers.
