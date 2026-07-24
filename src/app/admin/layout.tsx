import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "../lib/auth";
import { AdminNav } from "../components/admin/AdminNav";

export const metadata = {
  title: "Administration | Euphoric",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { profile, user } = await requireAdmin("/admin");

  return (
    <main className="min-h-screen bg-[#080809] px-4 pb-24 pt-40 text-[#F5F5F5] sm:px-6">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-10 border-b border-[#C0C0C0]/15 pb-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#C0C0C0]">
                Euphoric operations
              </p>
              <h1 className="mt-3 font-playfair text-4xl sm:text-5xl">
                Administration
              </h1>
              <p className="mt-2 text-sm text-[#D9D9D9]/55">
                {profile?.full_name ?? user.email}
              </p>
            </div>
            <Link
              href="/account"
              className="flex items-center gap-2 border border-[#C0C0C0]/25 px-4 py-2.5 text-xs uppercase tracking-widest text-[#D9D9D9] hover:border-[#C0C0C0] hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Customer account
            </Link>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <AdminNav />
          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </main>
  );
}
