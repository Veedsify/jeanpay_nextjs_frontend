"use client";
import { useState } from "react";
import Link from "next/link";
import AuthPageHeader from "@/components/commons/AuthPageHeader";
import AuthPageFooter from "@/components/commons/AuthPageFooter";
import { LucideArrowLeft } from "lucide-react";
import { sendResetEmail } from "@/funcs/auth/AuthFuncs";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || email.length == 0) return;
    setIsLoading(true);
    setResetLinkSent(false);

    try {
      await sendResetEmail(email);
      toast.success("Reset link sent successfully");
      setResetLinkSent(true);
    } catch {
      toast.error("Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-[512px] w-full bg-white rounded-2xl p-8">
        <AuthPageHeader text="Reset your account password" />
        <div className="space-y-6 lg:flex relative items-center justify-center gap-32 my-16 lg:my-32">
          {resetLinkSent ? (
            <>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    Password reset email sent
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We&apos;ve sent an email to{" "}
                    <span className="font-bold">{email}</span> with a link to
                    reset your password.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/login"
                      className="text-cyan-dark font-medium hover:underline flex items-center justify-center"
                    >
                      <LucideArrowLeft className="mr-2" />
                      Back To Login
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-cyan-dark mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Reset Code"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  <Link
                    href="/login"
                    className="text-cyan-dark font-medium hover:underline flex"
                  >
                    <LucideArrowLeft />
                    Back To Login
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="py-5 text-center">
          <Link
            href={"/"}
            className="font-semibold  underline text-jean-orange hover:text-cyan-dark hover:no-underline"
          >
            Having Trouble?
          </Link>
          <AuthPageFooter />
        </div>
      </div>
    </div>
  );
}
