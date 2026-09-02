import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../types/database";
import { fetchWithSupabaseTimeout, supabaseUrl } from "./config";

export function createSupabaseAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase server configuration is incomplete. Set the project URL and service-role key.",
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    global: { fetch: fetchWithSupabaseTimeout },
  });
}
