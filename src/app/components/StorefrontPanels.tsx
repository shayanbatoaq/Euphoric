"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  LockKeyhole,
  Mail,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  formatProductPrice,
  type Product,
} from "../data/products";
import { useStorefront } from "../context/StorefrontContext";

function useOverlayLifecycle(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, open]);
}

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useStorefront();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useOverlayLifecycle(searchOpen, closeSearch);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      window.setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const normalizedQuery = query.trim().toLowerCase();
  useEffect(() => {
    if (normalizedQuery.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSearching(true);
      try {
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(normalizedQuery)}`,
          { signal: controller.signal },
        );
        const body = (await response.json()) as { products?: Product[] };
        setResults(response.ok ? (body.products ?? []) : []);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [normalizedQuery]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/85 px-4 pt-20 backdrop-blur-md sm:px-6"
          onMouseDown={closeSearch}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-search-title"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="mx-auto max-h-[calc(100vh-7rem)] max-w-3xl overflow-hidden border border-[#C0C0C0]/20 bg-[#111113] shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-[#C0C0C0]/10 p-5 sm:p-7">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#C0C0C0]">
                  Product Search
                </p>
                <h2
                  id="product-search-title"
                  className="font-playfair text-2xl text-[#F5F5F5] sm:text-3xl"
                >
                  Find your fragrance
                </h2>
              </div>
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close product search"
                className="p-2 text-[#D9D9D9] transition-colors hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="border-b border-[#C0C0C0]/10 p-5 sm:p-7">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#C0C0C0]" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search perfumes by name or brand"
                  aria-label="Search products by perfume name or brand"
                  className="w-full border border-[#C0C0C0]/30 bg-[#1C1C1E] py-4 pl-12 pr-4 text-[#F5F5F5] outline-none placeholder:text-[#D9D9D9]/50 focus:border-[#C0C0C0]"
                />
              </div>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-5 sm:p-7">
              {!normalizedQuery && (
                <div className="py-12 text-center">
                  <Search className="mx-auto mb-4 size-8 text-[#C0C0C0]/60" />
                  <p className="text-[#D9D9D9]">
                    Search the complete Euphoric perfume collection.
                  </p>
                </div>
              )}

              {normalizedQuery.length === 1 && (
                <div className="py-12 text-center">
                  <p className="text-[#D9D9D9]">
                    Enter at least two letters to search.
                  </p>
                </div>
              )}

              {searching && (
                <div className="py-12 text-center text-sm text-[#D9D9D9]">
                  Searching the collection…
                </div>
              )}

              {normalizedQuery.length >= 2 &&
                !searching &&
                results.length === 0 && (
                <div className="py-12 text-center">
                  <p className="font-playfair text-xl text-[#F5F5F5]">
                    No fragrances found
                  </p>
                  <p className="mt-2 text-sm text-[#D9D9D9]">
                    Try another perfume name or brand.
                  </p>
                </div>
                )}

              {results.length > 0 && (
                <div className="space-y-3">
                  <p className="pb-2 text-xs uppercase tracking-widest text-[#C0C0C0]">
                    {results.length}{" "}
                    {results.length === 1 ? "result" : "results"}
                  </p>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={closeSearch}
                      className="group flex items-center gap-4 border border-[#C0C0C0]/10 bg-[#1C1C1E]/70 p-3 transition-colors hover:border-[#C0C0C0]/35"
                    >
                      <div className="h-20 w-16 shrink-0 overflow-hidden bg-black">
                        <ImageWithFallback
                          src={product.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-playfair text-lg text-[#F5F5F5] group-hover:text-[#C0C0C0]">
                          {product.displayName}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-widest text-[#D9D9D9]">
                          {product.category} · {product.sizeMl} ml
                        </p>
                      </div>
                      <span className="shrink-0 text-sm text-[#C0C0C0]">
                        {formatProductPrice(product.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AccountDialog() {
  const {
    accountOpen,
    closeAccount,
    user,
    authLoading,
    authConfigured,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
  } = useStorefront();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);

  useOverlayLifecycle(accountOpen, closeAccount);

  useEffect(() => {
    if (accountOpen) {
      setStatus(null);
    }
  }, [accountOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    if (mode === "signup") {
      if (password.length < 8 || !/\d/.test(password)) {
        setSubmitting(false);
        setStatus({ kind: "error", message: "Password must be at least 8 characters and include a number." });
        return;
      }
      if (password !== confirmPassword) {
        setSubmitting(false);
        setStatus({ kind: "error", message: "Passwords do not match." });
        return;
      }
    }

    const result =
      mode === "signup"
        ? await signUp(name.trim(), email.trim(), password)
        : await signIn(email.trim(), password);

    setStatus({
      kind: result.ok ? "success" : "error",
      message: result.message,
    });
    setSubmitting(false);

    if (result.ok && mode === "signin") {
      setPassword("");
    }
  };

  const handleProvider = async (provider: "google") => {
    setSubmitting(true);
    setStatus(null);
    const result = await signInWithProvider(provider);
    setStatus({
      kind: result.ok ? "success" : "error",
      message: result.message,
    });
    setSubmitting(false);
  };

  const handleSignOut = async () => {
    setSubmitting(true);
    const result = await signOut();
    setStatus({
      kind: result.ok ? "success" : "error",
      message: result.message,
    });
    setSubmitting(false);
  };

  const displayName =
    (user?.user_metadata.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Euphoric customer";

  return (
    <AnimatePresence>
      {accountOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md"
          onMouseDown={closeAccount}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-dialog-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="my-8 w-full max-w-md border border-[#C0C0C0]/20 bg-[#111113] shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-[#C0C0C0]/10 p-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#C0C0C0]">
                  Euphoric Account
                </p>
                <h2
                  id="account-dialog-title"
                  className="font-playfair text-3xl text-[#F5F5F5]"
                >
                  {user
                    ? `Welcome, ${displayName}`
                    : mode === "signin"
                      ? "Welcome back"
                      : "Create your account"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeAccount}
                aria-label="Close account"
                className="p-2 text-[#D9D9D9] transition-colors hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6">
              {authLoading ? (
                <p className="py-10 text-center text-[#D9D9D9]">
                  Loading your account…
                </p>
              ) : user ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border border-[#C0C0C0]/15 bg-[#1C1C1E] p-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#C0C0C0] text-lg font-semibold text-[#0A0A0A]">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[#F5F5F5]">{displayName}</p>
                      <p className="truncate text-sm text-[#D9D9D9]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/account"
                    onClick={closeAccount}
                    className="block w-full bg-[#C0C0C0] px-5 py-3 text-center text-sm uppercase tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#D9D9D9]"
                  >
                    Open my account
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={submitting}
                    className="w-full border border-[#C0C0C0] px-5 py-3 text-sm uppercase tracking-widest text-[#C0C0C0] transition-colors hover:bg-[#C0C0C0] hover:text-black disabled:opacity-50"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() => handleProvider("google")}
                      disabled={submitting}
                      className="flex items-center justify-center gap-2 border border-[#C0C0C0]/25 bg-[#1C1C1E] px-4 py-3 text-sm text-[#F5F5F5] transition-colors hover:border-[#C0C0C0] disabled:opacity-50"
                    >
                      <span className="flex size-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#0A0A0A]">
                        G
                      </span>
                      Google
                    </button>
                  </div>

                  <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#C0C0C0]/15" />
                    <span className="text-xs uppercase tracking-widest text-[#D9D9D9]/70">
                      Or use email
                    </span>
                    <div className="h-px flex-1 bg-[#C0C0C0]/15" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "signup" && (
                      <label className="block">
                        <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
                          Name
                        </span>
                        <div className="relative">
                          <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#C0C0C0]" />
                          <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name"
                            required
                            placeholder="Your name"
                            className="w-full border border-[#C0C0C0]/25 bg-[#1C1C1E] py-3 pl-10 pr-3 text-[#F5F5F5] outline-none placeholder:text-[#D9D9D9]/40 focus:border-[#C0C0C0]"
                          />
                        </div>
                      </label>
                    )}

                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
                        Email
                      </span>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#C0C0C0]" />
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          autoComplete="email"
                          required
                          placeholder="you@example.com"
                          className="w-full border border-[#C0C0C0]/25 bg-[#1C1C1E] py-3 pl-10 pr-3 text-[#F5F5F5] outline-none placeholder:text-[#D9D9D9]/40 focus:border-[#C0C0C0]"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
                        Password
                      </span>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#C0C0C0]" />
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          autoComplete={
                            mode === "signin"
                              ? "current-password"
                              : "new-password"
                          }
                          required
                          minLength={8}
                          pattern=".*[0-9].*"
                          title="Use at least 8 characters and include a number."
                          placeholder={mode === "signin" ? "Password" : "At least 8 characters + a number"}
                          className="w-full border border-[#C0C0C0]/25 bg-[#1C1C1E] py-3 pl-10 pr-3 text-[#F5F5F5] outline-none placeholder:text-[#D9D9D9]/40 focus:border-[#C0C0C0]"
                        />
                      </div>
                    </label>

                    {mode === "signup" && (
                      <label className="block">
                        <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">Confirm password</span>
                        <div className="relative">
                          <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#C0C0C0]" />
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            autoComplete="new-password"
                            required
                            minLength={8}
                            placeholder="Re-enter your password"
                            className="w-full border border-[#C0C0C0]/25 bg-[#1C1C1E] py-3 pl-10 pr-3 text-[#F5F5F5] outline-none placeholder:text-[#D9D9D9]/40 focus:border-[#C0C0C0]"
                          />
                        </div>
                      </label>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#C0C0C0] px-5 py-3 text-sm uppercase tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#D9D9D9] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting
                        ? "Please wait…"
                        : mode === "signin"
                          ? "Sign in"
                          : "Create account"}
                    </button>
                    {mode === "signin" && (
                      <Link
                        href="/auth/forgot-password"
                        onClick={closeAccount}
                        className="block text-center text-xs text-[#D9D9D9]/70 underline underline-offset-4 transition hover:text-white"
                      >
                        Forgot your password?
                      </Link>
                    )}
                  </form>

                  <p className="mt-5 text-center text-sm text-[#D9D9D9]">
                    {mode === "signin"
                      ? "New to Euphoric?"
                      : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode(mode === "signin" ? "signup" : "signin");
                        setStatus(null);
                      }}
                      className="text-[#C0C0C0] underline underline-offset-4 hover:text-white"
                    >
                      {mode === "signin" ? "Create an account" : "Sign in"}
                    </button>
                  </p>

                  {!authConfigured && (
                    <p className="mt-5 border border-amber-300/20 bg-amber-200/5 p-3 text-xs leading-relaxed text-amber-100/80">
                      Secure account access will activate when the authentication
                      project is connected.
                    </p>
                  )}
                </>
              )}

              {status && (
                <p
                  role="status"
                  className={`mt-5 border p-3 text-sm ${
                    status.kind === "success"
                      ? "border-emerald-300/20 bg-emerald-300/5 text-emerald-100"
                      : "border-red-300/20 bg-red-300/5 text-red-100"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    cartLines,
    cartQuantity,
    cartSubtotal,
    getProduct,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useStorefront();

  useOverlayLifecycle(cartOpen, closeCart);

  const cartItems = cartLines.flatMap((line) => {
    const product = getProduct(line.productId);
    return product ? [{ ...line, product }] : [];
  });

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm"
          onMouseDown={closeCart}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-md flex-col border-l border-[#C0C0C0]/20 bg-[#111113] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#C0C0C0]/10 p-5 sm:p-6">
              <div>
                <p className="mb-1 text-xs uppercase tracking-[0.25em] text-[#C0C0C0]">
                  Your Selection
                </p>
                <h2
                  id="cart-title"
                  className="font-playfair text-3xl text-[#F5F5F5]"
                >
                  Shopping Bag
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close shopping bag"
                className="p-2 text-[#D9D9D9] transition-colors hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="mb-5 size-10 text-[#C0C0C0]/60" />
                <h3 className="font-playfair text-2xl text-[#F5F5F5]">
                  Your bag is empty
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#D9D9D9]">
                  Explore the collection and add a fragrance that feels like
                  yours.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-7 bg-[#C0C0C0] px-6 py-3 text-sm uppercase tracking-widest text-[#0A0A0A] hover:bg-[#D9D9D9]"
                >
                  Shop fragrances
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#D9D9D9]">
                      {cartQuantity} {cartQuantity === 1 ? "item" : "items"}
                    </p>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs uppercase tracking-widest text-[#D9D9D9] underline underline-offset-4 hover:text-white"
                    >
                      Clear bag
                    </button>
                  </div>

                  {cartItems.map(({ product, quantity }) => (
                    <article
                      key={product.id}
                      className="flex gap-4 border border-[#C0C0C0]/10 bg-[#1C1C1E]/70 p-3"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        onClick={closeCart}
                        className="h-28 w-20 shrink-0 overflow-hidden bg-black"
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.displayName}
                          className="h-full w-full object-cover"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link
                              href={`/product/${product.id}`}
                              onClick={closeCart}
                              className="font-playfair text-lg text-[#F5F5F5] hover:text-[#C0C0C0]"
                            >
                              {product.displayName}
                            </Link>
                            <p className="mt-1 text-xs uppercase tracking-widest text-[#D9D9D9]">
                              {product.sizeMl} ml
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            aria-label={`Remove ${product.displayName} from bag`}
                            className="p-1 text-[#D9D9D9] hover:text-white"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex items-center border border-[#C0C0C0]/20">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(product.id, quantity - 1)
                              }
                              aria-label={`Decrease ${product.displayName} quantity`}
                              className="p-2 text-[#C0C0C0] hover:bg-white/5"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="min-w-7 text-center text-sm text-[#F5F5F5]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(product.id, quantity + 1)
                              }
                              aria-label={`Increase ${product.displayName} quantity`}
                              className="p-2 text-[#C0C0C0] hover:bg-white/5"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="text-sm text-[#C0C0C0]">
                            {formatProductPrice(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="border-t border-[#C0C0C0]/10 p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm uppercase tracking-widest text-[#D9D9D9]">
                      Subtotal
                    </span>
                    <span className="font-playfair text-2xl text-[#F5F5F5]">
                      {formatProductPrice(cartSubtotal)}
                    </span>
                  </div>
                  <p className="mb-5 text-xs leading-relaxed text-[#D9D9D9]/75">
                    Flat-rate shipping of {formatProductPrice(300)} is added at
                    checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full bg-[#C0C0C0] px-6 py-3 text-center text-sm uppercase tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#D9D9D9]"
                  >
                    Continue to checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="mt-3 block w-full border border-[#C0C0C0]/30 px-6 py-3 text-center text-sm uppercase tracking-widest text-[#C0C0C0] transition-colors hover:border-[#C0C0C0]"
                  >
                    View full bag
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full px-6 py-2 text-xs uppercase tracking-widest text-[#C0C0C0]/60 transition-colors hover:text-[#C0C0C0]"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
