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
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (mode === "signup" && (password.length < 8 || !/\d/.test(password))) {
      setSubmitting(false);
      setMessage("Password must be at least 8 characters and include a number.");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setSubmitting(false);
      setMessage("Passwords do not match.");
      return;
    }

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

  async function oauth(provider: "google") {
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
        minLength={8}
        pattern={mode === "signup" ? ".*[0-9].*" : undefined}
        title={mode === "signup" ? "Use at least 8 characters and include a number." : undefined}
        placeholder={mode === "signin" ? "Password" : "At least 8 characters + a number"}
      />

      {mode === "signup" && (
        <AuthField
          icon={<LockKeyhole className="size-4" />}
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          minLength={6}
        />
      )}

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

      <div className="grid grid-cols-1 gap-3">
        <button
          type="button"
          onClick={() => oauth("google")}
          disabled={submitting}
          className="border border-[#C0C0C0]/25 bg-[#1C1C1E] px-4 py-3 text-sm transition hover:border-[#C0C0C0]"
        >
          <span className="inline-flex items-center justify-center gap-2"><GoogleIcon />Google</span>
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

function GoogleIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4"><path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"/><path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"/><path fill="#FBBC05" d="M6.54 13.58A5.85 5.85 0 0 1 6.24 12c0-.55.1-1.09.3-1.58V7.89H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.11l3.24-2.53Z"/><path fill="#EA4335" d="M12 6.39c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z"/></svg>;
}

function AuthField({
  icon,
  label,
  type,
  value,
  onChange,
  autoComplete,
  minLength,
  pattern,
  title,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  minLength?: number;
  pattern?: string;
  title?: string;
  placeholder?: string;
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
          pattern={pattern}
          title={title}
          placeholder={placeholder}
          className="w-full border border-[#C0C0C0]/25 bg-[#0A0A0A] py-3 pl-10 pr-3 text-[#F5F5F5] outline-none focus:border-[#C0C0C0]"
        />
      </span>
    </label>
  );
}
