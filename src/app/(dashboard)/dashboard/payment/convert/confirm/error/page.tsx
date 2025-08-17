"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CountryFlag } from "@/app/components/payment/CountryFlag";
import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Home,
  Phone,
  Mail,
  CreditCard,
  Smartphone,
  Copy,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  useTransferDetails,
  useTransferError,
  useTransferActions,
  TransferError,
  useTransferStore,
} from "@/app/components/contexts/TransferStore";

export default function TransferErrorPage() {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);

  // Zustand store
  const transferDetails = useTransferDetails();
  const transferError = useTransferError();
  const { setValidating } = useTransferStore();
  const { setTransferDetails, setTransferError } = useTransferActions();
  const [errorDetails, setErrorDetails] = useState<TransferError | null>(null);

  useEffect(() => {
    // Redirect back if no transfer details
    if (!transferDetails) {
      setValidating(false);
      router.push("/dashboard/payment/convert");
      return;
    }

    // Set error details from store or use default
    if (transferError) {
      setErrorDetails(transferError);
    } else {
      router.push("/dashboard/payment/convert/confirm/verify");
    }

    // Generate transaction ID if not already set
    if (!transferDetails.transactionId) {
      setTransferDetails({
        transactionId: `ERR${Date.now().toString().slice(-8)}`,
      });
    }
  }, [
    transferDetails,
    transferError,
    router,
    setValidating,
    setTransferDetails,
    setTransferError,
  ]);

  const handleRetry = async () => {
    setIsRetrying(true);

    try {
      // Simulate retry attempt
      // Clear error and redirect back to verify page
      setTransferError(null);
      router.push("/dashboard/payment/convert/confirm/verify");
    } catch {
      toast.error("Retry failed. Please try again later.");
    } finally {
      setIsRetrying(false);
    }
  };

  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${fieldName} copied to clipboard`);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.length >= 10) {
      return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
    }
    return phone;
  };

  const getNetworkName = (code: string) => {
    const networks: Record<string, string> = {
      mtn: "MTN",
      vodafone: "Vodafone",
      airteltigo: "AirtelTigo",
    };
    return networks[code] || code;
  };

  if (!transferDetails || !errorDetails) {
    return (
      <main className="py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-cyan-dark border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-6">
      <div className="max-w-2xl mx-auto">
        {/* Error Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              {errorDetails.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-600 mb-2"
            >
              {errorDetails.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-sm text-gray-500 mb-6"
            >
              {errorDetails.action}
            </motion.p>

            {/* Transaction Reference */}
            {transferDetails.transactionId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="bg-gray-50 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Reference ID</p>
                    <p className="font-mono font-medium text-gray-900">
                      {transferDetails.transactionId}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(transferDetails.transactionId!, "Reference ID")
                    }
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Failed Transfer Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Transfer Details
          </h2>

          {/* Amount Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CountryFlag
                    country={
                      transferDetails.fromCurrency === "NGN"
                        ? "nigeria"
                        : "ghana"
                    }
                    size="md"
                  />
                  <span className="text-sm text-gray-600">Amount to Send</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {transferDetails.fromCurrency} {transferDetails.fromAmount}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CountryFlag
                    country={
                      transferDetails.toCurrency === "GHS" ? "ghana" : "nigeria"
                    }
                    size="md"
                  />
                  <span className="text-sm text-gray-600">
                    Amount to Receive
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-500">
                  {transferDetails.toCurrency} {transferDetails.toAmount}
                </p>
              </div>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                {transferDetails.method === "bank" ? (
                  <CreditCard className="w-5 h-5 text-gray-600" />
                ) : (
                  <Smartphone className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {transferDetails.recipientName}
                </p>
                <p className="text-sm text-gray-600">
                  {transferDetails.method === "bank"
                    ? "Bank Transfer"
                    : "Mobile Money"}
                </p>
              </div>
            </div>

            {transferDetails.method === "bank" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Bank</p>
                    <p className="font-medium text-gray-900">
                      {transferDetails.bankName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Number</p>
                    <p className="font-medium text-gray-900">
                      {transferDetails.accountNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {transferDetails.method === "momo" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Network</p>
                    <p className="font-medium text-gray-900">
                      {getNetworkName(transferDetails.network || "")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-medium text-gray-900">
                      {formatPhoneNumber(transferDetails.phoneNumber || "")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div className="space-y-4">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isRetrying ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Retrying Transfer...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Retry Transfer
                </div>
              )}
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setValidating(false);
                  router.push("/dashboard/payment/convert/confirm");
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Edit Details
              </button>
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Need Help?
          </h3>
          <p className="text-blue-800 mb-4">
            If you continue to experience issues, please contact our support
            team.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="tel:+233123456789"
              className="flex items-center gap-2 text-blue-700 hover:text-blue-800"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+233 123 456 789</span>
            </a>
            <a
              href="mailto:support@jeanpay.com"
              className="flex items-center gap-2 text-blue-700 hover:text-blue-800"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">support@jeanpay.com</span>
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
