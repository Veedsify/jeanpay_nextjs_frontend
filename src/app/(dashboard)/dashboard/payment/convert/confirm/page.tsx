"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CountryFlag } from "@/components/payment/CountryFlag";
import AccountVerificationSteps, {
  createAccountVerificationSteps,
} from "@/components/payment/AccountVerificationSteps";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  AlertCircle,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  useConversionData,
  useAccountDetails,
  useTransferActions,
  useTransferValidation,
  useTransferLoading,
  useTransferStore,
} from "@/components/contexts/TransferStore";
import { getBankAccounts } from "@/funcs/paystack/paystack";
import { BankAccountsType } from "@/types/paystack";
import { MomoAccountsType } from "@/types/momo";
// import { getMomoProviders } from "@/funcs/momo/momo";

const paymentMethods = [
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Send to bank account",
    icon: CreditCard,
    countries: ["nigeria", "ghana"],
  },
  {
    id: "momo",
    name: "Mobile Money",
    description: "Send to mobile money account",
    icon: Smartphone,
    countries: ["ghana"],
  },
];

export default function ConfirmTransferPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [showVerificationSteps, setShowVerificationSteps] = useState(false);
  const [nigeriaBanks, setNigerianBanks] = useState<BankAccountsType[]>([]);
  const [error, setError] = useState(false);
  const [verificationKey, setVerificationKey] = useState(0);
  const [ghanaNetworks] = useState<MomoAccountsType[]>([
    {
      id: 1,
      name: "MTN Mobile Money",
      code: "MTN",
    },
  ]);
  // Zustand store
  const conversionData = useConversionData();
  const accountDetails = useAccountDetails();
  const {
    setAccountDetails,
    setValidating,
    setValidationError,
    generateTransferDetails,
  } = useTransferActions();
  const { validationError } = useTransferStore();
  const { validateForm } = useTransferValidation();
  const { isValidating } = useTransferLoading();

  useEffect(() => {
    setValidating(false);
  }, [setValidating]);

  useEffect(() => {
    const fetchBanks = async () => {
      const response = await getBankAccounts("nigeria");
      const data = response.data.data;
      setNigerianBanks(data);
    };
    fetchBanks();
  }, [setNigerianBanks]);

  useEffect(() => {
    // Redirect back if no conversion data
    if (!conversionData.fromAmount || !conversionData.toAmount) {
      router.push("/dashboard/payment/convert");
    }
  }, [conversionData.fromAmount, conversionData.toAmount, router]);

  const handleMethodSelect = useCallback(
    (methodId: string) => {
      setSelectedMethod(methodId);
      setAccountDetails({
        type: methodId as "bank" | "momo",
        // Clear previous details when switching methods
        accountNumber: undefined,
        bankCode: undefined,
        bankName: undefined,
        phoneNumber: undefined,
        network: undefined,
        recipientName: undefined,
      });
      setValidationError("");
    },
    [setSelectedMethod, setAccountDetails, setValidationError],
  );
  useEffect(() => {
    switch (conversionData.toCurrency) {
      case "NGN":
        handleMethodSelect("bank");
        break;
      case "GHS":
        handleMethodSelect("momo");
        break;
    }
  }, [conversionData.toCurrency, handleMethodSelect]);

  const handleInputChange = (field: string, value: string) => {
    // For phoneNumber and accountNumber, reject any non-numeric input immediately
    if (field === "phoneNumber" || field === "accountNumber") {
      // Remove any non-numeric characters
      value = value.replace(/[^0-9]/g, "");
    }
    setAccountDetails({
      [field]: value,
    });
    setValidationError("");
  };

  // Additional handler for keypress events to prevent non-numeric input
  const handleNumericKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, tab, escape, enter, and arrow keys
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Escape" ||
      e.key === "Enter" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      return;
    }

    // Prevent non-numeric characters
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const validateAccount = async () => {
    const validate = validateForm();
    if (!validate) {
      setError(true);
      setShowVerificationSteps(true);
      setValidationError("Please fill in all required fields");
      return;
    }

    setError(false);
    setValidating(true);
    setValidationError("");
    setShowVerificationSteps(true);
  };

  const handleVerificationComplete = useCallback(async () => {
    generateTransferDetails();
    console.log("Account details validated successfully");
    router.push("/dashboard/payment/convert/confirm/verify");
  }, [generateTransferDetails, router]);

  const handleVerificationError = (stepId: string, error: string) => {
    setValidationError(error);
    setError(true);
    setValidating(false);
  };

  const handleRetryVerification = () => {
    setError(false);
    setValidationError("");
    setShowVerificationSteps(false);
    setVerificationKey((prev) => prev + 1);
    // Restart validation
    setTimeout(() => {
      validateAccount();
    }, 100);
  };

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
              Enter recipient account information
            </h1>
          </div>
        </div>

        {/* Conversion Summary */}
        <div className="bg-green-bg rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CountryFlag
                country={
                  conversionData.fromCurrency === "NGN" ? "nigeria" : "ghana"
                }
                size="md"
              />
              <div>
                <p className="text-sm text-gray-600">You&apos;re sending</p>
                <p className="text-xl font-semibold text-gray-900">
                  {conversionData.fromCurrency} {conversionData.fromAmount}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Recipient gets</p>
                <p className="text-xl font-semibold text-cyan-dark">
                  {conversionData.toCurrency} {conversionData.toAmount}
                </p>
              </div>
              <CountryFlag
                country={
                  conversionData.fromCurrency !== "NGN" ? "nigeria" : "ghana"
                }
                size="md"
              />
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Select Recipient Payment Method
          </h2>
          <div className="grid gap-4">
            {paymentMethods
              .filter((method) => {
                // Filter out methods not available for the target currency
                if (
                  method.id === "bank" &&
                  conversionData.toCurrency === "GHS"
                ) {
                  return false;
                }
                if (
                  method.id === "momo" &&
                  conversionData.toCurrency === "NGN"
                ) {
                  return false;
                }
                return true;
              })
              .map((method) => (
                <motion.div
                  key={method.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "border-cyan-dark bg-green-bg"
                      : "border-gray-200 hover:border-jean-orange"
                  }`}
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedMethod === method.id
                            ? "bg-cyan-dark text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {method.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <Check className="w-5 h-5 text-cyan-dark" />
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Account Details Form */}
        {selectedMethod && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {selectedMethod === "bank"
                ? "Bank Account Details"
                : "Mobile Money Details"}
            </h2>

            {selectedMethod === "bank" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Bank
                  </label>
                  <select
                    value={accountDetails.bankCode || ""}
                    onChange={(e) => {
                      const bank = nigeriaBanks.find(
                        (b) => b.code === e.target.value,
                      );
                      handleInputChange("bankCode", e.target.value);
                      handleInputChange("bankName", bank?.name || "");
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                  >
                    <option value="">Select a bank</option>
                    {nigeriaBanks.map((bank) => (
                      <option key={bank.id} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    value={accountDetails.accountNumber || ""}
                    onChange={(e) => {
                      handleInputChange("accountNumber", e.target.value);
                    }}
                    onKeyDown={handleNumericKeyPress}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedText = e.clipboardData.getData("text");
                      const numericOnly = pastedText.replace(/[^0-9]/g, "");
                      handleInputChange("accountNumber", numericOnly);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                    placeholder="Enter 10-digit account number"
                    maxLength={10}
                  />
                </div>
              </div>
            )}

            {selectedMethod === "momo" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Network
                  </label>
                  <select
                    value={accountDetails.network || ""}
                    onChange={(e) =>
                      handleInputChange("network", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                  >
                    <option value="">Select network</option>
                    {ghanaNetworks.map((network) => (
                      <option key={network.code} value={network.code}>
                        {network.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    required
                    value={accountDetails.phoneNumber || ""}
                    onChange={(e) => {
                      handleInputChange("phoneNumber", e.target.value);
                    }}
                    onKeyDown={handleNumericKeyPress}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedText = e.clipboardData.getData("text");
                      const numericOnly = pastedText.replace(/[^0-9]/g, "");
                      handleInputChange("phoneNumber", numericOnly);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:border-transparent"
                    placeholder="Enter mobile money number"
                  />
                </div>
              </div>
            )}

            {error && showVerificationSteps && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-4">
                <div className="flex items-center gap-2 text-red-700 mb-3">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Verification Failed</span>
                </div>
                <p className="text-red-600 text-sm mb-3">{validationError}</p>
                <button
                  onClick={handleRetryVerification}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Retry Verification
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Verification Steps */}
        {showVerificationSteps && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <AccountVerificationSteps
              key={verificationKey}
              steps={createAccountVerificationSteps(
                accountDetails.type,
                accountDetails,
              )}
              accountDetails={accountDetails}
              onComplete={handleVerificationComplete}
              onError={handleVerificationError}
            />
          </motion.div>
        )}

        {/* Continue Button */}
        {!error && (
          <button
            onClick={validateAccount}
            disabled={!selectedMethod || isValidating}
            className="w-full bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isValidating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Validating Account...
              </div>
            ) : (
              "Verify Account & Continue"
            )}
          </button>
        )}
      </div>
    </main>
  );
}
