import { Plus_Jakarta_Sans } from "next/font/google";

import CustomLink from "@/components/shared/custom-link";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const HomeSection = () => {
  return (
    <div className="max-w-2xl w-full flex flex-col gap-y-4">
      <h1
        className={`${plusJakartaSans.className} text-balance text-2xl xs:text-4xl font-bold leading-8 xs:leading-[42px] group`}
      >
        creative mind for a more unique perspective
        <span className="group-hover:text-pink-500 anim">.</span>
      </h1>

      <div className="flex w-full gap-x-4 flex-wrap gap-y-2">
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
