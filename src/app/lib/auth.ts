import "server-only";

import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./supabase/server";
import type { ProfileRow } from "../types/database";
import { safeReturnPath } from "./redirects";
import { getAdminSession } from "./admin-auth";

export interface AuthContext {
  user: User;
  profile: ProfileRow | null;
}

export async function getAuthContext(): Promise<AuthContext | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return {
    user,
    profile: profile ?? null,
  };
}

export async function requireUser(returnTo = "/account") {
  const auth = await getAuthContext();

  if (!auth) {
    redirect(
      `/auth/sign-in?next=${encodeURIComponent(safeReturnPath(returnTo))}`,
    );
  }

  return auth;
}

export async function requireAdmin(returnTo = "/admin") {
  const session = await getAdminSession();
  if (!session) {
    redirect(`/admin/login?next=${encodeURIComponent(safeReturnPath(returnTo, "/admin"))}`);
  }
  return session;
}
