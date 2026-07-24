# Euphoric commerce implementation plan

## Existing application audit

- Next.js 16 App Router with React 19, strict TypeScript, Tailwind CSS 4, Motion, Lucide icons, and Radix UI.
- Public routes: `/`, `/shop`, `/product/[id]`, `/about`, `/contact`, `/cart`, and `/checkout`.
- Shared client storefront state lives in `StorefrontContext` and stores `{ productId, quantity }` cart lines in local storage.
- The static catalogue contains 194 products with string slugs, name, brand, category, integer PKR price, 50 ml size, descriptions, fragrance notes, and an image path.
- Product filtering is URL-driven on `/shop`; search currently filters the static array in a full-screen overlay.
- Checkout currently creates a local browser record, accepts fake card details, clears the cart, and renders an in-memory confirmation.
- Supabase authentication currently uses a browser client only. There is no cookie-backed server client, session-refresh proxy, callback route, password reset, account area, or server-side role check.
- The contact form only writes to the browser console.
- There are no route handlers, server actions, SQL migrations, database types, seed scripts, backend tests, admin routes, or transactional email services.
- Reusable design primitives include the global navigation/footer, glass panels, product/category cards, buttons, image fallback, and the existing black/charcoal/silver/off-white tokens.

## Implementation sequence

1. Add the environment contract, typed Supabase clients, schema migrations, RLS policies, transactional database functions, and an idempotent product seed.
2. Replace local checkout with a Zod-validated, rate-limited server endpoint that creates COD orders from authoritative database products.
3. Add a token-protected guest confirmation route and authenticated customer order access.
4. Move authentication to Supabase SSR cookies and add callback, reset-password, account, order, profile, and address routes.
5. Add a server-authorized admin area for overview, orders, products, customers, enquiries, settings, CSV exports, and status workflow.
6. Store contact enquiries through a protected endpoint and send non-blocking Resend notifications.
7. Read products from Supabase for server-rendered shop/product pages and debounced search, retaining static data only as a development fallback and seed source.
8. Add metadata, sitemap/robots, structured data, unit tests for critical rules, and complete setup/operations documentation.

## Trust boundaries

- The browser submits only product slugs and quantities; prices, names, totals, shipping, active status, and stock are reloaded and calculated in PostgreSQL.
- The service-role key is imported only by server-only modules.
- Browser clients use only the public Supabase URL and publishable/anonymous key.
- Admin pages and mutations call a server-side `requireAdmin()` check and do not rely on hidden navigation.
- Orders use idempotency keys, server-generated order numbers, immutable item snapshots, and transactional inventory updates.
- Raw card data is removed. COD is the only enabled payment method; PayFast remains a documented future boundary.
