import { PiCursorDuotone } from "react-icons/pi";

import { Cursor, CursorPointer } from "@/components/lab/cursor";

export const BasicCursor = () => {
  return (
    <div className="relative aspect-[4/3] w-64 cursor-none rounded bg-accent">
      <Cursor>
        <CursorPointer>
          <PiCursorDuotone className="size-5" />
        </CursorPointer>
      </Cursor>
    </div>
  );
};
