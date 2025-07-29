"use client";

import { useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import TransactionFilters from "@/app/components/transactions/TransactionFilters";
import TransactionTable from "@/app/components/transactions/TransactionTable";
import TransactionPagination from "@/app/components/transactions/Pagination";

// Transaction interface to match the component expectations
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

// Updated Mock Data with more realistic amounts and variety
const mockTransactions: Transaction[] = [
  {
    id: "4567890135",
    name: "NGN to GHS",
    accountType: "momo",
    date: "2024-09-25",
    time: "11:00 AM",
    amount: 1500.0,
    note: "Annual performance bonus",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890136",
    name: "NGN - GHS",
    accountType: "paystack",
    date: "2024-09-24",
    time: "09:00 AM",
    amount: 300.0,
    note: "Quarterly stock dividend",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890123",
    name: "GHS - NGN",
    accountType: "momo",
    date: "2024-09-24",
    time: "10:30 AM",
    amount: -150.0,
    note: "Monthly internet and TV bill",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890137",
    name: "GHS - NGN",
    accountType: "visa",
    date: "2024-09-23",
    time: "01:30 PM",
    amount: 1200.0,
    note: "Payment for freelance design work",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890124",
    name: "GHS - NGN",
    accountType: "mastercard",
    date: "2024-09-23",
    time: "03:45 PM",
    amount: -80.95,
    note: "Purchased kitchen appliances",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "567890123",
    name: "NGN - GHS",
    accountType: "visa",
    date: "2024-09-22",
    time: "07:00 AM",
    amount: -45.0,
    note: "Monthly gym fee for health",
    status: "Pending",
    icon: RefreshCcw,
  },
  {
    id: "4567890138",
    name: "GHS - NGN",
    accountType: "mastercard",
    date: "2024-09-22",
    time: "08:00 AM",
    amount: 2500.0,
    note: "Monthly rent from property",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890126",
    name: "NGN - GHS",
    accountType: "mastercard",
    date: "2024-09-21",
    time: "02:15 PM",
    amount: -325.0,
    note: "Car insurance premium investment",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890127",
    name: "NGN - GHS",
    accountType: "visa",
    date: "2024-09-20",
    time: "11:00 AM",
    amount: -160.0,
    note: "Mobile phone bill",
    status: "Pending",
    icon: RefreshCcw,
  },
  {
    id: "4567890128",
    name: "GHS - NGN",
    accountType: "mastercard",
    date: "2024-09-19",
    time: "08:20 AM",
    amount: -170.0,
    note: "Home electricity bill",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890129",
    name: "NGN - GHS",
    accountType: "visa",
    date: "2024-09-18",
    time: "05:45 PM",
    amount: -17.99,
    note: "Monthly entertainment subscription",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890130",
    name: "GHS - NGN",
    accountType: "mastercard",
    date: "2024-09-17",
    time: "09:30 AM",
    amount: -350.0,
    note: "Business trip expense",
    status: "Rejected",
    icon: RefreshCcw,
  },
  {
    id: "4567890139",
    name: "GHS - NGN",
    accountType: "mastercard",
    date: "2024-09-16",
    time: "09:00 AM",
    amount: 5000.0,
    note: "Monthly salary payment",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890140",
    name: "NGN - GHS",
    accountType: "visa",
    date: "2024-09-15",
    time: "06:30 PM",
    amount: -120.5,
    note: "Weekly grocery shopping",
    status: "Completed",
    icon: RefreshCcw,
  },
  {
    id: "4567890141",
    name: "GHS - NGN",
    accountType: "mastercard",
    date: "2024-09-14",
    time: "10:15 AM",
    amount: 750.0,
    note: "Monthly investment dividend",
    status: "Pending",
    icon: RefreshCcw,
  },
];

export default function TransactionComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("All Account");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.includes(searchTerm);
      return matchesSearch;
    });
  }, [searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSelectTransaction = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? paginatedTransactions.map((t) => t.id) : []);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]); // Clear selections when changing pages
  };

  const handleDownload = () => {
    console.log("Downloading transactions with filters:", {
      searchTerm,
      selectedCategory,
      selectedAccount,
      selectedIds,
    });
    // API call for download would go here
  };

  return (
    <div className="lg:w-full  border rounded-2xl mt-6 mx-auto border-black/30 overflow-x-auto p-2 md:py-6  space-y-6">
      <TransactionFilters
        search={searchTerm}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
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
