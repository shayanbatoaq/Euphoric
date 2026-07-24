import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { safeReturnPath } from "../../lib/redirects";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type") as EmailOtpType | null;
  const next = safeReturnPath(
    request.nextUrl.searchParams.get("next"),
    "/account",
  );
  const supabase = await createSupabaseServerClient();

  if (tokenHash && type && supabase) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  const failure = new URL("/auth/sign-in", request.url);
  failure.searchParams.set(
    "error",
    "The confirmation link is invalid or expired.",
  );
  return NextResponse.redirect(failure);
}
