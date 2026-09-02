import { NextResponse, type NextRequest } from "next/server";
import { safeReturnPath } from "../../lib/redirects";
import { createSupabaseServerClient } from "../../lib/supabase/server";

function getPublicOrigin(request: NextRequest) {
  const host = request.nextUrl.hostname;
  const isInternalHost = host === "0.0.0.0" || host === "127.0.0.1";

  if (isInternalHost) {
    return process.env.NEXT_PUBLIC_SITE_URL || "https://euphoric.pk";
  }

  return request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = safeReturnPath(
    request.nextUrl.searchParams.get("next"),
    "/account",
  );
  const origin = getPublicOrigin(request);
  const destination = new URL(next, origin);
  const supabase = await createSupabaseServerClient();

  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(destination);
    }
  }

  const failure = new URL("/auth/sign-in", origin);
  failure.searchParams.set(
    "error",
    "The authentication link is invalid or expired.",
  );
  return NextResponse.redirect(failure);
}
