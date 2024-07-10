import { MoveRight } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const LabCard = ({
  children,
  slug,
  gridClass = "regular-card",
  button = false,
  className = "",
}: {
  children: React.ReactNode;
  slug?: string;
  gridClass?: "regular-card" | "medium-card" | "large-card" | "default-card";
  button?: boolean;
  className?: string;
}) => {
  const size: { [key: string]: string } = {
    "regular-card": "aspect-[5/4] sm:aspect-square",
    "medium-card": "aspect-square sm:aspect-square",
    "large-card": "aspect-[2/3] sm:aspect-[2/1] sm:col-span-2",
    "default-card": "",
  };

  return (
    <div
      className={cn(
        `group/card relative flex h-auto w-full items-center justify-center overflow-hidden rounded-xl border p-6`,
        size[gridClass || "regular-card"],
        className,
      )}
    >
      {children}

      {/* Button */}
      {button && (
        <Button
          variant="secondary"
          size="icon"
          asChild
          className="absolute right-3 top-3 h-8 w-8 transition-all duration-300 ease-in-out lg:-translate-y-8 lg:scale-75 lg:opacity-0 lg:group-hover/card:translate-y-0 lg:group-hover/card:scale-100 lg:group-hover/card:opacity-100"
        >
          <Link
            href={`/lab/${slug}`}
            scroll={true}
            aria-label={`Go to /lab/${slug}`}
          >
            <MoveRight className="h-4 w-4" />
          </Link>
        </Button>
      )}

      {/* Background Overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10 bg-background bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:1.5rem_2rem] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"></div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square h-auto w-full min-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff,transparent)] dark:bg-[radial-gradient(circle,#09090B,transparent)]"></div>
    </div>
  );
};

export default LabCard;
