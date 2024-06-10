import { Plus_Jakarta_Sans } from "next/font/google";

import Badge from "@/components/shared/badge";
import CopyButton from "@/components/shared/copy-button";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const HomeSection = () => {
  return (
    <div className="max-w-2xl w-full flex flex-col gap-y-4">
      <Badge />

      <h1
        className={`${plusJakartaSans.className} text-balance text-3xl md:text-5xl font-bold leading-9 md:leading-[52px] group`}
      >
        creative mind for a more unique perspective
        <span className="group-hover:text-pink-500 anim">.</span>
      </h1>

      <CopyButton />
    </div>
  );
};

export default HomeSection;
