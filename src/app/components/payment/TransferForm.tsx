"use client";
import { useState, useEffect, useRef } from "react";
import { CountryFlag } from "./CountryFlag";
import Link from "next/link";
import {
  ArrowRightLeft,
  ChevronDown,
  Copy,
  PlusSquareIcon,
  MoreHorizontal,
} from "lucide-react";
import { QuickAction } from "@/types/commons";
import Toast from "../ui/Toast";
import { cn } from "@/lib/utils";

interface CurrencyOption {
  code: string;
  name: string;
  country: string;
  balance: number;
  flag: string;
  cardNumber?: string;
}

interface ToastData {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

const quickActions: QuickAction[] = [
  {
    title: "Exchange Currency",
    description: "Send money abroad",
    href: "/dashboard/payment/transfer",
    icon: ArrowRightLeft,
  },
  {
    title: "Top Up",
    description: "Add money via Paystack",
    href: "/dashboard/payment/topup",
    icon: PlusSquareIcon,
  },
];

const currencyOptions: CurrencyOption[] = [
  {
    code: "NGN",
    name: "Nigerian Naira",
    country: "nigeria",
    balance: 90000,
    flag: "nigeria",
    cardNumber: "5582 5574 8376 5487",
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    country: "ghana",
    balance: 53000,
    flag: "ghana",
    cardNumber: "4532 8723 0045 9967",
  },
];

export default function TransferForm() {
  const [fromCurrency, setFromCurrency] = useState<CurrencyOption>(
    currencyOptions[0],
  );
  const [toCurrency, setToCurrency] = useState<CurrencyOption>(
    currencyOptions[1],
  );
  const [fromAmount, setFromAmount] = useState("90,000");
  const [toAmount, setToAmount] = useState("530");
  const [loading] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);
  const [copiedCardCode, setCopiedCardCode] = useState<string | null>(null);

  const handleCopy = async (cardNumber: string, cardCode: string) => {
    try {
      await navigator.clipboard.writeText(cardNumber);
      setCopiedCardCode(cardCode);
      setTimeout(() => setCopiedCardCode(null), 2000);
    } catch (err) {
      console.log("Failed to copy", err);
    }
  };

