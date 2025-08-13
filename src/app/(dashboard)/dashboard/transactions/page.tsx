"use client";

import { useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import useTransactions from "@/hooks/TransactionsHook";

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
  to_currency: string;
  note: string;
  status: "Completed" | "Pending" | "Rejected";
  icon: React.ElementType;
}

const currencyDirection = {
  "NGN-GHS": "Naira To Ghana Cedi Transfer",
  "GHS-NGN": "Ghana Cedi To Naira Transfer",
  "DEPOSIT-NGN": "Deposit To Naira Wallet",
  "DEPOSIT-GHS": "Deposit To Ghana Cedi Wallet",
  "WITHDRAWAL-NGN": "Withdrawal From Naira Wallet",
  "WITHDRAWAL-GHS": "Withdrawal From Ghana Cedi Wallet",
};

export default function TransactionComponent() {
  const { data } = useTransactions();

  const transactionsData: Transaction[] = useMemo(() => {
    const list = (Array.isArray(data) ? data : []) as Array<{
      created_at?: string;
      id?: string;
      transaction_id?: string;
      reference?: string;
      status?: string;
      payment_type?: string;
      direction?: string;
      transaction_details?: {
        from_currency?: string;
        to_currency?: string;
        from_amount?: number | string;
        to_amount?: number | string;
        recipient_name?: string;
        bank_name?: string;
        account_number?: string;
        network?: string;
        phone_number?: string;
        amount?: number | string;
      };
    }>;
    return list.map((t) => {
      const createdAt = t?.created_at;
      const dateObj = createdAt ? new Date(createdAt) : null;
      const date = dateObj ? dateObj.toISOString().slice(0, 10) : "";
      const time = dateObj
        ? dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";

      const details = t?.transaction_details || {};
      const paymentType = t?.payment_type || "";
      const statusRaw = String(t?.status || "pending").toLowerCase();

      const status =
        statusRaw === "completed"
          ? "Completed"
          : statusRaw === "failed" || statusRaw === "rejected"
            ? "Rejected"
            : "Pending";
      const name =
        currencyDirection[t.direction as keyof typeof currencyDirection] ||
        "Unknown";
      const amount = details?.to_amount || Number(details?.from_amount || 0);
      const note = details?.recipient_name
        ? `Transfer to ${details.recipient_name}`
        : "Balance Top Up";

      const id = t?.transaction_id || t?.id || t?.reference || "";

      return {
        id,
        name,
        accountType: paymentType || "paystack",
        date,
        time,
        amount,
        to_currency: details?.to_currency || "GHS",
        note,
        status,
        icon: RefreshCcw,
      } as Transaction;
    });
  }, [data]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("All Account");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = useMemo(() => {
    setCurrentPage(1); // Reset to first page on filter change
    const source = transactionsData || [];
    return source.filter((transaction) => {
      const matchesSearch =
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.includes(searchTerm);
      const matchesAccount =
        selectedAccount === "All Account" ||
        transaction.accountType?.toLowerCase() ===
          selectedAccount.toLowerCase();
      return matchesSearch && matchesAccount;
    });
  }, [searchTerm, selectedAccount, transactionsData]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handlers
  const handleSelectTransaction = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
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
