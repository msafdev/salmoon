import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const BasicAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/msafdev.png" alt="User Avatar" />
      <AvatarFallback>MS</AvatarFallback>
    </Avatar>
  );
};
