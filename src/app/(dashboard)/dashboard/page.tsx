"use client";
import Link from "next/link";
import { ClockIcon, PlusSquareIcon } from "@phosphor-icons/react";
// import ExpenseStat from "@/components/commons/ExpenseStat";
import RecentActivityStat from "@/components/commons/RecentActivityStat";
import Image from "next/image";
import BalanceCard from "@/components/commons/BalanceCard";
import { QuickAction } from "@/types/commons";
import { formatCurrency } from "@/utils/helpers";
import { useAuthContext } from "@/components/contexts/UserAuthContext";
import { CurrencyType } from "@/types/global";
import useDashboard from "@/hooks/DashboardHook";
import { formatDateTime } from "@/lib/utils";
import {
  ArrowDown,
  ArrowDownIcon,
  ArrowUpIcon,
  LucideLoader,
  LucideRepeat,
} from "lucide-react";

export default function DashBoardPage() {
  const { user } = useAuthContext();
  // Use dashboard hooks
  const {
    // summary,
    recentActivity,
    walletOverview,
    isLoading,
    overview,
    isError,
    refreshDashboard,
  } = useDashboard();
  const quickActions: QuickAction[] = [
    {
      title: "Exchange Currency",
      description: "NGN ↔ GHS",
      href: "/dashboard/payment/convert",
      icon: PlusSquareIcon,
    },
    {
      title: "TopUp",
      description: "Add money via Paystack",
      href: "/dashboard/payment/topup",
      icon: ArrowDown,
    },
    {
      title: "History",
      description: "All transactions",
      href: "/dashboard/transactions",
      icon: ClockIcon,
    },
  ];

  // Get dashboard summary data
  // const dashboardSummary = summary.data?.data;
  const totalBalance = walletOverview.data?.data?.totalBalance || 0;
  const filteredTransactions = overview.data?.data.recentTransactions;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownIcon className="text-green-600" size={20} />;
      case "withdraw":
        return <ArrowUpIcon className="text-red-600" size={20} />;
      case "tranfer":
        return <LucideRepeat className="text-blue-600" size={20} />;
      default:
        return <LucideRepeat className="text-gray-600" size={20} />;
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center flex flex-col items-center justify-center">
          <LucideLoader className="animate-spin mb-4" size={32} />
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading dashboard data</p>
          <button
            onClick={refreshDashboard}
            className="px-4 py-2 bg-cyan-dark text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-gray-600 text-base md:text-2xl">
            Welcome back, {user?.first_name}!
          </h2>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Section - Welcome and Quick Actions */}
        <div className="flex flex-col gap-6 xl:w-1/4 lg:w-full">
          <div className="flex flex-col justify-between bg-cyan-dark rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4 justify-between mb-6">
              <Image
                width={24}
                height={24}
                src="/icons/card-icon.png"
                alt="Profile"
                className="w-6 h-6"
              />
              <Image
                width={36}
                height={36}
                src="/icons/card-union.png"
                alt="Profile"
                className="w-auto h-7"
              />
            </div>
            <div className="mb-4">
              <h1 className="text-2xl xl:text-3xl font-bold mb-2">
                {user?.first_name} {user?.last_name}
              </h1>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-cyan-100">Balance Amount</p>
                <h2>
                  <span className="text-3xl xl:text-4xl font-bold">
                    {formatCurrency(
                      totalBalance,
                      0,
                      user?.setting?.default_currency as CurrencyType,
                    )}
                  </span>
                </h2>
              </div>
              <div className="text-wrap text-end text-sm">
                Combined <br /> Balance
              </div>
            </div>
          </div>
          <div className="bg-green-bg rounded-2xl shadow-sm">
            <div className="flex">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className="p-4 group flex-1 text-center border-r last:border-r-0 border-white"
                  >
                    <div className="p-3 rounded-lg text-cyan-dark transition-transform flex flex-col items-center justify-center">
                      <IconComponent size={26} />
                      <p className="mt-2 text-sm font-medium text-cyan-dark">
                        {action.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle Section - Balance Cards and Transactions */}
        <div className="flex flex-col gap-6 xl:w-1/2 lg:w-full">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <BalanceCard
                balance={walletOverview.data?.data?.ngn_wallet.balance || 0}
                currency="NGN"
                label="Naira Balance"
                isLoading={walletOverview.isLoading}
              />
            </div>
            <div className="flex-1">
              <BalanceCard
                balance={walletOverview.data?.data?.ghs_wallet.balance || 0}
                currency="GHS"
                label="Ghana Cedis Balance"
                isLoading={walletOverview.isLoading}
              />
            </div>
          </div>
          {/* Recent Transactions - Full Width */}
          <div className="">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-cyan-dark">
                  Recent Transactions
                </h2>
                <Link
                  href="/dashboard/transactions"
                  className="text-cyan-dark text-sm font-medium hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="bg-white shadow-sm overflow-hidden rounded-2xl">
                <div className="relative w-full overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-bg border-b">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Transaction ID
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Transaction
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Amount
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions?.map((transaction, index) => (
                        <tr
                          key={index}
                          className="border-b border-black/20 hover:bg-green-bg"
                        >
                          <td className="py-4 px-6">
                            <p className="text-sm font-medium text-gray-600">
                              {transaction.transactionId}
                            </p>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-lg text-nowrap">
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-base sm:text-sm text-nowrap">
                                  {transaction.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-semibold text-gray-900 text-base sm:text-sm text-nowrap">
                              {formatCurrency(
                                transaction.fromAmount || 0,
                                0,
                                transaction.fromCurrency! as CurrencyType,
                              )}
                            </p>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                transaction.status,
                              )}`}
                            >
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="text-gray-900 text-base sm:text-sm text-nowrap">
                                {formatDateTime(transaction.createdAt)}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Exchange Rates and Stats */}
        <div className="flex flex-col xl:flex-col lg:flex-row xl:w-1/4 lg:w-full gap-6">
          <div className="flex-1">
            {/* <ExpenseStat
              totalExpense={dashboardSummary?.monthlyExpenses || 15500}
              moneyIn={dashboardSummary?.monthlyIncome || 14800}
              moneyOut={dashboardSummary?.monthlyExpenses || 13500}
              isLoading={summary.isLoading}
            /> */}
            <RecentActivityStat
              recentActivity={recentActivity.data?.data}
              isLoading={recentActivity.isLoading}
            />
          </div>
          <div className="flex-1">
          </div>
        </div>
      </div>
    </div>
  );
}
