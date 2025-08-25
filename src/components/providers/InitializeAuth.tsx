"use client";
import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/UserAuthContext";
import FullLoader from "@/components/ui/FullLoader";
import { usePathname } from "next/navigation";

const InitializeAuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthContext();
  const [hasInitialized, setHasInitialized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      if (typeof window === "undefined" || hasInitialized) return;

      // Define public routes that don't require authentication
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
        // Always try to initialize auth to check if user has valid session
        await initializeAuth();
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // For public routes, we don't need to worry about auth failure
        if (isPublicRoute) {
          console.log("Auth failed on public route, continuing...");
        }
      } finally {
        setHasInitialized(true);
      }
    };

    initAuth();
  }, [initializeAuth, hasInitialized, pathname]);

  // Show loader while initializing auth
  if (!hasInitialized || isLoading) {
    return <FullLoader shouldClose={false} duration={0} />;
  }

  // Define public routes that don't require authentication
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

  // For public routes, always render children regardless of auth status
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected routes, only render if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and not on public route, show loader
  // (user will be redirected by the auth context)
  return <FullLoader shouldClose={false} duration={0} />;
};

export default InitializeAuthProvider;
