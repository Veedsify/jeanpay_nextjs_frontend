// import { Check } from 'lucide-react';

// interface Transaction {
//   id: string;
//   name: string;
//   category: string;
//   account: string;
//   accountType: string;
//   date: string;
//   time: string;
//   amount: number;
//   note: string;
//   status: 'Completed' | 'Pending' | 'Rejected';
//   icon: React.ComponentType<any>;
// }

// interface TransactionTableProps {
//   transactions: Transaction[];
//   selectedIds: string[];
//   onSelectTransaction: (id: string) => void;
//   onSelectAll: (checked: boolean) => void;
// }

// export default function TransactionTable({
//   transactions,
//   selectedIds,
//   onSelectTransaction,
//   onSelectAll
// }: TransactionTableProps) {
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//       case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//     }
//   };

//   const getCardImage = (accountType: string) => {
//     switch (accountType) {
//       case 'visa': 
//         return <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>;
//       case 'mastercard': 
//         return <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>;
//       default: 
//         return <div className="w-8 h-5 bg-gray-400 rounded text-white text-xs flex items-center justify-center">?</div>;
//     }
//   };

//   const formatAmount = (amount: number) => {
//     const isNegative = amount < 0;
//     return (
//       <span className={isNegative ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
//         {isNegative ? '-' : '+'}₦{Math.abs(amount).toFixed(2)}
//       </span>
//     );
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//             <tr>
//               <th className="w-12 px-4 py-3">
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.length === transactions.length && transactions.length > 0}
//                   onChange={(e) => onSelectAll(e.target.checked)}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
//                 />
//               </th>
//               <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Transaction Name</th>
//               <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Account</th>
//               <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Transaction ID</th>
//               <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Date & Time</th>
//               <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Amount</th>
//               <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Note</th>
//               <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//             {transactions.map((transaction) => {
//               const IconComponent = transaction.icon;
//               return (
//                 <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
//                   <td className="px-4 py-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.includes(transaction.id)}
//                       onChange={() => onSelectTransaction(transaction.id)}
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
//                     />
//                   </td>
//                   <td className="px-4 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                         <IconComponent className="w-5 h-5 text-green-600 dark:text-green-300" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900 dark:text-white">{transaction.name}</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-4">
//                     <div className="flex items-center gap-2">
//                       {getCardImage(transaction.accountType)}
//                       <span className="text-sm text-gray-900 dark:text-white">{transaction.account}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{transaction.id}</td>
//                   <td className="px-4 py-4">
//                     <div className="text-sm text-gray-900 dark:text-white">{transaction.date}</div>
//                     <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.time}</div>
//                   </td>
//                   <td className="px-4 py-4 font-medium">{formatAmount(transaction.amount)}</td>
//                   <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{transaction.note}</td>
//                   <td className="px-4 py-4">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
//                       {transaction.status}
//                     </span>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { Check } from 'lucide-react';
import React from 'react';
import PaymentCardIcon from '../commons/PaymentCardIcon';

interface Transaction {
  id: string;
  name: string;
  category: string;
  account: string;
  accountType: string;
  date: string;
  time: string;
  amount: number;
  note: string;
  status: 'Completed' | 'Pending' | 'Rejected';
  icon: React.ComponentType<any>;
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
  onSelectAll
}: TransactionTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatAmount = (amount: number) => {
    const isNegative = amount < 0;
    return (
      <span className={isNegative ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
        {isNegative ? '-' : '+'}₦{Math.abs(amount).toFixed(2)}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === transactions.length && transactions.length > 0}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Transaction Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Account</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Transaction ID</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Date & Time</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Amount</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Note</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((transaction) => {
              const IconComponent = transaction.icon;
              return (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(transaction.id)}
                      onChange={() => onSelectTransaction(transaction.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{transaction.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <PaymentCardIcon type={transaction.accountType} size="sm2" />
                      <span className="text-sm text-gray-900 dark:text-white">{transaction.account}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{transaction.id}</td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{transaction.date}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.time}</div>
                  </td>
                  <td className="px-4 py-4 font-medium">{formatAmount(transaction.amount)}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{transaction.note}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
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