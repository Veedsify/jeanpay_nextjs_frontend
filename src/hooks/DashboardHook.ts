import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
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
} from "@/funcs/dashboard/DashboardFuncs";

// Query keys for dashboard data
const DASHBOARD_KEYS = {
  overview: ["dashboard", "overview"],
  stats: ["dashboard", "stats"],
  summary: ["dashboard", "summary"],
  recentActivity: ["dashboard", "recent-activity"],
  walletOverview: ["dashboard", "wallet-overview"],
  conversionStats: ["dashboard", "conversion-stats"],
  monthlyStats: ["dashboard", "monthly-stats"],
  transactionTrends: ["dashboard", "transaction-trends"],
  transactionStats: (period: string) => [
    "dashboard",
    "transaction-stats",
    period,
  ],
  chartsData: ["dashboard", "charts-data"],
} as const;

export default function useDashboard() {
  const queryClient = useQueryClient();

  // Dashboard Overview Query
  const dashboardOverviewQuery = useQuery({
    queryKey: DASHBOARD_KEYS.overview,
    queryFn: async () => {
      const response = await getDashboardOverview();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Dashboard Stats Query
  const dashboardStatsQuery = useQuery({
    queryKey: DASHBOARD_KEYS.stats,
    queryFn: async () => {
      const response = await getDashboardStats();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Dashboard Summary Query
  const dashboardSummaryQuery = useQuery({
    queryKey: DASHBOARD_KEYS.summary,
    queryFn: async () => {
      const response = await getDashboardSummary();
      return response.data;
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Recent Activity Query
  const recentActivityQuery = useQuery({
    queryKey: DASHBOARD_KEYS.recentActivity,
    queryFn: async () => {
      const response = await getRecentActivity();
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  // Wallet Overview Query
  const walletOverviewQuery = useQuery({
    queryKey: DASHBOARD_KEYS.walletOverview,
    queryFn: async () => {
      const response = await getWalletOverview();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Conversion Stats Query
  const conversionStatsQuery = useQuery({
    queryKey: DASHBOARD_KEYS.conversionStats,
    queryFn: async () => {
      const response = await getConversionStats();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  // Monthly Stats Query
  const monthlyStatsQuery = useQuery({
    queryKey: DASHBOARD_KEYS.monthlyStats,
    queryFn: async () => {
      const response = await getMonthlyStats();
      return response.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });

  // Transaction Trends Query
  const transactionTrendsQuery = useQuery({
    queryKey: DASHBOARD_KEYS.transactionTrends,
    queryFn: async () => {
      const response = await getTransactionTrends();
      return response.data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  // Charts Data Query
  const chartsDataQuery = useQuery({
    queryKey: DASHBOARD_KEYS.chartsData,
    queryFn: async () => {
      const response = await getDashboardChartsData();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  // Transaction Stats Query with period parameter
  const useTransactionStats = (period: string = "month") => {
    return useQuery({
      queryKey: DASHBOARD_KEYS.transactionStats(period),
      queryFn: async () => {
        const response = await getTransactionStats(period);
        return response.data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 15 * 60 * 1000, // 15 minutes
    });
  };

  // Refresh all dashboard data
  const refreshDashboard = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEYS.overview }),
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEYS.stats }),
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEYS.summary }),
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_KEYS.recentActivity,
      }),
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_KEYS.walletOverview,
      }),
    ]);
  };

  // Refresh specific dashboard section
  const refreshDashboardSection = async (
    section: keyof typeof DASHBOARD_KEYS,
  ) => {
    if (section === "transactionStats") {
      // Invalidate all transaction stats queries
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "transaction-stats"],
      });
    } else {
      await queryClient.invalidateQueries({
        queryKey: DASHBOARD_KEYS[section] as readonly string[],
      });
    }
  };

  // Prefetch dashboard data
  const prefetchDashboardData = async () => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: DASHBOARD_KEYS.overview,
        queryFn: async () => {
          const response = await getDashboardOverview();
          return response.data;
        },
        staleTime: 5 * 60 * 1000,
      }),
      queryClient.prefetchQuery({
        queryKey: DASHBOARD_KEYS.summary,
        queryFn: async () => {
          const response = await getDashboardSummary();
          return response.data;
        },
        staleTime: 3 * 60 * 1000,
      }),
    ]);
  };

  return {
    // Query results
    overview: dashboardOverviewQuery,
    stats: dashboardStatsQuery,
    summary: dashboardSummaryQuery,
    recentActivity: recentActivityQuery,
    walletOverview: walletOverviewQuery,
    conversionStats: conversionStatsQuery,
    monthlyStats: monthlyStatsQuery,
    transactionTrends: transactionTrendsQuery,
    chartsData: chartsDataQuery,

    // Dynamic queries
    useTransactionStats,

    // Utility functions
    refreshDashboard,
    refreshDashboardSection,
    prefetchDashboardData,

    // Loading states
    isLoading:
      dashboardOverviewQuery.isLoading || dashboardSummaryQuery.isLoading,
    isError: dashboardOverviewQuery.isError || dashboardSummaryQuery.isError,

    // Error information
    error: dashboardOverviewQuery.error || dashboardSummaryQuery.error,
  };
}

// Export query keys for external use
export { DASHBOARD_KEYS };
