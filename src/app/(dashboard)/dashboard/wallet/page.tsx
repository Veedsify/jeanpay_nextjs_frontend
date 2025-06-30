"use client";
import { useState } from "react";
import { Plus, ArrowUp, ArrowDown, Eye, EyeSlash } from "@phosphor-icons/react";

interface WalletBalance {
  currency: string;
  amount: number;
  flag: string;
}

interface Transaction {
  id: string;
  type: "topup" | "withdraw" | "convert";
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  date: string;
  description: string;
}

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);

  const walletBalances: WalletBalance[] = [
    { currency: "NGN", amount: 25000, flag: "🇳🇬" },
    { currency: "GHS", amount: 150, flag: "🇬🇭" },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: "TXN001",
      type: "topup",
      amount: 10000,
      currency: "NGN",
      status: "completed",
      date: "2025-06-28",
      description: "Paystack funding",
    },
    {
      id: "TXN002",
      type: "withdraw",
      amount: 50,
      currency: "GHS",
      status: "pending",
      date: "2025-06-28",
      description: "Momo withdrawal",
    },
    {
      id: "TXN003",
      type: "convert",
      amount: 5000,
      currency: "NGN",
      status: "completed",
      date: "2025-06-27",
      description: "NGN to GHS conversion",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "topup":
        return <ArrowDown className="text-green-600" size={20} />;
      case "withdraw":
        return <ArrowUp className="text-red-600" size={20} />;
      case "convert":
        return <Plus className="text-blue-600" size={20} />;
      default:
        return <Plus className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Wallet Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {walletBalances.map((wallet) => (
          <div
            key={wallet.currency}
            className="bg-white rounded-2xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{wallet.flag}</span>
                <h3 className="text-lg font-semibold text-cyan-dark">
                  {wallet.currency} Wallet
                </h3>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-500 hover:text-cyan-dark"
              >
                {showBalance ? <Eye size={20} /> : <EyeSlash size={20} />}
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-cyan-dark">
                {showBalance
                  ? `${wallet.currency} ${wallet.amount.toLocaleString()}`
                  : "****"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 flex items-center justify-center gap-2">
                <ArrowDown size={18} />
                Top Up
              </button>
              <button className="border border-cyan-dark text-cyan-dark py-3 px-4 rounded-lg font-medium hover:bg-green-bg flex items-center justify-center gap-2">
                <ArrowUp size={18} />
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-cyan-dark mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-jean-orange text-white py-4 px-6 rounded-lg font-medium hover:bg-opacity-90 flex items-center justify-center gap-2">
            <Plus size={20} />
            Convert Currency
          </button>
          <button className="bg-green-bg text-cyan-dark py-4 px-6 rounded-lg font-medium hover:bg-opacity-80 flex items-center justify-center gap-2">
            <ArrowDown size={20} />
            Add Money
          </button>
          <button className="border border-gray-300 text-gray-700 py-4 px-6 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
            <ArrowUp size={20} />
            Send Money
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-cyan-dark">
            Recent Transactions
          </h3>
          <button className="text-cyan-dark text-sm font-medium hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {transaction.currency} {transaction.amount.toLocaleString()}
                </p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
