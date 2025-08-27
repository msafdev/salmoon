"use client";

import { createClient } from "@/supabase/client";

type AuthResult = { data: string } | { error: string };

const signInWithProvider = async (
  provider: "github" | "google",
  next?: string,
): Promise<AuthResult> => {
  const supabase = createClient();

  const nextPath =
    (typeof next === "string" && next.startsWith("/") && !next.startsWith("//")
      ? next
      : typeof window !== "undefined"
        ? window.location.pathname
        : "/") || "/";

  if (typeof document !== "undefined") {
    document.cookie = `next=${encodeURIComponent(nextPath)}; Path=/; Max-Age=600; SameSite=Lax`;
  }

  const redirectTo = `${location.origin}/auth/callback?next=${encodeURIComponent(
    nextPath,
  )}`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });

  if (error) {
    console.error(`OAuth sign-in error:`, error);
    return { error: `Login failed` };
  }

  return { data: `Login successful` };
};

export const githubSignIn = (next?: string) =>
  signInWithProvider("github", next);
export const googleSignIn = (next?: string) =>
  signInWithProvider("google", next);

export const signOut = async (): Promise<AuthResult> => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("OAtuh sign-out error:", error);
    return { error: "Logout failed" };
  }

  location.reload();
  return { data: "Logout successful" };
};
