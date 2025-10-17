"use client";

import {
  PiArrowClockwiseBold,
  PiPlusBold,
  PiSignOutDuotone,
  PiUserDuotone,
} from "react-icons/pi";

import { useState } from "react";

import { User } from "@supabase/supabase-js";

import Paragraph from "@/components/shared/paragraph";
import { Svg } from "@/components/shared/svg";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import NoteForm from "@/components/form/note-form";

import authMutation from "@/mutation/auth.mutation";

export default function NoteDrawer({ user }: { user: User | null }) {
  const [open, setOpen] = useState<boolean>(false);

  const { githubMutation, googleMutation } = authMutation();
  const { signOutMutation } = authMutation();

  const authProviders = [
    {
      provider: "github" as const,
      label: "Login with GitHub",
      mutation: githubMutation,
    },
    {
      provider: "google" as const,
      label: "Login with Google",
      mutation: googleMutation,
    },
  ];

  const handleSignIn = (provider: "github" | "google") => {
    if (provider === "github") {
      githubMutation.mutate({ next: "/note" });
    } else if (provider === "google") {
      googleMutation.mutate({ next: "/note" });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="anim hover:bg-primary/40 hover:text-primary-foreground focus-visible:ring-ring/40 pointer-events-auto grid size-10 cursor-pointer place-items-center rounded-full bg-transparent ring-offset-transparent hover:backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-hidden">
          <PiPlusBold size={20} />
        </button>
      </DrawerTrigger>

      <DrawerContent
        onPointerDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="flex flex-1 flex-col items-center gap-6 overflow-y-auto p-4 sm:p-8">
          <Paragraph title="Leave a note">
            Write down anything you want to share. All notes are completely
            anonymous and will be shown at random for others to see.
          </Paragraph>

          <NoteForm onClose={() => setOpen(false)} />
        </div>

        <div className="bg-accent mt-auto border-t p-4">
          <div className="mx-auto flex max-w-lg">
            {user ? (
              <div className="flex w-full flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="size-5 rounded">
                    <AvatarImage src={user.user_metadata.avatar_url} />
                    <AvatarFallback className="size-5 rounded">
                      <PiUserDuotone />
                    </AvatarFallback>
                  </Avatar>

                  <p className="text-accent-foreground text-sm font-medium">
                    {user.user_metadata.preferred_username ||
                      user.user_metadata.full_name}
                  </p>
                </div>

                <Button
                  className="size-9"
                  variant="secondary"
                  aria-label="Logout"
                  onClick={() => signOutMutation.mutate()}
                  disabled={signOutMutation.isPending}
                  size="icon"
                >
                  {signOutMutation.isPending ? (
                    <PiArrowClockwiseBold className="size-4 animate-spin" />
                  ) : (
                    <PiSignOutDuotone className="size-4" />
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex w-full flex-wrap items-center justify-center gap-2">
                {authProviders.map(({ provider, label, mutation }) => (
                  <Button
                    key={provider}
                    className="size-9"
                    variant="secondary"
                    aria-label={label}
                    onClick={() => handleSignIn(provider)}
                    disabled={mutation.isPending}
                    size="icon"
                  >
                    {mutation.isPending ? (
                      <PiArrowClockwiseBold className="size-4 animate-spin" />
                    ) : (
                      <Svg name={provider} className="size-4" />
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

