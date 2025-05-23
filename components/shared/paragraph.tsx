import { MoveRight } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const Paragraph = ({
  title,
  from,
  to,
  children,
  link = false,
  href = "/",
}: {
  title: string;
  from?: string;
  to?: string;
  children?: React.ReactNode;
  link?: boolean;
  href?: string;
}) => {
  return (
    <div className="flex w-full max-w-lg flex-col gap-y-2">
      <div className="flex w-full flex-col">
        <div className="flex h-8 w-full items-center justify-between gap-x-4">
          <h2 className="text-sm leading-none font-semibold uppercase text-foreground">
            {title}
          </h2>
          {link && (
            <Button size={"icon"} variant={"ghost"} className="size-7">
              <Link
                href={href}
                aria-label={`Go to ${href}`}
                className="h-full w-full p-1.5"
              >
                <MoveRight className="h-full w-full" />
              </Link>
            </Button>
          )}
        </div>
        {from && to && (
          <code className="flex items-center text-sm text-muted-foreground">
            {from}
            <MoveRight
              size={12}
              className="mx-2 inline-block text-foreground"
            />
            {to}
          </code>
        )}
      </div>
      {children && (
        <div className="flex flex-col gap-y-4 text-sm md:text-base text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
};

export default Paragraph;
