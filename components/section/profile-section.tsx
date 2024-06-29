import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileSection = () => {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-y-6">
      <div className="flex w-full items-center gap-x-4">
        <Avatar className="h-12 w-12 overflow-hidden border">
          <AvatarImage src="./ava.png" alt="Avatar" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-y-2">
          <h1 className="text-base font-bold leading-none">Muh Salman</h1>
          <p className="text-xs font-medium leading-none text-muted-foreground">
            Creative Developer{" "}
            <span className="hidden sm:inline-block">/ Full-Time Learner</span>
          </p>
        </div>
      </div>

      <p className="w-full text-sm text-muted-foreground md:text-base">
        I help <span className="font-medium text-foreground">humans</span> shape
        new ideas thru icons, illustrations and logos. I also enjoy crafting
        websites and bring them to life as a no-code enthusiast.
      </p>

      <div className="aspect-[6/5] h-auto w-full overflow-hidden rounded-xl border bg-muted xs:aspect-video"></div>
    </div>
  );
};

export default ProfileSection;
