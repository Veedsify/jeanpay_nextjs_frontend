"use client";

import { ElementType, memo } from "react";
import { motion } from "framer-motion";
import {
  BanknotesIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface USDPaymentsSectionProps {
  className?: string;
}

const FeatureIcon = memo(
  ({ icon: Icon, title }: { icon: ElementType; title: string }) => (
    <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
      <Icon className="w-5 h-5 text-orange-500" />
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
  )
);

FeatureIcon.displayName = "FeatureIcon";

const USDPaymentsSection = memo(
  ({ className = "" }: USDPaymentsSectionProps) => {
    return (
      <section
        className={`py-24 px-4 text-center bg-gradient-to-br from-[#FCFBF7] to-[#F8F6F0] ${className}`}
        aria-labelledby="usd-payments-title"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <a
              href="#"
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors focus:outline-none focus:underline"
              aria-label="Learn more about USD payments"
            >
              Send and receive Naira or Cedis ›››
            </a>
            <h2
              id="usd-payments-title"
              className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-gray-900"
            >
              Send and receive Naira
              <br />
              payments with ease
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
                role="img"
                aria-label="Lightning bolts indicating speed"
              >
                ⚡️⚡️⚡️
              </motion.span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your GHS and NGN account and enjoy seamless payments, direct
              deposits, and instant transfers with competitive rates.
            </p>
          </motion.div>

          {/* Main Feature Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-[#F7F4B8] to-[#FEF3C7] rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Content Side */}
              <div className="lg:w-1/2 text-left">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900"
                >
                  Send and receive payments with your JeanPay account.
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-700 mb-6 leading-relaxed"
                >
                  Open an account in minutes and enjoy all the benefits of
                  JeanPay without the hassle.
                </motion.p>

                {/* Feature List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-3 mb-6"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Receive NGN & GHS payments directly
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Send money to any bank account
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Get paid by clients and employers
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Low fees and competitive exchange rates
                    </span>
                  </div>
                </motion.div>

                {/* Feature Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  <FeatureIcon icon={BanknotesIcon} title="NGN Payments" />
                  <FeatureIcon icon={ShieldCheckIcon} title="Secured" />
                  <FeatureIcon icon={ClockIcon} title="5 Minute Wait Day" />
                </motion.div>
              </div>

              {/* Visual Side */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative"
                >
                  {/* Main Visual Container */}
                  <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 h-64 lg:h-80 w-full rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                      <div className="absolute top-8 right-8 w-6 h-6 bg-white rounded-full"></div>
                      <div className="absolute bottom-6 left-8 w-4 h-4 bg-white rounded-full"></div>
                      <div className="absolute bottom-4 right-6 w-10 h-10 bg-white rounded-full"></div>
                    </div>

                    {/* Main Content */}
                    <div className="text-center z-10">
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-6xl mb-4"
                        role="img"
                        aria-label="Money and wallet illustration"
                      >
                        💰💳
                      </motion.div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <p className="font-bold text-green-600 text-lg">
                          ₦253,000.00
                        </p>
                        <p className="text-sm text-gray-600">
                          Available Balance
                        </p>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm"
                    >
                      <span className="text-sm">💸</span>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-8 left-6 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm"
                    >
                      <span className="text-sm">🏦</span>
                    </motion.div>
                  </div>

                  {/* Benefits Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border-2 border-orange-200"
                  >
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-500">0.5%</p>
                      <p className="text-xs text-gray-600">Low Fees</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Additional Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: "🔒",
                title: "Bank-Level Security",
                description:
                  "Your funds are protected by the same security measures used by major banks.",
              },
              {
                icon: "⚡",
                title: "Instant Transfers",
                description:
                  "Move money between your accounts instantly, 24/7, including weekends.",
              },
              {
                icon: "📱",
                title: "Mobile Friendly",
                description: "Manage your account on the go.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              >
                <div
                  className="text-3xl mb-3"
                  role="img"
                  aria-label={feature.title}
                >
                  {feature.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-16"
          >
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Open USD account with JeanPay"
            >
              Open Your JeanPay Account
            </motion.a>
          </motion.div>
        </div>
      </section>
    );
  }
);

USDPaymentsSection.displayName = "USDPaymentsSection";

export default USDPaymentsSection;
