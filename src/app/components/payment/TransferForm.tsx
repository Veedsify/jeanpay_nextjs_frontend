"use client";
import { useState, useEffect, useRef } from "react";
import { CountryFlag } from "./CountryFlag";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRightLeft,
  ChevronDown,
  ClipboardIcon,
  ClockIcon,
  Copy,
  DollarSignIcon,
  PlusSquareIcon,
} from "lucide-react";
import { QuickAction } from "@/types/commons";
import Toast from "../ui/Toast";

interface CurrencyOption {
  code: string;
  name: string;
  country: string;
  balance: number;
  flag: string;
}

interface ToastData {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

const quickActions: QuickAction[] = [
  {
    title: "Convert",
    description: "NGN ↔ GHS",
    href: "/dashboard/convert",
    icon: PlusSquareIcon,
  },
  {
    title: "TopUp",
    description: "Add money via Paystack",
    href: "/dashboard/wallet",
    icon: ArrowDown,
  },
  {
    title: "History",
    description: "All transactions",
    href: "/dashboard/history",
    icon: ClockIcon,
  },
  {
    title: "Virtual Accounts",
    description: "View your virtual accounts",
    href: "/dashboard/virtual-accounts",
    icon: DollarSignIcon,
  },
];

const currencyOptions: CurrencyOption[] = [
  {
    code: "NGN",
    name: "Nigerian Naira",
    country: "nigeria",
    balance: 90000,
    flag: "nigeria",
    cardNumber: "5582 5574 8376 5467",
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    country: "ghana",
    balance: 53000,
    flag: "ghana",
    cardNumber: "5582 5594 8376 5469",
  },
];

export default function TransferForm() {
  const [fromCurrency, setFromCurrency] = useState<CurrencyOption>(
    currencyOptions[0]
  );
  const [toCurrency, setToCurrency] = useState<CurrencyOption>(
    currencyOptions[1]
  );
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
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
    duration?: number
  ) => {
    const id = Date.now().toString();
    const newToast: ToastData = { id, type, message, duration };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Format currency with commas
  const formatCurrency = (value: string, currencyCode: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");
    const parts = numericValue.split(".");
    let wholePart = parts[0];
    const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

    if (wholePart) {
      wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const symbol = currencyCode === "NGN" ? "₦" : "GH₵";
    return `${symbol}${wholePart}${decimalPart}`;
  };

  const parseFormattedCurrency = (formattedValue: string) => {
    return parseFloat(formattedValue.replace(/[^\d.]/g, ""));
  };

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

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoading(true);
      try {
        // If both currencies are the same, rate is 1
        if (fromCurrency.code === toCurrency.code) {
          setExchangeRate(1);
          return;
        }

        // TODO: Replace this mock with actual API call when ready
        // Example API call:
        // const response = await fetch(`/api/exchange-rate?from=${fromCurrency.code}&to=${toCurrency.code}`);
        // const data = await response.json();
        // setExchangeRate(data.rate);

        // Mock exchange rates (only NGN ↔ GHS)
        const mockRates = {
          NGN: { GHS: 0.0059 },
          GHS: { NGN: 169.49 },
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const rate = mockRates[fromCurrency.code]?.[toCurrency.code] || null;
        setExchangeRate(rate);

        if (rate && fromAmount) {
          const numericValue = parseFormattedCurrency(fromAmount);
          const convertedAmount = numericValue * rate;
          setToAmount(convertedAmount.toFixed(2));
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        showToast("error", "Failed to fetch exchange rate. Please try again.");
        setExchangeRate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCurrency(value, fromCurrency.code);
    setFromAmount(formattedValue);

    if (exchangeRate) {
      const numericValue = parseFormattedCurrency(formattedValue) || 0;
      const convertedAmount = numericValue * exchangeRate;
      setToAmount(formatCurrency(convertedAmount.toFixed(2), toCurrency.code));
    }
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCurrency(value, toCurrency.code);
    setToAmount(formattedValue);

    if (exchangeRate) {
      const numericValue = parseFormattedCurrency(formattedValue) || 0;
      const convertedAmount = numericValue / exchangeRate;
      setFromAmount(
        formatCurrency(convertedAmount.toFixed(2), fromCurrency.code)
      );
    }
  };

  const handleFromCurrencySelect = (option: CurrencyOption) => {
    setFromCurrency(option);
    setShowFromDropdown(false);
    if (fromAmount) {
      setFromAmount(
        formatCurrency(
          parseFormattedCurrency(fromAmount).toString(),
          option.code
        )
      );
    }
    showToast("success", `Selected ${option.name} as source currency`);
  };

  const handleToCurrencySelect = (option: CurrencyOption) => {
    setToCurrency(option);
    setShowToDropdown(false);
    if (toAmount) {
      setToAmount(
        formatCurrency(parseFormattedCurrency(toAmount).toString(), option.code)
      );
    }
    showToast("success", `Selected ${option.name} as target currency`);
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

      // Add your payment processing logic here
      // const response = await fetch('/api/process-payment', { ... });

      // For now, simulate processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast("success", "Payment processed successfully!");

      // Reset form or redirect
      setFromAmount("");
      setToAmount("");
    } catch (error) {
      showToast("error", "Payment failed. Please try again.");
    }
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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white-bg rounded-xl shadow-md border border-black/30 p-2 sm:p-6 md:p-4 space-y-4 sm:space-y-6 mx-auto"
      >
        {/* Top Buttons */}
        <div className="bg-green-bg rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-4 grid-cols-2 p-1 items-center overflow-scroll">
            {quickActions.map((action, idx) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`p-1.5 md:p-4 group flex-1 text-center
                           ${
                             idx === quickActions.length - 1
                               ? "last:border-r-0"
                               : ""
                           } lg:${
                    idx === 1 ? "border-r-0 lg:border-r-2" : " border-r-2"
                  }
                           border-white`}
                >
                  <div className="px-3 py-2.5 rounded-lg text-white transition-transform flex flex-col items-center justify-center">
                    <IconComponent size={26} className="fill-cyan-dark h-5" />
                    <p className="mt-1 md:mt-2 text-xs md:text-sm font-medium text-cyan-dark">
                      {action.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 px-4 sm:px-6 py-5 w-full">
          <h2 className="text-lg font-semibold">Make a Payment</h2>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">
              Payment Account
            </h3>
          </div>

          <div className="bg-green-bg rounded-lg p-4 sm:p-5 mt-4 shadow-inner border border-gray-200">
            {/* Wallet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {currencyOptions.map((option, index) => (
                <div
                  key={option.code}
                  className="bg-white relative rounded-lg overflow-hidden shadow-sm min-h-[80px]"
                >
                  <div
                    className={`w-12 h-[80%] md:w-14 absolute left-0 bottom-0 rounded-tr-2xl flex items-center justify-center text-white font-bold ${
                      index === 1 ? "bg-green-bg" : "bg-cyan-dark"
                    }`}
                  >
                    <CountryFlag country={option.flag} />
                  </div>
                  <div className="pl-16 md:pl-18 pr-3 sm:pr-4 py-3 flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">
                      {option.name} Wallet
                    </p>
                    <p className="text-lg sm:text-xl font-bold mb-1">
                      {formatCurrency(option.balance.toString(), option.code)}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm text-gray-400 font-mono">
                        {option.cardNumber}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(option.cardNumber, option.code)
                        }
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
                        title="Copy card number"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {copiedCardCode === option.code && (
                        <span className="text-green-500 text-xs">Copied!</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 w-full max-w-md mt-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sending From</span>
                <span>Sending To</span>
              </div>

              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                {/* From Currency Dropdown */}
                <div className="relative flex-1" ref={fromDropdownRef}>
                  <div
                    className="bg-white p-2 rounded-lg flex items-center justify-between border border-gray-200 shadow-sm cursor-pointer"
                    onClick={() => setShowFromDropdown(!showFromDropdown)}
                  >
                    <div className="flex items-center  gap-6">
                      <CountryFlag country={fromCurrency.flag} />
                      <span className="text-sm font-medium text-black capitalize">
                        {fromCurrency.country}
                      </span>
                      <div>
                        <span className="font-medium text-sm">
                          {fromCurrency.code}
                        </span>
                        <span className="text-sm font-medium text-black">
                          {fromCurrency.balance}
                        </span>
                      </div>
                    </div>

                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                  {showFromDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 border border-gray-200 max-h-60 overflow-y-auto">
                      {currencyOptions.map((option) => (
                        <div
                          key={`from-${option.code}`}
                          className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleFromCurrencySelect(option)}
                        >
                          <div className="flex items-center gap-2">
                            <CountryFlag country={option.flag} />
                            <div>
                              <span className="font-medium text-sm capitalize">
                                {option.country}
                              </span>
                              <p className="text-xs text-gray-500">
                                {option.code}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {formatCurrency(
                              option.balance.toString(),
                              option.code
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    value={fromAmount}
                    onChange={handleFromAmountChange}
                    className="mt-2 w-full bg-white p-2 rounded-lg border border-gray-200 shadow-sm text-right font-semibold outline-none"
                    placeholder={formatCurrency("0", fromCurrency.code)}
                  />
                </div>

                {/* Swap Button */}
                <button
                  type="button"
                  onClick={swapCurrencies}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Swap currencies"
                >
                  <ArrowRightLeft className="text-gray-400 w-4 h-4" />
                </button>

                {/* To Currency Dropdown */}
                <div className="relative flex-1" ref={toDropdownRef}>
                  <div
                    className="bg-white p-2 rounded-lg flex items-center justify-between border border-gray-200 shadow-sm cursor-pointer"
                    onClick={() => setShowToDropdown(!showToDropdown)}
                  >
                    <div className="flex items-center gap-6">
                      <CountryFlag country={toCurrency.flag} />
                      {/* <span className="font-medium text-sm">{toCurrency.code}</span> */}
                      <span className="text-sm font-medium text-black capitalize">
                        {toCurrency.country}
                      </span>
                      <div>
                        <span className="font-medium text-sm">
                          {toCurrency.code}
                        </span>
                        <span className="text-sm font-medium text-black">
                          {toCurrency.balance}
                        </span>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                    {/* <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform ${showToDropdown ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg> */}
                  </div>
                  {showToDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 border border-gray-200 max-h-60 overflow-y-auto">
                      {currencyOptions.map((option) => (
                        <div
                          key={`to-${option.code}`}
                          className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleToCurrencySelect(option)}
                        >
                          <div className="flex items-center gap-2">
                            <CountryFlag country={option.flag} />

                            <div>
                              <span className="font-medium text-sm capitalize">
                                {option.country}
                              </span>
                              <p className="text-xs text-gray-500">
                                {option.code}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {formatCurrency(
                              option.balance.toString(),
                              option.code
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    value={toAmount}
                    onChange={handleToAmountChange}
                    className="mt-2 w-full bg-white p-2 rounded-lg border border-gray-200 shadow-sm text-right font-semibold outline-none"
                    placeholder={formatCurrency("0", toCurrency.code)}
                  />
                </div>
              </div>

              {/* Exchange Rate */}
              <div className="text-sm text-gray-600 pt-1">
                <div>Exchange Rate</div>
                <div className="font-medium">
                  {loading
                    ? "Loading..."
                    : fromCurrency.code === toCurrency.code
                    ? `1 ${fromCurrency.code} = 1 ${toCurrency.code}`
                    : exchangeRate
                    ? `1 ${fromCurrency.code} = ${exchangeRate.toFixed(6)} ${
                        toCurrency.code
                      }`
                    : "Rate unavailable"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
              <button
                type="button"
                className="text-gray-600 hover:underline order-2 sm:order-1 text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !exchangeRate}
                className="bg-[#004741] hover:bg-[#00332e] text-white px-4 sm:px-6 py-2 rounded-lg order-1 sm:order-2 text-sm sm:text-base transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Proceed to Payment"}
              </button>
            </div>
          </div>
        </div>
      </form>

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
