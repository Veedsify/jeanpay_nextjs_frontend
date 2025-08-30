"use client";

import { create } from "zustand";
import { useMemo } from "react";

// Deep equality check for objects
const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;

  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(objA[key], objB[key])) return false;
  }

  return true;
};

// Types
export interface ConversionData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  exchangeRate: number;
}

export interface AccountDetails {
  type: "bank" | "momo";
  accountNumber?: string;
  bankCode?: string;
  bankName?: string;
  phoneNumber?: string;
  network?: string;
  recipientName?: string;
}

export interface TransferDetails extends ConversionData {
  method: "bank" | "momo";
  recipientName: string;
  accountNumber?: string;
  bankName?: string;
  phoneNumber?: string;
  network?: string;
  transactionId?: string;
  method_of_payment?: "wallet" | "checkout";
  created_at?: string;
}

export interface TransferError {
  code: string;
  title: string;
  description: string;
  action: string;
}

// Store state interface
interface TransferState {
  // Conversion data
  conversionData: ConversionData;

  // Account details
  accountDetails: AccountDetails;

  // Transfer details (combined data)
  transferDetails: TransferDetails | null;

  // Error state
  transferError: TransferError | null;

  // Loading states
  isValidating: boolean;
  isProcessing: boolean;

  // Validation states
  isFormValid: boolean;
  validationError: string;

  // Actions
  setConversionData: (data: Partial<ConversionData>) => void;
  setAccountDetails: (details: Partial<AccountDetails>) => void;
  setTransferDetails: (details: Partial<TransferDetails>) => void;
  setTransferError: (error: TransferError | null) => void;
  setValidating: (loading: boolean) => void;
  setProcessing: (processing: boolean) => void;
  setValidationError: (error: string) => void;
  validateForm: () => boolean;
  generateTransferDetails: () => void;
  clearTransferData: () => void;
  clearError: () => void;
}

// Initial state
const initialConversionData: ConversionData = {
  fromCurrency: "NGN",
  toCurrency: "GHS",
  fromAmount: "",
  toAmount: "",
  exchangeRate: 0,
};

const initialAccountDetails: AccountDetails = {
  type: "bank",
};

// Create the store
export const useTransferStore = create<TransferState>()((set, get) => ({
  // Initial state
  conversionData: initialConversionData,
  accountDetails: initialAccountDetails,
  transferDetails: null,
  transferError: null,
  isValidating: false,
  isProcessing: false,
  isFormValid: false,
  validationError: "",

  // Actions
  setConversionData: (data) =>
    set((state) => {
      const newConversionData = { ...state.conversionData, ...data };

      // Prevent unnecessary updates if data hasn't changed
      if (deepEqual(state.conversionData, newConversionData)) {
        return state;
      }

      return {
        conversionData: newConversionData,
        validationError: "",
      };
    }),

  setAccountDetails: (details) =>
    set((state) => {
      const newAccountDetails = { ...state.accountDetails, ...details };

      // Prevent unnecessary updates if data hasn't changed
      if (deepEqual(state.accountDetails, newAccountDetails)) {
        return state;
      }

      return {
        accountDetails: newAccountDetails,
        validationError: "",
      };
    }),

  setTransferDetails: (details) =>
    set((state) => ({
      transferDetails: state.transferDetails
        ? { ...state.transferDetails, ...details }
        : (details as TransferDetails),
      validationError: "",
    })),

  setTransferError: (error) =>
    set(() => ({
      transferError: error,
    })),

  setValidating: (loading) =>
    set(() => ({
      isValidating: loading,
    })),

  setProcessing: (processing) =>
    set(() => ({
      isProcessing: processing,
    })),

  setValidationError: (error) =>
    set(() => ({
      validationError: error,
    })),

  validateForm: () => {
    const { accountDetails } = get();

    let isValid = false;
    let errorMessage = "";

    if (!accountDetails.type) {
      errorMessage = "Please select a payment method";
    } else if (accountDetails.type === "bank") {
      if (!accountDetails.accountNumber) {
        errorMessage = "Please enter account number";
      } else if (!accountDetails.bankCode) {
        errorMessage = "Please select a bank";
      } else if (accountDetails.accountNumber.length !== 10) {
        errorMessage = "Account number must be 10 digits";
      } else {
        isValid = true;
      }
    } else if (accountDetails.type === "momo") {
      if (!accountDetails.phoneNumber) {
        errorMessage = "Please enter phone number";
      } else if (!accountDetails.network) {
        errorMessage = "Please select a network";
      } else if (String(accountDetails.phoneNumber).length < 10) {
        errorMessage = "Please enter a valid phone number";
      } else {
        isValid = true;
      }
    }

    console.log(isValid, errorMessage);

    set(() => ({
      isFormValid: isValid,
      validationError: errorMessage,
    }));
    return isValid;
  },

  generateTransferDetails: () => {
    const { conversionData, accountDetails } = get();

    const transferDetails: TransferDetails = {
      ...conversionData,
      method: accountDetails.type,
      recipientName: accountDetails.recipientName || "",
      accountNumber: accountDetails.accountNumber,
      bankName: accountDetails.bankName,
      phoneNumber: accountDetails.phoneNumber,
      network: accountDetails.network,
    };

    set(() => ({ transferDetails }));
  },

  clearTransferData: () =>
    set(() => ({
      conversionData: initialConversionData,
      accountDetails: initialAccountDetails,
      transferDetails: null,
      transferError: null,
      isValidating: false,
      isProcessing: false,
      isFormValid: false,
      validationError: "",
    })),

  clearError: () =>
    set(() => ({
      transferError: null,
      validationError: "",
    })),
}));

