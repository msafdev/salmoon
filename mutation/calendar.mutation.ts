"use client";

import { LuBadgeCheck, LuBadgeX } from "react-icons/lu";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";

import { createMeeting } from "@/action/calendar";
import { Contact } from "@/types/contact-types";

const calendarMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const addCalendarMutation = useMutation({
    mutationFn: async (contact: Contact) => createMeeting(contact),
    onSuccess: (response) => {
      if (response?.error) {
        toast({
          title: "Something went wrong",
          description: response.error,
          duration: 2000,
          icon: LuBadgeX,
          color: "destructive",
        });
      } else if (response?.data) {
        toast({
          title: "Booked",
          description: response.data,
          duration: 2000,
          icon: LuBadgeCheck,
          color: "success",
        });

        router.push("/contact/success");

        queryClient.invalidateQueries({ queryKey: ["meetings"] });
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "An unexpected error occurred",
        duration: 2000,
        icon: LuBadgeX,
        color: "destructive",
      });
    },
  });

  return { addCalendarMutation };
};

export default calendarMutation;
