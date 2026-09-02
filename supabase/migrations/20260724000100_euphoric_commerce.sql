-- Euphoric commerce schema
-- Apply with `supabase db push` or through the Supabase SQL editor.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer'
    check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null,
  category text not null
    check (category in ('men', 'women', 'unisex')),
  price integer not null check (price >= 0),
  size_ml integer not null default 50 check (size_ml > 0),
  short_description text,
  long_description text,
  top_notes text[] not null default '{}',
  heart_notes text[] not null default '{}',
  base_notes text[] not null default '{}',
  occasions text[] not null default '{}',
  image_url text,
  sku text unique,
  stock_quantity integer check (
    stock_quantity is null or stock_quantity >= 0
  ),
  track_inventory boolean not null default false,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (not track_inventory or stock_quantity is not null)
);

create table if not exists public.customer_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  full_name text not null,
  phone text not null,
  city text not null,
  address_line text not null,
  notes text,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  city text not null,
  delivery_address text not null,
  order_notes text,
  payment_method text not null default 'cod'
    check (payment_method in ('cod', 'payfast')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  order_status text not null default 'pending'
    check (
      order_status in (
        'pending',
        'confirmed',
        'processing',
        'dispatched',
        'delivered',
        'cancelled',
        'returned'
      )
    ),
  subtotal integer not null check (subtotal >= 0),
  shipping_fee integer not null check (shipping_fee >= 0),
  total integer not null check (total = subtotal + shipping_fee),
  currency text not null default 'PKR' check (currency = 'PKR'),
  admin_notes text,
  idempotency_key uuid unique not null,
  confirmation_token_hash text unique,
  confirmation_token_expires_at timestamptz,
  inventory_restocked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_slug text not null,
  product_name text not null,
  product_brand text not null,
  product_category text not null,
  product_size_ml integer not null check (product_size_ml > 0),
  product_image_url text,
  unit_price integer not null check (unit_price >= 0),
  quantity integer not null check (quantity between 1 and 99),
  line_total integer not null check (line_total = unit_price * quantity),
  created_at timestamptz not null default now()
);

