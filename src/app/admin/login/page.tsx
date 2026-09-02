import type { Metadata } from "next";
import Link from "next/link";
import { adminLoginAction } from "../../actions/admin-auth";

export const metadata: Metadata = {
  title: "Admin sign in | Euphoric",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const next = params.next ?? "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080809] px-4 py-16 text-[#F5F5F5]">
      <div className="w-full max-w-md border border-[#C0C0C0]/15 bg-[#111113] p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-[#C0C0C0]">Euphoric operations</p>
        <h1 className="mt-3 font-playfair text-4xl">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-[#D9D9D9]/65">This sign-in is separate from customer accounts.</p>
        {params.error && <p className="mt-6 border border-red-400/30 bg-red-950/20 p-3 text-sm text-red-200">{params.error}</p>}
        <form action={adminLoginAction} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <label className="block"><span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">Username</span><input name="username" required autoComplete="username" className="w-full border border-[#C0C0C0]/25 bg-[#0A0A0A] px-3 py-3 outline-none focus:border-[#C0C0C0]" /></label>
          <label className="block"><span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">Password</span><input name="password" type="password" required autoComplete="current-password" className="w-full border border-[#C0C0C0]/25 bg-[#0A0A0A] px-3 py-3 outline-none focus:border-[#C0C0C0]" /></label>
          <button type="submit" className="w-full bg-[#C0C0C0] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0A0A0A] hover:bg-[#D9D9D9]">Sign in to admin</button>
        </form>
        <Link href="/" className="mt-6 inline-block text-sm text-[#D9D9D9]/70 underline underline-offset-4 hover:text-white">Return to storefront</Link>
      </div>
    </main>
  );
}
