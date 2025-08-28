"use client";

import {
  PiBookOpenDuotone,
  PiBriefcaseDuotone,
  PiChatCircleTextDuotone,
  PiDatabaseDuotone,
  PiGridFourDuotone,
  PiHandshakeDuotone,
  PiHouseDuotone,
  PiLightningDuotone,
  PiListChecksDuotone,
  PiNoteDuotone,
  PiNotebookDuotone,
  PiUserCircleDuotone,
  PiWarningCircleDuotone,
} from "react-icons/pi";

import * as React from "react";

import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";

import { COMPONENTS } from "@/lib/data";

const staticRoutes = [
  { path: "/post", label: "Post", icon: PiNotebookDuotone },
  { path: "/archive", label: "Archive", icon: PiBriefcaseDuotone },
  { path: "/lab", label: "Lab", icon: PiLightningDuotone },
  { path: "/material", label: "Material", icon: PiDatabaseDuotone },
  { path: "/guestbook", label: "Guestbook", icon: PiBookOpenDuotone },
  { path: "/note", label: "Note", icon: PiNoteDuotone },
  { path: "/personal", label: "Personal", icon: PiUserCircleDuotone },
  { path: "/contact", label: "Contact", icon: PiChatCircleTextDuotone },
  { path: "/bucket-list", label: "Bucket List", icon: PiListChecksDuotone },
  { path: "/mentorship", label: "Mentorship", icon: PiHandshakeDuotone },
  { path: "/404", label: "Not Found", icon: PiWarningCircleDuotone },
] as const;

const SUGGESTED_PAGES = staticRoutes.slice(0, 2);
const RECENT_COMPONENTS = COMPONENTS.slice(0, 2);

function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

type PageItem = {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  _key: string;
};
type LabItem = { slug: string; name: string; _key: string };

const PAGES_INDEX: PageItem[] = staticRoutes.map((r) => ({
  ...r,
  _key: `${r.label} ${r.path}`.toLowerCase(),
}));

const LAB_INDEX: LabItem[] = COMPONENTS.map((c) => ({
  ...c,
  _key: `${c.name} ${c.slug}`.toLowerCase(),
}));

export default function Command() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const debouncedQuery = useDebouncedValue(query, 250);
  const hasQuery = debouncedQuery.trim().length > 0;

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", onKey, { passive: false });
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();

        const root = containerRef.current ?? document;
        const active =
          root.querySelector<HTMLElement>(
            "[cmdk-list] [cmdk-item][data-selected='true']",
          ) ??
          root.querySelector<HTMLElement>("[cmdk-item][data-selected='true']");
        active?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const { pageResults, componentResults } = React.useMemo(() => {
    if (!hasQuery)
      return {
        pageResults: [] as PageItem[],
        componentResults: [] as LabItem[],
      };

    const q = debouncedQuery.toLowerCase();
    const pageResults = PAGES_INDEX.filter((it) => it._key.includes(q));
    const componentResults = LAB_INDEX.filter((it) => it._key.includes(q));

    return { pageResults, componentResults };
  }, [debouncedQuery, hasQuery]);

  const go = React.useCallback(
    (href: string) => {
      router.push(href);
      setOpen(false);
    },
    [router],
  );

  const showSuggestions = !hasQuery;
  const hasResults = pageResults.length > 0 || componentResults.length > 0;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Command Interface</DialogTitle>

      <div ref={containerRef} className="flex flex-col">
        <CommandInput
          placeholder="Search pages or components…"
          value={query}
          onValueChange={(v) => setQuery(v)}
          aria-label="Search"
        />
        <CommandList className="no-scrollbar max-h-[60vh] overflow-auto">
          {hasQuery && !hasResults && (
            <CommandGroup heading="Suggestion">
              <CommandItem value="/" onSelect={(value) => go(value)}>
                <PiHouseDuotone className="mr-2 size-4" />
                <span className="font-medium">Home</span>
              </CommandItem>
            </CommandGroup>
          )}

          {showSuggestions && (
            <>
              <CommandGroup heading="Page">
                {SUGGESTED_PAGES.map(({ path, label, icon: Icon }) => (
                  <CommandItem
                    key={path}
                    value={path}
                    onSelect={(value) => go(value)}
                  >
                    <Icon className="mr-2 size-4" />
                    <span className="font-medium">{label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Recent">
                {RECENT_COMPONENTS.map((c) => {
                  const href = `/lab/${c.slug}`;
                  return (
                    <CommandItem
                      key={c.slug}
                      value={href}
                      onSelect={(value) => go(value)}
                    >
                      <PiGridFourDuotone className="mr-2 size-4" />
                      <span className="font-medium">{c.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

          {!showSuggestions && hasResults && (
            <>
              {pageResults.length > 0 && (
                <CommandGroup heading="Page">
                  {pageResults.map(({ path, label, icon: Icon }) => (
                    <CommandItem
                      key={path}
                      value={path}
                      onSelect={(value) => go(value)}
                    >
                      <Icon className="mr-2 size-4" />
                      <span className="font-medium">{label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {componentResults.length > 0 && (
                <CommandGroup heading="Lab">
                  {componentResults.map((c) => {
                    const href = `/lab/${c.slug}`;
                    return (
                      <CommandItem
                        key={c.slug}
                        value={href}
                        onSelect={(value) => go(value)}
                      >
                        <PiGridFourDuotone className="mr-2 size-4" />
                        <span className="font-medium">{c.name}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>

        {/* footer / legend */}
        <div className="text-muted-foreground flex items-center justify-between border-t px-3 py-2 text-xs">
          <div className="flex items-center gap-3">
            <Legend hint="Execute">
              <Kbd>Enter</Kbd>
            </Legend>
            <Legend hint="Navigate">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
            </Legend>
          </div>
          <div>
            <Legend hint="Close">
              <Kbd>Esc</Kbd>
            </Legend>
          </div>
        </div>
      </div>
    </CommandDialog>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="bg-muted text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-[12px] leading-none font-medium">
      {children}
    </kbd>
  );
}

function Legend({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className="text-muted-foreground text-[12px] leading-none font-medium"
      >
        {hint}
      </span>
      <span className="inline-flex items-center gap-1">{children}</span>
    </span>
  );
}
