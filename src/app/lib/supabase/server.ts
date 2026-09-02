import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "../../types/database";
import {
  isSupabaseConfigured,
  requirePublicSupabaseConfig,
  fetchWithSupabaseTimeout,
} from "./config";

export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { url, key } = requirePublicSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot write cookies. The session proxy handles
          // refreshes before protected content is rendered.
        }
      },
    },
    global: { fetch: fetchWithSupabaseTimeout },
  });
}
