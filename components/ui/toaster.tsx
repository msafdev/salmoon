"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const variantClasses = {
  default: {
    progress: "bg-primary",
    icon: "text-primary",
  },
  success: {
    progress: "bg-green-500",
    icon: "text-background fill-green-500",
  },
  destructive: {
    progress: "bg-red-500",
    icon: "text-background fill-red-500",
  },
  info: {
    progress: "bg-blue-500",
    icon: "text-background fill-blue-500",
  },
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        duration,
        icon: Icon,
        color = "default",
        ...props
      }) {
        return (
          <Toast
            key={id}
            duration={duration}
            className={cn("md:ml-auto md:max-w-80")}
            {...props}
          >
            {Icon ? (
              <div className="flex space-x-3">
                <Icon className={cn("size-5", variantClasses[color].icon)} />

                <div className="flex flex-col items-start gap-1.5">
                  {title && (
                    <ToastTitle className="leading-none">{title}</ToastTitle>
                  )}
                  {description && (
                    <ToastDescription className="text-sm text-muted-foreground">
                      {description}
                    </ToastDescription>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-1.5">
                {title && (
                  <ToastTitle className="leading-none">{title}</ToastTitle>
                )}
                {description && (
                  <ToastDescription className="text-sm text-muted-foreground">
                    {description}
                  </ToastDescription>
                )}
              </div>
            )}

            {action}

            <ToastClose />

            {duration && (
              <div aria-hidden="true">
                <div
                  className={cn(
                    "pointer-events-none absolute bottom-0 left-0 h-0.5 animate-toast-progress",
                    variantClasses[color].progress,
                  )}
                  style={
                    {
                      "--toast-duration": `${duration}ms`,
                    } as React.CSSProperties
                  }
                />
              </div>
            )}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
