"use client";

import { LuBadgeX } from "react-icons/lu";
import {
  PiArrowClockwiseBold,
  PiArrowElbowDownLeftBold,
  PiSignOutDuotone,
} from "react-icons/pi";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import authMutation from "@/mutation/auth.mutation";
import contentMutation from "@/mutation/content.mutation";

const ContentForm = () => {
  const [content, setContent] = useState("");
  const { addContentMutation } = contentMutation();

  const { signOutMutation } = authMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addContentMutation.mutateAsync(content);
    } finally {
      setContent("");
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={handleSubmit}
      id="content-form"
    >
      <Textarea
        placeholder="Leave a message..."
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-24"
        disabled={addContentMutation.isPending}
      />

      <div className="flex items-center justify-between gap-x-2">
        <Button
          onClick={() => signOutMutation.mutate()}
          disabled={signOutMutation.isPending}
          type="submit"
          size="icon"
          variant="secondary"
          className="size-9 rotate-180"
        >
          {signOutMutation.isPending ? (
            <PiArrowClockwiseBold className="size-4 animate-spin" />
          ) : (
            <PiSignOutDuotone className="size-4" />
          )}
        </Button>
        <Button
          disabled={addContentMutation.isPending}
          type="submit"
          size="sm"
          variant="secondary"
          className=""
        >
          {addContentMutation.isPending ? (
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

export default ContentForm;
