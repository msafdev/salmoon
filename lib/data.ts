import dynamic from "next/dynamic";

import EmailDetail from "@/components/lab/email-detail";

// prettier-ignore
const ClassicCounter = dynamic(() => import("@/components/lab/classic-counter"));
const StackedImage = dynamic(() => import("@/components/lab/stacked-image"));
const Tags = dynamic(() => import("@/components/lab/tags"));
const AvatarStatus = dynamic(() => import("@/components/lab/avatar-status"));
const ChatBubble = dynamic(() => import("@/components/lab/chat-bubble"));
const DynamicIsland = dynamic(() => import("@/components/lab/dynamic-island"));
const LoadingBar = dynamic(() => import("@/components/lab/loading-bar"));
const ShiningBadge = dynamic(() => import("@/components/lab/shining-badge"));
const Timeline = dynamic(() => import("@/components/lab/timeline"));
const Toolbar = dynamic(() => import("@/components/lab/toolbar"));
const Tooltip = dynamic(() => import("@/components/lab/tooltip"));
const SwipeButton = dynamic(() => import("@/components/lab/swipe-button"));
const StackedAvatar = dynamic(() => import("@/components/lab/stacked-avatar"));
const MusicCard = dynamic(() => import("@/components/lab/music-card"));

export type ComponentType = {
  name: string;
  slug: string;
  child: React.ComponentType<any>;
  description?: string;
  twConfig?: object;
  cssClass?: string;
  gridClass?: "regular-card" | "medium-card" | "large-card" | "default-card";
  uiLibrary?: string;
};

export type TWConfig = {
  [key: string]: object;
};

export const TW_CONFIG: TWConfig = {
  ["background-shine"]: {
    animation: {
      "background-shine": "background-shine 2s infinite linear",
    },
    keyframes: {
      "background-shine": {
        "0%": {
          backgroundPosition: "0 0",
        },
        "100%": {
          backgroundPosition: "-200% 0",
        },
      },
    },
  },
  ["marquee"]: {
    animation: {
      marquee: "marquee 40s linear infinite",
    },
    keyframes: {
      marquee: {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(calc(-100% - 16px))" },
      },
    },
  },
};

export const COMPONENTS: ComponentType[] = [
  {
    name: "Tags",
    slug: "tags",
    child: Tags,
  },
  {
    name: "Avatar with Status",
    slug: "avatar-status",
    child: AvatarStatus,
    uiLibrary: "npx shadcn-ui@latest add avatar",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    child: Tooltip,
    gridClass: "large-card",
    uiLibrary: "npx shadcn-ui@latest add avatar button",
  },
  {
    name: "Loading Bar",
    slug: "loading-bar",
    child: LoadingBar,
  },
  {
    name: "Stacked Image",
    slug: "stacked-image",
    child: StackedImage,
  },
  {
    name: "Classic Counter",
    slug: "classic-counter",
    child: ClassicCounter,
    uiLibrary: "npx shadcn-ui@latest add button",
  },
  {
    name: "Stacked Avatar",
    slug: "stacked-avatar",
    child: StackedAvatar,
    uiLibrary: "npx shadcn-ui@latest add avatar",
  },
  {
    name: "Chat Bubble",
    slug: "chat-bubble",
    child: ChatBubble,
    gridClass: "large-card",
  },
  {
    name: "Timeline",
    slug: "timeline",
    child: Timeline,
  },
  {
    name: "Swipe Button",
    slug: "swipe-button",
    child: SwipeButton,
  },
  {
    name: "Music Card",
    slug: "music-card",
    child: MusicCard,
  },
  {
    name: "Toolbar",
    slug: "toolbar",
    child: Toolbar,
    gridClass: "large-card",
    uiLibrary: "npx shadcn-ui@latest add button",
  },
  {
    name: "Shining Badge",
    slug: "shining-badge",
    child: ShiningBadge,
    twConfig: TW_CONFIG["background-shine"],
  },
  {
    name: "Email Detail",
    slug: "email-detail",
    child: EmailDetail,
    gridClass: "large-card",
    cssClass: `.detail-text span {
  transition: color 0.3s;
}

.detail-text:has(span.active) span:not(.active) {
  color: hsl(var(--muted-foreground));
}`,
  },
];

export const NEW_COMPONENT = COMPONENTS[COMPONENTS.length - 1];
