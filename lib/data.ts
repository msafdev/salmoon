import dynamic from "next/dynamic";

const ClassicCounter = dynamic(() => import("@/components/lab/classic-counter")); // prettier-ignore
const StackedImage = dynamic(() => import("@/components/lab/stacked-image")); // prettier-ignore
const Tags = dynamic(() => import("@/components/lab/tags")); // prettier-ignore
const ChatBubble = dynamic(() => import("@/components/lab/chat-bubble")); // prettier-ignore
const Timeline = dynamic(() => import("@/components/lab/timeline")); // prettier-ignore
const Toolbar = dynamic(() => import("@/components/lab/toolbar")); // prettier-ignore
const EmailDetail = dynamic(() => import("@/components/lab/email-detail")); // prettier-ignore
const TransactionButton = dynamic(() => import("@/components/lab/transaction-button")); // prettier-ignore
const TextScatter = dynamic(() => import("@/components/lab/text-scatter")); // prettier-ignore

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
    name: "Stacked Image",
    slug: "stacked-image",
    child: StackedImage,
  },
  {
    name: "Toolbar",
    slug: "toolbar",
    child: Toolbar,
    gridClass: "large-card",
    uiLibrary: "npx shadcn-ui@latest add button",
  },
  {
    name: "Classic Counter",
    slug: "classic-counter",
    child: ClassicCounter,
    uiLibrary: "npx shadcn-ui@latest add button",
  },
  {
    name: "Chat Bubble",
    slug: "chat-bubble",
    child: ChatBubble,
    gridClass: "large-card",
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
];

export const NEW_COMPONENT = COMPONENTS[COMPONENTS.length - 1];
