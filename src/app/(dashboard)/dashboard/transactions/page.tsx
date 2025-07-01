


// // src/app/transactions/page.tsx
// 'use client';

// import React, { useState } from 'react';
// // Remove Calendar and Download as they are now in TransactionFilters
// // import { Download, Calendar } from 'lucide-react';

// import { useTransactionsData } from '@/app/hooks/UseTransactionsData';
// import { categories, accounts } from '@/app/lib/data/utils/constants';

// // UI Components
// // import PageHeader from '../../components/ui/PageHeader';
// // Remove SearchInput and Dropdown from here as they are used within TransactionFilters
// // import SearchInput from '../../components/ui/SearchInput';
// // import Dropdown from '../../components/ui/Dropdown';
// import TransactionTable from '@/app/components/transactions/TransactionTable';
// import Pagination from '@/app/components/ui/Pagination';
// import TransactionFilters from '@/app/components/transactions/TransactionFilters'; // Import the new filters component

// const TransactionsPage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('All Category');
//   const [selectedAccount, setSelectedAccount] = useState<string>('All Account');
//   const [dateRange, setDateRange] = useState<string>('1-30 September 2028');

//   const {
//     paginatedTransactions,
//     filteredTransactionsCount,
//     currentPage,
//     totalPages,
//     setCurrentPage,
//     itemsPerPage,
//   } = useTransactionsData({ searchTerm, selectedCategory, selectedAccount });

//   // Handler for the download button
//   const handleDownload = () => {
//     // Implement your download logic here
//     console.log('Downloading transactions...');
//     // Example: Trigger an API call or generate a CSV
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}

//         {/* Filters and Controls */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <TransactionFilters
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//             selectedAccount={selectedAccount}
//             setSelectedAccount={setSelectedAccount}
//             dateRange={dateRange}
//             setDateRange={setDateRange}
//             onDownload={handleDownload} // Pass the handler
//           />

//           {/* Transaction Table */}
//           <TransactionTable transactions={paginatedTransactions} />

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//             totalItems={filteredTransactionsCount}
//             itemsPerPage={itemsPerPage}
//           />
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <div className="flex items-center gap-4">
//             <span>Copyright © 2024 JeanCredit</span>
//             <a href="#" className="hover:text-gray-700">Privacy Policy</a>
//             <a href="#" className="hover:text-gray-700">Term and conditions</a>
//             <a href="#" className="hover:text-gray-700">Contact</a>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
//             <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
//             <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
//             <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
//             <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionsPage;




export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransactions, setSelectedTransactions] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All Category',
    account: 'All Account'
  });

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const matchesSearch = transaction.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           transaction.note.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'All Category' || transaction.category === filters.category;
      const matchesAccount = filters.account === 'All Account' || transaction.account === filters.account;
      
      return matchesSearch && matchesCategory && matchesAccount;
    });
  }, [filters]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setSelectedTransactions(new Set());
    setSelectAll(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedTransactions(new Set());
    setSelectAll(false);
  };

  const handleSelectTransaction = (transactionId) => {
    const newSelected = new Set(selectedTransactions);
    if (newSelected.has(transactionId)) {
      newSelected.delete(transactionId);
    } else {
      newSelected.add(transactionId);
    }
    setSelectedTransactions(newSelected);
    setSelectAll(newSelected.size === currentTransactions.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTransactions(new Set());
      setSelectAll(false);
    } else {
      const allIds = new Set(currentTransactions.map(t => t.id));
      setSelectedTransactions(allIds);
      setSelectAll(true);
    }
  };

  return (
    <div className="w-full space-y-6">
      <TransactionFilters onFiltersChange={handleFiltersChange} />
      
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-[#004643] focus:ring-[#004643] border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Note
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {currentTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id} 
                  transaction={transaction}
                  isSelected={selectedTransactions.has(transaction.id)}
                  onSelect={handleSelectTransaction}
                />
              ))}
            </tbody>
          </table>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}