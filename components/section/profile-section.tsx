import Places from "@/components/shared/places";
import { Profile } from "@/components/shared/profile";

const ProfileSection = () => {
  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <div className="flex w-full max-w-lg flex-col gap-y-4">
        <Profile />

        <div className="flex flex-col gap-y-1 md:gap-y-0">
          <div className="flex items-center gap-x-2">
            <h1 className="text-base font-semibold leading-none md:text-lg">
              Salman Alfarisi
            </h1>

            <CheckmarkIcon />
          </div>
          <p className="text-xs font-medium leading-none text-muted-foreground md:text-sm">
            Fullstack Engineer
          </p>
        </div>
      </div>

      <p className="w-full max-w-lg text-sm text-muted-foreground md:text-base">
        I am a fullstack engineer based in{" "}
        <span className="font-medium text-foreground">Indonesia</span>,
        specifically in Semarang. In my free time, I enjoy listening to music
        and exploring new places.
      </p>

      <Places />
    </div>
  );
};

export default ProfileSection;

const CheckmarkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#1db7f9"
      stroke="hsl(var(--background))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
};
