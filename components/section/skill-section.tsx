import ChatFooter from "@/components/shared/chat-footer";
import Marquee from "@/components/shared/marquee";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SkillSection = () => {
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
            I have a diverse set of skills.
          </p>
        </div>
      </div>

      {/* Second Chat */}
      <div className="flex w-full flex-col gap-y-3">
        <div className="flex flex-col gap-y-2 rounded-[24px] rounded-bl-md border bg-accent px-4 py-2 md:px-6 md:py-3">
          <p className="text-xs text-accent-foreground sm:text-sm">
            Over the time, I have worked using various stacks and tools. I still
            thrive to learn new things. Here are some of them.
          </p>
        </div>
        <Marquee />
      </div>
    </div>
  );
};

export default SkillSection;
