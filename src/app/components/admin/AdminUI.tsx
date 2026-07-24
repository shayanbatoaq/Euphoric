import type { ReactNode } from "react";
import Link from "next/link";

export function AdminHeader({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#C0C0C0]">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-playfair text-4xl">{title}</h2>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D9D9D9]/60">
            {description}
          </p>
        )}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="bg-[#C0C0C0] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-white"
        >
          {actionLabel}
        </Link>
      )}
    </header>
  );
}

export function AdminNotice({
  saved,
  error,
}: {
  saved?: boolean;
  error?: string;
}) {
  if (!saved && !error) return null;
  return (
    <p
      role="status"
      className={`mt-6 border p-3 text-sm ${
        error
          ? "border-red-300/20 bg-red-300/5 text-red-100"
          : "border-emerald-300/20 bg-emerald-300/5 text-emerald-100"
      }`}
    >
      {error ?? "Changes saved."}
    </p>
  );
}

export function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-2 block text-xs text-[#D9D9D9]/45">{hint}</span>
      )}
    </label>
  );
}
