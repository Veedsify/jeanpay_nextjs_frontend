"use client";

import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    icon: <Facebook className="w-5 h-5" />,
    href: "#", // Replace with actual link
    label: "Facebook",
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "#", // Replace with actual link
    label: "Twitter",
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "#", // Replace with actual link
    label: "Instagram",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "#", // Replace with actual link
    label: "LinkedIn",
  },
  {
    icon: <Youtube className="w-5 h-5" />,
    href: "#", // Replace with actual link
    label: "YouTube",
  },
];

export default function DashboardFooter() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 mt-10 gap-4 md:gap-0">
      {/* Left links */}
      <div className="flex items-center gap-4 flex-wrap text-center md:text-left">
        <span>© 2024 JeanPay</span>
        <Link href="/privacy-policy" className="hover:text-gray-700">
          Privacy Policy
        </Link>
        <Link href="/terms-condition" className="hover:text-gray-700">
          Terms & Conditions
        </Link>
        <Link href="/contact" className="hover:text-gray-700">
          Contact
        </Link>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
