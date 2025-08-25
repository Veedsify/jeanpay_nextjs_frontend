"use client";
import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NAV_ITEMS, BRAND } from "../../constants";
import type { NavItem } from "../../types";
import { LucideLogIn } from "lucide-react";
import Logo from "../ui/Logo";

interface NavHeaderProps {
  className?: string;
}

export const NavHeader = memo(({ className = "" }: NavHeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const threshold = 100;
        setIsSticky(window.scrollY > threshold);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.label);
    setIsMobileMenuOpen(false);

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full z-50 ${
          isSticky
            ? "fixed top-0 left-0 right-0 py-2 bg-[#FCFBF7]/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "absolute top-0 left-0 right-0 py-4 bg-transparent"
        } ${className}`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex justify-between items-center bg-[#F4EADDC2] rounded-full p-2 sm:p-3"
            role="navigation"
            aria-label="Main navigation"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl sm:text-2xl font-bold ml-2 sm:ml-4 text-gray-900 group-hover:text-orange-500 transition-colors flex items-center gap-2"
            >
              <Logo height={32} width={32} link="/" />
              {BRAND.name}
            </motion.div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`font-medium text-gray-700 hover:text-orange-500 transition-colors relative px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                    activeItem === item.label ? "text-orange-500" : ""
                  }`}
                  aria-current={activeItem === item.label ? "page" : undefined}
                >
                  {item.label}
                  {activeItem === item.label && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-orange-50 rounded-md -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button and Mobile Menu Toggle */}
            <div className="flex items-center space-x-3">
              {/* CTA Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/login"
                className="bg-gradient-to-r bg-cyan-dark  hover:bg-cyan-dark/80 text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 cursor-pointer focus:ring-offset-2"
                aria-label="Download JeanPay app"
              >
                <LucideLogIn
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">Login</span>
              </motion.a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Bars3Icon className="w-6 h-6 text-gray-700" />
                  )}
                </motion.div>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu */}
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl z-50 p-6 md:hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <nav className="space-y-4" role="navigation">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item)}
                    className="w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.1 }}
                  className="pt-4 border-t border-gray-100"
                >
                  <Link
                    href={"/login"}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <LucideLogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (NAV_ITEMS.length + 1) * 0.1 }}
                  className="pt-4 text-center text-sm text-gray-500"
                >
                  <p>Need help?</p>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-orange-500 hover:underline focus:outline-none focus:underline"
                  >
                    {BRAND.email}
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

NavHeader.displayName = "NavHeader";
