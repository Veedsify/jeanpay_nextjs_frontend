"use client";
import { useState } from "react";
import {
  MagnifyingGlass,
  FunnelSimple,
  ArrowUp,
  ArrowDown,
  ArrowsClockwise,
} from "@phosphor-icons/react";

interface Transaction {
  id: string;
  type: "topup" | "withdraw" | "convert" | "send" | "receive";
  amount: number;
  currency: string;
  toCurrency?: string;
  status: "completed" | "pending" | "failed";
  date: string;
  time: string;
  description: string;
  recipient?: string;
  transactionId: string;
}

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

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
    <div className="space-y-6 mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-cyan-dark">
          Transaction History
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
            />
            <MagnifyingGlass
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FunnelSimple size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-cyan-dark mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-dark mb-2">
              Transaction Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
            >
              <option value="all">All Types</option>
              <option value="topup">Top Up</option>
              <option value="withdraw">Withdraw</option>
              <option value="convert">Convert</option>
              <option value="send">Send</option>
              <option value="receive">Receive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-2xl shadow-sm border border-black/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
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
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-black/30 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        {transaction.recipient && (
                          <p className="text-sm text-gray-600">
                            {transaction.recipient}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-900">
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
                      <p className="text-gray-900">{transaction.date}</p>
                      <p className="text-sm text-gray-600">
                        {transaction.time}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-mono text-gray-600">
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

      {/* Pagination (placeholder) */}
      <div className="flex justify-center">
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
  );
}
