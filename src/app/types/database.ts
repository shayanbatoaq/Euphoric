export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type TableDefinition<Row, Insert, Update> = {
  Row: Row & Record<string, unknown>;
  Insert: Insert & Record<string, unknown>;
  Update: Update & Record<string, unknown>;
  Relationships: [];
};

export interface ProfileRow {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: "customer" | "admin";
  created_at: string;
  updated_at: string;
}

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "men" | "women" | "unisex";
  price: number;
  size_ml: number;
  short_description: string | null;
  long_description: string | null;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  occasions: string[];
  image_url: string | null;
  sku: string | null;
  stock_quantity: number | null;
  track_inventory: boolean;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddressRow {
  id: string;
  user_id: string;
  label: string | null;
  full_name: string;
  phone: string;
  city: string;
  address_line: string;
  notes: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export type PaymentMethod = "cod" | "payfast";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "dispatched"
  | "delivered"
  | "cancelled"
  | "returned";

export interface OrderRow {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  city: string;
  delivery_address: string;
  order_notes: string | null;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  subtotal: number;
  shipping_fee: number;
  total: number;
  currency: "PKR";
  admin_notes: string | null;
  idempotency_key: string;
  confirmation_token_hash: string | null;
  confirmation_token_expires_at: string | null;
  inventory_restocked_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItemRow {
  id: string;
  order_id: string;
  product_id: string | null;
  product_slug: string;
  product_name: string;
  product_brand: string;
  product_category: string;
  product_size_ml: number;
  product_image_url: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
  created_at: string;
}

export interface OrderStatusHistoryRow {
  id: string;
  order_id: string;
  previous_status: OrderStatus | null;
  new_status: OrderStatus;
  changed_by: string | null;
  note: string | null;
  created_at: string;
}

export interface ContactEnquiryRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
  status: "new" | "in_progress" | "resolved" | "spam";
  created_at: string;
  updated_at: string;
}

export interface StoreSettingsRow {
  id: boolean;
  store_name: string;
  support_email: string;
  support_phone: string;
  whatsapp_number: string;
  shipping_fee: number;
  currency: "PKR";
  cod_enabled: boolean;
  payfast_placeholder_enabled: boolean;
  low_stock_threshold: number;
  updated_at: string;
}

interface RateLimitRow {
  id: number;
  action: string;
  identity_hash: string;
  window_started_at: string;
  request_count: number;
  updated_at: string;
}

type NewProduct = Omit<ProductRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

type NewOrder = Omit<OrderRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: TableDefinition<
        ProfileRow,
        Omit<ProfileRow, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        },
        Partial<Omit<ProfileRow, "id" | "created_at">>
      >;
      products: TableDefinition<
        ProductRow,
        NewProduct,
        Partial<Omit<ProductRow, "id" | "created_at">>
      >;
      customer_addresses: TableDefinition<
        AddressRow,
        Omit<AddressRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        },
        Partial<Omit<AddressRow, "id" | "user_id" | "created_at">>
      >;
      orders: TableDefinition<
        OrderRow,
        NewOrder,
        Partial<Omit<OrderRow, "id" | "created_at">>
      >;
      order_items: TableDefinition<
        OrderItemRow,
        Omit<OrderItemRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        },
        Partial<Omit<OrderItemRow, "id" | "order_id" | "created_at">>
      >;
      order_status_history: TableDefinition<
        OrderStatusHistoryRow,
        Omit<OrderStatusHistoryRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        },
        Partial<
          Omit<OrderStatusHistoryRow, "id" | "order_id" | "created_at">
        >
      >;
      contact_enquiries: TableDefinition<
        ContactEnquiryRow,
        Omit<ContactEnquiryRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        },
        Partial<Omit<ContactEnquiryRow, "id" | "created_at">>
      >;
      store_settings: TableDefinition<
        StoreSettingsRow,
        Partial<StoreSettingsRow> & { id?: boolean },
        Partial<Omit<StoreSettingsRow, "id">>
      >;
      request_rate_limits: TableDefinition<
        RateLimitRow,
        Omit<RateLimitRow, "id" | "updated_at"> & {
          id?: number;
          updated_at?: string;
        },
        Partial<Omit<RateLimitRow, "id">>
      >;
    };
    Views: Record<string, never>;
    Functions: {
      create_cod_order: {
        Args: {
          p_customer_name: string;
          p_customer_phone: string;
          p_customer_email: string;
          p_city: string;
          p_delivery_address: string;
          p_order_notes: string;
          p_items: Json;
          p_user_id: string | null;
          p_idempotency_key: string;
          p_confirmation_token_hash: string;
        };
        Returns: {
          order_id: string;
          order_number: string;
          subtotal: number;
          shipping_fee: number;
          total: number;
          currency: string;
          order_status: string;
          payment_status: string;
          created_at: string;
        }[];
      };
      admin_update_order: {
        Args: {
          p_order_id: string;
          p_new_status: string;
          p_payment_status: string;
          p_admin_note: string;
          p_override?: boolean;
        };
        Returns: OrderRow;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      check_rate_limit: {
        Args: {
          p_action: string;
          p_identity_hash: string;
          p_limit: number;
          p_window_seconds: number;
        };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type OrderWithItems = OrderRow & {
  order_items: OrderItemRow[];
  order_status_history?: OrderStatusHistoryRow[];
};
