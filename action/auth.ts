"use client";

import { createClient } from "@/supabase/client";

type AuthResult = { data: string } | { error: string };

const signInWithProvider = async (
  provider: "github" | "google",
): Promise<AuthResult> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(`OAuth sign-in error:`, error);
    return { error: `❌ Login failed` };
  }

  return { data: `💯 Login successful` };
};

export const githubSignIn = () => signInWithProvider("github");
export const googleSignIn = () => signInWithProvider("google");

export const signOut = async (): Promise<AuthResult> => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("OAtuh sign-out error:", error);
    return { error: "❌ Logout failed" };
  }

  location.reload();
  return { data: "💯 Logout successful" };
};
