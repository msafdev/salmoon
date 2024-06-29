import { FaPaperPlane } from "react-icons/fa6";

import Link from "next/link";

import ChatFooter from "@/components/shared/chat-footer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ActionSection = () => {
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
          <p className="text-xs text-accent-foreground md:text-sm">
            Have a project in mind? Do let me know.
          </p>
        </div>
      </div>

      <Link
        href={"/"}
        className="group flex w-full items-center justify-between rounded-e-[50px] rounded-bl-md rounded-tl-[24px] border bg-background py-1.5 pl-4 pr-1.5 md:pl-6"
      >
        <p className="text-sm font-medium text-foreground">Get in touch.</p>
        <div className="anim h-auto w-fit rounded-full bg-green-500 px-6 py-2.5 md:bg-[#878787] md:group-hover:bg-green-500">
          <FaPaperPlane
            size={24}
            className="anim p-1 text-white group-hover:p-0.5 md:text-background md:group-hover:text-white"
          />
        </div>
      </Link>
    </div>
  );
};

export default ActionSection;
