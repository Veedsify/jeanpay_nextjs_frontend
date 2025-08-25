import { TransferDetails } from "@/components/contexts/TransferStore";

export interface Transaction {
  id: string;
  type: "topup" | "withdraw" | "convert" | "send" | "receive";
  amount: number;
  currency: string;
  toCurrency?: string;
  accountType?: string;
  status: "completed" | "pending" | "failed";
  date: string;
  time: string;
  description: string;
  recipient?: string;
  transactionId: string;
}

interface TransactionDateReponse extends TransferDetails {
  completed_at: string;
}

export interface TransactionDetailsReponse extends TransactionDateReponse {
  error: boolean;
  message: string;
}