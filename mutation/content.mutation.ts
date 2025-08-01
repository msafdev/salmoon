"use client";

import { toast } from "sonner";

import { LuBadgeCheck, LuBadgeX } from "react-icons/lu";

import { createElement } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addContent } from "@/action/content";

const contentMutation = () => {
  const queryClient = useQueryClient();

  const addContentMutation = useMutation({
    mutationFn: async (content: string) => {
      const formData = new FormData();
      formData.append("content", content);
      return addContent(formData);
    },
    onSuccess: (response) => {
      if (response?.error) {
        toast("Something went wrong", {
          duration: 2000,
          icon: createElement(LuBadgeX, {
            className: "size-5 destructive",
          }),
        });
      } else if (response?.data) {
        toast("Index added successfully", {
          duration: 2000,
          icon: createElement(LuBadgeCheck, {
            className: "size-5 success",
          }),
        });
        queryClient.invalidateQueries({ queryKey: ["guestbook"] });
      }
    },
    onError: () => {
      toast("Something went wrong", {
        duration: 2000,
        icon: createElement(LuBadgeX, {
          className: "size-5 destructive",
        }),
      });
    },
  });

  return { addContentMutation };
};

export default contentMutation;
