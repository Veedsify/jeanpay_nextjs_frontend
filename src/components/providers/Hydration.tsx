"use client";
import { queryclient } from "@/utils/QueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useEffect, useState } from "react";

export const Hydration = ({ children }: { children: ReactNode }) => {
  const [hydrate, setHydration] = useState(false);
  useEffect(() => {
    setHydration(true);
  }, []);

  if (!hydrate) {
    return null;
  }

  return (
    <>
      <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    </>
  );
};
