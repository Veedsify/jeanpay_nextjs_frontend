"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { BRAND, CONTACT_INFO } from "@/constants";
import toast from "react-hot-toast";
import { axiosClient } from "@/lib/axios";
import { AxiosError } from "axios";

interface ContactSectionProps {
  className?: string;
}

interface ContactMethod {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  value: string;
  action: string;
  href: string;
  available: string;
  color: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: "phone",
    title: "Phone Support",
    description:
      "Speak directly with our support team for immediate assistance",
    icon: PhoneIcon,
    value: CONTACT_INFO.support.phone,
    action: "Call Now",
    href: `tel:${CONTACT_INFO.support.phone}`,
    available: "24/7 Available",
    color: "text-cyan-dark",
  },
  {
    id: "email",
    title: "Email Support",
    description: "Send us an email and we'll respond within 2-4 hours",
    icon: EnvelopeIcon,
    value: CONTACT_INFO.support.email,
    action: "Send Email",
    href: `mailto:${CONTACT_INFO.support.email}`,
    available: "Response within 2-4 hours",
    color: "text-jean-orange",
  },
  {
    id: "chat",
    title: "Whatsapp Chat",
    description: "Chat with our support team in real-time",
    icon: ChatBubbleLeftRightIcon,
    value: "Whatsapp available in app",
    action: "Start Chat",
    href: `https://wa.me/${CONTACT_INFO.support.phone}?text=${encodeURIComponent("Hi Jeanpay Africa, i would like")}`,
    available: "Mon-Fri 8AM-8PM GMT",
    color: "text-green-600",
  },
];

const officeInfo = {
  address: CONTACT_INFO.address,
  hours: "Monday - Friday: 9:00 AM - 6:00 PM GMT",
  timezone: "Greenwich Mean Time (GMT)",
};

export const ContactSection = ({ className = "" }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axiosClient.post("/contact", {
        email: formData.email,
        full_name: formData.name,
        message: formData.message,
        subject: formData.subject,
        category: formData.category,
      });

      if (response.status == 200) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          category: "general",
        });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`pt-32 pb-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6">
            Contact <span className="text-cyan-dark">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re here to help! Reach out to our support team for
            assistance, questions, or feedback about {BRAND.name} services.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F4EADDC2] rounded-lg p-6 text-center hover:bg-white/50 transition-colors"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4`}
              >
                <method.icon className={`w-6 h-6 ${method.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{method.description}</p>
              <p className="font-medium text-gray-800 mb-2">{method.value}</p>
              <p className="text-xs text-gray-500 mb-4">{method.available}</p>
              <a
                href={method.href}
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  method.id === "phone"
                    ? "bg-cyan-dark text-white hover:bg-cyan-800"
                    : method.id === "email"
                      ? "bg-jean-orange text-white hover:bg-orange-600"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {method.action}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F4EADDC2] rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <EnvelopeIcon className="w-6 h-6 text-cyan-dark mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Send us a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                    placeholder="John Doe"
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
                    className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                  placeholder="How can we help you?"
                />
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
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-dark focus:border-transparent resize-none"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-dark text-white py-4 px-6 rounded-lg font-semibold hover:bg-cyan-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Office Details */}
            <div className="bg-[#F4EADDC2] rounded-lg p-8">
              <div className="flex items-center mb-6">
                <MapPinIcon className="w-6 h-6 text-jean-orange mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Our Office</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Address</p>
                    <p className="text-gray-600">{officeInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ClockIcon className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Business Hours</p>
                    <p className="text-gray-600">{officeInfo.hours}</p>
                    <p className="text-sm text-gray-500">
                      {officeInfo.timezone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-red-800">
                  Emergency Support
                </h3>
              </div>
              <p className="text-red-700 mb-4">
                For urgent account security issues or suspected fraud, contact
                us immediately:
              </p>
              <a
                href={`tel:${CONTACT_INFO.support.phone}`}
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Emergency Hotline: {CONTACT_INFO.support.phone}
              </a>
            </div>

            {/* Feedback */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <HeartIcon className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-green-800">
                  We Value Your Feedback
                </h3>
              </div>
              <p className="text-green-700 mb-4">
                Help us improve {BRAND.name} by sharing your thoughts and
                suggestions.
              </p>
              <a
                href={`mailto:${CONTACT_INFO.support.email}`}
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Send Feedback: {CONTACT_INFO.support.email}
              </a>
            </div>
          </motion.div>
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-cyan-dark rounded-lg p-8 text-white text-center"
        >
          <QuestionMarkCircleIcon className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-4">Need Quick Answers?</h2>
          <p className="text-lg opacity-90 mb-6">
            Check our comprehensive FAQ section for instant answers to common
            questions.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-cyan-dark px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Visit FAQ Center
          </a>
        </motion.div>
      </div>
    </main>
  );
};
