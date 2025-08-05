"use client";

import {
  PiArrowLeftBold,
  PiInfoBold,
  PiTextAaBold,
  PiTextAlignLeftBold,
  PiTextBBold,
  PiTextItalicBold,
  PiTextTBold,
  PiTextUnderlineBold,
} from "react-icons/pi";

import {
  Toolbar,
  ToolbarButton,
  ToolbarContent,
  ToolbarSeparator,
} from "@/components/lab/toolbar";

export const BasicToolbar = () => {
  return (
    <Toolbar
      defaultMode="default"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      }}
    >
      <ToolbarContent mode="default">
        <ToolbarButton targetMode="info" label="Info">
          <PiInfoBold size={16} />
        </ToolbarButton>
        <ToolbarButton targetMode="rich-text" label="Rich Text">
          <PiTextBBold size={16} />
        </ToolbarButton>
      </ToolbarContent>

      <ToolbarContent mode="rich-text">
        <ToolbarButton targetMode="default">
          <PiArrowLeftBold size={16} />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton onClick={() => console.log("Italic clicked")}>
          <PiTextItalicBold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => console.log("Text Aa clicked")}>
          <PiTextAaBold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => console.log("Underline clicked")}>
          <PiTextUnderlineBold size={16} />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton onClick={() => console.log("Align Left clicked")}>
          <PiTextAlignLeftBold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => console.log("Bold clicked")}>
          <PiTextTBold size={16} />
        </ToolbarButton>
      </ToolbarContent>

      <ToolbarContent mode="info">
        <ToolbarButton targetMode="default">
          <PiArrowLeftBold size={16} />
        </ToolbarButton>
        <div className="flex min-w-36 flex-1 items-center px-2 md:min-w-48">
          <span className="text-muted-foreground mr-auto text-sm font-medium text-nowrap">
            John's Birthday
          </span>
        </div>
      </ToolbarContent>
    </Toolbar>
  );
};
