"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  DocumentTextIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  LockClosedIcon,
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
      "By accessing or using JeanPay services, you agree to be bound by these terms",
      "These terms constitute a legally binding agreement between you and JeanPay",
      "If you do not agree to these terms, you may not use our services",
      "We may update these terms from time to time with prior notice",
      "Continued use of our services constitutes acceptance of updated terms",
      "You must be at least 18 years old to use our services",
    ],
  },
  {
    id: "services",
    title: "Our Services",
    icon: BanknotesIcon,
    content: [
      "JeanPay provides digital payment and money transfer services",
      "Currency conversion and exchange rate services",
      "Digital wallet and account management features",
      "Transaction processing and payment facilitation",
      "Customer support and account assistance",
      "Mobile and web-based financial tools",
      "Integration with partner financial institutions",
    ],
  },
  {
    id: "account",
    title: "Account Registration and Security",
    icon: LockClosedIcon,
    content: [
      "You must provide accurate and complete information during registration",
      "You are responsible for maintaining the confidentiality of your account credentials",
      "You must notify us immediately of any unauthorized account access",
      "We may suspend or terminate accounts that violate our terms",
      "Identity verification is required for account activation",
      "You may only maintain one account unless otherwise authorized",
      "Account sharing or transfer to third parties is prohibited",
    ],
  },
  {
    id: "transactions",
    title: "Transaction Terms",
    icon: CreditCardIcon,
    content: [
      "All transactions are subject to our fees and exchange rates",
      "Transaction limits may apply based on account verification level",
      "We reserve the right to reject or reverse suspicious transactions",
      "Transaction confirmations will be sent via email and in-app notifications",
      "Disputed transactions must be reported within 30 days",
      "Refunds are processed according to our refund policy",
      "Cross-border transactions may be subject to additional regulations",
    ],
  },
  {
    id: "fees",
    title: "Fees and Charges",
    icon: BanknotesIcon,
    content: [
      "Current fee schedules are available on our website and mobile app",
      "Fees may vary based on transaction type, amount, and destination",
      "Currency conversion fees apply to international transactions",
      "We reserve the right to modify fees with 30 days advance notice",
      "Some partner institutions may charge additional fees",
      "Premium account holders may receive discounted fee rates",
      "Promotional fee waivers may apply for limited periods",
    ],
  },
  {
    id: "compliance",
    title: "Legal Compliance and Regulations",
    icon: ShieldCheckIcon,
    content: [
      "JeanPay operates under applicable financial services regulations",
      "We comply with anti-money laundering (AML) requirements",
      "Know Your Customer (KYC) verification procedures apply",
      "We report suspicious activities to relevant authorities",
      "International transactions comply with foreign exchange regulations",
      "Tax reporting obligations may apply to certain transactions",
      "We cooperate with law enforcement and regulatory investigations",
    ],
  },
  {
    id: "limitations",
    title: "Limitations and Restrictions",
    icon: ExclamationTriangleIcon,
    content: [
      "Our services are not available in all countries or jurisdictions",
      "Certain transactions may be prohibited by law or our policies",
      "We may impose transaction limits for security and compliance reasons",
      "Service availability may be limited during maintenance periods",
      "We reserve the right to refuse service at our discretion",
      "Some features may require additional verification or approval",
      "Third-party service disruptions may affect our service availability",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: ShieldCheckIcon,
    content: [
      "JeanPay's liability is limited to the extent permitted by law",
      "We are not liable for indirect, incidental, or consequential damages",
      "Our total liability will not exceed the amount of the relevant transaction",
      "We are not responsible for third-party service failures or errors",
      "Force majeure events are excluded from our liability",
      "You agree to indemnify JeanPay against claims arising from your use",
      "These limitations apply to the fullest extent permitted by applicable law",
    ],
  },
];

export const TermsConditionsSection = ({
  className = "",
}: TermsSectionProps) => {
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
            Terms & <span className="text-cyan-dark">Conditions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Please read these terms and conditions carefully before using{" "}
            {BRAND.name} services. These terms govern your use of our platform
            and services.
          </p>
          <p className="text-sm text-gray-500">
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
          className="bg-[#F4EADDC2] rounded-lg p-8 mb-12"
        >
          <div className="flex items-center mb-6">
            <DocumentTextIcon className="w-8 h-8 text-cyan-dark mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">
              Agreement Overview
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            These Terms and Conditions (&quot;Terms&quot;) govern your access to
            and use of {BRAND.name}&apos;s financial services platform, mobile
            applications, and related services. By creating an account or using
            our services, you enter into a binding legal agreement with us.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We are committed to providing transparent terms that protect both
            our users and our business. If you have questions about any of these
            terms, please contact our support team before using our services.
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
              className="bg-[#F4EADDC2] rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveSection(
                    activeSection === section.id ? null : section.id
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

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-jean-orange/10 border border-jean-orange/20 rounded-lg p-8"
        >
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-jean-orange mr-3" />
            <h3 className="text-xl font-bold text-gray-800">
              Important Notice
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            These terms may be updated from time to time to reflect changes in
            our services, legal requirements, or business practices. We will
            notify you of significant changes via email or through our platform.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Your continued use of {BRAND.name} services after any changes
            constitutes acceptance of the updated terms. We encourage you to
            review these terms periodically.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-cyan-dark rounded-lg p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            If you have any questions about these terms and conditions or need
            clarification on any aspect of our services, please contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${CONTACT_INFO.support.email}`}
              className="bg-white text-cyan-dark px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Support: {CONTACT_INFO.support.email}
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
