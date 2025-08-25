import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Two-Factor Authentication - JeanPay",
  description: "Secure your account with two-factor authentication on JeanPay",
};

export default function TwofactorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
