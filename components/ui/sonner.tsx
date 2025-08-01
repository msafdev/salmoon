"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

import { useTheme } from "next-themes";

import "@/styles/sonner.css";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      position="top-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "toast",
          title: "title",
          icon: "icon",
          description: "description",
          actionButton: "action-button",
          cancelButton: "cancel-button",
          closeButton: "close-button",
        },
      }}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      visibleToasts={2}
      {...props}
    />
  );
};

export { Toaster };
