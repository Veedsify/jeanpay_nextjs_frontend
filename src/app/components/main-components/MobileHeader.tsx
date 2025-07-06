"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/app/components/ui/Logo";
import HeaderNotification from "../commons/HeaderNotification";
import HeaderNameTag from "@/app/components/commons/HeaderNameTag";
import {
  House,
  Wallet,
  ArrowsClockwise,
  ClockCounterClockwise,
  Bell,
  Gear,
  X,
  List,
} from "@phosphor-icons/react";
import { ArrowRightLeft, ChevronDown } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: House },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Convert", href: "/dashboard/convert", icon: ArrowsClockwise },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowRightLeft,
  },
  { name: "History", href: "/dashboard/history", icon: ClockCounterClockwise },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Gear },
];

function formatTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "Dashboard";
  return last.charAt(0).toUpperCase() + last.slice(1);
}

export default function MobileHeader() {
  const pathname = usePathname();
  const title = formatTitle(pathname);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  const isPaymentActive =
    pathname === "/dashboard/payment/topup" ||
    pathname === "/dashboard/payment/transfer";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setPaymentOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-green-bg px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Logo variant="secondary" className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-cyan-dark">
          {title}
        </h1>

        <button
          onClick={toggleMobileMenu}
          className="text-cyan-dark hover:text-cyan-600 transition-colors"
          aria-label="Toggle menu"
        >
          <List size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 z-50
          bg-green-bg min-h-screen h-full p-4 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          w-80
        `}
      >
        {/* Header inside sidebar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={closeMobileMenu}
              className="text-cyan-dark hover:text-cyan-600 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-4 py-3 transition-colors ${
              pathname === "/dashboard"
                ? "bg-cyan-dark text-white rounded-full"
                : "text-cyan-dark hover:bg-gray-10 rounded-full"
            }`}
          >
            <House size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Payment Dropdown */}
          <button
            onClick={() => setPaymentOpen((prev) => !prev)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-full transition-colors ${
              isPaymentActive
                ? "bg-cyan-dark text-white"
                : "text-cyan-dark hover:bg-gray-10"
            }`}
          >
            <span className="flex items-center gap-3 font-medium">Payment</span>
            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${
                isPaymentOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isPaymentOpen && (
            <div className="space-y-2 pl-6">
              <Link
                href="/dashboard/payment/topup"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2 border-l-2 ${
                  pathname === "/dashboard/payment/topup"
                    ? "border-green-500 bg-cyan-dark text-white rounded"
                    : "border-green-500 text-cyan-dark hover:bg-gray-10 rounded"
                }`}
              >
                <span className="font-medium">Topup</span>
              </Link>
              <Link
                href="/dashboard/payment/transfer"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2 border-l-2 ${
                  pathname === "/dashboard/payment/transfer"
                    ? "border-green-500 bg-cyan-dark text-white rounded"
                    : "border-green-500 text-cyan-dark hover:bg-gray-10 rounded"
                }`}
              >
                <span className="font-medium">Transfer</span>
              </Link>
            </div>
          )}

          {/* Rest of nav items */}
          {navItems.slice(1).map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? "bg-cyan-dark text-white rounded-full"
                    : "text-cyan-dark hover:bg-gray-10 rounded-full"
                }`}
              >
                <IconComponent size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
