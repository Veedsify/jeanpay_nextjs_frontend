"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronDownIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import {
  MARQUEE_ITEMS,
  FEATURE_CARDS,
  CURRENCIES,
  DEFAULT_CONVERSION,
  ANIMATIONS,
} from "@/constants";
import type { Currency, MarqueeItem, FeatureCard } from "@/types";
import { LucideSendHorizonal } from "lucide-react";

interface HeroSectionProps {
  className?: string;
}

// Memoized marquee item component
const MarqueeItemComponent = memo(({ item }: { item: MarqueeItem }) => (
  <motion.div
    className="flex-shrink-0 flex items-center bg-[#F4EADDC2] rounded-full px-4 py-2 mx-2 shadow-sm"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <span
      className="mr-2 text-lg"
      role="img"
      aria-label={`Flag for ${item.text}`}
    >
      {item.flag}
    </span>
    <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
      {item.text}
    </span>
  </motion.div>
));

MarqueeItemComponent.displayName = "MarqueeItemComponent";

// Feature card component
const FeatureCardComponent = memo(
  ({ feature, index }: { feature: FeatureCard; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: ANIMATIONS.durations.slow,
        ease: ANIMATIONS.easings.easeOut,
        delay: feature.delay || index * 0.2,
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`absolute ${feature.bgColor} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-64 z-10`}
      style={{
        top: feature.position?.top ? `${feature.position.top}px` : "auto",
        left: feature.position?.left ? `${feature.position.left}px` : "auto",
        right: feature.position?.right ? `${feature.position.right}px` : "auto",
        bottom: feature.position?.bottom
          ? `${feature.position.bottom}px`
          : "auto",
      }}
      role="article"
      aria-labelledby={`feature-${index}-title`}
    >
      <h3
        id={`feature-${index}-title`}
        className="text-xl font-bold mb-2 text-gray-900"
      >
        {feature.title}
      </h3>
      <div className="flex items-center">
        <p className="text-gray-700 flex-1">{feature.subtitle}</p>
        {feature.icon && (
          <span
            className="ml-2 text-2xl"
            role="img"
            aria-label={`${feature.subtitle} icon`}
          >
            {feature.icon}
          </span>
        )}
      </div>
    </motion.div>
  ),
);

FeatureCardComponent.displayName = "FeatureCardComponent";

// Currency converter component
const CurrencyConverter = memo(() => {
  const [fromCurrency, setFromCurrency] = useState(
    DEFAULT_CONVERSION.fromCurrency,
  );
  const [toCurrency, setToCurrency] = useState(DEFAULT_CONVERSION.toCurrency);
  const [amount, setAmount] = useState(DEFAULT_CONVERSION.amount);
  const [convertedAmount] = useState(DEFAULT_CONVERSION.convertedAmount);
  const [isConverting, setIsConverting] = useState(false);

  const handleSwapCurrencies = useCallback(() => {
    setIsConverting(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setIsConverting(false);
    }, 300);
  }, [fromCurrency, toCurrency]);

  const getCurrencyData = useCallback((code: string): Currency | undefined => {
    return CURRENCIES.find((c) => c.code === code);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] max-w-[90vw] bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 z-20"
      role="region"
      aria-label="Currency converter"
    >
      {/* From Currency */}
      <div className="mb-4">
        <label
          htmlFor="from-amount"
          className="block text-left text-sm font-medium text-gray-500 mb-2"
        >
          You send
        </label>
        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4 focus-within:ring-2 focus-within:ring-orange-500">
          <input
            id="from-amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-2xl font-bold bg-transparent border-none outline-none flex-1 min-w-0"
            aria-label="Amount to send"
          />
          <button
            className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={`Change from currency, currently ${fromCurrency}`}
          >
            <span className="mr-2 text-lg">
              {getCurrencyData(fromCurrency)?.flag}
            </span>
            <span className="font-semibold">{fromCurrency}</span>
            <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Exchange Info */}
      <div className="space-y-2 text-sm text-gray-500 my-4 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={handleSwapCurrencies}
              disabled={isConverting}
              className="p-1 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Swap currencies"
            >
              <motion.div
                animate={{ rotate: isConverting ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowsRightLeftIcon className="h-4 w-4 text-gray-400" />
              </motion.div>
            </button>
            <span className="ml-2">{fromCurrency}1.00 ($1.00)</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold mx-[9px]">×</span>
            <span className="text-xs">{DEFAULT_CONVERSION.exchangeRate}</span>
          </div>
          <span>Rate</span>
        </div>
      </div>

      {/* To Currency */}
      <div>
        <label
          htmlFor="to-amount"
          className="block text-left text-sm font-medium text-gray-500 mb-2"
        >
          Recipient receives
        </label>
        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
          <span className="text-2xl font-bold text-green-600">
            {convertedAmount}
          </span>
          <button
            className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={`Change to currency, currently ${toCurrency}`}
          >
            <span className="mr-2 text-lg">
              {getCurrencyData(toCurrency)?.flag}
            </span>
            <span className="font-semibold">{toCurrency}</span>
            <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Transfer Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-label="Start transfer"
      >
        Send Money Now
      </motion.button>
    </motion.div>
  );
});

