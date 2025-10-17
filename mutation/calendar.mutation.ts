"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMeeting } from "@/action/calendar";
import { hasActionError, showMutationToast } from "@/mutation/mutation.utils";
import { Contact } from "@/types/contact.types";

type CalendarResult = Awaited<ReturnType<typeof createMeeting>>;

const calendarMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const addCalendarMutation = useMutation<CalendarResult, unknown, Contact>({
    mutationFn: (contact: Contact) => createMeeting(contact),
    onSuccess: (response) => {
      if (hasActionError(response)) {
        showMutationToast(response?.error ?? "Something went wrong", "error");
        return;
      }

      router.push("/contact/success");
      showMutationToast("Meet booked successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
    onError: () => {
      showMutationToast("Something went wrong", "error");
    },
  });

  return { addCalendarMutation };
};

export default calendarMutation;
