import type { Metadata } from "next";
import CheckoutPage from "../pages/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | Euphoric",
  description:
    "Complete your Euphoric fragrance order with secure cash on delivery.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CheckoutPage />;
}
