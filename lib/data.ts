import dynamic from "next/dynamic";

// prettier-ignore
const AnimatedCounter = dynamic(() => import("@/components/lab/animated-counter"));
const AnimatedImage = dynamic(() => import("@/components/lab/animated-image"));
const AnimatedTags = dynamic(() => import("@/components/lab/animated-tags"));
const AvatarStatus = dynamic(() => import("@/components/lab/avatar-status"));
const ChatBubble = dynamic(() => import("@/components/lab/chat-bubble"));
const DynamicIsland = dynamic(() => import("@/components/lab/dynamic-island"));
const LoadingBar = dynamic(() => import("@/components/lab/loading-bar"));
const LoadingCircle = dynamic(() => import("@/components/lab/loading-circle"));
const ShiningBadge = dynamic(() => import("@/components/lab/shining-badge"));
const Timeline = dynamic(() => import("@/components/lab/timeline"));
const Toolbar = dynamic(() => import("@/components/lab/toolbar"));
const Tooltip = dynamic(() => import("@/components/lab/tooltip"));
const SwipeButton = dynamic(() => import("@/components/lab/swipe-button"));

export type ComponentType = {
  name: string;
  slug: string;
  child: React.ComponentType<any>;
  description?: string;
  twConfig?: object;
  gridClass?: "regular-card" | "medium-card" | "large-card" | "default-card";
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
    name: "Animated Tags",
    slug: "animated-tags",
    child: AnimatedTags,
  },
  {
    name: "Avatar with Status",
    slug: "avatar-status",
    child: AvatarStatus,
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    child: Tooltip,
    gridClass: "large-card",
  },
  {
    name: "Loading Circle",
    slug: "loading-circle",
    child: LoadingCircle,
  },
  {
    name: "Loading Bar",
    slug: "loading-bar",
    child: LoadingBar,
  },
  {
    name: "Animated Image",
    slug: "animated-image",
    child: AnimatedImage,
  },
  {
    name: "Dynamic Island",
    slug: "dynamic-island",
    child: DynamicIsland,
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
    name: "Animated Counter",
    slug: "animated-counter",
    child: AnimatedCounter,
  },
  {
    name: "Toolbar",
    slug: "toolbar",
    child: Toolbar,
    gridClass: "large-card",
  },
  {
    name: "Shining Badge",
    slug: "shining-badge",
    child: ShiningBadge,
    twConfig: TW_CONFIG["background-shine"],
  },
];

export const NEW_COMPONENT = COMPONENTS[COMPONENTS.length - 1];
