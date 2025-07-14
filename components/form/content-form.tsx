"use client";

import contentMutation from "@/mutation/content.mutation";

import { useState } from "react";
import {
  PiArrowClockwiseBold,
  PiArrowElbowDownLeftBold,
} from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/shared/input/number-input";

const ContentForm = () => {
  const [content, setContent] = useState("");
  const { addContentMutation } = contentMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      await addContentMutation.mutateAsync(content);
    } finally {
      setContent("");
    }
  };

  return (
    <form
      className="flex w-full flex-col"
      onSubmit={handleSubmit}
      id="content-form"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Input
          placeholder="Leave a message..."
          name="content"
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-auto min-w-0 flex-1"
          disabled={addContentMutation.isPending}
        />
        <Button
          disabled={addContentMutation.isPending || !content.trim()}
          type="submit"
          size="icon"
          className="border border-border px-3 py-2"
          variant="secondary"
        >
          {addContentMutation.isPending ? (
            <PiArrowClockwiseBold className="size-4 animate-spin" />
          ) : (
            <PiArrowElbowDownLeftBold className="size-4" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContentForm;
