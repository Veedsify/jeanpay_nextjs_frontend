
"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ArrowDown,
  DollarSignIcon,
  EllipsisVertical,
} from "lucide-react";
import { CountryFlag } from "./CountryFlag";
import Link from "next/link";
import { QuickAction } from "@/types/commons";
import { ClockIcon, PlusSquareIcon } from "@phosphor-icons/react";

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

export default function TopupForm() {
  const [selectedWallet, setSelectedWallet] = useState<"nigeria" | "ghana">(
    "nigeria"
  );
  const [amount, setAmount] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const wallets = {
    nigeria: { name: "Nigerian", balance: "NGN90,000", currency: "NGN" },
    ghana: { name: "Ghanaian", balance: "GH₵53,000", currency: "GHS" },
  };

  const handleTopUp = () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }
    // Handle top-up logic here
    console.log("Top up:", { wallet: selectedWallet, amount });
    alert(`Top up ${amount} to ${wallets[selectedWallet].name} wallet`);
  };

  const handleCancel = () => {
    setAmount("");
  };

  return (
    <div className="mx-auto p-3 md:p-6 bg-white border rounded-2xl border-black/30 space-y-4">
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
                     idx === quickActions.length - 1 ? "last:border-r-0" : ""
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

      {/* Main Form */}
      <div className="flex justify-between py-4 md:py-6">
        <h2 className="text-xl font-semibold">Topup</h2>

        <button className="text-gray-400 hover:text-gray-600 ">
          <EllipsisVertical />
        </button>
      </div>

      <div className="bg-green-bg rounded-xl lg:rounded-2xl p-4 md:p-6 2xl:p-8">
        <div className="grid gap-6">
          {/* Payment Account Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4 text-lg md:text-lg lg:text-xl">
              Payment Account
            </h3>
            <div className="grid md:grid-cols-2 gap-4 bg-white p-2 md:p-4 rounded-xl lg:rounded-2xl ">
              <div className="bg-green-bg rounded-lg lg:rounded-2xl p-4 md:py-6 relative overflow-hidden">
                <div className="w-[15%] h-[70%] md:w-[8%] md:h-[80%] bg-cyan-dark absolute bottom-0 left-0 flex items-center justify-center text-white font-bold rounded-tr-xl lg:rounded-tr-2xl">
                  <CountryFlag country="nigeria" size="lg" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="ml-[20%] md:ml-20">
                    <p className="text-sm text-gray-500">Nigerian Wallet</p>
                    <h3 className="text-lg font-bold">NGN90,000</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-black/30 rounded-lg lg:rounded-2xl p-4 md:py-6 relative overflow-hidden">
                <div className="w-[15%] h-[70%] md:w-[8%] md:h-[80%] bg-green-bg absolute bottom-0 left-0 flex items-center justify-center text-white font-bold rounded-tr-xl lg:rounded-tr-2xl">
                  <CountryFlag country="ghana" size="lg" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="ml-[20%] md:ml-20">
                    <p className="text-sm text-gray-500">Ghanaian Wallet</p>
                    <h3 className="text-lg font-bold">GH₵53,000</h3>
                  </div>
                </div>
              </div>
           
            </div>
          </div>

          {/* Top Up Wallet Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Top Up Wallet
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white p-4 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CountryFlag country={selectedWallet} size="md" />
                  <span className="font-medium">
                    {wallets[selectedWallet].name}
                  </span>
                  <span className="text-gray-500 ml-auto mr-4">
                    {wallets[selectedWallet].balance}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg z-10">
                  {Object.entries(wallets).map(([key, wallet]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedWallet(key as "nigeria" | "ghana");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <CountryFlag
                        country={key as "nigeria" | "ghana"}
                        size="md"
                      />
                      <span className="font-medium">{wallet.name}</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none select-none">
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-dark focus:border-cyan-dark outline-none transition-colors text-lg font-semibold bg-gray-50 hover:bg-white"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Enter the amount you want to top up in{" "}
              {wallets[selectedWallet].currency}.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 lg:gap-8 pt-4">
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleTopUp}
              className="bg-cyan-dark text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors font-medium"
            >
              Top Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
