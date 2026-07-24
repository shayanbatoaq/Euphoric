import Link from "next/link";
import { requireUser } from "../../lib/auth";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import { formatProductPrice } from "../../data/products";
import { formatDate, StatusBadge } from "../../components/account/OrderUI";

export const metadata = {
  title: "My orders | Euphoric",
  robots: { index: false, follow: false },
};

export default async function AccountOrdersPage() {
  const { user } = await requireUser("/account/orders");
  const supabase = await createSupabaseServerClient();
  const { data: orders } = supabase
    ? await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100)
    : { data: [] };

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-[#C0C0C0]">
        Purchase history
      </p>
      <h2 className="mt-2 font-playfair text-4xl">Your orders</h2>
      <p className="mt-3 text-sm leading-6 text-[#D9D9D9]/60">
        Follow every signed-in order from confirmation through delivery.
      </p>

      <div className="mt-8">
        {!orders?.length ? (
          <div className="border border-[#C0C0C0]/15 bg-[#111113] p-8 text-center">
            <p className="font-playfair text-2xl">No orders found</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex bg-[#C0C0C0] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black"
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#C0C0C0]/15">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-[#171719] text-xs uppercase tracking-wider text-[#C0C0C0]">
                <tr>
                  <th className="px-5 py-4">Order</th>
                  <th className="px-5 py-4">Placed</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Payment</th>
                  <th className="px-5 py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C0C0C0]/10">
                {orders.map((order) => (
                  <tr key={order.id} className="bg-[#111113]">
                    <td className="px-5 py-4">
                      <Link
                        href={`/account/orders/${order.order_number}`}
                        className="font-medium underline decoration-[#C0C0C0]/40 underline-offset-4 hover:text-[#C0C0C0]"
                      >
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-[#D9D9D9]/65">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge value={order.order_status} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge value={order.payment_status} />
                    </td>
                    <td className="px-5 py-4 text-right text-[#C0C0C0]">
                      {formatProductPrice(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
