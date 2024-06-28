import { COMPONENTS } from "./data";

import Paragraph from "@/components/shared/paragraph";

export default function Page() {
  const size: { [key: string]: string } = {
    "regular-card": "aspect-video xs:aspect-square",
    "medium-card": "xs:aspect-square aspect-[2/3]",
    // "last-card":
    // Remaining 0
    // "sm:col-span-2 lg:col-span-3 col-span-1 row-span-1 aspect-square sm:aspect-[2/1] lg:aspect-[3/1]",
    // Remaining 2
    // "sm:col-span-1 lg:col-span-2 col-span-1 row-span-1 aspect-square sm:aspect-square lg:aspect-auto",
  };

  return (
    <section
      id="lab"
      className="flex flex-col h-auto grow items-center gap-y-16 md:gap-y-20 lg:gap-y-24 px-4"
    >
      <Paragraph title="My humble abode.">
        <p>
          This is my lab, where I explore and experiment with component design
          and interaction.
        </p>
      </Paragraph>

      <div className="max-w-xl w-full grid sm:grid-cols-2 gap-6">
        {COMPONENTS.map((component, index) => (
          <div
            key={index}
            className={`p-6 relative h-auto overflow-hidden w-full border rounded-xl flex items-center justify-center ${
              size[component.gridClass || "regular-card"]
            }`}
          >
            <component.child />

            {/* Background Overlay */}
            <div className="absolute -z-10 bottom-0 top-0 right-0 left-0 bg-background bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:1.5rem_2rem]"></div>
            <div className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-auto w-full aspect-square min-w-[800px] rounded-full bg-[radial-gradient(circle,#ffffff,transparent)] dark:bg-[radial-gradient(circle,#09090B,transparent)]"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
