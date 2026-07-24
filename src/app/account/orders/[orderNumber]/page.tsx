import { notFound } from "next/navigation";
import { requireUser } from "../../../lib/auth";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { formatProductPrice } from "../../../data/products";
import {
  formatDate,
  formatStatus,
  StatusBadge,
} from "../../../components/account/OrderUI";

export const metadata = {
  title: "Order details | Euphoric",
  robots: { index: false, follow: false },
};

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const { user } = await requireUser(`/account/orders/${orderNumber}`);
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .eq("user_id", user.id)
    .maybeSingle();
  if (!order) notFound();

  const [{ data: items }, { data: history }] = await Promise.all([
    supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at"),
    supabase
      .from("order_status_history")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at"),
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#C0C0C0]">
            Order details
          </p>
          <h2 className="mt-2 font-playfair text-4xl">{order.order_number}</h2>
          <p className="mt-2 text-sm text-[#D9D9D9]/60">
            Placed {formatDate(order.created_at)}
          </p>
        </div>
        <div className="flex gap-2">
          <StatusBadge value={order.order_status} />
          <StatusBadge value={order.payment_status} />
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="border border-[#C0C0C0]/15 bg-[#111113]">
            <h3 className="border-b border-[#C0C0C0]/10 px-5 py-4 font-playfair text-2xl">
              Fragrances
            </h3>
            <div className="divide-y divide-[#C0C0C0]/10">
              {(items ?? []).map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] gap-5 p-5 text-sm"
                >
                  <div>
                    <p>{item.product_name}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-[#D9D9D9]/55">
                      {item.product_brand} · {item.product_size_ml} ml · Qty{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="text-[#C0C0C0]">
                    {formatProductPrice(item.line_total)}
                  </p>
                </div>
              ))}
            </div>
            <dl className="space-y-3 border-t border-[#C0C0C0]/10 p-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#D9D9D9]/60">Subtotal</dt>
                <dd>{formatProductPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#D9D9D9]/60">Shipping</dt>
                <dd>{formatProductPrice(order.shipping_fee)}</dd>
              </div>
              <div className="flex justify-between border-t border-[#C0C0C0]/10 pt-3 font-medium">
                <dt>Total</dt>
                <dd className="text-[#C0C0C0]">
                  {formatProductPrice(order.total)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="border border-[#C0C0C0]/15 bg-[#111113] p-5">
            <h3 className="font-playfair text-2xl">Order progress</h3>
            <ol className="mt-5 space-y-4 border-l border-[#C0C0C0]/20 pl-5">
              {(history ?? []).map((entry) => (
                <li key={entry.id}>
                  <p className="text-sm">{formatStatus(entry.new_status)}</p>
                  <p className="mt-1 text-xs text-[#D9D9D9]/55">
                    {formatDate(entry.created_at)}
                    {entry.note ? ` · ${entry.note}` : ""}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="border border-[#C0C0C0]/15 bg-[#111113] p-5">
            <h3 className="font-playfair text-2xl">Delivery</h3>
            <p className="mt-4 text-sm leading-6 text-[#D9D9D9]/70">
              {order.customer_name}
              <br />
              {order.customer_phone}
              <br />
              {order.delivery_address}
              <br />
              {order.city}
            </p>
          </section>
          <section className="border border-[#C0C0C0]/15 bg-[#111113] p-5">
            <h3 className="font-playfair text-2xl">Payment</h3>
            <p className="mt-4 text-sm text-[#D9D9D9]/70">
              Cash on delivery
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
