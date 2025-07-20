import {
  PiHandsClappingDuotone,
  PiHourglassDuotone,
  PiSpinnerBallDuotone,
} from "react-icons/pi";

import { LoaderIcon } from "@/components/lab/loader";

export const IconLoader = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid place-items-center gap-1">
        <LoaderIcon />
        <p className="text-xs font-medium">Spin</p>
      </div>

      <div className="grid place-items-center gap-1">
        <LoaderIcon variant="scale-up-down">
          <PiHandsClappingDuotone className="size-4" />
        </LoaderIcon>
        <p className="text-xs font-medium">Scale</p>
      </div>

      <div className="grid place-items-center gap-1">
        <LoaderIcon variant="blink">
          <PiSpinnerBallDuotone className="size-4" />
        </LoaderIcon>
        <p className="text-xs font-medium">Blink</p>
      </div>

      <div className="grid place-items-center gap-1">
        <LoaderIcon variant="hourglass">
          <PiHourglassDuotone className="size-4" />
        </LoaderIcon>
        <p className="text-xs font-medium">Hourglass</p>
      </div>
    </div>
  );
};
