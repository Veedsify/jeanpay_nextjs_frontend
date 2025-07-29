"use client";
import Link from "next/link";
import {
  ArrowUp,
  ArrowDown,
  ArrowsClockwise,
  ClockIcon,
  PlusSquareIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import ExpenseStat from "@/app/components/commons/ExpenseStat";
import RecentActivityStat from "@/app/components/commons/RecentActivityStat";
import Image from "next/image";
import BalanceCard from "@/app/components/commons/BalanceCard";
import { QuickAction } from "@/types/commons";
import { Transaction } from "@/types/transactions";

export default function DashBoardPage() {
  const [searchTerm] = useState("");
  const [statusFilter] = useState("all");
  const [typeFilter] = useState("all");

  const quickActions: QuickAction[] = [
    {
      title: "Exchange Currency",
      description: "NGN ↔ GHS",
      href: "/dashboard/payment/transfer",
      icon: PlusSquareIcon,
    },
    {
      title: "TopUp",
      description: "Add money via Paystack",
      href: "/dashboard/payment/topup",
      icon: ArrowDown,
    },
    {
      title: "History",
      description: "All transactions",
      href: "/dashboard/transactions",
      icon: ClockIcon,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "convert",
      amount: 5000,
      currency: "NGN",
      toCurrency: "GHS",
      status: "completed",
      date: "2025-06-29",
      time: "10:30 AM",
      description: "NGN to GHS conversion",
      transactionId: "TXN001234567",
    },
    {
      id: "2",
      type: "topup",
      amount: 10000,
      currency: "NGN",
      status: "completed",
      date: "2025-06-28",
      time: "2:15 PM",
      description: "Paystack funding",
      transactionId: "TXN001234566",
    },
    {
      id: "3",
      type: "withdraw",
      amount: 50,
      currency: "GHS",
      status: "pending",
      date: "2025-06-28",
      time: "11:45 AM",
      description: "Momo withdrawal",
      transactionId: "TXN001234565",
    },
    {
      id: "4",
      type: "send",
      amount: 2000,
      currency: "NGN",
      status: "completed",
      date: "2025-06-27",
      time: "4:20 PM",
      description: "Transfer to John Doe",
      recipient: "John Doe",
      transactionId: "TXN001234564",
    },
    {
      id: "5",
      type: "receive",
      amount: 100,
      currency: "GHS",
      status: "completed",
      date: "2025-06-26",
      time: "9:00 AM",
      description: "Received from Jane Smith",
      recipient: "Jane Smith",
      transactionId: "TXN001234563",
    },
    {
      id: "6",
      type: "convert",
      amount: 15000,
      currency: "NGN",
      toCurrency: "GHS",
      status: "failed",
      date: "2025-06-25",
      time: "3:30 PM",
      description: "NGN to GHS conversion",
      transactionId: "TXN001234562",
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
        return <ArrowsClockwise className="text-blue-600" size={20} />;
      case "send":
        return <ArrowUp className="text-orange-600" size={20} />;
      case "receive":
        return <ArrowDown className="text-green-600" size={20} />;
      default:
        return <ArrowsClockwise className="text-gray-600" size={20} />;
    }
  };

  const getTransactionText = (transaction: Transaction) => {
    switch (transaction.type) {
      case "convert":
        return `${
          transaction.currency
        } ${transaction.amount.toLocaleString()} → ${transaction.toCurrency}`;
      case "send":
        return `Sent ${
          transaction.currency
        } ${transaction.amount.toLocaleString()}`;
      case "receive":
        return `Received ${
          transaction.currency
        } ${transaction.amount.toLocaleString()}`;
      default:
        return `${transaction.currency} ${transaction.amount.toLocaleString()}`;
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.transactionId
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="py-6">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Section - Welcome and Quick Actions */}
        <div className="flex flex-col gap-6 xl:w-1/4 lg:w-full">
          <div className="flex flex-col justify-between bg-cyan-dark rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4 justify-between mb-6">
              <Image
                width={24}
                height={24}
                src="/icons/card-icon.png"
                alt="Profile"
                className="w-6 h-6"
              />
              <Image
                width={36}
                height={36}
                src="/icons/card-union.png"
                alt="Profile"
                className="w-auto h-7"
              />
            </div>
            <div className="mb-4">
              <h1 className="text-2xl xl:text-3xl font-bold mb-2">
                Andrew Forbeist
              </h1>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-cyan-100">Balance Amount</p>
                <h2>
                  <span className="text-3xl xl:text-4xl font-bold">
                    ₦925,000
                  </span>
                </h2>
              </div>
              <div className="text-wrap text-end text-sm">
                Combined <br /> Balance
              </div>
            </div>
          </div>
          <div className="bg-green-bg rounded-2xl shadow-sm">
            <div className="flex">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className="p-4 group flex-1 text-center border-r last:border-r-0 border-white"
                  >
                    <div className="p-3 rounded-lg text-white transition-transform flex flex-col items-center justify-center">
                      <IconComponent size={26} className="fill-cyan-dark" />
                      <p className="mt-2 text-sm font-medium text-cyan-dark">
                        {action.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle Section - Balance Cards and Transactions */}
        <div className="flex flex-col gap-6 xl:w-1/2 lg:w-full">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <BalanceCard />
            </div>
            <div className="flex-1">
              <BalanceCard />
            </div>
          </div>
          {/* Recent Transactions - Full Width */}
          <div className="">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-cyan-dark">
                  Recent Transactions
                </h2>
                <Link
                  href="/dashboard/history"
                  className="text-cyan-dark text-sm font-medium hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="bg-white shadow-sm overflow-hidden rounded-2xl">
                <div className="relative w-full overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-bg border-b">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Transaction
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Amount
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Date
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Transaction ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction, index) => (
                        <tr
                          key={index}
                          className="border-b border-black/20 hover:bg-green-bg"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-lg text-nowrap">
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-base sm:text-sm text-nowrap">
                                  {transaction.description}
                                </p>
                                {transaction.recipient && (
                                  <p className="text-sm sm:text-xs text-gray-600 text-nowrap">
                                    {transaction.recipient}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-semibold text-gray-900 text-base sm:text-sm text-nowrap">
                              {getTransactionText(transaction)}
                            </p>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                transaction.status,
                              )}`}
                            >
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="text-gray-900 text-base sm:text-sm">
                                {transaction.date}
                              </p>
                              <p className="text-sm sm:text-xs text-gray-600">
                                {transaction.time}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <p className="text-sm sm:text-xs font-mono text-gray-600">
                              {transaction.transactionId}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No transactions found matching your criteria.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    disabled
                  >
                    Previous
                  </button>
                  <span className="px-3 py-2 bg-cyan-dark text-white rounded-lg">
                    1
                  </span>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Exchange Rates and Stats */}
        <div className="flex flex-col xl:flex-col lg:flex-row xl:w-1/4 lg:w-full gap-6">
          <div className="flex-1">
            <ExpenseStat />
          </div>
          <div className="flex-1">
            <RecentActivityStat />
          </div>
        </div>
      </div>
    </div>
  );
}
