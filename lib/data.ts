import AnimatedImage from "@/components/lab/animated-image";
import AvatarStatus from "@/components/lab/avatar-status";
import DigitalClock from "@/components/lab/digital-clock";
import EncryptedText from "@/components/lab/encrypted-text";
import LoadingBar from "@/components/lab/loading-bar";
import LoadingCircle from "@/components/lab/loading-circle";
import ShiningBadge from "@/components/lab/shining-badge";
import SwipeButton from "@/components/lab/swipe-button";
import Timeline from "@/components/lab/timeline";
import Tooltip from "@/components/lab/tooltip";

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
    name: "Digital Clock",
    slug: "digital-clock",
    child: DigitalClock,
    gridClass: "medium-card",
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
    name: "Shining Badge",
    slug: "shining-badge",
    child: ShiningBadge,
    twConfig: TW_CONFIG["background-shine"],
  },
  {
    name: "Encrypted Text",
    slug: "encrypted-text",
    child: EncryptedText,
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
];

export const NEW_COMPONENT = COMPONENTS[COMPONENTS.length - 1];
