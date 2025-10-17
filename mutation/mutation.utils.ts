"use client";

import { createElement } from "react";

import { toast } from "sonner";

import { LuBadgeCheck, LuBadgeX } from "react-icons/lu";

const SUCCESS_ICON = createElement(LuBadgeCheck, {
  className: "size-5 success",
});
const ERROR_ICON = createElement(LuBadgeX, {
  className: "size-5 destructive",
});
const DEFAULT_TOAST_DURATION = 2000;

type ToastVariant = "success" | "error";

type ActionResponse = {
  error?: string | null;
};

export const showMutationToast = (message: string, variant: ToastVariant) => {
  toast(message, {
    duration: DEFAULT_TOAST_DURATION,
    icon: variant === "success" ? SUCCESS_ICON : ERROR_ICON,
  });
};

export const hasActionError = (response: ActionResponse | null | undefined) => {
  if (!response || typeof response !== "object") return false;
  return Boolean(response.error);
};
