"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useEffect, useState } from "react";
import FullLoader from "../ui/FullLoader";

export const Hydration = ({ children }: { children: ReactNode }) => {
  const [hydrate, setHydration] = useState(false);
  useEffect(() => {
    setHydration(true);
  }, []);

  const queryclient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchInterval: 20 * 60 * 1000, // 10 minutes
      },
    },
  });

  if (!hydrate) {
    return null;
  }

  return (
    <>
      <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    </>
  );
};
