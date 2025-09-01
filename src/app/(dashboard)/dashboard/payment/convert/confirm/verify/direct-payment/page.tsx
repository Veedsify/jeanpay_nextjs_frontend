"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CountryFlag } from "@/components/payment/CountryFlag";
import {
  ArrowLeft,
  Copy,
  CreditCard,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

import toast from "react-hot-toast";
import {
  useTransferDetails,
  useTransferActions,
} from "@/components/contexts/TransferStore";
import useTransaction from "@/hooks/TransactionHook";
import { PaymentAccount } from "@/types/account";
import { axiosClient } from "@/lib/axios";

export default function DirectPaymentPage() {
  const router = useRouter();
  const [hasPaid, setHasPaid] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [copiedField, setCopiedField] = useState<string>("");
  const [loadingAccount, setLoadingAccount] = useState(true);
  // Zustand store
  const transferDetails = useTransferDetails();
  const { setValidating } = useTransferActions();
  const { setProcessing } = useTransferActions();
  const { createTransactionMutation } = useTransaction();
  const [paymentAccount, setPaymentAccount] = useState<PaymentAccount | null>(
    null,
  );
  const fetchPaymentAccount = useCallback(async () => {
    if (!transferDetails) return; // Add guard clause
    try {
      setLoadingAccount(true);
      const response = await axiosClient(`/payment-accounts/active`, {
        params: {
          currency: transferDetails?.fromCurrency,
          account_type: transferDetails?.method === "bank" ? "momo" : "bank",
        },
      });

      if (response.data.error === false && response.data.data.length > 0) {
        setPaymentAccount(response.data.data[0]); // Use the first active account
      } else {
        toast.error(
          "No payment account available for this currency and payment type",
        );
        setValidating(false);
        router.push("/dashboard/payment/convert");
      }
    } catch (error) {
      console.error("Failed to fetch payment account:", error);
      toast.error("Failed to load payment account details");
      router.push("/dashboard/payment/topup");
    } finally {
      setLoadingAccount(false);
    }
  }, [router, transferDetails, setValidating]);

  useEffect(() => {
    if (transferDetails) {
      fetchPaymentAccount();
    }
  }, [transferDetails, fetchPaymentAccount]);

  useEffect(() => {
    // Redirect back if no transfer details or not direct payment
    if (!transferDetails || transferDetails.method_of_payment !== "checkout") {
      router.push("/dashboard/payment/convert/confirm/verify");
    }
  }, [transferDetails, router]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      toast.success(`${field} copied to clipboard`);
      setTimeout(() => setCopiedField(""), 2000);
    });
  };

  const handleConfirmPayment = async () => {
    if (!hasPaid) {
      toast.error("Please confirm that you have made the payment");
      return;
    }

    setIsConfirming(true);
    setProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    // Create transaction with direct payment method
    createTransactionMutation.mutate(
      {
        ...transferDetails!,
        method_of_payment: "checkout",
      },
      {
        onSuccess: (trx) => {
          setProcessing(false);
          setIsConfirming(false);
          router.push(
            `/dashboard/payment/convert/confirm/success/${trx.data.transaction.transactionId}`,
          );
        },
        onError: (error) => {
          console.log(error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Transaction creation failed";
          toast.error(errorMessage);
          setProcessing(false);
          setIsConfirming(false);
        },
      },
    );
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
              Complete Your Payment
            </h1>
            <p className="text-gray-600">Send money to the account below</p>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Important Notice</h4>
              <p className="text-sm text-amber-700 mt-1">
                Please send exactly{" "}
                <span className="font-semibold">
                  {transferDetails.fromCurrency} {transferDetails.fromAmount}
                </span>{" "}
                to the account details below. Any discrepancy in amount may
                delay processing.
              </p>
            </div>
          </div>
        </div>

        {/* Transfer Summary */}
        <div className="bg-green-bg rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Summary
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CountryFlag
                  country={
                    transferDetails.fromCurrency === "NGN" ? "nigeria" : "ghana"
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
                <span className="text-sm text-gray-600">Recipient Gets</span>
              </div>
              <p className="text-2xl font-bold text-cyan-dark">
                {transferDetails.toCurrency} {transferDetails.toAmount}
              </p>
            </div>
          </div>
        </div>
        {/* Account Details */}
        {loadingAccount ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-cyan-dark border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              {paymentAccount?.account_type === "bank" ? (
                <CreditCard className="w-6 h-6 text-cyan-dark" />
              ) : (
                <Smartphone className="w-6 h-6 text-cyan-dark" />
              )}
              <h3 className="text-lg font-semibold text-gray-900">
                {paymentAccount?.account_type === "bank"
                  ? "Bank Account Details"
                  : "Mobile Money Details"}
              </h3>
            </div>

            <div className="space-y-4">
              {paymentAccount?.account_type === "bank" ? (
                <>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Account Name</p>
                      <p className="font-medium text-gray-900">
                        {paymentAccount.account_name}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          paymentAccount.account_name,
                          "Account Name",
                        )
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Copy
                        className={`w-4 h-4 ${copiedField === "Account Name" ? "text-green-600" : "text-gray-600"}`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Account Number</p>
                      <p className="font-medium text-gray-900">
                        {paymentAccount.account_number}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          paymentAccount.account_number || "",
                          "Account Number",
                        )
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Copy
                        className={`w-4 h-4 ${copiedField === "Account Number" ? "text-green-600" : "text-gray-600"}`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Bank Name</p>
                      <p className="font-medium text-gray-900">
                        {paymentAccount.bank_name}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          paymentAccount.bank_name || "",
                          "Bank Name",
                        )
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Copy
                        className={`w-4 h-4 ${copiedField === "Bank Name" ? "text-green-600" : "text-gray-600"}`}
                      />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Account Name</p>
                      <p className="font-medium text-gray-900">
                        {paymentAccount?.account_name}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          paymentAccount?.account_name || "",
                          "Account Name",
                        )
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Copy
                        className={`w-4 h-4 ${copiedField === "Account Name" ? "text-green-600" : "text-gray-600"}`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-medium text-gray-900">
                        {paymentAccount?.phone_number}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          paymentAccount?.phone_number || "",
                          "Phone Number",
                        )
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Copy
                        className={`w-4 h-4 ${copiedField === "Phone Number" ? "text-green-600" : "text-gray-600"}`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Network</p>
                      <p className="font-medium text-gray-900">
                        {paymentAccount?.network}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          paymentAccount?.network || "",
                          "Network",
                        )
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Copy
                        className={`w-4 h-4 ${copiedField === "Network" ? "text-green-600" : "text-gray-600"}`}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Payment Confirmation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Processing Time</h4>
              <p className="text-sm text-blue-700 mt-1">
                Once you make the payment, it typically takes 5-15 minutes for
                us to verify and process your transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Confirmation Checkbox */}
        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasPaid}
              onChange={(e) => setHasPaid(e.target.checked)}
              className="w-5 h-5 text-cyan-dark border-gray-300 rounded focus:ring-cyan-dark focus:ring-2 mt-0.5"
            />
            <div>
              <span className="text-sm font-medium text-gray-900">
                I have completed the payment
              </span>
              <p className="text-xs text-gray-600 mt-1">
                Please confirm that you have sent the exact amount to the
                account details above.
              </p>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all"
          >
            Go Back
          </button>
          <button
            onClick={handleConfirmPayment}
            disabled={!hasPaid || isConfirming}
            className="flex-1 bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isConfirming ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Confirm Payment Made
              </>
            )}
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Having trouble? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </main>
  );
}
