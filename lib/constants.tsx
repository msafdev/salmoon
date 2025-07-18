import {
  PiBriefcaseDuotone,
  PiCircleDuotone,
  PiDatabaseDuotone,
  PiGithubLogoDuotone,
  PiHouseDuotone,
  PiInstagramLogoDuotone,
  PiLightningDuotone,
  PiLinkedinLogoDuotone,
  PiReadCvLogoDuotone,
  PiRocketLaunchDuotone,
  PiTwitterLogoDuotone,
} from "react-icons/pi";

import Place1 from "@/public/images/places/place-1.avif";
import Place2 from "@/public/images/places/place-2.avif";
import Place3 from "@/public/images/places/place-3.avif";
import Place4 from "@/public/images/places/place-4.avif";

export const siteItems = {
  name: "Salman Alfarisi",
  url: "https://salmoon.vercel.app",
  role: "Fullstack Engineer",
  links: {
    twitter: "https://twitter.com/sal__moon",
    github: "https://github.com/msafdev",
    email: "salmanalfarisi261002@gmail.com",
    personalSite: "https://salmoon.vercel.app",
  },
};

export const navItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: <PiHouseDuotone className="h-full w-full" />,
  },
  {
    id: 2,
    label: "Archive",
    href: "/archive",
    icon: <PiBriefcaseDuotone className="h-full w-full" />,
  },
  {
    id: 3,
    label: "Lab",
    href: "/lab",
    icon: <PiLightningDuotone className="h-full w-full" />,
  },
  {
    id: 4,
    label: "Material",
    href: "/material",
    icon: <PiDatabaseDuotone className="h-full w-full" />,
  },
  {
    id: 5,
    label: "Theme",
    function: "toggle-theme",
    icon: <PiCircleDuotone className="h-full w-full" />,
  },
];

export const placeItems = [
  {
    id: 1,
    src: Place1,
    rotation: -5,
  },
  {
    id: 2,
    src: Place2,
    rotation: 8,
  },
  {
    id: 3,
    src: Place3,
    rotation: -3,
  },
  {
    id: 4,
    src: Place4,
    rotation: 10,
  },
];

export const processItems = [
  {
    id: 1,
    name: "Discovery",
    description:
      "I begin by understanding your goals and technical requirements to create a clear roadmap for your product.",
  },
  {
    id: 2,
    name: "Design",
    description:
      "I will craft intuitive, user-friendly interfaces that align with your brand and optimize the user experience.",
  },
  {
    id: 3,
    name: "Development",
    description:
      "Using modern technologies like Next.js, I will bring your design to life with responsive and performant code.",
  },
  {
    id: 4,
    name: "Deploy",
    description:
      "I thoroughly test the site for functionality and performance, then deploy it to a hosting of your choice.",
  },
];

export const techItems = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "golang", name: "Go Lang" },
  { id: "python", name: "Python" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "next", name: "Next" },
  { id: "vue", name: "Vue" },
  { id: "laravel", name: "Laravel" },
  { id: "nodemon", name: "Nodemon" },
  { id: "express", name: "Express" },
  { id: "react", name: "React" },
  { id: "table", name: "Tanstack Table" },
  { id: "router", name: "Tanstack Router" },
  { id: "query", name: "Tanstack Query" },
  { id: "motion", name: "Framer Motion" },
  { id: "mongo", name: "MongoDB" },
  { id: "supabase", name: "Supabase" },
  { id: "prisma", name: "Prisma" },
  { id: "tailwind", name: "Tailwind" },
  { id: "figma", name: "Figma" },
  { id: "postman", name: "Postman" },
  { id: "github", name: "GitHub" },
  { id: "vercel", name: "Vercel" },
  { id: "cloudflare", name: "Cloudflare" },
];

export const socialItems = [
  { name: "mail", href: "/contact", icon: PiRocketLaunchDuotone },
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
  {
    name: "readcv",
    href: "https://read.cv/msafdev",
    icon: PiReadCvLogoDuotone,
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export const clientItems = [
  "/assets/companies/airestate.svg",
  "/assets/companies/contra.svg",
  "/assets/companies/dev-different.svg",
  "/assets/companies/siap-kerja.svg",
  "/assets/companies/mandiri.svg",
  "/assets/companies/bangkit.svg",
  "/assets/companies/mitratel.svg",
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

export const projectItems = [
  {
    title: "Zap",
    href: "https://zap-salmoon.vercel.app",
    description: "Modern alternative to Pagespeed Insights.",
  },
  {
    title: "Background",
    href: "https://bg-snippet.vercel.app",
    description: "Handpicked modern background patterns.",
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
    duration: "Oct 24 - Dec 24",
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
    title: "Frontend Developer",
    company: "Ministry of Manpower",
    duration: "Jan 23 - Mar 23",
  },
  {
    title: "Laboratory Assistant",
    company: "Diponegoro University",
    duration: "Aug 22 - Dec 23",
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
    href: "https://youtube.com/watch?v=wIyHSOugGGw&pp=ygUTcmVhY3QgaW4gMTIgbWludXRlcw%3D%3D",
  },
];
