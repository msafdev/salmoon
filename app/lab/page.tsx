import LabCard from "@/components/shared/lab-card";
import Paragraph from "@/components/shared/paragraph";

import { COMPONENTS } from "@/lib/data";

export default function Page() {
  return (
    <section
      id="lab"
      className="flex h-auto grow flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="My humble abode.">
        <p>
          This is my lab, where I explore and experiment with component design
          and interaction.
        </p>
      </Paragraph>

      <Paragraph title="Before you start.">
        <p>
          Some of these components require{" "}
          <code className="text-foreground">shadcn-ui</code> as well as{" "}
          <code className="text-foreground">next-themes</code> to work properly.
          Make sure you have them installed on your development environment.
        </p>
      </Paragraph>

      <div className="flex w-full max-w-xl flex-col gap-y-5">
        <Paragraph title="Have fun." />
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
