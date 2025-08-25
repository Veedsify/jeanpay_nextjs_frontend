"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { CurrencyCircleDollarIcon } from "@phosphor-icons/react";

interface BalanceCardProps {
  balance?: number;
  currency?: string;
  label?: string;
  isLoading?: boolean;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance = 0,
  currency = "NGN",
  label = "Balance",
  isLoading = false,
}) => {
  const formatCurrency = (amount: number, curr: string) => {
    return `${curr}${amount.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-start w-full justify-between shadow-sm animate-pulse">
        <div className="flex justify-between items-center mb-6 w-full">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="w-16 h-6 bg-gray-200 rounded mb-4"></div>
          <div className="w-32 h-10 bg-gray-200 rounded mb-2"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-start w-full justify-between shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="p-2 bg-primary-50 rounded-lg flex items-center justify-center">
          <CurrencyCircleDollarIcon size={32} className="text-primary-500" />
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div>
        {/* Status Badge */}
        <div
          className={`inline-flex items-center px-3 py-1 rounded-lg bg-green-100 text-xs font-medium mb-4`}
        >
          <div className={`w-2 h-2 bg-green-500 rounded-full mr-2`}></div>
          Active
        </div>
        {/* Balance Amount */}
        <h1 className="text-3xl xl:text-4xl font-bold text-gray-900">
          {formatCurrency(balance, currency)}
        </h1>
        <p className="text-gray-600 text-sm">{label}</p>
      </div>
    </div>
  );
};

export default BalanceCard;
