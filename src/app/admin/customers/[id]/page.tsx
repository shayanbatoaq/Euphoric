import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";
import { requireAdmin } from "../../../lib/auth";
import { formatProductPrice } from "../../../data/products";
import { formatDate, StatusBadge } from "../../../components/account/OrderUI";
import { AdminHeader } from "../../../components/admin/AdminUI";

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAdmin(`/admin/customers/${id}`);
  const admin = createSupabaseAdminClient();
  const [
    { data: profile },
    { data: authResult },
    { data: addresses },
    { data: orders },
  ] = await Promise.all([
    admin.from("profiles").select("*").eq("id", id).maybeSingle(),
    admin.auth.admin.getUserById(id),
    admin
      .from("customer_addresses")
      .select("*")
      .eq("user_id", id)
      .order("is_default", { ascending: false }),
    admin
      .from("orders")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false }),
  ]);
  if (!profile) notFound();
  const authUser = authResult?.user;

  return (
    <div>
      <AdminHeader
        eyebrow="Customer"
        title={profile.full_name || "Unnamed customer"}
        description={`${authUser?.email ?? "No email"} · Joined ${formatDate(profile.created_at)}`}
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <section className="border border-[#C0C0C0]/15 bg-[#111113] p-5">
            <h3 className="font-playfair text-2xl">Profile</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#D9D9D9]/45">
                  Email
                </dt>
                <dd className="mt-1 break-all">{authUser?.email ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#D9D9D9]/45">
                  Phone
                </dt>
                <dd className="mt-1">{profile.phone ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#D9D9D9]/45">
                  Role
                </dt>
                <dd className="mt-1 capitalize">{profile.role}</dd>
              </div>
            </dl>
          </section>
          <section className="border border-[#C0C0C0]/15 bg-[#111113] p-5">
            <h3 className="font-playfair text-2xl">Addresses</h3>
            <div className="mt-5 space-y-5">
              {(addresses ?? []).map((address) => (
                <div
                  key={address.id}
                  className="border-t border-[#C0C0C0]/10 pt-4 first:border-0 first:pt-0"
                >
                  <p className="text-xs uppercase tracking-wider text-[#C0C0C0]">
                    {address.label || "Address"}
                    {address.is_default ? " · Default" : ""}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#D9D9D9]/65">
                    {address.full_name}
                    <br />
                    {address.phone}
                    <br />
                    {address.address_line}, {address.city}
                  </p>
                </div>
              ))}
              {!addresses?.length && (
                <p className="text-sm text-[#D9D9D9]/55">
                  No saved addresses.
                </p>
              )}
            </div>
          </section>
        </aside>

        <section>
          <h3 className="font-playfair text-3xl">Orders</h3>
          <div className="mt-5 overflow-x-auto border border-[#C0C0C0]/15">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#171719] text-xs uppercase tracking-wider text-[#C0C0C0]">
                <tr>
                  <th className="px-4 py-4">Order</th>
                  <th className="px-4 py-4">Placed</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C0C0C0]/10">
                {(orders ?? []).map((order) => (
                  <tr key={order.id} className="bg-[#111113]">
                    <td className="px-4 py-4">
                      <Link
                        href={`/admin/orders/${order.order_number}`}
                        className="underline decoration-[#C0C0C0]/40 underline-offset-4"
                      >
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-[#D9D9D9]/60">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge value={order.order_status} />
                    </td>
                    <td className="px-4 py-4 text-right text-[#C0C0C0]">
                      {formatProductPrice(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!orders?.length && (
              <p className="bg-[#111113] p-8 text-center text-[#D9D9D9]/55">
                No account-linked orders.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
