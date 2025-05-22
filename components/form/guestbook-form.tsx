"use client";

import authMutation from "@/mutation/auth.mutation";
import { LoaderCircle } from "lucide-react";

import Image from "next/image";

import { User } from "@supabase/supabase-js";

import Button from "@/components/shared/button";

import ContentForm from "@/components/form/content-form";

const GuestbookForm = ({ user }: { user: User | null }) => {
  const { githubMutation, googleMutation, signOutMutation } = authMutation();

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

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  return (
    <div className="flex flex-col">
      {user ? (
        <div className="flex w-full flex-col gap-y-1">
          <ContentForm />
          <button
            onClick={handleSignOut}
            disabled={signOutMutation.isPending}
            className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            {signOutMutation.isPending ? (
              <span className="flex items-center gap-1">
                <LoaderCircle className="size-3 animate-spin" />
                Signing out...
              </span>
            ) : (
              "Sign out"
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          {authProviders.map(({ provider, label, mutation }) => (
            <div key={provider} className="flex flex-1 antialiased">
              <Button
                onClick={() => handleSignIn(provider)}
                disabled={mutation.isPending}
                className="flex w-full items-center gap-x-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <LoaderCircle className="size-4 animate-spin" />
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
