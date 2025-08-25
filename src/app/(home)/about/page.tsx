import { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSectionNew";
import { NavHeader } from "@/components/home/NavHeader";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us - JeanPay",
  description:
    "Learn about JeanPay's mission to make financial services accessible across Africa and the diaspora. Discover our story, values, and commitment to connecting communities.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />
      <AboutSection />
      <Footer />
    </div>
  );
}
