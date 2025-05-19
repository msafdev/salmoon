import { Cursor } from "@/components/ui/cursor";

import Ava from "@/public/assets/ava.webp";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Profile() {
  return (
    <div className="w-fit overflow-hidden">
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
        className="-top-16 md:-top-20 left-0 p-0"
      >
        <div className="relative flex items-center rounded-full bg-primary/30 px-2.5 py-1.5 text-white backdrop-blur-sm">
          <div className="mr-2 size-2 rounded-full bg-green-500" />
          <span className="font-mono text-xs font-semibold uppercase leading-none">
            Available for work
          </span>
        </div>
      </Cursor>
      <Avatar className="size-16 overflow-hidden rounded-xl">
        <AvatarImage
          src="https://github.com/msafdev.png"
          alt="Profile picture of MSAFDEV"
          className="object-cover"
        />
        <AvatarFallback className="rounded-xl text-muted-foreground">
          MS
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
