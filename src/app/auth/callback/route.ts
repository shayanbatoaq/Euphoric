import { NextResponse, type NextRequest } from "next/server";
import { safeReturnPath } from "../../lib/redirects";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = safeReturnPath(
    request.nextUrl.searchParams.get("next"),
    "/account",
  );
  const destination = new URL(next, request.url);
  const supabase = await createSupabaseServerClient();

  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(destination);
    }
  }

  const failure = new URL("/auth/sign-in", request.url);
  failure.searchParams.set(
    "error",
    "The authentication link is invalid or expired.",
  );
  return NextResponse.redirect(failure);
}
