"use client";

import { PiPaperPlaneTiltDuotone } from "react-icons/pi";

import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import { type DialogProps } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    shouldFilter={false}
    className={cn(
      "bg-background text-foreground flex h-full w-full max-w-[640px] flex-col overflow-hidden rounded-lg shadow-lg outline-none",
      "[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      "[&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5",
      "[&_[cmdk-input]]:h-12",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => (
  <Dialog {...props}>
    <DialogContent
      className="overflow-hidden p-0 shadow-lg backdrop-blur-2xl"
      showCloseButton={false}
    >
      <DialogDescription className="sr-only">
        Command Interface
      </DialogDescription>
      <Command>{children}</Command>
    </DialogContent>
  </Dialog>
);

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="border-border flex items-center border-b px-3"
    cmdk-input-wrapper=""
  >
    <PiPaperPlaneTiltDuotone className="mr-3 !size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none",
        "px-0 text-[15px] leading-5",
        "text-foreground placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "h-[min(300px,var(--cmdk-list-height))] max-h-96 overflow-x-hidden overflow-y-auto overscroll-contain",
      "transition-[height] duration-200 ease-out",
      className,
    )}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn(
      "text-muted-foreground flex h-fit items-center justify-center text-sm whitespace-pre-wrap",
      className,
    )}
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn("text-foreground space-y-1 overflow-hidden py-2", className)}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("bg-border -mx-1 h-px", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex h-11 items-center gap-2 px-3 text-sm outline-none select-none",
      "text-foreground bg-transparent",
      "hover:bg-muted/70 data-[selected=true]:hover:bg-accent",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[selected=true]:before:bg-border data-[selected=true]:before:absolute data-[selected=true]:before:top-0 data-[selected=true]:before:left-0 data-[selected=true]:before:h-full data-[selected=true]:before:w-0.5 data-[selected=true]:before:content-['']",
      "[&_svg]:text-muted-foreground [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
      "hover:[&_svg]:text-foreground data-[selected=true]:[&_svg]:text-accent-foreground",
      "data-[disabled=true]:text-muted-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "text-muted-foreground ml-auto text-xs tracking-widest",
      className,
    )}
    {...props}
  />
);
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
