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
  ToolbarContent,
  ToolbarNavigation,
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
        <ToolbarNavigation targetMode="info" label="Info">
          <PiInfoBold size={16} />
        </ToolbarNavigation>
        <ToolbarNavigation targetMode="rich-text" label="Rich Text">
          <PiTextBBold size={16} />
        </ToolbarNavigation>
      </ToolbarContent>

      <ToolbarContent mode="rich-text">
        <ToolbarNavigation targetMode="default">
          <PiArrowLeftBold size={16} />
        </ToolbarNavigation>
        <ToolbarSeparator />
        <ToolbarNavigation>
          <PiTextItalicBold size={16} />
        </ToolbarNavigation>
        <ToolbarNavigation>
          <PiTextAaBold size={16} />
        </ToolbarNavigation>
        <ToolbarNavigation>
          <PiTextUnderlineBold size={16} />
        </ToolbarNavigation>
        <ToolbarSeparator />
        <ToolbarNavigation>
          <PiTextAlignLeftBold size={16} />
        </ToolbarNavigation>
        <ToolbarNavigation>
          <PiTextTBold size={16} />
        </ToolbarNavigation>
      </ToolbarContent>

      <ToolbarContent mode="info">
        <ToolbarNavigation targetMode="default">
          <PiArrowLeftBold size={16} />
        </ToolbarNavigation>
        <div className="flex min-w-36 flex-1 items-center px-2 md:min-w-48">
          <span className="mr-auto text-sm font-medium text-muted-foreground text-nowrap">
            John's Birthday
          </span>
        </div>
      </ToolbarContent>
    </Toolbar>
  );
};
