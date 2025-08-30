"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { CountryFlag } from "./CountryFlag";
import Link from "next/link";
import {
  ArrowRightLeft,
  ChevronDown,
  Copy,
  PlusSquareIcon,
  MoreHorizontal,
  LucideLoader2,
} from "lucide-react";
import { QuickAction } from "@/types/commons";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  useTransferActions,
  useConversionData,
} from "../contexts/TransferStore";
import { useQuery } from "@tanstack/react-query";
import { getWalletBalance } from "@/funcs/wallet/WalletFunc";
import { formatIntoSpace } from "@/lib/textformat";
import {
  getExchangeRates,
  calculateConversion,
} from "@/funcs/convert/ConvertFuncs";
// import { usePlatFromSettings } from "../contexts/PlatformSettingContext";

interface CurrencyOption {
  code: string;
  name: string;
  country: string;
  balance: number;
  flag: string;
  cardNumber?: string;
}

const quickActions: QuickAction[] = [
  {
    title: "Exchange Currency",
    description: "Convert currency",
    href: "/dashboard/payment/convert",
    icon: ArrowRightLeft,
  },
  {
    title: "Top Up",
    description: "Add money via Bank/Card or Momo",
    href: "/dashboard/payment/topup",
    icon: PlusSquareIcon,
  },
];

const currencyOptions: CurrencyOption[] = [
  {
    code: "NGN",
    name: "Nigerian Naira",
    country: "nigeria",
    balance: 0,
    flag: "nigeria",
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    country: "ghana",
    balance: 0,
    flag: "ghana",
  },
];

