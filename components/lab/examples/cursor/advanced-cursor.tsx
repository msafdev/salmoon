import { PiHandPointingDuotone } from "react-icons/pi";

import { Cursor, CursorBody, CursorPointer } from "@/components/lab/cursor";

export const AdvancedCursor = () => {
  return (
    <div className="relative aspect-4/3 w-64 cursor-none rounded bg-accent">
      <Cursor>
        <CursorPointer>
          <PiHandPointingDuotone className="size-5 -rotate-12" />
        </CursorPointer>
        <CursorBody>
          <p>Salman</p>
          <p>Star the repo!</p>
        </CursorBody>
      </Cursor>
    </div>
  );
};
