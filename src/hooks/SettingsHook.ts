import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserSettings,
  updateUserSettings,
  updateProfile,
  changePassword,
  updateSecuritySettings,
  generateTwoFactorQR,
  enableTwoFactor,
  disableTwoFactor,
  updatePreferences,
  updateNotificationSettings,
  updateProfilePicture,
  updateWalletInfo,
  updateWithdrawalMethods,
} from "@/funcs/settings/SettingsFunc";
import {
  ProfileUpdateData,
  ChangePasswordData,
  SecuritySettingsData,
  PreferencesData,
  NotificationSettingsData,
  UserSettings,
  SettingsApiResponse,
  UpdateSettingsResponse,
  TwoFactorSetup,
  WalletData,
  WithdrawalData,
} from "@/types/settings";

export default function useSettings() {
  const queryClient = useQueryClient();

  // Query for getting user settings
  const useUserSettings = () => {
    return useQuery<SettingsApiResponse<UserSettings>>({
      queryKey: ["userSettings"],
      queryFn: getUserSettings,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  const updateProfilePictureMutation = useMutation({
    mutationFn: (file: File) => updateProfilePicture(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });

  // General settings update mutation
  const updateUserSettingsMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    Partial<UserSettings>
  >({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });

  // Profile update mutation
  const updateProfileMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    ProfileUpdateData
  >({
    mutationFn: (profileData: ProfileUpdateData) => updateProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    ChangePasswordData
  >({
    mutationFn: (passwordData: ChangePasswordData) =>
      changePassword(passwordData),
  });

  // Security settings update mutation
  const updateSecuritySettingsMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    SecuritySettingsData
  >({
    mutationFn: (securityData: SecuritySettingsData) =>
      updateSecuritySettings(securityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });

  // Two-Factor Authentication queries and mutations
  const useTwoFactorQR = () => {
    return useQuery<SettingsApiResponse<TwoFactorSetup>>({
      queryKey: ["twoFactorQR"],
      queryFn: generateTwoFactorQR,
      enabled: false, // Only fetch when explicitly requested
      staleTime: 0, // Always fresh
      gcTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const enableTwoFactorMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    string
  >({
    mutationFn: (code: string) => enableTwoFactor(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
      queryClient.removeQueries({ queryKey: ["twoFactorQR"] });
    },
  });

  const disableTwoFactorMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    string
  >({
    mutationFn: (code: string) => disableTwoFactor(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });

  // Preferences update mutation
  const updatePreferencesMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    PreferencesData
  >({
    mutationFn: (preferencesData: PreferencesData) =>
      updatePreferences(preferencesData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });

  // Notifications update mutation
  const updateNotificationSettingsMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    NotificationSettingsData
  >({
    mutationFn: (notificationData: NotificationSettingsData) =>
      updateNotificationSettings(notificationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });

  // Wallet update mutation
  const updateWalletInfoMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    WalletData
  >({
    mutationFn: (walletData: WalletData) => updateWalletInfo(walletData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });

  // Withdrawal methods update mutation
  const updateWithdrawalMethodsMutation = useMutation<
    SettingsApiResponse<UpdateSettingsResponse>,
    Error,
    WithdrawalData
  >({
    mutationFn: (withdrawalData: WithdrawalData) =>
      updateWithdrawalMethods(withdrawalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });

  return {
    // Queries
    useUserSettings,
    useTwoFactorQR,

    // Mutations
    updateUserSettings: updateUserSettingsMutation,
    updateProfile: updateProfileMutation,
    changePassword: changePasswordMutation,
    updateSecuritySettings: updateSecuritySettingsMutation,
    enableTwoFactor: enableTwoFactorMutation,
    disableTwoFactor: disableTwoFactorMutation,
    updatePreferences: updatePreferencesMutation,
    updateProfilePicture: updateProfilePictureMutation,
    updateNotificationSettings: updateNotificationSettingsMutation,
    updateWalletInfo: updateWalletInfoMutation,
    updateWithdrawalMethods: updateWithdrawalMethodsMutation,
  };
}
