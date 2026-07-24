import "server-only";

import {
  createHash,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { createSupabaseAdminClient } from "./supabase/admin";
import { getAuthContext } from "./auth";
import type {
  OrderItemRow,
  OrderStatusHistoryRow,
  OrderWithItems,
} from "../types/database";

export function createConfirmationToken() {
  return randomBytes(32).toString("base64url");
}

export function hashConfirmationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function tokenMatches(token: string, expectedHash: string) {
  const actual = Buffer.from(hashConfirmationToken(token), "hex");
  const expected = Buffer.from(expectedHash, "hex");

  return (
    actual.length === expected.length && timingSafeEqual(actual, expected)
  );
}

export async function getOrderWithItemsById(orderId: string) {
  const admin = createSupabaseAdminClient();
  const [{ data: order, error: orderError }, { data: items, error: itemsError }] =
    await Promise.all([
      admin.from("orders").select("*").eq("id", orderId).single(),
      admin
        .from("order_items")
        .select("*")
        .eq("order_id", orderId)
        .order("created_at"),
    ]);

  if (orderError || itemsError || !order) {
    return null;
  }

  return {
    ...order,
    order_items: (items ?? []) as OrderItemRow[],
  } satisfies OrderWithItems;
}

export async function getOrderForConfirmation(
  orderNumber: string,
  confirmationToken?: string,
) {
  const admin = createSupabaseAdminClient();
  const { data: order, error } = await admin
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .maybeSingle();

  if (error || !order) {
    return null;
  }

  const auth = await getAuthContext();
  const isOwner = Boolean(auth?.user.id && auth.user.id === order.user_id);
  const tokenIsValid = Boolean(
    confirmationToken &&
      order.confirmation_token_hash &&
      order.confirmation_token_expires_at &&
      new Date(order.confirmation_token_expires_at) > new Date() &&
      tokenMatches(confirmationToken, order.confirmation_token_hash),
  );

  if (!isOwner && !tokenIsValid && auth?.profile?.role !== "admin") {
    return null;
  }

  const [{ data: items }, { data: history }] = await Promise.all([
    admin
      .from("order_items")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at"),
    admin
      .from("order_status_history")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at"),
  ]);

  return {
    ...order,
    order_items: (items ?? []) as OrderItemRow[],
    order_status_history: (history ?? []) as OrderStatusHistoryRow[],
  } satisfies OrderWithItems;
}
