"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { formatProductPrice } from "../data/products";
import { useStorefront } from "../context/StorefrontContext";

const SHIPPING_FEE = 300;

export function CartPage() {
  const {
    cartLines,
    cartQuantity,
    cartReady,
    cartSubtotal,
    getProduct,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useStorefront();

  const cartItems = cartLines.flatMap((line) => {
    const product = getProduct(line.productId);
    return product ? [{ ...line, product }] : [];
  });

  return (
    <main className="min-h-screen bg-[#0A0A0A] pb-20 pt-32">
      <section className="gradient-black-silver mb-14 border-y border-[#C0C0C0]/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C0C0C0]">
            Your selection
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-playfair text-5xl text-[#F5F5F5] sm:text-6xl">
                Shopping Bag
              </h1>
              <p
                aria-live="polite"
                className="mt-3 text-[#D9D9D9]"
              >
                {cartReady
                  ? `${cartQuantity} ${cartQuantity === 1 ? "fragrance" : "fragrances"} selected`
                  : "Preparing your selection..."}
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C0C0C0] transition-colors hover:text-white"
            >
              Continue shopping
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!cartReady ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="h-72 animate-pulse border border-[#C0C0C0]/10 bg-[#1C1C1E]/60" />
            <div className="h-80 animate-pulse border border-[#C0C0C0]/10 bg-[#1C1C1E]/60" />
          </div>
        ) : cartItems.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mx-auto max-w-2xl px-6 py-16 text-center sm:px-12"
          >
            <div className="mx-auto mb-7 flex size-16 items-center justify-center rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5">
              <ShoppingBag className="size-7 text-[#C0C0C0]" aria-hidden="true" />
            </div>
            <h2 className="font-playfair text-3xl text-[#F5F5F5] sm:text-4xl">
              Your bag is waiting
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-[#D9D9D9]">
              Discover a fragrance for your everyday ritual, then return here
              to review your selection.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-3 bg-[#C0C0C0] px-7 py-3 text-sm uppercase tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#D9D9D9]"
            >
              Explore fragrances
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.section>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <section aria-labelledby="bag-items-title">
              <div className="mb-5 flex items-center justify-between border-b border-[#C0C0C0]/10 pb-5">
                <h2
                  id="bag-items-title"
                  className="font-playfair text-2xl text-[#F5F5F5]"
                >
                  Your fragrances
                </h2>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs uppercase tracking-widest text-[#D9D9D9] underline decoration-[#C0C0C0]/40 underline-offset-4 transition-colors hover:text-white"
                >
                  Clear bag
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map(({ product, quantity }, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="grid gap-5 border border-[#C0C0C0]/10 bg-[#141416] p-4 sm:grid-cols-[128px_minmax(0,1fr)] sm:p-5"
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="aspect-[3/4] overflow-hidden bg-black"
                      aria-label={`View ${product.displayName}`}
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.displayName}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#C0C0C0]">
                            {product.category} · {product.sizeMl} ml
                          </p>
                          <Link
                            href={`/product/${product.id}`}
                            className="font-playfair text-2xl text-[#F5F5F5] transition-colors hover:text-[#C0C0C0]"
                          >
                            {product.displayName}
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`Remove ${product.displayName} from bag`}
                          className="shrink-0 p-2 text-[#D9D9D9] transition-colors hover:text-white"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#D9D9D9]/80">
                        {product.shortDescription}
                      </p>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                        <div>
                          <p className="mb-2 text-[10px] uppercase tracking-widest text-[#D9D9D9]/70">
                            Quantity
                          </p>
                          <div className="inline-flex items-center border border-[#C0C0C0]/20">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(product.id, quantity - 1)
                              }
                              aria-label={`Decrease ${product.displayName} quantity`}
                              className="p-2.5 text-[#C0C0C0] transition-colors hover:bg-white/5 hover:text-white"
                            >
                              <Minus className="size-3.5" aria-hidden="true" />
                            </button>
                            <span className="min-w-10 text-center text-sm text-[#F5F5F5]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(product.id, quantity + 1)
                              }
                              aria-label={`Increase ${product.displayName} quantity`}
                              className="p-2.5 text-[#C0C0C0] transition-colors hover:bg-white/5 hover:text-white"
                            >
                              <Plus className="size-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-[#D9D9D9]/70">
                            {formatProductPrice(product.price)} each
                          </p>
                          <p className="mt-1 font-playfair text-2xl text-[#C0C0C0]">
                            {formatProductPrice(product.price * quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <aside className="glass p-6 lg:sticky lg:top-36" aria-labelledby="order-summary-title">
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#C0C0C0]">
                Order overview
              </p>
              <h2
                id="order-summary-title"
                className="font-playfair text-3xl text-[#F5F5F5]"
              >
                Summary
              </h2>

              <dl className="mt-7 space-y-4 border-y border-[#C0C0C0]/10 py-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#D9D9D9]">
                    Subtotal ({cartQuantity} {cartQuantity === 1 ? "item" : "items"})
                  </dt>
                  <dd className="text-[#F5F5F5]">
                    {formatProductPrice(cartSubtotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#D9D9D9]">Shipping</dt>
                  <dd className="text-right text-[#F5F5F5]">
                    {formatProductPrice(SHIPPING_FEE)}
                  </dd>
                </div>
              </dl>

              <div className="flex items-end justify-between gap-4 py-6">
                <span className="text-sm uppercase tracking-widest text-[#D9D9D9]">
                  Total
                </span>
                <span className="font-playfair text-3xl text-[#F5F5F5]">
                  {formatProductPrice(cartSubtotal + SHIPPING_FEE)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-3 bg-[#C0C0C0] px-6 py-3.5 text-sm uppercase tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#D9D9D9]"
              >
                Continue to checkout
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <div className="mt-7 space-y-4 border-t border-[#C0C0C0]/10 pt-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Protected details",
                    text: "Your information is only used to prepare this order.",
                  },
                  {
                    icon: Truck,
                    title: "Flat-rate delivery",
                    text: `${formatProductPrice(SHIPPING_FEE)} shipping is included in the total.`,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <item.icon
                      className="mt-0.5 size-5 shrink-0 text-[#C0C0C0]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm text-[#F5F5F5]">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#D9D9D9]/70">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