create table if not exists public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  previous_status text check (
    previous_status is null or previous_status in (
      'pending',
      'confirmed',
      'processing',
      'dispatched',
      'delivered',
      'cancelled',
      'returned'
    )
  ),
  new_status text not null check (
    new_status in (
      'pending',
      'confirmed',
      'processing',
      'dispatched',
      'delivered',
      'cancelled',
      'returned'
    )
  ),
  changed_by uuid references auth.users(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'in_progress', 'resolved', 'spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.store_settings (
  id boolean primary key default true check (id),
  store_name text not null default 'Euphoric',
  support_email text not null default 'info@euphoric.com',
  support_phone text not null default '+92 370-2143838',
  whatsapp_number text not null default '923702143838',
  shipping_fee integer not null default 300 check (shipping_fee >= 0),
  currency text not null default 'PKR' check (currency = 'PKR'),
  cod_enabled boolean not null default true,
  payfast_placeholder_enabled boolean not null default false,
  low_stock_threshold integer not null default 5
    check (low_stock_threshold >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.request_rate_limits (
  id bigint generated always as identity primary key,
  action text not null,
  identity_hash text not null,
  window_started_at timestamptz not null,
  request_count integer not null default 1 check (request_count > 0),
  updated_at timestamptz not null default now(),
  unique (action, identity_hash, window_started_at)
);

insert into public.store_settings (id)
values (true)
on conflict (id) do nothing;

create index if not exists products_active_category_idx
  on public.products (is_active, category);
create index if not exists products_featured_idx
  on public.products (is_featured)
  where is_active;
create index if not exists products_name_brand_idx
  on public.products (lower(name), lower(brand));
create index if not exists products_stock_idx
  on public.products (stock_quantity)
  where track_inventory and is_active;
create index if not exists addresses_user_idx
  on public.customer_addresses (user_id, is_default desc);
create unique index if not exists one_default_address_per_user_idx
  on public.customer_addresses (user_id)
  where is_default;
create index if not exists orders_user_created_idx
  on public.orders (user_id, created_at desc);
create index if not exists orders_status_created_idx
  on public.orders (order_status, created_at desc);
create index if not exists orders_customer_search_idx
  on public.orders (lower(customer_name), customer_phone, lower(customer_email));
create index if not exists order_items_order_idx
  on public.order_items (order_id);
create index if not exists order_status_history_order_idx
  on public.order_status_history (order_id, created_at);
create index if not exists enquiries_status_created_idx
  on public.contact_enquiries (status, created_at desc);
create index if not exists rate_limits_lookup_idx
  on public.request_rate_limits (action, identity_hash, window_started_at);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists addresses_set_updated_at on public.customer_addresses;
create trigger addresses_set_updated_at
before update on public.customer_addresses
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists enquiries_set_updated_at on public.contact_enquiries;
create trigger enquiries_set_updated_at
before update on public.contact_enquiries
for each row execute function public.set_updated_at();

drop trigger if exists store_settings_set_updated_at on public.store_settings;
create trigger store_settings_set_updated_at
before update on public.store_settings
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    nullif(
      coalesce(
        new.raw_user_meta_data ->> 'full_name',
        new.raw_user_meta_data ->> 'name'
      ),
      ''
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.customer_addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_status_history enable row level security;
alter table public.contact_enquiries enable row level security;
alter table public.store_settings enable row level security;
alter table public.request_rate_limits enable row level security;

drop policy if exists "profiles_read_own_or_admin" on public.profiles;
create policy "profiles_read_own_or_admin"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id or public.is_admin())
with check ((select auth.uid()) = id or public.is_admin());

drop policy if exists "products_public_read_active" on public.products;
create policy "products_public_read_active"
on public.products for select
to anon, authenticated
using (is_active or public.is_admin());

drop policy if exists "products_admin_manage" on public.products;
create policy "products_admin_manage"
on public.products for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "addresses_manage_own" on public.customer_addresses;
create policy "addresses_manage_own"
on public.customer_addresses for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "addresses_admin_read" on public.customer_addresses;
create policy "addresses_admin_read"
on public.customer_addresses for select
to authenticated
using (public.is_admin());

drop policy if exists "orders_read_own_or_admin" on public.orders;
create policy "orders_read_own_or_admin"
on public.orders for select
to authenticated
using ((select auth.uid()) = user_id or public.is_admin());

drop policy if exists "orders_admin_manage" on public.orders;
create policy "orders_admin_manage"
on public.orders for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "order_items_read_own_or_admin" on public.order_items;
create policy "order_items_read_own_or_admin"
on public.order_items for select
to authenticated
using (
  exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and (
        orders.user_id = (select auth.uid())
        or public.is_admin()
      )
  )
);

drop policy if exists "order_items_admin_manage" on public.order_items;
create policy "order_items_admin_manage"
on public.order_items for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "status_history_read_own_or_admin"
  on public.order_status_history;
create policy "status_history_read_own_or_admin"
on public.order_status_history for select
to authenticated
using (
  exists (
    select 1
    from public.orders
    where orders.id = order_status_history.order_id
      and (
        orders.user_id = (select auth.uid())
        or public.is_admin()
      )
  )
);

drop policy if exists "status_history_admin_manage"
  on public.order_status_history;
create policy "status_history_admin_manage"
on public.order_status_history for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "enquiries_admin_manage" on public.contact_enquiries;
create policy "enquiries_admin_manage"
on public.contact_enquiries for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "settings_public_read" on public.store_settings;
create policy "settings_public_read"
on public.store_settings for select
to anon, authenticated
using (true);

drop policy if exists "settings_admin_manage" on public.store_settings;
create policy "settings_admin_manage"
on public.store_settings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

revoke insert, delete on public.profiles from authenticated;
revoke update on public.profiles from authenticated;
grant update (full_name, phone) on public.profiles to authenticated;
revoke insert, update, delete on public.orders from anon, authenticated;
revoke insert, update, delete on public.order_items from anon, authenticated;
revoke insert, update, delete on public.order_status_history
  from anon, authenticated;
revoke insert, update, delete on public.contact_enquiries
  from anon, authenticated;
revoke all on public.request_rate_limits from anon, authenticated;

create or replace function public.generate_euphoric_order_number()
returns text
language plpgsql
volatile
security definer
set search_path = public, extensions, pg_temp
as $$
declare
  candidate text;
begin
  loop
    candidate :=
      'EUP-' ||
      to_char(now() at time zone 'Asia/Karachi', 'YYYYMMDD') ||
      '-' ||
      upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 6));

    exit when not exists (
      select 1 from public.orders where order_number = candidate
    );
  end loop;

  return candidate;
end;
$$;

revoke all on function public.generate_euphoric_order_number() from public;