  // Toast management functions
  const showToast = (
    type: ToastData["type"],
    message: string,
    duration?: number,
  ) => {
    const id = Date.now().toString();
    const newToast: ToastData = { id, type, message, duration };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Format currency with commas
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");
    const parts = numericValue.split(".");
    let wholePart = parts[0];
    const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

    if (wholePart) {
      wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return `${wholePart}${decimalPart}`;
  };

  const parseFormattedCurrency = (formattedValue: string) => {
    return parseFloat(formattedValue.replace(/[^\d.]/g, ""));
  };

  // Dynamic labels and currency symbols based on selected currencies
  const getFromCurrencyLabel = () => {
    return fromCurrency.code === "NGN"
      ? "Amount You Pay (in naira)"
      : "Amount You Pay (in cedis)";
  };

  const getToCurrencyLabel = () => {
    return toCurrency.code === "GHS"
      ? "How Much Recipient Gets (in cedis)"
      : "How Much Recipient Gets (in naira)";
  };

  const getFromCurrencySymbol = () => {
    return fromCurrency.code === "NGN" ? "NGN" : "GHS";
  };

  const getToCurrencySymbol = () => {
    return toCurrency.code === "GHS" ? "GH₵" : "NGN";
  };

  const getCurrentExchangeRate = () => {
    if (fromCurrency.code === toCurrency.code) {
      return 1;
    }

    // Exchange rates for both directions
    const rates: Record<string, number> = {
      "NGN-GHS": 0.023,
      "GHS-NGN": 43.48,
    };

    const rateKey = `${fromCurrency.code}-${toCurrency.code}`;
    return rates[rateKey] || 1;
  };

  const currentRate = getCurrentExchangeRate();

  // Calculate amounts based on exchange rate
  const calculateAmounts = () => {
    const fromAmountNum = parseFormattedCurrency(fromAmount);
    const toAmountNum = fromAmountNum * currentRate;
    const platformFee = 1000; // Platform fee is always in NGN
    const totalAmount = fromAmountNum + platformFee;

    return {
      amountToPay: fromAmountNum,
      amountTheyReceive: toAmountNum,
      platformFee,
      totalAmount,
    };
  };

  const amounts = calculateAmounts();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFromDropdown(false);
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target as Node)
      ) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFromCurrencySelect = (option: CurrencyOption) => {
    setFromCurrency(option);
    setShowFromDropdown(false);

    // Update amounts based on new currency selection
    const rates: Record<string, number> = {
      "NGN-GHS": 0.023,
      "GHS-NGN": 43.48,
    };

    const rateKey = `${option.code}-${toCurrency.code}`;
    const newRate = rates[rateKey] || 1;
    const fromAmountNum = parseFormattedCurrency(fromAmount);
    const convertedAmount = fromAmountNum * newRate;
    setToAmount(formatCurrency(convertedAmount.toFixed(0)));

    showToast("success", `Selected ${option.name} as source currency`);
  };

  const handleToCurrencySelect = (option: CurrencyOption) => {
    setToCurrency(option);
    setShowToDropdown(false);

    // Update amounts based on new currency selection
    const rates: Record<string, number> = {
      "NGN-GHS": 0.023,
      "GHS-NGN": 43.48,
    };

    const rateKey = `${fromCurrency.code}-${option.code}`;
    const newRate = rates[rateKey] || 1;
    const fromAmountNum = parseFormattedCurrency(fromAmount);
    const convertedAmount = fromAmountNum * newRate;
    setToAmount(formatCurrency(convertedAmount.toFixed(0)));

    showToast("success", `Selected ${option.name} as target currency`);
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCurrency(value);
    setFromAmount(formattedValue);

    const numericValue = parseFormattedCurrency(formattedValue) || 0;
    const convertedAmount = numericValue * currentRate;
    setToAmount(formatCurrency(convertedAmount.toFixed(0)));
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);

    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);

    showToast("success", "Currencies swapped");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromAmount || !toAmount) {
      showToast("error", "Please enter an amount to transfer");
      return;
    }

    const fromAmountNum = parseFormattedCurrency(fromAmount);
    if (fromAmountNum > fromCurrency.balance) {
      showToast("error", "Insufficient balance");
      return;
    }

    if (fromAmountNum <= 0) {
      showToast("error", "Please enter a valid amount");
      return;
    }

    try {
      showToast("info", "Processing payment...", 2000);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showToast("success", "Payment processed successfully!");
      setFromAmount("");
      setToAmount("");
    } catch {
      showToast("error", "Payment failed. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Top Action Buttons */}
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex flex-col items-center justify-center p-4 text-center hover:bg-white/50 rounded-lg transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-2">
                    <IconComponent size={20} className="text-primary-500" />
                  </div>
                  <p className="text-sm font-medium text-primary-500">
                    {action.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Make a Payment
            </h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Payment Account Section */}
          <div className="space-y-6">
            <div className="bg-green-bg rounded-xl p-6 space-y-8">
              <h3 className="font-medium text-gray-700">Payment Account</h3>
              {/* Wallet Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currencyOptions.map((option, index) => (
                  <div
                    key={option.code}
                    className="bg-white rounded-lg p-4 relative overflow-hidden border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center",
                            index === 0 ? "bg-primary-500" : "bg-orange-500"
                          )}
                        >
                          <CountryFlag
                            country={option.flag as "nigeria" | "ghana"}
                            size="md"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            {option.name} Wallet
                          </p>
                          <p className="text-xl font-bold text-gray-900">
                            {option.code}
                            {formatCurrency(option.balance.toString())}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <p className="text-sm text-gray-400 font-mono">
                        {option.cardNumber}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(option.cardNumber!, option.code)
                        }
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                        title="Copy card number"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {copiedCardCode === option.code && (
                        <span className="text-green-500 text-xs">Copied!</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full md:w-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getFromCurrencyLabel()}
                    </label>
                    <div className="relative" ref={fromDropdownRef}>
                      <div
                        className="bg-white rounded-lg border border-gray-300 p-3 cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors"
                        onClick={() => setShowFromDropdown(!showFromDropdown)}
                      >
                        <div className="flex items-center gap-3">
                          <CountryFlag
                            country={fromCurrency.flag as "nigeria" | "ghana"}
                            size="md"
                          />
                          <span className="font-medium">
                            {fromCurrency.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">
                            {getFromCurrencySymbol()}
                            {fromAmount}
                          </span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      {showFromDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-md z-10 border border-gray-200">
                          {currencyOptions.map((option) => (
                            <div
                              key={`from-${option.code}`}
                              className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleFromCurrencySelect(option)}
                            >
                              <div className="flex items-center gap-3">
                                <CountryFlag
                                  country={option.flag as "nigeria" | "ghana"}
                                  size="md"
                                />
                                <span className="font-medium">
                                  {option.country}
                                </span>
                              </div>
                              <span className="font-medium">{option.code}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      value={fromAmount}
                      onChange={handleFromAmountChange}
                      className="mt-2 w-full bg-white p-3 rounded-lg border border-gray-300 text-right font-semibold outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex items-center justify-center md:mt-8">
                    <button
                      type="button"
                      onClick={swapCurrencies}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                      aria-label="Swap currencies"
                    >
                      <ArrowRightLeft className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="flex-1 w-full md:w-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getToCurrencyLabel()}
                    </label>
                    <div className="relative" ref={toDropdownRef}>
                      <div
                        className="bg-white rounded-lg border border-gray-300 p-3 cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors"
                        onClick={() => setShowToDropdown(!showToDropdown)}
                      >
                        <div className="flex items-center gap-3">
                          <CountryFlag
                            country={toCurrency.flag as "nigeria" | "ghana"}
                            size="md"
                          />
                          <span className="font-medium">
                            {toCurrency.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">
                            {getToCurrencySymbol()}
                            {toAmount}
                          </span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      {showToDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-md z-10 border border-gray-200">
                          {currencyOptions.map((option) => (
                            <div
                              key={`to-${option.code}`}
                              className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleToCurrencySelect(option)}
                            >
                              <div className="flex items-center gap-3">
                                <CountryFlag
                                  country={option.flag as "nigeria" | "ghana"}
                                  size="md"
                                />
                                <span className="font-medium">
                                  {option.country}
                                </span>
                              </div>
                              <span className="font-medium">{option.code}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      value={toAmount}
                      readOnly
                      className="mt-2 w-full bg-gray-50 p-3 rounded-lg border border-gray-300 text-right font-semibold outline-none cursor-not-allowed"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Exchange Rate and Calculations */}
                <div className="space-y-3 bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Exchange Rate</span>
                    <span className="text-sm font-medium">
                      1 {fromCurrency.code} = {toCurrency.code} {currentRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount To Pay</span>
                    <span className="text-sm font-medium">
                      {getFromCurrencySymbol()}{" "}
                      {formatCurrency(amounts.amountToPay.toString())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Amount They Receive
                    </span>
                    <span className="text-sm font-medium">
                      {getToCurrencySymbol()}{" "}
                      {formatCurrency(amounts.amountTheyReceive.toFixed(0))}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Platform Fee</span>
                    <span className="text-sm font-medium">
                      NGN {formatCurrency(amounts.platformFee.toString())}
                    </span>
                  </div> */}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-base font-bold text-gray-900">
                        {getFromCurrencySymbol()}{" "}
                        {formatCurrency(amounts.totalAmount.toString())}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
}
