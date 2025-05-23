import { codeToHtml } from "shiki";
import type { BundledLanguage } from "shiki";

import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";

import CopyButton from "@/components/shared/copy-button";

import { cn } from "@/lib/utils";

type CodeProps = {
  code: string;
  lang: BundledLanguage;
  lineNumber?: boolean;
  lineShine?: boolean;
};

export default async function Code({
  code,
  lang = "ts",
  lineNumber = false,
  lineShine = false,
  ...props
}: CodeProps) {
  const html = await codeToHtml(code, {
    lang,
    themes: { dark: "github-dark", light: "github-light" },
    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  });

  return (
    <div
      className="relative h-fit w-full overflow-hidden rounded-[8px] !bg-[#f7f7f7] dark:!bg-[#101010]"
      {...props}
    >
      <div
        className={cn(
          "no-scrollbar min-h-8 w-full min-w-0 overflow-x-auto rounded-xl text-sm [&_code]:block [&_code]:w-fit [&_code]:min-w-full",
          lineNumber ? "" : "no-line-numbers",
          lineShine ? "" : "no-line-shine",
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-6 bg-gradient-to-r from-transparent to-[#f7f7f7] dark:to-[#101010]" />

      <CopyButton string={code} className="absolute right-2 top-2 h-8 w-8" />
    </div>
  );
}
