"use client";
import TransactionTableHeader from "./TransactionTableHeader";
import PaymentCardIcon from "../commons/PaymentCardIcon";

interface Transaction {
  id: string;
  name: string;
  accountType: string;
  date: string;
  time: string;
  amount: number;
  note: string;
  status: "Completed" | "Pending" | "Rejected";
  icon: React.ElementType;
}

interface TransactionTableProps {
  transactions: Transaction[];
  selectedIds: string[];
  onSelectTransaction: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
}

export default function TransactionTable({
  transactions,
  selectedIds,
  onSelectTransaction,
  onSelectAll,
}: TransactionTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-cyan-dark dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatAmount = (amount: number) => {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    return (
      <span
        className={
          isNegative
            ? "text-red-600 dark:text-red-400 whitespace-nowrap"
            : "text-green-600 dark:text-green-400 whitespace-nowrap"
        }
      >
        {isNegative ? "-" : "+"}₦
        {absAmount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    );
  };

  return (
    <div className="bg-white w-full dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto scrollbar-green">
        {" "}
        {/* Added scrollbar-green class here */}
        <table className="w-full min-w-[1024px]">
          <TransactionTableHeader
            allSelected={
              selectedIds.length === transactions.length &&
              transactions.length > 0
            }
            onSelectAll={onSelectAll}
          />

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((transaction) => {
              const IconComponent = transaction.icon;
              return (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(transaction.id)}
                      onChange={() => onSelectTransaction(transaction.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10  dark:bg-gray-800 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--color-cyan-dark)" }}
                      >
                        <IconComponent className="w-5 h-5 text-white dark:text-gray-300" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {transaction.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                    {transaction.id}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <PaymentCardIcon
                        type={transaction.accountType}
                        size="md"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white whitespace-nowrap">
                      {transaction.date}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {transaction.time}
                    </div>
                  </td>

                  <td className="px-4 py-4 font-medium">
                    {formatAmount(transaction.amount)}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {transaction.note}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        transaction.status,
                      )} whitespace-nowrap`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
