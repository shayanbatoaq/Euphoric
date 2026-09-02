"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Provider, User } from "@supabase/supabase-js";
import type { Product } from "../data/products";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "../lib/supabase";

const CART_STORAGE_KEY = "euphoric-cart-v1";

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CheckoutDetails {
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  notes?: string;
}

interface AuthActionResult {
  ok: boolean;
  message: string;
}

interface StorefrontContextValue {
  searchOpen: boolean;
  accountOpen: boolean;
  cartOpen: boolean;
  openSearch: () => void;
  openAccount: () => void;
  openCart: () => void;
  closeSearch: () => void;
  closeAccount: () => void;
  closeCart: () => void;
  cartLines: CartLine[];
  cartReady: boolean;
  cartQuantity: number;
  cartSubtotal: number;
  catalog: Product[];
  getProduct: (productId: string) => Product | undefined;
  addToCart: (productId: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  user: User | null;
  authLoading: boolean;
  authConfigured: boolean;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthActionResult>;
  signIn: (email: string, password: string) => Promise<AuthActionResult>;
  signInWithProvider: (
    provider: Extract<Provider, "google">,
  ) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
}

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

function configurationResult(): AuthActionResult {
  return {
    ok: false,
    message:
      "Account sign-in is awaiting secure authentication configuration.",
  };
}

function errorResult(error: unknown, fallback: string): AuthActionResult {
  if (error instanceof Error && error.message) {
    return { ok: false, message: error.message };
  }

  return { ok: false, message: fallback };
}

export function StorefrontProvider({
  children,
  catalog,
}: {
  children: ReactNode;
  catalog: Product[];
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [cartReady, setCartReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const productsById = useMemo(
    () => new Map(catalog.map((product) => [product.id, product])),
    [catalog],
  );
  const getProduct = (productId: string) => productsById.get(productId);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as CartLine[];
        const validCart = parsedCart.filter(
          (line) =>
            typeof line.productId === "string" &&
            Number.isInteger(line.quantity) &&
            line.quantity > 0 &&
            Boolean(productsById.get(line.productId)),
        );
        setCartLines(validCart);
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setCartReady(true);
    }
  }, [productsById]);

  useEffect(() => {
    if (cartReady) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartLines));
    }
  }, [cartLines, cartReady]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openSearch = () => {
    setAccountOpen(false);
    setCartOpen(false);
    setSearchOpen(true);
  };

  const openAccount = () => {
    setSearchOpen(false);
    setCartOpen(false);
    setAccountOpen(true);
  };

  const openCart = () => {
    setSearchOpen(false);
    setAccountOpen(false);
    setCartOpen(true);
  };

  const addToCart = (productId: string, quantity = 1) => {
    if (!productsById.has(productId)) {
      return;
    }

    const safeQuantity = Math.max(1, Math.min(99, Math.floor(quantity)));

    setCartLines((currentLines) => {
      const existingLine = currentLines.find(
        (line) => line.productId === productId,
      );

      if (!existingLine) {
        return [...currentLines, { productId, quantity: safeQuantity }];
      }

      return currentLines.map((line) =>
        line.productId === productId
          ? {
              ...line,
              quantity: Math.min(99, line.quantity + safeQuantity),
            }
          : line,
      );
    });

    openCart();
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartLines((currentLines) =>
        currentLines.filter((line) => line.productId !== productId),
      );
      return;
    }

    setCartLines((currentLines) =>
      currentLines.map((line) =>
        line.productId === productId
          ? { ...line, quantity: Math.min(99, Math.floor(quantity)) }
          : line,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCartLines((currentLines) =>
      currentLines.filter((line) => line.productId !== productId),
    );
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<AuthActionResult> => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return configurationResult();
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/account`,
        },
      });

      if (error) {
        return { ok: false, message: error.message };
      }

      return {
        ok: true,
        message: data.session
          ? "Your Euphoric account is ready."
          : "Account created. Please check your email to confirm your address.",
      };
    } catch (error) {
      return errorResult(error, "We could not create your account.");
    }
  };

  const signIn = async (
    email: string,
    password: string,
  ): Promise<AuthActionResult> => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return configurationResult();
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { ok: false, message: error.message };
      }

      return { ok: true, message: "Welcome back to Euphoric." };
    } catch (error) {
      return errorResult(error, "We could not sign you in.");
    }
  };

  const signInWithProvider = async (
    provider: Extract<Provider, "google">,
  ): Promise<AuthActionResult> => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return configurationResult();
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/account`,
        },
      });

      if (error) {
        return { ok: false, message: error.message };
      }

      return { ok: true, message: `Opening ${provider} sign-in…` };
    } catch (error) {
      return errorResult(error, `We could not start ${provider} sign-in.`);
    }
  };

  const signOut = async (): Promise<AuthActionResult> => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return configurationResult();
    }

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { ok: false, message: error.message };
      }

      return { ok: true, message: "You have been signed out." };
    } catch (error) {
      return errorResult(error, "We could not sign you out.");
    }
  };

  const cartQuantity = useMemo(
    () => cartLines.reduce((total, line) => total + line.quantity, 0),
    [cartLines],
  );

  const cartSubtotal = useMemo(
    () =>
      cartLines.reduce((total, line) => {
        const product = productsById.get(line.productId);
        return total + (product?.price ?? 0) * line.quantity;
      }, 0),
    [cartLines, productsById],
  );

  const value: StorefrontContextValue = {
    searchOpen,
    accountOpen,
    cartOpen,
    openSearch,
    openAccount,
    openCart,
    closeSearch: () => setSearchOpen(false),
    closeAccount: () => setAccountOpen(false),
    closeCart: () => setCartOpen(false),
    cartLines,
    cartReady,
    cartQuantity,
    cartSubtotal,
    catalog,
    getProduct,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart: () => setCartLines([]),
    user,
    authLoading,
    authConfigured: isSupabaseConfigured,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
  };

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error("useStorefront must be used inside StorefrontProvider.");
  }

  return context;
}
