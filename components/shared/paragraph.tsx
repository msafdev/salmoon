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
    <div className="flex w-full max-w-xl flex-col gap-y-4">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between gap-x-4 h-9">
          <h2 className="text-xl font-semibold">{title}</h2>
          {link && (
            <Button size={"icon"} variant={"ghost"} className="size-9">
              <Link href={href} aria-label={`Go to ${href}`} className="w-full h-full p-1.5">
                <MoveRight className="w-full h-full" />
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
        <div className="flex flex-col gap-y-4 text-sm text-muted-foreground md:text-base">
          {children}
        </div>
      )}
    </div>
  );
};

export default Paragraph;
