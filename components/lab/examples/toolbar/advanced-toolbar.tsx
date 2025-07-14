"use client";

import {
  PiArrowLeftBold,
  PiBellDuotone,
  PiCalendarDuotone,
  PiEyeDuotone,
  PiGearDuotone,
  PiMagnifyingGlassDuotone,
  PiSidebarDuotone,
  PiSlidersDuotone,
  PiSlidersHorizontalDuotone,
  PiSparkleDuotone,
} from "react-icons/pi";

import {
  ToolbarContent,
  ToolbarInput,
  ToolbarButton,
  Toolbar,
  ToolbarSeparator,
} from "@/components/lab/toolbar";

export const AdvancedToolbar = () => {
  return (
    <Toolbar defaultMode="main">
      <ToolbarContent mode="main">
        <ToolbarButton targetMode="calendar" label="Calendar">
          <PiCalendarDuotone size={16} />
        </ToolbarButton>
        <ToolbarButton targetMode="search" label="Search">
          <PiMagnifyingGlassDuotone size={16} />
        </ToolbarButton>
        <ToolbarButton targetMode="notification" label="Notifications">
          <PiBellDuotone size={16} />
        </ToolbarButton>
        <ToolbarSeparator className="shrink" />
        <ToolbarButton targetMode="settings" label="Settings">
          <PiGearDuotone className="size-4" />
        </ToolbarButton>
      </ToolbarContent>

      <ToolbarContent mode="search">
        <ToolbarButton targetMode="main">
          <PiArrowLeftBold size={16} />
        </ToolbarButton>
        <ToolbarInput
          placeholder="Search..."
          autoFocus
          className="min-w-28 md:min-w-52"
        />
      </ToolbarContent>

      <ToolbarContent mode="calendar">
        <ToolbarButton targetMode="main">
          <PiArrowLeftBold size={16} />
        </ToolbarButton>
        <div className="flex min-w-32 flex-1 items-center px-2 md:min-w-64">
          <span className="text-sm font-medium">Today's Events</span>
          <div className="ml-auto hidden items-center gap-1 md:flex">
            <div className="size-1.5 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">3 events</span>
          </div>
        </div>
      </ToolbarContent>

      <ToolbarContent mode="notification">
        <ToolbarButton targetMode="main">
          <PiArrowLeftBold size={16} />
        </ToolbarButton>
        <div className="flex min-w-36 flex-1 items-center px-2 md:min-w-72">
          <span className="text-sm font-medium">Notifications</span>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <div className="size-1.5 rounded-full bg-red-500"></div>
            <span className="text-xs text-muted-foreground">2 new</span>
          </div>
        </div>
        <ToolbarButton targetMode="notification-details">
          <PiEyeDuotone size={16} />
        </ToolbarButton>
      </ToolbarContent>

      <ToolbarContent mode="notification-details">
        <ToolbarButton targetMode="main">
          <PiArrowLeftBold size={16} />
        </ToolbarButton>
        <div className="flex min-w-36 flex-1 items-center px-2 md:min-w-64">
          <p className="text-sm font-medium">Pramudya</p>
          <span className="ml-auto text-xs text-muted-foreground">
            "Hello!"
          </span>
        </div>
      </ToolbarContent>

      <ToolbarContent
        mode="settings"
        className="flex-col items-start justify-start"
      >
        <ToolbarButton targetMode="main">
          <PiArrowLeftBold size={16} />
        </ToolbarButton>
        <ToolbarSeparator variants="horizontal" />
        <ToolbarButton>
          <PiSidebarDuotone size={16} />
        </ToolbarButton>
        <ToolbarButton>
          <PiSlidersHorizontalDuotone size={16} />
        </ToolbarButton>
        <ToolbarButton>
          <PiSlidersDuotone size={16} />
        </ToolbarButton>
        <ToolbarButton>
          <PiSparkleDuotone size={16} />
        </ToolbarButton>
      </ToolbarContent>
    </Toolbar>
  );
};
