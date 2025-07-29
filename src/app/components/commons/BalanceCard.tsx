"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { CurrencyCircleDollarIcon } from "@phosphor-icons/react";

const BalanceCard = () => {
  const balance = 90000;

  const formatCurrency = (amount: number) => {
    return `NGN${amount.toLocaleString()}`;
  };

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
        <div className="inline-flex items-center px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-medium mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          +17.24%
        </div>
        {/* Balance Amount */}
        <h1 className="text-3xl xl:text-4xl font-bold text-gray-900">
          {formatCurrency(balance)}
        </h1>
        <p className="text-gray-600 text-sm">Naira Balance</p>
      </div>
    </div>
  );
};

export default BalanceCard;
