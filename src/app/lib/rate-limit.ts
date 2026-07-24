import "server-only";

import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { createSupabaseAdminClient } from "./supabase/admin";

function requestIdentity(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  return createHash("sha256")
    .update(`${ip}|${userAgent}`)
    .digest("hex");
}

export async function enforceRateLimit(
  request: NextRequest,
  action: string,
  limit: number,
  windowSeconds: number,
) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.rpc("check_rate_limit", {
    p_action: action,
    p_identity_hash: requestIdentity(request),
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });

  if (error) {
    throw new Error("Rate limit service is unavailable.");
  }

  return data;
}
