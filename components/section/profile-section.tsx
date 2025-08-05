import Places from "@/components/shared/places";

const ProfileSection = () => {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-1 md:space-y-0">
        <div className="flex items-center gap-x-2">
          <h1 className="text-base leading-none font-semibold md:text-lg">
            Salman Alfarisi
          </h1>

          <CheckmarkIcon />
        </div>
        <p className="text-muted-foreground text-xs leading-none font-medium md:text-sm">
          Product Engineer
        </p>
      </div>

      <p className="text-muted-foreground w-full max-w-lg pb-4 text-sm md:text-base">
        I am a product engineer based in{" "}
        <span className="text-foreground font-medium">Indonesia</span>,
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
