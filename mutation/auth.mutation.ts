"use client";

import { githubSignIn, googleSignIn, signOut } from "@/action/auth";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

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
        });
      } else {
        toast({
          title: "Success",
          description: response.data,
          duration: 2000,
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unexpected error during GitHub sign-in",
        duration: 2000,
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
        });
      } else {
        toast({
          title: "Success",
          description: response.data,
          duration: 2000,
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unexpected error during Google sign-in",
        duration: 2000,
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
        });
      } else {
        toast({
          title: "Signed Out",
          description: response.data,
          duration: 2000,
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unexpected error during logout",
        duration: 2000,
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
