"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthPageHeader from "@/components/commons/AuthPageHeader";
import AuthPageFooter from "@/components/commons/AuthPageFooter";
import { LucideArrowLeft } from "lucide-react";
import { resetPassword, validateResetToken } from "@/funcs/auth/AuthFuncs";
import { passwordStrength } from "check-password-strength";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function ResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      router.push("/login");
    }

    if (token?.length != 32) {
      router.push("/login");
    }

    async function validatePasswordResetToken() {
      try {
        const response = await validateResetToken(token!);
        if (response.error) {
          router.push("/login");
        }
        setShow(true);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.data.error) {
            router.push("/login");
          }
        }
      }
    }
    validatePasswordResetToken();
  }, [params, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        id: "password-validation",
      });
      return;
    }

    if (passwordStrength(password).length < 7) {
      toast.error("Password is too weak. Please choose a stronger password.", {
        id: "password-validation",
      });
      return;
    }
    const strength = passwordStrength(password).value;
    console.log("Password strength:", strength);

    if (strength === "Very Weak" || strength === "Weak") {
      toast.error("Password is too weak. Please choose a stronger password.", {
        id: "password-validation",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = params.get("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await resetPassword(token, password);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Password reset successfully");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-[512px] w-full bg-white rounded-2xl p-8">
        <AuthPageHeader text="Create a new password" />
        <div className="space-y-6 lg:flex relative items-center justify-center gap-32 my-16 lg:my-32">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-cyan-dark mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-cyan-dark mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
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
