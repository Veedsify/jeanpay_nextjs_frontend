"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Image from "next/image";
import AuthPageHeader from "@/components/commons/AuthPageHeader";
import AuthPageFooter from "@/components/commons/AuthPageFooter";
import useAuth from "@/hooks/AuthHook";
import toast from "react-hot-toast";
import NeedsVerification from "@/components/commons/NeedsVerification";
import _ from "lodash";
import { motion } from "framer-motion";
import { LucideLoaderCircle } from "lucide-react";
import { useAuthContext } from "@/components/contexts/UserAuthContext";

export default function LoginPage({
  error,
  message,
}: {
  error?: boolean | null;
  message?: string | null;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [needVerification, setNeedVerification] = useState(false);
  const [checking, setChecking] = useState(true);
  const {
    isAuthenticated,
    user,
    initializeAuth,
    isLoading: AuthLoading,
  } = useAuthContext();
  const router = useRouter();
  const { loginUser, verifyAccount } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    if (error && message && message?.length > 0) {
      toast.error(message || "An error occurred during login.");
      setMounted(true);
    }
  }, [error, message, mounted]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isAuthenticated) {
      initializeAuth();
      return;
    }
  }, [initializeAuth, isAuthenticated]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    async function checkUserIsLoggedIn() {
      if (isAuthenticated && !AuthLoading) {
        router.push("/dashboard");
        return;
      }
      if (!isAuthenticated && !AuthLoading) {
        _.delay(() => setChecking(false), 700);
        return;
      }
      if (AuthLoading) {
        return;
      }
      _.delay(() => setChecking(false), 700);
    }

    if (!checking) {
      return;
    }
    checkUserIsLoggedIn();
  }, [
    router,
    setChecking,
    checking,
    isAuthenticated,
    user,
    AuthLoading,
    initializeAuth,
  ]);

  const handleVerifyClick = async () => {
    try {
      verifyAccount.mutate(email, {
        onSuccess: () => {
          toast.success("Verification email sent!");
        },
        onError: () => {
          toast.error("Verification failed!");
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      loginUser.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            if (data?.data?.token?.is_two_factor_enabled) {
              setIsLoading(false);
              router.push("/login/two-factor-authentication");
              return;
            }
            setIsLoading(false);
            router.push("/dashboard");
          },
          onError: (error) => {
            //@ts-expect-error login failed
            if (error.response.data.action === "verify") {
              setNeedVerification(true);
            } else {
              //@ts-expect-error login failed
              toast.error(error.response.data.message);
            }
            setIsLoading(false);
          },
        },
      );
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed:", error);
    }
  };

  if (needVerification) {
    return <NeedsVerification onVerify={handleVerifyClick} />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-[1200px] w-full bg-white rounded-2xl p-8">
        <AuthPageHeader />
        {!checking ? (
          <div className="space-y-6 lg:flex relative items-center justify-center gap-32 my-16 lg:my-32">
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

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-cyan-dark mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent pr-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeSlash size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-cyan-dark border-gray-300 rounded focus:ring-cyan-dark"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href="/password/forgot"
                    className="text-sm text-cyan-dark hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-cyan-dark font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            <div className="h-full hidden lg:block border-[0.5px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-black/20">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white">
                OR
              </span>
            </div>

            <div className="flex-1">
              <button
                type="submit"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center gap-4 justify-center cursor-pointer bg-white border py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Image
                  src="/icons/google-icon.svg"
                  alt="Google Logo"
                  width={24}
                  height={24}
                />
                Google
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 flex relative items-center justify-center min-h-72">
            <motion.div
              layoutId="page-loader"
              className="text-center flex justify-center flex-col items-center"
            >
              <LucideLoaderCircle
                className="animate-spin text-jean-orange"
                size={64}
                strokeWidth={1}
              />
              <h2>Please wait...</h2>
            </motion.div>
          </div>
        )}
        <div className="py-5 text-center">
          <Link
            href={"/"}
            className="font-semibold  underline text-jean-orange hover:text-cyan-dark hover:no-underline"
          >
            Can&apos;t Login?
          </Link>
          <AuthPageFooter />
        </div>
      </div>
    </div>
  );
}
