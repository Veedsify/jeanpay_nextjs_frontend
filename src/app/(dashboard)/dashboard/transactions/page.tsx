"use client";

import { useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import useTransactions from "@/hooks/TransactionsHook";
import { useTransactionDetails } from "@/hooks/TransactionHook";

import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionTable from "@/components/transactions/TransactionTable";
import TransactionPagination from "@/components/transactions/Pagination";
import TransactionDetailsModal from "@/components/transactions/TransactionDetailsModal";

// Transaction interface to match the component expectations
interface Transaction {
  id: string;
  name: string;
  accountType: string;
  date: string;
  time: string;
  amount: number;
  from_currency: string;
  note: string;
  status: "Completed" | "Pending" | "Failed";
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
      description?: string;
      currency?: string;
      amount?: number | string;
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

      const paymentType = t?.payment_type || "";
      const statusRaw = String(t?.status || "pending").toLowerCase();

      const status =
        statusRaw === "completed"
          ? "Completed"
          : statusRaw === "failed" || statusRaw === "failed"
          ? "Failed"
          : "Pending";
      const name =
        currencyDirection[t.direction as keyof typeof currencyDirection] ||
        "Unknown";
      const amount = t?.amount || Number(t?.amount || 0);
      const note = t?.description || "";

      const id = t?.transaction_id || t?.id || t?.reference || "";

      return {
        id,
        name,
        accountType: paymentType || "paystack",
        date,
        time,
        amount,
        from_currency: t?.currency || "NGN",
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
  const [selectedTransactionId, setSelectedTransactionId] =
    useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Fetch transaction details when a transaction is selected
  const { data: transactionDetails, isLoading: isLoadingDetails } =
    useTransactionDetails(selectedTransactionId);

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

  const handleViewTransaction = (id: string) => {
    setSelectedTransactionId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionId("");
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
        onViewTransaction={handleViewTransaction}
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

      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transactionDetails={transactionDetails}
        isLoading={isLoadingDetails}
      />
    </div>
  );
}
