"use client";

import { toast } from "sonner";

import { LuBadgeCheck, LuBadgeX } from "react-icons/lu";

import { createElement } from "react";

import { useMutation } from "@tanstack/react-query";

import { githubSignIn, googleSignIn, signOut } from "@/action/auth";

type NextVar = { next?: string };

const authMutation = () => {
  const githubMutation = useMutation({
    mutationFn: ({ next }: NextVar) => githubSignIn(next),
    onSuccess: (response) => {
      if ("error" in response) {
        toast("GitHub Login Failed", {
          duration: 2000,
          icon: createElement(LuBadgeX, {
            className: "size-5 destructive",
          }),
        });
      } else {
        toast("GitHub Sign-In Successful", {
          duration: 2000,
          icon: createElement(LuBadgeCheck, {
            className: "size-5 success",
          }),
        });
      }
    },
    onError: () => {
      toast("GitHub Sign-In Error", {
        duration: 2000,
        icon: createElement(LuBadgeX, {
          className: "size-5 destructive",
        }),
      });
    },
  });

  const googleMutation = useMutation({
    mutationFn: ({ next }: NextVar) => googleSignIn(next),
    onSuccess: (response) => {
      if ("error" in response) {
        toast("Google Login Failed", {
          duration: 2000,
          icon: createElement(LuBadgeX, {
            className: "size-5 destructive",
          }),
        });
      } else {
        toast("Google Sign-In Successful", {
          duration: 2000,
          icon: createElement(LuBadgeCheck, {
            className: "size-5 success",
          }),
        });
      }
    },
    onError: () => {
      toast("Google Sign-In Error", {
        duration: 2000,
        icon: createElement(LuBadgeX, {
          className: "size-5 destructive",
        }),
      });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: (response) => {
      if ("error" in response) {
        toast("Logout Failed", {
          duration: 2000,
          icon: createElement(LuBadgeX, {
            className: "size-5 destructive",
          }),
        });
      } else {
        toast("Signed Out Successfully", {
          duration: 2000,
          icon: createElement(LuBadgeCheck, {
            className: "size-5 success",
          }),
        });
      }
    },
    onError: () => {
      toast("Logout Error", {
        duration: 2000,
        icon: createElement(LuBadgeX, {
          className: "size-5 destructive",
        }),
      });
    },
  });

  return {
    githubMutation,
    googleMutation,
    signOutMutation,
  };
};

export default authMutation;
