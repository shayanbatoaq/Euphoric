"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { LuxuryButton } from "../components/LuxuryButton";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. All orders over $50 receive free standard shipping.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unopened items in their original packaging. If you're not completely satisfied with your purchase, please contact our customer service team to initiate a return.",
    },
    {
      question: "Are your fragrances authentic?",
      answer:
        "Yes! Our fragrances are premium-inspired perfumes crafted with high-quality ingredients. While they are impressions of luxury scents, they are not counterfeit products. We create our own unique formulations inspired by popular fragrances.",
    },
    {
      question: "How long do the fragrances last?",
      answer:
        "Our fragrances are designed to last 6-8 hours on average, with some lasting even longer depending on your skin type and the specific scent. For best results, apply to pulse points and moisturized skin.",
    },
    {
      question: "Can I purchase gift sets?",
      answer:
        "Yes! We offer curated gift sets and also provide gift wrapping services. You can add a personalized message during checkout. Contact us for custom gift set requests.",
    },
    {
      question: "Do you offer samples?",
      answer:
        "We currently offer travel-size versions of select fragrances. Sample sets are coming soon! Sign up for our newsletter to be notified when they become available.",
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
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#D9D9D9] text-lg"
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-playfair text-4xl text-[#F5F5F5] mb-6">
                Contact Information
              </h2>
              <p className="text-[#D9D9D9] leading-relaxed mb-8">
                Have a question or need assistance? Our customer service team is
                here to help. Reach out to us through any of the following
                channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="glass p-3">
                  <Mail className="w-6 h-6 text-[#C0C0C0]" />
                </div>
                <div>
                  <h3 className="text-[#F5F5F5] mb-1">Email</h3>
                  <p className="text-[#D9D9D9]">info@euphoric.com</p>
                  <p className="text-[#D9D9D9] text-sm">support@euphoric.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="glass p-3">
                  <Phone className="w-6 h-6 text-[#C0C0C0]" />
                </div>
                <div>
                  <h3 className="text-[#F5F5F5] mb-1">Phone</h3>
                  <p className="text-[#D9D9D9]">+1 (555) 123-4567</p>
                  <p className="text-[#D9D9D9] text-sm">
                    Mon-Fri: 9AM - 6PM EST
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="glass p-3">
                  <MapPin className="w-6 h-6 text-[#C0C0C0]" />
                </div>
                <div>
                  <h3 className="text-[#F5F5F5] mb-1">Location</h3>
                  <p className="text-[#D9D9D9]">123 Luxury Lane</p>
                  <p className="text-[#D9D9D9]">New York, NY 10001</p>
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="text-[#F5F5F5] mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#D9D9D9]">Monday - Friday</span>
                  <span className="text-[#C0C0C0]">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#D9D9D9]">Saturday</span>
                  <span className="text-[#C0C0C0]">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#D9D9D9]">Sunday</span>
                  <span className="text-[#C0C0C0]">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass p-8 space-y-6">
              <div>
                <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C0C0C0] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C0C0C0] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C0C0C0] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C0C0C0] transition-colors resize-none"
                  required
                />
              </div>

              <LuxuryButton variant="primary" className="w-full">
                Send Message
              </LuxuryButton>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#D9D9D9]">
            Find answers to common questions about our fragrances
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#C0C0C0]/10 last:border-0"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
                  <span className="text-[#F5F5F5] pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-[#D9D9D9] leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>
    </div>
  );
}
