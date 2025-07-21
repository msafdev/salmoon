import Paragraph from "@/components/shared/paragraph";

import { Skeleton } from "@/components/ui/skeleton";

export const ActionLoader = () => (
  <div className="w-full space-y-4">
    <Paragraph title="Let's connect" />
    <div className="grid w-full grid-cols-3 flex-wrap items-center gap-2 xs:grid-cols-6">
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton
          key={index}
          className="aspect-video h-auto w-auto min-w-16 flex-1 rounded bg-muted xs:aspect-square"
        />
      ))}
    </div>
  </div>
);
