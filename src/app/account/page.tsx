import Link from "next/link";
import { MapPin, Package, UserRound } from "lucide-react";
import { requireUser } from "../lib/auth";
import { createSupabaseServerClient } from "../lib/supabase/server";
import { formatProductPrice } from "../data/products";
import { formatDate, StatusBadge } from "../components/account/OrderUI";

export const metadata = {
  title: "My account | Euphoric",
  robots: { index: false, follow: false },
};

export default async function AccountOverviewPage() {
  const { user } = await requireUser("/account");
  const supabase = await createSupabaseServerClient();
  const [{ data: orders }, { count: addressCount }] = supabase
    ? await Promise.all([
        supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("customer_addresses")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
      ])
    : [{ data: [] }, { count: 0 }];

  const cards = [
    {
      label: "Orders",
      value: String(orders?.length ?? 0),
      detail: "Recent orders shown below",
      href: "/account/orders",
      icon: Package,
    },
    {
      label: "Addresses",
      value: String(addressCount ?? 0),
      detail: "Saved delivery locations",
      href: "/account/addresses",
      icon: MapPin,
    },
    {
      label: "Profile",
      value: "Manage",
      detail: "Name and phone number",
      href: "/account/profile",
      icon: UserRound,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, detail, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="border border-[#C0C0C0]/15 bg-[#111113] p-5 transition hover:border-[#C0C0C0]/45"
          >
            <Icon className="size-5 text-[#C0C0C0]" />
            <p className="mt-6 text-xs uppercase tracking-widest text-[#D9D9D9]/60">
              {label}
            </p>
            <p className="mt-2 font-playfair text-3xl">{value}</p>
            <p className="mt-2 text-xs text-[#D9D9D9]/55">{detail}</p>
          </Link>
        ))}
      </div>

      <div>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C0C0C0]">
              Purchase history
            </p>
            <h2 className="mt-2 font-playfair text-3xl">Recent orders</h2>
          </div>
          <Link
            href="/account/orders"
            className="text-sm text-[#C0C0C0] underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        {!orders?.length ? (
          <div className="border border-[#C0C0C0]/15 bg-[#111113] p-8 text-center">
            <p className="font-playfair text-2xl">No account orders yet</p>
            <p className="mt-2 text-sm text-[#D9D9D9]/60">
              Orders placed while signed in will appear here.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex bg-[#C0C0C0] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black"
            >
              Shop fragrances
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#C0C0C0]/10 border border-[#C0C0C0]/15">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.order_number}`}
                className="grid gap-3 bg-[#111113] p-5 transition hover:bg-[#171719] sm:grid-cols-[1fr_auto_auto] sm:items-center"
              >
                <div>
                  <p className="font-medium">{order.order_number}</p>
                  <p className="mt-1 text-xs text-[#D9D9D9]/55">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <StatusBadge value={order.order_status} />
                <p className="text-[#C0C0C0]">
                  {formatProductPrice(order.total)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
