"use client";
import { getPlatformSettings } from "@/funcs/settings/SettingsFunc";
import { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type DefaultCurrencyDisplay = "NGN" | "GHS";
type PlatfromSetting = {
  kycEnforcement: boolean;
  manualRateOverride: boolean;
  defaultCurrency: DefaultCurrencyDisplay;
  transactionEmails: boolean;
  minimumTransaction: number;
  maximumTransaction: number;
  dailyUserCap: number;
  theme: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  enforceTwoFactor: boolean;
  sessionTimeoutMinutes: number;
  passwordExpiryDays: number;
  sendTransactionSuccess: boolean;
  sendTransactionDecline: boolean;
  sendTransactionPending: boolean;
  sendTransactionRefund: boolean;
  accountLimitsNotification: boolean;
};

type PlatformSettingContextType = {
  platformSetting: PlatfromSetting | null;
  updatePlatfromSettings: (setting: PlatfromSetting) => void;
};

const PlatFormSettingContext = createContext<
  PlatformSettingContextType | undefined
>(undefined);

export const usePlatFromSettings = () => {
  const context = useContext(PlatFormSettingContext);
  if (context === undefined) {
    throw new Error(
      "usePlatFromSettings must be used within a PlatFormSettingProvider",
    );
  }
  return context;
};

export const PlatformSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [platformSetting, setPlatformSetting] =
    useState<PlatfromSetting | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getPlatformSettings();
        if (response.data) {
          setPlatformSetting(response.data as PlatfromSetting);
        }
        console.log("Fetched platform settings:", response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(
            "Error fetching platform settings:",
            error.response?.data || error.message,
          );
        }
      }
    };
    fetchSettings();
  }, []);

  const updatePlatfromSettings = (setting: PlatfromSetting) => {
    setPlatformSetting(setting);
  };

  const value = { platformSetting, updatePlatfromSettings };

  return (
    <PlatFormSettingContext.Provider value={value}>
      {children}
    </PlatFormSettingContext.Provider>
  );
};
