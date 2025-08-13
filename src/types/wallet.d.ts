export interface GetWalletBalanceResponse {
  balance: number;
  currency: string;
  id: string;
  walletId: string;
  balance: number;
}

export interface TopUpRequest {
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentReference?: string;
  isDirectPayment?: boolean;
}

export interface TopUpResponse {
  transactionId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  paymentReference: string;
  createdAt: string;
}

export interface WalletBalance {
  id: number;
  userId: number;
  balance: number;
  currency: string;
  walletId: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalConversions: number;
  isActive: boolean;
  lastTransactionAt?: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  error: boolean;
  message: string;
  data: T;
}
