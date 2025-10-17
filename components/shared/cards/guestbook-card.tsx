"use client";

import { motion } from "motion/react";

import { PiCaretDownBold, PiChatCircleDotsBold } from "react-icons/pi";

import { useState } from "react";

import Image from "next/image";

import { User } from "@supabase/supabase-js";

import ReplyForm from "@/components/form/reply-form";

import { formatTimestamp } from "@/lib/functions";
import { cn } from "@/lib/utils";
import type {
  GuestbookWithReplies,
  GuestbookWithUser,
  UserProfile,
} from "@/types/guestbook.types";

type GuestbookCardProps = {
  entry: GuestbookWithReplies;
  index: number;
  user: User | null;
};

type GuestbookEntryProps = {
  user: User | null;
  entry: GuestbookWithReplies;
};

type GuestbookReplyProps = {
  reply: GuestbookWithUser;
};

type UserAvatarProps = {
  user: UserProfile | null;
  size?: "sm" | "md";
};

const UserAvatar = ({ user, size = "md" }: UserAvatarProps) => {
  const sizeClasses = {
    sm: { container: "size-5", image: { width: 24, height: 24 } },
    md: { container: "size-7", image: { width: 36, height: 36 } },
  };

  const { container, image } = sizeClasses[size];
  const displayName = user?.name || "Anonymous";
  const initial = displayName.charAt(0).toUpperCase();

  if (user?.avatar_url) {
    return (
      <Image
        src={user.avatar_url}
        alt={`${displayName} avatar`}
        width={image.width}
        height={image.height}
        className="rounded object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={cn(
        "bg-muted text-muted-foreground flex items-center justify-center rounded-full text-xs",
        container,
      )}
    >
      {initial}
    </div>
  );
};

const GuestbookCard = ({ user, entry, index }: GuestbookCardProps) => {
  const delay = index * 0.05;
  return (
    <motion.article
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay,
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      className="space-y-3"
    >
      <GuestbookEntry entry={entry} user={user} />
    </motion.article>
  );
};

const GuestbookEntry = ({ user, entry }: GuestbookEntryProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const hasReplies = entry.replies.length > 0;
  const replyCount = entry.replies.length;
  const replyText = replyCount === 1 ? "reply" : "replies";

  const handleReplyClick = () => {
    setShowReplyForm(true);
    setShowReplies(false);
  };

  const handleToggleReplies = () => {
    setShowReplies((prev) => !prev);
    setShowReplyForm(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <UserAvatar user={entry.user} size="md" />

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm leading-none font-semibold">
              {entry.user?.name || "Anonymous"}
            </span>
            <time className="text-muted-foreground shrink-0 text-xs leading-none">
              {formatTimestamp(entry.created_at)}
            </time>
          </div>

          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
            {entry.content}
          </p>

          {!showReplyForm && (
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={handleReplyClick}
                disabled={!user}
                className={cn(
                  "text-muted-foreground flex items-center gap-2 text-xs",
                  user
                    ? "hover:text-foreground cursor-pointer"
                    : "cursor-not-allowed",
                )}
              >
                <PiChatCircleDotsBold className="size-3" />
                Reply
              </button>

              {hasReplies && (
                <button
                  onClick={handleToggleReplies}
                  className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 text-xs"
                >
                  <PiCaretDownBold
                    className={cn(
                      "size-3 transition-transform",
                      showReplies && "rotate-180",
                    )}
                  />
                  {replyCount} {replyText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showReplyForm && (
        <div className="md:ml-12">
          <ReplyForm
            parentId={entry.id}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {hasReplies && showReplies && (
        <div className="mt-4 ml-12">
          <div className="space-y-3">
            {entry.replies.map((reply) => (
              <GuestbookReply key={reply.id} reply={reply} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const GuestbookReply = ({ reply }: GuestbookReplyProps) => {
  return (
    <div className="flex items-start gap-2">
      <UserAvatar user={reply.user} size="sm" />

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs leading-none font-semibold">
            {reply.user?.name || "Anonymous"}
          </span>
          <time className="text-muted-foreground shrink-0 text-xs leading-none">
            {formatTimestamp(reply.created_at)}
          </time>
        </div>

        <p className="text-muted-foreground text-xs leading-relaxed break-words whitespace-pre-wrap">
          {reply.content}
        </p>
      </div>
    </div>
  );
};

export default GuestbookCard;
