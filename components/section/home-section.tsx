import CustomLink from "@/components/shared/custom-link";
import Title from "@/components/shared/title";

const HomeSection = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-y-4">
      <Title />

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
