import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const StackAvatar = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        <Avatar className="size-8 border-2 border-background">
          <AvatarImage
            src="https://github.com/msafdev.png"
            alt="User 1 Avatar"
          />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 border-2 border-background">
          <AvatarImage
            src="https://github.com/prampokan.png"
            alt="User Avatar 3"
          />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 border-2 border-background">
          <AvatarImage
            src="https://github.com/leerob.png"
            alt="User 3 Avatar"
          />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
      </div>

      <p className="text-xs font-medium">+100</p>
    </div>
  );
};
