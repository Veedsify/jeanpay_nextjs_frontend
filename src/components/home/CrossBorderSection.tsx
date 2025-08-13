"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { MONEY_DESTINATIONS } from "@/constants";

interface CrossBorderSectionProps {
  className?: string;
}

const CrossBorderSection = memo(({ className = "" }: CrossBorderSectionProps) => {
  return (
    <section
      className={`py-24 px-4 text-center ${className}`}
      aria-labelledby="cross-border-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <a href="#" className="text-orange-500 font-semibold">
            Move money across borders ›››
          </a>
          <h2 id="cross-border-title" className="text-4xl md:text-5xl font-bold mt-4 mb-12">
            Send money across Africa
            <br />
            in minutes
            <motion.span
              animate={{
                scale: [1, 1.2, 1, 1.2, 1],
                rotate: [-5, 5, -5, 5, -5],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="inline-block ml-2 text-4xl"
            >
              ⚡️⚡️⚡️
            </motion.span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {MONEY_DESTINATIONS.map((dest, index) => (
            <motion.div
              key={dest.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4 hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl">{dest.flag}</span>
              <span className="font-medium text-gray-700">Send to {dest.country}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

CrossBorderSection.displayName = "CrossBorderSection";

export default CrossBorderSection;
