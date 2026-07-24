"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "../components/ProductCard";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import {
  getProductCategoriesFromValues,
  productCategories,
  type Product,
  type ProductCategory,
} from "../data/products";

export function ShopPage({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = getProductCategoriesFromValues(
    searchParams.getAll("category"),
  );

  const toggleFilter = (value: ProductCategory) => {
    const nextCategories = new Set(selectedCategory);

    if (nextCategories.has(value)) {
      nextCategories.delete(value);
    } else {
      nextCategories.add(value);
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("category");
    productCategories
      .filter((category) => nextCategories.has(category))
      .forEach((category) =>
        nextSearchParams.append("category", category.toLowerCase()),
      );

    const query = nextSearchParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.category);

    return matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const FilterSection = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="text-[#C0C0C0] text-xs tracking-widest uppercase mb-4">
          Collection
        </h3>
        <div className="space-y-2">
          {productCategories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategory.includes(category)}
                onChange={() => toggleFilter(category)}
                className="w-4 h-4 bg-[#1C1C1E] border border-[#C0C0C0]/30 checked:bg-[#C0C0C0] checked:border-[#C0C0C0]"
              />
              <span className="text-[#D9D9D9] text-sm group-hover:text-[#C0C0C0] transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-20">
      {/* Hero Banner */}
      <div className="gradient-black-silver py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl sm:text-6xl text-[#F5F5F5] mb-4"
          >
            Shop the Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#D9D9D9] text-lg"
          >
            Explore premium perfume impressions for men, women, and every
            identity.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="glass p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#C0C0C0] text-sm tracking-widest uppercase">
                  Filters
                </h2>
              </div>
              <FilterSection />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[#D9D9D9]">
                Showing {sortedProducts.length}{" "}
                {sortedProducts.length === 1 ? "fragrance" : "fragrances"}
              </p>

              <div className="flex items-center justify-between gap-4 sm:justify-start">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="text-sm">Filters</span>
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-[#1C1C1E] border border-[#C0C0C0]/30 text-[#D9D9D9] px-4 py-2 pr-10 text-sm focus:outline-none focus:border-[#C0C0C0] cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D9D9D9] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#D9D9D9] text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="absolute left-0 top-0 bottom-0 w-80 max-w-full glass p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#C0C0C0] text-sm tracking-widest uppercase">
                Filters
              </h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-[#D9D9D9] hover:text-[#C0C0C0]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <FilterSection />
          </motion.div>
        </div>
      )}
    </div>
  );
}
