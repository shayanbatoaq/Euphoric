import type { ReactNode } from "react";

export function AuthPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0A0A0A] px-5 pb-24 pt-44 text-[#F5F5F5] sm:pt-48">
      <section className="glass mx-auto max-w-md p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C0C0C0]">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-playfair text-4xl">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-[#D9D9D9]/65">
          {description}
        </p>
        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
