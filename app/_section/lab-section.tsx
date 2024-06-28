import Link from "next/link";

import { Button } from "@/components/ui/button";

import { MoveRight } from "lucide-react";

const LabSection = () => {
  return (
    <div className="flex flex-col w-full gap-y-4 max-w-xl md:p-4">
      <div className="flex items-center w-full gap-x-4 justify-between">
        <h2 className="font-semibold text-base sm:text-lg md:text-xl">
          Fresh from the oven
        </h2>

        <Button size={"icon"} variant={"ghost"}>
          <Link href="/lab" aria-label="Go to /lab">
            <MoveRight size={24} />
          </Link>
        </Button>
      </div>

      {/* Lab Items */}
      <div className="w-full h-auto aspect-[6/3] border rounded-xl bg-muted"></div>
    </div>
  );
};

export default LabSection;
