# Euphoric commerce

Euphoric is a Next.js 16 perfume-impressions storefront backed by Supabase. It
supports a server-authoritative cash-on-delivery checkout, guest and registered
customer orders, account order history, product/inventory management, contact
enquiries, and a role-protected admin dashboard.

The existing black, charcoal, silver, and off-white storefront remains the
visual foundation. The static 194-product TypeScript catalogue is retained as
the seed source and as a local fallback only when Supabase is not configured.

## Requirements

- Node.js 20 or newer
- npm
- A Supabase project
- Optional: Supabase CLI for migration commands

## Local setup

1. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

2. Copy `.env.example` to `.env.local` and fill in the values.
3. Apply the migration in `supabase/migrations`.
4. Seed the product catalogue.
5. Start the application:

   ```bash
   npm run dev
   ```

The local site runs at `http://localhost:3000`.

## Environment variables

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

```

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is supported for existing Supabase projects.
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` may be used instead with the newer key
  format.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never prefix it with
  `NEXT_PUBLIC_` or expose it in browser code.

## Supabase database setup

The migration is:

```text
supabase/migrations/20260724000100_euphoric_commerce.sql
```

It creates profiles, products, addresses, orders, immutable order-item
snapshots, status history, enquiries, store settings, request-rate-limit state,
indexes, constraints, RLS policies, and transaction-safe PostgreSQL functions.

With the Supabase CLI linked to the project:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Alternatively, run the migration in the trusted Supabase SQL editor. Review the
target project before applying it. Do not run production migrations from a
browser or public client.

### Seed the 194 products

The seed reads `src/app/data/products.ts`, generates stable missing SKUs, and
upserts by slug in batches. It is safe to rerun.

```bash
npm run seed:products
```

The seed requires `NEXT_PUBLIC_SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

### Create the first administrator

First register the user through the normal sign-up flow. Find the user UUID in
Supabase Authentication, then run this only in a trusted SQL environment:

```sql
update public.profiles
set role = 'admin'
where id = 'USER_UUID';
```

Sign out and sign in again, then open `/admin`. Never add an admin-role control
to a public profile form.

## Authentication configuration

In Supabase Authentication:

1. Set the Site URL to the production value of `NEXT_PUBLIC_SITE_URL`.
2. Add local and production redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/confirm`
   - `https://YOUR_DOMAIN/auth/callback`
   - `https://YOUR_DOMAIN/auth/confirm`
3. Configure the confirmation email template to use the token-hash confirmation
   route when desired:

   ```text
   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/account
   ```

4. Keep email/password enabled for registration, verification, sign-in, and
   reset-password flows.

For Google or Facebook, enable the provider in Supabase, add the provider
credentials, and add the Supabase provider callback URL shown in the dashboard
to the OAuth application. The website only shows a functional provider flow
when that provider is configured upstream.

The app uses cookie-backed `@supabase/ssr` clients and the Next.js 16
`src/proxy.ts` session refresh pattern. Redirect targets are restricted to local
application paths.


Email templates escape user-submitted values before rendering HTML.

## COD order workflow

The browser sends customer details plus product slugs and quantities to
`POST /api/orders`. It does not send authoritative prices.

The server:

1. Applies an IP/user-agent rate limit and validates with Zod.
2. Normalizes Pakistani mobile numbers to `+92 3XX-XXXXXXX`.
3. calls the service-only `create_cod_order` PostgreSQL function.
4. Locks and reloads active products, reads the shipping fee from
   `store_settings`, verifies inventory, and calculates every amount.
5. Creates the order and item snapshots, decrements tracked stock, and records
   the first history event in one database transaction.
6. Returns a short-lived hashed-token-backed guest confirmation reference.

Idempotency keys prevent duplicate orders on retries. The cart is cleared only
after a successful response. Cancelling or returning a tracked-stock order
restores inventory once.

COD is the only customer-facing payment method. No card number, expiry, CVV, or
other card data is collected or stored.

## Customer and admin areas

- `/account` is protected and provides profile, addresses, order history, order
  detail, status timeline, and sign-out.
- `/admin` calls `requireAdmin()` on every page and every mutation. It provides
  overview metrics, order filtering/status management, CSV order export,
  product creation/editing, customer records, enquiry management, and store
  settings.
- RLS separately enforces own-profile, own-address, and own-order reads.
- Authenticated non-admin users are sent to `/access-denied`.

## Storefront catalogue

Active Supabase products power featured products, shop filtering, dynamic
product pages, related products, and debounced search. Queries select only the
fields each view needs. Missing images use `/product-placeholder.svg`.

The cart remains in local storage as a convenience, but the database is always
authoritative at checkout.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Unit tests cover phone normalization, checkout and contact validation, quantity
limits, totals and shipping, order-number structure, workflow transitions, and
redirect safety.

The Supabase integration smoke test is skipped by default. Run it against a
prepared non-production project after migration and seeding:

```bash
RUN_SUPABASE_INTEGRATION_TESTS=1 npm test
```

On Windows PowerShell:

```powershell
$env:RUN_SUPABASE_INTEGRATION_TESTS='1'
npm test
```

## Production deployment

For Vercel:

1. Import the repository.
2. add every production environment variable in the Vercel project settings.
3. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin.
4. Apply the migration and seed the production Supabase project deliberately.
5. Add the production authentication redirect URLs in Supabase and the OAuth
   providers.
6. Deploy, then verify email sign-in, guest COD checkout, signed-in checkout,
   admin access, order email delivery, and contact delivery with low-value test
   orders.

Do not put the service-role key in preview logs, browser bundles, analytics, or
client-side error reports.

## Future PayFast boundary

The database types already support `payment_method = 'payfast'` and the common
payment statuses, but no PayFast transaction is represented as functional.
Future work should be isolated under:

```text
/api/payments/payfast/initiate
/api/payments/payfast/callback
/api/payments/payfast/return
```

The callback must verify the gateway signature and update payment state on the
server before an order is treated as paid. COD logic should remain independent.
