import Image from "next/image";
import Link from "next/link";

import Scribble from "@/components/shared/scribble";

import Line from "@/public/static/line.webp";

const NotFound = () => {
  return (
    <div className="m-auto grid min-h-svh w-fit place-items-center gap-2 px-4 font-mono text-xs font-medium sm:text-sm">
      <Scribble className="text-center text-2xl">
        Nothing here,{" "}
        <Link
          href="/"
          aria-label="Go back home"
          className="relative cursor-pointer"
        >
          go back
          <Image
            src={Line}
            alt="Underline SVG"
            width={64}
            height={8}
            className="absolute right-0 -bottom-1 w-16 opacity-40 dark:invert"
          />
        </Link>
      </Scribble>
    </div>
  );
};

export default NotFound;
