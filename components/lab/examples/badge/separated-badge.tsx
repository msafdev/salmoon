import { PiEyesDuotone, PiStar, PiStarFill } from "react-icons/pi";

import { Badge } from "@/components/ui/badge";

export const SeparatedBadge = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge className="h-7 gap-0 p-0" variant="outline">
        <span className="flex h-full items-center border-r bg-muted px-2 text-foreground">
          build
        </span>
        <span className="flex h-full items-center px-2 text-foreground">
          passing
        </span>
      </Badge>
      <Badge className="h-7 gap-0 p-0" variant="outline">
        <span className="flex h-full items-center border-r bg-muted px-2">
          <PiEyesDuotone size={12} />
        </span>
        <span className="flex h-full items-center px-2 text-foreground">
          4.2k reads
        </span>
      </Badge>
      <Badge className="h-7 gap-0 p-0" variant="outline">
        <span className="flex h-full items-center border-r bg-muted px-2 text-foreground">
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
