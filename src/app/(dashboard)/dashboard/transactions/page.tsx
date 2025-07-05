// 'use client';

// import { useState } from 'react';
// import { 
//   DollarSign, 
//   TrendingUp, 
//   Wifi, 
//   ShoppingCart, 
//   Dumbbell, 
//   Home, 
//   Shield, 
//   Smartphone, 
//   Play, 
//   Plane 
// } from 'lucide-react';
// // import TransactionTableHeader from '@/app/components/transactions/TransactionTableHeader';
// import TransactionFilters from '@/app/components/transactions/TransactionFilters';
// import TransactionTable from '@/app/components/transactions/TransactionTable';
// import TransactionPagination from '@/app/components/transactions/Pagination';

// // Mock Data (to be replaced with API calls)
// const mockTransactions = [
//   {
//     id: '4567890135',
//     name: 'Bonus Payment',
//     category: 'Income',
//     account: 'Platinum Plus Visa',
//     accountType: 'visa',
//     date: '2024-09-25',
//     time: '11:00 AM',
//     amount: 1500.00,
//     note: 'Annual performance bonus',
//     status: 'Completed',
//     icon: DollarSign
//   },
  
//   {
//     id: '4567890138',
//     name: 'Bonus Payment',
//     category: 'Income',
//     account: 'Mastercard Platinum',
//     accountType: 'mastercard',
//     date: '2024-09-25',
//     time: '11:00 AM',
//     amount: 1500.00,
//     note: 'Annual performance bonus',
//     status: 'Pending',
//     icon: DollarSign
//   },
//   {
//     id: '4567890139',
//     name: 'Bonus Payment',
//     category: 'Utilities',
//     account: 'Mastercard Platinum',
//     accountType: 'mastercard',
//     date: '2024-09-25',
//     time: '11:00 AM',
//     amount: 1500.00,
//     note: 'Annual performance bonus',
//     status: 'Pending',
//     icon: DollarSign
//   },
// ] as const;

// export default function TransactionComponent() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedAccount, setSelectedAccount] = useState('All Account');
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12;

//   // Get unique categories
//   const categories = Array.from(new Set(mockTransactions.map(t => t.category)));

//   // Filter transactions
//   const filteredTransactions = mockTransactions.filter(transaction => {
//     const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          transaction.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          transaction.id.includes(searchTerm);
//     const matchesCategory = !selectedCategory || transaction.category === selectedCategory;
//     const matchesAccount = selectedAccount === 'All Account' || transaction.account === selectedAccount;
//     return matchesSearch && matchesCategory && matchesAccount;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//   const paginatedTransactions = filteredTransactions.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Handlers
//   const handleSelectTransaction = (id: string) => {
//     setSelectedIds(prev => 
//       prev.includes(id) 
//         ? prev.filter(selectedId => selectedId !== id)
//         : [...prev, id]
//     );
//   };

//   const handleSelectAll = (checked: boolean) => {
//     setSelectedIds(checked ? paginatedTransactions.map(t => t.id) : []);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     setSelectedIds([]);
//   };

//   const handleDownload = () => {
//     console.log('Downloading transactions with filters:', {
//       searchTerm,
//       selectedCategory,
//       selectedAccount,
//       selectedIds
//     });
//     // API call for download would go here
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-6">
//       {/* <TransactionHeader /> */}
      
//       <TransactionFilters
//         search={searchTerm}
//         onSearchChange={setSearchTerm}
//         category={selectedCategory}
//         onCategoryChange={setSelectedCategory}
//         categories={categories}
//         account={selectedAccount}
//         onAccountChange={setSelectedAccount}
//         onDownload={handleDownload}
//       />
      
//       <TransactionTable
//         transactions={paginatedTransactions}
//         selectedIds={selectedIds}
//         onSelectTransaction={handleSelectTransaction}
//         onSelectAll={handleSelectAll}
//       />
      
//       {filteredTransactions.length > 0 && (
//         <TransactionPagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           totalItems={filteredTransactions.length}
//           itemsPerPage={itemsPerPage}
//           onPageChange={handlePageChange}
//         />
//       )}
//     </div>
//   );
// }



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
import TransactionFilters from '@/app/components/transactions/TransactionFilters';
import TransactionTable from '@/app/components/transactions/TransactionTable';
import TransactionPagination from '@/app/components/transactions/Pagination';

