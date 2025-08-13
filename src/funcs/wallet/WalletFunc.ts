import { axiosClient } from "@/lib/axios";
import { GetWalletBalanceResponse } from "@/types/wallet";
const path = {
  WalletBase: "/protected/wallet",
  WalletBalance: "/balance",
  WalletTopUp: "/topup",
  WalletWithdraw: "/withdraw",
  WalletHistory: "/history",
};
async function getWalletBalance(): Promise<{
  data: GetWalletBalanceResponse[];
}> {
  return (await axiosClient.get(path.WalletBase + path.WalletBalance)).data;
}

export { getWalletBalance };
