"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import AuthPageHeader from "@/app/components/commons/AuthPageHeader";
import Image from "next/image";
import AuthPageFooter from "@/app/components/commons/AuthPageFooter";
import useAuth from "@/funcs/hooks/AuthHook";
import { toast } from "react-hot-toast";
import { CheckCircleIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { form } from "framer-motion/m";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createAccountSuccess, setCreateAccountSuccess] = useState(false);
  const { createUser } = useAuth();
  const router = useRouter();

  const getMailPlatform = (email: string) => {
    if (!email) router.push("/login");
    const domain = email.split("@")[1];
    window.location.href = `https://${domain}/`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    const user = {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      country: formData.country,
      password: formData.password,
    };

    createUser.mutate(user, {
      onSuccess: () => {
        toast.success("Account created successfully", { id: "signup-toast" });
        setCreateAccountSuccess(true);
      },
      onError: (error) => {
        toast.error(
          //@ts-expect-error create user failed
          String(error.response.data.message) || "Something went wrong",
          { id: "signup-toast" },
        );
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  if (createAccountSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-[1200px] w-full bg-white rounded-2xl p-2 md:p-4 lg:p-8">
          <AuthPageHeader />
          <div className="space-y-6 lg:flex relative items-center justify-center gap-32 my-16 lg:my-32">
            <div className="flex-1">
              <div className="flex flex-col items-center justify-center gap-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircleIcon className="h-16 w-16 text-green-500" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-cyan-dark mt-4">
                    Account Created!
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-600 mt-2 text-center"
                >
                  You can now log in with your new account.
                  <br />
                  Please check your inbox for a verification link.
                </motion.p>
                <div>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                    onClick={() => getMailPlatform(formData.email)}
                    className="px-6 py-3 bg-cyan-dark text-white rounded-md block cursor-pointer"
                  >
                    {formData.email ? "Go to inbox" : "Login"}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5 text-center">
            <Link
              href={"/"}
              className="font-semibold  underline text-jean-orange hover:text-cyan-dark hover:no-underline"
            >
              Can&apos;t Signup?
            </Link>
            <AuthPageFooter />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-[1200px] w-full bg-white rounded-2xl p-2 md:p-4 lg:p-8">
        <AuthPageHeader />
        <div className="space-y-6 lg:flex relative items-center justify-center gap-32 my-16 lg:my-32">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-cyan-dark mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                    placeholder="First name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-cyan-dark mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-cyan-dark mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-cyan-dark mb-2"
                >
                  Country{" "}
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                  required
                >
                  <option disabled value="">
                    Select Country
                  </option>
                  <option value="NG">Nigeria</option>
                  <option value="GH">Ghana</option>
                </select>
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent pr-12"
                    placeholder="Create password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-cyan-dark mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent pr-12"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeSlash size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Have an account?{" "}
                <Link
                  href="/login"
                  className="text-cyan-dark font-medium hover:underline"
                >
                  Sign in
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
              disabled={isLoading}
              className="w-full flex items-center gap-4 justify-center cursor-pointer bg-white border py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/icons/google-icon.svg"
                alt="Google Logo"
                width={24}
                height={24}
              />
              Sign Up with Google
            </button>
          </div>
        </div>
        <div className="py-5 text-center">
          <Link
            href={"/"}
            className="font-semibold  underline text-jean-orange hover:text-cyan-dark hover:no-underline"
          >
            Can&apos;t Signup?
          </Link>
          <AuthPageFooter />
        </div>
      </div>
    </div>
  );
}
