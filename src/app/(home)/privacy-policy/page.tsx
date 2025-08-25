import { Metadata } from "next";
import { PrivacyPolicySection } from "@/components/home/PrivacyPolicySectionNew";
import { NavHeader } from "@/components/home/NavHeader";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - JeanPay",
  description:
    "Learn about how JeanPay protects your privacy and handles your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />
      <PrivacyPolicySection />
      <Footer />
    </div>
  );
}
