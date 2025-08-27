import {
  PiBuildingsDuotone,
  PiChatsDuotone,
  PiCheckCircleDuotone,
  PiCodeDuotone,
  PiCompassToolDuotone,
  PiDatabaseDuotone,
  PiDesktopDuotone,
  PiDotDuotone,
  PiFlaskDuotone,
  PiGridFourDuotone,
  PiHeartFill,
  PiLightningDuotone,
  PiPlayPauseDuotone,
  PiPlusBold,
  PiRocketDuotone,
  PiStackDuotone,
} from "react-icons/pi";

import Paragraph from "@/components/shared/paragraph";
import Scribble from "@/components/shared/scribble";
import { Svg } from "@/components/shared/svg";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type Mentor = {
  title: string;
  icon: React.ReactNode;
  className?: string;
};

const mentoringItems: Mentor[] = [
  {
    title: "Complete roadmap",
    icon: <PiChatsDuotone className="text-foreground" />,
  },
  {
    title: "Project-based learning",
    icon: <PiDesktopDuotone className="text-foreground" />,
  },
  {
    title: "Frontend frameworks",
    icon: <PiCodeDuotone className="text-foreground" />,
  },
  {
    title: "Backend and APIs",
    icon: <PiRocketDuotone className="text-foreground" />,
  },
  {
    title: "Capstone project",
    icon: <PiStackDuotone className="text-foreground" />,
  },
  {
    title: "Databases and auth",
    icon: <PiDatabaseDuotone className="text-foreground" />,
  },
  {
    title: "Optimized workflows",
    icon: <PiCheckCircleDuotone className="text-foreground" />,
  },
  {
    title: "Advanced animations",
    icon: <PiPlayPauseDuotone className="text-foreground" />,
  },
  {
    title: "Testing strategies",
    icon: <PiFlaskDuotone className="text-foreground" />,
  },
  {
    title: "Current best practices",
    icon: <PiBuildingsDuotone className="text-foreground" />,
  },
  {
    title: "Career guidance",
    icon: <PiCompassToolDuotone className="text-foreground" />,
  },
  {
    title: "Continuous feedback",
    icon: <PiLightningDuotone className="text-foreground" />,
  },
  {
    title: "",
    icon: <PiPlusBold className="text-foreground" />,
    className: "col-span-full w-fit sm:mx-auto",
  },
  {
    title: "Access to premium components",
    icon: <PiGridFourDuotone className="text-foreground" />,
    className: "col-span-full w-fit xs:mx-auto",
  },
];

const MentorSection = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center">
        {/* Heading */}
        <div className="mb-3 flex w-fit items-center gap-x-3 md:mx-auto">
          <div className="relative grid size-7 shrink-0 place-items-center rounded bg-rose-400 text-white">
            <PiHeartFill size={14} />
            <span className="absolute -bottom-0.5 -z-10 h-4 w-full scale-x-90 rounded-md bg-rose-500/40 blur-sm" />
          </div>
          <h2 className="text-lg font-semibold">Mentorship</h2>
        </div>

        {/* Pricing / Description */}
        <p className="text-muted-foreground xs:text-base mb-6 max-w-64 text-center text-sm text-balance md:mb-8">
          A <span className="text-foreground font-medium">3 months</span>{" "}
          personalized mentorship program for{" "}
          <span className="text-foreground font-medium">$249</span>.
        </p>

        {/* Features */}
        <div className="mb-6 grid max-w-56 gap-3 sm:max-w-fit sm:grid-cols-2 md:mb-8 md:gap-4">
          {mentoringItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-x-4 md:gap-x-2",
                item.className ?? "",
              )}
            >
              <div className="text-foreground grid size-6 shrink-0 place-items-center rounded">
                {item.icon}
              </div>
              <h2 className="text-muted-foreground xs:mt-0.5 mt-px text-sm font-medium">
                {item.title}
              </h2>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Scribble className="text-muted-foreground mb-3">
          Ready to level up?
        </Scribble>
        <Button
          className="group/cta relative w-full max-w-52 overflow-visible"
          size="sm"
        >
          Give me a call
          <span className="bg-primary/40 anim absolute -bottom-1 -z-10 h-9 w-full scale-x-95 rounded-md blur-sm group-hover/cta:scale-y-90" />
        </Button>
      </div>

      {/* Expanded learning details */}
      <Paragraph>
        <ul className="space-y-3">
          {/* Frontend */}
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="leading-relaxed">
              Start with the basics of{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="react" /> React
                </span>
              </Badge>
              ,{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="tailwindcss" /> Tailwind
                </span>
              </Badge>
              , and{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="next" /> Next.js
                </span>
              </Badge>{" "}
              to build solid frontend skills.
            </span>
          </li>

          {/* Backend */}
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="leading-relaxed">
              Learn backend and APIs with{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="next" /> API routes
                </span>
              </Badge>{" "}
              or{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="express" /> Express
                </span>
              </Badge>
              .
            </span>
          </li>

          {/* Advanced frontend */}
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="leading-relaxed">
              Learn advanced frontend and libraries such as{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="tanstack" /> TanStack
                </span>
              </Badge>{" "}
              and{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="motion" /> Motion
                </span>
              </Badge>
              .
            </span>
          </li>

          {/* Databases */}
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="leading-relaxed">
              Explore databases and ORMs with{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="supabase" /> Supabase
                </span>
              </Badge>
              ,{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="firebase" /> Firebase
                </span>
              </Badge>
              ,{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="prisma" /> Prisma
                </span>
              </Badge>
              , and{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="redis" /> Redis
                </span>
              </Badge>
              .
            </span>
          </li>

          {/* Testing */}
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="leading-relaxed">
              Write tests and validate your apps using{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="postman" /> Postman
                </span>
              </Badge>{" "}
              and{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="vitest" /> Vitest
                </span>
              </Badge>
              .
            </span>
          </li>

          {/* Deployment */}
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="leading-relaxed">
              Complete the project and deploy it using{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="github" /> GitHub
                </span>
              </Badge>{" "}
              or{" "}
              <Badge
                className="ml-0.5 inline-flex items-center gap-1.5 text-sm font-medium [&>svg]:size-3"
                variant="ghost"
                asChild
              >
                <span>
                  <Svg name="vercel" /> Vercel
                </span>
              </Badge>
              .
            </span>
          </li>
        </ul>
      </Paragraph>
    </>
  );
};

export default MentorSection;
