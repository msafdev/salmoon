import { PiDotDuotone } from "react-icons/pi";

import { Icon } from "@/components/shared/icon";
import Paragraph from "@/components/shared/paragraph";
import { Svg } from "@/components/shared/svg";

import { Badge } from "@/components/ui/badge";

import SectionWrapper from "@/components/motion/section-wrapper";

export default function Page() {
  return (
    <SectionWrapper
      id="mentorship"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="Mentorship">
        <p>
          A 6 months one-on-one program to help you master web development
          fundamentals.
        </p>
        <h3>How it works:</h3>
        <ol className="space-y-3">
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="text-pretty">
              <span className="text-foreground font-medium">Build</span> your
              first CRUD application using the latest recommended tools and
              frameworks.
            </span>
          </li>
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="text-pretty">
              <span className="text-foreground font-medium">Submit</span> your
              work by pushing it to your preferred version control.
            </span>
          </li>
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="text-pretty">
              I <span className="text-foreground font-medium">review</span> your
              code, highlighting improvements, best practices, and
              production-ready patterns.
            </span>
          </li>
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="text-pretty">
              We <span className="text-foreground font-medium">discuss</span>{" "}
              the review live on Zoom so you can ask questions and understand
              the reasoning.
            </span>
          </li>
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="text-pretty">
              <span className="text-foreground font-medium">Implement</span> the
              feedback, resubmit, and repeat. Each round may include new
              features or refinements.
            </span>
          </li>
        </ol>
        <p>
          We iterate until your work consistently meets high-quality standards
          proven in production.
        </p>
      </Paragraph>

      <Paragraph title="Benefits">
        <ul className="space-y-3">
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="text-pretty">
              Learn opinionated best practices for building apps with{" "}
              <Badge
                className="inline-flex h-[22px] items-center gap-1.5 border px-1.5 font-medium capitalize [&>svg]:size-3"
                variant="secondary"
                asChild
              >
                <span>
                  <Svg name="react" />
                  React
                </span>
              </Badge>
              ,{" "}
              <Badge
                className="inline-flex h-[22px] items-center gap-1.5 border px-1.5 font-medium capitalize [&>svg]:size-3"
                variant="secondary"
                asChild
              >
                <span>
                  <Svg name="tailwindcss" />
                  Tailwind
                </span>
              </Badge>{" "}
              and{" "}
              <Badge
                className="inline-flex h-[22px] items-center gap-1.5 border px-1.5 font-medium capitalize [&>svg]:size-3"
                variant="secondary"
                asChild
              >
                <span>
                  <Svg name="next" />
                  Next
                </span>
              </Badge>
              .
            </span>
          </li>
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="text-pretty">
              Get hands-on experience with libraries like{" "}
              <Badge
                className="inline-flex h-[22px] items-center gap-1.5 border px-1.5 font-medium capitalize [&>svg]:size-3"
                variant="secondary"
                asChild
              >
                <span>
                  <Svg name="motion" />
                  Motion
                </span>
              </Badge>
              ,{" "}
              <Badge
                className="inline-flex h-[22px] items-center gap-1.5 border px-1.5 font-medium capitalize [&>svg]:size-3"
                variant="secondary"
                asChild
              >
                <span>
                  <Svg name="tanstack" />
                  Tanstack
                </span>
              </Badge>
              , and{" "}
              <Badge
                className="inline-flex h-[22px] items-center gap-1.5 border px-1.5 font-medium capitalize [&>svg]:size-3"
                variant="secondary"
                asChild
              >
                <span>
                  <Svg name="query" />
                  TanStack Query
                </span>
              </Badge>
              .
            </span>
          </li>
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="text-pretty">
              Learn backend basics with{" "}
              <Badge
                className="inline-flex h-[22px] items-center gap-1.5 border px-1.5 font-medium capitalize [&>svg]:size-3"
                variant="secondary"
                asChild
              >
                <span>
                  <Svg name="next" />
                  Next.js
                </span>
              </Badge>{" "}
              API Routes and connect to databases like{" "}
              <Badge
                className="inline-flex h-[22px] items-center gap-1.5 border px-1.5 font-medium capitalize [&>svg]:size-3"
                variant="secondary"
                asChild
              >
                <span>
                  <Svg name="supabase" />
                  Supabase
                </span>
              </Badge>{" "}
              or{" "}
              <Badge
                className="inline-flex h-[22px] items-center gap-1.5 border px-1.5 font-medium capitalize [&>svg]:size-3"
                variant="secondary"
                asChild
              >
                <span>
                  <Svg name="firebase" />
                  Firebase
                </span>
              </Badge>
              .
            </span>
          </li>
          <li className="flex items-start text-left">
            <PiDotDuotone className="text-foreground mt-1 mr-3 size-4 shrink-0" />
            <span className="text-pretty">
              Receive direct, actionable feedback and iterate quickly to
              improve.
            </span>
          </li>
        </ul>
      </Paragraph>
    </SectionWrapper>
  );
}
