# Development Rules & Standards

This document establishes the architecture rules, code style guidelines, state management patterns, and contribution standards for **Salmoon** (`msafdev`).

---

## 🏛️ Architectural Rules & Component Boundaries

### 1. Server Components vs. Client Components

- **Server by Default**: All files in `app/` (pages, layouts, metadata resolvers) MUST be React Server Components (RSC) unless interactivity or browser APIs are required.
- **Push `"use client"` to the Leaves**: Do not mark entire route pages as `"use client"`. Encapsulate client state and browser hooks in dedicated leaf components located in `components/form/`, `components/shared/`, or `components/motion/`.
- **Server Actions**: Any asynchronous server mutation must reside in `action/` with the `"use server"` directive at the file top.

```
✅ Good:
// app/(app)/post/[...slug]/page.tsx (Server Component)
// renders <TextHighlighter> (Client Component) wrapping <Mdx>

❌ Bad:
// Marking app/(app)/post/[...slug]/page.tsx as "use client"
```

### 2. Mutation & State Flow Separation

Follow the strict 3-tier mutation architecture:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Server Action: action/note.ts ("use server")             │
│    - Validates inputs                                       │
│    - Authenticates via Supabase Server Client               │
│    - Performs database mutations & revalidates cache paths │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Mutation Hook: mutation/note.mutation.ts ("use client")  │
│    - TanStack useMutation wrapper                           │
│    - Implements optimistic UI update (onMutate)             │
│    - Invalidates query cache on success (onSuccess)        │
│    - Triggers Sonner toast feedback                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. UI Component: components/form/note-form.tsx              │
│    - Binds Formik / React state to mutation trigger         │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ Mutation & Optimistic Update Pattern

Every mutation that modifies list data (notes, guestbook entries, replies) MUST follow the TanStack Query optimistic update lifecycle:

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showMutationToast } from "@/mutation/mutation.utils";

export const useExampleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Payload) => {
      // 1. Invoke Server Action or API
      const result = await serverAction(variables);
      if (result.error) throw new Error(result.error);
      return result;
    },
    onMutate: async (newEntry) => {
      // 2. Cancel in-flight queries to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["items"] });

      // 3. Snapshot previous state
      const previousData = queryClient.getQueryData(["items"]);

      // 4. Optimistically inject placeholder item
      queryClient.setQueryData(["items"], (old: any[] = []) => [
        ...old,
        { id: Date.now(), ...newEntry },
      ]);

      return { previousData };
    },
    onSuccess: () => {
      // 5. Toast feedback & invalidate cache
      showMutationToast("Item created successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error, _variables, context) => {
      // 6. Rollback to snapshot on error
      showMutationToast(error.message ?? "Something went wrong", "error");
      if (context?.previousData) {
        queryClient.setQueryData(["items"], context.previousData);
      }
    },
  });
};
```

---

## 🛡️ Error Handling & Toast Standards

1. **Standard Server Action Response Shape**:
   Server actions must return a unified response object rather than throwing raw unhandled errors:

   ```typescript
   type ActionResponse<T = string> = { data: T } | { error: string };
   ```

2. **Toast Feedback**:
   Use `showMutationToast` from `mutation/mutation.utils.ts` to ensure consistent icon styles (`LuBadgeCheck` for success, `LuBadgeX` for destructive error) and duration (`2000ms`).

3. **Database Error Sanitization**:
   Avoid leaking internal Postgres error codes or stack traces to the user. Translate RLS permission rejections (`42501`, `PGRST301`) into actionable messages like `"Please login first"`.

---

## 📝 Form Validation Standards

All user-submitted forms (Contact form, Note submission, Guestbook entry) must combine **Zod** schema definitions with **Formik** and `zod-formik-adapter`:

1. Define schemas in `schema/` (e.g., `schema/contact-schema.ts`).
2. Utilize validator functions (`validator.isEmail`, `validator.isMobilePhone`, `validator.isCurrency`) inside Zod refinements.
3. Hook into Formik using `validationSchema={toFormikValidationSchema(contactSchema)}`.

---

## 🎨 Code Style, Formatting & Linting

### 1. Import Sorting Order

The project enforces automated import sorting via `@trivago/prettier-plugin-sort-imports` in `.prettierrc`:

```json
{
  "importOrder": [
    "^#site/(.*)$",
    "^react-icons/(.*)$",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^@/components/(.*)$",
    "^@/lib/(.*)$",
    "^@/styles/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
```

### 2. Tailwind CSS Class Sorting

`prettier-plugin-tailwindcss` automatically orders utility classes according to Tailwind conventions upon running `bun run format`.

### 3. File Naming Conventions

- **Components & Layouts**: `kebab-case.tsx` (`post-card.tsx`, `section-wrapper.tsx`)
- **Server Actions**: `kebab-case.ts` in `action/` (`auth.ts`, `calendar.ts`, `content.ts`, `note.ts`)
- **Mutation Hooks**: `<name>.mutation.ts` in `mutation/` (`note.mutation.ts`)
- **Query Hooks**: `<name>.tsx` in `query/` (`guestbook.tsx`, `note.tsx`)
- **Type Definitions**: `<name>.types.ts` in `types/` (`guestbook.types.ts`)
- **Schema Validators**: `<name>-schema.ts` in `schema/` (`contact-schema.ts`)
