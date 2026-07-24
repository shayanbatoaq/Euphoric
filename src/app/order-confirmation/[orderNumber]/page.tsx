import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Banknote,
  Check,
  MapPin,
  PackageCheck,
  Phone,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { formatProductPrice } from "../../data/products";
import { getOrderForConfirmation } from "../../lib/orders";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { orderNumber } = await params;

  return {
    title: `Order ${orderNumber} | Euphoric`,
    description: "Your Euphoric cash-on-delivery order confirmation.",
    robots: { index: false, follow: false },
  };
}

export default async function OrderConfirmationPage({
  params,
  searchParams,
}: PageProps) {
  const [{ orderNumber }, { token }] = await Promise.all([
    params,
    searchParams,
  ]);
  const order = await getOrderForConfirmation(orderNumber, token);

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-5 pb-24 pt-44 text-[#F5F5F5] sm:px-8 sm:pt-48 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <section className="glass px-6 py-10 text-center sm:px-10 sm:py-14">
          <div className="mx-auto mb-7 flex size-16 items-center justify-center rounded-full border border-[#C0C0C0]/25 bg-[#C0C0C0]/5">
            <Check className="size-7 text-[#C0C0C0]" />
          </div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C0C0C0]">
            Order received
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl">
            Thank you, {order.customer_name}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#D9D9D9]/70">
            Your cash-on-delivery order has been saved securely. Keep the
            reference below for future updates.
          </p>
          <div className="mx-auto mt-7 max-w-md border border-[#C0C0C0]/15 bg-[#1C1C1E] p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#D9D9D9]/50">
              Order reference
            </p>
            <p className="mt-2 font-playfair text-2xl text-[#F5F5F5]">
              {order.order_number}
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="border border-[#C0C0C0]/10 bg-[#111113]">
            <div className="border-b border-[#C0C0C0]/10 px-6 py-5">
              <h2 className="font-playfair text-2xl">Your fragrances</h2>
            </div>
            <div className="divide-y divide-[#C0C0C0]/10">
              {order.order_items.map((item) => (
                <article key={item.id} className="flex gap-4 p-6">
                  <div className="h-24 w-20 shrink-0 overflow-hidden bg-black">
                    <ImageWithFallback
                      src={item.product_image_url ?? "/product-placeholder.svg"}
                      alt={item.product_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-playfair text-lg">
                      {item.product_name}{" "}
                      <span className="text-[#C0C0C0]">
                        by {item.product_brand}
                      </span>
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-[#D9D9D9]/50">
                      {item.product_size_ml} ml · Qty {item.quantity}
                    </p>
                    <p className="mt-4 text-sm text-[#F5F5F5]">
                      {formatProductPrice(item.line_total)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="border border-[#C0C0C0]/10 bg-[#111113] p-6">
              <h2 className="font-playfair text-2xl">Order total</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-[#D9D9D9]/65">
                  <dt>Subtotal</dt>
                  <dd className="text-[#F5F5F5]">
                    {formatProductPrice(order.subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between text-[#D9D9D9]/65">
                  <dt>Shipping</dt>
                  <dd className="text-[#F5F5F5]">
                    {formatProductPrice(order.shipping_fee)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-[#C0C0C0]/10 pt-4 font-playfair text-xl">
                  <dt>Total</dt>
                  <dd>{formatProductPrice(order.total)}</dd>
                </div>
              </dl>
            </section>

            <section className="border border-[#C0C0C0]/10 bg-[#111113] p-6">
              <h2 className="font-playfair text-2xl">Delivery details</h2>
              <div className="mt-6 space-y-4 text-sm leading-6 text-[#D9D9D9]/70">
                <p className="flex gap-3">
                  <Phone className="mt-1 size-4 shrink-0 text-[#C0C0C0]" />
                  <span>{order.customer_phone}</span>
                </p>
                <p className="flex gap-3">
                  <MapPin className="mt-1 size-4 shrink-0 text-[#C0C0C0]" />
                  <span>
                    {order.delivery_address}, {order.city}
                  </span>
                </p>
                <p className="flex gap-3">
                  <Banknote className="mt-1 size-4 shrink-0 text-[#C0C0C0]" />
                  <span>Pay in cash when your order is delivered.</span>
                </p>
                <p className="flex gap-3">
                  <PackageCheck className="mt-1 size-4 shrink-0 text-[#C0C0C0]" />
                  <span>
                    Current status:{" "}
                    <span className="capitalize text-[#F5F5F5]">
                      {order.order_status}
                    </span>
                  </span>
                </p>
              </div>
            </section>
          </aside>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className="bg-[#C0C0C0] px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A0A0A] transition hover:bg-[#D9D9D9]"
          >
            Continue shopping
          </Link>
          <Link
            href="/account/orders"
            className="border border-[#C0C0C0] px-7 py-3 text-xs uppercase tracking-[0.18em] text-[#C0C0C0] transition hover:bg-[#C0C0C0] hover:text-[#0A0A0A]"
          >
            View your orders
          </Link>
        </div>
      </div>
    </main>
  );
}
