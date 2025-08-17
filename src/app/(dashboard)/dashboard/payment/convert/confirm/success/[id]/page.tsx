"use client";
import { useState, useEffect } from "react";
import { CountryFlag } from "@/app/components/payment/CountryFlag";
import {
  Check,
  Download,
  Share2,
  CreditCard,
  Smartphone,
  Calendar,
  Clock,
  Copy,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useTransferStore } from "@/app/components/contexts/TransferStore";
import { useQuery } from "@tanstack/react-query";
import { getTransactionDetails } from "@/funcs/transaction/TransactionFunc";
import { useParams } from "next/navigation";

export default function TransferSuccessPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { clearTransferData } = useTransferStore();
  const param = useParams();
  const transactionID = param.id as string;
  const {
    data: transferDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transferDetails"],
    queryFn: async () => getTransactionDetails({ transactionID }),
    enabled: true,
    refetchInterval: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    clearTransferData();
  }, [clearTransferData]);

  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied to clipboard`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const handleDownloadReceipt = () => {
    toast.error("Receipt download will be available soon");
  };

  const handleShareReceipt = () => {
    if (navigator.share && transferDetails) {
      navigator.share({
        title: "Transfer Receipt",
        text: `Transfer of ${transferDetails?.transaction.transaction_details.from_currency} ${transferDetails?.transaction.transaction_details.from_amount} completed successfully. Transaction ID: ${transferDetails?.transaction.transactionId}`,
      });
    } else {
      toast.error("Share functionality will be available soon");
    }
  };

  if (isLoading && !error && !transferDetails) {
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

  if (!isLoading && error) {
    return (
      <main className="py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-red-100 p-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-red-700 mb-2">
            Invalid Transaction
          </h1>
          <p className="text-gray-600 text-center mb-4">
            Sorry you cannot view this transaction details. It may have been
            deleted or does not exist.
          </p>
          <a
            href="/dashboard/payment/convert"
            className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="py-6">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
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
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-green-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              Transfer Submitted Successfully!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-600 mb-6"
            >
              Your transfer to &nbsp;
              {transferDetails?.transaction.transaction_details.recipient_name}
              &nbsp; has been submitted and is currently being processed. We
              will notify you once it is completed.
            </motion.p>

            {/* Transaction ID */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="font-mono font-medium text-gray-900">
                    {transferDetails?.transaction.transaction_id}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      transferDetails?.transaction.transaction_id || "",
                      "Transaction ID",
                    )
                  }
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy
                    className={`w-4 h-4 ${
                      copiedField === "Transaction ID"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Transfer Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Transfer Details
          </h2>

          {/* Amount Summary */}
          <div className="bg-green-bg rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CountryFlag
                    country={
                      transferDetails?.transaction.transaction_details
                        .from_currency === "NGN"
                        ? "nigeria"
                        : "ghana"
                    }
                    size="md"
                  />
                  <span className="text-sm text-gray-600">Amount Sent</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    transferDetails?.transaction.transaction_details
                      .from_currency
                  }{" "}
                  {transferDetails?.transaction.transaction_details.from_amount.toLocaleString()}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CountryFlag
                    country={
                      transferDetails?.transaction.transaction_details
                        .to_currency === "GHS"
                        ? "ghana"
                        : "nigeria"
                    }
                    size="md"
                  />
                  <span className="text-sm text-gray-600">Amount Received</span>
                </div>
                <p className="text-2xl font-bold text-cyan-dark">
                  {transferDetails?.transaction.transaction_details.to_currency}{" "}
                  {transferDetails?.transaction.transaction_details.to_amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-bg rounded-lg">
                {transferDetails?.transaction.payment_type === "bank" ? (
                  <CreditCard className="w-5 h-5 text-cyan-dark" />
                ) : (
                  <Smartphone className="w-5 h-5 text-cyan-dark" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {
                    transferDetails?.transaction.transaction_details
                      .recipient_name
                  }
                </p>
                <p className="text-sm text-gray-600">
                  {transferDetails?.transaction.payment_type === "bank"
                    ? "Bank Transfer"
                    : "Mobile Money"}
                </p>
              </div>
            </div>

            {transferDetails?.transaction.payment_type === "bank" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Bank</p>
                    <p className="font-medium text-gray-900">
                      {
                        transferDetails?.transaction.transaction_details
                          .bank_name
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Number</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">
                        {
                          transferDetails?.transaction.transaction_details
                            .account_number
                        }
                      </p>
                      <button
                        onClick={() =>
                          handleCopy(
                            transferDetails?.transaction.transaction_details
                              .bank_name || "",
                            "Account Number",
                          )
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Copy
                          className={`w-3 h-3 ${
                            copiedField === "Account Number"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {transferDetails?.transaction.payment_type === "momo" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Network</p>
                    <p className="font-medium text-gray-900">
                      {getNetworkName(
                        transferDetails?.transaction.transaction_details
                          .network || "",
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">
                        {formatPhoneNumber(
                          transferDetails?.transaction.transaction_details
                            .phone_number || "",
                        )}
                      </p>
                      <button
                        onClick={() =>
                          handleCopy(
                            transferDetails?.transaction.transaction_details
                              .phone_number || "",
                            "Phone Number",
                          )
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Copy
                          className={`w-3 h-3 ${
                            copiedField === "Phone Number"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Date and Time */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(
                        transferDetails?.transaction.created_at || "",
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium text-gray-900">
                      {formatTime(
                        transferDetails?.transaction.created_at || "",
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            <button
              onClick={handleShareReceipt}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Receipt
            </button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        {/*<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <QuickActions variant="post-transfer" maxActions={6} />
        </motion.div>*/}
      </div>
    </main>
  );
}
