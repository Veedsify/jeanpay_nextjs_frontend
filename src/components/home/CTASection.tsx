"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/constants";
import { LucideSendHorizontal } from "lucide-react";

interface CTASectionProps {
  className?: string;
}

const CTASection = memo(({ className = "" }: CTASectionProps) => {
  return (
    <section
      className={`py-24 px-4 text-center bg-gradient-to-br from-[#FCFBF7] to-[#F8F6F0] ${className}`}
      aria-labelledby="cta-title"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <a
            href="#"
            className="text-orange-500 font-semibold hover:text-orange-600 transition-colors focus:outline-none focus:underline"
          >
            Ready to make money move? ›››
          </a>
          <h2
            id="cta-title"
            className="text-5xl md:text-7xl font-bold mt-4 mb-6 text-gray-900"
          >
            Get started with {BRAND.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join over 200,000 users across Africa who trust {BRAND.name} for
            fast, secure, and affordable money transfers.
          </p>
        </motion.div>

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/signup"
            className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 min-w-[220px]"
            aria-label="Download JeanPay for Android"
          >
            <LucideSendHorizontal
              className="mr-3 text-2xl"
              aria-hidden="true"
            />
            Get Stated{" "}
          </motion.a>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: "⚡",
              title: "5-Minute Transfers",
              description: "Send money across Africa in under 5 minutes",
            },
            {
              icon: "💰",
              title: "Best Exchange Rates",
              description:
                "Get the most value for your money with our competitive rates",
            },
            {
              icon: "🔒",
              title: "Bank-Level Security",
              description:
                "Your money and data are protected with enterprise-grade security",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="text-3xl mb-3"
                role="img"
                aria-label={feature.title}
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-8 mb-4 opacity-70">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <span className="text-sm font-medium text-gray-600">
                4.8/5 Rating
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">👥</span>
              <span className="text-sm font-medium text-gray-600">
                200k+ Users
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌍</span>
              <span className="text-sm font-medium text-gray-600">
                11+ Countries
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Trusted by users across Africa • Available 24/7 • Licensed and
            Regulated
          </p>
        </motion.div>

        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-20 blur-2xl"></div>
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = "CTASection";

export default CTASection;
