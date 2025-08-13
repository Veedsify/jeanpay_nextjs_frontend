"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { TRANSFER_METHODS } from "@/constants";

interface InstantTransferSectionProps {
  className?: string;
}

const InstantTransferSection = memo(({ className = "" }: InstantTransferSectionProps) => {
  return (
    <section
      className={`py-24 px-4 text-center ${className}`}
      aria-labelledby="instant-transfer-title"
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
            Send & receive money ›››
          </a>
          <h2 id="instant-transfer-title" className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Instant transfers to/from
            <br />
            your crew{" "}
            <motion.span
              animate={{ rotate: [0, 20, 0] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="inline-block"
            >
              👋
            </motion.span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Send money instantly to friends and family, or get paid by anyone with our innovative transfer methods.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          {TRANSFER_METHODS.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#ECF3E9] rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{method.title}</h3>
                <span className="text-3xl">{method.icon}</span>
              </div>
              <p className="text-gray-700 mb-6">{method.description}</p>

              <div className="bg-green-100 h-40 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">{method.icon}</div>
                  <p className="text-sm text-gray-600">{method.title} Preview</p>
                </div>
              </div>

              {method.features && (
                <div className="space-y-2">
                  {method.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">Processing: {method.processingTime}</span>
                <span className="text-green-600 font-medium">{method.fee}</span>
              </div>
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
            Start Sending Money
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

InstantTransferSection.displayName = "InstantTransferSection";

export default InstantTransferSection;
