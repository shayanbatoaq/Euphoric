"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, LockKeyhole, Mail, UserRound } from "lucide-react";
import { getSupabaseBrowserClient } from "../lib/supabase";
import { safeReturnPath } from "../lib/redirects";

type AuthMode = "signin" | "signup";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(
    searchParams.get("error") ?? "",
  );
  const next = safeReturnPath(searchParams.get("next"), "/account");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Account access is awaiting Supabase configuration.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const result =
      mode === "signup"
        ? await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: { full_name: name.trim() },
              emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
            },
          })
        : await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

    setSubmitting(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setMessage("Check your email to confirm your Euphoric account.");
      return;
    }

    router.replace(next);
    router.refresh();
  }

  async function oauth(provider: "google" | "facebook") {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Account access is awaiting Supabase configuration.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setMessage(error.message);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {mode === "signup" && (
        <AuthField
          icon={<UserRound className="size-4" />}
          label="Full name"
          type="text"
          value={name}
          onChange={setName}
          autoComplete="name"
        />
      )}
      <AuthField
        icon={<Mail className="size-4" />}
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
      />
      <AuthField
        icon={<LockKeyhole className="size-4" />}
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        autoComplete={mode === "signin" ? "current-password" : "new-password"}
        minLength={6}
      />

      {message && (
        <p
          role="status"
          className="border border-[#C0C0C0]/15 bg-[#1C1C1E] p-3 text-sm leading-6 text-[#D9D9D9]"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 bg-[#C0C0C0] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0A0A0A] transition hover:bg-[#D9D9D9] disabled:opacity-50"
      >
        {submitting && <LoaderCircle className="size-4 animate-spin" />}
        {mode === "signin" ? "Sign in" : "Create account"}
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => oauth("google")}
          disabled={submitting}
          className="border border-[#C0C0C0]/25 bg-[#1C1C1E] px-4 py-3 text-sm transition hover:border-[#C0C0C0]"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => oauth("facebook")}
          disabled={submitting}
          className="border border-[#C0C0C0]/25 bg-[#1C1C1E] px-4 py-3 text-sm transition hover:border-[#C0C0C0]"
        >
          Facebook
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#D9D9D9]/70">
        <Link
          href={
            mode === "signin"
              ? `/auth/sign-up?next=${encodeURIComponent(next)}`
              : `/auth/sign-in?next=${encodeURIComponent(next)}`
          }
          className="underline underline-offset-4 hover:text-white"
        >
          {mode === "signin" ? "Create an account" : "Already registered?"}
        </Link>
        {mode === "signin" && (
          <Link
            href="/auth/forgot-password"
            className="underline underline-offset-4 hover:text-white"
          >
            Forgot password?
          </Link>
        )}
      </div>
    </form>
  );
}

function AuthField({
  icon,
  label,
  type,
  value,
  onChange,
  autoComplete,
  minLength,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
        {label}
      </span>
      <span className="relative block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0C0]">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required
          minLength={minLength}
          className="w-full border border-[#C0C0C0]/25 bg-[#0A0A0A] py-3 pl-10 pr-3 text-[#F5F5F5] outline-none focus:border-[#C0C0C0]"
        />
      </span>
    </label>
  );
}
