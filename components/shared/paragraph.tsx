import { PiArrowRightBold } from "react-icons/pi";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

const Paragraph = ({
  title,
  from,
  to,
  children,
  link = false,
  href = "/",
  className,
}: {
  title: string;
  from?: string;
  to?: string;
  children?: React.ReactNode;
  link?: boolean;
  href?: string;
  className?: string;
}) => {
  return (
    <div className={cn("space-y-1 max-w-lg", className)}>
      <div className="flex w-full flex-col">
        <div className="flex h-8 w-full items-center justify-between gap-x-4">
          <h2 className="text-sm font-bold uppercase leading-none text-foreground">
            {title}
          </h2>
          {link && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={"icon"} variant={"ghost"} className="size-7">
                    <Link
                      href={href}
                      aria-label={`Go to ${href}`}
                      className="h-full w-full p-1.5"
                    >
                      <PiArrowRightBold className="h-full w-full" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1">
                  <p className="text-xs font-medium">More</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {from && to && (
          <code className="flex items-center text-sm text-muted-foreground">
            {from}
            <PiArrowRightBold
              size={12}
              className="mx-2 inline-block text-foreground"
            />
            {to}
          </code>
        )}
      </div>
      {children && (
        <div className="flex flex-col gap-y-4 text-sm text-muted-foreground md:text-base">
          {children}
        </div>
      )}
    </div>
  );
};

export default Paragraph;
