import "@/styles/lab.css";

import { Metadata } from "next";
import Link from "next/link";

import LabCard from "@/components/shared/cards/lab-card";
import Paragraph from "@/components/shared/paragraph";

import { COMPONENTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Msafdev's laboratory, where I experiment with UI designs and interactions, free to use and explore.",
};

export default function Page() {
  return (
    <section
      id="lab"
      className="flex h-auto grow flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="My humble abode">
        <p>
          This is my lab, where I explore and experiment with UI designs and
          interactions. If you have any feedback, feel free to reach out to me.
        </p>
      </Paragraph>

      <div className="flex w-full max-w-lg flex-col gap-y-4">
        <Paragraph title="Have fun">
          <p>
            These components require{" "}
            <Link
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="shadcn-ui"
              className="font-medium text-foreground"
            >
              shadcn-ui
            </Link>
            ,{" "}
            <Link
              href="https://www.framer.com/motion/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="frame-motion"
              className="font-medium text-foreground"
            >
              framer-motion
            </Link>
            , and{" "}
            <Link
              href="https://ui.shadcn.com/docs/dark-mode/next"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="next-themes"
              className="font-medium text-foreground"
            >
              next-themes
            </Link>{" "}
            to work properly. Make sure you have them installed on your
            development environment.
          </p>
        </Paragraph>
        <div className="grid w-full max-w-lg grid-flow-dense gap-6 sm:grid-cols-2">
          {COMPONENTS.map((component, index) => (
            <LabCard
              key={index}
              button={true}
              slug={component.slug}
              gridClass={component.gridClass}
            >
              <component.child />
            </LabCard>
          ))}
        </div>
      </div>
    </section>
  );
}
