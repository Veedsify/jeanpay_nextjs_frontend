import { getUserTransactions } from "@/funcs/transaction/TransactionFunc";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

/**
 * Query parameter shape for fetching a user's transactions from the backend.
 * All fields are optional and will be passed as query params to the API.
 */
export type TransactionListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string; // e.g., "completed" | "pending" | "failed"
  accountType?: string; // e.g., "momo" | "paystack" | "visa" | "mastercard"
  fromDate?: string; // ISO date string (YYYY-MM-DD)
  toDate?: string; // ISO date string (YYYY-MM-DD)
};

/**
 * Generates a stable React Query key for transactions based on provided params.
 */
export const transactionsQueryKey = (params?: TransactionListParams) =>
  ["userTransactions", params ?? {}] as const;

export function useTransactions<TData = unknown>(
  params?: TransactionListParams,
  options?: Omit<
    UseQueryOptions<
      unknown,
      Error,
      TData,
      ReturnType<typeof transactionsQueryKey>
    >,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<TData> {
  return useQuery({
    queryKey: transactionsQueryKey(params),
    queryFn: async () => getUserTransactions(params),
    // Reasonable defaults – can be overridden via `options`
    enabled: true,
    refetchOnWindowFocus: false,
    staleTime: 60_000, // 1 min
    gcTime: 5 * 60_000, // 5 mins
    ...options,
  });
}

export default useTransactions;
