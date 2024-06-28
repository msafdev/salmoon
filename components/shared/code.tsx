import { Suspense } from "react";

import Shiki, { CodeProps } from "@/components/shared/shiki";
import CopyButton from "@/components/shared/copy-button";

const Code: React.FC<CodeProps> = ({ code, lang, theme }) => {
  return (
    <div className="relative h-fit w-full overflow-hidden rounded-lg bg-[#121212]">
      <Suspense
        fallback={
          <div className="h-[212px] w-full animate-pulse bg-[#121212]" />
        }
      >
        <Shiki code={code} lang={lang} />
      </Suspense>

      {/* Overlay */}
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-r from-transparent to-[#121212]" />

      {/* Copy Button */}
      <CopyButton string={code} className="absolute right-2 top-2 h-8 w-8" />
    </div>
  );
};

export default Code;
