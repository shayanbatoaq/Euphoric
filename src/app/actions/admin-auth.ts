"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, credentialsMatch } from "../lib/admin-auth";
import { safeReturnPath } from "../lib/redirects";

export async function adminLoginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeReturnPath(String(formData.get("next") ?? ""), "/admin");

  if (!credentialsMatch(username, password)) {
    redirect(`/admin/login?error=Invalid%20admin%20credentials&next=${encodeURIComponent(next)}`);
  }

  await createAdminSession(username);
  redirect(next);
}

export async function adminLogoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
