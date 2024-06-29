import { Suspense } from "react";

import CopyButton from "@/components/shared/copy-button";
import Shiki, { CodeProps } from "@/components/shared/shiki";

const Code: React.FC<CodeProps> = ({ code, lang }) => {
  return (
    <div className="relative h-fit w-full overflow-hidden rounded-lg bg-[#f7f7f7] dark:bg-[#101010]">
      <Suspense
        fallback={
          <div className="h-[272px] w-full animate-pulse bg-[#f7f7f7] dark:bg-[#101010]" />
        }
      >
        <Shiki code={code} lang={lang} />
      </Suspense>

      {/* Overlay */}
      <div className="absolute right-0 top-0 z-0 h-full w-12 bg-gradient-to-r from-transparent to-[#f7f7f7] dark:to-[#101010]" />

      {/* Copy Button */}
      <CopyButton string={code} className="absolute right-2 top-2 h-8 w-8" />
    </div>
  );
};

export default Code;
