export interface DashboardOverview {
  wallet: WalletSummary;
  recentTransactions: RecentTransaction[];
  exchangeRates: ExchangeRateData;
  quickStats: QuickStatsData;
}

export interface DashboardStats {
  monthlyStats: MonthlyStatsData;
  transactionVol: TransactionVolData;
  conversionStats: ConversionStatsData;
  chartData: ChartData;
}

export interface WalletSummary {
  balance: number;
  currency: string;
  totalBalance: number;
}

export interface RecentTransaction {
  id: string;
  type: string;
  fromCurrency: string;
  toCurrency?: string;
  fromAmount: number;
  toAmount?: number;
  status: "completed" | "pending" | "failed";
  description: string;
  recipient?: string;
  createdAt: string;
  transactionId: string;
  date: string;
  time: string;
}

export interface ExchangeRateData {
  ngnToGhs: number;
  ghsToNgn: number;
}

export interface QuickStatsData {
  totalTransactions: number;
  pendingTransactions: number;
  completedTxns: number;
}

export interface MonthlyStatsData {
  deposits: number;
  withdrawals: number;
  conversions: number;
}

export interface TransactionVolData {
  thisMonth: number;
  lastMonth: number;
  percentChange: number;
}

export interface ConversionStatsData {
  ngnToGhs: number;
  ghsToNgn: number;
}

export interface ChartData {
  dailyTransactions: DailyTxnData[];
  monthlyVolume: MonthlyVolData[];
}

export interface DailyTxnData {
  date: string;
  count: number;
  volume: number;
}

export interface MonthlyVolData {
  month: string;
  volume: number;
}

export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  transactionCount: number;
  pendingTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
  topCurrency: string;
  recentActivity: RecentActivity[];
}

export interface RecentActivity {
  id: number;
  activity: string;
  created_at: string;
}

export interface WalletOverview extends WalletBalance {
  totalBalance: number;
}

export interface WalletBalance {
  ngn_wallet: {
    balance: number;
    is_active: boolean;
    total_conversions: number;
    total_deposits: number;
    total_withdrawals: number;
  };
  ghs_wallet: {
    balance: number;
    is_active: boolean;
    total_conversions: number;
    total_deposits: number;
    total_withdrawals: number;
  };
  exchange_rates: {
    "GHS-NGN": number;
    "NGN-GHS": number;
  };
}

export interface TransactionTrends {
  daily: TrendData[];
  weekly: TrendData[];
  monthly: TrendData[];
}

export interface TrendData {
  period: string;
  income: number;
  expense: number;
  net: number;
}
