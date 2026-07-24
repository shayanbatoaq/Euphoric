import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function AccessDeniedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-5 pb-24 pt-44 text-center text-[#F5F5F5] sm:pt-48">
      <section className="glass max-w-xl p-10">
        <ShieldX className="mx-auto size-10 text-[#C0C0C0]" />
        <h1 className="mt-6 font-playfair text-4xl">Access denied</h1>
        <p className="mt-4 text-sm leading-7 text-[#D9D9D9]/70">
          This area is restricted to authorized Euphoric administrators.
        </p>
        <Link
          href="/account"
          className="mt-8 inline-block bg-[#C0C0C0] px-6 py-3 text-xs uppercase tracking-widest text-[#0A0A0A]"
        >
          Return to your account
        </Link>
      </section>
    </main>
  );
}
