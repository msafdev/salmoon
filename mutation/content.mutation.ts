"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addContent, addReply } from "@/action/content";
import { hasActionError, showMutationToast } from "@/mutation/mutation.utils";

type ContentResult = Awaited<ReturnType<typeof addContent>>;
type ReplyResult = Awaited<ReturnType<typeof addReply>>;

type ReplyVariables = {
  content: string;
  parentId: string;
};

const mutationConfig = {
  guestbookKey: ["guestbook"] as const,
};

const buildContentFormData = (content: string) => {
  const formData = new FormData();
  formData.append("content", content);
  return formData;
};

const buildReplyFormData = ({ content, parentId }: ReplyVariables) => {
  const formData = new FormData();
  formData.append("content", content);
  formData.append("parent_id", parentId);
  return formData;
};

const contentMutation = () => {
  const queryClient = useQueryClient();

  const addContentMutation = useMutation<ContentResult, unknown, string>({
    mutationFn: async (content: string) => addContent(buildContentFormData(content)),
    onSuccess: (response) => {
      if (hasActionError(response)) {
        showMutationToast(response?.error ?? "Something went wrong", "error");
        return;
      }

      showMutationToast("Message added successfully", "success");
      queryClient.invalidateQueries({ queryKey: mutationConfig.guestbookKey });
    },
    onError: () => {
      showMutationToast("Something went wrong", "error");
    },
  });

  const addReplyMutation = useMutation<ReplyResult, unknown, ReplyVariables>({
    mutationFn: async (variables: ReplyVariables) => addReply(buildReplyFormData(variables)),
    onSuccess: (response) => {
      if (hasActionError(response)) {
        showMutationToast(response?.error ?? "Something went wrong", "error");
        return;
      }

      showMutationToast("Reply posted successfully", "success");
      queryClient.invalidateQueries({ queryKey: mutationConfig.guestbookKey });
    },
    onError: () => {
      showMutationToast("Failed to post reply", "error");
    },
  });

  return { addContentMutation, addReplyMutation };
};

export default contentMutation;
