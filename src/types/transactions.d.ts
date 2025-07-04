export interface Transaction {
  id: string;
  type: "topup" | "withdraw" | "convert" | "send" | "receive";
  amount: number;
  currency: string;
  toCurrency?: string;
  status: "completed" | "pending" | "failed";
  date: string;
  time: string;
  description: string;
  recipient?: string;
  transactionId: string;
}