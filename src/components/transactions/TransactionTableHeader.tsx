"use client";

import { ChevronsUpDown } from "lucide-react";

interface HeaderProps {
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

export default function TransactionTableHeader({
  allSelected,
  onSelectAll,
}: HeaderProps) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <tr>
        <th className="w-12 px-4 py-3">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
        </th>

        {[
          "Transaction Name", // Added to the list for whitespace-nowrap
          "Transaction ID",
          "Account",
          "Amount",
          "Note",
          "Status",
          "Date & Time",
          "Actions",
        ].map((title) => (
          <th
            key={title}
            className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white"
          >
            <div
              className={`flex items-center gap-1 ${["Transaction Name", "Transaction ID", "Date & Time"].includes(title) ? "whitespace-nowrap" : ""}`}
            >
              {title}
              <ChevronsUpDown className="w-4 h-4 text-gray-400" />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
