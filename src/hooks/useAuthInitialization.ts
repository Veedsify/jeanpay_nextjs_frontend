"use client";
import { useEffect, useRef } from "react";
import { useAuthContext } from "@/components/contexts/UserAuthContext";
import { usePathname, useRouter } from "next/navigation";

export const useAuthInitialization = () => {
  const { initializeAuth, isLoading, isAuthenticated } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();
  const hasInitialized = useRef(false);

  useEffect(() => {
    const initAuth = async () => {
      // Only initialize once
      if (hasInitialized.current) return;
      hasInitialized.current = true;

      // Check if we're on a public route
      const publicRoutes = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/verify",
      ];

      const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route),
      );

      try {
        await initializeAuth();
      } catch (error) {
        console.error("Auth initialization failed:", error);

        // If we're not on a public route and auth failed, redirect to login
        if (!isPublicRoute) {
          router.push("/login");
        }
      }
    };

    // Only run if we're in the browser
    if (typeof window !== "undefined") {
      initAuth();
    }
  }, [initializeAuth, pathname, router]);

  // Return auth state for components that need it
  return {
    isLoading,
    isAuthenticated,
    isInitialized: hasInitialized.current,
  };
};
