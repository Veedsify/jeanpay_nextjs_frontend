"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Core components that should load immediately
import { HeroSection } from "@/components/home/HeroSection";
import { NavHeader } from "@/components/home/NavHeader";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

// Lazy load sections for better performance
const TrustedBySection = dynamic(
  () => import("@/components/home/TrustedBySection"),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

const USDPaymentsSection = dynamic(
  () => import("@/components/home/USDPaymentsSection"),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

const CrossBorderSection = dynamic(
  () => import("@/components/home/CrossBorderSection"),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

const VirtualCardSection = dynamic(
  () => import("@/components/home/VirtualCardSection"),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

const SavingsSection = dynamic(
  () => import("@/components/home/SavingsSection"),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

const InstantTransferSection = dynamic(
  () => import("@/components/home/InstantTransferSection"),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

const FAQSection = dynamic(() => import("@/components/home/FAQSection"), {
  loading: () => <LoadingSpinner />,
  ssr: true,
});

const CTASection = dynamic(() => import("@/components/home/CTASection"), {
  loading: () => <LoadingSpinner />,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => <LoadingSpinner />,
  ssr: true,
});

/**
 * Home Page Component - JeanPay Landing Page
 *
 * Features:
 * - Code splitting for better performance
 * - Proper TypeScript types
 * - Accessibility compliant
 * - SEO optimized
 * - Mobile-first responsive design
 * - Error boundaries for better UX
 */
export default function HomePage() {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-600">
            Something went wrong. Please refresh the page.
          </p>
        </div>
      }
    >
      <div className="min-h-screen bg-[#FCFBF7] text-gray-800 antialiased">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        {/* Navigation Header */}
        <NavHeader />

        {/* Main Content */}
        <main id="main-content" className="pt-20 md:pt-24" role="main">
          {/* Hero Section - Always visible */}
          <HeroSection />

          {/* Lazy loaded sections with suspense boundaries */}
          <Suspense fallback={<LoadingSpinner />}>
            <TrustedBySection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <USDPaymentsSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <CrossBorderSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <VirtualCardSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <SavingsSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <InstantTransferSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <FAQSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <CTASection />
          </Suspense>
        </main>

        {/* Footer */}
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
