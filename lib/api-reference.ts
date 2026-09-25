export interface PropItem {
  name: string;
  type: string;
  typeCategory?:
    | "string"
    | "number"
    | "boolean"
    | "function"
    | "union"
    | "object"
    | "react";
  defaultValue?: string;
  description: string;
  expandedType?: string;
}

export interface ComponentApi {
  title?: string;
  description?: string;
  props: PropItem[];
}

export const API_REFERENCES: Record<string, ComponentApi[]> = {
  stagger: [
    {
      title: "Stagger",
      description:
        "Root container orchestrating staggered animations across child elements.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          typeCategory: "react",
          defaultValue: "-",
          description:
            "Elements or components to animate with a staggered entrance.",
          expandedType: "React.ReactNode",
        },
        {
          name: "staggerDelay",
          type: "number",
          typeCategory: "number",
          defaultValue: "0.1",
          description:
            "Delay in seconds between each consecutive child animation.",
          expandedType: "number",
        },
        {
          name: "duration",
          type: "number",
          typeCategory: "number",
          defaultValue: "0.6",
          description: "Duration in seconds for each child's transition.",
          expandedType: "number",
        },
        {
          name: "trigger",
          type: "boolean",
          typeCategory: "boolean",
          defaultValue: "-",
          description:
            "Re-triggers the entrance animation whenever this value changes.",
          expandedType: "boolean | undefined",
        },
        {
          name: "inView",
          type: "boolean",
          typeCategory: "boolean",
          defaultValue: "false",
          description:
            "Only initiates the staggered animation when the element scrolls into the viewport.",
          expandedType: "boolean",
        },
        {
          name: "once",
          type: "boolean",
          typeCategory: "boolean",
          defaultValue: "true",
          description:
            "Whether the viewport-triggered animation should only execute once.",
          expandedType: "boolean",
        },
        {
          name: "margin",
          type: "string",
          typeCategory: "string",
          defaultValue: '"0px"',
          description:
            "Intersection observer root margin applied when inView is enabled.",
          expandedType: "MarginType",
        },
        {
          name: "staggerVariants",
          type: "StaggerVariants",
          typeCategory: "object",
          defaultValue: "-",
          description:
            "Custom Framer Motion animation variants for the container and children.",
          expandedType:
            "{ container?: MotionProps['variants']; child?: MotionProps['variants'] }",
        },
      ],
    },
  ],
  timeline: [
    {
      title: "Timeline",
      description:
        "Root timeline provider managing active step state and layout orientation.",
      props: [
        {
          name: "value",
          type: "number",
          typeCategory: "number",
          defaultValue: "-",
          description:
            "Controlled 1-based index of the currently active/completed step.",
          expandedType: "number | undefined",
        },
        {
          name: "defaultValue",
          type: "number",
          typeCategory: "number",
          defaultValue: "1",
          description: "Initial active step index for uncontrolled usage.",
          expandedType: "number",
        },
        {
          name: "onValueChange",
          type: "function",
          typeCategory: "function",
          defaultValue: "-",
          description: "Callback fired whenever the active step changes.",
          expandedType: "(val: number) => void",
        },
        {
          name: "orientation",
          type: "Union",
          typeCategory: "union",
          defaultValue: '"vertical"',
          description: "Directional layout of the timeline flow.",
          expandedType: '"horizontal" | "vertical"',
        },
      ],
    },
    {
      title: "TimelineItem",
      description:
        "Individual timeline step wrapping content, indicators, and lines.",
      props: [
        {
          name: "step",
          type: "number",
          typeCategory: "number",
          defaultValue: "-",
          description:
            "1-based step number corresponding to the timeline progression.",
          expandedType: "number",
        },
      ],
    },
    {
      title: "TimelineSeparator",
      description: "Connecting line rendered between timeline nodes.",
      props: [
        {
          name: "variant",
          type: "Union",
          typeCategory: "union",
          defaultValue: '"solid"',
          description: "Visual stroke style of the connecting track.",
          expandedType: '"solid" | "dashed" | "dotted"',
        },
      ],
    },
    {
      title: "TimelineDate",
      description: "Timestamp or milestone indicator for a timeline entry.",
      props: [
        {
          name: "asChild",
          type: "boolean",
          typeCategory: "boolean",
          defaultValue: "false",
          description:
            "Merges properties onto the child component instead of rendering a native <time> element.",
          expandedType: "boolean",
        },
      ],
    },
  ],
  cursor: [
    {
      title: "Cursor",
      description:
        "Context wrapper tracking pointer position within the target container.",
      props: [
        {
          name: "spring",
          type: "boolean",
          typeCategory: "boolean",
          defaultValue: "false",
          description:
            "Applies physics-based spring smoothing and damping to cursor coordinates.",
          expandedType: "boolean",
        },
        {
          name: "children",
          type: "ReactNode",
          typeCategory: "react",
          defaultValue: "-",
          description: "CursorPointer, CursorBody, or custom motion elements.",
          expandedType: "React.ReactNode",
        },
      ],
    },
    {
      title: "CursorPointer",
      description:
        "Custom pointer icon or target centered directly at mouse coordinates.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          typeCategory: "react",
          defaultValue: "-",
          description: "Custom SVG icon or cursor pointer graphic.",
          expandedType: "React.ReactNode",
        },
      ],
    },
    {
      title: "CursorBody",
      description:
        "Floating badge or tooltip offset from the cursor coordinate.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          typeCategory: "react",
          defaultValue: "-",
          description:
            "Label text or secondary metadata rendered inside the pill.",
          expandedType: "React.ReactNode",
        },
      ],
    },
  ],
  tree: [
    {
      title: "Tree",
      description: "Hierarchical file and folder tree component.",
      props: [
        {
          name: "data",
          type: "TreeData",
          typeCategory: "object",
          defaultValue: "-",
          description:
            "Recursive node hierarchy for programmatic data-driven rendering.",
          expandedType: "{ nodes: TreeNode[] }",
        },
        {
          name: "variant",
          type: "Union",
          typeCategory: "union",
          defaultValue: '"lines"',
          description: "Visual branch line connector style.",
          expandedType: '"lines" | "no-lines"',
        },
        {
          name: "border",
          type: "Union",
          typeCategory: "union",
          defaultValue: '"solid"',
          description: "Border style used for tree connection lines.",
          expandedType: '"solid" | "dashed"',
        },
        {
          name: "onNodeClick",
          type: "function",
          typeCategory: "function",
          defaultValue: "-",
          description:
            "Callback invoked when any file or folder node is clicked.",
          expandedType: "(node: TreeNode) => void",
        },
      ],
    },
    {
      title: "TreeFolder",
      description:
        "Collapsible folder node supporting custom open/closed icons.",
      props: [
        {
          name: "id",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Unique identifier for tracking expanded state.",
          expandedType: "string",
        },
        {
          name: "name",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Display label for the folder.",
          expandedType: "string",
        },
        {
          name: "defaultExpanded",
          type: "boolean",
          typeCategory: "boolean",
          defaultValue: "false",
          description: "Whether the folder is initially expanded on mount.",
          expandedType: "boolean",
        },
        {
          name: "icon",
          type: "ReactNode",
          typeCategory: "react",
          defaultValue: "-",
          description: "Custom icon for the collapsed folder state.",
          expandedType: "React.ReactNode",
        },
        {
          name: "openIcon",
          type: "ReactNode",
          typeCategory: "react",
          defaultValue: "-",
          description: "Custom icon for the expanded folder state.",
          expandedType: "React.ReactNode",
        },
      ],
    },
    {
      title: "TreeFile",
      description: "Leaf item representing a file in the tree hierarchy.",
      props: [
        {
          name: "id",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Unique identifier for the file item.",
          expandedType: "string",
        },
        {
          name: "name",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Display label for the file.",
          expandedType: "string",
        },
        {
          name: "icon",
          type: "ReactNode",
          typeCategory: "react",
          defaultValue: "-",
          description: "Custom icon preceding the file name.",
          expandedType: "React.ReactNode",
        },
      ],
    },
  ],
  toolbar: [
    {
      title: "Toolbar",
      description:
        "Morphing toolbar container with animated layout transitions.",
      props: [
        {
          name: "mode",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description:
            "Controlled mode string identifying the active toolbar layout.",
          expandedType: "string | undefined",
        },
        {
          name: "defaultMode",
          type: "string",
          typeCategory: "string",
          defaultValue: '"default"',
          description: "Initial mode for uncontrolled mode switching.",
          expandedType: "string",
        },
        {
          name: "onModeChange",
          type: "function",
          typeCategory: "function",
          defaultValue: "-",
          description: "Callback fired when the active mode transitions.",
          expandedType: "(mode: string, previousMode: string) => void",
        },
        {
          name: "position",
          type: "Union",
          typeCategory: "union",
          defaultValue: '"center"',
          description: "Absolute anchor alignment inside the container.",
          expandedType: '"center" | "top" | "bottom" | "left" | "right"',
        },
        {
          name: "transition",
          type: "ToolbarTransition",
          typeCategory: "object",
          defaultValue: "-",
          description:
            "Spring physics configuration for shape morphing animations.",
          expandedType: "ToolbarTransition",
        },
      ],
    },
    {
      title: "ToolbarContent",
      description:
        "Content view visible only when the matching mode is active.",
      props: [
        {
          name: "mode",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Target mode name for this content panel.",
          expandedType: "string",
        },
      ],
    },
    {
      title: "ToolbarButton",
      description:
        "Interactive button that triggers mode changes or custom actions.",
      props: [
        {
          name: "targetMode",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Toolbar mode to transition to when clicked.",
          expandedType: "string | undefined",
        },
        {
          name: "label",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Accessible aria-label for assistive technology.",
          expandedType: "string | undefined",
        },
      ],
    },
  ],
  loader: [
    {
      title: "LoaderText",
      description:
        "Text animation component with wave, shimmer, or blink effects.",
      props: [
        {
          name: "variant",
          type: "Union",
          typeCategory: "union",
          defaultValue: '"shimmer"',
          description: "Animation effect applied to the loading text.",
          expandedType: '"wave" | "shimmer" | "text-shimmer" | "blink"',
        },
        {
          name: "width",
          type: "number",
          typeCategory: "number",
          defaultValue: "100",
          description:
            "Gradient shimmer width in pixels for the text-shimmer variant.",
          expandedType: "number",
        },
      ],
    },
    {
      title: "LoaderIcon",
      description: "Icon spinner with customizable rotation and pulse styles.",
      props: [
        {
          name: "variant",
          type: "Union",
          typeCategory: "union",
          defaultValue: '"spin"',
          description: "Motion style for the loading spinner graphic.",
          expandedType: '"spin" | "scale-up-down" | "blink" | "hourglass"',
        },
      ],
    },
  ],
  badge: [
    {
      title: "Badge",
      description: "Compact status indicator badge with custom variants.",
      props: [
        {
          name: "variant",
          type: "Union",
          typeCategory: "union",
          defaultValue: '"default"',
          description: "Visual appearance style for the badge.",
          expandedType:
            '"default" | "secondary" | "destructive" | "outline" | "ghost"',
        },
        {
          name: "asChild",
          type: "boolean",
          typeCategory: "boolean",
          defaultValue: "false",
          description:
            "Merges badge styling onto the child element via Radix Slot.",
          expandedType: "boolean",
        },
      ],
    },
  ],
  avatar: [
    {
      title: "Avatar",
      description: "User profile image display with fallback initials.",
      props: [
        {
          name: "className",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description:
            "Additional CSS classes for size and shape customization.",
          expandedType: "string",
        },
      ],
    },
    {
      title: "AvatarImage",
      description: "Image element for the user avatar.",
      props: [
        {
          name: "src",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "URL source of the avatar image.",
          expandedType: "string",
        },
        {
          name: "alt",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Accessibility description for the image.",
          expandedType: "string",
        },
      ],
    },
    {
      title: "AvatarFallback",
      description:
        "Fallback text or icon rendered when the image fails to load.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          typeCategory: "react",
          defaultValue: "-",
          description: "Initials or placeholder icon.",
          expandedType: "React.ReactNode",
        },
      ],
    },
  ],
  input: [
    {
      title: "Input",
      description:
        "Customized text input with focus rings and validation states.",
      props: [
        {
          name: "type",
          type: "string",
          typeCategory: "string",
          defaultValue: '"text"',
          description:
            "HTML input type attribute (e.g. password, number, text).",
          expandedType: "string",
        },
        {
          name: "placeholder",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Short hint displayed when the input is empty.",
          expandedType: "string",
        },
        {
          name: "disabled",
          type: "boolean",
          typeCategory: "boolean",
          defaultValue: "false",
          description: "Disables interaction and applies muted opacity.",
          expandedType: "boolean",
        },
      ],
    },
  ],
  select: [
    {
      title: "Select",
      description: "Accessible select dropdown powered by Radix UI.",
      props: [
        {
          name: "value",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Controlled value of the selected item.",
          expandedType: "string",
        },
        {
          name: "defaultValue",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description: "Initial value for uncontrolled usage.",
          expandedType: "string",
        },
        {
          name: "onValueChange",
          type: "function",
          typeCategory: "function",
          defaultValue: "-",
          description: "Event handler called when the selected value changes.",
          expandedType: "(value: string) => void",
        },
      ],
    },
  ],
  file: [
    {
      title: "useFile",
      description:
        "Hook for handling file uploads, drag & drop, and validation.",
      props: [
        {
          name: "multiple",
          type: "boolean",
          typeCategory: "boolean",
          defaultValue: "false",
          description:
            "Allows selecting and uploading multiple files simultaneously.",
          expandedType: "boolean",
        },
        {
          name: "accept",
          type: "string",
          typeCategory: "string",
          defaultValue: "-",
          description:
            "Comma-separated list of allowed MIME types or file extensions.",
          expandedType: "string",
        },
        {
          name: "maxSize",
          type: "number",
          typeCategory: "number",
          defaultValue: "-",
          description: "Maximum allowable file size in bytes.",
          expandedType: "number",
        },
      ],
    },
  ],
};
