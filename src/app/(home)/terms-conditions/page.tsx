import { Metadata } from "next";
import { TermsConditionsSection } from "@/components/home/TermsConditionsSectionNew";
import { NavHeader } from "@/components/home/NavHeader";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions - JeanPay",
  description:
    "Read JeanPay's terms and conditions to understand our service agreement and user responsibilities.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />
      <TermsConditionsSection />
      <Footer />
    </div>
  );
}
