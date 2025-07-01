// 'use client';

// const statusStyles = {
//   Completed: 'bg-green-100 text-green-800',
//   Pending: 'bg-yellow-100 text-yellow-800',
//   Rejected: 'bg-red-100 text-red-800',
// };

// interface Transaction {
//   name: string;
//   account: string;
//   time: string;
//   amount: number;
//   status: 'Completed' | 'Pending' | 'Rejected';
// }

// interface Props {
//   transactions: Transaction[];
// }

// export default function TransactionTable({ transactions }: Props) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//         <thead className="bg-black text-white text-left text-xs uppercase">
//           <tr>
//             <th className="px-4 py-3">
//               <input type="checkbox" />
//             </th>
//             <th className="px-4 py-3">Transaction Name</th>
//             <th className="px-4 py-3">Account</th>
//             <th className="px-4 py-3">Date & Time</th>
//             <th className="px-4 py-3">Amount</th>
//             <th className="px-4 py-3">Status</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800 text-sm">
//           {transactions.map((tx, idx) => (
//             <tr key={idx}>
//               <td className="px-4 py-3">
//                 <input type="checkbox" />
//               </td>
//               <td className="px-4 py-3">{tx.name}</td>
//               <td className="px-4 py-3">{tx.account}</td>
//               <td className="px-4 py-3">{tx.time}</td>
//               <td
//                 className={`px-4 py-3 font-semibold ${tx.amount < 0 ? 'text-red-500' : 'text-green-600'}`}
//               >
//                 {tx.amount < 0 ? `₦${Math.abs(tx.amount).toFixed(2)}` : `₦${tx.amount.toFixed(2)}`}
//               </td>
//               <td className="px-4 py-3">
//                 <span
//                   className={`text-xs px-2 py-1 rounded-md ${statusStyles[tx.status]}`}
//                 >
//                   {tx.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
// import { format } from 'date-fns';


type Transaction = {
  id: string;
  name: string;
  account: string;
  amount: number;
  category: string;
  date: string;
  note: string;
  status: 'Completed' | 'Pending' | 'Rejected';
  type: 'Income' | 'Expense';
};

const mockTransactions: Transaction[] = [
  {
    id: '4567890135',
    name: 'Bonus Payment',
    account: 'Platinum Plus Visa',
    amount: 500.00,
    category: 'Income',
    date: '2024-09-25T11:00:00',
    note: 'Annual performance bonus',
    status: 'Completed',
    type: 'Income'
  },
  {
    id: '4567890136',
    name: 'Stock Dividends',
    account: 'Freedom Unlimited Mastercard',
    amount: 300.00,
    category: 'Investments',
    date: '2024-09-24T09:00:00',
    note: 'Quarterly stock dividend',
    status: 'Pending',
    type: 'Income'
  },
  // Add more mock transactions as needed
];

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  return (
    <div className="w-full mt-6">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th className="text-left font-normal px-4">Transaction Name</th>
            <th className="text-left font-normal">Account</th>
            <th className="text-left font-normal">Transaction ID</th>
            <th className="text-left font-normal">Date & Time</th>
            <th className="text-right font-normal px-4">Amount</th>
            <th className="text-left font-normal">Note</th>
            <th className="text-left font-normal pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr 
              key={transaction.id}
              className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-4 py-4 text-sm flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <span className={`text-lg ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'Income' ? '+' : '-'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{transaction.name}</p>
                  <p className="text-gray-500">{transaction.category}</p>
                </div>
              </td>
              <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{transaction.account}</td>
              <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{transaction.id}</td>
              <td className="py-4 text-sm text-gray-700 dark:text-gray-300">
                {(new Date(transaction.date), 'yyyy-MM-dd')}
                <br />
                {(new Date(transaction.date), 'hh:mm a')}
              </td>
              <td className={`px-4 py-4 text-sm text-right ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </td>
              <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{transaction.note}</td>
              <td className="pr-4 py-4">
                <span className={`px-2 py-1 text-xs rounded-full ${{
                  'Completed': 'bg-green-100 text-green-800',
                  'Pending': 'bg-yellow-100 text-yellow-800',
                  'Rejected': 'bg-red-100 text-red-800'
                }[transaction.status]}`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}