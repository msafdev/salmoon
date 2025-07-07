"use client";

import { createMeeting } from "@/action/calendar";
import { Contact } from "@/types/contact-types";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

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
        });
      } else if (response?.data) {
        toast({
          title: "Success",
          description: response.data,
          duration: 2000,
        });

        queryClient.invalidateQueries({ queryKey: ["meetings"] });
        router.push("/contact/success");
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "An unexpected error occurred",
        duration: 2000,
      });
    },
  });

  return { addCalendarMutation };
};

export default calendarMutation;
