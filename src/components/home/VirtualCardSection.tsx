"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface VirtualCardSectionProps {
  className?: string;
}

const VirtualCardSection = memo(({ className = "" }: VirtualCardSectionProps) => {
  const cardFeatures = [
    {
      title: "Request your virtual dollar card in minutes",
      bgColor: "bg-[#B6CCF0]",
      icon: "💳"
    },
    {
      title: "Spend safely online with your Mastercard",
      bgColor: "bg-[#ECF3E9]",
      icon: "🔒"
    },
    {
      title: "Customize your card to match your taste",
      bgColor: "bg-[#F7F4B8]",
      icon: "🎨"
    }
  ];

  return (
    <section
      className={`py-24 px-4 text-center ${className}`}
      aria-labelledby="virtual-card-title"
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
            Spend globally ›››
          </a>
          <h2 id="virtual-card-title" className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Shop online, worry-free with
            <br />
            your JeanPay Card
            <span className="inline-block ml-2 text-4xl">💳</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant access to a virtual USD card and shop securely at millions of merchants worldwide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {cardFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`${feature.bgColor} rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300`}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800">{feature.title}</h3>
              <div className="bg-white/50 h-48 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <p className="text-sm text-gray-600">Virtual Card Preview</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Get Your Virtual Card
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

VirtualCardSection.displayName = "VirtualCardSection";

export default VirtualCardSection;
