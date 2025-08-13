"use client";
import { useState } from "react";
import { CountryFlag } from "./CountryFlag";
import {
  ArrowRight,
  Clock,
  Shield,
  AlertCircle,
  Edit3,
  Copy,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";

interface TransferDetails {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  exchangeRate: number;
  fee: string;
  totalAmount: string;
  estimatedTime: string;
  recipientName: string;
  recipientAccount: {
    type: "bank" | "momo";
    bankName?: string;
    accountNumber?: string;
    phoneNumber?: string;
    network?: string;
  };
}

interface TransferReviewCardProps {
  transferDetails: TransferDetails;
  onEdit?: () => void;
  onConfirm?: () => void;
  isProcessing?: boolean;
  showEditButton?: boolean;
  className?: string;
}

export default function TransferReviewCard({
  transferDetails,
  onEdit,
  onConfirm,
  isProcessing = false,
  showEditButton = true,
  className = "",
}: TransferReviewCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
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

  const getFromCountry = () => {
    return transferDetails.fromCurrency === "NGN" ? "nigeria" : "ghana";
  };

  const getToCountry = () => {
    return transferDetails.toCurrency === "GHS" ? "ghana" : "nigeria";
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      NGN: "₦",
      GHS: "₵",
    };
    return symbols[currency] || currency;
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Transfer Summary</h3>
          {showEditButton && onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-cyan-dark hover:bg-cyan-50 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Amount Flow */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            {/* From Amount */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CountryFlag country={getFromCountry()} size="md" />
                <span className="text-sm text-gray-600">You send</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {getCurrencySymbol(transferDetails.fromCurrency)} {transferDetails.fromAmount}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {transferDetails.fromCurrency}
              </div>
            </div>

            {/* Arrow */}
            <div className="px-4">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
              >
                <ArrowRight className="w-4 h-4 text-cyan-dark" />
              </motion.div>
            </div>

            {/* To Amount */}
            <div className="flex-1 text-right">
              <div className="flex items-center justify-end gap-3 mb-2">
                <span className="text-sm text-gray-600">Recipient gets</span>
                <CountryFlag country={getToCountry()} size="md" />
              </div>
              <div className="text-2xl font-bold text-cyan-dark">
                {getCurrencySymbol(transferDetails.toCurrency)} {transferDetails.toAmount}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {transferDetails.toCurrency}
              </div>
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="mt-4 pt-4 border-t border-white/50">
            <div className="text-sm text-gray-600">
              Exchange Rate: 1 {transferDetails.fromCurrency} = {transferDetails.exchangeRate} {transferDetails.toCurrency}
            </div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Recipient Details</h4>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 rounded-lg">
              {transferDetails.recipientAccount.type === "bank" ? (
                <CreditCard className="w-5 h-5 text-cyan-dark" />
              ) : (
                <Smartphone className="w-5 h-5 text-cyan-dark" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{transferDetails.recipientName}</p>
              <p className="text-sm text-gray-600">
                {transferDetails.recipientAccount.type === "bank" ? "Bank Transfer" : "Mobile Money"}
              </p>
            </div>
          </div>

          {transferDetails.recipientAccount.type === "bank" && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bank</p>
                  <p className="font-medium text-gray-900">
                    {transferDetails.recipientAccount.bankName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">
                      {transferDetails.recipientAccount.accountNumber}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(
                          transferDetails.recipientAccount.accountNumber!,
                          "Account Number"
                        )
                      }
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
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

          {transferDetails.recipientAccount.type === "momo" && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Network</p>
                  <p className="font-medium text-gray-900">
                    {getNetworkName(transferDetails.recipientAccount.network || "")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">
                      {formatPhoneNumber(transferDetails.recipientAccount.phoneNumber || "")}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(
                          transferDetails.recipientAccount.phoneNumber!,
                          "Phone Number"
                        )
                      }
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
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
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Cost Breakdown</h4>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount to convert</span>
              <span className="font-medium text-gray-900">
                {getCurrencySymbol(transferDetails.fromCurrency)} {transferDetails.fromAmount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Transfer fee</span>
              <span className="font-medium text-gray-900">
                {getCurrencySymbol(transferDetails.fromCurrency)} {transferDetails.fee}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Total amount</span>
                <span className="font-bold text-gray-900">
                  {getCurrencySymbol(transferDetails.fromCurrency)} {transferDetails.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Clock className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Delivery Time</p>
              <p className="text-xs text-blue-700">{transferDetails.estimatedTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <Shield className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Secure Transfer</p>
              <p className="text-xs text-green-700">Bank-grade encryption</p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-amber-800">Important Notice</h5>
              <p className="text-sm text-amber-700 mt-1">
                Please verify all details are correct before confirming. This transfer cannot be reversed once processed.
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        {onConfirm && (
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className="w-full bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Transfer...
              </div>
            ) : (
              "Confirm Transfer"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
