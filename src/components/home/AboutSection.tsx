"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  CheckCircleIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { BRAND } from "@/constants";

interface AboutSectionProps {
  className?: string;
}

const stats = [
  { label: "Countries Served", value: "11+", icon: GlobeAltIcon },
  { label: "Active Users", value: "200K+", icon: UserGroupIcon },
  { label: "Transactions Daily", value: "10K+", icon: CheckCircleIcon },
  { label: "Years in Business", value: "3+", icon: LightBulbIcon },
];

const values = [
  {
    title: "Security First",
    description:
      "Your money and data are protected by bank-level security and encryption.",
    icon: ShieldCheckIcon,
    color: "text-cyan-dark",
  },
  {
    title: "Transparency",
    description:
      "No hidden fees. We show you exactly what you'll pay before you send.",
    icon: CheckCircleIcon,
    color: "text-jean-green-600",
  },
  {
    title: "Innovation",
    description: "We're constantly improving our platform to serve you better.",
    icon: LightBulbIcon,
    color: "text-jean-orange",
  },
  {
    title: "Community",
    description:
      "We believe in connecting people and communities across borders.",
    icon: HeartIcon,
    color: "text-cyan-dark",
  },
];

export const AboutSection = ({ className = "" }: AboutSectionProps) => {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  return (
    <section className={`py-16 lg:py-24 bg-jean-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-jean-gray-900 mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-jean-orange to-cyan-dark bg-clip-text text-transparent">
              {BRAND.name}
            </span>
          </h1>
          <p className="text-xl text-jean-gray-600 max-w-3xl mx-auto leading-relaxed">
            {BRAND.description}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-jean-white rounded-lg p-6 text-center border border-jean-gray-200"
            >
              <stat.icon className="w-8 h-8 text-jean-orange mx-auto mb-3" />
              <div className="text-3xl font-bold text-jean-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-jean-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-jean-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-jean-gray-600">
              <p>
                Founded in 2021, JeanPay was born from a simple yet powerful
                idea: money transfers should be fast, affordable, and accessible
                to everyone across Africa and beyond.
              </p>
              <p>
                We saw the challenges faced by millions of people trying to send
                money to their loved ones - high fees, slow processing times,
                and complex procedures. We knew there had to be a better way.
              </p>
              <p>
                Today, we&apos;re proud to serve over 200,000 customers across
                11+ countries, facilitating thousands of transactions daily and
                helping families, businesses, and communities stay connected
                through secure, instant money transfers.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-jean-orange to-cyan-dark rounded-lg p-8 text-jean-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg opacity-90">
                To make financial services accessible, affordable, and secure
                for everyone across Africa and the diaspora, empowering people
                to build better financial futures.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-jean-gray-900 text-center mb-12">
            Our Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setActiveValue(index)}
                onMouseLeave={() => setActiveValue(null)}
                className={`bg-jean-white rounded-lg p-6 border border-jean-gray-200 hover:border-jean-orange transition-all duration-300 cursor-pointer ${
                  activeValue === index ? "transform scale-105" : ""
                }`}
              >
                <value.icon className={`w-10 h-10 ${value.color} mb-4`} />
                <h3 className="text-xl font-semibold text-jean-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-jean-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-jean-gray-900 mb-6">
            Built by a Global Team
          </h2>
          <p className="text-xl text-jean-gray-600 max-w-3xl mx-auto mb-8">
            Our diverse team of engineers, designers, and financial experts work
            around the clock to bring you the best financial services across
            borders.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-jean-orange to-cyan-dark text-jean-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200"
          >
            <span>Join Our Team</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
