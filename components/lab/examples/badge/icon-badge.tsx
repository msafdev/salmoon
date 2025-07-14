import { PiCheersFill, PiUserDuotone } from "react-icons/pi";

import { Badge } from "@/components/ui/badge";

export const IconBadge = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge className="h-6" variant="secondary">
        <PiUserDuotone />
        User
      </Badge>
      <Badge className="h-6" variant="secondary">
        <p>Count</p>
        <span className="opacity-70">13</span>
      </Badge>
      <Badge className="h-6" variant="secondary">
        <p>Fully</p>
        <PiCheersFill className="opacity-70" />
        <p>Booked</p>
      </Badge>
    </div>
  );
};
