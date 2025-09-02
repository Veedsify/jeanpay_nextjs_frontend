"use client";

import { CONTACT_INFO } from "@/constants";
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
      <div className="fixed bottom-12 right-6 animate-bounce drop-shadow drop-shadow-jean-orange/20">
        <Link
          target="_blank"
          href={`https://wa.me/${CONTACT_INFO.support.phone}?text=${encodeURIComponent("Hi Jeanpay Africa, ")}`}
        >
          <svg
            height="40px"
            width="40px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <path
              style={{ fill: "#EDEDED" }}
              d="M0,512l35.31-128C12.359,344.276,0,300.138,0,254.234C0,114.759,114.759,0,255.117,0
	S512,114.759,512,254.234S395.476,512,255.117,512c-44.138,0-86.51-14.124-124.469-35.31L0,512z"
            />
            <path
              style={{ fill: "#55CD6C" }}
              d="M137.71,430.786l7.945,4.414c32.662,20.303,70.621,32.662,110.345,32.662
	c115.641,0,211.862-96.221,211.862-213.628S371.641,44.138,255.117,44.138S44.138,137.71,44.138,254.234
	c0,40.607,11.476,80.331,32.662,113.876l5.297,7.945l-20.303,74.152L137.71,430.786z"
            />
            <path
              style={{ fill: "#FEFEFE" }}
              d="M187.145,135.945l-16.772-0.883c-5.297,0-10.593,1.766-14.124,5.297
	c-7.945,7.062-21.186,20.303-24.717,37.959c-6.179,26.483,3.531,58.262,26.483,90.041s67.09,82.979,144.772,105.048
	c24.717,7.062,44.138,2.648,60.028-7.062c12.359-7.945,20.303-20.303,22.952-33.545l2.648-12.359
	c0.883-3.531-0.883-7.945-4.414-9.71l-55.614-25.6c-3.531-1.766-7.945-0.883-10.593,2.648l-22.069,28.248
	c-1.766,1.766-4.414,2.648-7.062,1.766c-15.007-5.297-65.324-26.483-92.69-79.448c-0.883-2.648-0.883-5.297,0.883-7.062
	l21.186-23.834c1.766-2.648,2.648-6.179,1.766-8.828l-25.6-57.379C193.324,138.593,190.676,135.945,187.145,135.945"
            />
          </svg>
        </Link>
      </div>
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
