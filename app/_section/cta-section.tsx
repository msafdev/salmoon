import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatFooter from "@/components/shared/chat-footer";

import { FaPaperPlane } from "react-icons/fa6";

const ActionSection = () => {
  return (
    <div className="max-w-2xl flex flex-col gap-y-4 items-start w-full md:p-4 group">
      {/* Avatar and First Chat */}
      <div className="flex items-end gap-x-4 w-full">
        <div className="relative">
          <Avatar className="border overflow-hidden">
            <AvatarImage src="./ava.png" alt="Avatar" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>

          {/* Status */}
          <div className="w-2 h-2 rounded-full bg-green-500 absolute top-0.5 right-0.5 border" />
        </div>
        <div className="flex px-6 py-3 bg-accent rounded-3xl rounded-bl-md border">
          <p className="text-accent-foreground text-sm">
            Have a project in mind? Do let me know.
          </p>
        </div>
      </div>

      {/* Second Chat */}
      <div className="flex flex-col w-full gap-y-2">
        <Link
          href={"/"}
          className="flex items-center justify-between pl-6 pr-1 py-1 bg-green-200 md:bg-background md:group-hover:bg-green-200 rounded-tl-3xl rounded-e-[50px] rounded-bl-md border-green-500 border md:border-border anim md:group-hover:border-green-500 w-full"
        >
          <p className="md:text-muted-foreground md:group-hover:text-green-700 text-green-700 font-medium anim text-sm">
            Get in touch.
          </p>
          <div className="h-auto w-fit px-6 py-2.5 bg-green-500 md:bg-[#878787] md:group-hover:bg-green-500 anim rounded-full">
            <FaPaperPlane
              size={24}
              className="group-hover:p-0 anim text-background p-1"
            />
          </div>
        </Link>

        <ChatFooter time={1} />
      </div>
    </div>
  );
};

export default ActionSection;
