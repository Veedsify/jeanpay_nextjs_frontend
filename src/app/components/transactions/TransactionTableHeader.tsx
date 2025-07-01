// src/components/transactions/TransactionTableHeader.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface TransactionTableHeaderProps {
  // You might add props here later for sorting, e.g.:
  // onSort: (column: string) => void;
  // currentSortColumn: string;
  // sortDirection: 'asc' | 'desc';
}

const TransactionTableHeader: React.FC<TransactionTableHeaderProps> = () => {
  return (
    <div className="border-2  border-red-400 grid grid-cols-7 gap-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-200">
      <div className="flex items-center gap-2">
        Transaction Name
        <ChevronDown className="w-3 h-3" />
      </div>
      <div className="flex items-center gap-2">
        Account
        <ChevronDown className="w-3 h-3" />
      </div>
      <div className="flex items-center gap-2">
        Transaction ID
        <ChevronDown className="w-3 h-3" />
      </div>
      <div className="flex items-center gap-2">
        Date & Time
        <ChevronDown className="w-3 h-3" />
      </div>
      <div className="flex items-center gap-2">
        Amount
        <ChevronDown className="w-3 h-3" />
      </div>
      <div className="flex items-center gap-2">
        Note
        <ChevronDown className="w-3 h-3" />
      </div>
      <div className="flex items-center gap-2">
        Status
        <ChevronDown className="w-3 h-3" />
      </div>
    </div>
  );
};

export default TransactionTableHeader;