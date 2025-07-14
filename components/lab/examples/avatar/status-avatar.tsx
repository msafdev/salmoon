import { LuBadgeAlert, LuBadgeCheck, LuBadgeX, LuX } from "react-icons/lu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const StatusAvatar = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Avatar>
          <AvatarImage
            src="https://github.com/msafdev.png"
            alt="Status Avatar"
          />
          <AvatarFallback>
            <LuX />
          </AvatarFallback>
        </Avatar>
        <LuBadgeAlert
          size={20}
          className="absolute -bottom-1 -right-1 fill-blue-500 text-background"
        />
      </div>
      <div className="relative">
        <Avatar>
          <AvatarImage
            src="https://github.com/msafdev.png"
            alt="Status Avatar"
          />
          <AvatarFallback>
            <LuX />
          </AvatarFallback>
        </Avatar>
        <LuBadgeCheck
          size={20}
          className="absolute -bottom-1 -right-1 fill-green-500 text-background"
        />
      </div>
      <div className="relative">
        <Avatar>
          <AvatarImage
            src="https://github.com/msafdev.png"
            alt="Status Avatar"
          />
          <AvatarFallback>
            <LuX />
          </AvatarFallback>
        </Avatar>
        <LuBadgeX
          size={20}
          className="absolute -bottom-1 -right-1 fill-red-500 text-background"
        />
      </div>
    </div>
  );
};
