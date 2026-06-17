"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Sparkles, Heart, Award, Users } from "lucide-react";

export function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: "Premium Quality",
      description:
        "Every fragrance is crafted with the finest ingredients, ensuring exceptional quality and longevity.",
    },
    {
      icon: Heart,
      title: "Passion for Perfume",
      description:
        "Our love for fragrance drives us to create scents that inspire and captivate.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for perfection in every bottle, delivering luxury at accessible prices.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We're committed to providing an exceptional experience.",
    },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-20">
      {/* Hero */}
      <section className="gradient-black-silver py-16 px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] mb-6"
          >
            About Euphoric
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#D9D9D9] text-lg leading-relaxed"
          >
            Where luxury meets accessibility in the world of fine fragrances
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5]">
              Our Story
            </h2>
            <p className="text-[#D9D9D9] leading-relaxed">
              Euphoric was born from a simple belief: everyone deserves to
              experience luxury. We recognized that high-quality fragrances
              shouldn't be exclusive to those who can afford designer prices.
            </p>
            <p className="text-[#D9D9D9] leading-relaxed">
              Our journey began with a passion for perfumery and a commitment to
              democratizing luxury. We've spent years studying the finest
              fragrances, understanding their compositions, and recreating that
              same level of sophistication in our own collections.
            </p>
            <p className="text-[#D9D9D9] leading-relaxed">
              Today, Euphoric stands as a testament to quality, craftsmanship,
              and accessibility. Each fragrance in our collection is a
              masterpiece, designed to evoke emotion, create memories, and leave
              a lasting impression.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] glow-silver"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1763987300634-7b0822cbf390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              alt="Euphoric Story"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Collections Explanation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Men's Collection",
              description:
                "Bold, sophisticated scents designed for the modern man. From fresh aquatics to deep woody notes, our men's collection embodies strength and confidence.",
              image:
                "https://images.unsplash.com/photo-1769625310883-6c87ed402d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
            },
            {
              title: "Women's Collection",
              description:
                "Elegant, feminine fragrances that celebrate beauty and grace. Our women's collection features delicate florals, warm vanillas, and captivating orientals.",
              image:
                "https://images.unsplash.com/photo-1760113559708-84e7a148ec68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
            },
            {
              title: "Unisex Collection",
              description:
                "Versatile scents that transcend traditional boundaries. These fragrances are designed for anyone who appreciates quality and sophistication.",
              image:
                "https://images.unsplash.com/photo-1632495112970-30ce8340c2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
            },
          ].map((collection, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass overflow-hidden hover-lift"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-playfair text-2xl text-[#F5F5F5]">
                  {collection.title}
                </h3>
                <p className="text-[#D9D9D9] text-sm leading-relaxed">
                  {collection.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
            Our Values
          </h2>
          <p className="text-[#D9D9D9] max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 text-center hover-lift"
            >
              <value.icon className="w-12 h-12 text-[#C0C0C0] mx-auto mb-4" />
              <h3 className="text-[#F5F5F5] text-xl mb-3">{value.title}</h3>
              <p className="text-[#D9D9D9] text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1C1C1E] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-[#C0C0C0] text-6xl font-playfair mb-4">"</div>
            <p className="font-playfair text-3xl sm:text-4xl text-[#F5F5F5] italic leading-relaxed">
              Fragrance is the invisible accessory that leaves a lasting
              impression
            </p>
            <div className="h-px w-24 bg-[#C0C0C0] mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5]">
            Our Mission
          </h2>
          <p className="text-[#D9D9D9] text-lg leading-relaxed">
            To create exceptional fragrances that empower individuals to express
            their unique identity through scent. We're committed to delivering
            luxury-quality perfumes at accessible prices, ensuring that everyone
            can experience the joy and confidence that comes with wearing a
            beautiful fragrance.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
