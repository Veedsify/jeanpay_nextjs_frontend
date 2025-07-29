"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/app/components/ui/Logo";
import { AnimatePresence, motion } from "framer-motion";
import { House, Bell, Gear, X, List } from "@phosphor-icons/react";
import { ArrowRightLeft, ChevronDown, CreditCardIcon } from "lucide-react";

const navItems = [
  { id: "dashboard", name: "Dashboard", href: "/dashboard", icon: House },
  {
    id: "payment",
    name: "Payment",
    icon: CreditCardIcon,
    children: [
      { id: "topup", name: "Topup", href: "/dashboard/payment/topup" },
      { id: "transfer", name: "Exchange Currency", href: "/dashboard/payment/transfer" },
    ],
  },
  {
    id: "transactions",
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowRightLeft,
  },
  {
    id: "notifications",
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  { id: "settings", name: "Settings", href: "/dashboard/settings", icon: Gear },
];

function formatTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "Dashboard";
  return last.charAt(0).toUpperCase() + last.slice(1);
}

// Component for nav item with children to manage its own state
function NavItemWithChildren({
  item,
  pathname,
  closeMobileMenu,
}: {
  item: {
    icon: React.ElementType;
    children: {
      id: string;
      name: string;
      href: string;
    }[];
    id: string;
    name: string;
    href?: string;
  };
  pathname: string;
  closeMobileMenu: () => void;
}) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  const isActive =
    pathname === item.href ||
    (item.children && item.children.some((child) => pathname === child.href));

  const handleOpenToggle = () => {
    setOpen(!open);
  };
  
  return (
    <>
      <button
        onClick={handleOpenToggle}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-full transition-colors ${
          isActive
            ? "bg-cyan-dark text-white"
            : "text-cyan-dark hover:bg-gray-10"
        }`}
      >
        <span className="flex items-center gap-3 font-medium">
          <Icon size={20} />
          {item.name}
        </span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && item.children && (
        <div className="mt-3 ml-4 space-y-2 border-l-4 border-cyan-dark/30 pl-5">
          {item?.children?.map((child) => (
            <Link
              key={child.id}
              data-testid={child.id}
              href={child.href}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-200 ${
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
      )}
    </>
  );
}

export default function MobileHeader() {
  const pathname = usePathname();
  const title = formatTitle(pathname);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-green-bg px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo variant="secondary" className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-cyan-dark">{title}</h1>
        <button
          onClick={toggleMobileMenu}
          className="text-cyan-dark hover:text-cyan-600 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <List size={24} />
        </button>
      </div>

      <AnimatePresence>
        <div>
          {/* Mobile Overlay */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 bg-opacity-50 z-40"
              onClick={closeMobileMenu}
            />
          )}

          {/* Mobile Sidebar */}
          <nav
            className={`
          fixed top-0 left-0 z-50
          bg-green-bg min-h-screen h-full p-4 flex flex-col
          transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          w-80
        `}
          >
            {/* Header inside sidebar */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <Logo height={48} width={48} />
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
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.children ? (
                    <NavItemWithChildren
                      item={item}
                      pathname={pathname}
                      closeMobileMenu={closeMobileMenu}
                    />
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        item.href === pathname
                          ? "bg-cyan-dark text-white rounded-full"
                          : "text-cyan-dark hover:bg-gray-10 rounded-full"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </AnimatePresence>
    </>
  );
}
