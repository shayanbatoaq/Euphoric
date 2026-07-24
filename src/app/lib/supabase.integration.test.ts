import { createClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import type { Database } from "../types/database";

const shouldRun =
  process.env.RUN_SUPABASE_INTEGRATION_TESTS === "1" &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

describe.skipIf(!shouldRun)("Supabase commerce schema", () => {
  it("exposes store settings and active products", async () => {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    const [{ data: settings, error: settingsError }, { data: products, error }] =
      await Promise.all([
        supabase.from("store_settings").select("*").eq("id", true).single(),
        supabase.from("products").select("id,slug").eq("is_active", true).limit(1),
      ]);

    expect(settingsError).toBeNull();
    expect(settings?.shipping_fee).toBe(300);
    expect(error).toBeNull();
    expect(products?.length).toBeGreaterThan(0);
  });
});
