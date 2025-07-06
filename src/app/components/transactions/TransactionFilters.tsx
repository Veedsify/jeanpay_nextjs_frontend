
// 'use client';

// import { Search, Calendar, Download, ChevronDown, Filter } from 'lucide-react';
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
//   const [dateRange] = useState('1-30 September 2028');
//   const [showFilters, setShowFilters] = useState(false);

//   return (
//     <div className="w-full rounded-xl border-2 border-green-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
//       {/* Mobile Layout */}
//       <div className="block md:hidden bg-red-500">
//         {/* Top Row - Search and Filter Toggle */}
//         <div className="flex items-center gap-3 mb-4">
//           <div className="relative flex-1">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => onSearchChange(e.target.value)}
//               placeholder="Search transaction"
//               className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//             />
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
//           </div>
          
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="p-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
//           >
//             <Filter className="h-4 w-4" />
//           </button>
          
//           <button
//             onClick={onDownload}
//             className="p-2.5 bg-[#004643] hover:bg-[#005954] text-white rounded-md"
//           >
//             <Download className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Collapsible Filters */}
//         {showFilters && (
//           <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
//             {/* Category */}
//             <div className="relative">
//               <select
//                 value={category}
//                 onChange={(e) => onCategoryChange(e.target.value)}
//                 className="w-full text-sm px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white appearance-none pr-8"
//               >
//                 <option value="">All Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
//             </div>

//             {/* Account */}
//             <div className="relative">
//               <select
//                 value={account}
//                 onChange={(e) => onAccountChange(e.target.value)}
//                 className="w-full text-sm px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white appearance-none pr-8"
//               >
//                 <option>All Account</option>
//                 <option>Platinum Plus Visa</option>
//                 <option>Freedom Unlimited Mastercard</option>
//                 <option>Elite Traveler Mastercard</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
//             </div>

//             {/* Date */}
//             <button
//               type="button"
//               className="w-full text-sm px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white flex items-center gap-2"
//             >
//               <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//               <span>{dateRange}</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Desktop Layout */}
//       <div className="hidden md:block">
//         <div className="flex justify-between items-center gap-2 md:gap-3 lg:gap-6">
//           {/* LEFT GROUP - Search, Category, Account */}
//           <div className="flex items-center gap-2 md:gap-3 lg:gap-[14px] flex-shrink min-w-0">
//             {/* Search */}
//             <div className="relative w-[140px] md:w-[160px] lg:w-[200px]">
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => onSearchChange(e.target.value)}
//                 placeholder="Search transaction"
//                 className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//               />
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//             </div>

//             {/* Category */}
//             <div className="relative w-[120px] md:w-[140px] lg:w-[160px]">
//               <select
//                 value={category}
//                 onChange={(e) => onCategoryChange(e.target.value)}
//                 className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white appearance-none pr-8"
//               >
//                 <option value="">All Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
//             </div>

//             {/* Account */}
//             <div className="relative w-[120px] md:w-[140px] lg:w-[160px]">
//               <select
//                 value={account}
//                 onChange={(e) => onAccountChange(e.target.value)}
//                 className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white appearance-none pr-8"
//               >
//                 <option>All Account</option>
//                 <option>Platinum Plus Visa</option>
//                 <option>Freedom Unlimited Mastercard</option>
//                 <option>Elite Traveler Mastercard</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
//             </div>
//           </div>

//           {/* RIGHT GROUP - Date and Download */}
//           <div className="flex items-center gap-2 md:gap-3 lg:gap-[12px] flex-shrink-0">
//             {/* Date */}
//             <button
//               type="button"
//               className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white flex items-center gap-2 w-[140px] md:w-[160px] lg:w-[200px]"
//             >
//               <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//               <span className="truncate">{dateRange}</span>
//             </button>

//             {/* Download */}
//             <button
//               onClick={onDownload}
//               className="bg-[#004643] hover:bg-[#005954] text-white text-sm px-3 md:px-4 lg:px-5 py-2 rounded-md flex items-center gap-2 whitespace-nowrap"
//             >
//               <Download className="h-4 w-4" />
//               <span className="hidden md:inline">Download</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { Search, Calendar, Download, ChevronDown, Filter } from 'lucide-react';
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
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full rounded-xl  dark:border-gray-800 p-2 md:p-4 bg-white dark:bg-gray-900">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Top Row - Search and Filter Toggle */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search transaction"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
          >
            <Filter className="h-4 w-4" />
          </button>
          
          <button
            onClick={onDownload}
            className="p-2.5 bg-[#004643] hover:bg-[#005954] text-white rounded-md"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>

        {/* Collapsible Filters */}
        {showFilters && (
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            {/* Category */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full text-sm px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white appearance-none pr-8"
              >
                <option value="">All Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
            </div>

            {/* Account */}
            <div className="relative">
              <select
                value={account}
                onChange={(e) => onAccountChange(e.target.value)}
                className="w-full text-sm px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white appearance-none pr-8"
              >
                <option>All Account</option>
                <option>Platinum Plus Visa</option>
                <option>Freedom Unlimited Mastercard</option>
                <option>Elite Traveler Mastercard</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
            </div>

            {/* Date */}
            <button
              type="button"
              className="w-full text-sm px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white flex items-center gap-2"
            >
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>{dateRange}</span>
            </button>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex justify-between items-center gap-2 md:gap-3 lg:gap-6">
          {/* LEFT GROUP - Search, Category, Account */}
          <div className="flex items-center gap-2 md:gap-3 lg:gap-[14px] flex-shrink min-w-0">
            {/* Search */}
            <div className="relative w-[140px] md:w-[160px] lg:w-[200px]">
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
            <div className="relative w-[120px] md:w-[140px] lg:w-[160px]">
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
            <div className="relative w-[120px] md:w-[140px] lg:w-[160px]">
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
          <div className="flex items-center gap-2 md:gap-3 lg:gap-[12px] flex-shrink-0">
            {/* Date */}
            <button
              type="button"
              className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white flex items-center gap-2 w-[140px] md:w-[160px] lg:w-[200px]"
            >
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="truncate">{dateRange}</span>
            </button>

            {/* Download */}
            <button
              onClick={onDownload}
              className="bg-[#004643] hover:bg-[#005954] text-white text-sm px-3 md:px-4 lg:px-5 py-2 rounded-md flex items-center gap-2 whitespace-nowrap"
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}