create or replace function public.create_cod_order(
  p_customer_name text,
  p_customer_phone text,
  p_customer_email text,
  p_city text,
  p_delivery_address text,
  p_order_notes text,
  p_items jsonb,
  p_user_id uuid,
  p_idempotency_key uuid,
  p_confirmation_token_hash text
)
returns table (
  order_id uuid,
  order_number text,
  subtotal integer,
  shipping_fee integer,
  total integer,
  currency text,
  order_status text,
  payment_status text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
declare
  cart_line record;
  product_row public.products%rowtype;
  created_order public.orders%rowtype;
  calculated_subtotal integer := 0;
  configured_shipping integer;
  cod_is_enabled boolean;
begin
  select o.*
  into created_order
  from public.orders o
  where o.idempotency_key = p_idempotency_key;

  if found then
    return query
    select
      created_order.id,
      created_order.order_number,
      created_order.subtotal,
      created_order.shipping_fee,
      created_order.total,
      created_order.currency,
      created_order.order_status,
      created_order.payment_status,
      created_order.created_at;
    return;
  end if;

  if jsonb_typeof(p_items) is distinct from 'array'
    or jsonb_array_length(p_items) = 0 then
    raise exception 'Cart must contain at least one item'
      using errcode = '22023';
  end if;

  select s.shipping_fee, s.cod_enabled
  into configured_shipping, cod_is_enabled
  from public.store_settings s
  where s.id = true;

  if configured_shipping is null or not coalesce(cod_is_enabled, false) then
    raise exception 'Cash on delivery is unavailable'
      using errcode = 'P0001';
  end if;

  for cart_line in
    select
      item ->> 'slug' as slug,
      sum((item ->> 'quantity')::integer)::integer as quantity
    from jsonb_array_elements(p_items) as item
    where item ? 'slug' and item ? 'quantity'
    group by item ->> 'slug'
    order by item ->> 'slug'
  loop
    if cart_line.slug is null
      or cart_line.quantity not between 1 and 99 then
      raise exception 'Invalid cart quantity'
        using errcode = '22023';
    end if;

    select p.*
    into product_row
    from public.products p
    where p.slug = cart_line.slug
    for update;

    if not found or not product_row.is_active then
      raise exception 'Product % is unavailable', cart_line.slug
        using errcode = 'P0001';
    end if;

    if product_row.track_inventory
      and coalesce(product_row.stock_quantity, 0) < cart_line.quantity then
      raise exception 'Insufficient stock for %', product_row.slug
        using errcode = 'P0001';
    end if;

    calculated_subtotal :=
      calculated_subtotal + (product_row.price * cart_line.quantity);
  end loop;

  if calculated_subtotal <= 0 then
    raise exception 'Cart does not contain valid products'
      using errcode = '22023';
  end if;

  insert into public.orders (
    order_number,
    user_id,
    customer_name,
    customer_phone,
    customer_email,
    city,
    delivery_address,
    order_notes,
    payment_method,
    payment_status,
    order_status,
    subtotal,
    shipping_fee,
    total,
    currency,
    idempotency_key,
    confirmation_token_hash,
    confirmation_token_expires_at
  )
  values (
    public.generate_euphoric_order_number(),
    p_user_id,
    trim(p_customer_name),
    trim(p_customer_phone),
    nullif(trim(p_customer_email), ''),
    trim(p_city),
    trim(p_delivery_address),
    nullif(trim(p_order_notes), ''),
    'cod',
    'pending',
    'pending',
    calculated_subtotal,
    configured_shipping,
    calculated_subtotal + configured_shipping,
    'PKR',
    p_idempotency_key,
    p_confirmation_token_hash,
    now() + interval '24 hours'
  )
  returning * into created_order;

  for cart_line in
    select
      item ->> 'slug' as slug,
      sum((item ->> 'quantity')::integer)::integer as quantity
    from jsonb_array_elements(p_items) as item
    where item ? 'slug' and item ? 'quantity'
    group by item ->> 'slug'
    order by item ->> 'slug'
  loop
    select p.*
    into product_row
    from public.products p
    where p.slug = cart_line.slug
    for update;

    insert into public.order_items (
      order_id,
      product_id,
      product_slug,
      product_name,
      product_brand,
      product_category,
      product_size_ml,
      product_image_url,
      unit_price,
      quantity,
      line_total
    )
    values (
      created_order.id,
      product_row.id,
      product_row.slug,
      product_row.name,
      product_row.brand,
      product_row.category,
      product_row.size_ml,
      product_row.image_url,
      product_row.price,
      cart_line.quantity,
      product_row.price * cart_line.quantity
    );

    if product_row.track_inventory then
      update public.products
      set stock_quantity = stock_quantity - cart_line.quantity
      where id = product_row.id;
    end if;
  end loop;

  insert into public.order_status_history (
    order_id,
    previous_status,
    new_status,
    changed_by,
    note
  )
  values (
    created_order.id,
    null,
    'pending',
    p_user_id,
    'Order created'
  );

  return query
  select
    created_order.id,
    created_order.order_number,
    created_order.subtotal,
    created_order.shipping_fee,
    created_order.total,
    created_order.currency,
    created_order.order_status,
    created_order.payment_status,
    created_order.created_at;
end;
$$;

revoke all on function public.create_cod_order(
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb,
  uuid,
  uuid,
  text
) from public, anon, authenticated;
grant execute on function public.create_cod_order(
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb,
  uuid,
  uuid,
  text
) to service_role;

create or replace function public.admin_update_order(
  p_order_id uuid,
  p_new_status text,
  p_payment_status text,
  p_admin_note text,
  p_override boolean default false
)
returns public.orders
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_order public.orders%rowtype;
  updated_order public.orders%rowtype;
  admin_user_id uuid := (select auth.uid());
  transition_is_valid boolean := false;
begin
  if auth.role() <> 'service_role' and not public.is_admin() then
    raise exception 'Administrator access required'
      using errcode = '42501';
  end if;

  if p_new_status not in (
    'pending',
    'confirmed',
    'processing',
    'dispatched',
    'delivered',
    'cancelled',
    'returned'
  ) then
    raise exception 'Invalid order status'
      using errcode = '22023';
  end if;

  if p_payment_status not in ('pending', 'paid', 'failed', 'refunded') then
    raise exception 'Invalid payment status'
      using errcode = '22023';
  end if;

  select *
  into current_order
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception 'Order not found'
      using errcode = 'P0002';
  end if;

  transition_is_valid :=
    current_order.order_status = p_new_status
    or (current_order.order_status = 'pending'
      and p_new_status in ('confirmed', 'cancelled'))
    or (current_order.order_status = 'confirmed'
      and p_new_status in ('processing', 'cancelled'))
    or (current_order.order_status = 'processing'
      and p_new_status in ('dispatched', 'cancelled'))
    or (current_order.order_status = 'dispatched'
      and p_new_status in ('delivered', 'returned'));

  if not p_override and not transition_is_valid then
    raise exception 'Invalid order status transition'
      using errcode = '22023';
  end if;

  if p_new_status in ('cancelled', 'returned')
    and current_order.order_status not in ('cancelled', 'returned')
    and current_order.inventory_restocked_at is null then
    update public.products p
    set stock_quantity = p.stock_quantity + oi.quantity
    from public.order_items oi
    where oi.order_id = current_order.id
      and oi.product_id = p.id
      and p.track_inventory;
  end if;

  update public.orders
  set
    order_status = p_new_status,
    payment_status = p_payment_status,
    admin_notes = nullif(trim(p_admin_note), ''),
    inventory_restocked_at = case
      when p_new_status in ('cancelled', 'returned')
        and current_order.inventory_restocked_at is null
      then now()
      else current_order.inventory_restocked_at
    end
  where id = p_order_id
  returning * into updated_order;

  if current_order.order_status is distinct from p_new_status then
    insert into public.order_status_history (
      order_id,
      previous_status,
      new_status,
      changed_by,
      note
    )
    values (
      p_order_id,
      current_order.order_status,
      p_new_status,
      admin_user_id,
      nullif(trim(p_admin_note), '')
    );
  end if;

  return updated_order;
end;
$$;

revoke all on function public.admin_update_order(
  uuid,
  text,
  text,
  text,
  boolean
) from public, anon;
grant execute on function public.admin_update_order(
  uuid,
  text,
  text,
  text,
  boolean
) to authenticated, service_role;

create or replace function public.check_rate_limit(
  p_action text,
  p_identity_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  window_start timestamptz;
  current_count integer;
begin
  if p_limit < 1 or p_window_seconds < 1 then
    raise exception 'Invalid rate-limit configuration'
      using errcode = '22023';
  end if;

  window_start := to_timestamp(
    floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds
  );

  insert into public.request_rate_limits (
    action,
    identity_hash,
    window_started_at,
    request_count
  )
  values (
    p_action,
    p_identity_hash,
    window_start,
    1
  )
  on conflict (action, identity_hash, window_started_at)
  do update set
    request_count = public.request_rate_limits.request_count + 1,
    updated_at = now()
  returning request_count into current_count;

  delete from public.request_rate_limits
  where window_started_at < now() - interval '2 days';

  return current_count <= p_limit;
end;
$$;

revoke all on function public.check_rate_limit(
  text,
  text,
  integer,
  integer
) from public, anon, authenticated;
grant execute on function public.check_rate_limit(
  text,
  text,
  integer,
  integer
) to service_role;
