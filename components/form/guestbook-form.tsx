"use client";

import { PiArrowClockwiseBold } from "react-icons/pi";

import Image from "next/image";

import { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";

import ContentForm from "@/components/form/content-form";

import authMutation from "@/mutation/auth.mutation";

const GuestbookForm = ({ user }: { user: User | null }) => {
  const { githubMutation, googleMutation } = authMutation();

  const authProviders = [
    {
      provider: "github" as const,
      label: "Sign in with GitHub",
      mutation: githubMutation,
    },
    {
      provider: "google" as const,
      label: "Sign in with Google",
      mutation: googleMutation,
    },
  ];

  const handleSignIn = (provider: "github" | "google") => {
    if (provider === "github") {
      githubMutation.mutate();
    } else if (provider === "google") {
      googleMutation.mutate();
    }
  };

  return (
    <div className="flex flex-col">
      {user ? (
        <div className="flex w-full flex-col gap-y-2">
          <ContentForm />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          {authProviders.map(({ provider, label, mutation }) => (
            <div key={provider} className="flex flex-1">
              <Button
                className="w-full flex items-center gap-2"
                variant="secondary"
                aria-label={label}
                onClick={() => handleSignIn(provider)}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <PiArrowClockwiseBold className="size-4 animate-spin" />
                ) : (
                  <Image
                    src={`/icons/${provider}.png`}
                    alt={`${provider} Logo`}
                    width={16}
                    height={16}
                  />
                )}
                {mutation.isPending ? "Signing in..." : label}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestbookForm;
