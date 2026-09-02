import type { ReactNode } from "react";
import {
  createAddressAction,
  deleteAddressAction,
  setDefaultAddressAction,
} from "../../actions/account";
import { requireUser } from "../../lib/auth";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import { AccountNotice } from "../../components/account/OrderUI";
import { ConfirmSubmitButton } from "../../components/ConfirmSubmitButton";
import { pakistanCities } from "../../data/pakistan-cities";
import { PakistanPhoneInput } from "../../components/PakistanPhoneInput";

export const metadata = {
  title: "Saved addresses | Euphoric",
  robots: { index: false, follow: false },
};

export default async function AccountAddressesPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
    deleted?: string;
    error?: string;
  }>;
}) {
  const { user, profile } = await requireUser("/account/addresses");
  const supabase = await createSupabaseServerClient();
  const query = await searchParams;
  const { data: addresses } = supabase
    ? await supabase
        .from("customer_addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-[#C0C0C0]">
        Delivery details
      </p>
      <h2 className="mt-2 font-playfair text-4xl">Saved addresses</h2>
      <p className="mt-3 text-sm leading-6 text-[#D9D9D9]/60">
        Keep frequently used addresses ready for future checkouts.
      </p>

      <div className="mt-8">
        <AccountNotice
          success={
            query.saved
              ? "Your address has been saved."
              : query.deleted
                ? "The address has been removed."
                : undefined
          }
          error={query.error}
        />

        {!!addresses?.length && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {addresses.map((address) => (
              <article
                key={address.id}
                className="border border-[#C0C0C0]/15 bg-[#111113] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-playfair text-xl">
                    {address.label || "Delivery address"}
                  </h3>
                  {address.is_default && (
                    <span className="border border-[#C0C0C0]/25 px-2 py-1 text-[10px] uppercase tracking-wider text-[#C0C0C0]">
                      Default
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-[#D9D9D9]/70">
                  {address.full_name}
                  <br />
                  {address.phone}
                  <br />
                  {address.address_line}
                  <br />
                  {address.city}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {!address.is_default && (
                    <form action={setDefaultAddressAction}>
                      <input
                        type="hidden"
                        name="addressId"
                        value={address.id}
                      />
                      <button className="text-xs text-[#C0C0C0] underline underline-offset-4">
                        Make default
                      </button>
                    </form>
                  )}
                  <form action={deleteAddressAction}>
                    <input type="hidden" name="addressId" value={address.id} />
                    <ConfirmSubmitButton
                      message="Remove this saved address?"
                      className="text-xs text-red-200/75 underline underline-offset-4"
                    >
                      Remove
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}

        <form
          action={createAddressAction}
          className="border border-[#C0C0C0]/15 bg-[#111113] p-6"
        >
          <h3 className="font-playfair text-2xl">Add an address</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <AddressField label="Label">
              <select
                name="label"
                className="account-input"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a label
                </option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </AddressField>
            <AddressField label="Full name">
              <input
                name="fullName"
                defaultValue={profile?.full_name ?? ""}
                required
                className="account-input"
              />
            </AddressField>
            <AddressField label="Phone number">
              <PakistanPhoneInput
                name="phone"
                defaultValue={profile?.phone ?? ""}
                required
              />
            </AddressField>
            <AddressField label="City">
              <input
                name="city"
                list="pakistan-address-cities"
                required
                placeholder="Search or type your city"
                className="account-input"
              />
              <datalist id="pakistan-address-cities">
                {pakistanCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </AddressField>
            <div className="sm:col-span-2">
              <AddressField label="Complete address">
                <textarea
                  name="addressLine"
                  rows={3}
                  required
                  minLength={10}
                  className="account-input resize-none"
                />
              </AddressField>
            </div>
            <div className="sm:col-span-2">
              <AddressField label="Delivery notes">
                <textarea
                  name="notes"
                  rows={2}
                  className="account-input resize-none"
                />
              </AddressField>
            </div>
          </div>
          <label className="mt-5 flex items-center gap-3 text-sm text-[#D9D9D9]/70">
            <input
              type="checkbox"
              name="isDefault"
              className="size-4 accent-[#C0C0C0]"
            />
            Use as my default address
          </label>
          <button className="mt-6 bg-[#C0C0C0] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-white">
            Save address
          </button>
        </form>
      </div>
    </div>
  );
}

function AddressField({
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
