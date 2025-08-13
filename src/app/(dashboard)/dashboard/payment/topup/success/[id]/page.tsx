"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  CheckCircle2,
  ArrowLeft,
  Copy,
  Calendar,
  Hash,
  Wallet,
  CreditCard,
  Smartphone,
  Download,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useWallet from "@/hooks/WalletHook";

export default function TopupSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const [copiedField, setCopiedField] = useState<string>("");
  const { useTopUpDetails } = useWallet();

  const {
    data: topupDetails,
    isLoading: loading,
    error,
  } = useTopUpDetails(params.id as string);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      toast.success(`${field} copied to clipboard`);
      setTimeout(() => setCopiedField(""), 2000);
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading || !params.id) {
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

  if (error || !topupDetails) {
    return (
      <main className="py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Top-up Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The requested top-up transaction could not be found.
            </p>
            <button
              onClick={() => router.push("/dashboard/payment/topup")}
              className="bg-cyan-dark text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Back to Top-up
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Top-up Confirmation
            </h1>
            <p className="text-gray-600">Your wallet top-up request details</p>
          </div>
        </div>

        {/* Success Animation */}
        <motion.div
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Top-up Request Submitted!
          </h2>
          <motion.p
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600"
          >
            Your wallet top-up request has been submitted and is being
            processed. You will be notified once the payment is verified.
          </motion.p>
        </motion.div>

        {/* Transaction Details */}
        <div className="bg-green-bg rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transaction Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-5 h-5 text-cyan-dark" />
                <span className="text-sm text-gray-600">Top-up Amount</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {topupDetails.currency} {topupDetails.amount.toLocaleString()}
              </p>
            </div>

            {/* Status */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-dark" />
                <span className="text-sm text-gray-600">Status</span>
              </div>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(topupDetails.status)}`}
              >
                {topupDetails.status}
              </span>
            </div>
          </div>
        </div>

        {/* Transaction Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transaction Information
          </h3>

          <div className="space-y-4">
            {/* Transaction ID */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Hash className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="font-medium text-gray-900">
                    {topupDetails.transactionId}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(topupDetails.transactionId, "Transaction ID")
                }
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Copy
                  className={`w-4 h-4 ${copiedField === "Transaction ID" ? "text-green-600" : "text-gray-600"}`}
                />
              </button>
            </div>

            {/* Payment Method */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {topupDetails.paymentMethod === "bank" ? (
                <CreditCard className="w-5 h-5 text-gray-600" />
              ) : (
                <Smartphone className="w-5 h-5 text-gray-600" />
              )}
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium text-gray-900">
                  {topupDetails.paymentMethod === "bank"
                    ? "Bank Transfer"
                    : "Mobile Money"}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-medium text-gray-900">
                  {formatDate(topupDetails.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">What happens next?</h4>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• We will verify your payment within 5-15 minutes</li>
                <li>
                  • Your wallet will be credited automatically once verified
                </li>
                <li>
                  • You will receive a notification when the top-up is complete
                </li>
                <li>• You can track the status in your transaction history</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/dashboard/history")}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            View Transaction History
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 transition-all flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => {
              // Download receipt functionality
              toast.success("Receipt download feature coming soon!");
            }}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Receipt
          </button>

          <button
            onClick={() => {
              // Share functionality
              if (navigator.share) {
                navigator.share({
                  title: "JeanPay Top-up",
                  text: `Top-up request of ${topupDetails.currency} ${topupDetails.amount.toLocaleString()} submitted successfully!`,
                  url: window.location.href,
                });
              } else {
                copyToClipboard(window.location.href, "Page URL");
              }
            }}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </main>
  );
}
