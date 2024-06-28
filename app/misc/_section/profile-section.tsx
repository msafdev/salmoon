import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileSection = () => {
  return (
    <div className="max-w-xl w-full flex flex-col gap-y-6 items-center">
      <div className="flex w-full gap-x-4 items-center">
        <Avatar className="border overflow-hidden w-16 h-16">
          <AvatarImage src="./ava.png" alt="Avatar" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-y-1">
          <h1 className="text-base font-bold leading-none">Muh Salman</h1>
          <p className="text-xs text-muted-foreground leading-none font-medium">
            Creative Developer <span className="hidden sm:inline-block">/ Full-Time Learner</span>
          </p>
        </div>
      </div>

      <p className="text-sm md:text-base text-muted-foreground w-full">
        I help <span className="text-foreground font-medium">humans</span> shape new ideas thru icons, illustrations and logos. I
        also enjoy crafting websites and bring them to life as a no-code
        enthusiast.
      </p>

      <div className="w-full h-auto aspect-[6/5] xs:aspect-video border rounded-xl overflow-hidden"></div>
    </div>
  );
};

export default ProfileSection;