export default function ConvertForm() {
  const [fromCurrency, setFromCurrency] = useState<CurrencyOption>({
    balance: 0,
    code: "NGN",
    country: "nigeria",
    flag: "nigeria",
    name: "Nigerian Naira",
    cardNumber: "",
  });
  const [toCurrency, setToCurrency] = useState<CurrencyOption>({
    balance: 0,
    code: "GHS",
    country: "ghana",
    flag: "ghana",
    name: "Ghanaian Cedi",
    cardNumber: "",
  });
  const [fromAmount, setFromAmount] = useState("0");
  const [toAmount, setToAmount] = useState("0");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);
  const [copiedCardCode, setCopiedCardCode] = useState<string | null>(null);
  const router = useRouter();
  // const { platformSetting } = usePlatFromSettings();
  const { data: exchangeRates } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: async () => {
      const resp = await getExchangeRates();
      return resp?.data?.rates as Record<string, number>;
    },
    staleTime: 1000 * 60 * 5, // 10 minutes
  });
  // Fetch wallet balance
  const {
    data: walletBalance,
    isLoading,
    isError,
  } = useQuery({
    enabled: true,
    queryKey: ["walletBalance"],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getWalletBalance,
  });

  // Zustand store
  const { setConversionData } = useTransferActions();
  const conversionData = useConversionData();
  // Initialize form with store data if available
  useEffect(() => {
    if (conversionData.fromAmount) {
      setFromAmount(conversionData.fromAmount);
    }
    if (conversionData.toAmount) {
      setToAmount(conversionData.toAmount);
    }
    if (conversionData.fromCurrency) {
      const fromCurr = currencyOptions.find(
        (c) => c.code === conversionData.fromCurrency,
      );
      if (fromCurr) setFromCurrency(fromCurr);
    }
    if (conversionData.toCurrency) {
      const toCurr = currencyOptions.find(
        (c) => c.code === conversionData.toCurrency,
      );
      if (toCurr) setToCurrency(toCurr);
    }
  }, [conversionData]);

  const handleCopy = async (cardNumber: string, cardCode: string) => {
    try {
      await navigator.clipboard.writeText(cardNumber);
      setCopiedCardCode(cardCode);
      setTimeout(() => setCopiedCardCode(null), 2000);
    } catch (err) {
      console.log("Failed to copy", err);
    }
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
    const rateKey = `${fromCurrency.code}-${toCurrency.code}`;
    const fallbackKey = `${fromCurrency.code}_${toCurrency.code}`;
    const rate = exchangeRates?.[rateKey] ?? exchangeRates?.[fallbackKey];
    return typeof rate === "number" ? rate : 1;
  };

  const currentRate = getCurrentExchangeRate();

  // Calculate amounts based on exchange rate
  const calculateAmounts = () => {
    const fromAmountNum = parseFormattedCurrency(fromAmount);
    const toAmountNum = fromAmountNum * currentRate;
    const totalAmount = fromAmountNum;

    return {
      amountToPay: fromAmountNum,
      amountTheyReceive: toAmountNum,
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

  const handleFromCurrencySelect = useCallback(
    (option: CurrencyOption) => {
      setFromCurrency(option);
      setShowFromDropdown(false);

      // Update amounts based on new currency selection using fetched rates
      const rateKey = `${option.code}-${toCurrency.code}`;
      const fallbackKey = `${option.code}_${toCurrency.code}`;
      const newRate = (exchangeRates?.[rateKey] ??
        exchangeRates?.[fallbackKey] ??
        1) as number;

      const fromAmountNum = parseFormattedCurrency(fromAmount);
      const convertedAmount = fromAmountNum * newRate;
      const newToAmount = formatCurrency(convertedAmount.toFixed(0));
      setToAmount(newToAmount);

      // Update store
      setConversionData({
        fromCurrency: option.code,
        fromAmount,
        toAmount: newToAmount,
        exchangeRate: newRate,
      });

      toast.success(`Selected ${option.name} as source currency`);
    },
    [toCurrency, fromAmount, exchangeRates, setConversionData],
  );

  const handleToCurrencySelect = useCallback(
    (option: CurrencyOption) => {
      setToCurrency(option);
      setShowToDropdown(false);

      // Update amounts based on new currency selection using fetched rates
      const rateKey = `${fromCurrency.code}-${option.code}`;
      const fallbackKey = `${fromCurrency.code}_${option.code}`;
      const newRate = (exchangeRates?.[rateKey] ??
        exchangeRates?.[fallbackKey] ??
        1) as number;

      const fromAmountNum = parseFormattedCurrency(fromAmount);
      const convertedAmount = fromAmountNum * newRate;
      const newToAmount = formatCurrency(convertedAmount.toFixed(0));
      setToAmount(newToAmount);

      // Update store
      setConversionData({
        toCurrency: option.code,
        fromAmount,
        toAmount: newToAmount,
        exchangeRate: newRate,
      });

      toast.success(`Selected ${option.name} as target currency`);
    },
    [fromCurrency, exchangeRates, setConversionData, fromAmount],
  );

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCurrency(value);
    setFromAmount(formattedValue);

    const numericValue = parseFormattedCurrency(formattedValue) || 0;

    // Optimistic local calculation using current rate
    const optimistic = numericValue * currentRate;
    const newToAmount = formatCurrency(optimistic.toFixed(0));
    setToAmount(newToAmount);

    // Request exact calculation from backend (includes fees)
    if (numericValue > 0 && fromCurrency.code !== toCurrency.code) {
      calculateConversion({
        fromCurrency: fromCurrency.code as "NGN" | "GHS",
        toCurrency: toCurrency.code as "NGN" | "GHS",
        amount: numericValue,
      })
        .then((resp) => {
          const conv = resp?.data?.convertedAmount;
          if (typeof conv === "number") {
            setToAmount(formatCurrency(conv.toFixed(0)));
          }
        })
        .catch(() => {
          // Keep optimistic value on error
        });
    }

    // Update store
    setConversionData({
      fromCurrency: fromCurrency.code,
      toCurrency: toCurrency.code,
      fromAmount: formattedValue,
      toAmount: newToAmount,
      exchangeRate: currentRate,
    });
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);

    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleProceedToPayment = () => {
    if (parseFloat(fromAmount) === 0) {
      toast.error("Please enter a valid amount", {
        id: "proceed-to-payment",
      });
      return;
    }
    // Ensure store is updated with current data
    if (fromCurrency.code === toCurrency.code) {
      toast.error("Sorry, you cannot convert the same currency", {
        id: "proceed-to-payment",
      });
      return;
    }

    setConversionData({
      fromCurrency: fromCurrency.code,
      toCurrency: toCurrency.code,
      fromAmount,
      toAmount,
      exchangeRate: currentRate,
    });

    router.push("/dashboard/payment/convert/confirm");
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 p-2 md:p-8 space-y-8">
        {/* Top Action Buttons */}
        <div className="bg-primary-50 rounded-xl p-2 mb-2">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex flex-col items-center justify-center p-2 md:p-5 text-center border-r border-white last:border-r-0 hover:bg-white/70 rounded-xl transition-colors duration-200 hover:border-primary-200"
                >
                  <span className="px-3 py-3 flex items-center justify-center flex-col">
                    <span className="w-12 h-12 bg-white rounded-xl flex items-center justify-center  mb-2">
                      <IconComponent size={24} className="text-primary-500" />
                    </span>
                    <p className="text-base font-semibold text-primary-600">
                      {action.title}
                    </p>
                    <span className="text-xs text-gray-500 mt-1">
                      {action.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Make a Payment
            </h2>
            <button
              type="button"
              className="text-gray-400 hover:text-primary-500 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* Payment Account Section */}
          <div className="space-y-8">
            <div className="bg-green-bg rounded-2xl p-8 space-y-10 border border-green-100">
              <h3 className="font-semibold text-gray-700 text-lg mb-2">
                Payment Account
              </h3>
              {/* Wallet Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isError && !isLoading && (
                  <p className="block sm:inline text-red-700">
                    An error occurred while fetching wallet balance.
                  </p>
                )}
                {isLoading && (
                  <div className="px-8 py-8 rounded-2xl relative w-full col-span-full flex items-center justify-center">
                    <LucideLoader2
                      size={32}
                      strokeWidth={1}
                      className="text-jean-orange animate-spin"
                    />
                  </div>
                )}
                {!isLoading &&
                  !isError &&
                  walletBalance?.data.map((option, index: number) => (
                    <div
                      key={option.id}
                      className={cn(
                        "relative overflow-hidden rounded-2xl bg-white border flex flex-col gap-4 p-0",
                        index === 0
                          ? "border-primary-100"
                          : "border-orange-100",
                      )}
                    >
                      {/* Decorative top bar */}
                      <div
                        className={cn(
                          "h-3 w-full",
                          index === 0
                            ? "bg-gradient-to-r from-primary-400 to-primary-600"
                            : "bg-gradient-to-r from-orange-400 to-orange-600",
                        )}
                      />
                      <div className="flex items-center gap-4 px-6 pt-6 pb-2">
                        <div
                          className={cn(
                            "w-16 h-16 rounded-xl flex items-center justify-center border-4",
                            option.currency === "NGN"
                              ? "bg-primary-500/90 border-primary-200"
                              : "bg-orange-500/90 border-orange-200",
                          )}
                        >
                          <CountryFlag
                            country={
                              option.currency === "NGN" ? "nigeria" : "ghana"
                            }
                            size="lg"
                          />
                        </div>
                        <div>
                          <p className="text-base text-gray-700 font-semibold mb-1">
                            {option.currency === "NGN"
                              ? "Nigerian"
                              : "Ghanaian"}{" "}
                            Wallet
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "text-lg font-bold tracking-wide",
                                option.currency === "NGN"
                                  ? "text-primary-700"
                                  : "text-orange-700",
                              )}
                            >
                              {option.currency}
                            </span>
                            <span className="ml-1 text-xl font-bold text-gray-900">
                              {formatCurrency(option.balance.toString())}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-6 pb-6 pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-mono tracking-widest bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                            {formatIntoSpace(option.walletId, 4, " ")}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(option.walletId!, option.id)
                            }
                            className={cn(
                              "text-gray-400 hover:text-primary-500 transition-colors p-1 rounded-lg hover:bg-primary-50 border border-transparent hover:border-primary-200",
                              copiedCardCode === option.id &&
                                "bg-green-50 border-green-200",
                            )}
                            title="Copy card number"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          {copiedCardCode === option.id && (
                            <span className="text-green-600 text-xs font-semibold ml-2 animate-fade-in">
                              Copied!
                            </span>
                          )}
                        </div>
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            option.currency === "NGN"
                              ? "bg-primary-50 text-primary-700"
                              : "bg-orange-50 text-orange-700",
                          )}
                        >
                          {option.currency}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Amount Selection */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 w-full md:w-auto">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {getFromCurrencyLabel()}
                    </label>
                    <div className="relative" ref={fromDropdownRef}>
                      <div
                        className="bg-white rounded-xl border border-gray-300 p-4 cursor-pointer flex items-center justify-between hover:border-primary-400 transition-colors"
                        onClick={() => setShowFromDropdown(!showFromDropdown)}
                      >
                        <div className="flex items-center gap-3">
                          <CountryFlag
                            country={fromCurrency.flag as "nigeria" | "ghana"}
                            size="md"
                          />
                          <span className="font-semibold capitalize text-gray-700">
                            {fromCurrency.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-primary-700">
                            {getFromCurrencySymbol()} {fromAmount}
                          </span>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      {showFromDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl z-20 border border-gray-200">
                          {currencyOptions.map((option) => (
                            <div
                              key={`from-${option.code}`}
                              className="flex items-center justify-between p-4 hover:bg-primary-50 cursor-pointer rounded-xl"
                              onClick={() => handleFromCurrencySelect(option)}
                            >
                              <div className="flex items-center gap-3">
                                <CountryFlag
                                  country={option.flag as "nigeria" | "ghana"}
                                  size="md"
                                />
                                <span className="font-semibold capitalize text-gray-700">
                                  {option.country}
                                </span>
                              </div>
                              <span className="font-semibold text-primary-600">
                                {option.code}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      value={fromAmount}
                      onChange={handleFromAmountChange}
                      className="mt-3 w-full bg-white p-4 rounded-xl border border-gray-300 text-right font-semibold outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors text-lg"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex items-center justify-center md:mt-8 group">
                    <motion.button
                      whileHover={{
                        rotate: "180deg",
                      }}
                      type="button"
                      onClick={swapCurrencies}
                      className="p-3 rounded-xl transition-colors border bg-white border-gray-200 cursor-pointer"
                      aria-label="Swap currencies"
                    >
                      <ArrowRightLeft className="w-5 h-5 text-primary-500" />
                    </motion.button>
                  </div>

                  <div className="flex-1 w-full md:w-auto">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {getToCurrencyLabel()}
                    </label>
                    <div className="relative" ref={toDropdownRef}>
                      <div
                        className="bg-white rounded-xl border border-gray-300 p-4 cursor-pointer flex items-center justify-between hover:border-primary-400 transition-colors"
                        onClick={() => setShowToDropdown(!showToDropdown)}
                      >
                        <div className="flex items-center gap-3">
                          <CountryFlag
                            country={toCurrency.flag as "nigeria" | "ghana"}
                            size="md"
                          />
                          <span className="font-semibold capitalize text-gray-700">
                            {toCurrency.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-primary-700">
                            {getToCurrencySymbol()} {toAmount}
                          </span>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      {showToDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl z-20 border border-gray-200">
                          {currencyOptions.map((option) => (
                            <div
                              key={`to-${option.code}`}
                              className="flex items-center justify-between p-4 hover:bg-primary-50 cursor-pointer rounded-xl"
                              onClick={() => handleToCurrencySelect(option)}
                            >
                              <div className="flex items-center gap-3">
                                <CountryFlag
                                  country={option.flag as "nigeria" | "ghana"}
                                  size="md"
                                />
                                <span className="font-semibold capitalize text-gray-700">
                                  {option.country}
                                </span>
                              </div>
                              <span className="font-semibold text-primary-600">
                                {option.code}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      value={toAmount}
                      readOnly
                      className="mt-3 w-full bg-gray-50 p-4 rounded-xl border border-gray-300 text-right font-semibold outline-none cursor-not-allowed text-lg"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Exchange Rate and Calculations */}
                <div className="space-y-4 bg-white rounded-xl p-6 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Exchange Rate</span>
                    <span className="text-sm font-semibold text-primary-700">
                      1 {fromCurrency.code} = {toCurrency.code} {currentRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount To Pay</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getFromCurrencySymbol()}{" "}
                      {formatCurrency(amounts.amountToPay.toString())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Amount They Receive
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getToCurrencySymbol()}{" "}
                      {formatCurrency(amounts.amountTheyReceive.toFixed(0))}
                    </span>
                  </div>
                  <div className="border-t pt-4 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-base font-bold text-primary-700">
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
          <div className="flex justify-end gap-4 lg:gap-6 pt-4">
            <button className="px-8 py-2 rounded-full text-gray-600 hover:text-gray-800 font-semibold transition-colors border border-black/10 bg-gray-100 hover:bg-gray-200">
              Cancel
            </button>
            <button
              disabled={isError}
              onClick={handleProceedToPayment}
              className="bg-cyan-dark text-white disabled:bg-gray-300 disabled:cursor-not-allowed px-8 py-2 rounded-full hover:bg-teal-800 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-dark"
            >
              Proceed To Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
