import { COMPONENTS } from "@/lib/data";

import Paragraph from "@/components/shared/paragraph";
import LabCard from "@/components/shared/lab-card";

export default function Page() {
  return (
    <section
      id="lab"
      className="flex flex-col h-auto grow items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="My humble abode.">
        <p>
          This is my lab, where I explore and experiment with component design
          and interaction.
        </p>
      </Paragraph>

      <div className="max-w-xl w-full grid sm:grid-cols-2 gap-6">
        {COMPONENTS.reverse().map((component, index) => (
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
    </section>
  );
}
