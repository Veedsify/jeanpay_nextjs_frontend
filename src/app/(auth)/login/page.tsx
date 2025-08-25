"use client";
import LoginProvider from "@/components/layout/LoginLayout";
import LoginPage from "@/components/layout/LoginPage";

export default function Page() {
  return (
    <LoginProvider>
      <LoginPage />
    </LoginProvider>
  );
}
