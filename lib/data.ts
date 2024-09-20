import dynamic from "next/dynamic";

// prettier-ignore
const ClassicCounter = dynamic(() => import("@/components/lab/classic-counter"));
const StackedImage = dynamic(() => import("@/components/lab/stacked-image"));
const Tags = dynamic(() => import("@/components/lab/tags"));
const ChatBubble = dynamic(() => import("@/components/lab/chat-bubble"));
const LoadingBar = dynamic(() => import("@/components/lab/loading-bar"));
const ShiningBadge = dynamic(() => import("@/components/lab/shining-badge"));
const Timeline = dynamic(() => import("@/components/lab/timeline"));
const Toolbar = dynamic(() => import("@/components/lab/toolbar"));
const Tooltip = dynamic(() => import("@/components/lab/tooltip"));
const SwipeButton = dynamic(() => import("@/components/lab/swipe-button"));
const StackedAvatar = dynamic(() => import("@/components/lab/stacked-avatar"));
const EmailDetail = dynamic(() => import("@/components/lab/email-detail"));
const TransactionButton = dynamic(
  () => import("@/components/lab/transaction-button"),
);
const TextScatter = dynamic(() => import("@/components/lab/text-scatter"));
const VinylRecord = dynamic(() => import("@/components/lab/vinyl-record"));

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
  ["vinyl-spin"]: {
    animation: {
      "vinyl-spin": "vinyl-spin 3s linear infinite",
    },
    keyframes: {
      "vinyl-spin": {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
  },
};

export const COMPONENTS: ComponentType[] = [
  {
    name: "Timeline",
    slug: "timeline",
    child: Timeline,
    gridClass: "large-card",
  },
  {
    name: "Tags",
    slug: "tags",
    child: Tags,
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
    name: "Swipe Button",
    slug: "swipe-button",
    child: SwipeButton,
  },
  {
    name: "Toolbar",
    slug: "toolbar",
    child: Toolbar,
    gridClass: "large-card",
    uiLibrary: "npx shadcn-ui@latest add button",
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
  {
    name: "Transaction Button",
    slug: "transaction-button",
    child: TransactionButton,
    gridClass: "large-card",
  },
  {
    name: "Text Scatter",
    slug: "text-scatter",
    child: TextScatter,
  },
  {
    name: "Shining Badge",
    slug: "shining-badge",
    child: ShiningBadge,
    twConfig: TW_CONFIG["background-shine"],
  },
  {
    name: "Vinyl Record",
    slug: "vinyl-record",
    child: VinylRecord,
    gridClass: "large-card",
    twConfig: TW_CONFIG["vinyl-spin"],
  },
];

export const NEW_COMPONENT = COMPONENTS[COMPONENTS.length - 1];
