import { PiMagicWandDuotone } from "react-icons/pi";

import { Cursor, CursorBody, CursorPointer } from "@/components/lab/cursor";

export const SpringCursor = () => {
  return (
    <div className="relative aspect-video w-64 cursor-none rounded bg-accent">
      <Cursor spring>
        <CursorPointer>
          <PiMagicWandDuotone className="size-5 -rotate-12" />
        </CursorPointer>
        <CursorBody>
          <p>Sprung!</p>
        </CursorBody>
      </Cursor>
    </div>
  );
};
