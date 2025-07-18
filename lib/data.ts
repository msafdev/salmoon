// Avatar
import { BasicAvatar } from "@/components/lab/examples/avatar/basic-avatar";
import { IconAvatar } from "@/components/lab/examples/avatar/icon-avatar";
import { StackAvatar } from "@/components/lab/examples/avatar/stack-avatar";
import { StatusAvatar } from "@/components/lab/examples/avatar/status-avatar";
import { BasicBadge } from "@/components/lab/examples/badge/basic-badge";
// Badge
import { IconBadge } from "@/components/lab/examples/badge/icon-badge";
import { SeparateBadge } from "@/components/lab/examples/badge/separate-badge";
import { StatusBadge } from "@/components/lab/examples/badge/status-badge";
// Cursor
import { AdvancedCursor } from "@/components/lab/examples/cursor/advanced-cursor";
import { BasicCursor } from "@/components/lab/examples/cursor/basic-cursor";
import { SpringCursor } from "@/components/lab/examples/cursor/spring-cursor";
import { AvatarFile } from "@/components/lab/examples/file/avatar-file";
import { BasicFile } from "@/components/lab/examples/file/basic-file";
import { MultipleFiles } from "@/components/lab/examples/file/multiple-file";
// Input
import { BasicInput } from "@/components/lab/examples/input/basic-input";
import { FloatInput } from "@/components/lab/examples/input/float-input";
import { NumberInput } from "@/components/lab/examples/input/number-input";
import { OtpInput } from "@/components/lab/examples/input/otp-input";
import { PasswordInput } from "@/components/lab/examples/input/password-input";
// Stagger
import { BasicAnimation } from "@/components/lab/examples/stagger/basic-animation";
import { VariantAnimation } from "@/components/lab/examples/stagger/variant-animation";
import { ViewAnimation } from "@/components/lab/examples/stagger/view-animation";
// Toolbar
import { AdvancedToolbar } from "@/components/lab/examples/toolbar/advanced-toolbar";
import { BasicToolbar } from "@/components/lab/examples/toolbar/basic-toolbar";
import { DynamicToolbar } from "@/components/lab/examples/toolbar/dynamic-toolbar";

export type ComponentType = {
  name: string;
  slug: string;
  primitive: boolean;
  description?: string;
  example: {
    child: React.ComponentType<any>;
    name: string;
    path: string;
  }[];
  thumbnail?: number;
  twConfig?: object;
  cssClass?: string;
  uiLibrary?: string;
  customHook?: string;
  gridClass?: "regular-card" | "medium-card" | "large-card" | "default-card";
};

export type TWConfig = {
  [key: string]: object;
};

export const COMPONENTS: ComponentType[] = [
  {
    name: "Stagger",
    slug: "stagger",
    primitive: true,
    description: "Staggered animations for sequencing UI motion.",
    example: [
      {
        child: BasicAnimation,
        name: "Basic Animation",
        path: "basic-animation",
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
  {
    name: "Badge",
    slug: "badge",
    primitive: false,
    description: "Lightweight labels for statuses, types, or actions.",
    example: [
      { child: BasicBadge, name: "Basic Badge", path: "basic-badge" },
      { child: IconBadge, name: "Icon Badge", path: "icon-badge" },
      { child: SeparateBadge, name: "Separate Badge", path: "separate-badge" },
      { child: StatusBadge, name: "Status Badge", path: "status-badge" },
    ],
    thumbnail: 1,
    uiLibrary: "npx shadcn@latest add badge",
    gridClass: "medium-card",
  },
  {
    name: "Avatar",
    slug: "avatar",
    primitive: false,
    description: "User visuals with icons, initials, or images.",
    example: [
      {
        child: BasicAvatar,
        name: "Basic Avatar",
        path: "basic-avatar",
      },
      {
        child: StatusAvatar,
        name: "Status Avatar",
        path: "status-avatar",
      },
      {
        child: IconAvatar,
        name: "Icon Avatar",
        path: "icon-avatar",
      },
      {
        child: StackAvatar,
        name: "Stack Avatar",
        path: "stack-avatar",
      },
    ],
    thumbnail: 1,
    uiLibrary: "npx shadcn@latest add avatar",
    gridClass: "medium-card",
  },
  {
    name: "Toolbar",
    slug: "toolbar",
    primitive: true,
    description: "Animated toolbar with mode switching and layout transitions.",
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
    thumbnail: 0,
    uiLibrary: "npx shadcn@latest add button",
    gridClass: "large-card",
  },
  {
    name: "Input",
    slug: "input",
    primitive: false,
    description: "Various input components with advanced features.",
    example: [
      { child: BasicInput, name: "Basic Input", path: "basic-input" },
      { child: NumberInput, name: "Number Input", path: "number-input" },
      { child: FloatInput, name: "Float Input", path: "float-input" },
      { child: PasswordInput, name: "Password Input", path: "password-input" },
      { child: OtpInput, name: "OTP Input", path: "otp-input" },
    ],
    thumbnail: 1,
    uiLibrary: "npx shadcn@latest add label input",
    gridClass: "medium-card",
  },
  {
    name: "File",
    slug: "file",
    primitive: false,
    description: "Various input components with advanced features.",
    example: [
      { child: BasicFile, name: "Basic File", path: "basic-file" },
      { child: AvatarFile, name: "Avatar File", path: "avatar-file" },
      { child: MultipleFiles, name: "Multiple File", path: "multiple-file" },
    ],
    thumbnail: 1,
    uiLibrary: "npx shadcn@latest add button",
    customHook: "use-file",
    gridClass: "medium-card",
  },
  {
    name: "Cursor",
    slug: "cursor",
    primitive: true,
    description: "Custom cursor effects with motion and tracking.",
    example: [
      {
        child: BasicCursor,
        name: "Basic Cursor",
        path: "basic-cursor",
      },
      {
        child: AdvancedCursor,
        name: "Advanced Cursor",
        path: "advanced-cursor",
      },
      {
        child: SpringCursor,
        name: "Spring Cursor",
        path: "spring-cursor",
      },
    ],
    thumbnail: 1,
    gridClass: "large-card",
  },
];
