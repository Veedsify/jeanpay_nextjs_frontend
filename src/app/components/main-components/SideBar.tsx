


"use client";

import { useState } from "react";
import Logo from "@/app/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Wallet,
  ArrowsClockwise,
  ClockCounterClockwise,
  Bell,
  Gear,
} from "@phosphor-icons/react";
import { ArrowRightLeft, ChevronDown } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: House },
  // Payment will be injected manually below
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Convert", href: "/dashboard/convert", icon: ArrowsClockwise },
  { name: "Transactions", href: "/dashboard/transactions", icon: ArrowRightLeft },
  { name: "History", href: "/dashboard/history", icon: ClockCounterClockwise },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Gear },
];

export default function SideBar() {
  const pathname = usePathname();
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  const isPaymentActive =
    pathname === "/dashboard/payment/topup" ||
    pathname === "/dashboard/payment/transfer";

  return (
    <nav className="bg-green-bg min-h-dvh h-full p-2 md:py-6 md:px-4 flex flex-col">
      <div className="mb-8">
        <Logo variant="primary"/>
      </div>

      <div className="flex-1 space-y-2">
        {/* First: Dashboard */}
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 transition-colors ${
            pathname === "/dashboard"
              ? "bg-cyan-dark text-white rounded-full"
              : "text-cyan-dark hover:bg-gray-10 rounded-full"
          }`}
        >
          <House size={20} />
          <span className="font-medium md:block block">Dashboard</span>
        </Link>

        {/* Payment Dropdown */}
        <button
          onClick={() => setPaymentOpen((prev) => !prev)}
          className={`flex items-center justify-between w-full px-4 py-3 rounded-full transition-colors ${
            isPaymentActive ? "bg-cyan-dark text-white" : "text-cyan-dark hover:bg-gray-10"
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
              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                isActive
                  ? "bg-cyan-dark text-white rounded-full"
                  : "text-cyan-dark hover:bg-gray-10 rounded-full"
              }`}
            >
              <IconComponent size={20} />
              <span className="font-medium md:block block">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
