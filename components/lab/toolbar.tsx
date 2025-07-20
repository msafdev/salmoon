"use client";

import { MotionConfig, motion } from "motion/react";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type ToolbarMode = string;
type ToolbarPosition = "center" | "top" | "bottom" | "left" | "right";

interface ToolbarTransition {
  type?: "spring" | "tween";
  bounce?: number;
  duration?: number;
  stiffness?: number;
  damping?: number;
}

interface ToolbarContextValue {
  mode: ToolbarMode;
  setMode: (mode: ToolbarMode) => void;
  transition: ToolbarTransition;
  onModeChange?: (mode: ToolbarMode, previousMode: ToolbarMode) => void;
}

interface ToolbarProps {
  defaultMode?: ToolbarMode;
  mode?: ToolbarMode;
  onModeChange?: (mode: ToolbarMode, previousMode: ToolbarMode) => void;
  position?: ToolbarPosition;
  transition?: ToolbarTransition;
  className?: string;
  children: React.ReactNode;
}

interface ToolbarContentProps {
  mode: ToolbarMode;
  className?: string;
  children: React.ReactNode;
}

interface ToolbarInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  layoutId?: string;
}

interface ToolbarItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
}

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  targetMode?: ToolbarMode;
  label?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const ToolbarContext = createContext<ToolbarContextValue | null>(null);

const useToolbar = () => {
  const context = useContext(ToolbarContext);

  if (!context) {
    throw new Error("Toolbar components must be used within Toolbar");
  }
  return context;
};

const defaultTransition: ToolbarTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  duration: 0.3,
};

const positionClasses = {
  center: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  top: "absolute left-1/2 top-4 -translate-x-1/2",
  bottom: "absolute left-1/2 bottom-4 -translate-x-1/2",
  left: "absolute left-4 top-1/2 -translate-y-1/2",
  right: "absolute right-4 top-1/2 -translate-y-1/2",
};

const separatorClasses = {
  horizontal: "w-4 h-px my-1 mx-auto border-y",
  vertical: "h-4 w-px mx-1 my-auto border-x",
};

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  (
    {
      defaultMode = "default",
      mode: controlledMode,
      onModeChange,
      position = "center",
      transition = defaultTransition,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalMode, setInternalMode] = useState(defaultMode);
    const mode = controlledMode ?? internalMode;

    const setMode = useCallback(
      (newMode: ToolbarMode) => {
        const previousMode = mode;
        if (controlledMode === undefined) {
          setInternalMode(newMode);
        }
        onModeChange?.(newMode, previousMode);
      },
      [mode, controlledMode, onModeChange],
    );

    return (
      <ToolbarContext.Provider
        value={{ mode, setMode, transition, onModeChange }}
      >
        <MotionConfig transition={transition}>
          <div
            className={cn(positionClasses[position], className)}
            ref={ref}
            {...props}
          >
            <motion.div
              layout
              className={cn(
                "inline-flex overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow",
              )}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  duration: 0.3,
                },
              }}
            >
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                  delay: 0.1,
                }}
                className="flex w-full flex-col items-stretch"
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </MotionConfig>
      </ToolbarContext.Provider>
    );
  },
);
Toolbar.displayName = "Toolbar";

const ToolbarContent = forwardRef<HTMLDivElement, ToolbarContentProps>(
  ({ mode: contentMode, className, children, ...props }, ref) => {
    const { mode } = useToolbar();

    if (mode !== contentMode) return null;

    return (
      <div
        className={cn("flex w-full items-center p-1", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ToolbarContent.displayName = "ToolbarContent";

const ToolbarInput = forwardRef<HTMLInputElement, ToolbarInputProps>(
  (
    {
      placeholder,
      value,
      onChange,
      onSubmit,
      className,
      autoFocus = true,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSubmit) {
        onSubmit(e.currentTarget.value);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className="relative min-w-0 flex-1">
        <input
          ref={ref}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "h-9 w-full rounded-xl border-0 bg-transparent px-3 py-1",
            "outline-none ring-0 ring-ring/40 focus-visible:ring-0",
            "text-sm placeholder:text-muted-foreground",
            className,
          )}
          autoFocus={autoFocus}
          {...props}
        />
      </div>
    );
  },
);
ToolbarInput.displayName = "ToolbarInput";

const ToolbarItem = forwardRef<HTMLDivElement, ToolbarItemProps>(
  ({ children, className, label, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ToolbarItem.displayName = "ToolbarItem";

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ targetMode, onClick, label, children, className, ...props }, ref) => {
    const { setMode } = useToolbar();

    const handleClick =
      onClick ?? (targetMode ? () => setMode(targetMode) : undefined);

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={handleClick}
        aria-label={
          label ||
          (targetMode ? `Set toolbar mode to ${targetMode}` : undefined)
        }
        className={cn("rounded-xl", className)}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
ToolbarButton.displayName = "ToolbarButton";

const ToolbarSeparator = forwardRef<
  HTMLDivElement,
  { className?: string; variants?: "vertical" | "horizontal" }
>(({ className, variants = "vertical", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("shrink-0", className, separatorClasses[variants])}
      {...props}
    />
  );
});
ToolbarSeparator.displayName = "ToolbarSeparator";

export {
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarInput,
  ToolbarSeparator,
  ToolbarButton,
};
