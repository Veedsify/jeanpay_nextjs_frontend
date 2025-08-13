"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { SAVINGS_PRODUCTS } from "@/constants";

interface SavingsSectionProps {
  className?: string;
}

const SavingsSection = memo(({ className = "" }: SavingsSectionProps) => {
  return (
    <section
      className={`py-24 px-4 text-center ${className}`}
      aria-labelledby="savings-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <a href="#" className="text-orange-500 font-semibold">
            Save smarter ›››
          </a>
          <h2 id="savings-title" className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Earn daily in dollars on
            <br />
            your savings. Up to <span className="text-orange-500">7% p.a.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from multiple savings options designed to help your money grow faster than traditional banks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          {SAVINGS_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${product.bgColor} rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{product.title}</h3>
                <span className="text-2xl">{product.icon}</span>
              </div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="bg-white/50 h-40 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{product.rate}</div>
                  <p className="text-sm text-gray-600">Annual Interest Rate</p>
                </div>
              </div>
              {product.features && (
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Start Saving Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

SavingsSection.displayName = "SavingsSection";

export default SavingsSection;
