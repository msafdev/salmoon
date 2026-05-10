"use client";

import { swifts } from "#site/content";

import Image from "next/image";
import Link from "next/link";

import { simplifySwifts, sortSwifts } from "@/velite/swift";
import Scribble from "../scribble";

const SwiftGroup = () => {
  const sortedSwifts = sortSwifts(swifts);
  const simplifiedSwifts = simplifySwifts(sortedSwifts);

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {simplifiedSwifts.map((swift) => (
        <Link
          href={"/" + swift.slug}
          key={swift.slug}
          scroll={false}
          className="group/swift w-full space-y-1.5"
          aria-label={`Go to ${swift.title}`}
        >
          <div className="bg-muted relative aspect-[4/3] h-auto w-full overflow-hidden rounded-[2px]">
            {swift.image && (
              <Image
                src={swift.image}
                alt={`Thumbnail of ${swift.title}`}
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 440px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="anim object-cover group-hover/swift:scale-105"
              />
            )}
          </div>
          <div className="space-y-0.5">
            <Scribble className="text-foreground line-clamp-1 text-sm sm:text-base">
              {swift.title}
            </Scribble>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SwiftGroup;
