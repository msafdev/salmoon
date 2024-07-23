import { Database } from "@/supabase/types";

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );
};
