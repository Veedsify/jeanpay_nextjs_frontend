"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { BRAND, CONTACT_INFO, SOCIAL_LINKS } from "@/constants";

interface ContactSectionProps {
  className?: string;
}

const contactMethods = [
  {
    title: "Email Support",
    description: "Get help via email. We typically respond within 24 hours.",
    icon: EnvelopeIcon,
    contact: CONTACT_INFO.support.email,
    action: `mailto:${CONTACT_INFO.support.email}`,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Phone Support",
    description: "Call us for immediate assistance. Available 24/7.",
    icon: PhoneIcon,
    contact: CONTACT_INFO.support.phone,
    action: `tel:${CONTACT_INFO.support.phone}`,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Live Chat",
    description: "Chat with our support team in real-time.",
    icon: ChatBubbleLeftRightIcon,
    contact: "Available in app",
    action: "#",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Business Inquiries",
    description: "For partnerships and business opportunities.",
    icon: UserGroupIcon,
    contact: CONTACT_INFO.business.email,
    action: `mailto:${CONTACT_INFO.business.email}`,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking 'Forgot Password' on the login page or contacting our support team.",
  },
  {
    question: "What are your transaction limits?",
    answer:
      "Transaction limits vary based on your verification level and account history. Check your account settings for current limits.",
  },
  {
    question: "How long do transfers take?",
    answer:
      "Most transfers are completed within 5-30 minutes depending on the destination country and payment method.",
  },
  {
    question: "Is my money safe?",
    answer:
      "Yes! We use bank-level security, encryption, and are fully licensed and regulated to protect your funds.",
  },
];

export const ContactSection = ({ className = "" }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <section className={`py-16 lg:py-24 bg-jean-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-jean-gray-900 mb-6">
            Get in{" "}
            <span className="bg-gradient-to-r from-jean-orange to-cyan-dark bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-jean-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a question or need help? We&apos;re here to assist you. Reach
            out to us through any of the methods below and we&apos;ll get back
            to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Contact Methods
            </h2>

            <div className="space-y-6 mb-12">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.action}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`block ${method.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-200 group`}
                >
                  <div className="flex items-start">
                    <method.icon
                      className={`w-8 h-8 ${method.color} mr-4 mt-1 group-hover:scale-110 transition-transform`}
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{method.description}</p>
                      <p className={`font-medium ${method.color}`}>
                        {method.contact}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Office Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Office Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="w-6 h-6 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{BRAND.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ClockIcon className="w-6 h-6 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Support Hours</p>
                    <p className="text-gray-600">
                      {CONTACT_INFO.support.hours} Support
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GlobeAltIcon className="w-6 h-6 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Website</p>
                    <a
                      href={BRAND.website}
                      className="text-orange-500 hover:underline"
                    >
                      {BRAND.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="font-medium text-gray-900 mb-4">Follow Us</p>
                <div className="flex space-x-4">
                  {SOCIAL_LINKS.slice(0, 4).map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <span className="sr-only">{social.platform}</span>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-100">
                        <span className="text-sm font-bold">
                          {social.platform.charAt(0)}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="business">Business Partnership</option>
                      <option value="billing">Billing Question</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <QuestionMarkCircleIcon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
