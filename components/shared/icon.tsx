"use client";

// Phosphor
import {
  PiBookOpenUserDuotone,
  PiBrowserDuotone,
  PiChartBarDuotone,
  PiGridNineDuotone,
  PiHashDuotone,
  PiMoneyWavyDuotone,
  PiPlayDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";
// Simple
import {
  SiCloudflare,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMdx,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNodemon,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiReacttable,
  SiRedux,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";

import type { FC } from "react";

type IconProps = {
  type?: "general" | "tech";
  name: string;
};

const techMap: Record<string, JSX.Element> = {
  next: <SiNextdotjs className="text-foreground" />,
  tailwind: <SiTailwindcss className="text-[#38BDF8]" />,
  typescript: <SiTypescript className="text-[#3178C6]" />,
  javascript: <SiJavascript className="text-[#F7DF1E]" />,
  react: <SiReact className="text-[#61DAFB]" />,
  html: <SiHtml5 className="text-[#E34F26]" />,
  css: <SiCss3 className="text-[#1572B6]" />,
  golang: <SiGo className="text-[#29BEB0]" />,
  motion: <SiFramer className="text-foreground" />,
  nodemon: <SiNodemon className="text-[#339933]" />,
  express: <SiExpress className="text-foreground" />,
  mongodb: <SiMongodb className="text-[#47A248]" />,
  prisma: <SiPrisma className="text-foreground" />,
  redux: <SiRedux className="text-[#764ABC]" />,
  firebase: <SiFirebase className="text-[#FFCA28]" />,
  laravel: <SiLaravel className="text-[#F05340]" />,
  vue: <SiVuedotjs className="text-[#41B883]" />,
  python: <SiPython className="text-[#3776AB]" />,
  vercel: <SiVercel className="text-foreground" />,
  postgresql: <SiPostgresql className="text-[#336791]" />,
  mysql: <SiMysql className="text-[#00758F]" />,
  github: <SiGithub className="text-foreground" />,
  supabase: <SiSupabase className="text-[#3ECF8E]" />,
  docker: <SiDocker className="text-[#2496ED]" />,
  git: <SiGit className="text-[#F05032]" />,
  figma: <SiFigma className="text-[#F24E1E]" />,
  mongo: <SiMongodb className="text-[#47A248]" />,
  cloudflare: <SiCloudflare className="text-[#F38020]" />,
  postman: <SiPostman className="text-[#FF6C37]" />,
  shadcn: <SiShadcnui className="text-foreground" />,
  mdx: <SiMdx className="text-[#edcf49]" />,
  query: <SiReactquery className="text-[#FF4154]" />,
  router: <SiReactrouter className="text-[#FF4154]" />,
  table: <SiReacttable className="text-[#FF4154]" />,
};

const generalMap: Record<string, JSX.Element> = {
  hero: <PiBrowserDuotone />,
  portfolio: <PiUserCircleDuotone />,
  minimalist: <PiPlayDuotone />,
  pricing: <PiMoneyWavyDuotone />,
  template: <PiGridNineDuotone />,
  blog: <PiBookOpenUserDuotone />,
  dashboard: <PiChartBarDuotone />,
};

export const Icon: FC<IconProps> = ({ name, type = "general" }) => {
  const key = name.toLowerCase();
  const map = type === "general" ? generalMap : techMap;

  return map[key] ?? <PiHashDuotone className="text-muted-foreground" />;
};
