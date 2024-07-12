import { Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profiles = [
  {
    username: "msafdev",
    fallback: "MS",
  },
  {
    username: "shadcn",
    fallback: "CN",
  },
  {
    username: "leerob",
    fallback: "LR",
  },
];

const StackedAvatar = () => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex items-center -space-x-4">
        {profiles.map((profile, index) => (
          <Avatar
            key={index}
            className="group/avatar relative cursor-pointer overflow-visible shadow"
          >
            <AvatarImage
              src={`https://github.com/${profile.username}.png`}
              alt="@shadcn"
              className="rounded-full"
            />
            <AvatarFallback className="rounded-full">
              {profile.fallback}
            </AvatarFallback>
            <code className="absolute -bottom-5 left-1/2 z-10 -translate-x-1/2 text-xs text-accent-foreground underline underline-offset-2 opacity-0 transition-all duration-300 ease-in-out group-hover/avatar:opacity-100">
              {profile.username}
            </code>
          </Avatar>
        ))}
      </div>
      <p className="inline-flex items-center">
        <span className="text-sm font-medium text-muted-foreground">99</span>
        <Plus className="h-3 w-3 text-foreground" />
      </p>
    </div>
  );
};

export default StackedAvatar;
