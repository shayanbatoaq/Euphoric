"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types/database";
import {
  isSupabaseConfigured,
  requirePublicSupabaseConfig,
} from "./config";

let browserClient: SupabaseClient<Database> | null = null;

export { isSupabaseConfigured };

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (!browserClient) {
    const { url, key } = requirePublicSupabaseConfig();
    browserClient = createBrowserClient<Database>(url, key);
  }

  return browserClient;
}
