import Link from "next/link";
import { createSupabaseAdminClient } from "../lib/supabase/admin";
import { requireAdmin } from "../lib/auth";
import { formatProductPrice } from "../data/products";
import { formatDate, StatusBadge } from "../components/account/OrderUI";
import { AdminHeader } from "../components/admin/AdminUI";

export default async function AdminOverviewPage() {
  await requireAdmin("/admin");
  const admin = createSupabaseAdminClient();
  const [
    { data: orderRows },
    { data: productRows },
    { count: enquiryCount },
    { count: customerCount },
    { data: storeSettings },
    { data: recentOrders },
  ] = await Promise.all([
    admin
      .from("orders")
      .select("order_status,payment_method,total,created_at"),
    admin
      .from("products")
      .select("is_active,track_inventory,stock_quantity"),
    admin
      .from("contact_enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin
      .from("store_settings")
      .select("low_stock_threshold")
      .eq("id", true)
      .single(),
    admin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);
  const dayKey = (value: string | Date) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(value));
  const today = dayKey(new Date());
  const orders = orderRows ?? [];
  const deliveredOrders = orders.filter(
    (order) => order.order_status === "delivered",
  );
  const deliveredRevenue = deliveredOrders.reduce(
    (sum, order) => sum + order.total,
    0,
  );
  const lowStockThreshold = storeSettings?.low_stock_threshold ?? 5;
  const orderCount = (status: string) =>
    orders.filter((order) => order.order_status === status).length;

  const metrics = [
    {
      label: "Orders today",
      value: orders.filter((order) => dayKey(order.created_at) === today).length,
    },
    { label: "Pending", value: orderCount("pending") },
    { label: "Confirmed", value: orderCount("confirmed") },
    { label: "Dispatched", value: orderCount("dispatched") },
    { label: "Delivered", value: orderCount("delivered") },
    { label: "Cancelled", value: orderCount("cancelled") },
    {
      label: "Total sales",
      value: formatProductPrice(deliveredRevenue),
    },
    {
      label: "COD sales",
      value: formatProductPrice(
        deliveredOrders
          .filter((order) => order.payment_method === "cod")
          .reduce((sum, order) => sum + order.total, 0),
      ),
    },
    {
      label: "Active products",
      value: (productRows ?? []).filter((product) => product.is_active).length,
    },
    {
      label: "Low stock",
      value: (productRows ?? []).filter(
        (product) =>
          product.is_active &&
          product.track_inventory &&
          (product.stock_quantity ?? 0) <= lowStockThreshold,
      ).length,
    },
    { label: "New enquiries", value: enquiryCount ?? 0 },
    { label: "Customers", value: customerCount ?? 0 },
  ];

  return (
    <div>
      <AdminHeader
        eyebrow="At a glance"
        title="Store overview"
        description="Live operational data from orders, catalogue, customers, and enquiries."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="border border-[#C0C0C0]/15 bg-[#111113] p-5"
          >
            <p className="text-xs uppercase tracking-widest text-[#D9D9D9]/55">
              {metric.label}
            </p>
            <p className="mt-4 font-playfair text-3xl">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-playfair text-3xl">Recent orders</h3>
          <Link
            href="/admin/orders"
            className="text-sm text-[#C0C0C0] underline underline-offset-4"
          >
            Manage orders
          </Link>
        </div>
        <div className="overflow-x-auto border border-[#C0C0C0]/15">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#171719] text-xs uppercase tracking-wider text-[#C0C0C0]">
              <tr>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Placed</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C0C0C0]/10">
              {(recentOrders ?? []).map((order) => (
                <tr key={order.id} className="bg-[#111113]">
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/orders/${order.order_number}`}
                      className="underline decoration-[#C0C0C0]/40 underline-offset-4"
                    >
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <p>{order.customer_name}</p>
                    <p className="text-xs text-[#D9D9D9]/50">
                      {order.customer_phone}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-[#D9D9D9]/60">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge value={order.order_status} />
                  </td>
                  <td className="px-5 py-4 text-right text-[#C0C0C0]">
                    {formatProductPrice(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
