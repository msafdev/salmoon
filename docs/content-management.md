# Content Management & Velite MDX

This document explains how content is authored, compiled, and rendered using **[Velite](https://velite.js.org/)** and **MDX** across **Salmoon** (`msafdev`).

---

## ⚙️ Content Engine Architecture

Content in `content/` is strictly typed and compiled ahead of time by Velite into `.velite/index.js`, providing type-safe imports like `import { posts, projects, swifts } from "#site/content"`.

```
content/
├── post/               # Articles & tutorials (.mdx)
├── project/            # Portfolio case studies (.mdx)
├── swift/              # SwiftUI component guides (.mdx)
└── learn/              # Learning roadmaps & guides (.mdx)
```

---

## 📑 Collection Schemas (`velite.config.ts`)

### 1. Posts Collection (`content/post/**/*.mdx`)

Articles with tags, cover image, publication status, and featured toggle:

```typescript
const posts = defineCollection({
  name: "Post",
  pattern: "post/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      image: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      published: s.boolean().default(true),
      featured: s.boolean().default(false),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
    })),
});
```

#### Post Frontmatter Example

```yaml
---
title: "React Data Fetching in 2026"
description: "A comprehensive guide on Server Components, TanStack Query, and optimistic UI."
date: "2026-03-15"
image: "/post/react-data-fetching.webp"
published: true
featured: true
tags: ["react", "nextjs", "frontend"]
---
Your MDX content starts here...
```

---

### 2. Projects Collection (`content/project/**/*.mdx`)

Portfolio case studies with technology stack badges:

```typescript
const projects = defineCollection({
  name: "Project",
  pattern: "project/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      stack: s.array(s.string()).optional(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
    })),
});
```

---

### 3. SwiftUI Collection (`content/swift/**/*.mdx`)

SwiftUI component catalog entries with multi-component code blocks, preview screenshots, and implementation code:

```typescript
const swifts = defineCollection({
  name: "Swift",
  pattern: "swift/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      published: s.boolean().default(true),
      image: s.string().max(99),
      components: s
        .array(
          s.object({
            name: s.string(),
            code: s.string(),
            implementation: s.string().optional(),
            image: s.string(),
          }),
        )
        .optional(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
    })),
});
```

---

## 🎨 Markdown & MDX Custom Widgets

The MDX rendering engine in `components/shared/mdx.tsx` embeds interactive React widgets directly into markdown content:

### 1. Embedded GitHub Repository Widget

Displays real-time repository stars, forks, language, and link:

```mdx
<RepoWidget repo="msafdev/salmoon" />
```

### 2. GitHub Activity Contribution Widget

Renders a user's GitHub contribution calendar:

```mdx
<ActivityWidget user="msafdev" />
```

### 3. Code Blocks & Syntax Highlighting

Code blocks are processed via `rehype-pretty-code` and `shiki`:

- Automatic theme switching between `github-dark` and `github-light`.
- Copy-to-clipboard button.
- Optional line numbers and line shine animations.

```typescript
// Code snippet rendered with syntax highlighting
export function helloWorld(): string {
  return "Hello from Salmoon!";
}
```

### 4. Interactive Text Highlighter

Articles wrapped in `<TextHighlighter>` (`components/shared/highlighter.tsx`) allow readers to select text, apply persistent pastel highlighters (Dawn, Blush, Lagoon, Mint, Lilac), and unwrap highlights.

---

## ✍️ How to Publish a New Article

1. Create a new MDX file in `content/post/<your-post-slug>.mdx`.
2. Add the required YAML frontmatter (`title`, `description`, `date`, `image`, `published: true`).
3. Add a cover image under `public/post/<your-image>.webp`.
4. Run `bun run dev` to verify the article renders properly at `http://localhost:3000/post/<your-post-slug>`.
5. The post will automatically appear in:
   - `/post` listing page
   - `/archive` featured section (if `featured: true`)
   - `/api/feed` RSS Atom feed
   - Dynamic OpenGraph preview cards (`/api/og/post?title=...`)
