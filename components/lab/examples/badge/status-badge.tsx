import { Badge } from "@/components/ui/badge";

export const StatusBadge = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="secondary" className="h-6">
        <div className="relative mr-0.5 size-1.5 rounded-full bg-green-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-1.5 shrink-0 animate-ping rounded-full bg-green-700" />
          </div>
        </div>
        Online
      </Badge>
      <Badge variant="secondary" className="h-6">
        <div className="relative mr-0.5 size-1.5 rounded-full bg-red-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-1.5 shrink-0 animate-ping rounded-full bg-red-700" />
          </div>
        </div>
        Offline
      </Badge>
      <Badge variant="secondary" className="h-6">
        <div className="relative mr-0.5 size-1.5 rounded-full bg-blue-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-1.5 shrink-0 animate-ping rounded-full bg-blue-700" />
          </div>
        </div>
        Waiting
      </Badge>
    </div>
  );
};
