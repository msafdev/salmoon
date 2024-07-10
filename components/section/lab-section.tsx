import LabCard from "@/components/shared/lab-card";
import Paragraph from "@/components/shared/paragraph";

import { NEW_COMPONENT as component } from "@/lib/data";

const LabSection = () => {
  const size: { [key: string]: string } = {
    "regular-card": "aspect-[3/2] sm:aspect-video",
    "medium-card": "aspect-[4/3] sm:aspect-video",
    "large-card": "aspect-square sm:aspect-[4/3]",
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-y-4">
      <Paragraph title="Fresh from the oven" link href="/lab" />

      {/* Lab Items */}
      <LabCard
        className={`min-h-64 ${size[component.gridClass || "regular-card"]}`}
      >
        <component.child />
      </LabCard>
    </div>
  );
};

export default LabSection;
