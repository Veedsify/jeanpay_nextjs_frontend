import { TransferDetails } from "@/app/components/contexts/TransferStore";
import { axiosClient } from "@/lib/axios";
const path = {
  TransactionsBase: "/protected/transactions",
  TransactionsAll: "/all",
  TransactionsUserHistory: "/history",
  TransactionsDetails: "/details/:id",
  TransactionsUpdateStatus: "/status/:id",
};
async function createTransaction({ details }: { details: TransferDetails }) {
  const response = await axiosClient.post(
    path.TransactionsBase + "/new",
    details,
  );
  return response.data;
}

async function getTransactionDetails({
  transactionID,
}: {
  transactionID: string;
}) {
  const response = await axiosClient.get(
    path.TransactionsBase +
      path.TransactionsDetails.replace(":id", transactionID),
  );
  return response.data.data;
}

async function getUserTransactions(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  accountType?: string;
  fromDate?: string;
  toDate?: string;
}) {
  const response = await axiosClient.get(
    path.TransactionsBase + path.TransactionsUserHistory,
    { params },
  );
  return response.data.data;
}

export {
  createTransaction,
  getTransactionDetails,
  getUserTransactions,
  path as TransactionPath,
};
