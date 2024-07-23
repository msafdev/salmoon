import CustomLink from "@/components/shared/custom-link";

const HomeSection = () => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-y-4">
      <h1 className="text-balance text-xl font-bold leading-7 xs:text-2xl xs:leading-8 sm:text-4xl sm:leading-[42px]">
        creative mind for a more unique perspective
        <span className="text-pink-500">.</span>
      </h1>

      <div className="flex w-full flex-wrap gap-x-4 gap-y-2">
        <CustomLink href="mailto:salmanalfarisi261002@gmail.com">
          Email
        </CustomLink>
        <CustomLink href="https://linkedin.com/in/muhammadsalmoon">
          LinkedIn
        </CustomLink>
        <CustomLink href="https://github.com/msafdev">Github</CustomLink>
      </div>
    </div>
  );
};

export default HomeSection;
