"use client";

import {
  type FormEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Banknote,
  Check,
  LoaderCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { DEFAULT_SHIPPING_FEE } from "../lib/commerce";
import {
  type CheckoutDetails,
  useStorefront,
} from "../context/StorefrontContext";
import {
  formatProductPrice,
  type Product,
} from "../data/products";

interface CheckoutResponse {
  orderNumber?: string;
  confirmationToken?: string;
  error?: string;
  fields?: Record<string, string>;
}

const initialDetails: CheckoutDetails = {
  name: "",
  phone: "+92 ",
  email: "",
  city: "",
  address: "",
  notes: "",
};

function formatPakistanPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("0092")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("92")) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (!digits) return "+92 ";
  if (digits.length <= 3) return `+92 ${digits}`;
  return `+92 ${digits.slice(0, 3)}-${digits.slice(3)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartLines,
    cartQuantity,
    cartReady,
    cartSubtotal,
    getProduct,
    clearCart,
  } = useStorefront();
  const [details, setDetails] = useState<CheckoutDetails>(initialDetails);
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const idempotencyKey = useRef<string | null>(null);

  const items = cartLines.flatMap((line) => {
    const product = getProduct(line.productId);
    return product ? [{ ...line, product }] : [];
  });
  const displayTotal = cartSubtotal + DEFAULT_SHIPPING_FEE;

  function updateField(field: keyof CheckoutDetails, value: string) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setDetails((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setFormError("");
    setFieldErrors({});
    idempotencyKey.current ??= window.crypto.randomUUID();

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          items: cartLines,
          idempotencyKey: idempotencyKey.current,
          website: "",
        }),
      });
      const result = (await response.json()) as CheckoutResponse;

      if (
        !response.ok ||
        !result.orderNumber ||
        !result.confirmationToken
      ) {
        setFormError(
          result.error ??
            "We could not place your order. Check your details and try again.",
        );
        setFieldErrors(result.fields ?? {});
        return;
      }

      clearCart();
      router.push(
        `/order-confirmation/${encodeURIComponent(result.orderNumber)}?token=${encodeURIComponent(result.confirmationToken)}`,
      );
    } catch {
      setFormError(
        "The checkout service could not be reached. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!cartReady) {
    return <CheckoutSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyCheckout />;
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-5 pb-24 pt-44 text-[#F5F5F5] sm:px-8 sm:pt-48 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/cart"
          className="mb-9 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#D9D9D9]/70 transition hover:text-[#F5F5F5]"
        >
          <ArrowLeft className="size-4" />
          Back to bag
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-[#C0C0C0]/10 pb-10"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#C0C0C0]">
            Secure checkout
          </p>
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-playfair text-5xl leading-none sm:text-6xl">
                Complete your order
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#D9D9D9]/65">
                Enter your delivery details and pay when your order arrives.
                Shipping is a flat {formatProductPrice(DEFAULT_SHIPPING_FEE)}.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#D9D9D9]/45">
              <span className="text-[#F5F5F5]">Bag</span>
              <span className="h-px w-7 bg-[#C0C0C0]/20" />
              <span className="text-[#C0C0C0]">Details</span>
              <span className="h-px w-7 bg-[#C0C0C0]/20" />
              <span>Confirm</span>
            </div>
          </div>
        </motion.header>

        <div className="grid gap-8 pt-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            onSubmit={handleSubmit}
            className="space-y-8"
            noValidate
          >
            {formError && (
              <div
                role="alert"
                aria-live="assertive"
                className="border border-red-300/25 bg-red-300/5 p-5 text-sm leading-6 text-red-100"
              >
                <p className="font-medium">Your order was not submitted.</p>
                <p className="mt-1 text-red-100/80">{formError}</p>
              </div>
            )}

            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <CheckoutSection
              number="01"
              title="Contact details"
              description="We’ll use these details for your order and delivery."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  name="name"
                  value={details.name}
                  onChange={(value) => updateField("name", value)}
                  autoComplete="name"
                  error={fieldErrors.name}
                  required
                />
                <Field
                  label="Phone number"
                  name="phone"
                  value={details.phone}
                  onChange={(value) =>
                    updateField("phone", formatPakistanPhone(value))
                  }
                  autoComplete="tel"
                  inputMode="tel"
                  error={fieldErrors.phone}
                  required
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Email address (optional)"
                    name="email"
                    type="email"
                    value={details.email ?? ""}
                    onChange={(value) => updateField("email", value)}
                    autoComplete="email"
                    error={fieldErrors.email}
                  />
                </div>
              </div>
            </CheckoutSection>

            <CheckoutSection
              number="02"
              title="Delivery address"
              description="Tell us where you’d like your fragrances delivered."
            >
              <div className="grid gap-5">
                <Field
                  label="City"
                  name="city"
                  value={details.city}
                  onChange={(value) => updateField("city", value)}
                  autoComplete="address-level2"
                  error={fieldErrors.city}
                  required
                />
                <TextAreaField
                  label="Complete address"
                  name="address"
                  value={details.address}
                  onChange={(value) => updateField("address", value)}
                  autoComplete="street-address"
                  rows={4}
                  placeholder="House, street, area, and nearby landmark"
                  error={fieldErrors.address}
                  required
                />
                <TextAreaField
                  label="Order notes (optional)"
                  name="notes"
                  value={details.notes ?? ""}
                  onChange={(value) => updateField("notes", value)}
                  rows={3}
                  placeholder="Delivery timing, gift note, or other requests"
                  error={fieldErrors.notes}
                />
              </div>
            </CheckoutSection>

            <CheckoutSection
              number="03"
              title="Payment"
              description="Cash on delivery is currently available."
            >
              <div className="flex min-h-32 items-start gap-4 border border-[#C0C0C0] bg-[#C0C0C0]/10 p-5">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-[#C0C0C0] text-[#F5F5F5]">
                  <Banknote className="size-5" />
                </span>
                <span>
                  <span className="block font-playfair text-lg text-[#F5F5F5]">
                    Cash on Delivery
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-[#D9D9D9]/60">
                    Pay {formatProductPrice(displayTotal)} when your order is
                    delivered.
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-[#C0C0C0] bg-[#C0C0C0]"
                >
                  <Check className="size-3 text-[#0A0A0A]" />
                </span>
              </div>

              <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#D9D9D9]/70">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  required
                  className="mt-1 size-4 accent-[#C0C0C0]"
                />
                <span>
                  I confirm that my contact and delivery information is correct.
                </span>
              </label>

              <button
                type="submit"
                disabled={!accepted || submitting}
                className="mt-7 flex w-full items-center justify-center gap-3 bg-[#C0C0C0] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A0A0A] transition hover:bg-[#D9D9D9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Banknote className="size-4" />
                )}
                {submitting
                  ? "Placing order…"
                  : `Place COD order · ${formatProductPrice(displayTotal)}`}
              </button>
            </CheckoutSection>
          </motion.form>

          <OrderSummary
            items={items}
            cartQuantity={cartQuantity}
            cartSubtotal={cartSubtotal}
          />
        </div>
      </div>
    </main>
  );
}

function CheckoutSkeleton() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] px-5 pb-24 pt-44 text-[#F5F5F5] sm:px-8 sm:pt-48 lg:px-12">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-12 h-5 w-36 bg-[#C0C0C0]/10" />
        <div className="mb-4 h-12 w-72 bg-[#C0C0C0]/10" />
        <div className="grid gap-8 pt-8 lg:grid-cols-[1fr_420px]">
          <div className="h-[620px] bg-[#C0C0C0]/5" />
          <div className="h-[460px] bg-[#C0C0C0]/5" />
        </div>
      </div>
    </main>
  );
}

function EmptyCheckout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-5 pb-24 pt-44 text-[#F5F5F5] sm:px-8 sm:pt-48">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-2xl px-6 py-16 text-center sm:px-12"
      >
        <ShoppingBag className="mx-auto mb-7 size-10 text-[#C0C0C0]" />
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C0C0C0]">
          Checkout
        </p>
        <h1 className="font-playfair text-4xl sm:text-5xl">
          Your bag is empty
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#D9D9D9]/70">
          Add a fragrance to your bag before continuing to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-9 inline-flex items-center gap-3 bg-[#C0C0C0] px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A0A0A] transition hover:bg-[#D9D9D9]"
        >
          Explore fragrances
        </Link>
      </motion.section>
    </main>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  inputMode?: "tel" | "email" | "text" | "numeric";
  autoComplete?: string;
  error?: string;
  required?: boolean;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
  error,
  required,
}: FieldProps) {
  const errorId = `${name}-error`;

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-[#D9D9D9]/65">
        {label}
      </span>
      <input
        name={name}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full border bg-[#0A0A0A] px-4 py-3.5 text-sm text-[#F5F5F5] outline-none transition placeholder:text-[#D9D9D9]/30 ${
          error
            ? "border-red-300/60 focus:border-red-200"
            : "border-[#C0C0C0]/20 focus:border-[#C0C0C0]"
        }`}
      />
      {error && (
        <span id={errorId} className="mt-2 block text-xs text-red-200">
          {error}
        </span>
      )}
    </label>
  );
}

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  rows,
  autoComplete,
  placeholder,
  error,
  required,
}: TextAreaFieldProps) {
  const errorId = `${name}-error`;

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-[#D9D9D9]/65">
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required={required}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full resize-none border bg-[#0A0A0A] px-4 py-3.5 text-sm text-[#F5F5F5] outline-none transition placeholder:text-[#D9D9D9]/30 ${
          error
            ? "border-red-300/60 focus:border-red-200"
            : "border-[#C0C0C0]/20 focus:border-[#C0C0C0]"
        }`}
        placeholder={placeholder}
      />
      {error && (
        <span id={errorId} className="mt-2 block text-xs text-red-200">
          {error}
        </span>
      )}
    </label>
  );
}

function CheckoutSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-[#C0C0C0]/10 bg-[#111113] p-5 sm:p-8">
      <div className="mb-7 flex items-start gap-4 border-b border-[#C0C0C0]/10 pb-6">
        <span className="flex size-8 shrink-0 items-center justify-center border border-[#C0C0C0]/40 text-xs text-[#C0C0C0]">
          {number}
        </span>
        <div>
          <h2 className="font-playfair text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-[#D9D9D9]/45">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function OrderSummary({
  items,
  cartQuantity,
  cartSubtotal,
}: {
  items: Array<{
    productId: string;
    quantity: number;
    product: Product;
  }>;
  cartQuantity: number;
  cartSubtotal: number;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="h-fit border border-[#C0C0C0]/10 bg-[#111113] lg:sticky lg:top-36"
    >
      <div className="flex items-center justify-between border-b border-[#C0C0C0]/10 px-5 py-5 sm:px-7">
        <div>
          <p className="font-playfair text-2xl">Order summary</p>
          <p className="mt-1 text-xs text-[#D9D9D9]/45">
            {cartQuantity} {cartQuantity === 1 ? "item" : "items"}
          </p>
        </div>
        <Link
          href="/cart"
          className="text-[10px] uppercase tracking-[0.16em] text-[#C0C0C0] transition hover:text-[#F5F5F5]"
        >
          Edit bag
        </Link>
      </div>

      <div className="max-h-[370px] space-y-5 overflow-y-auto px-5 py-6 sm:px-7">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex gap-4">
            <div className="h-24 w-20 shrink-0 overflow-hidden bg-black">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-playfair text-lg">{product.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#D9D9D9]/40">
                {product.sizeMl} ml · Qty {quantity}
              </p>
              <p className="mt-3 text-sm text-[#D9D9D9]/75">
                {formatProductPrice(product.price * quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#C0C0C0]/10 px-5 py-6 sm:px-7">
        <div className="flex justify-between text-sm text-[#D9D9D9]/60">
          <span>Subtotal</span>
          <span className="text-[#F5F5F5]">
            {formatProductPrice(cartSubtotal)}
          </span>
        </div>
        <div className="mt-3 flex justify-between text-sm text-[#D9D9D9]/60">
          <span>Shipping</span>
          <span className="text-[#F5F5F5]">
            {formatProductPrice(DEFAULT_SHIPPING_FEE)}
          </span>
        </div>
        <div className="mt-6 flex items-end justify-between border-t border-[#C0C0C0]/10 pt-6">
          <span className="font-playfair text-xl">Total</span>
          <span className="font-playfair text-2xl">
            {formatProductPrice(cartSubtotal + DEFAULT_SHIPPING_FEE)}
          </span>
        </div>
      </div>

      <div className="grid gap-4 border-t border-[#C0C0C0]/10 px-5 py-6 text-xs text-[#D9D9D9]/50 sm:px-7">
        <TrustItem
          icon={<PackageCheck className="size-4" />}
          text="Prices and availability are verified when you order"
        />
        <TrustItem
          icon={<Truck className="size-4" />}
          text="Flat-rate shipping across your order"
        />
        <TrustItem
          icon={<ShieldCheck className="size-4" />}
          text="No card information is collected"
        />
      </div>
    </motion.aside>
  );
}

function TrustItem({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#C0C0C0]">{icon}</span>
      <span>{text}</span>
      <Check className="ml-auto size-3.5 text-[#C0C0C0]/40" />
    </div>
  );
}
