import type { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { requireUser } from "../lib/auth";
import { signOutAction } from "../actions/account";
import { AccountNav } from "../components/account/AccountNav";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, profile } = await requireUser("/account");
  const displayName =
    profile?.full_name ??
    (user.user_metadata.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Customer";

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-4 pb-24 pt-40 text-[#F5F5F5] sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 border-b border-[#C0C0C0]/15 pb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C0C0C0]">
            Euphoric account
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="font-playfair text-4xl sm:text-5xl">
                Welcome, {displayName}
              </h1>
              <p className="mt-2 text-sm text-[#D9D9D9]/65">{user.email}</p>
            </div>
            <form action={signOutAction}>
              <button className="flex items-center gap-2 border border-[#C0C0C0]/25 px-4 py-2.5 text-xs uppercase tracking-widest text-[#D9D9D9] hover:border-[#C0C0C0] hover:text-white">
                <LogOut className="size-4" />
                Sign out
              </button>
            </form>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <AccountNav isAdmin={profile?.role === "admin"} />
          <section>{children}</section>
        </div>
      </div>
    </main>
  );
}
