"use client";

import { useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  CreditCard,
  User,
  Hash,
  FileText,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getStatusColor, formatCurrency, formatDate } from "@/lib/utils";
import PaymentCardIcon from "../commons/PaymentCardIcon";

interface TransactionDetails {
  id?: number;
  transaction_id?: string;
  reference?: string;
  status?: string;
  payment_type?: string;
  direction?: string;
  description?: string;
  reason?: string;
  transaction_type?: string;
  created_at?: string;
  updated_at?: string;
  transaction_details?: {
    from_currency?: string;
    to_currency?: string;
    from_amount?: number;
    to_amount?: number;
    recipient_name?: string;
    bank_name?: string;
    account_number?: string;
    network?: string;
    phone_number?: string;
    method_of_payment?: string;
  };
}

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionDetails: TransactionDetails | null;
  isLoading: boolean;
}

const currencyDirection = {
  "NGN-GHS": "Naira To Ghana Cedi Transfer",
  "GHS-NGN": "Ghana Cedi To Naira Transfer",
  "DEPOSIT-NGN": "Deposit To Naira Wallet",
  "DEPOSIT-GHS": "Deposit To Ghana Cedi Wallet",
  "WITHDRAWAL-NGN": "Withdrawal From Naira Wallet",
  "WITHDRAWAL-GHS": "Withdrawal From Ghana Cedi Wallet",
};

export default function TransactionDetailsModal({
  isOpen,
  onClose,
  transactionDetails,
  isLoading,
}: TransactionDetailsModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const getTransactionIcon = (direction: string) => {
    if (direction?.includes("DEPOSIT")) return ArrowDownLeft;
    if (direction?.includes("WITHDRAWAL")) return ArrowUpRight;
    return RefreshCcw;
  };

  const getTransactionName = (direction: string) => {
    return (
      currencyDirection[direction as keyof typeof currencyDirection] ||
      "Transaction"
    );
  };

  // Get the main amount and currency based on transaction type
  const getMainAmount = (transaction: TransactionDetails) => {
    const details = transaction.transaction_details;
    if (details?.from_amount && details?.from_currency) {
      return {
        amount: details.from_amount,
        currency: details.from_currency,
      };
    }
    return { amount: 0, currency: "NGN" };
  };

  // Calculate exchange rate
  const getExchangeRate = (transaction: TransactionDetails) => {
    const details = transaction.transaction_details;
    if (details?.from_amount && details?.to_amount && details.from_amount > 0) {
      return (details.to_amount / details.from_amount).toFixed(4);
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] mx-2 md:mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-2 md:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Transaction Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-2 md:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-300">
                  Loading transaction details...
                </span>
              </div>
            ) : transactionDetails ? (
              <div className="space-y-6">
                {/* Transaction Header */}
                <div className="md:flex gap-4 items-center space-y-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-cyan-dark)" }}
                  >
                    {(() => {
                      const IconComponent = getTransactionIcon(
                        transactionDetails.direction || ""
                      );
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {getTransactionName(transactionDetails.direction || "")}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transactionDetails.description}
                    </p>
                  </div>
                  <div className="md:text-right">
                    {(() => {
                      const mainAmount = getMainAmount(transactionDetails);
                      return (
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {formatCurrency(
                            mainAmount.amount,
                            mainAmount.currency
                          )}
                        </p>
                      );
                    })()}
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        transactionDetails.status || "pending"
                      )}`}
                    >
                      {(transactionDetails.status || "pending")
                        .charAt(0)
                        .toUpperCase() +
                        (transactionDetails.status || "pending").slice(1)}
                    </span>
                  </div>
                </div>

                {/* Transaction Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                      Transaction Information
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Transaction ID
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {transactionDetails.transaction_id ||
                              transactionDetails.id}
                          </p>
                        </div>
                      </div>

                      {transactionDetails.reference && (
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Reference
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {transactionDetails.reference}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Payment Type
                          </p>
                          <div className="flex items-center space-x-2">
                            <PaymentCardIcon
                              type={
                                transactionDetails.payment_type || "paystack"
                              }
                              size="sm"
                            />
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {transactionDetails.payment_type || "Paystack"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {transactionDetails.created_at && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Date Created
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatDate(
                                transactionDetails.created_at,
                                "long"
                              )}
                            </p>
                          </div>
                        </div>
                      )}

                      {transactionDetails.created_at && (
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Time
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatDate(
                                transactionDetails.created_at,
                                "time"
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction Details */}
                  {transactionDetails.transaction_details && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                        Transaction Details
                      </h4>

                      <div className="space-y-3">
                        {transactionDetails.transaction_details
                          .from_currency && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              From Currency
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatCurrency(
                                transactionDetails.transaction_details
                                  .from_amount || 0,
                                transactionDetails.transaction_details
                                  .from_currency
                              )}
                            </p>
                          </div>
                        )}

                        {transactionDetails.transaction_details.to_currency && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              To Currency
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatCurrency(
                                transactionDetails.transaction_details
                                  .to_amount || 0,
                                transactionDetails.transaction_details
                                  .to_currency
                              )}
                            </p>
                          </div>
                        )}

                        {getExchangeRate(transactionDetails) && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Exchange Rate
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              1{" "}
                              {
                                transactionDetails.transaction_details
                                  ?.from_currency
                              }{" "}
                              = {getExchangeRate(transactionDetails)}{" "}
                              {
                                transactionDetails.transaction_details
                                  ?.to_currency
                              }
                            </p>
                          </div>
                        )}

                        {transactionDetails.transaction_details
                          .method_of_payment && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Payment Method
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                              {
                                transactionDetails.transaction_details
                                  .method_of_payment
                              }
                            </p>
                          </div>
                        )}

                        {transactionDetails.reason && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Reason
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {transactionDetails.reason}
                            </p>
                          </div>
                        )}

                        {transactionDetails.transaction_details
                          .recipient_name && (
                          <div className="flex items-center space-x-3">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Recipient
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {
                                  transactionDetails.transaction_details
                                    .recipient_name
                                }
                              </p>
                            </div>
                          </div>
                        )}

                        {transactionDetails.transaction_details.bank_name && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Bank
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {transactionDetails.transaction_details.bank_name}
                            </p>
                          </div>
                        )}

                        {transactionDetails.transaction_details
                          .account_number && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Account Number
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {
                                transactionDetails.transaction_details
                                  .account_number
                              }
                            </p>
                          </div>
                        )}

                        {transactionDetails.transaction_details
                          .phone_number && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Phone Number
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {
                                transactionDetails.transaction_details
                                  .phone_number
                              }
                            </p>
                          </div>
                        )}

                        {transactionDetails.transaction_details.network && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Network
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {transactionDetails.transaction_details.network}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No transaction details available
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
