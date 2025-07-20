"use client";

import { LuBadgeCheck, LuBadgeX } from "react-icons/lu";

import { useMutation } from "@tanstack/react-query";

import { githubSignIn, googleSignIn, signOut } from "@/action/auth";
import { useToast } from "@/hooks/use-toast";

const authMutation = () => {
  const { toast } = useToast();

  const githubMutation = useMutation({
    mutationFn: githubSignIn,
    onSuccess: (response) => {
      if ("error" in response) {
        toast({
          title: "GitHub Login Failed",
          description: response.error,
          duration: 2000,
          icon: LuBadgeX,
          color: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: response.data,
          duration: 2000,
          icon: LuBadgeCheck,
          color: "success",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unexpected error during GitHub sign-in",
        duration: 2000,
        icon: LuBadgeX,
        color: "destructive",
      });
    },
  });

  const googleMutation = useMutation({
    mutationFn: googleSignIn,
    onSuccess: (response) => {
      if ("error" in response) {
        toast({
          title: "Google Login Failed",
          description: response.error,
          duration: 2000,
          icon: LuBadgeX,
          color: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: response.data,
          duration: 2000,
          icon: LuBadgeCheck,
          color: "success",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unexpected error during Google sign-in",
        duration: 2000,
        icon: LuBadgeX,
        color: "destructive",
      });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: (response) => {
      if ("error" in response) {
        toast({
          title: "Logout Failed",
          description: response.error,
          duration: 2000,
          icon: LuBadgeX,
          color: "destructive",
        });
      } else {
        toast({
          title: "Signed Out",
          description: response.data,
          duration: 2000,
          icon: LuBadgeCheck,
          color: "success",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unexpected error during logout",
        duration: 2000,
        icon: LuBadgeX,
        color: "destructive",
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
