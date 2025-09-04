"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CountryFlag } from "@/components/payment/CountryFlag";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Smartphone,
  Clock,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  useTransferDetails,
  useTransferActions,
} from "@/components/contexts/TransferStore";
import useTransaction from "@/hooks/TransactionHook";

export default function VerifyTransferPage() {
  const router = useRouter();
  const [confirmationStep, setConfirmationStep] = useState(1);
  // Zustand store
  const transferDetails = useTransferDetails();
  const { setProcessing, setTransferDetails, setTransferError, clearError } =
    useTransferActions();
  const { createTransactionMutation } = useTransaction();
  const handleMethodOfPaymentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedMethod = event.target.value as "wallet" | "checkout";
    if (!selectedMethod) return;
    setTransferDetails({ method_of_payment: selectedMethod });
  };

  useEffect(() => {
    clearError();
    // Redirect back if no transfer details
    if (!transferDetails) {
      router.push("/dashboard/payment/convert/confirm");
    }
  }, [transferDetails, router, clearError]);

  const handleConfirmTransfer = async () => {
    if (!transferDetails?.method_of_payment) {
      toast.error("Please select a payment method");
      return;
    }

    // If direct payment is selected, redirect to direct payment page
    if (transferDetails.method_of_payment === "checkout") {
      router.push("/dashboard/payment/convert/confirm/verify/direct-payment");
      return;
    }

    // Handle wallet payment
    setConfirmationStep(2);
    setProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    // Simulate transfer processing
    createTransactionMutation.mutate(
      {
        ...transferDetails,
      },
      {
        onSuccess: (trx) => {
          setConfirmationStep(3);
          setProcessing(false);
          router.push(
            `/dashboard/payment/convert/confirm/success/${trx.data.transaction.transactionId}`,
          );
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          setProcessing(false);
          const err = JSON.parse(error.response?.data?.code);
          setTransferError(err);
          router.push("/dashboard/payment/convert/confirm/error");
        },
      },
    );
  };

  const formatPhoneNumber = (phone: string) => {
    // Format phone number for display
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

  if (!transferDetails) {
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
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Verify Transfer Details
            </h1>
            <p className="text-gray-600">Review and confirm your transfer</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {["Verify Details", "Processing", "Complete"].map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${index < 2 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    confirmationStep > index + 1
                      ? "bg-green-500 text-white"
                      : confirmationStep === index + 1
                        ? "bg-cyan-dark text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {confirmationStep > index + 1 ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    confirmationStep >= index + 1
                      ? "text-gray-900 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
                {index < 2 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      confirmationStep > index + 1
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {confirmationStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Transfer Summary */}
            <div className="bg-green-bg rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Transfer Summary
              </h3>
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
                    <span className="text-sm text-gray-600">
                      You&apos;re sending
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {transferDetails.fromCurrency} {transferDetails.fromAmount}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CountryFlag
                      country={
                        transferDetails.toCurrency === "GHS"
                          ? "ghana"
                          : "nigeria"
                      }
                      size="md"
                    />
                    <span className="text-sm text-gray-600">
                      Recipient gets
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-cyan-dark">
                    {transferDetails.toCurrency} {transferDetails.toAmount}
                  </p>
                </div>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recipient Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-bg rounded-lg">
                    {transferDetails.method === "bank" ? (
                      <CreditCard className="w-5 h-5 text-cyan-dark" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-cyan-dark" />
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
            </div>

            {/* Method of Payment */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Method Of Payment
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        onChange={handleMethodOfPaymentChange}
                        className="w-4 h-4 text-jean-orange border-gray-300 accent-jean-orange border-none"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        Wallet Balance
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="checkout"
                        name="paymentMethod"
                        onChange={handleMethodOfPaymentChange}
                        className="w-4 h-4 text-jean-orange border-gray-300 accent-jean-orange border-none"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        Direct Payment to Company Account
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">
                    Security Notice
                  </h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Please verify all details are correct before proceeding.
                    This transfer cannot be reversed once confirmed.
                  </p>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmTransfer}
              className="w-full bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {transferDetails.method_of_payment === "checkout"
                ? "Proceed to Payment"
                : "Confirm Transfer"}
            </button>
          </motion.div>
        )}

        {confirmationStep === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-cyan-dark animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Processing Transfer
            </h3>
            <p className="text-gray-600 mb-4">
              Please wait while we process your transfer...
            </p>
            <div className="w-8 h-8 border-2 border-cyan-dark border-t-transparent rounded-full animate-spin mx-auto"></div>
          </motion.div>
        )}

        {confirmationStep === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Transfer Processing!
            </h3>
            <p className="text-gray-600">Redirecting to confirmation page...</p>
          </motion.div>
        )}
      </div>

      {/* Toast Container */}
    </main>
  );
}
