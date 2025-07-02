

// 'use client';

// import { useState } from 'react';
// import { Search, Calendar, Download } from 'lucide-react';

// export default function TransactionFilters() {
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('All Category');
//   const [account, setAccount] = useState('All Account');

//   const handleDownload = () => {
//     console.log({ search, category, account });
//   };

//   return (
//     <div className="w-full rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
//       <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-6 relative">
//         {/* LEFT GROUP */}
//         <div className="flex items-center gap-[14px]">
//           {/* Search */}
//           <div className="relative w-[200px]">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search transaction"
//               className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
//           </div>

//           {/* Category */}
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-[160px]"
//           >
//             <option>All Category</option>
//             <option>Food</option>
//             <option>Transport</option>
//             <option>Shopping</option>
//           </select>

//           {/* Account */}
//           <select
//             value={account}
//             onChange={(e) => setAccount(e.target.value)}
//             className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-[160px]"
//           >
//             <option>All Account</option>
//             <option>Bank</option>
//             <option>Wallet</option>
//             <option>Cash</option>
//           </select>
//         </div>

//         {/* SPACER — exact 417px between left and right groups */}
//         <div className="hidden lg:block" style={{ width: '417px' }} />

//         {/* RIGHT GROUP */}
//         <div className="flex items-center gap-[12px]">
//           {/* Date */}
//           <button
//             type="button"
//             className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white flex items-center gap-2 w-[200px]"
//           >
//             <Calendar className="h-4 w-4 text-gray-500" />
//             <span>1–30 September 2028</span>
//           </button>

//           {/* Download */}
//           <button
//             onClick={handleDownload}
//             className="bg-[#004643] hover:bg-[#005954] text-white text-sm px-5 py-2 rounded-md flex items-center gap-2"
//           >
//             <Download className="h-4 w-4" />
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { Search, Calendar, Download, ChevronDown } from 'lucide-react';
// import { useState } from 'react';

// interface TransactionFiltersProps {
//   search: string;
//   onSearchChange: (value: string) => void;
//   category: string;
//   onCategoryChange: (value: string) => void;
//   categories: string[];
//   account?: string;
//   onAccountChange?: (value: string) => void;
//   onDownload?: () => void;
// }

// export default function TransactionFilters({
//   search,
//   onSearchChange,
//   category,
//   onCategoryChange,
//   categories,
//   account = 'All Account',
//   onAccountChange = () => {},
//   onDownload = () => {},
// }: TransactionFiltersProps) {
//   const [dateRange] = useState('Select Date Range');

//   return (
//     <div className="w-full rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
//       <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-6 relative">
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="relative w-full sm:w-[200px]">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => onSearchChange(e.target.value)}
//               placeholder="Search transaction"
//               className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//           </div>

//           <div className="relative w-full sm:w-[160px]">
//             <select
//               value={category}
//               onChange={(e) => onCategoryChange(e.target.value)}
//               className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 appearance-none pr-8"
//             >
//               <option value="">All Category</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
//           </div>

//           <div className="relative w-full sm:w-[160px]">
//             <select
//               value={account}
//               onChange={(e) => onAccountChange(e.target.value)}
//               className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 appearance-none pr-8"
//             >
//               <option>All Account</option>
//               <option>Platinum Plus Visa</option>
//               <option>Freedom Unlimited Mastercard</option>
//               <option>Elite Traveler Mastercard</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center gap-3 ml-auto">
//           <button
//             type="button"
//             className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white flex items-center gap-2 w-full sm:w-[200px]"
//           >
//             <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//             <span>{dateRange}</span>
//           </button>

//           <button
//             onClick={onDownload}
//             className="bg-[#004643] hover:bg-[#005954] text-white text-sm px-5 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto"
//           >
//             <Download className="h-4 w-4" />
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { Search, Calendar, Download, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface TransactionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  account?: string;
  onAccountChange?: (value: string) => void;
  onDownload?: () => void;
}

export default function TransactionFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  account = 'All Account',
  onAccountChange = () => {},
  onDownload = () => {},
}: TransactionFiltersProps) {
  const [dateRange] = useState('1-30 September 2028');

  return (
    <div className="w-full rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* LEFT GROUP - Search, Category, Account */}
        <div className="flex items-center gap-[14px] flex-shrink-0">
          {/* Search */}
          <div className="relative w-[200px]">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search transaction"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Category */}
          <div className="relative w-[160px]">
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white appearance-none pr-8"
            >
              <option value="">All Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>

          {/* Account */}
          <div className="relative w-[160px]">
            <select
              value={account}
              onChange={(e) => onAccountChange(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white appearance-none pr-8"
            >
              <option>All Account</option>
              <option>Platinum Plus Visa</option>
              <option>Freedom Unlimited Mastercard</option>
              <option>Elite Traveler Mastercard</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* RIGHT GROUP - Date and Download */}
        <div className="flex items-center gap-[12px] flex-shrink-0">
          {/* Date */}
          <button
            type="button"
            className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white flex items-center gap-2 w-[200px]"
          >
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span>{dateRange}</span>
          </button>

          {/* Download */}
          <button
            onClick={onDownload}
            className="bg-[#004643] hover:bg-[#005954] text-white text-sm px-5 py-2 rounded-md flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}