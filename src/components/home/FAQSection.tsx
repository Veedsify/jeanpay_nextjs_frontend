"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { FAQS } from "@/constants";
import type { FAQ } from "@/types";

interface FAQSectionProps {
  className?: string;
}

interface FAQItemProps {
  faq: FAQ;
  index: number;
}

const FAQItem = memo(({ faq, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#ECF3E9] rounded-2xl mb-4 overflow-hidden"
    >
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center p-6 text-left hover:bg-green-50 transition-colors focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className="text-lg font-semibold text-gray-800 pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center flex-shrink-0 bg-white"
        >
          {isOpen ? (
            <MinusIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <PlusIcon className="w-5 h-5 text-gray-600" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-700 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FAQItem.displayName = "FAQItem";

const FAQSection = memo(({ className = "" }: FAQSectionProps) => {
  return (
    <section className={`py-24 px-4 ${className}`} aria-labelledby="faq-title">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <a
            href="#"
            className="text-orange-500 font-semibold hover:text-orange-600 transition-colors focus:outline-none focus:underline"
          >
            Any questions? ›››
          </a>
          <h2
            id="faq-title"
            className="text-5xl md:text-7xl font-bold mt-4 mb-6 text-gray-900"
          >
            FAQs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers. Find everything you need to
            know about JeanPay.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} index={index} />
          ))}
        </div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 text-center bg-gray-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you 24/7. Get in touch and
            we&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Contact Support
            </motion.button>
            <motion.a
              href="mailto:hello@jeanpay.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors focus:outline-none focus:underline"
            >
              hello@jeanpay.com
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

FAQSection.displayName = "FAQSection";

export default FAQSection;
