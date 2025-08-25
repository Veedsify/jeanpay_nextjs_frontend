import { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSectionNew";
import { NavHeader } from "@/components/home/NavHeader";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Us - JeanPay",
  description:
    "Get in touch with JeanPay support team. We're here to help with your questions and feedback.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />
      <ContactSection />
      <Footer />
    </div>
  );
}
