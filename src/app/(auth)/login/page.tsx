"use client";
import LoginProvider from "@/components/layout/LoginLayout";
import LoginPage from "@/components/layout/LoginPage";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const error = useSearchParams().get("error");
  const message = useSearchParams().get("message");

  return (
    <LoginProvider>
      <LoginPage
        error={Boolean(error)}
        message={decodeURIComponent(message || "")}
      />
    </LoginProvider>
  );
}
