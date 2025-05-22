"use client";

import { addContent } from "@/action/content";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

const contentMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addContentMutation = useMutation({
    mutationFn: async (content: string) => {
      const formData = new FormData();
      formData.append("content", content);
      return addContent(formData);
    },
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
        queryClient.invalidateQueries({ queryKey: ["guestbook"] });
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

  return { addContentMutation };
};

export default contentMutation;