// Selector hooks for better performance
export const useConversionData = () =>
  useTransferStore((state) => state.conversionData);

export const useAccountDetails = () =>
  useTransferStore((state) => state.accountDetails);

export const useTransferDetails = () =>
  useTransferStore((state) => state.transferDetails);

export const useTransferError = () =>
  useTransferStore((state) => state.transferError);

export const useTransferLoading = () => {
  const isValidating = useTransferStore((state) => state.isValidating);
  const isProcessing = useTransferStore((state) => state.isProcessing);

  return useMemo(
    () => ({
      isValidating,
      isProcessing,
    }),
    [isValidating, isProcessing]
  );
};

export const useTransferValidation = () => {
  const isFormValid = useTransferStore((state) => state.isFormValid);
  const validationError = useTransferStore((state) => state.validationError);
  const validateForm = useTransferStore((state) => state.validateForm);

  return useMemo(
    () => ({
      isFormValid,
      validationError,
      validateForm,
    }),
    [isFormValid, validationError, validateForm]
  );
};

// Individual action selectors
export const useSetConversionData = () =>
  useTransferStore((state) => state.setConversionData);

export const useSetAccountDetails = () =>
  useTransferStore((state) => state.setAccountDetails);

export const useSetTransferDetails = () =>
  useTransferStore((state) => state.setTransferDetails);

export const useSetTransferError = () =>
  useTransferStore((state) => state.setTransferError);

export const useSetValidating = () =>
  useTransferStore((state) => state.setValidating);

export const useSetProcessing = () =>
  useTransferStore((state) => state.setProcessing);

export const useSetValidationError = () =>
  useTransferStore((state) => state.setValidationError);

export const useGenerateTransferDetails = () =>
  useTransferStore((state) => state.generateTransferDetails);

export const useClearTransferData = () =>
  useTransferStore((state) => state.clearTransferData);

export const useClearError = () =>
  useTransferStore((state) => state.clearError);

// Grouped action hooks with proper memoization
export const useTransferActions = () => {
  const setConversionData = useSetConversionData();
  const setAccountDetails = useSetAccountDetails();
  const setTransferDetails = useSetTransferDetails();
  const setTransferError = useSetTransferError();
  const setValidating = useSetValidating();
  const setProcessing = useSetProcessing();
  const setValidationError = useSetValidationError();
  const generateTransferDetails = useGenerateTransferDetails();
  const clearTransferData = useClearTransferData();
  const clearError = useClearError();

  return useMemo(
    () => ({
      setConversionData,
      setAccountDetails,
      setTransferDetails,
      setTransferError,
      setValidating,
      setProcessing,
      setValidationError,
      generateTransferDetails,
      clearTransferData,
      clearError,
    }),
    [
      setConversionData,
      setAccountDetails,
      setTransferDetails,
      setTransferError,
      setValidating,
      setProcessing,
      setValidationError,
      generateTransferDetails,
      clearTransferData,
      clearError,
    ]
  );
};
