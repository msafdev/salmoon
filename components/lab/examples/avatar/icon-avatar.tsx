import { PiUserDuotone } from "react-icons/pi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const IconAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="" alt="Error Avatar" />
      <AvatarFallback>a</AvatarFallback>
    </Avatar>
  );
};
