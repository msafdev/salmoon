"use client";

import {
  PiArrowClockwiseBold,
  PiArrowElbowDownLeftBold,
  PiXBold,
} from "react-icons/pi";

import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import contentMutation from "@/mutation/content.mutation";

interface ReplyFormProps {
  parentId: string;
  onCancel: () => void;
}

const ReplyForm = ({ parentId, onCancel }: ReplyFormProps) => {
  const [content, setContent] = useState("");
  const { addReplyMutation } = contentMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addReplyMutation.mutateAsync({
        content: content.trim(),
        parentId,
      });
    } catch (error) {
      console.error("Failed to add reply:", error);
    } finally {
      setContent("");
      onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (content.trim() && !addReplyMutation.isPending) {
        handleSubmit(e as any);
      }
    }
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <form className="w-full space-y-2" onSubmit={handleSubmit}>
      <Textarea
        placeholder="Leave a reply..."
        name="reply"
        id="reply"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-24 w-full text-sm"
        disabled={addReplyMutation.isPending}
        autoFocus
        maxLength={100}
      />

      <div className="flex items-center justify-between">
        <Button
          onClick={onCancel}
          type="button"
          size="icon"
          variant="secondary"
          className="size-9"
        >
          <PiXBold className="size-4" />
        </Button>
        <Button
          disabled={addReplyMutation.isPending || !content.trim()}
          type="submit"
          size="sm"
          variant="secondary"
        >
          {addReplyMutation.isPending ? (
            <PiArrowClockwiseBold className="size-4 animate-spin" />
          ) : (
            <>
              <span>Enter</span>
              <PiArrowElbowDownLeftBold className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ReplyForm;
