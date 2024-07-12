import { Beaker, Book, Hexagon, Home, Package2 } from "lucide-react";

import Bash from "@/public/icons/bash.png";
import Figma from "@/public/icons/figma.png";
import Git from "@/public/icons/git.png";
import Jira from "@/public/icons/jira.png";
import JS from "@/public/icons/js.png";
import NextJS from "@/public/icons/nextjs.png";
import Notion from "@/public/icons/notion.png";
import React from "@/public/icons/react.png";
import Slack from "@/public/icons/slack.png";
import TailwindCSS from "@/public/icons/tailwindcss.png";
import TS from "@/public/icons/ts.png";
import VSC from "@/public/icons/vsc.png";
import Vue from "@/public/icons/vue.png";
import Webflow from "@/public/icons/webflow.png";

// prettier-ignore
export const navItems = [
  { 
    id: 1, 
    label: "Home", 
    href: "/", 
    icon: <Home className="h-full w-full" /> 
  },
  {
    id: 2,
    label: "About",
    href: "/about",
    icon: <Package2 className="h-full w-full" />,
  },
  {
    id: 3,
    label: "Lab",
    href: "/lab",
    icon: <Beaker className="h-full w-full" />,
  },
  {
    id: 4,
    label: "Archive",
    href: "/archive",
    icon: <Book className="h-full w-full" />,
  },
  {
    id: 5,
    label: "Theme",
    icon: <Hexagon className="h-full w-full" />,
  },
];

// prettier-ignore
export const skillItems = [
  { name: "Next", icon: NextJS },
  { name: "Tailwind", icon: TailwindCSS },
  { name: "TypeScript", icon: TS },
  { name: "JavaScript", icon: JS },
  { name: "Git", icon: Git },
  { name: "Figma", icon: Figma },
  { name: "Notion", icon: Notion },
  { name: "Jira", icon: Jira },
  { name: "Bash", icon: Bash },
  { name: "VS Code", icon: VSC },
  { name: "Slack", icon: Slack },
  { name: "React", icon: React },
  { name: "Vue", icon: Vue },
  { name: "Webflow", icon: Webflow },
];

// prettier-ignore
export const creditList = [
  {
    category: "Engineers",
    items: [
      { name: "Jakub Krehel", href: "https://kbo.sk" },
      { name: "Lee Robinson", href: "https://leerob.io" },
      { name: "Julien Thibeaut", href: "https://ibelick.com" },
      { name: "Sam Selikoff", href: "https://samselikoff.com" },
    ],
  },
  {
    category: "Designers",
    items: [
      { name: "Darius Dan", href: "https://dariusdan.com" },
      { name: "Tanbir", href: "https://tanbir.framer.website" },
      { name: "Via", href: "https://pricharielp.space" },
    ],
  },
  {
    category: "Creators",
    items: [
      { name: "Web Programming Unpas", href: "https://www.youtube.com/@sandhikagalihWPU"},
      { name: "Sajid", href: "https://www.youtube.com/@whosajid" },
      { name: "ThePrimeTime", href: "https://www.youtube.com/@ThePrimeTimeagen" },
    ],
  },
  {
    category: "Friends",
    items: [
      { name: "Nadia Lovely", href: "https://nadialvy.com" },
    ],
  },
  {
    category: "Libraries",
    items: [
      { name: "Shadcn", href: "https://ui.shadcn.com" },
      { name: "Magic UI", href: "https://magicui.design" },
      { name: "Icons8", href: "https://icons8.com" },
      { name: "Lucide", href: "https://lucide.dev" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Bun", href: "https://bun.sh" },
      { name: "Vercel", href: "https://vercel.com" },
      { name: "Supabase", href: "https://supabase.io" },
    ],
  },
];
