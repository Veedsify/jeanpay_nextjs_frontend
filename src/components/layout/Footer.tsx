"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BRAND, SOCIAL_LINKS, LEGAL_LINKS, CONTACT_INFO } from "@/constants";

interface FooterProps {
  className?: string;
}

const Footer = memo(({ className = "" }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "COMPANY",
      links: [{ label: "About Us", href: "/about" }],
    },
    {
      title: "SUPPORT",
      links: [
        { label: "Help Center", href: "/contact" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Privacy Policy", href: LEGAL_LINKS.privacy },
        { label: "Terms of Service", href: LEGAL_LINKS.terms },
      ],
    },
  ];

  return (
    <footer
      className={`bg-[#FCFBF7] pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 ${className}`}
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 lg:col-span-2"
          >
            <Link
              href="/"
              className="flex items-center group mb-4"
              aria-label={`${BRAND.name} - Go to homepage`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors"
              >
                {BRAND.name}
              </motion.div>
            </Link>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {BRAND.tagline}. Fast, secure, and affordable money transfers
              across Africa and the US.
            </p>

            {/* Contact Information */}
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-orange-500 hover:text-orange-600 transition-colors focus:outline-none focus:underline"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div>
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-orange-500 hover:text-orange-600 transition-colors focus:outline-none focus:underline"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div>
                <span className="font-medium">Address:</span>
                <br />
                <span className="text-gray-500">{CONTACT_INFO.address}</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    <span className="text-lg">
                      {social.platform === "Instagram" && "📷"}
                      {social.platform === "Twitter" && "🐦"}
                      {social.platform === "LinkedIn" && "💼"}
                      {social.platform === "TikTok" && "🎵"}
                      {social.platform === "YouTube" && "📺"}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer Navigation Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + sectionIndex * 0.1 }}
              className="col-span-1"
            >
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.label}>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + sectionIndex * 0.1 + linkIndex * 0.05,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-orange-500 transition-colors focus:outline-none focus:text-orange-500"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Security & Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 sm:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-lg" role="img" aria-label="Security">
                  🔒
                </span>
                <span className="text-xs text-gray-500">256-bit SSL</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg" role="img" aria-label="Licensed">
                  📋
                </span>
                <span className="text-xs text-gray-500">
                  Licensed & Regulated
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg" role="img" aria-label="FDIC Insured">
                  🏛️
                </span>
                <span className="text-xs text-gray-500">FDIC Insured</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500">Powered by</span>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-gray-600">
                  MASTERCARD
                </span>
                <span className="text-xs font-semibold text-gray-600">
                  SWIFT
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Legal Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-200"
        >
          <div className="text-xs text-gray-500 leading-relaxed space-y-4">
            <p>
              The content on this website is for informational purposes only and
              does not constitute financial, investment, or legal advice. Please
              conduct your own research and consult with a professional
              financial advisor before making any investment decisions. All
              information provided is provided in good faith, however we make no
              representation or warranty of any kind, express or implied,
              regarding the accuracy, adequacy, validity, reliability,
              availability or completeness of any information on this website,
              our {BRAND.name} mobile application or our associated social media
              pages.
            </p>

            <p>
              {BRAND.name} is a financial technology company, not a bank.
              Banking services are provided by our partner banks. Your{" "}
              {BRAND.name} account and routing number are issued by our partner
              bank. Deposits are FDIC insured up to applicable limits.
            </p>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-sm text-gray-500">
            &copy; {currentYear} {BRAND.name} Inc. All rights reserved.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-sm text-gray-500 mt-2"
          >
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="text-red-500"
              role="img"
              aria-label="love"
            >
              ❤️
            </motion.span>{" "}
            in Lagos{" "}
            <Link
              className="font-black text-jean-orange"
              href={"/https://github.com/Veedsify"}
            >
              by Veedsify
            </Link>
            , Available{" "}
            <span role="img" aria-label="worldwide">
              🌍
            </span>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
