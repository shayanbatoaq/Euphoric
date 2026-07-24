import type { Metadata } from "next";
import { CartPage } from "../pages/CartPage";

export const metadata: Metadata = {
  title: "Shopping Bag | Euphoric",
  description: "Review the fragrances in your Euphoric shopping bag.",
};

export default function Page() {
  return <CartPage />;
}
