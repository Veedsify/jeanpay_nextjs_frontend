import { axiosClient } from "@/lib/axios";
import {
  ApiResponse,
  TopUpRequest,
  TopUpResponse,
  WalletBalance,
} from "@/types/wallet";
import { useMutation, useQuery } from "@tanstack/react-query";

const path = {
  WalletBase: "/protected/wallet",
  WalletBalance: "/balance",
  WalletTopUp: "/topup",
  WalletTopUpDetails: "/topup/:id",
  WalletWithdraw: "/withdraw",
  WalletHistory: "/history",
  WalletUpdateAfterPayment: "/update-after-payment",
};

const useWallet = () => {
  // Get wallet balance
  const useWalletBalance = () => {
    return useQuery({
      queryKey: ["walletBalance"],
      queryFn: async (): Promise<WalletBalance[]> => {
        const response = await axiosClient.post(
          path.WalletBase + path.WalletBalance,
        );
        const result: ApiResponse<WalletBalance[]> = await response.data;
        return result.data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  // Top up wallet mutation
  const topUpWalletMutation = useMutation({
    mutationFn: async (topUpData: TopUpRequest): Promise<TopUpResponse> => {
      const response = await axiosClient.post(
        path.WalletBase + path.WalletTopUp,
        topUpData,
      );
      const result: ApiResponse<TopUpResponse> = await response.data;
      return result.data;
    },
  });

  // Get topup details
  const useTopUpDetails = (transactionId: string) => {
    return useQuery({
      queryKey: ["topupDetails", transactionId],
      queryFn: async (): Promise<TopUpResponse> => {
        const response = await axiosClient.get(
          path.WalletBase +
            path.WalletTopUpDetails.replace(":id", transactionId),
        );
        const result: ApiResponse<TopUpResponse> = await response.data;
        if (result.error) {
          throw new Error(result.message);
        }
        return result.data;
      },
      enabled: !!transactionId,
      staleTime: 30 * 1000, // 30 seconds
      refetchInterval: 10 * 1000, // Refetch every 10 seconds for status updates
    });
  };

  return {
    useWalletBalance,
    topUpWalletMutation,
    useTopUpDetails,
  };
};

export default useWallet;
