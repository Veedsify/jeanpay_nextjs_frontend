


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




'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Wifi, 
  ShoppingCart, 
  Dumbbell, 
  Home, 
  Shield, 
  Smartphone, 
  Play, 
  Plane 
} from 'lucide-react';
// import TransactionTableHeader from '@/app/components/transactions/TransactionTableHeader';
import TransactionFilters from '@/app/components/transactions/TransactionFilters';
import TransactionTable from '@/app/components/transactions/TransactionTable';
import TransactionPagination from '@/app/components/transactions/Pagination';

// Mock Data (to be replaced with API calls)
const mockTransactions = [
  {
    id: '4567890135',
    name: 'Bonus Payment',
    category: 'Income',
    account: 'Platinum Plus Visa',
    accountType: 'visa',
    date: '2024-09-25',
    time: '11:00 AM',
    amount: 1500.00,
    note: 'Annual performance bonus',
    status: 'Completed',
    icon: DollarSign
  },
  // ... (include all other transactions)
] as const;

export default function TransactionComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('All Account');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get unique categories
  const categories = Array.from(new Set(mockTransactions.map(t => t.category)));

  // Filter transactions
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.includes(searchTerm);
    const matchesCategory = !selectedCategory || transaction.category === selectedCategory;
    const matchesAccount = selectedAccount === 'All Account' || transaction.account === selectedAccount;
    return matchesSearch && matchesCategory && matchesAccount;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSelectTransaction = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? paginatedTransactions.map(t => t.id) : []);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]);
  };

  const handleDownload = () => {
    console.log('Downloading transactions with filters:', {
      searchTerm,
      selectedCategory,
      selectedAccount,
      selectedIds
    });
    // API call for download would go here
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* <TransactionHeader /> */}
      
      <TransactionFilters
        search={searchTerm}
        onSearchChange={setSearchTerm}
        category={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        account={selectedAccount}
        onAccountChange={setSelectedAccount}
        onDownload={handleDownload}
      />
      
      <TransactionTable
        transactions={paginatedTransactions}
        selectedIds={selectedIds}
        onSelectTransaction={handleSelectTransaction}
        onSelectAll={handleSelectAll}
      />
      
      {filteredTransactions.length > 0 && (
        <TransactionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTransactions.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}