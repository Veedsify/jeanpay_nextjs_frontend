import { axiosClient } from "@/lib/axios";
import {
  DashboardOverview,
  DashboardStats,
  DashboardSummary,
  RecentActivity,
  WalletOverview,
  ConversionStatsData,
  MonthlyStatsData,
  TransactionTrends,
} from "@/types/dashboard";

/**
 * Get dashboard overview including wallet, recent transactions, exchange rates, and quick stats
 */
async function getDashboardOverview() {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: DashboardOverview;
  }>("/protected/dashboard/overview");
}

/**
 * Get detailed dashboard statistics including monthly stats, transaction volume, and chart data
 */
async function getDashboardStats() {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: DashboardStats;
  }>("/protected/dashboard/stats");
}

/**
 * Get dashboard summary with key metrics
 */
async function getDashboardSummary() {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: DashboardSummary;
  }>("/protected/dashboard/summary");
}

/**
 * Get recent activity for the user
 */
async function getRecentActivity() {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: RecentActivity[];
  }>("/protected/dashboard/recent-activity");
}

/**
 * Get wallet overview with all wallet balances
 */
async function getWalletOverview() {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: WalletOverview;
  }>("/protected/dashboard/wallet-overview");
}

/**
 * Get conversion statistics
 */
async function getConversionStats() {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: ConversionStatsData;
  }>("/protected/dashboard/conversion-stats");
}

/**
 * Get monthly statistics
 */
async function getMonthlyStats() {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: MonthlyStatsData;
  }>("/protected/dashboard/monthly-stats");
}

/**
 * Get transaction trends data
 */
async function getTransactionTrends() {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: TransactionTrends;
  }>("/protected/dashboard/transaction-trends");
}

/**
 * Get transaction statistics with optional period filter
 * @param period - Time period for stats (default: "month")
 */
async function getTransactionStats(period: string = "month") {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: {
      period: string;
      date_range: {
        start: string;
        end: string;
      };
      transaction_counts: {
        completed: number;
        pending: number;
        failed: number;
        total: number;
      };
      amounts: {
        income: number;
        expense: number;
        net: number;
      };
      conversions: {
        count: number;
        amount: number;
      };
    };
  }>(`/protected/dashboard/transaction-stats?period=${period}`);
}

/**
 * Get dashboard chart data
 */
async function getDashboardChartsData() {
  return axiosClient.get<{
    error: boolean;
    message: string;
    data: {
      dailyTransactions: Array<{
        date: string;
        count: number;
        volume: number;
      }>;
      monthlyVolume: Array<{
        month: string;
        volume: number;
      }>;
    };
  }>("/protected/dashboard/charts-data");
}

export {
  getDashboardOverview,
  getDashboardStats,
  getDashboardSummary,
  getRecentActivity,
  getWalletOverview,
  getConversionStats,
  getMonthlyStats,
  getTransactionTrends,
  getTransactionStats,
  getDashboardChartsData,
};
