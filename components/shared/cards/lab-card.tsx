import { PiArrowRightBold } from "react-icons/pi";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const LabCard = ({
  children,
  name,
  slug,
  button = false,
  className = "",
  gridClass = "regular-card",
}: {
  children: React.ReactNode;
  name?: string;
  slug?: string;
  button?: boolean;
  className?: string;
  gridClass?: "regular-card" | "medium-card" | "large-card" | "default-card";
}) => {
  const size: { [key: string]: string } = {
    "regular-card": "aspect-[5/4] sm:aspect-square",
    "medium-card": "aspect-square sm:aspect-square",
    "large-card": "aspect-square md:aspect-[4/3] sm:col-span-2",
    "default-card": "",
  };

  return (
    <div
      className={cn(
        `group/card relative flex h-auto w-full items-center justify-center overflow-hidden rounded border-2 border-dashed p-6`,
        size[gridClass || "regular-card"],
        className,
      )}
    >
      {children}

      {button && (
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="absolute right-2 top-2 size-8 transition-all duration-300 ease-in-out lg:-translate-y-8 lg:scale-75 lg:opacity-0 lg:group-hover/card:translate-y-0 lg:group-hover/card:scale-100 lg:group-hover/card:opacity-100"
        >
          <Link
            href={`/lab/${slug}`}
            scroll={true}
            aria-label={`Go to /lab/${slug}`}
          >
            <PiArrowRightBold className="h-4 w-4" />
          </Link>
        </Button>
      )}

      {name && (
        <span className="absolute left-3 top-2 font-caveat font-semibold">
          {name}
        </span>
      )}
    </div>
  );
};

export default LabCard;
