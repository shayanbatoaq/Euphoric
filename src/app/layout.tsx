import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Euphoric",
  description: "Luxury perfume impressions crafted to leave a lasting impression.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#0A0A0A]">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
