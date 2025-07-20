import { createElement } from "react";

import { Metadata } from "next";
import Link from "next/link";

import LabCard from "@/components/shared/cards/lab-card";
import Paragraph from "@/components/shared/paragraph";

import SectionWrapper from "@/components/motion/section-wrapper";

import { COMPONENTS } from "@/lib/data";
import "@/styles/lab.css";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "My own trusted laboratory, where I experiment with UI designs and interactions, free to use and explore.",
};

export default function Page() {
  return (
    <SectionWrapper
      id="lab"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="My humble abode">
        <p>
          This is my lab, where I explore and experiment with UI designs and
          interactions. If you have any feedback, feel free to reach out to me.
        </p>
      </Paragraph>

      <div className="w-full space-y-4">
        <Paragraph title="Have fun">
          <p>
            Most of these components require{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="shadcn"
              className="font-medium text-foreground"
            >
              shadcn
            </Link>
            ,{" "}
            <Link
              href="https://framer.com/motion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="frame-motion"
              className="font-medium text-foreground"
            >
              framer-motion
            </Link>
            , and{" "}
            <Link
              href="https://react-icons.github.io/react-icons"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="react-icons"
              className="font-medium text-foreground"
            >
              react-icons
            </Link>{" "}
            to work properly. Make sure you have them installed on your
            development environment.
          </p>
        </Paragraph>

        <div className="grid w-full max-w-lg grid-flow-dense gap-4 sm:grid-cols-2">
          {COMPONENTS.map((component, index) => (
            <LabCard
              key={index}
              button={true}
              slug={component.slug}
              gridClass={component.gridClass}
              name={component.name}
              className="rounded"
            >
              {component.example &&
                Array.isArray(component.example) &&
                component.example[component.thumbnail ?? 0] &&
                component.example[component.thumbnail ?? 0].child &&
                createElement(
                  component.example[component.thumbnail ?? 0].child,
                )}
            </LabCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
