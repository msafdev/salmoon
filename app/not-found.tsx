import Image from "next/image";
import Link from "next/link";

import Scribble from "@/components/shared/scribble";

import Line from "@/public/static/line.webp";

const NotFound = () => {
  return (
    <div className="relative m-auto grid max-w-xl grid-cols-1 px-4 font-mono text-xs font-medium sm:text-sm">
      <Scribble className="text-2xl">
        Nothing here,{" "}
        <Link href="/" aria-label="Go back home" className="cursor-pointer">
          go back
        </Link>
      </Scribble>
      <Image
        src={Line}
        alt="Underline SVG"
        width={64}
        height={8}
        className="absolute right-3 -bottom-1 w-16 opacity-40 dark:invert"
      />
    </div>
  );
};

export default NotFound;
