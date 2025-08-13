import { QueryClient } from "@tanstack/react-query";

export const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 20 * 60 * 1000, // 10 minutes
    },
  },
});
