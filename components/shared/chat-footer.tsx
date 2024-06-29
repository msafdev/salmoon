import { CheckCheck, Heart, Share } from "lucide-react";

import { cn } from "@/lib/utils";

const ChatFooter = ({
  className,
  time,
}: {
  className?: string;
  time: number;
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-x-4",
        className,
      )}
    >
      <div className="flex cursor-default items-center gap-x-1">
        <p className="text-xs text-muted-foreground md:text-sm">{time}m ago</p>
        <CheckCheck className="h-2.5 w-2.5 text-blue-500 md:h-3 md:w-3" />
      </div>

      <div className="flex cursor-default items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <Share className="h-2.5 w-2.5 text-blue-500 md:h-3 md:w-3" />
          <p className="text-xs text-muted-foreground md:text-sm">Forward</p>
        </div>

        <div className="flex items-center gap-x-2">
          <Heart className="h-2.5 w-2.5 fill-red-400 text-red-400 md:h-3 md:w-3" />
          <p className="text-xs text-muted-foreground md:text-sm">Favorite</p>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
