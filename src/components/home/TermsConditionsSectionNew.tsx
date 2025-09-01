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
    id: "introduction",
    title: "Introduction",
    icon: DocumentTextIcon,
    content: [
      "JeanPay is a product of JeanAfrica Technology Limited, designed to deliver innovative financial solutions across Africa and beyond.",
      "We are committed to secure, transparent, and reliable payment services that protect customer privacy and enable seamless transactions.",
      "By accessing or using JeanPay, you agree to these Terms of Service and our Privacy Policy.",
      "If you do not agree, you must stop using JeanPay immediately.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    icon: ShieldCheckIcon,
    content: [
      "You must be at least 18 years old (or the legal age of majority in your jurisdiction) to use JeanPay.",
      "You must have the legal capacity to enter binding agreements.",
      "You must comply with applicable financial service laws and regulations.",
      "You must not have been previously banned or suspended from similar platforms.",
      "JeanPay may verify eligibility and suspend accounts that fail to meet these requirements.",
    ],
  },
  {
    id: "account",
    title: "Account Registration & Security",
    icon: LockClosedIcon,
    content: [
      "To access services, you must register for a JeanPay account.",
      "You agree to provide accurate and verifiable details.",
      "You must keep your login credentials secure.",
      "Notify JeanPay of any unauthorized access immediately.",
      "You are fully responsible for all activity under your account.",
      "JeanPay is not liable for losses caused by user negligence.",
    ],
  },
  {
    id: "services",
    title: "Services Offered",
    icon: BanknotesIcon,
    content: [
      "JeanPay provides:",
      "Currency Conversion – exchange supported currencies at competitive rates.",
      "Deposits & Withdrawals – add funds via supported channels and withdraw to banks or wallets.",
      "Transfers & Payments – send/receive money across supported countries, banks, and mobile money networks.",
      "Limitations may apply due to regulatory rules, account status, or risk management.",
      "JeanPay may modify or suspend services as needed.",
    ],
  },
  {
    id: "fees",
    title: "Fees & Charges",
    icon: CreditCardIcon,
    content: [
      "Fees apply only to currency exchange and withdrawals.",
      "Fees are disclosed before transactions and factored into exchange rates.",
      "By proceeding, you accept the applicable fees.",
      "JeanPay may revise fees; changes will be communicated via the platform or official channels.",
    ],
  },
  {
    id: "transactions",
    title: "Transactions & Limits",
    icon: BanknotesIcon,
    content: [
      "Transactions must comply with laws and JeanPay’s platform rules.",
      "Transaction limits (daily, weekly, monthly) depend on account level and verification.",
      "Fraud monitoring applies to all transactions.",
      "Prohibited activities include money laundering, terrorist financing, illegal goods, scams, or misuse of JeanPay systems.",
      "JeanPay may block, reverse, or report suspicious transactions.",
    ],
  },
  {
    id: "user_obligations",
    title: "User Obligations",
    icon: ExclamationTriangleIcon,
    content: [
      "You agree not to:",
      "Conduct unlawful or fraudulent activity.",
      "Engage in scams, phishing, or identity theft.",
      "Violate AML, CFT, or other financial crime laws.",
      "Misuse JeanPay in ways that harm security, systems, or users.",
      "Violation may result in account suspension or reporting to authorities.",
    ],
  },
  {
    id: "jeanpay_rights",
    title: "JeanPay’s Rights",
    icon: ShieldCheckIcon,
    content: [
      "JeanPay may:",
      "Suspend or terminate accounts that violate terms.",
      "Refuse, delay, or block suspicious transactions.",
      "Set limits on transfers, deposits, or withdrawals.",
      "Modify, suspend, or discontinue services.",
      "Adjust fees when necessary.",
    ],
  },
  {
    id: "dispute_resolution",
    title: "Dispute Resolution",
    icon: DocumentTextIcon,
    content: [
      "First, contact JeanPay Customer Support for resolution.",
      "If unresolved, disputes may proceed to mediation or arbitration.",
      "Court action will only apply if required by law or if arbitration is unenforceable.",
      "This ensures fair and cost-effective dispute resolution.",
    ],
  },
  {
    id: "liability",
    title: "Liability & Disclaimers",
    icon: ExclamationTriangleIcon,
    content: [
      "JeanPay shall not be liable for:",
      "User errors (wrong account details, mistaken transfers, etc.).",
      "Failures caused by third-party providers (banks, telcos, etc.).",
      "Delays from force majeure (e.g., disasters, outages, wars).",
      "Indirect damages such as loss of profits or data.",
      "Maximum liability is limited to fees paid in the three months before a claim.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    icon: LockClosedIcon,
    content: [
      "User-Initiated: You may close your account anytime.",
      "JeanPay-Initiated: Accounts may be suspended for violations or as required by law.",
      "Pending transactions will be processed.",
      "Remaining balances will be returned unless restricted by regulation.",
      "Closed accounts cannot be reactivated.",
      "JeanPay may retain necessary records as required by law.",
    ],
  },
  {
    id: "governing_law",
    title: "Governing Law",
    icon: DocumentTextIcon,
    content: [
      "These Terms are governed by the laws of Nigeria or Ghana (depending on your registered account).",
      "Disputes will fall under the jurisdiction of the relevant courts, unless arbitration/mediation applies.",
    ],
  },
  {
    id: "updates",
    title: "Updates to Terms",
    icon: CreditCardIcon,
    content: [
      "JeanPay may revise these Terms.",
      "Users will be notified via email, app, or website.",
      "Continued use after updates means acceptance of the revised Terms.",
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
