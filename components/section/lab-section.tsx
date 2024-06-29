import { MoveRight } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { NEW_COMPONENT as component } from "@/lib/data";

import LabCard from "../shared/lab-card";

const LabSection = () => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-y-4 md:p-4">
      <div className="flex w-full items-center justify-between gap-x-4">
        <h2 className="text-base font-semibold sm:text-lg md:text-xl">
          Fresh from the oven.
        </h2>

        <Button size={"icon"} variant={"ghost"}>
          <Link href="/lab" aria-label="Go to /lab">
            <MoveRight size={24} />
          </Link>
        </Button>
      </div>

      {/* Lab Items */}
      <LabCard gridClass="default-card" className="min-h-64">
        <component.child />
      </LabCard>
    </div>
  );
};

export default LabSection;
