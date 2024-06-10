import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatFooter from "@/components/shared/chat-footer";

const ChatSection = () => {
  return (
    <div className="max-w-2xl flex flex-col gap-y-4 items-start w-full md:p-4">
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
            Hi there, I'm Salman.
          </p>
        </div>
      </div>

      {/* Second Chat */}
      <div className="flex w-full">
        <div className="flex px-6 py-3 bg-accent rounded-3xl rounded-bl-md border">
          <p className="text-accent-foreground text-sm">
            A creative developer since 2020. I'm passionate about crafting
            beautiful interface designs and attention to detail.
          </p>
        </div>
      </div>

      {/* Third Chat */}
      <div className="flex flex-col gap-y-2">
        <div className="flex px-6 py-3 bg-accent rounded-3xl rounded-bl-md border">
          <p className="text-accent-foreground text-sm">
            Now I'm creating my own freelancing business, exploring methods, and
            leveling up both my design and programming skills.
          </p>
        </div>

        <ChatFooter time={4} />
      </div>
    </div>
  );
};

export default ChatSection;
