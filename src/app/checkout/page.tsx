import type { Metadata } from "next";
import CheckoutPage from "../pages/CheckoutPage";
import { getAuthContext } from "../lib/auth";
import { createSupabaseServerClient } from "../lib/supabase/server";

export const metadata: Metadata = {
  title: "Checkout | Euphoric",
  description:
    "Complete your Euphoric fragrance order with secure cash on delivery.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const auth = await getAuthContext();
  let savedAddress: { phone: string; city: string; address: string; notes: string } | null = null;
  if (auth) {
    const supabase = await createSupabaseServerClient();
    const { data } = supabase
      ? await supabase
          .from("customer_addresses")
          .select("phone,city,address_line,notes")
          .eq("user_id", auth.user.id)
          .eq("is_default", true)
          .maybeSingle()
      : { data: null };
    if (data) {
      savedAddress = {
        phone: data.phone,
        city: data.city,
        address: data.address_line,
        notes: data.notes ?? "",
      };
    }
  }

  return (
    <CheckoutPage
      customerDefaults={{
        name: auth?.profile?.full_name ?? (auth?.user.user_metadata.full_name as string | undefined) ?? "",
        email: auth?.user.email ?? "",
        ...savedAddress,
      }}
    />
  );
}
