"use client";

import { GuestbookWithUser } from "@/query/guestbook";
import { motion } from "framer-motion";

import Image from "next/image";

import { formatTimestamp } from "@/lib/functions";

type GuestbookCardProps = {
  entry: GuestbookWithUser;
  index: number;
};

const GuestbookCard = ({ entry, index }: GuestbookCardProps) => {
  const delay = index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          delay,
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="group/guestbook relative flex flex-col gap-y-2 will-change-transform"
    >
      <div className="flex w-full items-center gap-x-4">
        {entry.user?.avatar_url && (
          <Image
            src={entry.user.avatar_url}
            alt={entry.user.name || "User avatar"}
            width={36}
            height={36}
            className="rounded-sm bg-muted object-cover"
            loading="lazy"
            typeof="image/webp"
          />
        )}
        <div className="flex flex-col">
          <p className="text-sm font-semibold md:text-sm">
            {entry.user?.name || "Anonymous"}
          </p>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(entry.created_at)}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium">{entry.content}</p>
    </motion.div>
  );
};

export default GuestbookCard;
