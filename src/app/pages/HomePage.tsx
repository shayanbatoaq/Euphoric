"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { LuxuryButton } from "../components/LuxuryButton";
import { ProductCard } from "../components/ProductCard";
import { CategoryCard } from "../components/CategoryCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Sparkles, Clock, Award, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const featuredProducts = [
  {
    id: "1",
    name: "Noir Essence",
    category: "Men",
    notes: "Bergamot, Sandalwood, Amber",
    price: 89,
    image: "https://images.unsplash.com/photo-1769625310883-6c87ed402d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    id: "2",
    name: "Velvet Rose",
    category: "Women",
    notes: "Rose, Jasmine, Vanilla",
    price: 95,
    image: "https://images.unsplash.com/photo-1760113559708-84e7a148ec68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
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
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    rating: 5,
    text: "Euphoric has completely transformed my fragrance collection. The quality is unmatched and the scents last all day.",
  },
  {
    name: "James Rodriguez",
    rating: 5,
    text: "I've never experienced such luxurious fragrances at this price point. Absolutely worth every penny.",
  },
  {
    name: "Emma Chen",
    rating: 5,
    text: "The attention to detail in every bottle is remarkable. These are truly premium-inspired fragrances.",
  },
];

export function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-black-silver overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 gradient-radial-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <span className="text-xs tracking-widest uppercase text-[#C0C0C0]">
                Luxury Perfume Impressions
              </span>
              <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] leading-tight">
                Crafted to Leave an{" "}
                <span className="text-[#C0C0C0] italic">Impression</span>
              </h1>
              <p className="text-[#D9D9D9] text-lg leading-relaxed max-w-lg">
                Experience the art of premium-inspired fragrances. Euphoric
                offers luxurious scents for men, women, and unisex — designed
                for those who appreciate elegance and sophistication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <LuxuryButton variant="primary">Shop Collection</LuxuryButton>
                </Link>
                <Link href="/about">
                  <LuxuryButton variant="secondary">
                    Explore Categories
                  </LuxuryButton>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square glow-silver">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                  alt="Luxury Perfume"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
              Shop by Identity
            </h2>
            <p className="text-[#D9D9D9] max-w-2xl mx-auto">
              Discover fragrances tailored to your unique essence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <CategoryCard
              title="Men"
              image="https://images.unsplash.com/photo-1769625310883-6c87ed402d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              link="/shop"
            />
            <CategoryCard
              title="Women"
              image="https://images.unsplash.com/photo-1760113559708-84e7a148ec68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              link="/shop"
            />
            <CategoryCard
              title="Unisex"
              image="https://images.unsplash.com/photo-1632495112970-30ce8340c2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              link="/shop"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1C1C1E]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
              Featured Fragrances
            </h2>
            <p className="text-[#D9D9D9] max-w-2xl mx-auto">
              Handpicked selections from our premium collection
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <LuxuryButton variant="secondary">View All Products</LuxuryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763987300634-7b0822cbf390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                alt="Brand Story"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-xs tracking-widest uppercase text-[#C0C0C0]">
                Our Story
              </span>
              <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5]">
                The Euphoric Experience
              </h2>
              <p className="text-[#D9D9D9] leading-relaxed">
                At Euphoric, we believe that fragrance is more than a scent —
                it's an expression of identity, elegance, and sophistication.
                Each bottle is carefully crafted to capture the essence of
                luxury, offering premium-inspired fragrances that rival the
                world's most prestigious brands.
              </p>
              <p className="text-[#D9D9D9] leading-relaxed">
                Our mission is to make luxury accessible without compromising on
                quality, ensuring that every spray leaves a lasting impression.
              </p>
              <Link href="/about">
                <LuxuryButton variant="secondary">Learn More</LuxuryButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1C1C1E]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5]">
              Why Choose Euphoric
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Long-Lasting",
                description:
                  "Our fragrances are designed to last throughout the day",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description:
                  "Inspired by luxury brands, crafted with excellence",
              },
              {
                icon: Sparkles,
                title: "Versatile",
                description: "Perfect for any occasion, from daily to luxury",
              },
              {
                icon: Heart,
                title: "Elegant",
                description: "Sophisticated scents for the discerning individual",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 text-center hover-lift"
              >
                <feature.icon className="w-12 h-12 text-[#C0C0C0] mx-auto mb-4" />
                <h3 className="text-[#F5F5F5] text-xl mb-2">{feature.title}</h3>
                <p className="text-[#D9D9D9] text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5]">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="relative">
            <div className="glass p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#C0C0C0] fill-[#C0C0C0]"
                    />
                  )
                )}
              </div>
              <p className="text-[#F5F5F5] text-lg sm:text-xl mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <p className="text-[#C0C0C0] tracking-widest uppercase text-sm">
                {testimonials[currentTestimonial].name}
              </p>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 text-[#C0C0C0] hover:text-[#F5F5F5] transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 text-[#C0C0C0] hover:text-[#F5F5F5] transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1C1C1E]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
              Gallery
            </h2>
            <p className="text-[#D9D9D9]">
              Follow us @euphoric for more inspiration
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1709662217788-6a8a1b31562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
              "https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
              "https://images.unsplash.com/photo-1639396637739-5ff5f7075394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
              "https://images.unsplash.com/photo-1773527142299-59863d536e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
              "https://images.unsplash.com/photo-1737424065355-ead2678f3dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
              "https://images.unsplash.com/photo-1765572354938-b88b9d7244cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square overflow-hidden group"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 sm:p-12 text-center"
          >
            <h2 className="font-playfair text-3xl sm:text-4xl text-[#F5F5F5] mb-4">
              Join Our Exclusive Circle
            </h2>
            <p className="text-[#D9D9D9] mb-8 max-w-2xl mx-auto">
              Subscribe to receive exclusive offers, new arrivals, and fragrance
              tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#0A0A0A] border border-[#C0C0C0]/30 px-6 py-3 text-[#F5F5F5] placeholder:text-[#D9D9D9]/50 focus:outline-none focus:border-[#C0C0C0]"
              />
              <LuxuryButton variant="primary">Subscribe</LuxuryButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
