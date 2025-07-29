"use client";

import { useState } from "react";
import Logo from "@/app/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Bell, Gear } from "@phosphor-icons/react";
import { ArrowRightLeft, ChevronDown } from "lucide-react";
import { CreditCardIcon } from "@phosphor-icons/react/dist/ssr";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: House },
  {
    name: "Payment",
    icon: CreditCardIcon,
    children: [
      { name: "Topup", href: "/dashboard/payment/topup" },
      { name: "Exchange Currency", href: "/dashboard/payment/transfer" },
    ],
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowRightLeft,
  },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Gear },
];

// Component for nav item with children to manage its own state
function NavItemWithChildren({
  item,
  pathname,
}: {
  item: {
    icon: React.ElementType;
    children: {
      name: string;
      href: string;
    }[];
    name: string;
    href?: string;
  };
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive =
    pathname === item.href ||
    (item.children && item.children.some((child) => pathname === child.href));
  const Icon = item.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
          isActive || isOpen
            ? "bg-cyan-dark text-white shadow-md"
            : "text-cyan-dark hover:bg-gray-10 hover:shadow-sm"
        }`}
      >
        <span className="flex items-center gap-3 font-medium">
          <Icon size={20} />
          {item.name}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-3 ml-4 space-y-2 border-l-4 border-cyan-dark/30 pl-5">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-200 relative group ${
                pathname === child.href
                  ? "bg-cyan-dark text-white shadow-md"
                  : "text-cyan-dark hover:bg-cyan-dark/10 hover:shadow-md"
              }`}
            >
              <span className="font-semibold text-base transition-colors duration-200">
                {child.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SideBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-green-bg min-h-dvh h-full p-2 md:py-6 md:px-4 flex flex-col">
      <div className="mb-8 mr-auto flex items-center justify-center gap-4">
        <Logo variant="primary" height={32} width={32} />
        <h1 className="text-2xl font-bold text-cyan-dark">
          Jean<span className="italic text-jean-orange">Pay</span>
        </h1>
      </div>

      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          if (item.children) {
            return (
              <NavItemWithChildren
                key={item.name}
                item={item}
                pathname={pathname}
              />
            );
          }

          const isActive = pathname === item.href;
          const Icon = item.icon;

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
              <Icon size={20} />
              <span className="font-medium md:block block">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
