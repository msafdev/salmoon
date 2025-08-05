import { PiEyesDuotone, PiStar, PiStarFill } from "react-icons/pi";

import { Badge } from "@/components/ui/badge";

export const SeparatedBadge = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge className="h-7 gap-0 p-0" variant="outline">
        <span className="bg-muted text-foreground flex h-full items-center border-r px-2">
          build
        </span>
        <span className="text-foreground flex h-full items-center px-2">
          passing
        </span>
      </Badge>
      <Badge className="h-7 gap-0 p-0" variant="outline">
        <span className="bg-muted flex h-full items-center border-r px-2">
          <PiEyesDuotone size={12} />
        </span>
        <span className="text-foreground flex h-full items-center px-2">
          4.2k reads
        </span>
      </Badge>
      <Badge className="h-7 gap-0 p-0" variant="outline">
        <span className="bg-muted text-foreground flex h-full items-center border-r px-2">
          rating
        </span>
        <span className="flex h-full items-center gap-0.5 px-2 text-yellow-300">
          {Array.from({ length: 4 }, (_, index) => (
            <PiStarFill key={index} size={12} />
          ))}
          <PiStar size={12} />
        </span>
      </Badge>
    </div>
  );
};
