import {
  PiChatCircleTextDuotone,
  PiGithubLogoDuotone,
  PiInstagramLogoDuotone,
  PiLinkedinLogoDuotone,
  PiTwitterLogoDuotone,
} from "react-icons/pi";

import Client1 from "@/public/assets/companies/airestate.svg";
import Client6 from "@/public/assets/companies/bangkit.svg";
import Client2 from "@/public/assets/companies/contra.svg";
import Client3 from "@/public/assets/companies/dev-different.svg";
import Client5 from "@/public/assets/companies/mandiri.svg";
import Client7 from "@/public/assets/companies/mitratel.svg";
import Client4 from "@/public/assets/companies/siap-kerja.svg";

export const processItems = [
  {
    name: "Discovery",
    description:
      "I begin by understanding your goals and technical requirements to create a clear roadmap for your product.",
  },
  {
    name: "Design",
    description:
      "I will craft intuitive, user-friendly interfaces that align with your brand and optimize the user experience.",
  },
  {
    name: "Development",
    description:
      "Using modern technologies like Next.js, I will bring your design to life with responsive and performant code.",
  },
  {
    name: "Deploy",
    description:
      "I thoroughly test the site for functionality and performance, then deploy it to a hosting of your choice.",
  },
];

export const techItems = [
  // Programming Languages
  { id: "go", name: "Go Lang" },
  { id: "python", name: "Python" },
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },

  // Frontend Frameworks & Libraries
  { id: "react", name: "React" },
  { id: "next", name: "Next" },
  { id: "vue", name: "Vue" },
  { id: "nuxt", name: "Nuxt" },
  { id: "angular", name: "Angular" },
  { id: "astro", name: "Astro" },
  { id: "router", name: "Tanstack Router" },
  { id: "query", name: "Tanstack Query" },
  { id: "motion", name: "Framer Motion" },
  { id: "tailwindcss", name: "Tailwind" },

  // Backend Frameworks & Libraries
  { id: "node", name: "Node" },
  { id: "express", name: "Express" },
  { id: "laravel", name: "Laravel" },
  { id: "convex", name: "Convex" },
  { id: "trpc", name: "tRPC" },

  // Databases & ORM
  { id: "mongo", name: "MongoDB" },
  { id: "supabase", name: "Supabase" },
  { id: "prisma", name: "Prisma" },
  { id: "drizzle", name: "Drizzle" },
  { id: "redis", name: "Redis" },
  { id: "upstash", name: "Upstash" },

  // DevOps & Cloud
  { id: "docker", name: "Docker" },
  { id: "vercel", name: "Vercel" },
  { id: "cloudflare", name: "Cloudflare" },
  { id: "github", name: "GitHub" },

  // Tools & Design
  { id: "figma", name: "Figma" },
  { id: "postman", name: "Postman" },
  { id: "webflow", name: "Webflow" },
];

export const socialItems = [
  { name: "mail", href: "/contact", icon: PiChatCircleTextDuotone },
  {
    name: "twitter",
    href: "https://twitter.com/msafdev",
    icon: PiTwitterLogoDuotone,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "github",
    href: "https://github.com/msafdev",
    icon: PiGithubLogoDuotone,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "instagram",
    href: "https://instagram.com/salmonelaf",
    icon: PiInstagramLogoDuotone,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "linkedin",
    href: "https://linkedin.com/in/msafdev",
    icon: PiLinkedinLogoDuotone,
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export const clientItems = [
  Client1,
  Client2,
  Client3,
  Client4,
  Client5,
  Client6,
  Client7,
];

export const creditItems = [
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
    items: [{ name: "Nadia Lovely", href: "https://nadialovely.tech" }],
  },
  {
    category: "Libraries",
    items: [
      { name: "Shadcn", href: "https://ui.shadcn.com" },
      { name: "Origin UI", href: "https://originui.com" },
      { name: "Magic UI", href: "https://magicui.design" },
      { name: "Icons8", href: "https://icons8.com" },
      { name: "Lucide", href: "https://lucide.dev" },
      { name: "React Icons", href: "https://react-icons.github.io" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Bun", href: "https://bun.sh" },
      { name: "Npm", href: "https://npmjs.com/" },
    ],
  },
];

export const workItems = [
  {
    title: "Fullstack Developer",
    company: "Anihost",
    duration: "Jan 25 - Present",
  },
  {
    title: "Founder",
    company: "Oddin",
    duration: "May 22 - Present",
  },
  {
    title: "Fullstack Developer",
    company: "Airestate",
    country: "🇺🇸",
    duration: "Oct 24 - Dec 24",
  },
  {
    title: "Frontend Developer",
    company: "CAN Creative",
    duration: "Aug 24 - Oct 24",
  },
  {
    title: "Frontend Developer",
    company: "FN Digital",
    duration: "Oct 23 - Apr 24",
  },
  {
    title: "Project Manager",
    company: "Ministry of Manpower",
    duration: "Dec 22 - Mar 23",
  },
];

export const toolItems = [
  {
    category: "OS",
    items: ["Windows", "Linux"],
  },
  {
    category: "Device",
    items: ["iPhone XR", "Macbook M1 Pro"],
  },
  {
    category: "Shell",
    items: ["Powershell", "Bash"],
  },
  {
    category: "Browser",
    items: ["Firefox", "Arc"],
  },
  {
    category: "Development",
    items: ["Code", "Vim"],
  },
  {
    category: "Productivity",
    items: ["Notion", "Obsidian"],
  },
  {
    category: "Others",
    items: ["Jira", "ClickUp"],
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

export const bookmarkItems = [
  {
    title: "Silk",
    href: "https://silkhq.com/",
    description: "Native-like swipable sheets on the web.",
  },
  {
    title: "WebTUI",
    href: "https://webtui.ironclad.sh/",
    description: "Modular CSS library for building terminal UIs.",
  },
  {
    title: "Handy Arrows",
    href: "https://handyarrows.com/",
    description: "A collection of hand-drawn SVG arrows for your designs.",
  },
  {
    title: "Cobalt Tools",
    href: "https://cobalt.tools/",
    description: "An online video downloader from multiple sources.",
  },
  {
    title: "SVGL",
    href: "https://svgl.app/",
    description: "A collection of high-res SVG icons for your projects.",
  },
  {
    title: "Fancy Components",
    href: "https://fancycomponents.dev/",
    description: "A collection of beautiful and animated components.",
  },
];

export const bucketItems = [
  {
    title: "Cook something new",
    year: 2025,
    description: "Learned to cook soto betawi.",
    done: true,
  },
  {
    title: "Travel alone",
    year: 2025,
    description: "Traveled to Bali alone.",
    done: true,
  },
  {
    title: "Go hiking",
    year: 2024,
    description: "Hiked and camped at Mount Semeru.",
    done: true,
  },
  {
    title: "Speak at a conference",
    done: false,
  },
  {
    title: "Volunteer for a cause",
    done: false,
  },
  {
    title: "Build an award-winning app",
    done: false,
  },
  {
    title: "Get a tattoo",
    done: false,
  },
  {
    title: "Get a piercing",
    done: false,
  },
];
