"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

const allProducts = [
  {
    id: "1",
    name: "Noir Essence",
    category: "Men",
    notes: "Bergamot, Sandalwood, Amber",
    price: 89,
    image: "https://images.unsplash.com/photo-1769625310883-6c87ed402d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    scentFamily: "Woody",
    occasion: "Luxury",
  },
  {
    id: "2",
    name: "Velvet Rose",
    category: "Women",
    notes: "Rose, Jasmine, Vanilla",
    price: 95,
    image: "https://images.unsplash.com/photo-1760113559708-84e7a148ec68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    scentFamily: "Floral",
    occasion: "Date Night",
  },
  {
    id: "3",
    name: "Pure Mystique",
    category: "Unisex",
    notes: "Citrus, Cedar, Musk",
    price: 92,
    image: "https://images.unsplash.com/photo-1632495112970-30ce8340c2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    scentFamily: "Fresh",
    occasion: "Daily",
  },
  {
    id: "4",
    name: "Silver Oud",
    category: "Unisex",
    notes: "Oud, Leather, Spice",
    price: 99,
    image: "https://images.unsplash.com/photo-1765572354938-b88b9d7244cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    scentFamily: "Oriental",
    occasion: "Luxury",
  },
  {
    id: "5",
    name: "Azure Dream",
    category: "Men",
    notes: "Marine, Lavender, Vetiver",
    price: 87,
    image: "https://images.unsplash.com/photo-1709662217788-6a8a1b31562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    scentFamily: "Fresh",
    occasion: "Daily",
  },
  {
    id: "6",
    name: "Golden Amber",
    category: "Women",
    notes: "Amber, Patchouli, Honey",
    price: 94,
    image: "https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    scentFamily: "Oriental",
    occasion: "Date Night",
  },
  {
    id: "7",
    name: "Midnight Spice",
    category: "Men",
    notes: "Cardamom, Black Pepper, Tobacco",
    price: 91,
    image: "https://images.unsplash.com/photo-1639396637739-5ff5f7075394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    scentFamily: "Spicy",
    occasion: "Office",
  },
  {
    id: "8",
    name: "Blossom Silk",
    category: "Women",
    notes: "Peony, White Tea, Silk Musk",
    price: 93,
    image: "https://images.unsplash.com/photo-1773527142299-59863d536e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    scentFamily: "Floral",
    occasion: "Daily",
  },
];

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedScentFamily, setSelectedScentFamily] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = ["Men", "Women", "Unisex"];
  const scentFamilies = ["Fresh", "Woody", "Floral", "Oriental", "Citrus", "Sweet", "Spicy"];
  const occasions = ["Daily", "Date Night", "Office", "Luxury"];

  const toggleFilter = (value: string, setter: (prev: string[]) => void, current: string[]) => {
    if (current.includes(value)) {
      setter(current.filter((item) => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(product.category);
    const scentMatch = selectedScentFamily.length === 0 || selectedScentFamily.includes(product.scentFamily);
    const occasionMatch = selectedOccasion.length === 0 || selectedOccasion.includes(product.occasion);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && scentMatch && occasionMatch && priceMatch;
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
          Category
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategory.includes(category)}
                onChange={() =>
                  toggleFilter(category, setSelectedCategory, selectedCategory)
                }
                className="w-4 h-4 bg-[#1C1C1E] border border-[#C0C0C0]/30 checked:bg-[#C0C0C0] checked:border-[#C0C0C0]"
              />
              <span className="text-[#D9D9D9] text-sm group-hover:text-[#C0C0C0] transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Scent Family */}
      <div>
        <h3 className="text-[#C0C0C0] text-xs tracking-widest uppercase mb-4">
          Scent Family
        </h3>
        <div className="space-y-2">
          {scentFamilies.map((scent) => (
            <label key={scent} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedScentFamily.includes(scent)}
                onChange={() =>
                  toggleFilter(scent, setSelectedScentFamily, selectedScentFamily)
                }
                className="w-4 h-4 bg-[#1C1C1E] border border-[#C0C0C0]/30 checked:bg-[#C0C0C0] checked:border-[#C0C0C0]"
              />
              <span className="text-[#D9D9D9] text-sm group-hover:text-[#C0C0C0] transition-colors">
                {scent}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-[#C0C0C0] text-xs tracking-widest uppercase mb-4">
          Price Range
        </h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="150"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-[#D9D9D9] text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h3 className="text-[#C0C0C0] text-xs tracking-widest uppercase mb-4">
          Occasion
        </h3>
        <div className="space-y-2">
          {occasions.map((occasion) => (
            <label key={occasion} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedOccasion.includes(occasion)}
                onChange={() =>
                  toggleFilter(occasion, setSelectedOccasion, selectedOccasion)
                }
                className="w-4 h-4 bg-[#1C1C1E] border border-[#C0C0C0]/30 checked:bg-[#C0C0C0] checked:border-[#C0C0C0]"
              />
              <span className="text-[#D9D9D9] text-sm group-hover:text-[#C0C0C0] transition-colors">
                {occasion}
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
            Discover your signature scent
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
            <div className="flex items-center justify-between mb-8">
              <p className="text-[#D9D9D9]">
                {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
              </p>

              <div className="flex items-center gap-4">
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
