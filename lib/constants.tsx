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

// prettier-ignore
export const quoteItems = [
  {
    id: 1,
    quote:
      "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    author: "Steve Jobs",
  },
  {
    id: 2,
    quote:
      "You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.",
    author: "John Lennon",
  },
  {
    id: 3,
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    id: 4,
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    id: 5,
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    id: 6,
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    id: 7,
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    id: 8,
    quote:
      "Keep smiling, because life is a beautiful thing and there's so much to smile about.",
    author: "Marilyn Monroe",
  },
  {
    id: 9,
    quote:
      "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    author: "Albert Schweitzer",
  },
  {
    id: 10,
    quote: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
  },
  {
    id: 11,
    quote:
      "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    id: 12,
    quote:
      "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
  },
];

// prettier-ignore
export const projectItems = [
  {
    title: "Pameraja",
    href: "https://pameraja.vercel.app",
    description: "Place to share your links and ideas.",
  },
  {
    title: "Gem",
    href: "https://gem.msaf.tech",
    description: "Curated list of trending online games.",
  },
  {
    title: "Zap",
    href: "https://zap.msaf.tech",
    description: "Modern alternative to Pagespeed Insights.",
  },
  {
    title: "Background",
    href: "https://bg.msaf.tech",
    description: "Handpicked modern background patterns.",
  },
  {
    title: "UI",
    href: "https://ui.msaf.tech",
    description: "Beautiful and modern UI components.",
  },
];

export const recentProjects = projectItems.slice(1, projectItems.length);

// prettier-ignore
export const templateItems = [
  {
    title: "Linkify",
    stack: ["Next", "Tailwind"],
    href: "https://linkify-demo.vercel.app",
    description: "Linktree inspired portfolio template.",
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
    href: "https://macfolio-demo.vercel.app",
    description: "MacOS inspired portfolio template.",
  },
  {
    title: "Compactfolio",
    stack: ["Next", "Tailwind"],
    href: "https://compactfolio-demo.vercel.app",
    description: "Compact and minimal portfolio template.",
  },
];

// prettier-ignore
export const workItems = [
  {
    title: "Fullstack Developer",
    company: "Freelance",
    duration: "Mei 23",
  },
  {
    title: "Cloud Computing Cohort",
    company: "Bangkit Academy",
    duration: "Feb 24 - Jul 24",
  },
  {
    title: "Frontend Developer",
    company: "Fndigitalcode",
    duration: "Oct 23 - Apr 24",
  },
  {
    title: "Laboratory Assistant",
    company: "Diponegoro University",
    duration: "Aug 22 - Dec 23",
  },
  {
    title: "Frontend Developer",
    company: "Ministry of Manpower",
    duration: "Jan 23 - Mar 23",
  },
];

// prettier-ignore
export const toolItems = [
  {
    category: "Workstation",
    items: ["ASUS TUF FX505DT", "iPhone XR"],
  },
  {
    category: "Peripheral",
    items: ["Logitech G102", "Rexus Ayaka TKL"],
  },
  {
    category: "Productivity",
    items: ["Safari", "Obsidian", "Slack"],
  },
  {
    category: "Development",
    items: ["Visual Studio Code", "JetBrains IDEs", "GitHub Desktop", "Figma", "Postman", "SourceTree"],
  },
  {
    category: "Inspiration",
    items: ["dribbble.com", "layers.to", "godly.website"],
  },
];