CurrencyConverter.displayName = "CurrencyConverter";

// Main Hero Section Component
export const HeroSection = memo(({ className = "" }: HeroSectionProps) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const rotatingTexts = [
    "in Nigeria.",
    "in Ghana.",
    "Instantly.",
    "with the best rates.",
    "within minutes.",
    "with JeanPay.",
    "in Togo.",
    "Ivory Coast",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const currentText = rotatingTexts[currentTextIndex];
  useEffect(() => {
    if (reducedMotion) return; // Disable rotation if reduced motion is preferred
    const interval = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % rotatingTexts.length,
      );
    }, 3000); // Change text every 3 seconds
    return () => clearInterval(interval);
  }, [reducedMotion, rotatingTexts.length]);

  return (
    <section
      className={`relative text-center px-4 py-16 sm:py-20 overflow-hidden bg-gradient-to-b from-[#FCFBF7] to-[#F8F6F0] ${className}`}
      aria-labelledby="hero-title"
    >
      {/* Main Heading */}
      <motion.h1
        id="hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-7xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-gray-900"
      >
        Send and receive money
        <br />
        <motion.span
          key={currentText}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
          className="text-orange-500 inline-block"
        >
          {currentText}
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
      >
        Fast, secure, and affordable money transfers with the best exchange
        rates.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/signup"
          className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 min-w-[200px]"
          aria-label="Download JeanPay for Android"
        >
          <LucideSendHorizonal className="mr-2 text-2xl" aria-hidden="true" />
          Get Started
        </motion.a>
      </motion.div>

      {/* Marquee */}
      <div
        className="relative w-full overflow-hidden pb-16"
        aria-label="Customer locations"
      >
        <motion.div
          className="flex"
          animate={reducedMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: reducedMotion ? 0 : 30,
            repeat: reducedMotion ? 0 : Infinity,
            repeatType: "loop",
          }}
        >
          {/* Triple the items for seamless loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
            (item, index) => (
              <MarqueeItemComponent key={`${item.id}-${index}`} item={item} />
            ),
          )}
        </motion.div>
      </div>

      {/* Interactive Visual Area */}
      <div
        className="relative max-w-6xl mx-auto h-[700px] md:h-[600px]"
        role="region"
        aria-label="Features and currency converter"
      >
        {/* Feature Cards */}
        {FEATURE_CARDS.map((feature, index) => (
          <FeatureCardComponent key={index} feature={feature} index={index} />
        ))}

        {/* Currency Converter */}
        <CurrencyConverter />
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-gray-500 mb-4">
          Trusted by 200,000+ users across Africa
        </p>
        <div className="flex justify-center items-center space-x-8 opacity-60">
          <div className="text-2xl">🔒</div>
          <div className="text-sm font-medium">Bank-level Security</div>
          <div className="text-2xl">⚡</div>
          <div className="text-sm font-medium">5-minute Transfers</div>
          <div className="text-2xl">💰</div>
          <div className="text-sm font-medium">Best Rates</div>
        </div>
      </motion.div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
