import { Beaker, Book, Hexagon, Home, Package2 } from "lucide-react";

import Figma from "@/public/icons/figma.png";
import Git from "@/public/icons/git.png";
import NextJS from "@/public/icons/nextjs.png";
import React from "@/public/icons/react.png";
import TailwindCSS from "@/public/icons/tailwindcss.png";
import Typescript from "@/public/icons/ts.png";
import Vue from "@/public/icons/vue.png";
import Webflow from "@/public/icons/webflow.png";

export const navItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: <Home className="h-full w-full" />,
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

export const skillItems = [
  { name: "Next", icon: NextJS },
  { name: "Tailwind", icon: TailwindCSS },
  { name: "TypeScript", icon: Typescript },
  { name: "Git", icon: Git },
  { name: "Figma", icon: Figma },
  { name: "React", icon: React },
  { name: "Vue", icon: Vue },
  { name: "Webflow", icon: Webflow },
];

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
      {
        name: "Web Programming Unpas",
        href: "https://youtube.com/@sandhikagalihWPU",
      },
      { name: "Sajid", href: "https://youtube.com/@whosajid" },
      { name: "ThePrimeTime", href: "https://youtube.com/@ThePrimeTimeagen" },
    ],
  },
  {
    category: "Friends",
    items: [{ name: "Nadia Lovely", href: "https://nadialvy.com" }],
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

export const templateItems = [
  {
    title: "Linkify",
    stack: ["Next", "Tailwind"],
    href: "https://linkify-demo.vercel.app",
    description: "Linktree inspired portfolio.",
  },
  {
    title: "Nextbase",
    stack: ["Next", "Tailwind", "Supabase"],
    href: "https://nextbase-demo.vercel.app",
    description: "Next.js and Supabase starter.",
  },
  {
    title: "Macfolio",
    stack: ["Next", "Tailwind"],
    href: "https://macfolio-demo.vercel.app",
    description: "MacOS inspired portfolio.",
  },
  {
    title: "Compactfolio",
    stack: ["Next", "Tailwind"],
    href: "https://compactfolio-demo.vercel.app",
    description: "Compact and minimal portfolio.",
  },
];

export const workItems = [
  {
    title: "Founder",
    company: "Oddin",
    duration: "May 22 - Present",
  },
  {
    title: "Fullstack Developer",
    company: "Airestate",
    duration: "Oct 24 - Present",
  },
  {
    title: "Fullstack Developer",
    company: "Freelance",
    duration: "May 22 - Sept 24",
  },
  {
    title: "Frontend Developer",
    company: "CAN Creative",
    duration: "Aug 24 - Oct 24",
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

export const toolItems = [
  {
    category: "OS",
    items: ["Windows", "Linux"],
  },
  {
    category: "Device",
    items: ["iPhone XR", "ASUS TUF FX505DT"],
  },
  {
    category: "Shell",
    items: ["Powershell", "Bash"],
  },
  {
    category: "Browser",
    items: ["Firefox", "Safari"],
  },
  {
    category: "Development",
    items: ["Visual Studio Code", "Figma", "GitHub"],
  },
  {
    category: "Productivity",
    items: ["Notion", "Obsidian"],
  },
  {
    category: "Others",
    items: ["Jira", "Postman", "Slack"],
  },
];

export const quoteItems = [
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    author: "Steve Jobs",
  },
  {
    quote:
      "He who would learn to fly one day must first learn to stand and walk and run and climb and dance; one cannot fly into flying.",
    author: "Friedrich Nietzsche",
  },
  {
    quote:
      "Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, vision cleared, ambition inspired and success achieved.",
    author: "Helen Keller",
  },
  {
    quote:
      "Obstacles can't stop you. Problems can't stop you. Most of all, other people can't stop you. Only you can stop you.",
    author: "Jeffrey Gitomer",
  },
  {
    quote:
      "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph W. Emerson",
  },
];

export const inspoItems = [
  {
    category: "Creators",
    items: [
      { name: "Sam Selikoff", href: "https://youtube.com/@samselikoff" },
      { name: "Sandhika Galih", href: "https://youtube.com/@sandhikagalih" },
      { name: "Olivier Larose", href: "https://youtube.com/@olivierlarose1" },
    ],
  },
  {
    category: "Designers",
    items: [
      { name: "Dwinawan", href: "https://twitter.com/dwinawan_" },
      { name: "Oguz Yagiz Kara", href: "https://twitter.com/oguzyagizkara" },
      { name: "Ilya Miskov", href: "https://twitter.com/ilyamiskov" },
    ],
  },
  {
    category: "Engineers",
    items: [
      { name: "Lee Robinson", href: "https://leerob.io" },
      { name: "Julien Thibeaut", href: "https://ibelick.com" },
      { name: "Jakub Krehel", href: "https://kbo.sk" },
    ],
  },
];

export const resourceItems = [
  {
    title: "Clean Code — A practical approach",
    href: "https://medium.com/clarityai-engineering/clean-code-a-practical-approach-896546435235",
  },
  {
    title: "How UX can be a key differentiator for AI",
    href: "https://uxdesign.cc/user-experience-the-key-differentiator-for-ai-0d5d12fe5b08",
  },
  {
    title: "15 Time-Saving Websites Every Developer Needs",
    href: "https://javascript.plainenglish.io/15-time-saving-websites-every-developer-needs-cf76ea19e430",
  },
  {
    title: "Every React Concept Explained in 12 Minutes",
    href: "https://www.youtube.com/watch?v=wIyHSOugGGw&pp=ygUTcmVhY3QgaW4gMTIgbWludXRlcw%3D%3D",
  },
];
