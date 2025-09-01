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
    id: "introduction",
    title: "Introduction",
    icon: UserIcon,
    content: [
      "JeanPay is committed to protecting your privacy.",
      "This policy explains what we collect, how we use it, and how we keep it safe.",
    ],
  },
  {
    id: "data-collection",
    title: "Data We Collect",
    icon: DocumentTextIcon,
    content: [
      "Personal Information: name, email, phone number.",
      "Financial Information: transaction history, bank details.",
      "Technical Data: IP address, device, and usage data.",
    ],
  },
  {
    id: "data-use",
    title: "How We Use Data",
    icon: EyeIcon,
    content: [
      "Provide payment and transfer services.",
      "Prevent fraud and secure accounts.",
      "Comply with AML and financial laws.",
      "Improve JeanPay’s app and services.",
      "JeanPay never sells your data.",
    ],
  },
  {
    id: "data-sharing",
    title: "Sharing of Data",
    icon: GlobeAltIcon,
    content: [
      "JeanPay may share data with:",
      "Banks & financial institutions (transaction settlement).",
      "Payment partners (service delivery).",
      "Regulators & authorities (legal compliance).",
      "As legally required (e.g., investigations).",
      "We do not sell data to advertisers.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: ShieldCheckIcon,
    content: [
      "Encryption for sensitive data.",
      "Access controls for authorized staff only.",
      "Monitoring systems to detect fraud.",
      "Industry standards for compliance.",
    ],
  },
  {
    id: "user-rights",
    title: "User Rights",
    icon: UserIcon,
    content: [
      "Request access to your data.",
      "Correct inaccurate details.",
      "Request deletion (where legally allowed).",
      "Contact us at Jeanpayafrica@gmail.com to exercise your rights.",
    ],
  },
  {
    id: "cookies-tracking",
    title: "Cookies & Tracking",
    icon: EyeIcon,
    content: [
      "JeanPay uses cookies/analytics to:",
      "Enhance performance.",
      "Understand usage.",
      "Improve features.",
      "You can disable cookies, but some features may not work.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: ClockIcon,
    content: [
      "Active accounts: data retained for as long as account exists.",
      "Closed accounts: some data retained for legal/regulatory compliance.",
      "Once no longer needed, data is securely deleted.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    icon: GlobeAltIcon,
    content: [
      "If data leaves Nigeria or Ghana, JeanPay ensures:",
      "Encryption and safeguards.",
      "Legal compliance.",
      "Use of trusted partners only.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children’s Privacy",
    icon: ShieldCheckIcon,
    content: [
      "JeanPay is not for users under 18.",
      "We do not knowingly collect minors’ data.",
      "Parents may contact us to request deletion.",
    ],
  },
  {
    id: "policy-changes",
    title: "Changes to Policy",
    icon: DocumentTextIcon,
    content: [
      "JeanPay may update this Privacy Policy and will notify users through the app, website, or email.",
      "Continued use means acceptance.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    icon: UserIcon,
    content: [
      "For questions, complaints, or data requests:",
      "Email: Jeanpayafrica@gmail.com",
      "Phone/WhatsApp: +233 538 994 763 / +234 816 842 8010",
    ],
  },
];

export const PrivacyPolicySection = ({
  className = "",
}: PrivacySectionProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <main className={`pt-32 pb-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6">
            Privacy <span className="text-cyan-dark">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Your privacy is important to us. This policy explains how{" "}
            {BRAND.name} collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-gray-500">
            Last updated:{" "}
            {new Date("08-31-2025").toLocaleDateString("en-US", {
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
          className="bg-[#F4EADDC2] rounded-lg p-8 mb-12"
        >
          <div className="flex items-center mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-cyan-dark mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">
              Our Commitment to Privacy
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
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
              className="bg-[#F4EADDC2] rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveSection(
                    activeSection === section.id ? null : section.id,
                  )
                }
                className="w-full p-6 text-left hover:bg-white/50 transition-colors focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <section.icon className="w-6 h-6 text-cyan-dark mr-4" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      {section.title}
                    </h3>
                  </div>
                  <motion.svg
                    animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-gray-600"
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
                  <div className="border-t border-white pt-6">
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
                          <span className="text-gray-600">{item}</span>
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
          className="mt-16 bg-cyan-dark rounded-lg p-8 text-white text-center"
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
              className="bg-white text-cyan-dark px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Us: {CONTACT_INFO.support.email}
            </a>
            <a
              href={`tel:${CONTACT_INFO.support.phone}`}
              className="bg-jean-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              Call Us: {CONTACT_INFO.support.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
