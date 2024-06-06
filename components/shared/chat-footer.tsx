import { CheckCheck, Heart, ThumbsDown } from "lucide-react";

const ChatFooter = () => {
  return (
    <div className="flex w-full items-center gap-x-4 justify-between">
      <div className="flex gap-x-1 items-center">
        <p className="text-muted-foreground text-xs md:text-sm">4m ago</p>
        <CheckCheck className="text-blue-500 md:w-3 md:h-3 h-2.5 w-2.5" />
      </div>

      <div className="flex gap-x-4 items-center">
        <div className="flex gap-x-2 items-center">
          <ThumbsDown className="text-muted-foreground md:w-3 md:h-3 h-2.5 w-2.5" />
          <p className="text-muted-foreground text-xs md:text-sm">Report</p>
        </div>

        <div className="flex gap-x-2 items-center">
          <Heart className="text-muted-foreground md:w-3 md:h-3 h-2.5 w-2.5" />
          <p className="text-muted-foreground text-xs md:text-sm">Favorite</p>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
