"use client";
import { validateUser } from "@/funcs/user/UserFuncs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { axiosClient } from "@/lib/axios";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { logoutUser } from "@/funcs/auth/AuthFuncs";
import { AxiosError } from "axios";

// User type definition
export interface User {
  id: string;
  email: string;
  first_name: string;
  username: string;
  last_name: string;
  phone_number: string;
  profile_picture: string;
  is_admin: boolean;
  user_id: number;
  country: "nigeria" | "ghana";
  is_blocked: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  setting: {
    user_id: number;
    default_currency: "NGN" | "GHS";
  };
}

// Authentication state type
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Authentication context type
export interface AuthContextType extends AuthState {
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

// Registration data type
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// Authentication Provider Component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const errorParam = useSearchParams().get("error");
  const messageParam = useSearchParams().get("message");

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Redirect to login if not authenticated (except for public routes)
  useEffect(() => {
    const publicRoutes = [
      "/login",
      "/register",
      "/forgot-password",
      "/reset-password",
    ];
    const isPublicRoute = publicRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (!authState.isAuthenticated && !authState.isLoading && !isPublicRoute) {
      router.push("/login");
    }
  }, [authState.isAuthenticated, authState.isLoading, router, pathname]);

  const validateUserToken = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await validateUser();
      const userData = response.data.user;

      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return userData;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Token validation failed:", error);
        // Only set error if it's not a 401 (which will be handled by axios interceptor)
        const errorMessage =
          error.response?.status === 401
            ? null
            : error.message || "Authentication failed";
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: errorMessage,
        });

        throw error;
      }
    }
  }, []);

  // Initialize auth state on mount
  const initializeAuth = useCallback(async () => {
    if (typeof window === "undefined") return;

    try {
      await validateUserToken();
    } catch (error) {
      console.error("Auth initialization error:", error);
      // Don't set loading to false here if it's a 401, let the interceptor handle it
      if (error instanceof Error && !error.message.includes("401")) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    }
  }, [validateUserToken]);

  // Handle logout (can be called internally or from axios interceptor)
  const handleLogout = useCallback(async () => {
    try {
      // Call logout API if user is authenticated
      if (authState.isAuthenticated) {
        const response = await logoutUser();
        console.log(response);
        if (response.status == 200) {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          router.push(
            `/login?error=${errorParam}&message=${messageParam || ""}`,
          );
        }
      }
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      router.push(`/login?error=${errorParam}&message=${messageParam || ""}`);
    } catch (error) {
      console.error("Logout API call failed:", error);
      router.push(`/login?error=${errorParam}&message=${messageParam || ""}`);
    }
  }, [authState.isAuthenticated, router, errorParam, messageParam]);

  // Public logout method
  const logout = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    await handleLogout();
  };

  const updateUser = async (userData: Partial<User>) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Use axiosClient instead of fetch for consistency
      const response = await axiosClient.patch("/auth/user", userData);

      const updatedUser = response.data.user;

      setAuthState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          ...updatedUser,
        } as User,
        isLoading: false,
        error: null,
      }));

      return updatedUser;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.message || "Update failed";

        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));

        throw new Error(errorMessage);
      }
    }
  };

  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  const refreshUser = async () => {
    try {
      await validateUserToken();
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // Don't throw here, let the component handle the error state
    }
  };

  // Listen for logout events from axios interceptor
  useEffect(() => {
    const handleAuthLogout = () => {
      console.log("Auth logout event received from axios interceptor");
      handleLogout();
    };

    window.addEventListener("auth:logout", handleAuthLogout);
    return () => {
      window.removeEventListener("auth:logout", handleAuthLogout);
    };
  }, [handleLogout]);

  const contextValue: AuthContextType = {
    ...authState,
    logout,
    updateUser,
    clearError,
    refreshUser,
    initializeAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

// Export the context for advanced use cases
export { AuthContext };
