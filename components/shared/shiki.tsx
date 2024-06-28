import { codeToHtml } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki";

export type CodeProps = {
  code: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
};

export default async function Shiki({
  code,
  lang = "javascript",
  theme = "poimandres",
}: CodeProps) {
  const html = await codeToHtml(code, {
    lang,
    theme,
    colorReplacements: {
      "#5de4c7": "#e3e3e3",
      "#a6accd": "#f7f7f7",
      "#add7ff": "#a5a5a5",
      "#91bfd5": "#a5a5a5",
      "#e4f0fb": "#e3e3e3",
      "#91b4d5": "#a5a5a5",
      "#e4f0fbd0": "#e5e5e5",
      "#5de4c7c0": "#eeeeee",
      "#7390aa": "#a5a5a5",
      "#d0679d": "#a5a5a5",
      "#a6accdc0": "#a8a8a8",
    },
  });

  return (
    <div
      className="no-scrollbar w-full min-w-0 overflow-x-auto rounded-xl px-6 py-4 [&>*]:text-xs md:[&>*]:text-sm [&>pre>code>.line]:pr-10 [&>pre]:!bg-transparent"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
