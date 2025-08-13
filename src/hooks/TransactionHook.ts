import { useMutation } from "@tanstack/react-query";

import { TransferDetails } from "@/app/components/contexts/TransferStore";
import { createTransaction } from "@/funcs/transaction/TransactionFunc";

export default function useTransaction() {
  const createTransactionMutation = useMutation({
    mutationFn: async (details: TransferDetails) =>
      await createTransaction({ details }),
  });

  return {
    createTransactionMutation,
  };
}
