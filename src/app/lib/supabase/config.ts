export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(
  /\/rest\/v1\/?$/,
  "",
);
export const supabasePublicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabasePublicKey,
);

export function requirePublicSupabaseConfig() {
  if (!supabaseUrl || !supabasePublicKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and a public Supabase key.",
    );
  }

  return { url: supabaseUrl, key: supabasePublicKey };
}

export function fetchWithSupabaseTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  return fetch(input, {
    ...init,
    signal: init?.signal ?? AbortSignal.timeout(2500),
  });
}
