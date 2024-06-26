import ChatFooter from "@/components/shared/chat-footer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatSection = () => {
  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-y-4">
      {/* Avatar and First Chat */}
      <div className="flex w-full items-end gap-x-4">
        <div className="relative">
          <Avatar className="overflow-hidden border">
            <AvatarImage src="./ava.png" alt="Avatar" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>

          {/* Status */}
          <div className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full border bg-green-500" />
        </div>
        <div className="flex rounded-2xl rounded-bl-md border bg-accent px-4 py-2 md:px-6 md:py-3">
          <p className="text-xs text-accent-foreground sm:text-sm">
            Hi there, I'm Salman.
          </p>
        </div>
      </div>

      {/* Second Chat */}
      <div className="flex w-full flex-col gap-y-3">
        <div className="flex flex-col gap-y-2 rounded-[24px] rounded-bl-md border bg-accent px-4 py-2 md:px-6 md:py-3">
          <p className="text-xs text-accent-foreground sm:text-sm">
            An independent creative developer since 2020, with a knack for
            minimalistic designs and interactions.
          </p>
        </div>
        <ChatFooter time={4} />
      </div>
    </div>
  );
};

export default ChatSection;
