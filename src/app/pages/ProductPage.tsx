"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LuxuryButton } from "../components/LuxuryButton";
import { ProductCard } from "../components/ProductCard";
import { Minus, Plus, Star, Truck, RefreshCw, Shield } from "lucide-react";

const productData = {
  "1": {
    name: "Noir Essence",
    category: "Men",
    price: 89,
    image: "https://images.unsplash.com/photo-1769625310883-6c87ed402d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    description:
      "Noir Essence is a sophisticated fragrance that embodies the essence of modern masculinity. This captivating scent opens with fresh bergamot, transitions to warm sandalwood, and settles into a rich amber base. Perfect for the confident individual who isn't afraid to make a statement.",
    notes: {
      top: ["Bergamot", "Black Pepper", "Lemon"],
      heart: ["Sandalwood", "Cedar", "Vetiver"],
      base: ["Amber", "Musk", "Vanilla"],
    },
    rating: 4.8,
    reviews: 124,
  },
};

const relatedProducts = [
  {
    id: "3",
    name: "Pure Mystique",
    category: "Unisex",
    notes: "Citrus, Cedar, Musk",
    price: 92,
    image: "https://images.unsplash.com/photo-1632495112970-30ce8340c2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    id: "4",
    name: "Silver Oud",
    category: "Unisex",
    notes: "Oud, Leather, Spice",
    price: 99,
    image: "https://images.unsplash.com/photo-1765572354938-b88b9d7244cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    id: "5",
    name: "Azure Dream",
    category: "Men",
    notes: "Marine, Lavender, Vetiver",
    price: 87,
    image: "https://images.unsplash.com/photo-1709662217788-6a8a1b31562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
];

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const product = productData[id as keyof typeof productData] || productData["1"];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2 text-[#D9D9D9]">
            <li>
              <Link href="/" className="hover:text-[#C0C0C0] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/shop" className="hover:text-[#C0C0C0] transition-colors">
                Shop
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#C0C0C0]">{product.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/5] bg-[#1C1C1E] glow-silver"
          >
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs tracking-widest uppercase text-[#C0C0C0]">
                {product.category}
              </span>
              <h1 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mt-2">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-[#C0C0C0] fill-[#C0C0C0]"
                        : "text-[#C0C0C0]/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#D9D9D9] text-sm">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl text-[#C0C0C0]">${product.price}</div>

            {/* Description */}
            <p className="text-[#D9D9D9] leading-relaxed">{product.description}</p>

            {/* Notes */}
            <div className="glass p-6 space-y-4">
              <h3 className="text-[#C0C0C0] text-xs tracking-widest uppercase">
                Fragrance Notes
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-[#F5F5F5] text-sm block mb-1">Top Notes</span>
                  <span className="text-[#D9D9D9] text-sm">
                    {product.notes.top.join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-[#F5F5F5] text-sm block mb-1">Heart Notes</span>
                  <span className="text-[#D9D9D9] text-sm">
                    {product.notes.heart.join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-[#F5F5F5] text-sm block mb-1">Base Notes</span>
                  <span className="text-[#D9D9D9] text-sm">
                    {product.notes.base.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-3">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-[#C0C0C0]/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-[#C0C0C0]/10 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-[#C0C0C0]" />
                  </button>
                  <span className="px-6 text-[#F5F5F5]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-[#C0C0C0]/10 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#C0C0C0]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <LuxuryButton variant="primary" className="flex-1">
                Add to Cart
              </LuxuryButton>
              <LuxuryButton variant="secondary" className="flex-1">
                Buy Now
              </LuxuryButton>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#C0C0C0]/10">
              <div className="text-center">
                <Truck className="w-6 h-6 text-[#C0C0C0] mx-auto mb-2" />
                <p className="text-[#D9D9D9] text-xs">Free Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 text-[#C0C0C0] mx-auto mb-2" />
                <p className="text-[#D9D9D9] text-xs">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-[#C0C0C0] mx-auto mb-2" />
                <p className="text-[#D9D9D9] text-xs">Authentic</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          <div className="border-b border-[#C0C0C0]/10 mb-8">
            <div className="flex space-x-8">
              {["description", "reviews", "shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm tracking-widest uppercase transition-colors ${
                    activeTab === tab
                      ? "text-[#C0C0C0] border-b-2 border-[#C0C0C0]"
                      : "text-[#D9D9D9] hover:text-[#C0C0C0]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-3xl">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#D9D9D9] space-y-4"
              >
                <p>{product.description}</p>
                <p>
                  Each fragrance is carefully crafted using premium ingredients to
                  ensure long-lasting wear and exceptional quality. Our perfumes are
                  designed to evolve throughout the day, revealing different notes
                  as they settle on your skin.
                </p>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {[1, 2, 3].map((review) => (
                  <div key={review} className="glass p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-[#C0C0C0] fill-[#C0C0C0]"
                          />
                        ))}
                      </div>
                      <span className="text-[#D9D9D9] text-sm">2 days ago</span>
                    </div>
                    <p className="text-[#F5F5F5] mb-2">Amazing fragrance!</p>
                    <p className="text-[#D9D9D9] text-sm">
                      This scent is absolutely incredible. It lasts all day and I
                      constantly get compliments.
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "shipping" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#D9D9D9] space-y-4"
              >
                <p>
                  <strong className="text-[#F5F5F5]">Free Shipping:</strong> On all
                  orders over $50
                </p>
                <p>
                  <strong className="text-[#F5F5F5]">Standard Shipping:</strong>{" "}
                  3-5 business days
                </p>
                <p>
                  <strong className="text-[#F5F5F5]">Express Shipping:</strong> 1-2
                  business days (additional fee)
                </p>
                <p>
                  <strong className="text-[#F5F5F5]">Returns:</strong> 30-day
                  return policy for unopened items
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* You May Also Like */}
        <div>
          <h2 className="font-playfair text-3xl sm:text-4xl text-[#F5F5F5] mb-8">
            You May Also Like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
