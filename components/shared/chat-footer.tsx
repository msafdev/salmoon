import { cn } from "@/lib/utils";
import { CheckCheck, Heart, Share } from "lucide-react";

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
        "flex w-full items-center gap-x-4 justify-between",
        className
      )}
    >
      <div className="flex gap-x-1 items-center cursor-default">
        <p className="text-muted-foreground text-xs md:text-sm">{time}m ago</p>
        <CheckCheck className="text-blue-500 md:w-3 md:h-3 h-2.5 w-2.5" />
      </div>

      <div className="flex gap-x-4 items-center cursor-default">
        <div className="flex gap-x-2 items-center group/report">
          <Share className="text-muted-foreground md:w-3 md:h-3 h-2.5 w-2.5 group-hover/report:text-blue-500 anim" />
          <p className="text-muted-foreground text-xs md:text-sm">Forward</p>
        </div>

        <div className="flex gap-x-2 items-center group/favorite">
          <Heart className="text-muted-foreground md:w-3 md:h-3 h-2.5 w-2.5 group-hover/favorite:text-red-400 group-hover/favorite:fill-red-400 anim" />
          <p className="text-muted-foreground text-xs md:text-sm">Favorite</p>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
