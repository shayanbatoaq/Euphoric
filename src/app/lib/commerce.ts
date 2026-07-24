import { z } from "zod";
import type { OrderStatus } from "../types/database";

export const DEFAULT_SHIPPING_FEE = 300;
export const MAX_CART_QUANTITY = 99;

export const pakistanPhoneSchema = z
  .string()
  .trim()
  .transform(normalizePakistanPhone)
  .pipe(
    z
      .string()
      .regex(/^\+92 3\d{2}-\d{7}$/, "Enter a valid Pakistani mobile number."),
  );

export const cartItemSchema = z.object({
  productId: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid product identifier."),
  quantity: z.number().int().min(1).max(MAX_CART_QUANTITY),
});

export const checkoutSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: pakistanPhoneSchema,
  email: z
    .string()
    .trim()
    .max(254)
    .email()
    .or(z.literal(""))
    .optional()
    .transform((value) => value || undefined),
  city: z.string().trim().min(2).max(100),
  address: z.string().trim().min(10).max(500),
  notes: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .transform((value) => value || undefined),
  items: z.array(cartItemSchema).min(1).max(50),
  idempotencyKey: z.string().uuid(),
  website: z.string().max(0).optional(),
});

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z
    .string()
    .trim()
    .max(254)
    .email()
    .or(z.literal(""))
    .optional()
    .transform((value) => value || undefined),
  phone: z
    .string()
    .trim()
    .max(32)
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      return normalizePakistanPhone(value);
    })
    .refine(
      (value) => !value || /^\+92 3\d{2}-\d{7}$/.test(value),
      "Enter a valid Pakistani mobile number.",
    ),
  subject: z
    .string()
    .trim()
    .max(160)
    .optional()
    .transform((value) => value || undefined),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional(),
});

export const productMutationSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(1).max(160),
  brand: z.string().trim().min(1).max(160),
  category: z.enum(["men", "women", "unisex"]),
  price: z.coerce.number().int().min(0).max(10_000_000),
  size_ml: z.coerce.number().int().min(1).max(10_000),
  short_description: z.string().trim().max(1000).optional().nullable(),
  long_description: z.string().trim().max(10_000).optional().nullable(),
  top_notes: z.array(z.string().trim().min(1).max(100)).max(30),
  heart_notes: z.array(z.string().trim().min(1).max(100)).max(30),
  base_notes: z.array(z.string().trim().min(1).max(100)).max(30),
  occasions: z.array(z.string().trim().min(1).max(160)).max(30),
  image_url: z.string().trim().max(2000).optional().nullable(),
  sku: z.string().trim().min(1).max(100).optional().nullable(),
  stock_quantity: z.coerce.number().int().min(0).optional().nullable(),
  track_inventory: z.boolean(),
  is_active: z.boolean(),
  is_featured: z.boolean(),
});

export const orderStatusSchema = z.object({
  orderId: z.string().uuid(),
  orderStatus: z.enum([
    "pending",
    "confirmed",
    "processing",
    "dispatched",
    "delivered",
    "cancelled",
    "returned",
  ]),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
  adminNote: z.string().trim().max(2000).optional().default(""),
  override: z.boolean().optional().default(false),
});

export const enquiryStatusSchema = z.enum([
  "new",
  "in_progress",
  "resolved",
  "spam",
]);

export const allowedOrderTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["dispatched", "cancelled"],
  dispatched: ["delivered", "returned"],
  delivered: [],
  cancelled: [],
  returned: [],
};

export function normalizePakistanPhone(input: string) {
  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("0092")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("92")) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (!/^3\d{9}$/.test(digits)) {
    return input.trim();
  }

  return `+92 ${digits.slice(0, 3)}-${digits.slice(3)}`;
}

export function calculateOrderTotals(
  lines: ReadonlyArray<{ unitPrice: number; quantity: number }>,
  shippingFee = DEFAULT_SHIPPING_FEE,
) {
  const subtotal = lines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );

  return {
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
  };
}

export function canTransitionOrder(
  current: OrderStatus,
  next: OrderStatus,
) {
  return current === next || allowedOrderTransitions[current].includes(next);
}

export function isValidEuphoricOrderNumber(value: string) {
  return /^EUP-\d{8}-[A-F0-9]{6}$/.test(value);
}
