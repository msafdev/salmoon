import Image from "next/image";

import { Cursor } from "@/components/ui/cursor";

export function Profile() {
  return (
    <div className="relative w-fit">
      <Cursor
        attachToParent
        variants={{
          initial: { scale: 0.3, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.3, opacity: 0 },
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.15,
        }}
        className="left-0 p-0"
      >
        <div className="relative flex items-center rounded-full bg-primary/30 px-2.5 py-1.5 text-white backdrop-blur-sm">
          <div className="mr-2 size-2 shrink-0 rounded-full bg-green-500" />
          <span className="text-nowrap font-mono text-xs font-semibold uppercase leading-none">
            Available for work
          </span>
        </div>
      </Cursor>
      <Image
        src="/assets/ava.webp"
        alt="Avatar image"
        width={64}
        height={64}
        quality={60}
        className="overflow-hidden rounded-xl border"
      />
    </div>
  );
}
