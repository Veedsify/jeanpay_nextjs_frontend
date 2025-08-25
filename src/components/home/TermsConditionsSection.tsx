"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  DocumentTextIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { BRAND, CONTACT_INFO } from "@/constants";

interface TermsSectionProps {
  className?: string;
}

const termsSections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: DocumentTextIcon,
    content: [
      "By using JeanPay services, you agree to be bound by these terms and conditions",
      "These terms apply to all users of our platform and services",
      "We may update these terms from time to time with notice to users",
      "Continued use of our services constitutes acceptance of any updates",
      "If you disagree with any terms, you must discontinue use of our services",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility and Account Requirements",
    icon: UserGroupIcon,
    content: [
      "You must be at least 18 years old to use our services",
      "You must provide accurate and complete information during registration",
      "You are responsible for maintaining the security of your account",
      "One person may only maintain one account unless otherwise authorized",
      "We reserve the right to suspend or terminate accounts that violate our terms",
      "Identity verification is required for all users as per regulatory requirements",
    ],
  },
  {
    id: "services",
    title: "Description of Services",
    icon: CurrencyDollarIcon,
    content: [
      "Money transfer services between supported countries and regions",
      "Virtual USD cards for online and offline transactions",
      "Savings accounts with competitive interest rates",
      "Currency exchange services at competitive rates",
      "Account management through our mobile and web applications",
      "Customer support services during business hours",
      "Additional services as we may introduce from time to time",
    ],
  },
  {
    id: "fees",
    title: "Fees and Charges",
    icon: ScaleIcon,
    content: [
      "All applicable fees will be clearly displayed before you complete a transaction",
      "Fees may vary based on transfer amount, destination, and payment method",
      "Currency exchange rates are updated regularly and shown at time of transaction",
      "We reserve the right to modify our fee structure with advance notice",
      "Some partner institutions may charge additional fees not controlled by JeanPay",
      "Refunds of fees are at our discretion and subject to our refund policy",
    ],
  },
  {
    id: "prohibited-activities",
    title: "Prohibited Uses and Activities",
    icon: ExclamationTriangleIcon,
    content: [
      "Using our services for any illegal or unauthorized purpose",
      "Money laundering, terrorist financing, or other criminal activities",
      "Fraudulent transactions or identity theft",
      "Attempting to breach our security systems or access unauthorized data",
      "Creating multiple accounts to circumvent limits or restrictions",
      "Using our services if you are located in a restricted jurisdiction",
      "Violating any applicable laws or regulations in your jurisdiction",
    ],
  },
  {
    id: "transaction-limits",
    title: "Transaction Limits and Processing",
    icon: ClockIcon,
    content: [
      "Daily, monthly, and yearly transaction limits may apply to your account",
      "Limits may be adjusted based on verification level and transaction history",
      "Processing times vary by destination and may be affected by local banking hours",
      "We reserve the right to delay or reject transactions for security or compliance reasons",
      "Failed transactions will be refunded according to our refund policy",
      "Exchange rates are locked at the time of transaction initiation",
    ],
  },
  {
    id: "compliance",
    title: "Regulatory Compliance and AML",
    icon: ShieldCheckIcon,
    content: [
      "We comply with all applicable anti-money laundering (AML) regulations",
      "Know Your Customer (KYC) verification is required for all users",
      "We may request additional documentation to verify your identity",
      "Suspicious transactions will be reported to relevant authorities",
      "We cooperate fully with law enforcement and regulatory investigations",
      "Compliance with sanctions lists and restricted party screening",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: GlobeAltIcon,
    content: [
      "Our liability is limited to the maximum extent permitted by law",
      "We are not liable for delays caused by third-party service providers",
      "Force majeure events may affect service availability without liability",
      "We are not responsible for losses due to user error or negligence",
      "Maximum liability for any claim is limited to the transaction amount",
      "We provide services &quot;as is&quot; without warranties of any kind",
    ],
  },
];

export const TermsConditionsSection = ({
  className = "",
}: TermsSectionProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <section className={`py-16 lg:py-24 bg-jean-gray-50 ${className}`}>
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
            Terms &{" "}
            <span className="bg-gradient-to-r from-cyan-dark to-jean-orange bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>
          <p className="text-xl text-jean-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Please read these terms and conditions carefully before using{" "}
            {BRAND.name} services. These terms govern your use of our platform
            and services.
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
          className="bg-white rounded-2xl p-8 shadow-lg mb-12"
        >
          <div className="flex items-center mb-6">
            <ScaleIcon className="w-8 h-8 text-indigo-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Legal Agreement
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            These Terms and Conditions (&quot;Terms&quot;) constitute a legal
            agreement between you and {BRAND.name}
            (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) regarding your
            use of our financial services platform. By creating an account or
            using our services, you acknowledge that you have read, understood,
            and agree to be bound by these Terms and our Privacy Policy.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {termsSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveSection(
                    activeSection === section.id ? null : section.id
                  )
                }
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <section.icon className="w-6 h-6 text-indigo-500 mr-4" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <motion.svg
                    animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-gray-400"
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
                  <div className="border-t border-gray-100 pt-6">
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
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0" />
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

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl"
        >
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-amber-600 mr-3" />
            <h3 className="text-lg font-semibold text-amber-800">
              Important Notice
            </h3>
          </div>
          <p className="text-amber-700">
            These terms may be updated from time to time. We will notify users
            of significant changes via email or through our platform. Your
            continued use of our services after such notification constitutes
            acceptance of the updated terms.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            If you have any questions about these terms and conditions or need
            clarification on any points, our legal team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:legal@${BRAND.email.split("@")[1]}`}
              className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Legal Team: legal@{BRAND.email.split("@")[1]}
            </a>
            <a
              href={`mailto:${CONTACT_INFO.support.email}`}
              className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
            >
              Support: {CONTACT_INFO.support.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
