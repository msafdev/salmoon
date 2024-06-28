import { 
  Home,
  Beaker,
  Book,
  Package2,
  SunMoon
 } from "lucide-react";

export const projectItems = [
  {
    title: "Background",
    stack: ["Next", "Tailwind"],
    href: "https://bg.msaf.tech",
    description: "Handpicked modern background patterns.",
  },
  {
    title: "Gem",
    stack: ["Next", "Tailwind"],
    href: "https://gem.msaf.tech",
    description: "Curated list of trending online games.",
  },
  {
    title: "Zap",
    stack: ["Next", "Tailwind"],
    href: "https://zap.msaf.tech",
    description: "Modern alternative to Pagespeed Insights.",
  },
  {
    title: "UI",
    stack: ["Next", "Tailwind"],
    href: "https://ui.msaf.tech",
    description: "Beautiful and modern UI components.",
  },
];

export const templateItems = [
  {
    title: "Linkify",
    stack: ["Next", "Tailwind"],
    href: "https://linkify-demo.vercel.app",
    description: "Modern link shortener for developers.",
  },
  {
    title: "Nextbase",
    stack: ["Next", "Tailwind", "Supabase"],
    href: "https://nextbase-demo.vercel.app",
    description: "Next.js and Supabase starter template.",
  },
  {
    title: "Macfolio",
    stack: ["Next", "Tailwind"],
    href: "https://mac.msaf.tech",
    description: "MacOS inspired portfolio template.",
  },
  {
    title: "Compactfolio",
    stack: ["Next", "Tailwind"],
    href: "https://compact.msaf.tech",
    description: "Compact and minimal portfolio template.",
  },
];

export const navItems = [
  { id: 1, label: "Home", href: "/", icon: <Home className="h-full w-full" /> },
  {
    id: 2,
    label: "Lab",
    href: "/lab",
    icon: <Beaker className="h-full w-full" />,
  },
  {
    id: 3,
    label: "Misc",
    href: "/misc",
    icon: <Package2 className="h-full w-full" />,
  },
  {
    id: 4,
    label: "Blog",
    href: "/blog",
    icon: <Book className="h-full w-full" />,
  },
  {
    id: 5,
    label: "Theme",
    icon: <SunMoon className="h-full w-full" />,
  },
]