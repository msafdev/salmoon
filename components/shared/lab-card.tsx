import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const LabCard = ({
  children,
  slug,
  gridClass = "regular-card",
  button,
}: {
  children: React.ReactNode;
  slug?: string;
  gridClass?: string;
  button?: boolean;
}) => {
  const size: { [key: string]: string } = {
    "regular-card": "aspect-video xs:aspect-square",
    "medium-card": "aspect-square xs:aspect-square",
    "large-card": "aspect-[3/4] xs:aspect-square",
    "detail-card": "aspect-[4/5] xs:aspect-[4/3] md:aspect-[8/5]",
  };

  return (
    <div
      className={`p-6 group/card relative h-auto overflow-hidden w-full border rounded-xl flex items-center justify-center ${
        size[gridClass || "regular-card"]
      }`}
    >
      {children}

      {/* Button */}
      {button && (
        <Button
          variant="secondary"
          size="icon"
          asChild
          className="h-8 w-8 absolute top-3 right-3 scale-75 opacity-0 -translate-y-8 group-hover/card:opacity-100 group-hover/card:scale-100 group-hover/card:translate-y-0 transition-all duration-300 ease-in-out"
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
      <div className="absolute -z-10 bottom-0 top-0 right-0 left-0 bg-background bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:1.5rem_2rem]"></div>
      <div className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-auto w-full aspect-square min-w-[800px] rounded-full bg-[radial-gradient(circle,#ffffff,transparent)] dark:bg-[radial-gradient(circle,#09090B,transparent)]"></div>
    </div>
  );
};

export default LabCard;
