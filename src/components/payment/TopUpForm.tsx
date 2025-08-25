"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ArrowDown,
  ArrowRightLeft,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { CountryFlag } from "./CountryFlag";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuickAction } from "@/types/commons";
import { useQuery } from "@tanstack/react-query";
import { getWalletBalance } from "@/funcs/wallet/WalletFunc";
import { GetWalletBalanceResponse } from "@/types/wallet";

interface WalletData {
  name: string;
  balance: string;
  currency: string;
}

interface WalletsType {
  nigeria: WalletData;
  ghana: WalletData;
}

const quickActions: QuickAction[] = [
  {
    title: "TopUp",
    description: "Add money via Bank/Card or Momo",
    href: "/dashboard/payment/topup",
    icon: ArrowDown,
  },
  {
    title: "Exchange Currency",
    description: "Convert currency",
    href: "/dashboard/payment/convert",
    icon: ArrowRightLeft,
  },
];

export default function TopupForm() {
  const router = useRouter();
  const [selectedWallet, setSelectedWallet] = useState<"nigeria" | "ghana">(
    "nigeria",
  );
  const [amount, setAmount] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // Get wallet data from API or fallback to default
  const getWalletData = () => {
    if (isLoading || isError || !walletBalance?.data) {
      return {
        nigeria: { name: "Nigerian", balance: "NGN90,000", currency: "NGN" },
        ghana: { name: "Ghanaian", balance: "GH₵53,000", currency: "GHS" },
      };
    }

    const wallets: Partial<WalletsType> = {};
    walletBalance.data.forEach((wallet: GetWalletBalanceResponse) => {
      if (wallet.currency === "NGN") {
        wallets.nigeria = {
          name: "Nigerian",
          balance: `NGN${formatCurrency(wallet.balance.toString())}`,
          currency: "NGN",
        };
      } else if (wallet.currency === "GHS") {
        wallets.ghana = {
          name: "Ghanaian",
          balance: `GH₵${formatCurrency(wallet.balance.toString())}`,
          currency: "GHS",
        };
      }
    });

    // Fallback if currencies not found
    return {
      nigeria: wallets.nigeria || {
        name: "Nigerian",
        balance: "NGN0",
        currency: "NGN",
      },
      ghana: wallets.ghana || {
        name: "Ghanaian",
        balance: "GH₵0",
        currency: "GHS",
      },
    };
  };

  const wallets = getWalletData();

  const handleTopUp = () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    // Auto-determine payment type based on currency
    const paymentType =
      wallets[selectedWallet].currency === "NGN" ? "bank" : "momo";

    // Navigate to direct payment page with topup data
    const topupData = {
      currency: wallets[selectedWallet].currency,
      amount: amount,
      paymentType: paymentType,
      wallet: selectedWallet,
    };

    // Store data in localStorage for the direct payment page
    localStorage.setItem("topupData", JSON.stringify(topupData));
    router.push("/dashboard/payment/topup/direct-payment");
  };

  const handleCancel = () => {
    setAmount("");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-2 md:p-8 space-y-2">
      {/* Quick Actions */}
      <div className="bg-green-bg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-2 p-2 items-center gap-2">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className={`p-2 md:p-5 group flex-1 text-center border-r border-white last:border-r-0 hover:bg-white/70 transition-colors rounded-xl`}
              >
                <div className="px-3 py-3 rounded-xl transition-transform flex flex-col items-center justify-center">
                  <div className="bg-white rounded-xl p-2 w-12 h-12 flex items-center justify-center ">
                    <IconComponent size={28} className="text-cyan-dark" />
                  </div>
                  <p className="mt-2 text-sm md:text-base font-semibold text-cyan-dark group-hover:text-cyan-dark">
                    {action.title}
                  </p>
                  <span className="text-xs text-gray-500 mt-1 group-hover:text-gray-700">
                    {action.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Form Header */}
      <div className="flex justify-between items-center border-b border-gray-100">
        <h2 className="text-2xl font-bold text-cyan-dark tracking-tight">
          Topup
        </h2>
        <button className="text-gray-400 hover:text-gray-600 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-dark">
          <MoreHorizontal />
        </button>
      </div>

      <div className="bg-green-bg rounded-2xl p-6 md:p-8 2xl:p-10">
        <div className="grid gap-8">
          {/* Payment Account Section */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4 text-lg md:text-xl lg:text-2xl">
              Payment Account
            </h3>
            <div className="grid md:grid-cols-2 gap-6 bg-white p-3 md:p-5 rounded-2xl">
              {isLoading ? (
                <div className="col-span-2 flex items-center justify-center p-8">
                  <Loader2 size={32} className="text-cyan-dark animate-spin" />
                </div>
              ) : (
                <>
                  {/* Nigerian Wallet Card */}
                  <div className="bg-gradient-to-br from-green-bg via-green-bg to-white rounded-xl p-5 md:py-8 relative overflow-hidden border border-cyan-100 group">
                    <div className="md:w-18 w-14 h-full bg-cyan-dark absolute bottom-0 left-0 flex items-center justify-center text-white font-bold">
                      <CountryFlag country="nigeria" size="lg" />
                    </div>
                    <div className="flex items-center gap-3 ml-20">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Nigerian Wallet
                        </p>
                        <h3 className="text-xl font-bold text-cyan-dark">
                          {wallets.nigeria.balance}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Ghanaian Wallet Card */}
                  <div className="bg-white border border-black/20 rounded-xl p-5 md:py-8 relative overflow-hidden group">
                    <div className="md:w-18 w-14 h-full bg-green-bg absolute bottom-0 left-0 flex items-center justify-center text-white font-bold">
                      <CountryFlag country="ghana" size="lg" />
                    </div>
                    <div className="flex items-center gap-3 ml-20">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Ghanaian Wallet
                        </p>
                        <h3 className="text-xl font-bold text-green-700">
                          {wallets.ghana.balance}
                        </h3>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Top Up Wallet Selection */}
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Top Up Wallet
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white p-4 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-dark"
              >
                <div className="flex items-center gap-3 w-full">
                  <CountryFlag country={selectedWallet} size="md" />
                  <span className="font-semibold text-gray-800">
                    {wallets[selectedWallet].name}
                  </span>
                  <span className="text-gray-500 ml-auto mr-4 font-medium">
                    {wallets[selectedWallet].balance}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl z-20 animate-fadeIn">
                  {Object.entries(wallets).map(([key, wallet], i, arr) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedWallet(key as "nigeria" | "ghana");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors font-medium ${
                        i === 0 ? "rounded-t-xl" : ""
                      } ${i === arr.length - 1 ? "rounded-b-xl" : ""}`}
                    >
                      <CountryFlag
                        country={key as "nigeria" | "ghana"}
                        size="md"
                      />
                      <span className="font-semibold text-gray-800">
                        {wallet.name}
                      </span>
                      <span className="text-gray-500 ml-auto">
                        {wallet.balance}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none select-none font-bold">
                {selectedWallet === "nigeria" ? "₦" : "₵"}
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={
                  selectedWallet === "nigeria" ? "e.g. 15000" : "e.g. 500"
                }
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-dark focus:border-cyan-dark outline-none transition-colors text-lg font-bold bg-gray-50 hover:bg-white"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Enter the amount you want to top up in{" "}
              <span className="font-semibold text-cyan-dark">
                {wallets[selectedWallet].currency}
              </span>
              .
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 lg:gap-6 pt-4">
            <button
              onClick={handleCancel}
              className="px-8 py-2 rounded-full text-gray-600 hover:text-gray-800 font-semibold transition-colors border border-black/10 bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleTopUp}
              className="bg-cyan-dark text-white px-8 py-2 rounded-full hover:bg-teal-800 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-dark"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
