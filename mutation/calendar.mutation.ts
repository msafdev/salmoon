"use client";

import { toast } from "sonner";

import { LuBadgeCheck, LuBadgeX } from "react-icons/lu";

import { createElement } from "react";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMeeting } from "@/action/calendar";
import { Contact } from "@/types/contact.types";

const calendarMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const addCalendarMutation = useMutation({
    mutationFn: async (contact: Contact) => createMeeting(contact),
    onSuccess: (response) => {
      if (response?.error) {
        toast("Something went wrong", {
          duration: 2000,
          icon: createElement(LuBadgeX, {
            className: "size-5 destructive",
          }),
        });
      } else if (response?.data) {
        router.push("/contact/success");

        toast("Meet booked successfully", {
          duration: 2000,
          icon: createElement(LuBadgeCheck, {
            className: "size-5 success",
          }),
        });

        queryClient.invalidateQueries({ queryKey: ["meetings"] });
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

  return { addCalendarMutation };
};

export default calendarMutation;
