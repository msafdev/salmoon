import { codeToHtml } from "shiki";
import type { BundledLanguage } from "shiki";

import { transformerNotationHighlight } from "@shikijs/transformers";

export type CodeProps = {
  code: string;
  lang?: BundledLanguage;
};

export default async function Shiki({ code, lang = "javascript" }: CodeProps) {
  const html = await codeToHtml(code, {
    lang,
    themes: { dark: "github-dark", light: "github-light" },
    transformers: [transformerNotationHighlight()],
    // colorReplacements: {
    //   "github-dark": {
    //     "#5de4c7": "#e3e3e3",
    //     "#a6accd": "#f7f7f7",
    //     "#add7ff": "#a5a5a5",
    //     "#91bfd5": "#a5a5a5",
    //     "#e4f0fb": "#e3e3e3",
    //     "#91b4d5": "#a5a5a5",
    //     "#e4f0fbd0": "#e5e5e5",
    //     "#5de4c7c0": "#eeeeee",
    //     "#7390aa": "#a5a5a5",
    //     "#d0679d": "#a5a5a5",
    //     "#a6accdc0": "#a8a8a8",
    //   },
    //   "github-light": {
    //     "#5de4c7": "#4a4a4a",
    //     "#a6accd": "#5e5e5e",
    //     "#add7ff": "#0c0c0c",
    //     "#91bfd5": "#0c0c0c",
    //     "#e4f0fb": "#4a4a4a",
    //     "#91b4d5": "#0c0c0c",
    //     "#e4f0fbd0": "#4c4c4c",
    //     "#5de4c7c0": "#555",
    //     "#7390aa": "#0c0c0c",
    //     "#d0679d": "#0c0c0c",
    //     "#a6accdc0": "#0f0f0f",
    //   },
    // },
  });

  return (
    <div
      className="no-scrollbar w-full min-w-0 overflow-x-auto rounded-xl text-xs md:text-sm [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
