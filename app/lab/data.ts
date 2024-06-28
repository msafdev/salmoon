import AnimatedImage from "@/components/lab/animated-image";
import AvatarStatus from "@/components/lab/avatar-status";
import SwipeButton from "@/components/lab/swipe-button";
import Tooltip from "@/components/lab/tooltip";

export type ComponentType = {
  name: string;
  slug: string;
  child: React.ComponentType<any>;
  twConfig?: object;
  gridClass?: string;
};

export type TWConfig = {
  [key: string]: object;
};

export const COMPONENTS: ComponentType[] = [
  {
    name: "Avatar with Status",
    slug: "avatar-status",
    child: AvatarStatus,
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    child: Tooltip,
    gridClass: "medium-card",
  },
  {
    name: "Animated Image",
    slug: "animated-image",
    child: AnimatedImage,
  },
  {
    name: "Swipe Button",
    slug: "swipe-button",
  child: SwipeButton,
  },
];
