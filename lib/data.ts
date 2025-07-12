// Stagger
import { DefaultAnimation } from "@/components/lab/examples/stagger/default-animation";
import { VariantAnimation } from "@/components/lab/examples/stagger/variant-animation";
import { ViewAnimation } from "@/components/lab/examples/stagger/view-animation";
// Toolbar
import { AdvancedToolbar } from "@/components/lab/examples/toolbar/advanced-toolbar";
import { BasicToolbar } from "@/components/lab/examples/toolbar/basic-toolbar";
import { DynamicToolbar } from "@/components/lab/examples/toolbar/dynamic-toolbar";

export type ComponentType = {
  name: string;
  slug: string;
  example: {
    child: React.ComponentType<any>;
    name: string;
    path: string;
  }[];
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
    name: "Toolbar",
    slug: "toolbar",
    description:
      "A flexible, animated toolbar built with layout transitions. Easily switch between modes or content with smooth visual feedback.",
    example: [
      { child: BasicToolbar, name: "Basic Toolbar", path: "basic-toolbar" },
      {
        child: AdvancedToolbar,
        name: "Advanced Toolbar",
        path: "advanced-toolbar",
      },
      {
        child: DynamicToolbar,
        name: "Dynamic Toolbar",
        path: "dynamic-toolbar",
      },
    ],
    gridClass: "large-card",
  },
  {
    name: "Stagger",
    slug: "stagger",
    description:
      "A flexible, animated toolbar built with layout transitions. Easily switch between modes or content with smooth visual feedback.",
    example: [
      {
        child: DefaultAnimation,
        name: "Default Animation",
        path: "default-animation",
      },
      {
        child: VariantAnimation,
        name: "Variant Animation",
        path: "variant-animation",
      },
      {
        child: ViewAnimation,
        name: "View Animation",
        path: "view-animation",
      },
    ],
    gridClass: "large-card",
  },
];

export const NEW_COMPONENT = COMPONENTS[COMPONENTS.length - 1];
