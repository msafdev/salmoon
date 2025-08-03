import { cookies } from "next/headers";

import { type CookieOptions, createServerClient } from "@supabase/ssr";

import { Database } from "@/types/database.types";

const createServerClientWithKey = (key: string) => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

export const createClient = () => {
  return createServerClientWithKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
};

export const createAdminClient = () => {
  return createServerClientWithKey(process.env.SUPABASE_SERVICE_ROLE_KEY!);
};