// Updated Mock Data with more realistic amounts and variety
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
  {
    id: '4567890136',
    name: 'Stock Dividends',
    category: 'Income',
    account: 'Freedom Unlimited Mastercard',
    accountType: 'mastercard',
    date: '2024-09-24',
    time: '09:00 AM',
    amount: 300.00,
    note: 'Quarterly stock dividend',
    status: 'Completed',
    icon: TrendingUp
  },
  {
    id: '4567890123',
    name: 'Comcast Bill Payment',
    category: 'Utilities',
    account: 'Platinum Plus Visa',
    accountType: 'visa',
    date: '2024-09-24',
    time: '10:30 AM',
    amount: -150.00,
    note: 'Monthly internet and TV bill',
    status: 'Completed',
    icon: Wifi
  },
  {
    id: '4567890137',
    name: 'Freelance Project',
    category: 'Income',
    account: 'Platinum Plus Visa',
    accountType: 'visa',
    date: '2024-09-23',
    time: '01:30 PM',
    amount: 1200.00,
    note: 'Payment for freelance design work',
    status: 'Completed',
    icon: DollarSign
  },
  {
    id: '4567890124',
    name: 'Amazon Purchase',
    category: 'Food & Dining',
    account: 'Freedom Unlimited Mastercard',
    accountType: 'mastercard',
    date: '2024-09-23',
    time: '03:45 PM',
    amount: -80.95,
    note: 'Purchased kitchen appliances',
    status: 'Completed',
    icon: ShoppingCart
  },
  {
    id: '567890123',
    name: 'Gym Membership',
    category: 'Healthcare',
    account: 'Platinum Plus Visa',
    accountType: 'visa',
    date: '2024-09-22',
    time: '07:00 AM',
    amount: -45.00,
    note: 'Monthly gym fee for health',
    status: 'Pending',
    icon: Dumbbell
  },
  {
    id: '4567890138',
    name: 'Rental Income',
    category: 'Real Estate',
    account: 'Freedom Unlimited Mastercard',
    accountType: 'mastercard',
    date: '2024-09-22',
    time: '08:00 AM',
    amount: 2500.00,
    note: 'Monthly rent from property',
    status: 'Completed',
    icon: Home
  },
  {
    id: '4567890126',
    name: 'State Farm Insurance',
    category: 'Investments',
    account: 'Freedom Unlimited Mastercard',
    accountType: 'mastercard',
    date: '2024-09-21',
    time: '02:15 PM',
    amount: -325.00,
    note: 'Car insurance premium investment',
    status: 'Completed',
    icon: Shield
  },
  {
    id: '4567890127',
    name: 'Verizon Bill',
    category: 'Utilities',
    account: 'Platinum Plus Visa',
    accountType: 'visa',
    date: '2024-09-20',
    time: '11:00 AM',
    amount: -160.00,
    note: 'Mobile phone bill',
    status: 'Pending',
    icon: Smartphone
  },
  {
    id: '4567890128',
    name: 'Electricity Bill',
    category: 'Utilities',
    account: 'Freedom Unlimited Mastercard',
    accountType: 'mastercard',
    date: '2024-09-19',
    time: '08:20 AM',
    amount: -170.00,
    note: 'Home electricity bill',
    status: 'Completed',
    icon: Home
  },
  {
    id: '4567890129',
    name: 'Netflix Subscription',
    category: 'Entertainment',
    account: 'Platinum Plus Visa',
    accountType: 'visa',
    date: '2024-09-18',
    time: '05:45 PM',
    amount: -17.99,
    note: 'Monthly entertainment subscription',
    status: 'Completed',
    icon: Play
  },
  {
    id: '4567890130',
    name: 'Flight Booking',
    category: 'Investments',
    account: 'Elite Traveler Mastercard',
    accountType: 'mastercard',
    date: '2024-09-17',
    time: '09:30 AM',
    amount: -350.00,
    note: 'Business trip expense',
    status: 'Rejected',
    icon: Plane
  },
  {
    id: '4567890139',
    name: 'Salary Payment',
    category: 'Income',
    account: 'Mastercard Platinum',
    accountType: 'mastercard',
    date: '2024-09-16',
    time: '09:00 AM',
    amount: 5000.00,
    note: 'Monthly salary payment',
    status: 'Completed',
    icon: DollarSign
  },
  {
    id: '4567890140',
    name: 'Grocery Shopping',
    category: 'Food & Dining',
    account: 'Platinum Plus Visa',
    accountType: 'visa',
    date: '2024-09-15',
    time: '06:30 PM',
    amount: -120.50,
    note: 'Weekly grocery shopping',
    status: 'Completed',
    icon: ShoppingCart
  },
  {
    id: '4567890141',
    name: 'Investment Return',
    category: 'Investments',
    account: 'Freedom Unlimited Mastercard',
    accountType: 'mastercard',
    date: '2024-09-14',
    time: '10:15 AM',
    amount: 750.00,
    note: 'Monthly investment dividend',
    status: 'Pending',
    icon: TrendingUp
  }
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
    setSelectedIds([]); // Clear selections when changing pages
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
    <div className="w-full  p-6 space-y-6">
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