"use client";

import { useMutation } from "@tanstack/react-query";

import { githubSignIn, googleSignIn, signOut } from "@/action/auth";
import {
  hasActionError,
  showMutationToast,
} from "@/mutation/mutation.utils";

type NextVar = { next?: string };

type AuthResult = Awaited<ReturnType<typeof githubSignIn>>;
type SignOutResult = Awaited<ReturnType<typeof signOut>>;

type ToastMessages = {
  success: string;
  failure: string;
  error: string;
};

const createAuthMutation = <TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  messages: ToastMessages,
) => {
  return useMutation<TResult, unknown, TVariables>({
    mutationFn,
    onSuccess: (response) => {
      if (hasActionError(response as { error?: string | null })) {
        showMutationToast(messages.failure, "error");
        return;
      }

      showMutationToast(messages.success, "success");
    },
    onError: () => {
      showMutationToast(messages.error, "error");
    },
  });
};

const authMutation = () => {
  const githubMutation = createAuthMutation<NextVar, AuthResult>(
    ({ next }) => githubSignIn(next),
    {
      success: "Login successful",
      failure: "Login failed",
      error: "Login error",
    },
  );

  const googleMutation = createAuthMutation<NextVar, AuthResult>(
    ({ next }) => googleSignIn(next),
    {
      success: "Login successful",
      failure: "Login failed",
      error: "Login error",
    },
  );

  const signOutMutation = createAuthMutation<void, SignOutResult>(
    () => signOut(),
    {
      success: "Logout successful",
      failure: "Logout failed",
      error: "Logout error",
    },
  );

  return {
    githubMutation,
    googleMutation,
    signOutMutation,
  };
};

export default authMutation;
