import LabCard from "@/components/shared/lab-card";
import Paragraph from "@/components/shared/paragraph";

import { NEW_COMPONENT as component } from "@/lib/data";

const LabSection = () => {
  const gridClass = component.gridClass || "default-card";
  
  return (
    <div className="flex w-full max-w-xl flex-col gap-y-4">
      <Paragraph title="Fresh from the oven" link href="/lab" />

      {/* Lab Items */}
      <LabCard gridClass={gridClass} className="min-h-64">
        <component.child />
      </LabCard>
    </div>
  );
};

export default LabSection;
