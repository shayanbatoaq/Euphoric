"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { getSupabaseBrowserClient } from "../lib/supabase";
import { getAuthRedirectOrigin } from "../lib/auth-redirect";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Password reset is awaiting Supabase configuration.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${getAuthRedirectOrigin()}/auth/callback?next=/auth/update-password`,
      },
    );
    setSubmitting(false);
    setMessage(
      error
        ? error.message
        : "If that email is registered, a reset link is on its way.",
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          className="w-full border border-[#C0C0C0]/25 bg-[#0A0A0A] px-4 py-3 outline-none focus:border-[#C0C0C0]"
        />
      </label>
      {message && (
        <p role="status" className="text-sm leading-6 text-[#D9D9D9]">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 bg-[#C0C0C0] px-5 py-3 text-xs uppercase tracking-widest text-[#0A0A0A] disabled:opacity-50"
      >
        {submitting && <LoaderCircle className="size-4 animate-spin" />}
        Send reset link
      </button>
      <Link
        href="/auth/sign-in"
        className="block text-center text-sm text-[#D9D9D9]/70 underline underline-offset-4"
      >
        Return to sign in
      </Link>
    </form>
  );
}

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmation) {
      setMessage("The passwords do not match.");
      return;
    }

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Password reset is awaiting Supabase configuration.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.replace("/account");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {[
        {
          label: "New password",
          value: password,
          setValue: setPassword,
          autoComplete: "new-password",
        },
        {
          label: "Confirm password",
          value: confirmation,
          setValue: setConfirmation,
          autoComplete: "new-password",
        },
      ].map((field) => (
        <label key={field.label} className="block">
          <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
            {field.label}
          </span>
          <input
            type="password"
            value={field.value}
            onChange={(event) => field.setValue(event.target.value)}
            minLength={8}
            required
            autoComplete={field.autoComplete}
            className="w-full border border-[#C0C0C0]/25 bg-[#0A0A0A] px-4 py-3 outline-none focus:border-[#C0C0C0]"
          />
        </label>
      ))}
      {message && (
        <p role="status" className="text-sm leading-6 text-[#D9D9D9]">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 bg-[#C0C0C0] px-5 py-3 text-xs uppercase tracking-widest text-[#0A0A0A] disabled:opacity-50"
      >
        {submitting && <LoaderCircle className="size-4 animate-spin" />}
        Update password
      </button>
    </form>
  );
}
