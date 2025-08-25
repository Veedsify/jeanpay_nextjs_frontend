"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ShieldCheckIcon,
  EyeIcon,
  DocumentTextIcon,
  ClockIcon,
  UserIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { BRAND, CONTACT_INFO } from "@/constants";

interface PrivacySectionProps {
  className?: string;
}

const privacySections = [
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: UserIcon,
    content: [
      "Personal information (name, email, phone number, address)",
      "Financial information (bank account details, transaction history)",
      "Identity verification documents (government-issued ID, proof of address)",
      "Device and usage information (IP address, browser type, device ID)",
      "Location data when you use our mobile app",
      "Customer service interactions and communications",
    ],
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    icon: EyeIcon,
    content: [
      "Process transactions and provide our financial services",
      "Verify your identity and comply with regulatory requirements",
      "Prevent fraud and enhance security measures",
      "Improve our services and develop new features",
      "Send important updates about your account and transactions",
      "Provide customer support and respond to your inquiries",
      "Conduct marketing activities (with your consent)",
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    icon: GlobeAltIcon,
    content: [
      "We do not sell your personal information to third parties",
      "We share information with trusted service providers and partners",
      "We may disclose information to comply with legal obligations",
      "We share data with financial institutions to process transactions",
      "We may share information to prevent fraud or protect our rights",
      "Business transfers may include your information with proper notice",
    ],
  },
  {
    id: "data-security",
    title: "Data Security and Protection",
    icon: ShieldCheckIcon,
    content: [
      "Bank-level encryption for all data transmission and storage",
      "Multi-factor authentication and advanced security protocols",
      "Regular security audits and penetration testing",
      "Secure data centers with 24/7 monitoring",
      "Employee background checks and security training",
      "Incident response procedures for any security breaches",
    ],
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    icon: DocumentTextIcon,
    content: [
      "Access your personal information we have on file",
      "Request correction of inaccurate or incomplete data",
      "Request deletion of your personal information",
      "Object to processing of your information",
      "Data portability to transfer your information",
      "Withdraw consent for marketing communications",
      "File complaints with relevant data protection authorities",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: ClockIcon,
    content: [
      "We retain your information as long as your account is active",
      "Transaction records are kept for regulatory compliance periods",
      "Identity verification documents are retained as required by law",
      "Marketing data is retained until you opt out",
      "We securely delete information when no longer needed",
      "Some information may be retained for legal or business purposes",
    ],
  },
];

export const PrivacyPolicySection = ({
  className = "",
}: PrivacySectionProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <section className={`py-16 lg:py-32 bg-jean-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-jean-gray-900 mb-6">
            Privacy{" "}
            <span className="bg-gradient-to-r from-cyan-dark to-jean-orange bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-xl text-jean-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Your privacy is important to us. This policy explains how{" "}
            {BRAND.name} collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-jean-gray-500">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-jean-white rounded-lg p-8 border border-jean-gray-200 mb-12"
        >
          <div className="flex items-center mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-cyan-dark mr-3" />
            <h2 className="text-2xl font-bold text-jean-gray-900">
              Our Commitment to Privacy
            </h2>
          </div>
          <p className="text-jean-gray-600 leading-relaxed">
            At {BRAND.name}, we understand that trust is the foundation of our
            relationship with you. We are committed to protecting your privacy
            and handling your personal information with the highest level of
            care and security. This privacy policy outlines our practices
            regarding the collection, use, and protection of your information
            when you use our financial services.
          </p>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {privacySections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-jean-white rounded-lg border border-jean-gray-200 overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveSection(
                    activeSection === section.id ? null : section.id
                  )
                }
                className="w-full p-6 text-left hover:bg-jean-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <section.icon className="w-6 h-6 text-cyan-dark mr-4" />
                    <h3 className="text-xl font-semibold text-jean-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <motion.svg
                    animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-jean-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </div>
              </button>

              {activeSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <div className="border-t border-jean-gray-100 pt-6">
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.2,
                            delay: itemIndex * 0.05,
                          }}
                          className="flex items-start"
                        >
                          <div className="w-2 h-2 bg-jean-orange rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-jean-gray-600">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-cyan-dark to-jean-orange rounded-lg p-8 text-jean-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            Questions About Your Privacy?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            If you have any questions about this privacy policy or how we handle
            your information, please don&apos;t hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${CONTACT_INFO.support.email}`}
              className="bg-jean-white text-cyan-dark px-6 py-3 rounded-full font-semibold hover:bg-jean-gray-100 transition-colors"
            >
              Email Us: {CONTACT_INFO.support.email}
            </a>
            <a
              href={`tel:${CONTACT_INFO.support.phone}`}
              className="bg-jean-white/20 backdrop-blur text-jean-white px-6 py-3 rounded-full font-semibold hover:bg-jean-white/30 transition-colors"
            >
              Call Us: {CONTACT_INFO.support.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
