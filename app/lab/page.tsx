import Link from "next/link";

import LabCard from "@/components/shared/lab-card";
import Paragraph from "@/components/shared/paragraph";

import { COMPONENTS } from "@/lib/data";

export default function Page() {
  return (
    <section
      id="lab"
      className="flex h-auto grow flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="My humble abode">
        <p>
          This is my lab, where I explore and experiment with UI designs and
          interactions.
        </p>
        <p>
          I will try to reference my inspirations and resources as much as I
          can. If you have any feedback, feel free to reach out to me.
        </p>
      </Paragraph>

      <Paragraph title="Before you start">
        <p>
          These components require{" "}
          <Link
            href="https://ui.shadcn.com/"
            target="_blank"
            className="text-foreground"
          >
            shadcn-ui
          </Link>{" "}
          along with{" "}
          <Link
            href="https://ui.shadcn.com/docs/dark-mode/next"
            target="_blank"
            className="text-foreground"
          >
            next-themes
          </Link>{" "}
          to work properly. Make sure you have them installed on your
          development environment.
        </p>
      </Paragraph>

      <div className="flex w-full max-w-xl flex-col gap-y-4">
        <Paragraph title="Have fun" />
        <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2">
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
