import { useMutation, useQuery } from "@tanstack/react-query";

import { TransferDetails } from "@/components/contexts/TransferStore";
import { createTransaction, getTransactionDetails } from "@/funcs/transaction/TransactionFunc";

export default function useTransaction() {
  const createTransactionMutation = useMutation({
    mutationFn: async (details: TransferDetails) =>
      await createTransaction({ details }),
  });

  return {
    createTransactionMutation,
  };
}

export function useTransactionDetails(transactionID: string) {
  return useQuery({
    queryKey: ["transaction-details", transactionID],
    queryFn: () => getTransactionDetails({ transactionID }),
    enabled: !!transactionID,
  });
}
