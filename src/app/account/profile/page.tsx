import type { ReactNode } from "react";
import { requireUser } from "../../lib/auth";
import { updateProfileAction } from "../../actions/account";
import { AccountNotice } from "../../components/account/OrderUI";
import { PakistanPhoneInput } from "../../components/PakistanPhoneInput";

export const metadata = {
  title: "My profile | Euphoric",
  robots: { index: false, follow: false },
};

export default async function AccountProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { user, profile } = await requireUser("/account/profile");
  const query = await searchParams;

  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-[#C0C0C0]">
        Personal details
      </p>
      <h2 className="mt-2 font-playfair text-4xl">Your profile</h2>
      <p className="mt-3 text-sm leading-6 text-[#D9D9D9]/60">
        Keep your contact information current for smoother deliveries.
      </p>

      <div className="mt-8">
        <AccountNotice
          success={query.saved ? "Your profile has been updated." : undefined}
          error={query.error}
        />
        <form
          action={updateProfileAction}
          className="space-y-5 border border-[#C0C0C0]/15 bg-[#111113] p-6"
        >
          <Field label="Full name">
            <input
              name="fullName"
              defaultValue={
                profile?.full_name ??
                (user.user_metadata.full_name as string | undefined) ??
                ""
              }
              required
              minLength={2}
              autoComplete="name"
              className="account-input"
            />
          </Field>
          <Field label="Email">
            <input
              value={user.email ?? ""}
              readOnly
              disabled
              className="account-input opacity-60"
            />
            <span className="mt-2 block text-xs text-[#D9D9D9]/45">
              Email changes are managed through your authentication provider.
            </span>
          </Field>
          <Field label="Phone number">
            <PakistanPhoneInput
              name="phone"
              defaultValue={profile?.phone ?? ""}
            />
          </Field>
          <button className="bg-[#C0C0C0] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-white">
            Save profile
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
        {label}
      </span>
      {children}
    </label>
  );
}
