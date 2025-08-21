"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AuthPageHeader from "@/app/components/commons/AuthPageHeader";
import AuthPageFooter from "@/app/components/commons/AuthPageFooter";
import { LucideArrowLeft } from "lucide-react";
import { toast } from "sonner";
import useAuth from "@/hooks/AuthHook";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const { twofactorAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const [_, setCurrentIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      // setCurrentIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      // setCurrentIndex(index - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 6) return;
    if (isNaN(Number(fullCode))) {
      toast.error("Invalid code", {
        id: "two-factor-auth",
      });
    }

    setIsLoading(true);

    twofactorAuth.mutate(fullCode, {
      onSuccess: () => {
        toast.success("Verification successful!", {
          id: "two-factor-auth",
        });
        router.push("/dashboard");
      },
      onError: (error) => {
        toast.error(error.message || "Verification failed", {
          id: "two-factor-auth",
        });
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-[512px] w-full bg-white rounded-2xl p-8">
        <AuthPageHeader text="Two-Factor Authentication Required" />
        <div className="space-y-6 lg:flex relative items-center justify-center gap-32 my-16 lg:my-32">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-cyan-dark mb-2 text-center">
                  Enter 6-digit verification code
                </label>
                <div
                  className="flex gap-3 justify-center"
                  onPaste={handlePaste}
                >
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                      required
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || code.join("").length !== 6}
                className="w-full cursor-pointer bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Verifying..."
                  : code.join("").length === 6
                    ? "Verify"
                    : `${6 - code.join("").length} digits remaining`}
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
