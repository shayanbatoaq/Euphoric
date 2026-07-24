import Link from "next/link";
import { createSupabaseAdminClient } from "../../lib/supabase/admin";
import { requireAdmin } from "../../lib/auth";
import { formatProductPrice } from "../../data/products";
import { AdminHeader } from "../../components/admin/AdminUI";

const PAGE_SIZE = 25;

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  await requireAdmin("/admin/customers");
  const query = await searchParams;
  const search = (query.q ?? "").trim().toLowerCase().slice(0, 100);
  const page = Math.max(1, Number.parseInt(query.page ?? "1", 10) || 1);
  const admin = createSupabaseAdminClient();
  const [
    { data: profiles },
    { data: orders },
    { data: authData },
  ] = await Promise.all([
    admin.from("profiles").select("*").order("created_at", { ascending: false }),
    admin.from("orders").select("user_id,total,order_status"),
    admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
  ]);

  const usersById = new Map(authData?.users.map((user) => [user.id, user]));
  const orderSummary = new Map<
    string,
    { count: number; delivered: number }
  >();
  (orders ?? []).forEach((order) => {
    if (!order.user_id) return;
    const summary = orderSummary.get(order.user_id) ?? {
      count: 0,
      delivered: 0,
    };
    summary.count += 1;
    if (order.order_status === "delivered") summary.delivered += order.total;
    orderSummary.set(order.user_id, summary);
  });

  const matching = (profiles ?? []).filter((profile) => {
    if (!search) return true;
    const email = usersById.get(profile.id)?.email ?? "";
    return (
      profile.full_name?.toLowerCase().includes(search) ||
      profile.phone?.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search)
    );
  });
  const totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const customers = matching.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <AdminHeader
        eyebrow="Relationships"
        title="Customers"
        description={`${matching.length} matching registered customers with account-linked order summaries.`}
      />
      <form className="mt-8 flex gap-3 border border-[#C0C0C0]/15 bg-[#111113] p-4">
        <input
          name="q"
          defaultValue={query.q}
          placeholder="Search name, email, or phone"
          className="account-input"
        />
        <button className="bg-[#C0C0C0] px-5 text-xs font-semibold uppercase tracking-wider text-black">
          Search
        </button>
      </form>

      <div className="mt-6 overflow-x-auto border border-[#C0C0C0]/15">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#171719] text-xs uppercase tracking-wider text-[#C0C0C0]">
            <tr>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Phone</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Orders</th>
              <th className="px-4 py-4 text-right">Delivered value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C0C0C0]/10">
            {customers.map((profile) => {
              const user = usersById.get(profile.id);
              const summary = orderSummary.get(profile.id) ?? {
                count: 0,
                delivered: 0,
              };
              return (
                <tr key={profile.id} className="bg-[#111113]">
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/customers/${profile.id}`}
                      className="font-medium underline decoration-[#C0C0C0]/40 underline-offset-4"
                    >
                      {profile.full_name || "Unnamed customer"}
                    </Link>
                    <p className="mt-1 text-xs text-[#D9D9D9]/50">
                      {user?.email ?? "No email"}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-[#D9D9D9]/70">
                    {profile.phone ?? "—"}
                  </td>
                  <td className="px-4 py-4 capitalize">{profile.role}</td>
                  <td className="px-4 py-4">{summary.count}</td>
                  <td className="px-4 py-4 text-right text-[#C0C0C0]">
                    {formatProductPrice(summary.delivered)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-[#D9D9D9]/55">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <CustomerPageLink
            page={page - 1}
            search={query.q}
            disabled={page <= 1}
            label="Previous"
          />
          <CustomerPageLink
            page={page + 1}
            search={query.q}
            disabled={page >= totalPages}
            label="Next"
          />
        </div>
      </div>
    </div>
  );
}

function CustomerPageLink({
  page,
  search,
  disabled,
  label,
}: {
  page: number;
  search?: string;
  disabled: boolean;
  label: string;
}) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  params.set("page", String(page));
  return (
    <Link
      href={disabled ? "#" : `/admin/customers?${params.toString()}`}
      aria-disabled={disabled}
      className={`border border-[#C0C0C0]/20 px-4 py-2 ${
        disabled ? "pointer-events-none opacity-35" : "hover:border-[#C0C0C0]"
      }`}
    >
      {label}
    </Link>
  );
}
