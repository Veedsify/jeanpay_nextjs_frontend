"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { TESTIMONIALS, PARTNERS, TRUST_METRICS } from "@/constants";
import type { Testimonial, TrustMetric } from "@/types";

interface TrustedBySectionProps {
  className?: string;
}

// Memoized trust card component
const TrustCard = memo(
  ({ metric, index }: { metric: TrustMetric; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className={`${metric.bgColor} rounded-3xl p-8 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300`}
    >
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{metric.title}</h3>
        <p className="text-gray-700">{metric.content}</p>
      </div>
      <div className="mt-6">
        {metric.title.includes("star") && (
          <div
            className="flex space-x-1"
            role="img"
            aria-label="4.8 out of 5 stars"
          >
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-8 h-8 ${
                  i < 4
                    ? "text-yellow-400"
                    : i === 4
                      ? "text-yellow-300"
                      : "text-gray-300"
                }`}
                fill="currentColor"
              />
            ))}
          </div>
        )}
        {metric.title.includes("support") && (
          <div className="flex -space-x-2">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="text-2xl" role="img" aria-label="Chat support">
                💬
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="text-2xl" role="img" aria-label="Phone support">
                🎧
              </span>
            </div>
          </div>
        )}
        {metric.title.includes("users") && (
          <div className="w-full h-24 bg-blue-100 rounded-lg p-2 shadow-inner">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500"></div>
              <div className="h-2 w-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full ml-2"></div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></div>
              <div className="h-2 w-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full ml-2"></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  ),
);

TrustCard.displayName = "TrustCard";

// Memoized testimonial card component
const TestimonialCard = memo(
  ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300"
    >
      <header className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden relative">
            <Image
              src={testimonial.avatar}
              alt={`${testimonial.user} profile picture`}
              fill
              className="object-cover"
              sizes="40px"
              loading="lazy"
            />
          </div>
          <div>
            <div className="flex items-center">
              <p className="font-bold text-sm text-gray-900">
                {testimonial.user}
              </p>
              {testimonial.verified && (
                <span className="ml-1 text-blue-500" title="Verified user">
                  ✓
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">@{testimonial.handle}</p>
          </div>
        </div>
        <button
          className="text-gray-400 text-xl font-light hover:text-gray-600 transition-colors"
          aria-label="Close testimonial"
        >
          ×
        </button>
      </header>

      <blockquote className="text-gray-800 text-sm flex-grow">
        &quot;{testimonial.text}&quot;
      </blockquote>

      {testimonial.rating && (
        <footer className="mt-3 flex items-center">
          <div
            className="flex space-x-0.5"
            role="img"
            aria-label={`${testimonial.rating} out of 5 stars`}
          >
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-3 h-3 ${
                  i < testimonial.rating! ? "text-yellow-400" : "text-gray-200"
                }`}
                fill="currentColor"
              />
            ))}
          </div>
        </footer>
      )}
    </motion.article>
  ),
);

TestimonialCard.displayName = "TestimonialCard";

// Memoized partner logo component
const PartnerLogo = memo(
  ({ partner, index }: { partner: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center justify-center"
    >
      <span className="text-lg font-bold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
        {partner}
      </span>
    </motion.div>
  ),
);

PartnerLogo.displayName = "PartnerLogo";

const TrustedBySection = memo(({ className = "" }: TrustedBySectionProps) => {
  // Memoize filtered data to prevent unnecessary recalculations
  const displayedTestimonials = useMemo(() => TESTIMONIALS.slice(0, 4), []);

  const displayedPartners = useMemo(
    () => PARTNERS.slice(0, 6).map((p) => p.name),
    [],
  );

  return (
    <section
      className={`py-24 px-4 bg-[#ECF3E9] ${className}`}
      aria-labelledby="trusted-by-title"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2
            id="trusted-by-title"
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
          >
            Trusted by 200,000+ people
            <br />
            across Africa
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust JeanPay for their
            cross-border money transfers and financial needs.
          </p>
        </motion.div>

        {/* Trust Metrics Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
          {TRUST_METRICS.map((metric, index) => (
            <TrustCard key={metric.title} metric={metric} index={index} />
          ))}
        </div>

        {/* Customer Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-900">
            What our customers say
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-medium">
            Backed by the best
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {displayedPartners.map((partner, index) => (
              <PartnerLogo key={partner} partner={partner} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16"
        >
          <p className="text-gray-600 mb-6">
            Ready to join thousands of satisfied customers?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label="Start using JeanPay today"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full"></div>
      </div>
    </section>
  );
});

TrustedBySection.displayName = "TrustedBySection";

export default TrustedBySection;
